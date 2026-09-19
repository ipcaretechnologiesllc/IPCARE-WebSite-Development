# Narrative Case Studies — Design

**Date:** 2026-09-19
**Status:** Implemented, pending commit
**First instance:** Session hijacking / infostealer incident response
**Source material:** `D:\ICT\ICT Propossals\Proposals\S Clinic UAE\Meta Account Compromise Assessment`

## Problem

IP Care had a finished, publication-ready cybersecurity case study (a drop-in HTML file plus two PDFs) with nowhere on the site to put it.

`/portfolio` was the obvious home and the wrong one. That hub is scoped to enterprise facilities, ELV/security, structured cabling, fiber and network infrastructure, and its `app/portfolio/[slug]` template is built around the artefacts those projects produce: a poster image, a client logo, `workBreakdown` photo groups, `techStack` quantity tables, a `handover` package. An incident-response engagement produces none of those. It is described by what happened and in what order.

Publishing it into `/portfolio` would have meant either diluting the delivery-proof hub or bolting a second, contradictory shape onto a template that has one job.

## Decisions

Four content decisions were made by the user before any code was written. They are constraints, not preferences.

| Decision | Choice | Consequence |
|---|---|---|
| Client identification | Anonymized and generalized to "a UAE SME" | No sector, no emirate. Sector + emirate + ad-spend together would identify them in this market. |
| Money figures | Removed entirely | No AED total, no AED 75 → 44,444 daily budget. Escalation described as "raised by several hundred times". |
| Dates | Relative days | Day 0 / Weeks 1–4 / Day 26 / Day 33 / Day 39 / Day 58 / Days 61–64. No calendar date appears. |
| Placement | Under the parent service page | `/services/cybersecurity/incident-response/case-study-session-theft` |

**These are enforced by test, not by memory.** A DOM-level grep for `AED`, `10,951`, `44,444`, `dermatolog`, `clinic`, `aesthetic`, `AMOS` and every calendar date must return zero hits on the rendered page. Re-run it after any content edit.

The tradeoff is understood and accepted: fully anonymized with no figures is close to the floor of what still reads as a case study. What remains is the attack mechanism and IP Care's method — useful, and well targeted at "how did they get in without my password" search intent — but it is no longer social proof of *who* trusts IP Care. The data module is shaped so that naming the client later is a content edit, not a rebuild.

## Architecture

```
lib/case-studies-data.js          ← content + routing + helpers (single source of truth)
        │
        ├─→ app/services/[category]/[slug]/[study]/page.js   ← the page (metadata + schema)
        │        └─→ components/site/CaseStudyNarrative.jsx  ← presentation
        │
        ├─→ app/services/[category]/[slug]/page.js  ─┐
        ├─→ app/services/[category]/page.js         ─┤→ ServicePageTemplate §7.6 proof block
        │
        ├─→ app/case-studies/page.js                ← master index (links out only)
        └─→ app/sitemap.js                          ← discovery
```

### The fourth level under `/services`

`app/services/[category]/[slug]/[study]/page.js` is a **new fourth route level that exists only for these case studies**. Nothing else in the repo hints that this depth exists.

It is safe because `dynamicParams = false` and `generateStaticParams()` returns only `getNarrativeCaseStudyParams()`. The data module's whitelist *is* the entire route space. Verified: `/services/cybersecurity/incident-response/not-a-study` and `/services/cloud/microsoft-365/anything` both 404.

This placement is the weakest part of the design and it is structural, not fixable in copy. A 54-character, four-segment URL inherits authority from its parent but indexes slowly on its own, and the next case study in a different discipline lands under a different service branch. `/case-studies` is what compensates — it gives every study a second, shallower internal path.

### Adding the next case study

One data entry in `lib/case-studies-data.js`. Nothing else. Both service routes call `getCaseStudiesForCategory()` / `getCaseStudiesForSubpage()` and spread a `caseStudies` array onto `ServicePageTemplate`, which renders an opt-in proof block. Subpages with no case studies render exactly as before.

`parent` must name a real subpage in `lib/services-data.js` or the breadcrumb will lie.

### `/case-studies` is a directory, not a second portfolio

It lists every case study — cybersecurity, `/portfolio/*`, `/event-it/*` — and **links out to each one where it already lives**. It duplicates no content. Keeping it a directory is what stops it competing with `/portfolio` for the same queries.

Only `fifa-club-world-cup` has a built `/event-it/[slug]` route, so that entry is gated on `getEventSubpage()`. Listing a slug without a page would put a 404 in the index.

### SEO

- **Canonical inheritance.** `lib/seo-region.js` `isUaeOnlyPath()` handles 4-segment service paths so a case study inherits its parent's UAE-only treatment. `/services/cybersecurity/incident-response` is on that list, so its children cross-canonicalize to ipcare.ae and stay out of the ipcare.ca sitemap. **Keep the 3- and 4-segment branches in sync.**
- **Headline split.** Editorial H1 (`Stolen in a session, not in a password`), keyword-led `<title>` (`Session Hijacking Incident Response Case Study | IP Care UAE`). Memorable on-page, findable in search.
- **Schema.** `TechArticle` + `BreadcrumbList` + `FAQPage` on the study; `CollectionPage` + `ItemList` + `BreadcrumbList` on the index. `author` and `publisher` reference the layout's Organization node by `@id` rather than declaring a second one — see the note below.
- **FAQ separation.** The study's three FAQs must stay distinct from the parent Incident Response page's five. Both emit `FAQPage`; overlapping questions would compete for the same result.

#### The `#org` anchor

`app/layout.js` anchors the site-wide Organization to a **hardcoded** `https://www.ipcare.ae#org` (its `BRAND_URL`), not to a host-derived base. Both new files reference that literal string.

Existing pages use `` `${BASE}#org` ``, which resolves correctly only because `BASE` defaults to — and `.env.local.example` sets — the same value. If `NEXT_PUBLIC_BASE_URL` were ever pointed elsewhere, those references would dangle while these two would not. Pre-existing, out of scope to fix site-wide, worth knowing.

## Brand

Reviewed against the IP Care Brand Rules in `CLAUDE.md`.

An anonymized SME story sits in tension with "premium, enterprise-level brand image" and "build trust for GCC enterprise clients". That tension was accepted with the anonymization decision. It is mitigated, not removed, by carrying the credibility the client name cannot:

- The closing CTA cites **15+ years of cybersecurity practice** — the site's existing claim (`app/HomeClient.js:780`), not a new one.
- Related services include **Managed IT Services**, bridging the SME incident back to the enterprise offering rather than keeping all four links inside cybersecurity.
- `/case-studies` carries a credibility band reusing `portfolioStats` (20+ years, 500+ projects, 200+ clients, 24/7) rather than restating the numbers.

Voice was checked against "avoid cheap, generic, low-end or repair-shop style language" and passes — "rebuilt the endpoint", not "fixed the laptop". The **"What we told the client honestly"** panel is the page's strongest brand asset: it is what a prospect checks for before trusting a forensics vendor. Keep it.

## Design system

The site has a pre-existing token inconsistency: `app/globals.css` defines `--brand-orange` / `--brand-navy`, but `ServicePageTemplate.jsx` and other components hardcode the same hex values as module constants. `CaseStudyNarrative.jsx` follows the dominant component pattern (hex constants) rather than being the lone CSS-var outlier. Unifying this is a separate job.

Two conformance gaps were found and fixed:

- H2 was `clamp(1.6rem, 3vw, 2.25rem)` against the site's `2.4rem`, rendering every heading smaller than the rest of the site.
- The site's `SectionHeading` puts a 56×3px orange bar under every H2. `CaseStudyNarrative` had none — while `app/case-studies/page.js` did, so the two new pages disagreed with each other as well as with the template.

The §7.6 proof block uses `BG_GREY`, not `BG_WHITE`: section 8 (Related Services) is white, and two adjacent white sections merge into one undifferentiated block and break the template's alternation.

## Assets

`public/images/case-studies/session-theft-og.jpg` — 1200×630, generated with `sharp` from the same navy-gradient + node-graph + orange-slice motif as the hero. No stock photography: there is no photographable artefact in a forensic engagement, and a stock "hacker in a hoodie" would undercut the page's credibility.

## Explicitly not published

**No PDF download.** The source 4-page PDF is footer-stamped *"Confidential case study"* on every page and must not be published. The 1-page version is unstamped but the download was dropped entirely — the web page carries the full story and there is nothing to leak.

`SClinic_Security_Incident_Review_IPCARE.pdf` and the `v1.4` proposal `.docx` are internal client deliverables. Neither is publishable in any form.

## Verification

| Check | Result |
|---|---|
| `npm run build` | 258/258 pages (was 256) |
| Redaction grep on rendered DOM | 0 hits across all banned terms |
| Route guard — arbitrary 4th-level URLs | 404 |
| Links on `/case-studies` | 8/8 return 200 |
| Schema `@id` resolution | `author`/`publisher` resolve to the real Organization node |
| `FAQPage` count on study page | exactly 1 |
| Responsive at 375px | no horizontal overflow; attack-chain table scrolls in its own wrapper |
| Console | clean |

Use `npm run build`, not `yarn` — yarn may not be on PATH. **Do not run `next build` while the dev server is running**; both write `.next` and the race produces spurious "Failed to collect page data" errors.

## Open

- Client consent is for anonymized publication. If they later agree to be named, it is a content edit in `lib/case-studies-data.js` plus a logo asset.
- On ipcare.ca, `/case-studies` would list a link that cross-canonicalizes to .ae. Correct but slightly wasteful; harmless while .ca is inactive, revisit if it is reactivated.
- `FAQPage` no longer produces rich results for non-government/health sites, but is retained for AI/LLM parsing and site-wide consistency.
