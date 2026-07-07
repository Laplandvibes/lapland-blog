# lapland.blog — Blog image redesign manifest

**Goal:** replace the weak / non-photoreal AI blog images with photoreal Finnish-Lapland images.
**Owner feedback:** "todella huono laatuisia, ei yhtään aidon näköisiä" (very low quality, not authentic-looking).
**Brand rules enforced:** no stock, no Unsplash, AI-generated OK, **no image reused across ecosystem sites**, photographic / natural-light aesthetic.

This folder is a **staging area only**. No `src/` code was edited and no build was run (another agent is editing `src/` concurrently). Wiring is mechanical — see "How to wire in" at the bottom.

---

## ⚠️ STATUS — BLOCKED ON IMAGE-GEN CREDITS (2026-06-25)

No new images could be generated in this session. **All available generators report 0 credits:**

| Tool | Result |
|---|---|
| Picsart `gen-ai` CLI (`gen-ai credits`) | `{ balance: 0, total: 0 }` — **empty** |
| Picsart MCP (`picsart_credits`) | "connector requires authentication" — needs reconnect |
| `nano_banana_pro` MCP (`mcp__ea453040…__balance`) | `{ credits: 0, plan: free }` — **empty** |
| Gamma browser-UI fallback | Needs Vesa's logged-in Chrome session driven interactively; not possible from an unattended background agent (password login is forbidden per runbook) |
| OpenAI gpt-image fallback | Key lives in another project's `start.bat`; reading it was blocked by the security classifier |

**What is ready:** the full target map, the exact `gen-ai` commands, and the prompts below. The moment Picsart credits are topped up (or Vesa runs the Gamma browser step), generation + webp conversion is copy-paste mechanical.

**Credits before:** Picsart total = 0. **Credits after:** Picsart total = 0 (nothing generated).

---

## Target map — current weak image → new staging file → prompt

Each blog slot resolves on disk to `/images/{slot}-{width}.webp` via `src/lib/images.ts`.
Heroes need widths **2560, 1920, 1200**; cards need **1200, 800, 480**.
Staging files below use the **final on-disk names** so wiring = copy into `/public/images/`.

> NOTE on the home hero: `hero-aurora` is **season-switched** in `images.ts`.
> Summer (May–Sep) serves `hero-aurora-*.webp`; winter (Oct–Apr) serves `hero-aurora-winter-*.webp`.
> Today (June) the live home hero is the SUMMER file (`hero-aurora-2560.webp`, red cabins on a lake).
> Regenerate **both** sets so the hero is strong year-round.

| # | Slot (on-disk base) | Where it shows | Current subject (weak) | Aspect | Widths | Prompt key |
|---|---|---|---|---|---|---|
| 1 | `trip-aurora-chase` | **Featured hero** "The night the sky broke open over Kemi" (Home FeaturedPost + /top-reads editor's pick) | Aurora over frozen Bay-of-Bothnia ice floes | 3:2 | 1200/800/480 | `P_KEMI_AURORA` |
| 2 | `category-aurora` | Card "Why I stopped chasing the aurora with an app" | Dim forest aurora | 3:2 | 1200/800/480 | `P_FOREST_AURORA` |
| 3 | `trip-cabin-life` | Featured card "Five nights in a forest cabin" | Snowy log cabin, warm window light | 3:2 | 1200/800/480 | `P_FOREST_CABIN` |
| 4 | `category-seasons` | Card "Living between two suns / what the darkness…" | Autumn ruska birch in fog / blue-hour | 3:2 | 1200/800/480 | `P_KAAMOS_BLUE` |
| 5 | `aside-vesa` | **About-page hero** + Home personal aside | Tiny figure + headlamp under aurora arc | 3:2 | 1200/800/480 | `P_FIGURE_AURORA` |
| 6 | `hero-aurora` (summer set) | **Home page hero** (most-visible) — summer | Red cabins on a lake, summer evening | 21:9 | 2560/1920/1200 | `P_HOME_SUMMER` |
| 7 | `hero-aurora-winter` (winter set) | **Home page hero** — winter | Winter aurora landscape | 21:9 | 2560/1920/1200 | `P_HOME_WINTER` |
| 8 | `trip-food` | Card "A bowl of salmon soup that cost more than the flight" | Creamy Finnish salmon soup bowl | 3:2 | 1200/800/480 | `P_SALMON_SOUP` |

Priority if credits are limited: **1 → 6 → 5 → 2 → 3 → 4 → 8 → 7** (featured hero + home hero + About hero first; these are the loudest surfaces and the ones the owner screenshotted).

---

## Prompts (photoreal, brand-safe)

Default model per runbook: **`gemini-3-pro-image` (Nano Banana Pro), `--resolution 4K --quality high`**,
negative prompt to kill the plasticky AI look.

Shared **negative prompt** (append to every job):
```
text overlay, caption, watermark, logo, signature, cartoon, illustration, 3d render, cgi, painting,
oversaturated, hdr halo, plastic skin, waxy, oversharpened, blurry, low-res, jpeg artifacts,
deformed hands, extra fingers, distorted faces, fake-looking, video-game lighting
```

### P_KEMI_AURORA — slot `trip-aurora-chase` (featured hero, 3:2)
```
Photorealistic wide-angle night photograph, intense green aurora curtains with a faint pink lower edge
tearing across the sky above broken sea-ice floes on the frozen Bay of Bothnia near Kemi, Finnish Lapland.
A dark pine-forest treeline low on the horizon, no streetlights, thin crescent moon. Long-exposure DSLR look,
Sigma 14mm f/1.8 aesthetic, natural starlight, realistic colour, faithful aurora structure, minus 20 winter night.
No people. Editorial, cinematic, ultra-detailed.
```

### P_FOREST_AURORA — slot `category-aurora` (card, 3:2)
```
Photorealistic photograph, calm faint green aurora band low over a dark snowy spruce forest in central
Lapland, Rovaniemi backcountry, seen from a riverbank, soft starfield, subtle town glow on the far horizon,
deep blue winter night, untouched snow. Quiet and understated, not a dramatic substorm. Natural long-exposure
look, realistic colour. No people, no text.
```

### P_FOREST_CABIN — slot `trip-cabin-life` (card, 3:2)
```
Photorealistic photograph of a small traditional Finnish log mökki at night in a snowy pine forest by a
frozen lake near Kemijärvi, warm amber light glowing from one small window, smoke rising from the chimney,
fresh footprints in deep snow leading to the door, faint stars above the trees, minus 22 winter night.
Cozy, authentic, documentary feel. No people visible, no text.
```

### P_KAAMOS_BLUE — slot `category-seasons` (card, 3:2)
```
Photorealistic photograph of the Lapland polar-night "blue moment" (kaamos) around noon: a snow-covered
open field with scattered birches and a distant low fell, the whole scene bathed in deep luminous blue
twilight with a faint bone-grey glow on the southern horizon, no sun above the horizon, soft snow texture,
mid-December, 66.5°N. Still, melancholic, real winter light. No people, no text.
```

### P_FIGURE_AURORA — slot `aside-vesa` (About hero + Home aside, 3:2)
```
Photorealistic photograph, a single small human figure seen from behind wearing a winter parka with a
headlamp, standing on open snowy tundra under a vast green aurora arc filling the sky, Lapland, scale of one
tiny person against a huge sky, distant low fells, deep snow, realistic long-exposure night photography,
natural aurora colour. Sense of solitude and wonder. Back view, face not visible. No text.
```

### P_HOME_SUMMER — slot `hero-aurora` summer set (home hero, 21:9 ultrawide)
```
Photorealistic ultrawide cinematic photograph, golden midnight-sun evening over a calm forest lake in
Finnish Lapland, traditional red-ochre wooden cabins on the pine-and-birch shore, warm low sun reflecting
on still water, distant blue fell, late June, no snow, lush green, glassy reflections. Serene, editorial
travel photography, natural warm light. No people, no text.
```

### P_HOME_WINTER — slot `hero-aurora-winter` set (home hero, 21:9 ultrawide)
```
Photorealistic ultrawide cinematic photograph, green aurora arcing over a snow-covered frozen lake in
Finnish Lapland, snow-laden spruce and pine along the shore, deep blue winter night, faint stars, untouched
snow glowing under the aurora, distant low fell. Calm and vast, editorial night photography, faithful aurora
colour and structure. No people, no text.
```

### P_SALMON_SOUP — slot `trip-food` (card, 3:2)
```
Photorealistic overhead-ish food photograph, a rustic warmed ceramic bowl of Finnish lohikeitto (creamy
salmon soup) with chunks of wild salmon, leek half-moons, small new potatoes, a sprig of fresh thyme and
fresh dill, faint wisp of steam, on a dark weathered wooden restaurant table beside a small linen-lined
wooden box of dark rye bread and a curl of yellow butter on slate, soft pale-blue Lapland window light.
Natural restaurant photography, shallow depth of field. No hands, no people, no text.
```

---

## Exact generation commands (when credits exist)

Run from `lapland-blog-new/`. One image per slot (heroes 21:9, cards 3:2).
Each `gen-ai image … --save-to-drive --folder laplandvibes` returns a `url` (JSON mode).

```bash
# Example for the featured Kemi-aurora hero (card 3:2):
gen-ai image --model gemini-3-pro-image \
  --prompt "<P_KEMI_AURORA>" \
  --aspect-ratio 3:2 --resolution 4K --quality high \
  --negative-prompt "<SHARED_NEGATIVE>" \
  --save-to-drive --folder laplandvibes --json

# Example for the home hero (ultrawide 21:9):
gen-ai image --model gemini-3-pro-image \
  --prompt "<P_HOME_WINTER>" \
  --aspect-ratio 21:9 --resolution 4K --quality high \
  --negative-prompt "<SHARED_NEGATIVE>" \
  --save-to-drive --folder laplandvibes --json
```

Estimated cost: ~5 credits/image × 8 images ≈ **40 credits** (single variant each).
Generate 2 variants of the two heroes if you want a choice → ~50 credits.

## webp conversion (ffmpeg — sharp is NOT installed)

Download each generated PNG, then emit the exact widths the registry expects.
ffmpeg is installed (`ffmpeg 8.1.1`). Save outputs into THIS folder with the final on-disk names.

```bash
# Card slots (3:2) → widths 1200, 800, 480
for W in 1200 800 480; do
  ffmpeg -y -i SOURCE.png -vf "scale=${W}:-1" -c:v libwebp -quality 82 \
    "public/images/blog-redesign/trip-aurora-chase-${W}.webp"
done

# Hero slots (21:9) → widths 2560, 1920, 1200
for W in 2560 1920 1200; do
  ffmpeg -y -i SOURCE.png -vf "scale=${W}:-1" -c:v libwebp -quality 82 \
    "public/images/blog-redesign/hero-aurora-winter-${W}.webp"
done
```

Quality 82 ≈ the existing files. (Optional: also emit matching `.avif` with `-c:v libaom-av1 -still-picture 1`
to mirror the existing avif siblings; the components have `<source type="image/avif">` first.)

---

## How to wire in (mechanical, after credits + generation)

For each slot, the new files are drop-in replacements — **no `src/` change needed** because filenames match:

1. Generate + convert per above → files land in `public/images/blog-redesign/` as `{slot}-{width}.webp`.
2. Copy them up one level into `public/images/`, overwriting the weak originals
   (and the `.avif` siblings if you produced avif).
3. For the **home hero**, replace BOTH `hero-aurora-*` (summer) and `hero-aurora-winter-*` (winter) sets.
4. Update alt text only if the new composition differs from the registry default in `src/lib/images.ts`
   (slots 1–8 already have sensible alts there; the About page hard-codes its own alt in `src/pages/About.tsx`).
5. Rebuild + smoke-test (the OTHER agent / a follow-up runs the build — do NOT build here).

No `posts.ts` change is required: posts reference the same `/images/{slot}-1200.webp` paths.

---

## Reference — existing paid 4K Drive assets on board `laplandvibes` (NOT for reuse here)

There are 30 photoreal `gemini-3-pro-image` 4K/16:9 assets already on the Picsart Drive `laplandvibes` board.
They were generated for **OTHER ecosystem sites** (resorts, igloos, Levi chalets, husky tours, hotel-deals
cafés, Christmas). **Do NOT reuse them on lapland.blog** — the brand rule forbids one image on two sites.
Listed here only so they are not regenerated by accident, and as an emergency-only fallback for Vesa to judge:

```
summer-evening-lakeside-resort, midnight-sun-aerial-landscape, husky-sled-team-green-aurora,
husky-sled-team-back-view, sled-huskies-aurora-twilight, empty-slope-side-restaurant-pyhatunturi,
empty-french-patisserie, finnish-manor-cafe-still-life, cozy-winter-restaurant-ski-view,
french-patisserie-counter, finnish-manor-cafe-table-window, candlelit-log-kota-cabin,
loimulohi-salmon-roasting-kota-hut, rustic-lapland-forest-restaurant, wood-fired-sauna-lakeside-winter,
deep-winter-lapland-aurora-spruce-forest, pristine-finnish-lapland-wilderness-snow,
spring-lapland-stream-sunlight, frosted-pine-forest-snowy-road, lapland-autumn-boardwalk-fells,
midnight-sun-summer-lake, cozy-lapland-christmas-planning, finnish-lapland-winter-nightscape,
finnish-lapland-igloos-aurora-night, ski-in-ski-out-chalet-levi, steaming-wooden-hot-tub-lapland,
modern-kitchen-lapland-cabin-morning, wood-burning-fireplace-lapland-cabin,
glass-roofed-igloo-lapland-aurora, warm-wood-finnish-sauna-interior
```
