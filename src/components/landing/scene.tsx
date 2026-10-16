import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { reducedMotion } from './fx';

// Shared shell for the strategy canvases: a 480x360 design space scaled into the panel,
// paused when off screen or inactive, and one still frame under reduced motion.
export const W = 480;
export const H = 360;
export const CY = '#22e6ff';
export const MG = '#ff3ccf';
export const LM = '#b6ff3b';
export const VI = '#8b5cf6';
export const DIM = '#a9a6c6';
export const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export interface Ui {
  tm: number;
  L: (k: string) => string;
  fmt: (v: number, d?: number) => string;
  text: (s: string, x: number, y: number, size: number, color: string, align?: CanvasTextAlign, weight?: number, alpha?: number) => void;
}
export type SceneDraw = (ctx: CanvasRenderingContext2D, now: number, dt: number, ui: Ui) => void;

export const SceneCanvas: React.FC<{ make: () => SceneDraw; label: string; active?: boolean }> = ({ make, label, active = true }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { t, language } = useLanguage();
  const live = useRef({ active, t, language });
  live.current = { active, t, language };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const calm = reducedMotion();
    const scene = make();
    let raf = 0;
    let visible = true;
    let cw = W;
    let ch = H;
    let dpr = 1;
    let last = performance.now();

    const frame = (now: number, dt: number) => {
      const { t: tr, language: lang } = live.current;
      const sc = Math.min(cw / W, ch / H);
      const tm = clamp(0.9 / sc, 1, 1.16);
      ctx.setTransform(dpr * sc, 0, 0, dpr * sc, (dpr * (cw - W * sc)) / 2, (dpr * (ch - H * sc)) / 2);
      ctx.clearRect(-200, -200, W + 400, H + 400);
      ctx.lineJoin = 'round';
      const ui: Ui = {
        tm,
        L: (k) => tr(`landing.diagrams.${k}`),
        fmt: (v, d = 2) => v.toLocaleString(lang, { minimumFractionDigits: d, maximumFractionDigits: d }),
        text: (s, x, y, size, color, align = 'center', weight = 600, alpha = 1) => {
          ctx.font = `${weight} ${size * tm}px "JetBrains Mono", monospace`;
          ctx.textAlign = align;
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fillText(s, x, y);
          ctx.globalAlpha = 1;
        },
      };
      scene(ctx, now, dt, ui);
    };
    const resize = () => {
      cw = canvas.clientWidth || W;
      ch = canvas.clientHeight || H;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    };
    const loop = (now: number) => {
      if (live.current.active && visible && !document.hidden) frame(now, Math.min(48, now - last));
      last = now;
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    if (calm) {
      let n = 0;
      for (let i = 0; i < 160; i++) frame((n += 40), 40);
      frame(n + 40, 0);
    } else raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="dg-canvas" role="img" aria-label={label} />;
};
