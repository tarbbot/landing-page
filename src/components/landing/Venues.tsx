import React, { useEffect, useState } from 'react';
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

const CORE = { x: 96, y: 200 };
const NODE_X = 392;
const YS = [48, 124, 200, 276, 352];

const Venues: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  // Walks the highlight down the list until the visitor takes over
  useEffect(() => {
    if (hold || reducedMotion()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % VENUES.length), 2600);
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

        <svg viewBox="0 0 520 400" className="ven-map" role="img" aria-label={t('landing.venues.alt')}>
          <defs>
            <filter id="ven-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {VENUES.map((v, i) => {
            const y = YS[i] + 19;
            const out = `M${CORE.x + 44} ${CORE.y} C 220 ${CORE.y} 250 ${y} ${NODE_X} ${y}`;
            const back = `M${NODE_X} ${y} C 250 ${y} 220 ${CORE.y} ${CORE.x + 44} ${CORE.y}`;
            const on = active === i;
            return (
              <g key={v.name}>
                <path className={`ven-line ${on ? 'on' : ''}`} d={out} fill="none" />
                <circle r={on ? 5 : 3.5} fill="#b6ff3b" opacity={on ? 1 : 0.55}>
                  <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={out} />
                </circle>
                <circle r={on ? 4.5 : 3} fill="#22e6ff" opacity={on ? 1 : 0.5}>
                  <animateMotion dur="3.1s" begin={`${i * 0.7 + 1}s`} repeatCount="indefinite" path={back} />
                </circle>
                <g className={`ven-node ${on ? 'on' : ''}`}>
                  <rect x={NODE_X} y={YS[i]} width={112} height={38} />
                  <text x={NODE_X + 56} y={YS[i] + 24} textAnchor="middle">{v.name.toUpperCase()}</text>
                </g>
              </g>
            );
          })}

          <circle className="dg-spin" cx={CORE.x} cy={CORE.y} r={62} fill="none" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="6 10" />
          <polygon
            className="dg-node"
            points={`${CORE.x},${CORE.y - 44} ${CORE.x + 38},${CORE.y - 22} ${CORE.x + 38},${CORE.y + 22} ${CORE.x},${CORE.y + 44} ${CORE.x - 38},${CORE.y + 22} ${CORE.x - 38},${CORE.y - 22}`}
            fill="#0a0818"
            stroke="#b6ff3b"
            strokeWidth={2.5}
            filter="url(#ven-glow)"
          />
          <text x={CORE.x} y={CORE.y + 5} textAnchor="middle" className="ven-core">ZNIT</text>
        </svg>
      </div>
      <p className="ven-foot">{t('landing.venues.note')}</p>
    </div>
  );
};

export default Venues;
