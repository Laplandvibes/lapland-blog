// GENEROITU — älä muokkaa käsin. Lähde: scripts/routes.json (canonicalLocale), scripts/gen-page-meta.mjs (prebuild).
// Reitti, jonka jokainen kieliversio kanonisoituu yhteen kieleen: esirenderöinti kirjoittaa sen canonicalin ja
// hreflangin näin, generate-feeds jättää muut kieliversiot sivukartasta, ja useSeo tekee selaimessa saman.
import type { Lang } from '../i18n/useLang';

export const CANONICAL_LOCALE: Record<string, Lang> = {
  "/post/the-night-the-sky-broke-open-over-kemi": "en",
  "/post/why-i-stopped-chasing-the-aurora-with-an-app": "en",
  "/post/five-nights-in-a-forest-cabin": "en",
  "/post/a-bowl-of-salmon-soup-that-cost-more-than-the-flight": "en",
  "/post/living-between-two-suns": "en",
  "/post/the-sun-did-not-set-it-just-circled-the-house": "en",
  "/post/twelve-kilometres-at-one-in-the-morning": "en",
  "/post/strawberry-hour-at-the-rovaniemi-market": "en",
  "/post/the-sauna-thermometer-said-eighty-two": "en",
  "/post/what-july-in-lapland-actually-asks-you-to-pack": "en",
  "/post/wilderness-hut-firewood-ends-2026": "en",
  "/post/seven-and-a-half-minutes-a-day": "en"
};
