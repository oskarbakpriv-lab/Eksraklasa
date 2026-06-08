/* ============================================================
   App — maszyna stanów całego flow + ekran składu + Tweaks
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#c8102e",
  "density": "regular",
  "fontScale": 16
}/*EDITMODE-END*/;

const DENSITY = {
  compact: { gap: '9px', pad: '12px', tap: '46px' },
  regular: { gap: '12px', pad: '16px', tap: '52px' },
  comfy:   { gap: '15px', pad: '20px', tap: '58px' },
};

// losowanie puli (ekipy)
function shuffle(a) { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }
function drawPool() {
  const { PLAYERS } = window.GAME_DATA;
  const take = (pos, n) => shuffle(PLAYERS.filter((p) => p.pos === pos)).slice(0, n);
  return [...take('BR', 3), ...take('OBR', 6), ...take('POM', 6), ...take('NAP', 6)];
}

// zgranie (proste, do etykiety — nie pokazujemy liczby)
function computeChem(players) {
  let chem = 0;
  players.forEach((p, i) => {
    players.forEach((q, j) => {
      if (i < j) {
        if (p.club === q.club) chem += 2;
        else if (p.era === q.era) chem += 1;
      }
    });
  });
  return Math.min(12, chem);
}
function teamStrengthOf(players) {
  if (!players.length) return 0.25;
  const lvl = { 'Światowa klasa': 1, 'Mistrz ligi': 0.75, 'Solidny ligowiec': 0.5, 'Objawienie': 0.5 };
  const avg = players.reduce((s, p) => s + (lvl[p.klasa] || 0.5), 0) / players.length;
  const chemBonus = computeChem(players) / 12 * 0.2;
  const fillBonus = players.length / 11 * 0.15;
  return Math.max(0.2, Math.min(1, avg * 0.75 + chemBonus + fillBonus));
}

// ── EKRAN 5: SKŁAD (boisko / lista) ─────────────────────────
function SquadScreen({ mode, slots, formation, lineup, manager, onSlotTap, onReDraft, onPlay, onBack, onPickManager, onOpenTasks, onOpenFormation }) {
  const [view, setView] = React.useState('pitch');
  const { POS_LABELS } = window.GAME_DATA;
  const filled = Object.values(lineup).filter(Boolean).length;
  const players = Object.values(lineup).filter(Boolean);
  const chem = computeChem(players) + managerChemBonus(manager, players);
  const spent = players.reduce((s, p) => s + (p.cost || 0), 0);
  const overBudget = mode.hasBudget && spent > mode.budget;
  const full = filled >= 11;
  const remaining = 11 - filled;
  const firstEmpty = slots.find((s) => !lineup[s.slot]);

  const order = ['NAP', 'POM', 'OBR', 'BR'];
  const pack = window.GAME_DATA.taskPackFor(mode.id);

  return (
    <>
      <TopBar modeName={mode.name} onBack={onBack} right={
        <button onClick={onReDraft} className="head" style={{
          border: '1.5px solid var(--line-2)', background: 'transparent', color: 'var(--ink)',
          borderRadius: 999, padding: '7px 12px', fontSize: '0.72rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 4v5h-5" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Ekipa
        </button>
      } />

      <div className="scroll" style={{ flex: 1, padding: '12px var(--pad) 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SquadSummary filled={filled} total={11} chem={chem} />
        {/* MENEDŻER + BUDŻET + ZADANIA — kompaktowo, tylko Normal/Hardcore */}
        {mode.hasBudget && (
          <MechTiles
            mode={mode} manager={manager} spent={spent} players={players} pack={pack}
            onPickManager={onPickManager} onOpenTasks={onOpenTasks}
          />
        )}

        {/* FORMACJA — obowiązkowy kafelek we wszystkich trybach, nad zakładkami */}
        <FormationStrip formation={formation} onTap={onOpenFormation} />

        {/* przełącznik boisko / lista / TURNIEJE (wyeksponowane) — lepkie */}
        <div style={{
          position: 'sticky', top: -12, zIndex: 5, margin: '0 calc(var(--pad) * -1)',
          padding: '8px var(--pad) 4px', background: 'var(--paper)',
        }}>
          <div style={{ display: 'flex', gap: 6, background: 'var(--paper-2)', border: '1.5px solid var(--line)', borderRadius: 8, padding: 4 }}>
            {[['pitch', 'Boisko'], ['list', 'Lista']].map(([k, label]) => (
              <button key={k} onClick={() => setView(k)} className="head" style={{
                flex: 1, minHeight: 42, border: 'none', borderRadius: 5, cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.84rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: view === k ? 'var(--ink)' : 'transparent',
                color: view === k ? 'var(--paper)' : 'var(--ink-soft)',
              }}>{label}</button>
            ))}
            {/* TURNIEJE — wyeksponowane (akcent), klikalne, ze znacznikiem WKRÓTCE */}
            <button onClick={() => setView('tournaments')} className="head" style={{
              flex: 1.25, minHeight: 42, borderRadius: 5, cursor: 'pointer', position: 'relative',
              textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.84rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              border: view === 'tournaments' ? 'none' : '1.5px solid var(--accent)',
              background: view === 'tournaments' ? 'var(--accent)' : 'transparent',
              color: view === 'tournaments' ? 'var(--accent-ink)' : 'var(--accent)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M6 4h12v3a6 6 0 0 1-12 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 18h6M10 18v-3M14 18v-3M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Turnieje
            </button>
          </div>
        </div>

        {view === 'pitch' && (
          <Pitch slots={slots} formation={formation} lineup={lineup} onSlotTap={onSlotTap} />
        )}
        {view === 'tournaments' && <TournamentHub full={full} filled={filled} onPlay={onPlay} />}
        {view === 'list' && (
          <div className="album-page">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="head head-md">Album drużyny</span>
              <span className="mute2 head" style={{ fontSize: '0.72rem' }}>{filled}/11 wklejonych</span>
            </div>
            {order.map((pos) => {
              const posSlots = slots.filter((s) => s.pos === pos);
              if (!posSlots.length) return null;
              return (
                <div key={pos} style={{ marginBottom: 16 }}>
                  <div className="album-band">
                    <PosChip pos={pos} />
                    <span className="head" style={{ flex: 1, fontSize: '0.98rem' }}>{POS_LABELS[pos].full}</span>
                    <span className="head" style={{ fontSize: '0.74rem', opacity: 0.75 }}>
                      {posSlots.filter((s) => lineup[s.slot]).length}/{posSlots.length}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {posSlots.map((s) => {
                      const pl = lineup[s.slot];
                      return pl ? (
                        <button key={s.slot} onClick={() => onSlotTap(s)} style={{
                          cursor: 'pointer', padding: 0, border: 'none', background: 'transparent',
                        }}>
                          <PlayerSticker player={pl} w="100%" />
                        </button>
                      ) : (
                        <button key={s.slot} onClick={() => onSlotTap(s)} className="sticker-empty" style={{
                          cursor: 'pointer', minHeight: 96, padding: '8px',
                        }}>
                          <span className="head" style={{ fontSize: '1.1rem', color: 'var(--ink-mute)' }}>{pos}</span>
                          <span className="head" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>WYBIERZ</span>
                          <span style={{ fontSize: '1.1rem', lineHeight: 1, marginTop: 2, opacity: 0.5 }}>＋</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM SAFE AREA — gwarantuje, że bramkarz / dolne sloty nigdy
            nie chowają się pod stickym CTA; lekki scroll zawsze je odsłania */}
        <div aria-hidden="true" style={{ height: 'calc(28px + env(safe-area-inset-bottom, 0px))', flexShrink: 0 }} />
      </div>

      {/* CTA zależne od stanu składu */}
      <CTABar>
        <div style={{ flex: 1 }}>
          {full ? (
            <button className="btn btn-primary btn-block" onClick={onPlay} style={{ fontSize: '1rem', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
              Zagraj miniturniej
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 3l14 9-14 9z" fill="currentColor"/></svg>
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-block" onClick={() => firstEmpty && onSlotTap(firstEmpty)} style={{ fontSize: '1rem', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                Dobierz zawodnika
                <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/></svg>
              </button>
              <div className="mute2" style={{ fontSize: '0.78rem', textAlign: 'center', marginTop: 8 }}>
                {overBudget
                  ? <span style={{ color: 'var(--accent)' }}>Przekroczono budżet — zdejmij kogoś droższego.</span>
                  : <>Brakuje jeszcze <b>{remaining}</b> {plPlayers(remaining)} do pełnej jedenastki.</>}
              </div>
            </>
          )}
        </div>
      </CTABar>
    </>
  );
}

// odmiana „zawodnik/zawodników/zawodnika" po liczbie
function plPlayers(n) {
  if (n === 1) return 'zawodnika';
  const d = n % 10, dd = n % 100;
  if (d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14)) return 'zawodników';
  return 'zawodników';
}

// ── ZAKŁADKA TURNIEJE — hub turniejów (wejście do rozgrywek) ──
function TrophyMark({ size = 40, muted }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, flexShrink: 0,
      background: muted ? 'var(--paper-3)' : 'var(--accent)',
      color: muted ? 'var(--ink-mute)' : 'var(--accent-ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: muted ? '1.5px solid var(--line-2)' : 'none',
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none"><path d="M6 4h12v3a6 6 0 0 1-12 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 18h6M10 18v-3M14 18v-3M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

function SoonTile({ kicker, title, desc }) {
  return (
    <div className="card" style={{ padding: '13px 14px 14px', opacity: 0.72 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <TrophyMark size={38} muted />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span className="kicker" style={{ fontSize: '0.6rem', whiteSpace: 'nowrap' }}>{kicker}</span>
            <span className="badge" style={{ background: 'var(--paper-3)', color: 'var(--ink-soft)', border: '1px solid var(--line-2)', height: 20 }}>Wkrótce</span>
          </div>
          <h3 className="head head-md" style={{ marginTop: 4, fontSize: '1.16rem' }}>{title}</h3>
          <p className="muted" style={{ margin: '5px 0 0', fontSize: '0.9rem', lineHeight: 1.34 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function TournamentHub({ full, filled, onPlay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11, paddingTop: 2 }}>
      {/* nagłówek sekcji */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px 2px' }}>
        <span className="head head-md" style={{ fontSize: '1.05rem' }}>Turnieje</span>
        <span className="mute2 head" style={{ fontSize: '0.66rem', letterSpacing: '0.1em' }}>Wybierz rozgrywki</span>
      </div>

      {/* FEATURED — EURO 2016 Retro */}
      <div className="card" style={{ padding: '15px 16px 16px', border: '2px solid var(--accent)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <TrophyMark size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span className="kicker" style={{ fontSize: '0.6rem', whiteSpace: 'nowrap' }}>Turniej historyczny</span>
              <span className="badge" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', height: 20 }}>Polecany</span>
            </div>
            <h3 className="head head-lg" style={{ marginTop: 5, fontSize: '1.5rem', lineHeight: 1 }}>EURO 2016 Retro</h3>
          </div>
        </div>
        <p className="muted" style={{ margin: '11px 0 0', fontSize: '0.95rem', lineHeight: 1.38 }}>
          Poprowadź Polskę od grupy z Niemcami, Ukrainą i Irlandią Północną aż do finału.
        </p>
        {full ? (
          <button className="btn btn-primary btn-block" onClick={onPlay} style={{ marginTop: 14, fontSize: '1rem' }}>
            Rozpocznij turniej
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ) : (
          <div style={{
            marginTop: 14, display: 'flex', alignItems: 'center', gap: 9,
            border: '1.5px dashed var(--line-2)', borderRadius: 6, padding: '11px 13px',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--ink-mute)' }}><path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9H5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            <span className="head" style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', textTransform: 'none', letterSpacing: 0 }}>
              Skompletuj skład <b style={{ color: 'var(--ink)' }}>{filled}/11</b>, aby wejść do turnieju.
            </span>
          </div>
        )}
      </div>

      {/* przyszłe turnieje */}
      <div className="rule" style={{ fontSize: '0.64rem', letterSpacing: '0.16em', margin: '4px 0 2px' }}>Wkrótce</div>
      <SoonTile kicker="Turniej historyczny" title="Mundial 2002"
        desc="Poprowadź Polskę przez turniej w Korei i Japonii. Korea, Portugalia, USA — i szansa, żeby napisać historię na nowo." />
      <SoonTile kicker="Archiwum" title="Historyczne sezony"
        desc="Kultowe sezony polskiej ligi do odtworzenia od pierwszej kolejki." />
      <SoonTile kicker="Rozgrywki klubowe" title="Europejskie puchary"
        desc="Droga przez europejskie drabinki — od eliminacji aż po wielki finał." />
    </div>
  );
}

function useFitScale(w = 402, h = 864, margin = 24) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const fit = () => {
      const sw = (window.innerWidth - margin) / w;
      const sh = (window.innerHeight - margin) / h;
      setScale(Math.min(1, sw, sh));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [w, h, margin]);
  return scale;
}

// ── RAMKA EKRANU (mobilna, BEZ chromu telefonu) ─────────────
// Brak paska statusu, godziny 9:41, dynamic island, baterii, home indicatora.
function ScreenFrame({ children, w = 402, h = 864 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 30, overflow: 'hidden', position: 'relative',
      background: 'var(--paper)',
      boxShadow: '0 30px 70px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.35)',
    }}>
      {children}
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────
function App() {
  const t_scale = useFitScale();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState('mode');
  const [mode, setMode] = React.useState(null);
  const [pool, setPool] = React.useState([]);
  const [rerolls, setRerolls] = React.useState(3);
  const [lineup, setLineup] = React.useState({});
  const [draftOpen, setDraftOpen] = React.useState(false);
  const [listSlot, setListSlot] = React.useState(null);
  const [cardPlayer, setCardPlayer] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [manager, setManager] = React.useState(null);
  const [managerOpen, setManagerOpen] = React.useState(false);
  const [tasksOpen, setTasksOpen] = React.useState(false);
  const [formation, setFormation] = React.useState('4-3-3');
  const [formationOpen, setFormationOpen] = React.useState(false);
  const [howToOpen, setHowToOpen] = React.useState(false);
  const [newsOpen, setNewsOpen] = React.useState(false);
  const [bugOpen, setBugOpen] = React.useState(false);

  const { FORMATIONS, buildSlots } = window.GAME_DATA;
  const formationDef = FORMATIONS[formation];
  const slots = React.useMemo(() => buildSlots(formationDef), [formation]);

  const d = DENSITY[t.density] || DENSITY.regular;
  const rootStyle = {
    '--accent': t.accent,
    '--gap': d.gap, '--pad': d.pad, '--tap': d.tap,
    '--fs': (t.fontScale || 16) + 'px',
  };

  // wybór trybu → losowanie ekipy
  const pickMode = (m) => {
    setMode(m);
    setPool(drawPool());
    setRerolls(3);
    setLineup({});
    setManager(null);
    setFormation('4-3-3');
    setScreen('squad');
    setDraftOpen(true);
  };
  const reroll = () => { if (rerolls > 0) { setPool(drawPool()); setRerolls((r) => r - 1); } };
  const reDraft = () => setDraftOpen(true);

  // zmiana formacji — zawodnicy zostają na slotach o tym samym indeksie pozycji,
  // nadmiarowe sloty (np. piąty obrońca) są zwalniane
  const changeFormation = (fid) => {
    const newSlots = window.GAME_DATA.buildSlots(window.GAME_DATA.FORMATIONS[fid]).map((s) => s.slot);
    setLineup((L) => {
      const out = {};
      newSlots.forEach((slot) => { if (L[slot]) out[slot] = L[slot]; });
      return out;
    });
    setFormation(fid);
    setFormationOpen(false);
  };

  // sloty / wybór zawodnika
  const slotTap = (slotDef) => setListSlot(slotDef);
  const selectFromList = (p) => setCardPlayer({ player: p, slot: listSlot.slot });
  const addToLineup = () => {
    setLineup((L) => {
      const next = { ...L };
      // jeśli zawodnik już gdzieś jest, usuń go stamtąd
      Object.keys(next).forEach((k) => { if (next[k] && next[k].id === cardPlayer.player.id) delete next[k]; });
      next[cardPlayer.slot] = cardPlayer.player;
      return next;
    });
    setCardPlayer(null);
    setListSlot(null);
  };
  const removeFromLineup = () => {
    setLineup((L) => {
      const next = { ...L };
      Object.keys(next).forEach((k) => { if (next[k] && next[k].id === cardPlayer.player.id) delete next[k]; });
      return next;
    });
    setCardPlayer(null);
  };

  const players = Object.values(lineup).filter(Boolean);
  const baseChem = computeChem(players);
  const mgrBonus = managerChemBonus(manager, players);
  const strength = teamStrengthOf(players) + (mode && manager ? mgrBonus / 12 * 0.1 : 0);

  const cardInLineup = cardPlayer && players.some((p) => p.id === cardPlayer.player.id);
  // budżet (tylko tryby budżetowe)
  const spent = players.reduce((s, p) => s + (p.cost || 0), 0);
  const cardCost = cardPlayer ? (cardPlayer.player.cost || 0) : 0;
  const cardAffordable = !mode || !mode.hasBudget || cardInLineup || (spent + cardCost <= mode.budget);

  return (
    <React.Fragment>
      <div style={{ transform: `scale(${t_scale})`, transformOrigin: 'center center' }}>
        <ScreenFrame>
        <div className={`app-root theme-${t.theme}`} style={rootStyle}>
          {screen === 'mode' && (
            <ModeScreen
              onPick={pickMode}
              onHelp={() => setHowToOpen(true)}
              onNews={() => setNewsOpen(true)}
              onBug={() => setBugOpen(true)}
            />
          )}

          {screen === 'squad' && mode && (
            <SquadScreen
              mode={mode} slots={slots} formation={formationDef} lineup={lineup} manager={manager}
              onSlotTap={slotTap} onReDraft={reDraft}
              onPlay={() => setScreen('tournament')}
              onBack={() => setScreen('mode')}
              onPickManager={() => setManagerOpen(true)}
              onOpenTasks={() => setTasksOpen(true)}
              onOpenFormation={() => setFormationOpen(true)}
            />
          )}

          {screen === 'tournament' && (
            <TournamentScreen
              teamStrength={strength}
              onFinish={(res) => { setResults(res); setScreen('final'); }}
              onBack={() => setScreen('squad')}
            />
          )}

          {screen === 'final' && (
            <FinalScreen
              results={results} lineup={lineup}
              onReplay={() => { setScreen('mode'); setMode(null); setLineup({}); setResults([]); }}
              onBack={() => setScreen('squad')}
            />
          )}

          {/* sheety */}
          <DraftSheet
            open={draftOpen} onClose={() => setDraftOpen(false)}
            pool={pool} rerolls={rerolls} onReroll={reroll}
            onAccept={() => setDraftOpen(false)}
          />
          <PlayerListSheet
            open={!!listSlot && !cardPlayer} onClose={() => setListSlot(null)}
            pos={listSlot ? listSlot.pos : null} pool={pool} lineup={lineup}
            showCost={mode && mode.hasBudget}
            onSelect={selectFromList}
          />
          <PlayerCardSheet
            open={!!cardPlayer} onClose={() => setCardPlayer(null)}
            player={cardPlayer ? cardPlayer.player : null}
            inLineup={cardInLineup}
            showCost={mode && mode.hasBudget}
            affordable={cardAffordable}
            onAdd={addToLineup} onRemove={removeFromLineup}
          />
          <ManagerSheet
            open={managerOpen} onClose={() => setManagerOpen(false)}
            current={manager} onPick={(m) => { setManager(m); setManagerOpen(false); }}
          />
          <TasksSheet
            open={tasksOpen} onClose={() => setTasksOpen(false)}
            players={players} pack={mode ? window.GAME_DATA.taskPackFor(mode.id) : null}
          />
          <FormationSheet
            open={formationOpen} onClose={() => setFormationOpen(false)}
            current={formation} onPick={changeFormation}
          />
          <HowToPlaySheet open={howToOpen} onClose={() => setHowToOpen(false)} />
          <WhatsNewSheet open={newsOpen} onClose={() => setNewsOpen(false)} />
          <ReportBugSheet open={bugOpen} onClose={() => setBugOpen(false)} />
        </div>
      </ScreenFrame>
      </div>

      {/* TWEAKS — poza ramką telefonu, żeby się nie obcinał */}
      <TweaksPanel>
        <TweakSection label="Motyw" />
        <TweakRadio label="Tło" value={t.theme} options={['light', 'dark']}
          onChange={(v) => setTweak('theme', v)} />
        <TweakColor label="Akcent" value={t.accent}
          options={['#c8102e', '#1f3a5f', '#2f7d4f', '#b9892b']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Czytelność" />
        <TweakRadio label="Gęstość" value={t.density} options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)} />
        <TweakSlider label="Rozmiar tekstu" value={t.fontScale} min={14} max={19} step={1} unit="px"
          onChange={(v) => setTweak('fontScale', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('stage')).render(<App />);
