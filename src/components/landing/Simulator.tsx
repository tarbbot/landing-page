import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

// Illustrative prices only; the result depends on mispricing and fees, not on these.
const BTC_USDT = 60000;
const ETH_BTC = 0.05;
const NOTIONALS = [1000, 10000, 100000];

const Simulator: React.FC = () => {
  const { t } = useLanguage();
  const [notional, setNotional] = useState(10000);
  const [gap, setGap] = useState(35);
  const [fee, setFee] = useState(10);

  const f = 1 - fee / 1e4;
  const btc = (notional * f) / BTC_USDT;
  const eth = (btc * f) / ETH_BTC;
  const out = eth * f * (BTC_USDT * ETH_BTC) * (1 + gap / 1e4);
  const net = out - notional;
  const breakeven = (1 / Math.pow(f, 3) - 1) * 1e4;
  const win = net > 0;
  const n = (v: number, d = 2) => v.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d });

  return (
    <div className={`sim zn-panel beam ${win ? 'is-win' : 'is-loss'}`}>
      <div className="sim-grid">
        <div className="sim-controls">
          <fieldset className="sim-notional">
            <legend>{t('landing.sim.notional')}</legend>
            {NOTIONALS.map((v) => (
              <button key={v} type="button" aria-pressed={notional === v} className={notional === v ? 'on' : ''} onClick={() => setNotional(v)}>
                {v.toLocaleString()} USDT
              </button>
            ))}
          </fieldset>

          <label className="sim-range">
            <span>{t('landing.sim.gap')}</span>
            <output>{gap} bps</output>
            <input type="range" min={-50} max={150} step={1} value={gap} onChange={(e) => setGap(+e.target.value)} />
          </label>

          <label className="sim-range">
            <span>{t('landing.sim.fee')}</span>
            <output>{fee} bps</output>
            <input type="range" min={0} max={30} step={1} value={fee} onChange={(e) => setFee(+e.target.value)} />
          </label>

          <p className="sim-note">
            {t('landing.sim.breakeven')}: <b>{n(breakeven, 1)} bps</b>
          </p>
        </div>

        <div className="sim-out">
          <ol className="sim-legs">
            <li style={{ ['--i' as any]: 0 }}>
              <span>USDT</span>
              <b>{n(notional, 0)}</b>
            </li>
            <li style={{ ['--i' as any]: 1 }}>
              <span>BTC</span>
              <b>{btc.toFixed(6)}</b>
            </li>
            <li style={{ ['--i' as any]: 2 }}>
              <span>ETH</span>
              <b>{eth.toFixed(5)}</b>
            </li>
            <li style={{ ['--i' as any]: 3 }}>
              <span>USDT</span>
              <b>{n(out)}</b>
            </li>
          </ol>
          <div className="sim-result" aria-live="polite">
            <span>{t('landing.sim.result')}</span>
            <strong>
              {win ? '+' : ''}
              {n(net)} USDT
            </strong>
            <em>{n((net / notional) * 100, 3)}%</em>
          </div>
        </div>
      </div>
      <p className="sim-foot">{t('landing.sim.note')}</p>
    </div>
  );
};

export default Simulator;
