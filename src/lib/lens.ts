// A comet rides the cursor over every panel. The head is the cursor (with inertia), a tapered ion tail
// follows the path it just travelled, and a dust tail of order-flow ticks streams away from the motion,
// hot near the head and cooling to violet and magenta. Every time the cursor crosses into another layer
// (a panel inside a panel, or a new card) the comet explodes there: flash, shockwave rings, a shower of
// sparks. Leaving a card does not stop it: the comet detaches with its momentum, opens a fold ring at the
// edge and keeps flying across the whole screen until it has left it and its tail has burnt out.
// Inside a card the canvas sits between the panel fill and its text (z-index -1) and is clipped by the
// chamfer; once released, the comet lives on one fixed overlay canvas.
const FALLBACK_TC: [number, number, number] = [34, 230, 255];
const COOL = ['139,92,246', '255,60,207'];
const MAX_PARTS = 220;
const MIN_FLY = 0.6; // px per ms: a released comet never slows below this, so it always leaves the screen
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 .. 0
  span: number; // ms
  alt: number; // which cold colour
  spark: boolean;
}
interface Pt {
  x: number;
  y: number;
  t: number;
}
interface Comet {
  tc: [number, number, number];
  x: number;
  y: number;
  vx: number; // smoothed head velocity, px per ms
  vy: number;
  ivx: number; // this frame's
  ivy: number;
  speed: number;
  born: number;
  bits: Bit[];
  trail: Pt[];
  val: number;
  valAt: number;
  free: boolean;
  outSince: number;
}
interface Mesh extends Comet {
  panel: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  tx: number;
  ty: number;
  hover: boolean;
  fade: number;
  last: number;
  raf: number;
}
interface Ring {
  x: number;
  y: number;
  t0: number;
  tc: [number, number, number];
}

const readTone = (el: HTMLElement): [number, number, number] => {
  const v = getComputedStyle(el).getPropertyValue('--tc').split(',').map((n) => parseFloat(n));
  return v.length === 3 && v.every((n) => !isNaN(n)) ? (v as [number, number, number]) : FALLBACK_TC;
};
const hex = (n: number) => Math.max(0, Math.min(255, n | 0));

const burst = (x: number, y: number, n = 36): Bit[] =>
  Array.from({ length: n }, (_, i) => {
    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.3;
    const sp = 0.16 + Math.random() * 0.5;
    return { x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, span: 500 + Math.random() * 600, alt: i % 2, spark: true };
  });

// moves the head: by the cursor with inertia inside a card, by its own momentum once released
const advance = (m: Comet, dt: number, goal?: { x: number; y: number }) => {
  let sx: number;
  let sy: number;
  if (m.free || !goal) {
    sx = m.vx * dt;
    sy = m.vy * dt;
  } else {
    const k = 1 - Math.pow(1 - 0.16, dt / 16.667);
    sx = (goal.x - m.x) * k;
    sy = (goal.y - m.y) * k;
    const sd = Math.hypot(sx, sy);
    const cap = Math.max(0, 26 * (dt / 16.667)); // never faster than ~1,500 px/s
    if (sd > cap && sd > 0) {
      sx *= cap / sd;
      sy *= cap / sd;
    }
  }
  m.x += sx;
  m.y += sy;
  m.ivx = dt > 0 ? sx / dt : 0;
  m.ivy = dt > 0 ? sy / dt : 0;
  m.speed += (Math.hypot(m.ivx, m.ivy) - m.speed) * Math.min(1, dt / 120);
  if (!m.free) {
    const q = Math.min(1, dt / 90);
    m.vx += (m.ivx - m.vx) * q;
    m.vy += (m.ivy - m.vy) * q;
  }
};

// draws one comet: dust, ion tail, impact flash and rings, head, readout
const paint = (ctx: CanvasRenderingContext2D, m: Comet, now: number, dt: number, f: number, W: number, H: number, emit: boolean) => {
  const [R, G, B] = m.tc;
  const age = Math.max(0, now - m.born); // rAF timestamps can be older than the creation time
  m.trail.push({ x: m.x, y: m.y, t: now });
  while (m.trail.length > 2 && now - m.trail[0].t > 420) m.trail.shift();

  if (emit && m.bits.length < MAX_PARTS) {
    const n = (dt / 16.667) * (0.9 + Math.min(5, m.speed * 5));
    for (let i = 0; i < n; i++) {
      if (Math.random() > Math.min(1, n - i)) break;
      m.bits.push({
        x: m.x + (Math.random() - 0.5) * 5,
        y: m.y + (Math.random() - 0.5) * 5,
        vx: -m.ivx * 0.18 + (Math.random() - 0.5) * 0.05,
        vy: -m.ivy * 0.18 + (Math.random() - 0.5) * 0.05 - 0.012 - Math.random() * 0.02,
        life: 1,
        span: 520 + Math.random() * 700,
        alt: Math.random() < 0.5 ? 0 : 1,
        spark: false,
      });
    }
  }
  for (let i = m.bits.length - 1; i >= 0; i--) {
    const b = m.bits[i];
    b.life -= dt / b.span;
    if (b.life <= 0) {
      m.bits.splice(i, 1);
      continue;
    }
    const drag = Math.pow(b.spark ? 0.9965 : 0.9985, dt);
    b.vx *= drag;
    b.vy = b.vy * drag - (b.spark ? 0 : 0.00002 * dt);
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    const sp = Math.hypot(b.vx, b.vy) || 1;
    const len = (b.spark ? 7 : 4) + sp * (b.spark ? 55 : 70);
    const c = 1 - b.life < 0.35 ? `${R},${G},${B}` : COOL[b.alt];
    ctx.strokeStyle = `rgba(${c},${Math.min(1, b.life * 1.6) * f * (b.spark ? 0.95 : 0.7)})`;
    ctx.lineWidth = b.spark ? 1.4 : 1.1 + b.life * 0.6;
    ctx.beginPath();
    ctx.moveTo(b.x - (b.vx / sp) * len, b.y - (b.vy / sp) * len);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  const tr = m.trail;
  ctx.lineCap = 'round';
  for (let i = 1; i < tr.length; i++) {
    const q = i / (tr.length - 1);
    ctx.strokeStyle = `rgba(${hex(R + (255 - R) * q * 0.7)},${hex(G + (255 - G) * q * 0.7)},${hex(B + (255 - B) * q * 0.7)},${Math.pow(q, 1.6) * 0.85 * f})`;
    ctx.lineWidth = 0.6 + q * 4;
    ctx.beginPath();
    ctx.moveTo(tr[i - 1].x, tr[i - 1].y);
    ctx.lineTo(tr[i].x, tr[i].y);
    ctx.stroke();
  }
  ctx.lineCap = 'butt';

  // explosion: flash and two shockwave rings (on entering a card or crossing a layer)
  if (age < 850) {
    const e = age / 850;
    const fr = 70 + e * 110;
    const fl = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, fr);
    fl.addColorStop(0, `rgba(${hex((R + 255) / 2)},${hex((G + 255) / 2)},${hex((B + 255) / 2)},${0.5 * (1 - e) * f})`);
    fl.addColorStop(1, `rgba(${R},${G},${B},0)`);
    ctx.fillStyle = fl;
    ctx.beginPath();
    ctx.arc(m.x, m.y, fr, 0, Math.PI * 2);
    ctx.fill();
    for (let q = 0; q < 2; q++) {
      const rr = (age - q * 120) * 0.5;
      if (rr <= 0) continue;
      ctx.strokeStyle = `rgba(${q ? COOL[1] : `${R},${G},${B}`},${0.75 * (1 - e) * f})`;
      ctx.lineWidth = 2.4 - q;
      ctx.beginPath();
      ctx.arc(m.x, m.y, rr, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const heat = Math.min(1, m.speed * 1.4);
  const cr = (11 + heat * 8) * (1 + 0.08 * Math.sin(now * 0.008));
  const co = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, cr);
  co.addColorStop(0, `rgba(255,255,255,${0.9 * f})`);
  co.addColorStop(0.25, `rgba(${R},${G},${B},${0.55 * f})`);
  co.addColorStop(1, `rgba(${R},${G},${B},0)`);
  ctx.fillStyle = co;
  ctx.beginPath();
  ctx.arc(m.x, m.y, cr, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255,255,255,${f})`;
  ctx.beginPath();
  ctx.arc(m.x, m.y, 2.8, 0, Math.PI * 2);
  ctx.fill();

  if (now - m.valAt > 130) {
    m.valAt = now;
    m.val = Math.max(0.4, m.val + (Math.random() - 0.5) * 0.5 + (2 + m.speed * 6 - m.val) * 0.08);
  }
  ctx.font = '600 10px "JetBrains Mono", monospace';
  const label = `${m.val.toFixed(1)} bps`;
  const lw = ctx.measureText(label).width;
  const lx = Math.min(W - lw - 8, Math.max(8, m.x + 18));
  const ly = Math.min(H - 8, Math.max(16, m.y - 14));
  ctx.fillStyle = `rgba(6,4,13,${0.7 * f})`;
  ctx.fillRect(lx - 5, ly - 11, lw + 10, 16);
  ctx.fillStyle = `rgba(${R},${G},${B},${f})`;
  ctx.fillText(label, lx, ly);
  ctx.fillRect(lx - 5, ly - 11, 2, 16);
};

// ---- released comets live on one fixed canvas above the page ----
const fly: Comet[] = [];
const rings: Ring[] = [];
let overlay: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; raf: number; last: number } | null = null;

const runOverlay = (now: number) => {
  const o = overlay;
  if (!o) return;
  const dt = Math.min(48, now - o.last);
  o.last = now;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  if (o.canvas.width !== Math.round(W * dpr) || o.canvas.height !== Math.round(H * dpr)) {
    o.canvas.width = Math.round(W * dpr);
    o.canvas.height = Math.round(H * dpr);
  }
  const ctx = o.ctx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  // folds opened at the card edges: two expanding rings and a flash
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i];
    const age = Math.max(0, now - r.t0);
    if (age > 800) {
      rings.splice(i, 1);
      continue;
    }
    const e = age / 800;
    for (let q = 0; q < 2; q++) {
      const rr = Math.max(0, (age - q * 130) * 0.32);
      ctx.strokeStyle = `rgba(${q ? COOL[0] : `${r.tc[0]},${r.tc[1]},${r.tc[2]}`},${0.7 * (1 - e)})`;
      ctx.lineWidth = 2.2 - q * 0.8;
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, rr * 0.6, rr, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  for (let i = fly.length - 1; i >= 0; i--) {
    const c = fly[i];
    const inside = c.x > -80 && c.x < W + 80 && c.y > -80 && c.y < H + 80;
    advance(c, dt);
    if (inside) c.outSince = 0;
    else if (!c.outSince) c.outSince = now;
    paint(ctx, c, now, dt, 1, W, H, inside);
    // gone: out of the screen and the tail has burnt out
    if (!inside && c.bits.length === 0 && now - c.outSince > 480) fly.splice(i, 1);
  }
  if (fly.length || rings.length) o.raf = requestAnimationFrame(runOverlay);
  else {
    o.canvas.remove();
    overlay = null;
  }
};

const wake = () => {
  if (overlay) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'lens-fly';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:30';
  document.body.appendChild(canvas);
  const now = performance.now();
  overlay = { canvas, ctx: canvas.getContext('2d')!, raf: 0, last: now };
  overlay.raf = requestAnimationFrame(runOverlay);
};

export function attachLens(selector = '.zn-panel'): () => void {
  const meshes = new Map<HTMLElement, Mesh>();
  let active: HTMLElement | null = null;

  const destroy = (m: Mesh) => {
    cancelAnimationFrame(m.raf);
    m.canvas.remove();
    meshes.delete(m.panel);
  };

  const draw = (m: Mesh, now: number) => {
    const dt = Math.min(48, now - m.last);
    m.last = now;
    m.fade = Math.min(1, Math.max(0, m.fade + (m.hover ? dt / 200 : -dt / 340)));
    if (!m.hover && m.fade <= 0) return destroy(m);
    advance(m, dt, { x: m.tx, y: m.ty });
    m.ctx.clearRect(0, 0, m.w, m.h);
    paint(m.ctx, m, now, dt, m.fade, m.w, m.h, m.hover);
    m.raf = requestAnimationFrame((t) => draw(m, t));
  };

  const start = (panel: HTMLElement, x: number, y: number, carry?: Comet): Mesh => {
    const old = meshes.get(panel);
    if (old) {
      old.hover = true;
      old.tx = x;
      old.ty = y;
      return old;
    }
    const w = panel.clientWidth - 2;
    const h = panel.clientHeight - 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.className = 'lens-canvas';
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.setAttribute('aria-hidden', 'true');
    panel.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const now = performance.now();
    const hx = carry ? carry.x : x;
    const hy = carry ? carry.y : y;
    const m: Mesh = {
      panel, canvas, ctx, w, h, tc: readTone(panel), tx: x, ty: y, x: hx, y: hy, vx: carry?.vx ?? 0, vy: carry?.vy ?? 0, ivx: 0, ivy: 0,
      speed: carry?.speed ?? 0, born: now, hover: true, fade: carry ? 1 : 0, last: now, raf: 0,
      bits: [...(carry?.bits ?? []), ...burst(hx, hy)], trail: carry?.trail ?? [], val: carry?.val ?? 3.4, valAt: now, free: false, outSince: 0,
    };
    meshes.set(panel, m);
    m.raf = requestAnimationFrame((t) => draw(m, t));
    return m;
  };

  // the comet's state in the page's coordinates (panel space + the panel's origin)
  const shifted = (m: Comet, dx: number, dy: number): Comet => ({
    ...m,
    x: m.x + dx,
    y: m.y + dy,
    bits: m.bits.map((b) => ({ ...b, x: b.x + dx, y: b.y + dy })),
    trail: m.trail.map((p) => ({ ...p, x: p.x + dx, y: p.y + dy })),
  });

  // leaving a card: the comet detaches with its momentum, a fold ring opens at the edge, and it flies on
  const release = (m: Mesh) => {
    const b = m.panel.getBoundingClientRect();
    const c = shifted(m, b.left + 1, b.top + 1);
    let vx = c.vx;
    let vy = c.vy;
    let sp = Math.hypot(vx, vy);
    if (sp < 0.02) {
      vx = m.tx - m.x;
      vy = m.ty - m.y;
      sp = Math.hypot(vx, vy);
      if (sp < 1) {
        vx = 0;
        vy = -1;
        sp = 1;
      }
    }
    const speed = Math.max(MIN_FLY, Math.hypot(c.vx, c.vy));
    c.vx = (vx / sp) * speed;
    c.vy = (vy / sp) * speed;
    c.free = true;
    c.speed = speed;
    c.born = performance.now() - 5000; // no second explosion
    fly.push(c);
    rings.push({ x: c.x, y: c.y, t0: performance.now(), tc: c.tc });
    wake();
    destroy(m);
  };

  const leave = () => {
    if (active) {
      const m = meshes.get(active);
      if (m) release(m);
    }
    active = null;
  };

  const move = (e: PointerEvent) => {
    if (e.pointerType === 'touch' || calm()) return;
    const p = (e.target as HTMLElement).closest<HTMLElement>(selector);
    if (!p) return leave();
    const b = p.getBoundingClientRect();
    const x = e.clientX - b.left - 1;
    const y = e.clientY - b.top - 1;
    if (p !== active) {
      const prev = active ? meshes.get(active) : undefined;
      if (prev && active && (p.contains(active) || active.contains(p))) {
        // crossing into a layer inside (or around) the one we were in: the comet carries on and explodes
        const pb = prev.panel.getBoundingClientRect();
        const carry = shifted(prev, pb.left + 1 - (b.left + 1), pb.top + 1 - (b.top + 1));
        destroy(prev);
        active = p;
        start(p, x, y, carry);
        return;
      }
      leave();
      active = p;
      start(p, x, y); // a new card: the impact starts here, right under the cursor
      return;
    }
    const m = meshes.get(p);
    if (m) {
      m.tx = x;
      m.ty = y;
    } else start(p, x, y);
  };

  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('mouseleave', leave);
  return () => {
    window.removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('mouseleave', leave);
    meshes.forEach(destroy);
  };
}
