// Editorial voices: "The Field Journal" and its five named pens.
// Lapland.blog is a UGC platform — readers write their own trip blogs via /me.
// Seed posts are attributed to the editorial desk, not to real private
// individuals. The five named writers below are transparent editorial pens of
// The Field Journal (each bio says so) — they have beats, not fabricated
// biographies. Decision: Vesa 2026-07-07 (extends the honest model of
// 2026-06-26: named pens are OK as long as attribution stays editorial).

export interface Author {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  longBio: string;
  location: string;
  social: {
    newsletter?: string;
    instagram?: string;
    email?: string;
  };
}

// Kept exported as `vesa` for backward compatibility with existing imports.
// The values are the platform's editorial voice, not a real person's identity.
export const vesa: Author = {
  id: 'fieldjournal',
  name: 'The Field Journal',
  initials: 'FJ',
  role: 'Editorial',
  bio: 'Field notes from Finnish Lapland: weather, cabins, light, and the long quiet between.',
  longBio:
    "Lapland.blog is a free travel-journal platform built for visitors to Finnish Lapland. The Field Journal is the editorial voice of the site: a small handful of seed entries written in the first person from inside Finland's Arctic, meant to show what your own trip blog could read like once you start writing your own. Every entry has a real temperature, a real time of day, and a small embarrassment. No brochure voice. No cliché vocabulary. Just the trip and what it felt like.",
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

// ─── The five pens of The Field Journal ─────────────────────────────────
// Each is an editorial pen with a beat. Bios state the editorial role
// plainly — no invented personal histories, no fake credentials.

export const aino: Author = {
  id: 'aino',
  name: 'Aino Karvonen',
  initials: 'AK',
  role: 'Editorial · Seasons & Light',
  bio: 'Writes the seasons-and-light column of The Field Journal, the editorial desk of Lapland.blog: midnight sun, kaamos, and every blue hour in between.',
  longBio:
    'Aino Karvonen is an editorial pen of The Field Journal, the in-house desk of Lapland.blog. The beat: what the light is actually doing in Finnish Lapland — the nightless night of June and July, the polar night of December, and the long slow dimmer switch between them. Entries in this column carry a real date, a real hour, and a note on what the sky was doing at the time.',
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

export const eero: Author = {
  id: 'eero',
  name: 'Eero Mattila',
  initials: 'EM',
  role: 'Editorial · Trails & Open Country',
  bio: 'Writes the trails column of The Field Journal, the editorial desk of Lapland.blog: fells, boardwalks, river crossings, and the kilometres in between.',
  longBio:
    'Eero Mattila is an editorial pen of The Field Journal, the in-house desk of Lapland.blog. The beat: Lapland on foot — marked trails and open fell country, what the ground does underfoot in each month, and honest notes on distances, water, and insects. Entries in this column name the trail, the day, and the thing that went wrong.',
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

export const marja: Author = {
  id: 'marja',
  name: 'Marja Aho',
  initials: 'MA',
  role: 'Editorial · Food & the Cabin Table',
  bio: 'Writes the food column of The Field Journal, the editorial desk of Lapland.blog: market squares, cabin kitchens, and what things actually cost.',
  longBio:
    'Marja Aho is an editorial pen of The Field Journal, the in-house desk of Lapland.blog. The beat: what people in Finnish Lapland actually eat and where — market squares, smoke saunas that double as kitchens, roadside grills, the one café in a village of two hundred. Entries in this column carry real prices and real portions, and never call anything world-class.',
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

export const ilkka: Author = {
  id: 'ilkka',
  name: 'Ilkka Rautio',
  initials: 'IR',
  role: 'Editorial · Cabins & Saunas',
  bio: 'Writes the cabin column of The Field Journal, the editorial desk of Lapland.blog: mökki life, wood smoke, lake water, and the etiquette of the sauna.',
  longBio:
    'Ilkka Rautio is an editorial pen of The Field Journal, the in-house desk of Lapland.blog. The beat: the Finnish cabin — how a mökki actually works, what the sauna is for, which sounds a lake makes at two in the morning, and the small maintenance rituals that keep a cabin alive. Entries in this column include at least one practical mistake so you can skip making it yourself.',
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

export const sanna: Author = {
  id: 'sanna',
  name: 'Sanna Kivelä',
  initials: 'SK',
  role: 'Editorial · Gear Desk',
  bio: 'Writes the gear column of The Field Journal, the editorial desk of Lapland.blog: what to pack, what to leave, and what actually failed in the field.',
  longBio:
    'Sanna Kivelä is an editorial pen of The Field Journal, the in-house desk of Lapland.blog. The beat: equipment for Finnish Lapland in every season, tested by carrying it — layers, boots, repellents, batteries, and the difference between what the shop said and what the weather did. Entries in this column list what was carried, what was used, and what should have stayed home.',
  location: 'Finnish Lapland',
  social: {
    email: 'info@lapland.blog',
  },
};

export const authors: Record<string, Author> = {
  vesa,
  fieldjournal: vesa,
  aino,
  eero,
  marja,
  ilkka,
  sanna,
};
