# Hero Loading Performance — Design

**Date:** 2026-07-23
**Status:** Approved (option B)
**Scope:** Homepage desktop hero video + four oversized service-page hero/section images

## Problem

Two independent causes produce the same symptom — a hero area that stays blank for a
noticeable beat after navigation.

### 1. Homepage, desktop — the background video

`app/HomeClient.js` `HeroCarousel` renders an `autoPlay` `<video>` as the desktop hero
background. `autoPlay` overrides `preload="metadata"`, so the browser begins pulling the
full file immediately, competing with the LCP poster, fonts, and the JS bundle.

| Asset | Size | Specs |
|---|---|---|
| `public/Video/hero.webm` | 4.77 MB | VP9, 1920×1080, 24 fps, 20.0 s, ~1.95 Mbps |
| `public/Video/hero.mp4` | 4.68 MB | H.264, 1920×1080, 24 fps, 20.0 s, ~1.96 Mbps |
| `public/images/hero-poster.webp` | 78 KB | preloaded `fetchPriority="high"` |

The two encodes being near-identical in size indicates neither was compressed for web
delivery. A background loop that always sits under a 45%-opacity navy scrim
(`bg-[#0B1A46]/45`) does not need ~2 Mbps.

**Secondary defect found during analysis:** the `media="(min-width: 769px)"` attributes on
the two `<source>` elements are inert. Browsers only honor `media` on `<source>` inside
`<picture>`; inside `<video>` Chrome and Firefox ignore it. The `.hero-bg-desktop`
`display: none` rule hides the element on phones but does not reliably prevent the fetch.
Mobile visitors are therefore likely downloading the 4.8 MB video for nothing.

### 2. Other pages — four service images shipped as raw exports

Eight files under `public/images/services/` are lossless-encoded at roughly 2.7k pixels
wide. They are referenced as `heroImage` (rendered `loading="eager" fetchPriority="high"`)
and `sectionImage` in `lib/services-data.js`.

| File | Size | Dimensions | Role |
|---|---|---|---|
| `cybersecurity-dubai.webp` | 8.85 MB | 2752×1536 | hero |
| `microsoft-entra-id-uae.webp` | 8.83 MB | 2752×1536 | hero |
| `email-security-what-we-cover.webp` | 8.06 MB | 2528×1696 | section |
| `cybersecurity-dubai-what-we-cover.webp` | 7.96 MB | 2528×1696 | section |
| `microsoft-entra-id-what-we-cover.webp` | 7.52 MB | 2528×1696 | section |
| `email-security-uae.webp` | 7.29 MB | 2752×1536 | hero |
| `intercom-uae.webp` | 6.96 MB | 2752×1536 | hero |
| `intercom-what-we-cover.webp` | 6.85 MB | 2528×1696 | section |

Total ~62 MB across four routes. Every other image in `public/images` is under 250 KB.

`next.config.js` sets `images: { unoptimized: true }`, so Next performs no resizing — the
byte count on disk is the byte count served.

### 3. Unreferenced source files in the deployment

`public/images/hero-mobile/raw/` holds seven files of 6.9–9.2 MB (~58 MB). No code path
references them. They are publicly reachable and inflate every build and deploy.

## Non-causes (ruled out)

- **Cloudflare caching.** The 30-day `Cache-Control` headers added 2026-06-18 are intact
  in `next.config.js` `headers()` for `/images`, `/Video`, `/events`, `/Rental`, `/icons`.
- **The homepage video slowing other pages.** Client-side navigation unmounts the
  `<video>`, aborting the transfer. The two problems are unrelated.
- **Hydration.** The CSS-swap hero introduced 2026-06-18 keeps server and client markup
  identical. Nothing in this design reintroduces a render branch.

## Approach

### Part A — re-encode the assets

**Images.** Re-encode the eight files with `sharp` (already in `node_modules`, no install):

- Hero images (full-bleed backgrounds): resize to **1920px wide**, WebP quality **80**.
- Section images (rendered in a `md:w-[45%]` column of a `max-w-[1200px]` container —
  ~540 CSS px maximum): resize to **1200px wide**, WebP quality **80**. This still gives
  better than 2× density on the largest rendered size.
- Preserve aspect ratio; do not crop. Filenames stay identical so no data or component
  changes are required.
- Expected result: 120–220 KB each, a reduction of roughly 99%.

Originals are copied to `public/images/services/_originals/` first — outside the
deployment via a `.gitignore` entry — so any re-encode can be redone from source.

**Video.** Re-encode both renditions from the existing H.264 master, keeping 1920×1080 and
the full 20 s (no trimming — that is a content decision, deferred):

- `hero.webm`: `libvpx-vp9`, CRF-driven, audio stripped (`-an`), target **≤1.2 MB**.
- `hero.mp4`: `libx264 -preset slow -profile:v main -pix_fmt yuv420p -movflags +faststart`,
  audio stripped, target **≤2.0 MB** (H.264 is less efficient; this rendition only serves
  browsers without VP9).

CRF is tuned iteratively against those size ceilings rather than fixed up front. Quality is
judged against the scrimmed presentation, not the bare file.

**Cleanup.** Delete `public/images/hero-mobile/raw/`. Its contents are unreferenced source
material; they are preserved in git history and can be restored from there if needed.

### Part B — defer desktop video playback

Change `HeroCarousel` so the poster always wins the race to first paint and the video is
never fetched where it is not shown:

1. Replace `autoPlay preload="metadata"` with `preload="none"` and a `ref`.
2. Add an effect that, after mount, checks `matchMedia('(min-width: 769px)')` and
   `matchMedia('(prefers-reduced-motion: reduce)')`. Only when the viewport is desktop and
   motion is not reduced does it set `preload = 'auto'`, call `load()`, then `play()`
   (with a `.catch(() => {})` for browsers that refuse programmatic playback).
3. Schedule that work through `requestIdleCallback` with a ~2 s timeout, falling back to a
   `setTimeout` where the API is unavailable, so the video never competes with LCP.

Constraints this must respect:

- **No render branching.** The effect mutates DOM properties and calls media methods; it
  never changes what React renders. Server and client markup stay byte-identical, which is
  what keeps the June nav-click regression from returning.
- The existing `reducedMotion` state keeps its single current purpose (pausing carousel
  auto-advance). The playback effect reads `matchMedia` directly rather than depending on
  that state, so it runs once on mount and does not re-fire on preference changes.
- The `.hero-bg-video` / `.hero-bg-poster` CSS reduced-motion swap in `globals.css` is
  unchanged and remains the visual mechanism; the JS guard only prevents the wasted fetch.
- The inert `media` attributes on the `<source>` elements are removed, since the JS guard
  now does that job honestly. A comment records why.

## Files affected

| File | Change |
|---|---|
| `public/images/services/*.webp` (8 files) | Re-encoded in place |
| `public/Video/hero.webm`, `hero.mp4` | Re-encoded in place |
| `public/images/hero-mobile/raw/` | Deleted |
| `app/HomeClient.js` | `HeroCarousel` video element + new playback effect |
| `.gitignore` | Ignore `public/images/services/_originals/` |

No changes to `lib/services-data.js`, `next.config.js`, `globals.css`, `app/page.js`,
routing, metadata, redirects, or any API route.

## Verification

1. `yarn build` completes without error.
2. Re-measure all eight images and both videos against the size ceilings above.
3. Visual comparison of each re-encoded image against its original at full-bleed hero size,
   confirming no visible artefacting.
4. Run the dev server; on the homepage confirm the poster paints immediately, the video
   begins shortly after, and the carousel, pause toggle, keyboard arrows, and swipe still
   work.
5. In devtools network panel at a mobile viewport, confirm `hero.webm`/`hero.mp4` are not
   requested.
6. At a desktop viewport with reduced motion emulated, confirm the poster shows and no
   video is requested.
7. Load one affected service page (`/services/elv/intercom-systems`) and confirm the hero
   image request is in the hundreds of KB, not megabytes.
8. Confirm no new console errors or hydration warnings.

## Deployment note

Filenames are unchanged and not fingerprinted. **The Cloudflare cache must be purged after
deploy**, or edge nodes will keep serving the old multi-megabyte files for up to 30 days.

## Out of scope

- Converting the site to `next/image` / enabling the Next image optimizer.
- Trimming or re-cutting the 20 s hero video (content decision, not raised here).
- Any other page, section, or image — everything else measured under 250 KB.
