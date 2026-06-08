/* ============================================================
   Turnieje 1.0 — ekrany jako wycinki z retro-gazety sportowej
   Reużywa tokenów ze styles.css. Bez flag SVG — kodowe chipy w
   barwach drużyny (czytelne, on-brand).
   ============================================================ */

const OS = "'Oswald', system-ui, sans-serif";

// barwy reprezentacji do chipów (stonowane, nie neon)
const TEAM = {
  POL: { bg: '#fff',     fg: '#c8102e', bd: '#c8102e', name: 'Polska' },
  GER: { bg: '#1c1813',  fg: '#ffffff', bd: '#1c1813', name: 'Niemcy' },
  UKR: { bg: '#1f5fa8',  fg: '#ffd23f', bd: '#1f5fa8', name: 'Ukraina' },
  NIR: { bg: '#2f7d4f',  fg: '#ffffff', bd: '#2f7d4f', name: 'Irlandia Płn.' },
  SUI: { bg: '#c8102e',  fg: '#ffffff', bd: '#9a0c23', name: 'Szwajcaria' },
  POR: { bg: '#7a1228',  fg: '#f2c14e', bd: '#5e0e1f', name: 'Portugalia' },
  FRA: { bg: '#1f3a8a',  fg: '#ffffff', bd: '#16285e', name: 'Francja' },
  // drużyna gracza w miniturnieju (jego wydraftowany skład)
  TY:  { bg: '#1c1813',  fg: '#e7b84b', bd: '#0f0c08', name: 'Twój skład' },
  // kluby do miniturnieju Ekstraklasy
  GOR: { bg: '#1f5fa8',  fg: '#ffffff', bd: '#16467f', name: 'Górnik' },
  LEG: { bg: '#0e3a2f',  fg: '#ffffff', bd: '#0a2a22', name: 'Legia' },
  WID: { bg: '#c8102e',  fg: '#ffffff', bd: '#9a0c23', name: 'Widzew' },
  WIS: { bg: '#ffffff',  fg: '#c8102e', bd: '#c8102e', name: 'Wisła' },
};
function teamName(code) { return (TEAM[code] || {}).name || code; }

// ── chip kodu drużyny ───────────────────────────────────────
function FlagChip({ code, size = 'md' }) {
  const t = TEAM[code] || { bg: 'var(--paper-3)', fg: 'var(--ink)', bd: 'var(--line-2)' };
  const s = size === 'sm' ? { w: 30, f: '0.62rem', p: '2px 0' } : size === 'lg' ? { w: 46, f: '0.84rem', p: '5px 0' } : { w: 38, f: '0.72rem', p: '3px 0' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: s.w, padding: s.p, flexShrink: 0,
      background: t.bg, color: t.fg, border: `1.5px solid ${t.bd}`,
      fontFamily: OS, fontWeight: 700, fontSize: s.f, letterSpacing: '0.04em',
      borderRadius: 3,
    }}>{code}</span>
  );
}

// ── pasek statusu (status awansu — wycinek) ─────────────────
function StatusBanner({ text, tone = 'live' }) {
  const map = {
    good: { bg: 'var(--b-tech)', fg: '#fff' },
    live: { bg: 'var(--ink)', fg: 'var(--paper)' },
    warn: { bg: 'var(--b-leg)', fg: 'var(--b-leg-ink)' },
    bad:  { bg: 'var(--ink)', fg: 'var(--paper)' },
  };
  const m = map[tone] || map.live;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9, marginTop: 12,
      background: m.bg, color: m.fg, borderRadius: 4, padding: '9px 12px',
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M4 5h16M4 5v14M4 19h16M9 9l3 3 4-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span style={{ fontFamily: OS, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1.1 }}>{text}</span>
    </div>
  );
}

// ── TABELA GRUPY LIVE (gazetowa, mobile-first) ──────────────
// kolumny: # · drużyna · M · Pkt · +/-  (zwarte, mieszczą się na 384)
function StandingsTable({ rows, highlight = 'POL', advance = 2, thirdChance = false }) {
  return (
    <div style={{ border: '1.5px solid var(--line-2)', borderRadius: 5, overflow: 'hidden', background: 'var(--paper-2)' }}>
      {/* nagłówek tabeli */}
      <div style={{
        display: 'grid', gridTemplateColumns: '26px 1fr 26px 34px 40px', alignItems: 'center', gap: 6,
        background: 'var(--ink)', color: 'var(--paper)', padding: '7px 11px',
        fontFamily: OS, fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <span>#</span><span>Drużyna</span><span style={{ textAlign: 'center' }}>M</span>
        <span style={{ textAlign: 'center' }}>Pkt</span><span style={{ textAlign: 'right' }}>+/−</span>
      </div>
      {rows.map((r, i) => {
        const pos = i + 1;
        const adv = pos <= advance;
        const third = thirdChance && pos === advance + 1;
        const me = r.code === highlight;
        const diff = r.gf - r.ga;
        const posCol = adv ? 'var(--b-tech)' : third ? 'var(--b-leg-ink)' : 'var(--ink-mute)';
        return (
          <div key={r.code} style={{
            display: 'grid', gridTemplateColumns: '26px 1fr 26px 34px 40px', alignItems: 'center', gap: 6,
            padding: '9px 11px', borderTop: '1px solid var(--line)',
            background: me ? 'var(--paper-3)' : 'transparent',
            boxShadow: me ? 'inset 4px 0 0 var(--accent)' : 'none',
          }}>
            <span style={{ fontFamily: OS, fontWeight: 700, color: posCol, display: 'flex', alignItems: 'center', gap: 3 }}>
              {pos}
              {adv && <span style={{ width: 5, height: 5, borderRadius: 9, background: 'var(--b-tech)' }} />}
              {third && <span style={{ width: 5, height: 5, borderRadius: 9, background: 'var(--b-leg)' }} />}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <FlagChip code={r.code} size="sm" />
              <span className="head" style={{ fontSize: '0.86rem', fontWeight: me ? 700 : 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{teamName(r.code)}</span>
            </span>
            <span className="num" style={{ textAlign: 'center', fontSize: '0.86rem', color: 'var(--ink-soft)' }}>{r.m}</span>
            <span className="num" style={{ textAlign: 'center', fontSize: '1rem' }}>{r.pts}</span>
            <span className="num" style={{ textAlign: 'right', fontSize: '0.86rem', color: diff > 0 ? 'var(--b-tech)' : diff < 0 ? 'var(--accent)' : 'var(--ink-soft)' }}>
              {diff > 0 ? '+' : ''}{diff}
            </span>
          </div>
        );
      })}
      {/* legenda awansu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '7px 11px', borderTop: '1px solid var(--line)', background: 'var(--paper-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--b-tech)' }} />
          <span className="mute2" style={{ fontSize: '0.72rem' }}>Miejsca 1–{advance} — awans do fazy pucharowej</span>
        </div>
        {thirdChance && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--b-leg)' }} />
            <span className="mute2" style={{ fontSize: '0.72rem' }}>3. miejsce — najlepsze ekipy też awansują</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TERMINARZ (lista meczów jak w gazecie) ──────────────────
function FixtureRow({ when, home, away, score, live, you }) {
  const played = !!score;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{ width: 52, flexShrink: 0 }}>
        <div className="mute2" style={{ fontFamily: OS, fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{when}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'flex-end' }}>
        <span className="head" style={{ fontSize: '0.84rem', fontWeight: home === you ? 700 : 600 }}>{teamName(home)}</span>
        <FlagChip code={home} size="sm" />
      </div>
      <div style={{
        flexShrink: 0, minWidth: 50, textAlign: 'center',
        fontFamily: OS, fontWeight: 700, fontSize: played ? '0.95rem' : '0.7rem',
        color: played ? 'var(--ink)' : 'var(--ink-mute)',
        background: played ? 'var(--paper-3)' : 'transparent', border: played ? '1.5px solid var(--line-2)' : 'none',
        borderRadius: 3, padding: played ? '2px 0' : 0,
      }}>{score || 'vs'}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7 }}>
        <FlagChip code={away} size="sm" />
        <span className="head" style={{ fontSize: '0.84rem', fontWeight: away === you ? 700 : 600 }}>{teamName(away)}</span>
      </div>
    </div>
  );
}

// ── KARTA MECZU (przed / po) ────────────────────────────────
function MatchCard({ stage, home, away, desc, formHome, formAway, score, comment, played, cta = 'Rozegraj mecz', onCta }) {
  return (
    <div className="card" style={{ padding: '16px 16px 18px' }}>
      <div className="kicker" style={{ fontSize: '0.66rem', textAlign: 'center' }}>{stage}</div>
      <hr className="dbl-rule" style={{ margin: '10px 0 14px' }} />

      {/* starcie */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <FlagChip code={home} size="lg" />
          <span className="head head-md" style={{ fontSize: '1rem' }}>{teamName(home)}</span>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          {played
            ? <div className="num" style={{ fontSize: '2.2rem', lineHeight: 1, whiteSpace: 'nowrap' }}>{score}</div>
            : <div className="head" style={{ fontSize: '1.1rem', color: 'var(--ink-mute)' }}>—</div>}
        </div>
        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <FlagChip code={away} size="lg" />
          <span className="head head-md" style={{ fontSize: '1rem' }}>{teamName(away)}</span>
        </div>
      </div>

      {/* opis / komentarz */}
      {played
        ? (
          <div style={{ marginTop: 14, borderLeft: '3px solid var(--accent)', paddingLeft: 12 }}>
            <div className="kicker" style={{ fontSize: '0.6rem', marginBottom: 3 }}>Kronika kolejki</div>
            <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '1.02rem', lineHeight: 1.38 }}>„{comment}”</p>
          </div>
        )
        : (
          <>
            <p className="muted" style={{ margin: '14px 0 0', fontSize: '1.02rem', lineHeight: 1.4, textAlign: 'center' }}>{desc}</p>
            {/* forma / morale */}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[[home, formHome], [away, formAway]].map(([c, f]) => (
                <div key={c} style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 4, padding: '8px 10px', background: 'var(--paper-3)' }}>
                  <div className="mute2" style={{ fontFamily: OS, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Forma · {c}</div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
                    {f.map((res, i) => (
                      <span key={i} style={{
                        width: 17, height: 17, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: OS, fontWeight: 700, fontSize: '0.6rem', color: '#fff',
                        background: res === 'W' ? 'var(--b-tech)' : res === 'P' ? 'var(--ink-mute)' : 'var(--b-leg)',
                      }}>{res}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      <button onClick={onCta} className="btn btn-primary btn-block" style={{ marginTop: 18, fontSize: '1.02rem' }}>
        {played ? (cta || 'Dalej') : cta}
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

// ── PIONOWA DRABINKA (mobile) ───────────────────────────────
function Ladder({ steps }) {
  return (
    <div style={{ position: 'relative' }}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const state = s.state; // 'done' | 'current' | 'locked'
        const col = state === 'done' ? 'var(--b-tech)' : state === 'current' ? 'var(--accent)' : 'var(--line-2)';
        return (
          <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'stretch' }}>
            {/* linia + węzeł */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 26, flexShrink: 0 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                background: state === 'locked' ? 'var(--paper-3)' : col, color: '#fff',
                border: state === 'locked' ? '1.5px solid var(--line-2)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {state === 'done'
                  ? <svg width="13" height="13" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : state === 'current'
                    ? <span style={{ width: 8, height: 8, borderRadius: 9, background: '#fff' }} />
                    : <svg width="11" height="11" viewBox="0 0 24 24"><path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9H5z" stroke="var(--ink-mute)" strokeWidth="2" fill="none" strokeLinejoin="round"/></svg>}
              </div>
              {!last && <div style={{ width: 2, flex: 1, minHeight: 22, background: state === 'done' ? 'var(--b-tech)' : 'var(--line-2)' }} />}
            </div>
            {/* karta etapu */}
            <div style={{
              flex: 1, marginBottom: last ? 0 : 12,
              border: state === 'current' ? `2px solid var(--accent)` : '1.5px solid var(--line)',
              background: state === 'current' ? 'var(--paper-3)' : 'var(--paper-2)',
              borderRadius: 5, padding: '11px 13px', opacity: state === 'locked' ? 0.6 : 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span className="head head-md" style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>{s.stage}</span>
                {state === 'current' && <span className="badge" style={{ background: 'var(--accent)', color: '#fff', height: 18 }}>Teraz</span>}
                {state === 'done' && s.score && <span className="num" style={{ fontSize: '0.92rem', color: 'var(--b-tech)' }}>{s.score}</span>}
              </div>
              {s.opponent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
                  <FlagChip code={s.opponent} size="sm" />
                  <span className="muted" style={{ fontSize: '0.86rem' }}>{state === 'locked' ? 'Rywal nieznany' : teamName(s.opponent)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── KAFELEK TURNIEJU (hub) ──────────────────────────────────
function TournamentTile({ kicker, title, desc, cta, meta, state = 'open', accent, onCta, soonNote }) {
  const locked = state === 'locked';
  return (
    <div className="card" style={{
      padding: '15px 16px 16px', position: 'relative', opacity: locked ? 0.72 : 1,
      border: state === 'open' && accent ? '2px solid var(--accent)' : '1.5px solid var(--line)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span className="kicker" style={{ fontSize: '0.62rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{kicker}</span>
        {locked
          ? <span className="badge" style={{ background: 'var(--paper-3)', color: 'var(--ink-soft)', border: '1px solid var(--line-2)', height: 20 }}>Wkrótce</span>
          : meta && <span className="head mute2" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{meta}</span>}
      </div>
      <h2 className="head head-lg" style={{ marginTop: 6, fontSize: '1.42rem', lineHeight: 1 }}>{title}</h2>
      <p className="muted" style={{ margin: '7px 0 0', fontSize: '0.95rem', lineHeight: 1.36 }}>{desc}</p>
      {!locked && cta && (
        <button onClick={onCta} className="btn btn-primary btn-block" style={{ marginTop: 14, fontSize: '0.98rem' }}>
          {cta}
          <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {locked && soonNote && (
        <p className="mute2" style={{ margin: '11px 0 0', fontSize: '0.78rem', lineHeight: 1.3 }}>{soonNote}</p>
      )}
    </div>
  );
}

// ── EKRAN KOŃCOWY ───────────────────────────────────────────
function EndScreen({ outcome, headline, sub, path, bestPlayer, lineupNote, comment, ctaLabel, onCta, pathLabel }) {
  const win = outcome === 'win';
  const tc = win ? 'var(--b-leg)' : 'var(--ink)';
  return (
    <div>
      {/* winieta wyniku */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          display: 'inline-block', background: tc, color: win ? 'var(--b-leg-ink)' : 'var(--paper)',
          fontFamily: OS, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.16em',
          padding: '4px 12px', borderRadius: 2, textTransform: 'uppercase',
        }}>{win ? 'Mistrzostwo' : 'Koniec turnieju'}</span>
      </div>
      <hr className="dbl-rule" style={{ margin: '12px 0' }} />
      <h1 className="head" style={{ fontSize: '1.85rem', fontWeight: 700, textAlign: 'center', lineHeight: 0.98, textWrap: 'balance' }}>{headline}</h1>
      <p className="muted" style={{ margin: '8px 0 0', fontSize: '1rem', textAlign: 'center', lineHeight: 1.36 }}>{sub}</p>

      {/* droga przez turniej */}
      <div className="rule" style={{ margin: '18px 0 10px', fontSize: '0.66rem', letterSpacing: '0.16em' }}>{pathLabel || 'Droga Polski'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {path.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 64, flexShrink: 0 }} className="mute2"><span style={{ fontFamily: OS, fontSize: '0.64rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.stage}</span></span>
            <FlagChip code={p.opp} size="sm" />
            <span className="head" style={{ flex: 1, fontSize: '0.84rem' }}>{teamName(p.opp)}</span>
            <span className="num" style={{ fontSize: '0.92rem', whiteSpace: 'nowrap', color: p.win ? 'var(--b-tech)' : p.draw ? 'var(--ink-soft)' : 'var(--accent)' }}>{p.score}</span>
          </div>
        ))}
      </div>

      {/* najlepszy zawodnik + skład */}
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <div style={{ flex: 1, border: '1.5px solid var(--line)', borderTop: `3px solid ${tc}`, borderRadius: 4, padding: '10px 12px', background: 'var(--paper-3)' }}>
          <div className="kicker" style={{ fontSize: '0.58rem', color: tc }}>Najlepszy</div>
          <div className="head head-md" style={{ fontSize: '0.98rem', marginTop: 3 }}>{bestPlayer}</div>
        </div>
        <div style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 4, padding: '10px 12px', background: 'var(--paper-3)' }}>
          <div className="kicker" style={{ fontSize: '0.58rem' }}>Skład</div>
          <div className="head head-md" style={{ fontSize: '0.98rem', marginTop: 3 }}>{lineupNote}</div>
        </div>
      </div>

      {/* komentarz */}
      <div style={{ marginTop: 14, borderLeft: `3px solid ${tc}`, paddingLeft: 12 }}>
        <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.4 }}>„{comment}”</p>
      </div>

      <button onClick={onCta} className={`btn ${win ? 'btn-primary' : 'btn-solid'} btn-block`} style={{ marginTop: 18 }}>
        {ctaLabel || (win ? 'Świętuj z drużyną' : 'Zagraj jeszcze raz')}
      </button>
    </div>
  );
}

Object.assign(window, {
  FlagChip, StatusBanner, StandingsTable, FixtureRow, MatchCard, Ladder, TournamentTile, EndScreen, teamName, TEAM,
});
