/* ============================================================
   Turnieje 1.0 — DANE FLOW (mock) dla klikalnej makiety.
   Każdy ekran = krok {id, type, ...props}. Router renderuje po `type`.
   Bez logiki gry — to scenariusz makiety do testowania UX.
   ============================================================ */

// ── MINITURNIEJ — stany tabeli (drużyna gracza = TY) ──
const MT_G0 = [
  { code: 'TY',  m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'LEG', m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'WIS', m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'WID', m: 0, gf: 0, ga: 0, pts: 0 },
];
const MT_G1 = [
  { code: 'TY',  m: 1, gf: 2, ga: 0, pts: 3 },
  { code: 'LEG', m: 1, gf: 1, ga: 0, pts: 3 },
  { code: 'WIS', m: 1, gf: 0, ga: 1, pts: 0 },
  { code: 'WID', m: 1, gf: 0, ga: 2, pts: 0 },
];
const MT_G2 = [
  { code: 'TY',  m: 2, gf: 4, ga: 1, pts: 6 },
  { code: 'LEG', m: 2, gf: 2, ga: 2, pts: 3 },
  { code: 'WIS', m: 2, gf: 2, ga: 3, pts: 3 },
  { code: 'WID', m: 2, gf: 1, ga: 3, pts: 1 },
];
const MT_G3 = [
  { code: 'TY',  m: 3, gf: 6, ga: 2, pts: 9 },
  { code: 'LEG', m: 3, gf: 4, ga: 3, pts: 4 },
  { code: 'WIS', m: 3, gf: 3, ga: 4, pts: 4 },
  { code: 'WID', m: 3, gf: 2, ga: 6, pts: 1 },
];
const MT_OUT = [
  { code: 'LEG', m: 3, gf: 6, ga: 2, pts: 7 },
  { code: 'WIS', m: 3, gf: 4, ga: 3, pts: 6 },
  { code: 'TY',  m: 3, gf: 3, ga: 4, pts: 3 },
  { code: 'WID', m: 3, gf: 2, ga: 6, pts: 1 },
];
const MT_LADDER = (stage) => [
  { stage: 'Półfinał', opponent: 'WIS', state: stage === 'sf' ? 'current' : 'done', score: stage !== 'sf' ? '2:1' : undefined },
  { stage: 'Finał', opponent: stage === 'sf' ? null : 'LEG', state: stage === 'sf' ? 'locked' : 'current' },
];
const MT_PATH_WIN = [
  { stage: 'Grupa', opp: 'WID', score: '2:0', win: true },
  { stage: 'Półfinał', opp: 'WIS', score: '2:1', win: true },
  { stage: 'Finał', opp: 'LEG', score: '1:0', win: true },
];
const MT_PATH_FINALLOSS = [
  { stage: 'Grupa', opp: 'WID', score: '2:0', win: true },
  { stage: 'Półfinał', opp: 'WIS', score: '2:1', win: true },
  { stage: 'Finał', opp: 'LEG', score: '0:1', loss: true },
];
const MT_PATH_GROUPOUT = [
  { stage: 'Mecz 1', opp: 'LEG', score: '0:1', loss: true },
  { stage: 'Mecz 2', opp: 'WIS', score: '1:1', draw: true },
  { stage: 'Mecz 3', opp: 'WID', score: '2:1', win: true },
];

// ── EURO 2016 — stany tabeli (Grupa C, gracz = POL) ──
const EU_G0 = [
  { code: 'GER', m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'POL', m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'UKR', m: 0, gf: 0, ga: 0, pts: 0 },
  { code: 'NIR', m: 0, gf: 0, ga: 0, pts: 0 },
];
const EU_G1 = [
  { code: 'GER', m: 1, gf: 2, ga: 0, pts: 3 },
  { code: 'POL', m: 1, gf: 1, ga: 0, pts: 3 },
  { code: 'NIR', m: 1, gf: 0, ga: 1, pts: 0 },
  { code: 'UKR', m: 1, gf: 0, ga: 2, pts: 0 },
];
const EU_G2 = [
  { code: 'GER', m: 2, gf: 2, ga: 0, pts: 4 },
  { code: 'POL', m: 2, gf: 1, ga: 0, pts: 4 },
  { code: 'NIR', m: 2, gf: 2, ga: 1, pts: 3 },
  { code: 'UKR', m: 2, gf: 0, ga: 4, pts: 0 },
];
const EU_G3 = [
  { code: 'GER', m: 3, gf: 3, ga: 0, pts: 7 },
  { code: 'POL', m: 3, gf: 2, ga: 0, pts: 7 },
  { code: 'NIR', m: 3, gf: 2, ga: 2, pts: 3 },
  { code: 'UKR', m: 3, gf: 0, ga: 5, pts: 0 },
];
const EU_OUT = [
  { code: 'GER', m: 3, gf: 5, ga: 1, pts: 9 },
  { code: 'UKR', m: 3, gf: 3, ga: 2, pts: 4 },
  { code: 'NIR', m: 3, gf: 2, ga: 3, pts: 4 },
  { code: 'POL', m: 3, gf: 1, ga: 4, pts: 1 },
];
// wariant: Polska 3. w grupie, ale awansuje jako jedna z najlepszych ekip z 3. miejsc
const EU_THIRD = [
  { code: 'GER', m: 3, gf: 5, ga: 1, pts: 9 },
  { code: 'UKR', m: 3, gf: 3, ga: 2, pts: 4 },
  { code: 'POL', m: 3, gf: 3, ga: 3, pts: 4 },
  { code: 'NIR', m: 3, gf: 1, ga: 3, pts: 3 },
];
const EU_LADDER = (reached) => {
  // reached: 'r16' | 'qf' | 'sf' | 'final' | 'champ'
  const order = ['r16', 'qf', 'sf', 'final'];
  const idx = order.indexOf(reached);
  const opp = { r16: 'SUI', qf: 'POR', sf: 'GER', final: 'FRA' };
  const sc = { r16: '1:1 k.', qf: '2:1', sf: '1:0', final: '2:1' };
  const names = { r16: '1/8 finału', qf: 'Ćwierćfinał', sf: 'Półfinał', final: 'Finał' };
  return order.map((k, i) => ({
    stage: names[k], opponent: i <= idx ? opp[k] : null,
    state: i < idx || reached === 'champ' ? 'done' : i === idx ? 'current' : 'locked',
    score: (i < idx || reached === 'champ') ? sc[k] : undefined,
  }));
};
const EU_PATH = {
  champ: [
    { stage: 'Grupa', opp: 'GER', score: '2. miejsce', draw: true },
    { stage: '1/8', opp: 'SUI', score: '1:1 k.', win: true },
    { stage: 'Ćwierćf.', opp: 'POR', score: '2:1', win: true },
    { stage: 'Półfinał', opp: 'GER', score: '1:0', win: true },
    { stage: 'Finał', opp: 'FRA', score: '2:1', win: true },
  ],
  finalLoss: [
    { stage: '1/8', opp: 'SUI', score: '1:1 k.', win: true },
    { stage: 'Ćwierćf.', opp: 'POR', score: '2:1', win: true },
    { stage: 'Półfinał', opp: 'GER', score: '1:0', win: true },
    { stage: 'Finał', opp: 'FRA', score: '0:1', loss: true },
  ],
  sf: [
    { stage: '1/8', opp: 'SUI', score: '1:1 k.', win: true },
    { stage: 'Ćwierćf.', opp: 'POR', score: '2:1', win: true },
    { stage: 'Półfinał', opp: 'GER', score: '0:2', loss: true },
  ],
  qf: [
    { stage: '1/8', opp: 'SUI', score: '1:1 k.', win: true },
    { stage: 'Ćwierćf.', opp: 'POR', score: '1:1 k.', loss: true },
  ],
  r16: [
    { stage: '1/8', opp: 'SUI', score: '0:1', loss: true },
  ],
  groupOut: [
    { stage: 'Mecz 1', opp: 'NIR', score: '0:1', loss: true },
    { stage: 'Mecz 2', opp: 'GER', score: '0:2', loss: true },
    { stage: 'Mecz 3', opp: 'UKR', score: '1:1', draw: true },
  ],
};

Object.assign(window, {
  TF_DATA: {
    MT_G0, MT_G1, MT_G2, MT_G3, MT_OUT, MT_LADDER, MT_PATH_WIN, MT_PATH_FINALLOSS, MT_PATH_GROUPOUT,
    EU_G0, EU_G1, EU_G2, EU_G3, EU_OUT, EU_THIRD, EU_LADDER, EU_PATH,
  },
});
