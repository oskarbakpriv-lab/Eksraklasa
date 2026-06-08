/* ============================================================
   Mechaniki: menedżer, budżet, zadania (czysto, bez chaosu)
   - Menedżer: wszystkie tryby (pozytywny wybór, nie blokada)
   - Budżet + zadania: TYLKO Normal/Hardcore
   ============================================================ */

// ── liczenie postępu zadania (po ludzku, bez OVR) ───────────
function isForeigner(p) { return p.badges.includes('SFG') && !p.badges.includes('REP'); }
function masterClass(p) { return (window.GAME_DATA.KLASA_RANK[p.klasa] || 2) >= 3; }

// zwraca { value, goal, done } — value/goal sterują paskiem i licznikiem
function taskState(task, players) {
  const { KLASA_RANK } = window.GAME_DATA;
  if (task.kind === 'badge') {
    const v = players.filter((p) => p.badges.includes(task.badge)).length;
    return { value: Math.min(task.goal, v), raw: v, goal: task.goal, done: v >= task.goal };
  }
  if (task.kind === 'badgeAny') {
    const v = players.filter((p) => task.badges.some((b) => p.badges.includes(b))).length;
    return { value: Math.min(task.goal, v), raw: v, goal: task.goal, done: v >= task.goal };
  }
  if (task.kind === 'lines') {
    const v = task.lines.filter((pos) => players.some((p) => p.pos === pos && masterClass(p))).length;
    return { value: v, raw: v, goal: task.goal, done: v >= task.goal };
  }
  if (task.kind === 'foreignLimit') {
    const fc = players.filter(isForeigner).length;
    const within = fc <= task.limit;
    const full = players.length >= 11;
    // zadanie-ograniczenie ocenia GOTOWY skład → zaliczone dopiero przy pełnej 11
    return { value: within ? 1 : 0, raw: fc, goal: 1, done: within && full, limit: task.limit, isLimit: true, within, full };
  }
  return { value: 0, raw: 0, goal: task.goal || 1, done: false };
}

// krótki komentarz „co jeszcze brakuje"
function taskHint(task, players) {
  const s = taskState(task, players);
  if (task.kind === 'lines') {
    if (s.done) return 'Każda linia ma swojego lidera.';
    const miss = task.lines.filter((pos) => !players.some((p) => p.pos === pos && masterClass(p)))
      .map((pos) => window.GAME_DATA.POS_LABELS[pos].full.toLowerCase());
    return `Dołóż mistrza w: ${miss.join(', ')}.`;
  }
  if (task.kind === 'foreignLimit') {
    if (!s.within) return `Masz ${s.raw} obcokrajowców — zejdź do ${task.limit}.`;
    if (!s.full) return `Na razie w limicie (${s.raw}/max ${task.limit}). Skompletuj skład.`;
    return s.raw === 0 ? 'Sami rodzimi gracze — limit dotrzymany.' : 'Limit dotrzymany przy pełnym składzie.';
  }
  if (s.done) return 'Zaliczone — możesz iść dalej.';
  const left = s.goal - s.raw;
  const word = left === 1 ? (task.unitOne || task.unit || 'zawodnika') : (task.unit || 'zawodników');
  return `Brakuje jeszcze ${left} ${word}.`;
}

// stary helper (zgodność) — ile sztuk zaliczonych
function taskProgress(task, players) { return taskState(task, players).raw; }

// ile zadań z paczki zaliczonych
function packDone(pack, players) { return pack.filter((t) => taskState(t, players).done).length; }

// ── bonus menedżera do zgrania (liczba 0..n) ────────────────
function managerChemBonus(manager, players) {
  if (!manager) return 0;
  let b = 0;
  players.forEach((p) => {
    if (manager.affEra && p.era === manager.affEra) b += 1;
    if (manager.affClub && manager.affClub.includes(p.club)) b += 1;
    if (manager.affBadge && p.badges.includes(manager.affBadge)) b += 1;
  });
  return b;
}

// ── PASEK BUDŻETU (tylko tryby budżetowe) ───────────────────
function BudgetBar({ budget, spent }) {
  const pct = Math.min(100, (spent / budget) * 100);
  const over = spent > budget;
  return (
    <div className="card" style={{ padding: '10px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span className="kicker" style={{ fontSize: '0.6rem' }}>Budżet</span>
        <span className="head" style={{ fontSize: '0.86rem', color: over ? 'var(--accent)' : 'var(--ink)' }}>
          <span className="num">{Math.max(0, budget - spent)}</span> / {budget} mln zostało
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: 'var(--line)', marginTop: 7, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: over ? 'var(--accent)' : 'var(--b-tech)', transition: 'width .2s ease' }} />
      </div>
      {over && <div className="head" style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: 5 }}>Przekroczono budżet — zdejmij kogoś droższego.</div>}
    </div>
  );
}

// ── STRIP MENEDŻERA (wszystkie tryby) ───────────────────────
function ManagerStrip({ manager, onTap }) {
  return (
    <button onClick={onTap} className="card" style={{
      width: '100%', textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', minHeight: 'var(--tap)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 999, flexShrink: 0,
        background: manager ? 'var(--accent)' : 'var(--line)', color: manager ? 'var(--accent-ink)' : 'var(--ink-mute)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="kicker" style={{ fontSize: '0.58rem' }}>Menedżer</div>
        {manager
          ? <><div className="head head-md" style={{ fontSize: '1rem' }}>{manager.name}</div>
              <div style={{ marginTop: 1 }}><span className="badge" style={{ background: 'var(--b-leg)', color: 'var(--b-leg-ink)' }}>{manager.bonus}</span></div></>
          : <div className="head head-md" style={{ fontSize: '1rem', color: 'var(--ink-soft)' }}>Wybierz menedżera</div>}
      </div>
      <svg width="9" height="15" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="var(--ink-mute)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

// ── KARTA-WEJŚCIE DO ZADAŃ (tylko tryby budżetowe) ──────────
function TasksEntry({ players, onTap }) {
  const { TASKS } = window.GAME_DATA;
  const doneCount = TASKS.filter((t) => taskProgress(t, players) >= t.goal).length;
  return (
    <button onClick={onTap} className="card" style={{
      width: '100%', textAlign: 'left', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', minHeight: 'var(--tap)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: 'var(--paper-3)',
        border: '1.5px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3 8-8" stroke="var(--b-tech)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex: 1 }}>
        <div className="kicker" style={{ fontSize: '0.58rem' }}>Zadania sezonu</div>
        <div className="head head-md" style={{ fontSize: '1rem' }}>Wyzwania <span className="mute2">· {doneCount}/{TASKS.length} zaliczone</span></div>
      </div>
      <svg width="9" height="15" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="var(--ink-mute)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

// ── KOMPAKTOWY RZĄD KAFELKÓW (Normal/Hardcore) ──────────────
// Trzy kwadratowe kafelki zamiast trzech pełnych pasków — oszczędza miejsce,
// zachowuje czytelność i pełne tap-targety (cała kafelka klika).
function MechTiles({ mode, manager, spent, players, pack, onPickManager, onOpenTasks }) {
  const leftBudget = Math.max(0, mode.budget - spent);
  const over = spent > mode.budget;
  const pct = Math.min(100, (spent / mode.budget) * 100);
  const doneCount = packDone(pack, players);
  const total = pack.length;

  const tileBase = {
    cursor: 'pointer', textAlign: 'center', padding: '11px 8px 12px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
    minHeight: 92, justifyContent: 'flex-start',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
      {/* MENEDŻER */}
      <button onClick={onPickManager} className="card" style={tileBase}>
        <div style={{
          width: 30, height: 30, borderRadius: 999,
          background: manager ? 'var(--accent)' : 'var(--line)', color: manager ? 'var(--accent-ink)' : 'var(--ink-mute)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <span className="kicker" style={{ fontSize: '0.55rem' }}>Menedżer</span>
        <span className="head" style={{ fontSize: '0.82rem', lineHeight: 1.05, color: manager ? 'var(--ink)' : 'var(--ink-soft)', textTransform: 'none', letterSpacing: 0 }}>
          {manager ? lastName(manager.name) : 'Wybierz'}
        </span>
      </button>

      {/* BUDŻET */}
      <button onClick={() => {}} className="card" style={{ ...tileBase, cursor: 'default' }}>
        <span className="kicker" style={{ fontSize: '0.55rem' }}>Budżet</span>
        <span className="num" style={{ fontSize: '1.35rem', lineHeight: 1, color: over ? 'var(--accent)' : 'var(--ink)' }}>{leftBudget}</span>
        <span className="mute2 head" style={{ fontSize: '0.6rem' }}>z {mode.budget} mln</span>
        <div style={{ width: '78%', height: 6, borderRadius: 3, background: 'var(--line)', overflow: 'hidden', marginTop: 1 }}>
          <div style={{ height: '100%', width: pct + '%', background: over ? 'var(--accent)' : 'var(--b-tech)' }} />
        </div>
      </button>

      {/* ZADANIA */}
      <button onClick={onOpenTasks} className="card" style={tileBase}>
        <div style={{
          width: 30, height: 30, borderRadius: 7, flexShrink: 0, background: 'var(--paper-3)',
          border: '1.5px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3 8-8" stroke="var(--b-tech)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <span className="kicker" style={{ fontSize: '0.55rem' }}>Zadania</span>
        <span className="head" style={{ fontSize: '0.78rem', lineHeight: 1.05, letterSpacing: '0.02em' }}>
          <span className="num" style={{ fontSize: '0.95rem' }}>{doneCount}</span>/{total} zaliczone
        </span>
      </button>
    </div>
  );
}

// nazwisko (ostatni człon) — do kompaktowego kafelka
function lastName(full) {
  const parts = String(full).trim().split(/\s+/);
  return parts[parts.length - 1];
}

// ── SHEET: WYBÓR MENEDŻERA ──────────────────────────────────
function ManagerSheet({ open, onClose, current, onPick }) {
  if (!open) return null;
  const { MANAGERS } = window.GAME_DATA;
  return (
    <BottomSheet open={open} onClose={onClose} kicker="Ławka trenerska" title="Wybierz menedżera" maxH="86%">
      <p className="mute2" style={{ fontSize: '0.82rem', marginTop: -2, marginBottom: 12 }}>
        Każdy daje inną premię do zgrania. Możesz zmienić go w każdej chwili.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MANAGERS.map((m) => {
          const sel = current && current.id === m.id;
          return (
            <button key={m.id} onClick={() => onPick(m)} className="card" style={{
              textAlign: 'left', cursor: 'pointer', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              border: sel ? '2px solid var(--accent)' : '1.5px solid var(--line)',
            }}>
              <div style={{ flex: 1 }}>
                <div className="head head-md" style={{ fontSize: '1.05rem' }}>{m.name}</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>{m.era}</div>
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge" style={{ background: 'var(--b-leg)', color: 'var(--b-leg-ink)' }}>{m.bonus}</span>
                  <span className="muted" style={{ fontSize: '0.78rem' }}>{m.desc}</span>
                </div>
              </div>
              {sel && <span className="badge" style={{ background: 'var(--b-tech)', color: '#fff' }}>WYBRANY</span>}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}

// ── plakietka trudności (stonowana, bez gryzących kolorów) ──
function DiffBadge({ diff }) {
  const hard = diff === 'Hardcore';
  return (
    <span className="head" style={{
      fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 3, whiteSpace: 'nowrap',
      background: hard ? 'var(--ink)' : 'var(--paper-3)',
      color: hard ? 'var(--paper)' : 'var(--ink-soft)',
      border: hard ? '1.5px solid var(--ink)' : '1.5px solid var(--line-2)',
    }}>{diff}</span>
  );
}

// ── SHEET: ZADANIA SEZONU ───────────────────────────────────
function TasksSheet({ open, onClose, players, pack }) {
  if (!open) return null;
  const list = pack || window.GAME_DATA.taskPackFor('normal');
  const done = packDone(list, players);
  return (
    <BottomSheet open={open} onClose={onClose} kicker={`Sezon · ${done}/${list.length} zaliczone`} title="Zadania sezonu" maxH="88%">
      <p className="mute2" style={{ fontSize: '0.82rem', marginTop: -2, marginBottom: 14 }}>
        Cele na ten sezon. Liczą się na żywo ze składu — nie blokują gry, dają kierunek.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((t) => {
          const s = taskState(t, players);
          const pct = s.done ? 100 : Math.round((s.value / s.goal) * 100);
          const counter = s.isLimit ? `${s.raw}/max ${t.limit}` : `${s.value}/${s.goal}${t.unit === 'linie' ? ' linii' : ''}`;
          return (
            <article key={t.id} className="card" style={{
              padding: '13px 15px 14px',
              borderLeft: `5px solid ${s.done ? 'var(--b-tech)' : 'var(--line-2)'}`,
            }}>
              {/* tytuł + trudność */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <h3 className="head head-md" style={{ flex: 1, fontSize: '1.06rem', lineHeight: 1.1 }}>{t.title}</h3>
                {s.done
                  ? <span className="badge" style={{ background: 'var(--b-tech)', color: '#fff' }}>ZALICZONE</span>
                  : <DiffBadge diff={t.diff} />}
              </div>
              {/* opis */}
              <p className="muted" style={{ margin: '5px 0 11px', fontSize: '0.86rem' }}>{t.desc}</p>
              {/* postęp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--line)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct + '%', background: s.done ? 'var(--b-tech)' : 'var(--accent)', transition: 'width .2s ease' }} />
                </div>
                <span className="num" style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', color: s.done ? 'var(--b-tech)' : 'var(--ink)' }}>{counter}</span>
              </div>
              {/* co jeszcze brakuje */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9 }}>
                <span style={{ flexShrink: 0, color: s.done ? 'var(--b-tech)' : 'var(--ink-mute)', display: 'flex' }}>
                  {s.done
                    ? <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span className="mute2" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>{taskHint(t, players)}</span>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mute2" style={{ fontSize: '0.74rem', textAlign: 'center', margin: '14px 0 2px' }}>
        Inny zestaw zadań w trybie {pack && pack.some((t) => t.diff === 'Hardcore' && t.id === 'rodzimy') ? 'Normal' : 'Hardcore'}.
      </p>
    </BottomSheet>
  );
}

Object.assign(window, {
  taskProgress, taskState, taskHint, packDone, managerChemBonus,
  BudgetBar, ManagerStrip, TasksEntry, ManagerSheet, TasksSheet, DiffBadge,
  MechTiles,
});
