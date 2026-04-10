// Vesa Pesola — sole author at launch.
// Phase 1 decision: single-author blog, no cross-domain author identity.

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

export const vesa: Author = {
  id: 'vesa',
  name: 'Vesa Pesola',
  initials: 'VP',
  role: 'Writer & photographer',
  bio: 'Writes from Finnish Lapland. Builds quiet things on the internet.',
  longBio:
    "I'm Vesa. I live in Finland and I spend a lot of time above the Arctic Circle — in cabins without wifi, in cars at -28°C, on ski lifts at dusk, and in bars that have seen better decades. Lapland.blog is where I write it down while it's still cold on my cheeks. No brochure voice. No cliché vocabulary. Just the trip, the weather, and what it felt like.",
  location: 'Finland',
  social: {
    email: 'laplandvibe@gmail.com',
  },
};

export const authors: Record<string, Author> = {
  vesa,
};
