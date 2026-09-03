// Builds scripts/seed-post-11-seven-and-a-half-minutes-a-day.sql.
//
// Written by the weekly blog-draft routine (lv-weekly-blog-drafts) 2026-08-28.
// The SQL is generated rather than hand-written because the body is JSONB inside
// a single-quoted SQL literal: every apostrophe in the prose has to be doubled,
// and doing that by hand is how you get a half-inserted post at 2am.
//
// 🔴 status = 'draft'. Running this file does NOT publish anything — the public
// queries (usePosts/usePost/useRelated) all filter `.eq('status','published')`,
// so the row is visible only in the admin editor until Vesa flips it.
//
// 🔴 Every daylight figure in the piece was COMPUTED with the NOAA solar-position
// algorithm for 2026 (sun's centre above -0.833°, i.e. upper limb clearing the
// horizon with refraction), not taken from a travel page:
//   Rovaniemi  1 Aug 18h53 · 28 Aug 15h22 · 22 Sep 12h21 · 31 Oct 7h37
//   Utsjoki    1 Aug 21h00 · 28 Aug 16h04 · 22 Sep 12h24 · 31 Oct 6h38
//   Helsinki   1 Aug 16h52 · 28 Aug 14h32 · 22 Sep 12h16 · 31 Oct 8h46
//   Rate of loss late Aug – mid Oct: Rovaniemi ~7.5 min/day, Utsjoki ~9,
//   Helsinki ~5.5.
// Recompute before changing any of them; they are the whole point of the column.
//
// Usage: node scripts/make-seed-post-11.mjs   (writes the .sql, runs nothing)

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

const SLUG = 'seven-and-a-half-minutes-a-day';
const HERO = '/images/autumn-light-lake-1200.webp';
const HERO_ALT =
  'A still forest lake at dusk in Finnish Lapland in early September, mountain birch turning gold along the far shore and a dead standing pine at the water edge';

const content = [
  {
    type: 'paragraph',
    text: 'The end of the light is not an event. Nobody sends a notice. What happens is that one evening in the last week of August you go out to the woodshed at the hour you have been going out to the woodshed all summer, and you cannot see the path. You have been walking it in daylight since May. Tonight it is a shape you remember rather than a thing you can see, and you stand there for a second doing arithmetic you did not know you were doing, and the arithmetic says: it has been going for weeks and you only noticed now.',
  },
  {
    type: 'paragraph',
    text: 'This column exists to put a number on that feeling, because the number is more dramatic than the feeling and almost nobody knows it. Here in Rovaniemi, at the end of August, we are losing seven and a half minutes of daylight every single day. Not per week. Per day. By tomorrow evening the sun sets four minutes earlier than it did tonight and rises three and a half minutes later, and that continues, compounding, without pause, until the middle of winter.',
  },
  { type: 'heading', level: 2, text: 'The actual numbers, because they are better than the metaphor' },
  {
    type: 'paragraph',
    text: 'On the first of August, Rovaniemi had eighteen hours and fifty-three minutes between sunrise and sunset. Today, the twenty-eighth, it has fifteen hours and twenty-two minutes. That is three and a half hours of daylight gone in four weeks, and the month is not finished. By the equinox we are down to twelve hours and twenty-one minutes. By the last day of October, seven hours thirty-seven.',
  },
  {
    type: 'paragraph',
    text: 'Put beside the same dates in Helsinki, the difference is the entire point of living up here. Helsinki starts August with sixteen hours and fifty-two minutes and ends October with eight hours and forty-six. It loses about five and a half minutes a day through the autumn. We lose seven and a half. And in Utsjoki, at the top of the country, it is nine — twenty-one hours of daylight on the first of August, six hours thirty-eight on the last day of October.',
  },
  {
    type: 'list',
    items: [
      'Rovaniemi, 1 August: 18 h 53 min. 28 August: 15 h 22 min. 22 September: 12 h 21 min. 31 October: 7 h 37 min.',
      'Utsjoki, 1 August: 21 h 00 min. 28 August: 16 h 04 min. 22 September: 12 h 24 min. 31 October: 6 h 38 min.',
      'Helsinki, for comparison, 1 August: 16 h 52 min. 31 October: 8 h 46 min.',
      'Rate of loss through late August and September: about 7.5 minutes a day in Rovaniemi, about 9 in Utsjoki, about 5.5 in Helsinki.',
    ],
  },
  {
    type: 'pullquote',
    text: 'Everywhere on Earth gets twelve hours at the equinox. The difference between places is not where you end up. It is how fast you get there.',
  },
  { type: 'heading', level: 2, text: 'Why the north falls faster' },
  {
    type: 'paragraph',
    text: 'The equinox is the great leveller: on the twenty-second of September, Utsjoki, Rovaniemi and Helsinki all sit within a few minutes of twelve hours, and so does Nairobi, and so does everywhere. Every latitude passes through the same doorway on the same day. What differs is the speed of approach. Down south the sun cuts the horizon at a steep angle and the day length changes slowly. Up here it comes in shallow, almost sideways, and a small shift in the sun position moves the crossing point a long way along the horizon. Same doorway, much faster run at it.',
  },
  {
    type: 'paragraph',
    text: 'Which means the thing people from further south find hardest about the northern autumn is not the darkness. It is the rate. You can adjust to a dark evening. Adjusting to an evening that is four minutes darker than yesterday, every day, for two months, is a different task, and it is the one nobody warns you about.',
  },
  {
    type: 'image',
    src: HERO,
    alt: HERO_ALT,
    caption:
      'Early September, and the last hour of light now happens at a civilised time again. In June this same view was on offer at two in the morning, which sounds wonderful and ruins a week of sleep.',
    full: true,
  },
  { type: 'heading', level: 2, text: 'What you get back' },
  {
    type: 'paragraph',
    text: 'It reads like a loss column, so here is the credit side, and it is not small. The dark is what the aurora needs. It was there all summer and the sky could not show it; from the second half of August it can. The light that remains is the good kind, low and long, because a sun that never climbs high spends most of the day doing what it does at sunset everywhere else. Golden hour up here in September is not an hour. It is the afternoon.',
  },
  {
    type: 'paragraph',
    text: 'And the ruska arrives on the same schedule, driven by the same shortening nights and the first frosts that follow them. Gold birch by day and a dark enough sky by night, in the same week, is a combination the calendar offers for about three weeks and then takes away again.',
  },
  { type: 'heading', level: 2, text: 'The mistake I make every single year' },
  {
    type: 'paragraph',
    text: 'I keep planning September like it is August. I write down an evening walk for after dinner, the way I have all summer, and then I am on a forest track at half past eight with a phone torch, having lost an argument with a fact I have personally written a column about. The daylight that was there when I made the plan on Sunday is not there when I execute it on Thursday, because four days at seven and a half minutes is half an hour, and half an hour at the end of the day is the whole difference between a walk and a stumble.',
  },
  {
    type: 'paragraph',
    text: 'The fix is embarrassingly simple and I offer it as the practical content of this entry: from the last week of August, check the sunset time for the day you are actually doing the thing, not the day you are planning it. That is it. That is the whole trick, and I will need to be told it again next year.',
  },
  { type: 'divider' },
  {
    type: 'paragraph',
    text: 'Written at a kitchen table in Rovaniemi with the outside light on, at an hour when six weeks ago it would not have been.',
  },
];

const row = {
  slug: SLUG,
  title: 'Seven and a half minutes a day',
  kicker: 'Seasons & Light · August · Daylight',
  excerpt:
    'Nobody announces the end of the summer light. It just goes, at seven and a half minutes a day in Rovaniemi and nine in Utsjoki, until one evening in late August you cannot see the path to the woodshed.',
  category_slug: 'seasons',
  tags: ['seasons', 'light', 'autumn', 'ruska', 'august', 'september'],
  hero_image: HERO,
  hero_alt: HERO_ALT,
  author_snapshot: { handle: 'aino', display_name: 'Aino Karvonen', avatar_url: null },
  status: 'draft',
  published_at: '2026-08-28',
  featured: false,
  read_time_minutes: 5,
};

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const arr = (a) => `ARRAY[${a.map(q).join(',')}]::text[]`;
const json = (o) => `${q(JSON.stringify(o))}::jsonb`;

const sql = `-- Field Journal pen: Aino Karvonen (Seasons & Light desk). Autumn 2026 batch.
-- 🔴 DRAFT — status = 'draft'. Running this inserts the row but publishes nothing:
-- every public query filters status = 'published'. Review it in /admin and flip
-- the status there (or re-run with status changed) to publish.
-- Generated by scripts/make-seed-post-11.mjs — edit that file, not this one.
-- Daylight figures computed with the NOAA solar-position algorithm for 2026; see
-- the header of the generator for the full table and the recompute warning.
insert into public.blog_posts (
  slug, title, kicker, excerpt, category_slug, tags, hero_image, hero_alt,
  content, author_id, author_snapshot, status, published_at, featured,
  read_time_minutes
) values (
  ${q(row.slug)},
  ${q(row.title)},
  ${q(row.kicker)},
  ${q(row.excerpt)},
  ${q(row.category_slug)},
  ${arr(row.tags)},
  ${q(row.hero_image)},
  ${q(row.hero_alt)},
  ${json(content)},
  NULL,
  ${json(row.author_snapshot)},
  ${q(row.status)},
  ${q(row.published_at)}::timestamptz,
  ${row.featured},
  ${row.read_time_minutes}
)
on conflict (slug) do update set
  title = excluded.title,
  kicker = excluded.kicker,
  excerpt = excluded.excerpt,
  category_slug = excluded.category_slug,
  tags = excluded.tags,
  hero_image = excluded.hero_image,
  hero_alt = excluded.hero_alt,
  content = excluded.content,
  author_snapshot = excluded.author_snapshot,
  status = excluded.status,
  published_at = excluded.published_at,
  featured = excluded.featured,
  read_time_minutes = excluded.read_time_minutes;
`;

const out = resolve(HERE, `seed-post-11-${SLUG}.sql`);
writeFileSync(out, sql, 'utf8');
console.log(`wrote ${out} (${sql.length} bytes, status=${row.status})`);
