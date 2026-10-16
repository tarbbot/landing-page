import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { reducedMotion } from './fx';

// To show an official logo, drop the SVG in /public/exchanges and set `logo`, e.g. '/exchanges/binance.svg'.
// Until then a typographic wordmark is rendered; no brand artwork is redrawn here.
const VENUES: { name: string; mark: string; logo?: string }[] = [
  { name: 'Binance', mark: 'BN' },
  { name: 'OKX', mark: 'OK' },
  { name: 'Bybit', mark: 'BY' },
  { name: 'Coinbase', mark: 'CB' },
  { name: 'Bitfinex', mark: 'BF' },
];

type Strat = 'mm' | 'arb' | 'tri';
const STRATS: { k: Strat; color: string; rgb: string; tag: string }[] = [
  { k: 'mm', color: '#22e6ff', rgb: '34,230,255', tag: 'MM' },
  { k: 'arb', color: '#ff3ccf', rgb: '255,60,207', tag: 'ARB' },
  { k: 'tri', color: '#b6ff3b', rgb: '182,255,59', tag: 'TRI' },
];

// ---- the scene is drawn in a 520 x 420 space and scaled to the canvas ----
const W = 520;
const H = 420;
const CORE = { x: 92, y: 196 };
const NODE_X = 266;
const NODE_W = 108;
const NODE_H = 36;
const NODE_Y = (i: number) => 30 + i * 74;
const CHIP_X = (k: number) => 384 + k * 25;
const nodeMid = (i: number) => NODE_Y(i) + NODE_H / 2;

type P = [number, number];
const curve = (i: number): [P, P, P, P] => [
  [CORE.x + 44, CORE.y],
  [190, CORE.y],
  [222, nodeMid(i)],
  [NODE_X, nodeMid(i)],
];
const bez = ([a, b, c, d]: [P, P, P, P], t: number): P => {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};

interface Packet {
  i: number;
  dir: 1 | -1;
  t: number;
  color: string;
  off: number;
  done?: () => void;
}
interface Floating { x: number; y: number; txt: string; color: string; v: number; align?: 'right' }
interface Arc { i: number; j: number; v: number }
interface Loop { i: number; v: number }

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

interface MapProps {
  active: number;
  filter: Strat | 'all';
  onPick: (i: number) => void;
  alt: string;
  simulated: string;
}

// The whole story in one picture: what each Znit bot does on each exchange.
const VenueMap: React.FC<MapProps> = ({ active, filter, onPick, alt, simulated }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const live = useRef({ active, filter, onPick });
  live.current = { active, filter, onPick };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const calm = reducedMotion();
    let raf = 0;
    let visible = true;
    let scale = 1;
    let tm = 1; // text grows when the scene is shown small (phones)
    let nextAt = performance.now() + 500;
    let last = performance.now();
    const packets: Packet[] = [];
    const floats: Floating[] = [];
    const arcs: Arc[] = [];
    const loops: Loop[] = [];
    const flash = VENUES.map(() => 0);
    const chip = VENUES.map(() => [0, 0, 0]);
    const log: { txt: string; color: string }[] = [];

    const resize = () => {
      const w = canvas.clientWidth || W;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round((w * H * dpr) / W);
      scale = (w * dpr) / W;
      tm = Math.min(1.45, Math.max(1, 0.62 / (w / W)));
    };
    const pushLog = (txt: string, color: string) => {
      log.unshift({ txt, color });
      if (log.length > 4) log.pop();
    };
    const pickVenue = (not?: number) => {
      const a = live.current.active;
      let i = Math.random() < 0.6 ? a : Math.floor(Math.random() * VENUES.length);
      if (i === not) i = (i + 1 + Math.floor(Math.random() * (VENUES.length - 1))) % VENUES.length;
      return i;
    };

    // ---- the three bots ----
    const marketMaking = () => {
      const i = pickVenue();
      packets.push({ i, dir: 1, t: 0, color: '#22e6ff', off: -4 }, { i, dir: 1, t: 0.04, color: '#ff3ccf', off: 4 });
      packets.push({
        i,
        dir: 1,
        t: -0.18,
        color: '#b6ff3b',
        off: 0,
        done: () => {
          flash[i] = 1;
          chip[i][0] = 1;
          packets.push({ i, dir: -1, t: 1, color: '#b6ff3b', off: 0 });
        },
      });
      pushLog(`${stamp()}  MM   ${VENUES[i].name.toUpperCase()}  BTC/USDT  bid+ask`, '#22e6ff');
    };
    const arbitrage = () => {
      const i = pickVenue();
      const j = pickVenue(i);
      const bps = (2 + Math.random() * 9).toFixed(1);
      packets.push({
        i,
        dir: -1,
        t: 1,
        color: '#b6ff3b',
        off: 0,
        done: () => {
          flash[i] = 1;
          chip[i][1] = 1;
          packets.push({
            i: j,
            dir: 1,
            t: 0,
            color: '#ff3ccf',
            off: 0,
            done: () => {
              flash[j] = 1;
              chip[j][1] = 1;
              arcs.push({ i, j, v: 1 });
              // keep labels from landing on top of each other when two arbitrages follow closely
              let y = (nodeMid(i) + nodeMid(j)) / 2;
              for (let tries = 0; tries < 4 && floats.some((f) => f.align && Math.abs(f.y - y) < 14); tries++) y += tries % 2 ? -16 : 16;
              floats.push({ x: W - 4, y, txt: `+${bps} bps`, color: '#ff3ccf', v: 1, align: 'right' });
            },
          });
        },
      });
      pushLog(`${stamp()}  ARB  ${VENUES[i].name.toUpperCase()} > ${VENUES[j].name.toUpperCase()}  +${bps} bps`, '#ff3ccf');
    };
    const triangular = () => {
      const i = pickVenue();
      const pct = (0.02 + Math.random() * 0.07).toFixed(2);
      loops.push({ i, v: 1 });
      chip[i][2] = 1;
      flash[i] = 0.8;
      floats.push({ x: CHIP_X(2) + 9, y: nodeMid(i) - 26, txt: `+${pct}%`, color: '#b6ff3b', v: 1 });
      pushLog(`${stamp()}  TRI  ${VENUES[i].name.toUpperCase()}  USDT>BTC>ETH  +${pct}%`, '#b6ff3b');
    };
    const spawn = () => {
      const f = live.current.filter;
      const pool: Strat[] = f === 'all' ? ['mm', 'mm', 'arb', 'tri'] : [f];
      const s = pool[Math.floor(Math.random() * pool.length)];
      if (s === 'mm') marketMaking();
      else if (s === 'arb') arbitrage();
      else triangular();
    };

    const hex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 3) * k - Math.PI / 6;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
    };
    // 18px glyphs for the three bots
    const glyph = (k: number, x: number, y: number, power: number) => {
      const s = STRATS[k];
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(${s.rgb},${0.1 + power * 0.35})`;
      ctx.strokeStyle = s.color;
      ctx.globalAlpha = 0.45 + power * 0.55;
      ctx.lineWidth = 1.4;
      ctx.fillRect(0, 0, 18, 18);
      ctx.strokeRect(0.5, 0.5, 17, 17);
      ctx.beginPath();
      if (k === 0) {
        ctx.moveTo(4, 6); ctx.lineTo(14, 6); ctx.moveTo(4, 12); ctx.lineTo(14, 12);
      } else if (k === 1) {
        ctx.moveTo(4, 7); ctx.lineTo(14, 7); ctx.lineTo(11, 4); ctx.moveTo(14, 11); ctx.lineTo(4, 11); ctx.lineTo(7, 14);
      } else {
        ctx.moveTo(9, 4); ctx.lineTo(14.5, 13.5); ctx.lineTo(3.5, 13.5); ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    };

    const draw = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `600 ${11 * tm}px "JetBrains Mono", monospace`;

      if (!calm && now >= nextAt) {
        spawn();
        nextAt = now + 460 + Math.random() * 520;
      }
      const act = live.current.active;

      // lanes from the core to every exchange
      VENUES.forEach((_, i) => {
        const [a, b, c, d] = curve(i);
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.bezierCurveTo(b[0], b[1], c[0], c[1], d[0], d[1]);
        ctx.strokeStyle = i === act ? 'rgba(34,230,255,0.75)' : 'rgba(139,92,246,0.4)';
        ctx.lineWidth = i === act ? 2 : 1.2;
        ctx.setLineDash(i === act ? [] : [3, 7]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // arbitrage arcs on the right edge, between the two exchanges involved
      for (let n = arcs.length - 1; n >= 0; n--) {
        const a = arcs[n];
        a.v -= dt / 1100;
        if (a.v <= 0) { arcs.splice(n, 1); continue; }
        const y1 = nodeMid(a.i);
        const y2 = nodeMid(a.j);
        ctx.beginPath();
        ctx.moveTo(CHIP_X(2) + 22, y1);
        ctx.bezierCurveTo(W - 14, y1, W - 14, y2, CHIP_X(2) + 22, y2);
        ctx.strokeStyle = `rgba(255,60,207,${a.v})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // packets travelling the lanes
      for (let n = packets.length - 1; n >= 0; n--) {
        const p = packets[n];
        p.t += p.dir * dt * 0.00115;
        const gone = p.dir === 1 ? p.t >= 1 : p.t <= 0;
        if (gone) {
          packets.splice(n, 1);
          if (p.dir === 1 && p.done) p.done();
          else if (p.dir === -1 && p.done) p.done();
          continue;
        }
        if (p.t < 0 || p.t > 1) continue;
        const [x, y] = bez(curve(p.i), p.t);
        for (let k = 3; k >= 1; k--) {
          const [tx, ty] = bez(curve(p.i), Math.min(1, Math.max(0, p.t - p.dir * k * 0.025)));
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.18 * (4 - k);
          ctx.fillRect(tx - 2, ty + p.off - 2, 4, 4);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.color;
        ctx.fillRect(x - 3, y + p.off - 3, 6, 6);
      }

      // exchanges and their three bots
      VENUES.forEach((v, i) => {
        flash[i] = Math.max(0, flash[i] - dt / 520);
        const on = i === act;
        const y = NODE_Y(i);
        ctx.fillStyle = `rgba(182,255,59,${flash[i] * 0.28})`;
        ctx.fillRect(NODE_X, y, NODE_W, NODE_H);
        ctx.fillStyle = on ? '#0d1a10' : '#06040d';
        if (flash[i] === 0) ctx.fillRect(NODE_X, y, NODE_W, NODE_H);
        ctx.strokeStyle = on ? '#b6ff3b' : 'rgba(255,60,207,0.7)';
        ctx.lineWidth = on ? 2.5 : 1.4;
        ctx.strokeRect(NODE_X + 0.5, y + 0.5, NODE_W - 1, NODE_H - 1);
        ctx.fillStyle = on || flash[i] > 0.2 ? '#fff' : '#a9a6c6';
        ctx.textAlign = 'center';
        ctx.fillText(v.name.toUpperCase(), NODE_X + NODE_W / 2, y + 23);
        for (let k = 0; k < 3; k++) {
          chip[i][k] = Math.max(0, chip[i][k] - dt / 700);
          glyph(k, CHIP_X(k), y + 9, chip[i][k]);
        }
      });

      // triangular loops: three dots circling a triangle above the TRI bot
      for (let n = loops.length - 1; n >= 0; n--) {
        const l = loops[n];
        l.v -= dt / 1500;
        if (l.v <= 0) { loops.splice(n, 1); continue; }
        const cx = CHIP_X(2) + 9;
        const cy = nodeMid(l.i);
        const R = 15;
        ctx.strokeStyle = `rgba(182,255,59,${l.v * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let k = 0; k < 3; k++) {
          const a = -Math.PI / 2 + (Math.PI * 2 * k) / 3;
          k ? ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a)) : ctx.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        }
        ctx.closePath();
        ctx.stroke();
        for (let k = 0; k < 3; k++) {
          const ph = ((1 - l.v) * 2.4 + k / 3) % 1;
          const s = Math.floor(ph * 3);
          const f = ph * 3 - s;
          const a0 = -Math.PI / 2 + (Math.PI * 2 * s) / 3;
          const a1 = -Math.PI / 2 + (Math.PI * 2 * (s + 1)) / 3;
          ctx.fillStyle = `rgba(182,255,59,${Math.min(1, l.v * 1.6)})`;
          ctx.fillRect(cx + R * (Math.cos(a0) * (1 - f) + Math.cos(a1) * f) - 2, cy + R * (Math.sin(a0) * (1 - f) + Math.sin(a1) * f) - 2, 4, 4);
        }
      }

      // the Znit core: breathing hexagon and a spinning ring
      const pulse = 1 + 0.05 * Math.sin(now * 0.004);
      ctx.save();
      ctx.translate(CORE.x, CORE.y);
      ctx.rotate(now * 0.0004);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);
      ctx.fillStyle = '#0a0818';
      hex(CORE.x, CORE.y, 44 * pulse);
      ctx.fill();
      ctx.strokeStyle = '#b6ff3b';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = '#b6ff3b';
      ctx.textAlign = 'center';
      ctx.font = `700 ${15 * Math.min(tm, 1.2)}px "JetBrains Mono", monospace`;
      ctx.fillText('ZNIT', CORE.x + 2, CORE.y + 5);
      ctx.font = `600 ${11 * tm}px "JetBrains Mono", monospace`;

      // floating results
      for (let n = floats.length - 1; n >= 0; n--) {
        const f = floats[n];
        f.v -= dt / 1400;
        if (f.v <= 0) { floats.splice(n, 1); continue; }
        ctx.fillStyle = f.color;
        ctx.globalAlpha = Math.min(1, f.v * 1.6);
        ctx.textAlign = f.align || 'center';
        ctx.fillText(f.txt, f.align ? f.x : Math.min(f.x, W - 26), f.y - (1 - f.v) * 16);
        ctx.globalAlpha = 1;
      }

      // activity log (simulated), newest first
      ctx.textAlign = 'left';
      ctx.font = `500 ${10 * tm}px "JetBrains Mono", monospace`;
      log.forEach((l, n) => {
        ctx.fillStyle = l.color;
        ctx.globalAlpha = 0.95 - n * 0.22;
        ctx.fillText(l.txt, 8, H - 10 - n * 14);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    // click / hover on an exchange picks it
    const hit = (e: PointerEvent): number => {
      const r = canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * W;
      const y = ((e.clientY - r.top) / r.height) * H;
      return VENUES.findIndex((_, i) => x >= NODE_X - 6 && x <= NODE_X + NODE_W + 6 && y >= NODE_Y(i) - 6 && y <= NODE_Y(i) + NODE_H + 6);
    };
    const onMove = (e: PointerEvent) => {
      const i = hit(e);
      canvas.style.cursor = i >= 0 ? 'pointer' : 'default';
      if (i >= 0 && e.pointerType !== 'touch') live.current.onPick(i);
    };
    const onClick = (e: PointerEvent) => {
      const i = hit(e);
      if (i >= 0) live.current.onPick(i);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('click', onClick as any);
    if (calm) {
      pushLog(`${stamp()}  MM   BINANCE  BTC/USDT  bid+ask`, '#22e6ff');
      draw(performance.now());
    } else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('click', onClick as any);
    };
  }, []);

  return (
    <div className="ven-stage">
      <canvas ref={ref} className="ven-map" role="img" aria-label={alt} />
      <span className="ven-sim">{simulated}</span>
    </div>
  );
};

const Venues: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [filter, setFilter] = useState<Strat | 'all'>('all');
  const items = Array.isArray(t('landing.strategies.items')) ? (t('landing.strategies.items') as { title: string }[]) : [];

  // Walks the highlight down the list until the visitor takes over
  useEffect(() => {
    if (hold || reducedMotion()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % VENUES.length), 3200);
    return () => clearInterval(id);
  }, [hold]);

  const pick = (i: number) => {
    setActive(i);
    setHold(true);
  };

  return (
    <div className="ven zn-panel beam" onMouseLeave={() => setHold(false)}>
      <div className="ven-grid">
        <ul className="ven-list">
          {VENUES.map((v, i) => (
            <li key={v.name}>
              <button
                type="button"
                className={`ven-tile ${active === i ? 'on' : ''}`}
                aria-pressed={active === i}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onBlur={() => setHold(false)}
                onClick={() => pick(i)}
              >
                <span className="ven-mark" aria-hidden="true">
                  {v.logo ? <img src={v.logo} alt="" width={22} height={22} /> : v.mark}
                </span>
                <span className="ven-name">{v.name}</span>
                <span className="ven-status">{t('landing.venues.status')}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="ven-right">
          <div className="ven-filters" role="group" aria-label={t('landing.strategies.title')}>
            <button type="button" className={filter === 'all' ? 'on' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              {t('landing.venues.all')}
            </button>
            {STRATS.map((s, k) => (
              <button
                key={s.k}
                type="button"
                className={filter === s.k ? 'on' : ''}
                aria-pressed={filter === s.k}
                style={{ ['--c' as any]: s.color }}
                onClick={() => setFilter(filter === s.k ? 'all' : s.k)}
              >
                <i aria-hidden="true" />
                {items[k]?.title || s.tag}
              </button>
            ))}
          </div>
          <VenueMap active={active} filter={filter} onPick={pick} alt={t('landing.venues.alt')} simulated={t('landing.venues.simulated')} />
        </div>
      </div>
      <p className="ven-foot">{t('landing.venues.note')}</p>
    </div>
  );
};

export default Venues;
