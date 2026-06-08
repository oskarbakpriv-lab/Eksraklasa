/* ============================================================
   Zdarzenia — karta jako wycinek z retro-gazety sportowej
   Tylko Normal/Hardcore. Spokojne kolory, papier, mocny nagłówek.
   Reużywa tokenów ze styles.css (Oswald/Barlow, paper, badge).
   ============================================================ */

// kolor tonu zdarzenia (stonowany, nie krzyczy)
const TONE = {
  neutral:   { c: 'var(--ink)',     label: null },
  positive:  { c: 'var(--b-tech)',  label: 'Dobra wiadomość' },
  negative:  { c: 'var(--ink)',     label: 'Trudna sprawa' },
  manager:   { c: 'var(--b-leg)',   label: null },
  prematch:  { c: 'var(--accent)',  label: null },
  postwin:   { c: 'var(--b-tech)',  label: null },
  postloss:  { c: 'var(--ink)',     label: null },
};

const OSWALD = "'Oswald', system-ui, sans-serif";

// ── mały pasek nagłówkowy: ZDARZENIE + mikro-etykieta ───────
function EvHeader({ section, meta }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{
          background: 'var(--ink)', color: 'var(--paper)', fontFamily: OSWALD,
          fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.18em',
          padding: '4px 9px', borderRadius: 2, textTransform: 'uppercase',
        }}>Zdarzenie</span>
        <span className="kicker" style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textAlign: 'right' }}>{section}</span>
      </div>
      {meta && (
        <div className="mute2" style={{ fontFamily: OSWALD, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 7 }}>{meta}</div>
      )}
    </div>
  );
}

// ── cytat / flavor (kursywa z listwą) ───────────────────────
function EvFlavor({ children, tone }) {
  const tc = (TONE[tone] || TONE.neutral).c;
  return (
    <p style={{
      borderLeft: `3px solid ${tc}`, paddingLeft: 13, margin: '14px 0 0',
      fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '1.02rem', lineHeight: 1.4,
    }}>{children}</p>
  );
}

// ── sekcja efektu (po ludzku + drobny skrót techniczny) ─────
function EvEffect({ human, tech, tone, title = 'Co to znaczy' }) {
  const tc = (TONE[tone] || TONE.neutral).c;
  return (
    <div style={{
      border: '1.5px solid var(--line)', borderTop: `3px solid ${tc}`,
      background: 'var(--paper-3)', borderRadius: 4, padding: '12px 14px', marginTop: 16,
    }}>
      <div className="kicker" style={{ color: tc, fontSize: '0.62rem' }}>{title}</div>
      <p style={{ margin: '5px 0 0', fontSize: '1.02rem', lineHeight: 1.34, color: 'var(--ink)' }}>{human}</p>
      {tech && (
        <div className="mute2" style={{ fontFamily: OSWALD, fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 9 }}>{tech}</div>
      )}
    </div>
  );
}

// ── duży przycisk wyboru ────────────────────────────────────
function EvChoice({ letter, label, effectHuman, effectTech, tone = 'neutral', state }) {
  const tc = (TONE[tone] || TONE.neutral).c;
  const dim = state === 'dim';
  const picked = state === 'picked';
  return (
    <div style={{
      border: picked ? `2px solid ${tc}` : '1.5px solid var(--line-2)',
      background: picked ? 'var(--paper-3)' : 'var(--paper-2)',
      borderLeft: picked ? `6px solid ${tc}` : `6px solid ${tc}`,
      borderRadius: 5, padding: '13px 15px', position: 'relative',
      opacity: dim ? 0.45 : 1, filter: dim ? 'grayscale(0.6)' : 'none',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
        <span style={{ fontFamily: OSWALD, fontWeight: 700, color: tc, fontSize: '1rem', flexShrink: 0 }}>{letter}</span>
        <span className="head head-md" style={{ flex: 1, fontSize: '1.08rem', lineHeight: 1.06 }}>{label}</span>
        {picked && <span className="badge" style={{ background: tc, color: '#fff', height: 18 }}>Wybrano</span>}
      </div>
      <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.95rem', lineHeight: 1.32 }}>{effectHuman}</p>
      {effectTech && (
        <div className="mute2" style={{ fontFamily: OSWALD, fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 8 }}>{effectTech}</div>
      )}
    </div>
  );
}

// ── pasek menedżera (notka z ławki) ─────────────────────────
function EvManagerStrip({ name, role = 'Trener' }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 999, flexShrink: 0,
        background: 'var(--b-leg)', color: 'var(--b-leg-ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: OSWALD, fontWeight: 700, fontSize: '0.95rem',
        boxShadow: 'inset 0 0 0 2px var(--paper-2)',
      }}>{initials}</div>
      <div style={{ minWidth: 0 }}>
        <div className="head head-md" style={{ fontSize: '1.05rem', lineHeight: 1 }}>{name}</div>
        <div className="mute2" style={{ fontFamily: OSWALD, fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{role} · ławka</div>
      </div>
    </div>
  );
}

// ── pasek rywala (raport przedmeczowy) ──────────────────────
function EvMatchStrip({ round, opponent, result }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, marginTop: 14,
      border: '1.5px solid var(--line-2)', borderRadius: 4, padding: '9px 12px', background: 'var(--paper-3)',
    }}>
      <span className="badge" style={{ background: result ? (TONE.postwin.c) : 'var(--accent)', color: '#fff', height: 20 }}>
        {result || round}
      </span>
      <span className="muted" style={{ flex: 1, fontSize: '0.92rem', lineHeight: 1.25 }}>{opponent}</span>
    </div>
  );
}

// ── KARTA ZDARZENIA ─────────────────────────────────────────
function EventCard({
  section, meta, tone = 'neutral', title, lead, flavor,
  effect, choices, chosen, cta = 'Kontynuuj',
  manager, match, layout = 'mobile', onCta, onPick,
}) {
  const t = TONE[tone] || TONE.neutral;
  const decided = typeof chosen === 'number';
  const desktop = layout === 'desktop';

  return (
    <div className="card" style={{
      width: '100%', maxWidth: desktop ? 560 : 'none', margin: '0 auto',
      padding: desktop ? '22px 26px 24px' : '16px 17px 18px',
      borderRadius: 6, position: 'relative',
    }}>
      <EvHeader section={section} meta={meta} />
      <hr className="dbl-rule" style={{ margin: '11px 0 13px' }} />

      {/* nagłówek gazety */}
      <h1 className="head" style={{
        fontSize: desktop ? '2.05rem' : '1.6rem', fontWeight: 700,
        lineHeight: 0.98, letterSpacing: '-0.01em', textWrap: 'balance',
      }}>{title}</h1>

      {/* znacznik tonu / menedżer / mecz */}
      {t.label && (
        <div style={{ marginTop: 10 }}>
          <span className="badge" style={{
            background: tone === 'positive' ? t.c : 'var(--ink)', color: '#fff', height: 20,
          }}>{t.label}</span>
        </div>
      )}
      {manager && <EvManagerStrip name={manager.name} role={manager.role} />}
      {match && <EvMatchStrip round={match.round} opponent={match.opponent} result={match.result} />}

      {/* lead */}
      <p className="muted" style={{ margin: '13px 0 0', fontSize: desktop ? '1.08rem' : '1.02rem', lineHeight: 1.42 }}>{lead}</p>

      {/* flavor */}
      {flavor && <EvFlavor tone={tone}>{flavor}</EvFlavor>}

      {/* efekt (gdy bez wyboru, lub po decyzji) */}
      {(!choices || decided) && effect && (
        <EvEffect human={decided ? choices[chosen].effectHuman : effect.human}
          tech={decided ? choices[chosen].effectTech : effect.tech}
          tone={decided ? (choices[chosen].tone || tone) : tone}
          title={decided ? 'Wybór zapadł' : 'Co to znaczy'} />
      )}

      {/* wybory */}
      {choices && (
        <div style={{
          marginTop: 16,
          display: desktop && !decided ? 'grid' : 'flex',
          gridTemplateColumns: desktop && !decided ? '1fr 1fr' : undefined,
          flexDirection: 'column', gap: 10,
        }}>
          {choices.map((ch, i) => (
            <div key={i} onClick={!decided && onPick ? () => onPick(i) : undefined} style={{ cursor: !decided && onPick ? 'pointer' : 'default' }}>
              <EvChoice letter={ch.letter || (i === 0 ? 'A' : 'B')}
                label={ch.label} effectHuman={ch.effectHuman} effectTech={ch.effectTech}
                tone={ch.tone || tone}
                state={decided ? (i === chosen ? 'picked' : 'dim') : 'idle'} />
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <button onClick={!(choices && !decided) ? onCta : undefined} className={`btn ${tone === 'negative' || tone === 'manager' ? 'btn-solid' : 'btn-primary'} btn-block`}
        style={{ marginTop: 18, fontSize: '1.02rem' }}>
        {choices && !decided ? 'Wybierz powyżej' : cta}
        {!(choices && !decided) && (
          <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </button>

      {/* mikrocopy bezpieczeństwa dla wyboru */}
      {choices && !decided && (
        <p className="mute2" style={{ fontSize: '0.78rem', textAlign: 'center', margin: '9px 0 0' }}>
          Najpierw wybierz wariant — decyzji nie da się cofnąć.
        </p>
      )}
    </div>
  );
}

Object.assign(window, { EventCard, EvHeader, EvFlavor, EvEffect, EvChoice });
