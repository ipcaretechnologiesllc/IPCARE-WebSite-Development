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

**Pushing to `main` auto-deploys to production.** Hostinger's GitHub integration is configured on Hostinger's side — there is no `.github/workflows/`, no `vercel.json`, and no deploy script in this repo, so *nothing in the codebase reveals that a pipeline exists*. Do not conclude from their absence that a push won't deploy.

`origin` has two push URLs, so a single `git push origin main` reaches both remotes — **`ipcare.ae` and `ipcare.ca` are two separate Hostinger accounts**, each independently cloning and building the same codebase from its own remote. There is no Vercel involved anywhere in production (verified 2026-08-08 directly against Cloudflare DNS for both zones — no `vercel-dns.com`/`*.vercel.app` entries on either). There are no feature branches; work goes directly to `main`.

Allow **5–10 minutes** after pushing before verifying — a check immediately after `git push` will still show the old build. Both `www.ipcare.ae` and `www.ipcare.ca` are served by Hostinger (the apex hosts redirect at the platform level, before the Next.js app runs). See "Hosting & DNS topology" below for how each domain resolves through Cloudflare to its own Hostinger account.

**A site-wide `HTTP 503 "Service Unavailable — the server is temporarily busy"` shortly after a push is normal, not a code fault.** Applying a build on Hostinger requires **stopping and restarting the Node process**, and during that restart the origin serves 503 across *every* route on **that account** (confirmed: `/`, `/rental`, `/api/health` all 503 at once). Because the two domains are separate Hostinger accounts, a restart on one does not 503 the other — check both independently rather than assuming a clean domain rules out a deploy-in-progress. If the 503 is site-wide *for that domain* it is the restart window — wait and re-check. A 503 on one route while others serve 200 (on the same domain) would be different and worth investigating. Do not interpret the restart 503 as a broken deploy or start rolling anything back; the local `next build` passing 256/256 is the signal the code is fine.

Three caching layers can each serve stale content after a deploy — check all three before suspecting the code:
1. **Cloudflare edge** — sits in front of Hostinger and has been observed caching HTML despite `no-store` from the origin. Fix: "Purge Everything" in the Cloudflare dashboard.
2. **Next.js ISR at the origin** — most routes export `revalidate = 3600`, and the Hostinger redeploy does not appear to clear `.next/cache`. A page can serve pre-deploy HTML for up to an hour until a request triggers background regeneration. A `?cb=1` query string bypasses this and is a useful diagnostic: fresh-with-query + stale-without-query means ISR staleness, not a bug.
3. **Stale-while-revalidate** — the first request after a stale window returns stale and only the *next* one is fresh. Always verify twice.

## Architecture

### Hosting & DNS topology

**Two independent Hostinger accounts, not one shared deployment** — `ipcare.ae` and `ipcare.ca` are separate accounts, each auto-deploying the same codebase from its own git remote (see Deployment above). There is no Vercel anywhere in production; both zones sit behind **Cloudflare** (proxied/orange-cloud) in front of Hostinger, confirmed directly against each zone's DNS records on 2026-08-08.

The two zones use different DNS strategies at Hostinger, which is normal but worth knowing when debugging either one:
- **`ipcare.ae`** — raw `A` records. Main site (`ipcare.ae`, `www.ipcare.ae`, `docvault.ipcare.ae`) → `45.13.255.161`, proxied. A separate cluster of service subdomains (`cpanel`, `mail`, `webmail`, `webdisk`, `whm`, `autoconfig`, `autodiscover`) → `50.116.93.239`, deliberately **DNS-only (unproxied)** because mail clients and cPanel are accessed directly against those hostnames — do not recommend proxying them, it would break those connections. `ftp.ipcare.ae` is a DNS-only CNAME to `ipcare.ae` itself; Cloudflare flags it as leaking the real origin IP behind the proxied A record, which is correct, but proxying it would very likely break FTP (Cloudflare's proxy doesn't tunnel raw FTP on Free/Pro), and the origin IP is already discoverable via the mail/cPanel records anyway — left as-is by design, not an oversight.
- **`ipcare.ca`** — CNAME-flattened to Hostinger's managed CDN: `ipcare.ca` and `www.ipcare.ca` both → `*.cdn.hstgr.net`, proxied. Mail is fully on Hostinger's own mail service (`mx1`/`mx2.hostinger.com`, `hostingermail-*` DKIM) rather than self-hosted — a cleaner, more managed setup than `.ae`'s.
- `docpilot.ipcare.ae` CNAMEs to `docpilot-frontend-*.onrender.com` — a **separate product (Render-hosted)**, unrelated to this repo beyond the `/products/docpilot` marketing page.
- `ipcare.ae` layers two mail-sending services in DNS (Brevo DKIM + Resend DKIM) alongside cPanel's own mail; only Resend (`lib/server/resend.js`) is used by this codebase — Brevo is a separate/legacy tool, not called from app code.

### Multi-domain canonicalization

The same codebase runs on both Hostinger accounts and still needs multi-hostname logic within each: legacy/redirect hostnames (bare apex, `ipcares.com`) must resolve correctly regardless of which account handles the request, and the canonical/hreflang logic below auto-detects the serving domain from the `Host` header rather than assuming which account it's running on. Two layers work together:

- `next.config.js` `redirects()` — host-based 308 redirects for legacy domains (`ipcare.ae`, `ipcares.com` → `www.ipcare.ae`), plus a large block of permanent redirects mapping legacy `.php`/`.html`/WordPress URLs to current routes.
- `middleware.js` — does NOT redirect; its sole job is to inject `x-pathname` into request headers so `app/layout.js` can build path-aware hreflang tags. Skips `api/`, `_next/static`, and static asset extensions.
- `app/layout.js` `generateMetadata()` — reads `host`/`x-forwarded-host` and `x-pathname`, maps the host to a canonical base via `CANONICAL_DOMAINS`, sets `metadataBase` accordingly, and emits per-domain hreflang (`en-AE`, `en-CA`, `x-default`). Child pages use **relative** `alternates.canonical`, which resolves against this dynamic base — so child pages never need host-specific logic.

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

### Path aliases

`@/*` maps to repo root (see `jsconfig.json`): `@/components/*`, `@/lib/*`, `@/app/*`, `@/hooks/*`.

## Documentation lookups

Whenever a task involves code generation, API integration, SDK usage, framework setup, authentication, payment, database, deployment, or configuration, use Context7 to check the latest official documentation before writing or modifying code.


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
