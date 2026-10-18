import React, { useEffect, useRef } from 'react';

const CELL = 56;
const STEP = 14;
const REACH = 420; // grid is only subdivided this far from the cursor
const MAX_SPEED = 26; // px per frame at 60 fps, about 1,500 px/s
const GLOW_BANDS = 10; // glow steps from the grid colour (edge of the well) to cyan (centre)
const COLORS = ['34,230,255', '255,60,207', '139,92,246', '182,255,59'];

// Set by the landing page: the RGB the grid should drift toward (one hue per chapter).
export const tint = { c: '139,92,246' };

// Set by the black hole each frame (screen px): a super-massive object the grid must bend around.
// s is 1 while the hole is on screen and 0 otherwise; the grid eases toward it.
export const mass = { x: 0, y: 0, r: 0, s: 0 };
const MASS_GLOW = 8;

interface Tick {
  x: number;
  y: number;
  vy: number;
  len: number;
  c: string;
  a: number;
  ph: number;
}

// Fixed canvas: a market-grid that falls into a gravity well around the cursor, a scan beam that lights
// intersections, and order-flow ticks rising with trails.
// Mobile notes: touch never drives the warp, height-only resizes (URL bar) are ignored so
// ticks are not re-seeded mid-scroll, motion is time-based, and nothing allocates gradients.
const CyberBackground: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let ticks: Tick[] = [];
    const col = [139, 92, 246];
    const t0 = performance.now();
    let ms = 0; // eased mass strength

    const spawn = (fromBottom: boolean): Tick => ({
      x: Math.random() * w,
      y: fromBottom ? h + Math.random() * 80 : Math.random() * h,
      vy: 0.25 + Math.random() * 1.1,
      len: 8 + Math.random() * 46,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: 0.25 + Math.random() * 0.55,
      ph: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      // On touch devices the URL bar changes innerHeight while scrolling: keep the larger canvas.
      if (coarse && w && nw === w && nh <= h) return;
      const widthChanged = nw !== w;
      w = nw;
      h = nh;
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged || !ticks.length) {
        const n = coarse ? 30 : Math.max(36, Math.min(110, Math.round(w / 16)));
        ticks = Array.from({ length: n }, () => spawn(false));
      }
    };

    // returns the displaced point, how deep it is in the cursor well and in the black hole's well
    const warp = (x: number, y: number): [number, number, number, number] => {
      let px = x;
      let py = y;
      let inf = 0;
      let mi = 0;
      if (mouse.x > -9000) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d2 = dx * dx + dy * dy;
        inf = Math.exp(-d2 / (2 * 170 * 170));
        if (inf >= 0.002) {
          const d = Math.sqrt(d2) || 1;
          // Gravity well: points fall toward the cursor (never past it) and sink, like a mass bending
          // spacetime. The pull is strongest close in, so lines bunch up around the centre.
          const pull = Math.min(d * 0.82, inf * 52);
          px -= (dx / d) * pull;
          py += -(dy / d) * pull + inf * 30;
        } else inf = 0;
      }
      if (ms > 0.01) {
        const dx = x - mass.x;
        const dy = y - mass.y;
        const sg = mass.r * 2.7;
        const d2 = dx * dx + dy * dy;
        mi = Math.exp(-d2 / (2 * sg * sg));
        if (mi >= 0.003) {
          const d = Math.sqrt(d2) || 1;
          // a far heavier well: the grid funnels into the hole and bunches up around its rim
          const pull = Math.min(d * 0.94, mi * mass.r * 3.3 * ms);
          px -= (dx / d) * pull;
          py += -(dy / d) * pull + mi * mass.r * 0.45 * ms;
          mi *= ms;
        } else mi = 0;
      }
      return [px, py, inf, mi];
    };

    // One grid line: straight where no well is near, sampled and warped near the cursor or the hole.
    const line = (base: Path2D, hot: Path2D[], mhot: Path2D[], vertical: boolean, c: number, len: number) => {
      const pt = (s: number): [number, number] => (vertical ? [c, s] : [s, c]);
      let s0 = Infinity;
      let s1 = -Infinity;
      let step = STEP;
      if (mouse.x > -9000 && Math.abs(c - (vertical ? mouse.x : mouse.y)) <= REACH) {
        const along = vertical ? mouse.y : mouse.x;
        s0 = Math.min(s0, along - REACH);
        s1 = Math.max(s1, along + REACH);
      }
      if (ms > 0.01) {
        const reach = mass.r * 2.7 * 2.6;
        if (Math.abs(c - (vertical ? mass.x : mass.y)) <= reach) {
          const along = vertical ? mass.y : mass.x;
          s0 = Math.min(s0, along - reach);
          s1 = Math.max(s1, along + reach);
          step = 16;
        }
      }
      if (s0 === Infinity) {
        const [ax, ay] = pt(0);
        const [bx, by] = pt(len);
        base.moveTo(ax, ay);
        base.lineTo(bx, by);
        return;
      }
      s0 = Math.max(0, s0);
      s1 = Math.min(len, s1);
      const [sx, sy] = pt(0);
      base.moveTo(sx, sy);
      let [px, py] = warp(...pt(s0));
      base.lineTo(px, py);
      for (let s = s0 + step; s <= s1 + step; s += step) {
        const [qx, qy, inf, mi] = warp(...pt(Math.min(s, s1)));
        base.lineTo(qx, qy);
        // bucket by how deep in a well this segment is, so the light fades in gradually
        if (hot.length && inf > 0.012) {
          const band = hot[Math.min(GLOW_BANDS - 1, Math.floor(Math.pow(inf, 0.65) * GLOW_BANDS))];
          band.moveTo(px, py);
          band.lineTo(qx, qy);
        }
        if (mi > 0.02) {
          const band = mhot[Math.min(MASS_GLOW - 1, Math.floor(Math.pow(mi, 0.7) * MASS_GLOW))];
          band.moveTo(px, py);
          band.lineTo(qx, qy);
        }
        px = qx;
        py = qy;
      }
      const [ex, ey] = pt(len);
      base.lineTo(ex, ey);
    };

    const draw = (now: number) => {
      const t = now - t0;
      const dt = Math.min(48, now - last);
      last = now;
      const k = dt / 16.667;
      const ignite = Math.min(1, t / 2200);
      const on = !coarse && mouse.tx > -9000;
      if (on) {
        // the well glides toward the cursor but never faster than MAX_SPEED, so a shaken mouse
        // makes it travel to where the cursor stopped instead of snapping around
        const f = 1 - Math.pow(1 - 0.14, k);
        let sx = (mouse.tx - mouse.x) * f;
        let sy = (mouse.ty - mouse.y) * f;
        const sd = Math.hypot(sx, sy);
        const cap = Math.max(0, MAX_SPEED * k); // k can be negative on the first frame
        if (sd > cap && sd > 0) {
          sx *= cap / sd;
          sy *= cap / sd;
        }
        mouse.x += sx;
        mouse.y += sy;
      }
      const scrollY = window.scrollY; // read live: scroll events lag behind on touch devices
      ctx.clearRect(0, 0, w, h);

      const off = (-scrollY * 0.18) % CELL;
      ms += (mass.s - ms) * Math.min(1, 0.06 * k);
      if (ms < 0.004 && mass.s === 0) ms = 0;
      const base = new Path2D();
      const hot = on ? Array.from({ length: GLOW_BANDS }, () => new Path2D()) : [];
      const mhot = ms > 0.01 ? Array.from({ length: MASS_GLOW }, () => new Path2D()) : [];
      for (let x = 0; x <= w + CELL; x += CELL) line(base, hot, mhot, true, x, h);
      for (let y = off; y <= h + CELL; y += CELL) line(base, hot, mhot, false, y, w);
      ctx.lineWidth = 1;
      const goal = tint.c.split(',').map(Number);
      for (let i = 0; i < 3; i++) col[i] += (goal[i] - col[i]) * Math.min(1, 0.04 * k);
      ctx.strokeStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${0.12 * ignite})`;
      ctx.stroke(base);
      // well glow: each band blends the grid colour into cyan and gets brighter and slightly thicker
      // toward the centre, so there is no visible edge where the light starts
      for (let i = 0; i < hot.length; i++) {
        const f = (i + 0.5) / GLOW_BANDS;
        const m = f * f * (3 - 2 * f); // smoothstep
        const r = col[0] + (34 - col[0]) * m;
        const g = col[1] + (230 - col[1]) * m;
        const bl = col[2] + (255 - col[2]) * m;
        ctx.strokeStyle = `rgba(${r | 0},${g | 0},${bl | 0},${(0.04 + 0.5 * f * f) * ignite})`;
        ctx.lineWidth = 1 + f * 0.7;
        ctx.stroke(hot[i]);
      }
      // the black hole's well: violet at the edge, magenta then cyan-white toward the rim
      for (let i = 0; i < mhot.length; i++) {
        const f = (i + 0.5) / MASS_GLOW;
        const m = f * f * (3 - 2 * f);
        const r = col[0] + (210 - col[0]) * m;
        const g = col[1] + (120 - col[1]) * m + 110 * m * m * m;
        const bl = col[2] + (255 - col[2]) * m;
        ctx.strokeStyle = `rgba(${r | 0},${g | 0},${bl | 0},${(0.05 + 0.5 * f * f) * ignite})`;
        ctx.lineWidth = 1 + f * 0.9;
        ctx.stroke(mhot[i]);
      }
      ctx.lineWidth = 1;

      // the singularity: a dark core with a faint accretion ring at the bottom of the well
      if (on) {
        const cx = mouse.x;
        const cy = mouse.y + 30;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 78);
        g.addColorStop(0, `rgba(0,0,0,${0.7 * ignite})`);
        g.addColorStop(0.55, `rgba(6,4,13,${0.32 * ignite})`);
        g.addColorStop(1, 'rgba(6,4,13,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, 78, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(34,230,255,${0.34 * ignite})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 30, 11, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // scan beam lighting the intersections it crosses
      const beamY = ((t * 0.00007) % 1.3) * (h + 160) - 80;
      for (let gy = off; gy <= h; gy += CELL) {
        const dd = Math.abs(gy - beamY);
        if (dd > 90) continue;
        ctx.fillStyle = `rgba(34,230,255,${(1 - dd / 90) * 0.85 * ignite})`;
        for (let gx = 0; gx <= w; gx += CELL) {
          const [wx, wy] = warp(gx, gy);
          ctx.fillRect(wx - 1.5, wy - 1.5, 3, 3);
        }
      }

      // order-flow ticks: three flat rects per tick, no gradients
      for (let i = 0; i < ticks.length; i++) {
        const p = ticks[i];
        p.y -= p.vy * k * (reduce ? 0 : 1);
        if (p.y + p.len < 0) {
          ticks[i] = spawn(true);
          continue;
        }
        const x = p.x + Math.sin(t * 0.0006 + p.ph) * 6;
        const fade = Math.max(0, Math.min(1, (h - p.y) / 120) * Math.min(1, (p.y + p.len) / 140));
        const al = p.a * fade * ignite;
        if (al < 0.01) continue;
        ctx.fillStyle = `rgb(${p.c})`;
        ctx.globalAlpha = al * 0.3;
        ctx.fillRect(x - 0.75, p.y, 1.5, p.len);
        ctx.globalAlpha = al * 0.65;
        ctx.fillRect(x - 0.75, p.y, 1.5, p.len * 0.35);
        ctx.globalAlpha = Math.min(1, al * 1.4);
        ctx.fillRect(x - 1.25, p.y - 1, 2.5, 2.5);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (mouse.x < -9000) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };
    const onLeave = () => {
      mouse.tx = mouse.ty = mouse.x = mouse.y = -9999;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    document.addEventListener('visibilitychange', onVis);
    if (reduce) draw(t0 + 4000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="zn-bg" aria-hidden="true" />;
};

export default CyberBackground;
