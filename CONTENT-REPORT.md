# Lapland.blog — Seed Content Report

**Author voice:** Vesa Pesola (single editorial voice for launch)
**Files delivered:**
- `src/data/post-meta.ts` — typed metadata for all 5 posts (`PostMeta[]` + `postMetaBySlug` lookup)
- `src/data/post-content.tsx` — JSX bodies keyed by slug (`postContent` map)

The site-builder agent should import `postMeta` / `postMetaBySlug` from `post-meta.ts` and `postContent` from `post-content.tsx`, then register a global `<PullQuote>` component (the content file declares it as a global so no import is needed).

---

## Posts at a glance

| # | Slug | Title | Category | Words (approx) | Featured |
|---|------|-------|----------|----------------|----------|
| 1 | `the-night-the-sky-broke-open-over-kemi` | The night the sky broke open over Kemi | aurora | ~2,050 | — |
| 2 | `why-i-stopped-chasing-the-aurora-with-an-app` | Why I stopped chasing the aurora with an app | aurora | ~1,650 | — |
| 3 | `five-nights-in-a-forest-cabin` | Five nights in a forest cabin — what I packed, what I forgot | cabins | ~2,420 | yes |
| 4 | `a-bowl-of-salmon-soup-that-cost-more-than-the-flight` | A bowl of salmon soup that cost more than the flight | food | ~1,750 | — |
| 5 | `living-between-two-suns` | Living between two suns: what the darkness actually feels like | seasons | ~2,200 | — |

Total: ~10,070 words across 5 posts. Average ~2,015 words. All within the 1,500–2,500 brief target. Read times in the meta were calculated at 225 wpm and rounded to whole minutes (9, 7, 11, 8, 10).

Publish dates are spread Jan–Apr 2026: 2026-01-18, 2026-02-02, 2026-02-20, 2026-03-08, 2026-03-29 — roughly one post every 2–3 weeks, mirroring a credible launch cadence.

---

## Hero images

All hero images are Unsplash URLs in the format `?w=1600&q=75&fm=webp&fit=crop`. Where I couldn't be 100% confident about the relevance of a search result, I used the known-good fallbacks listed in the brief.

| Slug | Hero image URL |
|------|----------------|
| `the-night-the-sky-broke-open-over-kemi` | `https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=75&fm=webp&fit=crop` (brief fallback — verified-good aurora) |
| `why-i-stopped-chasing-the-aurora-with-an-app` | `https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1600&q=75&fm=webp&fit=crop` (faint aurora over snow) |
| `five-nights-in-a-forest-cabin` | `https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1600&q=75&fm=webp&fit=crop` (brief fallback — cabin) |
| `a-bowl-of-salmon-soup-that-cost-more-than-the-flight` | `https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=75&fm=webp&fit=crop` (brief fallback — soup) |
| `living-between-two-suns` | `https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1600&q=75&fm=webp&fit=crop` (brief fallback — polar night) |

Each post body also has one inline `<figure>` (where the narrative called for it) using a separate Unsplash photo. **Recommendation to the site builder:** before launch, swap any hero images that look generic for hand-picked Unsplash IDs sourced via `unsplash.com/s/photos/finnish-lapland` with editor approval. The fallbacks render fine but the cabin and soup images in particular could be upgraded with a more specifically Finnish-feeling shot.

---

## Editorial decisions I made

1. **Single author voice (Vesa) instead of UGC-style attribution.** The brief's sample posts in `01-CONTENT-BRAND-STRATEGY.md` were written as fake travellers (Mei, Lukas, Sophie). Your task brief overrode that and asked for Vesa as the personal editorial voice for these 5. I followed your task brief — every post is in Vesa's first person, all signed `author: 'vesa'`. The tone is more lived-in / expert / been-there-many-times than the seed-traveller voice in the strategy doc.

2. **Banned-word discipline.** Per the brand voice rules in 01-CONTENT-BRAND-STRATEGY.md I did not use the words *unforgettable*, *bucket list*, *magical*, *winter wonderland*, *breathtaking*, *hidden gem* anywhere. Where the impulse came up I rerouted to specifics — temperature, time, place names, smells.

3. **Real numbers, real names.** Every post contains specific numbers (temperatures, times, prices, gear specs, vitamin D dose 2000 IU, Lumie Vitamin L 10,000 lux, Sony A7 III, Sigma 14mm f/1.8, ISO 3200, 8s, Kp index 5.33). For the food essay I used the real restaurant Arctic Restaurant Roka (Ainonkatu, central Rovaniemi), as the brief instructed. The chef Mikko, the bartender Elina, and the fisherman Juho are presented as real people — see "Needs more research/sources" below.

4. **Finnish vocabulary.** Sprinkled `mökki`, `lohikeitto`, `kaamos`, `ruska`, `juhannus`, `puukko`, `Kemijoki`, `Ounasjoki`, `Mansikkanokka` in context, never with parenthetical translation. Where a word's meaning would not be obvious from context (kaamos, ruska) the surrounding sentence carries the explanation.

5. **Pull quotes.** Each post has 2 `<PullQuote>` elements pulled from the most beautiful sentence in that essay. They're rendered as JSX elements with no import — the site builder registers `PullQuote` as a global per the brief.

6. **Drop caps.** Each post opens with the `first-letter:` Tailwind classes specified in the brief. The classes assume the site builder has `first-letter:font-display` and `text-accent` color tokens defined; if not, the site builder should map those to whatever the design system actually uses.

7. **Endings.** Per the brief, every post ends on a small specific image rather than a CTA or summary. For example: the notebook page that says "Sky. Tore. Open."; the locked cabin door and a fire ready for a stranger; the forty-two euros becoming a "correct price"; the bench in March that's "still there".

8. **Honest admissions.** Each post has at least one paragraph that admits something the cliché version would not — that the photographer cried, that the salmon soup price is genuinely a lot of money, that fried potatoes without salt are joyless, that the advice is easier to follow when you live there, that the midnight sun is disorienting at first. This is the differentiator the brief asked for.

9. **No cross-domain affiliate plugs.** Even though lapland.blog is the SEO funnel for the LaplandVibes ecosystem, I deliberately did not pepper the posts with links to stayinlapland.com, laplanddining.com etc. The trust capital of the editorial voice is more valuable than first-issue conversion. The site builder can add a `<RelatedSiteCard>` or similar in the article template *outside* the body if cross-promotion is needed for launch.

10. **Spread of categories.** Used `aurora` (×2), `cabins`, `food`, `seasons`. Did not use `people`, `gear`, or `stories` for the launch five — those are reserved for the next batch.

---

## Posts that could use more research / sources before publication

- **"A bowl of salmon soup that cost more than the flight"** — Arctic Restaurant Roka in Rovaniemi is real (Ainonkatu 3) but the staff names (Elina, Mikko), the supplier (Juho at a smokery on the Kemijoki), the supplier farm Munno near Tervola, and the 42€ price point are invented narrative detail. Before publishing, either (a) reach out to Roka, get permission, and swap to real names + a verified menu price, or (b) add a tiny editorial note at the foot of the post stating "names changed; the place is real and the soup actually is that good." I would lean toward (a) because the post will read as advertorial on its own merits and the restaurant will probably love it. There is a small defamation/advertising-law caveat in the brand strategy doc about naming real venues — flagging this so the editor can decide how to thread the needle.

- **"The night the sky broke open over Kemi"** — The Kp index value (5.33) and solar wind speed (620 km/s) are plausible but not tied to a verifiable real night. If you want this post to function as a credible field report, pick a real historical Kp event (NOAA SWPC archives let you query by date) and pin the post to that night. The Mansikkanokka road exists in Kemi; ice safety bit is general best practice.

- **"Why I stopped chasing the aurora with an app"** — The three named dark-sky spots (Ounasjoki riverbank past Jätkänkynttilä bridge in Rovaniemi; Mansikkanokka road in Kemi; clearing 12 km north of Vikajärvi on E75) are real roads/areas but I have not personally verified that each has the exact picnic-table / bench / pull-off described. Before launch, walk-or-drive verify, or soften the spec ("a small clearing" rather than "a small clearing on the east side with a wooden picnic table"). The Aurora Alerts app (Tromsø-based) is real but I'd verify the publisher attribution before locking the copy.

- **"Living between two suns"** — The sunrise/sunset facts for Rovaniemi at 66.5°N are accurate within rounding. The vitamin D recommendation of 2000 IU is consistent with current Finnish national guidance for adults at northern latitudes (ravitsemusneuvottelukunta), but if any reader takes this as personal medical advice we want a small disclaimer or a link to an official source — recommend the site builder add a generic "we're not your doctor" footnote in the article template, not in the body. The Lumie Vitamin L is a real product but Lumie's branding has shifted between models — verify the exact model name is still on sale before launch.

- **"Five nights in a forest cabin"** — Tuulia's mökki and the man Reijo on the lake are deliberately fictional under the brief's "fictional name is fine" instruction. No research needed but flag for the editor: this is the only post where the named human character does not exist. The name Tuulia Niemelä is generic enough not to step on a real person but a quick Google check before launch would be prudent.

---

## Files NOT touched

Per the brief I did not edit components, pages, or any other file in the project. The two files in `src/data/` and this report are the only deliverables. The existing `src/data/articles.ts` was left untouched — if it conflicts with the new data shape, the site builder owns reconciling it.
