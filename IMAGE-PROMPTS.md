# Image prompts — lapland.blog

17 hand-tuned prompts for hero / OG / category / post imagery. Paste-ready for Midjourney v6, Flux, DALL-E 3, and SDXL. Read this top section once, then jump to whichever prompt you need.

## How to use this file

- **Midjourney v6** is the default for any cinematic landscape, aurora, kaamos blue hour, or wide editorial shot. It handles film grain and natural light better than the rest.
- **Flux 1.1 Pro / Flux Dev** is the default for the food shot (Prompt 8), the cabin interior (Prompt 14), and anything that needs a specific human-scale moment with hands or objects in frame. Better at non-mangled fingers and food textures than Midjourney.
- **DALL-E 3** is fine as a fallback if you just want a quick option from the natural-language version. Skip it for the food and the night-sky ones.
- **SDXL / Realistic Vision / Juggernaut XL** if you want to fine-tune locally with the negative prompts included.

For every prompt I give you both a Midjourney string (with `--ar` flags etc.) and a longer natural-language version that works in Flux / DALL-E / SD. Use whichever you need.

### Aspect ratios

- **16:9** = full-bleed hero (landing page, post hero, category hero). Render at 2560×1440 minimum, downscale to 1920×1080 webp for production.
- **1.91:1** = Open Graph / social share. 1200×630 is the canonical export size.
- **4:5** or **1:1** = featured-card slot, mobile-friendly hero variant.

### Resolution targets

- Render Midjourney at default (`--v 6`, upscale subtle 2x).
- Render Flux at 1536px on the long edge minimum, then upscale with `clarity-upscaler` or `topaz` to 2560 long edge.
- Convert all final images to webp at q75–q82 before dropping into `public/images/`.

### Where the files go in the project

```
public/images/
  hero-home.webp                 # Prompt 1
  hero-home-alt.webp             # Prompt 2
  hero-about.webp                # Prompt 3
  hero-archive.webp              # Prompt 4
  hero-featured.webp             # Prompt 10 (vertical-friendly variant)
  og-default.webp                # Prompt 11
  newsletter-bg.webp             # Prompt 12

  posts/
    the-night-the-sky-broke-open-over-kemi.webp        # Prompt 5
    why-i-stopped-chasing-the-aurora-with-an-app.webp  # Prompt 6
    five-nights-in-a-forest-cabin.webp                 # Prompt 7
    a-bowl-of-salmon-soup-that-cost-more-than-the-flight.webp # Prompt 8
    living-between-two-suns.webp                       # Prompt 9

  categories/
    aurora.webp                  # Prompt 13
    cabins.webp                  # Prompt 14
    food.webp                    # Prompt 15
    seasons.webp                 # Prompt 16
    people.webp                  # Prompt 17 (also fine for /stories)
```

The placement table at the very bottom of this file shows prompt # → file path → import location in the codebase.

### Universal negative prompt (apply to all Flux/SD generations)

> cartoonish, oversaturated, HDR, fake aurora, neon green sky, anime, 3D render, CGI, video game, illustration, painting, low-quality, watermark, text overlay, logo, signature, jpeg artifacts, plastic skin, dead eyes, deformed hands, extra fingers, photoshop fringe, fisheye distortion, igloo cliché, cartoon Santa, group of tourists, photographer holding camera, drone in shot, lens flare bloom, instagram filter, sunset orange grad

---

## Prompt 1: Home Hero (WOW landing)

**Use:** Landing page hero, lapland.blog/
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** cinematic, awe, single-image-tells-story

### Midjourney v6
> cinematic wide editorial landscape photograph of a frozen Finnish river curving through snow-laden pine and birch forest, an aurora borealis ribbon overhead in restrained pale green and soft magenta tendrils, the river ice cracked in long natural patterns reflecting the sky, low natural starlight, no people, no buildings, no aurora arc cliché, deep navy sky, faint Milky Way band high above, shot on Sony A7S III with Sigma 14mm f/1.8 at ISO 3200 8 second exposure, very subtle film grain, Roger Deakins cinematography, Alex Strohl wilderness mood, real photographer noise, restrained color grading, --ar 16:9 --style raw --v 6 --s 250

### Flux / DALL-E 3 / SD generic
> A cinematic wide editorial landscape photograph of Finnish Lapland at night. A frozen river curves diagonally through deep snow-laden pine and birch forest. Above, a single restrained aurora borealis ribbon glows pale green with soft magenta edges, not a cartoon arc, not a saturated postcard — this is a real long-exposure photograph. The river ice is cracked in long organic patterns, faintly reflecting the sky. The horizon is deep navy fading to ink black, with a faint Milky Way band high above. No people, no cabins, no man-made objects. Shot on a Sony A7S III with a Sigma 14mm f/1.8 lens at ISO 3200, 8-second exposure. Subtle natural film grain, restrained color grading reminiscent of Kodak Portra 400 pushed one stop. Cinematography in the spirit of Roger Deakins and Alex Strohl wilderness work. National Geographic editorial quality. Single image tells the whole story.

**Negative prompt (for Flux/SD):** cartoon aurora, neon green, oversaturated, HDR, 3D render, igloo, person, tourist, photographer, drone, lens flare, watermark, text, logo, milky bloom, instagram filter

**Notes:** This is the ONE image. If it doesn't make you stop scrolling, regenerate. Reject any version where the aurora looks like a digital green smear or where there's a perfect arc — real auroras are messier than that.

---

## Prompt 2: Home Hero ALT (kaamos blue hour)

**Use:** Alternate landing hero for dark-season campaigns, A/B test against Prompt 1
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** kaamos, polar twilight, almost monochrome, breath-held

### Midjourney v6
> cinematic landscape photograph of Finnish Lapland during kaamos polar night, a snowbound boreal forest of pine and birch under deep blue twilight, no aurora, only a faint dusty pink horizon glow at the southern edge of the sky, untracked snow on the trees, a single set of ski tracks vanishing into the trees in the foreground, no people, no buildings, near-monochrome blue palette with a single pink horizon strip, shot on Hasselblad X1D 45mm at f/4 ISO 800, 1/15 second handheld with stabilization, blue hour 14:00 in late December at 66.5°N, Cinestill 800T color grading, restrained film grain, Roger Deakins style, --ar 16:9 --style raw --v 6 --s 200

### Flux / DALL-E 3 / SD generic
> A cinematic landscape photograph of Finnish Lapland during kaamos, the polar night. The scene is a snowbound boreal forest of pine and birch trees under deep blue twilight at 14:00 in late December at 66.5° north latitude. There is no aurora in the sky — just a faint dusty pink and lavender horizon glow at the southern edge, the only suggestion of a sun that never rose. The snow on the trees is untracked, heavy, undisturbed. In the immediate foreground a single pair of cross-country ski tracks vanishes into the trees. No people, no buildings, no animals. The palette is near-monochrome: deep blue dominating, a single thin band of pink at the horizon. Shot on a Hasselblad X1D with a 45mm lens at f/4, ISO 800, 1/15 second handheld. Color grading reminiscent of Cinestill 800T motion picture film. Restrained natural film grain. The whole image should feel like a held breath.

**Negative prompt (for Flux/SD):** aurora, green sky, sunset orange, vivid color, person, animal, building, road, vehicle, footprints, lens flare, HDR, oversaturated, watermark, text, cartoon

**Notes:** This is the harder image to get right because there's almost no color. If it comes out looking like generic dusk, push the prompt with "deep cobalt blue dominant, no green, no orange, no purple, single dusty pink band at horizon only".

---

## Prompt 3: About Page Hero

**Use:** /about — sense-of-place author shot
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** lived-in, authorship, documentary

### Midjourney v6
> documentary editorial photograph of a lone figure walking away from camera on a snow-packed forest trail in Finnish Lapland at low golden hour, wearing a charcoal wool jacket and well-worn dark hiking boots, breath fog visible in cold air, no face visible, hands in pockets, surrounded by tall snow-laden pine and birch trees, low warm sunlight raking through the trees from camera-left at about 11 degrees above the horizon, fresh tracks behind, untracked snow ahead, shot on Leica Q2 28mm at f/2.8 ISO 400 1/250, Kodak Portra 400 color palette, slight natural film grain, no recognizable face, back to camera only, Alex Strohl wilderness style, --ar 16:9 --style raw --v 6 --s 180

### Flux / DALL-E 3 / SD generic
> A documentary editorial photograph of a single lone figure walking away from the camera on a snow-packed forest trail in Finnish Lapland at low golden hour. The person wears a charcoal wool jacket and well-worn dark hiking boots, hands in their pockets, head slightly tucked against the cold. Visible breath fog. The face is NOT visible — back to camera only, no profile, no recognizable features. Around them, tall snow-laden pine and birch trees. Warm low sunlight rakes through the trees from camera-left at about 11 degrees above the horizon, the late winter sun barely clearing the treeline. Fresh boot tracks lead behind the figure into a slightly worn trail; ahead the snow is untracked. Shot on a Leica Q2 with a 28mm lens at f/2.8, ISO 400, 1/250. Color palette of Kodak Portra 400. Subtle natural film grain. The mood is lived-in, quiet, an author in their own landscape. Alex Strohl wilderness style.

**Negative prompt (for Flux/SD):** face visible, recognizable person, model pose, group, tourists, smiling, backpack with brand logo, drone, vehicle, building, watermark, text, oversaturated, HDR, lens flare, fashion shoot lighting

**Notes:** The "no face" instruction is critical. If the model puts a face in, regenerate. The figure should feel like the author exists IN this place, not posing for a website.

---

## Prompt 4: Archive / Stories Index Hero

**Use:** /stories or /archive — wide editorial banner with room for serif title overlay
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp), with intentional negative space upper-third for type
**Mood keyword:** still, contemplative, "an archive of"

### Midjourney v6
> wide editorial landscape photograph of a frozen Finnish lake at dusk, a single mature pine tree in dark silhouette on the right third of the frame, the rest of the composition is open negative space across a glassy snow-dusted lake surface fading into low pink and lavender twilight on the horizon, no other trees, no people, no buildings, no aurora, vast minimalist composition with deliberate empty upper-half for title typography overlay, shot on Phase One IQ4 with 35mm lens at f/8 ISO 100 1/30 tripod, fine grain, restrained color, Roger Deakins style, --ar 16:9 --style raw --v 6 --s 150

### Flux / DALL-E 3 / SD generic
> A wide editorial landscape photograph of a frozen Finnish lake at dusk. A single mature pine tree stands in dark silhouette on the right third of the frame — that is the only object in the composition. The rest is open negative space: a glassy snow-dusted frozen lake surface in the foreground stretching out, fading into a low pink and pale lavender twilight on the horizon. No other trees. No people. No buildings. No aurora. No animals. The upper half of the frame is intentionally empty sky to leave room for a heavy serif title overlay in post-production. Shot on a Phase One IQ4 medium format with a 35mm lens at f/8, ISO 100, 1/30 second on a tripod. Very fine grain, restrained color grading, Roger Deakins cinematic still mood. The whole composition should feel like the cover of an essay collection.

**Negative prompt (for Flux/SD):** multiple trees, forest, dense composition, person, cabin, road, sun, aurora, vivid sunset, oversaturated, HDR, watermark, text, illustration

**Notes:** Composition matters more than detail here. Reject any version where the tree is centered or where the sky is busy. The empty upper-half is the whole point — Vesa needs room to drop a serif title.

---

## Prompt 5: Post hero — "The night the sky broke open over Kemi"

**Use:** `/posts/the-night-the-sky-broke-open-over-kemi`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** intense aurora, real photographer noise, Kp 5+

### Midjourney v6
> cinematic editorial landscape photograph of an intense aurora borealis storm over the frozen Bothnian Bay near Kemi Finland, photographed from a snow-covered coastal road called Mansikkanokka, vivid restrained green ribbons with magenta-edged tendrils filling the upper two-thirds of the sky, sea ice in the foreground in plates and pressure ridges, a distant low pier silhouette far on the right horizon, faint stars between aurora bands, no cartoon arc, real Kp 5 plus geomagnetic storm shape, shot on Sony A7 III with Sigma 14mm f/1.8 at ISO 3200 8 second exposure, real photographer noise and grain, restrained color grading, no people, no aurora cliché, no oversaturated neon, Roger Deakins night cinematography, --ar 16:9 --style raw --v 6 --s 250

### Flux / DALL-E 3 / SD generic
> A cinematic editorial landscape photograph of an intense aurora borealis geomagnetic storm over the frozen Bothnian Bay near Kemi, Finland. The viewpoint is from a snow-covered coastal road called Mansikkanokka. The aurora fills the upper two-thirds of the sky in restrained vivid green vertical ribbons with magenta and faint pink tendrils at the edges — a real Kp 5+ event, not a cartoonish single green arc. In the foreground, sea ice in plates and pressure ridges stretches toward the horizon. Far on the right horizon, the faint silhouette of a low coastal pier or breakwater. Faint visible stars between the aurora bands. No people. No buildings up close. No igloos. The image must look like a real long-exposure photograph by a working night-sky photographer: shot on Sony A7 III with a Sigma 14mm f/1.8 lens at ISO 3200, 8-second exposure, slight visible high-ISO noise and natural film grain. Restrained color grading, not the oversaturated neon green of stock aurora photos.

**Negative prompt (for Flux/SD):** cartoon aurora arc, single perfect green band, neon, oversaturated, HDR, igloo, couple holding hands, tourist, person posing, drone, photographer in shot, vehicle, watermark, text, logo, instagram, vivid magenta, purple haze, milky bloom

**Notes:** The post is a field-report about a real Kp 5.33 night. Reject any version where the aurora looks digital or where the pressure-ridge sea ice is missing. The Bothnian Bay is the specific location — ice plates with cracks, not generic snow.

---

## Prompt 6: Post hero — "Why I stopped chasing the aurora with an app"

**Use:** `/posts/why-i-stopped-chasing-the-aurora-with-an-app`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** patience, near-monochrome, faint aurora, presence

### Midjourney v6
> quiet atmospheric editorial landscape photograph of Finnish Lapland deep winter at night, a faint single subtle aurora ribbon barely visible high above a snow-covered boreal forest of pine and birch, near-monochrome navy and silver palette, the aurora is so soft it could almost be cloud, almost no color saturation, no people, no gear visible, no roads, no cabins, just trees and a held-breath sky, soft starlight, shot on Sony A7S III with Sony 24mm f/1.4 at ISO 6400 4 second exposure, restrained Cinestill 800T color grading, real high ISO noise, very minimal Roger Deakins night cinematography, the image is about waiting, --ar 16:9 --style raw --v 6 --s 180

### Flux / DALL-E 3 / SD generic
> A quiet atmospheric editorial landscape photograph of Finnish Lapland deep winter at night. A snow-covered boreal forest of pine and birch fills the foreground and middle ground. High above, a single faint aurora ribbon is just barely visible — so subtle it could almost be cloud, no vivid green, no magenta, just a pale silver-green wash near the top of the frame. The palette is near-monochrome: navy, silver, black, the faintest hint of green high up. No people. No camera gear. No headlamps. No roads. No cabins. Just trees and a sky holding its breath. Soft starlight. Shot on Sony A7S III with a Sony 24mm f/1.4 GM lens at ISO 6400, 4-second exposure. Real high-ISO noise visible. Color grading reminiscent of Cinestill 800T. The whole image should be about patience, presence, and the absence of a "moment". Roger Deakins night cinematography.

**Negative prompt (for Flux/SD):** vivid aurora, green sky, color saturation, person, photographer, headlamp, camera, tripod, road, cabin, vehicle, oversaturated, HDR, cartoon, neon, watermark, text, instagram filter, sunset color

**Notes:** Counter-intuitive prompt. The whole point of the post is "stop chasing". If the aurora is too obvious you've failed. If it looks almost like nothing, you've succeeded.

---

## Prompt 7: Post hero — "Five nights in a forest cabin"

**Use:** `/posts/five-nights-in-a-forest-cabin` (also FEATURED post on the home page)
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** cosy but not cute, lived-in, mökki

### Midjourney v6
> editorial landscape photograph of a small traditional Finnish mökki log cabin at dusk in deep winter, dark stained log walls with thick snow piled on the steep roof, two small windows glowing warm yellow from kerosene-lamp interior light, soft grey wood smoke rising from a brick chimney, a single set of human boot footprints in fresh snow leading from the right edge of the frame to the cabin door, a flat frozen lake just beyond the cabin reflecting deep blue twilight, snow-laden pine forest framing the cabin on both sides, no people in shot, no Christmas decorations, no fairy lights, no festive cliché, lived-in not cute, dusk blue hour with warm window light contrast, shot on Fujifilm GFX 100 with 45mm lens at f/4 ISO 400 1/8 tripod, Kodak Portra 400 color, subtle grain, --ar 16:9 --style raw --v 6 --s 200

### Flux / DALL-E 3 / SD generic
> An editorial landscape photograph of a small traditional Finnish mökki log cabin at dusk in deep winter. The cabin has dark stained log walls and a steep roof piled with thick fresh snow. Two small square windows glow warm yellow from a kerosene lamp or wood-stove interior light — the only warm color in the scene. Soft grey wood smoke rises from a brick chimney. A single set of human boot footprints in the fresh snow leads from the right edge of the frame to the cabin door (no person visible — they have already gone inside). Just beyond the cabin a flat frozen lake reflects the deep blue twilight sky. Snow-laden pine forest frames the cabin on both sides. No people. No Christmas decorations, no fairy lights, no Santa, no festive cliché. The mood is lived-in, not cute — this is somebody's actual home for the week, not a postcard. Dusk blue hour with strong warm-vs-cold color contrast between the windows and the snow. Shot on Fujifilm GFX 100 with a 45mm lens at f/4, ISO 400, 1/8 second on a tripod. Kodak Portra 400 color palette, subtle grain. Editorial wilderness style.

**Negative prompt (for Flux/SD):** Christmas lights, fairy lights, Santa, reindeer, multiple cabins, glamping pod, igloo, glass igloo, hot tub, modern architecture, person in window, family pose, tourists, vehicle, road, signpost, watermark, text, HDR, oversaturated

**Notes:** This is also the featured-card post so the image needs to survive being cropped. Keep the cabin at slightly left-of-center so there's room to crop down to 4:5 vertical for the featured slot if needed. Reject anything that looks like a glamping ad.

---

## Prompt 8: Post hero — "A bowl of salmon soup that cost more than the flight"

**Use:** `/posts/a-bowl-of-salmon-soup-that-cost-more-than-the-flight`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp). For this one ALSO render a 4:5 vertical version for mobile.
**Mood keyword:** Kinfolk food photography, restrained, dim restaurant ambient

### Flux 1.1 Pro (PREFERRED for this one — better hands and food than MJ)
> An editorial top-down food photograph of an authentic Finnish lohikeitto salmon soup in a rustic hand-thrown ceramic bowl with a slightly uneven cream-coloured glaze, sitting on a worn dark oak restaurant table. The soup is creamy pale-pink with visible chunks of poached Atlantic salmon, soft cubes of yellow potato, thin rounds of leek, a generous scattering of fresh dill fronds, and a few black peppercorns floating on the surface. To the upper-right of the bowl, on a small wooden board, a single thick slice of dark Finnish ruisleipä rye bread with a knob of cold butter melting slightly into it. To the lower-left of the bowl, a worn linen napkin in oat colour and an old brass spoon. The lighting is dim restaurant ambient — warm tungsten from the upper-left at maybe 2700K, casting long soft shadows from the bowl, with a single shaft of candlelight glinting off the spoon. Background is dark and out of focus. Shot top-down at a slight 5-degree tilt, on a Hasselblad H6D-100c with an HC 80mm f/2.8 lens at f/4, ISO 400, 1/60 second handheld. Kinfolk magazine food photography style. NOT a TripAdvisor photo. NOT bright daylight. NOT styled-for-instagram. Subtle natural film grain.

### Midjourney v6
> editorial overhead food photograph of authentic Finnish lohikeitto salmon soup in a rustic hand-thrown cream ceramic bowl on a worn dark oak restaurant table, creamy pink broth with chunks of poached salmon yellow potato leek and fresh dill fronds visible, single slice of dark Finnish rye ruisleipä with melting butter on a small wood board upper right, oat linen napkin and brass spoon lower left, dim restaurant ambient warm tungsten 2700K from upper left, dark out of focus background, shot on Hasselblad H6D 80mm f/4 ISO 400, slight 5 degree tilt overhead, Kinfolk magazine food photography style, restrained natural film grain, NOT bright daylight NOT instagram NOT tripadvisor, --ar 16:9 --style raw --v 6 --s 200

**Negative prompt (for Flux/SD):** bright daylight, white background, instagram styling, oversaturated, HDR, food blog filter, garnish overload, microgreens, edible flowers, tomato, lemon wedge, cartoon, illustration, plastic bowl, modern white plate, sushi, ramen, deformed bowl, melted spoon, watermark, text, logo, hand in shot, finger in shot

**Notes:** Use Flux for this one. Midjourney still occasionally puts cartoon vegetables in food shots. The post mentions specifically: cream, dill, soft potatoes, salmon chunks, dark wood table, single rye bread slice with butter — get all of those or regenerate. The post is about a 42€ bowl of soup so it needs to look genuinely worth 42€, not like a cafeteria bowl.

---

## Prompt 9: Post hero — "Living between two suns"

**Use:** `/posts/living-between-two-suns`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** kaamos, seasonal affective, blue-on-blue, daylight lamp

### Midjourney v6
> editorial photograph of a snow-covered wooden park bench in Rovaniemi during kaamos polar twilight at midday, deep blue-on-blue palette with no warm light outside, a few bare birch branches in soft focus on the right edge of the frame, in the background middle-distance a single warm soft glow from a Lumie style daylight therapy lamp visible through a window of a low Finnish wooden townhouse, the lamp is the only warm point in the entire image, no people, no movement, no aurora, the whole image quietly explains seasonal affective disorder without being literal, shot on Sony A7 IV with Sony 35mm f/1.4 GM at f/2.8 ISO 800 1/60 handheld, Cinestill 800T color grading, restrained grain, Roger Deakins blue-hour cinematography, --ar 16:9 --style raw --v 6 --s 200

### Flux / DALL-E 3 / SD generic
> An editorial photograph of Rovaniemi, Finland in midday during kaamos, the polar night, when the sun does not rise. The foreground is a snow-covered wooden park bench, undisturbed, snow piled on the seat. The whole scene is deep blue-on-blue twilight — there is no warm sun anywhere outside. To the right of the frame, a few bare birch branches in soft focus. In the middle distance, a low Finnish wooden townhouse with a single window glowing soft warm yellow-white — and inside that window, just visible, a Lumie-style daylight therapy lamp turned on. That lamp is the only warm point of light in the entire image. The whole composition should quietly explain seasonal affective disorder and the human use of artificial daylight at 66.5° north latitude, without being literal. No people. No movement. No aurora. No Christmas decorations. Shot on Sony A7 IV with a Sony 35mm f/1.4 GM lens at f/2.8, ISO 800, 1/60 second handheld. Color grading reminiscent of Cinestill 800T. Restrained grain. Roger Deakins blue-hour cinematography style.

**Negative prompt (for Flux/SD):** sun, sunlight, golden hour, warm sky, aurora, person, child, dog, vehicle, traffic, festive lights, Christmas, snowman, instagram, oversaturated, HDR, multiple lit windows, cartoon, illustration, watermark, text

**Notes:** The single warm window light is the entire emotional weight of the image. If you can't see it clearly, regenerate. If there are multiple lit windows, it's wrong — the loneliness of the one warm point matters.

---

## Prompt 10: Featured Post Hero variant (vertical-friendly)

**Use:** Featured-card slot on the home page, also Pinterest and mobile hero variant
**Aspect:** 4:5 (2048×2560) primary, also export 1:1 (2048×2048) crop
**Mood keyword:** same energy as Home Hero but vertical-friendly composition

### Midjourney v6
> cinematic vertical editorial photograph of a tall snow-laden pine tree in deep Finnish Lapland forest at night with a faint pale green and magenta aurora ribbon vertically descending behind it, the aurora aligned to the vertical axis of the tree, deep navy sky with faint stars, untracked snow at the base of the trunk, no people no buildings no aurora cliché, restrained color, real photographer high ISO noise, shot on Sony A7S III Sigma 14mm f/1.8 at ISO 3200 8 second exposure, Cinestill 800T grading, Roger Deakins night cinematography, vertical composition with intentional bottom third negative snow space for title overlay, --ar 4:5 --style raw --v 6 --s 250

### Flux / DALL-E 3 / SD generic
> A cinematic vertical editorial photograph of a single tall snow-laden pine tree in deep Finnish Lapland forest at night. Behind the tree, aligned to its vertical axis, a faint aurora borealis ribbon descends in pale green with subtle magenta edges — restrained, not cartoonish. The deep navy sky has faint visible stars. Untracked snow at the base of the trunk. No people, no buildings, no other trees in sharp focus. The composition is intentionally vertical with a bottom third of negative snow space left for a title overlay in post-production. Shot on Sony A7S III with a Sigma 14mm f/1.8 lens at ISO 3200, 8-second exposure. Real high-ISO photographer noise and grain. Cinestill 800T color grading. Roger Deakins night cinematography. The whole image should feel like a movie poster.

**Negative prompt (for Flux/SD):** horizontal composition, multiple trees, forest, person, building, igloo, vehicle, road, cartoon aurora, neon, oversaturated, HDR, watermark, text, instagram, sunset

**Notes:** Same DNA as Prompt 1 but composed for vertical. If the home page featured-card slot ends up being 1:1, just center-crop. Render at 4:5 first, crop down — never the other way.

---

## Prompt 11: Open Graph / Social Share image

**Use:** Default OG image, social media share, link previews
**Aspect:** 1.91:1 (1200×630 webp, the canonical Facebook/X/LinkedIn size)
**Mood keyword:** thumbnail-survivable, wordmark-ready

### Midjourney v6
> editorial wide horizontal photograph of a low aurora borealis horizon over a flat frozen Finnish lake, restrained pale green and faint magenta band sitting just above the horizon, the lower one third of the frame is intentionally dark navy and unbusy snow surface to leave room for a wordmark and tagline overlay in post production, no people, no buildings, no trees taller than the horizon line, simple two-band composition that survives being thumbnailed to 600px wide, shot on Sony A7 III with Sony 24mm f/1.4 GM at ISO 1600 6 second exposure, Roger Deakins minimalism, restrained grading, --ar 1.91:1 --style raw --v 6 --s 180

### Flux / DALL-E 3 / SD generic
> A wide editorial horizontal photograph of a low aurora borealis horizon over a flat frozen Finnish lake. The aurora is restrained, a pale green band with faint magenta edges sitting just above the horizon line — not filling the sky, just hugging the horizon. The lower one-third of the frame is intentionally dark navy and unbusy: a flat snow surface with no detail, no objects, no tracks, deliberately reserved for a wordmark "lapland.blog" and a tagline overlay in post-production. No people, no buildings, no trees taller than the horizon line. The composition is a simple two-band horizon shot that must survive being thumbnailed down to 600 pixels wide for social media link previews. Shot on Sony A7 III with a Sony 24mm f/1.4 GM lens at ISO 1600, 6-second exposure. Restrained color grading, Roger Deakins minimalist night cinematography.

**Negative prompt (for Flux/SD):** complex composition, vertical aurora, busy foreground, trees, buildings, person, multiple horizons, neon green, cartoon, oversaturated, HDR, watermark, text, logo, instagram filter, vivid color

**Notes:** Test it at 600px wide before approving. If it loses readability at thumbnail size, regenerate with even more contrast between the horizon band and the lower negative space. The lower-third must be dark enough that white text reads on it.

---

## Prompt 12: Newsletter Section Background

**Use:** Background of the newsletter signup section, low-contrast texture behind white text
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp), heavy blur acceptable
**Mood keyword:** texture, almost-out-of-focus, low contrast, white-text-on-top

### Midjourney v6
> soft slightly out of focus aurora borealis wash over a dark Finnish night sky, very low contrast, defocused painterly long exposure with the aurora reduced to a soft pale green and faint magenta gradient across the upper half of the frame, the lower half is uniform dark navy without detail, no horizon, no objects, no trees, no buildings, no people, no stars in focus, the entire image is a low-contrast atmospheric texture made to sit behind white body text with high readability, shot on Sony A7S III at ISO 6400 with intentional 30mm f/1.4 defocus, --ar 16:9 --style raw --v 6 --s 150

### Flux / DALL-E 3 / SD generic
> A soft, intentionally slightly out-of-focus background texture image of an aurora borealis wash over a dark Finnish night sky. Very low contrast. The aurora is reduced to a soft pale green and faint magenta gradient across the upper half of the frame. The lower half is uniform dark navy with no detail at all. No visible horizon, no objects, no trees, no buildings, no people, no stars in focus. The entire image is a quiet atmospheric texture meant to sit behind white body text with high readability — think of it as a wash, not a photograph. Painterly defocused long-exposure quality. Shot on Sony A7S III at ISO 6400 with a 30mm f/1.4 lens deliberately defocused so nothing is sharp.

**Negative prompt (for Flux/SD):** sharp focus, detail, stars, trees, mountains, person, building, vivid aurora, cartoon, oversaturated, HDR, high contrast, vignette, watermark, text, logo, fisheye, lens flare

**Notes:** This is NOT a hero. It's a backdrop. If you can read it as a "real photo" you've made it too sharp. Test by overlaying white body text at 80% opacity — if the text reads cleanly, you're done.

---

## Prompt 13: Aurora category hero

**Use:** `/category/aurora`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** scale, vastness, single human dot for scale

### Midjourney v6
> wide-angle panoramic editorial photograph of an enormous aurora borealis storm filling the entire upper two-thirds of a Finnish Lapland night sky, restrained pale greens and magenta tendrils, vast snow-covered open fell landscape stretching to a low horizon, in the lower middle-distance a single tiny pinpoint of warm headlamp light from one distant person standing alone for scale, the figure is barely a dot in the composition, no face visible, vast scale contrast between human and sky, shot on Sony A7S III with Sigma 14mm f/1.8 at ISO 3200 8 second exposure, Roger Deakins night cinematography, restrained color, --ar 16:9 --style raw --v 6 --s 250

### Flux / DALL-E 3 / SD generic
> A wide-angle panoramic editorial photograph of an enormous aurora borealis storm filling the entire upper two-thirds of a Finnish Lapland night sky. The aurora is in restrained pale greens and faint magenta tendrils — vivid but not cartoonish. Below the sky stretches a vast snow-covered open fell landscape with a low horizon. In the lower middle-distance, far from camera, a single tiny pinpoint of warm yellow-white headlamp light from one solitary distant person standing alone in the snow — the figure is barely a dot, just enough to give the sky scale. No face visible, no recognisable features, just a glow. The whole image is about scale: the smallness of the human, the vastness of the sky. Shot on Sony A7S III with a Sigma 14mm f/1.8 lens at ISO 3200, 8-second exposure. Restrained color grading, Roger Deakins night cinematography.

**Negative prompt (for Flux/SD):** large person, group, recognizable face, multiple headlamps, vehicle, road, cabin, igloo, cartoon aurora, neon, oversaturated, HDR, instagram, watermark, text, logo, vivid magenta, milky bloom

**Notes:** Different DNA from Prompt 1 (Home) and Prompt 5 (Kemi) — this one is about SCALE. The human dot is essential but must be tiny. If the figure is recognisable as a person, it's too big.

---

## Prompt 14: Cabins category hero

**Use:** `/category/cabins`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** warm interior vs cold exterior, mökki life

### Flux 1.1 Pro (PREFERRED for interior detail)
> An editorial interior photograph of a small traditional Finnish mökki cabin in winter. The viewpoint is from inside the cabin looking toward a frosted window. To the left, an old cast-iron wood stove with visible orange flames behind a soot-darkened glass door, a small stack of dry birch logs beside it, and a steaming dark blue enamel mug of coffee sitting on the cast iron top. To the right, a worn wooden bench with two folded grey wool blankets and a single woollen sock drying. Through the frosted window in the centre of the frame, the deep blue dusk of a snowy Lapland forest is visible, blurred by ice crystals on the glass. Strong warm-versus-cold color contrast: warm orange firelight on the left, cold blue dusk through the window. No people. No Christmas decorations, no fairy lights, no festive cliché. Shot on a Hasselblad X1D with a 30mm lens at f/2.8, ISO 800, 1/30 second handheld. Color palette of Kodak Portra 400 pushed for the warm tones. Subtle natural film grain. Editorial interior photography style, lived-in, not staged.

### Midjourney v6
> editorial interior photograph of a small traditional Finnish mökki cabin in winter looking toward a frosted window, cast iron wood stove on the left with visible orange flames behind soot-darkened glass and birch logs beside it, a steaming dark blue enamel mug of coffee on the stove top, a worn wooden bench with folded grey wool blankets on the right, frosted window in the center showing blurred deep blue dusk forest beyond ice crystals on the glass, strong warm orange firelight versus cold blue dusk contrast, no people no Christmas no fairy lights, lived in not staged, shot on Hasselblad X1D 30mm f/2.8 ISO 800, Kodak Portra 400 grading, --ar 16:9 --style raw --v 6 --s 200

**Negative prompt (for Flux/SD):** Christmas decorations, fairy lights, person, hand in shot, modern kitchen, IKEA furniture, glamping pod, glass igloo, hot tub, fashion shoot lighting, oversaturated, HDR, bloom, watermark, text, instagram

**Notes:** Use Flux for the firelight and the steaming mug — Midjourney occasionally turns flames into smoke. The post category is about real cabins, not luxury glamping pods, so reject anything that looks like an Airbnb listing.

---

## Prompt 15: Food category hero

**Use:** `/category/food`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** Finnish forest forage, cookbook editorial, slate slab + linen

### Flux 1.1 Pro (PREFERRED)
> An editorial overhead cookbook-style food photograph of a Finnish forest forage spread on a dark grey slate slab over an oat-coloured linen cloth. Composed naturally, slightly off-centre. On the slab: a small cluster of fresh ripe orange cloudberries, a separate small pile of red lingonberries, two pieces of cold-smoked Arctic char on a square of waxed paper, three slices of dark Finnish rye crispbread näkkileipä, a tiny ceramic ramekin of spruce tip salt with a small wooden spoon, and a few sprigs of fresh juniper. To one side of the spread, a worn brass knife with a wooden handle — a traditional Finnish puukko. The lighting is soft north-facing window light from upper-left at about 4500K, casting long natural shadows. Background is the dark slate edge fading into out-of-focus oat linen. Shot top-down on a Hasselblad H6D-100c with HC 80mm f/2.8 lens at f/4, ISO 400, 1/60 second tripod. Editorial cookbook food photography style — restrained, no overstyled garnish. Subtle natural film grain.

### Midjourney v6
> editorial overhead cookbook food photograph of a Finnish forest forage spread on a dark grey slate slab over oat linen cloth, fresh orange cloudberries red lingonberries cold smoked Arctic char on waxed paper three slices of dark Finnish rye crispbread näkkileipä, tiny ceramic ramekin of spruce tip salt with a small wooden spoon, fresh juniper sprigs, a traditional Finnish puukko knife with wooden handle to the side, soft north-facing window light from upper left 4500K with long natural shadows, top down composition slightly off centre, shot on Hasselblad H6D 80mm f/4 ISO 400 1/60 tripod, restrained editorial cookbook style no overstyled garnish, --ar 16:9 --style raw --v 6 --s 200

**Negative prompt (for Flux/SD):** overstyled, microgreens, edible flowers, restaurant plating, bright daylight, white background, oversaturated, HDR, instagram filter, food blog filter, plastic, hand in shot, finger, deformed berries, cartoon, illustration, watermark, text, logo, sushi, ramen, tomato, lemon

**Notes:** Use Flux. The berries should look real, not waxy. Reject any version with tropical fruit, microgreens, or edible flowers — those are Mediterranean food clichés, not Finnish forest forage.

---

## Prompt 16: Seasons category hero

**Use:** `/category/seasons`
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** subtle seasonal shift, single birch tree, NOT a literal triptych

### Midjourney v6
> editorial composite landscape photograph of a single mature Finnish silver birch tree shown across three subtle seasonal moods naturally composed in one continuous frame, on the left the deep winter version with the trunk and branches heavily snow laden under blue dusk, in the middle the autumn ruska version with the branches in golden yellow leaves against a low pale grey sky, on the right the summer midnight sun version with the branches in fresh new green leaves against a soft warm midnight blue sky, the three states blend gradually across the frame as if shot from the same spot at three different times rather than as a literal triptych, no hard divider lines, no people, no buildings, restrained natural color grading, shot on Phase One IQ4 with 50mm f/4 ISO 100, fine grain, Roger Deakins style, --ar 16:9 --style raw --v 6 --s 220

### Flux / DALL-E 3 / SD generic
> An editorial composite landscape photograph of a single mature Finnish silver birch tree shown across three subtle seasonal moods, naturally composed in one continuous frame — NOT a literal triptych with hard divider lines. On the left side of the frame, the deep winter version of the same tree: trunk and branches heavily snow-laden, the ground in untracked snow, the sky a deep blue dusk. In the middle of the frame, the same tree in autumn ruska: branches in golden yellow and faint orange leaves, the ground in fallen leaves on dry soil, the sky a low pale grey. On the right side of the frame, the same tree in summer midnight sun: branches in fresh new green leaves, the ground in soft moss and lingonberry shrubs, the sky a soft warm midnight blue. The three states blend gradually across the frame as if shot from the same spot at three different times of year and gently merged. No hard divider lines. No people, no buildings, no animals. Restrained natural color grading. Shot on Phase One IQ4 with a 50mm f/4 lens at ISO 100. Fine grain, Roger Deakins style.

**Negative prompt (for Flux/SD):** triptych, hard divider, three trees, multiple trees, frame border, collage, polaroid, vintage frame, person, building, oversaturated, HDR, cartoon, illustration, watermark, text, fall foliage cliché, autumn instagram filter

**Notes:** The trickiest prompt in the file. Most generators will try to make a literal triptych with hard borders. Reject those. Push the prompt with "single continuous landscape, gradient blend between seasons, no borders, no panels, no frames". May need 4–6 generations to land.

---

## Prompt 17: People & Stories category hero

**Use:** `/category/people` and `/category/stories` (same image works for both)
**Aspect:** 16:9 (2560×1440 → 1920×1080 webp)
**Mood keyword:** quiet documentary, weathered hands, no face

### Flux 1.1 Pro (PREFERRED for hands)
> A quiet documentary editorial photograph of a pair of weathered older human hands holding a dented dark blue enamel coffee cup, photographed from just over the shoulder of the unseen person. The hands are slightly cracked from cold and outdoor work, with short clean nails, no rings, no watch, no jewelry. The cup is a traditional Finnish enamel mug, scratched and lived-in, half-full of black coffee with steam rising. In the lower-middle distance just past the hands, the dark grey-green ice of a frozen Finnish river — Kemijoki or Ounasjoki — with snow on its banks and a few bare birch trees. No face, no profile, no recognisable person, just hands and the river. Soft overcast natural daylight, blue hour transitioning to morning. Shot on Sony A7 IV with a 50mm f/1.4 GM lens at f/2.0, ISO 800, 1/250 second handheld. Kodak Portra 400 color palette. Subtle natural film grain. Documentary editorial style, no posing, no styling.

### Midjourney v6
> documentary editorial photograph of weathered older human hands holding a dented dark blue enamel coffee cup over the unseen shoulder of a person, slightly cracked cold-worked hands no rings no watch, traditional Finnish enamel mug scratched and lived in half full of black coffee with steam, in the middle distance the dark grey green ice of a frozen Kemijoki river with snowy banks and bare birch, no face no profile no recognizable person, soft overcast natural blue hour daylight, shot on Sony A7 IV 50mm f/2.0 ISO 800 1/250 handheld, Kodak Portra 400 grading, subtle grain, documentary not posed, --ar 16:9 --style raw --v 6 --s 200

**Negative prompt (for Flux/SD):** face, profile, recognizable person, jewelry, ring, watch, manicure, young hands, model hands, fashion shoot, stock photo pose, smiling, deformed fingers, six fingers, plastic skin, oversaturated, HDR, cartoon, illustration, watermark, text, logo, instagram filter

**Notes:** Use Flux for the hands. Midjourney still botches finger counts roughly 1 in 5 generations. Inspect every result at full resolution before approving — five fingers per hand, no extras.

---

## Image placement map

| # | Prompt | File path | Imported / referenced in |
|---|---|---|---|
| 1 | Home Hero | `public/images/hero-home.webp` | `src/components/Hero.tsx` (or whatever the home hero component is called) |
| 2 | Home Hero ALT (kaamos) | `public/images/hero-home-alt.webp` | A/B variant — swap into `src/components/Hero.tsx` for dark-season campaigns |
| 3 | About hero | `public/images/hero-about.webp` | `src/pages/About.tsx` |
| 4 | Archive / Stories index hero | `public/images/hero-archive.webp` | `src/pages/Archive.tsx` or `src/pages/Stories.tsx` |
| 5 | Post — Kemi aurora | `public/images/posts/the-night-the-sky-broke-open-over-kemi.webp` | Replaces the Unsplash URL in `src/data/posts.ts` for slug `the-night-the-sky-broke-open-over-kemi` |
| 6 | Post — stopped chasing aurora | `public/images/posts/why-i-stopped-chasing-the-aurora-with-an-app.webp` | Replaces the Unsplash URL in `src/data/posts.ts` for slug `why-i-stopped-chasing-the-aurora-with-an-app` |
| 7 | Post — five nights cabin | `public/images/posts/five-nights-in-a-forest-cabin.webp` | Replaces the Unsplash URL in `src/data/posts.ts` for slug `five-nights-in-a-forest-cabin`. Also used as the FEATURED card image on the home page |
| 8 | Post — salmon soup | `public/images/posts/a-bowl-of-salmon-soup-that-cost-more-than-the-flight.webp` | Replaces the Unsplash URL in `src/data/posts.ts` for slug `a-bowl-of-salmon-soup-that-cost-more-than-the-flight` |
| 9 | Post — living between two suns | `public/images/posts/living-between-two-suns.webp` | Replaces the Unsplash URL in `src/data/posts.ts` for slug `living-between-two-suns` |
| 10 | Featured post hero (vertical) | `public/images/hero-featured.webp` | Featured-card slot on home, also used as Pinterest pin source |
| 11 | OG / social share | `public/images/og-default.webp` | Referenced in `index.html` `<meta property="og:image">` and per-route OG fallback |
| 12 | Newsletter section background | `public/images/newsletter-bg.webp` | `src/components/NewsletterSignup.tsx` (or wherever the signup section lives) as `background-image` |
| 13 | Aurora category | `public/images/categories/aurora.webp` | `src/pages/Category.tsx` keyed off `categorySlug === 'aurora'` |
| 14 | Cabins category | `public/images/categories/cabins.webp` | `src/pages/Category.tsx` keyed off `categorySlug === 'cabins'` |
| 15 | Food category | `public/images/categories/food.webp` | `src/pages/Category.tsx` keyed off `categorySlug === 'food'` |
| 16 | Seasons category | `public/images/categories/seasons.webp` | `src/pages/Category.tsx` keyed off `categorySlug === 'seasons'` |
| 17 | People / Stories category | `public/images/categories/people.webp` (and reuse for `categories/stories.webp` or symlink) | `src/pages/Category.tsx` keyed off `categorySlug === 'people'` and `categorySlug === 'stories'` |

After dropping the webp files into `public/images/...`, do a project-wide search for `images.unsplash.com` in `src/data/posts.ts` and replace each of the five hero URLs with the local `/images/posts/{slug}.webp` path. The seed Unsplash placeholders can then be removed.
