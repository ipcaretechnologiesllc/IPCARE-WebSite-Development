# Knowledge Base — Premium Redesign + Real Article Pages

**Date:** 2026-07-15
**Route:** `/cybersecurity-advisory/knowledge-base` (+ new `[slug]` detail pages)
**Owner decision log:** light Cyber Advisory theme · build all 9 articles as real pages · no fabricated provenance · house byline "IP Care Cyber Advisory Team" · Approach A (self-contained KB detail template).

## Problem

1. **Theme mismatch.** The KB listing page renders in the dark `bg-premium-dark` + glassmorphism theme, while its parent `/cybersecurity-advisory` and sibling `/cybersecurity-advisory/track-record` use the light system (white `.service-card`, navy `#0B1A46`, orange `#E87722`, `#F4F6FA` backgrounds). Within its own section the KB is the odd one out.
2. **Dead article cards.** The 9 cards say "Read Article →" and are `cursor-pointer`, but link nowhere. `kbArticles` holds only `{title, category, readTime, date}` — no slug, no body. Every card is a dead end: poor for trust/premium and zero indexable content for SEO.
3. **Overclaimed provenance.** Hero copy states articles are "Written by senior architects, reviewed by peers, battle-tested in production" — not verifiable. Must be reframed honestly.

## Goals

- Rebuild the listing page in the light Cyber Advisory theme.
- Turn all 9 cards into real, technically-accurate article pages with honest authorship.
- Add SEO/schema/internal-linking so the pages are indexable and non-thin.

## Non-goals

- No change to other dark pages (blog/careers/contact/etc.) — the site's mixed theme is intentional elsewhere.
- No MDX/markdown pipeline (Approach C rejected). No reuse of blog image-hero/newsletter components (Approach B rejected).

## Design

### 1. Listing page — `app/cybersecurity-advisory/knowledge-base/KBClient.jsx`
- Page background `#F4F6FA`; remove `bg-premium-dark`, `premium-grid`, `glass-premium`.
- Hero: navy-gradient band (matching the blog/advisory article convention) OR light hero consistent with track-record — use light `#F4F6FA` hero with navy `#0B1A46` headline, orange eyebrow, `#475467` body, to match the track-record listing feel.
- Cards → shared `.service-card` (white, 3px orange top border, navy title, hover-lift). Category pill navy/orange. "Read Article" → real `<Link href={/cybersecurity-advisory/knowledge-base/${a.slug}}>` styled as `service-card__cta`.
- Keep search + category filter; restyle for light theme (visible borders, ≥4.5:1 contrast, ≥44px targets, focus rings, `cursor-pointer`).
- Rewrite hero copy honestly, e.g.: "Practical engineering guides from the IP Care Cyber Advisory practice — vendor-current, written for architects and security leads."

### 2. Data — `lib/cyber-advisory-data.js` `kbArticles`
Each article extended with:
`slug`, `excerpt`, `seoTitle`, `updatedDate`, `author: 'IP Care Cyber Advisory Team'`, `keyTakeaways: string[]`, `body: [{h2}|{p}|{cta}]` (same body model as blog for consistency), and a `related` pillar link target.
Content: genuine, accurate, architecture/decision-level guidance (design patterns, trade-offs, checklists) rather than exact CLI that could be wrong. Version-sensitive facts (Check Point R82, FortiGate SD-WAN, Prisma Access HA, XSIAM) verified against current vendor docs via Context7 where needed.

### 3. Detail route — `app/cybersecurity-advisory/knowledge-base/[slug]/page.js`
Server component mirroring `app/blog/[slug]/page.js` minus image hero / newsletter:
- `generateStaticParams` from article slugs; `dynamicParams = false`.
- `generateMetadata`: unique title (≤60), description (≤160) from excerpt, self-canonical, OG `type: article`, `publishedTime`/author.
- Layout: navy-gradient hero (title, category pill, house byline, date, read time, breadcrumb) → white body (Key Takeaways box + section body) → practice/author box → related articles (same-category first, then others, 3 total) → consultation CTA (`/#contact`).
- No hero photo, no share-to-fabricated-author. Uses `Header`, `Footer`, `CTAPhoneButtons`.

### 4. SEO / schema / discovery
- `TechArticle` + `BreadcrumbList` JSON-LD. `author`/`publisher` = Organization `IP Care Technologies L.L.C.` (honest fallback identical to blog's generic-byline path). No Person/E-E-A-T claims.
- Sitemap: auto-registers via existing `kbArticles` loop in `app/sitemap.js:163` once slugs exist — no code change required. Verify output.
- `llms.txt`: add the KB hub and 2–3 flagship article URLs.
- Internal links: each article links to its relevant advisory pillar (`/cybersecurity-advisory/{zero-trust|sase|cloud-security|security-automation}`) and to `track-record`; listing links back to hub. Removes orphan/thin-content risk.

## Verification
- `yarn build` succeeds; new static params generate 9 pages.
- Manual: listing renders light theme; every card links to a live article; unknown slug 404s.
- Manual SEO: unique titles/descriptions, self-canonical, one H1/page, breadcrumb + TechArticle JSON-LD valid.
- Sitemap includes 9 new URLs; no dead links.
- Contrast/tap-target/focus review (ui-ux-pro-max §1–2).

## Risks
- Content accuracy on version-specific vendor claims → mitigate with Context7 + principle-level guidance.
- Scope (9 full articles) → curated, consistent body model keeps each focused.
