import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SceneCanvas, SceneDraw, CY, MG, LM, VI, DIM, clamp, lerp } from './scene';

// Adaptive models: four market feeds enter a small network, edges are coloured by weight sign and
// sized by weight, a forward pass lights the nodes and ends in BUY / HOLD / SELL odds. When the
// loss drifts up the model retunes: weights glide to new values and the loss steps down.
const LAYERS = [4, 5, 5, 3];
const XS = [110, 204, 298, 392];
const ys = (l: number, i: number) => (l === 0 ? 76 + i * 58 : l === 3 ? 163 + (i - 1) * 58 : 163 + (i - (LAYERS[l] - 1) / 2) * 50);
const rnd = () => Math.random() * 2 - 1;

const make = (): SceneDraw => {
  let clock = 0;
  const feeds = Array.from({ length: 4 }, () => ({ s: Array.from({ length: 26 }, () => 0), v: 0, c: 0 }));
  const w = LAYERS.slice(0, -1).map((n, l) => Array.from({ length: n }, () => Array.from({ length: LAYERS[l + 1] }, rnd)));
  const wt = w.map((l) => l.map((r) => r.slice()));
  const act = LAYERS.map((n) => new Array(n).fill(0));
  const out = [0.34, 0.33, 0.33];
  const loss: number[] = Array.from({ length: 70 }, (_, i) => 0.7 - i * 0.003);
  let lv = 0.5;
  let lossClock = 0;
  let feedClock = 0;
  let retuneIn = 4200;
  let flash = 0;
  let retunes = 0;
  let wave = 0;

  return (ctx, now, dt, ui) => {
    const { text, L, fmt } = ui;
    clock += dt;
    wave = (wave + dt / 1700) % 1.35;
    flash = Math.max(0, flash - dt / 1500);

    feedClock += dt;
    if (feedClock > 130) {
      feedClock = 0;
      feeds.forEach((f, i) => {
        f.v = f.v * 0.8 + rnd() * 0.5 + Math.sin(clock * 0.0008 + i * 1.7) * 0.16;
        f.c += f.v;
        f.s.push(f.c);
        f.s.shift();
      });
    }

    // retune: weights glide, loss steps down
    lossClock += dt;
    if (lossClock > 180) {
      lossClock = 0;
      lv = clamp(lv + 0.012 + rnd() * 0.02 - (lv - 0.2) * 0.004, 0.12, 0.95);
      loss.push(lv);
      loss.shift();
    }
    retuneIn -= dt;
    if (retuneIn <= 0) {
      retuneIn = 5200;
      retunes++;
      flash = 1;
      lv = Math.max(0.14, lv * 0.45);
      wt.forEach((l) => l.forEach((r) => r.forEach((_, j) => (r[j] = clamp(r[j] + rnd() * 0.9, -1, 1)))));
    }
    w.forEach((l, a) => l.forEach((r, i) => r.forEach((v, j) => (r[j] = lerp(v, wt[a][i][j], Math.min(1, dt / 520))))));

    // forward pass on the latest feed moves
    const first = feeds.map((f) => Math.tanh(f.v * 1.3));
    act[0] = act[0].map((v, i) => lerp(v, first[i], 0.2));
    for (let l = 1; l < LAYERS.length; l++) {
      for (let j = 0; j < LAYERS[l]; j++) {
        let s = 0;
        for (let i = 0; i < LAYERS[l - 1]; i++) s += w[l - 1][i][j] * act[l - 1][i];
        act[l][j] = lerp(act[l][j], Math.tanh(s * 1.4), 0.12);
      }
    }
    const ex = act[3].map((v) => Math.exp(v * 1.6));
    const sum = ex[0] + ex[1] + ex[2];
    for (let i = 0; i < 3; i++) out[i] = lerp(out[i], ex[i] / sum, 0.12);

    // labels
    text(L('marketData'), 18, 34, 10, CY, 'left', 700);
    text(L('signal'), 462, 34, 10, LM, 'right', 700);

    // feeds as sparklines
    feeds.forEach((f, i) => {
      const y0 = ys(0, i);
      const lo = Math.min(...f.s);
      const hi = Math.max(...f.s);
      const span = Math.max(1, hi - lo);
      ctx.strokeStyle = CY;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      f.s.forEach((v, k) => {
        const x = 18 + (k / (f.s.length - 1)) * 56;
        const y = y0 + 12 - ((v - lo) / span) * 24;
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(34,230,255,0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(76, y0);
      ctx.lineTo(XS[0] - 11, y0);
      ctx.stroke();
    });

    // edges: colour by sign, width by weight, brightness by what feeds them
    for (let l = 0; l < LAYERS.length - 1; l++) {
      for (let i = 0; i < LAYERS[l]; i++) {
        for (let j = 0; j < LAYERS[l + 1]; j++) {
          const wv = w[l][i][j];
          const a = Math.abs(wv);
          ctx.strokeStyle = wv >= 0 ? CY : MG;
          ctx.globalAlpha = 0.06 + a * (0.16 + Math.abs(act[l][i]) * 0.55) + flash * 0.25 * a;
          ctx.lineWidth = 0.5 + a * 1.7;
          ctx.beginPath();
          ctx.moveTo(XS[l], ys(l, i));
          ctx.lineTo(XS[l + 1], ys(l + 1, j));
          ctx.stroke();
          // forward-pass packet on the strong edges
          const tt = wave * 3 - l - (i + j) * 0.03;
          if (a > 0.5 && tt > 0 && tt < 1) {
            const x = lerp(XS[l], XS[l + 1], tt);
            const y = lerp(ys(l, i), ys(l + 1, j), tt);
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = '#fff';
            ctx.fillRect(x - 1.8, y - 1.8, 3.6, 3.6);
          }
        }
      }
    }
    ctx.globalAlpha = 1;

    // nodes
    LAYERS.forEach((n, l) => {
      for (let i = 0; i < n; i++) {
        const x = XS[l];
        const y = ys(l, i);
        const a = Math.abs(act[l][i]);
        const c = l === 3 ? LM : act[l][i] >= 0 ? CY : MG;
        const r = l === 3 ? 10 : 8;
        ctx.fillStyle = '#08061a';
        ctx.beginPath();
        ctx.arc(x, y, r + 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.12 + a * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = c;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
        if (a > 0.45) {
          ctx.globalAlpha = (a - 0.45) * 0.9;
          ctx.beginPath();
          ctx.arc(x, y, r + 4 + a * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });

    // outputs with odds
    const names = [L('tri.buy'), L('nn.hold'), L('tri.sell')];
    const cols = [LM, DIM, MG];
    const best = out.indexOf(Math.max(...out));
    for (let i = 0; i < 3; i++) {
      const y = ys(3, i);
      text(names[i], 410, y - 5, 9.5, cols[i], 'left', best === i ? 700 : 500, best === i ? 1 : 0.7);
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(410, y + 1, 52, 6);
      ctx.fillStyle = cols[i];
      ctx.globalAlpha = best === i ? 1 : 0.55;
      ctx.fillRect(410, y + 1, out[i] * 52, 6);
      ctx.globalAlpha = 1;
      if (best === i) text(`${Math.round(out[i] * 100)}%`, 462, y + 20, 9.5, '#fff', 'right', 700, 0.9);
    }

    // loss curve: drifts up as the market changes, drops when the model retunes
    const LX0 = 18;
    const LX1 = 330;
    text(L('nn.loss'), LX0, 300, 10, DIM, 'left', 600);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(LX0, 346);
    ctx.lineTo(LX1, 346);
    ctx.stroke();
    ctx.beginPath();
    loss.forEach((v, i) => {
      const x = LX0 + (i / (loss.length - 1)) * (LX1 - LX0);
      const y = 346 - v * 40;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.strokeStyle = VI;
    ctx.lineWidth = 2;
    ctx.stroke();
    const lx = LX1;
    const ly = 346 - loss[loss.length - 1] * 40;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(lx, ly, 3.4, 0, Math.PI * 2);
    ctx.fill();
    text(fmt(loss[loss.length - 1], 2), lx + 10, ly + 3, 10, '#fff', 'left', 700);

    // retune badge
    const pulse = flash;
    ctx.strokeStyle = LM;
    ctx.fillStyle = LM;
    ctx.globalAlpha = 0.08 + pulse * 0.3;
    ctx.fillRect(386, 300, 76, 24);
    ctx.globalAlpha = 0.4 + pulse * 0.6;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(386.5, 300.5, 75, 23);
    ctx.globalAlpha = 1;
    text(`${L('nn.retune')} ${String(retunes).padStart(2, '0')}`, 424, 316, 9.5, LM, 'center', 700, 0.7 + pulse * 0.3);
  };
};

const NeuralScene: React.FC<{ active?: boolean }> = ({ active }) => {
  const { t } = useLanguage();
  return <SceneCanvas make={make} active={active} label={t('landing.diagrams.altNeural')} />;
};
export default NeuralScene;
