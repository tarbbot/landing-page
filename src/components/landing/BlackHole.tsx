import React, { useEffect, useRef } from 'react';
import { reducedMotion } from './fx';

// A black hole drawn on a canvas: event horizon, photon ring, a tilted accretion disk in Keplerian motion
// with Doppler brightening, the back of the disk lensed over the top of the hole, and stars bent into an
// Einstein ring. The scroll (progress 0..1) makes it grow and spin faster; the cursor tilts the disk and
// feeds the hole with market ticks that spiral in.
const TAU = Math.PI * 2;
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (x: number) => x * x * (3 - 2 * x);
const R_IN = 1.55;

type RGB = [number, number, number];
const STOPS: [number, RGB][] = [
  [0, [255, 255, 255]],
  [0.22, [140, 245, 255]],
  [0.55, [139, 92, 246]],
  [1, [255, 60, 207]],
];
const ramp = (q: number): RGB => {
  for (let i = 1; i < STOPS.length; i++) {
    if (q <= STOPS[i][0]) {
      const [q0, c0] = STOPS[i - 1];
      const [q1, c1] = STOPS[i];
      const f = (q - q0) / (q1 - q0);
      return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f];
    }
  }
  return STOPS[STOPS.length - 1][1];
};
const TICKS = ['34,230,255', '255,60,207', '182,255,59'];

// The cursor releases this many ticks on its own when the visitor enters the section; after that a click
// releases a new burst. Leaving the section and coming back restores the first allowance.
const FREE_TICKS = 14;
const BURST = 10;

interface Props {
  progress: React.MutableRefObject<number>;
  onExhaust?: () => void; // the free ticks are used up: time to show the "click" hint
  onFeed?: () => void; // the visitor clicked
  onReset?: () => void; // new visit to the section
}

const BlackHole: React.FC<Props> = ({ progress, onExhaust, onFeed, onReset }) => {
  const cb = useRef({ onExhaust, onFeed, onReset });
  cb.current = { onExhaust, onFeed, onReset };
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const calm = reducedMotion();
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, narrow = false;
    let cx = 0, cy = 0, base = 0;
    let time = 0;
    let last = performance.now();
    let flare = 0; // 1 right after the final burst
    let flared = false;
    let pulse = 0; // photon ring jolt when a tick is swallowed
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let lastTick = 0;
    let budget = FREE_TICKS;
    const pin = canvas.parentElement;

    const stars = Array.from({ length: coarse ? 130 : 280 }, () => ({
      a: Math.random() * TAU,
      d: Math.pow(Math.random(), 0.75),
      ph: Math.random() * TAU,
      s: 0.5 + Math.random() * 1.3,
    }));
    const parts = Array.from({ length: coarse ? 520 : 1000 }, () => {
      const r = R_IN + (4.9 - R_IN) * Math.pow(Math.random(), 1.7);
      return { r, th: Math.random() * TAU, w: 0.0011 * Math.pow(R_IN / r, 1.5) * (0.9 + Math.random() * 0.2), s: 1 + Math.random() * 1.7 };
    }).sort((a, b) => a.r - b.r);
    const Q = 14;
    const bucketColor = Array.from({ length: Q }, (_, i) => ramp(i / (Q - 1)));
    const RING_N = 110;
    const ringCol = Array.from({ length: RING_N }, (_, i) => ramp(i / RING_N));
    // The disk is painted once into two half-resolution buffers (back arc, front half) and scaled up with
    // smoothing: that blends the 110 overlapping rings into a continuous glow, with no visible striping.
    let backBuf: HTMLCanvasElement | null = null;
    let frontBuf: HTMLCanvasElement | null = null;
    let diskKey = '';
    const infall: { r: number; a: number; c: string; hist: [number, number][] }[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.1 : 1.25);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      narrow = w <= 900;
      cx = narrow ? w * 0.5 : w * 0.765;
      cy = narrow ? h * 0.25 : h * 0.5;
      backBuf = document.createElement('canvas');
      frontBuf = document.createElement('canvas');
      for (const b of [backBuf, frontBuf]) {
        b.width = Math.max(1, Math.ceil(canvas.width / 2));
        b.height = Math.max(1, Math.ceil(canvas.height / 2));
      }
      diskKey = '';
      base = narrow ? w * 0.1 : Math.min(w, h) * 0.118;
    };

    const draw = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const p = clamp(progress.current);
      const grow = smooth(p);
      time += dt * (1 + 1.7 * grow);
      flare = Math.max(0, flare - dt / 1400);
      pulse = Math.max(0, pulse - dt / 500);
      if (p > 0.9 && !flared) { flared = true; flare = 1; }
      if (p < 0.78) flared = false;

      const R = base * (0.74 + 0.36 * grow);
      const RE = R * 1.85;
      const power = 0.5 + 0.5 * grow;
      const tilt = Math.cos(1.28 + (mouse.y - 0.5) * 0.2); // flattening of the disk (smaller = more edge-on)
      const roll = (mouse.x - 0.5) * 0.2;
      const cr = Math.cos(roll), sr = Math.sin(roll);
      const ox = (mouse.x - 0.5) * 18;
      const oy = (mouse.y - 0.5) * 10;
      const hx = cx + ox;
      const hy = cy + oy;
      const rotate = (x: number, y: number): [number, number] => [hx + x * cr - y * sr, hy + x * sr + y * cr];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // stars, bent by the lens (primary image: r' = (r + sqrt(r^2 + 4 RE^2)) / 2)
      const D = Math.max(w, h) * 0.62;
      ctx.globalCompositeOperation = 'lighter';
      for (const s of stars) {
        const ang = s.a + now * 0.00001;
        const sx = Math.cos(ang) * s.d * D;
        const sy = Math.sin(ang) * s.d * D * (h / Math.max(w, h)) * 1.3;
        const r = Math.hypot(sx, sy) || 1;
        const r2 = 0.5 * (r + Math.sqrt(r * r + 4 * RE * RE));
        const x = hx + (sx / r) * r2;
        const y = hy + (sy / r) * r2;
        if (x < 0 || x > w || y < 0 || y > h || r2 < R * 1.04) continue;
        const tw = 0.55 + 0.45 * Math.sin(now * 0.0015 + s.ph);
        ctx.fillStyle = `rgba(220,230,255,${(0.2 + 0.5 * tw) * (0.35 + 0.65 * Math.min(1, r2 / (RE * 2.4)))})`;
        ctx.fillRect(x, y, s.s, s.s);
      }

      // wide glow around the hole. It is an ellipse squeezed so that it reaches zero before the top and bottom
      // edges of the canvas; a circle that gets cut by the edge shows up as a straight line.
      {
        const gR = R * 5.4;
        const sy = Math.min(1, (Math.min(hy, h - hy) * 0.96) / gR);
        ctx.save();
        ctx.translate(hx, hy);
        ctx.scale(1, sy);
        const g = ctx.createRadialGradient(0, 0, R * 0.9, 0, 0, gR);
        g.addColorStop(0, `rgba(139,92,246,${0.22 * power})`);
        g.addColorStop(0.12, `rgba(120,100,250,${0.15 * power})`);
        g.addColorStop(0.3, `rgba(70,160,255,${0.075 * power})`);
        g.addColorStop(0.55, `rgba(34,230,255,${0.028 * power})`);
        g.addColorStop(0.8, `rgba(34,230,255,${0.007 * power})`);
        g.addColorStop(1, 'rgba(6,4,13,0)');
        ctx.fillStyle = g;
        ctx.fillRect(-gR, -gR, gR * 2, gR * 2);
        ctx.restore();
      }

      // The disk itself: concentric ellipses from white-hot to magenta, brighter on the approaching side.
      // Front half = the ellipse's lower half; back half = the same orbits lensed into an arc over the hole.
      const key = `${Math.round(R * 2)}|${Math.round(power * 50)}|${Math.round(tilt * 250)}|${w}|${h}|${dpr}`;
      if (key !== diskKey && backBuf && frontBuf) {
        diskKey = key;
        const step = (4.9 - R_IN) / RING_N;
        for (const front of [false, true]) {
          const c2 = (front ? frontBuf : backBuf).getContext('2d');
          if (!c2) continue;
          c2.setTransform(dpr * 0.5, 0, 0, dpr * 0.5, 0, 0);
          c2.clearRect(0, 0, w, h);
          c2.save();
          c2.translate(cx, cy);
          c2.globalCompositeOperation = 'lighter';
          c2.lineCap = 'round'; // ring ends blend into each other instead of stacking into a ragged edge
          for (let i = 0; i < RING_N; i++) {
            const r = R_IN + i * step;
            const rr = r * R;
            const [cr0, cg0, cb0] = ringCol[i];
            const a = (1 - 0.8 * (i / RING_N)) * 0.34 * power;
            const gr = c2.createLinearGradient(-rr, 0, rr, 0);
            gr.addColorStop(0, `rgba(${cr0 | 0},${cg0 | 0},${cb0 | 0},${a * 0.22})`);
            gr.addColorStop(0.5, `rgba(${cr0 | 0},${cg0 | 0},${cb0 | 0},${a * 0.55})`);
            gr.addColorStop(1, `rgba(${cr0 | 0},${cg0 | 0},${cb0 | 0},${Math.min(1, a * 1.25)})`);
            c2.strokeStyle = gr;
            c2.lineWidth = step * R * 2.1 + 1;
            c2.beginPath();
            if (front) c2.ellipse(0, 0, rr, rr * tilt, 0, 0, Math.PI);
            else c2.ellipse(0, 0, rr, R * (1.1 + (r - R_IN) * 0.3), 0, Math.PI, TAU);
            c2.stroke();
          }
          c2.restore();
        }
      }
      const blit = (buf: HTMLCanvasElement | null) => {
        if (!buf) return;
        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(roll); // the cursor rolls the disk without repainting it
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'low'; // 'high' is far slower, and a 2x bilinear upscale is already smooth
        // only the part of the buffer where the disk lives (about 10R wide and 5R tall around the hole)
        const ry = Math.min(cy, R * 2.6);
        const sx = Math.max(0, cx - R * 5.2);
        const sy = Math.max(0, cy - ry);
        const sw = Math.min(w - sx, R * 10.4);
        const sh = Math.min(h - sy, ry + R * 2.6);
        const s = buf.width / w;
        ctx.drawImage(buf, sx * s, sy * s, sw * s, sh * s, sx - cx, sy - cy, sw, sh);
        ctx.restore();
      };

      const drawParticles = (front: boolean) => {
        let cur = -1;
        for (const q of parts) {
          const th = q.th + q.w * time;
          const sn = Math.sin(th);
          if (front ? sn < 0 : sn >= 0) continue;
          const cs = Math.cos(th);
          const qn = (q.r - R_IN) / (4.9 - R_IN);
          const bi = Math.min(Q - 1, Math.floor(qn * Q));
          if (bi !== cur) {
            cur = bi;
            const c = bucketColor[bi];
            ctx.fillStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
          }
          const dop = 0.3 + 0.7 * (0.5 + 0.5 * cs); // the approaching side is brighter
          const a = (0.95 - 0.6 * qn) * dop * power;
          // back half is lensed over the top of the hole, front half passes in front
          const lensH = R * (1.1 + (q.r - R_IN) * 0.3);
          const px = q.r * cs * R;
          const py = front ? q.r * sn * tilt * R : -lensH * Math.abs(sn);
          const [x, y] = rotate(px, py);
          ctx.globalAlpha = Math.min(1, a);
          ctx.fillRect(x, y, q.s, q.s);
          // short motion streak behind it
          const t2 = th - q.w * 70;
          const px2 = q.r * Math.cos(t2) * R;
          const py2 = front ? q.r * Math.sin(t2) * tilt * R : -lensH * Math.abs(Math.sin(t2));
          const [x2, y2] = rotate(px2, py2);
          ctx.globalAlpha = Math.min(1, a * 0.45);
          ctx.fillRect(x2, y2, q.s * 0.8, q.s * 0.8);
        }
        ctx.globalAlpha = 1;
      };
      blit(backBuf);
      drawParticles(false); // back of the disk, lensed above the hole

      // event horizon with a dark halo that swallows the glow
      ctx.globalCompositeOperation = 'source-over';
      const halo = ctx.createRadialGradient(hx, hy, R * 0.98, hx, hy, R * 1.5);
      halo.addColorStop(0, 'rgba(0,0,0,0.95)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(hx, hy, R * 1.5, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(hx, hy, R, 0, TAU);
      ctx.fill();

      // photon ring: a few strokes of falling width and rising glow
      ctx.globalCompositeOperation = 'lighter';
      const boost = 1 + pulse * 0.8 + flare * 1.2;
      for (const [rr, lw, al, col] of [
        [1.0, 0.045, 0.95, '255,255,255'],
        [1.03, 0.09, 0.4, '140,245,255'],
        [1.08, 0.2, 0.14, '34,230,255'],
        [1.2, 0.5, 0.05, '139,92,246'],
      ] as [number, number, number, string][]) {
        ctx.strokeStyle = `rgba(${col},${Math.min(1, al * boost * (0.6 + 0.4 * power))})`;
        ctx.lineWidth = R * lw;
        ctx.beginPath();
        ctx.arc(hx, hy, R * rr + R * lw * 0.5, 0, TAU);
        ctx.stroke();
      }

      blit(frontBuf);
      drawParticles(true); // the near side crosses in front of the hole

      // market ticks falling in
      for (let n = infall.length - 1; n >= 0; n--) {
        const t = infall[n];
        t.a += dt * 0.0016 * (R * 3.2) / t.r;
        t.r -= dt * (0.05 + (R * 2.4) / t.r * 0.05);
        if (t.r <= R * 1.03) { infall.splice(n, 1); pulse = 1; continue; }
        const x = hx + Math.cos(t.a) * t.r;
        const y = hy + Math.sin(t.a) * t.r * (0.55 + 0.45 * tilt * 2);
        t.hist.unshift([x, y]);
        if (t.hist.length > 7) t.hist.pop();
        t.hist.forEach(([hx2, hy2], i) => {
          ctx.fillStyle = `rgba(${t.c},${0.85 - i * 0.12})`;
          ctx.fillRect(hx2 - 1.5, hy2 - 1.5, 3, 3);
        });
      }

      // final burst
      if (flare > 0) {
        const rr = R * (1.1 + (1 - flare) * 5);
        ctx.strokeStyle = `rgba(140,245,255,${flare * 0.5})`;
        ctx.lineWidth = 2 + flare * 6;
        ctx.beginPath();
        ctx.ellipse(hx, hy, rr, rr * 0.7, 0, 0, TAU);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const spawnTick = (x: number, y: number, jitter = 0) => {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= base * 2.2 || infall.length >= 64) return false;
      infall.push({
        r: dist + (Math.random() - 0.5) * jitter,
        a: Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * jitter * 0.012,
        c: TICKS[Math.floor(Math.random() * TICKS.length)],
        hist: [],
      });
      return true;
    };
    const local = (e: PointerEvent | MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !visible) return;
      const { x, y, w: cw, h: ch } = local(e);
      if (x < 0 || y < 0 || x > cw || y > ch) return;
      mouse.tx = x / cw;
      mouse.ty = y / ch;
      const now = performance.now();
      // the first ticks are free; once they are used up only a click feeds the hole
      if (budget > 0 && now - lastTick > 70 && spawnTick(x, y)) {
        lastTick = now;
        budget--;
        if (budget === 0) {
          cb.current.onExhaust?.();
          if (pin) pin.style.cursor = 'pointer';
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!visible) return;
      // clicks on the menu, buttons and links are not feeding the hole
      if ((e.target as HTMLElement).closest?.('a, button, input, select, textarea, nav, [role="button"]')) return;
      const { x, y, w: cw, h: ch } = local(e);
      if (x < 0 || y < 0 || x > cw || y > ch) return;
      mouse.tx = x / cw;
      mouse.ty = y / ch;
      for (let k = 0; k < BURST; k++) spawnTick(x, y, 36);
      cb.current.onFeed?.();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([e]) => {
        const was = visible;
        visible = e.isIntersecting;
        if (visible && !was) {
          budget = FREE_TICKS; // a new visit: the first ticks are free again
          if (pin) pin.style.cursor = '';
          cb.current.onReset?.();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    if (calm) {
      progress.current = Math.max(progress.current, 0.6);
      draw(performance.now());
    } else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
      if (pin) pin.style.cursor = '';
    };
  }, [progress]);

  return <canvas ref={ref} className="bh" aria-hidden="true" />;
};

export default BlackHole;
