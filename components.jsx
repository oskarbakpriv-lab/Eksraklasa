/* ============================================================
   Wspólne komponenty UI
   ============================================================ */

// ── Gwiazdka (SVG) ──────────────────────────────────────────
function StarIcon({ filled, size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <path
        d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.3l1.2-6.6L2.5 9.5l6.6-.9z"
        fill={filled ? (color || 'var(--accent)') : 'none'}
        stroke={filled ? (color || 'var(--accent)') : 'var(--line-2)'}
        strokeWidth="1.6" strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ value, size = 14, color }) {
  return (
    <span className="stars" aria-label={`${value} z 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= value} size={size} color={color} />
      ))}
    </span>
  );
}

// ── Badge ───────────────────────────────────────────────────
function Badge({ code }) {
  return <span className={`badge badge-${code}`}>{code}</span>;
}

function BadgeRow({ codes, gap = 5 }) {
  if (!codes || !codes.length) return null;
  return (
    <span style={{ display: 'inline-flex', gap, flexWrap: 'wrap' }}>
      {codes.map((c) => <Badge key={c} code={c} />)}
    </span>
  );
}

// ── Chip pozycji ────────────────────────────────────────────
function PosChip({ pos }) {
  return <span className={`poschip pos-${pos}`}>{pos}</span>;
}

// ── Klasa zawodnika jako „pasek mocy" (bez liczb) ───────────
const KLASA_LEVEL = {
  'Światowa klasa': 4, 'Mistrz ligi': 3, 'Solidny ligowiec': 2, 'Objawienie': 2,
};
function ClassTag({ klasa }) {
  const lvl = KLASA_LEVEL[klasa] || 2;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          <span key={i} style={{
            width: 6, height: 13, borderRadius: 1,
            background: i <= lvl ? 'var(--accent)' : 'var(--line)',
          }} />
        ))}
      </span>
      <span className="head" style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{klasa}</span>
    </span>
  );
}

// ── Bottom sheet (mobilny, scroll w środku, sticky footer) ──
function BottomSheet({ open, onClose, title, kicker, children, footer, maxH = '88%' }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 200,
        background: 'rgba(10,8,6,0.55)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        animation: 'fade .18s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper-2)',
          borderTopLeftRadius: 16, borderTopRightRadius: 16,
          borderTop: '1.5px solid var(--line-2)',
          maxHeight: maxH, display: 'flex', flexDirection: 'column',
          animation: 'sheetUp .26s cubic-bezier(.2,.8,.2,1)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.35)',
        }}
      >
        {/* grab handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 9, paddingBottom: 4 }}>
          <div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--line-2)' }} />
        </div>
        {/* header */}
        {(title || kicker) && (
          <div style={{ padding: '6px var(--pad) 10px', borderBottom: '1px solid var(--line)' }}>
            {kicker && <div className="kicker" style={{ marginBottom: 3 }}>{kicker}</div>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              {title && <h2 className="head head-lg" style={{ flex: 1 }}>{title}</h2>}
              <button
                onClick={onClose}
                aria-label="Zamknij"
                style={{
                  width: 38, height: 38, borderRadius: 999, flexShrink: 0,
                  border: '1.5px solid var(--line-2)', background: 'transparent',
                  color: 'var(--ink)', fontSize: 20, lineHeight: 1, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          </div>
        )}
        {/* body */}
        <div className="scroll" style={{ flex: 1, padding: 'var(--pad)', minHeight: 0 }}>
          {children}
        </div>
        {/* sticky footer */}
        {footer && (
          <div style={{
            padding: 'var(--pad)', borderTop: '1px solid var(--line)',
            background: 'var(--paper-2)',
          }}>{footer}</div>
        )}
      </div>
    </div>
  );
}

// ── Dolny pasek z głównym CTA ───────────────────────────────
function CTABar({ children }) {
  return (
    <div style={{
      padding: 'calc(var(--pad) * 0.85) var(--pad)',
      paddingBottom: 'calc(var(--pad) * 0.85 + env(safe-area-inset-bottom, 0px))',
      borderTop: '1px solid var(--line)',
      background: 'var(--paper)',
      display: 'flex', gap: 'var(--gap)', alignItems: 'center',
    }}>{children}</div>
  );
}

// ── Lepki nagłówek sekcji pozycji ───────────────────────────
function SectionHeader({ pos, count }) {
  const L = window.GAME_DATA.POS_LABELS[pos];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 2,
      background: 'var(--paper)',
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 2px 7px',
    }}>
      <PosChip pos={pos} />
      <span className="head head-md" style={{ flex: 1 }}>{L.full}</span>
      {count != null && <span className="mute2 head" style={{ fontSize: '0.85rem' }}>{count}</span>}
    </div>
  );
}

// ── Wiersz zawodnika (lista) ────────────────────────────────
function PlayerRow({ player, onClick, picked, showCost }) {
  return (
    <button
      onClick={onClick}
      className={`card pos-${player.pos}`}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 12,
        minHeight: 'var(--tap)', padding: '10px 12px 10px 14px',
        borderLeft: '5px solid var(--pos)', marginBottom: 8,
        background: picked ? 'var(--paper-3)' : 'var(--paper-2)',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span className="head head-md" style={{ fontSize: '1.05rem' }}>{player.name}</span>
        </div>
        <div className="muted" style={{ fontSize: '0.84rem', marginTop: 1 }}>
          {player.club} · {player.era}
        </div>
        <div style={{ marginTop: 5 }}><BadgeRow codes={player.badges} /></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        {showCost && <span className="num" style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{player.cost} mln</span>}
        {picked
          ? <span className="badge" style={{ background: 'var(--b-tech)', color: '#fff' }}>W SKŁADZIE</span>
          : <svg width="9" height="15" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="var(--ink-mute)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
    </button>
  );
}

// ── Sylwetka piłkarza (popiersie) ───────────────────────────
function BustIcon() {
  return (
    <svg className="psticker-bust" viewBox="0 0 64 60" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g fill="rgba(255,255,255,0.92)">
        <circle cx="32" cy="18" r="13" />
        <path d="M6 60c0-15 11-23 26-23s26 8 26 23z" />
      </g>
      <g fill="rgba(0,0,0,0.12)">
        <path d="M32 37c15 0 26 8 26 23H40c0-9-3-17-8-23z" />
      </g>
    </svg>
  );
}

// ── Emblemat (najważniejszy badge) ──────────────────────────
const BADGE_PRIORITY = ['LEG', 'REP', 'SFG', 'KAP', 'TECH'];
function topBadge(player) {
  for (const b of BADGE_PRIORITY) if (player.badges.includes(b)) return b;
  return null;
}
function StickerEmblem({ code }) {
  if (code === 'REP') {
    return (
      <div className="psticker-emblem" style={{ background: '#fff', padding: 0, overflow: 'hidden' }} title="Reprezentant Polski">
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ height: '50%', background: '#fff' }} />
          <div style={{ height: '50%', background: 'var(--b-rep)' }} />
        </div>
      </div>
    );
  }
  const map = {
    LEG: { bg: 'var(--b-leg)', col: '#3a2a06', glyph: '★' },
    SFG: { bg: 'var(--b-sfg)', col: '#fff', glyph: '★' },
    KAP: { bg: 'var(--b-kap)', col: '#fff', glyph: 'K' },
    TECH: { bg: 'var(--b-tech)', col: '#fff', glyph: 'T' },
  };
  const m = map[code]; if (!m) return null;
  return <div className="psticker-emblem" style={{ background: m.bg, color: m.col }} title={code}>{m.glyph}</div>;
}

// ── NAKLEJKA PIŁKARSKA ──────────────────────────────────────
function PlayerSticker({ player, w = 72, compact = false }) {
  const isLeg = player.badges.includes('LEG');
  const tb = topBadge(player);
  return (
    <div className={`psticker pos-${player.pos}${isLeg ? ' psticker-foil' : ''}`} style={{ width: w, animation: 'pop .2s ease' }}>
      <div className="psticker-frame">
        <div className="psticker-photo">
          <span className="psticker-pos">{player.pos}</span>
          {tb && <StickerEmblem code={tb} />}
          <BustIcon />
        </div>
        <div className="psticker-name">
          <div className="psticker-surname" style={{ fontSize: compact ? '0.72rem' : '0.96rem' }}>
            {compact ? surname(player.name) : player.name}
          </div>
          {!compact && (
            <div className="psticker-meta" style={{ fontSize: '0.68rem', marginTop: 2 }}>
              {player.club} · {player.era}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  StarIcon, Stars, Badge, BadgeRow, PosChip, ClassTag,
  BottomSheet, CTABar, SectionHeader, PlayerRow,
  BustIcon, StickerEmblem, PlayerSticker, topBadge,
});
