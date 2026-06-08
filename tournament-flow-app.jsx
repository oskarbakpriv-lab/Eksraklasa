/* ============================================================
   Turnieje 1.0 — ROUTER + EKRANY klikalnej makiety.
   Reużywa komponentów z tournament-screens.jsx / event-cards.jsx.
   Dane: window.TF_FLOWS (mini, euro). Stan ekranu w localStorage.
   ============================================================ */
const { FlagChip, StatusBanner, StandingsTable, FixtureRow, MatchCard, Ladder, TournamentTile, EndScreen, EventCard, teamName } = window;
const OS = "'Oswald', system-ui, sans-serif";
const FLOWS = window.TF_FLOWS;

// płaska mapa id → {step, flow}
const STEP_MAP = {};
['mini', 'euro'].forEach((fk) => FLOWS[fk].forEach((s, i) => { STEP_MAP[s.id] = { step: s, flow: fk, idx: i }; }));
const isOffline = (id) => (id.includes('end-') && !id.endsWith('win')) || id.includes('advance-third');

function nextId(id) {
  const e = STEP_MAP[id];
  if (!e) return null;
  if (e.step.to) return e.step.to;
  const arr = FLOWS[e.flow];
  // happy-path: kolejny krok, ale pomiń ekrany-warianty (id zawiera 'end-' i nie jest bieżącym)
  const nxt = arr[e.idx + 1];
  return nxt ? nxt.id : 'hub';
}

// ── szkielet strony (papier) ──
function ScreenHead({ kicker, title, onBack }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && <button onClick={onBack} aria-label="Wstecz" style={{ width: 34, height: 34, borderRadius: 99, border: '1.5px solid var(--line-2)', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <svg width="10" height="16" viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" stroke="var(--ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>}
        <div style={{ minWidth: 0 }}>
          <div className="kicker" style={{ fontSize: '0.6rem', marginBottom: 4, whiteSpace: 'nowrap' }}>{kicker}</div>
          <div className="head head-lg" style={{ fontSize: '1.32rem', lineHeight: 1, whiteSpace: 'nowrap' }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
function PrimaryBtn({ label, onClick, solid }) {
  return (
    <button onClick={onClick} className={`btn ${solid ? 'btn-solid' : 'btn-primary'} btn-block`} style={{ marginTop: 16, fontSize: '1.02rem' }}>
      {label}
      <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}
function VariantBtns({ variants, go }) {
  if (!variants) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
      {variants.map((v, i) => (
        <button key={i} onClick={() => go(v.to)} style={{
          width: '100%', background: 'transparent', border: '1.5px dashed var(--line-2)', color: 'var(--ink-soft)',
          fontFamily: OS, fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase',
          padding: '9px 12px', borderRadius: 5, cursor: 'pointer',
        }}>{v.label}</button>
      ))}
    </div>
  );
}

// ── HUB ──
function HubScreen({ go }) {
  return (
    <React.Fragment>
      <ScreenHead kicker="Ekstraklasa Retro Draft" title="Turnieje" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <TournamentTile kicker="Tryb podstawowy" title="Miniturniej Ekstraklasy"
          desc="Grupa czterech ekip, tabela na żywo i krótka faza pucharowa. Szybki sprawdzian składu."
          meta="Grupa 4" cta="Zagraj fazę grupową" state="open" onCta={() => go('mt-start')} />
        <TournamentTile kicker="Turniej historyczny" title="EURO 2016 Retro"
          desc="Poprowadź Polskę od grupy z Niemcami, Ukrainą i Irlandią Północną aż do finału."
          cta="Rozpocznij turniej" state="open" accent onCta={() => go('eu-intro')} />
        <div className="rule" style={{ fontSize: '0.64rem', letterSpacing: '0.16em', margin: '4px 0' }}>Wkrótce</div>
        <TournamentTile kicker="Turniej historyczny" title="Mundial 2002" state="locked"
          desc="Poprowadź Polskę przez turniej w Korei i Japonii. Korea, Portugalia, USA — i szansa, żeby napisać historię na nowo."
          soonNote="W przygotowaniu — pojawi się w kolejnej aktualizacji." />
      </div>
    </React.Fragment>
  );
}

// ── ekran startowy turnieju ──
function StartScreen({ step, go, onBack }) {
  return (
    <React.Fragment>
      <ScreenHead kicker={step.kicker} title={step.title} onBack={onBack} />
      <p className="muted" style={{ margin: '0 2px 14px', fontSize: '1rem', lineHeight: 1.42 }}>{step.intro}</p>
      <div className="card" style={{ padding: '14px 15px 16px' }}>
        <div className="kicker" style={{ fontSize: '0.6rem' }}>Zasady</div>
        <ul style={{ margin: '9px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {step.rules.map((r, i) => (
            <li key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: '0.96rem', lineHeight: 1.3 }}>
              <span style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <hr className="dbl-rule" style={{ margin: '13px 0' }} />
        <div className="kicker" style={{ fontSize: '0.6rem', marginBottom: 9 }}>Twoja grupa</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {step.teams.map((c) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <FlagChip code={c} />
              <span className="head head-md" style={{ flex: 1, fontSize: '1.04rem' }}>{teamName(c)}</span>
              {c === step.you && <span className="badge" style={{ background: 'var(--accent)', color: '#fff', height: 20 }}>Ty</span>}
            </div>
          ))}
        </div>
      </div>
      <PrimaryBtn label={step.cta} onClick={() => go(nextId(step.id))} />
    </React.Fragment>
  );
}

// ── ekran grupy (tabela + terminarz) ──
function GroupScreen({ step, go, onBack }) {
  return (
    <React.Fragment>
      <ScreenHead kicker={step.kicker} title={step.title} onBack={onBack} />
      <StandingsTable rows={step.rows} highlight={step.highlight} advance={step.advance} thirdChance={step.thirdChance} />
      <StatusBanner tone={step.tone} text={step.text} />
      <div className="card" style={{ padding: '4px 15px 12px', marginTop: 14 }}>
        <div className="kicker" style={{ fontSize: '0.6rem', padding: '12px 0 2px' }}>Terminarz Polski</div>
        {step.fixtures.map((f, i) => (
          <FixtureRow key={i} when={f.when} home={f.home} away={f.away} score={f.score} you={f.you} />
        ))}
      </div>
      <PrimaryBtn label={step.cta} onClick={() => go(nextId(step.id))} />
    </React.Fragment>
  );
}

// ── tabela po meczu ──
function TableScreen({ step, go, onBack }) {
  return (
    <React.Fragment>
      <ScreenHead kicker={step.kicker} title={step.title} onBack={onBack} />
      <StandingsTable rows={step.rows} highlight={step.highlight} advance={step.advance} thirdChance={step.thirdChance} />
      <StatusBanner tone={step.tone} text={step.text} />
      <PrimaryBtn label={step.cta || 'Dalej'} onClick={() => go(nextId(step.id))} />
      <VariantBtns variants={step.variants} go={go} />
    </React.Fragment>
  );
}

// ── awans z grupy ──
function AdvanceScreen({ step, go, onBack }) {
  return (
    <React.Fragment>
      <div style={{ textAlign: 'center', marginTop: 2 }}>
        <span style={{ display: 'inline-block', background: 'var(--b-tech)', color: '#fff', fontFamily: OS, fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.16em', padding: '4px 12px', borderRadius: 2, textTransform: 'uppercase' }}>{step.badge}</span>
      </div>
      <hr className="dbl-rule" style={{ margin: '12px 0' }} />
      <h1 className="head" style={{ fontSize: '1.9rem', fontWeight: 700, textAlign: 'center', lineHeight: 0.98 }}>{step.title}</h1>
      <p className="muted" style={{ margin: '8px 0 0', fontSize: '1rem', textAlign: 'center', lineHeight: 1.36 }}>{step.sub}</p>
      <div style={{ marginTop: 16 }}>
        <StandingsTable rows={step.rows} highlight={step.highlight} advance={step.advance} thirdChance={step.thirdChance} />
      </div>
      <PrimaryBtn label={step.cta || 'Dalej'} onClick={() => go(nextId(step.id))} />
    </React.Fragment>
  );
}

// ── drabinka ──
function LadderScreen({ step, go, onBack }) {
  return (
    <React.Fragment>
      <ScreenHead kicker={step.kicker} title={step.title} onBack={onBack} />
      <Ladder steps={step.steps} />
      <p className="mute2" style={{ margin: '14px 4px 0', fontSize: '0.82rem', textAlign: 'center' }}>
        Wygrana = krok wyżej. Porażka kończy turniej.
      </p>
      <PrimaryBtn label={step.cta || 'Dalej'} onClick={() => go(nextId(step.id))} />
    </React.Fragment>
  );
}

// ── zdarzenie (wycinek prasowy) ──
function EventScreen({ step, go }) {
  const [chosen, setChosen] = React.useState(undefined);
  const ev = step.ev;
  const hasChoices = !!ev.choices;
  return (
    <div style={{ paddingTop: 2 }}>
      <EventCard {...ev} chosen={hasChoices ? chosen : undefined}
        onPick={hasChoices ? setChosen : undefined}
        onCta={() => go(nextId(step.id))} />
    </div>
  );
}

// ── ekran meczu (przed / wynik) ──
function MatchScreen({ step, go, onBack }) {
  const played = step.type === 'matchRes';
  return (
    <React.Fragment>
      {onBack && <div style={{ marginBottom: 10 }}><button onClick={onBack} aria-label="Wstecz" style={{ width: 34, height: 34, borderRadius: 99, border: '1.5px solid var(--line-2)', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="10" height="16" viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" stroke="var(--ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button></div>}
      <MatchCard stage={step.stage} home={step.home} away={step.away} played={played}
        desc={step.desc} formHome={step.formHome} formAway={step.formAway}
        score={step.score} comment={step.comment} cta={step.cta}
        onCta={() => go(nextId(step.id))} />
      <VariantBtns variants={step.variants} go={go} />
    </React.Fragment>
  );
}

// ── ekran końcowy ──
function EndScreenWrap({ step, go }) {
  return (
    <div style={{ paddingTop: 2 }}>
      {step.altTable && (
        <div style={{ marginBottom: 16 }}>
          <StandingsTable rows={step.altTable} highlight={step.altHighlight} advance={2} />
        </div>
      )}
      <EndScreen outcome={step.outcome} headline={step.headline} sub={step.sub}
        path={step.path} bestPlayer={step.bestPlayer} lineupNote={step.lineupNote}
        comment={step.comment} ctaLabel={step.ctaLabel} pathLabel={step.pathLabel} onCta={() => go(step.to || 'hub')} />
    </div>
  );
}

function renderStep(step, go, onBack) {
  switch (step.type) {
    case 'start': return <StartScreen step={step} go={go} onBack={onBack} />;
    case 'group': return <GroupScreen step={step} go={go} onBack={onBack} />;
    case 'table': return <TableScreen step={step} go={go} onBack={onBack} />;
    case 'advance': return <AdvanceScreen step={step} go={go} onBack={onBack} />;
    case 'ladder': return <LadderScreen step={step} go={go} onBack={onBack} />;
    case 'event': return <EventScreen step={step} go={go} />;
    case 'matchPre': case 'matchRes': return <MatchScreen step={step} go={go} onBack={onBack} />;
    case 'end': return <EndScreenWrap step={step} go={go} />;
    default: return <div>?</div>;
  }
}

// ── MAPA EKRANÓW (do testowania) ──
function ScreenMap({ onJump, onClose, current }) {
  const sections = [{ key: 'mini', label: 'Miniturniej Ekstraklasy' }, { key: 'euro', label: 'EURO 2016 Retro' }];
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(20,17,13,0.55)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxHeight: '86%', overflowY: 'auto', background: 'var(--paper)', borderRadius: '14px 14px 0 0', padding: '16px 16px 22px', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="head head-lg" style={{ fontSize: '1.2rem' }}>Mapa ekranów</span>
          <button onClick={onClose} style={{ border: 'none', background: 'var(--paper-3)', borderRadius: 99, width: 30, height: 30, cursor: 'pointer', fontFamily: OS, fontWeight: 700 }}>✕</button>
        </div>
        <button onClick={() => onJump('hub')} style={mapItemStyle(current === 'hub')}>Hub turniejów</button>
        {sections.map((sec) => (
          <div key={sec.key} style={{ marginTop: 14 }}>
            <div className="kicker" style={{ fontSize: '0.6rem', marginBottom: 7 }}>{sec.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {FLOWS[sec.key].map((s) => (
                <button key={s.id} onClick={() => onJump(s.id)} style={mapItemStyle(current === s.id, isOffline(s.id))}>
                  {stepLabel(s)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function mapItemStyle(active, variant) {
  return {
    width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 6,
    border: active ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
    background: active ? 'var(--paper-3)' : 'var(--paper-2)',
    color: variant ? 'var(--ink-soft)' : 'var(--ink)',
    fontFamily: 'Barlow, sans-serif', fontSize: '0.9rem', padding: '9px 12px',
    fontStyle: variant ? 'italic' : 'normal',
  };
}
function stepLabel(s) {
  const T = { start: 'Ekran startowy', group: 'Grupa + terminarz', table: 'Tabela live', advance: 'Awans z grupy', ladder: 'Faza pucharowa', event: 'Zdarzenie', matchPre: 'Mecz — przed', matchRes: 'Mecz — wynik', end: 'Ekran końcowy' };
  let base = T[s.type] || s.type;
  if (s.type === 'matchPre' || s.type === 'matchRes') base += ` · ${teamName(s.home)}–${teamName(s.away)}`;
  if (s.type === 'event') base += ` · ${s.ev.title}`;
  if (s.type === 'end') base += ` · ${s.headline}`;
  if (s.type === 'table' || s.type === 'group') base += ` · ${s.title}`;
  return base;
}

// ── APP / ROUTER ──
function App() {
  const [cur, setCur] = React.useState(() => localStorage.getItem('tf_cur') || 'hub');
  const [hist, setHist] = React.useState([]);
  const [mapOpen, setMapOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => { localStorage.setItem('tf_cur', cur); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [cur]);

  const go = (id) => { if (!id) return; setHist((h) => [...h, cur]); setCur(id); setMapOpen(false); };
  const back = () => { setHist((h) => { if (!h.length) { setCur('hub'); return h; } const n = [...h]; const prev = n.pop(); setCur(prev); return n; }); };
  const jump = (id) => { setHist((h) => (cur !== id ? [...h, cur] : h)); setCur(id); setMapOpen(false); };

  const entry = STEP_MAP[cur];
  const flowKey = entry ? entry.flow : null;
  const flowLabel = flowKey === 'mini' ? 'Miniturniej' : flowKey === 'euro' ? 'EURO 2016' : 'Turnieje';
  const onPath = entry && !isOffline(cur);
  const stepNo = entry ? entry.idx + 1 : 0;
  const stepTotal = flowKey ? FLOWS[flowKey].filter((s) => !isOffline(s.id)).length : 0;

  const onBack = (hist.length || cur !== 'hub') ? back : null;

  return (
    <div className="tf-phone theme-light">
      {/* górny pasek */}
      <div className="tf-top">
        <button onClick={() => go('hub')} aria-label="Hub" className="tf-top-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ textAlign: 'center', minWidth: 0 }}>
          <div style={{ fontFamily: OS, fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{flowLabel}</div>
          {entry && <div style={{ fontFamily: OS, fontSize: '0.6rem', letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}>{onPath ? `Krok ${stepNo} / ${stepTotal}` : 'Wariant zakończenia'}</div>}
        </div>
        <button onClick={() => setMapOpen(true)} aria-label="Mapa ekranów" className="tf-top-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* treść (papier) */}
      <div className="ev-board theme-light tf-board" ref={scrollRef}>
        <div style={{ padding: 16 }}>
          {cur === 'hub' ? <HubScreen go={go} /> : entry ? renderStep(entry.step, go, onBack) : <HubScreen go={go} />}
        </div>
      </div>

      {mapOpen && <ScreenMap onJump={jump} onClose={() => setMapOpen(false)} current={cur} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('stage')).render(<App />);
