/* ============================================================
   ATLAS ACADÉMIE — CHAT.JS v2.0
   Interface de chat avec intégration complète AtlasMemory

   Flux :
   1. init() → charge le coach + mémoire
   2. handleSend() → lit la mémoire, envoie le message, génère la réponse
   3. Après la réponse → enregistre dans la mémoire (angle, faiblesse, score)
   4. Panel progression → affiche les scores en temps réel

   Modes :
   - DEMO (défaut) : réponses depuis RESPONSE_BANK dans coaches.js
   - API  (si CLAUDE_API disponible) : appel Netlify Function /.netlify/functions/coach
   ============================================================ */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────
  const API_ENDPOINT = '/.netlify/functions/coach';
  const USE_API      = true; // ✅ API activée — claude-sonnet-4-6 via Netlify Function

  // ── Éléments DOM ──────────────────────────────────────────────
  const $  = id => document.getElementById(id);
  const chatMessages    = $('chatMessages');
  const chatInput       = $('chatInput');
  const sendBtn         = $('sendBtn');
  const typingIndicator = $('typingIndicator');
  const typingAvatar    = $('typingAvatar');
  const quickTopics     = $('quickTopics');
  const coachAvatar     = $('coachAvatar');
  const coachName       = $('coachName');
  const modeBadge       = $('modeBadge');
  // Modal accès (code) — conservé pour compat
  const accessModal     = $('accessModal');
  const accessCodeInput = $('accessCodeInput');
  const codeError       = $('codeError');
  const validateCodeBtn = $('validateCodeBtn');
  // Modal upgrade (nouveau)
  const upgradeModal    = $('upgradeModal');
  const upgradeCodeInput = $('upgradeCodeInput');
  const upgradeCodeBtn  = $('upgradeCodeBtn');
  const upgradeCodeError = $('upgradeCodeError');
  const upgradeClose    = $('upgradeClose');
  // Panel progression
  const progressPanel   = $('progressPanel');
  const progressToggle  = $('progressToggle');

  // ── État ──────────────────────────────────────────────────────
  let currentCoachId      = 'mentor';
  let currentCoach        = null;
  let conversationHistory = [];
  let isTyping            = false;
  let quickTopicsShown    = false;
  let memoryCtx           = null; // AtlasMemory.getContext() — rechargé à chaque message

  // ── Initialisation ────────────────────────────────────────────
  function init() {
    // Rediriger vers le quiz si aucun profil enregistré (première visite)
    const hasProfile = localStorage.getItem('atlas_user_profile');
    const skipQuiz   = new URLSearchParams(window.location.search).get('skipquiz');
    if (!hasProfile && !skipQuiz) {
      // On garde l'URL du coach pour y revenir après le quiz
      const coachParam = new URLSearchParams(window.location.search).get('coach');
      const returnUrl  = coachParam ? `chat.html?coach=${coachParam}` : 'chat.html';
      window.location.href = `quiz.html?return=${encodeURIComponent(returnUrl)}`;
      return;
    }

    currentCoachId = getCoachFromURL();
    currentCoach   = window.COACHES[currentCoachId];
    if (!currentCoach) { window.location.href = 'coaches.html'; return; }

    // Couleur CSS du coach
    document.documentElement.style.setProperty('--coach-color', currentCoach.color);

    // Header
    coachAvatar.textContent  = currentCoach.icon;
    coachAvatar.style.borderColor  = currentCoach.color;
    coachAvatar.style.background   = hexRgba(currentCoach.color, 0.12);
    coachName.textContent    = currentCoach.name;
    if (typingAvatar) typingAvatar.textContent = currentCoach.icon;

    // Badge mode Architecte
    if (currentCoachId === 'architecte' && modeBadge) {
      modeBadge.textContent = 'Mode : Mentor';
      modeBadge.className   = 'chat-mode-badge visible mode-mentor';
    }

    // Chargement mémoire
    if (window.AtlasMemory) {
      memoryCtx = window.AtlasMemory.getContext(currentCoachId);
    }

    // Message d'ouverture
    const opening = window.getOpeningMessage
      ? window.getOpeningMessage(currentCoachId, memoryCtx)
      : currentCoach.openingMessages[0];
    setTimeout(() => addCoachMessage(opening), 350);

    // Quick topics
    setTimeout(renderQuickTopics, 1100);

    // Panel progression
    renderProgressPanel();

    // Events
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    chatInput.addEventListener('input', function () { autoResize(this); });

    if (validateCodeBtn) validateCodeBtn.addEventListener('click', handleValidateCode);
    if (accessCodeInput) {
      accessCodeInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleValidateCode();
      });
      accessCodeInput.addEventListener('input', () => {
        codeError.textContent = '';
        accessCodeInput.classList.remove('error');
      });
    }

    if (progressToggle)   progressToggle.addEventListener('click', toggleProgressPanel);

    // ── Upgrade modal ──────────────────────────────────────────
    if (upgradeClose)   upgradeClose.addEventListener('click', hideUpgradeModal);
    if (upgradeCodeBtn) upgradeCodeBtn.addEventListener('click', handleUpgradeCode);
    if (upgradeCodeInput) {
      upgradeCodeInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleUpgradeCode();
      });
    }
    if (upgradeModal) {
      upgradeModal.addEventListener('click', e => {
        if (e.target === upgradeModal) hideUpgradeModal();
      });
    }

    // Afficher le badge usage initial
    renderUsageBadge();
  }

  // ── URL param ─────────────────────────────────────────────────
  function getCoachFromURL() {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('coach');
    return (id && window.COACHES && window.COACHES[id]) ? id : 'mentor';
  }

  // ── Envoi du message ──────────────────────────────────────────
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text || isTyping) return;

    // ── Vérification accès (AtlasUsage = source de vérité) ─────
    if (window.AtlasUsage) {
      const access = window.AtlasUsage.checkAccess();
      if (!access.allowed) {
        showUpgradeModal(access.reason);
        return;
      }
    } else {
      // Fallback : ancien système coaches.js
      if (!window.checkAccess || !window.checkAccess()) {
        showAccessModal(); return;
      }
    }

    // Extraction profil depuis le message (silencieuse)
    if (window.AtlasMemory) window.AtlasMemory.extractProfileFromMessage(text);

    // Détection intent et faiblesse
    const intent = window.detectIntent ? window.detectIntent(text) : 'default';
    if (window.AtlasMemory && intent !== 'default') {
      window.AtlasMemory.recordWeakness(intent, text.slice(0, 80));
    }

    // Enregistre le message utilisateur en mémoire court terme
    if (window.AtlasMemory) window.AtlasMemory.addMessage(currentCoachId, 'user', text, intent);

    // UI : message utilisateur
    addUserMessage(text);
    chatInput.value = '';
    autoResize(chatInput);
    hideQuickTopics();

    // Historique de conversation (pour API future)
    conversationHistory.push({ role: 'user', content: text });

    showTyping();
    sendBtn.disabled = true;

    const delay = 750 + Math.random() * 1100;

    if (USE_API) {
      callAPI(text, intent);
    } else {
      setTimeout(() => {
        // Recharger le contexte mémoire juste avant la réponse
        if (window.AtlasMemory) {
          memoryCtx = window.AtlasMemory.getContext(currentCoachId);
        }
        const response = window.generateResponse(currentCoachId, text, conversationHistory, memoryCtx);
        deliverResponse(response, intent);
      }, delay);
    }
  }

  // ── Appel API Netlify Function (mode PROD) ────────────────────
  async function callAPI(userMessage, intent) {
    try {
      const ctx = window.AtlasMemory ? window.AtlasMemory.getContext(currentCoachId) : {};

      // Headers d'authentification (Phase 2 — Supabase)
      const apiHeaders = { 'Content-Type': 'application/json' };
      if (window.AtlasAuth) {
        const authH = window.AtlasAuth.getAuthHeaders();
        Object.assign(apiHeaders, authH);
      }

      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({
          message:     userMessage,
          coachId:     currentCoachId,
          userId:      (window.AtlasAuth && window.AtlasAuth.getUser()?.id) || 'anonymous',
          plan:        (window.AtlasUsage && window.AtlasUsage.getState)
                         ? (window.AtlasUsage.getState().plan || 'free')
                         : 'free',
          memoryContext: {
            ...ctx,
            usedAngles:       undefined, // fonctions non sérialisables
            getAvailableAngles: undefined,
            getTopicRecurrence: undefined,
            recordAngle:       undefined
          },
          conversationHistory: conversationHistory.slice(-8)
        })
      });
      const data = await res.json();
      deliverResponse(data.response, intent);
      // Enregistrement résumé depuis l'API
      if (data.summary && window.AtlasMemory) {
        // Mise à jour scores si fournis
        if (data.summary.score_updates) {
          Object.entries(data.summary.score_updates).forEach(([skill, delta]) => {
            window.AtlasMemory.updateScore(skill, delta);
          });
        }
      }
    } catch (err) {
      console.error('[chat.js] API error:', err);
      // Fallback demo
      const response = window.generateResponse(currentCoachId, userMessage, conversationHistory, memoryCtx);
      deliverResponse(response, intent);
    }
  }

  // ── Livraison de la réponse ───────────────────────────────────
  function deliverResponse(response, intent) {
    hideTyping();
    sendBtn.disabled = false;

    // Mode badge Architecte
    if (currentCoachId === 'architecte' && modeBadge) {
      const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
      updateModeBadge(window.detectArchitecteMode ? window.detectArchitecteMode(lastUserMsg) : 'mentor');
    }

    // Affichage de la réponse
    addCoachMessage(response);
    conversationHistory.push({ role: 'assistant', content: response });

    // Enregistrement en mémoire
    if (window.AtlasMemory) {
      window.AtlasMemory.addMessage(currentCoachId, 'coach', response, intent);
      // Amélioration de score progressive (faible mais réelle)
      const scoreMap = {
        objection:   'objections',
        closing:     'closing',
        prospection: 'discovery',
        negociation: 'persuasion',
        motivation:  'mindset',
        disc:        'disc'
      };
      if (scoreMap[intent]) {
        window.AtlasMemory.updateScore(scoreMap[intent], 0.2);
      }
      window.AtlasMemory.updateScore('confidence', 0.1);
    }

    // ── Consommation usage (après réponse réussie) ─────────────
    if (window.AtlasUsage) {
      const result = window.AtlasUsage.consumeMessage(currentCoachId);
      if (result.success) {
        renderUsageBadge();
        // Alerte si proche de la limite
        if (result.remaining !== -1 && result.remaining <= 2 && result.remaining > 0) {
          setTimeout(() => addSystemMessage(
            `⚠️ Il te reste **${result.remaining} message${result.remaining > 1 ? 's' : ''}**. `
            + `<a href="#" onclick="document.getElementById('upgradeModal').classList.add('visible');return false;" style="color:var(--gold);">Passe en PRO pour continuer →</a>`
          ), 300);
        }
      }
    }

    // ── XP Gamification ────────────────────────────────────────
    if (window.AtlasGamification) {
      AtlasGamification.addXP(5, 'chat', { coachId: currentCoachId });
    }

    // ── Challenges hebdomadaires ────────────────────────────────
    if (window.AtlasChallenges) {
      AtlasChallenges.addProgress('messages', 1, { coachId: currentCoachId });
    }

    // Mise à jour du panel progression
    renderProgressPanel();

    // Suggestion de changement de coach après 10 échanges
    if (conversationHistory.length === 10) {
      setTimeout(addProgressMilestone, 700);
    }
  }

  // ── Messages UI ───────────────────────────────────────────────
  function addCoachMessage(text) {
    chatMessages.appendChild(makeBubble('coach', text, currentCoach.icon, currentCoach.color));
    scrollBottom();
  }

  function addUserMessage(text) {
    chatMessages.appendChild(makeBubble('user', text, 'Toi', null));
    scrollBottom();
  }

  function makeBubble(type, text, avatarContent, color) {
    const wrap = document.createElement('div');
    wrap.className = `chat-bubble ${type}`;

    const av = document.createElement('div');
    av.className   = 'bubble-avatar';
    av.textContent = avatarContent;
    if (type === 'coach' && color) {
      av.style.borderColor = color;
      av.style.background  = hexRgba(color, 0.1);
    }

    const content = document.createElement('div');
    content.className = 'bubble-content';

    const txt = document.createElement('div');
    txt.className   = 'bubble-text';
    txt.innerHTML   = formatText(text);

    const time = document.createElement('div');
    time.className   = 'bubble-time';
    time.textContent = getTime();

    content.appendChild(txt);
    content.appendChild(time);
    wrap.appendChild(av);
    wrap.appendChild(content);
    return wrap;
  }

  // ── Message système (info / alerte) ──────────────────────────
  function addSystemMessage(html) {
    const d = document.createElement('div');
    d.style.cssText = 'text-align:center;padding:.5rem 1rem 0;';
    d.innerHTML = `<p style="color:var(--gray);font-size:.76rem;font-family:var(--font-sub);background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:.4rem .8rem;display:inline-block;">${html}</p>`;
    chatMessages.appendChild(d);
    scrollBottom();
  }

  function addProgressMilestone() {
    const d = document.createElement('div');
    d.style.cssText = 'text-align:center;padding:.75rem 1rem 0;';
    d.innerHTML = `
      <p style="color:var(--gray);font-size:.78rem;font-family:var(--font-sub);margin-bottom:.5rem;">
        ✦ Belle session. Veux-tu continuer ou changer de coach ?
      </p>
      <a href="coaches.html" style="font-size:.75rem;color:var(--gold);border:1px solid rgba(201,168,76,0.3);padding:.25rem .75rem;border-radius:50px;font-family:var(--font-sub);">Changer de coach →</a>`;
    chatMessages.appendChild(d);
    scrollBottom();
  }

  function formatText(raw) {
    return raw
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  }

  // ── Typing indicator ──────────────────────────────────────────
  function showTyping() {
    isTyping = true;
    if (typingIndicator) typingIndicator.classList.add('visible');
    scrollBottom();
  }
  function hideTyping() {
    isTyping = false;
    if (typingIndicator) typingIndicator.classList.remove('visible');
  }

  // ── Quick topics ──────────────────────────────────────────────
  function renderQuickTopics() {
    if (quickTopicsShown || !quickTopics) return;
    const topics = (window.QUICK_TOPICS || {})[currentCoachId] || [];
    if (!topics.length) return;
    quickTopicsShown = true;
    quickTopics.innerHTML = '';

    const label = document.createElement('span');
    label.style.cssText = 'font-size:.7rem;color:var(--gray);font-family:var(--font-sub);white-space:nowrap;align-self:center;';
    label.textContent = 'Sujets rapides :';
    quickTopics.appendChild(label);

    topics.forEach(t => {
      const btn = document.createElement('button');
      btn.className   = 'quick-topic-btn';
      btn.textContent = t.label;
      btn.style.setProperty('--coach-color', currentCoach.color);
      btn.addEventListener('click', () => {
        chatInput.value = t.message;
        hideQuickTopics();
        handleSend();
      });
      quickTopics.appendChild(btn);
    });
  }

  function hideQuickTopics() {
    if (quickTopics) quickTopics.style.display = 'none';
  }

  // ── Mode badge Architecte ─────────────────────────────────────
  function updateModeBadge(mode) {
    if (!modeBadge) return;
    modeBadge.className = `chat-mode-badge visible mode-${mode}`;
    modeBadge.textContent = { mentor: 'Mode : Mentor', stratege: 'Mode : Stratège', pression: 'Mode : Pression 🔥' }[mode] || 'Mode : Mentor';
  }

  // ── Panel progression ─────────────────────────────────────────
  function renderProgressPanel() {
    if (!progressPanel || !window.AtlasMemory) return;
    const summary = window.AtlasMemory.getProgressSummary();
    const s = summary.scores;

    const skills = [
      { key: 'closing',    label: 'Closing',    icon: '🎯' },
      { key: 'objections', label: 'Objections', icon: '🛡️' },
      { key: 'mindset',    label: 'Mindset',    icon: '💪' },
      { key: 'persuasion', label: 'Persuasion', icon: '🗣️' },
      { key: 'confidence', label: 'Confiance',  icon: '⚡' },
      { key: 'disc',       label: 'DISC',       icon: '🧠' }
    ];

    // Bloc usage (si AtlasUsage disponible)
    const usage = window.AtlasUsage ? window.AtlasUsage.getUsageSummary() : null;
    const usageBlock = usage ? (() => {
      const uColor = usage.isDanger ? '#C94C4C' : usage.isWarning ? '#E07F2F' : '#4CAF50';
      const uPct   = usage.messagesLimit > 0
        ? Math.min(100, (usage.messagesUsed / usage.messagesLimit) * 100)
        : 0;
      return `
        <div style="padding:.65rem 1rem;border-bottom:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem;">
            <span style="font-size:.68rem;color:var(--gray);font-family:var(--font-title);letter-spacing:.08em;text-transform:uppercase;">
              ${usage.planIcon} Plan ${usage.planLabel}
            </span>
            <span style="font-size:.68rem;font-family:var(--font-title);color:${uColor};">
              ${usage.remaining === -1 ? '∞ illimité' : usage.remainingLabel}
            </span>
          </div>
          ${usage.messagesLimit > 0 && usage.messagesLimit !== -1 ? `
          <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:${uPct}%;background:${uColor};border-radius:2px;transition:width 0.4s;"></div>
          </div>
          <div style="font-size:.65rem;color:rgba(160,168,184,0.5);margin-top:.2rem;">${usage.messagesUsed}/${usage.messagesLimit} messages</div>
          ` : ''}
          ${usage.plan === 'credits' ? `<div style="font-size:.68rem;color:var(--gray);">💣 ${usage.creditsRemaining} crédit${usage.creditsRemaining > 1 ? 's' : ''} restant${usage.creditsRemaining > 1 ? 's' : ''}</div>` : ''}
          ${!usage.allowed || usage.isWarning ? `
          <button onclick="document.getElementById('upgradeModal').classList.add('visible')"
            style="margin-top:.4rem;width:100%;padding:.3rem;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.25);color:var(--gold);font-size:.65rem;font-family:var(--font-title);letter-spacing:.08em;border-radius:5px;cursor:pointer;">
            ⚡ ${usage.allowed ? 'Passer en PRO' : 'Débloquer l\'accès'} →
          </button>` : ''}
        </div>`;
    })() : '';

    progressPanel.innerHTML = `
      <div style="padding:.75rem 1rem;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="font-family:var(--font-title);font-size:.65rem;letter-spacing:.15em;color:var(--gold);text-transform:uppercase;margin-bottom:.25rem;">
          Ta progression
        </div>
        <div style="font-size:.75rem;color:var(--gray);">${summary.totalMessages} messages · Score moyen : ${summary.avgScore}/10</div>
      </div>
      ${usageBlock}
      <div style="padding:.75rem 1rem;display:flex;flex-direction:column;gap:.6rem;">
        ${skills.map(sk => `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem;">
              <span style="font-size:.75rem;color:var(--off-white);">${sk.icon} ${sk.label}</span>
              <span style="font-size:.7rem;font-family:var(--font-title);color:${scoreColor(s[sk.key])};">${s[sk.key].toFixed(1)}/10</span>
            </div>
            <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">
              <div style="height:100%;width:${s[sk.key]*10}%;background:${scoreColor(s[sk.key])};border-radius:2px;transition:width 0.4s ease;"></div>
            </div>
          </div>
        `).join('')}
      </div>
      ${summary.topWeakness ? `
      <div style="padding:.5rem 1rem;border-top:1px solid rgba(255,255,255,0.05);">
        <div style="font-size:.72rem;color:var(--gray);">Point prioritaire : <strong style="color:var(--gold);">${summary.topWeakness}</strong></div>
      </div>` : ''}
      <div style="padding:.5rem 1rem;border-top:1px solid rgba(255,255,255,0.05);">
        <button onclick="if(window.AtlasMemory){window.AtlasMemory.reset();}if(window.AtlasUsage){window.AtlasUsage.reset();}window.location.reload();"
          style="font-size:.7rem;color:rgba(160,168,184,0.4);background:none;border:none;cursor:pointer;font-family:var(--font-sub);">
          Réinitialiser la progression
        </button>
      </div>
    `;
  }

  function scoreColor(v) {
    if (v >= 7.5) return '#4CAF50';
    if (v >= 5)   return '#C9A84C';
    return '#E53935';
  }

  function toggleProgressPanel() {
    if (!progressPanel) return;
    const overlay = document.getElementById('progressOverlay');
    const isOpen  = progressPanel.classList.contains('open');
    progressPanel.classList.toggle('open', !isOpen);
    if (overlay) overlay.classList.toggle('active', !isOpen);
  }

  function closeProgressPanel() {
    if (!progressPanel) return;
    progressPanel.classList.remove('open');
    const overlay = document.getElementById('progressOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ── Upgrade modal (nouveau système) ─────────────────────────
  function showUpgradeModal(reason) {
    if (!upgradeModal) return;

    // Adapter le titre et le message selon la raison
    const titleEl   = document.getElementById('upgradeTitle');
    const messageEl = document.getElementById('upgradeMessage');
    const reasonEl  = document.getElementById('upgradeReason');

    const reasons = {
      free_limit:           { title: 'Tes 5 messages gratuits sont épuisés',   msg: 'Pour continuer à t\'entraîner avec tes coachs IA, passe en PRO ou achète un pack crédits.' },
      monthly_limit:        { title: 'Limite mensuelle atteinte',              msg: 'Tu as utilisé tous tes messages ce mois-ci. Attends le renouvellement ou achète des crédits supplémentaires.' },
      no_credits:           { title: 'Plus de crédits disponibles',            msg: 'Tes crédits sont épuisés. Recharge pour continuer.' },
      subscription_expired: { title: 'Abonnement expiré',                      msg: 'Ton accès PRO a expiré. Renouvelle pour retrouver l\'accès illimité.' }
    };

    const r = reasons[reason] || reasons.free_limit;
    if (titleEl)   titleEl.textContent   = r.title;
    if (messageEl) messageEl.textContent = r.msg;

    upgradeModal.classList.add('visible');
    setTimeout(() => upgradeCodeInput && upgradeCodeInput.focus(), 350);
  }

  function hideUpgradeModal() {
    if (upgradeModal) upgradeModal.classList.remove('visible');
  }

  function handleUpgradeCode() {
    const code = upgradeCodeInput ? upgradeCodeInput.value.trim().toUpperCase() : '';
    if (!code) return;

    // Tenter avec AtlasUsage en premier
    if (window.AtlasUsage) {
      const result = window.AtlasUsage.activateCode(code);
      if (result.success) {
        hideUpgradeModal();
        renderUsageBadge();
        renderProgressPanel();
        setTimeout(() => addCoachMessage(
          `✅ ${result.message} La session est maintenant active — continue !`
        ), 250);
        return;
      }
    }

    // Fallback vers ancien système
    if (window.validateCode && window.validateCode(code)) {
      // Activer en mode pro (fallback)
      if (window.AtlasUsage) window.AtlasUsage.activateCode(code);
      hideUpgradeModal();
      setTimeout(() => addCoachMessage('✅ Accès validé. Continue la session.'), 250);
      return;
    }

    // Code invalide
    if (upgradeCodeInput) {
      upgradeCodeInput.classList.add('error');
      setTimeout(() => upgradeCodeInput.classList.remove('error'), 600);
    }
    if (upgradeCodeError) upgradeCodeError.textContent = 'Code invalide. Vérifie ton email de confirmation.';
  }

  // ── Badge usage (messages restants / crédits) ────────────────
  function renderUsageBadge() {
    if (!window.AtlasUsage) return;

    const summary = window.AtlasUsage.getUsageSummary();
    const badge   = document.getElementById('usageBadge');
    if (!badge) return;

    let color = 'rgba(201,168,76,0.8)';
    if (summary.isDanger)  color = '#C94C4C';
    if (summary.isWarning) color = '#E07F2F';
    if (summary.plan === 'unlimited' || summary.plan === 'pro') color = '#4CAF50';

    badge.textContent  = summary.remainingLabel || summary.planLabel;
    badge.style.color  = color;
    badge.style.borderColor = color.replace('0.8)', '0.3)');
    badge.title = `Plan : ${summary.planLabel} · ${summary.messagesUsed} msgs utilisés · Coût estimé : ${(summary.totalCostEur || 0).toFixed(3)} €`;
  }

  // ── Access modal (ancien système conservé) ───────────────────
  function showAccessModal() {
    if (accessModal) {
      accessModal.classList.add('visible');
      setTimeout(() => accessCodeInput && accessCodeInput.focus(), 300);
    }
  }

  function handleValidateCode() {
    const code = accessCodeInput ? accessCodeInput.value.trim().toUpperCase() : '';
    if (!code) return;
    // Tenter AtlasUsage en priorité
    if (window.AtlasUsage) {
      const result = window.AtlasUsage.activateCode(code);
      if (result.success) {
        if (accessModal) accessModal.classList.remove('visible');
        renderUsageBadge();
        setTimeout(() => addCoachMessage(`✅ ${result.message} Continue la session !`), 250);
        return;
      }
    }
    // Fallback ancien système
    if (window.validateCode && window.validateCode(code)) {
      if (accessModal) accessModal.classList.remove('visible');
      setTimeout(() => addCoachMessage('✅ Accès validé. La session est maintenant illimitée — on continue.'), 250);
    } else {
      if (accessCodeInput) {
        accessCodeInput.classList.add('error');
        setTimeout(() => accessCodeInput.classList.remove('error'), 600);
      }
      if (codeError) codeError.textContent = 'Code invalide. Vérifie ton email de confirmation de formation.';
    }
  }

  // ── Utilitaires ───────────────────────────────────────────────
  function scrollBottom() {
    setTimeout(() => { chatMessages.scrollTop = chatMessages.scrollHeight; }, 50);
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  }

  function getTime() {
    const n = new Date();
    return String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  }

  function hexRgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // ── Boot ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
