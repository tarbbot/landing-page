import React from 'react';

const CY = '#22e6ff';
const MG = '#ff3ccf';
const LM = '#b6ff3b';

const Frame: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => (
  <svg viewBox="0 0 480 360" className="dg" role="img" aria-label={label}>
    <defs>
      <filter id="dg-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {children}
  </svg>
);

// Order-book ladder: asks above, bids below, the bot quotes both sides and earns the gap.
export const MarketMakerDiagram: React.FC = () => {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <Frame label="Order book with the market maker quoting both sides of the spread">
      {rows.map((i) => (
        <g key={`a${i}`}>
          <rect className="dg-bar" x={240} y={150 - (i + 1) * 22} height={16} width={50 + i * 22} fill={MG} opacity={0.75} style={{ ['--d' as any]: `${i * 0.18}s`, transformOrigin: 'left center' }} />
        </g>
      ))}
      {rows.map((i) => (
        <rect key={`b${i}`} className="dg-bar" x={240 - (50 + i * 22)} y={210 + i * 22} height={16} width={50 + i * 22} fill={CY} opacity={0.75} style={{ ['--d' as any]: `${0.09 + i * 0.18}s`, transformOrigin: 'right center' }} />
      ))}
      <line x1={40} x2={440} y1={180} y2={180} stroke="#fff" strokeOpacity={0.25} strokeDasharray="3 6" />
      <g filter="url(#dg-glow)">
        <path d="M300 156 h20 v48 h-20" fill="none" stroke={LM} strokeWidth={2} />
        <circle className="dg-pulse" cx={310} cy={180} r={4} fill={LM} />
      </g>
      <text x={330} y={184} fill={LM} className="dg-t">SPREAD CAPTURED</text>
      <text x={40} y={40} fill={MG} className="dg-t">ASK</text>
      <text x={40} y={330} fill={CY} className="dg-t">BID</text>
      <circle r={3} fill="#fff"><animateMotion dur="2.4s" repeatCount="indefinite" path="M240 160 L240 200" /></circle>
    </Frame>
  );
};

// Same asset, two venues: the gap opens, the bot buys the cheap side and sells the dear one.
export const ArbitrageDiagram: React.FC = () => {
  const a = 'M30 200 C100 190 150 170 210 175 S300 130 340 110 S420 130 450 140';
  const b = 'M30 205 C100 215 150 200 210 205 S300 250 340 262 S420 230 450 224';
  return (
    <Frame label="Two venues quote different prices for the same asset; the bot trades the gap">
      <g filter="url(#dg-glow)" fill="none" strokeWidth={2.5}>
        <path className="dg-flow" d={a} stroke={CY} />
        <path className="dg-flow" d={b} stroke={MG} style={{ animationDelay: '-1s' }} />
      </g>
      <g>
        <line x1={340} x2={340} y1={104} y2={268} stroke={LM} strokeWidth={1.5} strokeDasharray="4 5" />
        <path d="M352 112 v152" stroke={LM} strokeWidth={2} fill="none" />
        <text x={362} y={192} fill={LM} className="dg-t">GAP</text>
      </g>
      <circle r={5} fill={CY}><animateMotion dur="4s" repeatCount="indefinite" path={a} /></circle>
      <circle r={5} fill={MG}><animateMotion dur="4s" repeatCount="indefinite" path={b} /></circle>
      <text x={30} y={150} fill={CY} className="dg-t">VENUE A  SELL</text>
      <text x={30} y={252} fill={MG} className="dg-t">VENUE B  BUY</text>
    </Frame>
  );
};

// Three pairs in one loop. A pulse walks USDT, BTC, ETH, USDT and returns with more or less than it left with.
export const TriangleDiagram: React.FC = () => {
  const nodes = [
    { x: 240, y: 56, l: 'USDT', c: LM, d: '0s' },
    { x: 80, y: 292, l: 'BTC', c: CY, d: '-2.67s' },
    { x: 400, y: 292, l: 'ETH', c: MG, d: '-1.33s' },
  ];
  const loop = 'M240 56 L80 292 L400 292 Z';
  return (
    <Frame label="Triangular arbitrage loop through USDT, BTC and ETH">
      <g filter="url(#dg-glow)">
        <path className="dg-flow" d={loop} fill="none" stroke="#8b5cf6" strokeWidth={2} />
      </g>
      <path d={loop} fill="rgba(139,92,246,.07)" />
      {nodes.map((n) => (
        <g key={n.l}>
          <circle className="dg-node" cx={n.x} cy={n.y} r={22} fill="#06040d" stroke={n.c} strokeWidth={2} style={{ animationDelay: n.d }} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.c} className="dg-t">{n.l}</text>
        </g>
      ))}
      <circle r={6} fill="#fff" filter="url(#dg-glow)"><animateMotion dur="4s" repeatCount="indefinite" path={loop} /></circle>
      <text x={240} y={206} textAnchor="middle" fill={LM} className="dg-t">1 LOOP, 3 TRADES</text>
    </Frame>
  );
};

// Layered network: signal pulses travel left to right, the model reweights as the market shifts.
export const NeuralDiagram: React.FC = () => {
  const layers = [3, 5, 5, 2];
  const xs = [70, 195, 320, 430];
  const pts = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: xs[li], y: 180 + (i - (n - 1) / 2) * 56 }))
  );
  return (
    <Frame label="Neural network layers adapting to market data">
      {pts.slice(0, -1).map((layer, li) =>
        layer.map((p, i) =>
          pts[li + 1].map((q, j) => (
            <line key={`${li}${i}${j}`} className="dg-edge" x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#8b5cf6" strokeOpacity={0.35} style={{ animationDelay: `${((i * 3 + j * 5 + li * 7) % 11) * 0.22}s` }} />
          ))
        )
      )}
      {pts.map((layer, li) =>
        layer.map((p, i) => (
          <circle key={`n${li}${i}`} className="dg-node" cx={p.x} cy={p.y} r={9} fill="#06040d" stroke={li === 3 ? LM : CY} strokeWidth={2} style={{ animationDelay: `${(li * 0.5 + i * 0.12).toFixed(2)}s` }} />
        ))
      )}
      <text x={70} y={330} fill={CY} className="dg-t">MARKET DATA</text>
      <text x={400} y={330} fill={LM} className="dg-t">SIGNAL</text>
    </Frame>
  );
};
