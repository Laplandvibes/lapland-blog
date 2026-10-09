/**
 * Credit register for the real photographs on lapland.blog (kuvavaihto 9.10.2026, Vesa 4.10.: replace the AI images
 * with real photographs). One entry per image slot; the slot is the file name without size and extension
 * (`trip-food-1200.webp` -> `trip-food`). Receipt = source, title, author as written there, licence with version and
 * deed, file page, taken, retrieved, price 0 EUR, changes. Every file was checked against every LaplandVibes repo by
 * name, by 64x36 pixel comparison and by photographer + day, and reserved in _kuvavaihto-20261004/ledger.tsv.
 *
 * 🔴 CC BY-SA files are resized only, never cropped (the card crops on screen with object-fit). None of the files below
 * was cropped, so no "cropped" note is needed. 🔴 The social cards (public/og/*.jpg) are made by
 * scripts/generate-og-images.mjs only from files that need no attribution on the card (Pexels, public domain, CC BY whose
 * credit is visible on the same page): never from a CC BY-SA slot (lv_permanent_rules 34.2).
 * 🔴 Never add an AI frame here. The AI originals are in _reissu-2026-07/_ai-originals-backup/lapland-blog-new/.
 */

import { versioned } from '../lib/images';

export type PhotoCredit = {
  /** Source title (CC / Flickr) or "Pexels <id>"; link text of the credit line. */
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  fileUrl: string;
  source: 'Wikimedia Commons' | 'Flickr' | 'Pexels' | 'LaplandVibes';
  taken: string;
  /** What the picture shows (the English alt; other languages: locales images.*). */
  alt: string;
  receipt: { retrieved: string; priceEur: 0; changes: string; sourceTitle?: string; sha1?: string };
};

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  "summer-lake-sauna": { title: "Savusauna", author: "Tanger", license: "Public domain", licenseUrl: "https://commons.wikimedia.org/wiki/File:Savusauna.jpg", fileUrl: "https://commons.wikimedia.org/wiki/File:Savusauna.jpg", source: "Wikimedia Commons", taken: "2006-07-03", alt: "A smoke sauna on a lake shore at sunset, birches in the foreground and the sun low over the water", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 1600×1200 → 1200 px (WebP); no crop", sha1: "0d46c406" } },
  "category-seasons": { title: "Pexels 259653", author: "Pixabay", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/green-leafed-trees-on-body-of-water-259653/", source: "Pexels", taken: "2016-12", alt: "A lone snow-dusted pine on open snowy ground under a violet and orange dusk sky", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4627×3068 → 1200/800/480/1920 px (WebP + AVIF); no crop", sourceTitle: "Green Leafed Trees on Body of Water" } },
  "summer-gear-porch": { title: "Pexels 7351108", author: "Arina Krasnikova", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/a-close-up-shot-of-a-vacuum-flask-beside-a-bag-7351108/", source: "Pexels", taken: "2021-04", alt: "Camping gear on a blanket: a vacuum flask, a metal mug, a leather-and-canvas backpack and a felt hat", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4000×2670 → 1200/1920 px (WebP); no crop", sourceTitle: "A Close-Up Shot of a Vacuum Flask beside a Bag" } },
  "summer-midnight-sun": { title: "Sunset in Kuusamo, Finland - 52251381656", author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Sunset_in_Kuusamo,_Finland_-_52251381656.jpg", source: "Wikimedia Commons", taken: "2022-07-08", alt: "Low golden sunlight through spruces and birches on a lake shore late on a July evening, pink fireweed in the foreground", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 6123×4082 → 1200/1920 px (WebP); no crop", sha1: "7752215e" } },
  "trip-food": { title: "Salmon soup - Kuusamo, Finland", author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Salmon_soup_-_Kuusamo,_Finland.jpg", source: "Wikimedia Commons", taken: "2022-07-09", alt: "A bowl of creamy salmon soup with two slices of buttered rye bread and a glass of red juice", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 5972×3872 → 1200/800/480/1920 px (WebP + AVIF); no crop", sha1: "329a4bde" } },
  "trip-cabin-life": { title: "Pexels 18601299", author: "Martin Vemödalen", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/wooden-barn-among-trees-covered-with-snow-18601299/", source: "Pexels", taken: "2023-10", alt: "A small carved wooden hut under heavy snow, low sun glowing through snow-laden spruces", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 5286×3671 → 1200/800/480/1920 px (WebP + AVIF); no crop", sourceTitle: "Wooden Barn Among Trees Covered with Snow" } },
  "summer-fell-boardwalk": { title: "Pexels 9541703", author: "Jorma Rantama", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/trees-on-green-grass-field-9541703/", source: "Pexels", taken: "2021-09", alt: "A weathered plank boardwalk crossing a green bog under heavy clouds, pines on the horizon", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4822×3215 → 1200/1920 px (WebP); no crop", sourceTitle: "Trees on Green Grass Field" } },
  "pillar-cold": { title: "Pexels 4155243", author: "Ana Eva", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/winter-forest-with-frozen-trees-and-snowy-valley-4155243/", source: "Pexels", taken: "2020-04", alt: "Spruces and pines heavy with hoarfrost under a violet winter sky", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4032×3024 → 1200/800/480 px (WebP + AVIF); no crop", sourceTitle: "Winter forest with frozen trees and snowy valley" } },
  "pillar-shelter": { title: "Winter Morning (26071971196)", author: "Markus Trienke", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Winter_Morning_(26071971196).jpg", source: "Wikimedia Commons", taken: "2016-03-21", alt: "A snow-roofed log hut among frosted birches in the low morning sun", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 5438×3625 → 1200/800/480 px (WebP + AVIF); no crop", sha1: "d83e4528" } },
  "pillar-people": { title: "Pexels 6163874", author: "Marko Klaric", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/crop-traveler-with-mug-full-of-snow-outdoors-6163874/", source: "Pexels", taken: "2020-12", alt: "A gloved hand holds an enamel mug filled with snow, snowy spruces behind", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4272×2856 → 1200/800/480 px (WebP + AVIF); no crop", sourceTitle: "Crop traveler with mug full of snow outdoors" } },
  "hero-aurora-winter": { title: "Pexels 17648905", author: "Gu Bra", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/northern-lights-over-the-forest-17648905/", source: "Pexels", taken: "2023-07", alt: "Green northern lights above tall pines, snow on the ground below", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 8256×5504 → 1200/1920/2560 px (WebP); no crop", sourceTitle: "Northern Lights over the Forest" } },
  "trip-solo-trek": { title: "Lapland 2021 Lumberjack's Candle Bridge viewed from Koskenranta", author: "John Dickinson", license: "Public Domain Mark 1.0", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", fileUrl: "https://www.flickr.com/photos/chorley-photos/52096835539/", source: "Flickr", taken: "2021-12-16", alt: "Rovaniemi, Finnish Lapland", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 6000×4000 → 1200/800/480/1920 px (WebP + AVIF); no crop" } },
  "category-cabins": { title: "Santa's Cabin on Levi, Kittilä, Lapland, Finland, 2021 September - 4", author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Santa%27s_Cabin_on_Levi,_Kittil%C3%A4,_Lapland,_Finland,_2021_September_-_4.jpg", source: "Wikimedia Commons", taken: "2021-09-20", alt: "Levi, Finnish Lapland", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 5000×3333 → 1200/800/480/1920 px (WebP + AVIF); no crop", sha1: "807df861" } },
  "trip-night-forest": { title: "Pahtaniemi by Juutuanvuono, Inari, Lapland, Finland, 2018 March - 2", author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Pahtaniemi_by_Juutuanvuono,_Inari,_Lapland,_Finland,_2018_March_-_2.jpg", source: "Wikimedia Commons", taken: "2018-03-25", alt: "Inari, Finnish Lapland", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 3000×2000 → 1200/800/480/1920 px (WebP + AVIF); no crop", sha1: "68a89352" } },
  "dest-muonio": { title: "Pexels 17648893", author: "Gu Bra", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/river-in-a-snow-covered-forest-17648893/", source: "Pexels", taken: "2023-07", alt: "Muonio, Finnish Lapland", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 7756×5171 → 1200/1920 px (WebP); no crop", sourceTitle: "River in a Snow Covered Forest" } },
  "dest-yllas": { title: "Pexels 19896919", author: "Fanny Hagan-Södervall", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/a-view-of-a-snowy-forest-at-dusk-19896919/", source: "Pexels", taken: "2024-01", alt: "Ylläs, Finnish Lapland", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4032×3024 → 1200/1920 px (WebP); no crop", sourceTitle: "A view of a snowy forest at dusk" } },
  "plan-stay": { title: "Pexels 27852579", author: "Franz Müller", license: "Pexels License", licenseUrl: "https://www.pexels.com/license/", fileUrl: "https://www.pexels.com/photo/polarlichter-schwedisch-lappland-27852579/", source: "Pexels", taken: "2024-08", alt: "", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4159×2773 → 1200 px (WebP); no crop", sourceTitle: "Polarlichter Schwedisch Lappland" } },
  "plan-transport": { title: "Night train PYO 274 on Ounaskoski bridge, Rovaniemi", author: "Grzeeesiek", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Night_train_PYO_274_on_Ounaskoski_bridge,_Rovaniemi.jpg", source: "Wikimedia Commons", taken: "2025-06-24", alt: "", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 3840×2160 → 1200 px (WebP); no crop", sha1: "8a60e02b" } },
  "plan-do": { title: "Samba and Inka (16905022651)", author: "Markus Trienke", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", fileUrl: "https://commons.wikimedia.org/wiki/File:Samba_and_Inka_(16905022651).jpg", source: "Wikimedia Commons", taken: "2015-03-16", alt: "", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4720×3147 → 1200 px (WebP); no crop", sha1: "74cf3606" } },
  "plan-eat": { title: "Kuusamon Portti, Kuusamo", author: "LaplandVibes", license: "own", licenseUrl: "", fileUrl: "", source: "LaplandVibes", taken: "2026-07-16", alt: "", receipt: { retrieved: '2026-10-09', priceEur: 0, changes: "resized 4000×3000 → 1200 px (WebP); no crop" } },
};

/** Slot of an image URL (`/images/trip-food-1200.webp?v=ab12` -> `trip-food`), or null. */
export function creditSlot(src: string | undefined | null): string | null {
  if (!src) return null;
  const m = src.match(/\/images\/([a-z0-9-]+?)(?:-(?:480|800|1200|1920|2560))?\.(?:webp|avif|jpe?g|png)(?:\?.*)?$/i);
  return m && PHOTO_CREDITS[m[1]] ? m[1] : null;
}

/** Slots that also ship a 1920 px file (full-bleed heroes): `<slot>-1200.webp 1200w, <slot>-1920.webp 1920w`. */
const WIDE = new Set([
  'trip-food', 'trip-cabin-life', 'category-seasons', 'summer-gear-porch', 'summer-midnight-sun', 'summer-fell-boardwalk',
  'trip-solo-trek', 'category-cabins', 'trip-night-forest', 'dest-muonio', 'dest-yllas',
]);
export function wideSrcSet(src: string): string | undefined {
  const m = src.match(/^(\/images\/([a-z0-9-]+?)-1200\.webp)(\?.*)?$/i);
  if (!m || !WIDE.has(m[2])) return undefined;
  return `${src} 1200w, ${versioned(`/images/${m[2]}-1920.webp`)} 1920w`;
}
