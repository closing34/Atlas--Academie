// Atlas Académie — Formations Data
// Contenu extrait verbatim des PPTX Ultimate Closing Mastery
// PROPRIÉTAIRE — NE PAS MODIFIER LE CONTENU DES FORMATIONS

const ATLAS_FORMATIONS = {

  'ultimate-closing': {
    id: 'ultimate-closing',
    title: 'Ultimate Closing Mastery',
    subtitle: 'Les 10 Phases Universelles',
    description: 'La méthode terrain complète : 10 phases universelles pour maîtriser chaque étape de l\'entretien de vente — du premier contact à la décision finale.',
    duration: '9h',
    level: 'Tous niveaux',
    color: '#C0392B',
    icon: '🔥',
    modules: [

      {
        id: 'phase-1-attention',
        title: 'Phase 1 — Attention',
        subtitle: 'Capter en 5 secondes',
        lessons: [

          {
            id: 'p1-theorie',
            title: 'La Mécanique de l\'Attention',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 1 — Capter en 5 secondes</h2>

  <div class='lesson-intro'>
    <p>C'est la porte d'entrée du processus de vente. Les premières secondes décident si le prospect accepte de t'écouter ou te classe comme un vendeur à éviter.</p>
  </div>

  <h3>Closer débutant vs Closer expérimenté</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Closer débutant</span>
      <p>Essaie souvent d'expliquer ou de se présenter — erreur fatale. Le prospect l'a déjà étiqueté avant même qu'il ait terminé sa phrase.</p>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Closer expérimenté</span>
      <p>Ne cherche pas à informer. Il cherche d'abord à <strong>désarmer</strong>. Son rôle : interrompre le mode réflexe de rejet et créer une ouverture mentale, sans parler d'offre ni de produit.</p>
    </div>
  </div>

  <h3>Objectif de la Phase 1</h3>
  <div class='objective-block'>
    <p>Créer une réaction immédiate qui déclenche la micro-attention et instaure ton contrôle de l'échange.</p>
  </div>

  <h3>Trois éléments décident de ton efficacité</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Rythme</strong>
      <p>Lent, posé. Ne cours pas après son attention.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Silence</strong>
      <p>Marqué juste après la phrase. C'est lui qui crée la tension.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Absence de justification</strong>
      <p>Pas de présentation. Pas de "je m'appelle". Rien.</p>
    </div>
  </div>

  <h3>Explication simple et directe</h3>
  <p>Le cerveau humain agit par filtres. Si ta phrase ressemble à celle d'un commercial, elle sera automatiquement ignorée. Tu dois casser ce schéma. Une phrase simple, courte et inattendue permet cette rupture.</p>

  <div class='key-result'>
    <span class='result-icon'>✓</span>
    <p>Dès qu'il réagit — même par surprise —, tu as gagné le droit de continuer.</p>
  </div>

  <h3>Formule clé</h3>
  <div class='formula-block'>
    <span class='formula-item'>Rupture</span>
    <span class='formula-plus'>+</span>
    <span class='formula-item'>Silence</span>
    <span class='formula-plus'>+</span>
    <span class='formula-item'>Réaction</span>
    <span class='formula-equals'>=</span>
    <span class='formula-result'>Bonne accroche</span>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Passe à la Phase 2 quand : le prospect t'a regardé, répondu ou s'est arrêté. <strong>Même une micro-réaction suffit.</strong></p>
    <p><em>Tu n'attends pas l'intérêt — tu passes.</em></p>
  </div>
</div>`,
            keyPoints: [
              'Le cerveau filtre automatiquement les phrases commerciales — tu dois créer une rupture cognitive',
              'Trois éléments clés : rythme lent, silence après la phrase, absence totale de justification',
              'Ne jamais se présenter avant d\'avoir obtenu une réaction',
              'Le silence après l\'accroche crée la tension — c\'est lui qui fait réagir',
              'Signal de passage : toute micro-réaction suffit — tu n\'attends pas l\'intérêt'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 1 Attention',
              cards: [
                { front: 'Quel est le rôle de la Phase 1 ?', back: 'Interrompre le mode réflexe de rejet et créer une ouverture mentale, sans parler d\'offre ni de produit.' },
                { front: 'Quels sont les 3 éléments qui décident de l\'efficacité de l\'accroche ?', back: '1. Rythme lent et posé 2. Silence marqué après la phrase 3. Absence totale de justification ou de présentation' },
                { front: 'Pourquoi ne faut-il pas se présenter en Phase 1 ?', back: 'Le cerveau humain filtre automatiquement les phrases commerciales. Une présentation te classe immédiatement comme un vendeur à éviter.' },
                { front: 'Quelle est la formule d\'une bonne accroche ?', back: 'Rupture + Silence + Réaction = Bonne accroche' },
                { front: 'Quel est le signal de passage vers la Phase 2 ?', back: 'Le prospect t\'a regardé, répondu ou s\'est arrêté. Même une micro-réaction suffit. Tu n\'attends pas l\'intérêt — tu passes.' }
              ]
            }
          },

          {
            id: 'p1-script',
            title: 'Scripts & Mise en Pratique',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 1 — Scripts d'Accroche</h2>

  <h3>Version Stand — Script Pare-brise</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Le pare-brise va bien ?"</span>
    </div>
    <div class='script-action'>(Silence)</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Pas d'impact, pas de fissure ?"</span>
    </div>
    <div class='script-action'>(Réponse)</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"C'est justement pour ça que je vous arrête."</span>
    </div>
  </div>

  <h3>Version Call — Filtre Secrétaire</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Bonjour, Monsieur Guiné à l'appareil. Je souhaite parler à Monsieur [Nom]."</span>
    </div>
    <div class='script-line'>
      <span class='script-speaker'>Secrétaire</span>
      <span class='script-text'>"C'est à quel sujet ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Je vois ça directement avec lui."</span>
    </div>
  </div>

  <h3>Pourquoi ces scripts fonctionnent</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'>
      <span class='analysis-num'>1</span>
      <strong>Rupture cognitive</strong>
      <p>Ces scripts fonctionnent parce qu'ils créent une rupture cognitive.</p>
    </div>
    <div class='analysis-item'>
      <span class='analysis-num'>2</span>
      <strong>La première question</strong>
      <p>Elle déclenche un réflexe : elle n'a aucun lien visible avec une vente.</p>
    </div>
    <div class='analysis-item'>
      <span class='analysis-num'>3</span>
      <strong>Le silence</strong>
      <p>Il génère une légère tension — le cerveau veut combler le vide et répond.</p>
    </div>
    <div class='analysis-item'>
      <span class='analysis-num'>4</span>
      <strong>Version call</strong>
      <p>Elle contourne les filtres administratifs par l'ancrage du nom et du ton : tu établis ton statut sans confrontation.</p>
    </div>
  </div>

  <h3>À ne pas faire</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Se présenter avant d'avoir obtenu une réaction</div>
    <div class='error-item'>✗ Parler sans marquer de pause après la phrase d'accroche</div>
    <div class='error-item'>✗ Sourire de façon insistante ou adopter un ton trop commercial</div>
    <div class='error-item'>✗ Expliquer l'objet de ta visite avant que le prospect ait réagi</div>
  </div>

  <h3>Le script ne vend pas — il positionne</h3>
  <div class='principle-block'>
    <p>L'autorité se construit avant même la proposition.</p>
  </div>
</div>`,
            keyPoints: [
              'Stand : "Le pare-brise va bien ?" (Silence) "Pas d\'impact, pas de fissure ?" — c\'est justement pour ça que je vous arrête',
              'Call : ancrer le nom et le ton pour contourner le filtre secrétaire sans confrontation',
              'Indicateur de réussite : réaction en moins de 3 secondes',
              'Objectif stand : 1 réponse pour 8 passages maximum — si plus, travaille le débit pas la phrase',
              'Ne jamais montrer le stand ou le support visuel avant une réaction verbale'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 1',
              scenario: 'Tu viens d\'effectuer une approche sur stand (ou par téléphone). Évalue ton accroche sur les 5 critères suivants :',
              steps: [
                'Ai-je créé une réaction immédiate ?',
                'Ai-je marqué un silence complet après ma phrase ?',
                'Ai-je évité toute présentation ou justification ?',
                'Mon ton transmet-il une certitude calme ?',
                'Le prospect a-t-il posé une question ou réagi physiquement ?'
              ],
              idealAnswer: '5/5 = ouverture réussie — passe à la Phase 2. Moins de 5/5 : identifie le critère manquant et recommence. 1 réponse pour 8 passages = bon ratio stand.'
            }
          }

        ]
      },

      {
        id: 'phase-2-legitimite',
        title: 'Phase 2 — Légitimité',
        subtitle: 'Être crédible instantanément',
        lessons: [

          {
            id: 'p2-theorie',
            title: 'Installer la Crédibilité',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Phase 2 — Être crédible instantanément</h2>

  <div class='lesson-intro'>
    <p>Le prospect est attentif — il évalue désormais qui tu es. En quelques secondes, il juge ton professionnalisme : attitude, ton et fonction perçue. C'est ici que tu bascules d'interruption à conversation sérieuse.</p>
  </div>

  <div class='warning-block'>
    <p>Sans légitimité, tout effort est vain : il t'écoute mais n'accorde pas de poids à tes mots. Tu installes cette crédibilité par la présence, pas par les mots.</p>
  </div>

  <h3>Objectif de la Phase 2</h3>
  <div class='objective-block'>
    <p>Obtenir une écoute pleine et imposer ton rôle de référent dès ta première phrase complète.</p>
  </div>

  <h3>Principe fondamental</h3>
  <p><strong>La légitimité ne se demande pas — elle se démontre.</strong> Tu remplaces les formules modestes par des affirmations professionnelles.</p>

  <div class='comparison-table'>
    <div class='ct-header'>
      <span class='ct-bad'>✕ À éviter</span>
      <span class='ct-good'>✓ À dire</span>
    </div>
    <div class='ct-row'>
      <span class='ct-bad'>"Je voulais vous proposer…"</span>
      <span class='ct-good'>"Je m'occupe de…"</span>
    </div>
    <div class='ct-row'>
      <span class='ct-bad'>"J'aimerais vous montrer…"</span>
      <span class='ct-good'>"Je gère…"</span>
    </div>
    <div class='ct-row'>
      <span class='ct-bad'>"Je peux vous aider ?"</span>
      <span class='ct-good'>"Je dois vérifier…"</span>
    </div>
  </div>

  <p>Ce ton crée une hiérarchie implicite : tu es celui qui sait, qui observe et qui dirige le processus. Le client comprend qu'il n'a pas à décider si la discussion aura lieu — seulement comment elle se déroulera.</p>

  <h3>Règle absolue</h3>
  <div class='rule-block'>
    <p><strong>Aucun ton ascendant en fin de phrase.</strong></p>
    <p>Si ta voix monte, tu perds ton autorité instantanément. Ton rythme vocal doit rester lent et régulier. Le calme inspire confiance.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Passe à la Phase 3 quand : tu sens l'écoute installée — il ne cherche plus à partir, son corps s'est légèrement tourné vers toi, ou il a hoché la tête.</p>
    <p><em>Tu n'attends pas de validation verbale — tu passes.</em></p>
  </div>
</div>`,
            keyPoints: [
              'La légitimité ne se demande pas — elle se démontre par des affirmations directes',
              'Remplacer "je voulais" par "je m\'occupe" — remplacer "j\'aimerais" par "je dois vérifier"',
              'Aucun ton ascendant en fin de phrase — la voix qui monte = perte d\'autorité immédiate',
              'Rythme vocal lent et régulier — le calme inspire confiance',
              'Signal de passage : écoute installée, corps tourné vers toi ou hochement de tête'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 2 Légitimité',
              cards: [
                { front: 'Quel est le principe fondamental de la Phase 2 ?', back: 'La légitimité ne se demande pas — elle se démontre. Tu remplaces les formules modestes par des affirmations professionnelles.' },
                { front: 'Que signifie "aucun ton ascendant en fin de phrase" ?', back: 'Si ta voix monte en fin de phrase, tu transformes une affirmation en question. Tu perds ton autorité instantanément. La voix reste basse et plate.' },
                { front: 'Quelles formulations sont interdites en Phase 2 ?', back: '"Je voulais vous proposer", "J\'aimerais vous montrer", "Je peux vous aider ?". Ces formules montrent que tu es en demande.' },
                { front: 'Que disent les formules "Je m\'occupe" et "Je dois vérifier" ?', back: 'Elles signalent que ton action est légitime et prévue. Le client comprend qu\'il n\'a pas à décider si la discussion aura lieu — seulement comment elle se déroulera.' },
                { front: 'Quel est le signal de passage vers la Phase 3 ?', back: 'L\'écoute est installée : il ne cherche plus à partir, son corps s\'est légèrement tourné vers toi ou il a hoché la tête. Tu n\'attends pas de validation verbale — tu passes.' }
              ]
            }
          },

          {
            id: 'p2-script',
            title: 'Scripts de Légitimité',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 2 — Scripts selon le contexte</h2>

  <h3>Script Immobilier</h3>
  <div class='script-block'>
    <div class='script-context'>Contact porte-à-porte ou téléphone — prospection immobilière</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Je m'occupe de votre secteur, La Chamberte et La Martelle. Je voulais voir si votre bien pouvait correspondre aux acquéreurs que j'ai actuellement."</span>
    </div>
  </div>

  <h3>Script Fibre / Porte-à-Porte</h3>
  <div class='script-block'>
    <div class='script-context'>Démarchage terrain — services fibre</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Bonjour, je m'occupe du raccordement fibre optique. Je dois vérifier la mise aux normes de votre boîtier, ça prend 2 minutes."</span>
    </div>
  </div>

  <h3>Analyse terrain</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'>
      <p>Ces phrases affirment une mission, pas une offre.</p>
    </div>
    <div class='analysis-item'>
      <p>"Je m'occupe" et "Je dois vérifier" signalent que ton action est légitime et prévue.</p>
    </div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Utiliser des formulations de demande : "je voudrais", "j'aimerais", "est-ce que je peux"</div>
    <div class='error-item'>✗ Se sur-présenter : nom + entreprise + offre en une phrase = rejet immédiat</div>
    <div class='error-item'>✗ Monter la voix en fin de phrase — cela transforme une affirmation en question</div>
    <div class='error-item'>✗ Chercher l'approbation du prospect avant de continuer</div>
  </div>

  <h3>Exercice pratique</h3>
  <div class='exercise-description'>
    <p>Enregistre 5 présentations. Écoute-les et supprime chaque "je voulais", "j'aimerais" ou "je peux".</p>
    <p>Remplace par une phrase d'action directe.</p>
    <div class='target-row'>
      <span>Avant :</span> <span class='bad'>Formulations de demande</span>
    </div>
    <div class='target-row'>
      <span>Objectif :</span> <span class='good'>100% d'affirmations</span>
    </div>
  </div>
</div>`,
            keyPoints: [
              'Immobilier : "Je m\'occupe de votre secteur, La Chamberte et La Martelle"',
              'PAP Fibre : "Je m\'occupe du raccordement fibre. Je dois vérifier la mise aux normes de votre boîtier"',
              'Aucune phrase de demande — uniquement des affirmations de mission',
              'Ne jamais se sur-présenter : nom + entreprise + offre en une phrase = rejet immédiat',
              'Exercice : enregistrer 5 présentations et éliminer tout mot de demande'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 2',
              scenario: 'Tu viens de délivrer ta phrase de légitimité. Évalue sur 5 critères :',
              steps: [
                'Ai-je affirmé mon rôle sans chercher l\'accord ?',
                'Mon ton inspire-t-il calme et sécurité ?',
                'Ai-je évité tout mot de demande (je voulais, j\'aimerais, je peux) ?',
                'Le prospect m\'a-t-il validé par une écoute ou un signe d\'ouverture ?',
                'Ai-je conclu cette étape sans me sur-présenter ?'
              ],
              idealAnswer: 'Signal de passage : écoute installée — il ne cherche plus à partir. Tu n\'attends pas de validation verbale.'
            }
          }

        ]
      },

      {
        id: 'phase-3-engagement',
        title: 'Phase 3 — Engagement',
        subtitle: 'Micro-adhésion immédiate',
        lessons: [

          {
            id: 'p3-theorie',
            title: 'Du Passif à l\'Actif',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Phase 3 — Micro-adhésion immédiate</h2>

  <div class='lesson-intro'>
    <p>Le prospect écoute, mais reste observateur. Tu dois le faire passer de l'écoute passive à la participation active. Cet accord verbal — même minime — change tout : il devient partie prenante d'un processus qu'il suivra jusqu'à la décision.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Obtenir un <strong>"oui" concret</strong> avant toute démonstration ou argument, pour créer la collaboration.</p>
    <p>De l'écoute passive → participation active</p>
  </div>

  <h3>Le principe de cohérence</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Principe de cohérence</strong>
      <p>Psychologiquement, dire oui engage la cohérence : une fois qu'il a validé un principe, le cerveau cherche à rester aligné avec cette réponse.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Le choix fermé</strong>
      <p>Utilise toujours un choix fermé : deux options valides, pas de porte de sortie.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>L'implication sans pression</strong>
      <p>Ton but : l'amener à s'impliquer en douceur, sans qu'il sente de pression.</p>
    </div>
  </div>

  <div class='principle-block'>
    <p>C'est une <strong>direction douce</strong> : il choisit, mais dans le couloir que tu as tracé.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Il a dit oui — même un "oui d'accord" ou "ça marche". Ce oui, aussi petit soit-il, est ton feu vert → tu cadres immédiatement.</p>
  </div>
</div>`,
            keyPoints: [
              'Objectif : obtenir un oui concret AVANT toute démonstration ou argument',
              'Principe de cohérence : dire oui une fois engage le cerveau à rester aligné',
              'Toujours utiliser un choix fermé — deux options valides, pas de porte de sortie',
              'Ne jamais poser une question ouverte ("vous voulez qu\'on se voit ?") — il peut dire non',
              'Signal : même un "oui d\'accord" ou "ça marche" est ton feu vert'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 3 Engagement',
              cards: [
                { front: 'Pourquoi obtenir un "oui" AVANT toute démonstration ?', back: 'Psychologiquement, dire oui engage la cohérence : une fois qu\'il a validé un principe, le cerveau cherche à rester aligné. Il devient partie prenante d\'un processus qu\'il suivra jusqu\'à la décision.' },
                { front: 'Qu\'est-ce qu\'un choix fermé et pourquoi l\'utiliser ?', back: 'Deux options valides, pas de porte de sortie. "Jeudi ou vendredi ?" plutôt que "vous êtes disponible quand ?". Le prospect choisit dans le couloir que tu as tracé.' },
                { front: 'Pourquoi ne jamais poser une question ouverte en Phase 3 ?', back: '"Vous voulez qu\'on se voit ?" — il peut dire non. La question ouverte offre une porte de sortie. Le choix fermé propose une direction bienveillante.' },
                { front: 'Quelle erreur commettent la plupart des closers en Phase 3 ?', back: 'Enchaîner directement sur l\'argument sans obtenir le oui. Monter la voix sur le choix fermé (ça devient une question hésitante). Ne pas attendre la réponse après le choix.' },
                { front: 'Quel est le signal de passage vers la Phase 4 ?', back: 'Il a dit oui — même un "oui d\'accord" ou "ça marche". Ce oui, aussi petit soit-il, est ton feu vert. Tu cadres immédiatement.' }
              ]
            }
          },

          {
            id: 'p3-script',
            title: 'Scripts d\'Engagement',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 3 — Scripts selon le contexte</h2>

  <h3>Version Call — Contact téléphonique</h3>
  <div class='script-block'>
    <div class='script-context'>Objectif : engager sans pression · Valider le principe d'avancer</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Je vous explique en 2 minutes comment ça va se passer, et à la fin on voit si ça vaut le coup d'avancer. Ça vous va ?"</span>
    </div>
  </div>

  <h3>Version Rendez-vous / Terrain</h3>
  <div class='script-block'>
    <div class='script-context'>Objectif : proposer un choix · Faciliter la prise de rendez-vous</div>
    <div class='script-line'>
      <span class='script-speaker'>Toi</span>
      <span class='script-text'>"Le plus simple c'est que je passe le voir rapidement. Vous êtes plutôt disponible quand, jeudi ou vendredi ?"</span>
    </div>
  </div>

  <h3>Décryptage des mécaniques</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'>
      <p>Le <strong>"ça vous va ?"</strong> obtient l'approbation du cadre — pas de l'offre.</p>
    </div>
    <div class='analysis-item'>
      <p>Le <strong>"jeudi ou vendredi ?"</strong> transforme une question ouverte en accord concret : tu offres un choix plutôt que de demander la permission.</p>
    </div>
  </div>

  <h3>Pièges à éviter</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Poser une question ouverte : "Vous voulez qu'on se voit ?" — il peut dire non</div>
    <div class='error-item'>✗ Monter la voix sur le choix fermé — ça devient une question hésitante</div>
    <div class='error-item'>✗ Ne pas attendre la réponse : silence après le choix, c'est lui qui parle en premier</div>
    <div class='error-item'>✗ Enchaîner directement sur l'argument sans obtenir le oui</div>
  </div>
</div>`,
            keyPoints: [
              'Call : "Je vous explique en 2 minutes comment ça va se passer, et à la fin on voit si ça vaut le coup d\'avancer. Ça vous va ?"',
              'Terrain : "Le plus simple c\'est que je passe le voir rapidement. Vous êtes plutôt disponible quand, jeudi ou vendredi ?"',
              'Le "ça vous va ?" obtient l\'approbation du cadre — pas de l\'offre',
              'Silence après le choix fermé : c\'est lui qui parle en premier',
              'Objectif : 10 prises de rendez-vous avec choix fermés — chronomètre la réaction'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 3',
              scenario: 'Tu viens de faire ta proposition d\'engagement (call ou terrain). Évalue sur 5 critères :',
              steps: [
                'Ai-je proposé deux choix fermés nets ?',
                'Ai-je attendu la réponse sans insister ni compléter ?',
                'Ai-je obtenu un engagement verbal réel ?',
                'Mon ton est-il resté neutre et bas jusqu\'à l\'accord ?',
                'Le prospect a-t-il perçu cette étape comme naturelle ?'
              ],
              idealAnswer: 'Signal de passage : il a dit oui — même "oui d\'accord" ou "ça marche". Ce oui est ton feu vert pour passer au cadrage.'
            }
          }

        ]
      },

      {
        id: 'phase-4-cadrage',
        title: 'Phase 4 — Cadrage',
        subtitle: 'Prise de contrôle immédiate',
        lessons: [

          {
            id: 'p4-theorie',
            title: 'Poser le Cadre Professionnel',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Phase 4 — Prise de contrôle immédiate</h2>

  <div class='lesson-intro'>
    <p>Le cadrage détermine qui dirige la conversation. Si tu ne cadres pas, le prospect prend le contrôle inconsciemment : il pose les questions, choisit les sujets, et la décision recule.</p>
    <p>Cette phase te replace au centre. C'est le moment où tu poses le cadre professionnel et prépares la notion de décision finale.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Poser une structure claire en <strong>moins de 25 secondes</strong> : ton rôle, le déroulement, et l'issue de la discussion.</p>
  </div>

  <h3>Un bon cadrage repose sur trois piliers</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-label'>POSITION</span>
      <p>Tu n'es pas en demande. Tu es là pour évaluer, pas pour convaincre.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>PROCESS</span>
      <p>Tu expliques comment se déroulera l'échange, avant qu'il pose la question.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>DÉCISION</span>
      <p>Tu annonces dès maintenant qu'une décision sera prise à la fin — dans un sens ou dans l'autre.</p>
    </div>
  </div>

  <div class='principle-block'>
    <p>Dès qu'il valide ton cadre, il accepte implicitement d'aller jusqu'à la fin. Tu neutralises deux résistances : la peur d'être vendu et la peur de perdre du temps.</p>
  </div>

  <h3>Durée idéale</h3>
  <div class='timing-block'>
    <span class='timing-num'>20–25</span>
    <span class='timing-label'>secondes maximum</span>
    <p>Si le prospect t'interrompt, c'est que ton ancrage vocal est insuffisant — travaille le débit, pas le texte.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>1. Il a dit "oui" ou "d'accord" au cadre.</p>
    <p>2. Son attitude s'est détendue — il ne cherche plus à contrôler.</p>
    <p>3. Tu peux maintenant poser tes questions sans résistance.</p>
  </div>
</div>`,
            keyPoints: [
              'Le cadrage détermine qui dirige : sans cadre, le prospect prend le contrôle',
              'Trois piliers : Position (tu évalues, pas tu convaincs) + Process + Décision annoncée',
              'Durée idéale : 20-25 secondes maximum — pas plus',
              'Le oui au cadre = accord implicite d\'aller jusqu\'à la décision finale',
              'Neutralise deux peurs : la peur d\'être vendu et la peur de perdre du temps'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 4 Cadrage',
              cards: [
                { front: 'Pourquoi le cadrage est-il essentiel ?', back: 'Sans cadrage, le prospect prend le contrôle inconsciemment : il pose les questions, choisit les sujets, et la décision recule. Le cadrage te replace au centre.' },
                { front: 'Quels sont les 3 piliers d\'un bon cadrage ?', back: '1. POSITION : tu évalues, pas tu convaincs 2. PROCESS : tu expliques comment se déroulera l\'échange 3. DÉCISION : tu annonces qu\'une décision sera prise à la fin' },
                { front: 'Quelle est la durée idéale pour le cadrage ?', back: 'Entre 20 et 25 secondes. Pas plus. Si le prospect t\'interrompt, ton ancrage vocal est insuffisant — travaille le débit, pas le texte.' },
                { front: 'Que se passe-t-il quand le client valide ton cadre ?', back: 'Il accepte implicitement d\'aller jusqu\'à la fin. Tu neutralises deux résistances : la peur d\'être vendu et la peur de perdre du temps.' },
                { front: 'Quel est le signal de passage vers la Phase 5 ?', back: 'Il a dit "oui" ou "d\'accord" au cadre ET son attitude s\'est détendue — il ne cherche plus à contrôler. Tu peux maintenant poser tes questions sans résistance.' }
              ]
            }
          },

          {
            id: 'p4-script',
            title: 'Le Script de Cadrage',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 4 — Script de cadrage</h2>

  <h3>Script de cadrage — Transparence &amp; engagement mutuel</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='step-num'>1</span>
      <span class='script-text'>"Avant d'aller plus loin, je préfère être transparent avec vous."</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>2</span>
      <span class='script-text'>"Mon rôle, c'est de comprendre votre situation, voir si je peux vous aider, et si ce n'est pas le cas, je vous le dirai."</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>3</span>
      <span class='script-text'>"De votre côté, j'ai besoin de votre transparence pour ne pas perdre de temps."</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>4</span>
      <span class='script-text'>"Et à la fin, on prendra une décision dans un sens ou dans l'autre."</span>
    </div>
    <div class='script-step highlight'>
      <span class='step-num'>?</span>
      <span class='script-text'>"Ça vous va ?"</span>
    </div>
  </div>

  <h3>Principe clé</h3>
  <div class='principle-block'>
    <p>Un accord mutuel dès le départ élimine la pression et pose les bases d'une conversation honnête. Ce script crée un cadre rationnel et symétrique : chacun apporte de la clarté.</p>
    <p>Quand le client répond «&nbsp;oui&nbsp;», tu obtiens sa coopération et sécurises la décision finale.</p>
  </div>

  <h3>Points de vigilance</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Parler plus de 25 secondes — tu perds l'attention</div>
    <div class='error-item'>✗ Ne pas obtenir le «&nbsp;oui&nbsp;» final au cadre — sans ce oui, tu n'as pas la coopération</div>
    <div class='error-item'>✗ Monter la voix : ton calme est ta seule arme ici</div>
    <div class='error-item'>✗ Sauter le cadrage pour aller directement au diagnostic — le prospect reste en mode défense</div>
  </div>
</div>`,
            keyPoints: [
              'Le script en 4 temps : transparence → rôle → engagement mutuel → décision annoncée → "Ça vous va ?"',
              '"Avant d\'aller plus loin, je préfère être transparent avec vous" — désarme immédiatement',
              '"Et à la fin, on prendra une décision dans un sens ou dans l\'autre" — prépare la décision finale',
              'Durée : 20-25 secondes. Si tu dépasses, tu perds l\'attention',
              'Le ton bas et posé du début à la fin — le calme est ta seule arme'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 4',
              scenario: 'Entraîne-toi à cadrer 10 appels ou rendez-vous. Après chaque échange, évalue :',
              steps: [
                'Ai-je annoncé clairement mon rôle et la décision finale ?',
                'Ai-je obtenu un "oui" explicite au cadre ?',
                'Ai-je parlé entre 20 et 25 secondes maximum ?',
                'Mon ton est-il resté bas et posé du début à la fin ?',
                'Ai-je senti l\'écoute totale avant de passer au diagnostic ?'
              ],
              idealAnswer: 'Signal de passage : il a dit "oui" ou "d\'accord" au cadre ET son attitude s\'est détendue. Tu peux maintenant poser tes questions sans résistance.'
            }
          }

        ]
      },

      {
        id: 'phase-5-diagnostic',
        title: 'Phase 5 — Diagnostic',
        subtitle: 'Faire parler pour comprendre',
        lessons: [

          {
            id: 'p5-theorie',
            title: 'Les 4 Piliers du Diagnostic',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 5 — Faire parler pour comprendre</h2>

  <div class='lesson-intro'>
    <p>Le diagnostic est la fondation du closing. Tant que tu ne comprends pas le problème précis, tu ne peux pas proposer la bonne solution.</p>
    <p>Mal exécutée, elle tourne en simple conversation. Bien menée, elle fait émerger une prise de conscience.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Obtenir des données précises pour que le prospect visualise lui-même l'écart entre sa situation actuelle et sa situation désirée.</p>
    <p>Situation actuelle (Chiffres · Faits · Blocages) → Situation désirée (Objectifs · Vision · Résultats)</p>
  </div>

  <h3>Un bon diagnostic repose sur 4 piliers</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Situation actuelle</strong>
      <p>Savoir exactement où il en est — en chiffres, pas en impressions.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Chiffres concrets</strong>
      <p>Ancrer la discussion dans la réalité. Sans chiffre, pas de levier.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Objectif précis</strong>
      <p>Comprendre ce qu'il veut atteindre et dans quel délai.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>4</span>
      <strong>Blocage identifié</strong>
      <p>Repérer ce qui freine. C'est souvent ici que se cache la vraie contrainte.</p>
    </div>
  </div>

  <h3>Règle d'or</h3>
  <div class='rule-block'>
    <p><strong>Tu ne parles pas plus de 40 % du temps pendant le diagnostic.</strong></p>
    <p>Le diagnostic, c'est lui qui parle, pas toi. Enregistre-toi. Si tu parles plus de 40 % du temps, recommence.</p>
  </div>

  <h3>La Phrase-Miroir</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Donc aujourd'hui vous êtes à [X], vous voulez [Y], et vous êtes bloqué par [Z]."</span>
    </div>
  </div>
  <p>Cette phrase-miroir déclenche souvent une prise de conscience immédiate. Cette validation rend toute proposition ultérieure légitime.</p>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Il a validé ta reformulation miroir. Il a dit "oui c'est ça" ou "exactement".</p>
    <p><em>À ce moment, il sait pourquoi il n'avance pas — mais il ne ressent pas encore l'urgence. C'est le rôle de la phase suivante.</em></p>
  </div>
</div>`,
            keyPoints: [
              '4 piliers : situation actuelle + chiffres concrets + objectif précis + blocage identifié',
              'Règle d\'or : ne pas parler plus de 40% du temps — c\'est lui qui parle',
              'Phrase-miroir : "Donc aujourd\'hui vous êtes à [X], vous voulez [Y], et vous êtes bloqué par [Z]"',
              'Valider avec "On est bien aligné ?" — crée un engagement subtil',
              'Signal : il dit "oui c\'est ça" ou "exactement" — mais l\'urgence n\'est pas encore là'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 5 Diagnostic',
              cards: [
                { front: 'Quels sont les 4 piliers du diagnostic ?', back: '1. Situation actuelle (chiffres, pas impressions) 2. Chiffres concrets (ancrer dans la réalité) 3. Objectif précis (ce qu\'il veut atteindre et dans quel délai) 4. Blocage identifié (la vraie contrainte cachée)' },
                { front: 'Quelle est la règle d\'or du diagnostic ?', back: 'Tu ne parles pas plus de 40% du temps. Le diagnostic, c\'est lui qui parle. Enregistre-toi — si tu dépasses 40%, recommence.' },
                { front: 'Comment fonctionne la phrase-miroir ?', back: '"Donc aujourd\'hui vous êtes à [X], vous voulez [Y], et vous êtes bloqué par [Z]. On est bien aligné ?" Elle crée un engagement subtil et rend toute proposition ultérieure légitime.' },
                { front: 'Quelles erreurs fréquentes tuer le diagnostic ?', back: 'Parler plus de 40% du temps. Ne pas reformuler en miroir. Rester dans le vague sans chiffres concrets. Passer à la solution avant d\'avoir validé l\'alignement.' },
                { front: 'Quel est le signal de passage vers la Phase 6 ?', back: 'Il a validé la reformulation miroir — il a dit "oui c\'est ça" ou "exactement". À ce moment, il sait pourquoi il n\'avance pas — mais l\'urgence n\'est pas encore là.' }
              ]
            }
          },

          {
            id: 'p5-script',
            title: 'Questions & Reformulation Miroir',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 5 — Questions clés &amp; reformulation miroir</h2>

  <h3>Les 4 questions clés</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='step-num'>1</span>
      <span class='script-text'>"Aujourd'hui, vous en êtes où exactement ?"</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>2</span>
      <span class='script-text'>"Ça donne quoi concrètement ?"</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>3</span>
      <span class='script-text'>"Vous voudriez être où ?"</span>
    </div>
    <div class='script-step'>
      <span class='step-num'>4</span>
      <span class='script-text'>"Qu'est-ce qui vous empêche d'y arriver ?"</span>
    </div>
  </div>

  <h3>Reformulation Miroir</h3>
  <div class='script-block mirror-block'>
    <div class='mirror-formula'>
      <span class='mirror-label'>Donc aujourd'hui vous êtes à</span>
      <span class='mirror-var'>X</span>
      <span class='mirror-label'>(situation actuelle)</span>
    </div>
    <div class='mirror-formula'>
      <span class='mirror-label'>vous voulez</span>
      <span class='mirror-var'>Y</span>
      <span class='mirror-label'>(l'objectif visé)</span>
    </div>
    <div class='mirror-formula'>
      <span class='mirror-label'>et vous êtes bloqué par</span>
      <span class='mirror-var'>Z</span>
      <span class='mirror-label'>(le frein identifié)</span>
    </div>
    <div class='mirror-close'>"On est bien aligné ?"</div>
  </div>

  <h3>Analyse terrain</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'>
      <p>Ces questions amènent le client à objectiver sa situation — il met des mots et des chiffres sur des impressions.</p>
    </div>
    <div class='analysis-item'>
      <p>La reformulation finale "On est bien aligné ?" crée un engagement subtil : tu valides ensemble la réalité du problème.</p>
    </div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Parler plus de 40% du temps — le diagnostic, c'est lui qui parle, pas toi</div>
    <div class='error-item'>✗ Ne pas reformuler en miroir — sans reformulation, le prospect ne se sent pas compris</div>
    <div class='error-item'>✗ Rester dans le vague sans ancrer sur des chiffres concrets</div>
    <div class='error-item'>✗ Passer à la solution avant d'avoir validé l'alignement avec le client</div>
  </div>
</div>`,
            keyPoints: [
              '4 questions : "où en êtes-vous ?" → "concrètement ?" → "vous voudriez être où ?" → "qu\'est-ce qui vous empêche ?"',
              'Reformulation miroir : X (situation) → Y (objectif) → Z (frein) → "On est bien aligné ?"',
              'Ne jamais passer à la solution avant la validation de l\'alignement',
              'Dans ton prochain entretien : obtenir obligatoirement une donnée chiffrée, une émotion exprimée, un blocage identifié',
              '5/5 à l\'auto-évaluation = maîtrise confirmée'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 5',
              scenario: 'Dans ton prochain entretien, obtiens obligatoirement les 4 éléments. Coche chaque point après :',
              steps: [
                'Ai-je recueilli les 4 éléments (situation, chiffres, objectif, blocage) ?',
                'Ai-je reformulé en miroir avec ses propres mots ?',
                'Ai-je validé l\'alignement avec « On est bien aligné ? » ?',
                'Le client a-t-il reconnu la justesse de mon résumé ?',
                'Ai-je parlé moins de 40% du temps ?'
              ],
              idealAnswer: 'Signal de passage : il dit "oui c\'est ça" ou "exactement". Il comprend — mais l\'urgence n\'est pas encore là. C\'est le rôle de la Phase 6.'
            }
          }

        ]
      },      {
        id: 'phase-6-emotion',
        title: 'Phase 6 — Émotion',
        subtitle: 'Faire ressentir le pourquoi',
        lessons: [

          {
            id: 'p6-theorie',
            title: 'La Descente Émotionnelle',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 6 — Faire ressentir le pourquoi</h2>

  <div class='lesson-intro'>
    <p>Le prospect a pris conscience de sa situation grâce au diagnostic. Mais un constat logique ne suffit pas : il faut qu'il le <strong>ressente</strong>.</p>
    <p>Du rationnel — « je comprends » — au viscéral — « je veux changer ».</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Faire émerger une émotion réelle qui transforme le constat en décision imminente.</p>
    <p>Frustration · Peur · Fierté · Espoir</p>
  </div>

  <div class='principle-block'>
    <p>Un closer performant ne pousse pas vers la douleur : il laisse le client <strong>descendre lui-même</strong> vers son propre pourquoi.</p>
    <p>Chaque silence est un espace d'écoute constructive.</p>
  </div>

  <h3>La descente se fait par étapes</h3>
  <div class='emotion-descent'>
    <div class='descent-step'>
      <span class='descent-label'>CAUSE</span>
      <span class='descent-text'>"Ça vous impacte comment ?" — il décrit les conséquences concrètes</span>
    </div>
    <div class='descent-arrow'>↓</div>
    <div class='descent-step'>
      <span class='descent-label'>IMPACT</span>
      <span class='descent-text'>"À quel point ?" — il mesure l'ampleur de la situation</span>
    </div>
    <div class='descent-arrow'>↓</div>
    <div class='descent-step'>
      <span class='descent-label'>RESSENTI</span>
      <span class='descent-text'>"Qu'est-ce que ça vous coûte vraiment ?" — il touche l'émotion personnelle</span>
    </div>
    <div class='descent-arrow'>↓</div>
    <div class='descent-step highlight'>
      <span class='descent-label'>IDENTITÉ</span>
      <span class='descent-text'>Quand il dit "j'en ai marre" ou "je me sens bloqué" — tu as atteint le bon niveau</span>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>Ne coupe jamais le silence. Laisse-le chercher ses mots. C'est dans ce silence que l'émotion monte.</strong></p>
  </div>

  <h3>Note importante</h3>
  <div class='warning-block'>
    <p>La question "Et si rien ne change ?" est réservée à la Phase 7 — Tension. En Phase 6, tu restes sur le ressenti présent, pas sur la projection du futur. Cette distinction est essentielle pour que la tension de la Phase 7 ait un impact maximal.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Il parle en "je" et décrit ce qu'il ressent, pas seulement ce qui se passe.</p>
    <p>Il a dit quelque chose comme <strong>"j'en ai marre"</strong>, <strong>"c'est épuisant"</strong>, <strong>"je me sens bloqué"</strong>.</p>
    <p><em>Ce mot émotionnel est ton feu vert.</em></p>
  </div>
</div>`,
            keyPoints: [
              'La logique crée la compréhension — seule l\'émotion déclenche l\'action',
              'Descente en 4 niveaux : Cause → Impact → Ressenti → Identité',
              'Ne jamais couper le silence — c\'est dans ce silence que l\'émotion monte',
              '"Et si rien ne change ?" est RÉSERVÉE à la Phase 7 — ne pas l\'utiliser ici',
              'Signal : il dit "j\'en ai marre", "c\'est épuisant", "je me sens bloqué" — feu vert'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 6 Émotion',
              cards: [
                { front: 'Pourquoi un constat logique ne suffit-il pas à déclencher l\'action ?', back: 'La logique crée la compréhension mais seule l\'émotion déclenche l\'action. Le prospect doit ressentir le problème, pas seulement le comprendre.' },
                { front: 'Quelles sont les 4 étapes de la descente émotionnelle ?', back: '1. CAUSE : "Ça vous impacte comment ?" 2. IMPACT : "À quel point ?" 3. RESSENTI : "Qu\'est-ce que ça vous coûte vraiment ?" 4. IDENTITÉ : quand il dit "j\'en ai marre" ou "je me sens bloqué"' },
                { front: 'Pourquoi ne faut-il jamais couper le silence en Phase 6 ?', back: 'C\'est dans ce silence que l\'émotion monte. Si tu parles avant qu\'il ait fini, tu brises l\'émotion et tu le remets en mode rationnel.' },
                { front: 'Pourquoi "Et si rien ne change ?" est-elle interdite en Phase 6 ?', back: 'Cette question est réservée à la Phase 7 — Tension. En Phase 6, tu restes sur le ressenti présent, pas sur la projection du futur. L\'utiliser trop tôt casse l\'impact de la Phase 7.' },
                { front: 'Quel est le signal de passage vers la Phase 7 ?', back: 'Il parle en "je" et décrit ce qu\'il ressent. Il dit "j\'en ai marre", "c\'est épuisant", "je me sens bloqué". Ce mot émotionnel est ton feu vert.' }
              ]
            }
          },

          {
            id: 'p6-script',
            title: 'Scripts d\'Impact Émotionnel',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 6 — Questions d'impact &amp; ressenti présent</h2>

  <h3>Les 3 questions de descente</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='script-text'>"Et ça vous impacte comment ?"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"À quel point ?"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"Qu'est-ce que ça vous coûte vraiment, au quotidien ?"</span>
    </div>
    <div class='script-action'>▶ Silence — laisse-le répondre complètement</div>
  </div>

  <h3>Signaux à écouter</h3>
  <div class='signals-row'>
    <span class='signal-word'>"frustration"</span>
    <span class='signal-word'>"fatigue"</span>
    <span class='signal-word'>"j'en ai marre"</span>
  </div>
  <p>Quand ces mots apparaissent, tu as atteint le bon niveau. La suite se joue sur la tension.</p>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Passer directement à "Et si rien ne change ?" sans avoir fait exprimer le ressenti présent</div>
    <div class='error-item'>✗ Couper le silence trop tôt — si tu parles avant qu'il ait fini, tu brises l'émotion</div>
    <div class='error-item'>✗ Reformuler trop vite : laisse l'émotion s'installer avant de la nommer</div>
    <div class='error-item'>✗ Chercher à consoler ou rassurer — ce n'est pas encore le moment</div>
  </div>

  <div class='principle-block'>
    <p>Ces phrases créent une descente émotionnelle naturelle. Elles déclenchent des micro-réactions visibles : pauses, soupirs, changement de ton.</p>
    <p>Chaque erreur interrompt la descente émotionnelle et remet le prospect en mode rationnel.</p>
  </div>
</div>`,
            keyPoints: [
              '"Et ça vous impacte comment ?" → "À quel point ?" → "Qu\'est-ce que ça vous coûte vraiment ?"',
              'Silence après chaque question — ne jamais l\'interrompre',
              'Signaux : "frustration", "fatigue", "j\'en ai marre" = bon niveau atteint',
              'Ne pas consoler ni rassurer — laisser la descente se faire naturellement',
              'Exercice : poser une question forte, compter 3 secondes dans sa tête avant de reparler'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 6',
              scenario: 'Après un entretien avec un prospect, évalue la maîtrise du silence et de l\'émotion :',
              steps: [
                'Ai-je réellement entendu une émotion — et pas seulement un constat factuel ?',
                'Ai-je laissé un silence complet après chaque question ?',
                'Le client a-t-il parlé de lui, pas seulement de son contexte ?',
                'Ai-je évité de reformuler trop tôt ?',
                'Ai-je perçu un changement de ton ou de rythme dans sa voix ?'
              ],
              idealAnswer: 'Signal de passage : il parle en "je" et dit "j\'en ai marre", "c\'est épuisant" ou "je me sens bloqué". Ce mot émotionnel est ton feu vert pour la Phase 7.'
            }
          }

        ]
      },

      {
        id: 'phase-7-tension',
        title: 'Phase 7 — Tension',
        subtitle: 'Créer et maintenir l\'écart',
        lessons: [

          {
            id: 'p7-theorie',
            title: 'L\'Arc de Tension',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 7 — Créer et maintenir l'écart</h2>

  <div class='lesson-intro'>
    <p>Le prospect a exprimé ce qu'il ressent. La tension transforme cette émotion en besoin d'action. C'est le moment où tu fais ressentir la différence entre maintenant et le futur inchangé.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Créer un écart ressenti entre la situation actuelle et l'objectif idéal, jusqu'à ce que le statu quo devienne intenable.</p>
  </div>

  <h3>L'arc de tension</h3>
  <div class='arc-steps'>
    <div class='arc-step'>
      <span class='arc-num'>1</span>
      <strong>Émotion exprimée</strong>
      <p>Le prospect a nommé ce qu'il vit.</p>
    </div>
    <div class='arc-arrow'>→</div>
    <div class='arc-step'>
      <span class='arc-num'>2</span>
      <strong>Tension amplifiée</strong>
      <p>Tu fais ressentir le coût de l'inaction.</p>
    </div>
    <div class='arc-arrow'>→</div>
    <div class='arc-step'>
      <span class='arc-num'>3</span>
      <strong>Statu quo intenable</strong>
      <p>Ne rien changer devient plus douloureux que décider.</p>
    </div>
  </div>

  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Closer débutant</span>
      <p>Cherche à rassurer le prospect et dissoudre l'inconfort.</p>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Closer performant</span>
      <p>Laisse la tension faire son travail et guide vers l'action.</p>
    </div>
  </div>

  <h3>Trois règles absolues</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>NE PAS ADOUCIR</strong>
      <p>Ton calme amplifie l'effet. Si tu consoles, tu dissous la tension.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>TENIR LE SILENCE</strong>
      <p>Le silence prolonge la réflexion. L'esprit du client comble le vide en imaginant son avenir inchangé.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>ATTENDRE &gt; 3 SECONDES</strong>
      <p>Plus le silence dure, plus la tension est réelle.</p>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>Le silence peut être le meilleur outil du closer.</strong></p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Il a dit "faut que je fasse quelque chose" ou "je peux pas continuer comme ça".</p>
    <p>Il a simplement hoché la tête en silence.</p>
    <p><em>L'urgence est ressentie. Tu peux maintenant lui montrer la sortie.</em></p>
  </div>
</div>`,
            keyPoints: [
              'La tension transforme l\'émotion en besoin d\'action — sans pression, juste le contraste',
              '3 règles : ne pas adoucir + tenir le silence + attendre plus de 3 secondes',
              'Ton calme amplifie l\'effet — si tu consoles, tu dissous la tension',
              'Le cerveau du client comble le vide du silence en imaginant son avenir inchangé',
              'Signal : "faut que je fasse quelque chose" ou hochement de tête silencieux'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 7 Tension',
              cards: [
                { front: 'Quelle est la différence entre Phase 6 et Phase 7 ?', back: 'Phase 6 : faire exprimer le ressenti présent ("j\'en ai marre"). Phase 7 : amplifier la tension par le contraste actuel/futur et le silence. L\'une prépare l\'autre.' },
                { front: 'Quelles sont les 3 règles absolues de la Phase 7 ?', back: '1. NE PAS ADOUCIR : si tu consoles, tu dissous la tension. 2. TENIR LE SILENCE : le cerveau comble le vide. 3. ATTENDRE > 3 SECONDES : plus ça dure, plus la tension est réelle.' },
                { front: 'Que se passe-t-il dans le cerveau du client pendant le silence ?', back: 'Le cerveau simule automatiquement le futur inchangé. Cette simulation déclenche l\'envie de changement. Tu n\'as rien à ajouter — le silence fait le travail.' },
                { front: 'Quelles erreurs brisent la tension ?', back: 'Remplir le silence par une relance ou une explication. Consoler ou atténuer ("je comprends c\'est difficile"). Utiliser "Et si rien ne change ?" sans avoir fait exprimer l\'émotion en Phase 6.' },
                { front: 'Quel est le signal de passage vers la Phase 8 ?', back: 'Il dit "faut que je fasse quelque chose" ou "je peux pas continuer comme ça". Ou il hoche simplement la tête en silence. L\'urgence est ressentie.' }
              ]
            }
          },

          {
            id: 'p7-script',
            title: 'Le Script de Tension',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 7 — Script de clôture</h2>

  <h3>Le script en 3 temps</h3>
  <div class='script-block big-script tension-script'>
    <div class='script-step'>
      <span class='script-text'>"Aujourd'hui vous êtes à <strong>[X]</strong>…"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"Vous voulez être à <strong>[Y]</strong>…"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"Mais pour l'instant, rien ne change."</span>
    </div>
    <div class='script-separator'></div>
    <div class='script-step highlight'>
      <span class='script-text'>"Et si rien ne change ?"</span>
    </div>
    <div class='script-action'>Silence — minimum 3 secondes</div>
  </div>

  <h3>Le silence est une technique</h3>
  <div class='principle-block'>
    <p>"Et si rien ne change ?" suspend le temps. C'est le pivot réel du closing. Quand tu gardes le silence, tu obliges le cerveau à simuler le futur — et cette simulation déclenche l'envie de changement.</p>
    <p>Il finit souvent par : <em>"Oui, faut que je fasse quelque chose."</em> Tu n'as rien ajouté. La tension a parlé.</p>
  </div>

  <h3>Exemple terrain</h3>
  <div class='terrain-example'>
    <div class='ex-step'>Closer : <em>"Aujourd'hui, vous avez deux options…"</em></div>
    <div class='ex-step pause'>PAUSE — 4 secondes</div>
    <div class='ex-step'>Prospect : <em>"Autant y aller."</em></div>
    <div class='ex-result'>→ Tu n'as rien ajouté. La décision s'est faite d'elle-même.</div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Remplir le silence par une relance ou une explication — tu casses la tension</div>
    <div class='error-item'>✗ Consoler ou atténuer : "je comprends c'est difficile" — tu dissous l'urgence</div>
    <div class='error-item'>✗ Utiliser cette question sans avoir fait exprimer l'émotion en Phase 6 — elle tombe à plat</div>
    <div class='error-item'>✗ Répéter la question si le silence dure — patience, c'est lui qui travaille</div>
  </div>
</div>`,
            keyPoints: [
              '"Aujourd\'hui vous êtes à [X]… Vous voulez être à [Y]… Mais pour l\'instant, rien ne change."',
              '"Et si rien ne change ?" — puis silence MINIMUM 3 secondes',
              'Le premier qui parle après le silence perd — tenir la posture',
              'Ne jamais répéter la question si le silence dure — c\'est lui qui travaille',
              'La puissance vient de ce que le silence ne comble pas — laisser le prospect travailler'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 7',
              scenario: 'Choisis 3 situations, prononce l\'enchaînement complet et mesure le délai de silence. Évalue :',
              steps: [
                'Ai-je posé les deux réalités (actuelle / désirée) sans jugement ?',
                'Ai-je laissé un silence complet de plus de 3 secondes ?',
                'Le prospect a-t-il fait une remarque émotionnelle ou pris une décision verbale ?',
                'Ai-je évité toute tentative de consolation ?',
                'Ai-je senti un changement d\'énergie — une prise de conscience ?'
              ],
              idealAnswer: 'Signal de passage : il dit "faut que je fasse quelque chose" ou hoche la tête. Plus le silence est long, mieux c\'est. L\'urgence est ressentie — montre-lui maintenant la sortie (Phase 8).'
            }
          }

        ]
      },

      {
        id: 'phase-8-projection',
        title: 'Phase 8 — Projection',
        subtitle: 'Faire voir la solution',
        lessons: [

          {
            id: 'p8-theorie',
            title: 'La Visualisation du Futur',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Phase 8 — Faire voir la solution</h2>

  <div class='lesson-intro'>
    <p>Le prospect ressent désormais le besoin d'agir. Ton rôle est de lui faire voir, sentir et anticiper le bénéfice futur — avec <strong>ses mots à lui</strong>.</p>
    <p>C'est une phase de <strong>visualisation, pas de pitch</strong> : tu l'aides à se représenter la réussite avant de lui parler de moyens.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Faire imaginer concrètement l'état désiré, afin que la décision devienne une évidence logique et émotionnelle.</p>
  </div>

  <h3>Les décisions se prennent sur des images mentales</h3>
  <div class='two-elements'>
    <div class='element'>
      <span class='element-num'>01</span>
      <strong>Le Concret</strong>
      <p>Résultat mesurable — "dans 3 mois, vous serez à [Y]"</p>
    </div>
    <div class='element'>
      <span class='element-num'>02</span>
      <strong>Le Sensoriel</strong>
      <p>Ressenti — "comment vous vous sentiriez ?"</p>
    </div>
  </div>

  <div class='warning-block'>
    <p><strong>Note importante :</strong> Note les mots exacts qu'il emploie. Tu devras les réutiliser en Phase 10. Pose des questions ouvertes sur le futur, reste calme et neutre. Laisse-le parler : son propre langage émotionnel te servira au closing.</p>
  </div>

  <h3>Quand il parle au futur</h3>
  <div class='principle-block'>
    <p>Quand le client dit "je ferai", "ça sera", "je me sentirai" — c'est un signe fort : il a déjà accepté la possibilité du changement.</p>
    <p>La reformulation finale ancre sa vision avec ses propres mots. Il valide : tu as verrouillé son objectif.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>Il a formulé son futur désiré avec ses mots. Il parle au futur et son ton est positif.</p>
    <p><em>Attention : c'est exactement à ce moment qu'une résistance peut remonter. La Phase 9 est là pour faire sortir cette résistance avant qu'elle bloque la décision.</em></p>
  </div>
</div>`,
            keyPoints: [
              'Phase de visualisation — pas de pitch produit : projeter, pas présenter',
              'Deux dimensions : Le Concret (résultat mesurable) + Le Sensoriel (ressenti futur)',
              'Utiliser ses mots à lui — pas les tiens : l\'ancrage émotionnel vient de son vocabulaire',
              'Noter les mots exacts qu\'il emploie — tu en auras besoin en Phase 10',
              'Signal : il parle au futur ("je ferai", "ça sera") — il a accepté la possibilité du changement'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 8 Projection',
              cards: [
                { front: 'Pourquoi la Phase 8 est une visualisation et non un pitch ?', back: 'Tu dois projeter, pas présenter. Les décisions se prennent sur des images mentales. Quand il "voit" sa réussite comme réelle, il oriente naturellement sa décision pour s\'en rapprocher.' },
                { front: 'Quelles sont les 2 dimensions de la projection ?', back: '1. Le CONCRET : résultat mesurable ("dans 3 mois, vous serez à [Y]") 2. Le SENSORIEL : ressenti ("comment vous vous sentiriez ?"). Les deux ensemble créent une image mentale puissante.' },
                { front: 'Pourquoi utiliser SES mots à lui et non les tiens ?', back: 'La reformulation avec son propre vocabulaire crée un ancrage émotionnel fort. Utiliser tes mots à toi perd immédiatement l\'effet d\'ancrage.' },
                { front: 'Pourquoi noter les mots exacts qu\'il emploie ?', back: 'Tu devras les réutiliser en Phase 10 lors du choix binaire : "vous atteignez [objectif avec ses mots]". Sans ses mots, tu perds l\'effet d\'ancrage au moment crucial.' },
                { front: 'Quel est le signal de passage vers la Phase 9 ?', back: 'Il parle au futur ("je ferai", "ça sera", "je me sentirai") et son ton est positif. Attention : une résistance peut remonter à ce moment. La Phase 9 la fait sortir avant qu\'elle bloque.' }
              ]
            }
          },

          {
            id: 'p8-script',
            title: 'Questions de Projection',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 8 — Scripts de projection</h2>

  <h3>Questions de projection</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='script-text'>« Imaginez dans 3 mois… Qu'est-ce qui aurait changé ? »</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>« Comment vous vous sentiriez ? »</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>« Qu'est-ce qui montrerait que vous avez réussi ? »</span>
    </div>
  </div>

  <h3>Reformulation d'ancrage</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>« Donc ce que vous voulez vraiment, c'est retrouver <strong>[mot qu'il a utilisé]</strong>. »</span>
    </div>
  </div>
  <p>Reprendre exactement le vocabulaire du prospect pour créer un ancrage émotionnel fort.</p>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Faire du pitch produit à ce stade — tu dois projeter, pas présenter</div>
    <div class='error-item'>✗ Utiliser tes mots à toi au lieu des siens — perd immédiatement l'effet d'ancrage</div>
    <div class='error-item'>✗ Aller trop vite vers la décision sans laisser la visualisation s'installer</div>
    <div class='error-item'>✗ Ne pas noter ses mots exacts — tu en auras besoin en Phase 10</div>
  </div>
</div>`,
            keyPoints: [
              '"Imaginez dans 3 mois… Qu\'est-ce qui aurait changé ?" — laisser la visualisation s\'installer',
              '"Comment vous vous sentiriez ?" — activer le sensoriel',
              '"Donc ce que vous voulez vraiment, c\'est retrouver [MOT LUI]" — ancrage avec son vocabulaire',
              'Lors de 3 entretiens : faire verbaliser un changement concret ET un ressenti personnel',
              'Compter le nombre de fois qu\'il parle au futur — c\'est l\'indicateur de projection réussie'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 8',
              scenario: 'Lors de tes 3 prochains entretiens, fais verbaliser les éléments suivants et évalue :',
              steps: [
                'Le client parle-t-il au futur ("je ferai", "ça sera") ?',
                'Ai-je suscité une image concrète et mesurable ?',
                'Ai-je reformulé avec ses mots exacts ?',
                'Ai-je gardé un ton calme, non vendeur ?',
                'Ai-je noté ses mots pour les réutiliser en Phase 10 ?'
              ],
              idealAnswer: 'Signal : il parle au futur et son ton est positif. Attention à la résistance qui peut remonter — la Phase 9 est là pour la faire sortir avant qu\'elle bloque la décision.'
            }
          }

        ]
      },

      {
        id: 'phase-9-objections',
        title: 'Phase 9 — Objections',
        subtitle: 'Faire sortir les freins',
        lessons: [

          {
            id: 'p9-theorie',
            title: 'Les 4 Sources d\'Objection',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 9 — Faire sortir les freins</h2>

  <div class='lesson-intro'>
    <p>Il vient de visualiser son futur désiré. C'est précisément à ce moment qu'une résistance remonte — peur de se tromper, doute sur le budget, besoin de consulter quelqu'un.</p>
    <p>Traiter les objections, c'est comprendre l'incertitude — pas argumenter contre elle.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Faire verbaliser la contrainte réelle et la traiter calmement avant la phase de décision. Une objection non exprimée devient un «&nbsp;non&nbsp;» silencieux après la décision.</p>
  </div>

  <h3>Une objection est un symptôme émotionnel — pas un refus</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-label'>ARGENT 01</span>
      <p>Le budget est un frein réel ou perçu.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>TIMING 02</span>
      <p>Le moment ne lui semble pas le bon.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>PEUR 03</span>
      <p>Peur de se tromper, de ne pas obtenir les résultats, de l'inconnu.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>ENVIRONNEMENT 04</span>
      <p>Il doit consulter un tiers : conjoint, associé, comptable.</p>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>Utilise une seule question à la fois.</strong> Chaque réponse révèle un niveau plus profond.</p>
    <p>Ne cherche jamais à convaincre — le ton calme et la précision valent mille arguments.</p>
  </div>

  <h3>La structure en 4 temps</h3>
  <div class='terrain-example'>
    <div class='ex-step'>Prospect : <em>"C'est cher."</em></div>
    <div class='ex-step'>1 - La première question — ouvre le dialogue</div>
    <div class='ex-step'>2 - La deuxième question — <em>"Qu'est-ce qui vous fait dire ça ? Le prix en lui-même, ou la peur que ce ne soit pas rentable ?"</em></div>
    <div class='ex-step'>3 - La troisième question — précise le blocage</div>
    <div class='ex-step'>Prospect : <em>"C'est plutôt la peur."</em></div>
    <div class='ex-result'>→ Tu as trouvé le vrai blocage : émotion, pas argent.</div>
  </div>

  <div class='key-result'>
    <p><strong>La clé : une question — un silence — une seule relance.</strong></p>
    <p>Plus il parle, plus la peur baisse.</p>
  </div>

  <h3>Signal de Passage</h3>
  <div class='signal-block'>
    <p>1. Il a nommé le vrai blocage et tu l'as validé ensemble.</p>
    <p>2. Il n'y a plus de résistance cachée.</p>
    <p>3. Il ne dit plus "je réfléchis" — il dit ce qui le bloque vraiment.</p>
    <p>4. Tu peux maintenant accompagner la décision.</p>
  </div>
</div>`,
            keyPoints: [
              '4 sources : ARGENT (budget) + TIMING (moment) + PEUR (incertitude) + ENVIRONNEMENT (tiers)',
              'Une objection est un symptôme émotionnel — pas un refus',
              'Règle absolue : une seule question à la fois — chaque réponse révèle un niveau plus profond',
              'Ne jamais argumenter contre une objection — creuser est toujours la bonne réponse',
              'Signal : il nomme le vrai blocage — plus de "je réfléchis", il dit ce qui le bloque vraiment'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 9 Objections',
              cards: [
                { front: 'Quelles sont les 4 sources d\'objection ?', back: '1. ARGENT : budget réel ou perçu 2. TIMING : le moment ne semble pas bon 3. PEUR : peur de se tromper ou de l\'inconnu 4. ENVIRONNEMENT : doit consulter un tiers (conjoint, associé, comptable)' },
                { front: 'Qu\'est-ce qu\'une objection, réellement ?', back: 'C\'est un symptôme émotionnel — pas un refus. Le prospect ne refuse pas l\'offre, il exprime une incertitude. Ton rôle : comprendre cette incertitude, pas l\'argumenter.' },
                { front: 'Pourquoi utiliser une seule question à la fois ?', back: 'Chaque réponse révèle un niveau plus profond. Plusieurs questions à la fois ferment le prospect. La clé : une question — un silence — une seule relance.' },
                { front: 'Que faire face à "C\'est cher" ?', back: '"Qu\'est-ce qui vous fait dire ça ? Le prix en lui-même, ou la peur que ce ne soit pas rentable ?" — Tu classes parmi les 4 contraintes. Tu cherches la vraie nature de l\'objection, pas le prix.' },
                { front: 'Quel est le signal de passage vers la Phase 10 ?', back: 'Il a nommé le vrai blocage et tu l\'as validé ensemble. Plus de "je réfléchis" — il dit ce qui le bloque vraiment. Il n\'y a plus de résistance cachée. Tu accompagnes maintenant la décision.' }
              ]
            }
          },

          {
            id: 'p9-script',
            title: 'Questions Préventives & Traitement',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 9 — Une question par contrainte</h2>

  <h3>Pour chacune des 4 contraintes, une question préventive</h3>
  <div class='four-scripts'>
    <div class='constraint-block'>
      <span class='constraint-label'>ARGENT — Contrainte financière</span>
      <div class='script-line'>
        <span class='script-text'>"Qu'est-ce qui vous ferait dire que l'investissement n'en vaut pas la peine ?"</span>
      </div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>PEUR — Contrainte psychologique</span>
      <div class='script-line'>
        <span class='script-text'>"Qu'est-ce qui vous ferait douter du résultat ?"</span>
      </div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>ENVIRONNEMENT — Contrainte relationnelle</span>
      <div class='script-line'>
        <span class='script-text'>"Avec qui devez-vous en discuter avant de décider ?"</span>
      </div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>TIMING — Contrainte temporelle</span>
      <div class='script-line'>
        <span class='script-text'>"Qu'est-ce qui ferait que ce soit plus simple plus tard ?"</span>
      </div>
    </div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Argumenter face à l'objection au lieu de creuser — tu renforces la résistance</div>
    <div class='error-item'>✗ Poser plusieurs questions à la fois — le prospect se ferme</div>
    <div class='error-item'>✗ Ne pas couvrir l'environnement ("vous décidez seul ?") — c'est l'objection cachée la plus fréquente</div>
    <div class='error-item'>✗ Accepter un "je réfléchis" sans creuser — c'est presque toujours une des 4 contraintes déguisée</div>
  </div>
</div>`,
            keyPoints: [
              'ARGENT : "Qu\'est-ce qui vous ferait dire que l\'investissement n\'en vaut pas la peine ?"',
              'PEUR : "Qu\'est-ce qui vous ferait douter du résultat ?"',
              'ENVIRONNEMENT : "Avec qui devez-vous en discuter avant de décider ?"',
              'TIMING : "Qu\'est-ce qui ferait que ce soit plus simple plus tard ?"',
              'Rituel recommandé : répéter ces questions avant chaque call ou rendez-vous'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 9',
              scenario: '5 critères à valider après chaque entretien :',
              steps: [
                'Ai-je identifié la contrainte réelle parmi les 4 ?',
                'Ai-je posé une seule question à la fois ?',
                'Ai-je couvert les 4 contraintes (argent, timing, peur, environnement) ?',
                'Ai-je reformulé avant de répondre ?',
                'Ai-je évité tout argument défensif ?'
              ],
              idealAnswer: 'Signal : il a nommé le vrai blocage. Plus de "je réfléchis" — il dit ce qui le bloque vraiment. Aucune résistance cachée. Tu peux accompagner la décision.'
            }
          }

        ]
      },

      {
        id: 'phase-10-decision',
        title: 'Phase 10 — Décision',
        subtitle: 'Faire agir sans forcer',
        lessons: [

          {
            id: 'p10-theorie',
            title: 'Le Choix Binaire',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Phase 10 — Faire agir sans forcer</h2>

  <div class='lesson-intro'>
    <p>Le prospect a compris, ressenti et clarifié ses freins. L'heure est à la décision. Ton rôle maintenant : accompagner cette bascule sans créer de pression.</p>
  </div>

  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Faire choisir consciemment, sans argument supplémentaire. Le client agit parce qu'il voit distinctement les conséquences de chaque option.</p>
    <p><strong>Le closing n'est pas un acte de persuasion — c'est un acte de clarté.</strong></p>
  </div>

  <h3>Le client doit voir les deux chemins possibles</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Le Choix Binaire</strong>
      <p>Tu poses clairement les deux options. Pas d'argument. Pas de pression. Juste la réalité de chaque chemin.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Le Silence</strong>
      <p>Tu ne remplis pas. Tu laisses la place au choix. Minimum 3 secondes — et tu attends.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>La Vérification</strong>
      <p>Une dernière question pour t'assurer qu'aucune résistance cachée n'est restée.</p>
    </div>
  </div>

  <h3>Principes clés</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'>
      <p>Le choix binaire crée un cadre clair et orienté décision.</p>
    </div>
    <div class='analysis-item'>
      <p>Le silence prolonge le raisonnement — l'autre s'écoute penser.</p>
    </div>
    <div class='analysis-item'>
      <p>La dernière question vérifie l'absence de résistance. Si une objection remonte ici, tu retournes brièvement en Phase 9.</p>
    </div>
    <div class='analysis-item'>
      <p>Le ton bas et lent, signe de certitude. Tu accompagnes, tu ne pousses pas.</p>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>Une bonne clôture ne pousse pas — elle laisse apparaître la décision logique.</strong></p>
    <p>Le rôle du closer s'arrête là : il fait décider. Il crée les conditions pour que la décision devienne évidente.</p>
  </div>
</div>`,
            keyPoints: [
              'Le closing est un acte de clarté — pas de persuasion',
              '3 temps : Choix Binaire (les deux options) + Silence (min 3 sec) + Vérification',
              'Aucun argument après le silence — tu montres que tu doutes si tu ajoutes quelque chose',
              'Le ton bas et lent = certitude. Tu accompagnes, tu ne pousses pas',
              'Si objection remonte ici : retour bref en Phase 9 — puis retour Phase 10'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Phase 10 Décision',
              cards: [
                { front: 'Qu\'est-ce que le closing, réellement ?', back: 'Le closing n\'est pas un acte de persuasion — c\'est un acte de clarté. Tu fais voir les deux chemins. La décision devient évidente d\'elle-même.' },
                { front: 'Quels sont les 3 temps de la Phase 10 ?', back: '1. CHOIX BINAIRE : deux options claires, sans argument, sans pression 2. SILENCE : minimum 3 secondes — tu ne remplis pas 3. VÉRIFICATION : "Qu\'est-ce qui pourrait encore vous bloquer ?"' },
                { front: 'Que se passe-t-il si tu ajoutes un argument après le silence ?', back: 'Tu montres que tu doutes — et il le ressent aussitôt. Règle d\'or : après ta phrase de closing, ne parle plus. Le premier qui parle, perd.' },
                { front: 'Pourquoi utiliser les mots du prospect dans l\'option 2 ?', back: '"Vous atteignez [objectif avec SES mots]" — pas une phrase toute faite. L\'ancrage émotionnel créé en Phase 8 se retrouve ici. C\'est pour ça qu\'il fallait noter ses mots.' },
                { front: 'Que faire si une objection remonte en Phase 10 ?', back: 'Si "Qu\'est-ce qui pourrait encore vous bloquer ?" ramène une objection — tu retournes brièvement en Phase 9, tu la traites, puis tu reviens en Phase 10.' }
              ]
            }
          },

          {
            id: 'p10-script',
            title: 'Le Script de Closing Final',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Phase 10 — Le choix décisif</h2>

  <h3>Script complet de closing</h3>
  <div class='script-block big-script decision-script'>
    <div class='script-line'>
      <span class='script-text'>« Aujourd'hui vous avez deux options : »</span>
    </div>
    <div class='option-block bad-option'>
      <span class='option-num'>1</span>
      <span class='option-text'>Vous continuez comme maintenant → <strong>rien ne change.</strong></span>
    </div>
    <div class='option-block good-option'>
      <span class='option-num'>2</span>
      <span class='option-text'>Vous mettez en place ce qu'il faut → <strong>vous atteignez [objectif avec ses mots].</strong></span>
    </div>
    <div class='script-action'>Silence — minimum 3 secondes</div>
    <div class='script-separator'></div>
    <div class='script-line'>
      <span class='script-text'>« Qu'est-ce qui pourrait encore vous bloquer aujourd'hui ? »</span>
    </div>
    <div class='script-separator'></div>
    <div class='script-line highlight'>
      <span class='script-text'>« Ok parfait. On met ça en place ensemble. »</span>
    </div>
  </div>

  <h3>Exemple terrain</h3>
  <div class='terrain-example'>
    <div class='ex-step'>Closer : <em>"Aujourd'hui, vous avez deux options…"</em></div>
    <div class='ex-step pause'>PAUSE — 4 secondes</div>
    <div class='ex-step'>Prospect : <em>"Autant y aller."</em></div>
    <div class='ex-result'>→ Tu n'as rien ajouté. La décision s'est faite d'elle-même.</div>
  </div>

  <h3>Ce qu'il ne faut jamais faire</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Ajouter un argument après le silence — tu montres que tu doutes</div>
    <div class='error-item'>✗ Parler avant que le silence ait fait son effet — moins de 3 secondes, c'est trop tôt</div>
    <div class='error-item'>✗ Utiliser une formule générique — utilise ses propres mots dans l'option 2</div>
    <div class='error-item'>✗ Relancer avec une question ouverte si le silence dure — tiens la posture</div>
  </div>

  <div class='rule-block'>
    <p><strong>Règle d'or : après votre phrase de closing, ne parlez plus. Le premier qui parle, perd.</strong></p>
  </div>
</div>`,
            keyPoints: [
              '"Aujourd\'hui vous avez deux options : 1. Vous continuez → rien ne change. 2. Vous mettez en place → vous atteignez [SES MOTS]."',
              'Silence minimum 3 secondes — ne rien ajouter',
              '"Qu\'est-ce qui pourrait encore vous bloquer aujourd\'hui ?" — vérification finale',
              '"Ok parfait. On met ça en place ensemble." — conclusion',
              'Règle d\'or : après la phrase de closing, ne plus parler. Le premier qui parle, perd.'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Phase 10',
              scenario: 'Simule 5 clôtures avec un collègue. Expose le choix, marque 3 secondes, observe. Évalue :',
              steps: [
                'Ai-je posé le choix clairement avec ses mots dans l\'option 2 ?',
                'Ai-je marqué un silence réel d\'au moins 3 secondes ?',
                'Mon ton est-il resté bas et assuré jusqu\'à la fin ?',
                'Le client a-t-il pris sa propre décision sans que je pousse ?',
                'Ai-je évité d\'ajouter un argument final ?'
              ],
              idealAnswer: 'Le closer efficace n\'impose rien. Il guide un raisonnement que le client termine de lui-même. La décision logique apparaît d\'elle-même.'
            }
          }

        ]
      }

    ]
  },
  'modules-terrain': {
    id: 'modules-terrain',
    title: 'Modules Terrain',
    subtitle: '5 Contextes de Vente',
    description: 'Les déclinaisons concrètes des 10 phases universelles : Stand/Retail, Porte-à-Porte, Immobilier, Call et Fitness. Scripts prêts à l\'emploi pour chaque situation.',
    duration: '4h',
    level: 'Intermédiaire',
    color: '#2C5F2D',
    icon: '🎯',
    modules: [

      {
        id: 'terrain-stand',
        title: 'Module 1 — Closing sur Stand',
        subtitle: 'Retail / Pare-brise',
        lessons: [

          {
            id: 'stand-theorie',
            title: 'La Mécanique du Stand',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Module 1 — Closing sur Stand</h2>
  <div class='lesson-intro'>
    <p>La vente sur stand se joue sur le réflexe, pas sur l'argument. Le client est en mouvement, distrait, et ne t'attend pas.</p>
    <p>Tu dois créer un arrêt instantané, obtenir une micro-conversation et lancer la relation sans jamais paraître insistant.</p>
  </div>
  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Stopper une personne en déplacement et obtenir une interaction en moins de cinq secondes, avec une ouverture de dialogue contrôlée.</p>
  </div>
  <h3>L'accroche qui arrête le flux</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Posture corporelle</strong>
      <p>Ton corps est légèrement orienté vers la trajectoire du prospect — jamais en position frontale.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Installer sa légitimité</strong>
      <p>Ensuite seulement, tu prends la main pour installer ta légitimité — « je vérifie », « je m'occupe » — sans jamais chercher à parler de produit.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Le contraste comme levier</strong>
      <p>Toute l'efficacité repose sur le contraste entre ton ton calme et le rythme du lieu. Ta voix doit être claire, posée, ni haute ni rapide.</p>
    </div>
  </div>
  <div class='principle-block'>
    <p>Tu n'as ni le luxe du temps ni celui de la préparation : chaque phrase doit détourner l'attention du flux. Une accroche courte, suivie d'un silence, arrête le mouvement.</p>
    <p>Ta posture, ton rythme et ta capacité à utiliser le silence valent plus que n'importe quelle offre.</p>
  </div>
  <h3>Objectif de performance</h3>
  <div class='timing-block'>
    <span class='timing-num'>1/8</span>
    <p>1 réponse pour 8 passages maximum. Si tu dépasses ce ratio, corrige ton débit, pas ta phrase — la différence se joue sur la voix, pas le texte.</p>
  </div>
</div>`,
            keyPoints: [
              'La vente sur stand se joue sur le réflexe — le client est en mouvement',
              'Posture corporelle : jamais en position frontale — légèrement orienté vers la trajectoire',
              'Contraste entre ton calme et le rythme du lieu — voix claire, posée, ni haute ni rapide',
              'Objectif : 1 réponse pour 8 passages maximum',
              'Si ratio < 1/8 : corriger le débit, pas la phrase — la différence est dans la voix'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Stand : Mécanique',
              cards: [
                { front: 'Pourquoi la vente sur stand se joue sur le réflexe et non l\'argument ?', back: 'Le client est en mouvement, distrait, et ne t\'attend pas. Tu n\'as ni le temps ni la préparation. Chaque phrase doit détourner l\'attention du flux en une fraction de seconde.' },
                { front: 'Quelle est la règle de posture corporelle sur stand ?', back: 'Corps légèrement orienté vers la trajectoire du prospect — jamais en position frontale. La position frontale crée une confrontation involontaire.' },
                { front: 'Quel est le ratio de performance attendu sur stand ?', back: '1 réponse pour 8 passages maximum. Si tu n\'atteins pas ce ratio, le problème est dans le débit vocal, pas dans le contenu de la phrase.' },
                { front: 'Que faut-il corriger si le taux d\'arrêt est insuffisant ?', back: 'Le débit et le ton vocal — pas le texte. La différence se joue sur la voix, pas le contenu. Ralentir, baisser la voix, marquer le silence.' },
                { front: 'Quel est l\'objectif du Module Stand en termes de résultat ?', back: 'Stopper une personne en déplacement et obtenir une interaction en moins de cinq secondes, avec une ouverture de dialogue contrôlée.' }
              ]
            }
          },

          {
            id: 'stand-script',
            title: 'Le Script Stand Complet',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Module 1 — Script d'approche pare-brise</h2>
  <h3>Séquence complète en 6 phases</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='phase-badge'>PHASE 1 — STOP</span>
      <span class='script-text'>"Bonjour, le pare-brise va bien aujourd'hui ? Pas d'impact ? Pas de fissure ?"</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>PHASE 2 — ACCROCHE</span>
      <div class='script-line'>
        <span class='script-speaker'>Prospect</span>
        <span class='script-text'>"Si, j'ai un impact."</span>
      </div>
      <span class='script-text'>"Ah ouais… ça vous est arrivé comment ?"</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>PHASE 3 — LIEN</span>
      <span class='script-text'>"Et ça fait combien de temps ?"</span>
      <span class='script-text'>"Vous avez déjà regardé pour le réparer ou pas encore ?"</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>PHASE 4 — TRANSITION</span>
      <span class='script-text'>"Je vous demande ça parce qu'en ce moment on a une offre assez intéressante."</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>PHASE 5 — OFFRE</span>
      <span class='script-text'>"On vous offre soit la franchise, soit une Nintendo Switch pour la réparation."</span>
    </div>
    <div class='script-step highlight'>
      <span class='phase-badge'>PHASE 6 — FERMETURE</span>
      <span class='script-text'>"Le plus simple c'est qu'on regarde ça ensemble 2 minutes et je vous dis si vous êtes éligible."</span>
    </div>
  </div>
  <h3>Les 3 leviers du script</h3>
  <div class='three-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Surprise</strong>
      <p>La première question est inattendue — aucun lien visible avec une vente.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Silence</strong>
      <p>Le silence provoque la réaction.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Curiosité</strong>
      <p>La relance "pas d'impact…" confirme ta compétence.</p>
    </div>
  </div>
  <div class='principle-block'>
    <p>Tu passes d'un inconnu à un interlocuteur en trois phrases, sans jamais demander son attention.</p>
  </div>
  <h3>Erreurs à éviter</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Se placer trop près du passage</div>
    <div class='error-item'>✗ Sourire de manière insistante</div>
    <div class='error-item'>✗ Parler sans marquer de pause</div>
    <div class='error-item'>✗ Donner des explications avant la réaction</div>
    <div class='error-item'>✗ Montrer le stand ou le support trop tôt : visuel avant verbal = rejet immédiat</div>
  </div>
</div>`,
            keyPoints: [
              '"Bonjour, le pare-brise va bien aujourd\'hui ? Pas d\'impact ? Pas de fissure ?"',
              '"Ça vous est arrivé comment ?" → "Ça fait combien de temps ?" → "Vous avez regardé pour le réparer ?"',
              'Transition : "on a une offre assez intéressante" → Offre → Fermeture',
              '"Le plus simple c\'est qu\'on regarde ça ensemble 2 minutes" — fermeture naturelle',
              'Exercice : 30 accroches de suite sur stand, sans changer un mot — noter le taux d\'arrêt'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Stand',
              scenario: 'Tu viens de faire 30 accroches sur stand. Évalue sur 5 critères :',
              steps: [
                'Ai-je obtenu au moins 10 réponses pour 80 interpellations ?',
                'Ai-je respecté le silence après l\'accroche ?',
                'Ai-je gardé une posture ouverte sans bouger les bras trop tôt ?',
                'Ai-je formulé la deuxième phrase seulement après réaction ?',
                'Ai-je conservé un ton neutre et sûr ?'
              ],
              idealAnswer: 'Objectif : 1 réponse pour 8 passages. Varie ton ton et analyse le taux d\'arrêt. Si ratio insuffisant : corriger le débit vocal, pas le texte.'
            }
          }

        ]
      },

      {
        id: 'terrain-pap',
        title: 'Module 2 — Closing Porte-à-Porte',
        subtitle: 'Fibre / Service terrain',
        lessons: [

          {
            id: 'pap-theorie',
            title: 'La Légitimité Physique',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Module 2 — Closing Porte-à-Porte</h2>
  <div class='lesson-intro'>
    <p>Le porte-à-porte combine exigence physique et rigueur verbale. Tu rencontres des clients non préparés, souvent méfiants, parfois pressés.</p>
    <p>Ta force : la légitimité instantanée, la persistance calme et la gestion du ton.</p>
    <p>Tu ne vends pas : tu vérifies une information. Tu ne demandes pas : tu avances naturellement.</p>
  </div>
  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Entrer chez un client sans résistance ; ouvrir un échange réel dans les 60 premières secondes.</p>
  </div>
  <h3>Les 4 principes</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Neutraliser la méfiance</strong>
      <p>Ta première phrase neutralise la méfiance. L'attitude « je fais mon travail » déplace le rapport de force : le prospect te laisse passer parce que ton action paraît institutionnelle.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Ton, phrase, mouvement</strong>
      <p>Ton ton doit être neutre, ta phrase courte, et ton mouvement progressif : avance en parlant.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Construire le lien rapidement</strong>
      <p>Une fois entré, construis rapidement le lien : observation du lieu, phrase miroir « c'est sympa chez vous », puis mini-diagnostic.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>4</span>
      <strong>La locomotion — ton arme principale</strong>
      <p>Le mouvement constant est ta meilleure arme : si tu t'arrêtes, tu invites le refus.</p>
    </div>
  </div>
  <div class='principle-block'>
    <p><strong>L'apparence institutionnelle de ton geste est ce qui désarme le prospect — pas ton discours.</strong></p>
  </div>
  <h3>Objectif de performance</h3>
  <div class='timing-block'>
    <span class='timing-num'>35%</span>
    <p>Taux d'entrée minimum à atteindre. Portes franchies / portes toquées. C'est ton indicateur de performance clé — mesure-le à chaque session.</p>
  </div>
</div>`,
            keyPoints: [
              'Tu ne vends pas — tu vérifies une information. Tu ne demandes pas — tu avances naturellement',
              '4 principes : neutraliser méfiance + ton/phrase/mouvement + créer lien + locomotion constante',
              'La locomotion : si tu t\'arrêtes, tu invites le refus — avance en parlant',
              'L\'apparence institutionnelle désarme le prospect — pas le discours',
              'Objectif : taux d\'entrée minimum 35% (portes franchies / portes toquées)'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — PAP : Mécanique',
              cards: [
                { front: 'Qu\'est-ce que la "locomotion" en PAP et pourquoi est-elle essentielle ?', back: 'Le mouvement constant : avancer en parlant. Si tu t\'arrêtes, tu invites le refus. Le mouvement maintient l\'élan — un arrêt crée un moment de décision que tu ne contrôles pas.' },
                { front: 'Comment l\'attitude "je fais mon travail" déplace-t-elle le rapport de force ?', back: 'Elle rend ton action institutionnelle — le prospect te laisse passer parce que tu sembles être là pour une raison officielle, pas pour vendre. Cela neutralise la méfiance initiale.' },
                { front: 'Quelle est la séquence de création de lien après être entré ?', back: 'Observation du lieu → phrase miroir ("c\'est sympa chez vous") → mini-diagnostic → transition vers la table ("plutôt salon ou cuisine ?").' },
                { front: 'Quel est le taux d\'entrée cible en PAP ?', back: '35% minimum (portes franchies / portes toquées). Si tu réponds non à plus d\'une question d\'auto-évaluation, reviens à l\'entrée de base le lendemain.' },
                { front: 'Quelle est la différence entre PAP et stand ?', back: 'Stand : arrêter quelqu\'un en mouvement (externe). PAP : entrer dans l\'espace privé de quelqu\'un sans résistance. La légitimité institutionnelle remplace la rupture cognitive.' }
              ]
            }
          },

          {
            id: 'pap-script',
            title: 'Scripts PAP Complets',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 2 — Scripts PAP Fibre</h2>
  <h3>Ouverture à la porte</h3>
  <div class='script-block big-script'>
    <div class='script-step highlight'>
      <span class='script-text'>"Bonjour. Je m'occupe du raccordement fibre sur votre secteur. On a redéployé jusqu'à 8 gigas dans le quartier, donc je vérifie que votre installation est conforme, ça prend 2 minutes."</span>
    </div>
    <div class='script-action'>→ "Parfait." (Tu avances naturellement.)</div>
  </div>
  <h3>Gestion des refus classiques</h3>
  <div class='script-block'>
    <div class='script-context'>Si refus général</div>
    <div class='script-line'>
      <span class='script-text'>"Je comprends. Avec l'augmentation de puissance, on doit revérifier que toutes les installations suivent."</span>
    </div>
    <div class='script-context'>Si déjà fibré</div>
    <div class='script-line'>
      <span class='script-text'>"Oui justement. Avec les 8 gigas, on revérifie que votre installation est toujours conforme."</span>
    </div>
  </div>
  <h3>Mini-Diagnostic</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Le wifi passe bien partout ou ça coupe parfois dans les chambres ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Et la télé, il y a des petits problèmes de connexion de temps en temps ?"</span>
    </div>
  </div>
  <h3>Création de lien + Transition table</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"C'est sympa chez vous."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Vous êtes parti où là ?" ou "Vous jouez à quoi en ce moment ?"</span>
    </div>
    <div class='script-separator'></div>
    <div class='script-line'>
      <span class='script-text'>"Ok je vois. Je vous prends juste un coin de table, je vous explique rapidement et je vous laisse."</span>
    </div>
    <div class='script-line highlight'>
      <span class='script-text'>"Plutôt salon ou cuisine ?"</span>
    </div>
  </div>
  <h3>Présentation de l'offre</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Aujourd'hui vous êtes chez qui ? Et vous payez combien environ ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Aujourd'hui vous êtes à environ 54€. Là vous passez à 44,99€ par mois tout compris. Soit 10€ d'économie par mois, donc 120€ à l'année. Pour 8 fois plus de service."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Vous n'avez rien à faire. SFR a fait le nécessaire dans le bâtiment. Orange cède automatiquement la ligne, vous gardez votre numéro. Tout se fait automatiquement."</span>
    </div>
  </div>
  <h3>Si hésitation</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Qu'est-ce qui vous ferait hésiter aujourd'hui ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Le technicien vient quand vous voulez avec les nouveaux boîtiers, il installe tout."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"L'installation est offerte. Vous pouvez avoir jusqu'à 100 € remboursés sur les frais de résiliation. Et je vous offre le premier mois."</span>
    </div>
  </div>
  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ S'arrêter devant la porte sans bouger</div>
    <div class='error-item'>✗ Poser des questions ouvertes</div>
    <div class='error-item'>✗ Accepter le premier « non »</div>
    <div class='error-item'>✗ Discuter au lieu d'avancer</div>
    <div class='error-item'>✗ Parler de « vérification gratuite » : cela redevient commercial</div>
  </div>
</div>`,
            keyPoints: [
              '"Je m\'occupe du raccordement fibre. On a redéployé jusqu\'à 8 gigas, je vérifie que votre installation est conforme, ça prend 2 minutes."',
              'Refus : "Avec l\'augmentation de puissance, on doit revérifier que toutes les installations suivent."',
              'Déjà fibré : "Avec les 8 gigas, on revérifie que votre installation est toujours conforme."',
              'Transition : "Je vous prends juste un coin de table... Plutôt salon ou cuisine ?"',
              'Offre : "44,99€ tout compris. Soit 10€ d\'économie par mois, 120€ à l\'année. Pour 8 fois plus de service."'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation PAP',
              scenario: 'Après chaque porte, évalue sur 5 critères :',
              steps: [
                'Ai-je avancé pendant que je parlais ?',
                'Ai-je insisté au moins deux fois sans changer de ton ?',
                'Ai-je créé un lien rapide une fois entré ?',
                'Ai-je obtenu le passage à la table ?',
                'Ai-je gardé le rythme sans justification ?'
              ],
              idealAnswer: 'Objectif : 15 portes par jour minimum, taux d\'entrée 35%+. Si tu réponds non à plus d\'une question — revenir à l\'entrée de base et recommencer le lendemain.'
            }
          }

        ]
      },

      {
        id: 'terrain-immo',
        title: 'Module 3 — Closing Immobilier',
        subtitle: 'Négociation &amp; signature',
        lessons: [

          {
            id: 'immo-theorie',
            title: 'La Prospection Immobilière',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Module 3 — Closing Immobilier</h2>
  <div class='lesson-intro'>
    <p>La prospection immobilière repose sur la gestion du doute. Le prospect a déjà été approché, méfiant envers les agences.</p>
    <p>Ton angle : <strong>diagnostic et valeur, pas argument</strong>. Tu ne vends pas une prestation ; tu offres une vérification ou une expertise.</p>
  </div>
  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Obtenir un rendez-vous visite en moins de deux minutes, avec un consentement clair et une perception d'expertise.</p>
  </div>
  <h3>La démarche en 4 points</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Transformer l'appel intrusif en échange utile</strong>
      <p>Ne te présente pas comme un "agent" : adopte la posture d'un acteur du secteur qui vérifie les opportunités. Formule clé : "Je passe vérifier." Une phrase. Un ton calme. Une logique claire. C'est suffisant pour ouvrir la porte.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Une phrase courte, un ton calme</strong>
      <p>La formulation tient en trois mots : "je passe vérifier". La simplicité rassure et désarme les résistances.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Sécuriser l'hésitation par le bénéfice concret</strong>
      <p>Quand le prospect hésite, rappelle l'avantage réel : estimation complète, sans engagement de sa part.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>4</span>
      <strong>L'objectif : une entrée physique sur le lieu</strong>
      <p>La signature n'est pas le but de cet appel. Le seul objectif est d'obtenir un rendez-vous sur place.</p>
    </div>
  </div>
  <div class='principle-block'>
    <p><strong>Un bon closing immobilier repose sur la crédibilité locale et la simplicité.</strong></p>
    <p>Une fois la date validée, tu appliques la Phase 4 dès ton arrivée : "Je préfère être clair, voilà comment on va procéder."</p>
  </div>
</div>`,
            keyPoints: [
              'La prospection immo se gagne sur la gestion du doute — pas sur le pitch',
              'Posture : acteur du secteur qui vérifie, pas agent qui vend',
              'Formule clé : "Je passe vérifier" — une phrase, un ton calme, une logique claire',
              'Objectif de l\'appel : le RDV visite uniquement — pas la signature',
              'Une fois sur place : appliquer Phase 4 (cadrage) immédiatement'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Immo : Mécanique',
              cards: [
                { front: 'Quel est le seul objectif d\'un appel de prospection immobilière ?', back: 'Obtenir un rendez-vous visite. Pas une collaboration, pas une estimation par téléphone, pas les honoraires. Un seul objectif : la date de visite.' },
                { front: 'Pourquoi adopter la posture "acteur du secteur" plutôt qu\'"agent" ?', back: 'Le prospect a déjà été approché et est méfiant. "Je travaille uniquement sur votre secteur" crée instantanément la crédibilité locale. "Agent" déclenche la résistance.' },
                { front: 'Quelles erreurs éviter lors de l\'appel de prospection immo ?', back: 'Tenter d\'expliquer l\'offre trop tôt. Laisser le doute sur les intentions. Parler d\'honoraires ou de collaboration avant la visite. Laisser un silence mal géré entre question et choix.' },
                { front: 'Quel mécanisme utilise "jeudi ou vendredi ?" ?', back: 'L\'alternative temporelle transforme le refus possible en choix concret, réduisant la friction décisionnelle. Tu proposes un choix dans le couloir que tu as tracé.' },
                { front: 'Que se passe-t-il une fois sur place ?', back: 'Tu appliques la Phase 4 dès l\'arrivée : cadrage professionnel. "Avant de parler du bien, j\'aimerais comprendre votre projet. Pourquoi vous vendez aujourd\'hui ?"' }
              ]
            }
          },

          {
            id: 'immo-script',
            title: 'Scripts Immobilier Complets',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 3 — Séquence d'appel &amp; RDV</h2>
  <h3>Séquence d'appel téléphonique — 3 phases</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='phase-badge'>OUVERTURE</span>
      <span class='script-text'>"Bonjour, je vous appelle par rapport à l'annonce de votre bien. Il est toujours disponible ?"</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>POSITIONNEMENT</span>
      <span class='script-text'>"Parfait. Je travaille uniquement sur La Martelle et la Chamberte. J'aurais aimé visiter votre bien, savoir s'il correspondait bel et bien aux critères de certains de mes acquéreurs, étant donné que mon portefeuille client se situe sur votre secteur."</span>
    </div>
    <div class='script-step highlight'>
      <span class='phase-badge'>PRISE DE RDV</span>
      <span class='script-text'>"Vous auriez une disponibilité jeudi ou vendredi pour que je passe vous voir ?"</span>
    </div>
  </div>
  <h3>Arrivée sur place — Exploration</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Merci de m'accueillir. Avant de parler du bien, j'aimerais comprendre votre projet. Pourquoi vous vendez aujourd'hui ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Vous aimeriez être où dans 3 à 6 mois ?"</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Qu'est-ce qui est le plus important pour vous dans cette vente ?"</span>
    </div>
  </div>
  <h3>Méthode d'estimation</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"De toute façon, nous, c'est notre façon de procéder. On fait une estimation au prix du marché, en se basant sur les biens actuellement en vente, les biens qui ont été réellement vendus autour, et le prix précis du secteur."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"On s'appuie aussi sur notre expertise professionnelle et sur des logiciels qui nous permettent d'affiner au maximum."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Parce que notre objectif n'est pas de rentrer un bien à tout prix. Nous, on a fait le choix de ne prendre qu'une dizaine de biens par secteur. Pourquoi ? Parce qu'on veut pouvoir travailler chaque bien avec la même intensité, et pas avoir 150 biens en vitrine… sans les vendre."</span>
    </div>
  </div>
  <h3>Réseau &amp; Pré-Closing</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Aujourd'hui, vous êtes sur Le Bon Coin ou SeLoger. Nous, concrètement, votre bien va être diffusé sur des sites professionnels, donc il va être vu beaucoup plus, et surtout par des acheteurs qualifiés."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Et surtout, nous sommes un réseau. On travaille avec toutes les agences. Ça veut dire quoi ? Si une autre agence a un client, elle nous appelle, et on partage les honoraires à 50/50."</span>
    </div>
    <div class='script-line'>
      <span class='script-text'>"Donc vous, vous avez un seul interlocuteur. Mais en réalité, vous travaillez avec tout le marché. Et surtout, vous ne perdez aucun acheteur."</span>
    </div>
  </div>
  <h3>Cadrage final</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"Ce que je vous propose : on prend entre 24 et 48 heures pour vous faire une estimation complète, basée sur votre bien et sur votre secteur."</span>
    </div>
    <div class='script-line highlight'>
      <span class='script-text'>"L'objectif, c'est simple : vendre efficacement, et dans des délais cohérents."</span>
    </div>
  </div>
</div>`,
            keyPoints: [
              'Ouverture : "Bonjour, je vous appelle par rapport à l\'annonce de votre bien. Il est toujours disponible ?"',
              'Positionnement : "Je travaille uniquement sur La Martelle et la Chamberte..." — crédibilité locale',
              'RDV : "Vous auriez une disponibilité jeudi ou vendredi ?" — alternative temporelle',
              'Sur place : "Avant de parler du bien, j\'aimerais comprendre votre projet. Pourquoi vous vendez aujourd\'hui ?"',
              'Objectif : < 1min40 pour l\'appel de prospection — chronomètre chaque simulation'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Immobilier',
              scenario: 'Prépare ton pitch complet à froid, chronomètre < 1min40. Évalue sur 5 critères :',
              steps: [
                'Ai-je obtenu un créneau clair ?',
                'Ai-je offert un bénéfice concret (estimation) ?',
                'Ai-je évité les explications techniques ?',
                'Ai-je gardé une égalité du ton, sans pression ?',
                'Ai-je conclu sur un choix, pas une question ouverte ?'
              ],
              idealAnswer: 'Objectif : 90% de validation ou date proposée. Répète jusqu\'à ce score. Objectif timing appel : moins de 1min40.'
            }
          }

        ]
      },

      {
        id: 'terrain-call',
        title: 'Module 4 — Closing Call',
        subtitle: 'Appel à froid ou relance',
        lessons: [

          {
            id: 'call-theorie',
            title: 'La Structure du Call',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Module 4 — Closing Call</h2>
  <div class='lesson-intro'>
    <p>Le call est un exercice de rythme et d'énergie maîtrisée. Le prospect ne te voit pas ; toute ton autorité repose sur la voix.</p>
    <p>Ton ton, ton débit et ton silence construisent ton image de marque. Chaque appel est une orchestration : cadrer vite, diagnostiquer juste, décider clair.</p>
  </div>
  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Obtenir, en moins de 5 minutes, un engagement concret : rendez-vous, validation, ou décision.</p>
  </div>
  <h3>Structure en 7 étapes</h3>
  <div class='steps-grid'>
    <div class='step-item'><span class='step-num'>1</span><strong>Attention</strong><p>Phrase de rupture courte.</p></div>
    <div class='step-item'><span class='step-num'>2</span><strong>Légitimité</strong><p>Ton calme, posture vocale.</p></div>
    <div class='step-item'><span class='step-num'>3</span><strong>Engagement</strong><p>Micro-adhésion — "Ça vous va ?"</p></div>
    <div class='step-item'><span class='step-num'>4</span><strong>Cadrage</strong><p>"Je vous explique en deux minutes comment ça va se passer."</p></div>
    <div class='step-item'><span class='step-num'>5</span><strong>Diagnostic rapide</strong><p>4 questions clés.</p></div>
    <div class='step-item'><span class='step-num'>6</span><strong>Émotion et tension</strong><p>"Et si rien ne change ?"</p></div>
    <div class='step-item'><span class='step-num'>7</span><strong>Décision ou follow-up</strong><p>Conclusion claire et orientée action.</p></div>
  </div>
  <div class='principle-block'>
    <p>Chaque étape prépare la suivante — la structure crée la fluidité.</p>
    <p>En voix seule, la confiance se mesure au rythme de la respiration : une respiration lente inspire le professionnalisme.</p>
    <p><strong>Un bon call se conclut toujours par une décision, pas une promesse.</strong> Que ce soit une validation ou un non franc, c'est un progrès concret.</p>
  </div>
</div>`,
            keyPoints: [
              'Le call = rythme + énergie maîtrisée — toute l\'autorité repose sur la voix',
              '7 étapes : Attention → Légitimité → Engagement → Cadrage → Diagnostic → Tension → Décision',
              'Objectif : engagement concret en moins de 5 minutes',
              'Respiration lente = professionnalisme — la confiance se mesure au rythme de la respiration',
              'Un bon call se conclut par une décision — pas une promesse'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Call : Structure',
              cards: [
                { front: 'Pourquoi le call est-il un exercice de rythme plus que de contenu ?', back: 'Le prospect ne te voit pas — toute ton autorité repose sur la voix. Ton ton, débit et silence construisent ton image de marque. Le contenu seul ne suffit pas.' },
                { front: 'Quelles sont les 7 étapes de la structure call ?', back: '1. Attention (rupture courte) 2. Légitimité (ton calme) 3. Engagement ("ça vous va ?") 4. Cadrage 5. Diagnostic rapide (4 questions) 6. Émotion/tension 7. Décision ou follow-up' },
                { front: 'Quelle est la règle d\'or de conclusion d\'un call ?', back: 'Un bon call se conclut toujours par une décision, pas une promesse. Que ce soit une validation ou un non franc — c\'est un progrès concret. Jamais "je vous envoie un mail".' },
                { front: 'Comment la respiration affecte-t-elle l\'image projetée lors d\'un call ?', back: 'Une respiration lente inspire le professionnalisme. La confiance se mesure au rythme de la respiration. Un débit trop rapide trahit la nervosité.' },
                { front: 'Quelles erreurs commettent les closers en call ?', back: 'Parler trop vite. Chercher à combler les silences. Donner trop d\'informations. Reporter la décision ("je vous envoie un mail"). Chaque silence structure ton autorité.' }
              ]
            }
          },

          {
            id: 'call-script',
            title: 'Scripts Call Complets',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 4 — Scripts Call</h2>
  <h3>Ouverture + Filtre secrétaire</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='script-text'>"Bonjour, monsieur Guiné, Thomas à l'appareil. J'aimerais joindre monsieur [Nom], s'il vous plaît."</span>
    </div>
    <div class='script-line'>
      <span class='script-speaker'>Secrétaire</span>
      <span class='script-text'>"Il n'est pas disponible, je peux prendre un message ?"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"Non merci, je verrai ça directement avec lui. Pouvez-vous lui demander de me rappeler dès que possible ? C'est important. Merci."</span>
    </div>
  </div>
  <h3>Cadrage de l'appel</h3>
  <div class='script-block'>
    <div class='script-step highlight'>
      <span class='script-text'>"Je vous explique en 2 minutes comment ça va se passer, et à la fin on voit si ça vaut le coup d'avancer. Ça vous va ?"</span>
    </div>
  </div>
  <h3>Diagnostic</h3>
  <div class='script-block'>
    <div class='script-step'>
      <span class='script-text'>"Très bien. Aujourd'hui, vous en êtes où ?"</span>
    </div>
  </div>
  <h3>Tension</h3>
  <div class='script-block'>
    <div class='script-step'>
      <span class='script-text'>"Et si rien ne change dans les prochains mois ?"</span>
    </div>
    <div class='script-action'>— Silence —</div>
  </div>
  <h3>Décision</h3>
  <div class='script-block'>
    <div class='script-context'>Option A — naturelle</div>
    <div class='script-step'>
      <span class='script-text'>"D'accord. Voyons ce qu'on peut mettre en place."</span>
    </div>
    <div class='script-context'>Option B — cadrage direct</div>
    <div class='script-step highlight'>
      <span class='script-text'>"Je préfère être clair : à la fin de l'appel, on décide ensemble si on avance ou non. Ça vous va ?"</span>
    </div>
  </div>
  <h3>Points clés du script</h3>
  <div class='analysis-grid'>
    <div class='analysis-item'><p>Ces formulations posent un cadre clair et un tempo stable. La précision rassure, le « ça vous va ? » engage.</p></div>
    <div class='analysis-item'><p>Chaque silence structure ton autorité. Objectif de cadrage : moins de 3 minutes.</p></div>
  </div>
</div>`,
            keyPoints: [
              'Filtre secrétaire : "Non merci, je verrai ça directement avec lui. C\'est important."',
              'Cadrage : "Je vous explique en 2 minutes... et à la fin on voit si ça vaut le coup d\'avancer. Ça vous va ?"',
              'Diagnostic : "Très bien. Aujourd\'hui, vous en êtes où ?"',
              'Tension : "Et si rien ne change dans les prochains mois ?" — Silence',
              'Décision directe : "Je préfère être clair : à la fin de l\'appel, on décide ensemble si on avance ou non."'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Call',
              scenario: 'Réalise 5 appels de simulation. Enregistre chacun. Évalue sur 5 critères :',
              steps: [
                'Ai-je cadré l\'appel dans les 3 premières minutes ?',
                'Ai-je obtenu une micro-adhésion ?',
                'Ai-je utilisé au moins un silence stratégique ?',
                'Ai-je clos avec un accord ou une prochaine étape ?',
                'Suis-je resté cohérent en ton et en débit ?'
              ],
              idealAnswer: 'Objectif cadrage : moins de 3 minutes. Travaille 2 points précis : moduler la voix (monter/baisser selon le moment) + utiliser un silence complet après la dernière question.'
            }
          }

        ]
      },

      {
        id: 'terrain-fitness',
        title: 'Module 5 — Closing Fitness',
        subtitle: 'Le corps au centre de la conversation',
        lessons: [

          {
            id: 'fitness-theorie',
            title: 'La Vente d\'Émotion Corporelle',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Module 5 — Closing Fitness</h2>
  <div class='lesson-intro'>
    <p>Le closing fitness met le corps au centre de la conversation. Ton client parle d'énergie, de confiance, de regard des autres : c'est une vente d'émotion et de projection visuelle.</p>
    <p>Tu dois lui faire ressentir la réalité de son état et l'aider à visualiser ce qu'il peut devenir.</p>
  </div>
  <h3>Objectif</h3>
  <div class='objective-block'>
    <p>Transformer un bilan en prise de conscience émotionnelle, puis en engagement physique ou financier immédiat.</p>
    <p>Ressentir la réalité · Visualiser la transformation · S'engager immédiatement</p>
  </div>
  <h3>La démarche en 4 temps</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-num'>1</span>
      <strong>Accroche / Légitimité</strong>
      <p>"Je m'occupe d'un programme de remise en forme sur le secteur."</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>2</span>
      <strong>Diagnostic</strong>
      <p>"Vous faites du sport ? Qu'est-ce qui vous dérange aujourd'hui ?"</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>3</span>
      <strong>Émotion / Tension</strong>
      <p>Le bilan n'est pas une simple mesure ; c'est un miroir émotionnel. "Et si rien ne change dans 6 mois ?"</p>
    </div>
    <div class='pillar'>
      <span class='pillar-num'>4</span>
      <strong>Projection / Décision</strong>
      <p>Le rôle du closer est d'accompagner cette bascule. "Imaginez-vous en forme, sans douleur, d'ici 3 mois."</p>
    </div>
  </div>
  <div class='principle-block'>
    <p>Le closing fitness ne repose pas sur un produit mais sur une <strong>transformation ressentie</strong>. Quand le client se visualise dans son futur corps, la décision devient naturelle.</p>
    <p>Ton objectif : ne pas parler plus de 50% du temps et obtenir une émotion verbalisée.</p>
  </div>
</div>`,
            keyPoints: [
              'Fitness = vente d\'émotion et de projection visuelle — pas de produit',
              '4 temps : Accroche/Légitimité → Diagnostic → Émotion/Tension → Projection/Décision',
              'Le bilan est un miroir émotionnel — pas une simple mesure',
              'Ne pas parler plus de 50% du temps — obtenir une émotion verbalisée',
              'Quand il se visualise dans son futur corps, la décision devient naturelle'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Fitness : Mécanique',
              cards: [
                { front: 'Pourquoi le closing fitness est-il une vente d\'émotion ?', back: 'Le client parle d\'énergie, de confiance, de regard des autres. Ce n\'est pas une transaction produit — c\'est une transformation personnelle ressentie. L\'émotion déclenche l\'engagement.' },
                { front: 'Quel est le rôle du bilan corporel dans le closing fitness ?', back: 'Ce n\'est pas une simple mesure — c\'est un miroir émotionnel. Le bilan (taux de graisse, masse musculaire) fait face au prospect à sa réalité de façon chiffrée et concrète.' },
                { front: 'Quelle est la règle des 50% en closing fitness ?', back: 'Ne pas parler plus de 50% du temps. L\'objectif est d\'obtenir une émotion verbalisée. Si tu parles plus, tu ne laisses pas le client construire sa propre émotion.' },
                { front: 'Comment fonctionne la dynamique en 5 temps du script fitness ?', back: '1. Curiosité 2. Constat 3. Tension 4. Visualisation 5. Décision. L\'emploi du futur positif déclenche naturellement le désir. Le silence après la tension est essentiel.' },
                { front: 'Quelle erreur est fatale en closing fitness ?', back: 'Oublier la tension avant la proposition. Donner des chiffres de bilan sans sens émotionnel. Parler avant que le client formule son émotion. Être trop prévenant ou trop énergique.' }
              ]
            }
          },

          {
            id: 'fitness-script',
            title: 'Scripts Fitness Complets',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 5 — Scripts Fitness</h2>
  <h3>Phase 1 — Accroche démarchage physique</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='phase-badge'>LÉGITIMITÉ</span>
      <span class='script-text'>"Bonjour, je m'occupe d'un programme de remise en forme sur le secteur, et aujourd'hui on offre des bilans complets gratuits."</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>RAISON</span>
      <span class='script-text'>"On fait ça pour des personnes qui veulent améliorer leur physique ou leur santé, et je me suis dit que ça pouvait vous concerner."</span>
    </div>
    <div class='script-step'>
      <span class='phase-badge'>MICRO-ENGAGEMENT</span>
      <span class='script-text'>"Vous avez déjà fait un bilan complet de votre corps ?"</span>
    </div>
  </div>
  <h3>Transition RDV + Closing RDV</h3>
  <div class='script-block'>
    <div class='script-line'>
      <span class='script-text'>"En gros, on utilise une balance qui analyse : graisse, masse musculaire, eau, graisse viscérale… Ça permet de voir exactement où vous en êtes."</span>
    </div>
    <div class='script-line highlight'>
      <span class='script-text'>"Le plus simple, c'est que vous passiez, ça prend 10 minutes. Vous êtes plus disponible quand ?"</span>
    </div>
  </div>
  <h3>Phase 2 — Au club : Diagnostic &amp; Découverte</h3>
  <div class='script-block'>
    <div class='script-line'><span class='script-text'>"Vous faites du sport un peu ou pas du tout ?"</span></div>
    <div class='script-line'><span class='script-text'>"Vous avez déjà essayé quelque chose ?"</span></div>
    <div class='script-line'><span class='script-text'>"Aujourd'hui, votre objectif, ce serait quoi ?"</span></div>
    <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous dérange le plus dans votre corps ?"</span></div>
    <div class='script-line'><span class='script-text'>"Ça fait combien de temps que ça dure ?"</span></div>
    <div class='script-line'><span class='script-text'>"Vous avez déjà essayé sans succès ?"</span></div>
  </div>
  <h3>Amplification &amp; Tension</h3>
  <div class='script-block'>
    <div class='script-line'><span class='script-text'>"Ça vous impacte comment ?"</span></div>
    <div class='script-step highlight'><span class='script-text'>"Et si rien ne change dans 6 mois ?"</span></div>
  </div>
  <h3>Bilan + Choc</h3>
  <div class='script-block'>
    <div class='script-line'><span class='script-text'>"Ok, donc là concrètement : X Taux de graisse / X Masse musculaire"</span></div>
    <div class='script-line'><span class='script-text'>"Aujourd'hui, vous êtes à [réalité] et vous voulez [objectif]"</span></div>
  </div>
  <h3>Closing Final</h3>
  <div class='script-block big-script'>
    <div class='script-step'>
      <span class='script-text'>"Aujourd'hui vous avez deux options :"</span>
    </div>
    <div class='option-block bad-option'>
      <span class='option-num'>1</span>
      <span class='option-text'>Vous continuez comme maintenant → et dans 6 mois rien ne change.</span>
    </div>
    <div class='option-block good-option'>
      <span class='option-num'>2</span>
      <span class='option-text'>Vous mettez en place ce qu'il faut → et dans 6 mois vous avez enfin le physique que vous voulez.</span>
    </div>
    <div class='script-action'>(Silence)</div>
    <div class='script-step highlight'>
      <span class='script-text'>"Maintenant la vraie question : qu'est-ce qui pourrait vous empêcher d'avancer aujourd'hui ?"</span>
    </div>
    <div class='script-step'>
      <span class='script-text'>"Ok parfait. On démarre ensemble et on met ça en place."</span>
    </div>
  </div>
</div>`,
            keyPoints: [
              '"Je m\'occupe d\'un programme de remise en forme... on offre des bilans complets gratuits."',
              'Closing RDV : "Le plus simple, c\'est que vous passiez, ça prend 10 minutes. Vous êtes plus disponible quand ?"',
              'Tension : "Et si rien ne change dans 6 mois ?" — silence essentiel',
              'Décision : "Aujourd\'hui vous avez deux options..." → option 1 : rien ne change → option 2 : physique désiré → Silence',
              '"Maintenant la vraie question : qu\'est-ce qui pourrait vous empêcher d\'avancer aujourd\'hui ?"'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation Fitness',
              scenario: 'Faux entretien complet de 10 minutes. Structure : Bilan → Diagnostic → Tension → Projection. Évalue :',
              steps: [
                'Ai-je fait exprimer une douleur réelle ?',
                'Ai-je créé la tension « si rien ne change » ?',
                'Ai-je provoqué une projection positive ?',
                'Ai-je laissé les silences après les questions clés ?',
                'Ai-je terminé par une décision claire ?'
              ],
              idealAnswer: 'Objectif : ne pas parler plus de 50% du temps. Obtenir une émotion verbalisée. "On démarre ensemble et on met ça en place."'
            }
          }

        ]
      }

    ]
  },
  'lecture-comportementale': {
    id: 'lecture-comportementale',
    title: 'Lecture &amp; Adaptation Comportementale',
    subtitle: '4 Profils · Micro-signaux · Domination Silencieuse',
    description: 'Maîtriser l\'adaptation comportementale en temps réel : identifier les 4 profils, adapter ton approche instantanément, lire les micro-signaux et gérer les profils difficiles.',
    duration: '3h',
    level: 'Avancé',
    color: '#065A82',
    icon: '🧠',
    modules: [

      {
        id: 'comporte-profils',
        title: 'Module 1 — Les 4 Profils Types',
        subtitle: 'Identifier qui est en face de toi',
        lessons: [

          {
            id: 'profils-theorie',
            title: 'Identifier le Profil en Moins d\'1 Minute',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Module 1 — Les 4 Profils Types</h2>
  <div class='lesson-intro'>
    <p>Chaque prospect a une logique de décision différente. Le même script dit à un dominant et à un analytique donnera deux résultats opposés. Ton premier travail sur chaque call ou rendez-vous : <strong>identifier le profil</strong>. Tout le reste découle de là.</p>
  </div>

  <h3>Pourquoi ce module ?</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Sans adaptation</span>
      <p>Script unique pour tout le monde · Parle quand il faudrait écouter · Rassure quand il faudrait cadrer · Rate le moment de closer · Perd les profils difficiles</p>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Avec adaptation</span>
      <p>Lit le profil en moins d'1 minute · Parle comme le prospect pense · Détecte le moment de closer · Récupère les prospects perdus · Contrôle tous les profils</p>
    </div>
  </div>

  <h3>Profil DOMINANT — Décideur rapide</h3>
  <div class='profile-block dominant'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> Parle vite, coupe la parole · Veut aller droit au but · Impatient, autoritaire · Pose peu de questions
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Résultat rapide · Contrôle de la situation · Cadre + rapidité
    </div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"On va aller droit au but."</span></div>
      <div class='script-line'><span class='script-text'>"Aujourd'hui vous voulez un résultat, oui ou non ?"</span></div>
      <div class='script-line'><span class='script-text'>"Si oui, on avance. Sinon, on s'arrête."</span></div>
    </div>
  </div>

  <h3>Profil ANALYTIQUE — Rassurance logique</h3>
  <div class='profile-block analytique'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> Pose beaucoup de questions · Veut comprendre en détail · Hésite, réfléchit longtemps · Cherche la logique partout
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Sécurité · Logique et structure
    </div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Je vais vous expliquer étape par étape."</span></div>
      <div class='script-line'><span class='script-text'>"Dites-moi si quelque chose ne vous paraît pas clair."</span></div>
      <div class='script-action'>→ Tu sécurises son cerveau</div>
    </div>
  </div>

  <h3>Profil EMPATHIQUE — Émotionnel</h3>
  <div class='profile-block empathique'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> Parle de ressenti, d'expériences · Cherche la confiance avant tout · Peur de se tromper · Besoin d'être compris
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Être compris · Être rassuré humainement
    </div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Ce qui compte pour moi, c'est que vous soyez à l'aise."</span></div>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous ferait vous sentir sûr ?"</span></div>
      <div class='script-action'>→ Tu enlèves la pression</div>
    </div>
  </div>

  <h3>Profil HÉSITANT — Bloqué</h3>
  <div class='profile-block hesitant'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> "Je sais pas", "je vais réfléchir" · Fuit la décision · Tourne en rond · Manque de clarté
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Éviter de faire une erreur · Éviter la pression
    </div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous bloque concrètement ?"</span></div>
      <div class='script-action'>(silence)</div>
      <div class='script-line'><span class='script-text'>"Si on enlève le doute, vous feriez quoi ?"</span></div>
      <div class='script-action'>→ Tu forces la clarté</div>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>RETENIR : "Je ne parle pas comme je veux. Je parle comme lui a besoin."</strong></p>
  </div>
</div>`,
            keyPoints: [
              'DOMINANT : parle vite, coupe la parole → "On va droit au but. Résultat, oui ou non ?"',
              'ANALYTIQUE : beaucoup de questions, veut comprendre → "Je vais vous expliquer étape par étape"',
              'EMPATHIQUE : ressenti, confiance → "Ce qui compte, c\'est que vous soyez à l\'aise"',
              'HÉSITANT : "je réfléchis", fuit la décision → "Qu\'est-ce qui vous bloque concrètement ?" (silence)',
              'Règle absolue : ne pas parler comme on veut — parler comme lui a besoin'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Les 4 Profils',
              cards: [
                { front: 'Quels sont les signaux du profil DOMINANT ?', back: 'Parle vite, coupe la parole · Veut aller droit au but · Impatient, autoritaire · Pose peu de questions. Il veut : résultat rapide, contrôle, cadre + rapidité.' },
                { front: 'Comment s\'adapter à un ANALYTIQUE ?', back: '"Je vais vous expliquer étape par étape. Dites-moi si quelque chose ne vous paraît pas clair." Ton posé, structuré, précis. Mots-clés : logique / étape / comprendre. Éviter : "Faites-moi confiance", flou.' },
                { front: 'Quels sont les signaux du profil EMPATHIQUE ?', back: 'Parle de ressenti, d\'expériences · Cherche la confiance avant tout · Peur de se tromper · Besoin d\'être compris. Il veut : être compris, être rassuré humainement.' },
                { front: 'Comment forcer la clarté avec un HÉSITANT ?', back: '"Qu\'est-ce qui vous bloque concrètement ?" (silence) "Si on enlève le doute, vous feriez quoi ?" Ton cadrant, simple, direct. Tu forces la clarté sans forcer la décision.' },
                { front: 'Quel est le principe fondamental de la lecture comportementale ?', back: '"Je ne parle pas comme je veux. Je parle comme lui a besoin." Identifier le profil en moins d\'1 minute. Tout le reste découle de là.' }
              ]
            }
          },

          {
            id: 'profils-simulation',
            title: 'Simulation & Détection en Live',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 1 — Simulation : détecter le profil en live</h2>

  <h3>Simulation — Prospect dit : "Je veux réfléchir"</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Mauvais closer</span>
      <div class='script-line'><span class='script-text'>"Ok, je comprends."</span></div>
      <p>→ Aucune information récupérée.</p>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Bon closer</span>
      <div class='script-line'><span class='script-text'>"Quand vous dites réfléchir, c'est pour être sûr de votre choix ou parce que ce n'est pas le bon moment ?"</span></div>
      <div class='script-action'>Prospect : "Pour être sûr"</div>
      <div class='script-action'>▶ ANALYTIQUE détecté</div>
      <div class='script-line'><span class='script-text'>"Parfait. Donc ce qui compte pour vous, c'est d'avoir une vision claire avant de décider ?"</span></div>
      <p>→ Adaptation immédiate.</p>
    </div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Utiliser un seul script pour les 4 profils</div>
    <div class='error-item'>✗ Forcer un empathique avec les techniques d'un dominant</div>
    <div class='error-item'>✗ Mettre de la pression sur un hésitant sans avoir posé de cadre</div>
    <div class='error-item'>✗ Ne pas poser de questions pour identifier le profil</div>
  </div>

  <h3>Exercice pratique — 5 prochains appels</h3>
  <div class='table-block'>
    <div class='table-header'>
      <span>Call</span><span>Profil identifié</span><span>Signal détecté</span><span>Adaptation faite</span>
    </div>
    <div class='table-row'><span>Call 1</span><span>…</span><span>…</span><span>…</span></div>
    <div class='table-row'><span>Call 2</span><span>…</span><span>…</span><span>…</span></div>
    <div class='table-row'><span>Call 3</span><span>…</span><span>…</span><span>…</span></div>
    <div class='table-row'><span>Call 4</span><span>…</span><span>…</span><span>…</span></div>
    <div class='table-row'><span>Call 5</span><span>…</span><span>…</span><span>…</span></div>
  </div>
</div>`,
            keyPoints: [
              'Face à "je veux réfléchir" : "C\'est pour être sûr de votre choix ou parce que ce n\'est pas le bon moment ?"',
              'Détection ANALYTIQUE : "Pour être sûr" → "Ce qui compte, c\'est d\'avoir une vision claire avant de décider ?"',
              'Jamais un seul script pour les 4 profils — l\'adaptation est le skill',
              'Ne jamais forcer un empathique avec les techniques d\'un dominant',
              'Exercice : noter profil + signal + adaptation sur les 5 prochains appels'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Détection Profils',
              scenario: 'Après chaque appel ou rendez-vous, évalue ta capacité de détection :',
              steps: [
                'Ai-je identifié le profil dans la première minute ?',
                'Ai-je adapté mon ton et ma vitesse en conséquence ?',
                'Ai-je utilisé le bon script selon le profil ?',
                'Ai-je facilité sa décision plutôt que de la forcer ?'
              ],
              idealAnswer: 'Objectif : identifier le profil systématiquement avant d\'adapter le discours. Tenir un tableau de suivi sur 5 appels consécutifs.'
            }
          }

        ]
      },

      {
        id: 'comporte-adaptation',
        title: 'Module 2 — Adaptation aux Profils',
        subtitle: 'Parler comme il pense',
        lessons: [

          {
            id: 'adaptation-theorie',
            title: 'S\'Adapter : Même Rythme, Même Logique',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Module 2 — Adaptation aux profils</h2>
  <div class='lesson-intro'>
    <p>Lire un profil, c'est bien. <strong>S'adapter, c'est closer.</strong></p>
    <p>Si tu ne t'adaptes pas, tu crées de la résistance — même si ton offre est parfaite.</p>
  </div>
  <h3>Le principe clé</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label'>ANALYTIQUE — "J'ai besoin de comprendre"</span>
      <p>Si tu réponds : "Faites-moi confiance" → PERDU.</p>
    </div>
    <div class='comp-bad'>
      <span class='comp-label'>DOMINANT — "Va droit au but"</span>
      <p>Si tu expliques pendant 10 minutes → PERDU.</p>
    </div>
  </div>
  <h3>Tableau de référence — Adaptation par profil</h3>
  <div class='adaptation-table'>
    <div class='adapt-row header'>
      <span>PROFIL</span><span>TON &amp; RYTHME</span><span>MOTS-CLÉS</span><span>À ÉVITER</span>
    </div>
    <div class='adapt-row dominant'>
      <span>● DOMINANT</span><span>Rapide, direct, court</span><span>résultat / rapide / décision</span><span>Longues explications, détails</span>
    </div>
    <div class='adapt-row analytique'>
      <span>● ANALYTIQUE</span><span>Posé, structuré, précis</span><span>logique / étape / comprendre</span><span>"Faites-moi confiance", flou</span>
    </div>
    <div class='adapt-row empathique'>
      <span>● EMPATHIQUE</span><span>Chaleureux, lent, humain</span><span>ressentir / sûr / confiance</span><span>Pression, urgence, ton froid</span>
    </div>
    <div class='adapt-row hesitant'>
      <span>● HÉSITANT</span><span>Cadrant, simple, direct</span><span>clarté / décision / aujourd'hui</span><span>Trop d'options, complexité</span>
    </div>
  </div>
  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Forcer un profil avec une approche qui ne lui correspond pas</div>
    <div class='error-item'>✗ Parler trop vite à un analytique — il se ferme immédiatement</div>
    <div class='error-item'>✗ Être mou avec un dominant — tu perds toute crédibilité</div>
    <div class='error-item'>✗ Mettre de la pression sur un empathique — il disparaît</div>
    <div class='error-item'>✗ Laisser repartir un hésitant sans cadre clair</div>
  </div>
  <div class='rule-block'>
    <p><strong>"Je ne parle pas comme je veux. Je parle comme lui a besoin."</strong></p>
  </div>
</div>`,
            keyPoints: [
              'DOMINANT : rapide, direct → résultat/rapide/décision — éviter longues explications',
              'ANALYTIQUE : posé, structuré → logique/étape/comprendre — éviter "faites-moi confiance"',
              'EMPATHIQUE : chaleureux, lent → ressentir/sûr/confiance — éviter pression et urgence',
              'HÉSITANT : cadrant, simple → clarté/décision/aujourd\'hui — éviter trop d\'options',
              'Être mou avec un dominant = perte totale de crédibilité'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Adaptation',
              scenario: 'Après chaque échange, évalue ton adaptation :',
              steps: [
                'Ai-je changé mon comportement selon le profil détecté ?',
                'Ai-je utilisé ses mots — pas les miens ?',
                'S\'est-il senti compris pendant l\'échange ?',
                'Ai-je facilité sa façon de décider ?'
              ],
              idealAnswer: 'L\'adaptation réussie = il se sent compris, son mode de décision est respecté, et la résistance disparaît naturellement.'
            }
          },

          {
            id: 'adaptation-pratique',
            title: 'Pratique Intensive par Profil',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 2 — Pratique intensive</h2>
  <h3>Exercice : basculer d'un profil à l'autre</h3>
  <p>Lis la situation et adapte instantanément :</p>

  <div class='scenario-practice'>
    <h4>Situation 1 — Prospect DOMINANT</h4>
    <div class='scenario-desc'>Il te coupe la parole : "Bon, c'est quoi le prix ?"</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"On va aller droit au but."</span></div>
      <div class='script-line'><span class='script-text'>"Aujourd'hui vous voulez un résultat, oui ou non ?"</span></div>
      <div class='script-line'><span class='script-text'>"Si oui, on avance. Sinon, on s'arrête."</span></div>
    </div>
  </div>

  <div class='scenario-practice'>
    <h4>Situation 2 — Prospect ANALYTIQUE</h4>
    <div class='scenario-desc'>Il dit : "Vous pouvez m'envoyer les détails par mail ?"</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Je vais vous expliquer étape par étape."</span></div>
      <div class='script-line'><span class='script-text'>"Dites-moi si quelque chose ne vous paraît pas clair."</span></div>
    </div>
  </div>

  <div class='scenario-practice'>
    <h4>Situation 3 — Prospect EMPATHIQUE</h4>
    <div class='scenario-desc'>Il dit : "Je veux pas faire une erreur, j'ai déjà eu des mauvaises expériences"</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Ce qui compte pour moi, c'est que vous soyez à l'aise."</span></div>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous ferait vous sentir sûr ?"</span></div>
    </div>
  </div>

  <div class='scenario-practice'>
    <h4>Situation 4 — Prospect HÉSITANT</h4>
    <div class='scenario-desc'>Il dit : "Je sais pas... faut que j'y réfléchisse encore"</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous bloque concrètement ?"</span></div>
      <div class='script-action'>(silence)</div>
      <div class='script-line'><span class='script-text'>"Si on enlève le doute, vous feriez quoi ?"</span></div>
    </div>
  </div>
</div>`,
            keyPoints: [
              'DOMINANT face à "c\'est quoi le prix ?" : "On va aller droit au but. Résultat, oui ou non ?"',
              'ANALYTIQUE qui demande un mail : "Je vais vous expliquer étape par étape"',
              'EMPATHIQUE qui a peur de l\'erreur : "Ce qui compte pour moi, c\'est que vous soyez à l\'aise"',
              'HÉSITANT : "Qu\'est-ce qui vous bloque concrètement ?" (silence) "Si on enlève le doute..."',
              'L\'adaptation se fait en 2 secondes maximum — vitesse = maîtrise'
            ],
            exercise: {
              type: 'cas',
              title: 'Simulation intensive — 4 profils',
              scenario: 'Joue chaque situation avec un partenaire. Change de profil à chaque round. Évalue :',
              steps: [
                'Ai-je identifié le profil correctement ?',
                'Mon adaptation a-t-elle été instantanée (< 2 secondes) ?',
                'Le ton et le rythme correspondaient-ils au profil ?',
                'Les mots-clés du profil étaient-ils présents dans ma réponse ?'
              ],
              idealAnswer: 'L\'adaptation maîtrisée s\'effectue en moins de 2 secondes. Objectif : 4/4 profils gérés sans hésitation.'
            }
          }

        ]
      },

      {
        id: 'comporte-lecture-live',
        title: 'Module 3 — Lecture en Live',
        subtitle: 'Micro-signaux en temps réel',
        lessons: [

          {
            id: 'live-signaux',
            title: 'Les 4 Micro-Signaux Clés',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Module 3 — Capter les micro-signaux en temps réel</h2>
  <div class='lesson-intro'>
    <p><strong>Un prospect ne te dit jamais vraiment ce qu'il pense. Il le montre.</strong></p>
    <p>Ton job : capter les micro-signaux en temps réel et ajuster instantanément. Sinon, tu continues ton script — alors qu'il est déjà perdu.</p>
  </div>

  <h3>Signal 1 — CHUTE ÉNERGIE : Il décroche</h3>
  <div class='signal-card decroche'>
    <div class='signal-signals'><strong>Signaux :</strong> "ouais..." (ton mou) · Réponses courtes · Ton plus bas</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Je perds un peu... dites-moi ce qui vous parle moins."</span></div>
      <div class='script-action'>→ Tu récupères le contrôle.</div>
    </div>
  </div>

  <h3>Signal 2 — SUR-ANALYSE : Il a peur</h3>
  <div class='signal-card suranalyse'>
    <div class='signal-signals'><strong>Signaux :</strong> "oui mais..." répété · Beaucoup de questions · Besoin de contrôle</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Je vais vous répondre. Mais avant ça, qu'est-ce qui vous inquiète le plus ?"</span></div>
      <div class='script-action'>→ Tu vas chercher la vraie peur.</div>
    </div>
  </div>

  <h3>Signal 3 — FERMETURE : Décision bloquée</h3>
  <div class='signal-card fermeture'>
    <div class='signal-signals'><strong>Signaux :</strong> Silence long ou fuyant · "Je vais réfléchir" · Distance, ton ferme</div>
    <div class='script-block'>
      <div class='script-line'><span class='script-text'>"Ok. C'est plus une question de timing ou de certitude sur le choix ?"</span></div>
      <div class='script-action'>→ Tu rouvres sans forcer.</div>
    </div>
  </div>

  <h3>Signal 4 — INTÉRÊT FORT : Moment de closer</h3>
  <div class='signal-card interet'>
    <div class='signal-signals'><strong>Signaux :</strong> Il pose des questions concrètes · Il dit quand, comment, combien · Il se projette dans la solution</div>
    <div class='script-block'>
      <div class='script-line highlight'><span class='script-text'>"Dès que vous êtes prêt. La question c'est : on lance aujourd'hui ou on bloque une date ?"</span></div>
      <div class='script-action'>→ TU CLOSES MAINTENANT.</div>
    </div>
  </div>
</div>`,
            keyPoints: [
              'DÉCROCHAGE : "ouais..." ton mou → "Je perds un peu... dites-moi ce qui vous parle moins"',
              'SUR-ANALYSE : "oui mais..." répété → "Qu\'est-ce qui vous inquiète le plus ?"',
              'FERMETURE : "je réfléchis" → "C\'est une question de timing ou de certitude sur le choix ?"',
              'INTÉRÊT FORT : il se projette → "On lance aujourd\'hui ou on bloque une date ?" — CLOSER MAINTENANT',
              'Un prospect ne dit jamais ce qu\'il pense — il le montre. Capter les signaux.'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Lecture en Live',
              scenario: 'Après ton dernier entretien, évalue ta lecture des micro-signaux :',
              steps: [
                'Ai-je détecté au moins un signal de décrochage ?',
                'Ai-je détecté au moins un pic d\'intérêt ?',
                'Ai-je adapté mon discours en moins de 2 secondes ?',
                'Ai-je utilisé le silence comme outil — pas comme un vide ?',
                'Ai-je closé au bon moment ?'
              ],
              idealAnswer: 'Maîtrise : détecter les signaux en temps réel et adapter instantanément. Rater le signal d\'intérêt fort = occasion de closing perdue.'
            }
          },

          {
            id: 'live-domination',
            title: 'La Domination Silencieuse',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Module 3 — Domination Silencieuse</h2>
  <div class='lesson-intro'>
    <p><strong>Celui qui parle le plus perd. Le pouvoir est dans les silences, les questions et le timing.</strong></p>
  </div>

  <h3>Les 3 erreurs qui brisent le pouvoir</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Combler le silence par nervosité</div>
    <div class='error-item'>✗ Parler pour rassurer quand ça dure</div>
    <div class='error-item'>✗ Réexpliquer quand il n'a pas répondu</div>
  </div>

  <h3>La phrase légendaire</h3>
  <div class='script-block'>
    <div class='script-line'><span class='script-text'>"Prenez votre temps."</span></div>
    <div class='script-action'>→ Pression invisible maximale.</div>
  </div>

  <h3>Simulation réaliste</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Mauvais closer</span>
      <div class='script-context'>Prospect : "Oui ça a l'air bien…" (ton mou)</div>
      <div class='script-line'><span class='script-text'>"Parfait, donc comme je vous disais…"</span></div>
      <p>→ Continue sans écouter. Prospect déjà perdu.</p>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Bon closer</span>
      <div class='script-context'>Prospect : "Oui ça a l'air bien…" (ton mou)</div>
      <div class='script-line'><span class='script-text'>"J'ai l'impression que vous n'êtes pas totalement convaincu. Dites-moi."</span></div>
      <div class='script-context'>Prospect : "Ouais j'hésite un peu"</div>
      <div class='script-action'>▶ Objection réelle qui remonte → Tu peux maintenant la traiter.</div>
    </div>
  </div>

  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Continuer son script sans écouter les signaux — tu parles dans le vide</div>
    <div class='error-item'>✗ Ignorer les silences — c'est là que tout se joue</div>
    <div class='error-item'>✗ Répondre aux mots au lieu de lire les signaux derrière</div>
    <div class='error-item'>✗ Rater le moment de closing quand il se projette</div>
  </div>
</div>`,
            keyPoints: [
              'Celui qui parle le plus perd — le pouvoir est dans les silences et les questions',
              '"Prenez votre temps." = pression invisible maximale',
              '"J\'ai l\'impression que vous n\'êtes pas totalement convaincu. Dites-moi." — faire remonter l\'objection',
              'Ne jamais réexpliquer quand il n\'a pas répondu — tenir la posture',
              'Les silences sont des outils — pas des vides à combler'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Domination Silencieuse',
              scenario: 'Lors de ton prochain entretien, observe et évalue ta maîtrise du silence :',
              steps: [
                'Ai-je tenu le silence au moins une fois sans le remplir ?',
                'Ai-je dit "Prenez votre temps" au moins une fois ?',
                'Ai-je détecté un signal derrière les mots du prospect ?',
                'Ai-je utilisé "J\'ai l\'impression que vous n\'êtes pas totalement convaincu" ?'
              ],
              idealAnswer: 'Domination silencieuse = le prospect parle plus que toi, les vrais blocages remontent, et tu closes au moment exact où il se projette.'
            }
          }

        ]
      },

      {
        id: 'comporte-profils-difficiles',
        title: 'Module 4 — Profils Difficiles',
        subtitle: 'Garder le contrôle',
        lessons: [

          {
            id: 'difficiles-script',
            title: 'Gérer les Profils Qui Testent',
            duration: 40,
            content: `<div class='lesson-content'>
  <h2>Module 4 — Gestion des profils difficiles</h2>
  <div class='lesson-intro'>
    <p><strong>Un profil difficile n'est pas un problème. C'est un test de leadership.</strong></p>
    <p>Si tu subis → tu perds. Si tu cadres → tu closes.</p>
    <p>Ta posture : rester calme, reprendre le contrôle, guider sans confrontation directe.</p>
  </div>

  <h3>Profil 1 — DOMINANT AGRESSIF : Il te teste</h3>
  <div class='profile-block dominant-agressif'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> Coupe la parole · Ton sec, autoritaire · Te challenge directement · Veut prendre le dessus
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Être traité d'égal à égal · Reprendre le cadre
    </div>
    <div class='script-block'>
      <div class='script-step'><span class='phase-badge'>Script — Recadrage</span></div>
      <div class='script-line'><span class='script-text'>"Parfait. On va être efficaces tous les deux."</span></div>
      <div class='script-action'>(pause)</div>
      <div class='script-line'><span class='script-text'>"Aujourd'hui vous cherchez un résultat ou vous regardez ?"</span></div>
      <div class='script-action'>→ Tu reprends le cadre sans clash.</div>
    </div>
  </div>

  <h3>Profil 2 — SCEPTIQUE : Il doute de tout</h3>
  <div class='profile-block sceptique'>
    <div class='profile-signals'>
      <strong>Signaux :</strong> "J'y crois pas trop" · Doute de tout ce que tu dis · Challenge sur les preuves · Peur de se faire avoir
    </div>
    <div class='profile-wants'>
      <strong>Il veut :</strong> Ne pas être manipulé · Comprendre avant de croire
    </div>
    <div class='script-block'>
      <div class='script-step'><span class='phase-badge'>Script — Validation</span></div>
      <div class='script-line'><span class='script-text'>"Vous avez raison d'être méfiant."</span></div>
      <div class='script-action'>(pause)</div>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous fait douter concrètement ?"</span></div>
      <div class='script-action'>→ Tu valides et tu ouvres.</div>
    </div>
  </div>

  <div class='principle-block'>
    <p>La posture face à un profil difficile : <strong>rester calme, reprendre le contrôle, guider sans confrontation directe</strong>.</p>
    <p>La confrontation directe crée la résistance. Le recadrage élégant crée l'alignement.</p>
  </div>
</div>`,
            keyPoints: [
              'Dominant agressif : "Parfait. On va être efficaces tous les deux." (pause) "Résultat ou vous regardez ?"',
              'Sceptique : "Vous avez raison d\'être méfiant." (pause) "Qu\'est-ce qui vous fait douter concrètement ?"',
              'Un profil difficile est un test de leadership — pas un problème',
              'Règle absolue : rester calme, reprendre le contrôle, guider sans confrontation',
              'La confrontation directe crée la résistance — le recadrage élégant crée l\'alignement'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Profils Difficiles',
              scenario: 'Face à un profil difficile, évalue ta gestion :',
              steps: [
                'Ai-je identifié le type de profil difficile rapidement ?',
                'Ai-je maintenu mon calme et ma posture ?',
                'Ai-je repris le cadre sans confrontation directe ?',
                'Ai-je validé avant de creuser (sceptique) ou cadré directement (dominant) ?'
              ],
              idealAnswer: 'Si tu subis → tu perds. Si tu cadres → tu closes. La maîtrise face aux profils difficiles est le marqueur du closer expérimenté.'
            }
          },

          {
            id: 'difficiles-synthese',
            title: 'Synthèse — Domination Totale',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Synthèse — Maîtrise comportementale complète</h2>
  <div class='lesson-intro'>
    <p>Tu peux maîtriser les 10 phases, connaître tes scripts par cœur, avoir le bon ton — et quand même perdre le prospect. Pourquoi ? Parce que tu lui parles comme tu as l'habitude de parler. Pas comme il a besoin d'entendre.</p>
  </div>
  <h3>Récapitulatif — 4 profils + adaptation</h3>
  <div class='adaptation-table'>
    <div class='adapt-row header'>
      <span>PROFIL</span><span>MOT-CLÉ</span><span>APPROCHE</span>
    </div>
    <div class='adapt-row dominant'>
      <span>DOMINANT</span><span>Résultat</span><span>Direct, cadrant, bref</span>
    </div>
    <div class='adapt-row analytique'>
      <span>ANALYTIQUE</span><span>Logique</span><span>Structuré, étape par étape</span>
    </div>
    <div class='adapt-row empathique'>
      <span>EMPATHIQUE</span><span>Confiance</span><span>Chaleureux, à l'écoute</span>
    </div>
    <div class='adapt-row hesitant'>
      <span>HÉSITANT</span><span>Clarté</span><span>Cadrant, force la clarté</span>
    </div>
  </div>
  <h3>Récapitulatif — 4 micro-signaux</h3>
  <div class='adaptation-table'>
    <div class='adapt-row header'>
      <span>SIGNAL</span><span>INDICATEUR</span><span>RÉPONSE</span>
    </div>
    <div class='adapt-row'>
      <span>Chute énergie</span><span>"ouais..." ton mou</span><span>"Je perds un peu... dites-moi ce qui vous parle moins"</span>
    </div>
    <div class='adapt-row'>
      <span>Sur-analyse</span><span>"oui mais..." répété</span><span>"Qu'est-ce qui vous inquiète le plus ?"</span>
    </div>
    <div class='adapt-row'>
      <span>Fermeture</span><span>"je réfléchis"</span><span>"Timing ou certitude sur le choix ?"</span>
    </div>
    <div class='adapt-row'>
      <span>Intérêt fort</span><span>Il se projette</span><span>"On lance aujourd'hui ou on bloque une date ?" — CLOSER</span>
    </div>
  </div>
  <div class='rule-block'>
    <p><strong>"Je ne parle pas comme je veux. Je parle comme lui a besoin."</strong></p>
  </div>
</div>`,
            keyPoints: [
              'Maîtrise totale = 4 profils + 4 micro-signaux + domination silencieuse',
              'Chaque profil a un mot-clé : Résultat / Logique / Confiance / Clarté',
              'Chaque micro-signal a une réponse immédiate préparée',
              'Intérêt fort détecté = closer maintenant, ne pas attendre',
              'Principe fondamental : parler comme il a besoin, pas comme on veut'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Synthèse Comportementale',
              cards: [
                { front: 'Quel est le mot-clé de chaque profil ?', back: 'DOMINANT : Résultat / ANALYTIQUE : Logique / EMPATHIQUE : Confiance / HÉSITANT : Clarté. Ces mots guident l\'approche et le vocabulaire à utiliser.' },
                { front: 'Comment répondre à un signal de chute d\'énergie ?', back: '"Je perds un peu... dites-moi ce qui vous parle moins." Tu récupères le contrôle en l\'invitant à exprimer ce qui ne marche pas.' },
                { front: 'Comment répondre à un signal d\'intérêt fort ?', back: '"Dès que vous êtes prêt. La question c\'est : on lance aujourd\'hui ou on bloque une date ?" — TU CLOSES MAINTENANT. Ne pas rater ce moment.' },
                { front: 'Quelle est la phrase de domination silencieuse la plus puissante ?', back: '"Prenez votre temps." — pression invisible maximale. Et "J\'ai l\'impression que vous n\'êtes pas totalement convaincu. Dites-moi." — fait remonter les objections cachées.' },
                { front: 'Quelle est la règle fondamentale de la lecture comportementale ?', back: '"Je ne parle pas comme je veux. Je parle comme lui a besoin." L\'adaptation en temps réel est la compétence qui différencie un closer ordinaire d\'un closer d\'élite.' }
              ]
            }
          }

        ]
      }

    ]
  },

  'detection-contraintes': {
    id: 'detection-contraintes',
    title: 'Détection des Contraintes',
    subtitle: 'Trouver ce qui bloque vraiment',
    description: 'Maîtriser les 4 vraies contraintes (Argent, Timing, Peur, Environnement) et les scripts pour les faire sortir avant que le prospect parte.',
    duration: '1h30',
    level: 'Fondamental',
    color: '#B85042',
    icon: '🔍',
    modules: [

      {
        id: 'contraintes-module',
        title: 'Les 4 Contraintes',
        subtitle: 'Trouver ce qui bloque vraiment',
        lessons: [

          {
            id: 'contraintes-theorie',
            title: 'Les 4 Vraies Contraintes',
            duration: 30,
            content: `<div class='lesson-content'>
  <h2>Détection des Contraintes</h2>
  <div class='lesson-intro'>
    <p>Module 3 = tu découvres pourquoi il ne va pas acheter. Pas ce qu'il dit. <strong>Ce qui le bloque vraiment.</strong></p>
    <p>Tant que la contrainte n'est pas sortie → le client ne décide pas. Et toi tu ne peux rien closer.</p>
  </div>
  <h3>Les 4 vraies contraintes</h3>
  <div class='four-pillars'>
    <div class='pillar'>
      <span class='pillar-label'>ARGENT $</span>
      <p>Budget réel ou perçu. Le prospect pense ne pas pouvoir se permettre l'investissement.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>TIMING ⏰</span>
      <p>Le moment ne lui semble pas le bon. Il y a d'autres priorités ou dépenses en cours.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>PEUR ⚠</span>
      <p>Peur de se tromper, de ne pas obtenir les résultats, de l'inconnu.</p>
    </div>
    <div class='pillar'>
      <span class='pillar-label'>ENVIRONNEMENT ●</span>
      <p>Il doit consulter un tiers : conjoint, associé, comptable. Ce n'est pas lui le vrai décideur.</p>
    </div>
  </div>
  <div class='rule-block'>
    <p><strong>Si tu ne les fais pas sortir, tu ne closeras jamais.</strong></p>
  </div>
  <h3>Erreurs fréquentes</h3>
  <div class='errors-list'>
    <div class='error-item'>✗ Ne pas parler d'argent</div>
    <div class='error-item'>✗ Croire le "je réfléchis"</div>
    <div class='error-item'>✗ Éviter les questions directes</div>
    <div class='error-item'>✗ Vouloir rassurer trop tôt</div>
    <div class='error-item'>✗ Ne pas identifier le vrai décideur</div>
  </div>
</div>`,
            keyPoints: [
              '4 contraintes réelles : ARGENT + TIMING + PEUR + ENVIRONNEMENT',
              'Ce qui bloque n\'est jamais ce que le prospect dit — il faut creuser',
              'Tant que la contrainte n\'est pas sortie : le client ne décide pas',
              'Ne jamais croire le "je réfléchis" sans identifier la vraie contrainte derrière',
              'Ne pas identifier le vrai décideur = objection cachée garantie'
            ],
            exercise: {
              type: 'flashcards',
              title: 'Flash Cards — Les 4 Contraintes',
              cards: [
                { front: 'Quelles sont les 4 vraies contraintes ?', back: '1. ARGENT : budget réel ou perçu 2. TIMING : le moment ne semble pas bon 3. PEUR : peur de se tromper ou de l\'inconnu 4. ENVIRONNEMENT : doit consulter un tiers (conjoint, associé, comptable)' },
                { front: 'Pourquoi "je réfléchis" n\'est jamais une vraie réponse ?', back: 'C\'est presque toujours l\'une des 4 contraintes déguisée. La question à poser : "Quand vous dites réfléchir, c\'est plus une question de timing, de budget, ou il y a autre chose derrière ?"' },
                { front: 'Quelle est la contrainte la plus souvent cachée et ignorée ?', back: 'L\'ENVIRONNEMENT : il doit consulter un tiers. "Vous prenez cette décision seul ou il y a d\'autres personnes impliquées ?" C\'est l\'objection cachée la plus fréquente.' },
                { front: 'Pourquoi faut-il parler d\'argent même si c\'est inconfortable ?', back: 'Ne pas parler d\'argent laisse une contrainte cachée non résolue. Si le budget est un frein, mieux vaut le savoir tôt pour adapter la proposition ou clarifier la valeur.' },
                { front: 'Quelle est la règle fondamentale de la détection des contraintes ?', back: 'Tant que la contrainte n\'est pas sortie → le client ne décide pas. Et toi tu ne peux rien closer. Il faut absolument faire sortir la vraie contrainte avant de tenter de closer.' }
              ]
            }
          },

          {
            id: 'contraintes-script',
            title: 'Scripts & Simulations',
            duration: 35,
            content: `<div class='lesson-content'>
  <h2>Détection des Contraintes — Scripts</h2>
  <h3>Questions à poser pour chaque contrainte</h3>
  <div class='four-scripts'>
    <div class='constraint-block'>
      <span class='constraint-label'>ARGENT</span>
      <div class='script-line'><span class='script-text'>"Vous avez prévu d'investir combien pour régler ça ?"</span></div>
      <div class='script-line'><span class='script-text'>Si flou : "Sur ce type de projet, vous vous situez plutôt à combien ?"</span></div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>TIMING</span>
      <div class='script-line'><span class='script-text'>"Vous souhaitez démarrer quand idéalement ?"</span></div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>PEUR</span>
      <div class='script-line'><span class='script-text'>"Qu'est-ce qui vous fait hésiter aujourd'hui ?"</span></div>
    </div>
    <div class='constraint-block'>
      <span class='constraint-label'>ENVIRONNEMENT</span>
      <div class='script-line'><span class='script-text'>"Vous prenez cette décision seul ou il y a d'autres personnes impliquées ?"</span></div>
    </div>
  </div>
  <h3>Validation finale</h3>
  <div class='script-block'>
    <div class='script-step highlight'>
      <span class='script-text'>"Si on résume : vous voulez ça, vous êtes à ce niveau, vous voulez avancer à ce moment-là…"</span>
    </div>
    <div class='script-line'><span class='script-text'>"On est bien aligné ?"</span></div>
  </div>
  <h3>Exemple terrain</h3>
  <div class='comparison-grid'>
    <div class='comp-bad'>
      <span class='comp-label bad'>Closer faible</span>
      <div class='script-context'>Client : "Je dois réfléchir"</div>
      <div class='script-line'><span class='script-text'>"D'accord"</span></div>
    </div>
    <div class='comp-good'>
      <span class='comp-label good'>Closer performant</span>
      <div class='script-context'>Client : "Je dois réfléchir"</div>
      <div class='script-line'><span class='script-text'>"Quand vous dites réfléchir, c'est plus une question de timing, de budget, ou il y a autre chose derrière ?"</span></div>
      <div class='script-action'>→ Tu forces la vraie réponse.</div>
    </div>
  </div>
  <h3>Simulation — Mettre le vrai mot sur la contrainte</h3>
  <div class='terrain-example'>
    <div class='ex-step'>Client : <em>"C'est pas le moment"</em></div>
    <div class='ex-step'>Toi : <em>"Ok. Qu'est-ce qui fait que ce n'est pas le moment aujourd'hui ?"</em></div>
    <div class='ex-step'>Client : <em>"J'ai d'autres dépenses"</em></div>
    <div class='ex-step'>Toi : <em>"Donc c'est surtout une question de budget actuellement ?"</em></div>
    <div class='ex-result'>→ Tu mets le vrai mot.</div>
  </div>
</div>`,
            keyPoints: [
              'ARGENT : "Vous avez prévu d\'investir combien pour régler ça ?"',
              'TIMING : "Vous souhaitez démarrer quand idéalement ?"',
              'PEUR : "Qu\'est-ce qui vous fait hésiter aujourd\'hui ?"',
              'ENVIRONNEMENT : "Vous prenez cette décision seul ou il y a d\'autres personnes impliquées ?"',
              'Face à "je réfléchis" : "C\'est une question de timing, de budget, ou il y a autre chose derrière ?"'
            ],
            exercise: {
              type: 'cas',
              title: 'Auto-évaluation — Détection des Contraintes',
              scenario: 'Checklist après chaque appel — 4 critères :',
              steps: [
                'Ai-je identifié la vraie contrainte ?',
                'Ai-je posé les 4 questions (argent, timing, peur, environnement) ?',
                'Ai-je validé avec le client en résumant ?',
                'Ai-je creusé ou survolé ?'
              ],
              idealAnswer: 'Tant que la contrainte n\'est pas sortie, tu ne peux rien closer. Objectif : identifier systématiquement la vraie contrainte parmi les 4 avant toute tentative de closing.'
            }
          },

          {
            id: 'contraintes-exercice',
            title: 'Exercice Pratique — 3 Objections',
            duration: 25,
            content: `<div class='lesson-content'>
  <h2>Exercice Pratique — Identifier la vraie contrainte</h2>
  <p>Prends 3 objections classiques et pour chacune, trouve la vraie contrainte et la question à poser :</p>

  <div class='exercise-table'>
    <div class='ex-row header'>
      <span>OBJECTION</span><span>VRAIE CONTRAINTE ?</span><span>QUESTION À POSER</span>
    </div>
    <div class='ex-row'>
      <span>"C'est cher"</span>
      <span>ARGENT ou PEUR de ne pas rentabiliser ?</span>
      <span>"Qu'est-ce qui vous fait dire ça ? Le prix en lui-même, ou la peur que ce ne soit pas rentable ?"</span>
    </div>
    <div class='ex-row'>
      <span>"Je dois réfléchir"</span>
      <span>TIMING, PEUR, ENVIRONNEMENT ou autre ?</span>
      <span>"Quand vous dites réfléchir, c'est une question de timing, de budget, ou il y a autre chose derrière ?"</span>
    </div>
    <div class='ex-row'>
      <span>"C'est pas le moment"</span>
      <span>TIMING ou BUDGET ?</span>
      <span>"Ok. Qu'est-ce qui fait que ce n'est pas le moment aujourd'hui ?" → creuser jusqu'au vrai mot</span>
    </div>
  </div>

  <div class='rule-block'>
    <p><strong>CE QUE TU DOIS RETENIR :</strong></p>
    <p>Tant que la contrainte n'est pas sortie :</p>
    <p>→ Le client ne décide pas.</p>
    <p>→ Et toi tu ne peux rien closer.</p>
  </div>
</div>`,
            keyPoints: [
              '"C\'est cher" → "Le prix en lui-même, ou la peur que ce ne soit pas rentable ?"',
              '"Je dois réfléchir" → "Timing, budget, ou il y a autre chose derrière ?"',
              '"C\'est pas le moment" → "Qu\'est-ce qui fait que ce n\'est pas le moment ?" puis creuser',
              'Mettre le vrai mot sur la contrainte = point de départ du traitement',
              'Sans contrainte sortie = impossible de closer'
            ],
            exercise: {
              type: 'cas',
              title: 'Simulation — 3 Objections',
              scenario: 'Face à chacune de ces 3 objections, pratique la détection de la vraie contrainte :',
              steps: [
                'Face à "C\'est cher" : ai-je distingué prix vs peur de non-rentabilité ?',
                'Face à "Je dois réfléchir" : ai-je identifié parmi les 4 contraintes ?',
                'Face à "C\'est pas le moment" : ai-je creusé jusqu\'au vrai mot (budget, timing...) ?',
                'Ai-je résumé et validé avec le client : "On est bien aligné ?" ?'
              ],
              idealAnswer: 'Tant que la contrainte n\'est pas sortie et nommée clairement, ne pas tenter de closer. Mettre le vrai mot sur la contrainte = point de départ du traitement.'
            }
          }

        ]
      }

    ]
  }

};

// Exposer globalement
if (typeof window !== 'undefined') {
  window.ATLAS_FORMATIONS = ATLAS_FORMATIONS;
}