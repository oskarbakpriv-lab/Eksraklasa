/* ============================================================
   Ekrany: miniturniej + ekran końcowy
   ============================================================ */

const TOURNAMENT_OPPONENTS = [
  { round: 'Ćwierćfinał', name: 'Ruch Chorzów', era: 'lata 70.' },
  { round: 'Półfinał', name: 'Górnik Zabrze', era: 'lata 80.' },
  { round: 'Finał', name: 'Legia Warszawa', era: 'lata 90.' },
];

// prosta, czytelna symulacja wyniku (bez ujawniania liczb technicznych)
function simulateScore(strength) {
  // strength 0..1 → przewaga goli
  const base = Math.random();
  const me = Math.round(1 + strength * 3 + base * 1.5);
  const opp = Math.round(0.5 + (1 - strength) * 2.2 + Math.random() * 1.2);
  return { me, opp };
}

// ── EKRAN 6: MINITURNIEJ ────────────────────────────────────
function TournamentScreen({ teamStrength, onFinish, onBack }) {
  const [round, setRound] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const [pending, setPending] = React.useState(null); // wynik aktualnego meczu przed „Dalej"

  const current = TOURNAMENT_OPPONENTS[round];
  const done = round >= TOURNAMENT_OPPONENTS.length;

  const playMatch = () => {
    const s = simulateScore(teamStrength);
    const won = s.me > s.opp || (s.me === s.opp && Math.random() > 0.4);
    const fixed = s.me === s.opp ? { me: s.me + 1, opp: s.opp } : s;
    setPending({ ...current, me: fixed.me, opp: fixed.opp, won: fixed.me > fixed.opp });
  };

  const next = () => {
    const newResults = [...results, pending];
    setPending(null);
    if (!pending.won || round === TOURNAMENT_OPPONENTS.length - 1) {
      onFinish(newResults);
    } else {
      setResults(newResults);
      setRound((r) => r + 1);
    }
  };

  return (
    <>
      <TopBar modeName="turniej" onBack={onBack} />
      <div className="scroll" style={{ flex: 1, padding: 'var(--pad)' }}>
        <div className="kicker">Drabinka pucharowa</div>
        <h1 className="head head-xl" style={{ marginTop: 2, marginBottom: 14 }}>Miniturniej</h1>

        {/* oś rund */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TOURNAMENT_OPPONENTS.map((o, i) => {
            const res = results[i];
            const isCurrent = i === round && !pending;
            const isPending = i === round && pending;
            return (
              <div key={i} className="card" style={{
                padding: '12px 14px',
                borderLeft: `5px solid ${res ? (res.won ? 'var(--b-tech)' : 'var(--accent)') : (i === round ? 'var(--accent)' : 'var(--line)')}`,
                opacity: i > round ? 0.5 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="kicker" style={{ fontSize: '0.62rem', width: 76 }}>{o.round}</span>
                  <div style={{ flex: 1 }}>
                    <div className="head head-md" style={{ fontSize: '1rem' }}>vs {o.name}</div>
                    <div className="mute2" style={{ fontSize: '0.78rem' }}>{o.era}</div>
                  </div>
                  {res && (
                    <div style={{ textAlign: 'right' }}>
                      <span className="num" style={{ fontSize: '1.3rem', color: res.won ? 'var(--b-tech)' : 'var(--accent)' }}>
                        {res.me}:{res.opp}
                      </span>
                      <div className="head" style={{ fontSize: '0.66rem', color: res.won ? 'var(--b-tech)' : 'var(--accent)' }}>
                        {res.won ? 'Awans' : 'Porażka'}
                      </div>
                    </div>
                  )}
                  {(isPending) && (
                    <span className="num" style={{ fontSize: '1.3rem', color: pending.won ? 'var(--b-tech)' : 'var(--accent)' }}>
                      {pending.me}:{pending.opp}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* duży aktualny mecz */}
        {!done && (
          <div className="card" style={{ marginTop: 18, padding: '18px 16px', textAlign: 'center', background: 'var(--paper-3)' }}>
            <div className="kicker">{current.round} · teraz grasz</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '12px 0' }}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div className="head head-md">Twoja XI</div>
              </div>
              <div className="num" style={{ fontSize: '1.6rem', color: 'var(--ink-mute)' }}>
                {pending ? `${pending.me}:${pending.opp}` : 'vs'}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div className="head head-md">{current.name}</div>
              </div>
            </div>
            {pending && (
              <div className="head" style={{
                fontSize: '1rem', marginBottom: 12,
                color: pending.won ? 'var(--b-tech)' : 'var(--accent)',
              }}>
                {pending.won ? 'Wygrana — awans dalej!' : 'Koniec przygody w tej rundzie.'}
              </div>
            )}
          </div>
        )}
      </div>

      <CTABar>
        {!pending
          ? <button className="btn btn-primary btn-block" onClick={playMatch}>Rozegraj mecz</button>
          : <button className="btn btn-primary btn-block" onClick={next}>
              {pending.won && round < TOURNAMENT_OPPONENTS.length - 1 ? 'Dalej →' : 'Zobacz wynik turnieju'}
            </button>}
      </CTABar>
    </>
  );
}

// ── EKRAN 7: EKRAN KOŃCOWY ──────────────────────────────────
function placement(results) {
  const wins = results.filter((r) => r.won).length;
  const lastWon = results.length && results[results.length - 1].won;
  if (lastWon && results.length === 3) return { title: 'Mistrz turnieju!', sub: 'Wygrana w finale', icon: 'cup', tone: 'var(--b-leg)' };
  if (results.length === 3) return { title: 'Finalista', sub: 'Srebro — porażka w finale', icon: 'silver', tone: 'var(--ink-soft)' };
  if (wins >= 1) return { title: 'Półfinalista', sub: 'Odpadłeś w półfinale', icon: 'bronze', tone: '#b9892b' };
  return { title: 'Ćwierćfinalista', sub: 'Koniec w pierwszej rundzie', icon: 'bronze', tone: 'var(--ink-mute)' };
}

function Trophy({ tone }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" style={{ display: 'block' }}>
      <path d="M18 10h28v10a14 14 0 0 1-28 0z" fill={tone} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 14H10v4a8 8 0 0 0 8 8M46 14h8v4a8 8 0 0 1-8 8" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="27" y="34" width="10" height="8" fill={tone} stroke="var(--ink)" strokeWidth="2"/>
      <rect x="20" y="42" width="24" height="6" rx="1" fill={tone} stroke="var(--ink)" strokeWidth="2"/>
      <rect x="16" y="48" width="32" height="6" rx="1" fill="var(--ink)"/>
    </svg>
  );
}

function FinalScreen({ results, lineup, onReplay, onBack }) {
  const { POS_LABELS } = window.GAME_DATA;
  const p = placement(results);
  const wins = results.filter((r) => r.won).length;
  const order = ['NAP', 'POM', 'OBR', 'BR'];
  const all = Object.values(lineup).filter(Boolean);
  const byPos = order.map((pos) => ({
    pos,
    players: all.filter((pl) => pl.pos === pos),
  }));

  return (
    <>
      <div className="scroll" style={{ flex: 1 }}>
        {/* nagłówek wyniku */}
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '30px var(--pad) 22px', textAlign: 'center',
        }}>
          <div className="kicker" style={{ color: p.tone }}>Koniec turnieju</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 8px' }}><Trophy tone={p.tone} /></div>
          <h1 className="head" style={{ fontSize: '2.1rem', fontWeight: 700 }}>{p.title}</h1>
          <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.95rem' }}>{p.sub}</p>

          {/* bilans */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
            <div>
              <div className="num" style={{ fontSize: '1.7rem' }}>{results.length}</div>
              <div className="head" style={{ fontSize: '0.6rem', opacity: 0.7 }}>mecze</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.25)' }} />
            <div>
              <div className="num" style={{ fontSize: '1.7rem', color: 'var(--b-tech)' }}>{wins}</div>
              <div className="head" style={{ fontSize: '0.6rem', opacity: 0.7 }}>wygrane</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.25)' }} />
            <div>
              <div className="num" style={{ fontSize: '1.7rem' }}>{results.length - wins}</div>
              <div className="head" style={{ fontSize: '0.6rem', opacity: 0.7 }}>porażki</div>
            </div>
          </div>
        </div>

        {/* wyniki meczów */}
        <div style={{ padding: 'var(--pad)' }}>
          <div className="rule" style={{ fontSize: '0.7rem', letterSpacing: '0.16em', marginBottom: 10 }}>Przebieg</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {results.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderLeft: `4px solid ${r.won ? 'var(--b-tech)' : 'var(--accent)'}`, background: 'var(--paper-2)', borderRadius: 4 }}>
                <span className="kicker" style={{ fontSize: '0.6rem', width: 76 }}>{r.round}</span>
                <span className="head" style={{ flex: 1, fontSize: '0.92rem' }}>vs {r.name}</span>
                <span className="num" style={{ color: r.won ? 'var(--b-tech)' : 'var(--accent)' }}>{r.me}:{r.opp}</span>
              </div>
            ))}
          </div>

          {/* finalny skład */}
          <div className="rule" style={{ fontSize: '0.7rem', letterSpacing: '0.16em', margin: '20px 0 10px' }}>Twoja finalna jedenastka</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {byPos.map(({ pos, players }) => (
              <div key={pos}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <PosChip pos={pos} />
                  <span className="head head-md" style={{ fontSize: '0.95rem' }}>{POS_LABELS[pos].full}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {players.length ? players.map((pl) => (
                    <div key={pl.id} className={`pos-${pos}`} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 11px', borderLeft: '4px solid var(--pos)', background: 'var(--paper-2)', borderRadius: 4 }}>
                      <span className="head" style={{ flex: 1, fontSize: '0.92rem' }}>{pl.name}</span>
                      <BadgeRow codes={pl.badges.slice(0, 3)} />
                    </div>
                  )) : <div className="mute2" style={{ fontSize: '0.82rem', padding: '4px 0' }}>— brak obsady —</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTABar>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onBack}>Skład</button>
        <button className="btn btn-primary" style={{ flex: 1.6 }} onClick={onReplay}>Zagraj ponownie</button>
      </CTABar>
    </>
  );
}

Object.assign(window, { TournamentScreen, FinalScreen, placement });
