import type { SectionCopy } from './types'
import en from './copy.en'

const it: SectionCopy = {
  ...en,
  nav: {
    startHere: 'Inizia da qui',
    topReads: 'Letture top',
    destinations: 'Destinazioni',
    tripDiaries: 'Diari di viaggio',
    about: 'Chi siamo',
    startYourBlog: 'Avvia il Tuo blog',
    signIn: 'Accedi',
    subscribe: 'Iscriviti',
    myTripBlog: 'Il mio blog di viaggio',
    adminDashboard: 'Dashboard admin',
    signOut: 'Esci',
    signedInAs: 'Accesso effettuato come',
  },
  home: {
    heroEyebrow: 'Diario di viaggio · Mappa · Condivisione',
    heroLine1: 'Parte per la Lapponia?',
    heroLine2: 'Avvii un blog del Suo viaggio.',
    heroLead:
      'Segni sulla mappa il luogo in cui ha visto l’aurora. Fotografi la baita. Annoti che cosa faceva la temperatura. Costruisca un bel blog del Suo viaggio, uno che i Suoi amici possano davvero seguire.',
    heroPrimaryCta: 'Avvia il blog di viaggio',
    heroSecondaryCta: 'Veda come funziona',
    heroFootnote: 'Gratuito · Realizzato in Finlandia · Condivisione su Instagram · Senza pubblicità',
    seasonalBadge: 'Di stagione · Sole di mezzanotte · 6 giugno → 7 luglio',
    seasonalH2: 'Un blog di viaggio gratuito per il tuo viaggio in Lapponia, scritto lungo il percorso.',
    seasonalLead:
      'Lapland.blog trasforma il tuo viaggio in un blog semplice e bello: segna i luoghi, aggiungi foto, racconta cosa è successo e condividi il link con gli amici. In questo momento significa estate. Trentadue notti in cui il sole non tramonta, la foresta diventa ambrata e i laghi rispecchiano il cielo. Inizia il diario mentre ne fai ancora parte.',
    seasonalCta1: 'Avviare il tuo blog di viaggio',
    seasonalCta2: 'Leggere i racconti d’estate',
    seasonalCard1Title: '24 ore di ora dorata',
    seasonalCard1Body: 'Il sole sfiora l’orizzonte. I fotografi la chiamano l’ora blu più lunga del pianeta.',
    seasonalCard2Title: 'Stagione del lampone artico',
    seasonalCard2Body: 'Fine luglio: la torbiera diventa d’oro. I locali la chiamano il secondo raccolto.',
    seasonalCard3Title: 'Sauna, poi un tuffo',
    seasonalCard3Body: 'Lago a 14 °C a mezzanotte, sauna a 90 °C a cinque passi. Ripeta.',
    seasonalCard4Title: 'Nessun altro',
    seasonalCard4Body: 'Le baite tutte prenotate d’inverno restano vuote a luglio. Stessa foresta, nessuna fila.',
    seasonalLabels: { light: '01 · Luce', forest: '02 · Foresta', water: '03 · Acqua', quiet: '04 · Silenzio' },
    howEyebrow: 'Come funziona',
    howH2Pre: 'Tre passi. Un viaggio.',
    howH2Italic: 'Un blog che vale la pena conservare.',
    howLead:
      'Lapland.blog è una piattaforma gratuita di diario di viaggio pensata per chi visita la Lapponia finlandese. Il Suo viaggio diventa un blog che avrà davvero voglia di condividere.',
    howStep1Kicker: 'Passo 01 · Pianificazione',
    howStep1Title: 'Segni i luoghi sulla mappa.',
    howStep1Body:
      'Posizioni sulla mappa della Lapponia la baita prenotata, il ristorante che vuole provare e il punto di cielo scuro per l’aurora. Costruisca l’itinerario prima di partire.',
    howStep2Kicker: 'Passo 02 · Diario',
    howStep2Title: 'Scriva mentre viaggia.',
    howStep2Body:
      'Dal telefono, in baita, in auto, in sauna. Aggiunga foto, temperatura, il sapore della zuppa. Ogni voce si fissa automaticamente al giorno e al luogo.',
    howStep3Kicker: 'Passo 03 · Condivisione',
    howStep3Title: 'Il Suo viaggio, raccontato bene.',
    howStep3Body:
      'Le Sue voci diventano un blog pubblico a lapland.blog/il-suo-nome. Gli amici possono seguirlo. Ogni post si esporta in una storia Instagram, e il viaggio vive due volte.',
    howCta: 'Avvia il blog di viaggio',
    howFootnote: 'Gratuito per i diari di viaggio · Senza carta · Accesso con Google',
    liveEyebrow: 'Blog di viaggio in corso',
    liveH2Pre: 'Viaggi veri.',
    liveH2Italic: 'Viaggiatori veri.',
    liveH2Tail: 'Il prossimo è il Suo.',
    liveLead:
      'Piste nere a Levi. Caccia all’aurora a Inari. 60 km in slitta trainata da husky a Saariselkä. Ogni blog che vede qui è stato scritto da un visitatore durante un singolo viaggio, e creato in meno di cinque minuti.',
    liveBrowseAll: 'Vedere tutti i blog',
    liveCta: 'Avvia il mio blog di viaggio',
    liveFootnote: 'Gratuito · Senza carta · Prima voce in 2 minuti',
    featuredEyebrow: 'Diario-esempio del fondatore',
    featuredEvery: 'Tutte le voci →',
    featuredLead:
      'Ecco come potrebbe apparire il Suo blog di viaggio. Le cinque voci-seme qui sotto sono state scritte da The Field Journal, la voce editoriale di Lapland.blog, nel corso di un inverno lappone. Temperature reali, baite reali, zuppa reale. Ne legga una e immagini la Sua.',
    featuredLoading: 'Caricamento dell’esempio…',
    featuredNone: 'Ancora nessuna voce-esempio.',
    featuredReadEntry: 'Leggi questa voce',
    pillarsEyebrow: 'Cosa raccontare',
    pillarsH2Pre: 'Il viaggio in Lapponia,',
    pillarsH2Italic: 'in tre fili.',
    pillarsLead:
      'Veda cosa altri viaggiatori hanno annotato, e scelga i fili che vuole raccontare nel Suo viaggio. Aurora, baite, cibo, il freddo, le persone, i silenzi nel mezzo.',
    pillar1Kicker: 'I · Il freddo',
    pillar1Title: 'Cosa fa davvero il freddo',
    pillar1Body:
      'Notti d’aurora, buio polare, le otto stagioni che quasi tutti gli elenchi dimenticano. Qui il meteo è il protagonista, non lo sfondo. Appunti sul campo su cosa si prova a –23 alle 03:47, su cosa fa a una batteria del telefono, e a una persona.',
    pillar2Kicker: 'II · Il riparo',
    pillar2Title: 'Dove si dorme, dove si mangia',
    pillar2Body:
      'Baite di legno, igloo di vetro, saune che funzionano e saune che non funzionano. La zuppa di salmone da 42 € che, alla fine, valeva il prezzo. Il pane di segale che sopravvive a uno zaino e il caffè che si beve alle 2 del mattino perché il sole si è dimenticato di tramontare.',
    pillar3Kicker: 'III · Le altre persone',
    pillar3Title: 'Chi altro vive quassù',
    pillar3Body:
      'Allevatori di renne, soccorritori sulle piste, maestri di sauna, l’uomo della stazione di servizio fuori Sodankylä che parlava quattro lingue. La Lapponia è silenziosa, ma non è mai vuota. Approfondimenti sulle persone che si incontrano davvero.',
    latestEyebrow: 'Voci-esempio',
    latestH2: 'Veda com’è fatto un blog di viaggio.',
    latestEvery: 'Tutte le voci',
    latestLoading: 'Caricamento racconti…',
    asideEyebrow: 'Perché esiste questo sito',
    asideH2: 'La Lapponia non è una brochure. Nemmeno il Suo viaggio dovrebbe esserlo.',
    asideP1:
      'Ogni anno migliaia di visitatori arrivano in Lapponia, vedono qualcosa di straordinario e lo perdono in un rullino del telefono che non riapriranno mai più. L’aurora sopra la baita. Il ritorno dalla sauna con le dita intorpidite. La ciotola di zuppa di salmone che in qualche modo valeva 42 €. Sparito in una settimana.',
    asideP2:
      'Lapland.blog è un piccolo strumento gratuito per rimediare. Segni dove era. Scriva cosa ha visto. Fotografi la zuppa. Al ritorno in aereo, avrà un vero blog del Suo viaggio: uno che gli amici possono davvero seguire, uno che fra cinque anni avrà ancora voglia di rileggere. Niente foto d’archivio. Niente «paese delle meraviglie invernale». Soltanto la Sua versione onesta del luogo.',
    asideCta1: 'Avvia il Tuo blog',
    asideCta2: 'Chi è lapland.blog',
    asidePill: 'Il Suo viaggio · Il Suo blog',
    travelJournalBadge: 'Gratuito per i diari di viaggio',
    faqHeading: 'Domande frequenti su lapland.blog',
    faq: [
      {
        q: 'Come avvio un blog di viaggio su lapland.blog?',
        a: "Accedi con il tuo account Google, dai un nome al blog e scrivi la prima voce. Ogni voce può contenere testo, foto, la data e un segnaposto sulla mappa per il luogo in cui ti trovavi. Il tuo blog si trova all'indirizzo lapland.blog/il-tuo-nome ed è pronto da condividere appena lo pubblichi: non c'è nulla da installare e nessuna configurazione oltre all'accesso.",
      },
      {
        q: 'lapland.blog è gratuito?',
        a: "Sì. Avviare un blog, scrivere voci, aggiungere foto, segnare luoghi sulla mappa e condividere il blog è tutto gratuito. Non serve alcuna carta per registrarsi e sul tuo blog non c'è pubblicità.",
      },
      {
        q: 'Posso condividere il mio blog della Lapponia su Instagram e Facebook?',
        a: "Sì. Ogni blog ha un link pubblico che puoi pubblicare ovunque e ogni voce può essere esportata come immagine in formato storia di Instagram, così condividi una singola giornata con un tocco. Amici e familiari possono aprire il tuo blog senza un account proprio.",
      },
      {
        q: 'Devo essere in Lapponia per scrivere un blog qui?',
        a: "No. Abbiamo creato lapland.blog per chi viaggia verso la Lapponia finlandese, quindi la mappa e gli spunti sono pensati per i viaggi al nord, ma chiunque può tenere un blog qui, che tu stia pianificando un viaggio, scrivendo durante il viaggio o completandolo dopo il rientro. Puoi iniziare prima di partire e aggiungere voci giorno per giorno.",
      },
      {
        q: 'Di cosa scrivo nel mio diario di viaggio in Lapponia?',
        a: "Di tutto ciò che non vuoi dimenticare. Dove hai alloggiato, com'era l'aurora, la temperatura della mattina più fredda, il pasto che ti ha sorpreso, il giro in slitta con i husky, il silenzio della foresta. Le voci brevi con una foto e un segnaposto di luogo funzionano bene: poche righe al giorno diventano un blog che vale la pena rileggere.",
      },
    ],
  },
  startHere: {
    eyebrow: 'Benvenuto',
    h1: 'Salve. Tre vie d’ingresso.',
    lead:
      'Lapland.blog è un sito di diario di viaggio gratuito, lento e centrato sulle foto, fatto per chi visita davvero la Lapponia finlandese. Che stia pianificando un viaggio, sia in corso o sia rientrato a casa rimpiangendo di non aver scritto nulla, scelga il Suo percorso.',
    path1Kicker: '01 · Pianificazione',
    path1Title: 'Sto pianificando un viaggio in Lapponia.',
    path1Body:
      'Dove dormire, come arrivare, cosa fare, dove mangiare: la parte pratica. Si sposti sui siti gemelli di LaplandVibes che si occupano delle prenotazioni.',
    path1Cta: 'Pianifica il viaggio',
    path2Kicker: '02 · Lettura',
    path2Title: 'Voglio leggere cosa hanno scritto altri.',
    path2Body:
      'Voci-seme curate, scritte dalla Finlandia: il bagaglio in baita, la sera della zuppa di salmone, l’aurora sopra Kemi. Temperature reali, orari reali, niente voce da brochure.',
    path2Cta: 'Letture top',
    path3Kicker: '03 · Scrittura',
    path3Title: 'Sono qui. Voglio un blog del mio viaggio.',
    path3Body:
      'Accesso via e-mail o Google. Riceva un angolo di lapland.blog. Segni luoghi, scriva voci, condivida con gli amici. Gratis, senza trappole, senza piani premium.',
    path3Cta: 'Avvia il Tuo blog',
    planEyebrow: 'Pianifica il viaggio',
    planH2: 'La parte pratica, sui siti gemelli.',
    planLead:
      'Lapland.blog è il diario. Le prenotazioni avvengono sui siti del network LaplandVibes, ognuno specializzato in una sola cosa che sa fare bene.',
    planStay: {
      kicker: 'Dormire',
      title: 'Baite, igloo, hotel',
      body: 'Confronti centinaia di soluzioni in Lapponia: igloo di vetro, baite di tronchi, stazioni sciistiche.',
    },
    planTransport: {
      kicker: 'Arrivare',
      title: 'Voli, treni, autobus',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: voli, treni notturni, le tratte pratiche.',
    },
    planDo: {
      kicker: 'Fare',
      title: 'Husky, motoslitta, sauna',
      body: 'Attività prenotabili presso gli operatori reali, con recensioni, non un comunicato stampa.',
    },
    planEat: {
      kicker: 'Mangiare',
      title: 'Cibo e bevande',
      body: 'Dove mangiare davvero: la zuppa di salmone, la segale, i bar che hanno visto decenni migliori.',
    },
    planAllSites: 'Oppure sfogli i 26 siti su laplandvibes.com',
    onlyEyebrow: 'Se ne legge una sola',
    onlyH2: 'Legga questa.',
    onlyLead: 'L’ultima voce del diario sul campo. Temperatura reale, orario reale, niente voce da brochure.',
    thenEyebrow: 'Poi queste',
    thenH2: 'Altro dal campo.',
    everyEntry: 'Tutte le voci',
  },
  about: {
    pageTitle: 'Chi siamo | Lapland.blog',
    pageDescription:
      'Lapland.blog è una piattaforma gratuita di diario di viaggio per chi visita la Lapponia finlandese. Segni luoghi, scriva voci, condivida con gli amici.',
    eyebrow: 'La piattaforma',
    h1: 'Un diario di viaggio che vale la pena conservare.',
    lead:
      'Lapland.blog è una piattaforma gratuita di diario di viaggio per chi visita la Lapponia finlandese. Segni dove ha visto l’aurora. Fotografi la baita. Annoti che cosa faceva la temperatura. Al rientro, avrà un blog del Suo viaggio: uno che gli amici possono davvero seguire e che fra cinque anni avrà ancora voglia di rileggere.',
    intro:
      'La maggior parte dei blog sulla Lapponia si leggono come una brochure. La maggior parte delle app di diario di viaggio finiscono abbandonate in un rullino o condivise come un singolo post Instagram che sparisce in un giorno. Lapland.blog è la via di mezzo: un vero blog di viaggio lento, centrato sulle foto, ospitato su un dominio già con traffico e conservato finché lo vorrà.',
    howHeading: 'Come funziona',
    howStepPin: 'Segna la baita, il ristorante, il punto di cielo buio. Costruisci il tuo itinerario prima di partire.',
    howStepWrite: 'Scrivi lungo il percorso, dalla baita, dall’auto, dalla sauna. Aggiungi foto, la temperatura e il sapore della zuppa.',
    howStepShare: 'Le tue voci diventano un blog pubblico su lapland.blog/il-tuo-nome. Gli amici possono seguirlo; ogni voce si esporta come storia di Instagram.',
    howBody:
      'Acceda con e-mail o Google. Ottenga il Suo angolo su lapland.blog/me. Ogni voce ha un’immagine principale, un luogo sulla mappa e le parole che vuole dire. Salvi le bozze, pubblichi quando è pronto, condivida il link. Ogni voce pubblicata viene indicizzata ed è ricercabile, e il Suo viaggio diventa un piccolo pezzo del più grande archivio della Lapponia.',
    freeHeading: 'Cos’è gratuito',
    freeBody:
      'Scrivere le voci. Ospitare il blog di viaggio sotto lapland.blog/me/ilsuonome. Le foto. La newsletter. Lato autore non c’è paywall né piano premium.',
    notHeading: 'Cosa non troverà',
    notBody:
      'Articoli sponsorizzati dentro le voci dei lettori. Liste affiliate infilate nel Suo blog. Le parole «indimenticabile», «da fare nella vita», «magico» o «paese delle meraviglie invernale» sono bandite dalle bozze editoriali e altrettanto da bandire dalle Sue. Fanno male alla scrittura e ai lettori.',
    seedHeading: 'Le voci-seme',
    seedBody:
      'Le cinque voci già presenti sono state scritte da The Field Journal, la voce editoriale di Lapland.blog. Stanno qui per mostrare com’è un blog di viaggio onesto, lento, centrato sulle foto: temperature reali, orari reali, niente voce da brochure. Ne legga una e immagini la Sua.',
    networkHeading: 'Il network',
    networkBody:
      'Lapland.blog fa parte dell’ecosistema LaplandVibes, una rete di siti finlandesi sulla Lapponia. Gli altri siti Le dicono dove andare, dove dormire e cosa fare. Questo è il luogo dove il viaggio stesso viene messo per iscritto.',
    contactHeading: 'Contatti',
    contactBody:
      'Per un saluto, per segnalare un errore o per inviarci una fotografia da accreditare, scriva a info@lapland.blog. Leggiamo tutto e cerchiamo di rispondere entro una settimana.',
    closing: 'Scritto dalla Lapponia finlandese, alla temperatura e all’ora in cui è davvero accaduto.',
    ctaPrimary: 'Avvia il Tuo diario →',
    ctaSecondary: 'Oppure',
    ctaSecondaryLink: 'legga prima le voci-seme',
  },
  destinations: {
    pageTitle: 'Destinazioni | Lapland.blog',
    pageDescription:
      'Le otto principali destinazioni della Lapponia finlandese: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Legga le voci di ciascuna.',
    eyebrow: 'Dove andare',
    h1Pre: 'Otto luoghi.',
    h1Italic: 'Una Lapponia.',
    lead:
      'Scelga una destinazione e legga le voci che ne provengono. Quelle vuote sono le prossime da scrivere, può essere il primo.',
    beTheFirst: 'Sii il primo',
    entrySingular: 'voce',
    entryPlural: 'voci',
    readEntries: 'Leggi le voci',
    beFirstWrite: 'Sii il primo a scrivere',
    findStayPrefix: 'Cerca un alloggio a',
    dontSeeEyebrow: 'Non vede il Suo luogo?',
    plantH2: 'Pianti la bandiera.',
    plantLead:
      'Parte per un luogo che non è in elenco? Sodankylä, Posio, Kilpisjärvi, Hetta. Scriva da lì la prima voce e la aggiungeremo alla mappa.',
    plantCta: 'Avvia il Tuo blog',
  },
  topReads: {
    pageTitle: 'Letture top | Lapland.blog',
    pageDescription:
      'Da dove cominciare su Lapland.blog. Liste curate: migliori voci per chi arriva la prima volta, migliori pezzi sull’aurora, voci sul cibo, voci stagionali.',
    eyebrow: 'Liste curate dalla redazione',
    h1: 'Letture top.',
    lead: 'Da dove cominciare. Scelte dalla redazione, non dai clic. Man mano che escono nuove voci dal campo, queste liste si arricchiscono.',
    onlyEyebrow: 'Se ne legge una sola',
    onlyH2: 'Il numero uno della redazione.',
    onlyLead:
      'Aurora sopra il Golfo di Botnia, –23 alle 3:47 del mattino, e la foto che nessuno di noi è riuscito a scattare. Il pezzo che definisce la voce di Lapland.blog.',
    firstTimersEyebrow: 'Per chi parte la prima volta',
    firstTimersTitle: 'Le tre letture migliori prima di partire.',
    firstTimersSubtitle:
      'Perché molti sbagliano sulle aurore, cosa mettere in valigia per una baita e perché in fondo la notte polare non è un problema. Le legga e arriverà meno spiazzato.',
    auroraEyebrow: 'Aurore',
    auroraTitle: 'Le voci del cielo notturno.',
    auroraSubtitle: 'Sull’inseguirla, sul fotografarla e sulle notti in cui appare comunque.',
    cabinsEyebrow: 'Le baite',
    cabinsTitle: 'Voci mökki.',
    cabinsSubtitle:
      'Com’è davvero una baita finlandese nel bosco: fuoco, sauna, silenzio, e quel dettaglio che nessuno menziona sul gabinetto esterno a –30.',
    foodEyebrow: 'Cibo + bevande',
    foodTitle: 'Le voci di cucina.',
    foodSubtitle:
      'Zuppa di salmone da 42 €, pane di segale che sopravvive a uno zaino e il caffè delle 2 del mattino bevuto perché il sole si è dimenticato di tramontare.',
    seasonalEyebrow: 'Stagionali',
    seasonalTitle: 'Cosa fa davvero il freddo.',
    seasonalSubtitle:
      'Kaamos, le otto stagioni della Lapponia che molti elenchi dimenticano e il piccolo mestiere di attraversare dicembre senza sole.',
    ctaEyebrow: 'Il prossimo viaggio è il Suo?',
    ctaH2: 'Sia la prossima voce di questa pagina.',
    ctaLead:
      'Le liste crescono quando i lettori scrivono. Acceda, scriva qualche voce e la redazione metterà in evidenza quelle che lo meritano.',
    ctaButton: 'Avvia il Tuo blog',
  },
  archive: {
    pageTitle: 'Tutte le voci | Lapland.blog',
    pageDescription:
      'Tutti i racconti di Lapland.blog. Aurore, baite, cibo, stagioni, persone, attrezzatura e letture lunghe dalla Lapponia finlandese.',
    eyebrow: 'Archivio',
    h1: 'Tutte le voci.',
    lead:
      'Nessun algoritmo, nessun trucco editoriale. La più recente in cima. Filtri per restringere o cerchi se sa già cosa vuole leggere.',
    all: 'Tutte',
    filterAria: 'Filtra per categoria',
    searchSr: 'Cerca nei racconti',
    searchPlaceholder: 'Titoli, tag…',
    loading: 'Caricamento racconti…',
    emptyTitle: 'Nessun racconto corrisponde.',
    emptyBody: 'Provi a rimuovere il filtro o a cercare un’altra parola.',
  },
  category: {
    allStoriesBack: 'Tutti i racconti',
    categoryPrefix: 'Categoria',
    storySingular: 'racconto',
    storyPlural: 'racconti',
    loading: 'Caricamento racconti…',
    emptyTitle: 'Ancora nulla qui.',
    emptyBody: 'Questa categoria aspetta il suo primo racconto. Ripassi presto.',
    emptyLink: 'Vedi tutti i racconti →',
    keepExploringEyebrow: 'Continui a esplorare',
    otherThemes: 'Altri temi',
    themes: {
      aurora: {
        name: 'Aurore',
        tagline: 'Il cielo, quando collabora.',
        description:
          'Notti sotto l’aurora boreale, raccontate con onestà. Meteo, indice Kp, attesa, freddo e i momenti che restano davvero.',
        metaTitle: 'Aurore boreali in Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Notti di aurora boreale in Lapponia finlandese, raccontate con onestà: meteo, indice Kp, attesa, freddo e i momenti che restano davvero.',
      },
      cabins: {
        name: 'Baite',
        tagline: 'Quattro pareti, una stufa, zero wifi.',
        description:
          'Baite di legno, igloo di vetro, saune che funzionano e saune che no. Com’è davvero dormire lontano da una città.',
        metaTitle: 'Baite in Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Baite di legno, igloo di vetro, saune che funzionano e saune che no. Com’è davvero dormire lontano da una città in Lapponia finlandese.',
      },
      food: {
        name: 'Cibo',
        tagline: 'Il sapore della Lapponia d’inverno.',
        description:
          'Zuppa di salmone, pane di segale, renna in tre modi e il caffè che bevi alle 2 di notte perché il sole ha dimenticato di tramontare.',
        metaTitle: 'Il cibo in Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Zuppa di salmone, pane di segale, renna in tre modi e il caffè delle 2 di notte perché il sole ha dimenticato di tramontare. Mangiare in Lapponia finlandese.',
      },
      seasons: {
        name: 'Stagioni',
        tagline: 'Otto, non quattro.',
        description:
          'Notte polare a dicembre. Sole di mezzanotte a giugno. Ruska a settembre. Otto stagioni distinte, non quattro. Nessuna è una trovata.',
        metaTitle: 'Le otto stagioni della Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Notte polare a dicembre, sole di mezzanotte a giugno, ruska a settembre. La Lapponia finlandese ha otto stagioni distinte, non quattro.',
      },
      people: {
        name: 'Persone',
        tagline: 'Chi si incontra quassù.',
        description:
          'Allevatori di renne, pattugliatori di piste, maestri di sauna e sconosciuti nelle hall degli hotel. La Lapponia è silenziosa, ma mai vuota.',
        metaTitle: 'Le persone della Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Allevatori di renne, pattugliatori di piste, maestri di sauna e sconosciuti nelle hall degli hotel. La Lapponia è silenziosa, ma mai vuota.',
      },
      gear: {
        name: 'Attrezzatura',
        tagline: 'Cosa sopravvive a −25 °C.',
        description:
          'Scarponi, guanti, strati, batterie, scelte di fotocamera. Cosa funziona davvero a −25 °C e cosa ho buttato via.',
        metaTitle: 'Attrezzatura che funziona in Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Scarponi, guanti, strati, batterie e scelte di fotocamera per la Lapponia finlandese. Cosa funziona davvero a −25 °C e cosa ho buttato via.',
      },
      stories: {
        name: 'Racconti',
        tagline: 'La strada più lunga.',
        description:
          'Letture più lunghe. Singoli viaggi, singole notti, singoli strani pomeriggi. Quando un post chiede più di 800 parole.',
        metaTitle: 'Racconti lunghi dalla Lapponia finlandese · Lapland.blog',
        metaDescription:
          'Letture lunghe dalla Lapponia finlandese: singoli viaggi, singole notti, strani pomeriggi. Per quando un post chiede più di 800 parole.',
      },
    },
  },
  post: {
    allStories: 'Tutti i racconti',
    by: 'Di',
    minRead: 'min di lettura',
    loadingStory: 'Caricamento del racconto…',
    readNextEyebrow: 'Da leggere dopo',
    readNextH2: 'Altro dal diario',
    tagged: 'Taggato',
    exploreMore: 'Esplori altro dal network LaplandVibes',
    editorialLabel: 'Una voce del Field Journal',
    editorialNote: "Una delle poche voci di esempio scritte da The Field Journal, la voce editoriale di Lapland.blog, per mostrare come si legge un diario di viaggio onesto. Luoghi e temperature reali; le tue voci le scrivi tu.",
  },
  signIn: {
    pageTitle: 'Pianifichi il Suo viaggio in Lapponia | Lapland.blog',
    pageDescription:
      'Una pagina viaggio gratuita, consigli personalizzati e le migliori offerte per il Suo soggiorno in Lapponia. Ci dica quando viene e La aiutiamo.',
    back: 'Indietro',
    eyebrow: 'La Sua pagina viaggio gratuita',
    h1Pre: 'Pianifichi il',
    h1Italic: 'Suo viaggio in Lapponia.',
    lead:
      'Ottenga la Sua pagina su lapland.blog/ilsuonome. Scriva la storia del viaggio, condivida le foto e riceva consigli e offerte personalizzati. Ci dica quando viene e La aiuteremo in ogni passo.',
    benefit1Title: 'Segni l’itinerario sulla mappa della Lapponia',
    benefit1Body: 'Baita, ristorante, punto aurora: segni i luoghi prima di partire.',
    benefit2Title: 'Scriva le voci dal telefono',
    benefit2Body: 'Dalla baita, dall’auto, dalla sauna. Foto, meteo, storie.',
    benefit3Title: 'Condivida su Instagram con un tocco',
    benefit3Body: 'Ogni voce viene esportata come storia verticale che gli amici aprono davvero.',
    footnote: 'Gratuito per i diari di viaggio · Senza carta · Realizzato in Finlandia',
    sentTitle: 'Controlli la Sua casella di posta',
    sentBody:
      'Abbiamo inviato un link magico a {email}. Lo clicchi e il Suo blog di viaggio è online. Il link scade tra un’ora.',
    useDifferent: 'Usa un altro indirizzo e-mail',
    reserveEyebrow: 'Prenoti la Sua pagina',
    formH2: 'Pianifichi il Suo viaggio in Lapponia',
    formLead: 'Creiamo la Sua pagina viaggio e Le inviamo consigli personalizzati in base alla data del soggiorno.',
    emailLabel: 'La Sua e-mail',
    emailPlaceholder: 'tu@example.com',
    travelLabel: 'Quando viene in Lapponia?',
    monthLabel: 'Mese…',
    yearLabel: 'Anno…',
    noDates: 'Sto ancora sognando, niente date',
    enterEmail: 'Inserisca la Sua e-mail per iniziare.',
    sending: 'Invio del link magico…',
    submitCta: 'Prenota la mia pagina viaggio',
    months: [
      'gennaio','febbraio','marzo','aprile','maggio','giugno',
      'luglio','agosto','settembre','ottobre','novembre','dicembre',
    ],
  },
  unsubscribe: {
    pageTitle: 'Disiscrizione | Lapland.blog',
    pageDescription: 'Si disiscriva dalla newsletter di Lapland.blog. Un clic, nessun rancore.',
    eyebrow: 'Newsletter',
    h1: 'Disiscrizione',
    successTitle: 'La disiscrizione è avvenuta.',
    successBody:
      'Ci dispiace vederLa andare via. Non riceverà più e-mail da Lapland.blog. Se cambia idea, il modulo di iscrizione è in ogni pagina.',
    backHome: '← Torna alla home',
    lead: 'Inserisca l’e-mail con cui si è iscritto/a. Un clic e ha finito. Niente loop «è sicuro?», niente sondaggi.',
    emailPlaceholder: 'tua@email.com',
    processing: 'Elaborazione…',
    submit: 'Disiscriviti',
  },
  notFound: {
    pageTitle: 'Pagina non trovata | Lapland.blog',
    pageDescription: 'Questa pagina non esiste. Potrebbe essere stata spostata, rinominata o persa nella neve.',
    eyebrow: 'Non trovata · 404',
    h1: 'Persi nella neve.',
    body: 'Questa pagina non esiste, o non esiste ancora. In ogni caso, il resto del blog è da questa parte.',
    backHome: 'Torna alla home',
    allStories: 'Tutti i racconti →',
  },
  chrome: {
    readTheStory: 'Leggi la storia',
    shareThisStory: 'Condividi questa storia',
    inThisStory: 'In questa storia',
    fieldJournalEntry: 'Voce del diario di campo',
    liveTripBlog: 'Blog di viaggio dal vivo',
    yoursCouldBeNext: 'Il tuo potrebbe essere il prossimo in questo carosello.',
    featuredBadge: 'In evidenza',
    minRead: 'min di lettura',
  },
  footer: {
    ...en.footer,
    networkBadge: 'Network Lapponia finlandese',
    tagline: 'Il blog della Lapponia finlandese: diari di viaggio onesti, cultura sami, aurora boreale e la vita artica del quotidiano.',
    travelGuide: 'Guida di viaggio della Lapponia',
    aboutEyebrow: 'Su Lapland Blog',
    aboutBody: "Un vero blog della Lapponia: diari di viaggio, cultura sami, aurora boreale e vita artica quotidiana, scritti da autori locali.",
    aboutBadge: 'Gestito in modo indipendente · fonti citate',
    spottedError: { title: 'Ha visto un errore?', body: 'Qualcosa da correggere? Ce lo segnali, interveniamo subito.', cta: 'Segnala un errore →' },
    partner: { title: 'Collabori con noi', body: 'Pubblicità o collaborazioni su 27 siti dedicati alla Lapponia.', cta: 'Contatti →' },
    press: { title: 'Stampa e media', body: 'Collaborazioni editoriali e cartelle stampa.', cta: 'Richieste stampa →' },
    copyright: '© {{year}} #LaplandVibes · Parte del network #LaplandVibes',
    websiteBy: 'Sito realizzato da Yrityspaketit.fi',
    privacy: 'Privacy policy',
    cookiePolicy: 'Cookie policy',
    terms: "Condizioni d'uso",
    contact: 'Contatti',
    groups: { stay: 'Dormire', eatDrink: 'Mangiare e bere', do: 'Da fare', explore: 'Esplorare', essentials: 'Essenziali' },
  },
  newsletter: {
    ...en.newsletter,
    eyebrow: 'La newsletter #LaplandVibes',
    h2: 'Notizie dalla Lapponia direttamente nella Sua casella',
    lead: 'Una breve e-mail quando c\'è davvero qualcosa da raccontare: nuovi diari di viaggio, consigli sulla sauna, allerte aurora boreale e le storie della Lapponia.',
    placeholder: 'tua@email.com',
    subscribing: 'Iscrizione…',
    subscribe: 'Iscriviti',
    successTitle: 'È a bordo.',
    successBody: 'Controlli la Sua casella di posta, l\'e-mail di benvenuto è in arrivo.',
    alreadyTitle: 'Già iscritto/a',
    alreadyBody: 'È già nella lista, le buone storie continueranno ad arrivare.',
    agreeText: 'Iscrivendosi accetta la nostra',
    privacyLink: 'privacy policy',
    unsubscribeNote: 'Si disiscriva quando vuole. Il Suo indirizzo non viene condiviso.',
  },
  cookieBanner: {
    headline: 'Cookie',
    body: 'Usiamo i cookie per analizzare il traffico. Per i dettagli consulti la nostra cookie policy.',
    accept: 'Accetta',
    decline: 'Rifiuta',
  },
};

export default it
