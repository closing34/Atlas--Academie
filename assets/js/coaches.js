/* ============================================================
   ATLAS ACADÉMIE — COACHES.JS v2.0
   Système de coachs IA avec mémoire, anti-répétition et progression

   MODES :
   - DEMO  : réponses RESPONSE_BANK (localStorage, sans API)
   - PROD  : appel Netlify Function → Claude API (avec API key)

   Anti-répétition : chaque réponse est indexée par [coach][intent][index].
   AtlasMemory garde trace des angles utilisés et force la rotation.
   ============================================================ */

'use strict';

// ── Codes d'accès ─────────────────────────────────────────────────
const ACCESS_CODES  = ['ATLAS2026', 'CREATOR', 'SAINT-THOMAS', 'TEST'];
const FREE_MESSAGES = 3;

// ── Définitions des coaches ───────────────────────────────────────
const COACHES = {

  stratege: {
    id:       'stratege',
    name:     'Le Stratège',
    icon:     '⚔️',
    color:    '#2A6FDB',
    subtitle: 'Analytique · Tactique · Précis',
    systemPrompt: `Tu es Le Stratège, coach IA d'élite chez Atlas Académie.
Ton rôle : décortiquer chaque situation de vente avec une précision chirurgicale.
Tu n'as aucune tolérance pour les approximations, les excuses ou les scripts bâclés.
Ton style : direct, analytique, orienté résultat. Pas d'émotions superflues.
Tu donnes toujours : (1) un diagnostic précis, (2) un script mot à mot, (3) une action immédiate.
Tu n'encourages jamais de pratiques trompeuses, illégales ou manipulatrices.`,
    openingMessages: [
      "Stratège en ligne. Quel est le problème sur lequel tu travailles — objection, closing, ou structuration du call ?",
      "Je suis là. Décris-moi ta situation exacte : où est-ce que la vente se casse ?",
      "Prêt. Donne-moi le contexte : prospect, produit, étape du call où tu bloques."
    ]
  },

  mentor: {
    id:       'mentor',
    name:     'Le Mentor',
    icon:     '🎓',
    color:    '#C9A84C',
    subtitle: 'Pédagogue · Bienveillant · Structurant',
    systemPrompt: `Tu es Le Mentor, coach pédagogique d'Atlas Académie.
Ton rôle : accompagner la progression pas à pas, avec bienveillance mais exigence.
Tu expliques le "pourquoi" derrière chaque technique avant le "comment".
Ton style : chaleureux, structuré, encourageant sans être complaisant.
Tu construis des bases solides et corriges avec douceur mais clarté.
Tu adaptes ton niveau à celui de l'utilisateur — plus simple pour les débutants.`,
    openingMessages: [
      "Bonjour ! Je suis là pour t'accompagner. Où en es-tu dans ta progression en vente ? Qu'est-ce qui t'amène aujourd'hui ?",
      "Bienvenue. Dis-moi : qu'est-ce que tu veux améliorer en priorité ? Je vais t'accompagner étape par étape.",
      "Je suis là. Pose-moi ta question ou décris-moi la situation sur laquelle tu veux progresser."
    ]
  },

  architecte: {
    id:       'architecte',
    name:     "L'Architecte du Pouvoir",
    icon:     '🏛️',
    color:    '#C94C4C',
    subtitle: '3 modes · Élite · Haute exigence',
    modes:    { mentor: 'mode-mentor', stratege: 'mode-stratege', pression: 'mode-pression' },
    systemPrompt: `Tu es l'Architecte du Pouvoir, coach élite d'Atlas Académie.
Ta mission : recadrer, renforcer et transformer l'état d'esprit du vendeur.
Tu t'adaptes : pédagogique pour construire, stratégique pour analyser, pression pour briser les excuses.
Tu es intense mais éthique. Tu ne bannis pas les difficultés — tu les transformes en carburant.
Tu ne tolères ni l'auto-sabotage, ni les excuses récurrentes, ni la médiocrité choisie.
Tu refuses absolument : manipulation toxique, illégalité, violence, autodestruction.
Chaque réponse doit pousser à l'action et à la responsabilité totale.`,
    openingMessages: [
      "Je suis là. Parle — qu'est-ce qui t'empêche d'être au niveau où tu sais que tu peux être ?",
      "L'Architecte est en ligne. Quelle est la vraie chose que tu dois changer ? Pas la symptôme — la cause.",
      "Prêt à travailler. Dis-moi où tu bloques — mentalement, techniquement, ou dans ton organisation."
    ]
  },

  profileur: {
    id:       'profileur',
    name:     'Le Profileur DISC',
    icon:     '🧠',
    color:    '#7C4DCA',
    subtitle: 'Psychologie · Comportemental · DISC',
    systemPrompt: `Tu es Le Profileur DISC, spécialiste en psychologie comportementale chez Atlas Académie.
Ta mission : apprendre à l'utilisateur à identifier le profil DISC de chaque prospect et à adapter son discours.
Les 4 profils DISC : D (Dominant — décideur direct), I (Influent — émotionnel social), S (Stable — loyal prudent), C (Consciencieux — analytique rigoureux).
Tu proposes des analyses, des simulations de conversation, des scripts adaptés à chaque profil.
Tu relies toujours la théorie DISC à des situations de vente concrètes et applicables immédiatement.`,
    openingMessages: [
      "Profileur DISC actif. Décris-moi ton prospect — comportement, questions posées, réactions — je vais identifier son profil.",
      "Prêt à profiler. Parle-moi d'un prospect qui t'a posé problème récemment. Qu'est-ce qu'il a dit ou fait ?",
      "Je suis là. Quel profil DISC veux-tu travailler aujourd'hui, ou as-tu un prospect spécifique à analyser ?"
    ]
  }
};

// ── RESPONSE BANK — Multi-angles par intent ───────────────────────
// Chaque réponse = un angle différent sur le même intent.
// L'anti-répétition via AtlasMemory évite la réutilisation.

const RESPONSE_BANK = {

  // ── LE STRATÈGE ───────────────────────────────────────────────
  stratege: {

    objection: [
      // Angle 0 : Technique — Pivot de la question
      `**Diagnostic.** L'objection prix survient quand la valeur n'a pas été ancréee correctement. Tu as probablement présenté le prix avant que le prospect ressente pleinement la douleur du problème.

**Script exact :**
"Par rapport à quoi vous semble-t-il élevé ?"
→ Laisse le silence. Ne comble pas.
→ Le prospect va verbaliser son vrai blocage.
→ Là, tu réponds sur le fond, pas sur le prix.

**Action immédiate :** Test ce pivot sur tes 3 prochains appels. Note ce que chaque prospect dit après la question.`,

      // Angle 1 : Structurel — Problème avant le prix
      `**Diagnose structurelle.** Le prix n'est jamais le vrai problème. C'est un signal que quelque chose a raté en amont — ancrage de la douleur, valeur perçue, ou confiance.

**Vérification en 3 questions :**
1. As-tu fait verbaliser la douleur au prospect avant de présenter l'offre ?
2. A-t-il dit lui-même ce que ça lui coûte de ne pas résoudre ce problème ?
3. T'a-t-il donné une raison convaincante de lui faire confiance ?

Si une réponse est non → le prix vient trop tôt. Recule dans le call.

**Script de recadrage :** "Avant d'aller plus loin sur le tarif, j'ai besoin de comprendre une chose — qu'est-ce que ça vous coûte concrètement de ne pas régler ça maintenant ?"`,

      // Angle 2 : Psychologique — Mécanisme de défense
      `**Mécanique psychologique.** L'objection prix est souvent un mécanisme de protection, pas une réalité financière. Le prospect teste si tu vas défendre ta valeur ou te plier.

**Ne fais jamais ça :** baisser le prix immédiatement, proposer des réductions, s'excuser du tarif.

**Script de défense de valeur :**
"Je comprends que ça représente un investissement. La question n'est pas si vous pouvez vous le permettre — c'est si vous pouvez vous permettre de rester où vous en êtes dans 6 mois."

**Suivi :** "Qu'est-ce qui vous ferait dire que cet investissement vaut le coup ?"`,

      // Angle 3 : Ancrage du problème
      `**Tactique : ancrage douleur.** Avant de répondre à l'objection, tu dois ramener le prospect à sa douleur initiale. Il a oublié pourquoi il t'a appelé.

**Script de ré-ancrage :**
"Permettez-moi de revenir une seconde sur ce que vous m'avez dit en début d'appel — vous m'avez dit que [rappel de la douleur]. Est-ce que c'est toujours votre situation ?"
[Attends la confirmation]
"Alors la vraie question n'est pas le prix — c'est : est-ce que cette solution résout ce problème ?"

**Ce que tu fais :** tu déplaces la comparaison de "prix vs argent" à "prix vs coût du problème".`,

      // Angle 4 : Comparaison de timing
      `**Angle timing.** Parfois l'objection prix masque une peur de décider. Le prospect n'est pas prêt, pas parce que c'est trop cher, mais parce qu'il n'est pas certain.

**Test de clarté :**
"Si le prix n'était pas un facteur, est-ce que vous iriez de l'avant ?"
→ Si OUI → le problème c'est le prix, travaille la valeur.
→ Si NON → le vrai blocage est ailleurs. Creuse : "Qu'est-ce qui vous retient ?"

**Action :** Arrête de défendre le prix avant d'avoir identifié si c'est vraiment le vrai blocage.`
    ],

    closing: [
      // Angle 0 : Closing direct
      `**Problème de closing identifié.** Tu attends un signe que tu n'obtiendras jamais. Le closing n'est pas demandé — il est mené.

**Script de closing direct :**
"Sur la base de ce qu'on a vu ensemble, est-ce que vous voyez une raison de ne pas avancer maintenant ?"
→ Silence total après. La première personne qui parle perd.

**Règle :** Le closing se fait une fois — fermement. Pas deux, pas trois. Si tu dois redemander, c'est qu'il y a une objection cachée à déterrer d'abord.`,

      // Angle 1 : Diagnostic du signal d'achat manqué
      `**Signal d'achat manqué.** Le prospect t'a envoyé des signaux que tu n'as pas vus — ou que tu as vus mais ignorés par peur de demander.

**Signaux d'achat à repérer :**
- "Et vous livrez combien de temps après ?"
- "Est-ce qu'on peut adapter ça à notre cas ?"
- "Et les autres, comment ça se passe pour eux ?"

**Dès que tu entends ça :** c'est le moment. Stop. Close immédiatement.

**Script :** "On peut régler ça maintenant — comment souhaitez-vous procéder ?"`,

      // Angle 2 : Récapitulatif avant close
      `**Technique du récapitulatif.** Avant de closer, reconstruis la valeur en récapitulant CE QUE LE PROSPECT T'A DIT LUI-MÊME.

**Script :**
"Récapitulons. Vous m'avez dit que [problème 1]. Vous m'avez aussi dit que [problème 2]. Et la solution que vous cherchez, c'est [désir]. C'est bien ça ?"
[Attends le OUI]
"Alors on est alignés. La prochaine étape c'est [action concrète]. On part là-dessus ?"

**Pourquoi ça marche :** le prospect entend ses propres mots. Il ne peut pas contredire ce qu'il a dit.`,

      // Angle 3 : Objection cachée
      `**Closing bloqué = objection cachée.** Si tu closes et que ça ne passe pas, il y a quelque chose qu'il ne t'a pas dit.

**Technique de l'objection cachée :**
"J'ai l'impression qu'il y a quelque chose qui vous retient et que vous n'avez pas encore mentionné. Qu'est-ce que c'est ?"
→ Laisse le silence. C'est un moment délicat — ne meuble pas.

**Ce que tu découvriras :** le vrai problème (budget, décideur caché, concurrent, timing).

**Règle :** On ne close pas par-dessus une objection cachée. On la trouve d'abord, on la traite, puis on close.`,

      // Angle 4 : Urgence réelle
      `**Création d'urgence réelle.** Pas de fausse urgence. Pas de "l'offre expire ce soir" si c'est faux. Mais une vraie urgence liée au coût de l'inaction.

**Script :**
"Voilà ce que je sais : les gens qui attendent 3 mois pour prendre cette décision reviennent souvent en disant qu'ils auraient dû agir plus tôt. Qu'est-ce qui se passe pour vous si vous êtes dans la même situation dans 90 jours ?"

**Puis :** laisse-le répondre et construire sa propre urgence. Ton rôle est de l'amener à articuler le coût de l'inaction — pas de le forcer.`
    ],

    prospection: [
      `**Problème de prospection — message trop générique.** Un message que 1000 personnes peuvent recevoir n'est pas un message — c'est du bruit.

**Structure du message de prospection en 4 lignes :**
1. Signal de recherche (pourquoi MAINTENANT) : "J'ai vu que vous recrutez 3 commerciaux—"
2. Problème spécifique : "—ce qui veut généralement dire que vous avez besoin d'un système de closing solide rapidement."
3. Résultat concret : "On a aidé [profil similaire] à passer de X% à Y% de taux de conversion en 60 jours."
4. CTA minimaliste : "Ça vaut un échange de 15 minutes ?"

**Action :** Réécris ton message en appliquant cette structure. Envoie-le moi et je l'analyse.`,

      `**Le vrai problème de la prospection : le timing.** Tu contactes les prospects qui ne cherchent pas activement — et tu ignores les signaux qui indiquent qu'ils cherchent maintenant.

**Signaux chauds à surveiller :**
- Recrutement commercial actif (LinkedIn Jobs)
- Nouveau financement (Crunchbase, LinkedIn)
- Post récent sur une problématique liée à ta solution
- Participation à un événement de ton secteur

**Règle :** un prospect chaud avec un bon timing convertit 3x mieux qu'un prospect froid avec un bon script. Commence par choisir le bon moment.`,

      `**Taux de réponse faible = valeur perçue faible.** Le prospect ne répond pas parce qu'il ne voit pas encore ce qu'il a à gagner à lire ton message.

**Test : lis ton message comme si tu étais le prospect.** Pose-toi cette question : "Pourquoi est-ce que JE perdrais 2 minutes à répondre à ça ?"

**Ce qu'il faut que le message contienne :**
- Un élément personnalisé (pas "j'ai vu votre profil")
- Un bénéfice concret exprimé en résultat, pas en features
- Une friction minimale pour répondre

**Script de test :** "Je vous contacte parce que [raison précise]. [Résultat en chiffres ou situation concrète]. Est-ce que c'est quelque chose que vous regardez en ce moment ?"`,

      `**Prospection : problème de volume vs. qualité.** Si tu prospectes 100 personnes pour 2 rendez-vous, le problème n'est pas le volume — c'est le ciblage.

**Calcule ton ICP (Ideal Customer Profile) :**
1. Qui sont tes 3 meilleurs clients actuels ?
2. Qu'ont-ils en commun (taille, secteur, rôle, problème) ?
3. Ce profil commun = ton ICP prioritaire.

**Action :** Arrête de contacter tout le monde. Construis une liste de 20 prospects qui ressemblent à tes meilleurs clients. Teste 3 messages différents sur ces 20. Mesure. Optimise.`
    ],

    negociation: [
      `**Règle n°1 de la négociation : ne jamais négocier seul.** Si tu négocies sur le prix sans avoir défini les conditions d'échange à l'avance, tu perds systématiquement.

**Protocole de contre-offre :**
"Je peux travailler sur le tarif, mais j'aurais besoin en échange [contrepartie concrète : paiement à l'avance / engagement plus long / témoignage / référence]."

**Jamais :** "D'accord, je vous fais une remise." sans rien en échange.
**Toujours :** "Si vous faites X, je fais Y."

Chaque concession unilatérale détruit ta valeur perçue et envoie un signal négatif au prospect.`,

      `**Technique du budget révélé.** Avant de negocier, découvre le budget réel.

**Script de découverte budget :**
"Pour que je vous propose ce qui correspond le mieux à votre situation — vous avez une fourchette en tête pour ce type d'investissement ?"

**Traitement selon la réponse :**
- Budget trop bas → "Ce que vous décrivez dépasse ce que ce budget permet. Soit on recalibre l'objectif, soit on voit comment débloquer un budget adapté."
- Budget OK → Continue sans mentionner le tien en premier.

**Règle :** celui qui donne son prix en premier perd la marge de manœuvre.`,

      `**Négociation : ancrage haut.** L'erreur la plus commune — présenter ton vrai prix d'entrée comme offre d'ouverture.

**Stratégie d'ancrage :**
Commence avec une offre plus haute que ce que tu espères, avec plus de valeur incluse.
Cela te donne de la marge pour "céder" sans perdre de marge réelle.

**Exemple :** Si tu vises 2000€, présente une offre premium à 2800€ avec options. Quand le prospect négocie, tu arrives à 2000€ en retirant des options — et il a l'impression d'avoir gagné.

C'est éthique : tu proposes réellement plus au départ. Tu n'inventes pas de fausse valeur.`,

      `**Arrêter une négociation qui déraille.** Si le prospect pousse sans logique, reprends le contrôle.

**Script de recadrage :**
"Je veux qu'on arrive à un accord qui fonctionne pour vous et qui soit viable pour moi. Pour ça, j'ai besoin de comprendre : qu'est-ce qui justifie ce chiffre de votre côté ?"

Si la justification est irrationnelle ou impossible → "Je ne peux pas aller là. Ce que je peux faire c'est [meilleure offre réaliste]. C'est ça ou c'est un non de ma part — et je respecte les deux options."`
    ],

    motivation: [
      `**Diagnostic motivationnel.** La motivation qui dépend de l'humeur n'est pas de la motivation — c'est de l'instabilité. Un vendeur qui performe seulement quand il se "sent bien" est un vendeur imprévisible.

**Ce que tu dois construire :** un système, pas une émotion.
Ça veut dire : rituels fixes, objectifs mesurables, revue hebdomadaire de tes chiffres.

**Action concrète :** Définis 3 actions quotidiennes non-négociables que tu feras indépendamment de ton état d'esprit. Pas d'excuses. Pas de conditions.`,

      `**Le vrai problème des baisses de motivation : l'absence de métriques.** Si tu ne sais pas où tu en es, tu ne peux pas te remotiver sur des faits — seulement sur des émotions.

**KPIs minimaux à tracker chaque semaine :**
- Nb de prospects contactés
- Nb de rendez-vous pris
- Nb de propositions envoyées
- Taux de conversion à chaque étape

**Pourquoi :** quand tu vois tes chiffres progresser, la motivation suit. Quand tu travailles dans le flou, elle s'effondre.`
    ],

    default: [
      `**Message reçu.** Pour te donner une réponse précise, j'ai besoin d'un peu plus de contexte.

Dis-moi : (1) à quelle étape de la vente tu es, (2) ce qui s'est passé exactement, (3) ce que tu as essayé.

Plus tu es précis, plus mon diagnostic sera actionnable.`,

      `**Contexte insuffisant pour un diagnostic précis.** Donne-moi l'une de ces informations :
- La phrase exacte que le prospect t'a dite
- L'étape du call où tu bloques (découverte / offre / objection / closing)
- Ce que tu as répondu et pourquoi ça n'a pas fonctionné

Je construis des solutions sur des faits, pas sur des approximations.`
    ]
  },

  // ── LE MENTOR ────────────────────────────────────────────────────
  mentor: {

    objection: [
      // Angle 0 : Pédagogique de base
      `Bonne question — les objections font peur au début, mais elles sont en réalité une bonne nouvelle : ton prospect est encore engagé dans la conversation.

**Principe à retenir :** une objection n'est pas un refus. C'est une demande de réassurance.

**Méthode en 3 étapes pour débuter :**
1. **Valider** — "Je comprends tout à fait."
2. **Explorer** — "Qu'est-ce qui vous amène à penser ça ?"
3. **Répondre** — sur le vrai sujet, pas sur la surface.

**Exercice :** La prochaine fois qu'un prospect dit "c'est trop cher", ne réponds pas tout de suite. Demande-lui d'abord "par rapport à quoi ?" et observe ce qui se passe.`,

      // Angle 1 : Comprendre la source
      `Avant de répondre à une objection, il faut comprendre d'où elle vient. Il y a 3 types d'objections et chacun demande une approche différente.

**Type 1 : Objection de peur** (peur de se tromper, de payer trop cher)
→ Rassure avec des preuves (témoignages, résultats, garantie)

**Type 2 : Objection d'incompréhension** (le prospect n'a pas compris la valeur)
→ Reformule, illustre, donne un exemple concret

**Type 3 : Objection de timing** ("pas maintenant")
→ Explore la vraie raison, ancre le coût de l'attente

**À faire maintenant :** identifie de quel type est l'objection que tu rencontres le plus souvent. On travaillera ensuite la réponse adaptée.`,

      // Angle 2 : Empathie puis redirection
      `**La technique EAR : Empathie — Accord — Redirection.**

C'est la méthode la plus naturelle et la moins agressive pour traiter une objection sans brusquer le prospect.

**Script :**
- **E** (Empathie) : "Je comprends ce que vous voulez dire."
- **A** (Accord partiel) : "Vous avez raison qu'un investissement comme celui-ci mérite réflexion."
- **R** (Redirection) : "Et c'est exactement pourquoi je veux m'assurer que vous comprenez bien ce que vous obtenez — parce que beaucoup de gens qui ont hésité m'ont dit ensuite que..."

**Pourquoi ça marche :** tu ne te bats pas contre le prospect — tu es avec lui. Il baisse ses défenses.`,

      // Angle 3 : La question miroir
      `**Technique du miroir pour les objections.** Quand tu ne sais pas quoi répondre, répète les derniers mots du prospect sous forme de question.

**Exemple :**
Prospect : "C'est trop cher pour moi."
Toi : "Trop cher pour vous ?"
[Silence]
Prospect : "Oui, j'avais prévu un budget de X."

**Ce qui se passe :** le prospect développe lui-même son objection. Tu comprends mieux. Et souvent, il se convainc lui-même en parlant.

**À pratiquer :** cette semaine, sur chaque objection, utilise le miroir en premier. Observe combien d'informations tu obtiens sans avoir dit une seule chose.`,

      // Angle 4 : Prévention des objections
      `**La meilleure façon de traiter les objections, c'est de les anticiper.** Un bon vendeur soulève les objections lui-même avant que le prospect les formule.

**Comment faire :**
"Beaucoup de personnes me disent à ce stade que le prix est un frein. Je veux adresser ça directement avant d'aller plus loin."

**Avantages :**
- Tu montres de la confiance (tu n'as pas peur de l'objection)
- Tu contrôles le moment et la manière dont elle est abordée
- Tu enlèves au prospect l'arme de la surprise

**Exercice :** liste les 3 objections que tu entends le plus souvent. Prépare une réponse pro-active pour chacune à placer avant qu'elle soit soulevée.`
    ],

    closing: [
      `Le closing fait peur parce qu'on croit qu'il faut "forcer" quelqu'un à dire oui. C'est une erreur de perspective. **Un bon closing, c'est simplement aider le prospect à prendre une décision qu'il a déjà commencé à prendre.**

**Signe que le prospect est prêt :**
Il pose des questions logistiques ("ça prend combien de temps ?", "comment ça se passe après ?"). C'est lui qui se projette dans la solution.

**Script doux mais efficace :**
"Il semblerait qu'on soit bien alignés sur ce dont vous avez besoin. Quelle est la prochaine étape qui vous convient le mieux ?"`,

      `**La méthode du "on est d'accord ?"** — Idéale pour les débutants.

Au lieu de demander "vous achetez ?", récapitule et confirme l'accord point par point.

"On est d'accord que votre objectif principal c'est [X] ?"
"On est d'accord que la solution qu'on a vue ensemble répond à ça ?"
"On est d'accord que la prochaine étape logique c'est de démarrer ?"

**Pourquoi ça marche :** le prospect dit "oui" 3 fois. Psychologiquement, il est en mode approbation. La dernière question ne rompt pas le rythme.`,

      `**Closing progressif.** Si tu bloques sur le closing final, c'est souvent parce que tu as sauté des étapes de validation en chemin.

**Principe :** Il doit y avoir de mini-closings tout au long du call.
- "Est-ce que ça correspond à ce que vous cherchez ?"
- "Ça vous parle ?"
- "Vous voyez comment ça s'applique dans votre cas ?"

Chaque "oui" en chemin est un micro-engagement. Le closing final n'est que le dernier dans une série.`,

      `**Gérer le "je dois réfléchir".** C'est l'une des réponses les plus fréquentes et les plus piégées.

**Ne fais pas ça :** "Pas de problème, je vous rappelle la semaine prochaine." → tu perds le lead.

**Fais ça :**
"Bien sûr. Pour vous aider à réfléchir, c'est quoi la principale chose que vous voulez clarifier ?"

→ Il y a soit une vraie question à laquelle tu n'as pas répondu, soit une peur cachée. Dans les deux cas, il faut trouver ce que c'est avant de raccrocher.`
    ],

    prospection: [
      `La prospection, c'est un muscle — ça ne vient pas naturellement, ça se développe avec la pratique régulière.

**La règle des 3 par jour.** Si tu n'as pas encore de routine de prospection, commence petit : 3 nouveaux contacts par jour. Pas 50. Pas 100. 3.

Voici pourquoi ça marche : 3 contacts sérieux, personnalisés et bien ciblés valent 50 messages génériques.

**Structure d'un bon message de départ :**
1. Une accroche liée à EUX (pas à toi)
2. Un problème que tu peux résoudre
3. Une preuve courte
4. Une question simple

C'est tout. Garde ça court.`,

      `**L'erreur principale des débutants en prospection : parler de soi.**

"Bonjour, je m'appelle X, je travaille chez Y, nous proposons Z..." → La personne a arrêté de lire à "je m'appelle".

**Commence toujours par EUX :**
"J'ai vu que [quelque chose sur eux]. Beaucoup de [leur profil] ont comme défi [problème spécifique]. Est-ce que c'est quelque chose que vous rencontrez ?"

**Pourquoi ça change tout :** le prospect se demande "comment est-ce qu'il sait ça sur moi ?" — et ça crée de la curiosité, pas de la méfiance.`
    ],

    negociation: [
      `La négociation n'est pas un combat. C'est une conversation pour trouver un accord qui fonctionne pour les deux parties.

**Ce qu'il faut comprendre en premier :** le prospect qui négocie n'est pas ton ennemi. Il veut souvent acheter — il a juste besoin de se sentir respecté dans le processus.

**Règle de base :** défends ta valeur calmement et avec conviction. Si tu paniques face à une contre-offre, ça se voit — et ça affaiblit ta position.

**Script simple :** "Je comprends que le budget est important. Voici ce que je peux faire dans ce cadre : [option adaptée]. Ce qui est non-négociable, c'est [élément core de valeur] — parce que c'est là que vous obtenez [résultat]."`,

      `**Technique du package vs. du prix.** Quand un prospect demande à baisser le prix, propose de modifier le package plutôt que de réduire le tarif.

**Exemple :**
"Si on réduisait le budget, voilà comment ça impacterait ce que vous obtenez : on retirerait [élément]. Est-ce que c'est quelque chose qui vous convient ?"

**Ce que ça fait :** le prospect réalise ce qu'il perdrait. Souvent, il préfère payer le prix initial plutôt que d'enlever une partie de la valeur.

**Avantage pédagogique :** tu lui apprends à relier valeur et prix — ce qui rend future les négociations plus faciles.`
    ],

    motivation: [
      `Il y a des jours difficiles en vente — c'est normal et c'est universel. La différence entre ceux qui progressent et ceux qui stagnent, c'est ce qu'ils font les jours où ils n'ont pas envie.

**Une chose à retenir :** l'action précède la motivation, pas l'inverse. Attendre d'avoir envie pour travailler, c'est attendre indéfiniment.

**Exercice du "2 minutes" :** La prochaine fois que tu n'as pas envie, dis-toi "je fais ça 2 minutes et j'arrête si je veux." 9 fois sur 10, tu continues bien au-delà.

**Action immédiate :** quelle est la UNE chose que tu reportes depuis quelques jours ? Fais-la maintenant. Juste ça.`,

      `**La motivation par les petites victoires.** Si tes objectifs sont trop grands, le cerveau se protège en procrastinant.

**Solution :** découpe en objectifs quotidiens si petits qu'ils semblent presque trop faciles.

Exemple :
- Pas "closer 10 clients ce mois" → "Envoyer 3 messages de prospection ce matin."
- Pas "améliorer mon closing" → "Essayer une nouvelle question de closing sur le prochain appel."

**Principe :** chaque petite victoire crée de la dopamine et renforce le comportement. C'est scientifique. Et ça s'accumule vite.`
    ],

    default: [
      `Je suis là pour t'aider à progresser. Pour que je puisse te donner quelque chose d'utile, dis-moi :
- Sur quoi veux-tu travailler aujourd'hui ?
- Où est-ce que tu te sens bloqué en ce moment ?
- Quel est l'aspect de la vente qui te pose le plus de problèmes ?

On part de là et on avance étape par étape.`,

      `Bonne chose de vouloir progresser — c'est déjà un grand pas.

Pour que mon accompagnement soit personnalisé, j'ai besoin d'un peu de contexte. Dis-moi : qu'est-ce qui t'a amené ici aujourd'hui ? Un appel qui s'est mal passé ? Une étape qui coince régulièrement ? Un sujet que tu veux consolider ?

On commence par là.`
    ]
  },

  // ── ARCHITECTE DU POUVOIR ─────────────────────────────────────────
  architecte: {

    objection: [
      `**Vérité brute.** L'objection ne te tue pas — ta réaction à l'objection te tue.

Tu as peur de la résistance du prospect parce que quelque part, tu doutes toi-même de ta valeur. C'est là que le travail commence.

**Recadrage immédiat :** l'objection est une information, pas un rejet. Celui qui panique face à une objection signale son manque de conviction — et le prospect le ressent instantanément.

**Exercice de conditionnement :** La prochaine fois qu'on te donne une objection, respire, souris intérieurement, et dis-toi : "Parfait. Maintenant je sais ce que je dois traiter." Réponds depuis cette position — pas depuis la peur.`,

      `**Déconstruction.** Tu reviens sur les objections parce que tu ne t'es pas encore attaqué à la vraie source : ton rapport à la pression.

La pression d'une objection n'est pas une menace. C'est une invitation à montrer si tu crois vraiment en ce que tu vends.

**Question directe :** Est-ce que tu crois à 100% que ce que tu vends résout le problème du prospect ? Pas 80%. Pas "ça dépend". 100%.

Si non → travaille d'abord ça. Un vendeur qui doute se trahit. Toujours.
Si oui → alors l'objection n'a aucun pouvoir sur toi. Agis en conséquence.`,

      `**Niveau supérieur : utiliser l'objection comme levier.**

Les vendeurs ordinaires répondent aux objections. Les vendeurs d'élite les utilisent pour renforcer leur position.

**Exemple :**
Prospect : "C'est trop cher."
Toi : "C'est une bonne observation. Et c'est précisément parce que c'est un investissement significatif qu'il est important qu'on s'assure ensemble que c'est exactement ce dont vous avez besoin. Qu'est-ce qui vous ferait dire que ça vaut chaque euro ?"

**Ce qui se passe :** tu retournes la pression. Tu transformes l'objection en discussion sur la valeur — que tu contrôles.`,

      `**Diagnostic dur.** Si la même objection revient appel après appel, tu n'as pas un problème de réponse — tu as un problème de positionnement ou de qualification.

**Questions à te poser :**
1. Prospectes-tu les bonnes personnes (qui ont le budget et le problème) ?
2. Établis-tu la valeur AVANT de parler de prix ?
3. Ou est-ce que tu espères que le prospect "comprendra" sans que tu lui expliques réellement ?

**Action :** Analyse tes 5 derniers appels où l'objection prix est apparue. Identifie à quelle minute elle est arrivée et ce qui s'est passé dans les 5 minutes précédentes.`
    ],

    closing: [
      `**Le closing c'est un test de ta conviction — pas une technique.**

Si tu hésites à demander, c'est que tu n'es pas encore dans l'état d'esprit du leader. Le leader ne demande pas la permission — il guide vers la décision évidente.

**Recadrage :** tu ne "demandes" pas une vente. Tu proposes une solution à un problème réel. Si le problème est réel et la solution est bonne, closer est un acte de service — pas d'agression.

**Script à intégrer dans ton identité :**
"Voilà ce que je te propose. C'est la prochaine étape logique. On y va ?"

Pas "est-ce que vous voulez bien ?". Pas "si vous êtes d'accord". C'est une invitation ferme, pas une supplication.`,

      `**Tu perds des ventes par manque de cadre, pas par manque de technique.**

Le closing raté, c'est souvent le résultat d'un appel où tu as laissé le prospect mener. Résultat : il n'y a pas de momentum, pas de direction, et le prospect dit "je vais réfléchir" parce que personne n'a créé l'urgence de décider maintenant.

**Règle :** Reprends le cadre dès le début de chaque appel. "Voilà comment on va structurer les 30 prochaines minutes. À la fin, on verra ensemble si c'est pertinent pour vous ou non. Ça vous va ?"

Avec ce cadre posé, le closing devient naturel — il fait partie du déroulé.`,

      `**Closing et discipline mentale.** La plupart des closes ratés ne sont pas techniquement mauvais. Ils sont émotionnellement instables.

Tu sens le prospect résister — tu te rétractes. Tu ajustes ton prix — tu signales la faiblesse. Tu proposes de rappeler — tu abandonnes le terrain.

**Ce que je veux que tu intègres :** calme absolu face à la résistance. Pas de l'arrogance — de la solidité. La résistance du prospect n'est pas ta priorité. Rester ancré dans ta valeur est ta priorité.

**Pratique :** enregistre tes appels. Écoute ta voix au moment du closing. Est-elle ferme ? Ou est-ce qu'elle monte, s'accélère, cherche une approbation ?`
    ],

    prospection: [
      `**Stop aux excuses de prospection.** "Je ne sais pas quoi dire", "j'ai peur de déranger", "ils vont me rejeter" — ce sont des constructions mentales, pas des réalités.

La vérité : le rejet en prospection n'existe pas. Quelqu'un qui ne répond pas n'est pas un rejet — c'est une information. Quelqu'un qui dit non est honnête — c'est plus précieux que quelqu'un qui évite.

**Discipline quotidienne :** 5 nouveaux contacts par jour. Sans exception. Sans condition. Sans "mais". Pendant 21 jours. Mesure le résultat. Tu ne pourras plus revenir en arrière.`,

      `**La prospection révèle ton rapport à l'inconfort.** Et ceux qui évitent l'inconfort de la prospection choisissent la souffrance plus lente : l'absence de clients, l'absence de revenu, la dépendance.

**Question directe :** Qu'est-ce qui est plus inconfortable — 5 minutes de prospection, ou 30 jours sans ventes ?

Décide de ce que tu choisis. Vraiment. Puis agis en conséquence.

**Structure de séance de prospection :** bloc de 45 minutes, pas de distractions, 10 contacts ciblés, revue des résultats. Répété 5 jours par semaine.`
    ],

    negociation: [
      `**Négociation : terrain mental avant tout.**

Celui qui entre dans une négociation en ayant peur de perdre le deal a déjà perdu. Tu te coupes les jambes toi-même.

**Travail à faire avant chaque négociation importante :**
1. Définis ton prix plancher (en dessous duquel tu ne descends pas — jamais)
2. Définis ta BATNA (meilleure alternative si ça ne se fait pas)
3. Rentre avec l'intention de trouver le meilleur accord possible, mais avec la volonté de partir si c'est sous ton seuil.

**Ce que ça change :** quand tu peux partir, tu n'as plus peur. Et quand tu n'as plus peur, tu négocies infiniment mieux.`,

      `**L'ego en négociation te coûte de l'argent.**

Si tu cèdes pour ne pas décevoir le prospect, ou si tu t'accroches à ton prix par orgueil — les deux sont des erreurs émotionnelles, pas stratégiques.

**Calibration :** la négociation n'est pas un duel. C'est une recherche d'accord. L'objectif n'est pas de "gagner" contre le prospect — c'est de trouver un accord où tu livres de la valeur à un prix qui te permet de le faire bien.

Détache ton ego du résultat. Reste logique. Reste ferme sur la valeur. Sois flexible sur les modalités.`
    ],

    motivation: [
      `**La vérité sur la motivation : elle ne vient pas — elle se construit.**

Attendre d'être motivé pour agir est l'erreur la plus coûteuse que tu peux faire. La motivation suit l'action — elle ne la précède pas.

**Discipline vs motivation :** la discipline c'est faire ce qui est nécessaire indépendamment de ton état. C'est ça qui crée les résultats durables. La motivation c'est un bonus, pas un prérequis.

**Ce que je te demande :** Identifie l'action que tu as évitée aujourd'hui par manque de "motivation". Fais-la maintenant. Pas dans 10 minutes. Maintenant.`,

      `**Recadrage brutal de l'excuses.** "Je ne suis pas motivé" signifie en réalité l'une de ces choses :
1. Tu n'as pas d'objectif assez clair (tu ne sais pas pourquoi tu le fais)
2. Tu n'as pas assez souffert de l'inaction (la douleur de rester pareil est encore supportable)
3. Tu t'es habitué à la médiocrité acceptable (c'est la pire des trois)

**Question :** Lequel de ces 3 points te correspond ? Sois honnête. La réponse indique le vrai travail à faire.`,

      `**Construire une identité de performance.** La motivation fluctue. L'identité tient.

Si tu te vois comme "quelqu'un qui fait l'effort même quand ce n'est pas facile", tu agis différemment que si tu attends d'être inspiré.

**Exercice d'identité :** Écris la phrase suivante et lis-la chaque matin pendant 30 jours : "Je suis le type de vendeur qui [qualité que tu veux incarner]. Quoi qu'il arrive."

Ça peut sembler simple. C'est en réalité l'un des exercices les plus puissants pour reprogrammer un pattern de comportement.`
    ],

    default: [
      `Je suis là. Mais je ne travaille pas avec des messages vagues.

Dis-moi précisément : qu'est-ce qui ne va pas ? Où est le blocage réel — mental, technique, ou organisationnel ?

Plus tu es spécifique, plus je peux t'être utile. Je ne t'offre pas de réconfort facile. Je t'offre un diagnostic honnête et une direction claire.`,

      `**L'Architecte t'écoute.** Mais avant de répondre, je veux savoir une chose :

Quelle est la situation exacte que tu veux changer — et pourquoi elle existe encore ?

Pas les symptômes. La cause. Si tu ne connais pas la cause, on commence par là.`
    ]
  },

  // ── LE PROFILEUR DISC ────────────────────────────────────────────
  profileur: {

    disc: [
      `**Analyse DISC en cours.** Pour profiler correctement, j'ai besoin d'indices comportementaux.

**Profil D — Dominant :**
Il parle vite, pose des questions directes ("Quel est le ROI ?"), interrompt, veut les chiffres. Il veut le contrôle et les résultats.
→ Sois direct, efficace, propose 2 options maximum. Ne noie pas de détails.

**Script adapté au D :**
"En résumé : [résultat en chiffres]. La prochaine étape c'est [action simple]. On y va ?"`,

      `**Profil I — Influent :**
Il parle beaucoup, partage des anecdotes, cherche à créer du lien. Il décide avec ses émotions et veut être enthousiaste à propos de toi.
→ Crée la connexion avant la solution. Enthousiasme, histoires, vision.

**Signaux I :** "Mon équipe va adorer ça !", beaucoup de "on", questions sur le "comment c'est de travailler avec vous ?"

**Script adapté au I :**
"Imaginez dans 6 mois — votre équipe maîtrise [compétence], les résultats ont changé, vous êtes fiers de l'avoir mis en place. C'est ça que vous voulez, non ?"`,

      `**Profil S — Stable :**
Calme, attentif, peu expressif. Il ne dit pas non — il dit "je dois y réfléchir." Il a besoin de sécurité, de temps, de consensus.
→ Ne pousse jamais un S. Sécurise, rassure, donne du temps, implique son entourage.

**Signaux S :** questions sur le support post-achat, "et si ça ne marche pas ?", longs silences, recherche d'accord avec l'équipe.

**Script adapté au S :**
"Je comprends que c'est une décision importante. Voilà ce qu'on a mis en place pour s'assurer que vous n'êtes jamais seul dans ce processus : [support, garantie, suivi]. Est-ce que ça vous rassure ?"`,

      `**Profil C — Consciencieux :**
Analytique, précis, pose beaucoup de questions techniques. Il veut les données, les preuves, les comparaisons, les garanties contractuelles.
→ Prépare des données solides. Ne sois pas émotionnel. Donne-lui du temps pour analyser.

**Signaux C :** demande de documentation, questions très précises sur les modalités, silences longs pour traiter l'information.

**Script adapté au C :**
"Je peux vous envoyer l'étude de cas complète avec les chiffres avant notre prochaine discussion. Ça vous permettra d'analyser ça en détail et d'arriver avec vos questions."

**Ne jamais faire avec un C :** le précipiter, lui envoyer des émotions, minimiser ses questions.`,

      `**Comment identifier le profil quand tu n'es pas sûr ?**

**Test de la question ouverte.** Pose : "Comment vous voyez idéalement la suite ?"

- Répond avec des chiffres/résultats → **D**
- Répond avec de l'enthousiasme/la vision → **I**
- Répond avec des questions sur le processus/la sécurité → **S**
- Répond avec des questions techniques ou demande à réfléchir → **C**

**En vente :** 60% des prospects sont S ou C. Si tu n'adaptes pas, tu perds la majorité silencieuse.`
    ],

    objection: [
      `**Objection vue sous l'angle DISC.**

Chaque profil objecte différemment — et chaque objection demande une réponse adaptée au profil.

**D objection "trop cher" :** en réalité, il veut savoir si le ROI est là.
→ "Le retour sur investissement moyen de nos clients est de X sur Y semaines. C'est ce ratio qui vous intéresse ?"

**I objection "je dois réfléchir" :** il n'est pas encore enthousiaste à 100%.
→ "Qu'est-ce qui vous ferait dire que vous êtes 100% partant ?"

**S objection "pas le bon moment" :** il a peur du changement.
→ "Je comprends. Quelle serait la situation idéale pour vous sentir prêt ?"

**C objection "j'ai des questions sur..." :** il manque d'informations.
→ "Excellente question. Voici les données précises : [réponse factuelle]."`,

      `**La même objection, 4 réponses différentes selon le profil.**

Cas pratique : "C'est trop cher."

**Réponse D :** "Par rapport à quel résultat attendu ? [Chiffres] → Si vous atteignez ça, le ratio est [X]. C'est rentable ?"

**Réponse I :** "Je comprends. Ce que nos clients disent souvent c'est qu'après les 3 premiers mois, ils n'imaginent plus se passer de [solution]. Qu'est-ce qui vous ferait vivre ça ?"

**Réponse S :** "C'est normal d'avoir ce questionnement. Est-ce que c'est le budget en lui-même, ou c'est que vous n'êtes pas encore certain que c'est le bon choix pour vous ?"

**Réponse C :** "Je comprends. Je peux vous envoyer une analyse comparée avec les alternatives du marché. Ça vous permettrait d'évaluer de manière objective."`,

      `**Exercice de calibration DISC.** Décris-moi le comportement exact de ton prospect lors de la dernière objection — ses mots, son ton, ses questions.

Je vais identifier son profil et te donner le script de réponse exact adapté à lui.

**Format de description utile :**
- Ce qu'il a dit mot pour mot
- Comment il a dit ça (ton, vitesse, émotion)
- Ce qu'il a fait après (posé une question, raccroché, attendu)

Plus tu es précis, plus mon analyse est utile.`
    ],

    closing: [
      `**Closing adapté au profil DISC.**

**Closer un D :** Direct et rapide. "On y va ?" — pas plus. Il décide vite si la valeur est claire.

**Closer un I :** Créer l'excitation de la vision. "Imaginez dans 3 mois quand [résultat] — c'est ça que vous voulez ?"

**Closer un S :** Sécuriser l'après. "On a mis en place un suivi complet pour que vous n'ayez jamais l'impression d'être seul — voilà exactement ce qui se passe après votre décision."

**Closer un C :** Confirmer la logique. "Sur la base de l'analyse qu'on a faite ensemble, est-ce que vous avez les informations nécessaires pour décider ?"

**Erreur classique :** utiliser le même script de closing pour tout le monde. Le D trouve un closing "S" mou. Le S trouve un closing "D" agressif. Adapte.`,

      `**Le timing du closing selon le profil.**

**D :** Close tôt. Dès que la valeur est établie. Il n'aime pas les calls trop longs.

**I :** Close quand l'enthousiasme est au pic. Dès qu'il dit "j'adore ça !" — propose l'étape suivante immédiatement.

**S :** Ne close jamais sous pression. Donne-lui l'impression qu'il décide à son rythme. "Qu'est-ce qui vous permettrait de vous sentir prêt ?"

**C :** Close seulement après avoir répondu à TOUTES ses questions. Un C qui a encore des questions n'achète pas. Un C dont toutes les questions sont répondues achète avec confiance.`
    ],

    prospection: [
      `**Prospection adaptée au profil cible.**

**Si tu prospectes des D :**
Message ultra-court avec résultat chiffré. "En 60 jours, [résultat précis]. Intéressé ?"

**Si tu prospectes des I :**
Message avec vision et inspiration. "Imaginez une équipe qui [résultat positif]. C'est ce sur quoi on travaille avec [profils similaires]."

**Si tu prospectes des S :**
Message rassurant avec preuve sociale. "Beaucoup de [leur profil] utilisent [solution] depuis [X] ans. Voilà comment ça a changé leur quotidien."

**Si tu prospectes des C :**
Message avec données et logique. "Étude récente : [chiffre] des [leur secteur] ont [résultat] en utilisant [méthode]. Je peux vous envoyer l'analyse."

**Action :** identifie le profil dominant de ta cible principale et reécris ton message de prospection pour ce profil.`
    ],

    default: [
      `Je suis spécialisé en psychologie comportementale DISC.

Voici ce sur quoi je peux t'aider aujourd'hui :
- **Identifier le profil** d'un prospect à partir de son comportement
- **Adapter ton discours** selon le profil (D, I, S ou C)
- **Scripts spécifiques** par profil pour chaque situation de vente
- **Simulation de prospect DISC** — je joue le rôle du prospect, tu pratiques

Décris-moi un prospect, une situation, ou dis-moi quel profil tu veux travailler.`,

      `**Les 4 profils DISC en une phrase :**

**D (Dominant)** → Il veut des résultats. Parle chiffres et efficacité.
**I (Influent)** → Il veut l'enthousiasme. Parle vision et connexion.
**S (Stable)** → Il veut la sécurité. Parle garanties et processus.
**C (Consciencieux)** → Il veut les preuves. Parle données et logique.

Lequel veux-tu apprendre à closer aujourd'hui ? Ou décris-moi un prospect et je l'identifie pour toi.`
    ]
  }
};

// ── ESCALATION BANK — Réponses quand un topic revient (récurrence ≥ 2) ──
const ESCALATION_BANK = {

  stratege: {
    objection: [
      `**Ce n'est plus la première fois qu'on travaille sur les objections.**

Nouveau diagnostic : ton problème n'est pas la réponse à donner — c'est l'état dans lequel tu arrives à ce moment-là.

Le prospect sent la tension avant même que tu répondes. Ce qu'on doit corriger maintenant : **ton ancrage émotionnel face à la résistance.**

**Exercice cette semaine :** sur chaque appel, quand une objection arrive, fais une pause d'une seconde complète avant de répondre. Une seconde. Rien d'autre. Observe ce que ça change dans le ton de ta réponse.`,

      `**On a déjà analysé les objections. Le problème est plus profond.**

Si les mêmes objections reviennent, c'est que ta phase de qualification ne filtre pas assez. Tu arrives en closing avec des prospects qui n'ont pas encore articulé leur propre douleur.

**La vraie correction :** reviens en phase de découverte. Avant de parler solution, tu dois faire dire au prospect, avec ses propres mots : "Voilà pourquoi je dois changer ça maintenant."

Tant que ce n'est pas dit, aucune technique de closing ne compensera.`
    ],
    closing: [
      `**Troisième fois sur le closing.** Le problème n'est plus technique.

Analyse : tu connais les scripts. Tu sais quoi dire. Mais tu n'arrives pas à le faire naturellement.

**Ce qu'on doit travailler : la congruence.** Est-ce que tu crois que ce que tu vends est exactement ce dont ce prospect a besoin ? Pas "généralement" — pour CE prospect spécifique ?

Si la réponse est "pas sûr" → le prospect le ressent. Corrige d'abord ça. La technique vient après.`,

      `**Deeper level.** On a travaillé les scripts de closing. Si ça ne fonctionne pas encore, la cause est dans ta préparation d'appel — pas dans le closing lui-même.

**Checklist avant chaque appel :** (1) Ai-je préparé 3 questions de découverte profondes ? (2) Connaissais-je le profil du prospect avant l'appel ? (3) Avais-je une idée de son budget estimé ?

Si une de ces réponses est non → tu arrives en closing à l'aveugle. Le closing ne sauve pas un call mal préparé.`
    ],
    default: [
      `On a déjà travaillé ce sujet. Aujourd'hui on va plus loin.

Donne-moi un exemple concret et récent — une situation réelle, pas théorique. Je vais t'identifier exactement où ça se casse maintenant.`
    ]
  },

  mentor: {
    objection: [
      `On a déjà exploré plusieurs approches pour les objections. Je vois que c'est encore un point de blocage — et c'est tout à fait normal. Certains concepts demandent plusieurs expositions avant de vraiment s'ancrer.

**Ce qu'on va faire différemment cette fois :** plutôt que de voir une nouvelle technique, on va analyser ensemble un appel réel. Décris-moi la dernière objection mot pour mot, et ce que tu as répondu. On va décortiquer ensemble ce qui s'est passé.`,

      `Je suis contente que tu reviennis sur ce sujet — ça veut dire que tu prends ta progression au sérieux.

Si les objections reviennent encore, c'est souvent qu'il y a un décalage entre comprendre la technique et l'appliquer avec naturel sous pression.

**Exercice de simulation :** je vais jouer le prospect. Tu vas répondre à l'objection. On fait ça 3 fois, on ajuste à chaque fois. Prêt ? Commence par me dire quelle objection tu veux pratiquer.`
    ],
    closing: [
      `On a déjà vu plusieurs méthodes pour le closing. Ce n'est pas un problème de technique — c'est probablement une question de confiance ou d'état interne.

Nouvelle approche : **la désensibilisation progressive.** Cette semaine, l'objectif n'est pas de closer. L'objectif est de poser la question de closing même si tu n'es pas sûr de la réponse. Juste pratiquer le geste. L'aisance viendra avec la répétition.

Combien de calls as-tu prévu cette semaine ? Je veux qu'on se fixe un objectif simple et mesurable.`
    ],
    default: [
      `On a travaillé ensemble sur plusieurs sujets. Pour progresser différemment cette fois, dis-moi : qu'est-ce qui a changé depuis notre dernière session sur ce sujet ?

Ça m'aidera à comprendre où tu en es réellement et à t'apporter quelque chose de nouveau.`
    ]
  },

  architecte: {
    objection: [
      `**Cette objection revient — et ça me dit quelque chose de précis sur toi.**

Tu bloques à ce moment-là parce que tu n'as pas encore résolu ton rapport à la valeur de ce que tu vends. Ce n'est pas un problème de script. C'est un problème de conviction.

**Question directe :** Est-ce que tu vendrais ce produit à ta mère, ton meilleur ami, quelqu'un que tu aimes — si tu pensais que ça allait vraiment les aider ?

Si la réponse est oui → vends avec cette conviction. Si la réponse est non → change ce que tu vends.`,

      `**On tourne en rond sur les objections.**

Je vais être direct : tu utilises les objections comme excuse pour ne pas te confronter au vrai problème. Le vrai problème c'est que tu n'as pas encore développé l'identité d'un vendeur qui ne plie pas.

**30 jours de discipline :** chaque jour, un appel inconfortable. Pas l'appel facile. L'appel où tu vas trébucher. Et tu te relèves. Et tu refais.

C'est là que l'identité se construit.`
    ],
    default: [
      `On a déjà travaillé ça. Je vais te donner quelque chose de différent.

Décris-moi une situation RÉCENTE et CONCRÈTE. Pas une situation abstraite. Quelque chose qui s'est passé cette semaine. Le contexte exact, les mots exacts, le résultat exact.

À partir de là, je te donne un diagnostic précis sur ce qu'il faut changer — et pourquoi.`
    ]
  },

  profileur: {
    disc: [
      `On a déjà travaillé les profils DISC. Maintenant on va plus loin : **les profils mixtes et les comportements adaptatifs.**

Beaucoup de prospects ont un profil DISC primaire et un secondaire. Par exemple, un D/C sera direct ET analytique. Un I/S sera enthousiaste mais cherchera la sécurité.

**Comment identifier le profil secondaire :** observe comment il réagit sous pression. Le profil secondaire émerge quand le prospect se sent challengé ou incertain.

Décris-moi un prospect récent et je t'aide à identifier son profil mixte.`,

      `**Nouveau niveau DISC : les pièges par profil.**

Ce qui fait RATER la vente avec chaque profil, c'est souvent de trop en faire :
- **Trop D** avec quelqu'un : il se braque (il veut contrôler)
- **Trop I** avec quelqu'un : il ne te prend pas au sérieux
- **Trop S** avec quelqu'un : il pense que tu manques de conviction
- **Trop C** avec quelqu'un : il se noie dans les détails et n'avance pas

L'art du DISC, c'est doser — pas imiter.`
    ],
    default: [
      `On a déjà vu les bases DISC. Pour progresser, j'ai besoin d'un cas réel.

Décris-moi une vente récente qui n'a pas abouti. Je vais analyser quel profil le prospect avait, ce qui a probablement mal fonctionné dans l'approche, et ce qu'on aurait dû faire différemment.`
    ]
  }
};

// ── QUICK TOPICS par coach ────────────────────────────────────────
const QUICK_TOPICS = {
  stratege: [
    { label: '💬 Répondre aux objections',  message: 'Comment répondre à l\'objection "c\'est trop cher" de manière percutante ?' },
    { label: '🎯 Closer sans forcer',        message: 'Comment closer proprement sans que ça devienne agressif ?' },
    { label: '🔍 Qualifier le prospect',     message: 'Comment qualifier un prospect rapidement pour savoir s\'il vaut la peine d\'être closé ?' },
    { label: '💰 Défendre mon prix',         message: 'Comment défendre mon prix sans faire de remise ?' },
    { label: '📞 Structurer un appel',       message: 'Donne-moi une structure d\'appel de vente efficace de A à Z.' }
  ],
  mentor: [
    { label: '🎓 Bases du closing',          message: 'Je suis débutant, par où commencer pour apprendre à closer ?' },
    { label: '😰 Gérer le stress des appels', message: 'Comment gérer le stress et le trac avant et pendant un appel de vente ?' },
    { label: '❓ L\'objection "je réfléchis"', message: 'Que répondre quand un prospect me dit "je dois réfléchir" ?' },
    { label: '🗣️ Améliorer ma communication', message: 'Comment mieux communiquer et être plus clair dans mes présentations ?' },
    { label: '📈 Plan de progression',       message: 'Crée-moi un plan de progression simple pour m\'améliorer en vente sur 30 jours.' }
  ],
  architecte: [
    { label: '🔥 Briser mes blocages',       message: 'J\'ai du mal à passer à l\'action et je procrastine souvent. Aide-moi à sortir de ça.' },
    { label: '💪 Renforcer mon mindset',     message: 'Comment développer un mindset de vendeur d\'élite qui ne se laisse pas démonter ?' },
    { label: '⚡ Mode pression maximale',    message: 'Mets-moi en situation de pression : joue un prospect hostile et difficile, et coache-moi en temps réel.' },
    { label: '🧱 Sortir de la zone confort', message: 'Je reste trop dans ma zone de confort. Comment forcer le changement concrètement ?' },
    { label: '🎯 Discipline quotidienne',    message: 'Donne-moi un protocole de discipline quotidienne pour être au niveau pro.' }
  ],
  profileur: [
    { label: '🔬 Identifier un profil',      message: 'Comment identifier rapidement le profil DISC d\'un prospect en 5 minutes de conversation ?' },
    { label: 'D — Dominant',                 message: 'Explique-moi comment vendre à un profil D Dominant. Scripts et erreurs à éviter.' },
    { label: 'I — Influent',                 message: 'Comment adapter mon discours à un profil I Influent ? Qu\'est-ce qui le fait acheter ?' },
    { label: 'S — Stable',                   message: 'Comment rassurer et closer un profil S Stable qui hésite toujours ?' },
    { label: 'C — Consciencieux',            message: 'Comment convaincre un profil C Consciencieux qui veut tout analyser avant de décider ?' }
  ]
};

// ── Détection d'intent ────────────────────────────────────────────
function detectIntent(message) {
  const m = message.toLowerCase();

  // DISC en priorité pour le profileur
  if (/\bdisc\b|profil\s+(d|i|s|c)\b|dominant|influent|stable|consciencieux|comportem|psycholog|prospect.*(profil|type|personnali)/.test(m))
    return 'disc';

  if (/objection|trop cher|c'est cher|prix|budget|pas les moyen|pas le budget|on me dit que|on me dit encore/.test(m))
    return 'objection';

  if (/clos(er|ing|e)|signer|deal|je dois réfléch|je vais y réfléch|prendre la déci|décision finale|accord|contrat/.test(m))
    return 'closing';

  if (/prospect(er|ion)|contacter|message|linkedin|cold|email|trouver des client|générer des lead|démarcher/.test(m))
    return 'prospection';

  if (/négoci|remise|réduction|discount|rabais|contre.offre|baisser le prix/.test(m))
    return 'negociation';

  if (/motiv|envie|bl(o|ô)c|peur|confiance|stress|trac|anxi|déc|dépress|flemm|procrastin|doute|déprim/.test(m))
    return 'motivation';

  return 'default';
}

// ── Détection mode Architecte ─────────────────────────────────────
function detectArchitecteMode(message) {
  const m = message.toLowerCase();
  if (/excuse|bl(o|ô)c|peur|flemm|pas envie|motiv|procrastin|doute|confiance|mentali|mindset|discipline/.test(m))
    return 'pression';
  if (/analys|stratégi|structur|méthode|technique|script|tactique|diagnostic|process/.test(m))
    return 'stratege';
  return 'mentor';
}

// ── Message d'ouverture personnalisé ─────────────────────────────
function getOpeningMessage(coachId, memoryCtx) {
  const coach = COACHES[coachId];
  const msgs  = coach.openingMessages;

  if (memoryCtx && !memoryCtx.isFirstSession && memoryCtx.totalMessages > 0) {
    const name = memoryCtx.userName ? `, ${memoryCtx.userName}` : '';
    const scoreLines = memoryCtx.lowScores && memoryCtx.lowScores.length > 0
      ? `\n\nOn va continuer à travailler sur **${memoryCtx.lowScores[0].skill}** — c'est là où il y a le plus à gagner.`
      : '';
    return `Bon retour${name}. On reprend là où on s'est arrêtés.${scoreLines}`;
  }

  const idx = Math.floor(Math.random() * msgs.length);
  return msgs[idx];
}

// ── Génération de réponse — Memory-aware ─────────────────────────
function generateResponse(coachId, userMessage, history, memoryCtx) {
  const intent     = detectIntent(userMessage);
  const coachBank  = RESPONSE_BANK[coachId] || RESPONSE_BANK.mentor;
  const bankForIntent = coachBank[intent] || coachBank.default || RESPONSE_BANK.mentor.default;

  // Récurrence du topic
  const recurrence = memoryCtx ? memoryCtx.getTopicRecurrence(intent) : 0;

  // ── Mode escalation (topic revient pour la 2ème fois+) ────────────
  if (recurrence >= 2) {
    const escalCoach   = ESCALATION_BANK[coachId] || ESCALATION_BANK.stratege;
    const escalForTopic = escalCoach[intent] || escalCoach.default || [];
    if (escalForTopic.length > 0) {
      const escalIdx = (recurrence - 2) % escalForTopic.length;
      if (memoryCtx) memoryCtx.recordAngle(intent, -(escalIdx + 100)); // index négatif → escalation
      return escalForTopic[escalIdx];
    }
  }

  // ── Mode normal : anti-répétition par index ───────────────────────
  let chosenIndex;

  if (memoryCtx) {
    const available = memoryCtx.getAvailableAngles(intent, bankForIntent.length);
    chosenIndex = available[Math.floor(Math.random() * available.length)];
    memoryCtx.recordAngle(intent, chosenIndex);
  } else {
    chosenIndex = Math.floor(Math.random() * bankForIntent.length);
  }

  const response = bankForIntent[chosenIndex];
  return typeof response === 'function' ? response(memoryCtx) : response;
}

// ── Accès ─────────────────────────────────────────────────────────
function checkAccess() {
  try { return localStorage.getItem('atlas_access') === 'granted'; }
  catch(e) { return false; }
}

function grantAccess() {
  try { localStorage.setItem('atlas_access', 'granted'); } catch(e) {}
}

function validateCode(code) {
  if (ACCESS_CODES.includes(code.toUpperCase().trim())) {
    grantAccess();
    return true;
  }
  return false;
}

function getMessageCount(coachId) {
  try {
    const raw = localStorage.getItem(`atlas_msg_count_${coachId}`);
    return raw ? parseInt(raw, 10) : 0;
  } catch(e) { return 0; }
}

function incrementMessageCount(coachId) {
  try {
    localStorage.setItem(`atlas_msg_count_${coachId}`, getMessageCount(coachId) + 1);
  } catch(e) {}
}

// ── Exports globaux ───────────────────────────────────────────────
window.COACHES              = COACHES;
window.ACCESS_CODES         = ACCESS_CODES;
window.FREE_MESSAGES        = FREE_MESSAGES;
window.QUICK_TOPICS         = QUICK_TOPICS;
window.RESPONSE_BANK        = RESPONSE_BANK;
window.ESCALATION_BANK      = ESCALATION_BANK;
window.detectIntent         = detectIntent;
window.detectArchitecteMode = detectArchitecteMode;
window.generateResponse     = generateResponse;
window.getOpeningMessage    = getOpeningMessage;
window.checkAccess          = checkAccess;
window.validateCode         = validateCode;
window.getMessageCount      = getMessageCount;
window.incrementMessageCount= incrementMessageCount;
