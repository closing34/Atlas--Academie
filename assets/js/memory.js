/* ============================================================
   ATLAS ACADÉMIE — MEMORY.JS v1.0
   Système de mémoire utilisateur pour les coachs IA

   ARCHITECTURE (Phase 1 — localStorage)
   ─────────────────────────────────────
   Ce module est conçu pour être swappé vers une API distante
   (Supabase + Netlify Functions) sans changer le code côté coach.
   Toutes les lectures/écritures passent par ce module.

   STRUCTURE MÉMOIRE
   ─────────────────
   atlas_coach_memory_v1 : {
     meta     : { version, created, updated }
     user     : { id, name, level, niche, goal, style, program }
     scores   : { closing, discovery, objections, mindset, persuasion, disc, confidence }
     weaknesses : { [topic]: { count, last, notes[] } }
     coaches  : { [coachId]: CoachMemory }
   }

   CoachMemory : {
     total       : number
     used_angles : { [topic]: number[] }  ← anti-répétition
     topics      : { topic, angle, t }[]  ← long term
     short       : { role, text, topic, t }[]  ← session courante
     last_session: ISO string
   }
   ============================================================ */

const AtlasMemory = (function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────
  const STORAGE_KEY     = 'atlas_coach_memory_v1';
  const SHORT_TERM_MAX  = 15;   // messages gardés en mémoire courte
  const TOPIC_HIST_MAX  = 50;   // topics max en historique long terme
  const ANGLE_COOLDOWN  = 3;    // nb d'interactions avant de pouvoir recycler un angle

  // ── Schéma ──────────────────────────────────────────────────────
  function defaultMemory() {
    return {
      meta: { version: '1.0', created: ts(), updated: ts() },
      user: {
        id:      uid(),
        name:    null,
        level:   null,    // 'debutant' | 'intermediaire' | 'avance'
        niche:   null,    // ex: 'closer indépendant', 'commercial', 'entrepreneur'
        goal:    null,    // ex: 'améliorer mon taux de closing'
        style:   null,    // 'pedagogique' | 'strategique' | 'intensif'
        program: null     // formation suivie
      },
      scores: {
        closing:    5,
        discovery:  5,
        objections: 5,
        mindset:    5,
        persuasion: 5,
        disc:       5,
        confidence: 5
      },
      weaknesses: {},    // ex: { objection: { count:3, last:'…', notes:[] } }
      coaches: {}        // ex: { stratege: CoachMemory }
    };
  }

  function defaultCoachMemory() {
    return {
      total:        0,
      used_angles:  {},   // { [topic]: [idx, idx, …] }
      topics:       [],   // { topic, angle, t }
      short:        [],   // { role, text, topic, t } — session courante
      last_session: null
    };
  }

  // ── Helpers ─────────────────────────────────────────────────────
  function ts()  { return new Date().toISOString(); }
  function uid() { return 'u_' + Math.random().toString(36).substr(2, 9); }

  // ── Load / Save ─────────────────────────────────────────────────
  let _mem = null;

  function load() {
    if (_mem) return _mem;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      _mem = raw ? JSON.parse(raw) : defaultMemory();
      // Migration si structure incomplète
      if (!_mem.meta)       _mem.meta       = defaultMemory().meta;
      if (!_mem.scores)     _mem.scores     = defaultMemory().scores;
      if (!_mem.weaknesses) _mem.weaknesses = {};
      if (!_mem.coaches)    _mem.coaches    = {};
    } catch (e) {
      _mem = defaultMemory();
    }
    return _mem;
  }

  function save() {
    if (!_mem) return;
    _mem.meta.updated = ts();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_mem));
    } catch (e) {
      console.warn('[AtlasMemory] localStorage full or unavailable');
    }
  }

  function getCoachMem(coachId) {
    const mem = load();
    if (!mem.coaches[coachId]) mem.coaches[coachId] = defaultCoachMemory();
    return mem.coaches[coachId];
  }

  // ── Mémoire court terme (session) ───────────────────────────────
  /**
   * Enregistre un message dans la mémoire courte du coach.
   * @param {string} coachId
   * @param {'user'|'coach'} role
   * @param {string} text
   * @param {string|null} topic  — intent détecté (ex: 'objection', 'closing')
   */
  function addMessage(coachId, role, text, topic) {
    const cm = getCoachMem(coachId);
    cm.short.push({
      role,
      text:  text.slice(0, 300),
      topic: topic || null,
      t:     ts()
    });
    if (cm.short.length > SHORT_TERM_MAX) {
      cm.short = cm.short.slice(-SHORT_TERM_MAX);
    }
    if (role === 'user') {
      cm.total++;
      load().user.last_active = ts();
    }
    cm.last_session = ts();
    save();
  }

  // ── Anti-répétition ─────────────────────────────────────────────
  /**
   * Retourne les indices d'angles déjà utilisés pour un topic donné.
   */
  function getUsedAngles(coachId, topic) {
    return getCoachMem(coachId).used_angles[topic] || [];
  }

  /**
   * Retourne les indices disponibles (non utilisés) pour un topic.
   * @param {string} coachId
   * @param {string} topic
   * @param {number} totalAngles  — nb total de réponses disponibles
   */
  function getAvailableAngles(coachId, topic, totalAngles) {
    const used = getUsedAngles(coachId, topic);
    const all  = Array.from({ length: totalAngles }, (_, i) => i);
    const available = all.filter(i => !used.includes(i));

    // Si tous épuisés → recycler les plus anciens (pas les 2 derniers)
    if (available.length === 0 && used.length > 2) {
      return used.slice(0, used.length - 2);
    }
    return available.length > 0 ? available : all;
  }

  /**
   * Marque un angle comme utilisé pour ce topic.
   */
  function recordAngle(coachId, topic, angleIndex) {
    const cm = getCoachMem(coachId);
    if (!cm.used_angles[topic]) cm.used_angles[topic] = [];

    // Ajouter à la fin (FIFO)
    cm.used_angles[topic] = cm.used_angles[topic].filter(i => i !== angleIndex);
    cm.used_angles[topic].push(angleIndex);

    // Historique long terme
    cm.topics.push({ topic, angle: angleIndex, t: ts() });
    if (cm.topics.length > TOPIC_HIST_MAX) {
      cm.topics = cm.topics.slice(-TOPIC_HIST_MAX);
    }
    save();
  }

  /**
   * Vérifie si le topic a déjà été traité (revient pour la Nème fois).
   * @returns {number}  0 = première fois, 1+ = Nème retour
   */
  function getTopicRecurrence(coachId, topic) {
    const cm = getCoachMem(coachId);
    return cm.topics.filter(t => t.topic === topic).length;
  }

  // ── Faiblesses & scoring ─────────────────────────────────────────
  /**
   * Enregistre une faiblesse détectée dans le message utilisateur.
   * @param {string} topic  — ex: 'objection', 'closing', 'confiance'
   * @param {string} [note] — note courte sur la faiblesse spécifique
   */
  function recordWeakness(topic, note) {
    const mem = load();
    if (!mem.weaknesses[topic]) {
      mem.weaknesses[topic] = { count: 0, last: null, notes: [] };
    }
    mem.weaknesses[topic].count++;
    mem.weaknesses[topic].last = ts();
    if (note) {
      const n = note.slice(0, 120);
      if (!mem.weaknesses[topic].notes.includes(n)) {
        mem.weaknesses[topic].notes.push(n);
        if (mem.weaknesses[topic].notes.length > 5) {
          mem.weaknesses[topic].notes = mem.weaknesses[topic].notes.slice(-5);
        }
      }
    }
    // Auto-mise à jour du score: si topic revient souvent → score baisse
    const scoreMap = {
      objection:    'objections',
      closing:      'closing',
      prospection:  'discovery',
      negociation:  'objections',
      motivation:   'mindset',
      confiance:    'confidence',
      disc:         'disc'
    };
    if (scoreMap[topic] && mem.weaknesses[topic].count > 2) {
      mem.scores[scoreMap[topic]] = Math.max(1,
        mem.scores[scoreMap[topic]] - 0.3
      );
    }
    save();
  }

  /**
   * Mise à jour manuelle d'un score.
   * @param {string} skill
   * @param {number} delta  — négatif ou positif (ex: +0.5, -1)
   */
  function updateScore(skill, delta) {
    const mem = load();
    if (mem.scores[skill] !== undefined) {
      mem.scores[skill] = Math.max(1, Math.min(10,
        parseFloat((mem.scores[skill] + delta).toFixed(1))
      ));
      save();
    }
  }

  // ── Profil utilisateur ──────────────────────────────────────────
  /**
   * Met à jour le profil utilisateur (collecte progressive).
   * @param {Object} updates — champs à mettre à jour
   */
  function setProfile(updates) {
    const mem = load();
    Object.assign(mem.user, updates);
    save();
  }

  function getProfile() {
    return load().user;
  }

  /**
   * Tente d'extraire des infos de profil depuis un message utilisateur.
   * Appelée automatiquement à chaque message.
   */
  function extractProfileFromMessage(text) {
    const lower = text.toLowerCase();
    const updates = {};

    // Niveau
    if (/d[ée]butant|je commence|je d[ée]bute|pas beaucoup d.exp/.test(lower))
      updates.level = 'debutant';
    else if (/interm[ée]diaire|quelques ann[ée]es|quelques mois d.exp/.test(lower))
      updates.level = 'intermediaire';
    else if (/avanc[ée]|expert|plusieurs ann[ée]es|senior/.test(lower))
      updates.level = 'avance';

    // Niche / métier
    if (/closer|closing/.test(lower))         updates.niche = 'closer indépendant';
    else if (/entrepreneur|business/.test(lower)) updates.niche = 'entrepreneur';
    else if (/commercial|vendeur/.test(lower)) updates.niche = 'commercial salarié';
    else if (/freelance|indep/.test(lower))   updates.niche = 'freelance';

    if (Object.keys(updates).length > 0) setProfile(updates);
  }

  // ── Context builder (cœur du système) ──────────────────────────
  /**
   * Construit le contexte complet pour un coach avant de générer une réponse.
   * Ce contexte est passé à generateResponse() dans coaches.js.
   *
   * @param {string} coachId
   * @returns {MemoryContext}
   */
  function getContext(coachId) {
    const mem   = load();
    const cm    = getCoachMem(coachId);
    const u     = mem.user;
    const w     = mem.weaknesses;
    const s     = mem.scores;

    // Top 3 faiblesses
    const topWeaknesses = Object.entries(w)
      .filter(([, v]) => v.count >= 2)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([k, v]) => ({ topic: k, count: v.count, notes: v.notes }));

    // Topics récents (court terme)
    const recentTopics = [...new Set(
      cm.short.filter(m => m.topic).map(m => m.topic)
    )].slice(-4);

    // Topics les plus récurrents (long terme)
    const topicFreq = {};
    cm.topics.forEach(t => { topicFreq[t.topic] = (topicFreq[t.topic] || 0) + 1; });
    const recurringTopics = Object.entries(topicFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => ({ topic: k, times: v }));

    // Scores faibles (< 5)
    const lowScores = Object.entries(s)
      .filter(([, v]) => v < 5)
      .map(([k, v]) => ({ skill: k, score: v }));

    // Derniers échanges (pour éviter la répétition immédiate)
    const lastExchanges = cm.short.slice(-4).map(m => ({
      role:  m.role,
      topic: m.topic,
      text:  m.text.slice(0, 100)
    }));

    return {
      isFirstSession:   cm.total < 2,
      totalMessages:    cm.total,
      // Profil
      userName:         u.name,
      userLevel:        u.level,
      userNiche:        u.niche,
      userGoal:         u.goal,
      userStyle:        u.style,
      // Progression
      scores:           s,
      lowScores,
      topWeaknesses,
      // Historique
      recentTopics,
      recurringTopics,
      usedAngles:       cm.used_angles,
      lastExchanges,
      // Fonctions helper
      getAvailableAngles: (topic, total) => getAvailableAngles(coachId, topic, total),
      getTopicRecurrence: (topic)        => getTopicRecurrence(coachId, topic),
      recordAngle:        (topic, idx)   => recordAngle(coachId, topic, idx)
    };
  }

  /**
   * Génère le prompt système dynamique (pour usage futur avec l'API Claude).
   * Retourne une string prête à être injectée dans le system prompt.
   *
   * @param {string} coachId
   * @param {Object} coachPersonality  — objet COACHES[coachId]
   * @returns {string}
   */
  function buildSystemPrompt(coachId, coachPersonality) {
    const ctx = getContext(coachId);
    const lines = [];

    lines.push(`Tu es ${coachPersonality.name} chez Atlas Académie.`);
    lines.push(coachPersonality.systemPrompt || '');
    lines.push('');
    lines.push('── PROFIL UTILISATEUR ──────────────────────────');

    if (ctx.userName)    lines.push(`Prénom : ${ctx.userName}`);
    if (ctx.userLevel)   lines.push(`Niveau : ${ctx.userLevel}`);
    if (ctx.userNiche)   lines.push(`Activité : ${ctx.userNiche}`);
    if (ctx.userGoal)    lines.push(`Objectif : ${ctx.userGoal}`);

    lines.push(`Sessions avec toi : ${ctx.totalMessages} messages`);

    if (ctx.lowScores.length > 0) {
      lines.push('');
      lines.push('── SCORES FAIBLES À TRAVAILLER ─────────────────');
      ctx.lowScores.forEach(s => lines.push(`• ${s.skill} : ${s.score}/10`));
    }

    if (ctx.topWeaknesses.length > 0) {
      lines.push('');
      lines.push('── FAIBLESSES RÉCURRENTES DÉTECTÉES ────────────');
      ctx.topWeaknesses.forEach(w => {
        lines.push(`• ${w.topic} (revenu ${w.times || w.count}x)`);
        if (w.notes.length > 0) lines.push(`  → ${w.notes.slice(-2).join(' / ')}`);
      });
    }

    if (ctx.recentTopics.length > 0) {
      lines.push('');
      lines.push('── SUJETS RÉCENTS (session courante) ───────────');
      lines.push(ctx.recentTopics.join(', '));
    }

    if (ctx.lastExchanges.length > 0) {
      lines.push('');
      lines.push('── DERNIERS ÉCHANGES ───────────────────────────');
      ctx.lastExchanges.forEach(e => {
        lines.push(`[${e.role.toUpperCase()}] ${e.text}`);
      });
    }

    lines.push('');
    lines.push('── RÈGLES ANTI-RÉPÉTITION OBLIGATOIRES ─────────');
    lines.push('• Ne jamais répéter mot pour mot une analyse déjà donnée.');
    lines.push('• Si un sujet revient → approfondir la CAUSE RACINE, pas la surface.');
    lines.push('• Si une objection a déjà été traitée → proposer un angle psychologique différent.');
    lines.push('• Chaque réponse doit donner l\'impression de PROGRESSION, pas de boucle.');
    lines.push('• Commence par reconnaître ce que l\'utilisateur a déjà entendu avant de donner du nouveau.');

    if (ctx.isFirstSession) {
      lines.push('');
      lines.push('── PREMIÈRE SESSION ────────────────────────────');
      lines.push('C\'est la première session de cet utilisateur. Commence par établir le contact, comprendre son contexte et son niveau avant de donner des conseils.');
    }

    return lines.join('\n');
  }

  // ── Reset / Export ──────────────────────────────────────────────
  /**
   * Réinitialise la mémoire.
   * @param {string|null} coachId — si null, reset total
   */
  function reset(coachId) {
    const mem = load();
    if (coachId) {
      mem.coaches[coachId] = defaultCoachMemory();
    } else {
      _mem = defaultMemory();
    }
    save();
  }

  /**
   * Retourne un résumé lisible de la progression pour affichage UI.
   */
  function getProgressSummary() {
    const mem  = load();
    const s    = mem.scores;
    const u    = mem.user;
    const w    = mem.weaknesses;

    const totalMsg = Object.values(mem.coaches)
      .reduce((acc, cm) => acc + (cm.total || 0), 0);

    return {
      user:      u,
      scores:    s,
      totalMessages: totalMsg,
      topWeakness: Object.entries(w)
        .sort((a, b) => b[1].count - a[1].count)[0]?.[0] || null,
      avgScore: parseFloat(
        (Object.values(s).reduce((a, b) => a + b, 0) / Object.keys(s).length).toFixed(1)
      )
    };
  }

  // ── API publique ─────────────────────────────────────────────────
  return {
    load,
    save,
    // Messages
    addMessage,
    extractProfileFromMessage,
    // Anti-répétition
    getUsedAngles,
    getAvailableAngles: (coachId, topic, total) => getAvailableAngles(coachId, topic, total),
    recordAngle,
    getTopicRecurrence,
    // Faiblesses & scores
    recordWeakness,
    updateScore,
    // Profil
    setProfile,
    getProfile,
    // Context & prompts
    getContext,
    buildSystemPrompt,
    // Outils
    reset,
    getProgressSummary
  };
})();

// Export global
window.AtlasMemory = AtlasMemory;
