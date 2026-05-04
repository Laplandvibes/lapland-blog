# Lapland.blog — image quality audit (2026-05-04)

Vesa flagged: "samoin kuvat pitää tarkastaa, että täytyykö generoida uusia
kuvia, parempilaatuisia." This is the audit of the 17 image slots used on
the live site, what's good, what's weak, and exact prompts to regenerate
the weak ones.

## Inventory + verdict

| Slot (1200px) | File size | Visual verdict | Action |
|---|---|---|---|
| `hero-aurora-1200.webp` | 48 KB | Underweight for hero. Looks AI-stylized neon, not photo-real. | **Regenerate** — hero LCP, must look photographic |
| `hero-aurora-1920.webp` | 124 KB | Same as above, larger res. Same issue. | Regenerate at 2560 width |
| `hero-aurora-2560.webp` | 219 KB | OK file size for 2560. Aesthetic still neon-stylized. | Regenerate |
| `hero-dusk-lake-1200.webp` | 78 KB | Acceptable. Editorial blue-hour mood works. | Keep |
| `hero-dusk-lake-2560.webp` | 285 KB | Good. | Keep |
| `trip-aurora-chase-1200.webp` | 178 KB | This is the post hero on /post/the-night-the-sky-broke-open-over-kemi. Very saturated neon green, looks CGI. **Most visible weak image on the site.** | **Regenerate (priority 1)** |
| `trip-cabin-life-1200.webp` | 67 KB | Decent — a lit log cabin in snow. | Keep |
| `trip-food-1200.webp` | 71 KB | Salmon soup, OK quality. | Keep |
| `trip-night-forest-1200.webp` | 35 KB | Underweight; likely low detail. | Regenerate |
| `trip-silence-1200.webp` | 21 KB | Heavily compressed; blurry. | Regenerate |
| `trip-forest-walk-1200.webp` | 100 KB | OK. | Keep |
| `trip-solo-trek-1200.webp` | 161 KB | Good detail. | Keep |
| `category-aurora-1200.webp` | 24 KB | Very small for 1200px = blurry. Reused as hero of `/post/why-i-stopped-chasing-the-aurora-with-an-app`. | **Regenerate** |
| `category-cabins-1200.webp` | 40 KB | Small. | Regenerate |
| `category-food-1200.webp` | 174 KB | Good. | Keep |
| `category-seasons-1200.webp` | 70 KB | Acceptable (used as hero of `/post/living-between-two-suns`). | Keep, but could be stronger |
| `aside-vesa-1200.webp` | 43 KB | Small file, neon AI-look (used as About hero). | **Regenerate** |
| `pillar-cold-1200.webp` | 30 KB | Small. | Regenerate |
| `pillar-people-1200.webp` | 55 KB | OK. | Keep |
| `pillar-shelter-1200.webp` | 151 KB | Good. | Keep |

**Summary:** 7 of 17 image slots need regeneration. The most visible/painful
ones (because they're used as post heroes or the home hero) are:

1. `trip-aurora-chase-1200.webp` (priority 1 — used on the editor's #1 post + /top-reads featured card)
2. `hero-aurora-*.webp` (priority 1 — home hero, LCP element)
3. `category-aurora-1200.webp` (priority 2 — post hero of /post/why-i-stopped-chasing…)
4. `aside-vesa-1200.webp` (priority 2 — About page hero + fallbacks)
5. `pillar-cold-1200.webp` (priority 3 — Home pillar)
6. `category-cabins-1200.webp` (priority 3)
7. `trip-night-forest-1200.webp` + `trip-silence-1200.webp` (priority 3)

## Style direction (apply to every regenerated prompt)

The current weakness is the "neon AI aurora" look — uniform bright green,
arc shapes too perfect, no atmospheric depth. Real Lapland aurora photos
have:

- Visible noise / grain (it's a long exposure at high ISO)
- Asymmetric curtain shapes
- Stars *behind* the aurora (you should see Polaris, Capella, etc.)
- Foreground that's mostly unlit and has texture (snow, trees, ice)
- Saturation in the green/cyan, but with hints of pink/violet at the upper edge — that's a real K-index 5+ artifact

The prompts below explicitly ask for these.

## Regeneration prompts (gpt-image-1, 1792×1024 wide → resize)

> Each prompt assumes you'll request 1792×1024 (or 2048×1152 if avail) and
> then resize down to 2560/1920/1200 with Sharp/Squoosh quality 82.

### 1. trip-aurora-chase (priority 1)
```
Professional long-exposure photograph of the aurora borealis from a
ground-level perspective on broken sea ice at the Bay of Bothnia, Finnish
Lapland. Curtain-shaped green aurora with subtle pink-violet upper edge,
asymmetric and irregular, with visible stars (including Polaris) showing
through the lighter parts. Foreground: cracked sea ice slabs in deep blue
moonlight, slightly out of focus, snow-dust on the surface. No human
figures. Sigma 14mm f/1.8, ISO 3200, 8 second exposure, slight visible
grain. Wide cinematic 21:9. NOT cartoon, NOT painterly, NOT neon — looks
like a real photograph from a National Geographic feature.
```

### 2. hero-aurora (priority 1)
```
Wide editorial-magazine photograph: aurora borealis arching across the
night sky over a winding frozen river running through a snow-laden boreal
pine forest, Finnish Lapland. The aurora is asymmetric and natural — green
band with pink-violet tinge near the top, visible stars behind. The river
ice has subtle white snow texture and reflects the green light. Pine trees
flanking both sides, snow-laden but not symmetrical. Slight atmospheric
haze near the horizon. NO human figures, NO cabins, NO neon look.
Photographic, not stylized. 21:9 aspect, cinematic.
```

### 3. category-aurora (priority 2)
```
Quiet, dark Lapland forest at night with a faint, almost subtle green
aurora glow on the horizon — most of the frame is dark snowy spruce trees
in deep blue moonlight. The aurora is small and barely visible, "the way
it actually looks most nights, not the postcard." Strong negative space.
Photo-real, not stylized. 3:2 aspect.
```

### 4. aside-vesa (priority 2)
```
Tiny solitary figure with a red headlamp, seen from behind, standing on a
flat snowy plateau under a giant green aurora arc that fills two-thirds of
the sky. The figure is small (maybe 5% of the frame height) and at the
bottom-third intersection, photographer's-rule placement. Vast empty
foreground of windblown snow. Distance, scale, awe — but photographic,
not painterly. 3:2 aspect.
```

### 5. pillar-cold (priority 3)
```
Editorial photograph: a single park bench under a streetlight on a
sub-zero winter night in Rovaniemi, Finland. Snow has piled on the bench
seat and the lamp post. Warm orange light from one apartment window
above, frosted breath visible against it. Quiet, melancholic, real-world.
Not cartoon. 3:2 aspect.
```

### 6. category-cabins (priority 3)
```
Interior view of a Finnish forest cabin at night: wood-burning stove
glowing orange, folded wool blankets on a wooden bench, a single steaming
enamel mug on a small table. Pine paneling walls, soft amber light. A
window in the background shows pure black night and snow. Photo-real,
warm, intimate. 3:2 aspect.
```

### 7. trip-night-forest (priority 3)
```
Snow-draped spruce trees in a Finnish boreal forest at deep night, no
human elements, sky absolutely black with thousands of visible stars.
Faint blue moonlight on snow. Very simple, very dark, deeply atmospheric.
3:2 aspect.
```

### 8. trip-silence (priority 3)
```
A single snow-covered Scots pine tree on a frozen lake in Finnish Lapland
at twilight (blue hour). Faint pink-orange glow on the southern horizon.
The tree stands alone in vast white. Minimalist composition, photo-real,
cold but not bleak. 3:2 aspect.
```

## Process

1. Open OpenAI Images / gpt-image-1 (or use the generator agent at
   `mcp__0f6352a8-...__s4879958_heygen_generate_nordic_photos` if it
   produces realistic-not-stylized output).
2. Generate at the largest available resolution.
3. Save to `lapland-blog-new/.tmp/image-regen/<slot>-source.<ext>`.
4. Use the existing `scripts/download-and-process-images.mjs` pipeline (or
   manually with Sharp) to produce the 480 / 800 / 1200 / 1920 / 2560 size
   ladders at quality 82 method 6, output `<slot>-<width>.webp`.
5. Move into `public/images/`, replacing the old files.
6. Hard-refresh the deploy. CF Pages caches at the edge; bust by adding
   `?v=<commit>` query string in the JSX `src` if needed (not currently
   needed — file path is the cache key).

## Don't regenerate (yet)

`hero-dusk-lake-*`, `trip-cabin-life-*`, `trip-food-*`, `trip-forest-walk-*`,
`trip-solo-trek-*`, `category-food-*`, `pillar-people-*`, `pillar-shelter-*`
are doing their job. Spend the regen budget on the seven priority slots
above first.
