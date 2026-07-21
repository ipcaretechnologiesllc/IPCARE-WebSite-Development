# Yas Driving Academy — Video Card + Case-Study Page

**Date:** 2026-07-21
**Scope:** Yas Driving Academy only (pattern is reusable for other projects later).
**Status:** Implemented & verified.

> **Update (2026-07-21):** No video was available. Pivoted to a real still image (`YDA-1` →
> `hero.webp`) for the card and detail-page hero. The `<video>` support in `CardMedia`
> remains in place (data-driven) so a video can be added later by setting the `video` field.
> The detail hero uses a **contained, framed image** on a blurred navy backdrop rather than a
> full-bleed stretch, because the client-supplied photos are low resolution (see below).
> Client photos are WhatsApp-compressed (243–335px wide); higher-res originals requested.

## Goal

1. Replace the static image on the Yas Driving Academy **featured card** (`/portfolio`) with a silent, looping, self-hosted video.
2. Add a dedicated **case-study detail page** at `/portfolio/yas-driving-academy` where "View Details" now leads, featuring the same video hero and a real "team on site" photo gallery.

## Non-goals

- No Instagram embed (shows post date/username/caption + expiring URLs — conflicts with the "no date" requirement).
- No changes to any other portfolio card's link or content.
- No change to the homepage `DeliveryProofStrip`, Event IT sections, redirects, hreflang, or sitemap logic beyond adding the one new route.

## Media (client-provided)

| Asset | Count | Path | Notes |
|---|---|---|---|
| Video | 1 | `public/videos/yas-driving-academy.mp4` | Original uploaded file (not the IG link). ~5–15s, ≤ ~8 MB. Compressed + poster extracted during build. |
| Team photos | 4 (3–6 acceptable) | `public/images/portfolio/yas-driving-academy/work-1.jpg` … | Landscape, ≥ 1200px wide. Optimized → WebP. |

Rights: assumed IP Care's own footage/photos.

## Data model (`lib/portfolio-data.js`)

Add optional fields to the Yas Driving Academy project object:

- `video: '/videos/yas-driving-academy.mp4'` — presence triggers video rendering.
- `poster: '/images/portfolio/yas-driving-academy/poster.webp'` — generated frame; falls back to existing `image` if absent.
- `caseStudy: true` — presence makes the card link to `/portfolio/<slug>` and includes the slug in `generateStaticParams`.
- `gallery: [{ src, alt }, …]` — 4 team photos for the detail gallery.
- Set `imageVerified: true` so the "Representative visual" tag is suppressed (real footage now).

All existing fields (`challenge`, `scope`, `outcome`, `services`, `relatedHref`, etc.) are reused as-is.

## Card treatment (`app/portfolio/PortfolioClient.js`)

- `FeaturedCard`: when `project.video` exists, render
  `<video autoPlay muted loop playsInline preload="metadata" poster={project.poster || project.image}>` in place of `<img>`, same object-cover / hover-scale styling. Otherwise unchanged `<img>`.
- Reduced motion: wrap so users with `prefers-reduced-motion: reduce` get the poster still (no autoplay). Implemented with the CSS/attribute approach or a small hook; poster guarantees a graceful frame.
- "Representative visual" tag already keys off `!project.imageVerified` → disappears automatically.
- "View Details" href: `project.caseStudy ? `/portfolio/${project.slug}` : project.relatedHref`. Applied in both `FeaturedCard` and `ProjectCard` so the pattern is consistent and future-proof.

## Detail page (`app/portfolio/[slug]/page.js`, server component)

- `generateStaticParams()` → only projects where `caseStudy === true`.
- `generateMetadata()` → title/description/canonical (relative) from the project; OpenGraph image = poster.
- Section spine:
  1. **Hero** — same looping video (poster fallback), navy gradient overlay, breadcrumb (Portfolio → project), name, `location · industry`, service chips.
  2. **Challenge / Scope / Outcome** — three blocks from existing data fields.
  3. **On site with our team** — responsive gallery grid (`gallery[]`), rounded cards, subtle hover, click-to-enlarge lightbox (small client component).
  4. **Related service + CTA** — link to `relatedHref` + standard contact/quote CTA.
- **Schema** — JSON-LD `BreadcrumbList` + a light `CreativeWork`/`Project`-style block, consistent with existing per-page schema usage.
- Reuse shared `Header`/`Footer` layout; match navy/orange tokens and existing `service-card` styling.

## Graceful degradation before media arrives

- `poster` falls back to the current `image` webp, so the card and hero show a valid frame even if the mp4/poster are not yet present.
- Gallery renders only if `gallery[]` is non-empty.

## Verification

- `yarn build` succeeds; new route present in build output.
- Manual: card autoplays muted/looping; reduced-motion shows still; "View Details" → new page; gallery lightbox works; no console errors; responsive at 375 / 768 / 1280.
- SEO: metadata + breadcrumb schema present; canonical resolves against dynamic base.

## Rollout

Build code now (activates when files land) → client drops media into the two folders → local preview verification → client deploys. No deploy/commit without explicit approval.
