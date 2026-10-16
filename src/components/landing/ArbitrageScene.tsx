import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SceneCanvas, SceneDraw, CY, MG, LM, DIM, clamp, lerp, ease } from './scene';

// Simple arbitrage: the same pair on two exchanges drifts apart, the bot buys the cheap venue and
// sells the dear one, and the gap closes. Works in bps around a reference price; all illustrative.
const N = 64;
const BASE = 64250;
const NOTIONAL = 25000;
const BE = 8; // break-even gap in bps after fees
const X0 = 20;
const X1 = 392;

const make = (): SceneDraw => {
  let clock = 0;
  let tick = 0;
  let common = 0;
  let oA = 0;
  let oB = 0;
  let tA = 0;
  let tB = 0;
  const A: number[] = new Array(N).fill(0);
  const B: number[] = new Array(N).fill(0);
  const marks: { i: number; kind: 'open' | 'close' }[] = [];
  let phase: 'quiet' | 'open' | 'exec' | 'close' = 'quiet';
  let pt = 0;
  let wait = 1500;
  let dir = 1; // +1: A dear, B cheap
  let net = 0;
  let trades = 0;
  const pops: { t: number; s: string }[] = [];
  let primed = false;

  const px = (bps: number) => BASE * (1 + bps / 1e4);

  return (ctx, now, dt, ui) => {
    const { text, L, fmt, tm } = ui;
    clock += dt;
    pt += dt;

    // scripted opportunity cycle
    if (phase === 'quiet') {
      wait -= dt;
      if (wait <= 0) {
        phase = 'open';
        pt = 0;
        dir = Math.random() < 0.5 ? 1 : -1;
        const g = 16 + Math.random() * 16;
        tA = (dir * g) / 2;
        tB = (-dir * g) / 2;
      }
    } else if (phase === 'open' && pt > 900) {
      phase = 'exec';
      pt = 0;
    } else if (phase === 'exec' && pt > 1000) {
      phase = 'close';
      pt = 0;
      tA = 0;
      tB = 0;
      const gap = Math.abs(oA - oB);
      const gain = (NOTIONAL * (gap - BE)) / 1e4 + 0.3;
      net += gain;
      trades++;
      pops.push({ t: 0, s: `+${fmt(gain)}` });
      marks.push({ i: N - 1, kind: 'close' });
    } else if (phase === 'close' && pt > 1100) {
      phase = 'quiet';
      pt = 0;
      wait = 1600 + Math.random() * 900;
    }
    if (phase === 'exec' && pt < dt + 1 && !marks.some((m) => m.i === N - 1 && m.kind === 'open')) marks.push({ i: N - 1, kind: 'open' });

    // each venue chases its target; the market is what pulls them back together
    const k = Math.min(1, dt / (phase === 'close' ? 260 : 420));
    oA += (tA - oA) * k;
    oB += (tB - oB) * k;

    tick += dt;
    if (tick > 110) {
      tick = 0;
      common += (Math.random() - 0.5) * 3 - common * 0.06;
      const nA = common + oA + (Math.random() - 0.5) * 1.2;
      const nB = common + oB + (Math.random() - 0.5) * 1.2;
      A.push(nA);
      B.push(nB);
      A.shift();
      B.shift();
      marks.forEach((m) => m.i--);
      while (marks.length && marks[0].i < 0) marks.shift();
    }
    const a = common + oA;
    const b = common + oB;
    const gap = Math.abs(oA - oB);

    // header
    text('BTC/USDT', X0, 40, 10.5, DIM, 'left', 600);
    text(`${L('arb.net')}  +${fmt(net)} USDT`, X1 + 24, 40, 10.5, LM, 'right', 700);

    // chart
    const cy = (v: number) => 135 - v * 2.35;
    const cx = (i: number) => X0 + (i / (N - 1)) * (X1 - X0);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    for (let g = 0; g < 5; g++) {
      ctx.beginPath();
      ctx.moveTo(X0, 56 + g * 40);
      ctx.lineTo(X1, 56 + g * 40);
      ctx.stroke();
    }
    // lime fill where the venues disagree by more than the fees
    for (let i = 1; i < N; i++) {
      const g0 = Math.abs(A[i - 1] - B[i - 1]);
      const g1 = Math.abs(A[i] - B[i]);
      if (g0 < BE && g1 < BE) continue;
      ctx.fillStyle = `rgba(182,255,59,${clamp(((g0 + g1) / 2 - BE) / 18) * 0.28 + 0.06})`;
      ctx.beginPath();
      ctx.moveTo(cx(i - 1), cy(A[i - 1]));
      ctx.lineTo(cx(i), cy(A[i]));
      ctx.lineTo(cx(i), cy(B[i]));
      ctx.lineTo(cx(i - 1), cy(B[i - 1]));
      ctx.closePath();
      ctx.fill();
    }
    const line = (s: number[], c: string) => {
      ctx.strokeStyle = c;
      ctx.lineWidth = 2;
      ctx.shadowColor = c;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      s.forEach((v, i) => (i ? ctx.lineTo(cx(i), cy(v)) : ctx.moveTo(cx(i), cy(v))));
      ctx.stroke();
      ctx.shadowBlur = 0;
    };
    line(A, CY);
    line(B, MG);
    // trade marks along the lines
    marks.forEach((m) => {
      const x = cx(m.i);
      ctx.strokeStyle = m.kind === 'open' ? LM : '#fff';
      ctx.globalAlpha = 0.7;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(x, 56);
      ctx.lineTo(x, 216);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    });
    // live heads
    const hx = cx(N - 1);
    [[a, CY], [b, MG]].forEach(([v, c]) => {
      ctx.fillStyle = c as string;
      ctx.beginPath();
      ctx.arc(hx, cy(v as number), 4, 0, Math.PI * 2);
      ctx.fill();
    });
    text(fmt(px(a), 0), hx + 10, cy(a) + (a >= b ? -1 : 11), 9.5, CY, 'left', 700);
    text(fmt(px(b), 0), hx + 10, cy(b) + (a >= b ? 11 : -1), 9.5, MG, 'left', 700);

    // gap bracket at the head while open
    if (gap > 4) {
      const yy = cy(Math.max(a, b));
      const y2 = cy(Math.min(a, b));
      ctx.strokeStyle = LM;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hx - 12, yy);
      ctx.lineTo(hx - 17, yy);
      ctx.lineTo(hx - 17, y2);
      ctx.lineTo(hx - 12, y2);
      ctx.stroke();
    }

    // venue cards
    const cardY = 238;
    const cardH = 96;
    const cheap = a < b ? 'A' : 'B';
    const venues: { key: 'A' | 'B'; x: number; w: number; c: string; name: string; v: number }[] = [
      { key: 'A', x: 20, w: 132, c: CY, name: 'BINANCE', v: a },
      { key: 'B', x: 328, w: 132, c: MG, name: 'OKX', v: b },
    ];
    const act = phase === 'exec' || (phase === 'open' && pt > 500);
    for (const vn of venues) {
      const buy = vn.key === cheap;
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(vn.x, cardY, vn.w, cardH);
      ctx.strokeStyle = act ? (buy ? LM : MG) : vn.c;
      ctx.globalAlpha = act ? 1 : 0.55;
      ctx.lineWidth = act ? 2 : 1;
      ctx.strokeRect(vn.x + 0.5, cardY + 0.5, vn.w - 1, cardH - 1);
      ctx.globalAlpha = 1;
      ctx.fillStyle = vn.c;
      ctx.fillRect(vn.x, cardY, 4, cardH);
      text(vn.name, vn.x + 14, cardY + 20, 11, vn.c, 'left', 700);
      text(fmt(px(vn.v), 1), vn.x + 14, cardY + 46, 14, '#fff', 'left', 700);
      if (act && gap > BE) {
        const tag = buy ? L('tri.buy') : L('tri.sell');
        const col = buy ? LM : MG;
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.18 + 0.12 * Math.sin(clock * 0.012);
        ctx.fillRect(vn.x + 14, cardY + 58, vn.w - 28, 24);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(vn.x + 14.5, cardY + 58.5, vn.w - 29, 23);
        text(tag, vn.x + vn.w / 2, cardY + 74, 11, col, 'center', 700);
      } else {
        text('-', vn.x + 14, cardY + 78, 11, DIM, 'left', 500, 0.6);
      }
    }

    // centre: gap against break-even
    const gx = 166;
    const gw = 148;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(gx, cardY, gw, cardH);
    ctx.strokeStyle = gap > BE ? LM : 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.strokeRect(gx + 0.5, cardY + 0.5, gw - 1, cardH - 1);
    text(L('gap'), gx + gw / 2, cardY + 20, 10, DIM, 'center', 600);
    text(`${fmt(gap, 1)} bps`, gx + gw / 2, cardY + 46, 17, gap > BE ? LM : '#fff', 'center', 700);
    const bx = gx + 14;
    const bw = gw - 28;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(bx, cardY + 62, bw, 6);
    ctx.fillStyle = gap > BE ? LM : CY;
    ctx.fillRect(bx, cardY + 62, clamp(gap / 36) * bw, 6);
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx + (BE / 36) * bw - 1, cardY + 57, 2, 16);
    text(`${trades}`, gx + gw / 2, cardY + 88, 10, DIM, 'center', 500, 0.85);

    // the two legs travelling from the cheap venue, through the bot, to the dear one
    if (phase === 'exec') {
      const p = ease(clamp(pt / 900));
      const from = cheap === 'A' ? venues[0] : venues[1];
      const to = cheap === 'A' ? venues[1] : venues[0];
      const sx = from.x + from.w / 2;
      const ex = to.x + to.w / 2;
      for (let g = 8; g >= 0; g--) {
        const q = clamp(p - g * 0.025);
        const x = lerp(sx, ex, q);
        const y = cardY - 6 - Math.sin(q * Math.PI) * 14;
        ctx.fillStyle = LM;
        ctx.globalAlpha = 0.08 * (9 - g);
        ctx.fillRect(x - 3, y - 3, 6, 6);
      }
      ctx.globalAlpha = 1;
      const x = lerp(sx, ex, p);
      const y = cardY - 6 - Math.sin(p * Math.PI) * 14;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = pops.length - 1; i >= 0; i--) {
      const pp = pops[i];
      pp.t += dt;
      if (pp.t > 1500) {
        pops.splice(i, 1);
        continue;
      }
      const f = pp.t / 1500;
      text(`${pp.s} USDT`, 240, cardY - 12 - f * 26 * tm, 14, LM, 'center', 700, 1 - f * f);
    }
    if (!primed) {
      primed = true;
      A.fill(0);
      B.fill(0);
    }
  };
};

const ArbitrageScene: React.FC<{ active?: boolean }> = ({ active }) => {
  const { t } = useLanguage();
  return <SceneCanvas make={make} active={active} label={t('landing.diagrams.altArbitrage')} />;
};
export default ArbitrageScene;
