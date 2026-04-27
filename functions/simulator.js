// netlify/functions/simulator.js
// Simulateur de vente IA — faux client interactif + scoring
// Aucune dépendance npm — fetch natif Node 18+

const SCENARIOS = {
  'cold-call': {
    title: 'Cold Call B2B',
    emoji: '📞',
    difficulty: 'Moyen',
    persona: `Tu joues Marc Dupont, DG d'une PME de 20 personnes dans le secteur logistique.
Tu es occupé, tu as une réunion dans 15 minutes.
Tu reçois un appel commercial à froid — tu es légèrement agacé mais professionnel.
Tu as eu de mauvaises expériences avec des commerciaux qui perdent ton temps.
Tes réactions typiques :
- Si l'accroche est mauvaise : "Je suis débordé là, envoyez-moi un mail."
- Si l'accroche est bonne : tu accordes 2-3 minutes et tu poses des questions sur la valeur.
- Si le vendeur est trop insistant : tu raccroches poliment.
- Si le vendeur découvre bien ton besoin : tu acceptes un RDV.
Parle naturellement, max 2-3 phrases par réponse. Reste dans le personnage ABSOLUMENT.`,
    scoring_criteria: ['accroche', 'decouverte', 'gestion_temps', 'prochain_rdv'],
    intro: "Allô ?"
  },
  'objection-prix': {
    title: 'Objection Prix',
    emoji: '💰',
    difficulty: 'Moyen',
    persona: `Tu joues Sophie Martin, dirigeante d'un cabinet de conseil de 8 personnes.
Tu es intéressée par la formation Atlas Académie MAIS tu bloques sur le prix.
Tu penses que c'est trop cher et tu as trouvé des concurrents moins chers sur Google.
Tes objections : "C'est trop cher", "J'ai vu moins cher ailleurs", "Je dois réfléchir", "Vous pouvez faire un geste ?".
Si le vendeur explique bien la valeur et la différence vs concurrents : tu t'ouvres progressivement.
Si le vendeur cède directement sur le prix sans défendre la valeur : tu perds confiance.
Si le vendeur est authentique et concret : tu envisages d'acheter.
Max 2-3 phrases. Naturel, pas corporatif. Reste dans le personnage.`,
    scoring_criteria: ['reformulation', 'valeur', 'comparaison_concurrents', 'closing'],
    intro: "Honnêtement, c'est vraiment trop cher pour moi..."
  },
  'closing-final': {
    title: 'Closing Final',
    emoji: '🎯',
    difficulty: 'Difficile',
    persona: `Tu joues Thomas Bernard, entrepreneur qui a fait 2 appels de découverte.
Il est intéressé mais hésite au moment de signer. Il cherche une raison de dire non.
Ses blocages : "Je dois en parler à ma femme", "Je vais encore y réfléchir", "Et si ça ne marche pas ?", "Je suis pas sûr d'avoir le temps".
Ces objections sont des peurs cachées, pas des vraies raisons.
Si le vendeur identifie la vraie peur et la traite : tu te sens compris et tu avances.
Si le vendeur force : tu te fermes.
Si le vendeur utilise l'urgence de façon authentique : tu peux signer.
Max 2-3 phrases. Reste dans le personnage.`,
    scoring_criteria: ['identification_frein', 'traitement_peur', 'urgence', 'closing'],
    intro: "Ouais... j'ai bien aimé ce qu'on a vu ensemble, mais j'ai besoin d'encore y réfléchir."
  },
  'disc-dominant': {
    title: 'Profil DISC — Dominant',
    emoji: '🔴',
    difficulty: 'Avancé',
    persona: `Tu joues Alexandre Rossi, CEO d'une startup de 50 personnes.
Profil DISC : D (Dominant). Tu es direct, impatient, focalisé sur les résultats et le ROI.
Tu détestes les présentations longues, les détails inutiles et les commerciaux qui tournent autour du pot.
Tu veux : des chiffres, des résultats concrets, aller vite.
Si le vendeur va droit au but avec des résultats concrets : tu es réceptif.
Si le vendeur est long, vague ou trop émotionnel : tu coupes court.
Ton style de communication : phrases courtes, direct, parfois brusque.
Max 2 phrases. Très direct. Reste dans le personnage.`,
    scoring_criteria: ['adaptation_disc', 'roi_concret', 'rapidite', 'closing'],
    intro: "T'as 5 minutes. Qu'est-ce que t'as à me proposer ?"
  },
  'renouvellement': {
    title: 'Renouvellement / Upsell',
    emoji: '🔄',
    difficulty: 'Facile',
    persona: `Tu joues Claire Dubois, cliente depuis 6 mois qui doit renouveler son abonnement.
Elle est globalement satisfaite mais cherche une raison de ne pas payer plus.
Elle veut voir si elle peut obtenir un meilleur deal ou si elle doit justifier la dépense.
Si le vendeur valorise ce qu'elle a déjà obtenu et présente la nouveauté : elle renouvelle.
Si le vendeur fait juste "vous renouvelez ?" : elle hésite et négocie.
Elle est ouverte à l'upsell si la valeur est bien expliquée.
Max 2-3 phrases. Amicale mais attentive à la valeur.`,
    scoring_criteria: ['valorisation_passee', 'presentation_valeur', 'upsell', 'closing'],
    intro: "Alors, mon abonnement expire bientôt... vous m'avez dit de vous rappeler."
  }
};

const SCORING_PROMPT = `Tu es un expert en vente et closing avec 20 ans d'expérience.
Analyse cette simulation de vente et donne un feedback structuré.

RÈGLES DE SCORING :
- Sois honnête et précis, pas complaisant.
- Si la performance est faible, dis-le clairement avec bienveillance.
- Chaque critère noté de 1 à 10.
- Le script idéal doit être concret et réutilisable immédiatement.

Réponds UNIQUEMENT en JSON valide, sans texte avant ou après :
{
  "global_score": 7.2,
  "scores": {
    "critere1": 8,
    "critere2": 6
  },
  "verdict": "Phrase courte et directe sur la performance globale.",
  "points_forts": ["Point fort 1 concret", "Point fort 2 concret"],
  "points_faibles": ["Point faible 1 avec explication", "Point faible 2 avec explication"],
  "script_ideal": "Voici exactement comment j'aurais répondu à ce moment clé : '...' Parce que...",
  "prochaine_etape": "Une seule action concrète à travailler en priorité.",
  "xp_earned": 25
}`;

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST')   return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'CLAUDE_API_KEY non configurée' }) };

  try {
    const { scenario, phase, userMessage, history = [] } = JSON.parse(event.body);
    const sc = SCENARIOS[scenario];
    if (!sc) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Scénario inconnu' }) };

    // ── Phase 1 : Le client répond ────────────────────────────────
    if (phase === 'client') {
      const messages = [
        ...history.slice(-8),
        { role: 'user', content: userMessage }
      ];

      const res  = await callClaude(apiKey, sc.persona, messages, 180);
      const text = res.content?.[0]?.text || '...';
      return ok(headers, { clientResponse: text, phase: 'client' });
    }

    // ── Phase 2 : Scoring final ───────────────────────────────────
    if (phase === 'scoring') {
      const criteriaStr = sc.scoring_criteria.join(', ');
      const sysPrompt   = SCORING_PROMPT.replace('critere1', sc.scoring_criteria[0] || 'critere1')
                                        .replace('critere2', sc.scoring_criteria[1] || 'critere2');

      const convText = history.map(m => `[${m.role === 'user' ? 'VENDEUR' : 'CLIENT'}] ${m.content}`).join('\n');
      const prompt   = `Scénario : ${sc.title}\nCritères à évaluer : ${criteriaStr}\n\nConversation complète :\n${convText}`;

      const res  = await callClaude(apiKey, sysPrompt, [{ role: 'user', content: prompt }], 700);
      const raw  = res.content?.[0]?.text || '{}';

      let scoring;
      try {
        scoring = JSON.parse(raw);
      } catch {
        const match = raw.match(/\{[\s\S]*\}/);
        scoring = match ? JSON.parse(match[0]) : { global_score: 5, verdict: 'Analyse indisponible.', points_forts: [], points_faibles: [], script_ideal: '', prochaine_etape: '', xp_earned: 10 };
      }
      return ok(headers, { scoring, phase: 'scoring' });
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Phase invalide' }) };

  } catch (err) {
    console.error('[simulator.js] Error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

async function callClaude(apiKey, system, messages, maxTokens = 300) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: maxTokens, system, messages })
  });
  if (!res.ok) throw new Error(`Claude API ${res.status}`);
  return res.json();
}

function ok(headers, body) {
  return { statusCode: 200, headers, body: JSON.stringify(body) };
}
