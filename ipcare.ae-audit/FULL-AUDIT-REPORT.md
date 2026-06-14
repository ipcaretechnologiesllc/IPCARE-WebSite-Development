# SEO Audit — www.ipcare.ae
Date: 2026-06-14

## SEO Health Score: 76/100

Business type: B2B Managed IT Services / Equipment Rental (multi-domain: ipcare.ae + ipcare.ca)

## Executive Summary

The site has strong on-page SEO fundamentals (titles, meta descriptions, canonicals, hreflang, schema, sitemap, redirects) — recent commits show active, disciplined SEO maintenance (301/308 redirects for legacy URLs, orphan-page fixes, sitemap pruning). The biggest gap is **page speed**: Lighthouse performance score is **0.39/1.0** with LCP at **10.8s**, driven by large unoptimized hero images and heavy JS bundles. Security headers are also unusually permissive (`X-Frame-Options: ALLOWALL`, wildcard CORS, no HSTS).

### Top 5 Critical/High Issues
1. **LCP = 10.8s, Performance score 0.39** — hero images (170KB+ webp, mobile) and 400KB+ JS chunks block render (Critical)
2. **Total Blocking Time = 1,040ms** — main-thread JS work (4.5s breakdown) delays interactivity (High)
3. **No HSTS / X-Content-Type-Options / Referrer-Policy headers** (High — security)
4. **`X-Frame-Options: ALLOWALL` + CSP `frame-ancestors *`** — clickjacking exposure, intentional in `next.config.js:30-31` but worth a security review (Medium-High)
5. **434KB unminified-looking JS chunk** (`1762-030f0643a6e31dad.js`) — 167KB of unused JS estimated by Lighthouse (High)

### Top 5 Quick Wins
1. Compress/resize hero-mobile webp images (5 images at 160-175KB each — should be <50KB for mobile hero)
2. Add `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` headers in `next.config.js`
3. Lazy-load/defer GTM (160KB) and non-critical JS chunks below the fold
4. Code-split the 434KB chunk — investigate what's bundled into `1762-*.js`
5. Re-evaluate `Access-Control-Allow-Origin: *` and `X-Frame-Options: ALLOWALL` — confirm these are still needed for the embed use case

---

## Technical SEO (Score: 88/100)

**What works:**
- `robots.txt` is clean: allows `/`, disallows `/api/`, `/admin/`, `/_next/`, `/rental/quote`, `/unsubscribe`; declares sitemap and host
- `sitemap.xml` has 174 URLs with proper `lastmod`, `changefreq`, `priority`
- Canonical tags present and correct (`<link rel="canonical" href="https://www.ipcare.ae"/>`)
- hreflang implemented correctly: `en-AE`, `en-CA` (ipcare.ca), `x-default`
- Legacy domain redirects work: `ipcare.ae` → 308 → `www.ipcare.ae`; `ipcares.com` → 301 → `www.ipcare.ae`
- 404 pages return correct HTTP 404 status with branded "Page Not Found" content
- `meta robots: index, follow` on homepage — no accidental noindex
- Server response time: 310ms (good, score 1.0)

**Findings:**
| Title | Severity | Description | Recommendation |
|---|---|---|---|
| Missing security headers | High | No `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy` headers on responses | Add these in `next.config.js` `headers()` (currently only sets X-Frame-Options, CSP, CORS) |
| Overly permissive frame/CORS policy | Medium | `X-Frame-Options: ALLOWALL`, `Content-Security-Policy: frame-ancestors *`, and `Access-Control-Allow-Origin: *` are set globally for all routes (`next.config.js:28-35`) | If this is for a specific embed/widget use case, scope it to that route only rather than `/(.*)` |
| Cache-Control: no-store on HTML | Low | Homepage HTML served with `private, no-cache, no-store, max-age=0, must-revalidate` (Next.js SSR default for dynamic routes) | Consider static generation or ISR for marketing pages that don't need per-request freshness, to improve CDN cacheability |

---

## On-Page SEO / Content (Score: 90/100)

Sampled 12 key templates — all have unique, descriptive titles and meta descriptions within good length ranges:

| Page | Title | Status |
|---|---|---|
| `/` | Enterprise IT Solutions & Managed Services \| IP Care Technologies | ✅ |
| `/about` | About IP Care \| Enterprise IT Partner, UAE & Canada | ✅ |
| `/services` | IT Services UAE: Managed IT, Cloud & Cybersecurity | ✅ |
| `/services/cybersecurity` | Cybersecurity Services UAE \| IP Care Technologies | ✅ |
| `/rental` | IT Equipment Rental UAE: Laptops, WiFi & Servers | ✅ |
| `/blog` | IT Knowledge Base & Insights: IP Care Technologies Blog | ✅ |
| `/industries` | Industry IT Solutions UAE: Healthcare, Banking & More | ✅ |
| `/event-it` | Event IT Services UAE: WiFi, Networks & On-Site Support | ✅ |
| `/cybersecurity-advisory` | Cyber Advisory UAE: Zero Trust, SASE & Security | ✅ |
| `/careers` | Careers at IP Care Technologies: Join Our Team \| UAE & Canada | ✅ |
| `/contact` | Contact IP Care Technologies \| IT Support UAE & Canada | ✅ |
| `/partners` | Technology & Channel Partners: Microsoft, HPE, Palo Alto \| IP Care | ✅ |

H1 present on homepage ("The Technology Force Behind…"). All sampled images (28 on homepage) have `alt` attributes — 0 missing.

Sitemap distribution: rental (60 URLs), services (51), blog (22), event-it (18), cybersecurity-advisory (6), industries (3) — content footprint is large and well-segmented by section.

---

## Schema / Structured Data (Score: 95/100)

Homepage contains 9 JSON-LD types in a single graph: `Organization`, `ProfessionalService`, `WebSite`, `SearchAction`, `ContactPoint`, `PostalAddress`, `GeoCoordinates`, `AdministrativeArea`, `City`, `Country`, plus `FAQPage` with `Question`/`Answer` pairs.

**Findings:**
- No errors detected in spot-check; rich `ProfessionalService` + `FAQPage` combination is well-suited for AI Overviews/AEO.
- Recommendation: validate full schema graph with Google's Rich Results Test periodically, especially after content data changes in `lib/*-data.js`.

---

## Performance / Core Web Vitals (Score: 35/100)

Lab data (Lighthouse, mobile/headless, single run):

| Metric | Value | Score |
|---|---|---|
| Performance (overall) | — | **0.39** |
| Largest Contentful Paint | **10.8 s** | 0 |
| First Contentful Paint | 5.5 s | 0.06 |
| Speed Index | 5.5 s | 0.55 |
| Time to Interactive | 11.2 s | 0.2 |
| Total Blocking Time | 1,040 ms | 0.26 |
| Cumulative Layout Shift | 0 | 1.0 |
| Server Response Time | 310 ms | 1.0 |

**Largest network payloads (homepage):**
| Size | Type | Resource |
|---|---|---|
| 434.1 KB | Script | `_next/static/chunks/1762-030f0643a6e31dad.js` |
| 261.1 KB | Image | `images/pages/services-bg.webp` |
| 212.8 KB | Script | `_next/static/chunks/6786-fb17dacdaf15a769.js` |
| 173.8 KB | Image | `images/hero-mobile/hero-m-cyber.webp` |
| 173.6 KB | Image | `images/hero-mobile/hero-m-cloud.webp` |
| 170.4 KB | Image | `images/hero-mobile/hero-m-managed-it.webp` |
| 169.3 KB | Image | `images/hero-mobile/hero-m-rental.webp` |
| 168.9 KB | Script | `_next/static/chunks/fd9d1056-0eca1df5c77ae96c.js` |
| 164.6 KB | Image | `images/hero-mobile/hero-m-eventit.webp` |
| 160.5 KB | Script | `googletagmanager.com/gtag/js?id=G-YY2Q2629E7` |

**Findings:**
- Estimated 167 KB of unused JavaScript shipped on the homepage
- Main-thread work breakdown: 4.5s; JS bootup time: 1.5s
- 5 "hero-mobile" webp images at 160-175KB each are all loading on the homepage — likely all hero variants for a carousel/rotator load at once instead of only the active one
- `services-bg.webp` at 261KB is large for a background image — should be served as a responsive/optimized variant

CLS is 0 (good) — layout stability is not an issue.

---

## AI Search Readiness / GEO (Score: 80/100)

- `FAQPage` schema on homepage is directly citable by AI Overviews/ChatGPT/Perplexity
- Clear entity definition via `Organization`/`ProfessionalService` schema with address, geo-coordinates, opening hours — strong local/E-E-A-T signal
- No `llms.txt` found at site root — not yet standard but increasingly checked by AI crawlers
- robots.txt allows all crawlers (no explicit GPTBot/ClaudeBot/PerplexityBot rules) — fine, but no explicit allow-list either

---

## Images (Score: 65/100)

- All sampled `<img>` tags have `alt` text (good for accessibility/SEO)
- Multiple hero images in the 160-260KB range — opportunity to convert to AVIF or further compress webp, and use `next/image` responsive `sizes` to avoid loading all hero variants on initial load

---

## Search Experience (SXO) Notes

- Recent commit history (`fix(seo): redirect 3 non-existent testing equipment product pages...`, `301 redirects for wrong-prefix URLs and dead event slugs from GSC 404 list`, `resolve /about and /cybersecurity-advisory/zero-trust orphan links`) shows the team is actively closing GSC-reported 404s and orphan pages — this audit found no new broken internal links in the sampled set.
- 404 page is branded and functional.

---

## Methodology Note

This audit was run without the bundled `render_page.py`/Playwright tooling (not present in this skill installation). Live checks used `curl` against production (`robots.txt`, `sitemap.xml`, headers, sampled page HTML for titles/meta/canonical/schema) and `npx lighthouse` (headless Chrome, single run, default throttling) for Core Web Vitals. Codebase cross-checks used `next.config.js`. A full 500-page crawl, multi-page Lighthouse runs, and GSC/GA4/CrUX field data were out of scope for this pass.
