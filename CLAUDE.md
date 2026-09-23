# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing/corporate website for **IP Care Technologies** (managed IT, cybersecurity, cloud, ELV, event IT, delivery portfolio, and equipment rental), built with Next.js 15 (App Router, JS not TS), Tailwind CSS, and shadcn/ui (Radix) components.

## Commands

- `yarn dev` — start dev server on `0.0.0.0:3000` (with increased Node memory; watcher polls every 2s — see `next.config.js`)
- `yarn dev:no-reload` / `yarn dev:webpack` — alternate dev server invocations without the memory flag
- `yarn build` — production build (`output: 'standalone'`)
- `yarn start` — run the production build

- Windows preview fallback used successfully in Codex: `node node_modules/next/dist/bin/next dev --hostname 0.0.0.0 --port 3010` from the repo root, preferably in a visible terminal so the process stays alive.

There is no lint/test script configured in `package.json`. `tests/` and `test_reports/` only contain placeholder files.

**`yarn` may not be on PATH on the Windows dev machine.** `npm run build` runs the identical `prebuild` + `build` scripts and does not touch `yarn.lock`.

## Deployment

**As of 2026-09-10, the website is live only on `ipcare.ae`.** `ipcare.ca` is not an active production deployment right now — do not check it, curl it, or treat it as a second live domain when verifying a deploy. Everything below that references `ipcare.ca` is historical/dual-domain context kept for when (if) it comes back; treat `ipcare.ae` as the only real target until told otherwise.

**Pushing to `main` auto-deploys to production.** Hostinger's GitHub integration is configured on Hostinger's side — there is no `.github/workflows/`, no `vercel.json`, and no deploy script in this repo, so *nothing in the codebase reveals that a pipeline exists*. Do not conclude from their absence that a push won't deploy.

`origin` still has two push URLs left over from when both domains were live, so a single `git push origin main` still reaches both remotes — historically **`ipcare.ae` and `ipcare.ca` were two separate Hostinger accounts**, each independently cloning and building the same codebase from its own remote. There is no Vercel involved anywhere in production (verified 2026-08-08 directly against Cloudflare DNS for both zones — no `vercel-dns.com`/`*.vercel.app` entries on either). There are no feature branches; work goes directly to `main`.

Allow **5–10 minutes** after pushing before verifying — a check immediately after `git push` will still show the old build. `www.ipcare.ae` is served by Hostinger (the apex host redirects at the platform level, before the Next.js app runs). See "Hosting & DNS topology" below for the DNS path.

**A site-wide `HTTP 503 "Service Unavailable — the server is temporarily busy"` shortly after a push is normal, not a code fault.** Applying a build on Hostinger requires **stopping and restarting the Node process**, and during that restart the origin serves 503 across *every* route (confirmed: `/`, `/rental`, `/api/health` all 503 at once). If the 503 is site-wide it is the restart window — wait and re-check. A 503 on one route while others serve 200 would be different and worth investigating. Do not interpret the restart 503 as a broken deploy or start rolling anything back; the local `next build` passing 256/256 is the signal the code is fine.

Three caching layers can each serve stale content after a deploy — check all three before suspecting the code:
1. **Cloudflare edge** — sits in front of Hostinger and has been observed caching HTML despite `no-store` from the origin. Fix: "Purge Everything" in the Cloudflare dashboard.
2. **Next.js ISR at the origin** — most routes export `revalidate = 3600`, and the Hostinger redeploy does not appear to clear `.next/cache`. A page can serve pre-deploy HTML for up to an hour until a request triggers background regeneration. A `?cb=1` query string bypasses this and is a useful diagnostic: fresh-with-query + stale-without-query means ISR staleness, not a bug.
3. **Stale-while-revalidate** — the first request after a stale window returns stale and only the *next* one is fresh. Always verify twice.

## Architecture

### Hosting & DNS topology

**Currently live on `ipcare.ae` only** (as of 2026-09-10) — `ipcare.ca` is not an active production target; do not verify against it. Historically these were **two independent Hostinger accounts, not one shared deployment**, each auto-deploying the same codebase from its own git remote (see Deployment above), and that historical detail is kept below in case `.ca` is reactivated. There is no Vercel anywhere in production; both zones sit behind **Cloudflare** (proxied/orange-cloud) in front of Hostinger, confirmed directly against each zone's DNS records on 2026-08-08.

The two zones use different DNS strategies at Hostinger, which is normal but worth knowing when debugging either one:
- **`ipcare.ae`** — raw `A` records. Main site (`ipcare.ae`, `www.ipcare.ae`, `docvault.ipcare.ae`) → `45.13.255.161`, proxied. A separate cluster of service subdomains (`cpanel`, `mail`, `webmail`, `webdisk`, `whm`, `autoconfig`, `autodiscover`) → `50.116.93.239`, deliberately **DNS-only (unproxied)** because mail clients and cPanel are accessed directly against those hostnames — do not recommend proxying them, it would break those connections. `ftp.ipcare.ae` was a DNS-only CNAME to `ipcare.ae` itself, which Cloudflare flagged as leaking the real origin IP behind the proxied A record — now proxied (2026-08-08) since FTP on this host is confirmed unused. If FTP connectivity ever needs to work here again, un-proxy it first (Cloudflare's proxy doesn't tunnel raw FTP on Free/Pro plans).
- **`ipcare.ca`** — CNAME-flattened to Hostinger's managed CDN: `ipcare.ca` and `www.ipcare.ca` both → `*.cdn.hstgr.net`, proxied. Mail is fully on Hostinger's own mail service (`mx1`/`mx2.hostinger.com`, `hostingermail-*` DKIM) rather than self-hosted — a cleaner, more managed setup than `.ae`'s.
- `docpilot.ipcare.ae` CNAMEs to `docpilot-frontend-*.onrender.com` — a **separate product (Render-hosted)**, unrelated to this repo beyond the `/products/docpilot` marketing page.
- `ipcare.ae` layers two mail-sending services in DNS (Brevo DKIM + Resend DKIM) alongside cPanel's own mail; only Resend (`lib/server/resend.js`) is used by this codebase — Brevo is a separate/legacy tool, not called from app code.

### Multi-domain canonicalization

The same codebase runs on both Hostinger accounts. Since each account builds its own copy, the serving domain is fixed **at build time** by `NEXT_PUBLIC_BASE_URL` (`SITE_URL` in `lib/seo-region.js`; unset = `https://www.ipcare.ae`). **If `ipcare.ca` is reactivated, set `NEXT_PUBLIC_BASE_URL=https://www.ipcare.ca` on that Hostinger account** or it will canonicalize to `.ae`. Three layers work together:

- `next.config.js` `redirects()` — host-based 308 redirects for legacy domains (`ipcare.ae`, `ipcares.com` → `www.ipcare.ae`), plus a large block of permanent redirects mapping legacy `.php`/`.html`/WordPress URLs to current routes.
- `app/layout.js` static `metadata` — `metadataBase: new URL(SITE_URL)`. Child pages use **relative** `alternates.canonical`, which resolves against this base — so child pages never need host-specific logic. `isCaSite()` (also build-time) drives the UAE-only cross-canonicals on `.ca`.
- `components/site/HreflangLinks.jsx` — Client Component in the root layout `<head>` that emits per-path hreflang (`en-AE`, `en-CA`, `x-default`) from `usePathname()`; it resolves during static prerendering, so the tags are in the server HTML.

**Never call `headers()`/`cookies()` in the root layout, a page, or `generateMetadata`.** Until 2026-09-23 the layout read `headers()` for the Host and a middleware-injected `x-pathname`; that opted every route out of static rendering, so all ~256 pages were server-rendered per request (2–7s TTFB on Hostinger on a Cloudflare miss) and every `revalidate = 3600` was dead. `middleware.js` was deleted with that change. `robots.js`, `sitemap.js` and `llms.txt` still read the Host — they are separate dynamic routes and don't affect pages. After any layout/metadata change, check `next build` output still shows pages as `○`/`●`, not `ƒ`.

When adding new routes or changing URL structure, add a corresponding entry to `redirects()` in `next.config.js` if an old URL needs to map to it.

### Content data modules (`lib/*-data.js`)

Portfolio content now lives in `lib/portfolio-data.js`. The unified `/portfolio` delivery proof page is for enterprise facilities, ELV/security, structured cabling, fiber and network infrastructure projects only. Major event case studies stay in the dedicated Event IT section. Keep exact project spellings, years, and photos under content QA when source material is incomplete.

Most page content (rental products/categories, services, industries, blog posts, careers, partners, cyber-advisory, event-it) lives in plain JS data files under `lib/` rather than a CMS or database — e.g. `lib/rental-data.js` exports `rentalCategories`, each with `products` built via a `P(...)` factory (slug, brand, model, specs, fullSpecs, rates, image). Dynamic routes like `app/rental/[category]/page.js`, `app/services/[category]/page.js`, `app/industries/[slug]/page.js`, `app/blog/[slug]/page.js`, `app/cybersecurity-advisory/[slug]/page.js`, `app/event-it/[slug]/page.js` read from these data modules to generate static params and metadata.

### Single catch-all API route

All backend logic lives in `app/api/[[...path]]/route.js` (Node runtime, `dynamic = 'force-dynamic'`). It handles:

- `GET /api/health`, `GET /api/rental/quotes` (reads `leads` collection from MongoDB)
- `POST` for contact form, rental quote requests, careers applications (multipart with PDF CV upload + magic-byte validation), and newsletter signup

**Security invariants for this route — do not regress these** (all were live vulnerabilities fixed in commit `93583cc`):

- **`GET /api/rental/quotes` requires `Authorization: Bearer $ADMIN_API_TOKEN`** and returns 404 when the token is wrong *or when `ADMIN_API_TOKEN` is unset*. It reads customer names, companies and email addresses, so it must fail closed. `ADMIN_API_TOKEN` is currently unset in production, i.e. the endpoint is off by design.
- **CORS is an explicit allowlist**, not `*` — see `corsHeaders()`. Requests from unlisted origins get no `Access-Control-Allow-Origin` at all. The forms are same-origin and never consult CORS, so nothing needs the wildcard. `next.config.js` deliberately sets **no** site-wide `Access-Control-*` headers.
- **Never return raw `e.message` to the client.** Log server-side, return a generic `server-error`; Mongo failures leak connection details and internal hostnames.
- **Never return the reCAPTCHA result object** (score/threshold/hostname) on success or failure — it lets an attacker tune a bot until it passes.
- **reCAPTCHA fails closed in production.** A missing `RECAPTCHA_SECRET_KEY` rejects the submission rather than bypassing verification (`lib/server/recaptcha.js`).
- Every form handler must keep both guards: `if (response) return response` (rate limit) and `if (!captcha.ok) return jsonErr(...)`. When editing this file with scripted find/replace, verify these counts survive — a line-based filter once deleted them because a `console.log` shared their line.

Shared helpers used by this route:
- `lib/server/sanitize.js` — strips HTML/script content from form fields
- `lib/server/ratelimit.js` — per-IP rate limiting (`rateLimit`, `getClientIp`)
- `lib/server/recaptcha.js` — reCAPTCHA v3 token verification against `RECAPTCHA_THRESHOLD`
- `lib/server/resend.js` — sends email via Resend (`sendMail`); console-mocks if `RESEND_API_KEY` unset
- `lib/server/emailTemplates.js` — HTML email templates (team notifications + auto-replies) per form type
- Reference codes use the pattern `RQ-YYYYMMDD-XXXXXX` (rental quotes) / `CN-YYYYMMDD-XXXXXX` (contact)

MongoDB connection is lazily cached (`getDb()`); `MONGO_URL`/`DB_NAME` are only required for contact/careers persistence, not for rental quotes (which are emailed only). See `.env.local.example` for the full list of env vars (Resend, reCAPTCHA, contact routing, Mongo, base URL).

### UI structure

- `components/site/` — shared layout pieces: `Header`, `Footer`, `Logo`, `ServicePageTemplate` (template wrapper used by many `services/[category]` and similar pages), `CTAPhoneButtons`, cookie consent UI.
- `components/global/` — cross-cutting widgets rendered from the root layout: `Analytics`, `CookieBanner`, `WhatsAppButton`, `CallNowButton`.
- `components/rental/` — rental cart/quote flow: `CartContext` (provider), `CartButton`, `CartDrawer`, `AddToQuoteButton`; `RentalShell` (in root layout) wraps the app to provide cart context site-wide.
- `components/ui/` — shadcn/ui primitives (Radix-based), configured via `components.json` (style `new-york`, no TS, `cssVariables: true`, path aliases `@/components`, `@/lib`, `@/hooks`, `@/ui`).

### Portfolio experience

- `/portfolio` is implemented with `app/portfolio/page.js` plus the client-side filter UI in `app/portfolio/PortfolioClient.js`.
- `components/site/Header.jsx` includes a Portfolio dropdown with links to full portfolio, enterprise projects, ELV/security and structured cabling filtered views.
- `app/HomeClient.js` includes a small `DeliveryProofStrip` before Cyber Advisory. Do not replace or materially change the existing homepage `EventsPortfolio` section unless explicitly requested.
- `app/sitemap.js` and `app/llms.txt/route.js` include the `/portfolio` route for discovery and AI-readable site context.

### Narrative case studies (non-physical engagements)

Cybersecurity, advisory and consulting case studies do **not** go in `/portfolio` — that hub stays scoped to enterprise facilities, ELV/security, cabling, fiber and network infrastructure, and its `app/portfolio/[slug]` template is built around poster images, work photos and hardware quantity tables that an incident-response engagement has none of. They live in `lib/case-studies-data.js` and render through `components/site/CaseStudyNarrative.jsx` instead (timeline, attack chain, root cause, FAQ).

- **Route:** `app/services/[category]/[slug]/[study]/page.js` — a **fourth level under `/services`**, which exists only for these. `dynamicParams = false` plus `generateStaticParams()` from `getNarrativeCaseStudyParams()` means the data module's whitelist is the entire route space; every other `/services/a/b/c` URL 404s. Nothing else in the repo hints this depth exists.
- **Adding one** is a data entry in `lib/case-studies-data.js` plus nothing else. Both `app/services/[category]/page.js` and `app/services/[category]/[slug]/page.js` call `getCaseStudiesForCategory()` / `getCaseStudiesForSubpage()` and spread a `caseStudies` array onto the `ServicePageTemplate` data, which renders an opt-in proof block (section 7.6). Subpages without case studies render exactly as before.
- **`lib/seo-region.js` `isUaeOnlyPath()` handles 4-segment service paths** so a case study inherits its parent subpage's UAE-only canonical treatment. `/services/cybersecurity/incident-response` is on that list, so its children cross-canonicalize to ipcare.ae and stay out of the ipcare.ca sitemap. Keep the 3- and 4-segment branches in sync.
- **`/case-studies`** (`app/case-studies/page.js`) is a master index that **links out** to every case study wherever it lives — `/portfolio/*`, `/event-it/*` and these — and deliberately duplicates none of their content. It is a directory, not a second portfolio. Only `fifa-club-world-cup` has a built `/event-it/[slug]` route, so that entry is gated on `getEventSubpage()` to avoid listing a 404.
- **Content QA:** the session-theft study is published with client consent on an anonymized basis. No AED figures, no calendar dates (timeline is relative days), and the client is generalized to "UAE SME" — sector, emirate and spend amounts together would identify them. Do not reintroduce any of those from the source proposal in `D:\ICT\ICT Propossals\Proposals\S Clinic UAE`. The 4-page source PDF there is footer-stamped **Confidential** and must not be published as a download.

### Path aliases

`@/*` maps to repo root (see `jsconfig.json`): `@/components/*`, `@/lib/*`, `@/app/*`, `@/hooks/*`.

## Documentation lookups

Whenever a task involves code generation, API integration, SDK usage, framework setup, authentication, payment, database, deployment, or configuration, use Context7 to check the latest official documentation before writing or modifying code.

## SEO / Search Console tooling

A local `google-seo-mcp` MCP server (community, GSC+GA4+CrUX+Lighthouse+schema+migration-audit suite, ~100 tools under `mcp__google-seo-mcp__*`) is registered user-scoped on the dev machine, covering both `sc-domain:ipcare.ae` and `sc-domain:ipcare.ca` via a read-only service account. Check `/mcp` and try it before asking the user for Search Console screenshots or exports. Note: the site is currently live only on `ipcare.ae` (see Deployment) — the `ipcare.ca` GSC property still exists and can still be queried, but isn't an active production domain right now.

- `gsc_site_snapshot(site_url, days)` auto-compares the last N days vs the prior N-day period — the default tool for "what changed this week/month" questions.
- `gsc_inspect_url` reflects Google's **last crawl** of a URL, not its live server response. After shipping a redirect/404 fix, confirm it server-side first (`curl -I`) — a stale "Not found (404)" from GSC right after deploy is expected lag, not a failed fix.
- The classic GSC **Index Coverage report** (Valid/Excluded/Error page counts, the "Why pages aren't indexed" UI panel) is **not exposed by the Search Console API** — no MCP tool can return it. For that data, ask the user to export/screenshot the Search Console UI, or check individual URLs one at a time with `gsc_inspect_url`.
- `history_save_snapshot`/`history_diff` exist for saving named snapshots and diffing them later, but no snapshots have been saved yet for either property — week-over-week comparisons currently rely on `gsc_site_snapshot`'s built-in prior-period math.


## Project Skill Usage Policy

This Project Is A Next.js Marketing Website For IP Care Technologies LLC.

Use The Following Skills When Relevant:

- Use `brand` For Website Messaging, Positioning, Trust-Building, Project Representation, And IP Care Brand Authority.
- Use `ui-ux-pro-max` For Homepage, Layout, User Experience, Conversion Flow, Visual Hierarchy, Premium Design Review, And Conversion Optimization.
- Use `design-system` For Consistent UI Components, Spacing, Typography, Color System, Buttons, Cards, Sections, And Responsive Design.
- Use `ui-styling` For CSS, Tailwind, Styling, Responsiveness, Animations, And Visual Polish.
- Use `design` For General Website Design Direction, Layout Decisions, Visual Structure, And Section Improvements.
- Use `banner-design` For Website Hero Banners, Campaign Banners, Service Banners, And Project Visual Sections.
- Use `brainstorming` For New Website Sections, Project Portfolio Representation, Service Positioning, Homepage Ideas, And Conversion Concepts.
- Use `seo-audit` For Website SEO Review, Meta Titles, Meta Descriptions, Headings, Internal Links, Sitemap, And Search Visibility.
- Use `seo-technical` For Technical SEO, Indexability, Schema, Performance, Crawlability, And Core Web Vitals.
- Use `schema` For Structured Data, Local Business Schema, Service Schema, FAQ Schema, Breadcrumb Schema, And Project Schema.
- Use `ai-seo` For AI Search Visibility, LLM-Readable Website Structure, AI Overview Readiness, And Answer Engine Optimization.
- Use `code-review` For Code Quality, Maintainability, Imports, Component Structure, And Next.js Best Practices.
- Use `security-review` Before Production Deployment Or Any Contact Form, API, Environment Variable, Cookie, Analytics, Or Server-Side Change.
- Use `verify` Before Marking Any Work As Complete.

## Safety Rules

Do Not Deploy, Delete, Push, Commit, Or Modify Production Configuration Without Explicit User Approval.

Do Not Remove Existing Working Features Without Approval.

Do Not Replace Existing Homepage Sections, Portfolio Sections, Event IT Sections, SEO Metadata, Redirects, Hreflang Logic, Sitemap Logic, Or API Routes Without Explaining The Impact First.

Before Marking Any Website Task Complete, Use The Relevant Review Skill And Provide A Clear Summary Of What Was Checked.

If A Task Involves Code Generation, API Integration, SDK Usage, Framework Setup, Authentication, Database, Deployment, Or Configuration, Use Context7 To Check The Latest Official Documentation Before Writing Or Modifying Code.

Do Not Expose, Print, Modify, Or Commit `.env.local`, API Keys, Tokens, Passwords, Or Secrets.

Before Running Any Terminal Command That Can Modify Files, Install Packages, Delete Files, Commit Code, Push Code, Or Deploy, Ask For Explicit Approval.

If Multiple Skills Could Apply, Prefer The Most Specific Skill First Instead Of Using Many Skills At Once.

Verification Must Not Invent Missing Scripts.

Because This Project Has No Configured Lint Or Test Script, Do Not Run `yarn lint`, `npm run lint`, `yarn test`, Or `npm test` Unless Those Scripts Are Added To `package.json`.

For Verification, Prefer:
- `yarn build`
- Manual Import Check
- Manual Responsive UI Review
- Manual SEO Metadata Review
- Manual Console Error Review Where Possible

## IP Care Brand Rules

Maintain A Premium, Enterprise-Level Technology Brand Image.

Position IP Care Technologies LLC As A Professional IT Services & System Integration Company Specializing In Event IT Solutions, Corporate IT Infrastructure, ELV/ICT Systems, CCTV, Access Control, Structured Cabling, Managed IT Services, Network Security, And Temporary IT Infrastructure For Large-Scale Events.

Highlight Credibility Such As 20+ Years Of Experience, Large-Scale Event Delivery, Enterprise Support, Zero Downtime, And 24/7 Support Where Relevant.

Avoid Cheap, Generic, Low-End, Or Repair-Shop Style Language.

Website Messaging Must Build Trust For UAE, Qatar, Saudi Arabia, And GCC Enterprise/Event Clients.
