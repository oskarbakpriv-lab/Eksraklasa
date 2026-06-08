/* ============================================================
   Ekrany: wybór trybu, boisko/skład, draft, lista, karta
   ============================================================ */
const { useState } = React;

// pomocnik: nazwisko (ostatni człon) do karty na boisku
function surname(name) {
  const p = name.split(' ');
  return p[p.length - 1];
}

// ── EKRAN 1: WYBÓR TRYBU ────────────────────────────────────
function ModeScreen({ onPick, onHelp, onNews, onBug }) {
  const { MODES } = window.GAME_DATA;
  return (
    <div className="scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* winieta gazety */}
      <div style={{ padding: '26px var(--pad) 0' }}>
        <div className="masthead">
          <div className="masthead-bar">
            <span>Wydanie retro</span>
            <span>{window.GAME_DATA.PATCH_NOTES.version.split(' · ')[0]}</span>
            <span>Nr 1 · 1927–dziś</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ flex: 1, height: 2, background: 'var(--ink)', opacity: 0.85 }} />
            <span className="head" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>Album ekip</span>
            <span style={{ flex: 1, height: 2, background: 'var(--ink)', opacity: 0.85 }} />
          </div>
          <div className="masthead-title" style={{ fontSize: '3rem', color: 'var(--ink)', marginTop: 4 }}>Ekstraklasa</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
            <div style={{
              background: 'var(--accent)', color: 'var(--accent-ink)',
              padding: '3px 18px', borderRadius: 2, transform: 'rotate(-1.2deg)',
              boxShadow: '0 2px 0 rgba(28,24,19,0.18)',
            }}>
              <span className="head" style={{ fontSize: '1.3rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>Retro Draft</span>
            </div>
          </div>
        </div>
        <p className="muted" style={{ margin: '14px auto 0', maxWidth: 320, fontSize: '0.95rem', textAlign: 'center' }}>
          Zbuduj jedenastkę z historycznych ekip i zagraj miniturniej.
        </p>
      </div>

      <div className="rule" style={{ margin: '24px var(--pad) 14px', fontSize: '0.74rem', letterSpacing: '0.18em' }}>
        Wybierz tryb
      </div>

      {/* karty trybów */}
      <div style={{ padding: '0 var(--pad) var(--pad)', display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onPick(m)}
            className="card"
            style={{
              textAlign: 'left', cursor: 'pointer', position: 'relative',
              padding: '16px 16px 16px', minHeight: 76,
              border: m.recommended ? '2px solid var(--accent)' : '1.5px solid var(--line)',
              background: 'var(--paper-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 className="head head-lg" style={{ flex: 1 }}>{m.name}</h2>
              {m.recommended && (
                <span className="badge" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                  {m.tag}
                </span>
              )}
              {!m.recommended && <span className="head mute2" style={{ fontSize: '0.82rem' }}>{m.tag}</span>}
            </div>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.92rem', maxWidth: 320 }}>{m.desc}</p>
            <div style={{
              position: 'absolute', right: 14, bottom: 14,
              color: m.recommended ? 'var(--accent)' : 'var(--ink-mute)',
            }}>
              <svg width="10" height="16" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </button>
        ))}
      </div>

      {/* kafelki pomocnicze — mniejsze, nie konkurują z wyborem trybu */}
      <div className="rule" style={{ margin: '6px var(--pad) 12px', fontSize: '0.7rem', letterSpacing: '0.18em' }}>
        Zanim zaczniesz
      </div>
      <div style={{ padding: '0 var(--pad) 4px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--gap)' }}>
        <HelpTile label="Jak grać?" onClick={onHelp} icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M9.2 9.3c.2-1.4 1.4-2.3 2.9-2.3 1.6 0 2.8 1 2.8 2.4 0 1.2-.8 1.8-1.8 2.4-.8.5-1.1 1-1.1 1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17.2" r="1.2" fill="currentColor"/></svg>
        } />
        <HelpTile label="Co nowego?" onClick={onNews} icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h13v14H6a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M17 9h3v8a2 2 0 0 1-2 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M7 9h7M7 12.5h7M7 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        } />
        <HelpTile label="Zgłoś błąd" onClick={onBug} icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="7" y="8" width="10" height="11" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M9.5 8a2.5 2.5 0 0 1 5 0M4 11h3M17 11h3M4.5 16h2.6M16.9 16h2.6M5 6l2.4 1.6M19 6l-2.4 1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        } />
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

// ── Mały kafelek pomocniczy (Jak grać? / Co nowego? / Zgłoś błąd) ──
function HelpTile({ label, icon, onClick }) {
  return (
    <button onClick={onClick} className="card" style={{
      cursor: 'pointer', background: 'var(--paper-2)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 7, padding: '12px 6px', minHeight: 78, textAlign: 'center',
      color: 'var(--ink-soft)',
    }}>
      <span style={{ color: 'var(--accent)' }}>{icon}</span>
      <span className="head" style={{ fontSize: '0.74rem', letterSpacing: '0.02em', color: 'var(--ink)' }}>{label}</span>
    </button>
  );
}

// ── PASEK GÓRNY (hub) ───────────────────────────────────────
function TopBar({ modeName, onBack, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '20px var(--pad) 10px', borderBottom: '1px solid var(--line)',
      background: 'var(--paper)',
    }}>
      <button onClick={onBack} aria-label="Wstecz" style={{
        width: 38, height: 38, flexShrink: 0, borderRadius: 999,
        border: '1.5px solid var(--line-2)', background: 'transparent', color: 'var(--ink)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="11" height="18" viewBox="0 0 12 20"><path d="M10 2L2 10l8 8" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="kicker" style={{ fontSize: '0.62rem' }}>Ekstraklasa Retro Draft</div>
        <div className="head head-md" style={{ lineHeight: 1 }}>Tryb {modeName}</div>
      </div>
      {right}
    </div>
  );
}

// ── NAKLEJKA NA STRONIE ALBUMU ──────────────────────────────
function PitchSlot({ slotDef, player, onTap }) {
  return (
    <button
      onClick={onTap}
      style={{
        cursor: 'pointer', border: 'none', background: 'transparent', padding: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: 76,
      }}
    >
      {player ? (
        <PlayerSticker player={player} w={72} compact />
      ) : (
        <div className="sticker-empty" style={{ width: 64, height: 70, gap: 2 }}>
          <span className="head" style={{ color: 'var(--ink-mute)', fontSize: '0.95rem' }}>{slotDef.pos}</span>
          <span className="head" style={{ fontSize: '0.54rem', letterSpacing: '0.08em' }}>WYBIERZ</span>
          <span style={{ fontSize: '0.95rem', lineHeight: 1, opacity: 0.5 }}>＋</span>
        </div>
      )}
    </button>
  );
}

// ── STRONA ALBUMU 4-3-3 (nadrukowane linie boiska) ──────────
function Pitch({ slots, formation, lineup, onSlotTap }) {
  const lineCol = 'var(--line-2)';
  const rows = formation.rows.map((_, r) => slots.filter((s) => s.row === r));
  return (
    <div className="album-page" style={{ position: 'relative', overflow: 'hidden', padding: '14px 8px 18px' }}>
      {/* nagłówek strony albumu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, padding: '0 6px' }}>
        <span className="kicker" style={{ fontSize: '0.58rem' }}>Strona drużyny</span>
        <span className="head mute2" style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}>Ustawienie {formation.name}</span>
      </div>

      {/* nadrukowane linie boiska — sepia, dyskretne */}
      <div style={{ position: 'absolute', inset: '34px 14px 18px', pointerEvents: 'none', opacity: 0.5 }}>
        <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${lineCol}`, borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1.5, background: lineCol }} />
        <div style={{ position: 'absolute', top: 'calc(50% - 34px)', left: '50%', transform: 'translateX(-50%)', width: 68, height: 68, borderRadius: '50%', border: `1.5px solid ${lineCol}` }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 112, height: 26, borderLeft: `1.5px solid ${lineCol}`, borderRight: `1.5px solid ${lineCol}`, borderBottom: `1.5px solid ${lineCol}` }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 112, height: 26, borderLeft: `1.5px solid ${lineCol}`, borderRight: `1.5px solid ${lineCol}`, borderTop: `1.5px solid ${lineCol}` }} />
      </div>

      {/* rzędy naklejek — kompaktowo, równe odstępy; bramkarz (BR) ma własny oddech */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map((row, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-around', gap: 6,
            marginTop: row[0] && row[0].pos === 'BR' ? 4 : 0,
          }}>
            {row.map((s) => (
              <PitchSlot key={s.slot} slotDef={s} player={lineup[s.slot]} onTap={() => onSlotTap(s)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PODSUMOWANIE SKŁADU (po ludzku, bez OVR) ────────────────
function chemistryLabel(n) {
  if (n >= 9) return { lvl: 4, txt: 'Zgrany zespół' };
  if (n >= 6) return { lvl: 3, txt: 'Dobre zgranie' };
  if (n >= 3) return { lvl: 2, txt: 'Średnie zgranie' };
  return { lvl: 1, txt: 'Słabo zgrani' };
}
function SquadSummary({ filled, total, chem }) {
  const c = chemistryLabel(chem);
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px' }}>
      <div>
        <div className="kicker" style={{ fontSize: '0.6rem' }}>Skład</div>
        <div><span className="num" style={{ fontSize: '1.5rem' }}>{filled}</span><span className="mute2 head" style={{ fontSize: '1rem' }}>/{total}</span></div>
      </div>
      <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--line)' }} />
      <div style={{ flex: 1 }}>
        <div className="kicker" style={{ fontSize: '0.6rem' }}>Zgranie ekipy</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 2 }}>
          <span style={{ display: 'inline-flex', gap: 3 }}>
            {[1, 2, 3, 4].map((i) => (
              <span key={i} style={{ width: 14, height: 8, borderRadius: 2, background: i <= c.lvl ? 'var(--b-tech)' : 'var(--line)' }} />
            ))}
          </span>
          <span className="head" style={{ fontSize: '0.86rem' }}>{c.txt}</span>
        </div>
      </div>
    </div>
  );
}

// ── KAFELEK FORMACJA (wszystkie tryby, nad zakładkami) ───────
function FormationStrip({ formation, onTap }) {
  return (
    <button onClick={onTap} className="card" style={{
      width: '100%', textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', minHeight: 'var(--tap)',
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 8, flexShrink: 0, background: 'var(--field)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.25)',
      }}>
        <FormationDots formation={formation} size={42} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="kicker" style={{ fontSize: '0.58rem' }}>Formacja</div>
        <div className="head head-md" style={{ fontSize: '1.15rem', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{formation.name}</div>
        <div className="muted" style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formation.desc}</div>
      </div>
      <span className="head" style={{
        fontSize: '0.66rem', color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: 5,
        border: '1.5px solid var(--line-2)', borderRadius: 999, padding: '5px 10px',
      }}>
        Zmień
        <svg width="8" height="13" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </button>
  );
}

// mini-diagram formacji (kropki) — używany w kafelku i w wyborze
function FormationDots({ formation, size = 42 }) {
  const pad = size * 0.16;
  return (
    <div style={{
      width: size, height: size, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: `${pad}px ${pad * 0.7}px`,
    }}>
      {formation.rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: size * 0.07 }}>
          {row.map((pos, j) => (
            <span key={j} style={{
              width: size * 0.1, height: size * 0.1, borderRadius: 999,
              background: pos === 'BR' ? 'var(--accent)' : '#fff', opacity: pos === 'BR' ? 1 : 0.92,
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ModeScreen, HelpTile, TopBar, PitchSlot, Pitch, SquadSummary, FormationStrip, FormationDots, surname, chemistryLabel });
