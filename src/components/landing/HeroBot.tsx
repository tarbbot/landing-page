import React, { useEffect, useRef } from 'react';
import { reducedMotion } from './fx';

// Hero visual: a streaming candle chart where the bot drops BUY / SELL marks, with its equity
// curve building underneath. The feed is generated in the browser and labelled as simulated.
const W = 480;
const H = 360;
const PITCH = 14;
const VISIBLE = 32;
const STEP_MS = 1000;
const CY = '34,230,255';
const MG = '255,60,207';
const LM = '182,255,59';

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
  sig?: 'buy' | 'sell';
  born: number;
}

interface HeroBotUi {
  simulated: string;
  last: string;
  equity: string;
  buy: string;
  sell: string;
  scanning: string;
}

const HeroBot: React.FC<{ label: string; ui: HeroBotUi }> = ({ label, ui }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const calm = reducedMotion();
    let raf = 0;
    let visible = true;
    let scale = 1;
    let price = 100;
    let drift = 0;
    let eq = 0;
    let lastStep = performance.now();
    let sinceSig = 0;
    let lo = 90;
    let hi = 110;
    const candles: Candle[] = [];
    const equity: number[] = [];

    const next = (now: number): Candle => {
      const o = price;
      drift = drift * 0.85 + (Math.random() - 0.5) * 0.9;
      price = Math.max(60, price + drift);
      return { o, h: Math.max(o, price) + Math.random() * 0.6, l: Math.min(o, price) - Math.random() * 0.6, c: price, born: now };
    };
    const tick = (c: Candle) => {
      c.c = price;
      c.h = Math.max(c.h, price);
      c.l = Math.min(c.l, price);
    };

    // seed so the first frame is already a full chart
    for (let i = 0; i < VISIBLE + 4; i++) {
      const c = next(0);
      sinceSig++;
      if (sinceSig > 4 && Math.random() < 0.4) {
        c.sig = c.c >= c.o ? 'buy' : 'sell';
        sinceSig = 0;
      }
      candles.push(c);
      eq += (Math.random() - 0.38) * 0.7;
      equity.push(eq);
    }

    const resize = () => {
      const w = canvas.clientWidth || W;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round((w * H * dpr) / W);
      scale = (w * dpr) / W;
    };

    const step = (now: number) => {
      lastStep = now;
      candles.push(next(now));
      if (candles.length > VISIBLE + 6) candles.shift();
      sinceSig++;
      const last = candles[candles.length - 1];
      if (sinceSig > 4 && Math.random() < 0.45) {
        last.sig = last.c >= last.o ? 'buy' : 'sell';
        sinceSig = 0;
        eq += last.sig === 'sell' ? 0.3 + Math.random() * 0.9 : -0.15;
      } else {
        eq += (Math.random() - 0.4) * 0.5;
      }
      equity.push(eq);
      if (equity.length > 60) equity.shift();
    };

    const draw = (now: number) => {
      const p = Math.min(1, (now - lastStep) / STEP_MS);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = '500 11.5px "JetBrains Mono", monospace';

      const cur = candles[candles.length - 1];
      if (!calm) {
        price += (Math.random() - 0.5) * 0.5;
        tick(cur);
      }

      // auto-scale, eased so the chart glides instead of jumping
      const view = candles.slice(-VISIBLE);
      const tl = Math.min(...view.map((c) => c.l));
      const th = Math.max(...view.map((c) => c.h));
      lo += (tl - 2 - lo) * 0.08;
      hi += (th + 2 - hi) * 0.08;
      const top = 44;
      const bot = 226;
      const y = (v: number) => bot - ((v - lo) / (hi - lo)) * (bot - top);

      // grid + labels
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      for (let i = 0; i <= 4; i++) {
        const gy = top + ((bot - top) / 4) * i;
        ctx.beginPath();
        ctx.moveTo(24, gy);
        ctx.lineTo(W - 24, gy);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${CY},0.9)`;
      ctx.fillText(label, 24, 30);
      ctx.fillStyle = 'rgba(169,166,198,0.9)';
      ctx.fillText(ui.simulated, W - 24 - ctx.measureText(ui.simulated).width, 30);

      // candles
      const xAt = (k: number) => W - 44 - (k + p) * PITCH;
      const n = candles.length;
      for (let i = 0; i < n; i++) {
        const c = candles[i];
        const x = xAt(n - 1 - i);
        if (x < 22 || x > W - 20) continue;
        const up = c.c >= c.o;
        const col = up ? CY : MG;
        const edge = Math.min(1, (x - 22) / 40);
        ctx.globalAlpha = edge;
        ctx.strokeStyle = `rgb(${col})`;
        ctx.fillStyle = `rgba(${col},${up ? 0.85 : 0.85})`;
        ctx.beginPath();
        ctx.moveTo(x, y(c.h));
        ctx.lineTo(x, y(c.l));
        ctx.stroke();
        const bt = y(Math.max(c.o, c.c));
        ctx.fillRect(x - 4, bt, 8, Math.max(2, y(Math.min(c.o, c.c)) - bt));

        if (c.sig) {
          const buy = c.sig === 'buy';
          const my = buy ? y(c.l) + 14 : y(c.h) - 14;
          const age = now - c.born;
          const mc = buy ? LM : MG;
          if (age < 900) {
            ctx.strokeStyle = `rgba(${mc},${1 - age / 900})`;
            ctx.beginPath();
            ctx.arc(x, my, 5 + (age / 900) * 14, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = `rgb(${mc})`;
          ctx.beginPath();
          if (buy) {
            ctx.moveTo(x, my - 6);
            ctx.lineTo(x - 6, my + 5);
            ctx.lineTo(x + 6, my + 5);
          } else {
            ctx.moveTo(x, my + 6);
            ctx.lineTo(x - 6, my - 5);
            ctx.lineTo(x + 6, my - 5);
          }
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // moving average (bot reference line)
      ctx.strokeStyle = 'rgba(167,139,250,0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let started = false;
      for (let i = 4; i < n; i++) {
        const x = xAt(n - 1 - i);
        if (x < 24 || x > W - 24) continue;
        const ma = (candles[i].c + candles[i - 1].c + candles[i - 2].c + candles[i - 3].c + candles[i - 4].c) / 5;
        if (!started) {
          ctx.moveTo(x, y(ma));
          started = true;
        } else ctx.lineTo(x, y(ma));
      }
      ctx.stroke();

      // last-price line and tag
      const ly = y(cur.c);
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = `rgba(${LM},0.7)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, ly);
      ctx.lineTo(W - 24, ly);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgb(${LM})`;
      const lw = ctx.measureText(ui.last).width + 10;
      ctx.fillRect(W - 24 - lw, ly - 8, lw, 16);
      ctx.fillStyle = '#06040d';
      ctx.fillText(ui.last, W - 24 - lw + 5, ly + 3.5);

      // equity curve
      const eTop = 262;
      const eBot = 326;
      const emin = Math.min(...equity);
      const emax = Math.max(...equity);
      const span = Math.max(1, emax - emin);
      const ex = (i: number) => 24 + (i / (equity.length - 1 || 1)) * (W - 48);
      const ey = (v: number) => eBot - ((v - emin) / span) * (eBot - eTop);
      ctx.fillStyle = 'rgba(169,166,198,0.9)';
      ctx.fillText(ui.equity, 24, 250);
      const g = ctx.createLinearGradient(0, eTop, 0, eBot);
      g.addColorStop(0, `rgba(${LM},0.35)`);
      g.addColorStop(1, `rgba(${LM},0)`);
      ctx.beginPath();
      ctx.moveTo(ex(0), eBot);
      equity.forEach((v, i) => ctx.lineTo(ex(i), ey(v)));
      ctx.lineTo(ex(equity.length - 1), eBot);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = `rgb(${LM})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      equity.forEach((v, i) => (i ? ctx.lineTo(ex(i), ey(v)) : ctx.moveTo(ex(i), ey(v))));
      ctx.stroke();
      const tx = ex(equity.length - 1);
      const tyy = ey(equity[equity.length - 1]);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(tx, tyy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // bottom log
      const sig = [...candles].reverse().find((c) => c.sig);
      ctx.fillStyle = `rgb(${sig?.sig === 'sell' ? MG : LM})`;
      ctx.fillText(sig ? (sig.sig === 'buy' ? ui.buy : ui.sell) : ui.scanning, 24, 348);
    };

    const loop = (now: number) => {
      if (visible) {
        if (now - lastStep >= STEP_MS) step(now);
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    if (calm) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [label, ui.simulated, ui.last, ui.equity, ui.buy, ui.sell, ui.scanning]);

  return <canvas ref={ref} className="hero-chart" role="img" aria-label={label} />;
};

export default HeroBot;
