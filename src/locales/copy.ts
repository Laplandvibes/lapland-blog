import type { Lang } from '../i18n/useLang';

type SectionCopy = {
  nav: {
    startHere: string;
    topReads: string;
    destinations: string;
    tripDiaries: string;
    about: string;
    startYourBlog: string;
    signIn: string;
    subscribe: string;
    myTripBlog: string;
    adminDashboard: string;
    signOut: string;
    signedInAs: string;
  };
  footer: {
    networkBadge: string;
    tagline: string;
    travelGuide: string;
    aboutEyebrow: string;
    aboutBody: string;
    aboutBadge: string;
    spottedError: { title: string; body: string; cta: string };
    partner: { title: string; body: string; cta: string };
    press: { title: string; body: string; cta: string };
    copyright: string;
    websiteBy: string;
    privacy: string;
    cookiePolicy: string;
    terms: string;
    contact: string;
    groups: { stay: string; eatDrink: string; do: string; explore: string; essentials: string };
  };
  newsletter: {
    eyebrow: string;
    h2: string;
    lead: string;
    placeholder: string;
    subscribing: string;
    subscribe: string;
    successTitle: string;
    successBody: string;
    alreadyTitle: string;
    alreadyBody: string;
    agreeText: string;
    privacyLink: string;
    unsubscribeNote: string;
  };
  cookieBanner: {
    headline: string;
    body: string;
    accept: string;
    decline: string;
  };
  home: {
    heroEyebrow: string;
    heroLine1: string;
    heroLine2: string;
    heroLead: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroFootnote: string;
    seasonalBadge: string;
    seasonalH2: string;
    seasonalLead: string;
    seasonalCta1: string;
    seasonalCta2: string;
    seasonalCard1Title: string;
    seasonalCard1Body: string;
    seasonalCard2Title: string;
    seasonalCard2Body: string;
    seasonalCard3Title: string;
    seasonalCard3Body: string;
    seasonalCard4Title: string;
    seasonalCard4Body: string;
    seasonalLabels: { light: string; forest: string; water: string; quiet: string };
    howEyebrow: string;
    howH2Pre: string;
    howH2Italic: string;
    howLead: string;
    howStep1Kicker: string;
    howStep1Title: string;
    howStep1Body: string;
    howStep2Kicker: string;
    howStep2Title: string;
    howStep2Body: string;
    howStep3Kicker: string;
    howStep3Title: string;
    howStep3Body: string;
    howCta: string;
    howFootnote: string;
    liveEyebrow: string;
    liveH2Pre: string;
    liveH2Italic: string;
    liveH2Tail: string;
    liveLead: string;
    liveBrowseAll: string;
    liveCta: string;
    liveFootnote: string;
    featuredEyebrow: string;
    featuredEvery: string;
    featuredLead: string;
    featuredLoading: string;
    featuredNone: string;
    featuredReadEntry: string;
    pillarsEyebrow: string;
    pillarsH2Pre: string;
    pillarsH2Italic: string;
    pillarsLead: string;
    pillar1Kicker: string;
    pillar1Title: string;
    pillar1Body: string;
    pillar2Kicker: string;
    pillar2Title: string;
    pillar2Body: string;
    pillar3Kicker: string;
    pillar3Title: string;
    pillar3Body: string;
    latestEyebrow: string;
    latestH2: string;
    latestEvery: string;
    latestLoading: string;
    asideEyebrow: string;
    asideH2: string;
    asideP1: string;
    asideP2: string;
    asideCta1: string;
    asideCta2: string;
    asidePill: string;
    travelJournalBadge: string;
    faqHeading: string;
    faq: { q: string; a: string }[];
  };
  startHere: {
    eyebrow: string;
    h1: string;
    lead: string;
    path1Kicker: string;
    path1Title: string;
    path1Body: string;
    path1Cta: string;
    path2Kicker: string;
    path2Title: string;
    path2Body: string;
    path2Cta: string;
    path3Kicker: string;
    path3Title: string;
    path3Body: string;
    path3Cta: string;
    planEyebrow: string;
    planH2: string;
    planLead: string;
    planStay: { kicker: string; title: string; body: string };
    planTransport: { kicker: string; title: string; body: string };
    planDo: { kicker: string; title: string; body: string };
    planEat: { kicker: string; title: string; body: string };
    planAllSites: string;
    onlyEyebrow: string;
    onlyH2: string;
    onlyLead: string;
    thenEyebrow: string;
    thenH2: string;
    everyEntry: string;
  };
  about: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1: string;
    lead: string;
    intro: string;
    howHeading: string;
    howStepPin: string;
    howStepWrite: string;
    howStepShare: string;
    howBody: string;
    freeHeading: string;
    freeBody: string;
    notHeading: string;
    notBody: string;
    seedHeading: string;
    seedBody: string;
    networkHeading: string;
    networkBody: string;
    contactHeading: string;
    contactBody: string;
    closing: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryLink: string;
  };
  destinations: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1Pre: string;
    h1Italic: string;
    lead: string;
    beTheFirst: string;
    entrySingular: string;
    entryPlural: string;
    readEntries: string;
    beFirstWrite: string;
    findStayPrefix: string;
    dontSeeEyebrow: string;
    plantH2: string;
    plantLead: string;
    plantCta: string;
  };
  topReads: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1: string;
    lead: string;
    onlyEyebrow: string;
    onlyH2: string;
    onlyLead: string;
    firstTimersEyebrow: string;
    firstTimersTitle: string;
    firstTimersSubtitle: string;
    auroraEyebrow: string;
    auroraTitle: string;
    auroraSubtitle: string;
    cabinsEyebrow: string;
    cabinsTitle: string;
    cabinsSubtitle: string;
    foodEyebrow: string;
    foodTitle: string;
    foodSubtitle: string;
    seasonalEyebrow: string;
    seasonalTitle: string;
    seasonalSubtitle: string;
    ctaEyebrow: string;
    ctaH2: string;
    ctaLead: string;
    ctaButton: string;
  };
  archive: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1: string;
    lead: string;
    all: string;
    filterAria: string;
    searchSr: string;
    searchPlaceholder: string;
    loading: string;
    emptyTitle: string;
    emptyBody: string;
  };
  category: {
    allStoriesBack: string;
    categoryPrefix: string;
    storySingular: string;
    storyPlural: string;
    loading: string;
    emptyTitle: string;
    emptyBody: string;
    emptyLink: string;
    keepExploringEyebrow: string;
    otherThemes: string;
  };
  post: {
    allStories: string;
    by: string;
    minRead: string;
    loadingStory: string;
    readNextEyebrow: string;
    readNextH2: string;
    tagged: string;
    exploreMore: string;
    editorialLabel: string;
    editorialNote: string;
  };
  signIn: {
    pageTitle: string;
    pageDescription: string;
    back: string;
    eyebrow: string;
    h1Pre: string;
    h1Italic: string;
    lead: string;
    benefit1Title: string;
    benefit1Body: string;
    benefit2Title: string;
    benefit2Body: string;
    benefit3Title: string;
    benefit3Body: string;
    footnote: string;
    sentTitle: string;
    sentBody: string;
    useDifferent: string;
    reserveEyebrow: string;
    formH2: string;
    formLead: string;
    emailLabel: string;
    emailPlaceholder: string;
    travelLabel: string;
    monthLabel: string;
    yearLabel: string;
    noDates: string;
    enterEmail: string;
    sending: string;
    submitCta: string;
    months: string[];
  };
  unsubscribe: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1: string;
    successTitle: string;
    successBody: string;
    backHome: string;
    lead: string;
    emailPlaceholder: string;
    processing: string;
    submit: string;
  };
  notFound: {
    pageTitle: string;
    pageDescription: string;
    eyebrow: string;
    h1: string;
    body: string;
    backHome: string;
    allStories: string;
  };
  chrome: {
    readTheStory: string;
    shareThisStory: string;
    inThisStory: string;
    fieldJournalEntry: string;
    liveTripBlog: string;
    yoursCouldBeNext: string;
    featuredBadge: string;
    minRead: string;
  };
};

const en: SectionCopy = {
  nav: {
    startHere: 'Start here',
    topReads: 'Top reads',
    destinations: 'Destinations',
    tripDiaries: 'Trip diaries',
    about: 'About',
    startYourBlog: 'Start your blog',
    signIn: 'Sign in',
    subscribe: 'Subscribe',
    myTripBlog: 'My trip blog',
    adminDashboard: 'Admin dashboard',
    signOut: 'Sign out',
    signedInAs: 'Signed in as',
  },
  footer: {
    networkBadge: 'Finnish Lapland Network',
    tagline: 'The digital home for Finnish Lapland travel.',
    travelGuide: 'Lapland Travel Guide',
    aboutEyebrow: 'About LaplandVibes',
    aboutBody:
      'Editorial guide to Finnish Lapland, from the revontulet to the midnight sun. Curated routes, honest write-ups, and the practical detail you need to plan an Arctic trip.',
    aboutBadge: 'Independently maintained · sources cited',
    spottedError: {
      title: 'Spotted an Error?',
      body: 'See something that needs fixing? Tell us. We will correct it.',
      cta: 'Report an Error →',
    },
    partner: {
      title: 'Partner With Us',
      body: 'Advertise or collaborate across 27 Lapland sites.',
      cta: 'Get in Touch →',
    },
    press: {
      title: 'Press & Media',
      body: 'Editorial partnerships and press kits.',
      cta: 'Press Enquiries →',
    },
    copyright: 'Part of the #LaplandVibes Network',
    websiteBy: 'Website by Yrityspaketit.fi',
    privacy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    terms: 'Terms of Use',
    contact: 'Contact',
    groups: { stay: 'Stay', eatDrink: 'Eat & Drink', do: 'Do', explore: 'Explore', essentials: 'Essentials' },
  },
  newsletter: {
    eyebrow: 'The #LaplandVibes newsletter',
    h2: 'Lapland in your inbox, straight from Finland.',
    lead: 'Aurora alerts when the Kp spikes, the cabin and tour booking windows before they sell out, and seasonal travel notes written from Finland. No spam, no filler. Only when something is worth flagging.',
    placeholder: 'your@email.com',
    subscribing: 'Subscribing…',
    subscribe: 'Subscribe',
    successTitle: "You're in.",
    successBody: 'Check your inbox. A welcome email is on its way, and the next aurora alert lands when the forecast lights up.',
    alreadyTitle: "You're already on the list.",
    alreadyBody: "Looks like you're already subscribed. We'll keep the Lapland alerts coming.",
    agreeText: 'By subscribing you agree to our',
    privacyLink: 'Privacy Policy',
    unsubscribeNote: 'Unsubscribe anytime.',
  },
  cookieBanner: {
    headline: 'A short note on cookies',
    body: 'We use a few essential cookies so the site works, plus optional analytics so we know which entries get read. Your choice.',
    accept: 'Accept',
    decline: 'Decline',
  },
  home: {
    heroEyebrow: 'Travel journal · Map · Share',
    heroLine1: 'Going to Lapland?',
    heroLine2: 'Start a blog of your trip.',
    heroLead:
      'Pin where you saw the aurora. Photograph the cabin. Write what the temperature did. Build a beautiful blog of your trip, one your friends can actually follow.',
    heroPrimaryCta: 'Start your trip blog',
    heroSecondaryCta: 'See how it works',
    heroFootnote: 'Free · Made in Finland · Share to Instagram · No ads',
    seasonalBadge: 'In season now · Midnight sun · Jun 6 → Jul 7',
    seasonalH2: 'A free travel blog for your Lapland trip, written as you go.',
    seasonalLead:
      'Lapland.blog turns your trip into a simple, beautiful blog: pin the places, add photos, write what happened, then share the link with friends. Right now that means summer. Thirty-two nights when the sun never sets, the forest goes amber, the lakes mirror the sky. Start your journal while you are still in it.',
    seasonalCta1: 'Start your trip blog',
    seasonalCta2: 'Read summer entries',
    seasonalCard1Title: '24 h golden hour',
    seasonalCard1Body: 'The sun grazes the horizon. Photographers call it the longest blue hour on earth.',
    seasonalCard2Title: 'Cloudberry season',
    seasonalCard2Body: 'Late July: the bog turns gold. Locals call it the second harvest.',
    seasonalCard3Title: 'Sauna, then a swim',
    seasonalCard3Body: '14°C lake at midnight, 90°C sauna five steps away. Repeat.',
    seasonalCard4Title: 'No-one else',
    seasonalCard4Body: 'The cabins that book out in winter sit empty in July. Same forest, no queue.',
    seasonalLabels: { light: '01 · Light', forest: '02 · Forest', water: '03 · Water', quiet: '04 · Quiet' },
    howEyebrow: 'How it works',
    howH2Pre: 'Three steps. One trip.',
    howH2Italic: 'A blog worth keeping.',
    howLead:
      'Lapland.blog is a free travel-journal platform built for visitors to Finnish Lapland. Your trip becomes a blog you will actually want to share.',
    howStep1Kicker: 'Step 01 · Plan',
    howStep1Title: 'Pin the places.',
    howStep1Body:
      'Drop pins on the Lapland map for the cabin you booked, the restaurant you want to try, and the dark-sky spot for the aurora. Build your route before you fly.',
    howStep2Kicker: 'Step 02 · Journal',
    howStep2Title: 'Write as you go.',
    howStep2Body:
      'From your phone, in the cabin, in the car, in the sauna. Add photos, the temperature, what the soup tasted like. Each entry pins itself to the day and the place.',
    howStep3Kicker: 'Step 03 · Share',
    howStep3Title: 'Your trip, told well.',
    howStep3Body:
      'Your entries become a public blog at lapland.blog/your-name. Friends can follow it. Each post exports to an Instagram story so the trip lives twice.',
    howCta: 'Start your trip blog',
    howFootnote: 'Free for travel journals · No card required · Sign in with Google',
    liveEyebrow: 'Live trip blogs',
    liveH2Pre: 'Real trips.',
    liveH2Italic: 'Real travellers.',
    liveH2Tail: 'Yours is next.',
    liveLead:
      'Skiing the black runs at Levi. Hunting aurora at Inari. 60 km on a husky sled in Saariselkä. Every blog you see here was written by a visitor on a single trip, and built in under five minutes.',
    liveBrowseAll: 'Browse all blogs',
    liveCta: 'Start my trip blog',
    liveFootnote: 'Free · No card · 2 minutes to your first entry',
    featuredEyebrow: "Founder's example journal",
    featuredEvery: 'Every entry →',
    featuredLead:
      'This is what your own trip blog could look like. The five seed entries below were written by The Field Journal, the editorial voice of Lapland.blog, across one Lapland winter. Real temperatures, real cabins, real soup. Read one and picture your own.',
    featuredLoading: 'Loading example…',
    featuredNone: 'No example entries yet.',
    featuredReadEntry: 'Read this entry',
    pillarsEyebrow: 'What to journal',
    pillarsH2Pre: 'The Lapland trip,',
    pillarsH2Italic: 'in three threads.',
    pillarsLead:
      'Browse what other travellers have logged, then pick the threads you will write about on your own trip. Aurora, cabins, food, the cold, the people, the silences in between.',
    pillar1Kicker: 'I · The cold',
    pillar1Title: 'What the cold actually does',
    pillar1Body:
      'Aurora nights, the polar dark, the eight seasons most lists forget. The weather is the main character here, not a backdrop. Field notes on what minus twenty-three feels like at 03:47, and what it does to a phone battery, and to a person.',
    pillar2Kicker: 'II · The shelter',
    pillar2Title: 'Where you sleep, where you eat',
    pillar2Body:
      'Wooden cabins, glass igloos, saunas that work and saunas that do not. The forty-two-euro bowl of salmon soup that turned out to be worth it. The rye bread that survives a backpack, and the coffee you drink at 2 AM because the sun forgot to set.',
    pillar3Kicker: 'III · The other people',
    pillar3Title: 'Who else lives up here',
    pillar3Body:
      'Reindeer herders, ski patrollers, sauna masters, the man at the petrol station outside Sodankylä who spoke four languages. Lapland is quiet, but it is never empty. Long-form pieces about the people you actually meet.',
    latestEyebrow: 'Example entries',
    latestH2: 'See what a trip blog looks like.',
    latestEvery: 'Every entry',
    latestLoading: 'Loading stories…',
    asideEyebrow: 'Why this exists',
    asideH2: "Lapland is not a brochure. Your trip shouldn't be either.",
    asideP1:
      'Every year, thousands of visitors arrive in Lapland, see something extraordinary, and lose it to a phone roll they never look at again. The aurora over the cabin. The fingertip-numb walk back from the sauna. The bowl of salmon soup that was somehow worth €42. Gone in a week.',
    asideP2:
      'Lapland.blog is a small free tool to fix that. Pin where you were. Write what you saw. Photograph the soup. By the time you fly home, you have a real blog of your trip: one your friends can actually follow, one you will still want to read in five years. No stock photos. No "magical winter wonderland." Just your own honest version of the place.',
    asideCta1: 'Start your own',
    asideCta2: 'About lapland.blog',
    asidePill: 'Your trip · Your blog',
    travelJournalBadge: 'Free for travel journals',
    faqHeading: 'Common Questions About Lapland.blog',
    faq: [
      {
        q: 'How do I start a travel blog on lapland.blog?',
        a: 'Sign in with your Google account, give your blog a name, and write your first entry. Each entry can hold text, photos, the date, and a map pin for where you were. Your blog lives at lapland.blog/your-name and is ready to share the moment you publish. There is nothing to install and no setup beyond signing in.',
      },
      {
        q: 'Is lapland.blog free to use?',
        a: 'Yes. Starting a blog, writing entries, adding photos, pinning places on the map, and sharing your blog are all free. There is no card required to sign up and no ads on your blog.',
      },
      {
        q: 'Can I share my Lapland blog on Instagram and Facebook?',
        a: 'Yes. Every blog has a public link you can post anywhere, and each entry can be exported as an Instagram-story-sized image so you can share a single day in a tap. Friends and family can open your blog without an account of their own.',
      },
      {
        q: 'Do I have to be in Lapland to write a blog here?',
        a: 'No. We built lapland.blog for travelers heading to Finnish Lapland, so the map and prompts are tuned for trips up north, but anyone can keep a blog here, whether you are planning a trip, writing during one, or filling it in after you get home. You can start before you fly and add entries day by day.',
      },
      {
        q: 'What should I write about in my Lapland travel diary?',
        a: 'Whatever you do not want to forget. Where you stayed, what the aurora looked like, the temperature on the coldest morning, the meal that surprised you, the husky ride, the silence of the forest. Short entries with a photo and a place pin work well. A few lines a day adds up to a blog worth re-reading.',
      },
    ],
  },
  startHere: {
    eyebrow: 'Welcome',
    h1: 'Hi. Three ways in.',
    lead:
      'Lapland.blog is a free, slow, photo-led travel-journal site for people who actually go to Finnish Lapland. Whether you are planning a trip, in the middle of one, or back home wishing you had written it down, pick your path.',
    path1Kicker: '01 · Planning',
    path1Title: "I'm planning a trip to Lapland.",
    path1Body:
      'Where to stay, how to get there, what to do, where to eat: the practical side. Jump into the LaplandVibes sister sites that handle the bookings.',
    path1Cta: 'Plan your trip',
    path2Kicker: '02 · Reading',
    path2Title: 'I want to read what others wrote.',
    path2Body:
      'Curated seed entries from inside Finland: cabin packing, the salmon-soup night, the aurora over Kemi. Real temperatures, real time of day, no brochure voice.',
    path2Cta: 'Top reads',
    path3Kicker: '03 · Writing',
    path3Title: "I'm here. I want a blog of my trip.",
    path3Body:
      'Sign in with email or Google. Get a corner of lapland.blog. Pin places, write entries, share to friends. Free, no catches, no premium tier.',
    path3Cta: 'Start your blog',
    planEyebrow: 'Plan your trip',
    planH2: 'The practical side, on the sister sites.',
    planLead:
      'Lapland.blog is the journal. The booking happens on the LaplandVibes spokes, each one focused on one thing it does well.',
    planStay: {
      kicker: 'Stay',
      title: 'Cabins, igloos, hotels',
      body: 'Compare hundreds of Lapland stays: glass igloos, log cabins, ski resorts.',
    },
    planTransport: {
      kicker: 'Get there',
      title: 'Flights, trains, buses',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: flights, night trains, the practical routes.',
    },
    planDo: {
      kicker: 'Do',
      title: 'Husky, snowmobile, sauna',
      body: 'Bookable activities from the actual operators, with reviews, not a press release.',
    },
    planEat: {
      kicker: 'Eat',
      title: 'Food + drink',
      body: 'Where to actually eat: the salmon soup, the rye, the bars that have seen better decades.',
    },
    planAllSites: 'Or browse all 27 sites at laplandvibes.com',
    onlyEyebrow: 'If you only read one',
    onlyH2: 'Read this one.',
    onlyLead: 'The newest field-journal entry. Real temperature, real time of day, no brochure voice.',
    thenEyebrow: 'Then these',
    thenH2: 'More from the field.',
    everyEntry: 'Every entry',
  },
  about: {
    pageTitle: 'About | Lapland.blog',
    pageDescription:
      'Lapland.blog is a free travel-journal platform for visitors to Finnish Lapland. Pin places, write entries, share to friends. Your trip, told well.',
    eyebrow: 'About the platform',
    h1: 'A travel journal worth keeping.',
    lead:
      'Lapland.blog is a free travel-journal platform for visitors to Finnish Lapland. Pin where you saw the aurora. Photograph the cabin. Write what the temperature did. By the time you fly home you have a blog of your trip: one your friends can actually follow, and one you will still want to read in five years.',
    intro:
      'Most Lapland blogs read like a brochure. Most travel-journal apps either get abandoned in a phone roll or get shared as a single Instagram post that disappears in a day. Lapland.blog is the in-between thing: a real, slow, photo-led blog of your trip, hosted under a name that already gets traffic, kept for as long as you want it kept.',
    howHeading: 'How it works',
    howStepPin: 'Pin the cabin, the restaurant, the dark-sky spot. Build your route before you fly.',
    howStepWrite: 'Write as you go, from the cabin, the car, the sauna. Add photos, the temperature, what the soup tasted like.',
    howStepShare: 'Your entries become a public blog at lapland.blog/your-name. Friends can follow it; each post exports to an Instagram story.',
    howBody:
      'Sign in with your email or Google. Get a corner of lapland.blog at lapland.blog/me. Each entry takes a hero image, a place pin, and the words you want to say. Save drafts, publish when ready, share the link to friends. Every published entry is indexed and searchable, so your trip becomes a small piece of the bigger Lapland archive.',
    freeHeading: "What's free",
    freeBody:
      'Writing entries. Hosting your travel blog under lapland.blog/me/yourname. Photos. The newsletter. There is no paywall and no premium tier on the writer side.',
    notHeading: "What you won't find",
    notBody:
      'Sponsored posts inside reader entries. Affiliate shopping lists stuffed into your blog. The words "unforgettable", "bucket list", "magical" or "winter wonderland" are banned from the editorial drafts, and worth banning from yours too. They are bad for writing and bad for readers.',
    seedHeading: 'The seed entries',
    seedBody:
      'The five entries already on the site are written by The Field Journal, the editorial voice of Lapland.blog. They are there to show what an honest, slow, photo-led trip blog can read like: real temperatures, real times of day, no brochure voice. Read one and picture your own.',
    networkHeading: 'About the network',
    networkBody:
      'Lapland.blog is part of the LaplandVibes ecosystem, a network of Finnish-owned sites about Lapland. The other sites tell you where to go, where to stay, and what to do. This one is where the trip itself gets written down.',
    contactHeading: 'Get in touch',
    contactBody:
      'If you want to say hello, correct a factual error, or send a photograph we can credit, email info@lapland.blog. We read everything and try to answer within a week.',
    closing: 'Written from Finnish Lapland, at the temperature and the hour it actually happened.',
    ctaPrimary: 'Start your own journal →',
    ctaSecondary: 'Or',
    ctaSecondaryLink: 'read the seed entries first',
  },
  destinations: {
    pageTitle: 'Destinations | Lapland.blog',
    pageDescription:
      'The eight main Finnish Lapland destinations: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Read the field-journal entries from each, or be the first to write one.',
    eyebrow: 'Where to go',
    h1Pre: 'Eight places.',
    h1Italic: 'One Lapland.',
    lead:
      'Pick a destination and read the entries from there. Empty ones are the next ones to write, so you can be the first.',
    beTheFirst: 'Be the first',
    entrySingular: 'entry',
    entryPlural: 'entries',
    readEntries: 'Read entries',
    beFirstWrite: 'Be the first to write',
    findStayPrefix: 'Find a stay in',
    dontSeeEyebrow: "Don't see your place?",
    plantH2: 'Plant the flag.',
    plantLead:
      'Going somewhere not on this list? Sodankylä, Posio, Kilpisjärvi, Hetta. Write the first entry from there and we will add it to the map.',
    plantCta: 'Start your blog',
  },
  topReads: {
    pageTitle: 'Top reads | Lapland.blog',
    pageDescription:
      'Where to start on Lapland.blog. Curated lists: best entries for first-timers, best aurora pieces, best food entries, the seasonal ones. Picked by the editor.',
    eyebrow: "Editor's curated lists",
    h1: 'Top reads.',
    lead: 'Where to start. Curated by the editor, not by clicks. As more field-journal entries ship, these lists grow.',
    onlyEyebrow: 'If you only read one',
    onlyH2: "The editor's #1.",
    onlyLead:
      'Aurora over the Bay of Bothnia, minus twenty-three at 3:47 AM, and the photo none of us got. The piece that defines the Lapland.blog voice.',
    firstTimersEyebrow: 'For first-timers',
    firstTimersTitle: 'Best three to read before you go.',
    firstTimersSubtitle:
      'Why people get aurora wrong, what to pack for a cabin, and why the polar dark is fine actually. Read these and you will arrive less surprised.',
    auroraEyebrow: 'Aurora pieces',
    auroraTitle: 'The night-sky entries.',
    auroraSubtitle: 'On chasing it, photographing it, and the nights it shows up anyway.',
    cabinsEyebrow: 'The cabins',
    cabinsTitle: 'Mökki entries.',
    cabinsSubtitle:
      'What it is actually like in a Finnish forest cabin: fire, sauna, silence, the bit nobody mentions about the outhouse at minus thirty.',
    foodEyebrow: 'Food + drink',
    foodTitle: 'The kitchen pieces.',
    foodSubtitle:
      'Forty-two-euro salmon soup, rye bread that survives a backpack, and the coffee you drink at 2 AM because the sun forgot to set.',
    seasonalEyebrow: 'Seasonal',
    seasonalTitle: 'What the cold actually does.',
    seasonalSubtitle:
      'Kaamos, the eight Lapland seasons most lists forget, and the small business of getting through December without the sun.',
    ctaEyebrow: 'Your trip next?',
    ctaH2: 'Be the next entry on this page.',
    ctaLead:
      'The lists above grow when readers write. Sign in, write a few entries, and the editor will feature the ones that earn it.',
    ctaButton: 'Start your blog',
  },
  archive: {
    pageTitle: 'All stories | Lapland.blog',
    pageDescription:
      'Every story on Lapland.blog. Aurora, cabins, food, seasons, people, gear and long-form reads from Finnish Lapland.',
    eyebrow: 'Archive',
    h1: 'Every story.',
    lead:
      'No algorithm, no curation trick. The newest is on top. Use the filter to narrow things down, or search if you already know what you are looking for.',
    all: 'All',
    filterAria: 'Filter by category',
    searchSr: 'Search stories',
    searchPlaceholder: 'Search titles, tags…',
    loading: 'Loading stories…',
    emptyTitle: 'No stories match that.',
    emptyBody: 'Try clearing the filter or searching for a different word.',
  },
  category: {
    allStoriesBack: 'All stories',
    categoryPrefix: 'Category',
    storySingular: 'story',
    storyPlural: 'stories',
    loading: 'Loading stories…',
    emptyTitle: 'Nothing here yet.',
    emptyBody: 'This category is waiting for its first story. Check back soon.',
    emptyLink: 'Browse all stories →',
    keepExploringEyebrow: 'Keep exploring',
    otherThemes: 'Other themes',
  },
  post: {
    allStories: 'All stories',
    by: 'By',
    minRead: 'min read',
    loadingStory: 'Loading story…',
    readNextEyebrow: 'Read next',
    readNextH2: 'More from the journal',
    tagged: 'Tagged',
    exploreMore: 'Explore more from the LaplandVibes network',
    editorialLabel: 'A Field Journal entry',
    editorialNote: 'One of a handful of seed entries written by The Field Journal, the editorial voice of Lapland.blog, to show what an honest trip diary reads like. Real places, real temperatures. Your own entries are written by you.',
  },
  signIn: {
    pageTitle: 'Plan your Lapland trip | Lapland.blog',
    pageDescription:
      'Get a free trip page, personalised tips, and the best deals for your Lapland journey. Tell us when you are visiting and we will help plan every step.',
    back: 'Back',
    eyebrow: 'Your free trip page',
    h1Pre: 'Plan your',
    h1Italic: 'Lapland trip.',
    lead:
      'Get your page at lapland.blog/yourname. Write your trip story, share photos, and get personalised tips and deals for your journey. Tell us when you are coming and we will help plan every step.',
    benefit1Title: 'Pin your route on the Lapland map',
    benefit1Body: 'Cabin, restaurant, aurora spot: drop pins before you fly.',
    benefit2Title: 'Write entries from your phone',
    benefit2Body: 'From the cabin, the car, the sauna. Photos, weather, stories.',
    benefit3Title: 'Share to Instagram in one tap',
    benefit3Body: 'Each entry exports as a vertical story your friends actually open.',
    footnote: 'Free travel journals · No credit card · Made in Finland',
    sentTitle: 'Check your inbox',
    sentBody:
      'We sent a magic link to {email}. Click it and your trip blog is live. The link expires in one hour.',
    useDifferent: 'Use a different email',
    reserveEyebrow: 'Reserve your page',
    formH2: 'Plan your Lapland trip',
    formLead: 'We will create your trip page and send personalised tips based on when you are visiting.',
    emailLabel: 'Your email',
    emailPlaceholder: 'you@example.com',
    travelLabel: 'When are you visiting Lapland?',
    monthLabel: 'Month…',
    yearLabel: 'Year…',
    noDates: "I'm still dreaming, no dates yet",
    enterEmail: 'Enter your email to get started.',
    sending: 'Sending magic link…',
    submitCta: 'Reserve my trip page',
    months: [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December',
    ],
  },
  unsubscribe: {
    pageTitle: 'Unsubscribe | Lapland.blog',
    pageDescription: 'Unsubscribe from the Lapland.blog newsletter. One click, no hard feelings.',
    eyebrow: 'Newsletter',
    h1: 'Unsubscribe',
    successTitle: "You've been unsubscribed.",
    successBody:
      "We're sorry to see you go. You won't receive any more emails from Lapland.blog. If you change your mind, the signup is on every page.",
    backHome: '← Back to home',
    lead: 'Enter the email you subscribed with. One click and you are out. No "are you sure?" loops, no survey.',
    emailPlaceholder: 'your@email.com',
    processing: 'Processing…',
    submit: 'Unsubscribe',
  },
  notFound: {
    pageTitle: 'Not found | Lapland.blog',
    pageDescription: "This page doesn't exist. It might have been moved, renamed, or lost in the snow.",
    eyebrow: 'Not found · 404',
    h1: 'Lost in the snow.',
    body: 'This page does not exist, or it does not exist yet. Either way, the rest of the blog is this way.',
    backHome: 'Back to home',
    allStories: 'All stories →',
  },
  chrome: {
    readTheStory: 'Read the story',
    shareThisStory: 'Share this story',
    inThisStory: 'In this story',
    fieldJournalEntry: 'Field journal entry',
    liveTripBlog: 'Live trip blog',
    yoursCouldBeNext: 'Yours could be next on this carousel.',
    featuredBadge: 'Featured',
    minRead: 'min read',
  },
};

// JA block. Full native translation. Phase 3C (2026-05-18).
const ja: SectionCopy = {
  nav: {
    startHere: 'はじめに',
    topReads: 'おすすめ記事',
    destinations: '目的地',
    tripDiaries: '旅行記',
    about: '当サイトについて',
    startYourBlog: 'ブログを始める',
    signIn: 'サインイン',
    subscribe: '購読する',
    myTripBlog: 'マイトリップブログ',
    adminDashboard: '管理画面',
    signOut: 'サインアウト',
    signedInAs: 'サインイン中：',
  },
  footer: {
    networkBadge: 'フィンランド・ラップランドネットワーク',
    tagline: 'フィンランド・ラップランド旅行のオンライン拠点。',
    travelGuide: 'ラップランド旅行ガイド',
    aboutEyebrow: '#LaplandVibesについて',
    aboutBody:
      'フィンランド・ラップランドの編集ガイド。オーロラから白夜まで。厳選されたルート、率直な記事、北極圏の旅行計画に必要な実用情報。',
    aboutBadge: '独立運営・出典明記',
    spottedError: {
      title: '誤りを見つけたら',
      body: '修正が必要なものを見つけたら教えてください。すぐに対応します。',
      cta: 'エラーを報告 →',
    },
    partner: {
      title: 'パートナーシップ',
      body: '21以上のラップランド関連サイトでの広告・コラボレーション。',
      cta: 'お問い合わせ →',
    },
    press: {
      title: 'プレス・メディア',
      body: '編集パートナーシップとプレスキット。',
      cta: 'プレス問い合わせ →',
    },
    copyright: '#LaplandVibesネットワークの一部',
    websiteBy: 'サイト制作：Yrityspaketit.fi',
    privacy: 'プライバシーポリシー',
    cookiePolicy: 'クッキーポリシー',
    terms: '利用規約',
    contact: 'お問い合わせ',
    groups: { stay: '泊まる', eatDrink: '食べる・飲む', do: '体験する', explore: '見る', essentials: '基本情報' },
  },
  newsletter: {
    eyebrow: '#LaplandVibes ニュースレター',
    h2: 'ラップランドを、フィンランドから直接お届け。',
    lead: 'Kp指数が上がったときのオーロラ予報、売り切れる前のコテージ・ツアー予約のタイミング、フィンランド現地から綴る季節ごとの旅メモ。広告も水増しもなし。お届けするのは本当に価値のあるときだけです。',
    placeholder: 'your@email.com',
    subscribing: '登録中…',
    subscribe: '購読する',
    successTitle: 'ご登録ありがとうございます。',
    successBody: '受信箱をご確認ください。ウェルカムメールをお送りしました。次のオーロラ予報は、空が冴えわたったときにお届けします。',
    alreadyTitle: 'すでに登録済みです。',
    alreadyBody: 'すでにご登録いただいているようです。ラップランドの最新情報を引き続きお届けします。',
    agreeText: '購読することで以下に同意したものとみなされます：',
    privacyLink: 'プライバシーポリシー',
    unsubscribeNote: 'いつでも解除可能です。',
  },
  cookieBanner: {
    headline: 'クッキーについて',
    body: 'サイトの動作に必要な最小限のクッキーと、どの記事が読まれているかを把握するための任意の分析クッキーを使用しています。選択はご自由に。',
    accept: '同意する',
    decline: '拒否する',
  },
  home: {
    heroEyebrow: '旅行記 · マップ · シェア',
    heroLine1: 'ラップランドへ行きますか？',
    heroLine2: '旅のブログを始めましょう。',
    heroLead:
      'オーロラを見た場所にピンを立てる。コテージを撮影する。気温を書き留める。友人が実際にフォローできる、美しい旅行ブログを作りましょう。',
    heroPrimaryCta: '旅行ブログを始める',
    heroSecondaryCta: '使い方を見る',
    heroFootnote: '無料 · フィンランド製 · Instagramにシェア · 広告なし',
    seasonalBadge: 'いまが季節 · 白夜 · 6月6日 → 7月7日',
    seasonalH2: 'ラップランド旅行の無料ブログ。旅しながら書けます。',
    seasonalLead:
      'Lapland.blog なら、旅がそのままシンプルで美しいブログに。場所にピンを立て、写真を加え、起きたことを書き、リンクを友達に共有するだけ。いまの季節は夏。太陽が沈まない32夜、森は琥珀色に染まり、湖は空を映します。旅の最中から、ジャーナルを始めましょう。',
    seasonalCta1: '旅行ブログを始める',
    seasonalCta2: '夏の記事を読む',
    seasonalCard1Title: '24時間のゴールデンアワー',
    seasonalCard1Body: '太陽が地平線をかすめる。写真家はこれを、地球上で最も長いブルーアワーと呼びます。',
    seasonalCard2Title: 'クラウドベリーの季節',
    seasonalCard2Body: '7月下旬、湿原が金色に染まる。地元の人はこれを「二度目の収穫」と呼びます。',
    seasonalCard3Title: 'サウナの後に、湖へ',
    seasonalCard3Body: '真夜中の14°Cの湖、五歩先には90°Cのサウナ。繰り返す。',
    seasonalCard4Title: '誰もいない',
    seasonalCard4Body: '冬には満室になるコテージが、7月には空いている。同じ森、列なし。',
    seasonalLabels: { light: '01 · 光', forest: '02 · 森', water: '03 · 水', quiet: '04 · 静寂' },
    howEyebrow: '使い方',
    howH2Pre: '三つのステップ、一つの旅。',
    howH2Italic: '残しておきたいブログ。',
    howLead:
      'Lapland.blogは、フィンランド・ラップランドを訪れる人のための無料の旅行記プラットフォームです。あなたの旅が、実際にシェアしたくなるブログになります。',
    howStep1Kicker: 'ステップ01 · 計画',
    howStep1Title: '場所にピンを立てる。',
    howStep1Body:
      '予約したコテージ、行ってみたいレストラン、オーロラを見る暗い空のスポットに、ラップランドの地図上でピンを立てる。出発前にルートを組み立てましょう。',
    howStep2Kicker: 'ステップ02 · 記録',
    howStep2Title: '旅をしながら書く。',
    howStep2Body:
      'スマートフォンから、コテージで、車内で、サウナで。写真、気温、スープの味を加える。各エントリーは自動的にその日と場所にピン留めされます。',
    howStep3Kicker: 'ステップ03 · シェア',
    howStep3Title: 'よく語られた、あなたの旅。',
    howStep3Body:
      'エントリーはlapland.blog/your-nameの公開ブログになります。友人がフォローでき、各投稿はInstagramのストーリーに書き出せます。旅は二度生きます。',
    howCta: '旅行ブログを始める',
    howFootnote: '旅行記は無料 · カード不要 · Googleでサインイン',
    liveEyebrow: '公開中の旅行ブログ',
    liveH2Pre: '本物の旅。',
    liveH2Italic: '本物の旅行者。',
    liveH2Tail: '次はあなたの番。',
    liveLead:
      'レヴィの上級コースを滑り、イナリでオーロラを追い、サーリセルカでハスキーそりを60km。ここに並ぶブログはすべて、一度の旅で訪問者本人が書いたもの。構築にかかったのは5分未満です。',
    liveBrowseAll: 'すべてのブログを見る',
    liveCta: '私の旅行ブログを始める',
    liveFootnote: '無料 · カード不要 · 最初のエントリーまで2分',
    featuredEyebrow: '創設者によるサンプルジャーナル',
    featuredEvery: 'すべての記事 →',
    featuredLead:
      'これは、あなた自身の旅行ブログがどのようになり得るかの一例です。以下の5つのシード記事は、Lapland.blogの編集の声「The Field Journal」によって、ある冬のラップランドで書かれました。本物の気温、本物のコテージ、本物のスープ。一つ読んで、自分の旅を思い描いてください。',
    featuredLoading: 'サンプルを読み込み中…',
    featuredNone: 'まだサンプル記事がありません。',
    featuredReadEntry: 'この記事を読む',
    pillarsEyebrow: '何を書くか',
    pillarsH2Pre: 'ラップランドの旅を、',
    pillarsH2Italic: '三つの軸で。',
    pillarsLead:
      '他の旅行者が記録したものを見て、自分の旅で書きたい軸を選ぶ。オーロラ、コテージ、食事、寒さ、人々、その合間の静けさ。',
    pillar1Kicker: 'I · 寒さ',
    pillar1Title: '寒さが実際にすること',
    pillar1Body:
      'オーロラの夜、極夜、多くのリストが見落とす八つの季節。ここでは天気が主役で、背景ではありません。午前3時47分のマイナス23度がどう感じられるか、スマートフォンのバッテリーに何をするか、人に何をするかについてのフィールドノート。',
    pillar2Kicker: 'II · 宿と食',
    pillar2Title: '眠る場所、食べる場所',
    pillar2Body:
      '木造のコテージ、ガラスイグルー、機能するサウナと機能しないサウナ。結果的に価値のあった42ユーロのサーモンスープ。バックパックの中でも生き残るライ麦パンと、太陽が沈み忘れたから午前2時に飲むコーヒー。',
    pillar3Kicker: 'III · 出会う人々',
    pillar3Title: 'ここに住むほかの人々',
    pillar3Body:
      'トナカイの放牧者、スキーパトロール、サウナの達人、ソダンキュラ郊外のガソリンスタンドで四ヶ国語を話した男性。ラップランドは静かですが、決して空ではありません。実際に出会う人々についての長文記事。',
    latestEyebrow: 'サンプル記事',
    latestH2: '旅行ブログのかたちを見る。',
    latestEvery: 'すべての記事',
    latestLoading: '記事を読み込み中…',
    asideEyebrow: 'なぜこのサイトがあるのか',
    asideH2: 'ラップランドはパンフレットではありません。あなたの旅もそうあるべきではない。',
    asideP1:
      '毎年、数千人の旅行者がラップランドを訪れ、何か特別なものを目にし、二度と開かないカメラロールの中で失います。コテージの上のオーロラ。サウナから戻る指先が痺れる道。なぜか42ユーロの価値があったサーモンスープ。一週間で消えていきます。',
    asideP2:
      'Lapland.blogは、それを直すための小さな無料ツールです。どこにいたかをピン留めし、何を見たかを書き、スープを撮影する。帰国するころには、本物の旅行ブログが手元にあります。友人が実際にフォローでき、5年後にも読み返したくなるものです。ストック写真はなく、「魔法のような冬の世界」もなく、ただあなた自身の率直な版があるだけです。',
    asideCta1: '自分の旅行ブログを始める',
    asideCta2: 'lapland.blogについて',
    asidePill: 'あなたの旅 · あなたのブログ',
    travelJournalBadge: '旅行記は無料',
    faqHeading: 'lapland.blog のよくある質問',
    faq: [
      {
        q: 'lapland.blog で旅行ブログはどう始めますか？',
        a: 'Googleアカウントでサインインし、ブログに名前を付けて、最初の記事を書くだけです。各記事にはテキスト、写真、日付、そして滞在した場所の地図ピンを添えられます。ブログは lapland.blog/あなたの名前 に公開され、投稿した瞬間に共有できます。インストールは不要で、サインイン以外の設定もありません。',
      },
      {
        q: 'lapland.blog は無料ですか？',
        a: 'はい。ブログの開設、記事の作成、写真の追加、地図への場所のピン留め、ブログの共有はすべて無料です。登録にカードは不要で、あなたのブログに広告は表示されません。',
      },
      {
        q: 'ラップランドのブログをInstagramやFacebookで共有できますか？',
        a: 'はい。どのブログにもどこにでも投稿できる公開リンクがあり、各記事はInstagramストーリーサイズの画像として書き出せるので、ある一日をワンタップで共有できます。友人や家族は自分のアカウントがなくてもブログを開けます。',
      },
      {
        q: 'ここでブログを書くにはラップランドにいる必要がありますか？',
        a: 'いいえ。lapland.blog はフィンランド・ラップランドへ向かう旅行者のために作られており、地図や書き込みのヒントは北の旅向けに調整されています。ただし、旅を計画中の方も、旅の最中の方も、帰宅後にまとめる方も、どなたでもブログを持てます。出発前に始めて、一日ずつ記事を追加していくこともできます。',
      },
      {
        q: 'ラップランドの旅日記には何を書けばいいですか？',
        a: '忘れたくないことを何でも。泊まった場所、オーロラの様子、一番寒い朝の気温、思いがけずおいしかった食事、ハスキー体験、森の静けさ。写真と場所ピンを添えた短い記事がよく合います。1日数行でも、読み返したくなるブログに育っていきます。',
      },
    ],
  },
  startHere: {
    eyebrow: 'ようこそ',
    h1: 'はじめまして。三つの入口があります。',
    lead:
      'Lapland.blogは、実際にフィンランド・ラップランドを訪れる人のための、無料でゆっくりとした、写真を中心にした旅行記サイトです。旅を計画中の方、旅の途中の方、帰国後に書き留めておけばよかったと思っている方。自分に合った入口を選んでください。',
    path1Kicker: '01 · 計画',
    path1Title: 'ラップランドへの旅行を計画中です。',
    path1Body:
      'どこに泊まるか、どう行くか、何をするか、どこで食べるか。実用の側面です。予約を扱うLaplandVibesの姉妹サイトへどうぞ。',
    path1Cta: '旅行を計画する',
    path2Kicker: '02 · 読む',
    path2Title: '他の人が書いたものを読みたい。',
    path2Body:
      'フィンランド国内から書かれた厳選シード記事：コテージのパッキング、サーモンスープの夜、ケミの上のオーロラ。本物の気温、本物の時間、パンフレット調なし。',
    path2Cta: 'おすすめ記事',
    path3Kicker: '03 · 書く',
    path3Title: 'いまラップランドにいて、自分の旅行ブログがほしい。',
    path3Body:
      'メールまたはGoogleでサインイン。lapland.blog内の自分のページを取得。場所にピンを立て、記事を書き、友人と共有。無料で、隠された罠も有料プランもありません。',
    path3Cta: 'ブログを始める',
    planEyebrow: '旅を計画する',
    planH2: '実用の側面は、姉妹サイトで。',
    planLead:
      'Lapland.blogはジャーナルです。予約はLaplandVibesの各スポークサイトで行います。それぞれが得意な一つのことに集中しています。',
    planStay: {
      kicker: '泊まる',
      title: 'コテージ、イグルー、ホテル',
      body: 'ラップランドの宿泊先を数百件比較：ガラスイグルー、ログコテージ、スキーリゾート。',
    },
    planTransport: {
      kicker: '行く',
      title: 'フライト、鉄道、バス',
      body: 'ヘルシンキ → ロヴァニエミ／キッティラ／イヴァロ：フライト、寝台列車、実用ルート。',
    },
    planDo: {
      kicker: '体験する',
      title: 'ハスキー、スノーモービル、サウナ',
      body: '予約可能なアクティビティを実際の運営会社から、レビュー付きで。プレスリリースではありません。',
    },
    planEat: {
      kicker: '食べる',
      title: '食事と飲み物',
      body: '実際に食べに行くべき場所：サーモンスープ、ライ麦パン、より良かった時代を知るバー。',
    },
    planAllSites: 'またはlaplandvibes.comで21以上のサイトすべてを見る',
    onlyEyebrow: 'もし一本だけ読むなら',
    onlyH2: 'これを読んでください。',
    onlyLead: '最新のフィールドジャーナル記事。本物の気温、本物の時間、パンフレット調なし。',
    thenEyebrow: '次にこちらも',
    thenH2: 'フィールドからのその他の記事。',
    everyEntry: 'すべての記事',
  },
  about: {
    pageTitle: '当サイトについて | Lapland.blog',
    pageDescription:
      'Lapland.blogは、フィンランド・ラップランドを訪れる人のための無料の旅行記プラットフォームです。場所にピンを立て、記事を書き、友人と共有。よく語られたあなたの旅。',
    eyebrow: 'プラットフォームについて',
    h1: '残しておきたい旅行記。',
    lead:
      'Lapland.blogは、フィンランド・ラップランドを訪れる人のための無料の旅行記プラットフォームです。オーロラを見た場所にピンを立て、コテージを撮影し、気温を書き留める。帰国するころには旅行ブログが手元にあり、友人が実際にフォローでき、5年後にも読み返したくなるものになります。',
    intro:
      '多くのラップランドのブログはパンフレットのように読めます。多くの旅行記アプリは、カメラロールの中で放置されるか、一日で消えるInstagramの投稿として共有されます。Lapland.blogはその中間にあります。本物で、ゆっくりとした、写真を中心にした旅行ブログを、すでにアクセスのあるドメイン上で、お望みの期間だけ保管します。',
    howHeading: '使い方',
    howStepPin: '泊まる場所、行きたい店、暗い空のスポットにピンを。出発前にルートを組み立てます。',
    howStepWrite: '旅しながら書く。コテージで、車で、サウナで。写真や気温、スープの味を書き添えて。',
    howStepShare: '記事は lapland.blog/あなたの名前 で公開ブログに。友人がフォローでき、各記事はInstagramストーリーに書き出せます。',
    howBody:
      'メールまたはGoogleでサインイン。lapland.blog/meの自分の場所を取得。各エントリーはヒーロー画像、場所のピン、伝えたい言葉で構成。下書きを保存し、準備ができたら公開し、友人にリンクを共有。公開された記事はすべてインデックスされ検索可能になり、あなたの旅は、より大きなラップランド・アーカイブの一部になります。',
    freeHeading: '無料で使えるもの',
    freeBody:
      '記事の作成、lapland.blog/me/yourname配下での旅行ブログのホスティング、写真、ニュースレター。執筆側にペイウォールも有料プランもありません。',
    notHeading: '見つからないもの',
    notBody:
      '読者の記事の中の広告投稿、ブログに詰め込まれたアフィリエイトのショッピングリスト。「忘れられない」「人生のリスト」「魔法のような」「冬の楽園」といった言葉は、編集の下書きで禁止されており、あなたのブログでも避ける価値があります。執筆にも読者にも良くありません。',
    seedHeading: 'シード記事',
    seedBody:
      'サイトにすでにある5つの記事は、Lapland.blogの編集の声「The Field Journal」によって書かれています。率直で、ゆっくりとした、写真を中心にした旅行ブログがどう読めるかを示すためにあります。本物の気温、本物の時間、パンフレット調なし。一つ読んで、自分の旅を思い描いてください。',
    networkHeading: 'ネットワークについて',
    networkBody:
      'Lapland.blogはLaplandVibesエコシステムの一部です。ラップランドについてのフィンランド資本のサイトネットワークです。他のサイトはどこへ行くか、どこに泊まるか、何をするかを伝えます。このサイトは、旅そのものが書き留められる場所です。',
    contactHeading: 'お問い合わせ',
    contactBody:
      '挨拶、事実誤認の指摘、クレジット付きで掲載できる写真の送付などは info@lapland.blog までメールでお寄せください。すべて読み、一週間以内の返信を心がけています。',
    closing: 'フィンランド・ラップランドから、その時の気温と時間で書かれています。',
    ctaPrimary: '自分のジャーナルを始める →',
    ctaSecondary: 'または',
    ctaSecondaryLink: 'まずシード記事を読む',
  },
  destinations: {
    pageTitle: '目的地 | Lapland.blog',
    pageDescription:
      'フィンランド・ラップランドの主要8つの目的地：ロヴァニエミ、サーリセルカ、レヴィ、ケミ、イナリ、ムオニオ、ウッラス、ケミヤルヴィ。各地のフィールドジャーナル記事を読むか、最初の記事を書いてください。',
    eyebrow: 'どこへ行くか',
    h1Pre: '八つの場所、',
    h1Italic: '一つのラップランド。',
    lead:
      '目的地を選び、そこからの記事を読みましょう。空のものは次に書かれるべき場所です。あなたが最初の書き手になれます。',
    beTheFirst: '最初の一人になる',
    entrySingular: '記事',
    entryPlural: '記事',
    readEntries: '記事を読む',
    beFirstWrite: '最初の記事を書く',
    findStayPrefix: 'こちらで宿泊先を探す：',
    dontSeeEyebrow: 'お探しの場所がない？',
    plantH2: '旗を立てる。',
    plantLead:
      'このリストにない場所へ行きますか？ソダンキュラ、ポシオ、キルピスヤルヴィ、ヘッタ。そこからの最初の記事を書いてくだされば、地図に追加します。',
    plantCta: 'ブログを始める',
  },
  topReads: {
    pageTitle: 'おすすめ記事 | Lapland.blog',
    pageDescription:
      'Lapland.blogでの読み始めに。編集者の厳選リスト：初めての方向けのベスト記事、オーロラ記事、食事記事、季節記事。クリック数ではなく編集者の選定。',
    eyebrow: '編集者の厳選リスト',
    h1: 'おすすめ記事。',
    lead: '読み始めはこちらから。クリック数ではなく編集者が選んでいます。フィールドジャーナルの記事が増えるたびに、リストも育ちます。',
    onlyEyebrow: 'もし一本だけ読むなら',
    onlyH2: '編集者の一押し。',
    onlyLead:
      'ボスニア湾の上のオーロラ、午前3時47分のマイナス23度、誰も撮れなかった写真。Lapland.blogの声を定義する一篇。',
    firstTimersEyebrow: '初めての方へ',
    firstTimersTitle: '旅立つ前に読みたい三篇。',
    firstTimersSubtitle:
      'なぜ多くの人がオーロラを誤解するか、コテージに何を持って行くか、極夜が実は心配無用な理由。読んでおけば、現地でそれほど驚かずに済みます。',
    auroraEyebrow: 'オーロラの記事',
    auroraTitle: '夜空の記事。',
    auroraSubtitle: '追いかける、撮影する、それでも現れる夜について。',
    cabinsEyebrow: 'コテージ',
    cabinsTitle: 'モッキ（mökki）の記事。',
    cabinsSubtitle:
      'フィンランドの森のコテージが実際にどんな場所か：火、サウナ、静寂、誰も触れないマイナス30度の屋外トイレの話。',
    foodEyebrow: '食事と飲み物',
    foodTitle: 'キッチンの記事。',
    foodSubtitle:
      '42ユーロのサーモンスープ、バックパックでも生き残るライ麦パン、太陽が沈み忘れたから午前2時に飲むコーヒー。',
    seasonalEyebrow: '季節',
    seasonalTitle: '寒さが実際にすること。',
    seasonalSubtitle:
      'カーモス（極夜）、多くのリストが見落とす八つのラップランドの季節、太陽のない12月を乗り切るというささやかな営み。',
    ctaEyebrow: '次はあなたの旅？',
    ctaH2: 'このページの次の記事になる。',
    ctaLead:
      '上のリストは、読者が書くことで育ちます。サインインしていくつか記事を書けば、編集者がふさわしいものを取り上げます。',
    ctaButton: 'ブログを始める',
  },
  archive: {
    pageTitle: 'すべての記事 | Lapland.blog',
    pageDescription:
      'Lapland.blog のすべての記事。オーロラ、コテージ、食事、季節、人、装備、フィンランド・ラップランドからの長文記事。',
    eyebrow: 'アーカイブ',
    h1: 'すべての記事。',
    lead:
      'アルゴリズムも編集の小技もなし。新しいものが上。フィルターで絞り込むか、すでに探しているものが分かっているなら検索を。',
    all: 'すべて',
    filterAria: 'カテゴリーで絞り込む',
    searchSr: '記事を検索',
    searchPlaceholder: 'タイトル、タグを検索…',
    loading: '記事を読み込み中…',
    emptyTitle: '該当する記事はありません。',
    emptyBody: 'フィルターを解除するか、別のキーワードで検索してみてください。',
  },
  category: {
    allStoriesBack: 'すべての記事',
    categoryPrefix: 'カテゴリー',
    storySingular: '記事',
    storyPlural: '記事',
    loading: '記事を読み込み中…',
    emptyTitle: 'まだ何もありません。',
    emptyBody: 'このカテゴリーは最初の記事を待っています。またのお越しを。',
    emptyLink: 'すべての記事を見る →',
    keepExploringEyebrow: 'さらに探す',
    otherThemes: '他のテーマ',
  },
  post: {
    allStories: 'すべての記事',
    by: '執筆：',
    minRead: '分で読了',
    loadingStory: '記事を読み込み中…',
    readNextEyebrow: '次に読む',
    readNextH2: 'ジャーナルからもっと',
    tagged: 'タグ',
    exploreMore: 'LaplandVibesネットワークでさらに探す',
    editorialLabel: 'フィールドジャーナルの記事',
    editorialNote: '正直な旅日記がどんなものかを示すために、Lapland.blogの編集の声「The Field Journal」が書いた数本のサンプル記事のひとつです。場所も気温も本物。あなた自身の記事は、あなたが書きます。',
  },
  signIn: {
    pageTitle: 'ラップランドの旅を計画 | Lapland.blog',
    pageDescription:
      '無料の旅行ページ、あなただけのおすすめ、ラップランド旅行のお得情報をお届け。いつ訪れるかをお知らせいただければ、行程のすべてをお手伝いします。',
    back: '戻る',
    eyebrow: 'あなたの無料旅行ページ',
    h1Pre: '計画する：',
    h1Italic: 'ラップランドの旅。',
    lead:
      'lapland.blog/yourname であなただけのページを取得。旅の物語を書き、写真を共有し、行程に合わせたおすすめとお得情報を受け取れます。いつ訪れるかをお知らせいただければ、すべてのステップをお手伝いします。',
    benefit1Title: 'ラップランドの地図にルートをピン留め',
    benefit1Body: 'コテージ、レストラン、オーロラスポット：出発前にピンを立てます。',
    benefit2Title: 'スマートフォンから記事を書く',
    benefit2Body: 'コテージ、車内、サウナから。写真、天気、物語。',
    benefit3Title: 'ワンタップでInstagramへシェア',
    benefit3Body: '各エントリーは縦型のストーリーとして書き出され、友人が実際に開きます。',
    footnote: '旅行記は無料 · クレジットカード不要 · フィンランド製',
    sentTitle: '受信箱をご確認ください',
    sentBody:
      '{email} へマジックリンクを送信しました。クリックすると旅行ブログが有効になります。リンクは1時間で期限切れになります。',
    useDifferent: '別のメールアドレスを使う',
    reserveEyebrow: 'ページを予約',
    formH2: 'ラップランドの旅を計画',
    formLead: 'ご訪問時期に合わせて、あなたの旅行ページを作成し、おすすめ情報をお送りします。',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'you@example.com',
    travelLabel: 'いつラップランドを訪れますか？',
    monthLabel: '月…',
    yearLabel: '年…',
    noDates: 'まだ計画中です。日付は未定',
    enterEmail: '始めるにはメールアドレスを入力してください。',
    sending: 'マジックリンクを送信中…',
    submitCta: '旅行ページを予約する',
    months: [
      '1月','2月','3月','4月','5月','6月',
      '7月','8月','9月','10月','11月','12月',
    ],
  },
  unsubscribe: {
    pageTitle: '配信解除 | Lapland.blog',
    pageDescription: 'Lapland.blogのニュースレターを配信解除。ワンクリックで完了、引き止めません。',
    eyebrow: 'ニュースレター',
    h1: '配信解除',
    successTitle: '配信解除されました。',
    successBody:
      '離れてしまうのは残念です。Lapland.blogからのメールはもう届きません。気が変わった場合は、各ページに登録フォームがあります。',
    backHome: '← ホームへ戻る',
    lead: '登録したメールアドレスを入力してください。ワンクリックで解除完了。確認ループも、アンケートもありません。',
    emailPlaceholder: 'your@email.com',
    processing: '処理中…',
    submit: '配信解除',
  },
  notFound: {
    pageTitle: 'ページが見つかりません | Lapland.blog',
    pageDescription: 'このページは存在しません。移動、改名、または雪の中に紛れた可能性があります。',
    eyebrow: 'ページが見つかりません · 404',
    h1: '雪の中で迷子になりました。',
    body: 'このページは存在しないか、まだ存在しません。いずれにせよ、ブログの他の部分はこちらからどうぞ。',
    backHome: 'ホームへ戻る',
    allStories: 'すべての記事 →',
  },
  chrome: {
    readTheStory: 'ストーリーを読む',
    shareThisStory: 'このストーリーをシェア',
    inThisStory: 'この記事の内容',
    fieldJournalEntry: 'フィールドジャーナルの記録',
    liveTripBlog: 'ライブ旅ブログ',
    yoursCouldBeNext: '次はあなたの番かもしれません。',
    featuredBadge: '注目記事',
    minRead: '分で読めます',
  },
};

const fi: SectionCopy = {
  nav: {
    startHere: 'Aloita tästä',
    topReads: 'Suosituimmat',
    destinations: 'Kohteet',
    tripDiaries: 'Matkapäiväkirjat',
    about: 'Tietoa',
    startYourBlog: 'Aloita oma blogi',
    signIn: 'Kirjaudu',
    subscribe: 'Tilaa',
    myTripBlog: 'Oma matkablogi',
    adminDashboard: 'Ylläpito',
    signOut: 'Kirjaudu ulos',
    signedInAs: 'Kirjautuneena',
  },
  footer: {
    networkBadge: 'Suomen Lapin verkosto',
    tagline: 'Suomen Lapin matkailun digitaalinen koti.',
    travelGuide: 'Lapin matkaopas',
    aboutEyebrow: 'Tietoa LaplandVibes-verkostosta',
    aboutBody:
      'Toimituksellinen opas Suomen Lappiin, revontulista keskiyön aurinkoon. Käsin valitut reitit, rehelliset arviot ja se käytännön tieto, jota pohjoisen matkan suunnittelu vaatii.',
    aboutBadge: 'Itsenäisesti ylläpidetty · lähteet näkyvillä',
    spottedError: {
      title: 'Huomasitko virheen?',
      body: 'Jos jokin kaipaa korjausta, kerro meille. Korjaamme sen.',
      cta: 'Ilmoita virheestä →',
    },
    partner: {
      title: 'Kumppaniksi',
      body: 'Mainosta tai tee yhteistyötä 27 Lappi-sivustolla.',
      cta: 'Ota yhteyttä →',
    },
    press: {
      title: 'Media ja lehdistö',
      body: 'Toimitukselliset yhteistyöt ja media-aineistot.',
      cta: 'Lehdistölle →',
    },
    copyright: 'Osa #LaplandVibes-verkostoa',
    websiteBy: 'Sivuston tehnyt Yrityspaketit.fi',
    privacy: 'Tietosuoja',
    cookiePolicy: 'Evästekäytäntö',
    terms: 'Käyttöehdot',
    contact: 'Yhteystiedot',
    groups: { stay: 'Majoitus', eatDrink: 'Syöminen ja juominen', do: 'Tekeminen', explore: 'Tutki', essentials: 'Käytännön asiat' },
  },
  newsletter: {
    eyebrow: '#LaplandVibes-uutiskirje',
    h2: 'Lappi suoraan sähköpostiisi.',
    lead: 'Revontulivaroitukset kun Kp-indeksi nousee, mökkien ja retkien varausikkunat ennen kuin paikat loppuvat, ja kausivinkit kirjoitettuna Suomesta. Ei roskapostia eikä täytettä. Viestimme vain kun on jotain oikeasti kerrottavaa.',
    placeholder: 'sahkoposti@esimerkki.fi',
    subscribing: 'Tilataan…',
    subscribe: 'Tilaa',
    successTitle: 'Olet listalla.',
    successBody: 'Tarkista sähköposti, tervetuloviesti on matkalla. Seuraavan revontulivaroituksen saat kun ennuste lupaa kirkasta yötä.',
    alreadyTitle: 'Olit jo listalla.',
    alreadyBody: 'Tilauksesi oli jo voimassa. Lappi-päivitykset jatkuvat normaalisti.',
    agreeText: 'Tilaamalla hyväksyt',
    privacyLink: 'tietosuojakäytäntömme',
    unsubscribeNote: 'Voit perua tilauksen milloin tahansa.',
  },
  cookieBanner: {
    headline: 'Lyhyt huomautus evästeistä',
    body: 'Käytämme muutamaa välttämätöntä evästettä, jotta sivu toimii, sekä vapaaehtoista analytiikkaa, jotta tiedämme mitä juttuja luetaan. Sinä päätät.',
    accept: 'Hyväksy',
    decline: 'Hylkää',
  },
  home: {
    heroEyebrow: 'Matkapäiväkirja · Kartta · Jaa',
    heroLine1: 'Lähdössä Lappiin?',
    heroLine2: 'Tee matkastasi blogi.',
    heroLead:
      'Merkitse paikka, jossa näit revontulet. Kuvaa mökki. Kirjoita mitä lämpötila teki. Rakenna matkastasi blogi, jota kaverit oikeasti seuraavat.',
    heroPrimaryCta: 'Aloita matkablogi',
    heroSecondaryCta: 'Katso miten se toimii',
    heroFootnote: 'Ilmainen · Tehty Suomessa · Jaa Instagramiin · Ei mainoksia',
    seasonalBadge: 'Juuri nyt · Keskiyön aurinko · 6.6. → 7.7.',
    seasonalH2: 'Ilmainen matkablogi Lapin-reissullesi, kirjoita matkan aikana.',
    seasonalLead:
      'Lapland.blog tekee matkastasi yksinkertaisen ja kauniin blogin: merkitse paikat, lisää kuvat, kirjoita mitä tapahtui ja jaa linkki kavereille. Juuri nyt se tarkoittaa kesää. 32 yötä, kun aurinko ei laske, metsä muuttuu kullaksi ja järvet peilaavat taivasta. Aloita päiväkirja, kun olet vielä siellä.',
    seasonalCta1: 'Aloita matkablogi',
    seasonalCta2: 'Lue kesän merkinnät',
    seasonalCard1Title: '24 tunnin kultainen hetki',
    seasonalCard1Body: 'Aurinko hipoo horisonttia. Valokuvaajat kutsuvat sitä maapallon pisimmäksi siniseksi hetkeksi.',
    seasonalCard2Title: 'Lakkasesonki',
    seasonalCard2Body: 'Heinäkuun loppu: suo muuttuu kullaksi. Paikalliset kutsuvat sitä toiseksi sadoksi.',
    seasonalCard3Title: 'Sauna, sitten pulahdus',
    seasonalCard3Body: '14-asteinen järvi keskiyöllä, 90-asteinen sauna viiden askeleen päässä. Toistetaan.',
    seasonalCard4Title: 'Ei ketään muuta',
    seasonalCard4Body: 'Talvella loppuun varatut mökit ovat tyhjillään heinäkuussa. Sama metsä, ei jonoa.',
    seasonalLabels: { light: '01 · Valo', forest: '02 · Metsä', water: '03 · Vesi', quiet: '04 · Hiljaisuus' },
    howEyebrow: 'Näin se toimii',
    howH2Pre: 'Kolme askelta. Yksi matka.',
    howH2Italic: 'Blogi, jota kannattaa säilyttää.',
    howLead:
      'Lapland.blog on ilmainen matkapäiväkirja-alusta Suomen Lappiin matkustaville. Matkasi muuttuu blogiksi, jota oikeasti haluat jakaa.',
    howStep1Kicker: 'Askel 01 · Suunnittele',
    howStep1Title: 'Merkitse paikat.',
    howStep1Body:
      'Pudota Lapin kartalle pinnit varatulle mökille, ravintolalle ja revontulipaikalle. Rakenna reitti ennen lentoa.',
    howStep2Kicker: 'Askel 02 · Kirjoita',
    howStep2Title: 'Kirjoita matkan aikana.',
    howStep2Body:
      'Puhelimesta, mökistä, autosta, saunasta. Liitä kuvat, lämpötila, miltä keitto maistui. Jokainen merkintä kiinnittyy päivään ja paikkaan.',
    howStep3Kicker: 'Askel 03 · Jaa',
    howStep3Title: 'Matkasi, hyvin kerrottuna.',
    howStep3Body:
      'Merkinnöistäsi tulee julkinen blogi osoitteessa lapland.blog/oma-nimi. Kaverit voivat seurata. Jokaisen voi viedä Instagram-tarinaksi, jotta matka elää kahdesti.',
    howCta: 'Aloita matkablogi',
    howFootnote: 'Ilmainen matkapäiväkirjoille · Ei korttia · Kirjaudu Googlella',
    liveEyebrow: 'Eläviä matkablogeja',
    liveH2Pre: 'Oikeita matkoja.',
    liveH2Italic: 'Oikeita matkailijoita.',
    liveH2Tail: 'Sinun on seuraava.',
    liveLead:
      'Mustia rinteitä Levillä. Revontulia Inarissa. 60 km koiravaljakolla Saariselällä. Jokainen täällä näkyvä blogi on yhden matkan tulos, ja tehty alle viidessä minuutissa.',
    liveBrowseAll: 'Selaa kaikkia blogeja',
    liveCta: 'Aloita oma matkablogi',
    liveFootnote: 'Ilmainen · Ei korttia · 2 minuuttia ensimmäiseen merkintään',
    featuredEyebrow: 'Toimituksen esimerkkipäiväkirja',
    featuredEvery: 'Kaikki merkinnät →',
    featuredLead:
      'Tältä oma matkablogisi voisi näyttää. Alla viisi siemenmerkintää, jotka Lapland.blogin toimituksellinen ääni The Field Journal kirjoitti yhden Lapin talven aikana. Oikeat lämpötilat, oikeat mökit, oikea keitto. Lue yksi ja kuvittele oma.',
    featuredLoading: 'Ladataan esimerkkiä…',
    featuredNone: 'Ei esimerkkimerkintöjä vielä.',
    featuredReadEntry: 'Lue tämä merkintä',
    pillarsEyebrow: 'Mitä päiväkirjaan',
    pillarsH2Pre: 'Lapin matka,',
    pillarsH2Italic: 'kolmessa juonteessa.',
    pillarsLead:
      'Selaa mitä muut matkailijat ovat kirjanneet ja valitse juonteet, joista itse kirjoitat. Revontulet, mökit, ruoka, kylmyys, ihmiset, hiljaisuus väleissä.',
    pillar1Kicker: 'I · Kylmyys',
    pillar1Title: 'Mitä kylmyys oikeasti tekee',
    pillar1Body:
      'Revontuliyöt, kaamos, ne kahdeksan vuodenaikaa, jotka useimmat listat unohtavat. Sää on täällä päähenkilö, ei tausta. Kenttämuistiinpanoja siitä, miltä −23 astetta tuntuu kello 03.47 ja mitä se tekee puhelimen akulle, ja ihmiselle.',
    pillar2Kicker: 'II · Suoja',
    pillar2Title: 'Missä nukut, missä syöt',
    pillar2Body:
      'Hirsimökit, lasi-iglut, saunat jotka toimivat ja saunat jotka eivät. 42 euron lohikeitto, joka osoittautui hintansa arvoiseksi. Reissunkestävä ruisleipä ja se kahvi, jonka juot kello kahdelta yöllä, kun aurinko unohti laskea.',
    pillar3Kicker: 'III · Toiset ihmiset',
    pillar3Title: 'Ketä muita täällä asuu',
    pillar3Body:
      'Poromiehet, hiihtopartiolaiset, saunamestarit, se Sodankylän huoltoaseman mies joka puhui neljää kieltä. Lappi on hiljainen, mutta ei koskaan tyhjä. Pidempiä juttuja ihmisistä, jotka oikeasti kohtaat.',
    latestEyebrow: 'Esimerkkimerkinnät',
    latestH2: 'Katso miltä matkablogi näyttää.',
    latestEvery: 'Kaikki merkinnät',
    latestLoading: 'Ladataan juttuja…',
    asideEyebrow: 'Miksi tämä on olemassa',
    asideH2: 'Lappi ei ole esite. Matkasikaan ei ole.',
    asideP1:
      'Vuosittain tuhannet matkailijat saapuvat Lappiin, näkevät jotain tavatonta ja hukkaavat sen puhelimen kuvavirtaan, jota ei enää avata. Revontulet mökin yllä. Sormet puutuneena saunalta paluulla. Se 42 euron lohikeitto, joka oli jotenkin hintansa väärtti. Poissa viikossa.',
    asideP2:
      'Lapland.blog on pieni ilmainen työkalu sen korjaamiseen. Merkitse missä olit. Kirjoita mitä näit. Kuvaa keitto. Kun lennät kotiin, sinulla on oikea blogi matkasta: sellainen, jota kaverit voivat oikeasti seurata ja jota itse haluat lukea viiden vuoden päästä. Ei kuvapankkikuvia. Ei "taianomaista talvimaailmaa". Vain oma rehellinen versiosi paikasta.',
    asideCta1: 'Aloita oma',
    asideCta2: 'Tietoa lapland.blogista',
    asidePill: 'Sinun matkasi · Sinun blogisi',
    travelJournalBadge: 'Ilmainen matkapäiväkirjoille',
    faqHeading: 'Usein kysyttyä lapland.blogista',
    faq: [
      {
        q: 'Miten aloitan matkablogin lapland.blogissa?',
        a: 'Kirjaudu sisään Google-tilillä, anna blogillesi nimi ja kirjoita ensimmäinen merkintä. Jokaiseen merkintään voi liittää tekstiä, kuvia, päivämäärän ja karttapinin paikasta, jossa olit. Blogisi löytyy osoitteesta lapland.blog/nimesi ja on valmis jaettavaksi heti julkaisun jälkeen. Mitään ei tarvitse asentaa, eikä muuta käyttöönottoa ole kuin sisäänkirjautuminen.',
      },
      {
        q: 'Onko lapland.blog ilmainen?',
        a: 'Kyllä. Blogin aloittaminen, merkintöjen kirjoittaminen, kuvien lisääminen, paikkojen merkitseminen kartalle ja blogin jakaminen ovat kaikki ilmaisia. Rekisteröitymiseen ei tarvita korttia, eikä blogissasi ole mainoksia.',
      },
      {
        q: 'Voinko jakaa Lapin-blogini Instagramissa ja Facebookissa?',
        a: 'Kyllä. Jokaisella blogilla on julkinen linkki, jonka voit jakaa missä tahansa, ja jokaisen merkinnän voi viedä Instagram-tarinan kokoisena kuvana, joten yhden päivän jakaminen onnistuu yhdellä napautuksella. Ystävät ja perhe voivat avata blogisi ilman omaa tiliä.',
      },
      {
        q: 'Pitääkö minun olla Lapissa kirjoittaakseni blogia täällä?',
        a: 'Ei. Teimme lapland.blogin Suomen Lappiin matkaaville, joten kartta ja kirjoitusvinkit on viritetty pohjoisen matkoihin, mutta kuka tahansa voi pitää täällä blogia, oletpa suunnittelemassa matkaa, kirjoittamassa sen aikana tai täydentämässä sitä kotiin palattuasi. Voit aloittaa ennen lähtöä ja lisätä merkintöjä päivä kerrallaan.',
      },
      {
        q: 'Mistä kannattaa kirjoittaa Lapin-matkapäiväkirjassa?',
        a: 'Siitä, mitä et halua unohtaa. Missä yövyit, miltä revontulet näyttivät, kylmimmän aamun lämpötila, ruoka joka yllätti, huskyajelu, metsän hiljaisuus. Lyhyet merkinnät, joissa on kuva ja paikkapini, toimivat hyvin. Muutama rivi päivässä kasvaa blogiksi, jonka haluaa lukea uudelleen.',
      },
    ],
  },
  startHere: {
    eyebrow: 'Tervetuloa',
    h1: 'Hei. Kolme tapaa aloittaa.',
    lead:
      'Lapland.blog on ilmainen, hidas, kuvavetoinen matkapäiväkirja-sivusto niille, jotka oikeasti matkaavat Suomen Lappiin. Suunnitteletpa matkaa, olet sen keskellä tai palasit kotiin ja kadut ettet kirjoittanut, valitse polkusi.',
    path1Kicker: '01 · Suunnittelu',
    path1Title: 'Suunnittelen matkaa Lappiin.',
    path1Body:
      'Missä yöpyä, miten päästä perille, mitä tehdä, missä syödä: käytännön puoli. Hyppää LaplandVibes-sisarsivustoille, jotka hoitavat varaukset.',
    path1Cta: 'Suunnittele matka',
    path2Kicker: '02 · Lukeminen',
    path2Title: 'Haluan lukea mitä muut kirjoittivat.',
    path2Body:
      'Käsin valittuja siemenmerkintöjä Suomesta: mökin pakkaaminen, lohikeittoilta, Kemin revontulet. Oikeat lämpötilat, oikea kellonaika, ei esiteääntä.',
    path2Cta: 'Suosituimmat',
    path3Kicker: '03 · Kirjoittaminen',
    path3Title: 'Olen täällä. Haluan blogin matkastani.',
    path3Body:
      'Kirjaudu sähköpostilla tai Googlella. Saat oman kulman lapland.blogista. Merkitse paikat, kirjoita merkinnät, jaa kavereille. Ilmainen, ei kommervenkkejä, ei premium-tasoa.',
    path3Cta: 'Aloita oma blogi',
    planEyebrow: 'Suunnittele matka',
    planH2: 'Käytännön puoli sisarsivustoilla.',
    planLead:
      'Lapland.blog on päiväkirja. Varaukset tehdään LaplandVibes-sivuilla, kukin keskittyy yhteen asiaan, jonka osaa.',
    planStay: {
      kicker: 'Majoitus',
      title: 'Mökit, iglut, hotellit',
      body: 'Vertaile satoja Lapin majoituksia: lasi-iglut, hirsimökit, hiihtokeskukset.',
    },
    planTransport: {
      kicker: 'Sinne pääsy',
      title: 'Lennot, junat, bussit',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: lennot, yöjunat, käytännön reitit.',
    },
    planDo: {
      kicker: 'Tekeminen',
      title: 'Huskyt, moottorikelkat, sauna',
      body: 'Varattavia aktiviteetteja oikeilta toimijoilta, arvosteluineen, ei lehdistötiedote.',
    },
    planEat: {
      kicker: 'Ruoka',
      title: 'Ruoka ja juoma',
      body: 'Missä oikeasti kannattaa syödä: lohikeitto, ruisleipä, baarit jotka muistavat paremmat vuosikymmenet.',
    },
    planAllSites: 'Tai selaa kaikkia 27 sivustoa osoitteessa laplandvibes.com',
    onlyEyebrow: 'Jos luet vain yhden',
    onlyH2: 'Lue tämä.',
    onlyLead: 'Uusin kenttäpäiväkirjamerkintä. Oikea lämpötila, oikea kellonaika, ei esiteääntä.',
    thenEyebrow: 'Sen jälkeen nämä',
    thenH2: 'Lisää kentältä.',
    everyEntry: 'Kaikki merkinnät',
  },
  about: {
    pageTitle: 'Tietoa | Lapland.blog',
    pageDescription:
      'Lapland.blog on ilmainen matkapäiväkirja Suomen Lappiin matkustaville. Merkitse paikat, kirjoita merkinnät, jaa kavereille. Matkasi, hyvin kerrottuna.',
    eyebrow: 'Tietoa alustasta',
    h1: 'Matkapäiväkirja, jota kannattaa säilyttää.',
    lead:
      'Lapland.blog on ilmainen matkapäiväkirja-alusta Suomen Lappiin matkustaville. Merkitse paikka, jossa näit revontulet. Kuvaa mökki. Kirjoita mitä lämpötila teki. Kun lennät kotiin, sinulla on blogi matkasta: sellainen, jota kaverit voivat oikeasti seurata ja jota itse haluat lukea viiden vuoden päästä.',
    intro:
      'Useimmat Lappi-blogit lukevat kuin esite. Useimmat matkapäiväkirjasovellukset jäävät puhelimen kuvavirtaan tai päätyvät yhdeksi Instagram-postaukseksi, joka katoaa päivässä. Lapland.blog on välimuoto: oikea, hidas, kuvavetoinen blogi matkastasi, hostattu nimellä joka jo saa kävijöitä, säilytettynä niin kauan kuin haluat.',
    howHeading: 'Näin se toimii',
    howStepPin: 'Merkitse mökki, ravintola ja pimeän taivaan paikka. Rakenna reittisi jo ennen lähtöä.',
    howStepWrite: 'Kirjoita matkan aikana, mökiltä, autosta, saunasta. Lisää kuvat, lämpötila ja miltä keitto maistui.',
    howStepShare: 'Merkinnöistäsi tulee julkinen blogi osoitteeseen lapland.blog/nimesi. Ystävät voivat seurata, ja jokaisen voi viedä Instagram-tarinaksi.',
    howBody:
      'Kirjaudu sähköpostilla tai Googlella. Saat kulman lapland.blogista osoitteessa lapland.blog/me. Jokainen merkintä saa pääkuvan, paikkapinnin ja tekstit. Tallenna luonnoksia, julkaise valmiina, jaa linkki kavereille. Jokainen julkaistu merkintä indeksoituu ja on haettavissa, ja matkastasi tulee pieni pala isompaa Lapin arkistoa.',
    freeHeading: 'Mikä on ilmaista',
    freeBody:
      'Merkintöjen kirjoittaminen. Oman matkablogin hostaaminen osoitteessa lapland.blog/me/omanimi. Kuvat. Uutiskirje. Kirjoittajan puolella ei ole maksumuuria eikä premium-tasoa.',
    notHeading: 'Mitä et löydä',
    notBody:
      'Sponsoroituja juttuja lukijoiden merkinnöissä. Affiliate-ostoslistoja blogiisi tungettuna. Sanat "unohtumaton", "bucket list", "taianomainen" tai "talvimaailma" on kielletty toimituksellisissa luonnoksissa, ja kannattaa kieltää myös omissasi. Ne ovat huonoja kirjoittamiselle ja huonoja lukijoille.',
    seedHeading: 'Siemenmerkinnät',
    seedBody:
      'Sivulla jo olevat viisi merkintää on kirjoittanut The Field Journal, Lapland.blogin toimituksellinen ääni. Ne näyttävät, miltä rehellinen, hidas, kuvavetoinen matkablogi voi lukea: oikeat lämpötilat, oikea kellonaika, ei esiteääntä. Lue yksi ja kuvittele oma.',
    networkHeading: 'Verkostosta',
    networkBody:
      'Lapland.blog on osa LaplandVibes-ekosysteemiä, suomalaisomisteista verkostoa Lappi-sivustoja. Muut sivustot kertovat minne mennä, missä yöpyä ja mitä tehdä. Tämä on se, johon itse matka kirjoitetaan ylös.',
    contactHeading: 'Ota yhteyttä',
    contactBody:
      'Jos haluat sanoa terve, korjata asiavirheen tai lähettää kuvan jonka voimme krediteerata, kirjoita info@lapland.blog. Luemme kaiken ja yritämme vastata viikossa.',
    closing: 'Kirjoitettu Suomesta, siinä lämpötilassa ja sillä hetkellä jolloin tapahtui.',
    ctaPrimary: 'Aloita oma päiväkirja →',
    ctaSecondary: 'Tai',
    ctaSecondaryLink: 'lue siemenmerkinnät ensin',
  },
  destinations: {
    pageTitle: 'Kohteet | Lapland.blog',
    pageDescription:
      'Suomen Lapin kahdeksan pääkohdetta: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Lue merkinnät kustakin.',
    eyebrow: 'Mihin mennä',
    h1Pre: 'Kahdeksan paikkaa.',
    h1Italic: 'Yksi Lappi.',
    lead:
      'Valitse kohde ja lue sieltä kirjoitetut merkinnät. Tyhjät ovat seuraavaksi kirjoitettavia, joten voit olla ensimmäinen.',
    beTheFirst: 'Ole ensimmäinen',
    entrySingular: 'merkintä',
    entryPlural: 'merkintää',
    readEntries: 'Lue merkinnät',
    beFirstWrite: 'Ole ensimmäinen kirjoittaja',
    findStayPrefix: 'Etsi majoitus kohteesta',
    dontSeeEyebrow: 'Etkö löydä paikkaasi?',
    plantH2: 'Pystytä lippu.',
    plantLead:
      'Menetkö paikkaan, jota ei listalla ole? Sodankylä, Posio, Kilpisjärvi, Hetta. Kirjoita ensimmäinen merkintä sieltä, niin lisäämme sen kartalle.',
    plantCta: 'Aloita oma blogi',
  },
  topReads: {
    pageTitle: 'Suosituimmat | Lapland.blog',
    pageDescription:
      'Mistä aloittaa Lapland.blogissa. Käsin valitut listat: parhaat ensikertalaisille, parhaat revontulijutut, parhaat ruokamerkinnät, sesonkijutut.',
    eyebrow: 'Toimituksen käsin valitsemat listat',
    h1: 'Suosituimmat luetut.',
    lead:
      'Mistä aloittaa. Toimituksen valitsemaa, ei klikkilukujen mukaista. Listat kasvavat, kun uusia kenttämerkintöjä julkaistaan.',
    onlyEyebrow: 'Jos luet vain yhden',
    onlyH2: 'Toimituksen ykkönen.',
    onlyLead:
      'Revontulet Perämeren yllä, −23 astetta kello 3.47, ja se kuva jota kukaan ei saanut. Juttu joka määrittää Lapland.blogin äänen.',
    firstTimersEyebrow: 'Ensikertalaisille',
    firstTimersTitle: 'Kolme parasta luettavaa ennen lähtöä.',
    firstTimersSubtitle:
      'Miksi revontulet ymmärretään yleensä väärin, mitä mökille kannattaa pakata ja miksi kaamos on itse asiassa ihan ok. Lue nämä ja saavut vähemmän yllättyneenä.',
    auroraEyebrow: 'Revontulijuttuja',
    auroraTitle: 'Yötaivasmerkinnät.',
    auroraSubtitle: 'Niiden jahtaamisesta, kuvaamisesta, ja niistä öistä jolloin ne tulevat silti.',
    cabinsEyebrow: 'Mökit',
    cabinsTitle: 'Mökkimerkinnät.',
    cabinsSubtitle:
      'Millaista suomalaisessa metsämökissä oikeasti on: tuli, sauna, hiljaisuus, ja se pieni juttu ulkohuusista −30 asteessa, jota kukaan ei mainitse.',
    foodEyebrow: 'Ruoka ja juoma',
    foodTitle: 'Keittiömerkinnät.',
    foodSubtitle:
      '42 euron lohikeitto, reissunkestävä ruisleipä ja se kahvi, jonka juot kello kahdelta yöllä kun aurinko unohti laskea.',
    seasonalEyebrow: 'Sesonki',
    seasonalTitle: 'Mitä kylmyys oikeasti tekee.',
    seasonalSubtitle:
      'Kaamos, ne kahdeksan Lapin vuodenaikaa jotka useimmat listat unohtavat, ja se pieni tehtävä päästä joulukuusta läpi ilman aurinkoa.',
    ctaEyebrow: 'Sinun matkasi seuraavaksi?',
    ctaH2: 'Ole seuraava merkintä tällä sivulla.',
    ctaLead:
      'Listat kasvavat kun lukijat kirjoittavat. Kirjaudu, kirjoita muutama merkintä, ja toimitus nostaa esiin ne jotka ansaitsevat.',
    ctaButton: 'Aloita oma blogi',
  },
  archive: {
    pageTitle: 'Kaikki jutut | Lapland.blog',
    pageDescription:
      'Kaikki Lapland.blogin jutut. Revontulet, mökit, ruoka, vuodenajat, ihmiset, varustus ja pidemmät luettavat Suomen Lapista.',
    eyebrow: 'Arkisto',
    h1: 'Jokainen juttu.',
    lead:
      'Ei algoritmia, ei kuratointitemppua. Uusin päällä. Käytä suodatinta tai etsi jos jo tiedät mitä haet.',
    all: 'Kaikki',
    filterAria: 'Suodata kategorian mukaan',
    searchSr: 'Etsi juttuja',
    searchPlaceholder: 'Etsi otsikoita, tageja…',
    loading: 'Ladataan juttuja…',
    emptyTitle: 'Hakua vastaavia juttuja ei löytynyt.',
    emptyBody: 'Tyhjennä suodatin tai kokeile toista hakusanaa.',
  },
  category: {
    allStoriesBack: 'Kaikki jutut',
    categoryPrefix: 'Kategoria',
    storySingular: 'juttu',
    storyPlural: 'juttua',
    loading: 'Ladataan juttuja…',
    emptyTitle: 'Ei vielä juttuja.',
    emptyBody: 'Tämä kategoria odottaa ensimmäistä juttuaan. Käy uudelleen pian.',
    emptyLink: 'Selaa kaikki jutut →',
    keepExploringEyebrow: 'Jatka tutkimista',
    otherThemes: 'Muut teemat',
  },
  post: {
    allStories: 'Kaikki jutut',
    by: 'Kirjoittanut',
    minRead: 'min luku',
    loadingStory: 'Ladataan juttua…',
    readNextEyebrow: 'Lue seuraavaksi',
    readNextH2: 'Lisää päiväkirjasta',
    tagged: 'Tagit',
    exploreMore: 'Lisää LaplandVibes-verkostossa',
    editorialLabel: 'Field Journal -merkintä',
    editorialNote: 'Yksi Lapland.blogin toimituksellisen äänen, The Field Journalin, kirjoittamista muutamasta näytemerkinnästä: esimerkki siitä, miltä rehellinen matkapäiväkirja lukee. Paikat ja lämpötilat ovat aitoja, ja omat merkintäsi kirjoitat itse.',
  },
  signIn: {
    pageTitle: 'Suunnittele Lapin matkasi | Lapland.blog',
    pageDescription:
      'Saat ilmaisen matkasivun, henkilökohtaisia vinkkejä ja parhaat tarjoukset matkallesi. Kerro koska tulet, niin autamme suunnittelussa.',
    back: 'Takaisin',
    eyebrow: 'Ilmainen matkasivusi',
    h1Pre: 'Suunnittele',
    h1Italic: 'Lapin matkasi.',
    lead:
      'Saat oman sivun osoitteessa lapland.blog/omanimi. Kirjoita tarinasi, jaa kuvat, ja saat henkilökohtaisia vinkkejä ja tarjouksia matkallesi. Kerro milloin tulet, autamme jokaisen vaiheen kanssa.',
    benefit1Title: 'Merkitse reittisi Lapin kartalle',
    benefit1Body: 'Mökki, ravintola, revontulipaikka: pudota pinnit ennen lentoa.',
    benefit2Title: 'Kirjoita merkinnät puhelimella',
    benefit2Body: 'Mökistä, autosta, saunasta. Kuvat, sää, tarinat.',
    benefit3Title: 'Jaa Instagramiin yhdellä napilla',
    benefit3Body: 'Jokainen merkintä viedään pystytarinaksi, jonka kaverit oikeasti avaavat.',
    footnote: 'Ilmaiset matkapäiväkirjat · Ei luottokorttia · Tehty Suomessa',
    sentTitle: 'Tarkista sähköposti',
    sentBody:
      'Lähetimme taikalinkin osoitteeseen {email}. Klikkaa sitä ja matkablogisi on auki. Linkki vanhenee tunnissa.',
    useDifferent: 'Käytä eri sähköpostia',
    reserveEyebrow: 'Varaa sivusi',
    formH2: 'Suunnittele Lapin matkasi',
    formLead: 'Luomme matkasivusi ja lähetämme henkilökohtaisia vinkkejä matka-ajankohtasi perusteella.',
    emailLabel: 'Sähköpostisi',
    emailPlaceholder: 'sina@esimerkki.fi',
    travelLabel: 'Milloin matkustat Lappiin?',
    monthLabel: 'Kuukausi…',
    yearLabel: 'Vuosi…',
    noDates: 'Unelmoin vielä, ei päivämääriä',
    enterEmail: 'Anna sähköposti aloittaaksesi.',
    sending: 'Lähetetään taikalinkkiä…',
    submitCta: 'Varaa matkasivuni',
    months: [
      'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
      'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
    ],
  },
  unsubscribe: {
    pageTitle: 'Peru tilaus | Lapland.blog',
    pageDescription: 'Peru Lapland.blog-uutiskirjeen tilaus. Yksi klikkaus, ei pahaa mieltä.',
    eyebrow: 'Uutiskirje',
    h1: 'Peru tilaus',
    successTitle: 'Tilauksesi on peruttu.',
    successBody:
      'Harmi nähdä sinun lähtevän. Et saa enää viestejä Lapland.blogilta. Jos muutat mielesi, tilauslomake on jokaisella sivulla.',
    backHome: '← Takaisin etusivulle',
    lead: 'Anna sähköposti, jolla tilasit. Yksi klikkaus ja olet ulkona. Ei "oletko varma" -kierroksia, ei kyselyä.',
    emailPlaceholder: 'sahkoposti@esimerkki.fi',
    processing: 'Käsitellään…',
    submit: 'Peru tilaus',
  },
  notFound: {
    pageTitle: 'Ei löytynyt | Lapland.blog',
    pageDescription: 'Tätä sivua ei ole olemassa. Se on ehkä siirretty, nimetty uudelleen tai kadonnut hankeen.',
    eyebrow: 'Ei löytynyt · 404',
    h1: 'Eksyitkö hankeen.',
    body: 'Tätä sivua ei ole, tai sitä ei ole vielä. Joka tapauksessa muu blogi on tästä.',
    backHome: 'Takaisin etusivulle',
    allStories: 'Kaikki jutut →',
  },
  chrome: {
    readTheStory: 'Lue tarina',
    shareThisStory: 'Jaa tämä tarina',
    inThisStory: 'Tässä tarinassa',
    fieldJournalEntry: 'Kenttäpäiväkirjan merkintä',
    liveTripBlog: 'Live-matkablogi',
    yoursCouldBeNext: 'Sinun voisi olla seuraava tässä karusellissa.',
    featuredBadge: 'Nostettu',
    minRead: 'min lukuaika',
  },
};

const de: SectionCopy = {
  nav: {
    startHere: 'Hier starten',
    topReads: 'Beliebt',
    destinations: 'Reiseziele',
    tripDiaries: 'Reisetagebücher',
    about: 'Über uns',
    startYourBlog: 'Eigenen Blog starten',
    signIn: 'Anmelden',
    subscribe: 'Abonnieren',
    myTripBlog: 'Mein Reiseblog',
    adminDashboard: 'Administration',
    signOut: 'Abmelden',
    signedInAs: 'Angemeldet als',
  },
  footer: {
    networkBadge: 'Finnisches Lappland-Netzwerk',
    tagline: 'Das digitale Zuhause für Reisen in das finnische Lappland.',
    travelGuide: 'Lappland-Reiseführer',
    aboutEyebrow: 'Über LaplandVibes',
    aboutBody:
      'Redaktioneller Leitfaden zum finnischen Lappland, von den Nordlichtern (revontulet) bis zur Mitternachtssonne. Sorgfältig recherchierte Routen, ehrliche Berichte und die praktischen Details, die Sie für die Planung einer Arktis-Reise brauchen.',
    aboutBadge: 'Unabhängig betrieben · Quellen genannt',
    spottedError: {
      title: 'Fehler entdeckt?',
      body: 'Etwas stimmt nicht? Sagen Sie uns Bescheid. Wir korrigieren es.',
      cta: 'Fehler melden →',
    },
    partner: {
      title: 'Partner werden',
      body: 'Werben oder kooperieren auf 27 Lappland-Seiten.',
      cta: 'Kontakt aufnehmen →',
    },
    press: {
      title: 'Presse & Medien',
      body: 'Redaktionelle Kooperationen und Pressemappen.',
      cta: 'Presseanfragen →',
    },
    copyright: 'Teil des #LaplandVibes-Netzwerks',
    websiteBy: 'Website von Yrityspaketit.fi',
    privacy: 'Datenschutz',
    cookiePolicy: 'Cookie-Richtlinie',
    terms: 'Nutzungsbedingungen',
    contact: 'Kontakt',
    groups: { stay: 'Übernachten', eatDrink: 'Essen & Trinken', do: 'Erleben', explore: 'Entdecken', essentials: 'Praktisches' },
  },
  newsletter: {
    eyebrow: 'Der #LaplandVibes-Newsletter',
    h2: 'Lappland direkt in Ihr Postfach, aus Finnland.',
    lead:
      'Polarlicht-Warnungen, wenn der Kp-Index steigt, die Buchungsfenster für Hütten und Touren, bevor sie ausverkauft sind, und saisonale Reisenotizen aus Finnland. Kein Spam, keine Füllung. Nur, wenn es wirklich der Rede wert ist.',
    placeholder: 'ihre@email.de',
    subscribing: 'Wird abonniert…',
    subscribe: 'Abonnieren',
    successTitle: 'Sie sind dabei.',
    successBody: 'Prüfen Sie Ihr Postfach. Eine Willkommens-E-Mail ist unterwegs. Die nächste Polarlicht-Warnung kommt, sobald die Prognose günstig steht.',
    alreadyTitle: 'Sie stehen schon auf der Liste.',
    alreadyBody: 'Sieht so aus, als wären Sie bereits abonniert. Die Lappland-Updates kommen weiter.',
    agreeText: 'Mit dem Abonnement akzeptieren Sie unsere',
    privacyLink: 'Datenschutzerklärung',
    unsubscribeNote: 'Jederzeit abbestellbar.',
  },
  cookieBanner: {
    headline: 'Kurze Notiz zu Cookies',
    body: 'Wir verwenden ein paar notwendige Cookies, damit die Seite funktioniert, plus optionale Analyse, damit wir wissen, welche Einträge gelesen werden. Sie entscheiden.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  home: {
    heroEyebrow: 'Reisetagebuch · Karte · Teilen',
    heroLine1: 'Reise ins Lappland?',
    heroLine2: 'Starten Sie einen Blog Ihrer Reise.',
    heroLead:
      'Markieren Sie, wo Sie die Nordlichter sahen. Fotografieren Sie die Hütte. Notieren Sie die Temperatur. Bauen Sie einen schönen Blog Ihrer Reise, einen, dem Ihre Freunde wirklich folgen können.',
    heroPrimaryCta: 'Reiseblog starten',
    heroSecondaryCta: 'So funktioniert es',
    heroFootnote: 'Kostenlos · Aus Finnland · Auf Instagram teilen · Keine Werbung',
    seasonalBadge: 'Jetzt Saison · Mitternachtssonne · 6.6. → 7.7.',
    seasonalH2: 'Ein kostenloser Reiseblog für deine Lappland-Reise, unterwegs geschrieben.',
    seasonalLead:
      'Lapland.blog macht aus deiner Reise einen einfachen, schönen Blog: Orte markieren, Fotos hinzufügen, festhalten, was passiert ist, und den Link mit Freunden teilen. Gerade jetzt heißt das Sommer. Zweiunddreißig Nächte, in denen die Sonne nicht untergeht, der Wald bernsteinfarben wird und die Seen den Himmel spiegeln. Beginne das Tagebuch, solange du noch dort bist.',
    seasonalCta1: 'Reiseblog starten',
    seasonalCta2: 'Sommer-Einträge lesen',
    seasonalCard1Title: '24 Stunden goldene Stunde',
    seasonalCard1Body: 'Die Sonne streift den Horizont. Fotografen nennen es die längste blaue Stunde der Erde.',
    seasonalCard2Title: 'Moltebeer-Saison (lakka)',
    seasonalCard2Body: 'Ende Juli: das Moor wird golden. Einheimische sprechen von der zweiten Ernte.',
    seasonalCard3Title: 'Sauna, dann ein Sprung ins Wasser',
    seasonalCard3Body: '14 °C See um Mitternacht, 90 °C Sauna fünf Schritte entfernt. Wiederholen.',
    seasonalCard4Title: 'Niemand sonst da',
    seasonalCard4Body: 'Die Hütten, die im Winter ausgebucht sind, stehen im Juli leer. Derselbe Wald, keine Schlange.',
    seasonalLabels: { light: '01 · Licht', forest: '02 · Wald', water: '03 · Wasser', quiet: '04 · Stille' },
    howEyebrow: 'So funktioniert es',
    howH2Pre: 'Drei Schritte. Eine Reise.',
    howH2Italic: 'Ein Blog, den man behalten will.',
    howLead:
      'Lapland.blog ist eine kostenlose Reisetagebuch-Plattform für Besucher des finnischen Lapplands. Ihre Reise wird zu einem Blog, den Sie wirklich teilen möchten.',
    howStep1Kicker: 'Schritt 01 · Planen',
    howStep1Title: 'Orte markieren.',
    howStep1Body:
      'Setzen Sie Stecknadeln auf die Lappland-Karte für die gebuchte Hütte, das Restaurant und den dunklen Ort für die Nordlichter. Planen Sie die Route, bevor Sie fliegen.',
    howStep2Kicker: 'Schritt 02 · Schreiben',
    howStep2Title: 'Unterwegs schreiben.',
    howStep2Body:
      'Vom Handy aus, in der Hütte, im Auto, in der Sauna. Fotos hinzufügen, Temperatur, wie die Suppe schmeckte. Jeder Eintrag hängt sich an Tag und Ort.',
    howStep3Kicker: 'Schritt 03 · Teilen',
    howStep3Title: 'Ihre Reise, gut erzählt.',
    howStep3Body:
      'Ihre Einträge werden zu einem öffentlichen Blog unter lapland.blog/ihr-name. Freunde können folgen. Jeder Beitrag wird als Instagram-Story exportiert, damit die Reise doppelt lebt.',
    howCta: 'Reiseblog starten',
    howFootnote: 'Kostenlos für Reisetagebücher · Keine Karte nötig · Anmeldung mit Google',
    liveEyebrow: 'Aktive Reiseblogs',
    liveH2Pre: 'Echte Reisen.',
    liveH2Italic: 'Echte Reisende.',
    liveH2Tail: 'Ihrer ist der nächste.',
    liveLead:
      'Schwarze Pisten in Levi. Nordlichter-Jagd in Inari. 60 km mit dem Hundeschlitten (huskysafari) in Saariselkä. Jeder Blog hier ist auf einer einzigen Reise entstanden, und in unter fünf Minuten aufgesetzt.',
    liveBrowseAll: 'Alle Blogs ansehen',
    liveCta: 'Eigenen Reiseblog starten',
    liveFootnote: 'Kostenlos · Keine Karte · 2 Minuten bis zum ersten Eintrag',
    featuredEyebrow: 'Beispiel-Tagebuch der Redaktion',
    featuredEvery: 'Alle Einträge →',
    featuredLead:
      'So könnte Ihr eigener Reiseblog aussehen. Die fünf unten stehenden Einträge schrieb The Field Journal, die redaktionelle Stimme von Lapland.blog, über einen Lappland-Winter hinweg. Echte Temperaturen, echte Hütten, echte Suppe. Lesen Sie einen und stellen Sie sich Ihren eigenen vor.',
    featuredLoading: 'Beispiel wird geladen…',
    featuredNone: 'Noch keine Beispiel-Einträge.',
    featuredReadEntry: 'Diesen Eintrag lesen',
    pillarsEyebrow: 'Worüber schreiben',
    pillarsH2Pre: 'Die Lappland-Reise,',
    pillarsH2Italic: 'in drei Strängen.',
    pillarsLead:
      'Sehen Sie, was andere Reisende notiert haben, und wählen Sie die Stränge, über die Sie selbst schreiben. Nordlichter, Hütten, Essen, die Kälte, die Menschen, die Stille dazwischen.',
    pillar1Kicker: 'I · Die Kälte',
    pillar1Title: 'Was die Kälte wirklich macht',
    pillar1Body:
      'Nordlicht-Nächte, die Polarnacht (kaamos), die acht Jahreszeiten, die die meisten Listen vergessen. Das Wetter ist hier die Hauptfigur, nicht die Kulisse. Feldnotizen darüber, wie sich −23 °C um 03:47 anfühlen, und was sie mit einem Handy-Akku und mit einem Menschen anstellen.',
    pillar2Kicker: 'II · Das Obdach',
    pillar2Title: 'Wo Sie schlafen, wo Sie essen',
    pillar2Body:
      'Holzhütten, Glasiglus, Saunen, die funktionieren, und solche, die es nicht tun. Die 42-Euro-Lachssuppe, die ihren Preis wert war. Das Roggenbrot, das einen Rucksack überlebt, und der Kaffee um 2 Uhr morgens, weil die Sonne vergessen hat unterzugehen.',
    pillar3Kicker: 'III · Die anderen Menschen',
    pillar3Title: 'Wer hier sonst lebt',
    pillar3Body:
      'Rentierzüchter (Sámi), Skipatrouilleure, Saunameister, der Tankwart bei Sodankylä, der vier Sprachen sprach. Lappland ist still, aber nie leer. Längere Stücke über die Menschen, denen man wirklich begegnet.',
    latestEyebrow: 'Beispiel-Einträge',
    latestH2: 'So sieht ein Reiseblog aus.',
    latestEvery: 'Alle Einträge',
    latestLoading: 'Geschichten werden geladen…',
    asideEyebrow: 'Warum es das gibt',
    asideH2: 'Lappland ist keine Broschüre. Ihre Reise sollte es auch nicht sein.',
    asideP1:
      'Jedes Jahr kommen Tausende Besucher nach Lappland, sehen etwas Außergewöhnliches und verlieren es an eine Handy-Galerie, die sie nie wieder öffnen. Die Nordlichter über der Hütte. Der taubfingrige Rückweg von der Sauna. Die Schale Lachssuppe, die irgendwie 42 € wert war. Weg in einer Woche.',
    asideP2:
      'Lapland.blog ist ein kleines kostenloses Werkzeug, um das zu beheben. Markieren Sie, wo Sie waren. Schreiben Sie auf, was Sie sahen. Fotografieren Sie die Suppe. Wenn Sie nach Hause fliegen, haben Sie einen echten Blog Ihrer Reise: einen, dem Ihre Freunde wirklich folgen können und den Sie in fünf Jahren noch lesen wollen. Keine Stockfotos. Kein "magisches Winterwunderland". Nur Ihre eigene ehrliche Version des Ortes.',
    asideCta1: 'Eigenen starten',
    asideCta2: 'Über lapland.blog',
    asidePill: 'Ihre Reise · Ihr Blog',
    travelJournalBadge: 'Kostenlos für Reisetagebücher',
    faqHeading: 'Häufige Fragen zu lapland.blog',
    faq: [
      {
        q: 'Wie starte ich einen Reiseblog auf lapland.blog?',
        a: 'Melden Sie sich mit Ihrem Google-Konto an, geben Sie Ihrem Blog einen Namen und schreiben Sie Ihren ersten Eintrag. Jeder Eintrag kann Text, Fotos, das Datum und eine Kartennadel für Ihren Standort enthalten. Ihr Blog liegt unter lapland.blog/ihr-name und ist sofort nach dem Veröffentlichen teilbar. Es gibt nichts zu installieren und keine Einrichtung außer der Anmeldung.',
      },
      {
        q: 'Ist lapland.blog kostenlos?',
        a: 'Ja. Einen Blog starten, Einträge schreiben, Fotos hinzufügen, Orte auf der Karte markieren und Ihren Blog teilen ist alles kostenlos. Für die Anmeldung ist keine Karte nötig, und auf Ihrem Blog gibt es keine Werbung.',
      },
      {
        q: 'Kann ich meinen Lappland-Blog auf Instagram und Facebook teilen?',
        a: 'Ja. Jeder Blog hat einen öffentlichen Link, den Sie überall posten können, und jeder Eintrag lässt sich als Bild im Instagram-Story-Format exportieren, sodass Sie einen einzelnen Tag mit einem Tipp teilen. Freunde und Familie können Ihren Blog ohne eigenes Konto öffnen.',
      },
      {
        q: 'Muss ich in Lappland sein, um hier einen Blog zu schreiben?',
        a: 'Nein. Wir haben lapland.blog für Reisende nach Finnisch-Lappland gebaut, daher sind Karte und Schreibimpulse auf Reisen in den Norden abgestimmt, aber jeder kann hier einen Blog führen, ob Sie eine Reise planen, währenddessen schreiben oder ihn nach der Heimkehr füllen. Sie können vor dem Abflug beginnen und Tag für Tag Einträge hinzufügen.',
      },
      {
        q: 'Worüber sollte ich in meinem Lappland-Reisetagebuch schreiben?',
        a: 'Über alles, was Sie nicht vergessen wollen. Wo Sie übernachtet haben, wie die Polarlichter aussahen, die Temperatur am kältesten Morgen, das Essen, das Sie überrascht hat, die Huskyfahrt, die Stille des Waldes. Kurze Einträge mit einem Foto und einer Ortsnadel funktionieren gut. Ein paar Zeilen am Tag ergeben einen Blog, den man gern wieder liest.',
      },
    ],
  },
  startHere: {
    eyebrow: 'Willkommen',
    h1: 'Hallo. Drei Wege hinein.',
    lead:
      'Lapland.blog ist eine kostenlose, ruhige, bildgetragene Reisetagebuch-Seite für Menschen, die tatsächlich ins finnische Lappland reisen. Ob Sie eine Reise planen, mittendrin sind oder zurück sind und es bereuen, nichts notiert zu haben, wählen Sie Ihren Weg.',
    path1Kicker: '01 · Planen',
    path1Title: 'Ich plane eine Reise ins Lappland.',
    path1Body:
      'Wo übernachten, wie hinkommen, was tun, wo essen: die praktische Seite. Springen Sie zu den LaplandVibes-Schwesterseiten, die Buchungen abwickeln.',
    path1Cta: 'Reise planen',
    path2Kicker: '02 · Lesen',
    path2Title: 'Ich möchte lesen, was andere geschrieben haben.',
    path2Body:
      'Sorgfältig ausgewählte Einträge aus Finnland: Hütten-Packliste, die Lachssuppen-Nacht, Nordlichter über Kemi. Echte Temperaturen, echte Uhrzeit, kein Broschüren-Ton.',
    path2Cta: 'Beliebt',
    path3Kicker: '03 · Schreiben',
    path3Title: 'Ich bin hier. Ich will einen Blog von meiner Reise.',
    path3Body:
      'Anmelden per E-Mail oder Google. Sie bekommen eine eigene Ecke auf lapland.blog. Orte markieren, Einträge schreiben, mit Freunden teilen. Kostenlos, kein Haken, keine Premium-Stufe.',
    path3Cta: 'Eigenen Blog starten',
    planEyebrow: 'Reise planen',
    planH2: 'Die praktische Seite, auf den Schwesterseiten.',
    planLead:
      'Lapland.blog ist das Tagebuch. Die Buchungen passieren auf den LaplandVibes-Speichen, jede konzentriert sich auf das, was sie gut kann.',
    planStay: {
      kicker: 'Übernachten',
      title: 'Hütten, Iglus, Hotels',
      body: 'Hunderte Lappland-Unterkünfte vergleichen: Glasiglus, Holzhütten, Skiressorts.',
    },
    planTransport: {
      kicker: 'Hinkommen',
      title: 'Flüge, Züge, Busse',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: Flüge, Nachtzüge, die praktischen Routen.',
    },
    planDo: {
      kicker: 'Erleben',
      title: 'Husky, Schneemobil, Sauna',
      body: 'Buchbare Aktivitäten direkt von den Anbietern, mit Bewertungen, keine Pressemitteilung.',
    },
    planEat: {
      kicker: 'Essen',
      title: 'Essen & Trinken',
      body: 'Wo es sich wirklich zu essen lohnt: die Lachssuppe, das Roggenbrot, die Bars, die bessere Jahrzehnte gesehen haben.',
    },
    planAllSites: 'Oder alle 26 Seiten auf laplandvibes.com ansehen',
    onlyEyebrow: 'Wenn Sie nur einen lesen',
    onlyH2: 'Lesen Sie diesen.',
    onlyLead: 'Der neueste Feldtagebuch-Eintrag. Echte Temperatur, echte Uhrzeit, kein Broschüren-Ton.',
    thenEyebrow: 'Dann diese',
    thenH2: 'Mehr aus dem Feld.',
    everyEntry: 'Alle Einträge',
  },
  about: {
    pageTitle: 'Über uns | Lapland.blog',
    pageDescription:
      'Lapland.blog ist eine kostenlose Reisetagebuch-Plattform für Besucher des finnischen Lapplands. Orte markieren, Einträge schreiben, mit Freunden teilen.',
    eyebrow: 'Über die Plattform',
    h1: 'Ein Reisetagebuch, das man behalten möchte.',
    lead:
      'Lapland.blog ist eine kostenlose Reisetagebuch-Plattform für Besucher des finnischen Lapplands. Markieren Sie, wo Sie die Nordlichter sahen. Fotografieren Sie die Hütte. Notieren Sie, was die Temperatur tat. Wenn Sie nach Hause fliegen, haben Sie einen Blog Ihrer Reise: einen, dem Ihre Freunde wirklich folgen können und den Sie in fünf Jahren noch lesen wollen.',
    intro:
      'Die meisten Lappland-Blogs lesen sich wie eine Broschüre. Die meisten Reisetagebuch-Apps werden entweder in der Handy-Galerie aufgegeben oder als einzelner Instagram-Post geteilt, der nach einem Tag verschwindet. Lapland.blog ist das Dazwischen: ein echter, ruhiger, bildgetragener Blog Ihrer Reise, gehostet unter einem Namen, der bereits Besucher anzieht, so lange aufbewahrt, wie Sie es wünschen.',
    howHeading: 'So funktioniert es',
    howStepPin: 'Markiere die Hütte, das Restaurant, den Dark-Sky-Spot. Bau deine Route schon vor dem Abflug.',
    howStepWrite: 'Schreib unterwegs, aus der Hütte, dem Auto, der Sauna. Füge Fotos, die Temperatur und den Geschmack der Suppe hinzu.',
    howStepShare: 'Deine Einträge werden zu einem öffentlichen Blog unter lapland.blog/dein-name. Freunde können folgen; jeder Eintrag lässt sich als Instagram-Story exportieren.',
    howBody:
      'Anmelden per E-Mail oder Google. Sie bekommen Ihren Bereich unter lapland.blog/me. Jeder Eintrag bekommt ein Titelbild, einen Orts-Pin und Ihre Worte. Entwürfe speichern, bei Bereitschaft veröffentlichen, Link mit Freunden teilen. Jeder veröffentlichte Eintrag wird indexiert und ist durchsuchbar, und Ihre Reise wird Teil des größeren Lappland-Archivs.',
    freeHeading: 'Was kostenlos ist',
    freeBody:
      'Einträge schreiben. Den Reiseblog unter lapland.blog/me/ihrname hosten. Fotos. Der Newsletter. Es gibt keine Bezahlschranke und keine Premium-Stufe auf der Schreiberseite.',
    notHeading: 'Was Sie hier nicht finden',
    notBody:
      'Gesponserte Beiträge in Leser-Einträgen. Affiliate-Einkaufslisten, in Ihren Blog gestopft. Die Wörter "unvergesslich", "Bucket List", "magisch" oder "Winterwunderland" sind aus den redaktionellen Entwürfen verbannt und auch in Ihren einen Bann wert. Sie sind schlecht fürs Schreiben und schlecht für Leser.',
    seedHeading: 'Die Beispiel-Einträge',
    seedBody:
      'Die fünf bereits vorhandenen Einträge schrieb The Field Journal, die redaktionelle Stimme von Lapland.blog. Sie zeigen, wie sich ein ehrlicher, ruhiger, bildgetragener Reiseblog lesen kann: echte Temperaturen, echte Uhrzeiten, kein Broschüren-Ton. Lesen Sie einen und stellen Sie sich Ihren eigenen vor.',
    networkHeading: 'Über das Netzwerk',
    networkBody:
      'Lapland.blog ist Teil des LaplandVibes-Ökosystems, eines Netzwerks finnisch geführter Seiten über Lappland. Die anderen Seiten sagen Ihnen, wohin, wo Sie übernachten und was Sie tun können. Diese ist die, in der die Reise selbst aufgeschrieben wird.',
    contactHeading: 'Kontakt',
    contactBody:
      'Wenn Sie hallo sagen, einen Sachfehler korrigieren oder ein Foto schicken möchten, das wir mit Credit nennen können: info@lapland.blog. Wir lesen alles und versuchen, innerhalb einer Woche zu antworten.',
    closing: 'Geschrieben aus dem finnischen Lappland, bei der Temperatur und zur Stunde, in der es tatsächlich passierte.',
    ctaPrimary: 'Eigenes Tagebuch starten →',
    ctaSecondary: 'Oder',
    ctaSecondaryLink: 'zuerst die Beispiel-Einträge lesen',
  },
  destinations: {
    pageTitle: 'Reiseziele | Lapland.blog',
    pageDescription:
      'Die acht wichtigsten Ziele im finnischen Lappland: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Lesen Sie die Einträge.',
    eyebrow: 'Wohin gehen',
    h1Pre: 'Acht Orte.',
    h1Italic: 'Ein Lappland.',
    lead:
      'Wählen Sie ein Ziel und lesen Sie die Einträge von dort. Leere sind die nächsten zum Schreiben, Sie können der/die Erste sein.',
    beTheFirst: 'Erste/r sein',
    entrySingular: 'Eintrag',
    entryPlural: 'Einträge',
    readEntries: 'Einträge lesen',
    beFirstWrite: 'Schreiben Sie als Erste/r',
    findStayPrefix: 'Unterkunft finden in',
    dontSeeEyebrow: 'Ihren Ort nicht dabei?',
    plantH2: 'Setzen Sie die Fahne.',
    plantLead:
      'Sie reisen woanders hin? Sodankylä, Posio, Kilpisjärvi, Hetta. Schreiben Sie den ersten Eintrag, wir setzen ihn auf die Karte.',
    plantCta: 'Eigenen Blog starten',
  },
  topReads: {
    pageTitle: 'Beliebt | Lapland.blog',
    pageDescription:
      'Wo Sie auf Lapland.blog anfangen sollten. Kuratierte Listen: beste Einträge für Erstbesucher, beste Nordlicht-Stücke, beste Essen-Einträge, die saisonalen.',
    eyebrow: 'Kuratierte Listen der Redaktion',
    h1: 'Meistgelesene.',
    lead:
      'Wo anfangen. Vom Redakteur gewählt, nicht von Klicks. Die Listen wachsen, sobald weitere Feldtagebuch-Einträge erscheinen.',
    onlyEyebrow: 'Wenn Sie nur einen lesen',
    onlyH2: 'Die Nummer 1 der Redaktion.',
    onlyLead:
      'Nordlichter über dem Bottnischen Meerbusen, −23 °C um 3:47 Uhr, und das Foto, das niemand bekam. Das Stück, das die Stimme von Lapland.blog definiert.',
    firstTimersEyebrow: 'Für Erstbesucher',
    firstTimersTitle: 'Drei Einträge, die Sie vor der Reise lesen sollten.',
    firstTimersSubtitle:
      'Warum man Nordlichter meist falsch versteht, was in den Hüttenrucksack gehört und warum die Polarnacht eigentlich in Ordnung ist. Lesen Sie diese und Sie kommen weniger überrascht an.',
    auroraEyebrow: 'Nordlicht-Stücke',
    auroraTitle: 'Die Nachthimmel-Einträge.',
    auroraSubtitle: 'Über die Jagd, die Fotografie und die Nächte, in denen sie trotzdem kommen.',
    cabinsEyebrow: 'Die Hütten',
    cabinsTitle: 'Mökki-Einträge.',
    cabinsSubtitle:
      'Wie es in einer finnischen Waldhütte (mökki) wirklich ist: Feuer, Sauna, Stille, und das, was niemand über das Plumpsklo bei −30 °C erwähnt.',
    foodEyebrow: 'Essen & Trinken',
    foodTitle: 'Die Küchen-Stücke.',
    foodSubtitle:
      '42-Euro-Lachssuppe, Roggenbrot, das einen Rucksack übersteht, und der Kaffee um 2 Uhr morgens, weil die Sonne vergaß unterzugehen.',
    seasonalEyebrow: 'Saisonal',
    seasonalTitle: 'Was die Kälte wirklich macht.',
    seasonalSubtitle:
      'Kaamos (Polarnacht), die acht Lappland-Jahreszeiten, die die meisten Listen vergessen, und die kleine Aufgabe, ohne Sonne durch den Dezember zu kommen.',
    ctaEyebrow: 'Als Nächstes Ihre Reise?',
    ctaH2: 'Werden Sie der nächste Eintrag auf dieser Seite.',
    ctaLead:
      'Die Listen oben wachsen, wenn Leser schreiben. Anmelden, ein paar Einträge schreiben, und die Redaktion hebt die hervor, die es verdienen.',
    ctaButton: 'Eigenen Blog starten',
  },
  archive: {
    pageTitle: 'Alle Geschichten | Lapland.blog',
    pageDescription:
      'Jede Geschichte auf Lapland.blog. Nordlichter, Hütten, Essen, Jahreszeiten, Menschen, Ausrüstung und lange Stücke aus dem finnischen Lappland.',
    eyebrow: 'Archiv',
    h1: 'Jede Geschichte.',
    lead:
      'Kein Algorithmus, kein Kuratierungs-Trick. Das Neueste oben. Mit dem Filter eingrenzen oder suchen, wenn Sie schon wissen, was Sie wollen.',
    all: 'Alle',
    filterAria: 'Nach Kategorie filtern',
    searchSr: 'Geschichten suchen',
    searchPlaceholder: 'Titel, Tags suchen…',
    loading: 'Geschichten werden geladen…',
    emptyTitle: 'Keine passenden Geschichten.',
    emptyBody: 'Filter leeren oder ein anderes Stichwort versuchen.',
  },
  category: {
    allStoriesBack: 'Alle Geschichten',
    categoryPrefix: 'Kategorie',
    storySingular: 'Geschichte',
    storyPlural: 'Geschichten',
    loading: 'Geschichten werden geladen…',
    emptyTitle: 'Hier ist noch nichts.',
    emptyBody: 'Diese Kategorie wartet auf ihre erste Geschichte. Schauen Sie bald wieder vorbei.',
    emptyLink: 'Alle Geschichten ansehen →',
    keepExploringEyebrow: 'Weiter entdecken',
    otherThemes: 'Andere Themen',
  },
  post: {
    allStories: 'Alle Geschichten',
    by: 'Von',
    minRead: 'Min. Lesezeit',
    loadingStory: 'Geschichte wird geladen…',
    readNextEyebrow: 'Als Nächstes lesen',
    readNextH2: 'Mehr aus dem Tagebuch',
    tagged: 'Schlagwörter',
    exploreMore: 'Mehr aus dem LaplandVibes-Netzwerk',
    editorialLabel: 'Ein Field-Journal-Eintrag',
    editorialNote: 'Einer von wenigen Beispiel-Einträgen, geschrieben von The Field Journal, der redaktionellen Stimme von Lapland.blog, um zu zeigen, wie ein ehrliches Reisetagebuch klingt. Echte Orte, echte Temperaturen. Deine eigenen Einträge schreibst du selbst.',
  },
  signIn: {
    pageTitle: 'Planen Sie Ihre Lappland-Reise | Lapland.blog',
    pageDescription:
      'Eine kostenlose Reise-Seite, persönliche Tipps und die besten Angebote für Ihre Lappland-Reise. Sagen Sie uns, wann Sie kommen, und wir helfen.',
    back: 'Zurück',
    eyebrow: 'Ihre kostenlose Reise-Seite',
    h1Pre: 'Planen Sie Ihre',
    h1Italic: 'Lappland-Reise.',
    lead:
      'Ihre eigene Seite unter lapland.blog/ihrname. Schreiben Sie Ihre Reise auf, teilen Sie Fotos und erhalten Sie persönliche Tipps und Angebote. Sagen Sie uns, wann Sie kommen, und wir helfen bei jedem Schritt.',
    benefit1Title: 'Markieren Sie Ihre Route auf der Lappland-Karte',
    benefit1Body: 'Hütte, Restaurant, Nordlicht-Spot: vor dem Flug setzen.',
    benefit2Title: 'Schreiben Sie Einträge vom Handy',
    benefit2Body: 'Aus der Hütte, dem Auto, der Sauna. Fotos, Wetter, Geschichten.',
    benefit3Title: 'Mit einem Tipp auf Instagram teilen',
    benefit3Body: 'Jeder Eintrag exportiert als vertikale Story, die Freunde tatsächlich öffnen.',
    footnote: 'Kostenlose Reisetagebücher · Keine Kreditkarte · Aus Finnland',
    sentTitle: 'Sehen Sie in Ihrem Postfach nach',
    sentBody:
      'Wir haben einen Magic Link an {email} gesendet. Klicken Sie ihn an, und Ihr Reiseblog ist live. Der Link läuft in einer Stunde ab.',
    useDifferent: 'Andere E-Mail verwenden',
    reserveEyebrow: 'Ihre Seite reservieren',
    formH2: 'Planen Sie Ihre Lappland-Reise',
    formLead: 'Wir richten Ihre Reise-Seite ein und senden persönliche Tipps passend zu Ihrer Reisezeit.',
    emailLabel: 'Ihre E-Mail',
    emailPlaceholder: 'sie@beispiel.de',
    travelLabel: 'Wann reisen Sie nach Lappland?',
    monthLabel: 'Monat…',
    yearLabel: 'Jahr…',
    noDates: 'Ich träume noch, kein Datum',
    enterEmail: 'Bitte geben Sie Ihre E-Mail ein.',
    sending: 'Magic Link wird gesendet…',
    submitCta: 'Meine Reise-Seite reservieren',
    months: [
      'Januar','Februar','März','April','Mai','Juni',
      'Juli','August','September','Oktober','November','Dezember',
    ],
  },
  unsubscribe: {
    pageTitle: 'Abbestellen | Lapland.blog',
    pageDescription: 'Den Lapland.blog-Newsletter abbestellen. Ein Klick, kein böses Blut.',
    eyebrow: 'Newsletter',
    h1: 'Abbestellen',
    successTitle: 'Sie sind abgemeldet.',
    successBody:
      'Schade, dass Sie gehen. Sie erhalten keine weiteren E-Mails von Lapland.blog. Wenn Sie es sich anders überlegen, das Anmeldeformular ist auf jeder Seite.',
    backHome: '← Zurück zur Startseite',
    lead: 'Geben Sie die abonnierte E-Mail ein. Ein Klick und Sie sind draußen. Keine "Sind Sie sicher?"-Schleifen, keine Umfrage.',
    emailPlaceholder: 'ihre@email.de',
    processing: 'Wird verarbeitet…',
    submit: 'Abbestellen',
  },
  notFound: {
    pageTitle: 'Nicht gefunden | Lapland.blog',
    pageDescription: 'Diese Seite gibt es nicht. Vielleicht verschoben, umbenannt oder im Schnee verloren.',
    eyebrow: 'Nicht gefunden · 404',
    h1: 'Im Schnee verloren.',
    body: 'Diese Seite gibt es nicht, oder noch nicht. So oder so: der Rest des Blogs ist hier entlang.',
    backHome: 'Zurück zur Startseite',
    allStories: 'Alle Geschichten →',
  },
  chrome: {
    readTheStory: 'Geschichte lesen',
    shareThisStory: 'Diese Geschichte teilen',
    inThisStory: 'In dieser Geschichte',
    fieldJournalEntry: 'Feldtagebuch-Eintrag',
    liveTripBlog: 'Live-Reiseblog',
    yoursCouldBeNext: 'Deiner könnte als Nächstes in diesem Karussell stehen.',
    featuredBadge: 'Empfohlen',
    minRead: 'Min. Lesezeit',
  },
};

// TODO: long-form prose strings below kept in EN as a deliberate fallback:
// they need a native ES translator pass. Chrome (nav, footer, newsletter,
// cookieBanner, hero CTAs) is fully translated.
const es: SectionCopy = {
  nav: {
    startHere: 'Empezar aquí',
    topReads: 'Lo más leído',
    destinations: 'Destinos',
    tripDiaries: 'Diarios de viaje',
    about: 'Sobre',
    startYourBlog: 'Crear su blog',
    signIn: 'Iniciar sesión',
    subscribe: 'Suscribirme',
    myTripBlog: 'Mi diario de viaje',
    adminDashboard: 'Panel de administración',
    signOut: 'Cerrar sesión',
    signedInAs: 'Sesión iniciada como',
  },
  footer: {
    networkBadge: 'Red de la Laponia finlandesa',
    tagline: 'El hogar digital del viaje por la Laponia finlandesa.',
    travelGuide: 'Guía de viajes de Laponia',
    aboutEyebrow: 'Sobre LaplandVibes',
    aboutBody:
      'Guía editorial de la Laponia finlandesa, de las auroras boreales al sol de medianoche. Rutas seleccionadas, textos honestos y el detalle práctico que necesita para planear un viaje al Ártico.',
    aboutBadge: 'Mantenido de forma independiente · fuentes citadas',
    spottedError: {
      title: '¿Vio un error?',
      body: '¿Algo que haya que corregir? Avísenos y lo corregiremos.',
      cta: 'Reportar un error →',
    },
    partner: {
      title: 'Colabore con nosotros',
      body: 'Anuncie o colabore en 27 sitios sobre Laponia.',
      cta: 'Contactar →',
    },
    press: {
      title: 'Prensa y medios',
      body: 'Colaboraciones editoriales y kits de prensa.',
      cta: 'Consultas de prensa →',
    },
    copyright: 'Parte de la red #LaplandVibes',
    websiteBy: 'Sitio web de Yrityspaketit.fi',
    privacy: 'Política de privacidad',
    cookiePolicy: 'Política de cookies',
    terms: 'Términos de uso',
    contact: 'Contacto',
    groups: { stay: 'Dormir', eatDrink: 'Comer y beber', do: 'Hacer', explore: 'Explorar', essentials: 'Esenciales' },
  },
  newsletter: {
    eyebrow: 'El boletín #LaplandVibes',
    h2: 'Laponia en su bandeja, directo desde Finlandia.',
    lead: 'Avisos de auroras cuando sube el índice Kp, las ventanas de reserva de cabañas y excursiones antes de que se agoten, y notas de viaje de temporada escritas desde Finlandia. Sin spam ni relleno. Solo cuando hay algo que merezca la pena.',
    placeholder: 'su@correo.com',
    subscribing: 'Suscribiendo…',
    subscribe: 'Suscribirme',
    successTitle: 'Está dentro.',
    successBody: 'Revise su bandeja de entrada. El correo de bienvenida está en camino, y el próximo aviso de aurora llegará cuando el cielo se despeje.',
    alreadyTitle: 'Ya está en la lista.',
    alreadyBody: 'Parece que ya está suscrito. Seguiremos enviándole los avisos de Laponia.',
    agreeText: 'Al suscribirse, acepta nuestra',
    privacyLink: 'Política de privacidad',
    unsubscribeNote: 'Cancele la suscripción cuando quiera.',
  },
  cookieBanner: {
    headline: 'Una nota corta sobre las cookies',
    body: 'Usamos algunas cookies esenciales para que el sitio funcione, además de analítica opcional para saber qué entradas se leen. Usted elige.',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  home: {
    heroEyebrow: 'Diario de viaje · Mapa · Compartir',
    heroLine1: '¿Va a Laponia?',
    heroLine2: 'Cree un blog de su viaje.',
    heroLead:
      'Marque en el mapa dónde vio las auroras. Fotografíe la cabaña. Anote lo que marcó el termómetro. Cree un blog precioso de su viaje, uno que sus amigos podrán seguir de verdad.',
    heroPrimaryCta: 'Crear su blog de viaje',
    heroSecondaryCta: 'Ver cómo funciona',
    heroFootnote: 'Gratis · Hecho en Finlandia · Compártelo en Instagram · Sin anuncios',
    seasonalBadge: 'En temporada · Sol de medianoche · 6 jun → 7 jul',
    seasonalH2: 'Un blog de viaje gratis para tu viaje a Laponia, escrito sobre la marcha.',
    seasonalLead:
      'Lapland.blog convierte tu viaje en un blog sencillo y bonito: marca los lugares, añade fotos, escribe lo que pasó y comparte el enlace con tus amigos. Ahora mismo eso significa verano. Treinta y dos noches en que el sol no se pone, el bosque se tiñe de ámbar y los lagos reflejan el cielo. Empieza el diario mientras aún estás dentro de él.',
    seasonalCta1: 'Empezar tu blog de viaje',
    seasonalCta2: 'Leer las entradas de verano',
    seasonalCard1Title: '24 h de hora dorada',
    seasonalCard1Body: 'El sol roza el horizonte. Los fotógrafos la llaman la hora azul más larga de la Tierra.',
    seasonalCard2Title: 'Temporada de mora ártica',
    seasonalCard2Body: 'Finales de julio: la turbera se vuelve dorada. Los locales la llaman la segunda cosecha.',
    seasonalCard3Title: 'Sauna y después un baño',
    seasonalCard3Body: 'Lago a 14 °C a medianoche, sauna a 90 °C a cinco pasos. Y repetir.',
    seasonalCard4Title: 'Nadie más',
    seasonalCard4Body: 'Las cabañas que en invierno se agotan están vacías en julio. El mismo bosque, sin colas.',
    seasonalLabels: { light: '01 · Luz', forest: '02 · Bosque', water: '03 · Agua', quiet: '04 · Silencio' },
    howEyebrow: 'Cómo funciona',
    howH2Pre: 'Tres pasos. Un viaje.',
    howH2Italic: 'Un blog que vale la pena conservar.',
    howLead:
      'Lapland.blog es una plataforma gratuita de diario de viaje pensada para quienes visitan la Laponia finlandesa. Su viaje se convierte en un blog que de verdad querrá compartir.',
    howStep1Kicker: 'Paso 01 · Planee',
    howStep1Title: 'Marque los lugares.',
    howStep1Body:
      'Ponga marcadores en el mapa de Laponia para la cabaña que reservó, el restaurante que quiere probar y el rincón de cielo oscuro para las auroras. Trace su ruta antes de volar.',
    howStep2Kicker: 'Paso 02 · Escriba',
    howStep2Title: 'Escriba sobre la marcha.',
    howStep2Body:
      'Desde el móvil, en la cabaña, en el coche, en la sauna. Añada fotos, la temperatura, a qué sabía la sopa. Cada entrada se ancla al día y al lugar.',
    howStep3Kicker: 'Paso 03 · Comparta',
    howStep3Title: 'Su viaje, bien contado.',
    howStep3Body:
      'Sus entradas forman un blog público en lapland.blog/su-nombre. Sus amigos pueden seguirlo. Cada entrada se exporta como historia de Instagram, así el viaje vive dos veces.',
    howCta: 'Crear su blog de viaje',
    howFootnote: 'Gratis para diarios de viaje · Sin tarjeta · Inicie sesión con Google',
    liveEyebrow: 'Blogs de viaje en directo',
    liveH2Pre: 'Viajes reales.',
    liveH2Italic: 'Viajeros reales.',
    liveH2Tail: 'El suyo es el siguiente.',
    liveLead:
      'Las pistas negras de Levi. La caza de auroras en Inari. 60 km en trineo de huskies en Saariselkä. Cada blog que ve aquí lo escribió un viajero en un solo viaje, y lo montó en menos de cinco minutos.',
    liveBrowseAll: 'Ver todos los blogs',
    liveCta: 'Crear mi blog de viaje',
    liveFootnote: 'Gratis · Sin tarjeta · 2 minutos hasta su primera entrada',
    featuredEyebrow: 'Diario de ejemplo del fundador',
    featuredEvery: 'Todas las entradas →',
    featuredLead:
      'Así podría verse su propio blog de viaje. Las cinco entradas iniciales de abajo las escribió The Field Journal, la voz editorial de Lapland.blog, a lo largo de un invierno en Laponia. Temperaturas reales, cabañas reales, sopa real. Lea una e imagine la suya.',
    featuredLoading: 'Cargando ejemplo…',
    featuredNone: 'Aún no hay entradas de ejemplo.',
    featuredReadEntry: 'Leer esta entrada',
    pillarsEyebrow: 'Qué anotar',
    pillarsH2Pre: 'El viaje a Laponia,',
    pillarsH2Italic: 'en tres hilos.',
    pillarsLead:
      'Vea lo que otros viajeros han anotado y elija los hilos sobre los que escribirá en su propio viaje. Auroras, cabañas, comida, el frío, la gente, los silencios entre medias.',
    pillar1Kicker: 'I · El frío',
    pillar1Title: 'Lo que el frío de verdad hace',
    pillar1Body:
      'Noches de auroras, la oscuridad polar, las ocho estaciones que casi todas las listas olvidan. Aquí el clima es el protagonista, no el telón de fondo. Notas de campo sobre cómo se sienten los veintitrés bajo cero a las 03:47, y lo que le hacen a la batería de un móvil, y a una persona.',
    pillar2Kicker: 'II · El refugio',
    pillar2Title: 'Dónde duerme, dónde come',
    pillar2Body:
      'Cabañas de madera, iglús de cristal, saunas que funcionan y saunas que no. El plato de sopa de salmón de cuarenta y dos euros que al final valió la pena. El pan de centeno que sobrevive a una mochila y el café que toma a las 2 de la madrugada porque el sol se olvidó de ponerse.',
    pillar3Kicker: 'III · La otra gente',
    pillar3Title: 'Quién más vive aquí arriba',
    pillar3Body:
      'Pastores de renos, patrulleros de esquí, maestros de sauna, el hombre de la gasolinera a las afueras de Sodankylä que hablaba cuatro idiomas. Laponia es silenciosa, pero nunca está vacía. Textos largos sobre la gente que de verdad se encuentra.',
    latestEyebrow: 'Entradas de ejemplo',
    latestH2: 'Vea cómo es un blog de viaje.',
    latestEvery: 'Todas las entradas',
    latestLoading: 'Cargando historias…',
    asideEyebrow: 'Por qué existe esto',
    asideH2: 'Laponia no es un folleto. Su viaje tampoco debería serlo.',
    asideP1:
      'Cada año, miles de viajeros llegan a Laponia, ven algo fuera de lo común y lo pierden en un carrete de fotos que nunca vuelven a mirar. La aurora sobre la cabaña. La vuelta de la sauna con los dedos entumecidos. El plato de sopa de salmón que de algún modo valió 42 €. Desaparecido en una semana.',
    asideP2:
      'Lapland.blog es una pequeña herramienta gratuita para remediarlo. Marque dónde estuvo. Escriba lo que vio. Fotografíe la sopa. Cuando regrese a casa tendrá un blog real de su viaje: uno que sus amigos podrán seguir de verdad y que aún querrá releer dentro de cinco años. Sin fotos de banco de imágenes. Sin «país de las maravillas invernal». Solo su propia versión honesta del lugar.',
    asideCta1: 'Empezar el suyo',
    asideCta2: 'Sobre lapland.blog',
    asidePill: 'Su viaje · Su blog',
    travelJournalBadge: 'Gratis para diarios de viaje',
    faqHeading: 'Preguntas frecuentes sobre lapland.blog',
    faq: [
      {
        q: '¿Cómo empiezo un blog de viaje en lapland.blog?',
        a: 'Inicia sesión con tu cuenta de Google, dale un nombre a tu blog y escribe tu primera entrada. Cada entrada puede incluir texto, fotos, la fecha y un pin en el mapa del lugar donde estuviste. Tu blog vive en lapland.blog/tu-nombre y está listo para compartir en cuanto lo publicas: no hay nada que instalar ni más configuración que iniciar sesión.',
      },
      {
        q: '¿Es gratis usar lapland.blog?',
        a: 'Sí. Crear un blog, escribir entradas, añadir fotos, marcar lugares en el mapa y compartir tu blog es todo gratuito. No hace falta tarjeta para registrarte y tu blog no lleva anuncios.',
      },
      {
        q: '¿Puedo compartir mi blog de Laponia en Instagram y Facebook?',
        a: 'Sí. Cada blog tiene un enlace público que puedes publicar donde quieras, y cada entrada se puede exportar como imagen del tamaño de una historia de Instagram para compartir un solo día con un toque. Tus amigos y tu familia pueden abrir tu blog sin tener cuenta propia.',
      },
      {
        q: '¿Tengo que estar en Laponia para escribir un blog aquí?',
        a: 'No. Creamos lapland.blog para quienes viajan a la Laponia finlandesa, así que el mapa y las sugerencias están pensados para viajes al norte, pero cualquiera puede llevar un blog aquí, ya estés planeando un viaje, escribiendo durante él o completándolo al volver a casa. Puedes empezar antes de volar y añadir entradas día a día.',
      },
      {
        q: '¿Sobre qué escribo en mi diario de viaje por Laponia?',
        a: 'Sobre lo que no quieras olvidar. Dónde te alojaste, cómo se veía la aurora, la temperatura de la mañana más fría, la comida que te sorprendió, el paseo en trineo de huskies, el silencio del bosque. Las entradas cortas con una foto y un pin de lugar funcionan bien: unas pocas líneas al día acaban formando un blog que querrás releer.',
      },
    ],
  },
  startHere: {
    eyebrow: 'Bienvenido',
    h1: 'Hola. Tres formas de entrar.',
    lead:
      'Lapland.blog es un sitio de diario de viaje gratuito, pausado y guiado por la imagen, para quienes de verdad van a la Laponia finlandesa. Tanto si planea un viaje, está en mitad de uno o ya volvió a casa lamentando no haberlo anotado, elija su camino.',
    path1Kicker: '01 · Planificar',
    path1Title: 'Estoy planeando un viaje a Laponia.',
    path1Body:
      'Dónde dormir, cómo llegar, qué hacer, dónde comer: la parte práctica. Pase a los sitios hermanos de LaplandVibes que se encargan de las reservas.',
    path1Cta: 'Planear su viaje',
    path2Kicker: '02 · Leer',
    path2Title: 'Quiero leer lo que escribieron otros.',
    path2Body:
      'Entradas iniciales seleccionadas desde dentro de Finlandia: hacer la maleta para la cabaña, la noche de la sopa de salmón, la aurora sobre Kemi. Temperaturas reales, hora real del día, sin voz de folleto.',
    path2Cta: 'Lo más leído',
    path3Kicker: '03 · Escribir',
    path3Title: 'Estoy aquí. Quiero un blog de mi viaje.',
    path3Body:
      'Inicie sesión con correo o con Google. Reciba su rincón en lapland.blog. Marque lugares, escriba entradas, compártalas con sus amigos. Gratis, sin trampas, sin nivel premium.',
    path3Cta: 'Crear su blog',
    planEyebrow: 'Planear su viaje',
    planH2: 'La parte práctica, en los sitios hermanos.',
    planLead:
      'Lapland.blog es el diario. Las reservas se hacen en los sitios de LaplandVibes, cada uno centrado en lo único que hace bien.',
    planStay: {
      kicker: 'Dormir',
      title: 'Cabañas, iglús, hoteles',
      body: 'Compare cientos de alojamientos de Laponia: iglús de cristal, cabañas de troncos, estaciones de esquí.',
    },
    planTransport: {
      kicker: 'Llegar',
      title: 'Vuelos, trenes, autobuses',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: vuelos, trenes nocturnos, las rutas prácticas.',
    },
    planDo: {
      kicker: 'Hacer',
      title: 'Huskies, motonieve, sauna',
      body: 'Actividades reservables de los operadores reales, con reseñas, no una nota de prensa.',
    },
    planEat: {
      kicker: 'Comer',
      title: 'Comida y bebida',
      body: 'Dónde comer de verdad: la sopa de salmón, el pan de centeno, los bares que han visto décadas mejores.',
    },
    planAllSites: 'O explore los 27 sitios en laplandvibes.com',
    onlyEyebrow: 'Si solo lee uno',
    onlyH2: 'Lea este.',
    onlyLead: 'La entrada más reciente del diario de campo. Temperatura real, hora real del día, sin voz de folleto.',
    thenEyebrow: 'Luego estos',
    thenH2: 'Más desde el terreno.',
    everyEntry: 'Todas las entradas',
  },
  about: {
    pageTitle: 'Sobre | Lapland.blog',
    pageDescription:
      'Lapland.blog es una plataforma gratuita de diario de viaje para quienes visitan la Laponia finlandesa. Marque lugares, escriba entradas, compártalas.',
    eyebrow: 'Sobre la plataforma',
    h1: 'Un diario de viaje que vale la pena conservar.',
    lead:
      'Lapland.blog es una plataforma gratuita de diario de viaje para quienes visitan la Laponia finlandesa. Marque dónde vio las auroras. Fotografíe la cabaña. Anote lo que marcó el termómetro. Cuando regrese a casa tendrá un blog de su viaje: uno que sus amigos podrán seguir de verdad y que aún querrá releer dentro de cinco años.',
    intro:
      'Casi todos los blogs sobre Laponia se leen como un folleto. Casi todas las apps de diario de viaje acaban abandonadas en el carrete del móvil o se comparten en una sola publicación de Instagram que desaparece en un día. Lapland.blog es el término medio: un blog real, pausado y guiado por la imagen de su viaje, alojado bajo un nombre que ya recibe visitas y conservado todo el tiempo que quiera.',
    howHeading: 'Cómo funciona',
    howStepPin: 'Marca la cabaña, el restaurante, el lugar de cielo oscuro. Arma tu ruta antes de volar.',
    howStepWrite: 'Escribe sobre la marcha: desde la cabaña, el coche, la sauna. Añade fotos, la temperatura y a qué sabía la sopa.',
    howStepShare: 'Tus entradas se convierten en un blog público en lapland.blog/tu-nombre. Tus amigos pueden seguirlo; cada entrada se exporta como historia de Instagram.',
    howBody:
      'Inicie sesión con su correo o con Google. Reciba un rincón en lapland.blog en lapland.blog/me. Cada entrada admite una imagen principal, un marcador de lugar y el texto que quiera escribir. Guarde borradores, publique cuando esté listo, comparta el enlace con sus amigos. Cada entrada publicada queda indexada y se puede buscar, y su viaje se convierte en una pequeña pieza del archivo mayor de Laponia.',
    freeHeading: 'Qué es gratis',
    freeBody:
      'Escribir entradas. Alojar su blog de viaje en lapland.blog/me/sunombre. Las fotos. El boletín. No hay muro de pago ni nivel premium para quien escribe.',
    notHeading: 'Qué no encontrará',
    notBody:
      'Publicaciones patrocinadas dentro de las entradas de los lectores. Listas de compra de afiliados metidas a la fuerza en su blog. Las palabras «inolvidable», «lista de deseos», «mágico» o «país de las maravillas invernal» están vetadas en los borradores editoriales, y conviene vetarlas también en los suyos. Son malas para escribir y malas para quien lee.',
    seedHeading: 'Las entradas iniciales',
    seedBody:
      'Las cinco entradas que ya están en el sitio las escribió The Field Journal, la voz editorial de Lapland.blog. Están ahí para mostrar cómo puede leerse un blog de viaje honesto, pausado y guiado por la imagen: temperaturas reales, horas reales del día, sin voz de folleto. Lea una e imagine la suya.',
    networkHeading: 'Sobre la red',
    networkBody:
      'Lapland.blog forma parte del ecosistema LaplandVibes, una red de sitios sobre Laponia de propiedad finlandesa. Los demás sitios le dicen adónde ir, dónde dormir y qué hacer. Este es donde se pone por escrito el viaje en sí.',
    contactHeading: 'Póngase en contacto',
    contactBody:
      'Si quiere saludar, corregir un dato erróneo o enviar una fotografía que podamos acreditar, escriba a info@lapland.blog. Leemos todo e intentamos responder en una semana.',
    closing: 'Escrito desde la Laponia finlandesa, a la temperatura y la hora en que de verdad ocurrió.',
    ctaPrimary: 'Empezar su propio diario →',
    ctaSecondary: 'O',
    ctaSecondaryLink: 'lea primero las entradas iniciales',
  },
  destinations: {
    pageTitle: 'Destinos | Lapland.blog',
    pageDescription:
      'Los ocho destinos principales de la Laponia finlandesa: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Lea las entradas de cada uno.',
    eyebrow: 'Adónde ir',
    h1Pre: 'Ocho lugares.',
    h1Italic: 'Una Laponia.',
    lead:
      'Elija un destino y lea las entradas escritas desde allí. Los vacíos son los siguientes por escribir, puede ser el primero.',
    beTheFirst: 'Sea el primero',
    entrySingular: 'entrada',
    entryPlural: 'entradas',
    readEntries: 'Leer las entradas',
    beFirstWrite: 'Sea el primero en escribir',
    findStayPrefix: 'Busque alojamiento en',
    dontSeeEyebrow: '¿No ve su lugar?',
    plantH2: 'Plante la bandera.',
    plantLead:
      '¿Va a un sitio que no está en esta lista? Sodankylä, Posio, Kilpisjärvi, Hetta. Escriba la primera entrada desde allí y lo añadiremos al mapa.',
    plantCta: 'Crear su blog',
  },
  topReads: {
    pageTitle: 'Lo más leído | Lapland.blog',
    pageDescription:
      'Por dónde empezar en Lapland.blog. Listas de la redacción: las mejores entradas para primerizos, sobre auroras, sobre comida y de cada temporada.',
    eyebrow: 'Listas seleccionadas por la redacción',
    h1: 'Lo más leído.',
    lead: 'Por dónde empezar. Seleccionado por la redacción, no por los clics. A medida que se publican más entradas del diario de campo, estas listas crecen.',
    onlyEyebrow: 'Si solo lee uno',
    onlyH2: 'El n.º 1 de la redacción.',
    onlyLead:
      'Auroras sobre el golfo de Botnia, veintitrés bajo cero a las 3:47, y la foto que ninguno de nosotros consiguió. El texto que define la voz de Lapland.blog.',
    firstTimersEyebrow: 'Para primerizos',
    firstTimersTitle: 'Los tres mejores para leer antes de ir.',
    firstTimersSubtitle:
      'Por qué la gente se equivoca con las auroras, qué llevar a una cabaña y por qué la oscuridad polar en realidad se lleva bien. Léalos y llegará menos sorprendido.',
    auroraEyebrow: 'Textos sobre auroras',
    auroraTitle: 'Las entradas del cielo nocturno.',
    auroraSubtitle: 'Sobre perseguirlas, fotografiarlas y las noches en que aparecen igualmente.',
    cabinsEyebrow: 'Las cabañas',
    cabinsTitle: 'Entradas de mökki.',
    cabinsSubtitle:
      'Cómo es de verdad una cabaña en el bosque finlandés: el fuego, la sauna, el silencio, y ese detalle del retrete exterior a treinta bajo cero que nadie menciona.',
    foodEyebrow: 'Comida y bebida',
    foodTitle: 'Los textos de cocina.',
    foodSubtitle:
      'Sopa de salmón de cuarenta y dos euros, pan de centeno que sobrevive a una mochila y el café que toma a las 2 de la madrugada porque el sol se olvidó de ponerse.',
    seasonalEyebrow: 'De temporada',
    seasonalTitle: 'Lo que el frío de verdad hace.',
    seasonalSubtitle:
      'El kaamos, las ocho estaciones de Laponia que casi todas las listas olvidan, y el pequeño oficio de pasar diciembre sin sol.',
    ctaEyebrow: '¿Su viaje el siguiente?',
    ctaH2: 'Sea la próxima entrada de esta página.',
    ctaLead:
      'Las listas de arriba crecen cuando escriben los lectores. Inicie sesión, escriba unas cuantas entradas y la redacción destacará las que se lo ganen.',
    ctaButton: 'Crear su blog',
  },
  archive: {
    pageTitle: 'Todas las historias | Lapland.blog',
    pageDescription:
      'Todas las historias de Lapland.blog. Auroras, cabañas, comida, estaciones, gente, equipo y lecturas largas de la Laponia finlandesa.',
    eyebrow: 'Archivo',
    h1: 'Todas las historias.',
    lead:
      'Sin algoritmo, sin trucos de selección. La más reciente arriba. Use el filtro para acotar o busque si ya sabe qué quiere encontrar.',
    all: 'Todas',
    filterAria: 'Filtrar por categoría',
    searchSr: 'Buscar historias',
    searchPlaceholder: 'Buscar títulos, etiquetas…',
    loading: 'Cargando historias…',
    emptyTitle: 'Ninguna historia coincide.',
    emptyBody: 'Pruebe a quitar el filtro o a buscar otra palabra.',
  },
  category: {
    allStoriesBack: 'Todas las historias',
    categoryPrefix: 'Categoría',
    storySingular: 'historia',
    storyPlural: 'historias',
    loading: 'Cargando historias…',
    emptyTitle: 'Aún no hay nada aquí.',
    emptyBody: 'Esta categoría espera su primera historia. Vuelva pronto.',
    emptyLink: 'Ver todas las historias →',
    keepExploringEyebrow: 'Siga explorando',
    otherThemes: 'Otros temas',
  },
  post: {
    allStories: 'Todas las historias',
    by: 'Por',
    minRead: 'min de lectura',
    loadingStory: 'Cargando historia…',
    readNextEyebrow: 'Leer a continuación',
    readNextH2: 'Más del diario',
    tagged: 'Etiquetado',
    exploreMore: 'Explore más en la red de LaplandVibes',
    editorialLabel: 'Una entrada de The Field Journal',
    editorialNote: 'Una de las pocas entradas de muestra escritas por The Field Journal, la voz editorial de Lapland.blog, para mostrar cómo se lee un diario de viaje honesto. Lugares y temperaturas reales; tus propias entradas las escribes tú.',
  },
  signIn: {
    pageTitle: 'Planee su viaje a Laponia | Lapland.blog',
    pageDescription:
      'Reciba una página de viaje gratuita, consejos personalizados y las mejores ofertas para su viaje a Laponia. Díganos cuándo viene y le ayudaremos.',
    back: 'Atrás',
    eyebrow: 'Su página de viaje gratuita',
    h1Pre: 'Planee su',
    h1Italic: 'viaje a Laponia.',
    lead:
      'Reciba su página en lapland.blog/sunombre. Escriba la historia de su viaje, comparta fotos y reciba consejos y ofertas personalizadas para su viaje. Díganos cuándo viene y le ayudaremos a planear cada paso.',
    benefit1Title: 'Marque su ruta en el mapa de Laponia',
    benefit1Body: 'Cabaña, restaurante, rincón de auroras: ponga los marcadores antes de volar.',
    benefit2Title: 'Escriba entradas desde el móvil',
    benefit2Body: 'Desde la cabaña, el coche, la sauna. Fotos, tiempo, historias.',
    benefit3Title: 'Comparta en Instagram con un toque',
    benefit3Body: 'Cada entrada se exporta como historia vertical que sus amigos de verdad abren.',
    footnote: 'Diarios de viaje gratuitos · Sin tarjeta de crédito · Hecho en Finlandia',
    sentTitle: 'Revise su bandeja de entrada',
    sentBody:
      'Enviamos un enlace mágico a {email}. Haga clic en él y su blog de viaje quedará activo. El enlace caduca en una hora.',
    useDifferent: 'Usar otro correo',
    reserveEyebrow: 'Reserve su página',
    formH2: 'Planee su viaje a Laponia',
    formLead: 'Crearemos su página de viaje y le enviaremos consejos personalizados según cuándo viaje.',
    emailLabel: 'Su correo',
    emailPlaceholder: 'usted@ejemplo.com',
    travelLabel: '¿Cuándo visita Laponia?',
    monthLabel: 'Mes…',
    yearLabel: 'Año…',
    noDates: 'Aún lo estoy soñando, sin fechas todavía',
    enterEmail: 'Introduzca su correo para empezar.',
    sending: 'Enviando el enlace mágico…',
    submitCta: 'Reservar mi página de viaje',
    months: [
      'enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre',
    ],
  },
  unsubscribe: {
    pageTitle: 'Cancelar suscripción | Lapland.blog',
    pageDescription: 'Cancele la suscripción al boletín de Lapland.blog. Un clic, sin rencores.',
    eyebrow: 'Boletín',
    h1: 'Cancelar suscripción',
    successTitle: 'Su suscripción ha sido cancelada.',
    successBody:
      'Lamentamos verle marchar. No recibirá más correos de Lapland.blog. Si cambia de opinión, el formulario de alta está en todas las páginas.',
    backHome: '← Volver al inicio',
    lead: 'Introduzca el correo con el que se suscribió. Un clic y queda fuera. Sin bucles de «¿está seguro?», sin encuestas.',
    emailPlaceholder: 'su@correo.com',
    processing: 'Procesando…',
    submit: 'Cancelar suscripción',
  },
  notFound: {
    pageTitle: 'No encontrado | Lapland.blog',
    pageDescription: 'Esta página no existe. Puede que la hayan movido, renombrado o perdido en la nieve.',
    eyebrow: 'No encontrado · 404',
    h1: 'Perdido en la nieve.',
    body: 'Esta página no existe, o aún no existe. En cualquier caso, el resto del blog está por aquí.',
    backHome: 'Volver al inicio',
    allStories: 'Todas las historias →',
  },
  chrome: {
    readTheStory: 'Leer la historia',
    shareThisStory: 'Compartir esta historia',
    inThisStory: 'En esta historia',
    fieldJournalEntry: 'Entrada del diario de campo',
    liveTripBlog: 'Blog de viaje en vivo',
    yoursCouldBeNext: 'El tuyo podría ser el próximo en este carrusel.',
    featuredBadge: 'Destacado',
    minRead: 'min de lectura',
  },
};

// PT-BR block. Full native translation. Phase 5 (2026-05-31).
const ptBR: SectionCopy = {
  nav: {
    startHere: 'Comece por aqui',
    topReads: 'Mais lidos',
    destinations: 'Destinos',
    tripDiaries: 'Diários de viagem',
    about: 'Sobre',
    startYourBlog: 'Criar seu blog',
    signIn: 'Entrar',
    subscribe: 'Inscrever-se',
    myTripBlog: 'Meu blog de viagem',
    adminDashboard: 'Painel administrativo',
    signOut: 'Sair',
    signedInAs: 'Conectado como',
  },
  footer: {
    networkBadge: 'Rede da Lapônia finlandesa',
    tagline: 'O lar digital da viagem pela Lapônia finlandesa.',
    travelGuide: 'Guia de viagem da Lapônia',
    aboutEyebrow: 'Sobre o LaplandVibes',
    aboutBody:
      'Guia editorial da Lapônia finlandesa, da aurora boreal ao sol da meia-noite. Roteiros selecionados, textos honestos e os detalhes práticos para planejar uma viagem ao Ártico.',
    aboutBadge: 'Mantido de forma independente · fontes citadas',
    spottedError: {
      title: 'Viu um erro?',
      body: 'Algo que precisa ser corrigido? Conte para a gente que vamos arrumar.',
      cta: 'Reportar um erro →',
    },
    partner: {
      title: 'Parceria com a gente',
      body: 'Anuncie ou colabore em 27 sites sobre a Lapônia.',
      cta: 'Entrar em contato →',
    },
    press: {
      title: 'Imprensa e mídia',
      body: 'Parcerias editoriais e kits de imprensa.',
      cta: 'Contato de imprensa →',
    },
    copyright: 'Parte da rede #LaplandVibes',
    websiteBy: 'Site por Yrityspaketit.fi',
    privacy: 'Política de privacidade',
    cookiePolicy: 'Política de cookies',
    terms: 'Termos de uso',
    contact: 'Contato',
    groups: { stay: 'Hospedagem', eatDrink: 'Comer e beber', do: 'O que fazer', explore: 'Explorar', essentials: 'Essenciais' },
  },
  newsletter: {
    eyebrow: 'A newsletter #LaplandVibes',
    h2: 'Lapônia na sua caixa de entrada, direto da Finlândia.',
    lead: 'Alertas de aurora quando o índice Kp sobe, as janelas de reserva de cabanas e passeios antes de esgotarem, e notas de viagem sazonais escritas da Finlândia. Sem spam, sem enrolação. Só quando vale a pena avisar.',
    placeholder: 'seu@email.com',
    subscribing: 'Inscrevendo…',
    subscribe: 'Inscrever-se',
    successTitle: 'Você está dentro.',
    successBody: 'Confira sua caixa de entrada: o e-mail de boas-vindas está a caminho, e o próximo alerta de aurora chega quando o céu clarear.',
    alreadyTitle: 'Você já está na lista.',
    alreadyBody: 'Parece que você já está inscrito. Continuaremos enviando os alertas da Lapônia.',
    agreeText: 'Ao se inscrever, você concorda com nossa',
    privacyLink: 'Política de privacidade',
    unsubscribeNote: 'Cancele quando quiser.',
  },
  cookieBanner: {
    headline: 'Uma nota rápida sobre cookies',
    body: 'Usamos alguns cookies essenciais para o site funcionar, além de analytics opcionais para saber quais entradas são lidas. A escolha é sua.',
    accept: 'Aceitar',
    decline: 'Recusar',
  },
  home: {
    heroEyebrow: 'Diário de viagem · Mapa · Compartilhar',
    heroLine1: 'Vai para a Lapônia?',
    heroLine2: 'Crie um blog da sua viagem.',
    heroLead:
      'Marque no mapa onde você viu a aurora. Fotografe a cabana. Anote o que o termômetro fez. Monte um blog bonito da sua viagem, um que seus amigos possam de fato acompanhar.',
    heroPrimaryCta: 'Criar seu blog de viagem',
    heroSecondaryCta: 'Ver como funciona',
    heroFootnote: 'Grátis · Feito na Finlândia · Compartilhe no Instagram · Sem anúncios',
    seasonalBadge: 'Na temporada · Sol da meia-noite · 6 jun → 7 jul',
    seasonalH2: 'Um blog de viagem gratuito para sua viagem à Lapônia, escrito durante o trajeto.',
    seasonalLead:
      'O Lapland.blog transforma sua viagem em um blog simples e bonito: marque os lugares, adicione fotos, escreva o que aconteceu e compartilhe o link com os amigos. Agora mesmo, isso significa verão. Trinta e duas noites em que o sol não se põe, a floresta fica âmbar e os lagos espelham o céu. Comece o diário enquanto ainda está dentro dela.',
    seasonalCta1: 'Começar seu blog de viagem',
    seasonalCta2: 'Ler as entradas de verão',
    seasonalCard1Title: '24 h de hora dourada',
    seasonalCard1Body: 'O sol roça o horizonte. Os fotógrafos a chamam de a hora azul mais longa da Terra.',
    seasonalCard2Title: 'Temporada da amora-ártica',
    seasonalCard2Body: 'Fim de julho: o pântano fica dourado. Os locais chamam de a segunda colheita.',
    seasonalCard3Title: 'Sauna e depois um mergulho',
    seasonalCard3Body: 'Lago a 14 °C à meia-noite, sauna a 90 °C a cinco passos. E repete.',
    seasonalCard4Title: 'Mais ninguém',
    seasonalCard4Body: 'As cabanas que lotam no inverno ficam vazias em julho. A mesma floresta, sem fila.',
    seasonalLabels: { light: '01 · Luz', forest: '02 · Floresta', water: '03 · Água', quiet: '04 · Silêncio' },
    howEyebrow: 'Como funciona',
    howH2Pre: 'Três passos. Uma viagem.',
    howH2Italic: 'Um blog que vale a pena guardar.',
    howLead:
      'O Lapland.blog é uma plataforma gratuita de diário de viagem feita para quem visita a Lapônia finlandesa. Sua viagem vira um blog que você de fato vai querer compartilhar.',
    howStep1Kicker: 'Passo 01 · Planeje',
    howStep1Title: 'Marque os lugares.',
    howStep1Body:
      'Coloque marcadores no mapa da Lapônia para a cabana que reservou, o restaurante que quer experimentar e o ponto de céu escuro para a aurora. Trace sua rota antes de voar.',
    howStep2Kicker: 'Passo 02 · Escreva',
    howStep2Title: 'Escreva no caminho.',
    howStep2Body:
      'Do celular, na cabana, no carro, na sauna. Acrescente fotos, a temperatura, o gosto da sopa. Cada entrada se fixa ao dia e ao lugar.',
    howStep3Kicker: 'Passo 03 · Compartilhe',
    howStep3Title: 'Sua viagem, bem contada.',
    howStep3Body:
      'Suas entradas formam um blog público em lapland.blog/seu-nome. Seus amigos podem acompanhar. Cada entrada é exportada como story do Instagram, então a viagem vive duas vezes.',
    howCta: 'Criar seu blog de viagem',
    howFootnote: 'Grátis para diários de viagem · Sem cartão · Entre com o Google',
    liveEyebrow: 'Blogs de viagem ao vivo',
    liveH2Pre: 'Viagens reais.',
    liveH2Italic: 'Viajantes reais.',
    liveH2Tail: 'O seu é o próximo.',
    liveLead:
      'As pistas pretas de Levi. A caça à aurora em Inari. 60 km num trenó puxado por huskies em Saariselkä. Cada blog que você vê aqui foi escrito por um visitante numa única viagem, e montado em menos de cinco minutos.',
    liveBrowseAll: 'Ver todos os blogs',
    liveCta: 'Criar meu blog de viagem',
    liveFootnote: 'Grátis · Sem cartão · 2 minutos até a sua primeira entrada',
    featuredEyebrow: 'Diário de exemplo do fundador',
    featuredEvery: 'Todas as entradas →',
    featuredLead:
      'É assim que o seu próprio blog de viagem poderia ficar. As cinco entradas iniciais abaixo foram escritas pelo The Field Journal, a voz editorial do Lapland.blog, ao longo de um inverno na Lapônia. Temperaturas reais, cabanas reais, sopa real. Leia uma e imagine a sua.',
    featuredLoading: 'Carregando exemplo…',
    featuredNone: 'Ainda não há entradas de exemplo.',
    featuredReadEntry: 'Ler esta entrada',
    pillarsEyebrow: 'O que registrar',
    pillarsH2Pre: 'A viagem à Lapônia,',
    pillarsH2Italic: 'em três fios.',
    pillarsLead:
      'Veja o que outros viajantes registraram e escolha os fios sobre os quais vai escrever na sua própria viagem. Auroras, cabanas, comida, o frio, as pessoas, os silêncios no meio.',
    pillar1Kicker: 'I · O frio',
    pillar1Title: 'O que o frio de fato faz',
    pillar1Body:
      'Noites de aurora, a escuridão polar, as oito estações que quase toda lista esquece. Aqui o clima é o protagonista, não o pano de fundo. Notas de campo sobre como são vinte e três graus negativos às 03:47, e o que isso faz com a bateria de um celular, e com uma pessoa.',
    pillar2Kicker: 'II · O abrigo',
    pillar2Title: 'Onde você dorme, onde você come',
    pillar2Body:
      'Cabanas de madeira, iglus de vidro, saunas que funcionam e saunas que não. O prato de sopa de salmão de quarenta e dois euros que no fim valeu a pena. O pão de centeio que sobrevive a uma mochila e o café que você toma às 2 da madrugada porque o sol esqueceu de se pôr.',
    pillar3Kicker: 'III · As outras pessoas',
    pillar3Title: 'Quem mais vive aqui em cima',
    pillar3Body:
      'Criadores de renas, patrulheiros de esqui, mestres de sauna, o homem do posto de gasolina nos arredores de Sodankylä que falava quatro idiomas. A Lapônia é silenciosa, mas nunca vazia. Textos longos sobre as pessoas que você de fato encontra.',
    latestEyebrow: 'Entradas de exemplo',
    latestH2: 'Veja como é um blog de viagem.',
    latestEvery: 'Todas as entradas',
    latestLoading: 'Carregando histórias…',
    asideEyebrow: 'Por que isto existe',
    asideH2: 'A Lapônia não é um folheto. Sua viagem também não deveria ser.',
    asideP1:
      'Todo ano, milhares de visitantes chegam à Lapônia, veem algo fora do comum e perdem tudo num rolo de fotos que nunca mais abrem. A aurora sobre a cabana. A volta da sauna com os dedos dormentes. O prato de sopa de salmão que de algum jeito valeu 42 €. Sumido em uma semana.',
    asideP2:
      'O Lapland.blog é uma pequena ferramenta gratuita para resolver isso. Marque onde você esteve. Escreva o que você viu. Fotografe a sopa. Quando voltar para casa, você terá um blog de verdade da sua viagem: um que seus amigos possam de fato acompanhar, um que você ainda vai querer reler daqui a cinco anos. Sem fotos de banco de imagens. Sem «país das maravilhas do inverno». Apenas a sua própria versão honesta do lugar.',
    asideCta1: 'Começar o seu',
    asideCta2: 'Sobre o lapland.blog',
    asidePill: 'Sua viagem · Seu blog',
    travelJournalBadge: 'Grátis para diários de viagem',
    faqHeading: 'Perguntas frequentes sobre o lapland.blog',
    faq: [
      {
        q: 'Como começo um blog de viagem no lapland.blog?',
        a: 'Faça login com sua conta do Google, dê um nome ao seu blog e escreva a primeira entrada. Cada entrada pode ter texto, fotos, a data e um pino no mapa do lugar onde você esteve. Seu blog fica em lapland.blog/seu-nome e está pronto para compartilhar assim que você publica. Não há nada para instalar e nenhuma configuração além do login.',
      },
      {
        q: 'O lapland.blog é gratuito?',
        a: 'Sim. Criar um blog, escrever entradas, adicionar fotos, marcar lugares no mapa e compartilhar seu blog é tudo gratuito. Não é preciso cartão para se cadastrar e não há anúncios no seu blog.',
      },
      {
        q: 'Posso compartilhar meu blog da Lapônia no Instagram e no Facebook?',
        a: 'Sim. Todo blog tem um link público que você pode postar em qualquer lugar, e cada entrada pode ser exportada como imagem no tamanho de um story do Instagram, para compartilhar um único dia com um toque. Amigos e familiares podem abrir seu blog sem ter conta própria.',
      },
      {
        q: 'Preciso estar na Lapônia para escrever um blog aqui?',
        a: 'Não. Criamos o lapland.blog para quem viaja à Lapônia finlandesa, então o mapa e as sugestões são ajustados para viagens ao norte, mas qualquer pessoa pode manter um blog aqui, esteja planejando uma viagem, escrevendo durante ela ou preenchendo depois de voltar para casa. Você pode começar antes de embarcar e adicionar entradas dia a dia.',
      },
      {
        q: 'Sobre o que escrever no meu diário de viagem da Lapônia?',
        a: 'Sobre o que você não quer esquecer. Onde se hospedou, como estava a aurora, a temperatura na manhã mais fria, a refeição que surpreendeu, o passeio de trenó com huskies, o silêncio da floresta. Entradas curtas com uma foto e um pino de lugar funcionam bem. Algumas linhas por dia formam um blog que vale a pena reler.',
      },
    ],
  },
  startHere: {
    eyebrow: 'Bem-vindo',
    h1: 'Olá. Três formas de entrar.',
    lead:
      'O Lapland.blog é um site de diário de viagem gratuito, sem pressa e guiado pelas imagens, para quem de fato vai à Lapônia finlandesa. Seja planejando uma viagem, no meio de uma ou já de volta em casa lamentando não ter anotado, escolha o seu caminho.',
    path1Kicker: '01 · Planejar',
    path1Title: 'Estou planejando uma viagem à Lapônia.',
    path1Body:
      'Onde ficar, como chegar, o que fazer, onde comer: o lado prático. Pule para os sites parceiros do LaplandVibes que cuidam das reservas.',
    path1Cta: 'Planejar sua viagem',
    path2Kicker: '02 · Ler',
    path2Title: 'Quero ler o que outros escreveram.',
    path2Body:
      'Entradas iniciais selecionadas de dentro da Finlândia: arrumar a mala para a cabana, a noite da sopa de salmão, a aurora sobre Kemi. Temperaturas reais, hora real do dia, sem voz de folheto.',
    path2Cta: 'Mais lidos',
    path3Kicker: '03 · Escrever',
    path3Title: 'Estou aqui. Quero um blog da minha viagem.',
    path3Body:
      'Entre com e-mail ou com o Google. Ganhe um cantinho no lapland.blog. Marque lugares, escreva entradas, compartilhe com os amigos. Grátis, sem pegadinhas, sem nível premium.',
    path3Cta: 'Criar seu blog',
    planEyebrow: 'Planejar sua viagem',
    planH2: 'O lado prático, nos sites parceiros.',
    planLead:
      'O Lapland.blog é o diário. As reservas acontecem nos sites do LaplandVibes, cada um focado na única coisa que faz bem.',
    planStay: {
      kicker: 'Ficar',
      title: 'Cabanas, iglus, hotéis',
      body: 'Compare centenas de hospedagens na Lapônia: iglus de vidro, cabanas de madeira, estações de esqui.',
    },
    planTransport: {
      kicker: 'Chegar',
      title: 'Voos, trens, ônibus',
      body: 'Helsinque → Rovaniemi / Kittilä / Ivalo: voos, trens noturnos, as rotas práticas.',
    },
    planDo: {
      kicker: 'Fazer',
      title: 'Husky, moto de neve, sauna',
      body: 'Atividades reserváveis dos operadores reais, com avaliações, não um comunicado de imprensa.',
    },
    planEat: {
      kicker: 'Comer',
      title: 'Comida e bebida',
      body: 'Onde comer de verdade: a sopa de salmão, o pão de centeio, os bares que já viram décadas melhores.',
    },
    planAllSites: 'Ou explore os 27 sites em laplandvibes.com',
    onlyEyebrow: 'Se você só ler uma',
    onlyH2: 'Leia esta.',
    onlyLead: 'A entrada mais recente do diário de campo. Temperatura real, hora real do dia, sem voz de folheto.',
    thenEyebrow: 'Depois estas',
    thenH2: 'Mais do campo.',
    everyEntry: 'Todas as entradas',
  },
  about: {
    pageTitle: 'Sobre | Lapland.blog',
    pageDescription:
      'O Lapland.blog é uma plataforma gratuita de diário de viagem para quem visita a Lapônia finlandesa. Marque lugares, escreva entradas, compartilhe com os amigos.',
    eyebrow: 'Sobre a plataforma',
    h1: 'Um diário de viagem que vale a pena guardar.',
    lead:
      'O Lapland.blog é uma plataforma gratuita de diário de viagem para quem visita a Lapônia finlandesa. Marque onde você viu a aurora. Fotografe a cabana. Anote o que o termômetro fez. Quando voltar para casa, você terá um blog da sua viagem: um que seus amigos possam de fato acompanhar e que você ainda vai querer reler daqui a cinco anos.',
    intro:
      'Quase todo blog sobre a Lapônia se lê como um folheto. Quase todo app de diário de viagem ou é abandonado no rolo de fotos ou é compartilhado num único post de Instagram que some em um dia. O Lapland.blog é o meio-termo: um blog real, sem pressa e guiado pelas imagens da sua viagem, hospedado sob um nome que já recebe visitas e mantido pelo tempo que você quiser.',
    howHeading: 'Como funciona',
    howStepPin: 'Marque a cabana, o restaurante, o ponto de céu escuro. Monte seu roteiro antes de embarcar.',
    howStepWrite: 'Escreva durante a viagem, da cabana, do carro, da sauna. Adicione fotos, a temperatura e o sabor da sopa.',
    howStepShare: 'Suas entradas viram um blog público em lapland.blog/seu-nome. Amigos podem seguir; cada entrada é exportada como story do Instagram.',
    howBody:
      'Entre com seu e-mail ou com o Google. Ganhe um cantinho no lapland.blog em lapland.blog/me. Cada entrada aceita uma imagem principal, um marcador de lugar e o texto que você quiser escrever. Salve rascunhos, publique quando estiver pronto, compartilhe o link com os amigos. Cada entrada publicada é indexada e pesquisável, e sua viagem vira uma pequena peça do arquivo maior da Lapônia.',
    freeHeading: 'O que é grátis',
    freeBody:
      'Escrever entradas. Hospedar seu blog de viagem em lapland.blog/me/seunome. As fotos. O boletim. Não há paywall nem nível premium para quem escreve.',
    notHeading: 'O que você não vai encontrar',
    notBody:
      'Posts patrocinados dentro das entradas dos leitores. Listas de compras de afiliados enfiadas no seu blog. As palavras «inesquecível», «lista de desejos», «mágico» ou «país das maravilhas do inverno» são banidas dos rascunhos editoriais, e vale bani-las também dos seus. Fazem mal à escrita e mal a quem lê.',
    seedHeading: 'As entradas iniciais',
    seedBody:
      'As cinco entradas que já estão no site foram escritas pelo The Field Journal, a voz editorial do Lapland.blog. Elas estão ali para mostrar como pode ser um blog de viagem honesto, sem pressa e guiado pelas imagens: temperaturas reais, horas reais do dia, sem voz de folheto. Leia uma e imagine a sua.',
    networkHeading: 'Sobre a rede',
    networkBody:
      'O Lapland.blog faz parte do ecossistema LaplandVibes, uma rede de sites sobre a Lapônia de propriedade finlandesa. Os outros sites dizem aonde ir, onde ficar e o que fazer. Este é onde a viagem em si é colocada no papel.',
    contactHeading: 'Entre em contato',
    contactBody:
      'Se quiser dar um oi, corrigir um erro factual ou enviar uma fotografia que possamos creditar, escreva para info@lapland.blog. Lemos tudo e tentamos responder em uma semana.',
    closing: 'Escrito a partir da Lapônia finlandesa, na temperatura e na hora em que de fato aconteceu.',
    ctaPrimary: 'Começar o seu próprio diário →',
    ctaSecondary: 'Ou',
    ctaSecondaryLink: 'leia primeiro as entradas iniciais',
  },
  destinations: {
    pageTitle: 'Destinos | Lapland.blog',
    pageDescription:
      'Os oito principais destinos da Lapônia finlandesa: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Leia as entradas de cada um.',
    eyebrow: 'Aonde ir',
    h1Pre: 'Oito lugares.',
    h1Italic: 'Uma Lapônia.',
    lead:
      'Escolha um destino e leia as entradas escritas de lá. Os vazios são os próximos a escrever, você pode ser o primeiro.',
    beTheFirst: 'Seja o primeiro',
    entrySingular: 'entrada',
    entryPlural: 'entradas',
    readEntries: 'Ler as entradas',
    beFirstWrite: 'Seja o primeiro a escrever',
    findStayPrefix: 'Encontre hospedagem em',
    dontSeeEyebrow: 'Não vê o seu lugar?',
    plantH2: 'Finque a bandeira.',
    plantLead:
      'Vai a um lugar que não está nesta lista? Sodankylä, Posio, Kilpisjärvi, Hetta. Escreva a primeira entrada de lá e nós o adicionaremos ao mapa.',
    plantCta: 'Criar seu blog',
  },
  topReads: {
    pageTitle: 'Mais lidos | Lapland.blog',
    pageDescription:
      'Por onde começar no Lapland.blog. Listas da redação: as melhores entradas para iniciantes, sobre auroras, sobre comida e de cada temporada.',
    eyebrow: 'Listas selecionadas pela redação',
    h1: 'Mais lidos.',
    lead: 'Por onde começar. Selecionado pela redação, não pelos cliques. À medida que mais entradas do diário de campo são publicadas, estas listas crescem.',
    onlyEyebrow: 'Se você só ler uma',
    onlyH2: 'O nº 1 da redação.',
    onlyLead:
      'A aurora sobre o golfo de Bótnia, vinte e três graus negativos às 3:47, e a foto que nenhum de nós conseguiu. O texto que define a voz do Lapland.blog.',
    firstTimersEyebrow: 'Para iniciantes',
    firstTimersTitle: 'As três melhores para ler antes de ir.',
    firstTimersSubtitle:
      'Por que as pessoas erram com a aurora, o que levar para uma cabana e por que a escuridão polar na verdade é tranquila. Leia estas e chegará menos surpreso.',
    auroraEyebrow: 'Textos sobre auroras',
    auroraTitle: 'As entradas do céu noturno.',
    auroraSubtitle: 'Sobre persegui-la, fotografá-la e as noites em que ela aparece mesmo assim.',
    cabinsEyebrow: 'As cabanas',
    cabinsTitle: 'Entradas de mökki.',
    cabinsSubtitle:
      'Como é de verdade uma cabana na floresta finlandesa: o fogo, a sauna, o silêncio, e aquele detalhe do banheiro externo a trinta negativos que ninguém menciona.',
    foodEyebrow: 'Comida e bebida',
    foodTitle: 'Os textos de cozinha.',
    foodSubtitle:
      'Sopa de salmão de quarenta e dois euros, pão de centeio que sobrevive a uma mochila e o café que você toma às 2 da madrugada porque o sol esqueceu de se pôr.',
    seasonalEyebrow: 'De temporada',
    seasonalTitle: 'O que o frio de fato faz.',
    seasonalSubtitle:
      'O kaamos, as oito estações da Lapônia que quase toda lista esquece, e o pequeno ofício de atravessar dezembro sem sol.',
    ctaEyebrow: 'Sua viagem a seguir?',
    ctaH2: 'Seja a próxima entrada desta página.',
    ctaLead:
      'As listas acima crescem quando os leitores escrevem. Entre, escreva algumas entradas e a redação destacará as que merecerem.',
    ctaButton: 'Criar seu blog',
  },
  archive: {
    pageTitle: 'Todas as histórias | Lapland.blog',
    pageDescription:
      'Todas as histórias do Lapland.blog. Auroras, cabanas, comida, estações, pessoas, equipamentos e leituras longas da Lapônia finlandesa.',
    eyebrow: 'Arquivo',
    h1: 'Todas as histórias.',
    lead:
      'Sem algoritmo, sem truque de curadoria. A mais recente em cima. Use o filtro para restringir ou pesquise se já sabe o que procura.',
    all: 'Todas',
    filterAria: 'Filtrar por categoria',
    searchSr: 'Pesquisar histórias',
    searchPlaceholder: 'Pesquisar títulos, tags…',
    loading: 'Carregando histórias…',
    emptyTitle: 'Nenhuma história corresponde.',
    emptyBody: 'Tente limpar o filtro ou pesquisar outra palavra.',
  },
  category: {
    allStoriesBack: 'Todas as histórias',
    categoryPrefix: 'Categoria',
    storySingular: 'história',
    storyPlural: 'histórias',
    loading: 'Carregando histórias…',
    emptyTitle: 'Ainda não há nada aqui.',
    emptyBody: 'Esta categoria espera a sua primeira história. Volte em breve.',
    emptyLink: 'Ver todas as histórias →',
    keepExploringEyebrow: 'Continue explorando',
    otherThemes: 'Outros temas',
  },
  post: {
    allStories: 'Todas as histórias',
    by: 'Por',
    minRead: 'min de leitura',
    loadingStory: 'Carregando história…',
    readNextEyebrow: 'Leia a seguir',
    readNextH2: 'Mais do diário',
    tagged: 'Marcado com',
    exploreMore: 'Explore mais na rede LaplandVibes',
    editorialLabel: 'Uma entrada do Field Journal',
    editorialNote: 'Uma das poucas entradas de exemplo escritas pelo The Field Journal, a voz editorial do Lapland.blog, para mostrar como é um diário de viagem honesto. Lugares e temperaturas reais; suas próprias entradas são escritas por você.',
  },
  signIn: {
    pageTitle: 'Planeje sua viagem à Lapônia | Lapland.blog',
    pageDescription:
      'Ganhe uma página de viagem gratuita, dicas personalizadas e as melhores ofertas para sua viagem à Lapônia. Diga-nos quando você vem e ajudaremos.',
    back: 'Voltar',
    eyebrow: 'Sua página de viagem gratuita',
    h1Pre: 'Planeje sua',
    h1Italic: 'viagem à Lapônia.',
    lead:
      'Ganhe sua página em lapland.blog/seunome. Escreva a história da sua viagem, compartilhe fotos e receba dicas e ofertas personalizadas para o seu trajeto. Diga-nos quando você vem e ajudaremos a planejar cada passo.',
    benefit1Title: 'Marque sua rota no mapa da Lapônia',
    benefit1Body: 'Cabana, restaurante, ponto de aurora: coloque os marcadores antes de voar.',
    benefit2Title: 'Escreva entradas pelo celular',
    benefit2Body: 'Da cabana, do carro, da sauna. Fotos, clima, histórias.',
    benefit3Title: 'Compartilhe no Instagram com um toque',
    benefit3Body: 'Cada entrada é exportada como story vertical que seus amigos de fato abrem.',
    footnote: 'Diários de viagem gratuitos · Sem cartão de crédito · Feito na Finlândia',
    sentTitle: 'Confira sua caixa de entrada',
    sentBody:
      'Enviamos um link mágico para {email}. Clique nele e seu blog de viagem fica no ar. O link expira em uma hora.',
    useDifferent: 'Usar outro e-mail',
    reserveEyebrow: 'Reserve sua página',
    formH2: 'Planeje sua viagem à Lapônia',
    formLead: 'Vamos criar sua página de viagem e enviar dicas personalizadas conforme a época em que você viaja.',
    emailLabel: 'Seu e-mail',
    emailPlaceholder: 'voce@exemplo.com',
    travelLabel: 'Quando você visita a Lapônia?',
    monthLabel: 'Mês…',
    yearLabel: 'Ano…',
    noDates: 'Ainda estou sonhando, sem datas por ora',
    enterEmail: 'Digite seu e-mail para começar.',
    sending: 'Enviando o link mágico…',
    submitCta: 'Reservar minha página de viagem',
    months: [
      'janeiro','fevereiro','março','abril','maio','junho',
      'julho','agosto','setembro','outubro','novembro','dezembro',
    ],
  },
  unsubscribe: {
    pageTitle: 'Cancelar inscrição | Lapland.blog',
    pageDescription: 'Cancele a inscrição no boletim do Lapland.blog. Um clique, sem ressentimentos.',
    eyebrow: 'Boletim',
    h1: 'Cancelar inscrição',
    successTitle: 'Sua inscrição foi cancelada.',
    successBody:
      'Sentimos vê-lo partir. Você não receberá mais e-mails do Lapland.blog. Se mudar de ideia, o formulário de inscrição está em todas as páginas.',
    backHome: '← Voltar ao início',
    lead: 'Digite o e-mail com que você se inscreveu. Um clique e está fora. Sem laços de «tem certeza?», sem pesquisa.',
    emailPlaceholder: 'seu@email.com',
    processing: 'Processando…',
    submit: 'Cancelar inscrição',
  },
  notFound: {
    pageTitle: 'Não encontrado | Lapland.blog',
    pageDescription: 'Esta página não existe. Talvez tenha sido movida, renomeada ou perdida na neve.',
    eyebrow: 'Não encontrado · 404',
    h1: 'Perdido na neve.',
    body: 'Esta página não existe, ou ainda não existe. De qualquer forma, o resto do blog fica por aqui.',
    backHome: 'Voltar ao início',
    allStories: 'Todas as histórias →',
  },
  chrome: {
    readTheStory: 'Ler a história',
    shareThisStory: 'Compartilhar esta história',
    inThisStory: 'Nesta história',
    fieldJournalEntry: 'Registro do diário de campo',
    liveTripBlog: 'Blog de viagem ao vivo',
    yoursCouldBeNext: 'O seu pode ser o próximo neste carrossel.',
    featuredBadge: 'Destaque',
    minRead: 'min de leitura',
  },
};

// ZH-CN block. Full native translation. Phase 5 (2026-05-31).
const zhCN: SectionCopy = {
  nav: {
    startHere: '从这里开始',
    topReads: '热门阅读',
    destinations: '目的地',
    tripDiaries: '旅行日记',
    about: '关于',
    startYourBlog: '创建您的博客',
    signIn: '登录',
    subscribe: '订阅',
    myTripBlog: '我的旅行博客',
    adminDashboard: '管理后台',
    signOut: '退出登录',
    signedInAs: '当前登录',
  },
  footer: {
    networkBadge: '芬兰拉普兰网络',
    tagline: '芬兰拉普兰旅行的数字家园。',
    travelGuide: '拉普兰旅游指南',
    aboutEyebrow: '关于 LaplandVibes',
    aboutBody:
      '芬兰拉普兰的编辑指南：从极光到午夜阳光。精选路线、诚实的报道,以及规划北极之旅所需的实用细节。',
    aboutBadge: '独立运营 · 注明出处',
    spottedError: {
      title: '发现错误?',
      body: '看到需要修正的内容?请告诉我们，我们会更正。',
      cta: '报告错误 →',
    },
    partner: {
      title: '合作机会',
      body: '在超过27个拉普兰相关网站上投放广告或开展合作。',
      cta: '联系我们 →',
    },
    press: {
      title: '媒体与新闻',
      body: '编辑合作与媒体资料包。',
      cta: '媒体咨询 →',
    },
    copyright: '#LaplandVibes 网络的一部分',
    websiteBy: '网站制作:Yrityspaketit.fi',
    privacy: '隐私政策',
    cookiePolicy: 'Cookie 政策',
    terms: '使用条款',
    contact: '联系方式',
    groups: { stay: '住宿', eatDrink: '餐饮', do: '体验', explore: '探索', essentials: '实用信息' },
  },
  newsletter: {
    eyebrow: '田野日志',
    h2: '让新文章送达您的收件箱。',
    lead: '新文章发布时,我们会发一封邮件提醒。没有定期群发,没有汇总,也没有赞助式填充。只是下一篇故事,在写好并准备好之后送达。',
    placeholder: 'your@email.com',
    subscribing: '订阅中…',
    subscribe: '订阅',
    successTitle: '您已订阅。',
    successBody: '请查收您的收件箱，欢迎邮件正在发送。',
    alreadyTitle: '您已在订阅名单中。',
    alreadyBody: '下一篇故事会和往常一样送达。',
    agreeText: '订阅即表示您同意我们的',
    privacyLink: '隐私政策',
    unsubscribeNote: '可随时取消订阅。',
  },
  cookieBanner: {
    headline: '关于 Cookie 的简要说明',
    body: '我们使用一些必要的 Cookie 让网站正常运作,以及可选的分析 Cookie 以了解哪些文章被阅读。由您选择。',
    accept: '接受',
    decline: '拒绝',
  },
  home: {
    heroEyebrow: '旅行日记 · 地图 · 分享',
    heroLine1: '要去拉普兰?',
    heroLine2: '为您的旅行创建一个博客。',
    heroLead:
      '标出您看到极光的地方。拍下木屋。记下气温的变化。把您的旅程做成一个漂亮的博客，一个朋友们真的能跟着看下去的博客。',
    heroPrimaryCta: '创建您的旅行博客',
    heroSecondaryCta: '看看它如何运作',
    heroFootnote: '免费 · 芬兰出品 · 分享到 Instagram · 无广告',
    seasonalBadge: '当季 · 午夜阳光 · 6月6日 → 7月7日',
    seasonalH2: '为你的拉普兰之旅打造的免费旅行博客，边走边写。',
    seasonalLead:
      'Lapland.blog 把你的旅程变成一个简洁而美好的博客：标记地点、添加照片、写下经历，再把链接分享给朋友。眼下正是夏天。三十二个太阳不落的夜晚，森林染成琥珀色，湖面映出天空。趁还身在其中，就开始记录吧。',
    seasonalCta1: '开始你的旅行博客',
    seasonalCta2: '阅读夏季文章',
    seasonalCard1Title: '24 小时黄金时刻',
    seasonalCard1Body: '太阳擦着地平线。摄影师称之为地球上最长的蓝色时刻。',
    seasonalCard2Title: '云莓季',
    seasonalCard2Body: '七月底:沼泽变成金色。当地人称之为第二次收成。',
    seasonalCard3Title: '先桑拿,再下水',
    seasonalCard3Body: '午夜 14°C 的湖水,五步之外 90°C 的桑拿。如此往复。',
    seasonalCard4Title: '别无他人',
    seasonalCard4Body: '冬天一房难求的木屋,七月里空着。同一片森林,却没有排队。',
    seasonalLabels: { light: '01 · 光', forest: '02 · 森林', water: '03 · 水', quiet: '04 · 寂静' },
    howEyebrow: '它如何运作',
    howH2Pre: '三步。一趟旅程。',
    howH2Italic: '一个值得留存的博客。',
    howLead:
      'Lapland.blog 是一个免费的旅行日志平台,为前往芬兰拉普兰的游客打造。您的旅程会变成一个您真心想分享的博客。',
    howStep1Kicker: '第 01 步 · 规划',
    howStep1Title: '标出地点。',
    howStep1Body:
      '在拉普兰地图上为您预订的木屋、想去的餐厅,以及看极光的暗夜地点放上标记。在出发前先把路线画好。',
    howStep2Kicker: '第 02 步 · 记录',
    howStep2Title: '边走边写。',
    howStep2Body:
      '用手机,在木屋里,在车上,在桑拿房里。加上照片、气温、汤是什么味道。每一篇都会自动钉在那一天和那个地点。',
    howStep3Kicker: '第 03 步 · 分享',
    howStep3Title: '您的旅程,讲得精彩。',
    howStep3Body:
      '您的文章会汇成一个公开博客,网址是 lapland.blog/您的名字。朋友们可以关注。每篇还能导出成 Instagram 快拍,让旅程活上两次。',
    howCta: '创建您的旅行博客',
    howFootnote: '旅行日志免费 · 无需银行卡 · 用 Google 登录',
    liveEyebrow: '正在更新的旅行博客',
    liveH2Pre: '真实的旅程。',
    liveH2Italic: '真实的旅人。',
    liveH2Tail: '下一个就是您。',
    liveLead:
      '在莱维滑黑道雪道。在伊纳里追极光。在萨利色尔卡乘哈士奇雪橇行进 60 公里。您在这里看到的每一个博客,都是一位游客在一趟旅程中写下的，而且不到五分钟就建好了。',
    liveBrowseAll: '浏览所有博客',
    liveCta: '创建我的旅行博客',
    liveFootnote: '免费 · 无需银行卡 · 2 分钟写下第一篇',
    featuredEyebrow: '创始人的示例日志',
    featuredEvery: '全部文章 →',
    featuredLead:
      '这就是您自己的旅行博客可能呈现的样子。下面五篇起始文章由 The Field Journal，也就是 Lapland.blog 的编辑之声，在拉普兰的一个冬天里写成。真实的气温、真实的木屋、真实的汤。读一篇,想象属于您的那一篇。',
    featuredLoading: '正在加载示例…',
    featuredNone: '暂无示例文章。',
    featuredReadEntry: '阅读这篇文章',
    pillarsEyebrow: '记些什么',
    pillarsH2Pre: '拉普兰之旅,',
    pillarsH2Italic: '三条线索。',
    pillarsLead:
      '看看其他旅人记录了什么，再挑出您自己旅途中要写的线索。极光、木屋、食物、寒冷、人,以及其间的寂静。',
    pillar1Kicker: 'I · 寒冷',
    pillar1Title: '寒冷究竟做了什么',
    pillar1Body:
      '极光之夜、极地的黑暗,以及大多数清单都遗忘的八个季节。在这里,天气是主角,而非背景。田野笔记记下凌晨 03:47 的零下二十三度是什么感觉,它对一块手机电池，以及对一个人，又做了什么。',
    pillar2Kicker: 'II · 栖身',
    pillar2Title: '您睡在哪里,吃在哪里',
    pillar2Body:
      '木屋、玻璃穹顶屋,管用的桑拿和不管用的桑拿。那碗四十二欧元、最后证明值得的三文鱼汤。能在背包里挺过来的黑麦面包,以及您在凌晨两点喝下的咖啡，因为太阳忘了落下。',
    pillar3Kicker: 'III · 这里的其他人',
    pillar3Title: '还有谁住在这片北方',
    pillar3Body:
      '驯鹿牧人、滑雪巡逻员、桑拿大师,还有索丹屈莱郊外加油站那位会说四种语言的人。拉普兰很安静,却从不空荡。这些是关于您真正遇见的人的长篇文章。',
    latestEyebrow: '示例文章',
    latestH2: '看看一个旅行博客是什么样子。',
    latestEvery: '全部文章',
    latestLoading: '正在加载文章…',
    asideEyebrow: '为什么会有这个平台',
    asideH2: '拉普兰不是一本宣传册。您的旅程也不该是。',
    asideP1:
      '每年,成千上万的游客来到拉普兰,看见某些非比寻常的景象,却把它丢进了再也不会翻看的手机相册。木屋上方的极光。从桑拿房走回来时冻僵的指尖。那碗不知为何值得 42 欧元的三文鱼汤。一周之内,统统消失。',
    asideP2:
      'Lapland.blog 是一个小小的免费工具,用来弥补这一切。标出您去过的地方。写下您看见的景象。把汤拍下来。等您飞回家时,就拥有了一个真正的旅行博客:一个朋友们真的能跟着看的博客,一个五年后您仍想重读的博客。没有图库照片。没有「梦幻冬日仙境」。只有您自己对这片土地的诚实版本。',
    asideCta1: '开始属于您的',
    asideCta2: '关于 lapland.blog',
    asidePill: '您的旅程 · 您的博客',
    travelJournalBadge: '旅行日志免费',
    faqHeading: '关于 lapland.blog 的常见问题',
    faq: [
      {
        q: '如何在 lapland.blog 上开始一个旅行博客？',
        a: '用您的 Google 账号登录，为博客取个名字，然后写下第一篇记录。每篇记录都可以包含文字、照片、日期，以及标记您所在位置的地图图钉。您的博客地址为 lapland.blog/您的名字，发布即可分享，无需安装任何东西，除了登录之外也没有其他设置。',
      },
      {
        q: 'lapland.blog 免费吗？',
        a: '免费。创建博客、撰写记录、添加照片、在地图上标记地点以及分享博客，全部免费。注册无需绑定银行卡，您的博客上也没有广告。',
      },
      {
        q: '我可以把拉普兰博客分享到 Instagram 和 Facebook 吗？',
        a: '可以。每个博客都有一个公开链接，您可以发布到任何地方；每篇记录还能导出为 Instagram 快拍尺寸的图片，一键分享某一天的经历。亲友无需自己的账号即可打开您的博客。',
      },
      {
        q: '必须身处拉普兰才能在这里写博客吗？',
        a: '不必。我们为前往芬兰拉普兰的旅行者打造了 lapland.blog，因此地图和写作提示都针对北方旅行做了优化，但任何人都可以在这里写博客，无论您是在计划行程、旅途中记录，还是回家后补写。您可以在出发前就开始，并逐日添加记录。',
      },
      {
        q: '拉普兰旅行日记该写些什么？',
        a: '写下任何您不想忘记的事。住在哪里、极光是什么样子、最冷那天早晨的气温、出乎意料的美食、哈士奇雪橇之旅、森林的寂静。配上一张照片和地点图钉的简短记录效果很好。每天几行字，积累成一个值得重读的博客。',
      },
    ],
  },
  startHere: {
    eyebrow: '欢迎',
    h1: '您好。三种入门方式。',
    lead:
      'Lapland.blog 是一个免费、不赶时间、以图片为主的旅行日志网站,为真正前往芬兰拉普兰的人而设。无论您正在规划行程、身在旅途中,还是已回到家中懊悔没有记下来，都请选择您的路径。',
    path1Kicker: '01 · 规划',
    path1Title: '我正在规划一趟拉普兰之旅。',
    path1Body:
      '住在哪里、怎么抵达、做些什么、去哪儿吃，这些务实的部分。转到负责预订的 LaplandVibes 姊妹网站。',
    path1Cta: '规划您的行程',
    path2Kicker: '02 · 阅读',
    path2Title: '我想读读别人写了什么。',
    path2Body:
      '来自芬兰本地、精心挑选的起始文章:为木屋打包行李、三文鱼汤之夜、凯米上空的极光。真实的气温、真实的时刻,没有宣传册的腔调。',
    path2Cta: '热门阅读',
    path3Kicker: '03 · 书写',
    path3Title: '我已经在这里了。我想要一个记录旅程的博客。',
    path3Body:
      '用邮箱或 Google 登录。在 lapland.blog 上拥有自己的一角。标记地点、撰写文章、分享给朋友。免费,没有套路,没有高级套餐。',
    path3Cta: '创建您的博客',
    planEyebrow: '规划您的行程',
    planH2: '务实的部分,都在姊妹网站上。',
    planLead:
      'Lapland.blog 负责记录。预订则在 LaplandVibes 的各个网站上完成，每一个都专注于它擅长的那一件事。',
    planStay: {
      kicker: '住宿',
      title: '木屋、穹顶屋、酒店',
      body: '比较数百处拉普兰住宿：玻璃穹顶屋、原木小屋、滑雪度假村。',
    },
    planTransport: {
      kicker: '抵达',
      title: '航班、火车、巴士',
      body: '赫尔辛基 → 罗瓦涅米 / 基蒂莱 / 伊瓦洛:航班、夜班火车,实用的路线。',
    },
    planDo: {
      kicker: '体验',
      title: '哈士奇、雪地摩托、桑拿',
      body: '来自真实运营商、可直接预订的活动,附带真实评价,不是新闻稿。',
    },
    planEat: {
      kicker: '用餐',
      title: '美食与饮品',
      body: '真正值得一去的地方:三文鱼汤、黑麦面包,还有那些见过更好年代的酒吧。',
    },
    planAllSites: '或浏览 laplandvibes.com 上的全部 27 个网站',
    onlyEyebrow: '如果您只读一篇',
    onlyH2: '就读这一篇。',
    onlyLead: '田野日志最新的一篇。真实的气温、真实的时刻,没有宣传册的腔调。',
    thenEyebrow: '然后是这些',
    thenH2: '更多来自田野。',
    everyEntry: '全部文章',
  },
  about: {
    pageTitle: '关于 | Lapland.blog',
    pageDescription:
      'Lapland.blog 是一个免费的旅行日志平台,为前往芬兰拉普兰的游客而设。标记地点、撰写文章、分享给朋友。您的旅程,讲得精彩。',
    eyebrow: '关于这个平台',
    h1: '一个值得留存的旅行日志。',
    lead:
      'Lapland.blog 是一个免费的旅行日志平台,为前往芬兰拉普兰的游客而设。标出您看到极光的地方。拍下木屋。记下气温的变化。等您飞回家时,就拥有了一个记录旅程的博客:一个朋友们真的能跟着看的博客,一个五年后您仍想重读的博客。',
    intro:
      '大多数拉普兰博客读起来都像宣传册。大多数旅行日志应用,要么被遗忘在手机相册里,要么以一条转眼就消失的 Instagram 帖子收场。Lapland.blog 介于两者之间:一个真实、不赶时间、以图片为主的旅程博客,托管在一个本就有流量的域名下,您想留多久就留多久。',
    howHeading: '它如何运作',
    howStepPin: '标记木屋、餐厅和暗空观测点。出发前就把路线规划好。',
    howStepWrite: '边走边写，在木屋里、车上、桑拿房。配上照片、气温，以及那碗汤的味道。',
    howStepShare: '你的记录会成为 lapland.blog/你的名字 上的公开博客。朋友可以关注，每篇还能导出为 Instagram 快拍。',
    howBody:
      '用邮箱或 Google 登录。在 lapland.blog/me 拥有自己的一角。每篇文章可配一张主图、一个地点标记,以及您想写下的文字。保存草稿、就绪时发布、把链接分享给朋友。每篇发布的文章都会被收录、可被搜索，您的旅程也成为更大的拉普兰档案中的一小块。',
    freeHeading: '哪些是免费的',
    freeBody:
      '撰写文章。在 lapland.blog/me/您的名字 托管您的旅行博客。照片。新闻通讯。在写作者这一端,没有付费墙,也没有高级套餐。',
    notHeading: '您不会遇到的',
    notBody:
      '读者文章里夹带的赞助贴文。硬塞进您博客的联盟购物清单。「难忘」「人生清单」「梦幻」或「冬日仙境」这些词，在编辑草稿中被禁用,也值得在您自己的文章里禁用。它们对写作有害,对读者也有害。',
    seedHeading: '起始文章',
    seedBody:
      '网站上已有的五篇文章由 The Field Journal 撰写,它是 Lapland.blog 的编辑之声。它们的作用,是展示一个诚实、不赶时间、以图片为主的旅程博客读起来是什么样子:真实的气温、真实的时刻,没有宣传册的腔调。读一篇,想象属于您的那一篇。',
    networkHeading: '关于这个网络',
    networkBody:
      'Lapland.blog 是 LaplandVibes 生态系统的一部分，一个由芬兰人拥有、以拉普兰为主题的网站网络。其他网站告诉您去哪儿、住哪儿、做什么。而这个网站,是把旅程本身写下来的地方。',
    contactHeading: '联系我们',
    contactBody:
      '如果您想打个招呼、纠正一处事实错误,或寄来一张我们可以署名的照片,请写信至 info@lapland.blog。我们会阅读每一封,并尽量在一周内回复。',
    closing: '写自芬兰拉普兰,就在事情真正发生时的那个气温与那个时刻。',
    ctaPrimary: '开始属于您的日志 →',
    ctaSecondary: '或者',
    ctaSecondaryLink: '先读读起始文章',
  },
  destinations: {
    pageTitle: '目的地 | Lapland.blog',
    pageDescription:
      '芬兰拉普兰的八大目的地:罗瓦涅米、萨利色尔卡、莱维、凯米、伊纳里、穆奥尼奥、于莱斯、凯米耶尔维。阅读每个地方的田野日志文章,或成为第一个动笔的人。',
    eyebrow: '去哪儿',
    h1Pre: '八个地方。',
    h1Italic: '一个拉普兰。',
    lead:
      '选一个目的地,读读从那里写下的文章。空着的，正是接下来要写的，您可以成为第一个。',
    beTheFirst: '成为第一个',
    entrySingular: '篇',
    entryPlural: '篇',
    readEntries: '阅读文章',
    beFirstWrite: '成为第一个动笔的人',
    findStayPrefix: '寻找住宿:',
    dontSeeEyebrow: '没看到您要去的地方?',
    plantH2: '插上旗帜。',
    plantLead:
      '要去的地方不在这份名单上?索丹屈莱、波西奥、基尔皮斯耶尔维、海塔，从那里写下第一篇，我们就把它加到地图上。',
    plantCta: '创建您的博客',
  },
  topReads: {
    pageTitle: '热门阅读 | Lapland.blog',
    pageDescription:
      '在 Lapland.blog 从何读起。精选清单:最适合初次到访者的文章、最佳极光篇、最佳美食篇,以及当季之选。由编辑挑选。',
    eyebrow: '编辑精选清单',
    h1: '热门阅读。',
    lead: '从何读起。由编辑挑选,而非由点击量决定。随着更多田野日志文章发布,这些清单会不断扩充。',
    onlyEyebrow: '如果您只读一篇',
    onlyH2: '编辑首选。',
    onlyLead:
      '波的尼亚湾上空的极光、凌晨 3:47 的零下二十三度,以及我们谁都没拍到的那张照片。这篇文章定义了 Lapland.blog 的声音。',
    firstTimersEyebrow: '给初次到访者',
    firstTimersTitle: '出发前最该读的三篇。',
    firstTimersSubtitle:
      '为什么人们对极光的理解常常出错、去木屋该带些什么,以及为什么极地的黑暗其实没那么难捱。读完这些,您到达时会少几分意外。',
    auroraEyebrow: '极光篇',
    auroraTitle: '夜空文章。',
    auroraSubtitle: '关于追逐它、拍摄它,以及那些它照样现身的夜晚。',
    cabinsEyebrow: '木屋',
    cabinsTitle: 'mökki(芬兰小木屋)文章。',
    cabinsSubtitle:
      '芬兰森林木屋里究竟是什么样:炉火、桑拿、寂静,还有零下三十度时那间户外厕所，没人提起的那一段。',
    foodEyebrow: '美食与饮品',
    foodTitle: '厨房文章。',
    foodSubtitle:
      '四十二欧元的三文鱼汤、能在背包里挺过来的黑麦面包,以及您在凌晨两点喝下的咖啡，因为太阳忘了落下。',
    seasonalEyebrow: '当季',
    seasonalTitle: '寒冷究竟做了什么。',
    seasonalSubtitle:
      '极夜(kaamos)、大多数清单都遗忘的拉普兰八季,以及在没有太阳的情况下熬过十二月这桩小小的功课。',
    ctaEyebrow: '下一个轮到您的旅程?',
    ctaH2: '成为这一页上的下一篇。',
    ctaLead:
      '上面的清单,随着读者书写而扩充。登录、写下几篇文章,编辑会把够格的那些选入推荐。',
    ctaButton: '创建您的博客',
  },
  archive: {
    pageTitle: '全部文章 | Lapland.blog',
    pageDescription:
      'Lapland.blog 的全部文章。极光、木屋、美食、季节、人物、装备,以及来自芬兰拉普兰的长篇阅读。',
    eyebrow: '存档',
    h1: '每一篇文章。',
    lead:
      '没有算法,没有筛选花招。最新的在最上面。用筛选器缩小范围,或者如果您已经知道要找什么,就直接搜索。',
    all: '全部',
    filterAria: '按类别筛选',
    searchSr: '搜索文章',
    searchPlaceholder: '搜索标题、标签…',
    loading: '正在加载文章…',
    emptyTitle: '没有匹配的文章。',
    emptyBody: '试试清除筛选,或换一个词搜索。',
  },
  category: {
    allStoriesBack: '全部文章',
    categoryPrefix: '类别',
    storySingular: '篇',
    storyPlural: '篇',
    loading: '正在加载文章…',
    emptyTitle: '这里暂时还空着。',
    emptyBody: '这个类别正等着它的第一篇文章。请稍后再来。',
    emptyLink: '浏览全部文章 →',
    keepExploringEyebrow: '继续探索',
    otherThemes: '其他主题',
  },
  post: {
    allStories: '全部文章',
    by: '作者',
    minRead: '分钟阅读',
    loadingStory: '正在加载文章…',
    readNextEyebrow: '接着读',
    readNextH2: '更多来自日志',
    tagged: '标签',
    exploreMore: '在 LaplandVibes 网络中探索更多',
    editorialLabel: 'Field Journal 文章',
    editorialNote: '这是 Lapland.blog 的编辑之声 The Field Journal 撰写的少量示例文章之一，用来展示一篇真诚的旅行日记是什么样子。地点和气温都真实可考，你自己的文章则由你来写。',
  },
  signIn: {
    pageTitle: '规划您的拉普兰之旅 | Lapland.blog',
    pageDescription:
      '获得一个免费的行程页面、个性化建议,以及最适合您拉普兰之旅的优惠。告诉我们您何时到访,我们会帮您规划每一步。',
    back: '返回',
    eyebrow: '您的免费行程页面',
    h1Pre: '规划您的',
    h1Italic: '拉普兰之旅。',
    lead:
      '在 lapland.blog/您的名字 获得专属页面，撰写您的旅程故事、分享照片,并获得为您行程量身定制的建议与优惠。告诉我们您何时到访,我们会帮您规划每一步。',
    benefit1Title: '在拉普兰地图上标出您的路线',
    benefit1Body: '木屋、餐厅、极光地点：出发前先放好标记。',
    benefit2Title: '用手机撰写文章',
    benefit2Body: '在木屋、在车上、在桑拿房里。照片、天气、故事。',
    benefit3Title: '一键分享到 Instagram',
    benefit3Body: '每篇文章都会导出成竖版快拍,朋友们真的会点开。',
    footnote: '旅行日志免费 · 无需信用卡 · 芬兰出品',
    sentTitle: '请查收您的收件箱',
    sentBody:
      '我们已向 {email} 发送了一个魔法链接。点击它,您的旅行博客就会上线。链接将在一小时后失效。',
    useDifferent: '使用其他邮箱',
    reserveEyebrow: '预定您的页面',
    formH2: '规划您的拉普兰之旅',
    formLead: '我们会为您创建行程页面,并根据您的出行时间发送个性化建议。',
    emailLabel: '您的邮箱',
    emailPlaceholder: 'you@example.com',
    travelLabel: '您何时到访拉普兰?',
    monthLabel: '月份…',
    yearLabel: '年份…',
    noDates: '我还在憧憬，暂时没有日期',
    enterEmail: '输入您的邮箱即可开始。',
    sending: '正在发送魔法链接…',
    submitCta: '预定我的行程页面',
    months: [
      '一月','二月','三月','四月','五月','六月',
      '七月','八月','九月','十月','十一月','十二月',
    ],
  },
  unsubscribe: {
    pageTitle: '取消订阅 | Lapland.blog',
    pageDescription: '取消订阅 Lapland.blog 新闻通讯。一键完成,绝无芥蒂。',
    eyebrow: '新闻通讯',
    h1: '取消订阅',
    successTitle: '您已取消订阅。',
    successBody:
      '很遗憾看您离开。您将不会再收到 Lapland.blog 的邮件。如果您改变主意,每个页面上都有订阅入口。',
    backHome: '← 返回首页',
    lead: '输入您订阅时使用的邮箱。一键即可退出，没有「您确定吗？」的反复确认，也没有问卷。',
    emailPlaceholder: 'your@email.com',
    processing: '处理中…',
    submit: '取消订阅',
  },
  notFound: {
    pageTitle: '未找到 | Lapland.blog',
    pageDescription: '这个页面不存在。它可能已被移动、重命名,或迷失在雪中。',
    eyebrow: '未找到 · 404',
    h1: '迷失在雪中。',
    body: '这个页面不存在，或者它还不存在。无论如何,博客的其余部分就在这边。',
    backHome: '返回首页',
    allStories: '全部文章 →',
  },
  chrome: {
    readTheStory: '阅读故事',
    shareThisStory: '分享这个故事',
    inThisStory: '本文内容',
    fieldJournalEntry: '田野日志记录',
    liveTripBlog: '实时旅行博客',
    yoursCouldBeNext: '下一个出现在这里的可能就是你。',
    featuredBadge: '精选',
    minRead: '分钟阅读',
  },
};

// KO/FR/IT/NL block. Full native body translation. Phase 4 (2026-05-20).
const ko: SectionCopy = {
  ...en,
  nav: {
    startHere: '시작하기',
    topReads: '인기 글',
    destinations: '여행지',
    tripDiaries: '여행기',
    about: '소개',
    startYourBlog: '나만의 블로그 시작하기',
    signIn: '로그인',
    subscribe: '구독하기',
    myTripBlog: '내 여행 블로그',
    adminDashboard: '관리자 대시보드',
    signOut: '로그아웃',
    signedInAs: '로그인됨',
  },
  home: {
    heroEyebrow: '여행 일기 · 지도 · 공유',
    heroLine1: '라플란드로 가십니까?',
    heroLine2: '여행 블로그를 시작하세요.',
    heroLead:
      '오로라를 본 자리에 핀을 꽂으십시오. 통나무집을 사진에 담으십시오. 기온이 어땠는지 기록하십시오. 친구들이 실제로 따라 읽을 수 있는 아름다운 여행 블로그를 만드세요.',
    heroPrimaryCta: '여행 블로그 시작하기',
    heroSecondaryCta: '사용 방법 보기',
    heroFootnote: '무료 · 핀란드 제작 · Instagram 공유 · 광고 없음',
    seasonalBadge: '지금이 제철 · 백야 · 6월 6일 → 7월 7일',
    seasonalH2: '라플란드 여행을 위한 무료 여행 블로그, 여행하면서 씁니다.',
    seasonalLead:
      'Lapland.blog는 여행을 간결하고 아름다운 블로그로 만들어 줍니다. 장소에 핀을 꽂고, 사진을 더하고, 있었던 일을 적은 뒤 링크를 친구들과 공유하세요. 지금은 여름입니다. 해가 지지 않는 서른두 밤, 숲은 호박빛으로 물들고 호수는 하늘을 비춥니다. 아직 그 안에 머물러 있을 때 여행기를 시작하십시오.',
    seasonalCta1: '여행 블로그 시작하기',
    seasonalCta2: '여름 글 읽기',
    seasonalCard1Title: '24시간의 골든아워',
    seasonalCard1Body: '태양이 지평선을 스칩니다. 사진가들은 이를 지구상에서 가장 긴 블루아워라 부릅니다.',
    seasonalCard2Title: '클라우드베리 철',
    seasonalCard2Body: '7월 말, 습원이 황금빛으로 물듭니다. 현지인들은 이를 두 번째 수확이라 부릅니다.',
    seasonalCard3Title: '사우나, 그리고 호수 입수',
    seasonalCard3Body: '자정 14도의 호수, 다섯 걸음 옆 90도 사우나. 반복하십시오.',
    seasonalCard4Title: '아무도 없음',
    seasonalCard4Body: '겨울에 만실이 되는 통나무집들이 7월에는 비어 있습니다. 같은 숲, 줄 없음.',
    seasonalLabels: { light: '01 · 빛', forest: '02 · 숲', water: '03 · 물', quiet: '04 · 정적' },
    howEyebrow: '사용 방법',
    howH2Pre: '세 단계. 한 번의 여행.',
    howH2Italic: '간직할 만한 블로그.',
    howLead:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 귀하의 여행은 실제로 공유하고 싶어지는 블로그가 됩니다.',
    howStep1Kicker: '01단계 · 계획',
    howStep1Title: '장소에 핀을 꽂으십시오.',
    howStep1Body:
      '예약한 통나무집, 가 보고 싶은 식당, 오로라를 보러 갈 어두운 하늘의 명소를 라플란드 지도 위에 핀으로 표시하십시오. 떠나기 전에 경로를 짜십시오.',
    howStep2Kicker: '02단계 · 기록',
    howStep2Title: '여행하면서 쓰십시오.',
    howStep2Body:
      '휴대전화로, 통나무집에서, 차 안에서, 사우나에서. 사진과 기온, 수프의 맛을 더하십시오. 각 글은 그날과 그 장소에 자동으로 핀이 꽂힙니다.',
    howStep3Kicker: '03단계 · 공유',
    howStep3Title: '잘 쓰인 귀하의 여행.',
    howStep3Body:
      '귀하의 글은 lapland.blog/your-name 의 공개 블로그가 됩니다. 친구들이 따라 읽을 수 있고, 각 글은 Instagram 스토리로 내보낼 수 있습니다. 여행은 두 번 살아납니다.',
    howCta: '여행 블로그 시작하기',
    howFootnote: '여행기는 무료 · 카드 불필요 · Google로 로그인',
    liveEyebrow: '공개 중인 여행 블로그',
    liveH2Pre: '진짜 여행.',
    liveH2Italic: '진짜 여행자.',
    liveH2Tail: '다음은 귀하 차례입니다.',
    liveLead:
      '레비의 최상급 코스를 활강하고, 이나리에서 오로라를 쫓고, 사리셀카에서 허스키 썰매로 60km. 여기 보이는 블로그는 모두 단 한 번의 여행을 마친 여행자가 직접 작성한 것이며, 만드는 데 5분도 채 걸리지 않았습니다.',
    liveBrowseAll: '모든 블로그 보기',
    liveCta: '나의 여행 블로그 시작',
    liveFootnote: '무료 · 카드 불필요 · 첫 글까지 2분',
    featuredEyebrow: '창업자의 예시 여행기',
    featuredEvery: '모든 글 →',
    featuredLead:
      '귀하의 여행 블로그가 어떤 모습일 수 있는지 보여 드리는 예시입니다. 아래 다섯 편의 시드 글은 Lapland.blog의 편집자 목소리인 The Field Journal이 라플란드의 한겨울에 걸쳐 작성한 것입니다. 진짜 기온, 진짜 통나무집, 진짜 수프. 한 편 읽어 보시고 귀하의 여행을 떠올려 보십시오.',
    featuredLoading: '예시를 불러오는 중…',
    featuredNone: '아직 예시 글이 없습니다.',
    featuredReadEntry: '이 글 읽기',
    pillarsEyebrow: '무엇을 기록할까',
    pillarsH2Pre: '라플란드 여행을,',
    pillarsH2Italic: '세 가지 갈래로.',
    pillarsLead:
      '다른 여행자들이 남긴 글들을 둘러보시고, 귀하 자신의 여행에서 다룰 갈래를 고르십시오. 오로라, 통나무집, 음식, 추위, 사람들, 그리고 그 사이에 있는 정적.',
    pillar1Kicker: 'I · 추위',
    pillar1Title: '추위가 실제로 하는 일',
    pillar1Body:
      '오로라가 뜨는 밤, 극야, 대부분의 안내서가 빠뜨리는 여덟 계절. 이곳에서 날씨는 배경이 아니라 주인공입니다. 새벽 3시 47분 영하 23도가 어떤 느낌인지, 휴대전화 배터리에 무슨 일이 벌어지는지, 사람에게 무슨 일이 벌어지는지에 대한 현장 기록.',
    pillar2Kicker: 'II · 잠자리',
    pillar2Title: '어디서 자고 어디서 먹는가',
    pillar2Body:
      '나무로 지은 통나무집, 글래스 이글루, 잘 작동하는 사우나와 그렇지 않은 사우나. 결국 그 값을 한 42유로짜리 연어 수프. 배낭 안에서도 살아남는 호밀빵, 그리고 해가 지는 일을 잊었기에 새벽 두 시에 마시는 커피.',
    pillar3Kicker: 'III · 다른 사람들',
    pillar3Title: '이 위에 사는 또 다른 사람들',
    pillar3Body:
      '순록 목축민, 스키 패트롤, 사우나 장인, 소단퀼래 외곽의 주유소에서 네 개 언어를 쓰던 분. 라플란드는 조용하지만 결코 비어 있지 않습니다. 실제로 만나는 사람들에 관한 장문의 글.',
    latestEyebrow: '예시 글',
    latestH2: '여행 블로그가 어떻게 생겼는지 보십시오.',
    latestEvery: '모든 글',
    latestLoading: '글을 불러오는 중…',
    asideEyebrow: '왜 이 사이트가 존재하는가',
    asideH2: '라플란드는 안내 책자가 아닙니다. 귀하의 여행도 그래서는 안 됩니다.',
    asideP1:
      '해마다 수천 명이 라플란드를 찾아 무언가 특별한 것을 보고, 그것을 다시는 열어 보지 않을 휴대전화 사진첩 안으로 흘려보냅니다. 통나무집 위의 오로라. 사우나에서 돌아오는 길에 손끝이 얼어붙던 산책. 어째선지 42유로 값을 하던 연어 수프. 일주일이면 사라집니다.',
    asideP2:
      'Lapland.blog은 이를 바로잡기 위한 작은 무료 도구입니다. 어디 있었는지 핀을 꽂으십시오. 무엇을 보았는지 쓰십시오. 수프를 사진에 담으십시오. 귀국할 즈음이면 진짜 여행 블로그가 손에 있게 됩니다. 친구들이 실제로 따라 읽을 수 있고, 5년 뒤에도 다시 읽고 싶어지는 블로그입니다. 스톡 사진도, "환상의 겨울 왕국"도 없습니다. 오직 그곳에 대한 귀하의 솔직한 기록만이 남습니다.',
    asideCta1: '나의 여행 블로그 시작',
    asideCta2: 'lapland.blog 소개',
    asidePill: '귀하의 여행 · 귀하의 블로그',
    travelJournalBadge: '여행기는 무료',
    faqHeading: 'lapland.blog 자주 묻는 질문',
    faq: [
      {
        q: 'lapland.blog에서 여행 블로그를 어떻게 시작하나요?',
        a: 'Google 계정으로 로그인하고 블로그 이름을 정한 뒤 첫 글을 쓰면 됩니다. 각 글에는 텍스트, 사진, 날짜, 그리고 머문 장소를 표시하는 지도 핀을 담을 수 있습니다. 블로그는 lapland.blog/내이름 주소에 만들어지며 게시하는 즉시 공유할 수 있습니다. 설치할 것도 없고 로그인 외에 따로 설정할 것도 없습니다.',
      },
      {
        q: 'lapland.blog는 무료인가요?',
        a: '네. 블로그 시작, 글쓰기, 사진 추가, 지도에 장소 핀 찍기, 블로그 공유까지 모두 무료입니다. 가입에 카드가 필요 없고 블로그에 광고도 없습니다.',
      },
      {
        q: '라플란드 블로그를 인스타그램과 페이스북에 공유할 수 있나요?',
        a: '네. 모든 블로그에는 어디에나 올릴 수 있는 공개 링크가 있고, 각 글은 인스타그램 스토리 크기의 이미지로 내보낼 수 있어 하루의 기록을 한 번의 탭으로 공유할 수 있습니다. 친구와 가족은 별도의 계정 없이도 블로그를 열어 볼 수 있습니다.',
      },
      {
        q: '여기서 블로그를 쓰려면 라플란드에 있어야 하나요?',
        a: '아니요. lapland.blog는 핀란드 라플란드로 떠나는 여행자를 위해 만들어져 지도와 글쓰기 안내가 북쪽 여행에 맞춰져 있지만, 여행을 계획 중이든 여행 중에 쓰든 집에 돌아와 정리하든 누구나 여기서 블로그를 운영할 수 있습니다. 출발 전에 시작해 하루하루 글을 추가해도 됩니다.',
      },
      {
        q: '라플란드 여행 일기에는 무엇을 쓰면 좋나요?',
        a: '잊고 싶지 않은 것이라면 무엇이든 좋습니다. 묵었던 곳, 오로라의 모습, 가장 추웠던 아침의 기온, 뜻밖에 맛있던 음식, 허스키 썰매, 숲의 고요함. 사진 한 장과 장소 핀을 곁들인 짧은 글이 잘 어울립니다. 하루 몇 줄이 쌓여 다시 읽고 싶은 블로그가 됩니다.',
      },
    ],
  },
  startHere: {
    eyebrow: '환영합니다',
    h1: '안녕하십니까. 세 가지 입구가 있습니다.',
    lead:
      'Lapland.blog은 실제로 라플란드를 찾는 분들을 위한, 무료이며 천천히 흘러가고 사진을 중심으로 한 여행 일기 사이트입니다. 여행을 계획 중이시든, 여행 도중이시든, 귀국 후에 그때 적어 둘 걸 하고 후회하시든, 자신에게 맞는 입구를 고르십시오.',
    path1Kicker: '01 · 계획',
    path1Title: '라플란드 여행을 계획 중입니다.',
    path1Body:
      '어디서 묵고, 어떻게 도착하고, 무엇을 하고, 어디서 먹을지, 실용적인 측면입니다. 예약을 다루는 LaplandVibes 자매 사이트로 안내해 드립니다.',
    path1Cta: '여행 계획하기',
    path2Kicker: '02 · 읽기',
    path2Title: '다른 사람들이 쓴 글을 읽고 싶습니다.',
    path2Body:
      '라플란드 현지에서 작성된 엄선된 시드 글: 통나무집 짐 싸기, 연어 수프의 밤, 케미 위의 오로라. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음.',
    path2Cta: '추천 글',
    path3Kicker: '03 · 쓰기',
    path3Title: '지금 와 있습니다. 제 여행 블로그가 갖고 싶습니다.',
    path3Body:
      '이메일이나 Google로 로그인하십시오. lapland.blog 안의 한 자리를 받으십시오. 장소에 핀을 꽂고, 글을 쓰고, 친구들과 공유하십시오. 무료이며 함정도 유료 등급도 없습니다.',
    path3Cta: '블로그 시작하기',
    planEyebrow: '여행을 계획',
    planH2: '실용적인 부분은 자매 사이트에서.',
    planLead:
      'Lapland.blog은 일기입니다. 예약은 LaplandVibes의 각 자매 사이트에서 이루어집니다. 각 사이트는 자신이 가장 잘하는 한 가지에 집중합니다.',
    planStay: {
      kicker: '숙박',
      title: '통나무집, 이글루, 호텔',
      body: '글래스 이글루, 통나무집, 스키 리조트 등 라플란드 숙소 수백 곳을 비교하십시오.',
    },
    planTransport: {
      kicker: '이동',
      title: '항공편, 기차, 버스',
      body: '헬싱키 → 로바니에미 / 키틸레 / 이발로: 항공편, 야간열차, 실용적인 노선.',
    },
    planDo: {
      kicker: '체험',
      title: '허스키, 스노모빌, 사우나',
      body: '실제 운영업체의 예약 가능한 액티비티를, 보도자료가 아닌 후기와 함께.',
    },
    planEat: {
      kicker: '식사',
      title: '식음료',
      body: '실제로 가서 먹어 볼 만한 곳: 연어 수프, 호밀빵, 더 좋았던 시절을 기억하는 바.',
    },
    planAllSites: '또는 laplandvibes.com 에서 21개 이상의 모든 사이트 둘러보기',
    onlyEyebrow: '한 편만 읽으시려면',
    onlyH2: '이 한 편을 읽으십시오.',
    onlyLead: '가장 최근의 현장 일기. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음.',
    thenEyebrow: '그다음에는',
    thenH2: '현장에서 더 가져온 글.',
    everyEntry: '모든 글',
  },
  about: {
    pageTitle: '소개 | Lapland.blog',
    pageDescription:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 장소에 핀을 꽂고, 글을 쓰고, 친구들과 공유하십시오. 잘 쓰인 귀하의 여행입니다.',
    eyebrow: '플랫폼 소개',
    h1: '간직할 만한 여행 일기.',
    lead:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 오로라를 본 자리에 핀을 꽂으십시오. 통나무집을 사진에 담으십시오. 기온이 어땠는지 기록하십시오. 귀국할 즈음이면 친구들이 실제로 따라 읽을 수 있고 5년 뒤에도 다시 읽고 싶어질 여행 블로그가 손에 들어옵니다.',
    intro:
      '대부분의 라플란드 블로그는 안내 책자처럼 읽힙니다. 대부분의 여행 일기 앱은 휴대전화 사진첩 속에 방치되거나, 하루 만에 사라지는 Instagram 게시물 한 장으로만 공유됩니다. Lapland.blog은 그 사이에 있는 무언가입니다. 이미 트래픽이 있는 도메인 아래 진짜로, 천천히, 사진을 중심으로 한 여행 블로그가 원하시는 만큼 오래 보관됩니다.',
    howHeading: '사용 방법',
    howStepPin: '머물 통나무집, 가고 싶은 식당, 빛 없는 하늘 명소에 핀을 꽂으세요. 떠나기 전에 동선을 짭니다.',
    howStepWrite: '여행하면서 씁니다. 통나무집에서, 차 안에서, 사우나에서. 사진과 기온, 수프의 맛을 더하세요.',
    howStepShare: '글은 lapland.blog/내이름 의 공개 블로그가 됩니다. 친구들이 팔로우할 수 있고, 각 글은 인스타그램 스토리로 내보낼 수 있습니다.',
    howBody:
      '이메일이나 Google로 로그인하십시오. lapland.blog/me 의 자기 자리를 받으십시오. 각 글은 대표 이미지, 장소 핀, 그리고 하고 싶은 말로 구성됩니다. 초안을 저장하고, 준비가 되면 공개하고, 친구들에게 링크를 공유하십시오. 공개된 모든 글은 색인되어 검색에 노출되며, 귀하의 여행은 더 큰 라플란드 아카이브의 한 조각이 됩니다.',
    freeHeading: '무엇이 무료인가',
    freeBody:
      '글 작성, lapland.blog/me/yourname 아래의 여행 블로그 호스팅, 사진, 뉴스레터. 작성자 측에는 유료 장벽도 프리미엄 등급도 없습니다.',
    notHeading: '여기서 볼 수 없는 것',
    notBody:
      '독자 글 안의 광고성 게시물, 블로그에 끼워 넣는 제휴 쇼핑 목록. "잊을 수 없는", "버킷리스트", "환상적인", "겨울 왕국" 같은 단어는 편집 초안에서 금지하고 있으며, 귀하의 글에서도 금하실 만한 표현입니다. 글에도, 독자에게도 좋지 않습니다.',
    seedHeading: '시드 글',
    seedBody:
      '사이트에 이미 올라와 있는 다섯 편의 글은 Lapland.blog의 편집자 목소리인 The Field Journal이 작성한 것입니다. 솔직하고 천천히 흘러가며 사진을 중심으로 한 여행 블로그가 어떻게 읽힐 수 있는지를 보여 드리기 위해 마련된 것입니다. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음. 한 편 읽어 보시고 귀하의 여행을 떠올려 보십시오.',
    networkHeading: '네트워크 소개',
    networkBody:
      'Lapland.blog은 LaplandVibes 생태계의 일부입니다. 라플란드를 다루는 라플란드 사이트들의 네트워크입니다. 다른 사이트들은 어디로 갈지, 어디에 묵을지, 무엇을 할지를 알려 드립니다. 이 사이트는 여행 그 자체가 글로 남겨지는 곳입니다.',
    contactHeading: '문의',
    contactBody:
      '인사를 전하거나, 사실 오류를 바로잡거나, 출처를 밝힐 수 있는 사진을 보내 주시려면 info@lapland.blog 으로 메일을 보내 주십시오. 모두 읽고 일주일 안에 답해 드리려 합니다.',
    closing: '라플란드에서, 실제 그 시점의 기온과 시각으로 쓰였습니다.',
    ctaPrimary: '나만의 일기 시작하기 →',
    ctaSecondary: '또는',
    ctaSecondaryLink: '시드 글부터 먼저 읽기',
  },
  destinations: {
    pageTitle: '여행지 | Lapland.blog',
    pageDescription:
      '라플란드의 주요 여덟 곳: 로바니에미, 사리셀카, 레비, 케미, 이나리, 무오니오, 윌래스, 케미얘르비. 각 지역의 현장 일기를 읽거나, 최초의 글을 작성하십시오.',
    eyebrow: '어디로 갈까',
    h1Pre: '여덟 곳.',
    h1Italic: '하나의 라플란드.',
    lead:
      '여행지를 고르시고 그곳의 글을 읽으십시오. 비어 있는 곳은 다음에 쓰일 곳입니다. 첫 번째 작성자가 되실 수 있습니다.',
    beTheFirst: '첫 번째 작성자가 되기',
    entrySingular: '글',
    entryPlural: '글',
    readEntries: '글 읽기',
    beFirstWrite: '첫 글 쓰기',
    findStayPrefix: '이곳의 숙소 찾기:',
    dontSeeEyebrow: '찾으시는 곳이 없습니까?',
    plantH2: '깃발을 꽂으십시오.',
    plantLead:
      '이 목록에 없는 곳으로 가십니까? 소단퀼래, 포시오, 킬피스얘르비, 헤타. 그곳의 첫 글을 작성해 주시면 지도에 추가해 드립니다.',
    plantCta: '블로그 시작하기',
  },
  topReads: {
    pageTitle: '인기 글 | Lapland.blog',
    pageDescription:
      'Lapland.blog에서 어디부터 읽기 시작할지. 편집자의 큐레이션 목록: 초심자용 베스트, 오로라 글, 음식 글, 계절 글. 클릭수가 아닌 편집자의 안목으로 골랐습니다.',
    eyebrow: '편집자가 고른 목록',
    h1: '인기 글.',
    lead: '읽기 시작하실 곳입니다. 클릭이 아니라 편집자가 골랐습니다. 현장 일기가 늘어날수록 목록도 함께 자랍니다.',
    onlyEyebrow: '한 편만 읽으시려면',
    onlyH2: '편집자의 1위 글.',
    onlyLead:
      '보트니아만 위의 오로라, 새벽 3시 47분 영하 23도, 우리 누구도 찍지 못한 그 사진. Lapland.blog의 목소리를 정의하는 한 편입니다.',
    firstTimersEyebrow: '처음 오시는 분께',
    firstTimersTitle: '떠나기 전에 읽어 두시면 좋을 세 편.',
    firstTimersSubtitle:
      '왜 많은 분들이 오로라를 오해하시는지, 통나무집에 무엇을 챙겨 가야 하는지, 극야가 의외로 괜찮은 이유. 미리 읽으시면 현지에서 덜 놀라실 겁니다.',
    auroraEyebrow: '오로라 글',
    auroraTitle: '밤하늘 글.',
    auroraSubtitle: '쫓는 일, 사진에 담는 일, 그래도 모습을 드러내는 밤들에 관하여.',
    cabinsEyebrow: '통나무집',
    cabinsTitle: '뫼키(mökki) 글.',
    cabinsSubtitle:
      '라플란드 숲속 통나무집이 실제로 어떤 곳인지: 장작불, 사우나, 정적, 그리고 영하 30도의 옥외 화장실에 대해 아무도 말해 주지 않는 부분.',
    foodEyebrow: '식음료',
    foodTitle: '주방 글.',
    foodSubtitle:
      '42유로짜리 연어 수프, 배낭 안에서도 살아남는 호밀빵, 해가 지는 일을 잊은 탓에 새벽 두 시에 마시는 커피.',
    seasonalEyebrow: '계절',
    seasonalTitle: '추위가 실제로 하는 일.',
    seasonalSubtitle:
      '카모스(극야), 대부분의 안내서가 빠뜨리는 라플란드의 여덟 계절, 그리고 태양 없이 12월을 통과하는 작은 일.',
    ctaEyebrow: '다음은 귀하의 여행입니까?',
    ctaH2: '이 페이지의 다음 글이 되십시오.',
    ctaLead:
      '위 목록들은 독자가 쓰실 때 함께 자랍니다. 로그인하셔서 몇 편을 작성하시면, 편집자가 어울리는 글을 골라 소개합니다.',
    ctaButton: '블로그 시작하기',
  },
  archive: {
    pageTitle: '모든 글 | Lapland.blog',
    pageDescription:
      'Lapland.blog의 모든 글. 오로라, 통나무집, 음식, 계절, 사람, 장비, 그리고 라플란드에서 보내 드리는 장문의 글.',
    eyebrow: '아카이브',
    h1: '모든 글.',
    lead:
      '알고리즘도 편집의 잔재주도 없습니다. 가장 최근 글이 맨 위에 놓입니다. 필터로 범위를 좁히시거나, 이미 찾으시는 것을 아신다면 검색을 이용하십시오.',
    all: '전체',
    filterAria: '카테고리로 필터',
    searchSr: '글 검색',
    searchPlaceholder: '제목, 태그 검색…',
    loading: '글을 불러오는 중…',
    emptyTitle: '해당하는 글이 없습니다.',
    emptyBody: '필터를 해제하시거나 다른 단어로 검색해 보십시오.',
  },
  category: {
    allStoriesBack: '모든 글',
    categoryPrefix: '카테고리',
    storySingular: '글',
    storyPlural: '글',
    loading: '글을 불러오는 중…',
    emptyTitle: '아직 글이 없습니다.',
    emptyBody: '이 카테고리는 첫 글을 기다리고 있습니다. 잠시 후 다시 들러 주십시오.',
    emptyLink: '모든 글 둘러보기 →',
    keepExploringEyebrow: '계속 둘러보기',
    otherThemes: '다른 주제',
  },
  post: {
    allStories: '모든 글',
    by: '작성자',
    minRead: '분 소요',
    loadingStory: '글을 불러오는 중…',
    readNextEyebrow: '다음으로 읽기',
    readNextH2: '일기에서 더 보기',
    tagged: '태그',
    exploreMore: 'LaplandVibes 네트워크에서 더 둘러보기',
    editorialLabel: 'Field Journal 글',
    editorialNote: '정직한 여행 일기가 어떤 모습인지 보여 주기 위해 Lapland.blog의 편집 목소리 The Field Journal이 쓴 몇 편의 샘플 글 중 하나입니다. 장소와 기온은 모두 실제이며, 여러분의 글은 여러분이 직접 씁니다.',
  },
  signIn: {
    pageTitle: '라플란드 여행을 계획하세요 | Lapland.blog',
    pageDescription:
      '무료 여행 페이지, 맞춤 팁, 라플란드 여정에 맞는 최적의 혜택을 받아 보십시오. 언제 방문하시는지 알려 주시면 모든 단계를 함께 계획해 드립니다.',
    back: '뒤로',
    eyebrow: '무료 여행 페이지',
    h1Pre: '계획하세요:',
    h1Italic: '라플란드 여행.',
    lead:
      'lapland.blog/yourname 에서 본인의 페이지를 받으십시오. 여행 이야기를 쓰고, 사진을 공유하고, 여정에 맞춘 팁과 혜택을 받으십시오. 언제 오시는지 알려 주시면 모든 단계를 도와 드립니다.',
    benefit1Title: '라플란드 지도에 경로 핀 꽂기',
    benefit1Body: '통나무집, 식당, 오로라 명소: 출발 전에 미리 핀을 꽂으십시오.',
    benefit2Title: '휴대전화로 글 작성',
    benefit2Body: '통나무집에서, 차 안에서, 사우나에서. 사진, 날씨, 이야기.',
    benefit3Title: '한 번의 탭으로 Instagram 공유',
    benefit3Body: '각 글은 세로형 스토리로 내보내져, 친구들이 실제로 열어 봅니다.',
    footnote: '여행기는 무료 · 신용카드 불필요 · 핀란드 제작',
    sentTitle: '받은편지함을 확인해 주십시오',
    sentBody:
      '{email} 로 매직 링크를 보냈습니다. 링크를 누르시면 여행 블로그가 활성화됩니다. 링크는 한 시간 후 만료됩니다.',
    useDifferent: '다른 이메일로 다시 시도',
    reserveEyebrow: '페이지 예약',
    formH2: '라플란드 여행 계획',
    formLead: '방문 시점에 맞춰 여행 페이지를 만들어 드리고 맞춤 팁을 보내 드립니다.',
    emailLabel: '이메일',
    emailPlaceholder: 'you@example.com',
    travelLabel: '라플란드를 언제 방문하십니까?',
    monthLabel: '월…',
    yearLabel: '연도…',
    noDates: '아직 꿈만 꾸는 중, 날짜 미정',
    enterEmail: '시작하시려면 이메일을 입력해 주십시오.',
    sending: '매직 링크를 보내는 중…',
    submitCta: '나의 여행 페이지 예약',
    months: [
      '1월','2월','3월','4월','5월','6월',
      '7월','8월','9월','10월','11월','12월',
    ],
  },
  unsubscribe: {
    pageTitle: '구독 해지 | Lapland.blog',
    pageDescription: 'Lapland.blog 뉴스레터를 구독 해지합니다. 한 번의 클릭, 붙잡지 않습니다.',
    eyebrow: '뉴스레터',
    h1: '구독 해지',
    successTitle: '구독이 해지되었습니다.',
    successBody:
      '떠나시게 되어 아쉽습니다. Lapland.blog에서 더 이상 메일을 보내 드리지 않습니다. 마음이 바뀌시면 모든 페이지에 등록 양식이 있습니다.',
    backHome: '← 홈으로 돌아가기',
    lead: '구독하신 이메일을 입력해 주십시오. 한 번의 클릭으로 해지됩니다. 확인 반복도, 설문도 없습니다.',
    emailPlaceholder: 'your@email.com',
    processing: '처리 중…',
    submit: '구독 해지',
  },
  notFound: {
    pageTitle: '페이지를 찾을 수 없음 | Lapland.blog',
    pageDescription: '이 페이지는 존재하지 않습니다. 이동, 이름 변경, 또는 눈 속에 잃어버렸을 수 있습니다.',
    eyebrow: '페이지 없음 · 404',
    h1: '눈 속에서 길을 잃었습니다.',
    body: '이 페이지는 존재하지 않거나 아직 존재하지 않습니다. 어느 쪽이든 블로그의 나머지는 이쪽에 있습니다.',
    backHome: '홈으로 돌아가기',
    allStories: '모든 글 →',
  },
  chrome: {
    readTheStory: '이야기 읽기',
    shareThisStory: '이 이야기 공유하기',
    inThisStory: '이 이야기 속에서',
    fieldJournalEntry: '필드 저널 기록',
    liveTripBlog: '실시간 여행 블로그',
    yoursCouldBeNext: '다음은 당신의 차례일 수 있습니다.',
    featuredBadge: '추천',
    minRead: '분 분량',
  },
  footer: {
    ...en.footer,
    networkBadge: '라플란드 네트워크',
    tagline: '라플란드 블로그: 정직한 여행기, 사미 문화, 오로라, 그리고 북극의 밤하늘.',
    travelGuide: '라플란드 여행 가이드',
    aboutEyebrow: 'Lapland Blog 소개',
    aboutBody: '진정한 라플란드 블로그: 현지 작가가 큐레이션한 여행기, 사미 문화, 오로라, 그리고 북극의 일상.',
    aboutBadge: '독립 운영 · 출처 명시',
    spottedError: { title: '오류를 발견하셨나요?', body: '수정이 필요한 부분이 있다면 알려주세요. 즉시 수정합니다.', cta: '오류 신고 →' },
    partner: { title: '파트너십', body: '21개 이상의 라플란드 사이트에서 광고와 협업.', cta: '문의하기 →' },
    press: { title: '언론 및 미디어', body: '편집 파트너십 및 보도자료 키트.', cta: '언론 문의 →' },
    copyright: '© {{year}} #LaplandVibes · #LaplandVibes 네트워크의 일부',
    websiteBy: '웹사이트 제작: Yrityspaketit.fi',
    privacy: '개인정보처리방침',
    cookiePolicy: '쿠키 정책',
    terms: '이용약관',
    contact: '연락처',
    groups: { stay: '숙박', eatDrink: '식음료', do: '액티비티', explore: '탐험', essentials: '필수 정보' },
  },
  newsletter: {
    ...en.newsletter,
    eyebrow: '#LaplandVibes 뉴스레터',
    h2: '주간 라플란드 소식',
    lead: '의 짧은 메일: 새로운 여행기, 사우나 팁, 오로라 알림, 그리고 우리가 들려드리고 싶은 라플란드 이야기.',
    placeholder: 'your@email.com',
    subscribing: '등록 중…',
    subscribe: '구독하기',
    successTitle: '구독이 완료되었습니다.',
    successBody: '받은편지함을 확인해 주세요. 환영 메일이 곧 도착합니다.',
    alreadyTitle: '이미 구독 중이십니다',
    alreadyBody: '이미 명단에 있으십니다. 양질의 콘텐츠가 계속 전달됩니다.',
    agreeText: '구독함으로써 다음에 동의하신 것으로 간주됩니다',
    privacyLink: '개인정보처리방침',
    unsubscribeNote: '언제든지 구독을 해지하실 수 있습니다. 이메일은 외부에 공유되지 않습니다.',
  },
  cookieBanner: {
    headline: '쿠키 사용 안내',
    body: '사이트 분석을 위해 쿠키를 사용합니다. 자세한 내용은 쿠키 정책을 참조해 주세요.',
    accept: '동의',
    decline: '거부',
  },
};

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

const nl: SectionCopy = {
  ...en,
  nav: {
    startHere: 'Begin hier',
    topReads: 'Topartikelen',
    destinations: 'Bestemmingen',
    tripDiaries: 'Reisverslagen',
    about: 'Over ons',
    startYourBlog: 'Start uw blog',
    signIn: 'Inloggen',
    subscribe: 'Abonneren',
    myTripBlog: 'Mijn reisblog',
    adminDashboard: 'Beheerdersdashboard',
    signOut: 'Uitloggen',
    signedInAs: 'Ingelogd als',
  },
  home: {
    heroEyebrow: 'Reisdagboek · Kaart · Delen',
    heroLine1: 'Gaat u naar Lapland?',
    heroLine2: 'Start een blog van uw reis.',
    heroLead:
      'Zet een speld op de plek waar u het noorderlicht zag. Fotografeer de hut. Schrijf op wat de temperatuur deed. Bouw een mooie blog van uw reis, een blog die uw vrienden echt kunnen volgen.',
    heroPrimaryCta: 'Start uw reisblog',
    heroSecondaryCta: 'Zie hoe het werkt',
    heroFootnote: 'Gratis · Gemaakt in Finland · Deel via Instagram · Zonder reclame',
    seasonalBadge: 'Nu in het seizoen · Middernachtszon · 6 jun → 7 jul',
    seasonalH2: 'Een gratis reisblog voor je Lapland-reis, onderweg geschreven.',
    seasonalLead:
      'Lapland.blog maakt van je reis een eenvoudige, mooie blog: prik de plekken vast, voeg foto’s toe, schrijf op wat er gebeurde, en deel de link met vrienden. Op dit moment betekent dat zomer. Tweeëndertig nachten waarin de zon niet ondergaat, het bos amberkleurig wordt en de meren de hemel weerspiegelen. Begin het dagboek terwijl je er nog bent.',
    seasonalCta1: 'Start je reisblog',
    seasonalCta2: 'Lees zomerverhalen',
    seasonalCard1Title: '24 uur gouden uur',
    seasonalCard1Body: 'De zon scheert langs de horizon. Fotografen noemen het het langste blauwe uur ter aarde.',
    seasonalCard2Title: 'Kruipbeszomer',
    seasonalCard2Body: 'Eind juli kleurt het hoogveen goud. Lokale bewoners noemen het de tweede oogst.',
    seasonalCard3Title: 'Sauna, dan het meer in',
    seasonalCard3Body: 'Een meer van 14 °C om middernacht, vijf stappen verder een sauna van 90 °C. Herhaal.',
    seasonalCard4Title: 'Niemand anders',
    seasonalCard4Body: 'De hutten die in de winter volgeboekt zijn, staan in juli leeg. Hetzelfde bos, geen wachtrij.',
    seasonalLabels: { light: '01 · Licht', forest: '02 · Bos', water: '03 · Water', quiet: '04 · Stilte' },
    howEyebrow: 'Hoe het werkt',
    howH2Pre: 'Drie stappen. Eén reis.',
    howH2Italic: 'Een blog die u wilt bewaren.',
    howLead:
      'Lapland.blog is een gratis reisdagboekplatform voor bezoekers van Fins Lapland. Uw reis wordt een blog die u echt zult willen delen.',
    howStep1Kicker: 'Stap 01 · Plannen',
    howStep1Title: 'Prik de plekken vast.',
    howStep1Body:
      'Zet spelden op de Lapland-kaart voor de hut die u boekte, het restaurant dat u wilt proberen en de donkere plek voor het noorderlicht. Bouw uw route voordat u vliegt.',
    howStep2Kicker: 'Stap 02 · Dagboek',
    howStep2Title: 'Schrijf onderweg.',
    howStep2Body:
      'Vanaf uw telefoon, in de hut, in de auto, in de sauna. Voeg foto’s, de temperatuur en wat de soep deed. Elke notitie haakt zichzelf aan de dag en de plek.',
    howStep3Kicker: 'Stap 03 · Delen',
    howStep3Title: 'Uw reis, goed verteld.',
    howStep3Body:
      'Uw notities worden een openbare blog op lapland.blog/uw-naam. Vrienden kunnen hem volgen. Elke post wordt geëxporteerd naar een Instagram-story, en de reis leeft tweemaal.',
    howCta: 'Start uw reisblog',
    howFootnote: 'Gratis voor reisdagboeken · Geen creditcard nodig · Aanmelden met Google',
    liveEyebrow: 'Live reisblogs',
    liveH2Pre: 'Echte reizen.',
    liveH2Italic: 'Echte reizigers.',
    liveH2Tail: 'De volgende bent u.',
    liveLead:
      'De zwarte pistes van Levi. Noorderlichtjagen in Inari. 60 km met huskysleeën in Saariselkä. Elke blog die u hier ziet is geschreven door een bezoeker tijdens één reis, en in minder dan vijf minuten opgezet.',
    liveBrowseAll: 'Alle blogs bekijken',
    liveCta: 'Start mijn reisblog',
    liveFootnote: 'Gratis · Geen kaart · Eerste notitie binnen 2 minuten',
    featuredEyebrow: 'Voorbeelddagboek van de oprichter',
    featuredEvery: 'Elke notitie →',
    featuredLead:
      'Dit is hoe uw eigen reisblog eruit zou kunnen zien. De vijf voorbeeldnotities hieronder zijn geschreven door The Field Journal, de redactionele stem van Lapland.blog, gedurende één Laplandse winter. Echte temperaturen, echte hutten, echte soep. Lees er één en stel zich uw eigen reis voor.',
    featuredLoading: 'Voorbeeld laden…',
    featuredNone: 'Nog geen voorbeeldnotities.',
    featuredReadEntry: 'Lees deze notitie',
    pillarsEyebrow: 'Wat te beschrijven',
    pillarsH2Pre: 'De reis door Lapland,',
    pillarsH2Italic: 'in drie draden.',
    pillarsLead:
      'Blader door wat andere reizigers vastlegden, en kies de draden waarover u zelf wilt schrijven. Noorderlicht, hutten, eten, de kou, de mensen en de stiltes ertussen.',
    pillar1Kicker: 'I · De kou',
    pillar1Title: 'Wat de kou werkelijk doet',
    pillar1Body:
      'Noorderlichtnachten, de poolduisternis, de acht seizoenen die de meeste lijstjes vergeten. Het weer is hier de hoofdpersoon, geen achtergrond. Veldnotities over hoe min drieëntwintig om 03:47 voelt, wat het doet met een telefoonbatterij en met een mens.',
    pillar2Kicker: 'II · Het onderdak',
    pillar2Title: 'Waar u slaapt, waar u eet',
    pillar2Body:
      'Houten hutten, glaziglo’s, sauna’s die werken en sauna’s die niet werken. De zalmsoep van tweeënveertig euro die het uiteindelijk waard bleek. Het roggebrood dat een rugzak overleeft en de koffie die u om twee uur ’s nachts drinkt omdat de zon vergat onder te gaan.',
    pillar3Kicker: 'III · De anderen',
    pillar3Title: 'Wie er nog meer hier woont',
    pillar3Body:
      'Rendierherders, skipatrouilles, saunameesters, de man bij het tankstation net buiten Sodankylä die vier talen sprak. Lapland is stil, maar nooit leeg. Lange stukken over de mensen die u werkelijk ontmoet.',
    latestEyebrow: 'Voorbeeldnotities',
    latestH2: 'Zie hoe een reisblog eruitziet.',
    latestEvery: 'Elke notitie',
    latestLoading: 'Verhalen laden…',
    asideEyebrow: 'Waarom dit bestaat',
    asideH2: 'Lapland is geen brochure. Uw reis hoeft dat ook niet te zijn.',
    asideP1:
      'Elk jaar komen duizenden bezoekers in Lapland aan, zien iets buitengewoons en verliezen het in een fotorol die ze nooit meer openen. Het noorderlicht boven de hut. De wandeling met verdoofde vingertoppen terug van de sauna. De kom zalmsoep die op een of andere manier 42 euro waard was. Binnen een week verdwenen.',
    asideP2:
      'Lapland.blog is een klein, gratis hulpmiddel om dat op te lossen. Prik vast waar u was. Schrijf op wat u zag. Fotografeer de soep. Tegen de tijd dat u naar huis vliegt heeft u een echte blog van uw reis: een die uw vrienden kunnen volgen, een die u over vijf jaar nog wilt lezen. Geen stockfoto’s. Geen "magisch winterwonderland". Alleen uw eigen eerlijke versie van de plek.',
    asideCta1: 'Start uw eigen',
    asideCta2: 'Over lapland.blog',
    asidePill: 'Uw reis · Uw blog',
    travelJournalBadge: 'Gratis voor reisdagboeken',
    faqHeading: 'Veelgestelde vragen over lapland.blog',
    faq: [
      {
        q: 'Hoe begin ik een reisblog op lapland.blog?',
        a: "Log in met uw Google-account, geef uw blog een naam en schrijf uw eerste bericht. Elk bericht kan tekst, foto's, de datum en een kaartspeld voor uw locatie bevatten. Uw blog staat op lapland.blog/uw-naam en is klaar om te delen zodra u publiceert. Er valt niets te installeren en er is geen instelling nodig behalve inloggen.",
      },
      {
        q: 'Is lapland.blog gratis?',
        a: "Ja. Een blog starten, berichten schrijven, foto's toevoegen, plekken op de kaart prikken en uw blog delen is allemaal gratis. Er is geen betaalkaart nodig om u aan te melden en op uw blog staan geen advertenties.",
      },
      {
        q: 'Kan ik mijn Lapland-blog delen op Instagram en Facebook?',
        a: "Ja. Elke blog heeft een openbare link die u overal kunt plaatsen, en elk bericht kunt u exporteren als afbeelding op Instagram-storyformaat, zodat u één dag met een tik deelt. Vrienden en familie kunnen uw blog openen zonder eigen account.",
      },
      {
        q: 'Moet ik in Lapland zijn om hier een blog te schrijven?',
        a: "Nee. We hebben lapland.blog gemaakt voor reizigers naar Fins Lapland, dus de kaart en de schrijftips zijn afgestemd op reizen naar het noorden, maar iedereen kan hier een blog bijhouden, of u nu een reis plant, onderweg schrijft of het na thuiskomst aanvult. U kunt beginnen voordat u vertrekt en dag voor dag berichten toevoegen.",
      },
      {
        q: 'Waarover schrijf ik in mijn Lapland-reisdagboek?',
        a: "Over alles wat u niet wilt vergeten. Waar u sliep, hoe het noorderlicht eruitzag, de temperatuur op de koudste ochtend, de maaltijd die u verraste, de huskytocht, de stilte van het bos. Korte berichten met een foto en een plaatsspeld werken goed. Een paar regels per dag groeien uit tot een blog die u opnieuw wilt lezen.",
      },
    ],
  },
  startHere: {
    eyebrow: 'Welkom',
    h1: 'Hallo. Drie ingangen.',
    lead:
      'Lapland.blog is een gratis, langzame, fotogerichte reisdagboeksite voor mensen die werkelijk naar Fins Lapland gaan. Of u nu een reis plant, midden in een reis zit of thuis bent en wenste dat u alles had opgeschreven, kies uw pad.',
    path1Kicker: '01 · Plannen',
    path1Title: 'Ik plan een reis naar Lapland.',
    path1Body:
      'Waar u slaapt, hoe u er komt, wat u doet, waar u eet: het praktische deel. Ga door naar de LaplandVibes-zustersites die de boekingen regelen.',
    path1Cta: 'Plan uw reis',
    path2Kicker: '02 · Lezen',
    path2Title: 'Ik wil lezen wat anderen schreven.',
    path2Body:
      'Zorgvuldig gekozen voorbeeldnotities, geschreven in Finland: de hut inpakken, de zalmsoepavond, het noorderlicht boven Kemi. Echte temperaturen, echte tijden, geen brochurestem.',
    path2Cta: 'Topartikelen',
    path3Kicker: '03 · Schrijven',
    path3Title: 'Ik ben er. Ik wil een blog van mijn reis.',
    path3Body:
      'Meld u aan met e-mail of Google. U krijgt een hoekje van lapland.blog. Prik plekken vast, schrijf notities, deel met vrienden. Gratis, geen addertjes, geen premiumlaag.',
    path3Cta: 'Start uw blog',
    planEyebrow: 'Plan uw reis',
    planH2: 'Het praktische deel, op de zustersites.',
    planLead:
      'Lapland.blog is het dagboek. De boekingen gebeuren op de LaplandVibes-spaken, elk gericht op één ding dat ze goed doen.',
    planStay: {
      kicker: 'Verblijven',
      title: 'Hutten, iglo’s, hotels',
      body: 'Vergelijk honderden verblijven in Lapland: glaziglo’s, blokhutten, skiresorts.',
    },
    planTransport: {
      kicker: 'Komen',
      title: 'Vluchten, treinen, bussen',
      body: 'Helsinki → Rovaniemi / Kittilä / Ivalo: vluchten, nachttreinen, de praktische routes.',
    },
    planDo: {
      kicker: 'Doen',
      title: 'Husky, sneeuwscooter, sauna',
      body: 'Boekbare activiteiten bij de échte aanbieders, mét recensies, geen persbericht.',
    },
    planEat: {
      kicker: 'Eten',
      title: 'Eten en drinken',
      body: 'Waar u écht moet eten: de zalmsoep, het rogge­brood, de bars die betere decennia hebben gezien.',
    },
    planAllSites: 'Of bekijk alle 27 sites op laplandvibes.com',
    onlyEyebrow: 'Als u er maar één leest',
    onlyH2: 'Lees deze.',
    onlyLead: 'De nieuwste veldnotitie. Echte temperatuur, echte tijd, geen brochurestem.',
    thenEyebrow: 'En daarna deze',
    thenH2: 'Meer uit het veld.',
    everyEntry: 'Elke notitie',
  },
  about: {
    pageTitle: 'Over ons | Lapland.blog',
    pageDescription:
      'Lapland.blog is een gratis reisdagboekplatform voor bezoekers van Fins Lapland. Prik plekken vast, schrijf notities, deel met vrienden. Uw reis, goed verteld.',
    eyebrow: 'Over het platform',
    h1: 'Een reisdagboek dat u wilt bewaren.',
    lead:
      'Lapland.blog is een gratis reisdagboekplatform voor bezoekers van Fins Lapland. Prik de plek vast waar u het noorderlicht zag. Fotografeer de hut. Schrijf op wat de temperatuur deed. Tegen de tijd dat u naar huis vliegt, hebt u een blog van uw reis: een die uw vrienden kunnen volgen, en een die u over vijf jaar nog wilt lezen.',
    intro:
      'De meeste Lapland-blogs lezen als een brochure. De meeste reisdagboek-apps belanden achtergelaten in een fotorol of als één Instagram-post die binnen een dag verdwijnt. Lapland.blog is daartussenin: een echte, langzame, fotogerichte blog van uw reis, gehost onder een naam die al verkeer trekt, zo lang bewaard als u wilt.',
    howHeading: 'Hoe het werkt',
    howStepPin: 'Prik de hut, het restaurant, de donkere-hemelplek vast. Bouw je route voordat je vertrekt.',
    howStepWrite: 'Schrijf onderweg, vanuit de hut, de auto, de sauna. Voeg foto’s toe, de temperatuur en hoe de soep smaakte.',
    howStepShare: 'Je berichten worden een openbare blog op lapland.blog/jouw-naam. Vrienden kunnen volgen; elk bericht exporteer je als Instagram-story.',
    howBody:
      'Meld u aan met e-mail of Google. U krijgt uw plek op lapland.blog/me. Elke notitie heeft een hoofdbeeld, een plek op de kaart en de woorden die u wilt zeggen. Sla concepten op, publiceer wanneer het klaar is, deel de link met vrienden. Elke gepubliceerde notitie wordt geïndexeerd en is doorzoekbaar, en uw reis wordt een klein stukje van het grotere Lapland-archief.',
    freeHeading: 'Wat gratis is',
    freeBody:
      'Notities schrijven. Uw reisblog hosten onder lapland.blog/me/uwnaam. Foto’s. De nieuwsbrief. Aan de auteurskant is er geen paywall en geen premium niveau.',
    notHeading: 'Wat u hier niet vindt',
    notBody:
      'Gesponsorde berichten in de lezersnotities. Affiliate winkellijsten in uw blog. De woorden "onvergetelijk", "bucketlist", "magisch" of "winterwonderland" zijn verbannen uit de redactieconcepten, en het overwegen waard om ook uit de uwe te bannen. Slecht voor schrijven, slecht voor lezers.',
    seedHeading: 'De voorbeeldnotities',
    seedBody:
      'De vijf notities die al op de site staan zijn geschreven door The Field Journal, de redactionele stem van Lapland.blog. Ze laten zien hoe een eerlijke, langzame, fotogerichte reisblog kan lezen: echte temperaturen, echte tijden, geen brochurestem. Lees er één en stel zich uw eigen reis voor.',
    networkHeading: 'Over het netwerk',
    networkBody:
      'Lapland.blog maakt deel uit van het LaplandVibes-ecosysteem, een netwerk van Finse sites over Lapland. De andere sites vertellen u waar u heen moet, waar u slaapt en wat u doet. Deze site is waar de reis zelf wordt opgeschreven.',
    contactHeading: 'Neem contact op',
    contactBody:
      'Wilt u gedag zeggen, een feitelijke fout corrigeren of een foto sturen die we kunnen crediteren, mail dan naar info@lapland.blog. We lezen alles en proberen binnen een week te antwoorden.',
    closing: 'Geschreven vanuit Fins Lapland, op de temperatuur en het uur waarop het werkelijk gebeurde.',
    ctaPrimary: 'Start uw eigen dagboek →',
    ctaSecondary: 'Of',
    ctaSecondaryLink: 'lees eerst de voorbeeldnotities',
  },
  destinations: {
    pageTitle: 'Bestemmingen | Lapland.blog',
    pageDescription:
      'De acht belangrijkste bestemmingen in Fins Lapland: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Lees de veldnotities van elk.',
    eyebrow: 'Waar naartoe',
    h1Pre: 'Acht plaatsen.',
    h1Italic: 'Eén Lapland.',
    lead:
      'Kies een bestemming en lees de notities van daar. Lege plekken zijn de volgende om te schrijven, u kunt de eerste zijn.',
    beTheFirst: 'Wees de eerste',
    entrySingular: 'notitie',
    entryPlural: 'notities',
    readEntries: 'Notities lezen',
    beFirstWrite: 'Schrijf de eerste',
    findStayPrefix: 'Vind een verblijf in',
    dontSeeEyebrow: 'Uw plek staat er niet bij?',
    plantH2: 'Plant de vlag.',
    plantLead:
      'Gaat u ergens heen die niet in deze lijst staat? Sodankylä, Posio, Kilpisjärvi, Hetta. Schrijf van daar de eerste notitie en wij zetten hem op de kaart.',
    plantCta: 'Start uw blog',
  },
  topReads: {
    pageTitle: 'Topartikelen | Lapland.blog',
    pageDescription:
      'Waar te beginnen op Lapland.blog. Lijsten van de redactie: beste notities voor de eerste reis, beste noorderlichtstukken, beste eetnotities, seizoenen.',
    eyebrow: 'Lijsten van de redactie',
    h1: 'Topartikelen.',
    lead: 'Hier begint u. Door de redactie gekozen, niet door klikken. Naarmate er meer veldnotities verschijnen, groeien deze lijsten mee.',
    onlyEyebrow: 'Als u er maar één leest',
    onlyH2: 'De nummer één van de redactie.',
    onlyLead:
      'Noorderlicht boven de Botnische Golf, –23 om 03:47, en de foto die geen van ons maakte. Het stuk dat de stem van Lapland.blog bepaalt.',
    firstTimersEyebrow: 'Voor de eerste keer',
    firstTimersTitle: 'Drie stukken om voor vertrek te lezen.',
    firstTimersSubtitle:
      'Waarom veel mensen het noorderlicht verkeerd zien, wat in te pakken voor een hut en waarom de poolduisternis eigenlijk meevalt. Lees deze en u komt minder verbaasd aan.',
    auroraEyebrow: 'Noorderlichtstukken',
    auroraTitle: 'De nachthemelnotities.',
    auroraSubtitle: 'Over het najagen, het fotograferen en de nachten waarop het toch verschijnt.',
    cabinsEyebrow: 'De hutten',
    cabinsTitle: 'Mökki-notities.',
    cabinsSubtitle:
      'Hoe een Finse boshut werkelijk is: vuur, sauna, stilte, en wat niemand zegt over het buitentoilet bij –30.',
    foodEyebrow: 'Eten + drinken',
    foodTitle: 'De keukenstukken.',
    foodSubtitle:
      'Zalmsoep van tweeënveertig euro, roggebrood dat een rugzak overleeft en de koffie die u om twee uur ’s nachts drinkt omdat de zon vergat onder te gaan.',
    seasonalEyebrow: 'Seizoenen',
    seasonalTitle: 'Wat de kou werkelijk doet.',
    seasonalSubtitle:
      'Kaamos, de acht seizoenen van Lapland die de meeste lijsten vergeten, en het kleine bedrijf om december zonder zon door te komen.',
    ctaEyebrow: 'Uw reis als volgende?',
    ctaH2: 'Wees de volgende notitie op deze pagina.',
    ctaLead:
      'De lijsten hierboven groeien als lezers schrijven. Meld u aan, schrijf een paar notities en de redactie zal de notities die het verdienen uitlichten.',
    ctaButton: 'Start uw blog',
  },
  archive: {
    pageTitle: 'Alle verhalen | Lapland.blog',
    pageDescription:
      'Elk verhaal op Lapland.blog. Noorderlicht, hutten, eten, seizoenen, mensen, uitrusting en lange leesstukken uit Fins Lapland.',
    eyebrow: 'Archief',
    h1: 'Elk verhaal.',
    lead:
      'Geen algoritme, geen redactionele truc. Het nieuwste staat bovenaan. Gebruik het filter om in te perken, of zoek als u al weet wat u zoekt.',
    all: 'Alle',
    filterAria: 'Filter op categorie',
    searchSr: 'Verhalen zoeken',
    searchPlaceholder: 'Titels, labels…',
    loading: 'Verhalen laden…',
    emptyTitle: 'Geen verhalen die passen.',
    emptyBody: 'Probeer het filter te wissen of een ander woord te zoeken.',
  },
  category: {
    allStoriesBack: 'Alle verhalen',
    categoryPrefix: 'Categorie',
    storySingular: 'verhaal',
    storyPlural: 'verhalen',
    loading: 'Verhalen laden…',
    emptyTitle: 'Nog niets hier.',
    emptyBody: 'Deze categorie wacht op het eerste verhaal. Kom snel terug.',
    emptyLink: 'Blader door alle verhalen →',
    keepExploringEyebrow: 'Blijf verkennen',
    otherThemes: 'Andere thema’s',
  },
  post: {
    allStories: 'Alle verhalen',
    by: 'Door',
    minRead: 'min lezen',
    loadingStory: 'Verhaal laden…',
    readNextEyebrow: 'Lees hierna',
    readNextH2: 'Meer uit het dagboek',
    tagged: 'Getagd',
    exploreMore: 'Ontdek meer in het LaplandVibes-netwerk',
    editorialLabel: 'Een Field Journal-bericht',
    editorialNote: 'Een van de paar voorbeeldberichten geschreven door The Field Journal, de redactionele stem van Lapland.blog, om te laten zien hoe een eerlijk reisdagboek leest. Echte plekken, echte temperaturen. Je eigen berichten schrijf je zelf.',
  },
  signIn: {
    pageTitle: 'Plan uw Lapland-reis | Lapland.blog',
    pageDescription:
      'Een gratis reispagina, persoonlijke tips en de beste deals voor uw Lapland-reis. Vertel ons wanneer u komt en we helpen u bij elke stap.',
    back: 'Terug',
    eyebrow: 'Uw gratis reispagina',
    h1Pre: 'Plan uw',
    h1Italic: 'Lapland-reis.',
    lead:
      'U krijgt uw pagina op lapland.blog/uwnaam. Schrijf uw reisverhaal, deel foto’s en ontvang persoonlijke tips en deals voor uw reis. Vertel ons wanneer u komt en we helpen u stap voor stap.',
    benefit1Title: 'Prik uw route vast op de Lapland-kaart',
    benefit1Body: 'Hut, restaurant, noorderlichtplek: zet de spelden voordat u vliegt.',
    benefit2Title: 'Schrijf notities vanaf uw telefoon',
    benefit2Body: 'Vanuit de hut, de auto, de sauna. Foto’s, weer, verhalen.',
    benefit3Title: 'Deel in één tik op Instagram',
    benefit3Body: 'Elke notitie wordt geëxporteerd als verticale story die uw vrienden echt openen.',
    footnote: 'Gratis voor reisdagboeken · Geen creditcard nodig · Gemaakt in Finland',
    sentTitle: 'Controleer uw inbox',
    sentBody:
      'We hebben een magische link gestuurd naar {email}. Klik erop en uw reisblog staat live. De link verloopt over een uur.',
    useDifferent: 'Gebruik een ander e-mailadres',
    reserveEyebrow: 'Reserveer uw pagina',
    formH2: 'Plan uw Lapland-reis',
    formLead: 'We maken uw reispagina en sturen u persoonlijke tips op basis van wanneer u komt.',
    emailLabel: 'Uw e-mailadres',
    emailPlaceholder: 'u@example.com',
    travelLabel: 'Wanneer bezoekt u Lapland?',
    monthLabel: 'Maand…',
    yearLabel: 'Jaar…',
    noDates: 'Ik droom nog, nog geen datum',
    enterEmail: 'Vul uw e-mailadres in om te beginnen.',
    sending: 'Magische link versturen…',
    submitCta: 'Reserveer mijn reispagina',
    months: [
      'januari','februari','maart','april','mei','juni',
      'juli','augustus','september','oktober','november','december',
    ],
  },
  unsubscribe: {
    pageTitle: 'Uitschrijven | Lapland.blog',
    pageDescription: 'Schrijf u uit van de Lapland.blog-nieuwsbrief. Eén klik, zonder hard gevoel.',
    eyebrow: 'Nieuwsbrief',
    h1: 'Uitschrijven',
    successTitle: 'U bent uitgeschreven.',
    successBody:
      'Jammer dat u gaat. U ontvangt geen e-mails meer van Lapland.blog. Mocht u van gedachten veranderen, dan staat het aanmeldformulier op elke pagina.',
    backHome: '← Terug naar de startpagina',
    lead: 'Voer het e-mailadres in waarmee u zich heeft aangemeld. Eén klik en u bent eruit. Geen "weet u het zeker?"-loops, geen enquête.',
    emailPlaceholder: 'uw@email.com',
    processing: 'Bezig…',
    submit: 'Uitschrijven',
  },
  notFound: {
    pageTitle: 'Niet gevonden | Lapland.blog',
    pageDescription: 'Deze pagina bestaat niet. Mogelijk is hij verplaatst, hernoemd of verloren in de sneeuw.',
    eyebrow: 'Niet gevonden · 404',
    h1: 'Verdwaald in de sneeuw.',
    body: 'Deze pagina bestaat niet, of nog niet. Hoe dan ook, de rest van de blog is deze kant op.',
    backHome: 'Terug naar de startpagina',
    allStories: 'Alle verhalen →',
  },
  chrome: {
    readTheStory: 'Lees het verhaal',
    shareThisStory: 'Deel dit verhaal',
    inThisStory: 'In dit verhaal',
    fieldJournalEntry: 'Veldjournaal-notitie',
    liveTripBlog: 'Live-reisblog',
    yoursCouldBeNext: 'De jouwe kan de volgende zijn in deze carrousel.',
    featuredBadge: 'Uitgelicht',
    minRead: 'min leestijd',
  },
  footer: {
    ...en.footer,
    networkBadge: 'Fins-Lapland-netwerk',
    tagline: 'De blog van Fins Lapland: eerlijke reisverslagen, Sami-cultuur, noorderlicht en het alledaagse arctische leven.',
    travelGuide: 'Lapland-reisgids',
    aboutEyebrow: 'Over Lapland Blog',
    aboutBody: 'Een echte Lapland-blog: reisverslagen, Sami-cultuur, noorderlicht en het arctische dagelijks leven, geschreven door lokale auteurs.',
    aboutBadge: 'Onafhankelijk beheerd · bronnen vermeld',
    spottedError: { title: 'Een fout gezien?', body: 'Iets dat aangepast moet worden? Laat het ons weten, we corrigeren het meteen.', cta: 'Fout melden →' },
    partner: { title: 'Samenwerken met ons', body: 'Adverteer of werk samen op meer dan 21 Lapland-sites.', cta: 'Neem contact op →' },
    press: { title: 'Pers en media', body: 'Redactionele samenwerkingen en perskits.', cta: 'Persaanvragen →' },
    copyright: '© {{year}} #LaplandVibes · Onderdeel van het #LaplandVibes-netwerk',
    websiteBy: 'Website door Yrityspaketit.fi',
    privacy: 'Privacybeleid',
    cookiePolicy: 'Cookiebeleid',
    terms: 'Gebruiksvoorwaarden',
    contact: 'Contact',
    groups: { stay: 'Verblijven', eatDrink: 'Eten & drinken', do: 'Te doen', explore: 'Verkennen', essentials: 'Essentieel' },
  },
  newsletter: {
    ...en.newsletter,
    eyebrow: 'De #LaplandVibes-nieuwsbrief',
    h2: 'Lapland-nieuws rechtstreeks in uw inbox',
    lead: 'Eén korte e-mail als er echt iets te vertellen is: nieuwe reisverslagen, sauna-tips, noorderlicht-meldingen en Lapland-verhalen.',
    placeholder: 'uw@email.com',
    subscribing: 'Inschrijven…',
    subscribe: 'Abonneren',
    successTitle: 'U bent erbij.',
    successBody: 'Controleer uw inbox, de welkomstmail komt binnenkort.',
    alreadyTitle: 'Al ingeschreven',
    alreadyBody: 'U staat al op de lijst, goede verhalen blijven binnenkomen.',
    agreeText: 'Door u te abonneren gaat u akkoord met ons',
    privacyLink: 'privacybeleid',
    unsubscribeNote: 'Op elk moment uit te schrijven. Uw adres wordt nooit gedeeld.',
  },
  cookieBanner: {
    headline: 'Cookies',
    body: 'We gebruiken cookies voor verkeersanalyse. Lees ons cookiebeleid voor meer informatie.',
    accept: 'Accepteren',
    decline: 'Weigeren',
  },
};

export const COPY: Record<Lang, SectionCopy> = { en, fi, de, ja, es, 'pt-BR': ptBR, 'zh-CN': zhCN, ko, fr, it, nl };
export type { SectionCopy };
