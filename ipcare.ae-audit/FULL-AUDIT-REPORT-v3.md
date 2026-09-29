# SEO Audit v3: www.ipcare.ae
Date: 2026-09-29
Previous audits: [v1](FULL-AUDIT-REPORT.md) and [v2](FULL-AUDIT-REPORT-v2.md), both 2026-06-14

## Summary

**Health score: 83/100** (June: 82). The scores aren't directly comparable: June's score was weighed down by a 10.8s LCP, and this time speed could only be partly measured (see "Limits of this audit").

The site is technically clean. All 242 sitemap URLs return 200 with a self-referencing canonical, nothing is accidentally noindexed, no titles or descriptions are missing or duplicated, every page has exactly one H1, and every image has alt text. Every legacy host and URL redirects in one hop. What holds rankings back now is **content depth on rental product pages** and **authority on head terms** (managed IT, cloud and cybersecurity rank on pages 4–9). Neither is a technical fault.

**Search Console (sc-domain:ipcare.ae):**

| Period | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 3 months to 2026-07-23 (July baseline) | 200 | 17,441 | 1.1% | — |
| 2026-06-29 → 2026-09-27 (90 days) | 334 | 29,594 | 1.1% | — |
| 2026-08-02 → 08-29 | 131 | 11,269 | 1.16% | 27.1 |
| 2026-08-30 → 09-26 | 122 | 8,764 | 1.39% | 24.9 |

UAE only, same two 28-day periods: clicks **75 → 82**, impressions 7,596 → 5,920, position **30.9 → 28.6**. UAE clicks rose while impressions fell, which means fewer appearances for irrelevant, low-position searches, not lost visibility. Canadian clicks fell 16 → 5, which is expected after the 2026-09-23 UAE-focus round. 80% of query-level impressions are now from the UAE.

The UAE-focus changes (2026-09-23) and today's schema fixes are too recent to show in this data. Most sampled pages were last crawled 9–25 September. The scheduled re-check on 2026-10-07 covers the city pages.

### Top priorities
1. **Mac and iPad rental cluster is on page 2 in the UAE.** 1,000+ UAE impressions, zero clicks. This is the closest real win (details under Content).
2. **Rental product pages are thin:** 54 pages at a median of 409 words, largely shared template text.
3. **Internal links go through redirects** on 24 pages, all from one template default. It's a one-line fix.
4. **`/partners` is orphaned:** nothing on the site links to it.
5. **Long titles and descriptions:** 33 titles over 70 characters and 71 descriptions over 160.

### Search data that looks like an opportunity but isn't
The automated "quick win" and "low CTR" reports flagged several items that are **not UAE demand**, so don't act on them:
- `smiths detection rental`: position 2, 394 impressions, 0 clicks. **All from the USA**; searchers want the manufacturer.
- `afl m210` / `afl m210 otdr`: position 7, ~215 impressions. **Norway.**
- `sase rfp`: 273 impressions. USA and Europe, informational.
- `ip care` brand query at position 5: impressions come from India, USA, Peru and Indonesia, where other "IP Care" companies exist. The UAE brand query `ip care technologies l.l.c` sits at position 2.7 with a 16% CTR, so the brand is fine where it matters.

---

## What changed since June

| June finding | Status now |
|---|---|
| LCP 10.8s, performance 0.39 | Not re-measured (see limits). Page weight is now 130–160 KB JS and 12–48 KB images on first load; June had a 434 KB chunk alone. |
| 434 KB shared JS chunk | Fixed (services-data split out of Header; framer-motion removed) |
| Every page server-rendered on each request | Fixed 2026-09-23: pages are static/ISR; server response 150–280 ms |
| Missing HSTS / nosniff / Referrer-Policy | Fixed |
| X-Frame-Options ALLOWALL, wildcard CORS | Fixed |
| No llms.txt | Fixed: live, 7 sections, 41 links, lints green |
| Hero images loading all at once | Fixed |
| Legacy non-www / http URLs indexed separately | Mostly resolved. Every variant 301s in one hop (apex at the Cloudflare edge since 2026-09-24). `http://www.ipcare.ae/` still collected 696 impressions / 27 clicks in 90 days; Google now reports it as "Page with redirect", so it is consolidating. |
| Schema (June: "no errors in spot-check") | Relative image URLs and unlinked Organization nodes fixed today (commit `09a9357`) |

---

## Technical SEO (95/100)

**Passing:** robots.txt (allows all, blocks /api, /admin, /cdn-cgi, /rental/quote, /unsubscribe, declares sitemap); sitemap 242 URLs, all 200, 0 errors in GSC; 242/242 canonical = own URL; no noindex in sitemap; `html lang="en-AE"`; hreflang `en-AE` + `x-default` on 206 pages and none on the 36 UAE-only paths (by design, see `lib/seo-region.js`); Toronto pages noindexed and out of the sitemap; HTTPS everywhere; legacy `.php` URLs and `ipcares.com` redirect in one hop; Google's sampled canonicals match ours.

| Issue | Impact | Evidence | Fix | Priority |
|---|---|---|---|---|
| Internal links through 308 redirects | Medium | 3 Event IT "related" links on 19 pages point to `/services/event-it/*`; 5 cyber-advisory links on 4 pages point to `/services/cybersecurity-advisory/*`; homepage links `/event-it/uae-national-day-48th` and `-49th` | `ServicePageTemplate.jsx:787` builds `/services/${r.slug}` when no `href` is passed. Pass `href` from `app/event-it/[slug]/page.js` and the 5 cyber-advisory pages; point the homepage links at `/event-it/uae-national-day` | High (quick) |
| `/partners` has no internal links | Medium | Crawl found 0 links to it; code search confirms it is only in `sitemap.js` and `llms.txt` | Link it from the footer and the About page | High (quick) |
| `/cookie-policy` linked only from the client-side cookie banner | Low | Crawlers don't see the banner | Add to the footer legal links next to Terms and Privacy | Low |
| Old sitemap `https://ipcare.ae/sitemap.xml` still submitted in GSC | Low | GSC sitemaps list (submitted 2026-07-23) | Remove it in Search Console → Sitemaps (the audit account is read-only) | Low |

GSC's "indexed: 0" on the sitemap is not an issue: the Sitemaps API no longer reports indexed counts. Every URL sampled with URL Inspection was "Submitted and indexed".

## On-page SEO (82/100)

No missing or duplicate titles or meta descriptions across 242 pages; exactly one H1 on every page; 0 images without alt.

| Issue | Impact | Evidence | Fix | Priority |
|---|---|---|---|---|
| Titles over 70 characters | Medium | 33 pages, mostly Event IT case studies and blog posts. Worst: `/event-it/portfolio` (104), `/blog/cb-ibr-cloud-azure-uae-north` (96), `/blog/why-vendor-continuity-wins-event-it` and `/blog/league-standards-vs-improvised-builds` (89) | Trim to ≤60 with the key term first. Blog titles can use `seoTitle` in `lib/blog-data.js` | Medium |
| Meta descriptions over 160 characters | Low | 71 pages; `/event-it/portfolio` is 373, `/event-it/uae-national-day` 250, `/event-it/coldplay-world-tour` 232, `/rental/testing-equipment` 222 | Trim to 140–155 | Low |
| `/services/it-consulting/dubai` title is 29 characters | Low | "IT Consulting Dubai \| IP Care" | Add a qualifier, e.g. "IT Consulting Services in Dubai \| IP Care" | Low |

## Content (70/100)

Word counts in `<main>`, excluding navigation:

| Page type | Pages | Median words | Range |
|---|---|---|---|
| Rental product | 54 | 409 | 383–643 |
| Rental category | 10 | 891 | 153–1,255 |
| Service category | 12 | 1,030 | 289–1,674 |
| Service subpage | 50 | 895 | 604–1,820 |
| Service city page | 22 | 1,117 | 993–1,730 |
| Event IT | 22 | 2,219 | 512–3,238 |
| Blog | 32 | 1,471 | 487–3,106 |
| Cyber advisory | 17 | 630 | 434–1,270 |

**Findings:**

1. **Mac and iPad rental: page 2 in the UAE, zero clicks (High).** All UAE searches, 90 days:
   - `rent macbook pro abu dhabi` 274 impressions, position 24
   - `rent mac pro` 236, position 13
   - `rent macbook pro` 161, position 11
   - `mac pro rental` 149, position 15
   - `ipad pro rental` 110, position 16
   - `rent ipad pro` 97, position 17

   `/rental/macbooks` (1,255 words) already earns 37 clicks at position 11 overall, so the demand and relevance are proven; it needs to move from 11–15 into the top 5. Actions:
   - Deepen `/rental/tablets-ipads/ipad-pro-13-m4` (699 impressions, 555 words).
   - Give the iMac a page under `/rental/macbooks`, or cross-list it there. iMac queries (`imac rental dubai` 138, `imac rent dubai` 111) land on the Mac category page, not on the iMac product page, which sits under laptops and ranks 20–40.
   - Add internal links from the blog (`laptop-rental-vs-buy`, `ipad-kiosk-deployment-playbook`) to these pages with Mac/iPad anchor text.
2. **Rental product pages are thin (High).** 54 pages at a median of 409 words, largely the shared template (FAQ, rates, delivery). Start with the product pages that already have impressions: `ipad-pro-13-m4` (699), `fiber-splicing-machine` (930), `fluke-dsx-5000` (804), `ipad-air-11-m3` (353), `apple-imac-24-m4` (285). Add use cases, what's in the box, compatible accessories, and a "typical event deployment" paragraph. The testing-equipment pages convert best on the site (`/rental/testing-equipment` 5.1% CTR).
3. **Laptop category is stuck at positions 22–40 (Medium).** `/rental/laptops-desktops` had 2,926 impressions and 8 clicks: `laptop rental dubai` position 40, `laptop rental` 22, `rent a laptop` 28. The page has 865 words. Compare with the Mac page, which is the model to follow.
4. **Thin hub pages (Low):** `/rental` 379 words, `/services` 386, `/industries` 304, `/rental/bundles` 153, `/products` 43. Hubs don't need long copy, but 150–250 words of intro, with links out, helps them rank for the category term (`/rental` sits at position 49).

## Authority and head terms (50/100)

Service category pages rank on pages 4–9 for their main terms, all UAE:
- `managed it services uae`: position 47
- `cloud managed services uae`: 59
- `cloud migration services uae`: 73
- `cybersecurity services dubai`: 76
- `elv system`: 59

`/services/cybersecurity/dubai` collected 1,318 impressions at an average position of 80. These pages are 1,000–1,700 words and technically sound, so this is an authority gap (links, citations, Google Business Profile reviews) rather than on-page work. It is also why the 2026-09-23 round added internal links and local-proof blocks. Off-site levers (backlinks, GBP reviews and posts, UAE directory citations) are the owner's to action.

## Schema (95/100)

Every crawled page has JSON-LD. URL Inspection shows Product snippets and Breadcrumbs **passing** on rental pages. The "missing review / aggregateRating" warnings are optional fields; don't add ratings that aren't real. Today's fixes (absolute image URLs, one linked Organization, Canada only on a .ca build) are live and verified.

## AI search readiness (90/100)

- `llms.txt` is live and lints green. Consider adding the two best-performing rental categories (`/rental/macbooks`, `/rental/testing-equipment`), which aren't listed individually.
- All 16 AI crawlers checked (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others) are allowed.
- FAQPage markup on service, rental and Event IT pages is generated from the visible FAQs.

## Performance (not scored)

Measured in a real browser at 375 px on 2026-09-29, first load:

| Page | Server response | JS | Images | Requests |
|---|---|---|---|---|
| `/` | 145 ms | 152 KB | 45 KB | 23 |
| `/rental/macbooks` | 276 ms | 135 KB | 12 KB | 21 |
| `/services/managed-it/dubai` | 186 ms | 161 KB | 48 KB | 24 |
| `/blog/zero-trust-practical-guide` | 189 ms | 132 KB | 12 KB | 20 |

Crawl of all 242 pages through Cloudflare: median response 456 ms, 90th percentile 781 ms. The crawl ran right after a cache purge, so 237 of 242 were cache misses; cached responses will be faster.

---

## Action plan

**Critical:** none. Nothing is blocking crawling or indexing.

**High impact, small effort (code)**
1. Fix the redirecting "related" links: pass `href` for Event IT and cyber-advisory related items, and correct the 2 homepage National Day links.
2. Link `/partners` (footer and About) and `/cookie-policy` (footer).
3. Trim the 33 titles over 70 characters, starting with `/event-it/portfolio` and the blog posts.

**High impact, content**
4. Mac/iPad cluster: deepen the iPad Pro product page, give the iMac a place under `/rental/macbooks`, and add blog links with Mac/iPad anchor text.
5. Expand the 5 rental product pages that already get impressions (listed above) with unique copy.
6. Bring `/rental/laptops-desktops` up to the depth and structure of `/rental/macbooks`.

**Quick admin (Search Console UI)**
7. Remove the old `https://ipcare.ae/sitemap.xml` submission.

**Longer term (owner)**
8. Authority for head terms: backlinks from UAE industry sites and partners (Palo Alto, Fortinet, HPE partner directories), GBP reviews and posts, event-organiser credits linking to the Event IT case studies.
9. Arabic versions of the core service and city pages (still not started).

**Re-check:** the scheduled 2026-10-07 task (city-page indexing), then a full Search Console comparison in early November, when the 2026-09-23 changes and today's schema fixes have been recrawled.

---

## Limits of this audit

- **Speed (LCP/INP/CLS) wasn't measured.** The PageSpeed API's shared daily quota was exhausted, CrUX needs an API key (`CRUX_API_KEY`), and Lighthouse isn't installed locally. Installing it with `npx lighthouse` needs approval under the project rules. The in-app browser ran in the background, so it didn't record paint timings.
- **No GA4 data.** The Google Analytics Admin API is disabled on the service account's Cloud project (30091416909), so GSC-vs-GA4 checks and engagement data are missing.
- **No Index Coverage report.** The API doesn't expose it; URL Inspection was used on a sample of 6 URLs instead.
- **No backlink or search-volume data** (no Ahrefs/Semrush connection).

## Method

- **Live crawl:** a read-only Node crawler fetched all 242 sitemap URLs plus 22 internal link targets outside the sitemap, recording status, canonical, robots, title, description, H1, `<main>` word count, internal links, alt text, hreflang and JSON-LD.
- **Search Console:** google-seo-mcp (site snapshot, page, query, page×query, query×country, quick wins, CTR gaps, cannibalization, URL Inspection on 6 URLs, sitemaps).
- **Redirects:** chain check on 12 legacy URLs.
- **AI readiness:** AI-crawler robots audit and llms.txt lint.
- **Page weight:** in-app browser at 375 px.
- **Code:** targeted checks in the repo to confirm root causes.
