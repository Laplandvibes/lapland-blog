import type { SectionCopy } from './types'
import en from './copy.en'

const fr: SectionCopy = {
  ...en,
  nav: {
    startHere: 'Commencer ici',
    topReads: 'À lire en priorité',
    destinations: 'Destinations',
    tripDiaries: 'Carnets de voyage',
    about: 'À propos',
    startYourBlog: 'Lancer votre blog',
    signIn: 'Connexion',
    subscribe: "S'abonner",
    myTripBlog: 'Mon blog de voyage',
    adminDashboard: 'Tableau de bord admin',
    signOut: 'Déconnexion',
    signedInAs: 'Connecté(e) en tant que',
  },
  home: {
    heroEyebrow: 'Carnet de voyage · Carte · Partage',
    heroLine1: 'Vous partez en Laponie ?',
    heroLine2: 'Lancez un blog de votre voyage.',
    heroLead:
      'Épinglez l’endroit où vous avez vu les aurores. Photographiez le chalet. Notez la température. Construisez un beau blog de votre voyage, un blog que vos amis peuvent vraiment suivre.',
    heroPrimaryCta: 'Lancer votre blog de voyage',
    heroSecondaryCta: 'Voir comment ça marche',
    heroFootnote: 'Gratuit · Fait en Finlande · Partage Instagram · Sans publicité',
    seasonalBadge: 'En saison · Soleil de minuit · 6 juin → 7 juillet',
    seasonalH2: 'Un blog de voyage gratuit pour votre séjour en Laponie, écrit en chemin.',
    seasonalLead:
      'Lapland.blog transforme votre voyage en un blog simple et beau : épinglez les lieux, ajoutez des photos, racontez ce qui s’est passé et partagez le lien à vos proches. En ce moment, c’est l’été. Trente-deux nuits où le soleil ne se couche pas, où la forêt prend des reflets ambrés et où les lacs reflètent le ciel. Commencez le carnet pendant que vous y êtes encore.',
    seasonalCta1: 'Lancer votre blog de voyage',
    seasonalCta2: 'Lire les récits d’été',
    seasonalCard1Title: '24 heures d’heure dorée',
    seasonalCard1Body: 'Le soleil effleure l’horizon. Les photographes l’appellent la plus longue heure bleue de la planète.',
    seasonalCard2Title: 'Saison des plaquebières',
    seasonalCard2Body: 'Fin juillet : la tourbière vire à l’or. Les habitants l’appellent la deuxième moisson.',
    seasonalCard3Title: 'Sauna, puis baignade',
    seasonalCard3Body: 'Un lac à 14 °C à minuit, un sauna à 90 °C à cinq pas. Répétez.',
    seasonalCard4Title: 'Personne d’autre',
    seasonalCard4Body: 'Les chalets pleins en hiver restent vides en juillet. Même forêt, sans file d’attente.',
    seasonalLabels: { light: '01 · Lumière', forest: '02 · Forêt', water: '03 · Eau', quiet: '04 · Silence' },
    howEyebrow: 'Comment ça marche',
    howH2Pre: 'Trois étapes. Un voyage.',
    howH2Italic: 'Un blog qui mérite d’être conservé.',
    howLead:
      'Lapland.blog est une plateforme gratuite de carnet de voyage conçue pour les visiteurs de la Laponie finlandaise. Votre voyage devient un blog que vous aurez vraiment envie de partager.',
    howStep1Kicker: 'Étape 01 · Planifier',
    howStep1Title: 'Épinglez les lieux.',
    howStep1Body:
      'Posez des épingles sur la carte de Laponie : le chalet que vous avez réservé, le restaurant que vous voulez essayer, le coin de ciel noir pour les aurores. Construisez votre itinéraire avant l’embarquement.',
    howStep2Kicker: 'Étape 02 · Tenir le journal',
    howStep2Title: 'Écrivez au fil du voyage.',
    howStep2Body:
      'Depuis votre téléphone, dans le chalet, dans la voiture, au sauna. Ajoutez photos, température, le goût de la soupe. Chaque entrée s’épingle automatiquement au jour et au lieu.',
    howStep3Kicker: 'Étape 03 · Partager',
    howStep3Title: 'Votre voyage, bien raconté.',
    howStep3Body:
      'Vos entrées deviennent un blog public à l’adresse lapland.blog/votre-nom. Vos amis peuvent le suivre. Chaque article s’exporte en story Instagram, et le voyage vit deux fois.',
    howCta: 'Lancer votre blog de voyage',
    howFootnote: 'Gratuit pour les carnets de voyage · Sans carte · Connexion Google',
    liveEyebrow: 'Blogs de voyage en cours',
    liveH2Pre: 'De vrais voyages.',
    liveH2Italic: 'De vrais voyageurs.',
    liveH2Tail: 'Le vôtre est le prochain.',
    liveLead:
      'Pistes noires à Levi. Chasse aux aurores à Inari. 60 km en traîneau à chiens à Saariselkä. Tous les blogs présents ici ont été écrits par un visiteur lors d’un seul voyage, et créés en moins de cinq minutes.',
    liveBrowseAll: 'Parcourir tous les blogs',
    liveCta: 'Lancer mon blog de voyage',
    liveFootnote: 'Gratuit · Sans carte · Première entrée en 2 minutes',
    featuredEyebrow: 'Journal-exemple du fondateur',
    featuredEvery: 'Toutes les entrées →',
    featuredLead:
      'Voici à quoi pourrait ressembler votre propre blog de voyage. Les cinq entrées-germes ci-dessous ont été rédigées par The Field Journal, la voix éditoriale de Lapland.blog, au fil d’un hiver lapon. Vraies températures, vrais chalets, vraie soupe. Lisez-en une et imaginez la vôtre.',
    featuredLoading: 'Chargement de l’exemple…',
    featuredNone: 'Pas encore d’entrée-exemple.',
    featuredReadEntry: 'Lire cette entrée',
    pillarsEyebrow: 'Quoi raconter',
    pillarsH2Pre: 'Le voyage en Laponie,',
    pillarsH2Italic: 'en trois fils.',
    pillarsLead:
      'Parcourez ce que d’autres voyageurs ont consigné, et choisissez les fils que vous voudrez écrire pendant votre propre voyage. Aurores, chalets, nourriture, le froid, les gens, et les silences entre les deux.',
    pillar1Kicker: 'I · Le froid',
    pillar1Title: 'Ce que le froid fait vraiment',
    pillar1Body:
      'Nuits aurorales, nuit polaire, les huit saisons que la plupart des listes oublient. Ici la météo est un personnage principal, pas un décor. Notes de terrain sur ce que ressent –23 à 3 h 47, sur ce que ça fait à une batterie de téléphone, et à une personne.',
    pillar2Kicker: 'II · Le refuge',
    pillar2Title: 'Où vous dormez, où vous mangez',
    pillar2Body:
      'Chalets en bois, igloos de verre, saunas qui marchent et saunas qui ne marchent pas. La soupe de saumon à 42 € qui méritait finalement son prix. Le pain de seigle qui survit à un sac à dos, et le café que l’on boit à 2 h du matin parce que le soleil a oublié de se coucher.',
    pillar3Kicker: 'III · Les autres',
    pillar3Title: 'Qui vit aussi là-haut',
    pillar3Body:
      'Éleveurs de rennes, patrouilleurs de pistes, maîtres saunas, l’homme de la station-service de Sodankylä qui parlait quatre langues. La Laponie est silencieuse, jamais vide. Récits longs sur les gens que vous croiserez vraiment.',
    latestEyebrow: 'Entrées-exemple',
    latestH2: 'Voyez à quoi ressemble un blog de voyage.',
    latestEvery: 'Toutes les entrées',
    latestLoading: 'Chargement des récits…',
    asideEyebrow: 'Pourquoi ce site existe',
    asideH2: 'La Laponie n’est pas une brochure. Votre voyage non plus.',
    asideP1:
      'Chaque année, des milliers de visiteurs arrivent en Laponie, voient quelque chose d’extraordinaire et le perdent dans un rouleau photo qu’ils ne rouvriront jamais. L’aurore au-dessus du chalet. Le retour du sauna, les doigts engourdis. Le bol de soupe de saumon qui valait, va savoir comment, 42 €. Disparu en une semaine.',
    asideP2:
      'Lapland.blog est un petit outil gratuit pour y remédier. Épinglez où vous étiez. Écrivez ce que vous avez vu. Photographiez la soupe. Avant d’avoir repris l’avion, vous tenez un vrai blog de votre voyage : un blog que vos amis peuvent vraiment suivre, un blog que vous aurez encore envie de relire dans cinq ans. Pas de photos d’archive. Pas de « féerique hiver merveilleux ». Juste votre version honnête du lieu.',
    asideCta1: 'Lancer le vôtre',
    asideCta2: 'À propos de lapland.blog',
    asidePill: 'Votre voyage · Votre blog',
    travelJournalBadge: 'Gratuit pour les carnets de voyage',
    faqHeading: 'Questions fréquentes sur lapland.blog',
    faq: [
      {
        q: 'Comment démarrer un blog de voyage sur lapland.blog ?',
        a: "Connectez-vous avec votre compte Google, donnez un nom à votre blog et écrivez votre première entrée. Chaque entrée peut contenir du texte, des photos, la date et un repère sur la carte pour l'endroit où vous étiez. Votre blog se trouve à l'adresse lapland.blog/votre-nom et est prêt à être partagé dès sa publication : rien à installer et aucune configuration en dehors de la connexion.",
      },
      {
        q: 'lapland.blog est-il gratuit ?',
        a: "Oui. Créer un blog, écrire des entrées, ajouter des photos, repérer des lieux sur la carte et partager votre blog, tout est gratuit. Aucune carte n'est requise pour s'inscrire et votre blog ne comporte pas de publicité.",
      },
      {
        q: 'Puis-je partager mon blog de Laponie sur Instagram et Facebook ?',
        a: "Oui. Chaque blog possède un lien public que vous pouvez publier où vous voulez, et chaque entrée peut être exportée sous forme d'image au format story Instagram, pour partager une seule journée d'un geste. Vos proches peuvent ouvrir votre blog sans compte personnel.",
      },
      {
        q: 'Dois-je être en Laponie pour écrire un blog ici ?',
        a: "Non. Nous avons conçu lapland.blog pour les voyageurs en route vers la Laponie finlandaise, donc la carte et les suggestions sont pensées pour les voyages dans le Nord, mais chacun peut tenir un blog ici, que vous prépariez un voyage, l'écriviez en chemin ou le complétiez une fois rentré. Vous pouvez commencer avant le départ et ajouter des entrées jour après jour.",
      },
      {
        q: 'Sur quoi écrire dans mon carnet de voyage en Laponie ?',
        a: "Sur tout ce que vous ne voulez pas oublier. Où vous avez dormi, à quoi ressemblaient les aurores, la température du matin le plus froid, le repas qui vous a surpris, la balade en traîneau à chiens, le silence de la forêt. Des entrées courtes avec une photo et un repère de lieu fonctionnent bien : quelques lignes par jour finissent par former un blog qu'on a envie de relire.",
      },
    ],
  },
  startHere: {
    eyebrow: 'Bienvenue',
    h1: 'Bonjour. Trois entrées possibles.',
    lead:
      'Lapland.blog est un site de carnet de voyage gratuit, lent, photo-led, pensé pour ceux qui se rendent vraiment en Laponie finlandaise. Que vous planifiiez un voyage, soyez en pleine expédition ou rentré chez vous en regrettant de ne pas l’avoir écrit, choisissez votre voie.',
    path1Kicker: '01 · Planification',
    path1Title: 'Je planifie un voyage en Laponie.',
    path1Body:
      'Où dormir, comment y aller, quoi faire, où manger : le côté pratique. Rendez-vous sur les sites jumeaux de LaplandVibes qui gèrent les réservations.',
    path1Cta: 'Planifier votre voyage',
    path2Kicker: '02 · Lecture',
    path2Title: 'Je veux lire ce que d’autres ont écrit.',
    path2Body:
      'Entrées-germes triées sur le volet, écrites depuis la Finlande : le paquetage du chalet, la soirée soupe de saumon, l’aurore au-dessus de Kemi. Vraies températures, vraies heures, sans voix de brochure.',
    path2Cta: 'À lire en priorité',
    path3Kicker: '03 · Écriture',
    path3Title: 'Je suis sur place. Je veux un blog de mon voyage.',
    path3Body:
      'Connectez-vous par e-mail ou Google. Recevez votre coin de lapland.blog. Épinglez des lieux, écrivez des entrées, partagez avec vos amis. Gratuit, sans piège, sans formule premium.',
    path3Cta: 'Lancer votre blog',
    planEyebrow: 'Planifier votre voyage',
    planH2: 'Le côté pratique, sur les sites jumeaux.',
    planLead:
      'Lapland.blog est le journal. Les réservations se font sur les sites du réseau LaplandVibes, chacun spécialisé dans une seule chose qu’il fait bien.',
    planStay: {
      kicker: 'Dormir',
      title: 'Chalets, igloos, hôtels',
      body: 'Comparez des centaines d’hébergements en Laponie : igloos de verre, chalets en bois, stations de ski.',
    },
    planTransport: {
      kicker: 'Y aller',
      title: 'Vols, trains, bus',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo : vols, trains de nuit, les routes pratiques.',
    },
    planDo: {
      kicker: 'Faire',
      title: 'Husky, motoneige, sauna',
      body: 'Activités réservables auprès des opérateurs eux-mêmes, avec avis, pas de communiqué de presse.',
    },
    planEat: {
      kicker: 'Manger',
      title: 'Cuisine et boissons',
      body: 'Où aller manger pour de vrai : la soupe de saumon, le pain de seigle, les bars qui ont connu de meilleures décennies.',
    },
    planAllSites: 'Ou parcourez les 27 sites à laplandvibes.com',
    onlyEyebrow: 'Si vous n’en lisez qu’une',
    onlyH2: 'Lisez celle-ci.',
    onlyLead: 'La dernière entrée du carnet de terrain. Vraie température, vraie heure, sans voix de brochure.',
    thenEyebrow: 'Puis celles-ci',
    thenH2: 'D’autres pages du terrain.',
    everyEntry: 'Toutes les entrées',
  },
  about: {
    pageTitle: 'À propos | Lapland.blog',
    pageDescription:
      'Lapland.blog est une plateforme gratuite de carnet de voyage pour les visiteurs de la Laponie finlandaise. Épinglez des lieux, écrivez des entrées, partagez.',
    eyebrow: 'À propos de la plateforme',
    h1: 'Un carnet de voyage qui mérite d’être conservé.',
    lead:
      'Lapland.blog est une plateforme gratuite de carnet de voyage pour les visiteurs de la Laponie finlandaise. Épinglez l’endroit où vous avez vu les aurores. Photographiez le chalet. Notez ce que la température faisait. Au moment de rentrer, vous avez un blog de votre voyage : que vos amis peuvent vraiment suivre, et que vous aurez encore envie de relire dans cinq ans.',
    intro:
      'La plupart des blogs sur la Laponie se lisent comme une brochure. La plupart des applis de carnet de voyage finissent abandonnées dans un rouleau photo ou partagées en un seul post Instagram qui disparaît en une journée. Lapland.blog est l’entre-deux : un vrai blog de voyage, lent, photo-led, hébergé sous un nom qui reçoit déjà du trafic, conservé aussi longtemps que vous le voulez.',
    howHeading: 'Comment ça marche',
    howStepPin: 'Épinglez le chalet, le restaurant, le spot de ciel noir. Construisez votre itinéraire avant de partir.',
    howStepWrite: 'Écrivez en chemin, depuis le chalet, la voiture, le sauna. Ajoutez des photos, la température et le goût de la soupe.',
    howStepShare: 'Vos entrées deviennent un blog public sur lapland.blog/votre-nom. Vos proches peuvent suivre ; chaque entrée s’exporte en story Instagram.',
    howBody:
      'Connectez-vous par e-mail ou Google. Recevez votre coin à lapland.blog/me. Chaque entrée se compose d’une image principale, d’une épingle de lieu et des mots que vous voulez dire. Sauvegardez en brouillon, publiez quand c’est prêt, partagez le lien à vos amis. Chaque entrée publiée est indexée et cherchable, et votre voyage devient un petit morceau de la grande archive de la Laponie.',
    freeHeading: 'Ce qui est gratuit',
    freeBody:
      'Écrire des entrées. Héberger votre blog de voyage sous lapland.blog/me/votrenom. Photos. Newsletter. Pas de paywall, pas de formule premium côté auteur.',
    notHeading: 'Ce que vous ne trouverez pas',
    notBody:
      'Des publications sponsorisées dans les entrées des lecteurs. Des listes d’affiliés glissées dans votre blog. Les mots « inoubliable », « bucket list », « magique », « pays des merveilles hivernal » sont bannis des brouillons éditoriaux, et tout aussi à bannir des vôtres. Mauvais pour l’écriture, mauvais pour le lecteur.',
    seedHeading: 'Les entrées-germes',
    seedBody:
      'Les cinq entrées déjà publiées ont été écrites par The Field Journal, la voix éditoriale de Lapland.blog. Elles sont là pour montrer ce que peut être un blog de voyage honnête, lent, photo-led : vraies températures, vraies heures, sans voix de brochure. Lisez-en une et imaginez la vôtre.',
    networkHeading: 'À propos du réseau',
    networkBody:
      'Lapland.blog fait partie de l’écosystème LaplandVibes, un réseau de sites finlandais sur la Laponie. Les autres sites vous disent où aller, où dormir et quoi faire. Celui-ci est l’endroit où le voyage lui-même se met par écrit.',
    contactHeading: 'Nous contacter',
    contactBody:
      'Pour nous saluer, signaler une erreur factuelle ou nous envoyer une photo à créditer, écrivez à info@lapland.blog. Nous lisons tout et nous essayons de répondre sous une semaine.',
    closing: 'Écrit depuis la Laponie finlandaise, à la température et à l’heure réelles.',
    ctaPrimary: 'Lancer votre propre carnet →',
    ctaSecondary: 'Ou',
    ctaSecondaryLink: 'lisez d’abord les entrées-germes',
  },
  destinations: {
    pageTitle: 'Destinations | Lapland.blog',
    pageDescription:
      'Les huit principales destinations de Laponie finlandaise : Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Lisez les entrées de chacune.',
    eyebrow: 'Où aller',
    h1Pre: 'Huit lieux.',
    h1Italic: 'Une Laponie.',
    lead:
      'Choisissez une destination et lisez les entrées qui en viennent. Les listes vides sont les prochaines à écrire, vous pouvez en être le premier.',
    beTheFirst: 'Soyez le premier',
    entrySingular: 'entrée',
    entryPlural: 'entrées',
    readEntries: 'Lire les entrées',
    beFirstWrite: 'Écrire la première',
    findStayPrefix: 'Trouver un hébergement à',
    dontSeeEyebrow: 'Votre lieu n’y est pas ?',
    plantH2: 'Plantez le drapeau.',
    plantLead:
      'Vous partez ailleurs ? Sodankylä, Posio, Kilpisjärvi, Hetta. Écrivez la première entrée depuis là-bas et nous l’ajouterons à la carte.',
    plantCta: 'Lancer votre blog',
  },
  topReads: {
    pageTitle: 'À lire en priorité | Lapland.blog',
    pageDescription:
      'Par où commencer sur Lapland.blog. Listes de la rédaction : première visite, aurores, cuisine et saisonnières.',
    eyebrow: 'Listes de la rédaction',
    h1: 'À lire en priorité.',
    lead: 'Par où commencer. Choix de la rédaction, pas des clics. Au fur et à mesure que de nouvelles entrées paraissent, ces listes s’étoffent.',
    onlyEyebrow: 'Si vous n’en lisez qu’une',
    onlyH2: 'Le n° 1 de la rédaction.',
    onlyLead:
      'L’aurore au-dessus du golfe de Botnie, –23 à 3 h 47, et la photo qu’aucun de nous n’a réussi à prendre. Le texte qui définit la voix de Lapland.blog.',
    firstTimersEyebrow: 'Pour les premiers voyages',
    firstTimersTitle: 'Trois lectures à faire avant de partir.',
    firstTimersSubtitle:
      'Pourquoi tant de gens se trompent sur les aurores, quoi emporter dans un chalet, et pourquoi la nuit polaire est en fait supportable. Lisez-les et vous arriverez moins surpris.',
    auroraEyebrow: 'Aurores boréales',
    auroraTitle: 'Les entrées du ciel nocturne.',
    auroraSubtitle: 'Sur la traque, la photo, et les nuits où elles apparaissent quand même.',
    cabinsEyebrow: 'Les chalets',
    cabinsTitle: 'Entrées mökki.',
    cabinsSubtitle:
      'Ce qu’est vraiment un chalet de forêt finlandais : le feu, le sauna, le silence, et ce que personne ne dit jamais sur les toilettes extérieures à –30.',
    foodEyebrow: 'Cuisine + boissons',
    foodTitle: 'Les entrées cuisine.',
    foodSubtitle:
      'Soupe de saumon à 42 €, pain de seigle qui survit à un sac à dos, et le café que l’on boit à 2 h du matin parce que le soleil a oublié de se coucher.',
    seasonalEyebrow: 'Saisonnier',
    seasonalTitle: 'Ce que le froid fait vraiment.',
    seasonalSubtitle:
      'Kaamos, les huit saisons que la plupart des listes oublient, et le petit ouvrage que représente traverser décembre sans soleil.',
    ctaEyebrow: 'Votre voyage, le prochain ?',
    ctaH2: 'Soyez la prochaine entrée sur cette page.',
    ctaLead:
      'Ces listes grandissent quand les lecteurs écrivent. Connectez-vous, écrivez quelques entrées, et la rédaction mettra en avant celles qui le méritent.',
    ctaButton: 'Lancer votre blog',
  },
  archive: {
    pageTitle: 'Toutes les entrées | Lapland.blog',
    pageDescription:
      'Tous les récits de Lapland.blog. Aurores, chalets, cuisine, saisons, gens, équipement et lectures longues depuis la Laponie finlandaise.',
    eyebrow: 'Archives',
    h1: 'Toutes les entrées.',
    lead:
      'Pas d’algorithme, pas de ruse éditoriale. Le plus récent en haut. Filtrez pour resserrer, ou cherchez si vous savez déjà ce que vous voulez.',
    all: 'Tout',
    filterAria: 'Filtrer par catégorie',
    searchSr: 'Chercher dans les récits',
    searchPlaceholder: 'Titres, mots-clés…',
    loading: 'Chargement des récits…',
    emptyTitle: 'Aucun récit ne correspond.',
    emptyBody: 'Essayez d’effacer le filtre ou de chercher un autre mot.',
  },
  category: {
    allStoriesBack: 'Tous les récits',
    categoryPrefix: 'Catégorie',
    storySingular: 'récit',
    storyPlural: 'récits',
    loading: 'Chargement des récits…',
    emptyTitle: 'Rien ici pour l’instant.',
    emptyBody: 'Cette catégorie attend son premier récit. Revenez bientôt.',
    emptyLink: 'Parcourir tous les récits →',
    keepExploringEyebrow: 'Continuer à explorer',
    otherThemes: 'Autres thèmes',
    themes: {
      aurora: {
        name: 'Aurores',
        tagline: 'Le ciel, quand il veut bien.',
        description:
          'Des nuits sous les aurores boréales, racontées honnêtement. Météo, indice Kp, attente, froid, et les moments qui comptent vraiment.',
        metaTitle: 'Aurores boréales en Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Nuits d’aurores boréales en Laponie finlandaise, racontées honnêtement : météo, indice Kp, attente, froid et les moments qui comptent vraiment.',
      },
      cabins: {
        name: 'Chalets',
        tagline: 'Quatre murs, un poêle, zéro wifi.',
        description:
          'Chalets en bois, igloos de verre, saunas qui marchent, saunas qui ne marchent pas. Ce que ça fait vraiment de dormir loin d’une ville.',
        metaTitle: 'Chalets en Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Chalets en bois, igloos de verre, saunas qui marchent et saunas qui ne marchent pas. Dormir loin d’une ville en Laponie finlandaise, pour de vrai.',
      },
      food: {
        name: 'Cuisine',
        tagline: 'Le goût de la Laponie en hiver.',
        description:
          'Soupe de saumon, pain de seigle, renne de trois façons, et le café que l’on boit à 2 h du matin parce que le soleil a oublié de se coucher.',
        metaTitle: 'La cuisine en Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Soupe de saumon, pain de seigle, renne de trois façons et le café de 2 h du matin parce que le soleil a oublié de se coucher. Manger en Laponie finlandaise.',
      },
      seasons: {
        name: 'Saisons',
        tagline: 'Huit, pas quatre.',
        description:
          'Nuit polaire en décembre. Soleil de minuit en juin. Ruska en septembre. Huit saisons distinctes, pas quatre. Aucune n’est un gadget.',
        metaTitle: 'Les huit saisons de la Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Nuit polaire en décembre, soleil de minuit en juin, ruska en septembre. La Laponie finlandaise compte huit saisons distinctes, pas quatre.',
      },
      people: {
        name: 'Gens',
        tagline: 'Qui l’on rencontre là-haut.',
        description:
          'Éleveurs de rennes, pisteurs, maîtres de sauna et inconnus dans les halls d’hôtel. La Laponie est silencieuse, mais jamais vide.',
        metaTitle: 'Les gens de la Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Éleveurs de rennes, pisteurs, maîtres de sauna et inconnus dans les halls d’hôtel. La Laponie est silencieuse, mais jamais vide.',
      },
      gear: {
        name: 'Équipement',
        tagline: 'Ce qui survit à −25 °C.',
        description:
          'Bottes, gants, couches, batteries, choix d’appareil photo. Ce qui marche vraiment à −25 °C, et ce que j’ai jeté.',
        metaTitle: 'L’équipement qui marche en Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Bottes, gants, couches, batteries et choix d’appareil photo pour la Laponie finlandaise. Ce qui marche vraiment à −25 °C, et ce que j’ai jeté.',
      },
      stories: {
        name: 'Récits',
        tagline: 'Le chemin le plus long.',
        description:
          'Des lectures plus longues. Un voyage, une nuit, un après-midi étrange. Quand un billet demande plus de 800 mots.',
        metaTitle: 'Récits longs de Laponie finlandaise · Lapland.blog',
        metaDescription:
          'Lectures longues depuis la Laponie finlandaise : un voyage, une nuit, un après-midi étrange. Quand un billet demande plus de 800 mots.',
      },
    },
  },
  post: {
    allStories: 'Tous les récits',
    by: 'Par',
    minRead: 'min de lecture',
    loadingStory: 'Chargement du récit…',
    readNextEyebrow: 'À lire ensuite',
    readNextH2: 'Plus du journal',
    tagged: 'Étiqueté',
    exploreMore: 'Explorez plus du réseau LaplandVibes',
    editorialLabel: 'Une entrée du Field Journal',
    editorialNote: "L'une des quelques entrées d'exemple écrites par The Field Journal, la voix éditoriale de Lapland.blog, pour montrer à quoi ressemble un carnet de voyage honnête. Lieux et températures réels ; vos propres entrées, c'est vous qui les écrivez.",
  },
  signIn: {
    pageTitle: 'Planifiez votre voyage en Laponie | Lapland.blog',
    pageDescription:
      'Une page voyage gratuite, des conseils personnalisés et les meilleures offres pour votre séjour en Laponie. Dites-nous quand vous venez.',
    back: 'Retour',
    eyebrow: 'Votre page voyage gratuite',
    h1Pre: 'Planifiez votre',
    h1Italic: 'voyage en Laponie.',
    lead:
      'Obtenez votre page à lapland.blog/votrenom. Écrivez le récit de votre voyage, partagez vos photos et recevez conseils et offres personnalisés. Dites-nous quand vous venez et nous vous aiderons à planifier chaque étape.',
    benefit1Title: 'Épinglez votre itinéraire sur la carte de Laponie',
    benefit1Body: 'Chalet, restaurant, spot à aurores : posez vos épingles avant de partir.',
    benefit2Title: 'Écrivez vos entrées depuis votre téléphone',
    benefit2Body: 'Depuis le chalet, la voiture, le sauna. Photos, météo, histoires.',
    benefit3Title: 'Partagez sur Instagram en un geste',
    benefit3Body: 'Chaque entrée s’exporte en story verticale que vos amis ouvriront vraiment.',
    footnote: 'Gratuit pour les carnets de voyage · Sans carte bancaire · Fait en Finlande',
    sentTitle: 'Vérifiez votre boîte de réception',
    sentBody:
      'Nous avons envoyé un lien magique à {email}. Cliquez dessus et votre blog de voyage est en ligne. Le lien expire dans une heure.',
    useDifferent: 'Utiliser une autre adresse e-mail',
    reserveEyebrow: 'Réserver votre page',
    formH2: 'Planifiez votre voyage en Laponie',
    formLead: 'Nous créons votre page voyage et vous envoyons des conseils personnalisés selon la date de votre séjour.',
    emailLabel: 'Votre e-mail',
    emailPlaceholder: 'vous@example.com',
    travelLabel: 'Quand venez-vous en Laponie ?',
    monthLabel: 'Mois…',
    yearLabel: 'Année…',
    noDates: 'Je rêve encore, pas de date',
    enterEmail: 'Entrez votre e-mail pour commencer.',
    sending: 'Envoi du lien magique…',
    submitCta: 'Réserver ma page voyage',
    months: [
      'janvier','février','mars','avril','mai','juin',
      'juillet','août','septembre','octobre','novembre','décembre',
    ],
  },
  unsubscribe: {
    pageTitle: 'Désabonnement | Lapland.blog',
    pageDescription: 'Désabonnez-vous de la newsletter Lapland.blog. Un clic, sans rancune.',
    eyebrow: 'Newsletter',
    h1: 'Désabonnement',
    successTitle: 'Vous êtes désabonné(e).',
    successBody:
      'Nous sommes désolés de vous voir partir. Vous ne recevrez plus d’e-mails de Lapland.blog. Si vous changez d’avis, le formulaire d’abonnement est sur chaque page.',
    backHome: '← Retour à l’accueil',
    lead: 'Entrez l’adresse e-mail utilisée à l’inscription. Un clic et c’est fini. Aucune boucle « êtes-vous sûr ? », aucun sondage.',
    emailPlaceholder: 'votre@email.com',
    processing: 'Traitement…',
    submit: 'Se désabonner',
  },
  notFound: {
    pageTitle: 'Introuvable | Lapland.blog',
    pageDescription: 'Cette page n’existe pas. Elle a peut-être été déplacée, renommée ou perdue dans la neige.',
    eyebrow: 'Introuvable · 404',
    h1: 'Perdu dans la neige.',
    body: 'Cette page n’existe pas, ou pas encore. Quoi qu’il en soit, le reste du blog est par ici.',
    backHome: 'Retour à l’accueil',
    allStories: 'Tous les récits →',
  },
  chrome: {
    readTheStory: 'Lire le récit',
    shareThisStory: 'Partager ce récit',
    inThisStory: 'Dans ce récit',
    fieldJournalEntry: 'Entrée du carnet de terrain',
    liveTripBlog: 'Blog de voyage en direct',
    yoursCouldBeNext: 'Le vôtre pourrait être le prochain dans ce carrousel.',
    featuredBadge: 'À la une',
    minRead: 'min de lecture',
  },
  footer: {
    ...en.footer,
    networkBadge: 'Réseau Laponie finlandaise',
    tagline: 'Le blog de Laponie finlandaise : récits honnêtes, culture sami, aurores boréales et la vie arctique au quotidien.',
    travelGuide: 'Guide de voyage en Laponie',
    aboutEyebrow: 'À propos du Lapland Blog',
    aboutBody: 'Un vrai blog de Laponie : carnets de voyage, culture sami, aurores boréales et vie arctique au quotidien, écrits par des auteurs locaux.',
    aboutBadge: 'Édité de façon indépendante · sources citées',
    spottedError: { title: 'Vous avez repéré une erreur ?', body: 'Quelque chose à corriger ? Dites-le-nous, nous rectifions immédiatement.', cta: 'Signaler une erreur →' },
    partner: { title: 'Travailler avec nous', body: 'Publicité ou collaborations sur 27 sites consacrés à la Laponie.', cta: 'Nous contacter →' },
    press: { title: 'Presse et médias', body: 'Partenariats éditoriaux et kits presse.', cta: 'Demandes presse →' },
    copyright: '© {{year}} #LaplandVibes · Membre du réseau #LaplandVibes',
    websiteBy: 'Site réalisé par Yrityspaketit.fi',
    privacy: 'Politique de confidentialité',
    cookiePolicy: 'Politique des cookies',
    terms: "Conditions d'utilisation",
    contact: 'Contact',
    groups: { stay: 'Dormir', eatDrink: 'Manger & boire', do: 'À faire', explore: 'Explorer', essentials: 'Essentiels' },
  },
  newsletter: {
    ...en.newsletter,
    eyebrow: 'La newsletter #LaplandVibes',
    h2: 'Le bulletin hebdomadaire de Laponie',
    lead: "Un e-mail court : nouveaux carnets de voyage, conseils sauna, alertes aurores boréales et les histoires de Laponie qu'on a envie de partager.",
    placeholder: 'votre@email.com',
    subscribing: 'Inscription…',
    subscribe: "S'abonner",
    successTitle: 'Bienvenue !',
    successBody: "Vérifiez votre boîte de réception, l'e-mail de bienvenue arrive.",
    alreadyTitle: 'Déjà inscrit(e)',
    alreadyBody: 'Vous êtes déjà sur la liste, les bonnes histoires continueront de vous parvenir.',
    agreeText: 'En vous abonnant, vous acceptez notre',
    privacyLink: 'politique de confidentialité',
    unsubscribeNote: "Désabonnement possible à tout moment. Votre adresse n'est jamais partagée.",
  },
  cookieBanner: {
    headline: 'Cookies',
    body: 'Nous utilisons des cookies pour analyser le trafic. Consultez notre politique des cookies pour en savoir plus.',
    accept: 'Accepter',
    decline: 'Refuser',
  },
};

export default fr
