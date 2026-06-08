/* ============================================================
   Sheety: draft ekipy, lista zawodników, karta zawodnika
   ============================================================ */

// ── DRAFT EKIPY ─────────────────────────────────────────────
// Reroll ≠ zamknięcie. Zamknięcie/tap-poza zostawia wylosowaną ekipę.
function DraftSheet({ open, onClose, pool, rerolls, onReroll, onAccept }) {
  if (!open) return null;
  const { POS_LABELS } = window.GAME_DATA;
  const order = ['BR', 'OBR', 'POM', 'NAP'];
  const byPos = order.map((p) => ({ pos: p, list: pool.filter((x) => x.pos === p) }));
  const legends = pool.filter((p) => p.badges.includes('LEG')).length;
  const reps = pool.filter((p) => p.badges.includes('REP')).length;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      kicker="Wylosowana ekipa"
      title="Twoja pula zawodników"
      maxH="90%"
      footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 'var(--gap)' }}>
            <button
              className="btn btn-ghost"
              style={{ flex: 1 }}
              disabled={rerolls <= 0}
              onClick={onReroll}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" style={{ marginRight: 2 }}><path d="M21 12a9 9 0 1 1-2.64-6.36M21 4v5h-5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Losuj ponownie
              <span className="badge" style={{ background: rerolls > 0 ? 'var(--ink)' : 'var(--line-2)', color: 'var(--paper)', marginLeft: 4 }}>{rerolls}</span>
            </button>
            <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={onAccept}>
              Zostaw tę ekipę
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" fill="none" stroke="var(--ink-mute)" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="var(--ink-mute)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="mute2" style={{ fontSize: '0.78rem' }}>
              Zamknięcie okna <b>nie losuje od nowa</b> — ekipa zostaje.
            </span>
          </div>
        </div>
      }
    >
      {/* mini-podsumowanie puli */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div className="card" style={{ flex: 1, padding: '8px 10px', textAlign: 'center' }}>
          <div className="num" style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>{pool.length}</div>
          <div className="mute2 head" style={{ fontSize: '0.62rem' }}>zawodników</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '8px 10px', textAlign: 'center' }}>
          <div className="num" style={{ fontSize: '1.4rem', color: 'var(--b-leg)' }}>{legends}</div>
          <div className="mute2 head" style={{ fontSize: '0.62rem' }}>legend</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '8px 10px', textAlign: 'center' }}>
          <div className="num" style={{ fontSize: '1.4rem' }}>{reps}</div>
          <div className="mute2 head" style={{ fontSize: '0.62rem' }}>reprezentantów</div>
        </div>
      </div>

      {byPos.map(({ pos, list }) => (
        <div key={pos} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <PosChip pos={pos} />
            <span className="head head-md" style={{ flex: 1, fontSize: '1rem' }}>{POS_LABELS[pos].full}</span>
            <span className="mute2 head" style={{ fontSize: '0.8rem' }}>{list.length}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {list.map((p) => (
              <span key={p.id} className={`card pos-${p.pos}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 9px', borderLeft: '4px solid var(--pos)', fontSize: '0.86rem',
              }}>
                <span className="head" style={{ fontSize: '0.86rem' }}>{p.name}</span>
                {p.badges[0] && <Badge code={p.badges[0]} />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </BottomSheet>
  );
}

// ── LISTA ZAWODNIKÓW NA POZYCJĘ (do slotu) ──────────────────
function PlayerListSheet({ open, onClose, pos, pool, lineup, showCost, onSelect }) {
  if (!open || !pos) return null;
  const { POS_LABELS } = window.GAME_DATA;
  const usedIds = Object.values(lineup).filter(Boolean).map((p) => p.id);
  const list = pool.filter((p) => p.pos === pos);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      kicker={`Wybierz na pozycję · ${POS_LABELS[pos].one}`}
      title={POS_LABELS[pos].full}
      maxH="86%"
    >
      <p className="mute2" style={{ fontSize: '0.82rem', marginTop: -2, marginBottom: 12 }}>
        Stuknij zawodnika, by zobaczyć kartę i dodać go do składu.
      </p>
      {list.map((p) => (
        <PlayerRow
          key={p.id}
          player={p}
          picked={usedIds.includes(p.id)}
          showCost={showCost}
          onClick={() => onSelect(p)}
        />
      ))}
    </BottomSheet>
  );
}

// ── KARTA ZAWODNIKA (pełna) ─────────────────────────────────
function PlayerCardSheet({ open, onClose, player, inLineup, showCost, affordable = true, onAdd, onRemove }) {
  const [showLegend, setShowLegend] = React.useState(false);
  if (!open || !player) return null;
  const { BADGES, POS_LABELS } = window.GAME_DATA;
  const attrs = Object.entries(player.attrs);

  const footer = inLineup
    ? <button className="btn btn-ghost btn-block" onClick={onRemove}>Usuń ze składu</button>
    : (showCost && !affordable
        ? <button className="btn btn-block" disabled style={{ background: 'var(--line)', color: 'var(--ink-mute)' }}>Za drogi — brak budżetu ({player.cost} mln)</button>
        : <button className="btn btn-primary btn-block" onClick={onAdd}>
            Dodaj do składu{showCost ? ` · ${player.cost} mln` : ''}
          </button>);

  return (
    <BottomSheet open={open} onClose={onClose} maxH="90%" footer={footer}>
      {/* nagłówek karty — naklejka */}
      <div className={`card pos-${player.pos}`} style={{
        borderTop: '6px solid var(--pos)', padding: '14px 14px 16px', marginBottom: 16,
        background: 'var(--paper-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <PosChip pos={player.pos} />
          <div style={{ flex: 1 }}>
            <h2 className="head head-lg" style={{ lineHeight: 0.98 }}>{player.name}</h2>
            <div className="muted" style={{ fontSize: '0.88rem', marginTop: 2 }}>{player.club} · {player.era}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <BadgeRow codes={player.badges} />
          {player.badges.length > 0 && (
            <button onClick={() => setShowLegend((s) => !s)} style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: 'var(--ink-mute)', fontSize: '0.78rem', textDecoration: 'underline', padding: 0,
            }}>co to znaczy?</button>
          )}
        </div>
        {showLegend && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {player.badges.map((b) => (
              <div key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <Badge code={b} />
                <span className="muted" style={{ fontSize: '0.82rem' }}><b>{BADGES[b].label}.</b> {BADGES[b].desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* klasa zawodnika (po ludzku) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 10 }}>
        <span className="kicker">Klasa</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {showCost && <span className="badge" style={{ background: 'var(--paper-3)', color: 'var(--ink)', border: '1px solid var(--line-2)' }}>{player.cost} mln</span>}
          <ClassTag klasa={player.klasa} />
        </div>
      </div>

      {/* atrybuty po ludzku (gwiazdki) */}
      <div className="rule" style={{ fontSize: '0.7rem', letterSpacing: '0.16em', marginBottom: 10 }}>Atuty</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {attrs.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="head" style={{ flex: 1, fontSize: '0.95rem', fontWeight: 500, textTransform: 'none' }}>{k}</span>
            <Stars value={v} size={16} />
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}

Object.assign(window, { DraftSheet, PlayerListSheet, PlayerCardSheet });
