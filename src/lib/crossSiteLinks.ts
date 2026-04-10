// src/lib/crossSiteLinks.ts
//
// Detects topics in a blog post and suggests relevant LaplandVibes sites.
// Used both in the post reader view (contextual recommendations) and
// could later power the editor sidebar hints.

export interface CrossSiteLink {
  site: string;
  url: string;
  label: string;
  description: string;
  icon: string; // lucide icon name hint — consumer maps to actual icon
}

const SITE_RULES: {
  patterns: RegExp[];
  link: CrossSiteLink;
}[] = [
  {
    patterns: [/hotel/i, /cabin/i, /igloo/i, /stay/i, /accommodation/i, /resort/i, /lodge/i, /majoitu/i, /mökki/i],
    link: {
      site: 'LaplandStays',
      url: 'https://laplandstays.com',
      label: 'Find places to stay',
      description: 'Cabins, hotels, igloos & resorts in Lapland',
      icon: 'bed',
    },
  },
  {
    patterns: [/safari/i, /reindeer.*ride/i, /husky/i, /snowmobile/i, /ski/i, /hike/i, /activit/i, /excursion/i, /tour/i, /sledg/i],
    link: {
      site: 'LaplandActivities',
      url: 'https://laplandactivities.online',
      label: 'Book activities',
      description: 'Safaris, husky rides, snowmobiles & more',
      icon: 'mountain-snow',
    },
  },
  {
    patterns: [/restaurant/i, /dinner/i, /lunch/i, /food/i, /eat/i, /salmon/i, /reindeer.*meat/i, /soup/i, /tasting/i, /ruoka/i, /ravintola/i],
    link: {
      site: 'LaplandDining',
      url: 'https://laplanddining.com',
      label: 'Discover restaurants',
      description: 'Best dining experiences in Lapland',
      icon: 'utensils',
    },
  },
  {
    patterns: [/bar\b/i, /pub/i, /nightlife/i, /drink/i, /cocktail/i, /beer/i, /wine/i, /night.*out/i],
    link: {
      site: 'LaplandBars',
      url: 'https://laplandbars.com',
      label: 'Find bars & nightlife',
      description: 'Bars, pubs & nightlife in Lapland',
      icon: 'wine',
    },
  },
  {
    patterns: [/gift/i, /souvenir/i, /shop/i, /buy/i, /puukko/i, /kuksa/i, /handicraft/i, /lahja/i, /knife/i, /knives/i],
    link: {
      site: 'LaplandGifts',
      url: 'https://laplandgifts.com',
      label: 'Shop Lapland gifts',
      description: 'Authentic souvenirs & gifts from Lapland',
      icon: 'gift',
    },
  },
  {
    patterns: [/nature/i, /forest/i, /national.*park/i, /wilderness/i, /trek/i, /trail/i, /fell/i, /tunturi/i, /wildlife/i],
    link: {
      site: 'LaplandNature',
      url: 'https://laplandnature.com',
      label: 'Explore nature',
      description: 'Trails, parks & wilderness in Lapland',
      icon: 'trees',
    },
  },
  {
    patterns: [/kid/i, /child/i, /family/i, /santa/i, /claus/i, /elf/i, /christmas/i, /joulu/i, /lapset/i],
    link: {
      site: 'LaplandKids',
      url: 'https://laplandkids.com',
      label: 'Family activities',
      description: 'Things to do with kids in Lapland',
      icon: 'baby',
    },
  },
];

/**
 * Scan post content and return matching LaplandVibes site suggestions.
 * Returns max 3 most relevant links (deduplicated).
 */
export function detectCrossSiteLinks(content: string, maxLinks = 3): CrossSiteLink[] {
  const matches: { link: CrossSiteLink; hitCount: number }[] = [];
  const seenSites = new Set<string>();

  for (const rule of SITE_RULES) {
    if (seenSites.has(rule.link.site)) continue;
    let hits = 0;
    for (const pattern of rule.patterns) {
      const m = content.match(new RegExp(pattern, 'gi'));
      if (m) hits += m.length;
    }
    if (hits > 0) {
      seenSites.add(rule.link.site);
      matches.push({ link: rule.link, hitCount: hits });
    }
  }

  // Sort by hit count descending, return top N
  return matches
    .sort((a, b) => b.hitCount - a.hitCount)
    .slice(0, maxLinks)
    .map((m) => m.link);
}
