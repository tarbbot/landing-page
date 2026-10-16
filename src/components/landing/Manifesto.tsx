import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { reducedMotion } from './fx';
import BlackHole from './BlackHole';

// A pinned statement whose words light up one by one as the page scrolls through it.
const Manifesto: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLElement>(null);
  const prog = useRef(0);
  const { t } = useLanguage();
  const [hint, setHint] = useState(false);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.setProperty('--mp', '1');
      prog.current = 1;
      return;
    }
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      prog.current = p;
      el.style.setProperty('--mp', p.toFixed(4));
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
  }, []);

  return (
    <section id="manifesto" ref={ref} className="manifesto" style={{ ['--n' as any]: words.length }}>
      <div className="manifesto-pin">
        <BlackHole progress={prog} onExhaust={() => setHint(true)} onFeed={() => setHint(false)} onReset={() => setHint(false)} />
        <div className="bh-ui" aria-hidden="true">
          <span className={`bh-hint ${hint ? 'on' : ''}`}>{t('landing.manifestoHint')}</span>
        </div>
        <div className="mani-copy">
        <span className="mani-k">{t('landing.manifestoKicker')}</span>
        <p>
          {words.map((w, i) => (
            <span key={i} className="mw" style={{ ['--i' as any]: i }}>
              {w}{' '}
            </span>
          ))}
        </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
