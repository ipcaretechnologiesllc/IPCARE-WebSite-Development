# SEO Audit v2 — www.ipcare.ae (claude-seo framework)
Date: 2026-06-14
Skill: `/seo audit`

This is a follow-up synthesis pass on top of the [v1 audit](FULL-AUDIT-REPORT.md), applying the
PERCEIVE → ANALYZE → VALIDATE → ACT framework and incorporating the Phase 1/2 fixes already
shipped (commits `e85953e`, `c754f4e`).

## SEO Health Score: 82/100 (up from 76)

---

## PERCEIVE

**Observe-external (live site, post-deploy headers):**
```
X-Frame-Options: SAMEORIGIN                 ✅ shipped (was ALLOWALL)
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload  ✅ shipped
X-Content-Type-Options: nosniff             ✅ shipped
Referrer-Policy: strict-origin-when-cross-origin  ✅ shipped
Content-Security-Policy: upgrade-insecure-requests   ⚠️ see finding below
```

**Observe-internal (codebase):** `next.config.js` sets
`Content-Security-Policy: "frame-ancestors 'self'; upgrade-insecure-requests"`, but the live
response only echoes `upgrade-insecure-requests` — the `frame-ancestors 'self'` directive is
being dropped between origin and edge.

**Listen (GSC/commit history signal):** Recent commits show an active redirect-cleanup cadence
(WordPress/.php 404s, orphan pages, dead event slugs) — this is a healthy, ongoing process, not
a one-off.

---

## ANALYZE

| Finding | Severity | Evidence | Root cause |
|---|---|---|---|
| `frame-ancestors 'self'` missing from live CSP | Medium | `next.config.js:31` sets it; live header omits it | Hostinger/LiteSpeed edge appears to strip/rewrite the `frame-ancestors` CSP directive — likely a host-level WAF or header-merge rule, not an app bug |
| FAQPage schema on homepage | Info (was treated as a positive in v1) | 9 JSON-LD types incl. `FAQPage`/`Question`/`Answer` | **Policy update**: Google retired FAQ rich results for all sites on 2026-05-07. No SERP snippet benefit remains — but the markup still has value for AI Overviews/ChatGPT/Perplexity citation. Do not remove; do not add more FAQPage expecting SERP rich results. |
| No `llms.txt` | Low | `curl https://www.ipcare.ae/llms.txt` → 404 | Increasingly checked by AI crawlers for site-purpose context |
| Hero carousel image loading | Resolved | v1 found 7 images (~1.1MB) loading at once; now capped to active ± 1 (~190KB) | Fixed in `app/page.js` (commit `e85953e`) |
| Hero/services-bg image weight | Partially resolved | 170KB→33-101KB per hero image; services-bg 261KB→174KB | Further gains possible with AVIF, but diminishing returns vs. quality loss |
| 444KB shared JS chunk (`1762-*.js`, ~20+ pages) | Resolved | `@next/bundle-analyzer` showed `lib/services-data.js` (625KB) + `lib/cyber-advisory-data.js` (29KB) bundled into `Header.jsx`'s client chunk for its nav menu. Generated lightweight `lib/services-nav-data.js` (5.5KB) instead — shared First Load JS dropped from ~444KB to 87.2KB | Fixed via `scripts/gen-services-nav-data.js` + `components/site/Header.jsx` import change |

---

## VALIDATE

- **Feel**: the security-header and hero-image fixes are low-risk, already verified in preview
  and confirmed live in production — no regressions observed (200 OK, console clean).
- **Accept / falsifiability checks**:
  - CSP finding fails if a re-fetch of `https://www.ipcare.ae/` with `curl -sI` ever shows
    `frame-ancestors` in the `Content-Security-Policy` header — that would mean the host stopped
    stripping it and no further action is needed.
  - The 444KB chunk finding fails if `ANALYZE=true next build` (after installing
    `@next/bundle-analyzer`) shows it's mostly framework code that can't realistically be split
    further — in that case, deprioritize.
  - FAQPage schema finding fails if Google reinstates FAQ rich results — re-check via Rich
    Results Test periodically.

---

## ACT — Updated Action Plan

### Done (shipped, commits `e85953e` / `c754f4e`)
- [x] Hero carousel limited to active ± 1 slide (was loading all 7 mobile hero images)
- [x] Recompressed hero-mobile images and `services-bg.webp` (~40-50% smaller)
- [x] Added HSTS, X-Content-Type-Options, Referrer-Policy
- [x] Tightened X-Frame-Options (ALLOWALL → SAMEORIGIN) and CSP frame-ancestors (* → 'self')

### Next (in dependency order)
1. **Investigate CSP `frame-ancestors` stripping** (Medium) — check Hostinger hPanel for any
   "Security" / WAF module that rewrites CSP headers; if confirmed host-level, document as a
   known platform limitation rather than re-attempting in `next.config.js`.
   *Leading indicator:* `curl -sI https://www.ipcare.ae/` showing the full CSP string.
2. **Bundle-analyze the 444KB shared chunk** (High) — `npm i -D @next/bundle-analyzer`, wrap
   `next.config.js`, run `ANALYZE=true next build`, identify largest modules.
   *Depends on:* nothing; unblocks any further JS splitting work.
3. **Re-run Lighthouse on production** (High) — confirm LCP improvement from 10.8s baseline now
   that hero images are smaller and fewer load on first paint.
   *Leading indicator:* LCP < 4s would be a strong win; < 2.5s is the "Good" CWV threshold.
4. **Add `llms.txt`** (Low) — short file at site root describing IP Care's sections (services,
   rental, blog, event-it, cybersecurity-advisory) for AI crawler context.
5. **No action on FAQPage schema** (Info) — retain for AI citation value; do not expect Google
   SERP rich results per the 2026-05-07 policy change.

---

## Notes on Scope

This pass reused live-site and codebase data gathered in the v1 audit plus a verification fetch
of production headers. No Google API credentials, DataForSEO, or Firecrawl MCP were available,
so `seo-google`, `seo-dataforseo`, and `seo-firecrawl` sub-agents were not spawned. Local-SEO
sub-agents were not spawned — IP Care is a B2B enterprise IT provider with a defined service
area but no storefront/map-pack dependency in the audited pages.
