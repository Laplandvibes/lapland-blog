// Editorial voice: "The Field Journal".
// Lapland.blog is a UGC platform — readers write their own trip blogs via /me.
// The five seed posts are attributed to the editorial voice, not a real person,
// so visitors don't feel like they're stepping into someone else's diary.

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

export const authors: Record<string, Author> = {
  vesa,
  fieldjournal: vesa,
};
