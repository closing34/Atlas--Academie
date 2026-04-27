/* ============================================================
   ATLAS ACADÉMIE — USAGE.JS v1.0
   Gestionnaire de consommation, crédits & monétisation

   Phase 1 : localStorage (préparé pour Supabase Phase 2)

   Plans disponibles :
   ─ free      : 5 messages offerts (acquisition)
   ─ pro       : abonnement 19,99 €/mois, 600 msgs/mois
   ─ unlimited : abonnement 29,99 €/mois, illimité
   ─ credits   : 100=5€ / 250=10€ / 500=18€
   ─ test      : accès test 20 messages
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'atlas_usage_v1';
  const LOG_KEY     = 'atlas_usage_logs_v1';
  const MAX_LOGS    = 100;

  // ── Configuration des plans ──────────────────────────────────
  const PLAN_CONFIG = {
    free:      { label: 'Gratuit',   icon: '🔓', limit: 5,   type: 'total',   monthly: false },
    pro:       { label: 'PRO',       icon: '💰', limit: 600, type: 'monthly', monthly: true  },
    unlimited: { label: 'Illimité',  icon: '♾️',  limit: -1,  type: 'none',    monthly: true  },
    credits:   { label: 'Crédits',   icon: '💣', limit: 0,   type: 'credits', monthly: false },
    test:      { label: 'Test',      icon: '🧪', limit: 20,  type: 'total',   monthly: false }
  };

  // ── Codes → plans (validation client superficielle)
  // La validation RÉELLE est server-side via Supabase (Phase 2)
  const CODE_PLANS = {
    'ATLAS2026':    { plan: 'pro',       limit: 600, credits: 0    },
    'CREATOR':      { plan: 'pro',       limit: 600, credits: 0    },
    'SAINT-THOMAS': { plan: 'unlimited', limit: -1,  credits: 0    },
    'TEST':         { plan: 'test',      limit: 20,  credits: 0    }
    // Codes crédits futurs : 'CREDITS100' → { plan:'credits', credits:100 }
  };

  // ── Coût estimatif IA ────────────────────────────────────────
  // claude-sonnet-4-6 : ~0,003$/1K tokens input, 0,015$/1K output
  // Échange moyen ≈ 600 tokens input + 400 tokens output ≈ 0,008 €
  const COST_PER_MESSAGE_EUR = 0.008;

  // ── Schéma par défaut ─────────────────────────────────────────
  function defaultState() {
    return {
      plan:              'free',
      messagesUsed:      0,
      messagesLimit:     5,
      creditsRemaining:  0,
      creditsUsed:       0,
      periodStart:       todayISO(),
      periodEnd:         null,
      activatedCode:     null,
      totalCostEstimate: 0,
      createdAt:         nowISO(),
      updatedAt:         nowISO()
    };
  }

  // ── Helpers ───────────────────────────────────────────────────
  function todayISO() { return new Date().toISOString().split('T')[0]; }
  function nowISO()   { return new Date().toISOString(); }

  function addMonths(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setMonth(d.getMonth() + n);
    return d.toISOString().split('T')[0];
  }

  function isExpired(dateStr) {
    if (!dateStr) return false;
    return new Date(dateStr + 'T23:59:59') < new Date();
  }

  // ── Persistence ───────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch { return defaultState(); }
  }

  function save(data) {
    data.updatedAt = nowISO();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    return data;
  }

  // ── Reset mensuel (plan PRO) ─────────────────────────────────
  function checkMonthlyReset(state) {
    if (!PLAN_CONFIG[state.plan]?.monthly) return state;
    if (!state.periodEnd || !isExpired(state.periodEnd)) return state;
    // Nouvelle période
    state.messagesUsed = 0;
    state.periodStart  = todayISO();
    state.periodEnd    = addMonths(todayISO(), 1);
    return save(state);
  }

  // ── Vérification d'accès (SEULE SOURCE DE VÉRITÉ) ───────────
  function checkAccess() {
    let state = load();
    state = checkMonthlyReset(state);

    // Abonnement PRO expiré → rétrograder
    if (state.plan === 'pro' && state.periodEnd && isExpired(state.periodEnd)) {
      state.plan         = 'free';
      state.messagesUsed = 0;
      state.messagesLimit = 5;
      save(state);
      return _denied('subscription_expired', 'free', 0,
        'Abonnement expiré — repasse en PRO pour continuer');
    }

    // Illimité
    const cfg = PLAN_CONFIG[state.plan] || PLAN_CONFIG.free;
    if (cfg.limit === -1) {
      return { allowed: true, reason: 'unlimited', plan: state.plan,
               remaining: -1, label: 'Illimité' };
    }

    // Crédits
    if (state.plan === 'credits') {
      if (state.creditsRemaining <= 0) {
        return _denied('no_credits', 'credits', 0, 'Plus de crédits disponibles');
      }
      const r = state.creditsRemaining;
      return { allowed: true, reason: 'credits_ok', plan: 'credits',
               remaining: r, label: `${r} crédit${r > 1 ? 's' : ''}` };
    }

    // Messages limités (free / pro / test)
    const limit     = state.messagesLimit || cfg.limit;
    const used      = state.messagesUsed  || 0;
    const remaining = Math.max(0, limit - used);

    if (used >= limit) {
      const reason = state.plan === 'free' ? 'free_limit' : 'monthly_limit';
      return _denied(reason, state.plan, 0,
        state.plan === 'free'
          ? `Tes ${limit} messages gratuits sont épuisés`
          : `Limite mensuelle atteinte (${limit} msgs)`);
    }

    return {
      allowed:   true,
      reason:    'ok',
      plan:      state.plan,
      remaining: remaining,
      label:     remaining === 1
        ? '1 message restant'
        : `${remaining} messages restants`
    };
  }

  function _denied(reason, plan, remaining, label) {
    return { allowed: false, reason, plan, remaining, label };
  }

  // ── Consommation d'un message ────────────────────────────────
  function consumeMessage(coachId, inputTokens, outputTokens) {
    const access = checkAccess();
    if (!access.allowed) return { success: false, reason: access.reason };

    let state = load();
    state     = checkMonthlyReset(state);

    // Estimation coût
    const costEur = inputTokens && outputTokens
      ? (inputTokens / 1000) * 0.003 + (outputTokens / 1000) * 0.015
      : COST_PER_MESSAGE_EUR;

    // Incrémenter messages
    state.messagesUsed      = (state.messagesUsed || 0) + 1;
    state.totalCostEstimate = parseFloat(
      ((state.totalCostEstimate || 0) + costEur).toFixed(4)
    );

    // Décrémenter crédits si applicable
    if (state.plan === 'credits') {
      state.creditsRemaining = Math.max(0, (state.creditsRemaining || 0) - 1);
      state.creditsUsed      = (state.creditsUsed || 0) + 1;
    }

    save(state);

    // Log usage
    _appendLog({
      coachId,
      plan:         state.plan,
      messagesUsed: state.messagesUsed,
      costEstimate: parseFloat(costEur.toFixed(4)),
      ts:           nowISO()
    });

    const newAccess = checkAccess();
    return {
      success:   true,
      remaining: newAccess.remaining,
      label:     newAccess.label,
      totalCost: state.totalCostEstimate
    };
  }

  // ── Activation d'un code ─────────────────────────────────────
  function activateCode(code) {
    const key      = (code || '').trim().toUpperCase();
    const codePlan = CODE_PLANS[key];

    if (!codePlan) {
      return { success: false, message: 'Code invalide. Vérifie ton email de confirmation.' };
    }

    let state     = load();
    const oldPlan = state.plan;

    state.plan          = codePlan.plan;
    state.messagesUsed  = 0;
    state.activatedCode = key;

    switch (codePlan.plan) {
      case 'pro':
        state.messagesLimit = codePlan.limit;
        state.periodStart   = todayISO();
        state.periodEnd     = addMonths(todayISO(), 1);
        break;
      case 'unlimited':
        state.messagesLimit = -1;
        state.periodEnd     = addMonths(todayISO(), 24);
        break;
      case 'test':
        state.messagesLimit = codePlan.limit;
        state.periodEnd     = addMonths(todayISO(), 1);
        break;
      case 'credits':
        state.creditsRemaining = (state.creditsRemaining || 0) + (codePlan.credits || 0);
        break;
    }

    // Bonus crédits éventuels sur un code pro
    if (codePlan.credits && codePlan.credits > 0 && codePlan.plan !== 'credits') {
      state.creditsRemaining = (state.creditsRemaining || 0) + codePlan.credits;
    }

    save(state);

    const cfg   = PLAN_CONFIG[codePlan.plan];
    const limit = codePlan.limit > 0
      ? `${codePlan.limit} messages/mois`
      : codePlan.limit === -1 ? 'illimité' : '';

    return {
      success: true,
      plan:    codePlan.plan,
      upgrade: oldPlan === 'free' && codePlan.plan !== 'free',
      message: `✅ Accès ${cfg.label} activé${limit ? ' · ' + limit : ''}.`
    };
  }

  // ── Ajout de crédits (paiement confirmé) ─────────────────────
  function addCredits(amount) {
    let state          = load();
    state.plan         = 'credits';
    state.creditsRemaining = (state.creditsRemaining || 0) + parseInt(amount, 10);
    save(state);
    return { remaining: state.creditsRemaining };
  }

  // ── Résumé pour l'UI ─────────────────────────────────────────
  function getUsageSummary() {
    let state = load();
    state     = checkMonthlyReset(state);
    const cfg = PLAN_CONFIG[state.plan] || PLAN_CONFIG.free;
    const acc = checkAccess();

    const limit       = state.messagesLimit || cfg.limit;
    const percentUsed = limit > 0 ? Math.min(100, ((state.messagesUsed || 0) / limit) * 100) : 0;

    return {
      plan:             state.plan,
      planLabel:        cfg.label,
      planIcon:         cfg.icon,
      messagesUsed:     state.messagesUsed  || 0,
      messagesLimit:    limit,
      percentUsed:      Math.round(percentUsed),
      creditsRemaining: state.creditsRemaining || 0,
      creditsUsed:      state.creditsUsed || 0,
      totalCostEur:     state.totalCostEstimate || 0,
      periodEnd:        state.periodEnd,
      allowed:          acc.allowed,
      remaining:        acc.remaining,
      remainingLabel:   acc.label,
      reason:           acc.reason,
      isWarning:        acc.allowed && acc.remaining !== -1 && acc.remaining <= 3,
      isDanger:         !acc.allowed
    };
  }

  // ── Logs (FIFO, 100 max) ─────────────────────────────────────
  function _appendLog(entry) {
    try {
      const raw  = localStorage.getItem(LOG_KEY);
      const logs = raw ? JSON.parse(raw) : [];
      logs.push(entry);
      if (logs.length > MAX_LOGS) logs.splice(0, logs.length - MAX_LOGS);
      localStorage.setItem(LOG_KEY, JSON.stringify(logs));
    } catch {}
  }

  function getLogs() {
    try {
      const raw = localStorage.getItem(LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  // ── Export public ─────────────────────────────────────────────
  window.AtlasUsage = {
    checkAccess,
    consumeMessage,
    activateCode,
    addCredits,
    getUsageSummary,
    getLogs,
    reset: function () {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LOG_KEY);
    },
    PLAN_CONFIG,
    CODE_PLANS
  };

})();
