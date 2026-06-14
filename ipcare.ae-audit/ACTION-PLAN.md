# Action Plan — www.ipcare.ae SEO Audit

## Phase 1: Critical Fixes (Week 1)
- [ ] Investigate the 5 `hero-mobile/hero-m-*.webp` images (160-175KB each, all loading on homepage) — load only the active hero variant; lazy-load the rest
- [ ] Compress `images/pages/services-bg.webp` (261KB) and serve responsive sizes via `next/image`
- [ ] Profile and code-split `_next/static/chunks/1762-030f0643a6e31dad.js` (434KB, ~167KB unused) — identify what's bundled and defer non-critical parts

## Phase 2: High-Impact Improvements (Weeks 2-3)
- [x] Add missing security headers in `next.config.js`: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- [x] Tighten `X-Frame-Options: ALLOWALL` → `SAMEORIGIN` and CSP `frame-ancestors *` → `'self'` (leftover template default, no embed use case identified)
- [ ] `Access-Control-Allow-Origin: *` left as-is — likely intentional for the multi-domain setup (`ipcare.ae` / `ipcare.ca` / API). Revisit if/when API auth is added.
- [ ] Identify contents of the 444KB shared chunk (`1762-*.js`, used on ~20+ pages) — install `@next/bundle-analyzer` and run `ANALYZE=true next build` to get a breakdown before attempting any code-splitting
- [ ] Defer/lazy-load Google Tag Manager script (160.5KB) — already uses `strategy="afterInteractive"` (best practice); no further action needed unless TBT remains high after other fixes
- [ ] Reduce Total Blocking Time (1,040ms) — re-measure after Phase 1 image/hero fixes before further main-thread work

## Phase 3: Content & Authority (Month 2)
- [ ] Validate full JSON-LD schema graph (9 types) with Rich Results Test after any `lib/*-data.js` content changes
- [ ] Add `llms.txt` at site root describing site purpose/sections for AI crawlers
- [ ] Continue closing GSC 404/orphan reports (active cadence observed in recent commits — keep it up)

## Phase 4: Monitoring & Iteration (Ongoing)
- [ ] Re-run Lighthouse after Phase 1 fixes to confirm LCP drops from 10.8s toward <2.5s target
- [ ] Set up CrUX/PageSpeed Insights monitoring for field data (lab data only used in this audit)
- [ ] Periodic sitemap audit as rental/blog/event-it content grows (currently 174 URLs)
