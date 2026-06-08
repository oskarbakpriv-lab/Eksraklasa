/* ============================================================
   Modale Paczki 1: Jak grać?, Co nowego?, Zgłoś błąd, Formacja
   Wszystkie korzystają z istniejącego BottomSheet.
   ============================================================ */

// ── JAK GRAĆ? ───────────────────────────────────────────────
const HOW_STEPS = [
  'Losujesz ekipę.',
  'Wybierasz jednego zawodnika.',
  'Uzupełniasz album składu.',
  'Wybierasz formację.',
  'Grasz miniturniej.',
  'Sprawdzasz wynik.',
];
function HowToPlaySheet({ open, onClose }) {
  if (!open) return null;
  return (
    <BottomSheet open={open} onClose={onClose} kicker="Krótka instrukcja" title="Jak grać?" maxH="86%"
      footer={<button className="btn btn-primary btn-block" onClick={onClose}>Jasne, gram</button>}>
      <p className="mute2" style={{ fontSize: '0.84rem', marginTop: -2, marginBottom: 14 }}>
        Sześć kroków od losowania do wyniku. Bez ciężkiego tutoriala.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HOW_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span className="num" style={{
              flexShrink: 0, width: 34, height: 34, borderRadius: 999,
              background: 'var(--accent)', color: 'var(--accent-ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem',
            }}>{i + 1}</span>
            <span className="head" style={{ fontSize: '1.02rem', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* komunikat startowy */}
      <div style={{
        marginTop: 18, padding: '13px 14px', borderRadius: 6,
        background: 'var(--paper-3)', border: '1.5px solid var(--accent)',
        display: 'flex', gap: 11, alignItems: 'flex-start',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" fill="var(--accent)"/></svg>
        <span className="muted" style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>
          Na start wybierz <b>Standard</b> — bez budżetu, zadań i zdarzeń.
        </span>
      </div>
    </BottomSheet>
  );
}

// ── CO NOWEGO? (patch notes — notka redakcyjna) ─────────────
function NoteList({ items, marker = '—' }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 9 }}>
          <span className="head" style={{ color: 'var(--accent)', fontSize: '0.95rem', lineHeight: 1.3 }}>{marker}</span>
          <span className="muted" style={{ fontSize: '0.9rem' }}>{it}</span>
        </li>
      ))}
    </ul>
  );
}
function NewsSection({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="rule" style={{ fontSize: '0.66rem', letterSpacing: '0.16em', marginBottom: 9 }}>{title}</div>
      {children}
    </div>
  );
}
function WhatsNewSheet({ open, onClose }) {
  if (!open) return null;
  const { PATCH_NOTES } = window.GAME_DATA;
  return (
    <BottomSheet open={open} onClose={onClose} kicker="Notatki wydania" title="Co nowego?" maxH="88%"
      footer={<button className="btn btn-primary btn-block" onClick={onClose}>Zamknij gazetę</button>}>
      {/* winieta wersji */}
      <div style={{
        border: '3px double var(--ink)', padding: '10px 14px', marginBottom: 16, textAlign: 'center',
      }}>
        <div className="head" style={{ fontSize: '1.15rem' }}>{PATCH_NOTES.version}</div>
        <div className="mute2 head" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', marginTop: 3 }}>{PATCH_NOTES.date}</div>
      </div>

      <NewsSection title="Najważniejsze zmiany"><NoteList items={PATCH_NOTES.changes} marker="✚" /></NewsSection>
      <NewsSection title="Znane problemy"><NoteList items={PATCH_NOTES.known} marker="!" /></NewsSection>
      <NewsSection title="Co testujemy teraz"><NoteList items={PATCH_NOTES.testing} marker="→" /></NewsSection>

      <p className="mute2" style={{ fontSize: '0.78rem', textAlign: 'center', fontStyle: 'italic' }}>
        Redakcja Retro Draft · dziękujemy za grę w becie
      </p>
    </BottomSheet>
  );
}

// ── ZGŁOŚ BŁĄD (prosty formularz) ───────────────────────────
function ReportBugSheet({ open, onClose }) {
  const { BUG_CATEGORIES } = window.GAME_DATA;
  const [cat, setCat] = React.useState(null);
  const [desc, setDesc] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [sent, setSent] = React.useState(false);

  // reset po zamknięciu
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setSent(false); setCat(null); setDesc(''); setContact(''); }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;
  const canSend = desc.trim().length > 0;

  if (sent) {
    return (
      <BottomSheet open={open} onClose={onClose} kicker="Beta" title="Zgłoś błąd" maxH="70%"
        footer={<button className="btn btn-primary btn-block" onClick={onClose}>Wróć do gry</button>}>
        <div style={{ textAlign: 'center', padding: '24px 8px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 999, margin: '0 auto 16px',
            background: 'var(--b-tech)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24"><path d="M5 13l4 4 10-10" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="head head-lg">Dzięki, zgłoszenie zapisane.</h2>
          <p className="muted" style={{ fontSize: '0.9rem', marginTop: 6 }}>
            Przejrzymy je przy kolejnym wydaniu. Gramy dalej.
          </p>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet open={open} onClose={onClose} kicker="Beta" title="Zgłoś błąd" maxH="90%"
      footer={
        <button className="btn btn-primary btn-block" disabled={!canSend} onClick={() => setSent(true)}>
          Wyślij zgłoszenie
        </button>
      }>
      <p className="muted" style={{ fontSize: '0.92rem', marginTop: -2, marginBottom: 16 }}>
        Pomóż poprawić betę. Opisz, co się stało.
      </p>

      <div className="rule" style={{ fontSize: '0.66rem', letterSpacing: '0.16em', marginBottom: 10 }}>Czego dotyczy?</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {BUG_CATEGORIES.map((c) => {
          const sel = cat === c;
          return (
            <button key={c} onClick={() => setCat(sel ? null : c)} className="head" style={{
              cursor: 'pointer', minHeight: 40, padding: '0 14px', borderRadius: 999,
              fontSize: '0.82rem', textTransform: 'none', letterSpacing: 0,
              border: sel ? '2px solid var(--accent)' : '1.5px solid var(--line-2)',
              background: sel ? 'var(--accent)' : 'transparent',
              color: sel ? 'var(--accent-ink)' : 'var(--ink-soft)',
            }}>{c}</button>
          );
        })}
      </div>

      <div className="rule" style={{ fontSize: '0.66rem', letterSpacing: '0.16em', marginBottom: 10 }}>Opis</div>
      <textarea
        value={desc} onChange={(e) => setDesc(e.target.value)}
        placeholder="Np. po wylosowaniu ekipy w trybie Standard zniknął przycisk na dole…"
        rows={4}
        style={{
          width: '100%', resize: 'vertical', borderRadius: 6, padding: '12px 13px',
          border: '1.5px solid var(--line-2)', background: 'var(--paper-3)', color: 'var(--ink)',
          fontFamily: "'Barlow', system-ui, sans-serif", fontSize: '0.95rem', lineHeight: 1.4,
          marginBottom: 16, outline: 'none',
        }}
      />

      <div className="rule" style={{ fontSize: '0.66rem', letterSpacing: '0.16em', marginBottom: 10 }}>
        Kontakt <span style={{ textTransform: 'none', letterSpacing: 0 }}>(opcjonalnie)</span>
      </div>
      <input
        value={contact} onChange={(e) => setContact(e.target.value)}
        placeholder="e-mail lub nick — jeśli chcesz odpowiedź"
        style={{
          width: '100%', minHeight: 'var(--tap)', borderRadius: 6, padding: '0 13px',
          border: '1.5px solid var(--line-2)', background: 'var(--paper-3)', color: 'var(--ink)',
          fontFamily: "'Barlow', system-ui, sans-serif", fontSize: '0.95rem', outline: 'none',
        }}
      />
      {!canSend && (
        <p className="mute2" style={{ fontSize: '0.76rem', marginTop: 10 }}>
          Dodaj krótki opis, żeby wysłać zgłoszenie.
        </p>
      )}
    </BottomSheet>
  );
}

// ── WYBÓR FORMACJI ──────────────────────────────────────────
function FormationSheet({ open, onClose, current, onPick }) {
  if (!open) return null;
  const { FORMATIONS, FORMATION_ORDER } = window.GAME_DATA;
  return (
    <BottomSheet open={open} onClose={onClose} kicker="Ustawienie drużyny" title="Formacja" maxH="86%">
      <p className="mute2" style={{ fontSize: '0.84rem', marginTop: -2, marginBottom: 14 }}>
        Wybierz rozstawienie. Zawodnicy zostają na swoich pozycjach — zmieniasz tylko ich liczbę w liniach.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FORMATION_ORDER.map((fid) => {
          const f = FORMATIONS[fid];
          const sel = current === fid;
          return (
            <button key={fid} onClick={() => onPick(fid)} className="card" style={{
              textAlign: 'left', cursor: 'pointer', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 14,
              border: sel ? '2px solid var(--accent)' : '1.5px solid var(--line)',
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 8, flexShrink: 0, background: 'var(--field)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.22)',
              }}>
                <FormationDots formation={f} size={54} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="head head-lg" style={{ fontSize: '1.4rem', letterSpacing: '0.02em' }}>{f.name}</div>
                <div className="muted" style={{ fontSize: '0.86rem' }}>{f.desc}</div>
              </div>
              {sel && <span className="badge" style={{ background: 'var(--b-tech)', color: '#fff' }}>WYBRANA</span>}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}

Object.assign(window, { HowToPlaySheet, WhatsNewSheet, ReportBugSheet, FormationSheet });
