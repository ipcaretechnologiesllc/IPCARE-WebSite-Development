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

**The website is hosted only on `www.ipcare.ae`.** `ipcare.ca` is not hosted right now (it may be re-hosted in future) — do not check it, curl it, or treat it as a production domain until told otherwise.

**Pushing to `main` auto-deploys to production.** Hostinger's GitHub integration is configured on Hostinger's side — there is no `.github/workflows/`, no `vercel.json`, and no deploy script in this repo, so *nothing in the codebase reveals that a pipeline exists*. Do not conclude from their absence that a push won't deploy.

`origin` has two push URLs (`github-first`, `github-second`), so a single `git push origin main` reaches both GitHub remotes; the second is a leftover from the retired `.ca` Hostinger account and is harmless. There is no Vercel involved in production. There are no feature branches; work goes directly to `main`.

Allow **5–10 minutes** after pushing before verifying — a check immediately after `git push` will still show the old build. `www.ipcare.ae` is served by Hostinger (the apex host redirects at the platform level, before the Next.js app runs). See "Hosting & DNS topology" below for the DNS path.

**A site-wide `HTTP 503 "Service Unavailable — the server is temporarily busy"` shortly after a push is normal, not a code fault.** Applying a build on Hostinger requires **stopping and restarting the Node process**, and during that restart the origin serves 503 across *every* route (confirmed: `/`, `/rental`, `/api/health` all 503 at once). If the 503 is site-wide it is the restart window — wait and re-check. A 503 on one route while others serve 200 would be different and worth investigating. Do not interpret the restart 503 as a broken deploy or start rolling anything back; the local `next build` passing 256/256 is the signal the code is fine.

Three caching layers can each serve stale content after a deploy — check all three before suspecting the code:
1. **Cloudflare edge** — Cache Rule "Cache HTML pages" caches HTML at the edge. **Purge Everything after every deploy**, or edges keep serving the previous build, whose HTML references CSS/JS chunks that no longer exist at the origin.
2. **Next.js ISR at the origin** — most routes export `revalidate = 3600`, and the Hostinger redeploy does not appear to clear `.next/cache`. A page can serve pre-deploy HTML for up to an hour until a request triggers background regeneration. A `?cb=1` query string bypasses this and is a useful diagnostic: fresh-with-query + stale-without-query means ISR staleness, not a bug.
3. **Stale-while-revalidate** — the first request after a stale window returns stale and only the *next* one is fresh. Always verify twice.

## Architecture

### Hosting & DNS topology

The site is a single Hostinger account (Node app behind LiteSpeed) with **Cloudflare** (proxied, Free plan) in front. Smart Tiered Cache is on (upper tier SIN, secondary HKG).

**Static media caching is set in Cloudflare, not `next.config.js`.** LiteSpeed serves `/public` files before Next.js runs, so the `headers()` cache rules in `next.config.js` never reach them — they arrive with no `Cache-Control`. Cache Rule "Cache static assets" matches `/_next/static/` or image/video/font extensions, Edge TTL 1 month (ignore origin), Browser TTL 7 days. Filenames aren't fingerprinted: after replacing an image under the same name, purge that URL.

**Responsive image variants.** `images.unoptimized: true` means nothing resizes images at request time, so large `/public` images have committed `-480w.webp` / `-960w.webp` siblings made by `node scripts/gen-responsive-images.mjs`, listed in `lib/image-variants.json`. `responsive(src, SIZES.x)` / `srcSetFor(src)` from `lib/responsive-image.js` turn that into `srcSet`/`sizes` (and build Unsplash `?w=` srcsets). After adding or replacing a large image, re-run the script and commit the variants + JSON — it only processes git-tracked files, so commit the original first. A hero that is preloaded must pass the same `imageSrcSet`/`imageSizes` to `preload()`, or phones download the full file *and* the variant.

DNS for `ipcare.ae`:
- **`ipcare.ae`** — raw `A` records. Main site (`ipcare.ae`, `www.ipcare.ae`, `docvault.ipcare.ae`) → `45.13.255.161`, proxied. A separate cluster of service subdomains (`cpanel`, `mail`, `webmail`, `webdisk`, `whm`, `autoconfig`, `autodiscover`) → `50.116.93.239`, deliberately **DNS-only (unproxied)** because mail clients and cPanel are accessed directly against those hostnames — do not recommend proxying them, it would break those connections. `ftp.ipcare.ae` was a DNS-only CNAME to `ipcare.ae` itself, which Cloudflare flagged as leaking the real origin IP behind the proxied A record — now proxied (2026-08-08) since FTP on this host is confirmed unused. If FTP connectivity ever needs to work here again, un-proxy it first (Cloudflare's proxy doesn't tunnel raw FTP on Free/Pro plans).
- `docpilot.ipcare.ae` CNAMEs to `docpilot-frontend-*.onrender.com` — a **separate product (Render-hosted)**, unrelated to this repo beyond the `/products/docpilot` marketing page.
- `ipcare.ae` layers two mail-sending services in DNS (Brevo DKIM + Resend DKIM) alongside cPanel's own mail; only Resend (`lib/server/resend.js`) is used by this codebase — Brevo is a separate/legacy tool, not called from app code.

### Canonical & hreflang

The canonical base is fixed **at build time** by `NEXT_PUBLIC_BASE_URL` (`SITE_URL` in `lib/seo-region.js`; unset = `https://www.ipcare.ae`). Layers:

- `next.config.js` `redirects()` — host-based 308 redirects for legacy domains (`ipcare.ae`, `ipcares.com` → `www.ipcare.ae`), plus a large block of permanent redirects mapping legacy `.php`/`.html`/WordPress URLs to current routes.
- `app/layout.js` static `metadata` — `metadataBase: new URL(SITE_URL)`. Child pages use **relative** `alternates.canonical`, which resolves against this base.
- `components/site/HreflangLinks.jsx` — Client Component in the root layout `<head>` that emits per-path hreflang from `usePathname()`; it resolves during static prerendering, so the tags are in the server HTML.

**`.ca` code is kept deliberately — do not remove it.** `ipcare.ca` isn't hosted now but may be re-hosted in future (user decision, 2026-09-23). `HreflangLinks.jsx` still emits an `en-CA` alternate for `www.ipcare.ca`; `isCaSite()`/`isUaeOnlyPath()` in `lib/seo-region.js`, the `.ca` branches in `app/sitemap.js`, `app/robots.js`, `app/llms.txt/route.js`, and the `ipcare.ca` redirect in `next.config.js` all stay. **To re-host `.ca`:** deploy a separate build with `NEXT_PUBLIC_BASE_URL=https://www.ipcare.ca` — canonical base and `isCaSite()` are build-time, so a `.ca` build without it would canonicalize to `.ae`.

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

**Client bundle rules** (each of these once shipped 150–300 KB of unneeded JS per page):
- **Never look up a lucide icon by string with `import * as Icons` + `Icons[name]` in a client component** — a dynamic lookup can't be tree-shaken, so it ships all ~1,500 icons. Use `ICONS[name]` from `lib/icon-map.js`, which `scripts/gen-icon-map.mjs` regenerates in `prebuild` from every icon name written as a string in `app/`, `components/`, `lib/`. Static `Icons.ArrowRight` access is fine. Server components (e.g. `app/industries/[slug]/page.js`) may keep `Icons[name]` — it never reaches the browser.
- **Don't import the big `lib/*-data.js` modules into a `'use client'` file** (`services-data` ~780 KB, `blog-data` ~310 KB, `event-it-data` ~310 KB of source). Pick the fields in the server `page.js` and pass them as props — see `app/page.js`, `app/blog/page.js`, `app/event-it/page.js`, `lib/services-grid.js`. After changes, check the build's "First Load JS" column: normal pages are ~165–210 kB.
- **No `framer-motion` in site-wide components.** The desktop nav flip/glow is pure CSS (`components/site/NavFlipItem.jsx` + `.nav-flip` in `globals.css`); the old framer version cost ~40 KB gzipped on every page, and `framer-motion` has been uninstalled.
- **`gtag.js` loads with `strategy="lazyOnload"`** (`components/global/Analytics.jsx`): it is ~176 KB gzipped, more than the site's own JS. Keep the inline `ga4-init` script `afterInteractive` so consent defaults and the queued page_view exist early.

### Portfolio experience

- `/portfolio` is implemented with `app/portfolio/page.js` plus the client-side filter UI in `app/portfolio/PortfolioClient.js`.
- `components/site/Header.jsx` includes a Portfolio dropdown with links to full portfolio, enterprise projects, ELV/security and structured cabling filtered views.
- `app/HomeClient.js` includes a small `DeliveryProofStrip` before Cyber Advisory. Its projects and the `BlogTeaser` posts are picked in the server `app/page.js` and passed as props — do not import `lib/blog-data.js` (~90 KB gzipped of article bodies) or `lib/portfolio-data.js` into `HomeClient`, or they ship to every homepage visitor. Do not replace or materially change the existing homepage `EventsPortfolio` section unless explicitly requested.
- `app/sitemap.js` and `app/llms.txt/route.js` include the `/portfolio` route for discovery and AI-readable site context.

### Narrative case studies (non-physical engagements)

Cybersecurity, advisory and consulting case studies do **not** go in `/portfolio` — that hub stays scoped to enterprise facilities, ELV/security, cabling, fiber and network infrastructure, and its `app/portfolio/[slug]` template is built around poster images, work photos and hardware quantity tables that an incident-response engagement has none of. They live in `lib/case-studies-data.js` and render through `components/site/CaseStudyNarrative.jsx` instead (timeline, attack chain, root cause, FAQ).

- **Route:** `app/services/[category]/[slug]/[study]/page.js` — a **fourth level under `/services`**, which exists only for these. `dynamicParams = false` plus `generateStaticParams()` from `getNarrativeCaseStudyParams()` means the data module's whitelist is the entire route space; every other `/services/a/b/c` URL 404s. Nothing else in the repo hints this depth exists.
- **Adding one** is a data entry in `lib/case-studies-data.js` plus nothing else. Both `app/services/[category]/page.js` and `app/services/[category]/[slug]/page.js` call `getCaseStudiesForCategory()` / `getCaseStudiesForSubpage()` and spread a `caseStudies` array onto the `ServicePageTemplate` data, which renders an opt-in proof block (section 7.6). Subpages without case studies render exactly as before.
- **`lib/seo-region.js` `isUaeOnlyPath()` handles 4-segment service paths** so a case study inherits its parent subpage's UAE-only treatment (no hreflang alternates). Keep the 3- and 4-segment branches in sync.
- **`/case-studies`** (`app/case-studies/page.js`) is a master index that **links out** to every case study wherever it lives — `/portfolio/*`, `/event-it/*` and these — and deliberately duplicates none of their content. It is a directory, not a second portfolio. Only `fifa-club-world-cup` has a built `/event-it/[slug]` route, so that entry is gated on `getEventSubpage()` to avoid listing a 404.
- **Content QA:** the session-theft study is published with client consent on an anonymized basis. No AED figures, no calendar dates (timeline is relative days), and the client is generalized to "UAE SME" — sector, emirate and spend amounts together would identify them. Do not reintroduce any of those from the source proposal in `D:\ICT\ICT Propossals\Proposals\S Clinic UAE`. The 4-page source PDF there is footer-stamped **Confidential** and must not be published as a download.

### Path aliases

`@/*` maps to repo root (see `jsconfig.json`): `@/components/*`, `@/lib/*`, `@/app/*`, `@/hooks/*`.

## Documentation lookups

Whenever a task involves code generation, API integration, SDK usage, framework setup, authentication, payment, database, deployment, or configuration, use Context7 to check the latest official documentation before writing or modifying code.

## SEO / Search Console tooling

A local `google-seo-mcp` MCP server (community, GSC+GA4+CrUX+Lighthouse+schema+migration-audit suite, ~100 tools under `mcp__google-seo-mcp__*`) is registered user-scoped on the dev machine, covering `sc-domain:ipcare.ae` via a read-only service account (a `sc-domain:ipcare.ca` property also exists but that domain is no longer hosted — ignore it). Check `/mcp` and try it before asking the user for Search Console screenshots or exports.

- `gsc_site_snapshot(site_url, days)` auto-compares the last N days vs the prior N-day period — the default tool for "what changed this week/month" questions.
- `gsc_inspect_url` reflects Google's **last crawl** of a URL, not its live server response. After shipping a redirect/404 fix, confirm it server-side first (`curl -I`) — a stale "Not found (404)" from GSC right after deploy is expected lag, not a failed fix.
- The classic GSC **Index Coverage report** (Valid/Excluded/Error page counts, the "Why pages aren't indexed" UI panel) is **not exposed by the Search Console API** — no MCP tool can return it. For that data, ask the user to export/screenshot the Search Console UI, or check individual URLs one at a time with `gsc_inspect_url`.
- `history_save_snapshot`/`history_diff` exist for saving named snapshots and diffing them later, but no snapshots have been saved yet — week-over-week comparisons currently rely on `gsc_site_snapshot`'s built-in prior-period math.


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
