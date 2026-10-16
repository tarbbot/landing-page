import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { reducedMotion } from './fx';

// Triangular arbitrage as the bot lives it: scan the loop, compare the price gap with the break-even
// after fees, SKIP when it is too small, otherwise EXECUTE the three legs and book the result.
// Same math as the simulator (10,000 USDT, 10 bps per trade). Prices are illustrative.
const W = 480;
const H = 360;
const N0 = 10000;
const FEE = 10;
const BTC_USDT = 60000;
const ETH_BTC = 0.05;
const BE = (1 / Math.pow(1 - FEE / 1e4, 3) - 1) * 1e4; // break-even gap in bps, 30.1

const NODES = [
  { k: 'USDT', x: 240, y: 74, c: '#b6ff3b' },
  { k: 'BTC', x: 84, y: 258, c: '#22e6ff' },
  { k: 'ETH', x: 396, y: 258, c: '#ff3ccf' },
];
const LEG = ['#22e6ff', '#8b5cf6', '#ff3ccf'];
const PAIR = ['BTC/USDT', 'ETH/BTC', 'ETH/USDT'];
const GAUGE = { x: 240, y: 196, r: 50 };

type Phase = 'scan' | 'decide' | 'leg0' | 'leg1' | 'leg2' | 'result' | 'skip' | 'rest';
const DUR: Record<Phase, number> = { scan: 1300, decide: 500, leg0: 950, leg1: 950, leg2: 950, result: 1500, skip: 1000, rest: 450 };

const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const mix = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const pos = (i: number): [number, number] => [NODES[i].x, NODES[i].y];

const TriangularArb: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLCanvasElement>(null);
  const live = useRef({ active, t, language });
  live.current = { active, t, language };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const calm = reducedMotion();
    let raf = 0;
    let visible = true;
    let cw = 480;
    let ch = 360;
    let dpr = 1;
    let last = performance.now();

    // the loop under way
    let phase: Phase = 'scan';
    let pt = 0;
    let gap = 0;
    let net = 0;
    let execute = false;
    let shown = 0;
    const held: (number | null)[] = [N0, null, null];
    let out = N0;
    const flash = [0, 0, 0];
    let total = 0;
    let loops = 0;
    const holdFade = [1, 0, 0];

    const newCycle = () => {
      gap = 10 + Math.random() * 52;
      execute = gap > BE;
      net = N0 * ((1 + gap / 1e4) * Math.pow(1 - FEE / 1e4, 3) - 1);
      const f = 1 - FEE / 1e4;
      const btc = (N0 * f) / BTC_USDT;
      const eth = (btc * f) / ETH_BTC;
      out = eth * f * (BTC_USDT * ETH_BTC) * (1 + gap / 1e4);
      held[0] = N0;
      held[1] = null;
      held[2] = null;
      holdFade[0] = 1;
      holdFade[1] = 0;
      holdFade[2] = 0;
      phase = 'scan';
      pt = 0;
    };
    const holdValue = (i: number) => {
      const f = 1 - FEE / 1e4;
      const btc = (N0 * f) / BTC_USDT;
      if (i === 1) return btc;
      if (i === 2) return (btc * f) / ETH_BTC;
      return out;
    };

    const resize = () => {
      cw = canvas.clientWidth || 480;
      ch = canvas.clientHeight || 360;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    };

    const draw = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const { t: tr, language: lang } = live.current;
      const L = (k: string): string => tr(`landing.diagrams.tri.${k}`);
      const fmt = (v: number, d = 2) => v.toLocaleString(lang, { minimumFractionDigits: d, maximumFractionDigits: d });

      // ---- timeline ----
      if (!calm) {
        pt += dt;
        if (pt >= DUR[phase]) {
          pt = 0;
          if (phase === 'scan') phase = 'decide';
          else if (phase === 'decide') phase = execute ? 'leg0' : 'skip';
          else if (phase === 'leg0') { flash[1] = 1; held[1] = holdValue(1); holdFade[1] = 1; phase = 'leg1'; }
          else if (phase === 'leg1') { flash[2] = 1; held[2] = holdValue(2); holdFade[2] = 1; phase = 'leg2'; }
          else if (phase === 'leg2') { flash[0] = 1; held[0] = out; holdFade[0] = 1; total += net; loops++; phase = 'result'; }
          else if (phase === 'result' || phase === 'skip') phase = 'rest';
          else newCycle();
        }
        if (phase === 'rest' && pt === 0) { /* fade the holdings out while resting */ }
      }
      for (let i = 0; i < 3; i++) flash[i] = Math.max(0, flash[i] - dt / 650);
      if (phase === 'rest' || phase === 'skip') for (let i = 1; i < 3; i++) holdFade[i] = Math.max(0, holdFade[i] - dt / 500);
      const prog = pt / DUR[phase];
      shown = phase === 'scan' ? gap + (Math.random() - 0.5) * 46 * (1 - ease(prog)) : gap;

      // ---- scene ----
      const sc = Math.min(cw / W, ch / H);
      const tm = clamp(0.9 / sc, 1, 1.16); // text grows when the picture is small
      ctx.setTransform(dpr * sc, 0, 0, dpr * sc, (dpr * (cw - W * sc)) / 2, (dpr * (ch - H * sc)) / 2);
      ctx.clearRect(-200, -200, W + 400, H + 400);
      ctx.lineJoin = 'round';

      const text = (s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'center', weight = 600, alpha = 1) => {
        ctx.font = `${weight} ${size * tm}px "JetBrains Mono", monospace`;
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillText(s, x, y);
        ctx.globalAlpha = 1;
      };

      const legIdx = phase === 'leg0' ? 0 : phase === 'leg1' ? 1 : phase === 'leg2' ? 2 : -1;
      const done = phase === 'result' || phase === 'rest' || phase === 'skip';

      // triangle body
      ctx.beginPath();
      NODES.forEach((n, i) => (i ? ctx.lineTo(n.x, n.y) : ctx.moveTo(n.x, n.y)));
      ctx.closePath();
      ctx.fillStyle = `rgba(139,92,246,${0.05 + (execute && legIdx >= 0 ? 0.04 : 0)})`;
      ctx.fill();

      // edges, with direction chevrons that always drift along the loop
      for (let i = 0; i < 3; i++) {
        const a = pos(i);
        const b = pos((i + 1) % 3);
        const on = legIdx === i;
        const dim = phase === 'skip' ? 0.25 : 1;
        ctx.strokeStyle = LEG[i];
        ctx.globalAlpha = (on ? 0.35 : 0.14) * dim;
        ctx.lineWidth = on ? 9 : 5;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.globalAlpha = (on ? 1 : 0.45) * dim;
        ctx.lineWidth = on ? 2.4 : 1.4;
        ctx.setLineDash(on ? [] : [4, 8]);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.setLineDash([]);
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
        for (let c = 0; c < 3; c++) {
          const f = (c / 3 + now * 0.00018) % 1;
          const [cx, cy] = mix(a, b, 0.2 + f * 0.6);
          ctx.globalAlpha = 0.5 * dim;
          ctx.beginPath();
          ctx.moveTo(cx - 5 * Math.cos(ang - 0.5), cy - 5 * Math.sin(ang - 0.5));
          ctx.lineTo(cx, cy);
          ctx.lineTo(cx - 5 * Math.cos(ang + 0.5), cy - 5 * Math.sin(ang + 0.5));
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // pair labels with their prices (the third carries the gap the bot is hunting)
      const rate3 = 3000 * (1 + gap / 1e4);
      const rates = [fmt(BTC_USDT, 0), fmt(ETH_BTC, 4), fmt(rate3, 1)];
      const lab: [number, number, CanvasTextAlign][] = [[132, 150, 'right'], [240, 292, 'center'], [348, 150, 'left']];
      for (let i = 0; i < 3; i++) {
        text(PAIR[i], lab[i][0], lab[i][1], 10.5, LEG[i], lab[i][2], 600, legIdx === i ? 1 : 0.8);
        text(rates[i], lab[i][0], lab[i][1] + 13 * tm, 10, '#a9a6c6', lab[i][2], 500, 0.95);
      }

      // scan sweep around the loop
      if (phase === 'scan') {
        const per = prog * 3;
        const s = Math.min(2, Math.floor(per));
        const [sx, sy] = mix(pos(s), pos((s + 1) % 3), per - s);
        for (let k = 5; k >= 0; k--) {
          const pp = Math.max(0, per - k * 0.035);
          const ss = Math.min(2, Math.floor(pp));
          const [tx, ty] = mix(pos(ss), pos((ss + 1) % 3), pp - ss);
          ctx.fillStyle = `rgba(255,255,255,${0.12 * (6 - k)})`;
          ctx.fillRect(tx - 2.5, ty - 2.5, 5, 5);
        }
        ctx.fillStyle = '#fff';
        ctx.fillRect(sx - 3, sy - 3, 6, 6);
      }

      // the executing pulse, with a trail
      if (legIdx >= 0) {
        const p = ease(prog);
        for (let k = 8; k >= 0; k--) {
          const pp = clamp(p - k * 0.03);
          const [tx, ty] = mix(pos(legIdx), pos((legIdx + 1) % 3), pp);
          ctx.fillStyle = LEG[legIdx];
          ctx.globalAlpha = 0.07 * (9 - k);
          ctx.fillRect(tx - 3, ty - 3, 6, 6);
        }
        ctx.globalAlpha = 1;
        const [hx, hy] = mix(pos(legIdx), pos((legIdx + 1) % 3), p);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath(); ctx.arc(hx, hy, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(hx, hy, 4.2, 0, Math.PI * 2); ctx.fill();
      }

      // currency nodes and what the bot holds in each
      NODES.forEach((n, i) => {
        const r = 27;
        if (flash[i] > 0) {
          ctx.strokeStyle = n.c;
          ctx.globalAlpha = flash[i];
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.arc(n.x, n.y, r + (1 - flash[i]) * 30, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = '#08061a';
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.08 + flash[i] * 0.3;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = n.c;
        ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke();
        text(n.k, n.x, n.y + 4 * tm, 12, '#fff');
        const v = held[i];
        if (v !== null && holdFade[i] > 0.02) {
          const label = `${fmt(v, i === 1 ? 4 : i === 2 ? 4 : 2)} ${n.k}`;
          text(label, n.x, i === 0 ? n.y - 40 : n.y + 46 * tm, 11, n.c, 'center', 600, holdFade[i]);
        }
      });

      // the gauge: gap against the break-even
      const gx = GAUGE.x;
      const gy = GAUGE.y;
      const pass = shown > BE;
      const col = phase === 'scan' ? '#ffffff' : pass ? '#b6ff3b' : '#ff3ccf';
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath(); ctx.arc(gx, gy, GAUGE.r, -Math.PI / 2, Math.PI * 1.5); ctx.stroke();
      ctx.strokeStyle = col;
      ctx.globalAlpha = phase === 'scan' ? 0.7 : 1;
      ctx.beginPath();
      ctx.arc(gx, gy, GAUGE.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(shown / (BE * 2)));
      ctx.stroke();
      ctx.globalAlpha = 1;
      const tick = -Math.PI / 2 + Math.PI; // break-even sits at half of the dial
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx + (GAUGE.r - 8) * Math.cos(tick), gy + (GAUGE.r - 8) * Math.sin(tick));
      ctx.lineTo(gx + (GAUGE.r + 8) * Math.cos(tick), gy + (GAUGE.r + 8) * Math.sin(tick));
      ctx.stroke();
      text(L('gap'), gx, gy - 17 * tm, 9.5, '#a9a6c6', 'center', 500);
      text(`${fmt(Math.max(0, shown), 1)} bps`, gx, gy + 5 * tm, 14, col, 'center', 700);
      text(`${L('breakEven')} ${fmt(BE, 1)}`, gx, gy + 24 * tm, 7.5, '#a9a6c6', 'center', 500);
      if (phase === 'decide' || phase === 'skip') text(execute ? L('execute') : L('skip'), gx, gy - GAUGE.r - 12, 12, execute ? '#b6ff3b' : '#ff3ccf', 'center', 700, phase === 'skip' ? 1 - ease(prog) * 0.6 : 0.4 + 0.6 * Math.abs(Math.sin(pt * 0.02)));
      if (phase === 'result') {
        const up = ease(prog);
        text(`+${fmt(net)} USDT`, gx, gy - GAUGE.r - 10 - up * 26 * tm, 17, '#b6ff3b', 'center', 700, 1 - up * 0.8);
      }

      // the three legs as steps
      const chips = [`1  ${L('buy')} BTC`, `2  ${L('buy')} ETH`, `3  ${L('sell')} ETH`];
      chips.forEach((s, i) => {
        const x = 10 + i * 156;
        const on = legIdx === i;
        const ok = (legIdx > i && legIdx >= 0) || (done && execute && phase !== 'skip');
        ctx.fillStyle = on ? `${LEG[i]}40` : 'rgba(255,255,255,0.04)';
        ctx.fillRect(x, 326, 148, 24);
        ctx.strokeStyle = on ? LEG[i] : ok ? `${LEG[i]}99` : 'rgba(255,255,255,0.14)';
        ctx.lineWidth = on ? 2 : 1;
        ctx.strokeRect(x + 0.5, 326.5, 147, 23);
        text(s, x + 74, 342 * (1 + (tm - 1) * 0.03), 10.5, on || ok ? '#fff' : '#a9a6c6', 'center', 600);
      });

      // session scoreboard and the "illustrative" note
      text(`${L('session')}  ${total >= 0 ? '+' : ''}${fmt(total)} USDT  ·  ${L('loops')} ${loops}`, 8, 12, 10, '#b6ff3b', 'left', 500, 0.9);
      text(tr('landing.venues.simulated'), W - 8, 12, 9, '#6f6c8f', 'right', 500);
    };

    const loop = (now: number) => {
      if (live.current.active && visible && !document.hidden) draw(now);
      else last = now;
      raf = requestAnimationFrame(loop);
    };

    newCycle();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    if (calm) {
      // one still frame: an executed loop with its result
      do newCycle(); while (!execute);
      held[1] = holdValue(1); held[2] = holdValue(2); held[0] = out;
      holdFade[1] = 1; holdFade[2] = 1; holdFade[0] = 1;
      total = net; loops = 1; phase = 'result'; pt = 600;
      draw(performance.now());
    } else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="dg-canvas" role="img" aria-label={t('landing.diagrams.altTriangle')} />;
};

export default TriangularArb;
