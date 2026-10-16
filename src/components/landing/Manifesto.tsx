import React, { useEffect, useRef } from 'react';
import { reducedMotion } from './fx';

// A pinned statement whose words light up one by one as the page scrolls through it.
const Manifesto: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.setProperty('--mp', '1');
      return;
    }
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
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
        <p>
          {words.map((w, i) => (
            <span key={i} className="mw" style={{ ['--i' as any]: i }}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
