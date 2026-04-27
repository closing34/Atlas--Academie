/* ============================================================
   ATLAS ACADÉMIE — GAMIFICATION.JS v2.0
   Système XP · Niveaux · Badges · Streaks · Toasts

   Phase 1 : localStorage (swappable Supabase Phase 2)
   ============================================================ */

const AtlasGamification = (function () {
  'use strict';

  const STORAGE_KEY = 'atlas_gamification_v1';

  // ── NIVEAUX (10 paliers) ──────────────────────────────────────
  const LEVELS = [
    { level: 1,  name: 'Rookie',             xp: 0,     color: '#6b7280', icon: '⭐' },
    { level: 2,  name: 'Apprenti Closer',    xp: 75,    color: '#3b82f6', icon: '📞' },
    { level: 3,  name: 'Négociateur',        xp: 200,   color: '#8b5cf6', icon: '💼' },
    { level: 4,  name: 'Vendeur Confirmé',   xp: 450,   color: '#22c55e', icon: '🎯' },
    { level: 5,  name: 'Closer',             xp: 900,   color: '#ef4444', icon: '🔥' },
    { level: 6,  name: 'Stratège',           xp: 1600,  color: '#f59e0b', icon: '🧊' },
    { level: 7,  name: 'Maître Closer',      xp: 2800,  color: '#f97316', icon: '🏆' },
    { level: 8,  name: "Chasseur d'Élite",   xp: 4500,  color: '#a855f7', icon: '⚡' },
    { level: 9,  name: 'Légende des Ventes', xp: 7000,  color: '#06b6d4', icon: '💎' },
    { level: 10, name: 'ATLAS ELITE',        xp: 10000, color: '#c9a84c', icon: '👑' },
  ];

  // ── BADGES (14 badges débloquables) ──────────────────────────
  const BADGES_DEF = {
    first_message:    { icon: '🚀', name: 'Premier Pas',       desc: 'Premier message envoyé à un coach',          xp: 10  },
    messages_10:      { icon: '💬', name: 'En Conversation',   desc: '10 messages envoyés au total',               xp: 20  },
    messages_50:      { icon: '🗣️', name: 'Orateur',           desc: '50 messages envoyés au total',               xp: 50  },
    messages_200:     { icon: '📡', name: 'Communicant',       desc: '200 messages envoyés',                       xp: 100 },
    first_sim:        { icon: '🎯', name: 'Gladiateur',        desc: 'Première simulation complétée',              xp: 30  },
    five_sims:        { icon: '⚡', name: 'Challenger',        desc: '5 simulations complétées',                  xp: 75  },
    ten_sims:         { icon: '🔐', name: 'Closer PRO',        desc: '10 simulations complétées',                 xp: 150 },
    score_9:          { icon: '🏆', name: "Fermeture d'Or",    desc: 'Score 9/10 ou plus dans le simulateur',     xp: 200 },
    all_coaches:      { icon: '🤖', name: 'Multi-Coach',       desc: 'Utilisé les 4 coachs IA',                   xp: 75  },
    streak_3:         { icon: '🔥', name: 'Sur la Lance',      desc: '3 jours consécutifs d\'activité',            xp: 30  },
    streak_7:         { icon: '💪', name: 'Régularité',        desc: '7 jours consécutifs d\'activité',            xp: 75  },
    score_closing_8:  { icon: '🔐', name: 'Closer Confirmé',   desc: 'Score Closing ≥ 8/10 dans les compétences',  xp: 150 },
    all_scores_7:     { icon: '⭐', name: 'Équilibré',         desc: 'Tous les scores de compétences ≥ 7/10',     xp: 200 },
    atlas_elite:      { icon: '👑', name: 'Atlas Elite',       desc: 'Atteindre le niveau 10 — ATLAS ELITE',      xp: 500 },
  };

  // ── XP PAR ACTION ─────────────────────────────────────────────
  const XP_RULES = {
    chat_message:     5,   // chaque échange coach
    first_of_day:     10,  // bonus premier message du jour
    sim_complete:     20,  // simulation terminée (base)
    sim_score_8:      10,  // bonus score ≥ 8
    sim_score_9:      20,  // bonus score ≥ 9
  };

  // ── SCHÉMA PAR DÉFAUT ─────────────────────────────────────────
  function defaultState() {
    return {
      totalXP:        0,
      earnedBadges:   [],
      streakDays:     0,
      lastStreakDate:  null,
      lastActiveDate:  null,
      totalMessages:   0,
      totalSims:       0,
      bestSimScore:    0,
      coachesUsed:     [],   // ['stratege', 'mentor', ...]
      updatedAt:       new Date().toISOString()
    };
  }

  // ── PERSISTENCE ───────────────────────────────────────────────
  function load() {
    try {
      const raw  = localStorage.getItem(STORAGE_KEY);
      const base = defaultState();
      return raw ? Object.assign(base, JSON.parse(raw)) : base;
    } catch { return defaultState(); }
  }

  function save(state) {
    state.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    return state;
  }

  // ── HELPERS ───────────────────────────────────────────────────
  function todayStr() { return new Date().toISOString().split('T')[0]; }

  // ── STREAK ────────────────────────────────────────────────────
  function updateStreak(state) {
    const today = todayStr();
    if (state.lastStreakDate === today) return state; // déjà compté

    if (state.lastStreakDate) {
      const prev = new Date(state.lastStreakDate + 'T12:00:00');
      const now  = new Date(today + 'T12:00:00');
      const diff = Math.round((now - prev) / 86400000);
      if (diff === 1) {
        state.streakDays++;
      } else {
        state.streakDays = 1; // streak cassé
      }
    } else {
      state.streakDays = 1;
    }
    state.lastStreakDate = today;
    state.lastActiveDate = today;
    return state;
  }

  function isFirstOfDay(state) {
    return state.lastActiveDate !== todayStr();
  }

  // ── NIVEAUX ───────────────────────────────────────────────────
  function getLevelFromXP(xp) {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (xp >= lvl.xp) current = lvl;
      else break;
    }
    const nextIdx = LEVELS.findIndex(l => l.level === current.level + 1);
    const next    = nextIdx >= 0 ? LEVELS[nextIdx] : null;
    const progress = next
      ? Math.min(100, Math.round(((xp - current.xp) / (next.xp - current.xp)) * 100))
      : 100;
    return { ...current, next, progress, xp };
  }

  // ── BADGES : VÉRIFICATION COMPLÈTE ───────────────────────────
  function checkBadges(state) {
    const alreadyHas  = new Set(state.earnedBadges);
    const newlyEarned = [];

    const usage  = window.AtlasUsage  ? window.AtlasUsage.getUsageSummary()  : null;
    const mem    = window.AtlasMemory ? window.AtlasMemory.getProgressSummary() : null;
    const scores = window.AtlasMemory ? (window.AtlasMemory.load()?.scores || {}) : {};

    const msgs  = Math.max(state.totalMessages, usage?.messagesUsed || 0);
    const sims  = state.totalSims;
    const best  = state.bestSimScore;
    const cu    = state.coachesUsed || [];

    const earn = (id) => {
      if (!alreadyHas.has(id) && BADGES_DEF[id]) {
        state.earnedBadges.push(id);
        state.totalXP += BADGES_DEF[id].xp;
        newlyEarned.push({ id, ...BADGES_DEF[id] });
        alreadyHas.add(id);
      }
    };

    // Messages
    if (msgs >= 1)   earn('first_message');
    if (msgs >= 10)  earn('messages_10');
    if (msgs >= 50)  earn('messages_50');
    if (msgs >= 200) earn('messages_200');

    // Simulations
    if (sims >= 1)   earn('first_sim');
    if (sims >= 5)   earn('five_sims');
    if (sims >= 10)  earn('ten_sims');

    // Score sim
    if (best >= 9)   earn('score_9');

    // Coachs
    if (cu.length >= 4) earn('all_coaches');

    // Streak
    if (state.streakDays >= 3) earn('streak_3');
    if (state.streakDays >= 7) earn('streak_7');

    // Compétences (depuis AtlasMemory)
    if ((scores.closing || 0) >= 8) earn('score_closing_8');
    const allAbove7 = Object.keys(scores).length >= 5
      && Object.values(scores).every(s => s >= 7);
    if (allAbove7) earn('all_scores_7');

    // Niveau max
    if (state.totalXP >= 10000) earn('atlas_elite');

    return newlyEarned;
  }

  // ── SYNC DEPUIS L'ÉTAT EXISTANT ───────────────────────────────
  // (reconstruit l'XP à partir des données AtlasUsage/AtlasMemory
  //  pour les utilisateurs qui n'avaient pas encore gamification.js)
  function syncFromExistingData(state) {
    const usage  = window.AtlasUsage  ? window.AtlasUsage.getUsageSummary()  : null;
    const msgs   = usage?.messagesUsed || 0;

    // Si aucun XP et des messages existent → bootstrap XP
    if (state.totalXP === 0 && msgs > 0) {
      state.totalXP = msgs * XP_RULES.chat_message;
      state.totalMessages = msgs;
    }

    return state;
  }

  // ── TOASTS ────────────────────────────────────────────────────
  let _toastQueue = [];
  let _toastShowing = false;

  function _injectToastStyles() {
    if (document.getElementById('atlas-toast-style')) return;
    const style = document.createElement('style');
    style.id = 'atlas-toast-style';
    style.textContent = `
      .atlas-toast-wrap {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        display: flex; flex-direction: column; gap: 10px; pointer-events: none;
      }
      .atlas-toast {
        background: linear-gradient(135deg, #0d1f38, #1a2d4a);
        border: 1px solid rgba(201,168,76,0.45);
        border-radius: 12px; padding: 0.9rem 1.25rem;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 8px 32px rgba(0,0,0,0.55);
        max-width: 300px; pointer-events: all;
        animation: atlasToastIn 0.35s ease;
      }
      .atlas-toast.out { animation: atlasToastOut 0.35s ease forwards; }
      @keyframes atlasToastIn  { from { transform: translateX(30px); opacity:0; } to { transform: none; opacity:1; } }
      @keyframes atlasToastOut { from { opacity:1; } to { opacity:0; transform: translateX(20px); } }
    `;
    document.head.appendChild(style);
  }

  function _getToastWrap() {
    let wrap = document.getElementById('atlas-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'atlas-toast-wrap';
      wrap.className = 'atlas-toast-wrap';
      document.body.appendChild(wrap);
    }
    return wrap;
  }

  function _showNextToast() {
    if (!_toastQueue.length) { _toastShowing = false; return; }
    _toastShowing = true;
    _injectToastStyles();
    const { html, duration } = _toastQueue.shift();
    const wrap = _getToastWrap();
    const el   = document.createElement('div');
    el.className = 'atlas-toast';
    el.innerHTML = html;
    wrap.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => { el.remove(); _showNextToast(); }, 350);
    }, duration || 2800);
  }

  function _queueToast(html, duration) {
    _toastQueue.push({ html, duration });
    if (!_toastShowing) _showNextToast();
  }

  function showXpToast(amount, label) {
    _queueToast(`
      <div style="display:flex;align-items:center;gap:0.65rem;">
        <div style="font-size:1.4rem;">⚡</div>
        <div>
          <div style="color:#c9a84c;font-weight:700;font-size:0.95rem;">+${amount} XP</div>
          <div style="color:#9ca3af;font-size:0.76rem;">${label || 'Progression'}</div>
        </div>
      </div>
    `, 2500);
  }

  function showLevelUpToast(levelInfo) {
    _queueToast(`
      <div style="text-align:center;padding:0.25rem 0;">
        <div style="font-size:2rem;margin-bottom:0.4rem;">${levelInfo.icon}</div>
        <div style="color:#c9a84c;font-family:'Cinzel',serif;font-size:0.9rem;font-weight:700;letter-spacing:0.1em;margin-bottom:0.25rem;">
          NIVEAU ${levelInfo.level} ATTEINT
        </div>
        <div style="color:#e5e7eb;font-size:0.85rem;">${levelInfo.name}</div>
      </div>
    `, 4500);
  }

  function showBadgeToast(badge) {
    _queueToast(`
      <div style="display:flex;align-items:center;gap:0.7rem;">
        <div style="font-size:1.8rem;flex-shrink:0;">${badge.icon}</div>
        <div>
          <div style="color:#c9a84c;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.15rem;">🏅 Badge débloqué !</div>
          <div style="color:#e5e7eb;font-weight:700;font-size:0.88rem;">${badge.name}</div>
          <div style="color:#9ca3af;font-size:0.72rem;line-height:1.3;">${badge.desc}</div>
        </div>
      </div>
    `, 4000);
  }

  // ── AJOUTER DE L'XP ──────────────────────────────────────────
  /**
   * @param {number} amount   — XP de base à ajouter
   * @param {string} source   — 'chat' | 'simulator' | 'bonus'
   * @param {Object} [opts]   — { coachId, score, silent }
   */
  function addXP(amount, source, opts) {
    opts = opts || {};
    let state = load();

    const lvlBefore = getLevelFromXP(state.totalXP);

    // Bonus premier message du jour
    let bonus = 0;
    if (source === 'chat' && isFirstOfDay(state)) {
      bonus = XP_RULES.first_of_day;
    }

    // Mise à jour streak
    state = updateStreak(state);

    // Tracking spécifique
    if (source === 'chat') {
      state.totalMessages = (state.totalMessages || 0) + 1;
      if (opts.coachId && !state.coachesUsed.includes(opts.coachId)) {
        state.coachesUsed.push(opts.coachId);
      }
    }

    if (source === 'simulator') {
      state.totalSims = (state.totalSims || 0) + 1;
      const sc = parseFloat(opts.score) || 0;
      if (sc > (state.bestSimScore || 0)) state.bestSimScore = sc;
      // Bonus score sim
      if (sc >= 9) bonus += XP_RULES.sim_score_9;
      else if (sc >= 8) bonus += XP_RULES.sim_score_8;
    }

    const totalGain = amount + bonus;
    state.totalXP = (state.totalXP || 0) + totalGain;

    save(state);

    // Vérification badges
    const newBadges = checkBadges(state);
    save(state); // save again après badges (XP badges inclus)

    // Niveau après
    const lvlAfter  = getLevelFromXP(state.totalXP);
    const leveledUp = lvlAfter.level > lvlBefore.level;

    // Toasts
    if (!opts.silent && totalGain > 0) {
      const label = source === 'simulator' ? 'Simulation terminée' : 'Message coach';
      showXpToast(totalGain, label + (bonus ? ` (+${bonus} bonus)` : ''));
    }
    if (!opts.silent && leveledUp) {
      setTimeout(() => showLevelUpToast(getLevelFromXP(state.totalXP)), 700);
    }
    if (!opts.silent) {
      newBadges.forEach((b, i) => setTimeout(() => showBadgeToast(b), 1000 + i * 1200));
    }

    return { xp: state.totalXP, leveledUp, newBadges, level: lvlAfter };
  }

  // ── RÉSUMÉ COMPLET (pour dashboard) ──────────────────────────
  function getSummary() {
    let state = load();
    state = syncFromExistingData(state);

    // Streak au chargement dashboard
    state = updateStreak(state);
    save(state);

    const level = getLevelFromXP(state.totalXP);
    const badges = (state.earnedBadges || [])
      .filter(id => BADGES_DEF[id])
      .map(id => ({ id, ...BADGES_DEF[id] }));

    return {
      xp:          state.totalXP,
      level,
      badges,                         // badges débloqués (array)
      allBadges:   BADGES_DEF,        // tous les badges (object) — pour affichage locked/unlocked
      streakDays:  state.streakDays,
      totalMessages: state.totalMessages,
      totalSims:   state.totalSims,
      bestScore:   state.bestSimScore,
      totalBadges: Object.keys(BADGES_DEF).length,
    };
  }

  // ── RESET ─────────────────────────────────────────────────────
  function reset() {
    const s = defaultState();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
  }

  // ── EXPORT ────────────────────────────────────────────────────
  return {
    addXP,
    getSummary,
    getLevelFromXP,
    showXpToast,
    showLevelUpToast,
    showBadgeToast,
    reset,
    LEVELS,
    BADGES_DEF,
    XP_RULES
  };

})();

window.AtlasGamification = AtlasGamification;
