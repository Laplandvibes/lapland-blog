// Editorial voice: LaplandVibes (Vesa 2026-09-15: "mika vitun the field
// journal, laplandvibes - toimitus"). Handle 'fieldjournal' on yha tekninen
// avain kannassa; vain nayttonimi vaihtui.
// Lapland.blog is a UGC platform — readers write their own trip blogs via /me.
// Seed posts are attributed to the editorial desk, not to real private
// individuals.
//
// 🔴 The five named "editorial pens" (Aino Karvonen, Eero Mattila, Marja
// Lehtinen, Ilkka Niemi, Sanna Virtanen; Vesa 2026-07-07) were REMOVED on
// 2026-09-15. Every published post carries author_snapshot 'fieldjournal'
// since the 14.9. rewrite, so the five names were unreachable data — and
// unreachable invented people are exactly what comes back when someone
// reuses the registry. postAdapter maps any unknown handle to the desk.

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
  name: 'LaplandVibes',
  initials: 'LV',
  role: 'Editorial',
  bio: 'Field notes from Finnish Lapland: weather, cabins, light, and the long quiet between.',
  longBio:
    "Lapland.blog is a free travel-journal platform built for visitors to Finnish Lapland. LaplandVibes is the editorial voice of the site: a small handful of seed entries written in the first person from inside Finland's Arctic, meant to show what your own trip blog could read like once you start writing your own. Every entry has a real temperature, a real time of day, and a small embarrassment. No brochure voice. No cliché vocabulary. Just the trip and what it felt like.",
  location: 'Finnish Lapland',
  social: {
    email: 'info@laplandvibes.com',
  },
};

export const authors: Record<string, Author> = {
  fieldjournal: vesa,
  vesa,
};
