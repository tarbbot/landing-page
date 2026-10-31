import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isLandingPath } from '../i18n/locales';
import { reducedMotion } from './landing/fx';
import { tint } from './CyberBackground';
import { mass } from '../lib/wells';

// A galaxy of order flow that follows the page. One WebGL point cloud, every position computed in the
// vertex shader from a few numbers (scroll chapters, cursor, black hole), so the CPU cost is tiny:
//   hero        a compact spiral disk behind the ZNIT.CORE panel, pulled by the cursor
//   manifesto   the disk drifts to the black hole and, as you read, is swallowed particle by particle,
//               slowly: no endless orbit, each one spirals in once and is gone
//   strategies  the hole gives them back: they are ejected from it and spread across the whole screen
//   cta         they fly in along arcs and gather into the Z of the brand
// A click scatters it; it falls back into shape on its own. Reduced motion draws a single still frame.
const VERT = `
precision highp float;
attribute vec4 a_seed;
attribute vec2 a_z;
uniform float u_time, u_aspect, u_e, u_z, u_h, u_g, u_burst, u_dpr, u_scale, u_dscale, u_zs;
uniform vec2 u_mouse, u_hole, u_disk, u_zc;
uniform float u_holeR;
uniform vec3 u_tint;
varying vec3 v_col;
varying float v_a;
const float TAU = 6.2831853;
vec2 rot(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
void main() {
  float r = pow(a_seed.x, 0.55);
  float arm = floor(a_seed.y * 3.0);
  float ang = r * 5.5 + arm * TAU / 3.0 + (a_seed.z - 0.5) * 0.95 * (1.0 - 0.35 * r) + u_time * 0.12 / (0.35 + r);
  vec2 d = vec2(cos(ang), sin(ang)) * r * 0.95 * u_dscale;
  d.y *= 0.5;
  d = rot(d, -0.35);
  vec2 disk = u_disk + d;
  float dz = (a_seed.w - 0.5) * 0.35 * (1.0 - r * 0.6);

  vec2 cloud = vec2((a_seed.x * 2.0 - 1.0) * u_aspect * 1.05, (fract(a_seed.y * 7.31) * 2.0 - 1.0) * 1.05);
  cloud += 0.03 * vec2(sin(u_time * 0.3 + a_seed.z * TAU), cos(u_time * 0.27 + a_seed.w * TAU));
  float cz = (fract(a_seed.z * 5.17) - 0.5) * 1.4;

  float z = dz;
  vec2 p = disk;

  // swallowed by the black hole, once: each particle starts on a wide ring, spirals in slowly as you read
  // (u_g, from the scroll) and vanishes at the horizon. No endless orbit.
  float R0 = u_holeR * (2.4 + 6.0 * a_seed.x);
  float th0 = a_seed.y * TAU;
  float a0 = a_seed.w * 0.62;
  float pI = smoothstep(a0, a0 + 0.38, u_g);
  float rr = R0 * pow(1.0 - pI, 1.35);
  float th = th0 + pI * (1.4 + 2.6 * a_seed.z) + u_time * 0.05 / (0.4 + (R0 / u_holeR) * 0.15);
  vec2 ph = u_hole + vec2(cos(th), sin(th) * 0.55) * rr;
  p = mix(p, ph, u_h);
  z = mix(z, 0.0, u_h);

  // ejected from the hole and spread over the screen, each on its own curved path
  float qe = smoothstep(0.0, 1.0, clamp(u_e * 1.6 - a_seed.y * 0.6, 0.0, 1.0));
  vec2 start = u_hole + (a_seed.xy - 0.5) * 0.03;
  vec2 dE = cloud - start;
  vec2 pe = mix(start, cloud, qe) + vec2(-dE.y, dE.x) * sin(qe * 3.14159) * (a_seed.z - 0.5) * 0.45;
  p = mix(p, pe, smoothstep(0.0, 0.04, qe));
  z = mix(z, cz, qe);

  // the brand mark: every particle has a point of the Z to return to, and flies there along an arc
  vec2 zp = u_zc + a_z * u_zs + 0.006 * vec2(sin(u_time * 0.9 + a_seed.x * TAU), cos(u_time * 0.8 + a_seed.y * TAU));
  float qz = smoothstep(0.0, 1.0, clamp(u_z * 1.7 - a_seed.x * 0.7, 0.0, 1.0));
  vec2 dZ = zp - p;
  p = mix(p, zp, qz) + vec2(-dZ.y, dZ.x) * sin(qz * 3.14159) * (a_seed.w - 0.5) * 0.5;
  z = mix(z, 0.0, qz);
  float vis = max(1.0 - pI * u_h, smoothstep(0.0, 0.25, qe));

  // cursor: particles fall toward it with a swirl, a click scatters them
  vec2 dm = p - u_mouse;
  float d2 = dot(dm, dm);
  float f = exp(-d2 / (2.0 * 0.16 * 0.16));
  vec2 dn = dm / (sqrt(d2) + 0.001);
  p -= dn * f * 0.09;
  p += vec2(-dn.y, dn.x) * f * 0.05;
  p += dn * u_burst * (0.2 + 0.9 * a_seed.x) * 0.5;

  float persp = 1.0 / (1.0 + z * 0.5);
  gl_Position = vec4(p.x / u_aspect * persp, p.y * persp, 0.0, 1.0);
  gl_PointSize = u_dpr * u_scale * (2.4 + 3.6 * a_seed.z * a_seed.z) * persp * (1.0 + 0.6 * f) * mix(0.45, 1.0, vis);

  vec3 cy = vec3(0.13, 0.9, 1.0);
  vec3 vi = vec3(0.55, 0.36, 0.96);
  vec3 mg = vec3(1.0, 0.24, 0.81);
  vec3 lm = vec3(0.71, 1.0, 0.23);
  vec3 col = mix(mix(cy, vi, smoothstep(0.0, 0.7, r)), mg, smoothstep(0.55, 1.0, r) * 0.8);
  col = mix(col, lm, step(0.965, a_seed.w));
  col = mix(col, vec3(1.0), (1.0 - r) * 0.5 * (1.0 - u_e));
  col = mix(col, u_tint, 0.22);
  col = mix(col, vec3(1.0), (1.0 - vis) * 0.7);
  v_col = col;
  float tw = 0.35 + 0.65 * (0.5 + 0.5 * sin(u_time * (1.0 + 3.0 * a_seed.x) + a_seed.y * TAU));
  v_a = tw * mix(1.0, 0.8, u_e) * vis;
}
`;
const FRAG = `
precision mediump float;
varying vec3 v_col;
varying float v_a;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  gl_FragColor = vec4(v_col * 1.25, min(1.0, a * v_a * 1.3));
}
`;

const sstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// pixels of a bold Z, so that each particle can be given a point of it
const zPoints = (): { x: number; y: number }[] => {
  const c = document.createElement('canvas');
  c.width = c.height = 200;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff';
  g.beginPath();
  [[28, 28], [172, 28], [172, 62], [86, 138], [172, 138], [172, 172], [28, 172], [28, 138], [114, 62], [28, 62]].forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fill();
  const px = g.getImageData(0, 0, 200, 200).data;
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < 200 * 200; i++) if (px[i * 4 + 3] > 128) out.push({ x: ((i % 200) / 200 - 0.5) * 2, y: -((Math.floor(i / 200) / 200) - 0.5) * 2 });
  return out;
};

const GalaxyInner: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!canvas || !gl) return;
    document.documentElement.classList.add('has-galaxy');
    const calm = reducedMotion();
    const small = window.matchMedia('(max-width: 900px)').matches || window.matchMedia('(pointer: coarse)').matches;
    const COUNT = small ? 2600 : 7000;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const seed = new Float32Array(COUNT * 4);
    const zz = new Float32Array(COUNT * 2);
    const zpts = zPoints();
    for (let i = 0; i < COUNT; i++) {
      for (let k = 0; k < 4; k++) seed[i * 4 + k] = Math.random();
      const zp = zpts[Math.floor(Math.random() * zpts.length)];
      zz[i * 2] = zp.x;
      zz[i * 2 + 1] = zp.y;
    }
    const bind = (name: string, data: Float32Array, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind('a_seed', seed, 4);
    bind('a_z', zz, 2);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      time: U('u_time'), aspect: U('u_aspect'), e: U('u_e'), z: U('u_z'), h: U('u_h'), g: U('u_g'), burst: U('u_burst'), dpr: U('u_dpr'), scale: U('u_scale'),
      dscale: U('u_dscale'), zs: U('u_zs'), mouse: U('u_mouse'), hole: U('u_hole'), disk: U('u_disk'), zc: U('u_zc'), holeR: U('u_holeR'), tint: U('u_tint'),
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let time = 0;
    let e = 0;
    let zf = 0;
    let h = 0;
    let g = 0;
    let drift = 0; // slow, time-driven share of the swallowing
    let holePage = 0; // where the hole is on the page, so the particles can leave from it after it has scrolled away
    let burst = 0;
    const mouse = { x: 9, y: 9, tx: 9, ty: 9 };
    const hole = { x: 0, y: 0, r: 0.2 };
    const tintC = [0.55, 0.36, 0.96];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const frame = (now: number, still = false) => {
      const dt = still ? 0 : Math.min(48, now - last);
      last = now;
      time += dt / 1000;
      const a = W / H;
      const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? 1e5;

      // chapters from the scroll position; wide ranges and slow easing keep every change gradual
      const eT = sstep(H * 1.25, H * 0.15, top('strategies'));
      const zT = sstep(H * 1.7, H * 0.35, top('start'));
      const eGoal = eT * (1 - zT);
      const mr = document.getElementById('manifesto')?.getBoundingClientRect();
      const pm = mr ? Math.min(1, Math.max(0, -mr.top / Math.max(1, mr.height - H))) : 0;
      // the hole feeds on its own, slowly, while it is on screen; scrolling the text speeds it up
      const holeVisible = !!mr && mr.bottom > 0 && mr.top < H;
      if (!mr || mr.top > H) drift = 0;
      else if (holeVisible) drift = Math.min(0.5, drift + dt / 1000 * 0.012);
      const gGoal = Math.min(1, sstep(0.12, 0.92, pm) + drift);
      const holeOn = mass.s > 0 && !!mr && mr.bottom > 0 && mr.top < H;
      // __znInstant lets automated tests (software WebGL runs at about 1 fps) skip the easing
      const instant = still || (window as unknown as { __znInstant?: boolean }).__znInstant === true;
      const ease = (rate: number) => (instant ? 1 : 1 - Math.pow(1 - rate, dt / 16.667));
      e += (eGoal - e) * ease(0.025);
      zf += (zT - zf) * ease(0.022);
      g += (gGoal - g) * ease(0.04);
      h += ((holeOn ? 1 : 0) - h) * ease(0.03);
      burst = Math.max(0, burst - dt / 900);
      mouse.x += (mouse.tx - mouse.x) * ease(0.12);
      mouse.y += (mouse.ty - mouse.y) * ease(0.12);
      if (mass.s > 0) {
        hole.x = (mass.x / W * 2 - 1) * a;
        hole.y = -(mass.y / H * 2 - 1);
        hole.r = Math.max(0.08, mass.r / H * 2);
        holePage = mass.y + window.scrollY;
      } else if (holePage) {
        hole.y = -((holePage - window.scrollY) / H * 2 - 1);
      }
      const goal = tint.c.split(',').map((n) => parseFloat(n) / 255);
      for (let i = 0; i < 3; i++) tintC[i] += (goal[i] - tintC[i]) * 0.05;

      // where the Z forms: on the empty stage the CTA section reserves above its box (CSS: --zstage)
      const start = document.getElementById('start');
      const box = document.querySelector('.cta-box')?.getBoundingClientRect();
      const stage = start ? parseFloat(getComputedStyle(start).getPropertyValue('--zstage')) || 260 : 260;
      const zHpx = stage * 0.8; // height of the Z on screen
      const zsPx = zHpx / 0.72;
      let zcx = 0;
      let zcy = 0;
      if (box) {
        zcx = ((box.left + box.width / 2) / W * 2 - 1) * a;
        zcy = -((box.top - stage / 2) / H * 2 - 1);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.aspect, a);
      gl.uniform1f(u.e, e);
      gl.uniform1f(u.z, zf);
      gl.uniform1f(u.h, h);
      gl.uniform1f(u.g, g);
      gl.uniform1f(u.burst, burst);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.scale, (H / 900) * (small ? 0.85 : 1));
      gl.uniform1f(u.dscale, small ? 0.7 : 1);
      gl.uniform1f(u.zs, zsPx / H * 2 * 0.5);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform2f(u.hole, hole.x, hole.y);
      gl.uniform1f(u.holeR, hole.r);
      // the disk sits to the right behind the ZNIT.CORE panel on wide screens, at the top on phones, and rises with the scroll
      gl.uniform2f(u.disk, small ? 0 : 0.4 * a, (small ? 0.62 : 0.02) + (window.scrollY / H) * 1.1);
      gl.uniform2f(u.zc, zcx, zcy);
      gl.uniform3f(u.tint, tintC[0], tintC[1], tintC[2]);
      gl.drawArrays(gl.POINTS, 0, COUNT);
    };

    const loop = (now: number) => {
      if (!document.hidden) frame(now);
      else last = now;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType === 'touch') return;
      mouse.tx = (ev.clientX / W * 2 - 1) * (W / H);
      mouse.ty = -(ev.clientY / H * 2 - 1);
    };
    const onLeave = () => {
      mouse.tx = mouse.ty = 9;
    };
    const onDown = (ev: PointerEvent) => {
      if (ev.pointerType === 'touch' || (ev.target as HTMLElement).closest('a,button,input,select,textarea,[role="button"]')) return;
      // no click burst on the hero and the black hole: it only plays from the strategies on
      if ((document.getElementById('strategies')?.getBoundingClientRect().top ?? 1e5) > window.innerHeight * 0.5) return;
      burst = 1;
    };
    const redraw = () => frame(performance.now(), true);

    resize();
    window.addEventListener('resize', resize);
    if (calm) {
      window.addEventListener('scroll', redraw, { passive: true });
      window.addEventListener('resize', redraw);
      redraw();
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      document.documentElement.classList.remove('has-galaxy');
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', redraw);
      window.removeEventListener('resize', redraw);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="zn-galaxy" aria-hidden="true" />;
};

// only on the landing pages
const GalaxyLayer: React.FC = () => {
  const { pathname } = useLocation();
  return isLandingPath(pathname) ? <GalaxyInner /> : null;
};

export default GalaxyLayer;
