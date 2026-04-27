/* ============================================================
   ATLAS ACADÉMIE — CHALLENGES.JS v1.0
   Challenges hebdomadaires — reset chaque lundi

   Système :
   - 5 challenges par semaine, reset automatique le lundi
   - Chaque challenge a un objectif, une progression, un XP
   - Les challenges "difficiles" donnent plus d'XP et sont facultatifs
   - Hooks : addProgress(type, value) appelé depuis chat.js / simulateur.html
   ============================================================ */

const AtlasChallenges = (function () {
  'use strict';

  const STORAGE_KEY = 'atlas_challenges_v1';

  // ── Catalogue de challenges (rotation hebdo) ─────────────────
  // Chaque semaine, 5 challenges sont tirés du catalogue selon la clé de semaine.
  const CATALOG = [
    // — Messages —
    { id: 'msg_10',     icon: '💬', title: '10 Messages',          desc: 'Envoie 10 messages à un coach cette semaine',         type: 'messages',    target: 10,  xp: 20,  difficulty: 'easy'   },
    { id: 'msg_25',     icon: '🗣️', title: '25 Messages',          desc: 'Envoie 25 messages au total cette semaine',           type: 'messages',    target: 25,  xp: 40,  difficulty: 'medium' },
    { id: 'msg_50',     icon: '📡', title: 'Marathon Coach',       desc: '50 messages dans la semaine — tu es sérieux.',        type: 'messages',    target: 50,  xp: 75,  difficulty: 'hard'   },

    // — Simulations —
    { id: 'sim_1',      icon: '🎯', title: 'Première Arène',       desc: 'Complète 1 simulation cette semaine',                 type: 'simulations', target: 1,   xp: 25,  difficulty: 'easy'   },
    { id: 'sim_3',      icon: '⚔️', title: 'Triple Duel',          desc: 'Complète 3 simulations cette semaine',                type: 'simulations', target: 3,   xp: 60,  difficulty: 'medium' },
    { id: 'sim_5',      icon: '🔥', title: 'Machine de Guerre',    desc: '5 simulations dans la semaine — niveau elite.',       type: 'simulations', target: 5,   xp: 100, difficulty: 'hard'   },

    // — Scores —
    { id: 'score_7',    icon: '⭐', title: 'Score Correct',        desc: 'Obtiens un score ≥ 7/10 dans le simulateur',          type: 'score',       target: 7,   xp: 30,  difficulty: 'easy'   },
    { id: 'score_8',    icon: '🏆', title: 'Haute Performance',    desc: 'Obtiens un score ≥ 8/10 dans le simulateur',          type: 'score',       target: 8,   xp: 50,  difficulty: 'medium' },
    { id: 'score_9',    icon: '💎', title: "Fermeture d'Or",       desc: 'Obtiens un score ≥ 9/10 dans le simulateur',          type: 'score',       target: 9,   xp: 100, difficulty: 'hard'   },

    // — Coachs —
    { id: 'coaches_2',  icon: '🤖', title: 'Double Coach',         desc: 'Utilise 2 coachs différents cette semaine',           type: 'coaches',     target: 2,   xp: 25,  difficulty: 'easy'   },
    { id: 'coaches_3',  icon: '🎭', title: 'Tour des Experts',     desc: 'Utilise 3 coachs différents cette semaine',           type: 'coaches',     target: 3,   xp: 50,  difficulty: 'medium' },
    { id: 'coaches_4',  icon: '👑', title: 'Maître de l\'Équipe',  desc: 'Utilise les 4 coachs IA cette semaine',               type: 'coaches',     target: 4,   xp: 80,  difficulty: 'hard'   },

    // — Streak —
    { id: 'streak_3',   icon: '🔥', title: '3 Jours d\'Affilée',   desc: 'Sois actif 3 jours consécutifs cette semaine',        type: 'streak',      target: 3,   xp: 35,  difficulty: 'medium' },
    { id: 'streak_5',   icon: '💪', title: 'Semaine Complète',     desc: '5 jours d\'activité sur la semaine',                  type: 'streak',      target: 5,   xp: 75,  difficulty: 'hard'   },

    // — Spéciaux —
    { id: 'disc_5',     icon: '🔬', title: 'Psychologue',          desc: 'Envoie 5 messages au Profileur DISC',                 type: 'coach_msg',   target: 5,   coachId: 'profileur', xp: 40, difficulty: 'medium' },
    { id: 'mindset_5',  icon: '🧠', title: 'Mindset Warrior',      desc: "Envoie 5 messages à l'Architecte du Pouvoir",         type: 'coach_msg',   target: 5,   coachId: 'architecte', xp: 40, difficulty: 'medium' },
  ];

  // ── Calcul de la clé de semaine (lundi → dimanche) ───────────
  function getWeekKey() {
    const now  = new Date();
    const day  = now.getDay() || 7; // 1=lundi … 7=dimanche
    const mon  = new Date(now);
    mon.setDate(now.getDate() - day + 1);
    return `${mon.getFullYear()}-W${String(Math.ceil((mon - new Date(mon.getFullYear(), 0, 1)) / 604800000 + 1)).padStart(2,'0')}`;
  }

  // ── Sélectionner 5 challenges pour la semaine ─────────────────
  // Algorithme déterministe : même semaine = mêmes challenges pour tout le monde
  function pickWeeklyChallenges(weekKey) {
    // Seed basé sur la clé de semaine
    let seed = weekKey.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    function rand() { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; }

    const pool    = [...CATALOG];
    const chosen  = [];
    const types   = new Set();

    // On veut au moins 1 challenge "easy", 2 "medium", 2 "hard"
    const targets = [
      { diff: 'easy',   count: 1 },
      { diff: 'medium', count: 2 },
      { diff: 'hard',   count: 2 },
    ];

    for (const { diff, count } of targets) {
      const candidates = pool.filter(c => c.difficulty === diff && !chosen.find(x => x.id === c.id));
      for (let i = 0; i < count && candidates.length > 0; i++) {
        const idx = Math.floor(rand() * candidates.length);
        chosen.push(candidates.splice(idx, 1)[0]);
      }
    }

    return chosen;
  }

  // ── Schéma par défaut ─────────────────────────────────────────
  function defaultState(weekKey) {
    const challenges = pickWeeklyChallenges(weekKey).map(def => ({
      id:        def.id,
      progress:  0,
      completed: false,
      claimedXP: false,
    }));
    return { weekKey, challenges, coachesUsedThisWeek: [], daysActiveThisWeek: [] };
  }

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    const weekKey = getWeekKey();
    try {
      const raw   = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      // Reset si nouvelle semaine
      if (!saved || saved.weekKey !== weekKey) return defaultState(weekKey);
      // Assurer les champs manquants
      if (!saved.coachesUsedThisWeek) saved.coachesUsedThisWeek = [];
      if (!saved.daysActiveThisWeek)  saved.daysActiveThisWeek  = [];
      return saved;
    } catch { return defaultState(weekKey); }
  }

  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    return state;
  }

  // ── Récupère la définition d'un challenge ─────────────────────
  function getDef(id) { return CATALOG.find(c => c.id === id); }

  // ── Fusionner état + définitions ──────────────────────────────
  function getMerged() {
    const state = load();
    return state.challenges.map(ch => {
      const def = getDef(ch.id);
      return { ...def, ...ch, pct: def ? Math.min(100, Math.round((ch.progress / def.target) * 100)) : 0 };
    });
  }

  // ── AJOUTER DE LA PROGRESSION ─────────────────────────────────
  /**
   * @param {string} type     — 'messages' | 'simulations' | 'score' | 'coaches' | 'coach_msg' | 'streak'
   * @param {number} value    — valeur à appliquer (score, count, etc.)
   * @param {Object} [opts]   — { coachId }
   */
  function addProgress(type, value, opts) {
    opts = opts || {};
    const state   = load();
    const today   = new Date().toISOString().split('T')[0];
    const changed = [];

    // Tracking coachs utilisés cette semaine
    if (type === 'messages' && opts.coachId) {
      if (!state.coachesUsedThisWeek.includes(opts.coachId)) {
        state.coachesUsedThisWeek.push(opts.coachId);
      }
    }

    // Tracking jours actifs cette semaine
    if (!state.daysActiveThisWeek.includes(today)) {
      state.daysActiveThisWeek.push(today);
    }

    // Mettre à jour chaque challenge pertinent
    for (const ch of state.challenges) {
      if (ch.completed) continue;
      const def = getDef(ch.id);
      if (!def) continue;

      let updated = false;

      if (def.type === 'messages' && type === 'messages') {
        ch.progress++;
        updated = true;
      } else if (def.type === 'simulations' && type === 'simulations') {
        ch.progress++;
        updated = true;
      } else if (def.type === 'score' && type === 'score') {
        // Pour les scores, on garde le max atteint
        if (value > ch.progress) { ch.progress = value; updated = true; }
      } else if (def.type === 'coaches' && type === 'messages' && opts.coachId) {
        ch.progress = state.coachesUsedThisWeek.length;
        updated = true;
      } else if (def.type === 'coach_msg' && type === 'messages' && opts.coachId === def.coachId) {
        ch.progress++;
        updated = true;
      } else if (def.type === 'streak' && type === 'messages') {
        ch.progress = state.daysActiveThisWeek.length;
        updated = true;
      }

      if (updated && ch.progress >= def.target && !ch.completed) {
        ch.completed  = true;
        changed.push(def);
      }
    }

    save(state);

    // XP + toasts pour les challenges complétés
    changed.forEach((def, i) => {
      setTimeout(() => {
        if (window.AtlasGamification) {
          AtlasGamification.addXP(def.xp, 'bonus', { silent: true });
        }
        _showChallengeToast(def);
      }, i * 1200);
    });

    return changed;
  }

  // ── Toast challenge complété ──────────────────────────────────
  function _showChallengeToast(def) {
    if (!window.AtlasGamification) return;
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.7rem;">
        <div style="font-size:1.8rem;flex-shrink:0;">${def.icon}</div>
        <div>
          <div style="color:#22c55e;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.15rem;">✅ Challenge complété !</div>
          <div style="color:#e5e7eb;font-weight:700;font-size:0.88rem;">${def.title}</div>
          <div style="color:#c9a84c;font-size:0.78rem;font-weight:700;">+${def.xp} XP</div>
        </div>
      </div>
    `;
    toast.style.cssText = `
      position:fixed;bottom:24px;right:24px;z-index:9999;
      background:linear-gradient(135deg,#0d1f38,#1a2d4a);
      border:1px solid rgba(34,197,94,0.4);border-radius:12px;
      padding:0.9rem 1.25rem;font-family:'Montserrat',sans-serif;
      box-shadow:0 8px 32px rgba(0,0,0,0.55);max-width:300px;
      animation:atlasToastIn 0.35s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'atlasToastOut 0.35s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // ── Résumé pour le dashboard ──────────────────────────────────
  function getSummary() {
    const state    = load();
    const merged   = getMerged();
    const done     = merged.filter(c => c.completed).length;
    const total    = merged.length;
    const xpAvail  = merged.filter(c => !c.completed).reduce((a, c) => a + (c.xp || 0), 0);
    const weekKey  = state.weekKey;

    // Jours restants dans la semaine
    const now  = new Date();
    const day  = now.getDay() || 7;
    const daysLeft = 8 - day; // 7=dimanche → 1 jour, 1=lundi → 7 jours

    return { challenges: merged, done, total, xpAvail, weekKey, daysLeft };
  }

  // ── Reset (debug) ─────────────────────────────────────────────
  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  // ── Export ────────────────────────────────────────────────────
  return { addProgress, getSummary, getMerged, getWeekKey, reset, CATALOG };

})();

window.AtlasChallenges = AtlasChallenges;
