/* ============================================================
   ATLAS ACADÉMIE — MOTEUR DE CHALLENGE BI-HEBDOMADAIRE
   
   Fonctionnement :
   - Lundi  → Produit A tiré par l'IA dans ATLAS_PRODUCTS
   - Jeudi  → Produit B différent tiré par l'IA dans ATLAS_PRODUCTS
   - Même produit pour TOUS les utilisateurs la même semaine
   - Les points s'accumulent sur le mois → diplômes
   
   Scoring (100 pts max par session) :
   - Accroche initiale       : 15 pts
   - Traitement objections   : 30 pts (10 pts × 3 objections)
   - Argumentation produit   : 25 pts
   - Closing final           : 20 pts
   - Fluidité / naturel      : 10 pts
   ============================================================ */

const AtlasChallengeVente = (function() {
  'use strict';

  const STORAGE_KEY   = 'atlas_challenge_vente_v1';
  const MONTH_KEY     = 'atlas_monthly_scores_v1';

  /* ── Calcul de la semaine ISO ── */
  function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  function getYearWeek(date) {
    return `${date.getFullYear()}-W${String(getWeekNumber(date)).padStart(2,'0')}`;
  }

  function getMonthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
  }

  /* ── Détermine si on est lundi (slot A) ou jeudi (slot B) ── */
  function getCurrentSlot(date) {
    const day = date.getDay(); // 0=dim, 1=lun, 2=mar... 4=jeu
    if (day === 1 || day === 2) return 'A';  // Lundi-Mardi
    if (day === 4 || day === 5) return 'B';  // Jeudi-Vendredi
    if (day === 3) return 'A';               // Mercredi → slot A encore actif
    return 'B';                              // Sam-Dim → slot B de la semaine
  }

  /* ── Sélection déterministe du produit (identique pour tous) ── */
  function selectProduct(weekKey, slot, products) {
    // Seed basé sur semaine + slot pour garantir le même produit pour tous
    const seedStr = weekKey + slot;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    }

    // LCG
    function rand() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xFFFFFFFF;
    }

    const idx = Math.floor(rand() * products.length);
    let product = products[idx];

    // Si slot B, on s'assure d'avoir un produit différent du slot A
    if (slot === 'B') {
      const slotASeed = weekKey + 'A';
      let seedA = 0;
      for (let i = 0; i < slotASeed.length; i++) {
        seedA = (seedA * 31 + slotASeed.charCodeAt(i)) >>> 0;
      }
      function randA() {
        seedA = (seedA * 1664525 + 1013904223) >>> 0;
        return seedA / 0xFFFFFFFF;
      }
      const idxA = Math.floor(randA() * products.length);
      // Décaler si même produit
      const finalIdx = idxA === idx ? (idx + 1) % products.length : idx;
      product = products[finalIdx];
    }

    return product;
  }

  /* ── Lire / écrire les données ── */
  function getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveData(d) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
    catch {}
  }

  function getMonthData() {
    try { return JSON.parse(localStorage.getItem(MONTH_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveMonthData(d) {
    try { localStorage.setItem(MONTH_KEY, JSON.stringify(d)); }
    catch {}
  }

  /* ── Obtenir le produit courant ── */
  function getCurrentChallenge() {
    if (typeof ATLAS_PRODUCTS === 'undefined') return null;
    const now     = new Date();
    const weekKey = getYearWeek(now);
    const slot    = getCurrentSlot(now);
    const product = selectProduct(weekKey, slot, ATLAS_PRODUCTS);
    return { product, weekKey, slot, date: now };
  }

  /* ── Prochain changement de produit ── */
  function getNextChangeDate() {
    const now  = new Date();
    const day  = now.getDay();
    const next = new Date(now);
    next.setHours(0, 0, 0, 0);

    if (day < 4) {
      // Prochain jeudi
      next.setDate(now.getDate() + (4 - day));
    } else {
      // Prochain lundi
      next.setDate(now.getDate() + (8 - day));
    }
    return next;
  }

  /* ── Enregistrer un score de session ── */
  function saveSessionScore(weekKey, slot, score, productId) {
    const data  = getData();
    const mData = getMonthData();
    const now   = new Date();
    const mKey  = getMonthKey(now);

    // Sauvegarder la session
    const sessionKey = `${weekKey}-${slot}`;
    if (!data[sessionKey]) {
      data[sessionKey] = { score, productId, date: now.toISOString(), played: true };
    } else {
      // Garder le meilleur score
      if (score > data[sessionKey].score) {
        data[sessionKey].score = score;
        data[sessionKey].improved = true;
      }
    }
    saveData(data);

    // Accumuler dans les points mensuels
    if (!mData[mKey]) mData[mKey] = { totalPoints: 0, sessions: [] };
    mData[mKey].sessions.push({ sessionKey, score, productId, date: now.toISOString() });
    mData[mKey].totalPoints = mData[mKey].sessions.reduce((s, sess) => s + sess.score, 0);
    saveMonthData(mData);

    return data[sessionKey];
  }

  /* ── Vérifier si le challenge courant a déjà été joué ── */
  function isCurrentChallengePlayedToday() {
    const now     = new Date();
    const weekKey = getYearWeek(now);
    const slot    = getCurrentSlot(now);
    const data    = getData();
    return !!data[`${weekKey}-${slot}`];
  }

  /* ── Score du mois courant ── */
  function getCurrentMonthScore() {
    const now   = new Date();
    const mKey  = getMonthKey(now);
    const mData = getMonthData();
    return mData[mKey] || { totalPoints: 0, sessions: [] };
  }

  /* ── Historique des sessions ── */
  function getSessionHistory(limit = 10) {
    const data = getData();
    return Object.entries(data)
      .map(([key, val]) => ({ key, ...val }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  /* ── Calcul du rang diplôme selon score mensuel ── */
  function getDiplomeRank(monthScore, totalParticipants) {
    // Simule le rang basé sur le score (en attendant Supabase)
    // Ces seuils seront remplacés par un vrai classement serveur
    const SEUILS = {
      ultimate: 0.90, // top 10% → approximation top 1
      elite:    0.75, // top 25% → approximation top 2-3
      expert:   0.50, // top 50% → approximation top 4-10
    };
    if (monthScore.totalPoints === 0) return null;

    const maxScore = 100 * 8; // 8 sessions par mois × 100pts max
    const pct = monthScore.totalPoints / maxScore;

    if (pct >= SEUILS.ultimate) return 'ultimate';
    if (pct >= SEUILS.elite)    return 'elite';
    if (pct >= SEUILS.expert)   return 'expert';
    return null;
  }

  /* ── Générer le prompt pour le coach IA ── */
  function generateChallengePrompt(product, userName) {
    return `Tu es un prospect réaliste pour un challenge de vente Atlas Académie.

PRODUIT À VENDRE : ${product.nom}
PRIX : ${product.prix}
CONTEXTE : ${product.contexte}
TES OBJECTIONS (à sortir naturellement pendant la conversation) : ${product.objections.join(' / ')}

INSTRUCTIONS :
- Tu joues le rôle du prospect décrit dans le contexte
- Tu es légèrement réticent mais pas impossible à convaincre
- Tu poses des questions réalistes sur le produit
- Tu sors tes objections de manière naturelle (pas toutes en même temps)
- Si le vendeur traite bien les objections avec des arguments solides, tu montres de l'intérêt
- Si le vendeur est maladroit ou pushy, tu te bloques
- À la fin (après 8-12 échanges minimum), tu donnes un signal d'achat clair OU tu refus avec une raison précise
- Reste dans le personnage du contexte : ton prénom, ta situation, tes préoccupations

L'utilisateur qui te parle s'appelle ${userName}. Il est en train de s'entraîner au closing.

COMMENCE la conversation en te présentant brièvement selon le contexte.`;
  }

  /* ── Générer le prompt de scoring final ── */
  function generateScoringPrompt(conversation, product) {
    return `Tu es un expert en vente et closing. Évalue cette simulation de vente.

PRODUIT VENDU : ${product.nom} (${product.prix})
DIFFICULTÉ : ${product.difficulte}/5
OBJECTIONS À TRAITER : ${product.objections.join(', ')}

CONVERSATION :
${conversation}

ÉVALUE selon ces 5 critères (note sur les points indiqués, sois précis et exigeant) :

1. ACCROCHE INITIALE (0-15 pts) : La prise de contact était-elle professionnelle et engageante ?
2. TRAITEMENT DES OBJECTIONS (0-30 pts) : Les ${product.objections.length} objections ont-elles été traitées avec des arguments solides ?
3. ARGUMENTATION PRODUIT (0-25 pts) : Les arguments étaient-ils pertinents, spécifiques et convaincants ?
4. CLOSING FINAL (0-20 pts) : Y a-t-il eu une tentative de closing claire ? Était-elle bien exécutée ?
5. FLUIDITÉ ET NATUREL (0-10 pts) : La conversation était-elle naturelle et professionnelle ?

RÉPONDS UNIQUEMENT en JSON strict (sans backticks, sans markdown) :
{
  "scores": {
    "accroche": <0-15>,
    "objections": <0-30>,
    "argumentation": <0-25>,
    "closing": <0-20>,
    "fluidite": <0-10>
  },
  "total": <0-100>,
  "vente_conclue": <true/false>,
  "points_forts": ["<point fort 1>", "<point fort 2>"],
  "axes_amelioration": ["<axe 1>", "<axe 2>"],
  "conseil_cle": "<Un conseil concret et actionnable en 1-2 phrases>",
  "feedback_coach": "<Feedback global en 3-4 phrases dans le style d'un coach bienveillant mais exigeant>"
}`;
  }

  /* ── API publique ── */
  return {
    getCurrentChallenge,
    getNextChangeDate,
    saveSessionScore,
    isCurrentChallengePlayedToday,
    getCurrentMonthScore,
    getSessionHistory,
    getDiplomeRank,
    generateChallengePrompt,
    generateScoringPrompt,
    getWeekNumber,
    getMonthKey: (d) => getMonthKey(d || new Date()),
  };

})();
