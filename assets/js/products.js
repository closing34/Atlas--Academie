/* ============================================================
   ATLAS ACADÉMIE — BASE DE 100 PRODUITS À VENDRE
   Utilisée pour les challenges bi-hebdomadaires
   
   Chaque produit contient :
   - id, nom, catégorie, prix, difficulté (1-5)
   - contexte : qui est le prospect, sa situation
   - objections : les 2-3 objections que le coach IA va sortir
   - tip : conseil stratégique pour l'élève
   ============================================================ */

const ATLAS_PRODUCTS = [

  /* ══════════════════════════════════════════
     CATÉGORIE 1 — LOGICIELS & SAAS (15 produits)
  ══════════════════════════════════════════ */
  {
    id: 1, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'CRM HubSpot Pro',
    prix: '500€/mois',
    contexte: 'Tu appelles Marc, directeur commercial d\'une PME de 20 personnes. Son équipe utilise encore des fichiers Excel pour suivre les clients. Il a déjà entendu parler des CRM mais n\'en a jamais utilisé.',
    objections: ['C\'est trop cher pour ce qu\'on fait', 'Mes équipes ne vont pas l\'adopter', 'On s\'en sort très bien avec Excel'],
    tip: 'Parle ROI concret : combien de ventes perdues par manque de suivi ?'
  },
  {
    id: 2, categorie: 'SaaS / Logiciel', difficulte: 3,
    nom: 'Logiciel de paie Sage',
    prix: '300€/mois',
    contexte: 'Sophie est RH dans une entreprise de 50 salariés. Elle gère la paie manuellement et fait des erreurs régulièrement. Elle est stressée à chaque fin de mois.',
    objections: ['On a déjà quelqu\'un qui fait ça en interne', 'Je dois en parler à mon directeur', 'Le prix est trop élevé'],
    tip: 'Le stress et les erreurs de paie coûtent plus cher que le logiciel. Quantifie le temps perdu.'
  },
  {
    id: 3, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'Outil de gestion de projet Monday.com',
    prix: '200€/mois',
    contexte: 'Julien dirige une agence de communication de 8 personnes. Les projets s\'accumulent, les deadlines sont ratées, les emails s\'enchaînent. Il cherche une solution mais ne sait pas par où commencer.',
    objections: ['On utilise déjà Trello', 'C\'est trop complexe à mettre en place', 'Je n\'ai pas le temps de former mon équipe'],
    tip: 'Montre la différence entre Trello basique et Monday avec les automatisations. La formation prend 1 heure.'
  },
  {
    id: 4, categorie: 'SaaS / Logiciel', difficulte: 4,
    nom: 'ERP Microsoft Dynamics 365',
    prix: '3 000€/mois',
    contexte: 'Pierre est DAF d\'une entreprise industrielle de 200 personnes. Leur système actuel a 15 ans, les données sont en silos entre les départements. La direction veut moderniser mais a peur du changement.',
    objections: ['La migration de nos données est un risque énorme', 'Le budget n\'est pas prévu cette année', 'Notre prestataire actuel nous connaît depuis 10 ans'],
    tip: 'Commence par le coût de l\'inaction. Combien coûte un système obsolète chaque année ?'
  },
  {
    id: 5, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'Logiciel de signature électronique DocuSign',
    prix: '50€/mois',
    contexte: 'Claire est responsable administrative dans un cabinet d\'avocats. Elle imprime, scanne et envoie des dizaines de documents par semaine. Elle perd un temps fou.',
    objections: ['La signature électronique a-t-elle la même valeur légale ?', 'Nos clients ne sont pas tous à l\'aise avec le digital', 'On a l\'habitude de faire comme ça'],
    tip: 'La valeur légale est ton arme principale. Prépare les chiffres : 80% du temps administratif économisé.'
  },
  {
    id: 6, categorie: 'SaaS / Logiciel', difficulte: 3,
    nom: 'Plateforme e-learning Teachable pour entreprise',
    prix: '400€/mois',
    contexte: 'Antoine est DRH d\'une chaîne de restaurants de 300 employés. La formation des nouveaux est longue, coûteuse et peu standardisée. Chaque manager forme différemment.',
    objections: ['Mes employés n\'ont pas tous accès à un ordinateur', 'Le contenu prend trop de temps à créer', 'On préfère la formation en présentiel'],
    tip: 'L\'application mobile résout le problème d\'accès. Montre le coût d\'une mauvaise formation.'
  },
  {
    id: 7, categorie: 'SaaS / Logiciel', difficulte: 3,
    nom: 'Outil de cybersécurité Kaspersky Business',
    prix: '800€/an',
    contexte: 'David est gérant d\'un cabinet comptable avec 5 associés. Il n\'a aucune protection sérieuse sur ses postes. Il a entendu parler de ransomwares mais pense que ça n\'arrive qu\'aux grandes entreprises.',
    objections: ['On n\'a rien à voler, on est trop petits', 'Windows Defender suffit non ?', 'Je n\'ai jamais eu de problème'],
    tip: 'Un cabinet comptable est une cible prioritaire. Les données clients valent de l\'or sur le dark web.'
  },
  {
    id: 8, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'Logiciel de caisse Lightspeed pour restaurant',
    prix: '250€/mois',
    contexte: 'Fatima vient d\'ouvrir son restaurant. Elle utilise une vieille caisse enregistreuse et gère son stock sur un cahier. Les erreurs de commande coûtent cher.',
    objections: ['J\'ai déjà investi dans du matériel', 'C\'est trop cher pour un restaurant qui démarre', 'Ma caisse actuelle fonctionne bien'],
    tip: 'La gestion des stocks et les rapports de vente font économiser bien plus que le coût mensuel.'
  },
  {
    id: 9, categorie: 'SaaS / Logiciel', difficulte: 4,
    nom: 'Solution de BI Tableau Software',
    prix: '2 000€/mois',
    contexte: 'Nathalie est directrice marketing d\'une enseigne retail de 50 magasins. Elle noie ses équipes sous des rapports Excel que personne ne lit vraiment. Elle veut de la data exploitable.',
    objections: ['Nos équipes ne sont pas formées à ce genre d\'outil', 'On a déjà Google Data Studio', 'Le budget analytics n\'est pas une priorité'],
    tip: 'Une décision mal prise coûte combien ? Mets un chiffre sur la valeur de la bonne décision.'
  },
  {
    id: 10, categorie: 'SaaS / Logiciel', difficulte: 1,
    nom: 'Abonnement Slack Business',
    prix: '8€/utilisateur/mois',
    contexte: 'Thomas dirige une startup de 15 personnes. Tout passe par email et WhatsApp. Les informations se perdent, les décisions ne sont pas tracées. L\'équipe se plaint.',
    objections: ['WhatsApp c\'est gratuit', 'Une appli de plus à gérer', 'Mon équipe ne changera pas ses habitudes'],
    tip: 'Chiffre le temps perdu à chercher une info dans les emails. 30 min/jour × 15 personnes = ?'
  },
  {
    id: 11, categorie: 'SaaS / Logiciel', difficulte: 3,
    nom: 'Plateforme RH BambooHR',
    prix: '600€/mois',
    contexte: 'Isabelle est DRH d\'une scale-up de 80 personnes. Elle gère les congés par email, les évaluations sur Word et les recrutements sur LinkedIn sans outil centralisé. Elle craque.',
    objections: ['On grandit vite, ça va changer', 'Les fondateurs veulent rester agiles', 'C\'est compliqué à implémenter en pleine croissance'],
    tip: 'La croissance sans outil RH structuré génère des erreurs qui coûtent très cher (prud\'hommes, turnover).'
  },
  {
    id: 12, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'Outil d\'emailing Mailchimp Pro',
    prix: '150€/mois',
    contexte: 'Romain gère une boutique en ligne de cosmétiques. Il a 10 000 abonnés email mais n\'envoie presque jamais de newsletter. Sa liste dort.',
    objections: ['J\'ai pas le temps de créer du contenu', 'Les gens en ont marre des emails', 'Je ne suis pas sûr du ROI'],
    tip: 'Une liste de 10k abonnés = une mine d\'or dormante. Montre le revenu potentiel d\'une seule campagne.'
  },
  {
    id: 13, categorie: 'SaaS / Logiciel', difficulte: 4,
    nom: 'Logiciel de gestion d\'entrepôt (WMS) Generix',
    prix: '5 000€/mois',
    contexte: 'Laurent est directeur logistique d\'un distributeur alimentaire. Son entrepôt de 10 000 m² fonctionne avec des bons papier. Les erreurs de préparation entraînent des retours clients.',
    objections: ['La migration est trop risquée pour notre activité', 'Nos opérateurs ont 50 ans, ils ne s\'adapteront pas', 'On a un prestataire qui développe quelque chose en interne'],
    tip: 'Le coût d\'une erreur de livraison × le nombre d\'erreurs mensuelles. Le ROI se calcule en semaines.'
  },
  {
    id: 14, categorie: 'SaaS / Logiciel', difficulte: 2,
    nom: 'Outil de gestion des réseaux sociaux Hootsuite',
    prix: '100€/mois',
    contexte: 'Céline est community manager freelance pour 5 clients. Elle jongle entre les plateformes, publie manuellement et perd un temps fou. Elle facture à l\'heure.',
    objections: ['Je peux publier directement sur les applis', 'Ça fait beaucoup d\'argent pour un seul outil', 'Je ne suis pas sûre que mes clients acceptent de payer ça'],
    tip: 'Si elle économise 1h/jour, elle peut prendre un 6ème client. Le ROI est immédiat.'
  },
  {
    id: 15, categorie: 'SaaS / Logiciel', difficulte: 3,
    nom: 'Solution de comptabilité en ligne Pennylane',
    prix: '200€/mois',
    contexte: 'Vincent est expert-comptable avec 30 clients PME. Il passe ses nuits à ressaisir des données. Il sait qu\'il doit se digitaliser mais ne sait pas par où commencer.',
    objections: ['Mes clients ne sont pas prêts', 'La sécurité des données m\'inquiète', 'J\'ai peur de perdre le contact humain avec mes clients'],
    tip: 'Plus de ressaisie = plus de clients = plus de CA. Et la sécurité bancaire est intégrée.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 2 — IMMOBILIER (10 produits)
  ══════════════════════════════════════════ */
  {
    id: 16, categorie: 'Immobilier', difficulte: 4,
    nom: 'Appartement neuf T3 en VEFA',
    prix: '320 000€',
    contexte: 'Camille et Alexis, 32 ans, cherchent à acheter leur premier appartement. Ils ont un apport de 30 000€ mais hésitent entre acheter neuf ou ancien. Ils ont peur de s\'engager sur un bien qu\'ils ne peuvent pas voir.',
    objections: ['On préfère voir ce qu\'on achète avant de signer', 'Les délais de livraison sont trop longs', 'C\'est plus cher que l\'ancien'],
    tip: 'TVA réduite, PTZ, frais de notaire réduits à 2,5%. Calcule leur économie totale sur 5 ans.'
  },
  {
    id: 17, categorie: 'Immobilier', difficulte: 3,
    nom: 'Local commercial 150m² en centre-ville',
    prix: '2 500€/mois',
    contexte: 'Mohamed veut ouvrir son deuxième restaurant. Il a trouvé un local idéal mais hésite à cause du loyer. Son premier restaurant tourne bien mais il a peur d\'étendre trop vite.',
    objections: ['Le loyer est trop élevé pour une ouverture', 'L\'emplacement n\'est pas parfait', 'Je préfère attendre 6 mois de plus'],
    tip: 'Un bon emplacement ne revient pas deux fois. Calcule le CA potentiel sur la base de son premier restaurant.'
  },
  {
    id: 18, categorie: 'Immobilier', difficulte: 2,
    nom: 'Investissement locatif studio étudiant',
    prix: '95 000€',
    contexte: 'Patricia, 45 ans, cadre supérieure, veut préparer sa retraite. Elle a 50 000€ d\'épargne qui dort. Elle ne connaît rien à l\'immobilier et a peur de faire une erreur.',
    objections: ['Et si je ne trouve pas de locataire ?', 'La gestion locative c\'est trop compliqué', 'Je préfère garder mon argent disponible'],
    tip: 'Gestionnaire locatif inclus = zéro souci. Calcule la rente mensuelle vs son épargne qui dort.'
  },
  {
    id: 19, categorie: 'Immobilier', difficulte: 5,
    nom: 'Immeuble de rapport 8 appartements',
    prix: '1 200 000€',
    contexte: 'Stéphane est déjà investisseur immobilier avec 3 appartements. Il veut passer à l\'échelle supérieure. Il hésite car c\'est son investissement le plus important. Sa banque est frileuse.',
    objections: ['Le financement va être difficile à obtenir', 'La gestion de 8 locataires c\'est une autre dimension', 'Le rendement net m\'a l\'air trop optimiste'],
    tip: 'Cashflow positif dès le 1er mois avec un bon montage. Prépare une simulation bancaire solide.'
  },
  {
    id: 20, categorie: 'Immobilier', difficulte: 3,
    nom: 'Maison individuelle en lotissement',
    prix: '280 000€',
    contexte: 'Émilie et Sébastien, 38 ans, deux enfants. Ils louent depuis 10 ans et veulent arrêter de "jeter l\'argent par les fenêtres". Mais Sébastien vient de changer de travail et la banque leur a dit non il y a 6 mois.',
    objections: ['On a déjà essuyé un refus bancaire', 'Les taux sont trop élevés en ce moment', 'On n\'est pas sûrs de rester dans cette ville'],
    tip: 'Depuis 6 mois son CDI est confirmé. Montre que le refus est caduc. Ton courtier peut faire mieux.'
  },
  {
    id: 21, categorie: 'Immobilier', difficulte: 2,
    nom: 'Box de stockage 20m²',
    prix: '180€/mois',
    contexte: 'Bertrand vient de déménager dans un appartement plus petit suite à une séparation. Il a plein d\'affaires qui ne rentrent pas et les a chez sa mère. Il cherche une solution temporaire.',
    objections: ['C\'est trop cher pour stocker des cartons', 'Ça va durer combien de temps au final ?', 'Je vais peut-être trouver plus grand comme appartement'],
    tip: 'Temporaire peut durer des années. Calcule ce que ça coûte de laisser ses affaires chez sa mère (tension familiale).'
  },
  {
    id: 22, categorie: 'Immobilier', difficulte: 4,
    nom: 'Bureaux en coworking — abonnement entreprise',
    prix: '800€/poste/mois',
    contexte: 'Laura dirige une startup en croissance. Elle a 12 collaborateurs en full remote mais les réunions en visio s\'essoufflent. Elle cherche un espace hybride mais les baux classiques sont trop rigides.',
    objections: ['C\'est beaucoup plus cher qu\'un bureau classique', 'Mes équipes habitent dans des villes différentes', 'La confidentialité en open space m\'inquiète'],
    tip: 'Flexibilité totale + pas de charges = liberté de croissance. Calcule vs un bail 3/6/9 avec charges.'
  },
  {
    id: 23, categorie: 'Immobilier', difficulte: 3,
    nom: 'Villa de vacances en résidence gérée',
    prix: '450 000€',
    contexte: 'Jean-Pierre, 55 ans, chirurgien. Il veut un pied-à-terre au bord de la mer et faire travailler son argent. Sa femme veut pouvoir l\'utiliser l\'été mais lui veut du rendement.',
    objections: ['Je veux pouvoir l\'utiliser quand je veux', 'Les promesses de rendement ne sont jamais tenues', 'La gestion à distance m\'inquiète'],
    tip: 'Résidence gérée = 4-5 semaines d\'occupation personnelle + loyer garanti le reste. Les deux sont possibles.'
  },
  {
    id: 24, categorie: 'Immobilier', difficulte: 2,
    nom: 'Entrepôt logistique 500m² en zone industrielle',
    prix: '3 500€/mois',
    contexte: 'Karim gère une PME d\'import-export en croissance. Il stocke ses marchandises dans un entrepôt trop petit, 3km plus loin. Il perd du temps et ne peut pas gérer ses pics de stock.',
    objections: ['L\'accès à la zone industrielle est compliqué pour mes clients', 'Je ne suis pas sûr d\'avoir besoin de tout cet espace', 'Mon contrat actuel court encore 8 mois'],
    tip: 'Le coût de l\'espace perdu vs le coût des livraisons ratées. Un entrepôt adapté peut doubler la productivité.'
  },
  {
    id: 25, categorie: 'Immobilier', difficulte: 5,
    nom: 'Programme de défiscalisation Pinel — T2 neuf',
    prix: '210 000€',
    contexte: 'Sandrine est médecin libérale, très bien payée mais très imposée. Son conseiller fiscal lui a parlé du Pinel mais elle n\'a pas eu le temps de creuser. Elle est sceptique sur les dispositifs fiscaux.',
    objections: ['J\'ai déjà eu une mauvaise expérience avec de la défiscalisation', 'Et si la loi change ?', 'Je n\'ai pas le temps de m\'en occuper'],
    tip: 'Économie fiscale calculée sur sa tranche marginale d\'imposition. Mets un chiffre précis sur sa table.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 3 — ASSURANCE & FINANCE (12 produits)
  ══════════════════════════════════════════ */
  {
    id: 26, categorie: 'Assurance / Finance', difficulte: 2,
    nom: 'Mutuelle santé familiale',
    prix: '180€/mois',
    contexte: 'Maxime, 35 ans, vient d\'avoir son deuxième enfant. Il a une mutuelle basique via son employeur mais les remboursements dentaires et optiques sont insuffisants. Sa femme est à son compte.',
    objections: ['La mutuelle de mon employeur suffit', 'C\'est trop cher chaque mois', 'Je ne suis jamais malade'],
    tip: 'Calcule le reste à charge sur 1 an : lunettes + dentiste + kiné. Le différentiel est souvent énorme.'
  },
  {
    id: 27, categorie: 'Assurance / Finance', difficulte: 3,
    nom: 'Assurance-vie en unités de compte',
    prix: '300€/mois',
    contexte: 'Hélène, 42 ans, a 80 000€ sur un livret A. Elle sait que c\'est sous-optimal mais a peur de "jouer en bourse". Elle veut préparer l\'avenir de ses enfants.',
    objections: ['Je ne veux pas prendre de risque avec mes économies', 'C\'est trop compliqué à gérer', 'Et si j\'ai besoin de cet argent rapidement ?'],
    tip: 'Unités de compte ≠ bourse direct. Profil prudent avec fonds garantis. L\'argent reste disponible sous 72h.'
  },
  {
    id: 28, categorie: 'Assurance / Finance', difficulte: 4,
    nom: 'Prévoyance invalidité pour professionnel libéral',
    prix: '250€/mois',
    contexte: 'Guillaume est kinésithérapeute libéral. S\'il se blesse, il n\'a aucun revenu. Il sait qu\'il devrait s\'assurer mais reporte depuis 3 ans. Il pense que ça ne lui arrivera jamais.',
    objections: ['Je suis en bonne santé, ça n\'arrivera pas', 'Je cotise déjà beaucoup à l\'URSSAF', 'Je vais regarder ça quand j\'aurai plus de temps'],
    tip: 'Un kinésithérapeute blessé sans prévoyance = 0€ de revenus. Mets-lui le scénario catastrophe en face.'
  },
  {
    id: 29, categorie: 'Assurance / Finance', difficulte: 2,
    nom: 'Assurance auto tous risques',
    prix: '120€/mois',
    contexte: 'Lucie, 28 ans, vient d\'acheter sa première voiture neuve à crédit. Elle a pris le minimum légal pour économiser. Elle conduit 40km par jour pour aller au travail.',
    objections: ['L\'assurance tous risques c\'est trop cher', 'Je conduis bien, j\'ai jamais eu d\'accident', 'Je vais voir si je peux trouver moins cher ailleurs'],
    tip: 'Voiture à crédit + accident sans tous risques = continuer à rembourser une épave. Le risque est réel.'
  },
  {
    id: 30, categorie: 'Assurance / Finance', difficulte: 3,
    nom: 'Plan d\'épargne retraite (PER) individuel',
    prix: '400€/mois',
    contexte: 'François, 48 ans, cadre dirigeant. Il n\'a rien préparé pour sa retraite en dehors des cotisations obligatoires. Il a un TMI à 41%. Il commence à y penser mais trouve ça compliqué.',
    objections: ['J\'ai encore le temps d\'y penser', 'Mon argent est bloqué jusqu\'à la retraite', 'Je préfère investir dans l\'immobilier'],
    tip: 'À 41% de TMI, chaque euro versé lui économise 0,41€ d\'impôts. Montre l\'économie fiscale annuelle.'
  },
  {
    id: 31, categorie: 'Assurance / Finance', difficulte: 2,
    nom: 'Assurance multirisque professionnelle',
    prix: '150€/mois',
    contexte: 'Anaïs vient d\'ouvrir son salon de coiffure. Elle sait qu\'elle doit s\'assurer mais ne sait pas quoi prendre. Elle a vu une collègue perdre tout son matériel dans un dégât des eaux sans être bien couverte.',
    objections: ['J\'ai déjà une assurance basique', 'C\'est une dépense de plus au démarrage', 'Je verrai si j\'en ai vraiment besoin'],
    tip: 'Un seul sinistre peut fermer le salon. Le cas de sa collègue est ton meilleur argument.'
  },
  {
    id: 32, categorie: 'Assurance / Finance', difficulte: 4,
    nom: 'Compte-titres + conseil en gestion de patrimoine',
    prix: '50 000€ à investir',
    contexte: 'Paul, 52 ans, vient de vendre sa société. Il a 500 000€ à placer. Il est méfiant, a déjà perdu de l\'argent avec un conseiller. Il veut comprendre avant d\'agir.',
    objections: ['Mon dernier conseiller m\'a fait perdre de l\'argent', 'Je préfère garder le contrôle moi-même', 'Je vais prendre le temps de comparer toutes les options'],
    tip: 'La transparence totale est ta différence. Explique exactement comment tu es rémunéré. La confiance se gagne.'
  },
  {
    id: 33, categorie: 'Assurance / Finance', difficulte: 3,
    nom: 'Assurance emprunteur pour crédit immobilier',
    prix: '80€/mois',
    contexte: 'Alice et Julien viennent de signer leur compromis de vente. La banque leur impose son assurance groupe mais un courtier leur a dit qu\'ils pouvaient économiser 15 000€ sur la durée du prêt.',
    objections: ['La banque risque de bloquer notre dossier si on change', 'C\'est compliqué de changer en cours de route', 'On a déjà assez de choses à gérer'],
    tip: 'La loi Lemoine permet de changer à tout moment. L\'économie de 15k est concrète et documentée.'
  },
  {
    id: 34, categorie: 'Assurance / Finance', difficulte: 2,
    nom: 'Assurance habitation propriétaire non occupant (PNO)',
    prix: '25€/mois',
    contexte: 'René a acheté un appartement pour le louer. Son locataire a sa propre assurance. René pense qu\'il n\'a pas besoin d\'autre chose. Il ne sait pas ce qu\'est la PNO.',
    objections: ['Mon locataire est assuré, ça suffit non ?', 'C\'est 25€ de plus par mois pour rien', 'J\'en parlerai à mon notaire'],
    tip: 'Si le locataire ne renouvelle pas son assurance ou part sans prévenir, René est à nu. Cas concrets à l\'appui.'
  },
  {
    id: 35, categorie: 'Assurance / Finance', difficulte: 5,
    nom: 'Optimisation fiscale — holding patrimoniale',
    prix: 'Honoraires 5 000€',
    contexte: 'Olivier possède 3 sociétés et paie énormément d\'impôts. Son expert-comptable lui a parlé d\'une holding mais il trouve ça trop complexe. Il gagne 400k€/an et n\'a aucune structure patrimoniale.',
    objections: ['Ça me semble très risqué légalement', 'J\'ai déjà un expert-comptable qui s\'en occupe', 'J\'ai peur que ça soit vu comme de l\'optimisation agressive'],
    tip: 'Une holding, c\'est légal et recommandé par Bercy. Montre l\'économie fiscale annuelle en chiffres bruts.'
  },
  {
    id: 36, categorie: 'Assurance / Finance', difficulte: 3,
    nom: 'Crédit professionnel pour achat de matériel',
    prix: '50 000€ sur 5 ans',
    contexte: 'Bruno est boulanger artisan. Son four lâche régulièrement. Il hésite à investir dans un nouveau four à 45 000€ car il a peur de s\'endetter. Il perd des commandes à cause de pannes.',
    objections: ['Je veux pas m\'endetter davantage', 'Et si mon activité ralentit ?', 'Je préfère réparer l\'ancien encore une fois'],
    tip: 'Chaque panne lui coûte combien en commandes perdues ? Le crédit se rembourse tout seul avec l\'activité récupérée.'
  },
  {
    id: 37, categorie: 'Assurance / Finance', difficulte: 2,
    nom: 'Assurance décès-invalidité pour chef de famille',
    prix: '60€/mois',
    contexte: 'Thierry, 40 ans, a une femme et trois enfants. Il est le seul à travailler. Il n\'a aucune assurance-vie. Il reporte depuis des années car "ça le déprime d\'y penser".',
    objections: ['Ça me met mal à l\'aise de penser à ma mort', 'On n\'en a pas besoin pour l\'instant', 'C\'est une dépense pour quelque chose qui n\'arrivera peut-être pas'],
    tip: 'Ce n\'est pas pour lui, c\'est pour ses enfants. Change le cadre émotionnel : c\'est un acte d\'amour.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 4 — AUTOMOBILE (8 produits)
  ══════════════════════════════════════════ */
  {
    id: 38, categorie: 'Automobile', difficulte: 3,
    nom: 'SUV électrique Tesla Model Y',
    prix: '52 000€',
    contexte: 'Valérie, 44 ans, cadre, fait 80km/jour. Sa voiture thermique coûte cher en carburant. Elle est attirée par l\'électrique mais a peur de l\'autonomie et ne sait pas comment ça marche.',
    objections: ['Et si je tombe en panne sur l\'autoroute ?', 'Il n\'y a pas assez de bornes de recharge', 'C\'est trop cher à l\'achat'],
    tip: 'Calcule le coût total sur 5 ans (carburant + entretien + bonus). L\'électrique est souvent moins cher.'
  },
  {
    id: 39, categorie: 'Automobile', difficulte: 2,
    nom: 'Voiture de société en leasing — Peugeot 308',
    prix: '450€/mois LLD',
    contexte: 'Fabrice est commercial indépendant. Il roule dans une vieille voiture qui lui fait honte en rendez-vous clients. Il hésite à investir car il pense que le leasing "c\'est jeter l\'argent".',
    objections: ['Je préfère être propriétaire', 'C\'est trop cher chaque mois', 'Ma voiture actuelle fonctionne encore'],
    tip: 'LLD = déductible fiscalement + voiture récente = meilleure image client. Calcule l\'avantage fiscal.'
  },
  {
    id: 40, categorie: 'Automobile', difficulte: 1,
    nom: 'Extension de garantie véhicule d\'occasion',
    prix: '1 200€ pour 3 ans',
    contexte: 'Charlotte vient d\'acheter une voiture d\'occasion à 15 000€. Le vendeur lui propose une extension de garantie. Elle hésite, trouve ça cher pour "quelque chose qui ne servira peut-être pas".',
    objections: ['La voiture a l\'air en bon état', 'C\'est cher pour une garantie', 'Je verrai si j\'ai un problème'],
    tip: 'Une boîte de vitesse = 3 000€. Une seule réparation rentabilise la garantie. Les stats sont de ton côté.'
  },
  {
    id: 41, categorie: 'Automobile', difficulte: 3,
    nom: 'Camion utilitaire frigorifique pour artisan',
    prix: '45 000€',
    contexte: 'Damien est traiteur. Il loue un camion frigorifique à chaque événement. Sa société grandit et les locations coûtent plus cher que prévu. Il hésite à acheter car c\'est un gros investissement.',
    objections: ['Et si j\'ai moins de commandes dans 6 mois ?', 'La maintenance d\'un frigo, c\'est cher', 'Je peux continuer à louer'],
    tip: 'Nombre de locations annuelles × coût = il a peut-être déjà payé le camion en 2 ans. Calcule pour lui.'
  },
  {
    id: 42, categorie: 'Automobile', difficulte: 2,
    nom: 'Flotte de vélos électriques pour entreprise',
    prix: '8 000€ pour 5 vélos',
    contexte: 'Sandra est office manager dans une entreprise de 60 personnes. La direction veut faire un geste écologique. Elle a mission de trouver un avantage mobilité pour les salariés.',
    objections: ['Tout le monde n\'habite pas près du bureau', 'La sécurité et le stationnement des vélos', 'On préfère les tickets de transport'],
    tip: 'Avantage en nature exonéré de charges + image RSE + bien-être salarié. Triple argument.'
  },
  {
    id: 43, categorie: 'Automobile', difficulte: 4,
    nom: 'Flotte de 10 véhicules de service pour PME',
    prix: '3 500€/mois (LLD)',
    contexte: 'Michel est DG d\'une société de services à domicile. Ses techniciens roulent avec leurs propres voitures et se font rembourser au km. C\'est incontrôlable et coûteux. Mais le changement lui fait peur.',
    objections: ['Mes employés préfèrent leurs propres voitures', 'Gérer une flotte c\'est une usine à gaz', 'Le coût fixe m\'inquiète en cas de baisse d\'activité'],
    tip: 'Coût au km actuel × km totaux = souvent plus cher que la flotte. Et tu reprends le contrôle.'
  },
  {
    id: 44, categorie: 'Automobile', difficulte: 2,
    nom: 'Moto électrique pour livraison urbaine',
    prix: '5 500€',
    contexte: 'Amine gère une petite entreprise de livraison de repas à domicile. Il a 3 livreurs sur scooter thermique. Le carburant et l\'entretien explosent ses marges. Il cherche des solutions.',
    objections: ['L\'autonomie est insuffisante pour une journée de livraisons', 'Le coût d\'achat est trop élevé', 'Et la recharge pendant le service ?'],
    tip: 'Autonomie 100km + recharge rapide 1h. Une journée = 2 charges max. Calcule l\'économie carburant mensuelle.'
  },
  {
    id: 45, categorie: 'Automobile', difficulte: 3,
    nom: 'Voiture de prestige BMW Série 7 — achat comptant',
    prix: '110 000€',
    contexte: 'Éric, 50 ans, PDG d\'une ETI. Il reçoit des clients importants. Sa voiture actuelle est "convenable" mais ne reflète pas l\'image de sa société. Sa directrice commerciale lui dit qu\'il perd des deals.',
    objections: ['C\'est du luxe inutile', 'Les clients s\'en fichent de ma voiture', 'Je préfère investir cet argent dans l\'entreprise'],
    tip: 'L\'image est un outil commercial. Si un client signe 50k€ de plus grâce à la confiance que ça inspire, le ROI est là.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 5 — FORMATION & COACHING (10 produits)
  ══════════════════════════════════════════ */
  {
    id: 46, categorie: 'Formation / Coaching', difficulte: 2,
    nom: 'Formation en closing haute performance',
    prix: '2 000€',
    contexte: 'Nordine est commercial depuis 5 ans. Il fait des résultats corrects mais stagne. Son manager lui dit qu\'il manque de technique sur les fins de vente. Il cherche à progresser mais hésite sur le prix.',
    objections: ['J\'ai déjà fait des formations, ça n\'a pas changé grand-chose', 'C\'est cher pour une formation en ligne', 'Je peux apprendre seul sur YouTube'],
    tip: 'Si cette formation lui permet de closer 2 ventes de plus par mois à 1k€ chacune, elle est rentabilisée en 1 mois.'
  },
  {
    id: 47, categorie: 'Formation / Coaching', difficulte: 3,
    nom: 'Programme MBA Executive en management',
    prix: '15 000€',
    contexte: 'Christelle, 38 ans, directrice d\'une équipe de 15 personnes. Elle a un BTS et a gravi les échelons. Elle sait qu\'un MBA peut ouvrir des portes mais le prix et le temps l\'effraient.',
    objections: ['Je n\'ai pas le temps avec mon poste actuel', 'C\'est très cher', 'Mon expérience terrain vaut bien un MBA'],
    tip: 'CPF + financement employeur peuvent couvrir 80%. Et un MBA = +30% de salaire en moyenne dans les stats.'
  },
  {
    id: 48, categorie: 'Formation / Coaching', difficulte: 2,
    nom: 'Coaching business pour entrepreneur',
    prix: '500€/mois',
    contexte: 'Simon a lancé sa startup il y a 18 mois. Il tourne en rond, prend les mêmes décisions et stagne. Des amis lui ont parlé de coaching mais il trouve ça "pour les gens qui n\'y arrivent pas seuls".',
    objections: ['Le coaching c\'est pour les gens qui n\'ont pas confiance en eux', 'Je n\'ai pas le budget', 'Comment savoir si ça va vraiment m\'aider ?'],
    tip: 'Les meilleures performances du monde ont un coach. Jordan, Federer, Elon Musk. Ce n\'est pas une faiblesse.'
  },
  {
    id: 49, categorie: 'Formation / Coaching', difficulte: 1,
    nom: 'Formation Excel avancé pour secrétaire',
    prix: '400€',
    contexte: 'Martine, 52 ans, assistante de direction. Elle utilise Excel depuis 20 ans mais ne connaît que les bases. Son nouveau directeur utilise des tableaux croisés dynamiques et elle se sent dépassée.',
    objections: ['À mon âge, on n\'apprend plus aussi vite', 'Mon entreprise devrait payer ça', 'J\'ai géré 20 ans sans ces fonctions avancées'],
    tip: 'Le plan de formation de l\'entreprise peut financer ça. Et maîtriser Excel avancé = indispensable à son poste.'
  },
  {
    id: 50, categorie: 'Formation / Coaching', difficulte: 3,
    nom: 'Formation certifiante en management d\'équipe',
    prix: '3 500€',
    contexte: 'Kevin, 30 ans, vient d\'être promu chef d\'équipe pour la première fois. Il gère 8 personnes, dont certaines plus âgées que lui. Il perd ses nuits à gérer des conflits et ne sait pas comment s\'y prendre.',
    objections: ['Le management ça s\'apprend sur le terrain', 'Ma boîte ne veut pas payer', 'Je n\'ai pas le temps en ce moment'],
    tip: 'Un mauvais manager coûte 50% de turnover en plus. Son entreprise a tout intérêt à financer cette formation.'
  },
  {
    id: 51, categorie: 'Formation / Coaching', difficulte: 4,
    nom: 'Programme de coaching en prise de parole en public',
    prix: '4 000€',
    contexte: 'Véronique est associée dans un cabinet de conseil. Elle doit présenter devant des comités de direction mais le stress la paralyse. Ses collègues moins compétents avancent plus vite qu\'elle.',
    objections: ['Je ne changerai jamais, j\'ai toujours été comme ça', 'C\'est trop cher pour travailler sur quelque chose de si personnel', 'Je préfère éviter ce type de situations'],
    tip: 'Un seul deal gagné grâce à une bonne présentation rembourse le coaching 10 fois. Elle le sait.'
  },
  {
    id: 52, categorie: 'Formation / Coaching', difficulte: 2,
    nom: 'Bootcamp développement web — 3 mois',
    prix: '8 000€',
    contexte: 'Anthony, 27 ans, travaille en logistique. Il est passionné de tech et veut reconvertir. Il a peur d\'investir autant sur lui-même. Son entourage pense que c\'est "trop risqué".',
    objections: ['Et si je ne trouve pas de travail après ?', 'C\'est beaucoup d\'argent pour quelque chose d\'incertain', 'Je n\'ai pas le niveau technique de base'],
    tip: 'Taux d\'emploi dans les 3 mois après bootcamp = 87%. Le salaire moyen post-formation dépasse son actuel de 40%.'
  },
  {
    id: 53, categorie: 'Formation / Coaching', difficulte: 3,
    nom: 'Formation en trading et analyse technique',
    prix: '1 500€',
    contexte: 'Cyril, 33 ans, a déjà perdu 3 000€ en trading en suivant des influenceurs. Il veut se former sérieusement mais a peur d\'être encore arnaqué. Il est méfiant et pose beaucoup de questions.',
    objections: ['Comment savoir si votre formation vaut mieux que ce que j\'ai déjà acheté ?', 'Le trading c\'est 95% de perdants', 'Je ne veux plus perdre d\'argent'],
    tip: 'Sa perte de 3k est due au manque de méthode, pas au trading. La formation lui donne exactement ce qui lui a manqué.'
  },
  {
    id: 54, categorie: 'Formation / Coaching', difficulte: 2,
    nom: 'Formation en photographie professionnelle',
    prix: '1 200€',
    contexte: 'Léa, 25 ans, passionnée de photo. Elle veut monétiser sa passion mais ne sait pas si son niveau est suffisant. Elle a peur de faire une formation trop théorique qui ne débouche sur rien.',
    objections: ['Je ne sais pas si j\'ai le niveau pour en faire mon métier', 'YouTube propose tout gratuitement', 'J\'ai peur que ce soit trop théorique'],
    tip: 'La différence entre YouTube et une formation structurée avec portfolio = les clients. Montre les débouchés concrets.'
  },
  {
    id: 55, categorie: 'Formation / Coaching', difficulte: 3,
    nom: 'Programme de mentorat en entrepreneuriat',
    prix: '6 000€ pour 6 mois',
    contexte: 'Hugo, 29 ans, a une idée de startup mais n\'ose pas se lancer. Il a peur de l\'échec, de l\'argent, de tout. Il tourne autour de son idée depuis 2 ans sans rien faire.',
    objections: ['Je n\'ai pas encore validé mon idée', 'Le mentorat ne remplace pas l\'expérience', 'C\'est cher pour des conseils'],
    tip: 'Chaque mois qu\'il attend = des concurrents qui avancent. Le coût de l\'inaction se mesure en opportunités perdues.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 6 — SANTÉ & BIEN-ÊTRE (8 produits)
  ══════════════════════════════════════════ */
  {
    id: 56, categorie: 'Santé / Bien-être', difficulte: 1,
    nom: 'Abonnement salle de sport premium',
    prix: '80€/mois',
    contexte: 'Pauline, 31 ans, se plaint de manque d\'énergie et prend du poids depuis sa maternité. Elle veut reprendre le sport mais hésite car elle a "essayé plusieurs fois et abandonné".',
    objections: ['J\'ai déjà pris des abonnements que je n\'utilise pas', 'Je n\'ai pas le temps avec les enfants', 'C\'est trop cher par rapport à courir dehors'],
    tip: 'Les cours collectifs créent une obligation sociale et un suivi. Propose un essai gratuit d\'une semaine.'
  },
  {
    id: 57, categorie: 'Santé / Bien-être', difficulte: 2,
    nom: 'Programme de nutrition personnalisé',
    prix: '350€ pour 3 mois',
    contexte: 'Laurent, 45 ans, a des résultats sanguins préoccupants. Son médecin lui a dit de changer d\'alimentation. Il ne sait pas par où commencer et trouve les régimes "trop contraignants".',
    objections: ['J\'ai essayé tous les régimes, rien ne dure', 'C\'est trop restrictif, j\'aime manger', 'Je peux trouver des plans gratuits sur internet'],
    tip: 'Ce n\'est pas un régime, c\'est une rééducation alimentaire. Parle d\'énergie et de longévité, pas de kilos.'
  },
  {
    id: 58, categorie: 'Santé / Bien-être', difficulte: 3,
    nom: 'Appareil de PPC pour apnée du sommeil',
    prix: '800€',
    contexte: 'Bernard, 52 ans, ronfle énormément. Sa femme ne dort plus. Son médecin a diagnostiqué une apnée sévère. Il refuse le masque car ça lui fait peur et il pense qu\'il "ne pourra pas dormir avec".',
    objections: ['Je ne vais pas pouvoir dormir avec ce truc sur la tête', 'Ça va déranger ma femme encore plus', 'Il doit y avoir une autre solution'],
    tip: 'L\'apnée non traitée multiplie par 3 le risque d\'AVC. Et les nouveaux masques sont ultra-silencieux et légers.'
  },
  {
    id: 59, categorie: 'Santé / Bien-être', difficulte: 2,
    nom: 'Bilan de santé complet en clinique privée',
    prix: '600€',
    contexte: 'Philippe, 48 ans, cadre stressé, ne va jamais chez le médecin sauf urgence. Sa mutuelle rembourse partiellement un bilan. Il trouve ça inutile car "il se sent bien".',
    objections: ['Je n\'ai aucun symptôme, c\'est inutile', 'Ma mutuelle rembourse déjà les consultations classiques', 'Je n\'ai pas le temps de prendre une journée pour ça'],
    tip: 'Le cancer du côlon se détecte à ce stade là. 80% des maladies graves se traitent si détectées tôt. Demi-journée max.'
  },
  {
    id: 60, categorie: 'Santé / Bien-être', difficulte: 2,
    nom: 'Séances de kinésithérapie préventive',
    prix: '60€/séance — pack 10 séances',
    contexte: 'Marjorie, 38 ans, travaille sur écran 10h/jour. Elle a des douleurs chroniques au dos et aux cervicales. Elle prend des anti-douleurs mais ne consulte pas car "ça passera tout seul".',
    objections: ['Les médocs font l\'effet, je n\'en ai pas besoin de plus', 'C\'est cher et non remboursé', 'Ça va passer, j\'ai toujours eu ça'],
    tip: 'Les anti-douleurs masquent, la kiné soigne. Une hernie discale opérée coûte 50x plus. Prévenir ou guérir ?'
  },
  {
    id: 61, categorie: 'Santé / Bien-être', difficulte: 3,
    nom: 'Programme de thérapie comportementale (TCC)',
    prix: '120€/séance — 15 séances',
    contexte: 'Nicolas, 34 ans, souffre d\'anxiété chronique depuis l\'enfance. Il a essayé des médicaments qui l\'ont "zombifié". Son médecin lui recommande la TCC mais il est sceptique sur "parler à un psy".',
    objections: ['Parler de mes problèmes ne les résoudra pas', 'J\'ai essayé des médicaments, rien ne marche', 'C\'est long et je ne suis pas sûr des résultats'],
    tip: 'La TCC a un taux d\'efficacité de 80% sur l\'anxiété, prouvé scientifiquement. Ce n\'est pas de la parole, c\'est de la technique.'
  },
  {
    id: 62, categorie: 'Santé / Bien-être', difficulte: 1,
    nom: 'Montre connectée de suivi santé (Garmin)',
    prix: '350€',
    contexte: 'Gérard, 55 ans, vient d\'avoir un léger problème cardiaque. Son cardiologue lui recommande de surveiller son rythme cardiaque. Il ne sait pas bien comment fonctionne une montre connectée.',
    objections: ['Je n\'y connais rien en technologie', 'Mon téléphone suffit non ?', 'Est-ce que les données sont vraiment fiables ?'],
    tip: 'Prescrit par le cardiologue = argument médical béton. Interface ultra-simple et données cliniquement validées.'
  },
  {
    id: 63, categorie: 'Santé / Bien-être', difficulte: 2,
    nom: 'Cure de thalassothérapie 5 jours',
    prix: '1 500€',
    contexte: 'Sylvie, 50 ans, directrice commerciale. Elle est épuisée, en burnout latent. Son médecin lui a dit de "lever le pied". Son mari veut qu\'elle prenne soin d\'elle mais elle culpabilise de "dépenser pour rien".',
    objections: ['C\'est du luxe, j\'ai honte de dépenser ça pour moi', 'Je ne peux pas m\'absenter 5 jours', 'Ça va revenir dès que je reprends le travail'],
    tip: 'Un burnout complet = 3-6 mois d\'arrêt. 5 jours maintenant ou 90 jours après. Elle n\'a pas le choix.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 7 — MARKETING & COMMUNICATION (10 produits)
  ══════════════════════════════════════════ */
  {
    id: 64, categorie: 'Marketing / Communication', difficulte: 3,
    nom: 'Refonte de site web e-commerce',
    prix: '8 000€',
    contexte: 'Rachid gère une boutique en ligne de chaussures. Son site a 5 ans, est lent, et n\'est pas optimisé mobile. Il fait 10 000€/mois mais son taux de conversion est de 0,8% (moyenne du marché : 2,5%).',
    objections: ['Mon site actuel fonctionne', 'C\'est trop cher', 'Comment savoir si ça va vraiment améliorer mes ventes ?'],
    tip: 'Passe son taux de conversion de 0,8% à 2,5% = il triple son CA sans dépenser plus en pub. Le ROI est mathématique.'
  },
  {
    id: 65, categorie: 'Marketing / Communication', difficulte: 2,
    nom: 'Campagne Google Ads gérée par agence',
    prix: '2 000€/mois (dont 1 500€ de budget média)',
    contexte: 'Delphine est orthophoniste libérale. Elle a un cabinet avec un associé qui part. Elle doit remplir son carnet de rendez-vous. Elle n\'a jamais fait de pub et ne sait pas si c\'est adapté à sa profession.',
    objections: ['Les patients viennent par prescription médicale, pas par Google', 'Je ne sais pas si c\'est éthique pour ma profession', 'C\'est cher pour une libérale'],
    tip: '60% des patients cherchent leur praticien sur Google. C\'est parfaitement légal pour les paramédicaux.'
  },
  {
    id: 66, categorie: 'Marketing / Communication', difficulte: 3,
    nom: 'Identité visuelle complète — logo, charte, supports',
    prix: '3 500€',
    contexte: 'Thomas vient de lancer sa société de conseil. Son logo a été fait par son cousin sur Canva. Ses prospects ne prennent pas son entreprise au sérieux. Il pense que "le fond prime sur la forme".',
    objections: ['Les clients s\'en fichent du logo', 'Je peux faire ça moi-même', 'C\'est trop tôt pour investir là-dedans'],
    tip: 'En 3 secondes, un prospect juge votre crédibilité sur votre image. Un mauvais logo = des deals perdus avant même de parler.'
  },
  {
    id: 67, categorie: 'Marketing / Communication', difficulte: 4,
    nom: 'Stratégie de contenu + gestion LinkedIn',
    prix: '1 500€/mois',
    contexte: 'Caroline est avocate d\'affaires associée. Elle sait que sa visibilité en ligne est nulle face à ses concurrents. Elle a honte de "se vendre" et pense que sa réputation doit se faire par le bouche-à-oreille.',
    objections: ['Les avocats ne font pas de comm comme ça', 'Je n\'ai pas le temps d\'écrire des posts', 'Ça fait commercial et je n\'aime pas ça'],
    tip: 'LinkedIn pour les avocats d\'affaires = 70% des nouveaux clients en B2B viennent du digital. Ce n\'est plus optionnel.'
  },
  {
    id: 68, categorie: 'Marketing / Communication', difficulte: 2,
    nom: 'Shooting photo professionnel pour marque',
    prix: '1 800€',
    contexte: 'Amandine vend des bijoux faits main. Ses photos sont faites avec son iPhone. Ses concurrentes ont des photos pro qui font rêver. Elle perd des ventes mais hésite à "dépenser autant pour des photos".',
    objections: ['Mon iPhone fait d\'excellentes photos', 'C\'est trop cher', 'Je ne suis pas sûre que ça change les ventes'],
    tip: 'En e-commerce, la photo EST le produit. Un test A/B : photo iPhone vs photo pro → +40% de conversion en moyenne.'
  },
  {
    id: 69, categorie: 'Marketing / Communication', difficulte: 3,
    nom: 'Production de vidéos institutionnelles',
    prix: '5 000€ (3 vidéos)',
    contexte: 'Frédéric dirige un cabinet de recrutement. Il a du mal à attirer les meilleurs candidats. Des concurrents publient des vidéos de culture d\'entreprise sur YouTube et attirent des talents qu\'il ne voit pas.',
    objections: ['Nos candidats ne regardent pas YouTube', 'On préfère les CV et les entretiens classiques', 'Je ne sais pas comment mesurer le ROI'],
    tip: '72% des candidats regardent des vidéos d\'entreprise avant de postuler. Marque employeur = guerre des talents.'
  },
  {
    id: 70, categorie: 'Marketing / Communication', difficulte: 2,
    nom: 'Référencement naturel SEO — 6 mois',
    prix: '1 200€/mois',
    contexte: 'Grégoire est propriétaire d\'une franchise de plomberie avec 3 techniciens. Il dépense 2 000€/mois en Google Ads mais ses concurrents apparaissent avant lui en résultats naturels sans payer.',
    objections: ['J\'ai déjà des clients avec les Ads', 'Le SEO c\'est trop long pour voir des résultats', 'Je ne comprends pas comment ça marche'],
    tip: 'Dans 6 mois il réduit ses Ads de 50% car le SEO génère des leads gratuits. A terme, c\'est 10x moins cher.'
  },
  {
    id: 71, categorie: 'Marketing / Communication', difficulte: 3,
    nom: 'Partenariat influenceur pour lancement produit',
    prix: '5 000€',
    contexte: 'Chloé lance une gamme de cosmétiques naturels. Elle a peu de budget marketing. Une influenceuse beauté avec 200k abonnés est intéressée. Chloé hésite car elle a peur que ça ne corresponde pas à ses valeurs de marque.',
    objections: ['L\'influenceuse ne correspond pas parfaitement à ma marque', 'Je ne sais pas si son audience va acheter', 'C\'est cher pour quelque chose d\'incertain'],
    tip: 'Un micro-influenceur bien choisi convertit mieux qu\'un macro. Montre les stats de conversion de l\'influenceuse.'
  },
  {
    id: 72, categorie: 'Marketing / Communication', difficulte: 2,
    nom: 'Formation en personal branding pour dirigeant',
    prix: '2 500€',
    contexte: 'Olivier, PDG d\'une PME de 40 personnes, est inconnu sur le marché. Ses concurrents sont régulièrement cités dans la presse. Il pense que sa discrétion est une force mais perd des appels d\'offres.',
    objections: ['Je préfère rester discret', 'Je n\'ai pas de temps pour les réseaux', 'Mes clients me connaissent déjà'],
    tip: 'Ses clients le connaissent. Ses futurs clients ne l\'ont jamais entendu. Le personal branding, c\'est pour ceux-là.'
  },
  {
    id: 73, categorie: 'Marketing / Communication', difficulte: 4,
    nom: 'Audit + stratégie marketing digital complète',
    prix: '12 000€',
    contexte: 'Brigitte est DAF d\'une ETI qui dépense 200k€/an en marketing sans mesurer précisément le ROI. La direction veut savoir ce qui marche. Elle a peur d\'un audit qui pointerait des inefficacités.',
    objections: ['On fait du marketing depuis 20 ans, on sait ce qu\'on fait', 'Un audit va prendre du temps à nos équipes', 'Et si l\'audit révèle qu\'on a gâché de l\'argent ?'],
    tip: 'L\'audit ne juge pas le passé, il optimise le futur. Même 10% d\'économie sur 200k = 20k économisés = audit payé.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 8 — LUXE & SERVICES PREMIUM (10 produits)
  ══════════════════════════════════════════ */
  {
    id: 74, categorie: 'Luxe / Premium', difficulte: 3,
    nom: 'Montre de luxe Rolex Submariner',
    prix: '12 000€',
    contexte: 'Denis, 45 ans, chirurgien. Il n\'a jamais osé s\'offrir quelque chose de luxueux. Sa femme lui dit de se faire plaisir. Il culpabilise de "dépenser autant pour une montre".',
    objections: ['C\'est trop cher pour quelque chose qui donne juste l\'heure', 'J\'ai honte de montrer ça à mes patients', 'Ça me semble être de l\'argent jeté par les fenêtres'],
    tip: 'Une Rolex prend de la valeur avec le temps. Ce n\'est pas une dépense, c\'est un placement qui se porte au poignet.'
  },
  {
    id: 75, categorie: 'Luxe / Premium', difficulte: 2,
    nom: 'Voyage de noces sur mesure — Maldives 15 jours',
    prix: '8 000€ par personne',
    contexte: 'Manon et Kevin se marient dans 6 mois. Ils ont un budget voyage de 10k€ mais Kevin veut rogner dessus. Manon rêve des Maldives depuis toujours. Kevin pense que "la Corse c\'est très bien aussi".',
    objections: ['C\'est beaucoup d\'argent pour 15 jours', 'La Corse c\'est aussi bien et moins cher', 'On pourrait utiliser cet argent pour le logement'],
    tip: 'Le voyage de noces est unique. Pas de deuxième chance. Et les souvenirs d\'une vie se paient à leur juste valeur.'
  },
  {
    id: 76, categorie: 'Luxe / Premium', difficulte: 3,
    nom: 'Conciergerie privée pour chef d\'entreprise',
    prix: '2 000€/mois',
    contexte: 'Bertrand, PDG, passe 3h/semaine à gérer des tâches administratives personnelles (réservations, courses, réparations). Sa femme en a marre. Il pense que c\'est "du luxe pour les gens oisifs".',
    objections: ['Je peux gérer ça moi-même', 'C\'est du luxe inutile', 'Je n\'aurai pas assez de tâches à déléguer'],
    tip: '3h/semaine × son taux horaire dirigeant = la conciergerie est probablement rentable. Et sa femme sera plus heureuse.'
  },
  {
    id: 77, categorie: 'Luxe / Premium', difficulte: 2,
    nom: 'Chef à domicile pour dîner d\'affaires',
    prix: '800€ (12 personnes)',
    contexte: 'Laurence reçoit des partenaires étrangers importants. Le restaurant qu\'elle avait réservé a fermé. Elle cherche une alternative de dernière minute, élégante et originale. Elle n\'a jamais essayé un chef à domicile.',
    objections: ['Je ne sais pas si c\'est aussi bien qu\'un grand restaurant', 'La logistique chez moi m\'inquiète', 'C\'est un peu cher'],
    tip: 'Un dîner privé avec chef = expérience unique que le restaurant ne peut pas offrir. Tes partenaires s\'en souviendront.'
  },
  {
    id: 78, categorie: 'Luxe / Premium', difficulte: 4,
    nom: 'Yacht privé — location semaine Méditerranée',
    prix: '25 000€/semaine',
    contexte: 'Alain, 58 ans, a vendu sa société. Sa femme veut fêter leurs 30 ans de mariage de manière inoubliable. Il hésite entre un hôtel 5 étoiles et le yacht. Le prix lui semble exorbitant.',
    objections: ['C\'est beaucoup d\'argent même pour moi', 'Je ne suis pas sûr que ma femme aime la mer', 'On peut faire aussi bien dans un palace'],
    tip: 'Un palace = des touristes autour. Un yacht = la liberté totale, l\'intimité absolue, des escales uniques. Incomparable.'
  },
  {
    id: 79, categorie: 'Luxe / Premium', difficulte: 2,
    nom: 'Spa privatif pour événement d\'entreprise',
    prix: '3 500€ (20 personnes)',
    contexte: 'Nadia est DRH dans une fintech. Elle organise le séminaire annuel. Le budget est là mais son PDG préfère les formats classiques "hôtel + conférence". Elle veut proposer quelque chose de mémorable.',
    objections: ['Ce n\'est pas assez professionnel comme format', 'Tout le monde n\'apprécie pas ce type d\'activité', 'Mon PDG va refuser'],
    tip: 'Les études montrent que les séminaires avec activités bien-être réduisent le turnover. Donne-lui des arguments pour convaincre le PDG.'
  },
  {
    id: 80, categorie: 'Luxe / Premium', difficulte: 3,
    nom: 'Garde-robe professionnelle sur mesure',
    prix: '4 000€',
    contexte: 'Stéphanie vient d\'être promue directrice générale. Elle sait que son image doit changer mais elle achète ses vêtements en grande surface depuis toujours. Elle se sent "imposteuse" dans ce nouveau rôle.',
    objections: ['Je ne suis pas quelqu\'un de superficiel', 'Mes collaborateurs me respectent pour ce que je fais, pas pour ce que je porte', 'Je trouverai bien quelque chose moins cher'],
    tip: 'S\'habiller pour le poste qu\'on veut, pas celui qu\'on a. Elle représente 300 personnes. L\'image compte pour eux aussi.'
  },
  {
    id: 81, categorie: 'Luxe / Premium', difficulte: 2,
    nom: 'Cours de golf — pack 20 leçons',
    prix: '1 600€',
    contexte: 'Renaud, 50 ans, DG d\'une banque régionale. Tous ses clients haut de gamme jouent au golf. Il a été invité deux fois et a refusé par honte de son niveau nul. Il rate des opportunités de networking.',
    objections: ['Le golf c\'est pour les gens qui ont le temps', 'Je ne suis pas très sportif', 'C\'est un milieu qui me fait un peu peur'],
    tip: 'Le golf n\'est pas un sport, c\'est un outil de business. Deux deals signés sur un green = les cours payés 10 fois.'
  },
  {
    id: 82, categorie: 'Luxe / Premium', difficulte: 3,
    nom: 'Jet privé — vol aller-retour Paris-Nice',
    prix: '8 500€',
    contexte: 'Isabelle, avocate associée, doit être à Nice le lendemain matin pour une audience importante. Les vols commerciaux sont complets. Elle hésite à payer 8 500€ pour le jet et pense à annuler l\'audience.',
    objections: ['C\'est scandaleux de payer ça pour un vol', 'Je peux peut-être décaler l\'audience', 'Qu\'est-ce que mes clients vont penser ?'],
    tip: 'L\'audience vaut probablement 100k€ à son cabinet. 8 500€ pour l\'honorer, c\'est du business, pas du luxe.'
  },
  {
    id: 83, categorie: 'Luxe / Premium', difficulte: 2,
    nom: 'Cave à vin connectée avec collection de départ',
    prix: '5 000€',
    contexte: 'Pascal, 52 ans, reçoit régulièrement des clients à dîner. Il est passionné de vin mais les stocke n\'importe comment. Son sommelier lui a dit qu\'il "abîme" ses bouteilles.',
    objections: ['Une cave dédiée c\'est un peu excessif', 'Je peux garder mes vins à la cave de ma maison', 'Le prix de la collection incluse me semble élevé'],
    tip: 'Une bonne bouteille mal conservée perd 50% de sa valeur en 2 ans. La cave se rembourse en préservant sa collection.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 9 — ÉNERGIE & MAISON (9 produits)
  ══════════════════════════════════════════ */
  {
    id: 84, categorie: 'Énergie / Maison', difficulte: 3,
    nom: 'Installation panneaux solaires résidentielle',
    prix: '18 000€',
    contexte: 'Gilles, 48 ans, propriétaire d\'une maison individuelle. Sa facture EDF atteint 3 000€/an. Il a entendu parler des panneaux solaires mais doute de la rentabilité et a peur des arnaques.',
    objections: ['On ne sait pas combien de temps avant le retour sur investissement', 'Et s\'il n\'y a pas assez de soleil chez moi ?', 'J\'ai entendu parler d\'arnaques dans ce secteur'],
    tip: 'Simulation personnalisée avec l\'ensoleillement de sa région = ROI en 8-10 ans garanti, puis 15 ans de gratuité.'
  },
  {
    id: 85, categorie: 'Énergie / Maison', difficulte: 2,
    nom: 'Pompe à chaleur air/eau pour chauffage',
    prix: '14 000€',
    contexte: 'Monique, 62 ans, retraitée. Sa chaudière à fioul a 20 ans et commence à lâcher. Son fils l\'a incitée à changer pour une PAC mais elle ne comprend pas bien le principe et a peur de changer ses habitudes.',
    objections: ['Ma chaudière actuelle fonctionne encore', 'Je ne comprends pas bien comment ça marche', 'C\'est beaucoup d\'argent pour mon budget'],
    tip: 'MaPrimeRénov peut couvrir jusqu\'à 8 000€. Sa facture de chauffage divisée par 3. Calcule son reste à charge réel.'
  },
  {
    id: 86, categorie: 'Énergie / Maison', difficulte: 2,
    nom: 'Borne de recharge électrique à domicile',
    prix: '1 200€',
    contexte: 'Pierre vient d\'acheter une voiture électrique. Il charge avec une prise classique et met 18h pour une charge complète. Il ne sait pas qu\'une borne wallbox existe et peut être subventionnée.',
    objections: ['Ma prise classique fonctionne', 'Je ne fais pas assez de km pour que ça vaille le coup', 'L\'installation électrique de mon garage est-elle compatible ?'],
    tip: 'Crédit d\'impôt 75% = reste à charge de 300€. Charge en 4h au lieu de 18h. Impossible de refuser.'
  },
  {
    id: 87, categorie: 'Énergie / Maison', difficulte: 3,
    nom: 'Isolation thermique complète de maison',
    prix: '25 000€',
    contexte: 'Arnaud et Christine ont une maison des années 70 avec une étiquette énergie F. Leur facture de gaz est folle. Ils savent qu\'ils doivent isoler mais le budget les freine. Ils ont deux devis très différents.',
    objections: ['Les devis sont trop différents, je ne sais plus quoi croire', 'On va devoir partir pendant les travaux', 'Et si la valeur de revente n\'augmente pas suffisamment ?'],
    tip: 'Maison F → B = +20% de valeur à la revente ET économie de 2 000€/an sur les factures. Les aides couvrent 50%.'
  },
  {
    id: 88, categorie: 'Énergie / Maison', difficulte: 1,
    nom: 'Système de domotique complet (Somfy)',
    prix: '3 500€',
    contexte: 'Isabelle vient de rénover sa maison. Son mari veut tout automatiser (volets, chauffage, alarme). Elle trouve ça gadget et préfère garder l\'argent pour la décoration.',
    objections: ['C\'est gadget, on n\'en a pas besoin', 'Et si le système tombe en panne ?', 'Je préfère garder le contrôle manuel'],
    tip: 'Économie de 15% sur la facture énergétique + sécurité accrue + confort quotidien. Ce n\'est pas un gadget, c\'est un investissement.'
  },
  {
    id: 89, categorie: 'Énergie / Maison', difficulte: 2,
    nom: 'Robot tondeuse connecté pour grand jardin',
    prix: '2 200€',
    contexte: 'Jean-Luc a un jardin de 2 000m². Il passe 3h chaque semaine à tondre en été. Il a 58 ans et commence à trouver ça fatigant. Sa femme veut qu\'il se repose le week-end.',
    objections: ['Ça va moins bien tondre qu\'un vrai tondeuse', 'Et s\'il se perd ou se fait voler ?', 'Je peux encore le faire moi-même'],
    tip: 'GPS anti-vol intégré. Tond mieux car plus souvent (quotidien). Et 3h/semaine récupérées = 18 jours de liberté par an.'
  },
  {
    id: 90, categorie: 'Énergie / Maison', difficulte: 3,
    nom: 'Pergola bioclimatique sur mesure',
    prix: '12 000€',
    contexte: 'Nadège et Frédéric veulent profiter de leur terrasse toute l\'année. L\'été, il fait trop chaud. L\'hiver, c\'est inutilisable. Ils hésitent entre une pergola et un véranda mais le prix les effraie.',
    objections: ['C\'est très cher pour passer plus de temps dehors', 'On peut simplement mettre un parasol', 'Ça change vraiment l\'utilisation de l\'espace ?'],
    tip: 'Une terrasse couverte ajoute 15% à la valeur du bien + 4 mois d\'utilisation en plus. ROI à la revente assuré.'
  },
  {
    id: 91, categorie: 'Énergie / Maison', difficulte: 2,
    nom: 'Alarme maison connectée — abonnement téléassistance',
    prix: '50€/mois',
    contexte: 'Éliane, 70 ans, vit seule depuis la mort de son mari. Ses enfants habitent loin et s\'inquiètent. Elle refuse car "elle gère très bien" et trouve ça intrusif dans sa vie privée.',
    objections: ['Je n\'ai pas besoin d\'être surveillée à mon âge', 'Et si j\'appuie sur le bouton par erreur ?', 'Mes voisins me connaissent et me surveillent'],
    tip: 'Ce n\'est pas pour la surveiller, c\'est pour rassurer ses enfants. Et en cas de chute, chaque minute compte.'
  },
  {
    id: 92, categorie: 'Énergie / Maison', difficulte: 3,
    nom: 'Piscine enterrée avec système de filtration',
    prix: '35 000€',
    contexte: 'Vincent et Sophie ont trois adolescents. Ils rêvent d\'une piscine depuis 10 ans mais repoussent à cause du prix et de l\'entretien. Les enfants partent bientôt et ils se disent "c\'est peut-être trop tard".',
    objections: ['Les enfants seront partis dans 3 ans', 'L\'entretien c\'est une corvée', 'La valeur de la maison va-t-elle vraiment monter ?'],
    tip: 'Une piscine, c\'est pour eux maintenant ET pour la revente (+10-15% du bien). Et 3 ans, c\'est 3 étés de famille.'
  },

  /* ══════════════════════════════════════════
     CATÉGORIE 10 — B2B SERVICES (8 produits)
  ══════════════════════════════════════════ */
  {
    id: 93, categorie: 'B2B Services', difficulte: 3,
    nom: 'Externalisation de la comptabilité (cabinet)',
    prix: '600€/mois',
    contexte: 'François est gérant d\'une TPE de restauration. Il fait sa compta lui-même le week-end, perd 8h par semaine et fait des erreurs. Son associé l\'encourage à externaliser mais il trouve ça trop cher.',
    objections: ['Je connais mon business mieux que n\'importe quel comptable', 'C\'est une dépense fixe que je n\'ai pas', 'J\'ai peur de perdre le contrôle de mes chiffres'],
    tip: '8h/semaine × son taux horaire potentiel = il paie déjà le comptable, mais avec son temps de dirigeant.'
  },
  {
    id: 94, categorie: 'B2B Services', difficulte: 2,
    nom: 'Service de nettoyage professionnel pour bureaux',
    prix: '800€/mois',
    contexte: 'Valérie manage une agence immobilière. Les agents font le ménage à tour de rôle. L\'ambiance est tendue à ce sujet. Ses locaux ne sont jamais vraiment propres. Un client a fait une remarque.',
    objections: ['On se débrouille très bien entre nous', 'C\'est trop cher pour ce qu\'on fait', 'Mes agents vont mal vivre qu\'on sous-entende qu\'ils ne font pas bien'],
    tip: 'Un client a déjà fait une remarque. C\'est une remarque de trop. L\'image du cabinet se joue aussi dans ses bureaux.'
  },
  {
    id: 95, categorie: 'B2B Services', difficulte: 4,
    nom: 'Conseil en transformation digitale',
    prix: '15 000€',
    contexte: 'Marie-Hélène dirige un cabinet de conseil RH de 12 personnes. Tout est en papier. Elle sait qu\'elle doit se digitaliser mais ne sait pas par où commencer. Elle a peur que ça perturbe son organisation.',
    objections: ['Mes consultants sont des experts RH, pas des geeks', 'On a survécu 20 ans sans digital', 'Je ne vois pas où est la priorité'],
    tip: 'Dans 3 ans, sans digital, elle perd des clients au profit de concurrents plus agiles. La transformation aujoud\'hui ou la survie demain.'
  },
  {
    id: 96, categorie: 'B2B Services', difficulte: 3,
    nom: 'Service de traduction professionnelle (agence)',
    prix: '0,15€/mot — 10 000€/an',
    contexte: 'Sébastien est directeur export d\'une PME industrielle. Il utilise Google Translate pour ses contrats en allemand et en japonais. Un client allemand a relevé des erreurs embarrassantes.',
    objections: ['Google Translate s\'améliore chaque jour', 'On ne fait pas assez de volume pour justifier ça', 'Mes interlocuteurs comprennent bien l\'anglais'],
    tip: 'Une erreur de traduction dans un contrat peut coûter des dizaines de milliers d\'euros. Et ses clients s\'en souviennent.'
  },
  {
    id: 97, categorie: 'B2B Services', difficulte: 2,
    nom: 'Service de coursier express B2B pour PME',
    prix: '300€/mois (forfait)',
    contexte: 'Carole est office manager dans un cabinet d\'architectes. Ses architectes perdent du temps à aller eux-mêmes déposer des plans chez les clients. Elle cherche une solution mais n\'a pas de budget dédié.',
    objections: ['La Poste suffit pour la plupart des envois', 'Je peux pas justifier ce budget', 'Les architectes peuvent le faire en passant'],
    tip: 'Le taux horaire d\'un architecte = 80-120€/h. Une livraison de 45min par un architecte coûte 60-90€. Le coursier coûte 15€.'
  },
  {
    id: 98, categorie: 'B2B Services', difficulte: 4,
    nom: 'Audit de conformité RGPD',
    prix: '5 000€',
    contexte: 'Éric est DSI d\'une chaîne de distribution de 30 magasins. Il n\'est pas en conformité RGPD depuis 2018. Il sait que c\'est un risque mais le reporte. Il pense que "la CNIL ne contrôle pas les PME".',
    objections: ['La CNIL ne s\'occupe que des grandes entreprises', 'On n\'a eu aucun problème jusqu\'ici', 'L\'audit va prendre beaucoup de ressources internes'],
    tip: 'Amende CNIL max = 4% du CA mondial. En 2023, des PME ont reçu des amendes de 100k€+. Le risque est réel.'
  },
  {
    id: 99, categorie: 'B2B Services', difficulte: 3,
    nom: 'Service de permanence téléphonique externalisée',
    prix: '400€/mois',
    contexte: 'Matthieu est plombier à son compte avec 2 employés. Il rate des appels quand il est en intervention. Il perd des contrats au profit de concurrents qui décrochent. Sa femme assure parfois la permanence.',
    objections: ['Ma femme gère déjà ça', 'Les clients rappellent si c\'est important', 'C\'est cher pour ce que c\'est'],
    tip: 'Combien de devis ratés par mois × son panier moyen = sa femme ne peut pas gérer ça éternellement sans tension.'
  },
  {
    id: 100, categorie: 'B2B Services', difficulte: 5,
    nom: 'Fusion-acquisition — conseil en cession d\'entreprise',
    prix: '3% du prix de cession',
    contexte: 'Claude, 60 ans, veut vendre son entreprise industrielle valorisée 3M€. Il a un acheteur potentiel qui vient le voir directement. Il pense pouvoir gérer seul la cession pour éviter de payer des honoraires.',
    objections: ['J\'ai déjà un acheteur, je n\'ai pas besoin d\'intermédiaire', 'Les honoraires à 3% c\'est 90 000€ que je perds', 'Je connais mon entreprise mieux que quiconque'],
    tip: 'Un acquéreur qui vient seul propose en général 20-30% sous la valeur réelle. Un bon conseiller regagne ses honoraires 5 fois.'
  }

];

/* Export pour utilisation dans les autres fichiers */
if (typeof module !== 'undefined') module.exports = { ATLAS_PRODUCTS };
