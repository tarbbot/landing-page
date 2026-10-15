import React, { useEffect, useRef } from 'react';

const CELL = 56;
const COLORS = ['34,230,255', '255,60,207', '139,92,246', '182,255,59'];

interface Tick {
  x: number;
  y: number;
  vy: number;
  len: number;
  c: string;
  a: number;
  ph: number;
}

// Fixed canvas: a market-grid that bends around the cursor, a scan beam that lights
// intersections, and order-flow ticks rising with trails. One rAF loop, paused when hidden.
const CyberBackground: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let scrollY = window.scrollY;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let ticks: Tick[] = [];
    const t0 = performance.now();

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(36, Math.min(110, Math.round(w / 16)));
      ticks = Array.from({ length: n }, () => spawn(false));
    };

    const warp = (x: number, y: number): [number, number, number] => {
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const inf = Math.exp(-d2 / (2 * 170 * 170));
      if (inf < 0.002) return [x, y, 0];
      const d = Math.sqrt(d2) || 1;
      return [x + (dx / d) * inf * 26, y + (dy / d) * inf * 26, inf];
    };

    const draw = (now: number) => {
      const t = now - t0;
      const ignite = Math.min(1, t / 2200);
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, w, h);

      const off = (-scrollY * 0.18) % CELL;
      const base = new Path2D();
      const hot = new Path2D();
      const STEP = 14;

      for (let x = 0; x <= w + CELL; x += CELL) {
        let [px, py] = warp(x, 0);
        base.moveTo(px, py);
        for (let y = STEP; y <= h + STEP; y += STEP) {
          const [qx, qy, inf] = warp(x, y);
          base.lineTo(qx, qy);
          if (inf > 0.18) {
            hot.moveTo(px, py);
            hot.lineTo(qx, qy);
          }
          px = qx;
          py = qy;
        }
      }
      for (let y = off; y <= h + CELL; y += CELL) {
        let [px, py] = warp(0, y);
        base.moveTo(px, py);
        for (let x = STEP; x <= w + STEP; x += STEP) {
          const [qx, qy, inf] = warp(x, y);
          base.lineTo(qx, qy);
          if (inf > 0.18) {
            hot.moveTo(px, py);
            hot.lineTo(qx, qy);
          }
          px = qx;
          py = qy;
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(139,92,246,${0.1 * ignite})`;
      ctx.stroke(base);
      ctx.strokeStyle = `rgba(34,230,255,${0.42 * ignite})`;
      ctx.stroke(hot);

      // scan beam lighting the intersections it crosses
      const beamY = ((t * 0.00007) % 1.3) * (h + 160) - 80;
      for (let gx = 0; gx <= w; gx += CELL) {
        for (let gy = off; gy <= h; gy += CELL) {
          const dd = Math.abs(gy - beamY);
          if (dd > 90) continue;
          const [wx, wy] = warp(gx, gy);
          ctx.fillStyle = `rgba(34,230,255,${(1 - dd / 90) * 0.85 * ignite})`;
          ctx.fillRect(wx - 1.5, wy - 1.5, 3, 3);
        }
      }

      // order-flow ticks
      for (let i = 0; i < ticks.length; i++) {
        const p = ticks[i];
        p.y -= p.vy * (reduce ? 0 : 1);
        const x = p.x + Math.sin(t * 0.0006 + p.ph) * 6;
        if (p.y + p.len < 0) ticks[i] = spawn(true);
        const fade = Math.min(1, (h - p.y) / 120) * Math.min(1, (p.y + p.len) / 140);
        const al = p.a * Math.max(0, fade) * ignite;
        const g = ctx.createLinearGradient(x, p.y, x, p.y + p.len);
        g.addColorStop(0, `rgba(${p.c},${al})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, p.y);
        ctx.lineTo(x, p.y + p.len);
        ctx.stroke();
        ctx.fillStyle = `rgba(${p.c},${Math.min(1, al * 1.4)})`;
        ctx.fillRect(x - 1.25, p.y - 1, 2.5, 2.5);
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (mouse.x < -9000) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    if (reduce) draw(t0 + 4000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="zn-bg" aria-hidden="true" />;
};

export default CyberBackground;
