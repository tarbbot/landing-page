import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ArrowUpRight,
  Cpu,
  FlaskConical,
  Lock,
  Radar,
  Search,
  Shield,
  ShieldCheck,
  TrendingUp,
  Network,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Counter, Scramble, reducedMotion, useReveal } from './landing/fx';
import { ArbitrageDiagram, BotDiagram, MarketMakerDiagram, NeuralDiagram, TriangleDiagram } from './landing/Diagrams';
import Simulator from './landing/Simulator';
import Venues from './landing/Venues';
import '../landing.css';

const openLogin = () => window.dispatchEvent(new Event('znit:login'));
const SECTIONS = ['top', 'strategies', 'simulator', 'venues', 'process', 'why', 'start'];
const DIAGRAMS = [MarketMakerDiagram, ArbitrageDiagram, TriangleDiagram, NeuralDiagram];
const PROCESS_ICONS: LucideIcon[] = [Search, FlaskConical, ShieldCheck, Radar];
const WHY_ICONS: Record<string, LucideIcon> = {
  security: Shield,
  technology: Cpu,
  performance: TrendingUp,
  community: Network,
  transparency: Lock,
  speed: Zap,
};
const PAIRS = ['BTC/USDT', 'ETH/USDT', 'ETH/BTC', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT', 'ARB/ETH', 'LINK/USDT'];

const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Simulated spread feed: it illustrates what the scanners watch, it is not market data.
const Tape: React.FC<{ label: string }> = ({ label }) => {
  const [bps, setBps] = useState<number[]>(() => PAIRS.map(() => 2 + Math.random() * 10));
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(
      () => setBps((p) => p.map((v) => Math.max(0.4, Math.min(24, v + (Math.random() - 0.5) * 3)))),
      1100
    );
    return () => clearInterval(id);
  }, []);
  const row = PAIRS.map((p, i) => (
    <span key={p} className="tape-i">
      <b>{p}</b>
      <i className={bps[i] > 9 ? 'hot' : ''}>{bps[i].toFixed(1)} bps</i>
    </span>
  ));
  return (
    <div className="tape" aria-label={label}>
      <div className="tape-tag">{label}</div>
      <div className="tape-track" aria-hidden="true">
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLElement>(null);
  const procRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(-1);
  const [current, setCurrent] = useState('top');

  const items = list<{ title: string; description: string; tags: string[] }>(t('landing.strategies.items'));
  const steps = list<{ title: string; description: string }>(t('landing.process.steps'));
  const boot = list<string>(t('landing.boot'));
  const rail = list<string>(t('landing.rail'));
  const stats = [
    { label: t('landing.stats.bots'), value: '50+' },
    { label: t('landing.stats.users'), value: '10K+' },
    { label: t('landing.stats.volume'), value: '$5M+' },
    { label: t('landing.stats.uptime'), value: '99.9%' },
  ];

  useEffect(() => setReady(true), []);
  useReveal(root);

  // One scroll loop drives every chained piece: page progress, strategy chapters, process line.
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      root.current?.style.setProperty('--pg', String(clamp01(window.scrollY / (doc.scrollHeight - vh))));

      const s = stratRef.current;
      if (s && items.length) {
        const r = s.getBoundingClientRect();
        const p = clamp01(-r.top / Math.max(1, r.height - vh));
        s.style.setProperty('--sp', String(p));
        setActive(Math.min(items.length - 1, Math.floor(p * items.length)));
      }
      const pr = procRef.current;
      if (pr && steps.length) {
        const r = pr.getBoundingClientRect();
        const p = clamp01((vh * 0.7 - r.top) / Math.max(1, r.height));
        pr.style.setProperty('--pp', String(p));
        setStep(Math.min(steps.length - 1, Math.floor(p * steps.length * 1.05) - (p < 0.02 ? 1 : 0)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length, steps.length]);

  // Section rail: lights the section nearest the viewport middle.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Pointer-follow highlight on panels.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const p = (e.target as HTMLElement).closest<HTMLElement>('.zn-panel');
      if (!p) return;
      const b = p.getBoundingClientRect();
      p.style.setProperty('--mx', `${e.clientX - b.left}px`);
      p.style.setProperty('--my', `${e.clientY - b.top}px`);
    };
    el.addEventListener('pointermove', move, { passive: true });
    return () => el.removeEventListener('pointermove', move);
  }, []);

  const state = (i: number, a: number) => (i === a ? 'is-active' : i < a ? 'is-past' : 'is-next');
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });

  return (
    <div ref={root} className={`zn ${ready ? 'js' : ''}`}>
      <div className="zn-progress" aria-hidden="true" />

      <nav className="zn-rail" aria-label="Sections">
        {SECTIONS.map((id, i) => (
          <button key={id} type="button" className={current === id ? 'on' : ''} onClick={() => go(id)} aria-label={rail[i] || id} aria-current={current === id}>
            <span>{rail[i] || id}</span>
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-copy">
          <ul className="boot" aria-hidden="true">
            {boot.map((l, i) => (
              <li key={i} style={{ ['--i' as any]: i }}>
                <span>&gt;</span> {l}
              </li>
            ))}
          </ul>
          <h1 className="glitch" data-text={t('landing.hero.title')}>
            <span className="hl-1">{t('landing.hero.title')}</span>
            <span className="hl-2">{t('landing.hero.subtitle')}</span>
          </h1>
          <p className="hero-sub">{t('landing.hero.description')}</p>
          <div className="hero-cta">
            <button type="button" className="zn-btn primary" onClick={openLogin}>
              <span>{t('landing.hero.ctaDashboard')}</span>
              <ArrowUpRight size={18} />
            </button>
            <button type="button" className="zn-btn ghost" onClick={() => go('strategies')}>
              <span>{t('landing.hero.ctaExplore')}</span>
            </button>
          </div>
        </div>

        <div className="hero-hud zn-panel hud beam beam-lite" aria-hidden="true">
          <i className="c tl" />
          <i className="c tr" />
          <i className="c bl" />
          <i className="c br" />
          <div className="hud-bar">
            <span>ZNIT.CORE</span>
            <span className="live">{t('landing.hud')}</span>
          </div>
          <BotDiagram />
        </div>

        <dl className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat" style={{ ['--i' as any]: i }}>
              <dd>
                <Counter value={s.value} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Tape label={t('landing.tape')} />

      {/* STRATEGIES: pinned stage, one chapter per strategy */}
      <section id="strategies" ref={stratRef} className="strat" style={{ ['--n' as any]: items.length }}>
        <div className="strat-pin">
          <header className="sec-head">
            <h2>
              <Scramble text={t('landing.strategies.title')} />
            </h2>
            <p className="rv">{t('landing.strategies.subtitle')}</p>
          </header>
          <div className="strat-stage">
            <div className="strat-text">
              {items.map((it, i) => (
                <article key={i} className={`chap ${state(i, active)}`} aria-hidden={i !== active}>
                  <span className="chap-n">
                    {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  <ul>
                    {list<string>(it.tags).map((tg) => (
                      <li key={tg}>{tg}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <div className="chap-dots" aria-hidden="true">
                {items.map((_, i) => (
                  <i key={i} className={i <= active ? 'on' : ''} />
                ))}
              </div>
            </div>
            <div className="strat-viz zn-panel hud beam">
              <i className="c tl" />
              <i className="c tr" />
              <i className="c bl" />
              <i className="c br" />
              <div className="hud-bar">
                <span>{(items[active]?.title || '').toUpperCase()}</span>
                <span className="live">{t('landing.hud')}</span>
              </div>
              {DIAGRAMS.slice(0, items.length).map((D, i) => (
                <div key={i} className={`viz ${state(i, active)}`}>
                  <D />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gate" aria-hidden="true" />

      {/* SIMULATOR */}
      <section id="simulator" className="sec sim-sec">
        <header className="sec-head">
          <h2>
            <Scramble text={t('landing.sim.title')} />
          </h2>
          <p className="rv">{t('landing.sim.subtitle')}</p>
        </header>
        <div className="rv">
          <Simulator />
        </div>
      </section>

      <div className="gate" aria-hidden="true" />

      {/* VENUES */}
      <section id="venues" className="sec">
        <header className="sec-head">
          <h2>
            <Scramble text={t('landing.venues.title')} />
          </h2>
          <p className="rv">{t('landing.venues.subtitle')}</p>
        </header>
        <div className="rv ven-wrap">
          <Venues />
        </div>
      </section>

      <div className="gate" aria-hidden="true" />

      {/* PROCESS: a line draws down the page, each step ignites in order */}
      <section id="process" ref={procRef} className="sec proc">
        <header className="sec-head">
          <h2>
            <Scramble text={t('landing.process.title')} />
          </h2>
          <p className="rv">{t('landing.process.subtitle')}</p>
        </header>
        <ol className="proc-list">
          {steps.map((s, i) => {
            const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length];
            return (
              <li key={i} className={`proc-step ${i <= step ? 'on' : ''}`}>
                <div className="proc-node">
                  <Icon size={20} />
                </div>
                <div className="proc-body zn-panel">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="gate" aria-hidden="true" />

      {/* WHY */}
      <section id="why" className="sec">
        <header className="sec-head">
          <h2>
            <Scramble text={t('landing.why.title')} />
          </h2>
          <p className="rv">{t('landing.why.subtitle')}</p>
        </header>
        <div className="bento">
          {Object.keys(WHY_ICONS).map((k, i) => {
            const Icon = WHY_ICONS[k];
            return (
              <article key={k} className={`bento-i b${i} zn-panel rv${i === 0 ? ' beam' : ''}`} style={{ ['--i' as any]: i }}>
                <Icon size={22} />
                <h3>{t(`landing.why.reasons.${k}.title`)}</h3>
                <p>{t(`landing.why.reasons.${k}.description`)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="gate" aria-hidden="true" />

      {/* CTA */}
      <section id="start" className="sec cta">
        <div className="cta-box zn-panel rv beam beam-lite">
          <h2>
            <Scramble text={t('landing.cta.title')} />
          </h2>
          <p>{t('landing.cta.description')}</p>
          <div className="hero-cta">
            <button type="button" className="zn-btn primary" onClick={openLogin}>
              <span>{t('landing.hero.ctaDashboard')}</span>
              <ArrowUpRight size={18} />
            </button>
            <button type="button" className="zn-btn ghost" onClick={() => go('strategies')}>
              <span>{t('landing.hero.ctaExplore')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
