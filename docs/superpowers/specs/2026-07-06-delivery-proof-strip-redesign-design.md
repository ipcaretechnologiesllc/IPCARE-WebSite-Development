# Delivery Proof strip redesign

## Problem

The homepage `DeliveryProofStrip` component (`app/HomeClient.js:539-600`), shown right before Cyber Advisory, currently packs three unrelated zones into one cramped row: intro text, a 2-column list of generic category descriptions ("CCTV, access control, structured cabling..."), and a CTA button. It reads as plain text in a box and does no real credibility work — it never surfaces that IP Care has delivered for named, recognizable clients (Mubadala Arena, Fairmont hotels, GEMS schools, etc.).

Goal: make the strip feel more premium and more like actual proof, by surfacing real project names instead of generic category copy — without overstating what we have (see Constraints).

## Constraints discovered during brainstorming

- Every project entry in `lib/portfolio-data.js` has `imageVerified: false`, and the `image` field points to generic, reused service-category graphics (e.g. `cctv-what-we-cover.webp`), not real photos of that specific site. Putting a client's name on a stock graphic, prominently on the homepage, would be misleading — more so than the existing `/portfolio` page's own (already-established) use of the same caveat via a "Representative visual" disclaimer. **Decision: no photos in this component.** Visual weight comes from color, type, and motion instead.
- There is no per-project detail route (`app/portfolio/PortfolioClient.js` has no slug-based page, no query-param deep linking). **Decision: every proof card links to `/portfolio`** (same destination as the existing CTA), not to a project-specific URL.

## Content

Source: the 6 `featured: true` entries in `lib/portfolio-data.js` (priority 20–25), already split evenly by `type`:

- **Enterprise Facilities**: Yas Driving Academy, Mubadala Arena Abu Dhabi, GEMS American Academy
- **ELV & Security** (displayed as "ELV" to match the existing heading/pillar wording): Fairmont Bab Al Bahr, Crowne Plaza Hotel, Paragone Mall

Each card shows: category icon + label, project `name`, `location`. No images, no `proofPoint`/`scope` text (keeps cards scannable at small size).

## Layout

Restructures the existing 3-column skeleton (`text | icon-list | button`) into two rows inside the same outer card (unchanged: white section, gradient card background, border, 16px radius, shadow, `clamp(24px,4vw,38px)` padding):

1. **Header row** — flex, wraps on narrow widths: eyebrow badge + heading + subtext on the left (unchanged copy), CTA button ("View Delivery Portfolio →", unchanged style) on the right.
2. **Proof grid** — full-width grid of the 6 cards below the header row. Responsive columns follow the same pattern already used by this file's `Stats()` component for consistency: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` (reflows to 2 rows of 3 on tablet/mobile rather than introducing a new horizontal-scroll mechanism).

The two-pillar grouping (Enterprise Facilities / ELV & Infrastructure) is preserved only as the per-card category icon+label, not as separate headed sections — with 6 cards in one grid, the category tag on each card carries that information without needing a second layer of headers.

## Card visual design

- Background: diagonal gradient `#16295C → #0B1A46` (not flat), `12px` radius, `1px` inset highlight border, drop shadow `0 8px 20px rgba(11,26,70,0.28)`.
- Category label: small icon + uppercase text in accent orange (`#E87722`) — `Landmark` icon for Enterprise Facilities, `ShieldCheck` icon for ELV (both from `lucide-react`, already used elsewhere in this file).
- Project name: bold white, `13px`.
- Location: muted white (`rgba(255,255,255,0.55)`), `10px`.
- Interaction: whole card is a `Link` to `/portfolio`. Hover: lift (`translateY(-3px)`) + scale `1.02` + deeper shadow, `200ms ease`. Keyboard focus: `2px` orange focus-visible outline. `cursor: pointer`.
- Entrance animation: reuse the file's existing `.reveal` class with per-card `transitionDelay` stagger (same technique as `Stats()`'s stat cards), respecting `prefers-reduced-motion` (already handled globally by the `.reveal` mechanism).

## Out of scope

- Real project photography — flagged as a separate content/asset task, not part of this change.
- Per-project detail pages/deep links — not needed since cards link to the existing `/portfolio` page.
- Changing which 6 projects are featured, or the underlying data in `lib/portfolio-data.js` — this change only reads existing `featured: true` entries.
