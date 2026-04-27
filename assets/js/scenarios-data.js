/* ============================================================
   ATLAS ACADÉMIE — SCÉNARIOS INTERACTIFS
   Format : interactive-scenario
   Structure : actes progressifs Rookie → Elite
   ============================================================ */

// Injecté dans les leçons via exercise.type = 'interactive-scenario'

const ATLAS_SCENARIOS = {

  /* ──────────────────────────────────────────────────────────
     SCÉNARIO 1 — CLOSER UN DOMINANT
     Leçon : DISC > Module 2 > Détecter & Closer un Dominant
  ────────────────────────────────────────────────────────── */
  'disc-dominant-closing': {
    id: 'disc-dominant-closing',
    title: 'Closer Marc Dupont — Le Dominant',
    subtitle: 'Sauras-tu tenir ta position ?',
    context: `Tu viens de décrocher un appel avec <strong>Marc Dupont</strong>, PDG d'une PME de 50 personnes dans le secteur BTP. Tu vends une formation commerciale pour son équipe de 8 vendeurs. Il a accepté de te parler — mais il a posé ses conditions.`,
    character: {
      name: 'Marc Dupont',
      role: 'PDG · BTP · 50 personnes',
      emoji: '🧱',
      profileReveal: 'act2', // Le profil se révèle à l'acte 2
      profileLabel: 'DOMINANT (D)',
      profileColor: '#ef4444'
    },
    totalPoints: 12,
    passingScore: 7,
    acts: [
      {
        id: 'act1',
        level: 'ROOKIE',
        levelColor: '#6b7280',
        levelEmoji: '🟢',
        actNumber: 1,
        setup: `Marc répond après 2 sonneries. Son ton est sec, concentré. Tu entends qu'il marche dans un couloir.`,
        message: `"Vous avez 90 secondes. Allez-y."`,
        tone: 'cold',
        choices: [
          {
            id: 'c1a',
            text: `"Bonjour Marc, je suis Thomas d'Atlas Académie. On accompagne les équipes commerciales et je voulais vous présenter..."`,
            tag: 'Présentation classique',
            quality: 'bad',
            points: 0,
            reaction: `Marc soupire légèrement. "Oui, comme tout le monde. Et donc ?"`,
            reactionTone: 'dismissive',
            coaching: {
              title: 'Erreur fatale avec un Dominant',
              detail: `Tu as commencé par <strong>toi</strong>. Le D s'en fout. Son seul filtre : <em>"Qu'est-ce que ça m'apporte ?"</em> Tu viens de dépenser 10 secondes précieuses à ne rien lui donner. Il t'a mentalement classé dans la catégorie "vendeur standard".`,
              principle: `Règle n°1 D : Valeur en premier. Identité après — si il la demande.`
            }
          },
          {
            id: 'c1b',
            text: `"En 8 semaines, vos commerciaux closent 30% de ventes supplémentaires. C'est mesurable. Vous voulez le détail ?"`,
            tag: 'Résultat d\'abord',
            quality: 'excellent',
            points: 3,
            reaction: `Marc ralentit le pas. Un bref silence. "Continue. 30% comment ?"`,
            reactionTone: 'interested',
            coaching: {
              title: '✦ Parfait — Règle D appliquée',
              detail: `En 12 mots tu lui as donné ce qu'il cherche : un <strong>résultat concret et mesurable</strong>. Son filtre anti-vendeur vient de se désactiver. Il pose une question — c'est la meilleure réaction possible à cette étape. Il est dans le jeu.`,
              principle: `Un D évalue tout ainsi : "Qu'est-ce que ça m'apporte, combien, et en combien de temps ?"`
            }
          },
          {
            id: 'c1c',
            text: `"Je comprends que vous êtes occupé Marc, je serai bref. Est-ce que par hasard vous seriez disponible pour un rendez-vous la semaine prochaine ?"`,
            tag: 'Demande de RDV direct',
            quality: 'critical',
            points: -1,
            reaction: `"Non." Il raccroche.`,
            reactionTone: 'end',
            coaching: {
              title: 'Erreur critique — Ne jamais supplier un D',
              detail: `"Je comprends que vous êtes occupé" = tu te places en position de faiblesse. Demander un RDV sans rien donner d'abord = zéro valeur perçue. Le D a des dizaines d'appels comme ça par semaine. Tu viens de confirmer que tu n'es pas différent.`,
              principle: `Le D répond à la valeur perçue immédiate, jamais à la politesse.`
            }
          },
          {
            id: 'c1d',
            text: `"Avant de parler de ce que je propose — quel est votre défi principal avec votre équipe commerciale en ce moment ?"`,
            tag: 'Question découverte',
            quality: 'good',
            points: 2,
            reaction: `Marc hésite. "C'est une question ou un pitch ?" Puis : "...Les closings ratés sur les gros devis."`,
            reactionTone: 'cautious',
            coaching: {
              title: 'Bon instinct — Mais risqué avec un D',
              detail: `La question découverte est un bon réflexe — mais avec un D elle peut sonner comme "je sais pas quoi te vendre". Il a accepté 90 secondes : une question sans valeur préalable peut l'irriter. Ici ça passe parce que la question est directe et professionnelle. Avec un D plus agressif, ça aurait pu rater.`,
              principle: `Avec un D : donne une preuve de valeur d'abord, découverte ensuite. Sauf si tu es sûr de ta posture.`
            }
          }
        ]
      },
      {
        id: 'act2',
        level: 'CONFIRMÉ',
        levelColor: '#3b82f6',
        levelEmoji: '🔵',
        actNumber: 2,
        profileReveal: true,
        setup: `Tu as capturé son attention. Marc t'a posé quelques questions techniques. Tu sens qu'il est intéressé. Il est temps de parler prix. Là, il change de ton.`,
        message: `"OK c'est intéressant. Mais soyons clairs — combien ça coûte ? Et j'ai déjà eu des offres similaires à moitié prix."`,
        tone: 'pressure',
        choices: [
          {
            id: 'c2a',
            text: `"Je comprends. On peut regarder ensemble ce qu'on peut adapter à votre budget, on a des formules plus accessibles..."`,
            tag: 'Concession immédiate',
            quality: 'critical',
            points: -1,
            reaction: `Marc prend note mentalement. "Donc le prix n'est pas fixe." Il continue, mais avec un levier supplémentaire contre toi.`,
            reactionTone: 'suspicious',
            coaching: {
              title: 'Erreur — Tu viens de te dévaluer',
              detail: `Céder sur le prix avant même qu'il ait vraiment objecté = tu confirmes que ton prix est gonflé. Pire : le D <strong>teste ta solidité</strong>. Tu viens d'échouer le test. Il ne te fait plus confiance comme interlocuteur de valeur égale. Dans sa tête : "ce vendeur cède trop vite".`,
              principle: `Avec un D : tiens ta position. La résistance respectueuse crée du respect.`
            }
          },
          {
            id: 'c2b',
            text: `"À moitié prix, vous avez probablement eu à moitié les résultats. La question c'est pas le prix — c'est le ROI. Combien vous perdez aujourd'hui sur les gros devis ratés ?"`,
            tag: 'Retourner la pression',
            quality: 'excellent',
            points: 3,
            reaction: `Un silence. Puis : "...T'as pas tort." Il répond à ta question sur les devis.`,
            reactionTone: 'respect',
            coaching: {
              title: '✦ Parfait — Tu tiens ta position',
              detail: `Tu n'as pas défendu ton prix — tu as <strong>attaqué la référence de comparaison</strong>. "À moitié prix, à moitié résultats" est une affirmation forte sans être agressive. Puis tu lui as retourné la question vers son ROI. Un D répond bien à ça : tu te comportes comme un égal, pas comme un vendeur qui supplie.`,
              principle: `Face à l'objection prix d'un D : déplace vers le ROI, ne défends jamais le tarif directement.`
            }
          },
          {
            id: 'c2c',
            text: `"Notre tarif est X euros. C'est fixe. Ce qu'on offre en échange, c'est..."`,
            tag: 'Annoncer le prix et défendre',
            quality: 'good',
            points: 2,
            reaction: `Marc écoute. Pas enthousiaste, mais il continue. "Et si je veux quelque chose de plus court ?"`,
            reactionTone: 'neutral',
            coaching: {
              title: 'Correct — Mais tu peux faire mieux',
              detail: `Annoncer le prix avec confiance et le défendre est correct. Tu ne cèdes pas, ce qui est bien. Mais en justifiant immédiatement ("voilà ce qu'on offre en échange"), tu sembles un peu sur la défensive. Un vrai égal du D dirait le prix, pointerait vers le ROI, et attendrait.`,
              principle: `Annonce le prix, puis question de ROI immédiatement — laisse le silence travailler.`
            }
          },
          {
            id: 'c2d',
            text: `"Les offres à moitié prix — vous les avez essayées. Résultat ?" [Silence]`,
            tag: 'Question + silence',
            quality: 'excellent',
            points: 3,
            reaction: `Marc rit doucement. "Point valide." Il répond que les formations passées n'ont pas duré.`,
            reactionTone: 'respect',
            coaching: {
              title: '✦ Elite — Question + Silence = Pouvoir',
              detail: `Tu as utilisé sa propre logique contre sa comparaison, en 7 mots. Puis silence. Le D doit répondre — et sa réponse le force à admettre lui-même que les offres pas chères n'ont pas marché. Tu n'as rien affirmé. Il s'est conclu.`,
              principle: `Le silence après une bonne question vaut plus que trois arguments. Celui qui parle le plus perd.`
            }
          }
        ]
      },
      {
        id: 'act3',
        level: 'EXPERT',
        levelColor: '#f59e0b',
        levelEmoji: '🟡',
        actNumber: 3,
        setup: `L'échange avance bien. Marc a répondu à tes questions, tu as la quasi-certitude que c'est le bon profil. Il réfléchit. Puis il lâche la phrase que tu redoutais.`,
        message: `"Écoute — c'est intéressant. Mais là c'est pas le moment. On est en plein lancement produit. Rappelle-moi en septembre."`,
        tone: 'escape',
        choices: [
          {
            id: 'c3a',
            text: `"Bien sûr Marc, pas de problème. Je note septembre dans mon agenda, bonne continuation !"`,
            tag: 'Accepter et raccrocher',
            quality: 'critical',
            points: -1,
            reaction: `Il raccroche. Il ne répondra pas en septembre.`,
            reactionTone: 'end',
            coaching: {
              title: 'Erreur — Tu viens de le perdre',
              detail: `"Je rappelle en septembre" : dans 95% des cas, la personne ne se souvient plus, a changé d'avis, ou a trouvé autre chose. Avec un D, "c'est pas le moment" est souvent une façon de clore proprement sans confrontation. Si tu acceptes sans question, tu valides le report et tu disparais.`,
              principle: `"Pas le moment" est rarement la vraie objection. Creuse ce qui bloque vraiment.`
            }
          },
          {
            id: 'c3b',
            text: `"En plein lancement produit — justement. C'est là que tes commerciaux ont besoin de closer les deals les plus importants. C'est quoi le risque si ils ratent ces ventes-là maintenant ?"`,
            tag: 'Retourner le timing',
            quality: 'excellent',
            points: 3,
            reaction: `Silence de 3 secondes. "...Je t'écoute." Il reste en ligne.`,
            reactionTone: 'hooked',
            coaching: {
              title: '✦ Elite — Tu as retourné son argument',
              detail: `Tu as utilisé sa propre contrainte comme levier. "Lancement produit" = besoin critique de ventes = moment idéal pour former les commerciaux. Tu n'as pas supplié. Tu as posé une question qui l'oblige à penser aux conséquences de l'inaction. Un D ne peut pas ignorer ça — ça touche directement son besoin de gagner.`,
              principle: `La contrainte qu'il avance souvent révèle pourquoi c'est le bon moment. Retourne-la.`
            }
          },
          {
            id: 'c3c',
            text: `"Je comprends. Juste une question avant de raccrocher — c'est quoi la vraie raison ?"`,
            tag: 'Questionner le vrai blocage',
            quality: 'good',
            points: 2,
            reaction: `Marc apprécie la franchise. "Honnêtement ? J'ai pas encore le budget validé." Il révèle la vraie objection.`,
            reactionTone: 'open',
            coaching: {
              title: 'Bien — Courage de questionner',
              detail: `Demander directement "c'est quoi la vraie raison" est une technique qui fonctionne bien avec les D — ils apprécient la franchise. Tu as révélé que l'objection timing cachait une objection budget. Tu peux maintenant traiter la vraie objection. La prochaine étape : traiter le budget avec les données ROI.`,
              principle: `Le D apprécie la franchise directe. "C'est quoi la vraie raison ?" est une question qui le respecte.`
            }
          },
          {
            id: 'c3d',
            text: `"Dis-moi — si je t'avais dit ça coûte zéro et c'est disponible demain, tu démarres ou tu attendais quand même septembre ?"`,
            tag: 'Test du vrai blocage',
            quality: 'excellent',
            points: 3,
            reaction: `Marc s'arrête. Rit légèrement. "Non je pourrais pas septembre quand même. C'est vrai... C'est budget le problème."`,
            reactionTone: 'disarmed',
            coaching: {
              title: '✦ Elite — Test hypothétique brillant',
              detail: `Cette question isole le vrai blocage de manière ludique. Si le D répond "non, pas septembre quand même" → le timing est un prétexte. Tu l'as amené à l'avouer lui-même, en riant, sans confrontation. C'est le moment parfait pour passer à la vraie objection (budget) avec ses propres mots.`,
              principle: `Le test hypothétique ("si c'était gratuit...") révèle les vraies contraintes sans friction.`
            }
          }
        ]
      },
      {
        id: 'act4',
        level: 'ELITE',
        levelColor: '#c9a84c',
        levelEmoji: '⚡',
        actNumber: 4,
        setup: `Tu as levé les vraies objections. Marc est intéressé. Il reconnaît le problème et la valeur. Mais avant de fermer, il tente une dernière manœuvre.`,
        message: `"OK. Fais un effort sur le prix et on y va. Moins 20% et c'est réglé."`,
        tone: 'negotiation',
        choices: [
          {
            id: 'c4a',
            text: `"D'accord pour les 20%, je vais valider avec mon manager et je reviens vers vous."`,
            tag: 'Accepter la remise',
            quality: 'critical',
            points: -1,
            reaction: `Marc note mentalement qu'il peut négocier. Il a désormais le dessus sur toutes les futures interactions.`,
            reactionTone: 'dominating',
            coaching: {
              title: 'Erreur critique — Tu viens de te soumettre',
              detail: `Accorder une remise sans contrepartie = signal de faiblesse majeur pour un D. Il sait maintenant que ton prix est négociable à volonté, que tu manques d'autorité, et que tu as probablement des marges cachées. Il te respecte moins. Et en plus, il reviendra avec d'autres exigences.`,
              principle: `Jamais de concession sans contrepartie. Si tu bouges sur le prix, tu prends quelque chose en retour.`
            }
          },
          {
            id: 'c4b',
            text: `"Les 20% — c'est non. Ce que je peux faire : si tu démarre avant le 15, j'intègre deux sessions de suivi offertes. Le prix reste le même."`,
            tag: 'Valeur ajoutée sans réduire le prix',
            quality: 'excellent',
            points: 3,
            reaction: `Marc réfléchit. "Les sessions de suivi c'est pour tout le monde ?" Ton : intéressé, respectueux.`,
            reactionTone: 'respect',
            coaching: {
              title: '✦ Elite — Valeur sans céder sur le prix',
              detail: `Tu as refusé la remise clairement et sans excuses. Puis tu as proposé une valeur ajoutée (sessions de suivi) qui coûte peu mais qui vaut beaucoup pour lui. Tu tiens ton prix = tu gardes sa confiance. Tu proposes quelque chose = tu n'es pas rigide. Et la date limite crée une urgence réelle.`,
              principle: `Face à la demande de remise : refus clair + valeur ajoutée + deadline. Jamais de concession nue.`
            }
          },
          {
            id: 'c4c',
            text: `"20% — pourquoi 20% précisément ? T'as comparé avec quoi ?"`,
            tag: 'Questionner la référence',
            quality: 'good',
            points: 2,
            reaction: `Marc hésite. "C'est... une estimation." Tu repends le contrôle de la négociation.`,
            reactionTone: 'on-back-foot',
            coaching: {
              title: 'Bien — Tu défies le chiffre',
              detail: `En questionnant le 20%, tu forces Marc à justifier sa demande. Souvent les D lancent un chiffre "au feeling" pour tester ta réaction. Si il ne peut pas justifier les 20%, sa demande perd de la force. C'est une bonne technique — mais il te faut ensuite proposer une alternative (valeur ajoutée ou compromis acceptable).`,
              principle: `Un chiffre de négociation sans justification est un bluff. Questionne-le.`
            }
          },
          {
            id: 'c4d',
            text: `"Non. Et je vais te dire pourquoi c'est dans ton intérêt que je tienne ce prix."`,
            tag: 'Refus frontal + reframe',
            quality: 'excellent',
            points: 3,
            reaction: `Marc est surpris par la franchise. "...Je t'écoute." Il attend la suite avec curiosité.`,
            reactionTone: 'intrigued',
            coaching: {
              title: '✦ Elite — Refus direct + Intrigue',
              detail: `"Non" est le mot le plus puissant que tu puisses dire à un D — à condition de le dire avec calme et certitude, pas avec émotion. En ajoutant "et je vais te dire pourquoi c'est dans ton intérêt", tu crées une curiosité immédiate. Il veut entendre l'argument. Tu as toute son attention.`,
              principle: `Un D respecte quelqu'un qui dit non avec certitude. Le "non" ferme = signal de valeur réelle.`
            }
          }
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
     SCÉNARIO 2 — L'ACCROCHE PARFAITE
     Leçon : 10 Étapes > Module 1 > Phase 1
  ────────────────────────────────────────────────────────── */
  'accroche-parfaite': {
    id: 'accroche-parfaite',
    title: "L'Accroche Parfaite",
    subtitle: 'Tu as 5 secondes. Qu\'est-ce que tu dis ?',
    context: `Chaque situation est différente. Trois appels. Trois profils. Trois niveaux de difficulté. Dans chaque cas, les premières secondes décident si la conversation continue ou s'arrête là.`,
    character: {
      name: '???',
      role: 'À identifier',
      emoji: '📞',
      profileReveal: 'act2',
      profileLabel: null,
      profileColor: '#6b7280'
    },
    totalPoints: 12,
    passingScore: 7,
    acts: [
      {
        id: 'act1',
        level: 'ROOKIE',
        levelColor: '#6b7280',
        levelEmoji: '🟢',
        actNumber: 1,
        setup: `Appel sortant. Lundi matin, 9h30. Tu appelles Sophie Martin, responsable commerciale dans une société de services RH. Tu ne la connais pas. Elle décroche après 3 sonneries.`,
        character_override: { name: 'Sophie Martin', role: 'Resp. commerciale · RH', emoji: '👩‍💼' },
        message: `"Sophie Martin, j'écoute."`,
        tone: 'neutral',
        choices: [
          {
            id: 'a1a',
            text: `"Bonjour Sophie, je suis Thomas d'Atlas Académie, spécialiste de la formation commerciale. Je vous appelle car nous avons des solutions qui pourraient vous intéresser pour..."`,
            tag: 'Présentation standard',
            quality: 'critical',
            points: 0,
            reaction: `"Oui... écoutez j'ai pas vraiment le temps là, envoyez-moi un mail." Elle raccroche poliment.`,
            reactionTone: 'dismissive',
            coaching: {
              title: 'Filtre commercial activé en 3 mots',
              detail: `"Je suis Thomas d'Atlas Académie, spécialiste de..." = 7 mots avant la première valeur. Son cerveau a lu : <em>VENDEUR</em>. Le filtre s'est activé. "Envoyez un mail" = formule poli pour "non". Tu t'es présenté avant de te faire désirer.`,
              principle: `Les premières 5 secondes doivent créer de la <strong>curiosité</strong>, pas de la méfiance. Commence par ce qui l'intéresse, pas par qui tu es.`
            }
          },
          {
            id: 'a1b',
            text: `"Sophie — une question directe. Vos commerciaux closent combien de leurs rendez-vous en ce moment ?" [Silence 2 sec]`,
            tag: 'Question de rupture',
            quality: 'excellent',
            points: 3,
            reaction: `Courte pause. "C'est-à-dire... pourquoi vous me demandez ça ?" Ton : intrigué.`,
            reactionTone: 'curious',
            coaching: {
              title: '✦ Parfait — Rupture cognitive réussie',
              detail: `Tu as sauté directement dans <strong>son monde</strong> (ses commerciaux, son taux de closing) sans te présenter. Sa question "pourquoi vous me demandez ça ?" = elle veut savoir la suite. Tu as renversé la dynamique : c'est elle qui pose une question maintenant. C'est exactement ce que tu veux.`,
              principle: `L'accroche idéale = une question liée à son problème potentiel, sans contexte. Le silence après crée la tension qui force la réponse.`
            }
          },
          {
            id: 'a1c',
            text: `"Bonjour Sophie. Je vous appelle pour quelque chose de précis — j'ai deux minutes ?"`,
            tag: 'Mission précise',
            quality: 'good',
            points: 2,
            reaction: `"Oui, allez-y." Ton neutre, attentif.`,
            reactionTone: 'neutral',
            coaching: {
              title: 'Bien — Légitime et professionnel',
              detail: `"Quelque chose de précis" = tu as une raison, tu n'es pas au hasard. "J'ai deux minutes ?" confirme que tu respectes son temps. C'est propre et professionnel. La limite : tu n'as pas encore créé de curiosité. Elle a dit oui par politesse, pas par intérêt. La suite détermine tout.`,
              principle: `Cette accroche fonctionne — mais ce n'est qu'une ouverture neutre. Tu dois créer l'intérêt dans les 10 secondes suivantes.`
            }
          },
          {
            id: 'a1d',
            text: `"Bonjour Sophie, est-ce que je tombe au bon moment ?"`,
            tag: 'Vérification de disponibilité',
            quality: 'bad',
            points: 1,
            reaction: `"Euh... ça dépend. C'est pour quoi ?" Ton légèrement méfiant.`,
            reactionTone: 'cautious',
            coaching: {
              title: 'Erreur légère — Tu lui donnes le pouvoir de te couper',
              detail: `"Est-ce que je tombe au bon moment ?" = invitation à dire non. Tu cèdes le contrôle dès la première phrase. Elle a répondu "ça dépend" — ce qui signifie qu'elle va évaluer ce que tu veux avant de te donner du temps. Tu aurais dû créer l'intérêt avant de demander la permission.`,
              principle: `Ne demande pas si c'est le bon moment — crée un bon moment. La permission vient après la valeur.`
            }
          }
        ]
      },
      {
        id: 'act2',
        level: 'CONFIRMÉ',
        levelColor: '#3b82f6',
        levelEmoji: '🔵',
        actNumber: 2,
        setup: `Nouvel appel. Après-midi, 14h. Tu tombes sur Karim Benali, directeur régional dans la grande distribution. Il gère 12 commerciaux terrain. Tu l'attrapes entre deux réunions. Il répond mais tu entends qu'il marche vite.`,
        character_override: { name: 'Karim Benali', role: 'Dir. Régional · Grande distribution', emoji: '🛒' },
        message: `"Oui ?" [Ton sec, pressé]`,
        tone: 'rushed',
        choices: [
          {
            id: 'a2a',
            text: `"Karim, j'irai direct. 30 secondes. Vos commerciaux terrain — leur taux de conversion en rayon est à combien ?"`,
            tag: 'Direct + chiffre',
            quality: 'excellent',
            points: 3,
            reaction: `Il ralentit. "...30 secondes, OK. C'est autour de 22%. Pourquoi ?"`,
            reactionTone: 'hooked',
            coaching: {
              title: '✦ Elite — Tu parles son langage',
              detail: `Tu as respecté son rythme (annonce 30 secondes), utilisé son vocabulaire ("commerciaux terrain", "conversion en rayon") et posé une question précise avec un chiffre. Il t'a donné son taux. C'est une victoire majeure : il vient de partager une information confidentielle. La relation est amorcée.`,
              principle: `Avec un prospect pressé : <strong>annonce le temps</strong> que tu prends, puis pose une question ultra-précise dans son domaine.`
            }
          },
          {
            id: 'a2b',
            text: `"Bonjour Karim, c'est Thomas d'Atlas Académie. Je gère le développement commercial en région et je voulais..."`,
            tag: 'Présentation standard pressée',
            quality: 'bad',
            points: 0,
            reaction: `"Vous pouvez m'envoyer un mail ? Là j'suis en déplacement." Il raccroche.`,
            reactionTone: 'end',
            coaching: {
              title: 'Perdu dès la deuxième phrase',
              detail: `Un prospect pressé n'a AUCUNE patience pour une présentation. Tu as perdu l'appel en 5 secondes. La règle : avec quelqu'un pressé, sois encore plus direct que tu ne l'imagines. Zéro contexte, zéro intro, une seule question ou une seule valeur en 8 mots.`,
              principle: `Prospect pressé = raccourcis TOUT. Une seule phrase qui crée de l'intérêt, rien de plus.`
            }
          },
          {
            id: 'a2c',
            text: `"Je suis désolé de vous déranger Karim — c'est juste une question rapide sur votre équipe terrain."`,
            tag: 'S\'excuser de déranger',
            quality: 'critical',
            points: -1,
            reaction: `"Vous êtes de quelle société ?" Ton distant, il ne s'arrêtera pas.`,
            reactionTone: 'dismissive',
            coaching: {
              title: 'Erreur — S\'excuser crée de la méfiance',
              detail: `"Je suis désolé de vous déranger" = tu te places immédiatement en position de faiblesse. Tu confirmes que tu le déranges. Un professionnel qui appelle pour quelque chose de valeur ne s'excuse pas. Il affirme. La méfiance de Karim a augmenté, pas baissé.`,
              principle: `Ne jamais s'excuser d'appeler. Tu n'as rien à faire pardonner si tu apportes de la valeur.`
            }
          },
          {
            id: 'a2d',
            text: `"Karim — 30 secondes. Vous avez un problème que je règle en 6 semaines avec votre équipe terrain. Ça vous intéresse ?"`,
            tag: 'Valeur choc + question fermée',
            quality: 'good',
            points: 2,
            reaction: `"C'est quoi le problème que vous prétendez régler ?" Ton sceptique mais il reste en ligne.`,
            reactionTone: 'cautious',
            coaching: {
              title: 'Bien — Mais "problème" non qualifié est vague',
              detail: `Annoncer une solution en 30 secondes est bon. Mais "vous avez un problème" sans le nommer peut sonner arrogant ou imprécis. Il a répondu avec scepticisme. Si tu avais nommé le problème précis (ex: "closing en rayon"), tu aurais beaucoup plus d'impact. La suite te permet de te rattraper.`,
              principle: `Sois spécifique sur le problème — un problème nommé précisément vaut 10 fois plus qu'un problème générique.`
            }
          }
        ]
      },
      {
        id: 'act3',
        level: 'EXPERT',
        levelColor: '#f59e0b',
        levelEmoji: '🟡',
        actNumber: 3,
        setup: `Le challenge final. Tu rappelles David Moreau, directeur commercial d'une société IT. Tu l'avais contacté il y a 3 semaines — il t'avait raccroché au nez après "envoyez un mail". Aujourd'hui, tu retentes.`,
        character_override: { name: 'David Moreau', role: 'Dir. Commercial · IT · Ex-raccrocheur', emoji: '💻' },
        message: `"...Oui." [Ton froid, méfiant. Il reconnaît peut-être le numéro.]`,
        tone: 'hostile',
        choices: [
          {
            id: 'a3a',
            text: `"Bonjour David, c'est Thomas, on s'était parlé il y a 3 semaines. Je voulais reprendre contact car..."`,
            tag: 'Rappel de l\'historique',
            quality: 'critical',
            points: -1,
            reaction: `"Oui je me souviens. J'avais dit d'envoyer un mail." Ton : fermé.`,
            reactionTone: 'blocked',
            coaching: {
              title: 'Erreur — Tu rappelles le rejet précédent',
              detail: `Commencer par "on s'était parlé il y a 3 semaines" rappelle immédiatement à David qu'il t'a raccroché au nez. Tu valides son souvenir négatif de toi. La première chose à faire avec quelqu'un qui t'a précédemment rejeté : ne pas rappeler le contexte négatif — crée un nouveau départ avec une valeur inédite.`,
              principle: `Avec un ex-raccrocheur : nouveau départ total. Pas de référence à l'ancien appel.`
            }
          },
          {
            id: 'a3b',
            text: `"David. Je vous appelle pour une raison précise. Votre taux de closing sur les deals +50k — il est où ?"`,
            tag: 'Question précise sans contexte',
            quality: 'excellent',
            points: 3,
            reaction: `Silence de 3 secondes. "...C'est spécifique comme question. C'est quoi votre angle ?"`,
            reactionTone: 'intrigued',
            coaching: {
              title: '✦ Elite — Nouveau départ, nouvelle curiosité',
              detail: `Tu n'as pas mentionné l'appel précédent. Tu es reparti à zéro avec une question ultra-spécifique (deals +50k, pas "vos commerciaux en général"). Cette précision signale que tu connais son monde. Sa question "c'est quoi votre angle ?" = il est curieux. L'ardoise est effacée.`,
              principle: `La meilleure façon de gérer un rejet précédent : ignorer l'historique, créer un nouveau premier contact avec plus de précision.`
            }
          },
          {
            id: 'a3c',
            text: `"David, je vais être honnête avec vous — la dernière fois vous avez raccroché. J'aurais fait pareil. Là je reviens avec quelque chose de différent. 30 secondes ?"`,
            tag: 'Nommer le rejet précédent',
            quality: 'excellent',
            points: 3,
            reaction: `Courte pause. Un léger rire. "OK, 30 secondes."`,
            reactionTone: 'disarmed',
            coaching: {
              title: '✦ Elite — Franchise totale, désarmement total',
              detail: `Nommer le rejet précédent de façon directe et sans excuses crée une rupture de pattern. "J'aurais fait pareil" = empathie + confiance. Tu montres que tu n'es pas en train de supplier — tu assumes ce qui s'est passé et tu reviens avec de l'assurance. La franchise désarme.`,
              principle: `Avec quelqu'un qui t'a rejeté : nommer le rejet avec détachement + te positionner différemment. La transparence crée la confiance.`
            }
          },
          {
            id: 'a3d',
            text: `"David — une donnée qui va vous surprendre sur votre secteur. 30 secondes ?"`,
            tag: 'Teaser de données secteur',
            quality: 'good',
            points: 2,
            reaction: `"Quelle donnée ?" Ton méfiant mais il répond.`,
            reactionTone: 'cautious',
            coaching: {
              title: 'Bien — Curiosité créée, mais fragile',
              detail: `"Une donnée qui va vous surprendre" crée de la curiosité. C'est mieux qu'une présentation. Mais sa question "quelle donnée ?" est méfiante — il cherche à évaluer si tu inventes. Tu dois avoir une vraie donnée spécifique à son secteur IT prête à livrer dans les 10 secondes suivantes, sinon tu perds sa confiance définitivement.`,
              principle: `Le teaser de données fonctionne — à condition d'avoir la donnée précise immédiatement derrière.`
            }
          }
        ]
      },
      {
        id: 'act4',
        level: 'ELITE',
        levelColor: '#c9a84c',
        levelEmoji: '⚡',
        actNumber: 4,
        setup: `Tu as décroché l'attention de David. Il t'écoute depuis 90 secondes — un record pour lui. Il est intéressé mais n'est pas du genre à se laisser guider facilement.`,
        character_override: { name: 'David Moreau', role: 'Dir. Commercial · IT', emoji: '💻' },
        message: `"OK c'est intéressant sur le papier. Mais je veux pas m'engager à l'aveugle. Qu'est-ce qui me prouve que ça marche ?"`,
        tone: 'analytical',
        choices: [
          {
            id: 'a4a',
            text: `"On a des témoignages clients, des études de cas, je vous envoie notre book de références par mail ?"`,
            tag: 'Envoyer des supports',
            quality: 'bad',
            points: 1,
            reaction: `"Ouais envoyez." Il raccroche. Il ne lira pas le mail.`,
            reactionTone: 'end',
            coaching: {
              title: 'Erreur — Tu viens de perdre le momentum',
              detail: `"J'envoie par mail" est le cimetière des ventes. David a dit OK par politesse pour clore l'appel. Tu avais son attention, tu viens de la relâcher. La preuve doit être donnée maintenant, dans cet appel, pas dans un document qu'il ne lira pas.`,
              principle: `Ne jamais renvoyer vers un mail quand tu as l'attention. Donne la preuve maintenant, oralement.`
            }
          },
          {
            id: 'a4b',
            text: `"Je vous mets en contact avec Sébastien Lamy, directeur commercial chez Axeo IT, 120 personnes. Même profil que vous. Il vous répond en 24h. Vous avez 5 minutes vendredi ?"`,
            tag: 'Référence client pair + micro-engagement',
            quality: 'excellent',
            points: 3,
            reaction: `"Axeo IT... ouais je les connais de réputation. OK pour vendredi."`,
            reactionTone: 'convinced',
            coaching: {
              title: '✦ Elite — Preuve sociale + Engagement concret',
              detail: `Tu as proposé la meilleure preuve possible : un pair dans son secteur qui peut témoigner. "Même profil que vous" active l'identification. Et au lieu de dire "je vous rappelle", tu as posé un micro-engagement : "5 minutes vendredi ?" C'est une demande minimale, facile à accepter. Il a dit oui.`,
              principle: `La meilleure preuve = quelqu'un qui lui ressemble. Le micro-engagement (5 min) > le grand engagement (réunion d'1h).`
            }
          },
          {
            id: 'a4c',
            text: `"Ce qui vous prouve que ça marche — c'est pas moi qui vous le dis, c'est votre taux de closing dans 8 semaines. Je vous propose une chose : on fait un point à 30 jours, si vous voyez pas de différence, on arrête. Risque zéro pour vous."`,
            tag: 'Garantie résultats',
            quality: 'good',
            points: 2,
            reaction: `"C'est intéressant comme approche. Mais ça représente quel investissement ?"`,
            reactionTone: 'interested',
            coaching: {
              title: 'Bien — La garantie réduit le risque perçu',
              detail: `Proposer un bilan à 30 jours avec sortie possible réduit le risque perçu. C'est une approche honnête qui peut fonctionner. La limite : tu n'as pas donné de preuve concrète de résultats passés. David a répondu en demandant le prix — il est intéressé. La prochaine étape : donner la preuve + le prix avec confiance.`,
              principle: `La garantie de résultats réduit le risque perçu — puissant avec les profils analytiques ou méfiants.`
            }
          },
          {
            id: 'a4d',
            text: `"Vous voulez une preuve ou vous cherchez une raison de dire non ?" [Silence]`,
            tag: 'Question miroir directe',
            quality: 'excellent',
            points: 3,
            reaction: `David s'arrête. "...C'est une bonne question." Puis : "Les deux un peu." Il rit. L'atmosphère se détend.`,
            reactionTone: 'disarmed',
            coaching: {
              title: '✦ Elite — Question miroir qui désarme',
              detail: `Cette question force David à prendre conscience de sa propre dynamique. "Vous cherchez une raison de dire non ?" n'est pas agressif — c'est honnête. Sa réponse "les deux un peu" + le rire = l'atmosphère s'est transformée. Tu êtes passé de vendeur à confident. C'est le moment de proposer la preuve sociale.`,
              principle: `La question miroir nommant la résistance elle-même la dissout. Fonctionne uniquement si tu la poses avec calme et sans sarcasme.`
            }
          }
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────────────────
     SCÉNARIO 3 — LE CLOSING FINAL
     Leçon : 10 Étapes > Module 5 > Phase 10
  ────────────────────────────────────────────────────────── */
  'closing-final': {
    id: 'closing-final',
    title: 'Le Closing Final',
    subtitle: 'La décision se joue maintenant',
    context: `Tu es en fin d'appel avec Nadia Rousseau, responsable RH dans une PME de 80 personnes. Tu as bien mené l'entretien. Elle a clairement exprimé son problème, ses objectifs et son envie de changer. Il est temps de conclure.`,
    character: {
      name: 'Nadia Rousseau',
      role: 'DRH · PME 80 personnes',
      emoji: '👩‍💼',
      profileReveal: null,
      profileLabel: null,
      profileColor: '#22c55e'
    },
    totalPoints: 12,
    passingScore: 7,
    acts: [
      {
        id: 'act1',
        level: 'ROOKIE',
        levelColor: '#6b7280',
        levelEmoji: '🟢',
        actNumber: 1,
        setup: `Nadia a admis que son équipe commerciale perd des contrats faute de formation. Elle a clairement dit "je sais que je dois faire quelque chose". C'est le moment. Tu entames le closing.`,
        message: `"Bon... c'est vrai que ça correspond à ce qu'on cherche. Mais c'est un gros investissement quand même."`,
        tone: 'hesitant',
        choices: [
          {
            id: 'cl1a',
            text: `"Je comprends tout à fait. Prenez le temps qu'il faut, réfléchissez, et revenez vers moi quand vous vous sentez prête."`,
            tag: 'Tout laisser dans ses mains',
            quality: 'critical',
            points: -1,
            reaction: `"Oui je vais réfléchir, merci beaucoup." Elle raccroche. Elle n'appellera pas.`,
            reactionTone: 'end',
            coaching: {
              title: 'Erreur — Tu viens de perdre une vente gagnée',
              detail: `Nadia était presque convaincue. Elle cherchait un dernier coup de pouce pour décider, pas une invitation à "réfléchir". "Réfléchissez et revenez" = tu places l'initiative sur elle, sans deadline, sans direction. Dans 80% des cas, ça s'arrête là.`,
              principle: `"Je vais réfléchir" est un signal de closing raté, pas d'intérêt absent. Ton rôle : guider vers la décision, pas la reporter.`
            }
          },
          {
            id: 'cl1b',
            text: `"Vous avez dit que vous perdez en moyenne 3 deals par mois à cause de ça. Sur un an — ça représente combien ?"`,
            tag: 'Ancrage ROI',
            quality: 'excellent',
            points: 3,
            reaction: `Elle calcule. "...Ça doit être dans les 80, 90 000 euros de CA perdu." Sa voix change.`,
            reactionTone: 'realisation',
            coaching: {
              title: '✦ Parfait — La décision se prend sur les chiffres',
              detail: `Tu as utilisé <strong>ses propres données</strong> du diagnostic pour lui faire calculer le coût de l'inaction. 80-90k€ de CA perdu vs. le coût de la formation : le calcul s'impose de lui-même. Tu n'as pas vendu — tu l'as aidée à voir ce qu'elle perdait déjà.`,
              principle: `La question de ROI retourne l'objection "gros investissement" en "gros coût de ne rien faire".`
            }
          },
          {
            id: 'cl1c',
            text: `"C'est normal de voir ça comme un coût. Est-ce que vous êtes plus à l'aise avec l'option A ou l'option B ?"`,
            tag: 'Alternative de closing',
            quality: 'good',
            points: 2,
            reaction: `"Euh... l'option A je pense. Mais j'aimerais quand même en parler à mon directeur."`,
            reactionTone: 'engaged',
            coaching: {
              title: 'Bien — L\'alternative fonctionne partiellement',
              detail: `Proposer A ou B déplace de "est-ce que je prends ?" vers "lequel je prends ?" — c'est un bon mouvement. Elle a répondu l'option A, ce qui confirme son intérêt. Mais la mention "j'aimerais en parler à mon directeur" révèle une objection cachée que tu dois adresser maintenant.`,
              principle: `L'alternative de closing est efficace — mais si une objection resurface, traite-la avant de continuer.`
            }
          },
          {
            id: 'cl1d',
            text: `"Nadia — vous avez dit vous-même que vous savez que vous devez faire quelque chose. Qu'est-ce qui se passe si dans 6 mois rien n'a changé ?" [Silence]`,
            tag: 'Tension finale',
            quality: 'excellent',
            points: 3,
            reaction: `Elle est silencieuse 4 secondes. "...On continue à perdre des contrats." Sa voix est plus décidée.`,
            reactionTone: 'resolved',
            coaching: {
              title: '✦ Elite — Ses propres mots, sa propre décision',
              detail: `Tu as utilisé <strong>sa propre formulation</strong> ("vous savez que vous devez faire quelque chose") et la question de tension finale. Le silence de 4 secondes = elle simule mentalement le futur inchangé. Sa réponse ("on continue à perdre") = elle vient de se convaincre elle-même. Tu n'as rien vendu. Elle a décidé.`,
              principle: `La tension finale utilise leurs propres mots pour rendre le statu quo intenable. C'est eux qui décident, pas toi.`
            }
          }
        ]
      },
      {
        id: 'act2',
        level: 'CONFIRMÉ',
        levelColor: '#3b82f6',
        levelEmoji: '🔵',
        actNumber: 2,
        setup: `L'élan est bon. Nadia est de plus en plus convaincue. Mais elle vient d'ajouter une complication.`,
        message: `"OK je pense que c'est la bonne direction. Mais j'ai besoin d'en parler à Julien, notre DG. Il est pas là aujourd'hui."`,
        tone: 'uncertain',
        choices: [
          {
            id: 'cl2a',
            text: `"Pas de problème, je peux vous rappeler vendredi quand vous aurez parlé avec lui ?"`,
            tag: 'Rappel après validation DG',
            quality: 'bad',
            points: 0,
            reaction: `"Oui c'est ça." Elle raccroche. Elle pensera à autre chose et Julien dira probablement "pas maintenant".`,
            reactionTone: 'uncertain',
            coaching: {
              title: 'Erreur — Tu perds le contrôle du timing',
              detail: `En laissant la décision à Julien sans toi dans la boucle, tu prends le risque que la conversation entre Nadia et Julien ne soit pas à ton avantage. Nadia ne saura peut-être pas comment le convaincre. Et sans deadline, "vendredi" devient "la semaine prochaine" puis "le mois prochain".`,
              principle: `Quand un tiers est impliqué, identifie son rôle et propose de l'inclure dans le process, pas de l'exclure.`
            }
          },
          {
            id: 'cl2b',
            text: `"Bien sûr. Qu'est-ce que vous allez lui dire de notre échange ? Et qu'est-ce qui pourrait le faire hésiter ?"`,
            tag: 'Préparer Nadia à convaincre le DG',
            quality: 'excellent',
            points: 3,
            reaction: `"Je vais lui parler des 80k de CA perdu... il va être sensible à ça. Son frein ça serait le timing."`,
            reactionTone: 'collaborative',
            coaching: {
              title: '✦ Elite — Tu rentres dans le cercle de décision',
              detail: `En lui demandant ce qu'elle va dire, tu l'aides à formuler l'argument de vente pour Julien — et tu identifies le vrai frein à l'avance. "Le timing" = tu sais maintenant ce que Julien va objecter. Tu peux préparer Nadia à y répondre. Tu es devenu son allié dans la décision interne.`,
              principle: `Quand un tiers décide : prépare ton interlocuteur à le convaincre. Tu deviens leur coach de vente interne.`
            }
          },
          {
            id: 'cl2c',
            text: `"Est-ce qu'on peut organiser un appel rapide avec Julien demain — 20 minutes — pour que je lui présente directement ?"`,
            tag: 'Intégrer le DG dans le process',
            quality: 'excellent',
            points: 3,
            reaction: `"C'est une bonne idée... Il est souvent disponible à 8h30. Je lui en parle ce soir."`,
            reactionTone: 'collaborative',
            coaching: {
              title: '✦ Parfait — Intégrer le décideur directement',
              detail: `En proposant un appel avec Julien, tu évites que Nadia soit le seul canal. Tu peux présenter ta valeur directement, répondre à ses objections en live, et contrôler la dynamique. C'est la stratégie la plus efficace quand un tiers est impliqué.`,
              principle: `Tiers décideur = proposes toujours de l'inclure dans le process plutôt que de passer par intermédiaire.`
            }
          },
          {
            id: 'cl2d',
            text: `"Nadia — vous, vous êtes convaincue. C'est ça ?"`,
            tag: 'Valider son engagement personnel',
            quality: 'good',
            points: 2,
            reaction: `"Oui... moi oui." Ton plus décidé.`,
            reactionTone: 'committed',
            coaching: {
              title: 'Bien — Isoler l\'engagement de Nadia',
              detail: `En confirmant l'engagement de Nadia séparément, tu sépares son objection personnelle (zéro) de l'objection du DG. Elle vient de confirmer publiquement qu'elle est pour. C'est un ancrage puissant — maintenant, la seule question est comment embarquer Julien, pas si vous avancez.`,
              principle: `Isoler l'engagement de l'interlocuteur avant de traiter l'objection du tiers. "Vous, vous êtes convaincu ?"  `
            }
          }
        ]
      },
      {
        id: 'act3',
        level: 'EXPERT',
        levelColor: '#f59e0b',
        levelEmoji: '🟡',
        actNumber: 3,
        setup: `Julien a été inclus. Il a écouté. Il voit la valeur. Mais il a son propre style — direct et pragmatique. Et là, il pose la question redoutée.`,
        character_override: { name: 'Julien Morin (DG)', role: 'Directeur Général · PME 80 pers.', emoji: '🧔' },
        message: `"Concrètement — vous me garantissez quoi ?"`,
        tone: 'demanding',
        choices: [
          {
            id: 'cl3a',
            text: `"On ne peut pas garantir de résultats précis car ça dépend de l'implication de vos équipes et de nombreux facteurs..."`,
            tag: 'Éviter la garantie',
            quality: 'critical',
            points: -1,
            reaction: `"Donc vous garantissez rien." Ton froid. La dynamique bascule contre toi.`,
            reactionTone: 'skeptical',
            coaching: {
              title: 'Erreur — La non-garantie est une réponse de faiblesse',
              detail: `Julien a posé une question précise. Tu as répondu par une liste de raisons pour lesquelles tu ne pouvais pas t'engager. C'est la pire réponse possible avec un DG pragmatique. Il entend : "on n'est pas sûrs de notre produit". La réponse correcte : s'engager sur ce que tu maîtrises, nommer ce qui dépend d'eux.`,
              principle: `Face à "vous garantissez quoi ?" : engage-toi sur le processus et les indicateurs mesurables, pas sur des résultats absolus.`
            }
          },
          {
            id: 'cl3b',
            text: `"Je vous garantis un programme structuré avec un bilan à J+30 et J+60. Si à J+30 vous ne voyez aucune progression sur les indicateurs qu'on aura définis ensemble, on en reparle. Ce que je ne peux pas garantir — c'est l'implication de vos équipes. Ça, c'est votre partie."`,
            tag: 'Garantie honnête délimitée',
            quality: 'excellent',
            points: 3,
            reaction: `Julien hoche la tête. "C'est honnête." Ton : respectueux.`,
            reactionTone: 'respect',
            coaching: {
              title: '✦ Elite — Honnêteté + Clarté + Responsabilité partagée',
              detail: `Tu t'es engagé sur ce que tu maîtrises (processus, bilans, indicateurs) et tu as nommé ce qui dépend de lui (implication des équipes). "C'est votre partie" = tu lui donnes une responsabilité, ce qui renforce son investissement. "C'est honnête" de Julien = tu viens de gagner sa confiance.`,
              principle: `Garantie honnête = s'engager sur le processus + nommer clairement les limites + responsabiliser le client.`
            }
          },
          {
            id: 'cl3c',
            text: `"Je vais vous poser la question autrement : quels indicateurs vous définirez ensemble pour mesurer le succès à 90 jours ?"`,
            tag: 'Retourner la question',
            quality: 'good',
            points: 2,
            reaction: `Julien réfléchit. "Le taux de closing... le nombre de deals signés par mois." Il commence à construire les KPIs lui-même.`,
            reactionTone: 'engaged',
            coaching: {
              title: 'Bien — Co-construction des indicateurs',
              detail: `En retournant la question, tu l'impliques dans la définition du succès. Quand il définit lui-même les indicateurs, il s'engage implicitement sur les critères de succès. C'est une technique puissante — mais après qu'il a répondu, tu dois t'engager sur ces indicateurs précis pour fermer la boucle.`,
              principle: `Quand le client définit les indicateurs de succès lui-même, il s'engage sur le contrat psychologiquement.`
            }
          },
          {
            id: 'cl3d',
            text: `"Je vous garantis une chose : le déploiement complet du programme. Les résultats commerciaux — ils seront directement proportionnels à ce que vos équipes y mettent. Ce que je peux faire : mesurer et ajuster en temps réel."`,
            tag: 'Engagement sur le déploiement',
            quality: 'good',
            points: 2,
            reaction: `"C'est pragmatique." Ton neutre mais positif.`,
            reactionTone: 'neutral',
            coaching: {
              title: 'Bien — Honnête mais légèrement vague',
              detail: `Tu t'engages sur le déploiement (ce que tu maîtrises) et tu délègues les résultats commerciaux à son équipe. C'est honnête. La légère limite : "mesurer et ajuster en temps réel" est un peu vague. Si tu avais proposé des bilans à J+30 et J+60 avec des indicateurs précis, l'engagement aurait été plus fort.`,
              principle: `La garantie gagne en force avec des dates précises et des indicateurs nommés — pas juste "ajuster en temps réel".`
            }
          }
        ]
      },
      {
        id: 'act4',
        level: 'ELITE',
        levelColor: '#c9a84c',
        levelEmoji: '⚡',
        actNumber: 4,
        setup: `Tout est aligné. Nadia est convaincue. Julien est respectueux. Tout le monde est d'accord sur la valeur. Il est temps de fermer. Tu poses la question de closing.`,
        character_override: { name: 'Julien Morin (DG)', role: 'Directeur Général', emoji: '🧔' },
        message: `[Silence de 3 secondes] "...Vous l'avez votre contrat. Mais on commence en octobre, pas avant."`,
        tone: 'decided',
        choices: [
          {
            id: 'cl4a',
            text: `"Parfait ! Merci Julien, Nadia. Je prépare le contrat pour octobre, je vous envoie ça dans la semaine."`,
            tag: 'Accepter octobre enthousiaste',
            quality: 'bad',
            points: 1,
            reaction: `Julien raccroche. Vous avez la vente — mais avec 2 mois de délai. Beaucoup de choses peuvent changer.`,
            reactionTone: 'closed',
            coaching: {
              title: 'Vente obtenue — mais optimisation possible',
              detail: `Tu as la vente, c'est l'essentiel. Mais accepter octobre sans questionner laisse 2 mois de risque. Un concurrent peut arriver, les priorités peuvent changer, Julien peut partir en vacances et oublier. Questionner le délai est toujours préférable — même si au final tu acceptes octobre.`,
              principle: `Closing obtenu = parfait. Mais questionne toujours le délai — même une avance de 2 semaines réduit le risque.`
            }
          },
          {
            id: 'cl4b',
            text: `"Octobre — c'est noté. Je prépare le contrat pour que tout soit signé avant fin septembre. Comme ça vous démarrez le 1er octobre sans délai."`,
            tag: 'Confirmer + sécuriser la signature',
            quality: 'excellent',
            points: 3,
            reaction: `"Oui c'est logique." Julien donne son accord. Nadia prend un RDV pour signer.`,
            reactionTone: 'closed',
            coaching: {
              title: '✦ Elite — Sécuriser sans brusquer',
              detail: `Tu as accepté octobre (son délai) mais tu as immédiatement proposé de signer avant — ce qui verrouille l'engagement avant le démarrage. "Pour que tout soit prêt le 1er octobre" = logique pour lui, sécurité pour toi. Julien a dit oui naturellement. Signature avant le démarrage = deal sécurisé.`,
              principle: `Délai de démarrage ≠ délai de signature. Sépare les deux : signe maintenant, démarre à leur date.`
            }
          },
          {
            id: 'cl4c',
            text: `"Octobre c'est bien. Vous avez pensé à un démarrage en septembre pour que vos équipes soient formées avant la rentrée commerciale ?"`,
            tag: 'Avancer la date',
            quality: 'good',
            points: 2,
            reaction: `Julien réfléchit. "...Septembre c'est chargé pour nous. Octobre c'est vraiment mieux."`,
            reactionTone: 'firm',
            coaching: {
              title: 'Bien tenté — Mais respecte sa décision',
              detail: `Proposer septembre est un bon réflexe commercial — avancer la date = réduire le risque. Mais Julien avait dit octobre avec conviction. En questionnant sa décision sur le timing immédiatement après un "oui", tu crées une légère friction inutile. Dans ce cas, mieux valait sécuriser la signature avant de tester le délai.`,
              principle: `Questionner le timing : oui — mais après avoir sécurisé la signature, pas avant.`
            }
          },
          {
            id: 'cl4d',
            text: `"Octobre parfait. Une dernière chose : pour que le démarrage soit fluide, je vous propose qu'on cale un onboarding call avec Nadia et les chefs d'équipe la semaine avant. Ça vous convient ?"`,
            tag: 'Onboarding immédiat ancré',
            quality: 'excellent',
            points: 3,
            reaction: `"Oui, bonne idée. Nadia s'en occupe." La vente est bouclée et la relation post-vente amorcée.`,
            reactionTone: 'closed',
            coaching: {
              title: '✦ Elite — Closing + Fidélisation en une phrase',
              detail: `Tu as confirmé octobre sans friction ET tu as proposé un onboarding concret qui montre que tu penses déjà à l'après. Cela rassure Julien que tu ne disparais pas après la signature, et ça donne à Nadia une action concrète. Tu viens de faire le closing ET d'amorcer la relation long terme.`,
              principle: `La meilleure façon de fermer un deal : confirmer la date ET donner une action concrète post-signature. Le client sent que la machine est en marche.`
            }
          }
        ]
      }
    ]
  }
};
