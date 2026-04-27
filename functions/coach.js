/* ============================================================
   ATLAS ACADÉMIE — NETLIFY FUNCTION : coach.js
   Backend serverless pour les coachs IA

   DÉPLOIEMENT :
   1. Ajouter la variable d'environnement dans Netlify :
      CLAUDE_API_KEY = sk-ant-...
   2. Déployer le site — la fonction est détectée automatiquement.
   3. Dans chat.js, passer USE_API = true

   ENTRÉE (POST JSON) :
   {
     message: string,
     coachId: 'stratege' | 'mentor' | 'architecte' | 'profileur',
     memoryContext: {
       userLevel, userNiche, userGoal,
       topWeaknesses, lowScores, recentTopics,
       recurringTopics, lastExchanges, totalMessages
     },
     conversationHistory: [{ role, content }]
   }

   SORTIE :
   {
     response: string,
     summary: {
       topic, intent, angle_used,
       diagnosis_given, advice_given, script_given, action_given,
       score_updates: { [skill]: delta }
     }
   }
   ============================================================ */

// Aucune dépendance npm — fetch natif Node 18+

// ── Personnalités complètes des coaches ──────────────────────────
const COACH_PERSONAS = {
  stratege: {
    name: 'Le Stratège',
    core: `Tu es Le Stratège, coach IA d'élite chez Atlas Académie.
Ton style : analytique, froid, précis. Tu décortiques chaque situation avec rigueur.
Tu donnes TOUJOURS : (1) un diagnostic précis, (2) un script mot à mot, (3) une action immédiate.
Tu n'as aucune tolérance pour les approximations ou les excuses.
Tu n'encourages jamais de pratiques trompeuses, illégales ou manipulatrices.`
  },
  mentor: {
    name: 'Le Mentor',
    core: `Tu es Le Mentor, coach pédagogique d'Atlas Académie.
Ton style : bienveillant, structuré, progressif. Tu expliques le "pourquoi" avant le "comment".
Tu adaptes ton niveau à l'utilisateur — plus simple pour les débutants.
Tu corriges avec douceur mais clarté. Tu construis des bases solides.`
  },
  architecte: {
    name: "L'Architecte du Pouvoir",
    core: `Tu es l'Architecte du Pouvoir, coach élite d'Atlas Académie.
Tu travailles le mindset, la discipline, la puissance personnelle, la performance.
Tu es intense mais éthique. Tu refuses absolument : manipulation toxique, illégalité, violence, autodestruction.
Tu t'adaptes : pédagogique pour construire, stratégique pour analyser, haute pression pour briser les excuses.
Chaque réponse doit pousser à l'action et à la responsabilité totale.`
  },
  profileur: {
    name: 'Le Profileur DISC',
    core: `Tu es Le Profileur DISC, spécialiste en psychologie comportementale chez Atlas Académie.
Les 4 profils : D (Dominant - décideur direct), I (Influent - émotionnel social), S (Stable - loyal prudent), C (Consciencieux - analytique rigoureux).
Tu relies toujours la théorie DISC à des situations de vente concrètes.
Tu proposes des scripts adaptés à chaque profil, des simulations, des analyses de prospect.`
  }
};

// ── Construction du prompt système dynamique ─────────────────────
function buildSystemPrompt(coachId, memCtx) {
  const persona = COACH_PERSONAS[coachId] || COACH_PERSONAS.mentor;
  const lines   = [];

  lines.push(persona.core);
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('PROFIL UTILISATEUR');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (memCtx.userName)     lines.push(`Prénom : ${memCtx.userName}`);
  if (memCtx.userLevel)    lines.push(`Niveau : ${memCtx.userLevel}`);
  if (memCtx.userNiche)    lines.push(`Activité : ${memCtx.userNiche}`);
  if (memCtx.userGoal)     lines.push(`Objectif : ${memCtx.userGoal}`);
  lines.push(`Sessions totales : ${memCtx.totalMessages || 0} messages`);

  if (memCtx.isFirstSession) {
    lines.push('');
    lines.push('⚡ PREMIÈRE SESSION — Accueille chaleureusement. Commence par comprendre le contexte avant de donner des conseils.');
  }

  if (memCtx.lowScores && memCtx.lowScores.length > 0) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('SCORES FAIBLES À PRIORISER');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    memCtx.lowScores.forEach(s => {
      lines.push(`• ${s.skill} : ${s.score}/10 → Insister sur ce point dans ta réponse`);
    });
  }

  if (memCtx.topWeaknesses && memCtx.topWeaknesses.length > 0) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('FAIBLESSES RÉCURRENTES DÉTECTÉES');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    memCtx.topWeaknesses.forEach(w => {
      lines.push(`• ${w.topic} (revenu ${w.count} fois)`);
      if (w.notes && w.notes.length > 0) {
        lines.push(`  Contexte : ${w.notes.slice(-2).join(' / ')}`);
      }
    });
    lines.push('→ Si ces sujets reviennent, va PLUS EN PROFONDEUR dans la cause racine. Ne répète pas les mêmes analyses.');
  }

  if (memCtx.recurringTopics && memCtx.recurringTopics.length > 0) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('SUJETS LES PLUS TRAVAILLÉS (historique long terme)');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    memCtx.recurringTopics.forEach(t => {
      lines.push(`• ${t.topic} — traité ${t.times} fois`);
    });
  }

  if (memCtx.recentTopics && memCtx.recentTopics.length > 0) {
    lines.push('');
    lines.push(`Sujets récents cette session : ${memCtx.recentTopics.join(', ')}`);
  }

  if (memCtx.lastExchanges && memCtx.lastExchanges.length > 0) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('DERNIERS ÉCHANGES (pour contexte immédiat)');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    memCtx.lastExchanges.forEach(e => {
      lines.push(`[${e.role.toUpperCase()}] ${e.text}`);
    });
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('RÈGLES ANTI-RÉPÉTITION ABSOLUES');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('1. Ne jamais commencer deux réponses de suite par la même structure ou la même phrase d\'accroche.');
  lines.push('2. Ne jamais redonner le même script si tu en as déjà donné un récemment.');
  lines.push('3. Si un sujet revient pour la 2ème fois ou plus : approfondir la CAUSE RACINE, pas la surface.');
  lines.push('4. Chaque réponse doit donner l\'impression de PROGRESSION, pas de boucle.');
  lines.push('5. Si l\'utilisateur répète une question similaire : reconnais-le explicitement et propose un angle différent.');

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('FORMAT DE RÉPONSE ATTENDU');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('• Direct, concret, actionnable.');
  lines.push('• Quand pertinent : (1) diagnostic rapide, (2) script exact, (3) action immédiate.');
  lines.push('• Longueur : 150-350 mots maximum. Pas de remplissage.');
  lines.push('• Tu peux utiliser **gras** pour les éléments clés.');
  lines.push('• Tu n\'es pas un chatbot générique — tu es un expert qui connaît l\'élève.');

  return lines.join('\n');
}

// ── Extraction d'un résumé structuré depuis la réponse ──────────
function extractSummary(userMessage, responseText, coachId) {
  // Détection d'intent simple
  const m       = userMessage.toLowerCase();
  let intent    = 'default';
  if (/objection|trop cher|prix|budget/.test(m))     intent = 'objection';
  else if (/clos|deal|accord|signer/.test(m))        intent = 'closing';
  else if (/prospect|contacter|message/.test(m))     intent = 'prospection';
  else if (/négoci|remise|réduction/.test(m))        intent = 'negociation';
  else if (/motiv|bloc|peur|confiance/.test(m))      intent = 'motivation';
  else if (/disc|profil|dominant|influent/.test(m))  intent = 'disc';

  // Détection d'éléments dans la réponse
  const hasScript   = /script|"[^"]{10,}"/.test(responseText);
  const hasAction   = /action\s*(immédiate|maintenant)|à faire|exercice/.test(responseText.toLowerCase());
  const hasDiagnosis= /diagnos|problème (vient|est|principal)|cause/.test(responseText.toLowerCase());

  // Mise à jour de score selon l'intent traité
  const scoreUpdates = {};
  if (intent !== 'default') {
    const scoreMap = {
      objection:   'objections',
      closing:     'closing',
      prospection: 'discovery',
      negociation: 'persuasion',
      motivation:  'mindset',
      disc:        'disc'
    };
    if (scoreMap[intent]) scoreUpdates[scoreMap[intent]] = 0.3;
    scoreUpdates.confidence = 0.1;
  }

  return {
    coach_type:       coachId,
    topic:            intent,
    summary:          `Session ${coachId} — ${intent}`,
    diagnosis_given:  hasDiagnosis,
    script_given:     hasScript,
    action_given:     hasAction,
    angle_used:       intent,
    score_updates:    scoreUpdates
  };
}

// ── Handler principal ─────────────────────────────────────────────
exports.handler = async function (event, context) {

  // CORS
  const headers = {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type',
    'Access-Control-Allow-Methods':'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Vérification API key
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: 'CLAUDE_API_KEY not configured in Netlify environment variables.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { message, coachId, memoryContext, conversationHistory } = body;

  // ── Récupération userId : header > body > anonymous ────────────
  // supabase-client.js injecte X-Atlas-User-Id dans chaque requête
  const userId = event.headers['x-atlas-user-id']
              || event.headers['X-Atlas-User-Id']
              || body.userId
              || 'anonymous';

  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';

  if (!message || !coachId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'message and coachId are required' }) };
  }

  // Sécurité : refuse les messages trop longs
  if (message.length > 2000) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message too long' }) };
  }

  try {
    const systemPrompt = buildSystemPrompt(coachId, memoryContext || {});

    // ── OPTIMISATION COÛTS : historique tronqué à 4 échanges ───
    const messages = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-4)
        .forEach(msg => {
          const content = msg.content && msg.content.length > 300
            ? msg.content.slice(0, 300) + '…'
            : msg.content;
          messages.push({ role: msg.role, content });
        });
    }
    messages.push({ role: 'user', content: message.slice(0, 2000) });

    // ── Appel API Anthropic via fetch natif (pas de SDK) ─────────
    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 500,
        system:     systemPrompt,
        messages
      })
    });

    if (!apiResponse.ok) {
      const errData = await apiResponse.json().catch(() => ({}));
      if (apiResponse.status === 401) throw { status: 401, message: 'Unauthorized' };
      if (apiResponse.status === 429) throw { status: 429, message: 'Rate limit' };
      throw new Error(`API error ${apiResponse.status}: ${JSON.stringify(errData)}`);
    }

    const response    = await apiResponse.json();
    const responseText = response.content[0]?.text || "Je n'ai pas pu générer de réponse. Réessaie.";
    const summary      = extractSummary(message, responseText, coachId);

    // ── Tokens réels pour suivi des coûts ─────────────────────
    const inputTokens  = response.usage?.input_tokens  || 0;
    const outputTokens = response.usage?.output_tokens || 0;
    const costEur      = parseFloat(
      ((inputTokens / 1000) * 0.00279 + (outputTokens / 1000) * 0.01395).toFixed(5)
    );

    // ── Log consume-message (non-bloquant) ────────────────────
    const baseUrl = process.env.URL || 'http://localhost:8888';
    const consumeHeaders = { 'Content-Type': 'application/json' };
    if (authHeader) consumeHeaders['Authorization'] = authHeader;
    fetch(`${baseUrl}/.netlify/functions/consume-message`, {
      method:  'POST',
      headers: consumeHeaders,
      body: JSON.stringify({
        userId,
        coachId,
        plan:         body.plan  || 'free',
        inputTokens,
        outputTokens
      })
    }).catch(() => {}); // silencieux si échec

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: responseText,
        summary,
        usage: { inputTokens, outputTokens, costEur }
      })
    };

  } catch (err) {
    console.error('[coach.js] Claude API error:', err.message);

    if (err.status === 401) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Clé API invalide. Vérifie CLAUDE_API_KEY dans Netlify.' }) };
    }
    if (err.status === 429) {
      return { statusCode: 429, headers, body: JSON.stringify({ error: 'Limite de requêtes atteinte. Réessaie dans quelques secondes.' }) };
    }

    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur serveur. Mode demo activé automatiquement.' }) };
  }
};
