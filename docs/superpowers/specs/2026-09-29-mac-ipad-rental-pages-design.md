# Mac & iPad rental pages: design

Date: 2026-09-29
Status: approved in conversation; awaiting spec review
Source: SEO audit v3 (`ipcare.ae-audit/FULL-AUDIT-REPORT-v3.md`), Search Console data for sc-domain:ipcare.ae

## Goal

Move UAE searches for Mac and iPad rental ("rent macbook pro", "rent mac pro", "imac rental dubai", "ipad pro rental", and similar) from page 2 onto page 1. Restore the iPad Pro and iPad Air product pages to search results.

## Evidence

- **The iPad Pro 13" M4 and iPad Air 11" M3 product pages stopped receiving impressions on 2026-09-11 and 09-12**, the day after Google's last crawl of them. Since 09-12 the site doesn't appear for "ipad pro rental", "rent ipad pro" or "hire ipad pro" at all. Before that they sat at positions 18–21. No site change coincides with the drop. About 80% of each product page is shared template text (identical FAQs, rates and delivery copy), which points to Google treating them as near-duplicates.
- **The iMac product page is filed as a duplicate.** URL Inspection reports "Duplicate without user-selected canonical", with Google's canonical set to `https://ipcare.ae/rental/laptops-desktops/apple-imac-24-m4` (the non-www address). The last crawl was 2026-09-06, before the Cloudflare apex→www redirect existed.
- **`/rental/macbooks` climbed from position 23 (early July) to 9.6 (late August), then slipped to 13.6–15.6 in September.** Its current title, iMac cross-listing and Mac Pro/iMac Pro FAQs shipped 2026-09-23 and were crawled 2026-09-27, so their effect isn't measurable yet. This design leaves them untouched.
- **Content gaps:**
  - the MacBook Pro 14" M4 lives only under `/rental/laptops-desktops`, so it's missing from the Mac page;
  - only 3 of the 8 Macs (MacBook Pro 16", Mac Studio, iMac) have product-specific content, added 2026-08 in a second `productContent` block. That text overstated the Mac Studio and iMac against the Mac Pro and iMac Pro and promised same-day imaging, so the implementation replaces it;
  - every Mac uses the same stock laptop image and every iPad the same stock tablet image. There are no real photos available, so images stay as they are.

## Decisions from the user

- No real product photos: images stay as stock.
- GCC deliveries (Qatar, Saudi Arabia, Oman, Bahrain) happen **for events and projects, quoted per project**. Don't claim regular service.
- The only named Mac/iPad deployment is **Saadiyat Nights**: 17 iPads for audience survey capture, already on `/rental/tablets-ipads`. Name no other clients or events.
- Mac mini and Mac Studio are **computer only**; displays, keyboards and mice are quoted on request.
- iPad Pro 13" M4 is the **WiFi + Cellular** model, set up for mobile data on request. Don't say who supplies the SIM or data plan.

## Design

### 1. Structure (lib/rental-data.js, product page template)

1. `productContent[slug]` gains an optional `faqs: [{ q, a }]`. On the product page, when a product defines `faqs`, render them first and follow them with only two of the four generic FAQs: **minimum rental period** and **delivery time**. The generic "what's included" and "support" FAQs are dropped for those products. The FAQPage schema is built from the same array, so markup always equals visible content. Products without `faqs` are unchanged.
2. `productContent[slug]` gains an optional `related: [{ category, slug }]`. When present, Related Products shows those items, each resolved from its home category so it links to its one canonical URL, in place of the first three of the same category. It's used for the iMac and MacBook Pro 14" M4, so they show other Macs instead of Dell, HP and ThinkPad.
3. `rentalCategories.macbooks.crossListed` adds `{ category: 'laptops-desktops', slug: 'macbook-pro-14-m4' }`, alongside the existing iMac entry. There's no URL change or redirect.
4. No new routes, page types or components.

### 2. Product content

Mac products get `body` (3 paragraphs, about 150–200 words), `usedFor` (4 items) and `faqs` (2–3). The Apple iPads keep their existing `body`/`usedFor` and gain `faqs`. Facts come only from the site's existing specs, rates, lead times and configuration services, the user's decisions above, and Apple's public model history.

| Product (slug, daily rate) | Angle | FAQs |
|---|---|---|
| `macbook-pro-14-m4` (AED 130) | Entry-level Pro vs Air: active cooling, XDR display, HDMI and SD ports | Which MacBook Pro: M4, M4 Pro or M4 Max? · Single-day rental in Abu Dhabi/Dubai? |
| `macbook-pro-16-m4-pro` (AED 180) | Big-screen editing, up to 22 h battery | 14-inch or 16-inch? |
| `macbook-pro-14-m4-max` (AED 210) | Most powerful portable: 36 GB, 32-core GPU, 8K/ML/motion | Is the M4 Max worth it over the M4 Pro? |
| `macbook-air-15-m3` (AED 95) | Larger fanless screen: training rooms, presenting | Air 13" or 15"? |
| `macbook-air-13-m3` (AED 95) | Volume choice: hackathons, attendees, registration | Batch for a hackathon or training? (Tell us the quantity early; no numbers promised) |
| `mac-mini-m4-pro` (AED 95) | Edit suites, signage, build machines | Does it include a display? (Computer only; peripherals quoted) |
| `mac-studio-m2-ultra` (AED 240) | Mac Pro alternative: grading, broadcast, ML | Do you rent the Mac Pro? · Mac Studio or MacBook Pro M4 Max? |
| `apple-imac-24-m4` (AED 120) | Reception, design and editing desks | Do you rent the iMac Pro? · Are keyboard and mouse included? (Yes) |
| `ipad-pro-13-m4` | FAQs only | Is this the iPad Pro 12.9"? (The 13" M4 replaced it in 2024) · 4G/cellular iPad rental? · Apple Pencil and keyboard? |
| `ipad-air-11-m3` | FAQs only | iPad Air or iPad Pro for an event? · Kiosk mode for registration desks? |
| `ipad-mini-7` | FAQs only | Older minis such as the mini 4? (The mini 7 is the current model) · Handheld battery life? |
| `ipad-10th-gen` | FAQs only | Cheapest iPad to rent? (AED 40/day) · How many can you supply? (Up to 50 tablets) |

Constraints: brand voice (premium, enterprise, no repair-shop language); no stock quantities for Macs; no client names beyond Saadiyat Nights; no same-day promises (the lead time is 1–2 days); rates are indicative, per unit, excluding VAT.

### 3. Category pages and internal links

- **`/rental/macbooks`:**
  - pricing FAQ updated to "MacBook Pro from AED 130/day" (was unspecified);
  - new FAQ "Can you deliver Macs outside the UAE?" (per-project GCC quotes).
- **`/rental/tablets-ipads`:** new FAQ "Can you deliver iPads outside the UAE?" (per-project GCC quotes).
- **Titles and meta descriptions:** unchanged on both category pages (keeps the 2026-09-23 changes measurable).
- **iPad Air and iPad (10th Gen):** `readMore` to `/blog/ipad-kiosk-deployment-playbook`.
- **`ipad-kiosk-deployment-playbook` blog post:** a `cta` block linking to `/rental/tablets-ipads/ipad-air-11-m3`.
- **`laptop-rental-vs-buy` blog post:** a `cta` block linking to `/rental/macbooks`, next to its existing tablets and hub CTAs.

## Verification (before asking to commit)

- `npm run build` passes, and pages stay static (`○`/`●`).
- For every changed product page: word count before and after; visible FAQ questions equal FAQPage `mainEntity`; text-overlap check (iPad Pro vs iPad Air, MacBook Air 13" vs 15") before and after, expected to fall clearly.
- Dev server: one Mac and one iPad page render without layout or console errors; Related Products on the iMac shows Macs.
- Show the diff and get approval before commit/push.

## After deploy

- Purge Cloudflare, then spot-check live pages twice.
- **User:** request indexing in Search Console for:
  - `/rental/tablets-ipads/ipad-pro-13-m4`
  - `/rental/tablets-ipads/ipad-air-11-m3`
  - `/rental/laptops-desktops/apple-imac-24-m4`
  - `/rental/laptops-desktops/macbook-pro-14-m4`
  - `/rental/macbooks/mac-studio-m2-ultra`
  - `/rental/macbooks`
  - `/rental/tablets-ipads`

## Measurement baseline (UAE, Search Console)

Impressions / average position:

| Page | Aug 16–31 | Sep 1–15 | Sep 16–27 |
|---|---|---|---|
| `/rental/macbooks` | 483 / 9.6 | 272 / 13.6 | 189 / 15.6 |
| `/rental/tablets-ipads` | 106 / 28.7 | 256 / 25.9 | 326 / 25.1 |
| `/rental/tablets-ipads/ipad-pro-13-m4` | 218 / 18.6 | 105 / 23.0 | 0 / — |
| `/rental/tablets-ipads/ipad-air-11-m3` | 81 / 20.0 | 56 / 19.2 | 0 / — |
| `/rental/laptops-desktops/apple-imac-24-m4` | 70 / 23.7 | 49 / 25.0 | 28 / 23.7 |

Query positions, UAE, 2026-09-12 → 09-27:
- `rent mac pro` 11.5
- `rent imac` 10.8
- `rent macbook pro` 10.7
- `mac pro rental` 11.9
- `rent imac pro` 11.3
- `rent macbook pro abu dhabi` 17.4
- `imac rental dubai` 24.6
- iPad Pro queries: absent

**Re-measure in early November 2026**, over the same windows shifted: impressions, position and clicks per page, plus whether the iPad Pro and iPad Air pages have returned.

## Out of scope

- Real product photography (not available).
- New Mac/iPad models or rate changes.
- Category page titles and meta descriptions.
- The networking product naming issue (`aruba-cx-6300m-48g`, `cisco-c9300-48`), which is pending the user's answer.
