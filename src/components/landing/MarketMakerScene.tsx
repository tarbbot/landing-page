import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SceneCanvas, SceneDraw, CY, MG, LM, DIM, clamp, lerp, ease } from './scene';

// Market making: the bot rests quotes either side of the mid price, takers lift them, each fill
// books half the spread and moves inventory, and the quotes lean to pull inventory back to flat.
const ROWS = 6;
const RH = 19;
const ASK0 = 168;
const BID0 = 192;
const BX = 84;
const BW = 150;

const make = (): SceneDraw => {
  let clock = 0;
  const sizes = Array.from({ length: 2 * ROWS }, (_, i) => 0.3 + 0.1 * (i % ROWS));
  const goal = sizes.slice();
  const flash = new Array(2 * ROWS).fill(0);
  let mid = 64250;
  const hist: { p: number; mark?: 'buy' | 'sell' }[] = Array.from({ length: 56 }, () => ({ p: mid }));
  let histClock = 0;
  let inv = 0;
  let captured = 0;
  let fills = 0;
  let nextTaker = 900;
  let nextGoal = 0;
  const takers: { side: 'ask' | 'bid'; t: number; qty: number }[] = [];
  const pops: { x: number; y: number; t: number; s: string; c: string }[] = [];
  let seeded = false;

  return (ctx, now, dt, ui) => {
    const { text, L, fmt } = ui;
    clock += dt;

    // book depth wobbles around, deeper levels hold more size
    nextGoal -= dt;
    if (nextGoal <= 0) {
      nextGoal = 260;
      for (let i = 0; i < goal.length; i++) goal[i] = clamp(0.2 + 0.12 * (i % ROWS) + Math.random() * 0.3);
    }
    for (let i = 0; i < sizes.length; i++) {
      sizes[i] += (goal[i] - sizes[i]) * Math.min(1, dt / 420);
      flash[i] = Math.max(0, flash[i] - dt / 600);
    }

    // mid price and its history
    histClock += dt;
    if (histClock > 320) {
      histClock = 0;
      mid += Math.round((Math.random() - 0.5) * 3 - (mid - 64250) * 0.01);
      hist.push({ p: mid });
      hist.shift();
    }

    // takers hit the quotes; inventory leans the odds toward the side that rebalances
    nextTaker -= dt;
    if (nextTaker <= 0) {
      nextTaker = 700 + Math.random() * 900;
      const hitAsk = Math.random() < 0.5 - inv * 0.55;
      takers.push({ side: hitAsk ? 'ask' : 'bid', t: 0, qty: 0.2 + Math.random() * 0.9 });
    }
    inv *= Math.pow(0.97, dt / 100);

    // book (left)
    text('ASK', 20, 40, 10.5, MG, 'left', 700);
    text('BID', 20, 336, 10.5, CY, 'left', 700);
    const band = 0.5 + 0.5 * Math.sin(clock * 0.004);
    ctx.fillStyle = `rgba(182,255,59,${0.07 + band * 0.05})`;
    ctx.fillRect(20, ASK0, 232, BID0 - ASK0);
    ctx.strokeStyle = `rgba(182,255,59,${0.4 + band * 0.3})`;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(252, 180);
    ctx.stroke();
    ctx.setLineDash([]);
    text(fmt(mid, 0), 136, 184 + (ui.tm - 1) * 2, 11, LM, 'center', 700, 0.95);

    for (let side = 0; side < 2; side++) {
      const ask = side === 0;
      for (let i = 0; i < ROWS; i++) {
        const idx = side * ROWS + i;
        const top = ask ? ASK0 - (i + 1) * RH + 2 : BID0 + i * RH + 2;
        const c = ask ? MG : CY;
        const w = 22 + sizes[idx] * BW * (1 - flash[idx] * (i === 0 ? 0.5 : 0));
        const mine = i === 0;
        // depth bar fades toward the book edge
        ctx.fillStyle = c;
        ctx.globalAlpha = mine ? 0.9 : 0.34 - i * 0.03;
        ctx.fillRect(BX, top, w, 15);
        ctx.globalAlpha = 1;
        if (flash[idx] > 0) {
          ctx.fillStyle = `rgba(255,255,255,${flash[idx] * 0.7})`;
          ctx.fillRect(BX, top, w, 15);
        }
        if (mine) {
          ctx.strokeStyle = LM;
          ctx.lineWidth = 1.6;
          ctx.strokeRect(BX - 2.5, top - 2, w + 5, 19);
          text('BOT', 250, top + 11.5, 9, LM, 'right', 700);
        }
        const price = ask ? mid + 1 + i : mid - 1 - i;
        text(fmt(price, 0), 20, top + 11.5, 9.5, DIM, 'left', 500, 0.9);
      }
    }

    // takers flying into the quotes
    for (let k = takers.length - 1; k >= 0; k--) {
      const tk = takers[k];
      tk.t += dt;
      const p = clamp(tk.t / 380);
      const ask = tk.side === 'ask';
      const idx = (ask ? 0 : ROWS) + 0;
      const top = ask ? ASK0 - RH + 2 : BID0 + 2;
      const endX = BX + 22 + sizes[idx] * BW;
      const x = lerp(262, endX, ease(p));
      const y = top + 7.5;
      for (let g = 6; g >= 0; g--) {
        const gx = x + g * 7 * (1 - p * 0.3);
        ctx.fillStyle = `rgba(255,255,255,${0.1 * (7 - g) * (1 - p * 0.5)})`;
        ctx.fillRect(gx - 2, y - 2, 4, 4);
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 3.6, 0, Math.PI * 2);
      ctx.fill();
      if (p >= 1) {
        takers.splice(k, 1);
        flash[idx] = 1;
        const q = tk.qty;
        captured += q;
        fills++;
        inv += (ask ? -1 : 1) * q * 0.16;
        inv = clamp(inv, -1, 1);
        goal[idx] = Math.max(0.15, goal[idx] - 0.2);
        hist[hist.length - 1].mark = ask ? 'sell' : 'buy';
        pops.push({ x: endX + 8, y: y + 3, t: 0, s: `+${fmt(q)}`, c: LM });
      }
    }
    for (let k = pops.length - 1; k >= 0; k--) {
      const pp = pops[k];
      pp.t += dt;
      if (pp.t > 1100) {
        pops.splice(k, 1);
        continue;
      }
      text(pp.s, pp.x, pp.y - pp.t * 0.02, 10.5, pp.c, 'left', 700, 1 - pp.t / 1100);
    }

    // mid-price chart with the bot's fills (right, top)
    const X0 = 296;
    const X1 = 462;
    text('BTC/USDT', X0, 40, 10.5, DIM, 'left', 600);
    text(fmt(mid, 0), X1, 40, 10.5, '#fff', 'right', 700);
    const lo = Math.min(...hist.map((h) => h.p)) - 2;
    const hi = Math.max(...hist.map((h) => h.p)) + 2;
    const cy = (p: number) => 138 - ((p - lo) / (hi - lo)) * 78;
    const cx = (i: number) => X0 + (i / (hist.length - 1)) * (X1 - X0);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    for (let g = 0; g < 3; g++) {
      ctx.beginPath();
      ctx.moveTo(X0, 60 + g * 39);
      ctx.lineTo(X1, 60 + g * 39);
      ctx.stroke();
    }
    ctx.beginPath();
    hist.forEach((h, i) => (i ? ctx.lineTo(cx(i), cy(h.p)) : ctx.moveTo(cx(i), cy(h.p))));
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.6;
    ctx.stroke();
    hist.forEach((h, i) => {
      if (!h.mark) return;
      const buy = h.mark === 'buy';
      const x = cx(i);
      const y = cy(h.p) + (buy ? 9 : -9);
      ctx.fillStyle = buy ? LM : MG;
      ctx.beginPath();
      if (buy) {
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x - 5, y + 4);
        ctx.lineTo(x + 5, y + 4);
      } else {
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x - 5, y - 4);
        ctx.lineTo(x + 5, y - 4);
      }
      ctx.fill();
    });

    // inventory meter
    text(L('mm.inventory'), X0, 186, 10, DIM, 'left', 600);
    const mx = (X0 + X1) / 2;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(X0, 196, X1 - X0, 8);
    const kx = mx + inv * ((X1 - X0) / 2 - 4);
    ctx.fillStyle = inv >= 0 ? CY : MG;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(Math.min(mx, kx), 196, Math.abs(kx - mx), 8);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.fillRect(kx - 2, 192, 4, 16);
    ctx.fillRect(mx - 0.5, 190, 1, 20);

    // spread captured
    text(L('spreadCaptured'), X0, 244, 10, DIM, 'left', 600);
    text(`+${fmt(captured)} USDT`, X0, 272, 18, LM, 'left', 700);
    text(`${L('mm.fills')}  ${fills}`, X0, 300, 11, '#fff', 'left', 600, 0.85);
    ctx.fillStyle = 'rgba(182,255,59,0.9)';
    ctx.fillRect(X0, 312, clamp((fills % 12) / 12) * (X1 - X0), 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(X0, 312 + 2, X1 - X0, 1);

    if (!seeded) {
      seeded = true;
      for (let i = 0; i < 3; i++) hist[hist.length - 1 - i * 8].mark = i % 2 ? 'sell' : 'buy';
    }
  };
};

const MarketMakerScene: React.FC<{ active?: boolean }> = ({ active }) => {
  const { t } = useLanguage();
  return <SceneCanvas make={make} active={active} label={t('landing.diagrams.altMarketMaker')} />;
};
export default MarketMakerScene;
