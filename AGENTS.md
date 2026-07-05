# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project overview

Marketing/corporate website for **IP Care Technologies** (managed IT, cybersecurity, cloud, ELV, event IT, delivery portfolio, and equipment rental), built with Next.js 15 (App Router, JS not TS), Tailwind CSS, and shadcn/ui (Radix) components.

## Commands

- `yarn dev` — start dev server on `0.0.0.0:3000` (with increased Node memory; watcher polls every 2s — see `next.config.js`)
- `yarn dev:no-reload` / `yarn dev:webpack` — alternate dev server invocations without the memory flag
- `yarn build` — production build (`output: 'standalone'`)
- `yarn start` — run the production build

- Windows preview fallback used successfully in Codex: `node node_modules/next/dist/bin/next dev --hostname 0.0.0.0 --port 3010` from the repo root, preferably in a visible terminal so the process stays alive.

There is no lint/test script configured in `package.json`. `tests/` and `test_reports/` only contain placeholder files.

## Architecture

### Multi-domain canonicalization

This single deployment serves multiple hostnames (`www.ipcare.ae`, `ipcare.ca`, legacy `ipcares.com`/`ipcare.ae`). Two layers work together:

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
