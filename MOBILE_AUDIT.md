# Mobile Responsiveness Audit (360px & 390px)

**Method:** Playwright (Chromium headless) against `next dev`, all routes loaded at 360×800 and 390×800. Checked `document.documentElement.scrollWidth` vs `window.innerWidth`, elements whose right edge exceeds the viewport, fixed/sticky floating buttons, and tap-target sizes for `<a>`/`<button>`.

**Routes audited (39):** `/`, `/about`, `/services`, `/services/it-consulting` (+ `/technology-strategy`, `/dubai`), `/services/infrastructure`, `/services/elv`, `/services/managed-it`, `/services/cloud`, `/services/cybersecurity`, `/services/email-solutions`, `/cybersecurity-advisory` (+ `zero-trust`, `sase`, `cloud-security`, `security-automation`, `executive-advisory`, `knowledge-base`, `[slug]` sample), `/industries` (+ `healthcare`, `banking`, `government`), `/event-it` (+ `portfolio`, `[slug]` samples), `/rental` (+ category, product), `/blog` (+ `[slug]` sample), `/careers`, `/contact`, `/partners`, `/privacy-policy`, `/cookie-policy`, `/terms`.

---

## Prioritized issue table

| Page | Section / element | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| `/` (homepage) | Hero background `<video className="absolute inset-0 w-full h-full object-cover">` | `document.scrollWidth` = 1928px vs 360px viewport — page has horizontal scroll. The video element renders at its intrinsic 1920px width instead of being constrained to 100% of the (overflow-hidden) hero section. | **HIGH** | Add an explicit `style={{ width: '100%' }}` (or `max-width: 100%`) to the `<video>`, or wrap it in a sized container with `overflow-hidden` that the video can't escape. Verify with devtools that the rendered width is actually 100% on mobile, not 1920px. |
| `/event-it` | Hero `<img className="absolute inset-0 w-full h-full object-cover ...">` (and a `pill-badge` "Saadiyat Nights" span, right edge 366px) | `scrollWidth` = 608px vs 360px. Same `w-full`/intrinsic-size pattern as homepage video; pill badge also overflows by 6px. | **HIGH** | Same fix as homepage hero — force `width: 100%` on the hero image; check the pill badge for `whitespace-nowrap` and allow it to wrap or shrink-to-fit on small screens. |
| `/event-it/portfolio` | Hero `<img className="absolute inset-0 w-full h-full object-cover ...">` | `scrollWidth` = 488px vs 360px — same pattern. | **HIGH** | Same fix as above. |
| `/rental` | Hero `<img className="absolute inset-0 w-full h-full pointer-events-none">` (rental-hero.webp) AND product card images (`Dell` card link + nested `<img object-cover>`) | `scrollWidth` = 1608px vs 360px (largest overflow found). Both the hero photo and at least one product-grid image/card render near their intrinsic widths (~1600px / 600px) rather than 100%. | **HIGH** | Same hero-image fix as above (`RentalHubClient.jsx` ~line 81-89). For the product grid (`grid grid-cols-2 ... gap-5`, ~line 139-156), confirm the `<img className="w-full h-full object-cover ...">` and its parent `<a>` are constrained to the grid cell — likely the same "intrinsic width wins" issue; add `max-w-full` and confirm the grid column itself isn't being forced wide by the hero overflow above it. |
| `/blog` | Hero `<img className="absolute inset-0 w-full h-full object-cover ...">` | `scrollWidth` = 608px vs 360px — same pattern as event-it. | **HIGH** | Same fix as above. |
| `/cybersecurity-advisory/zero-trust` | "Industries We Serve" pill, `<span className="px-5 py-2 rounded-full text-sm font-semibold">Critical Infrastructure</span>` (`ServicePageTemplate.jsx` ~line 548-559) | Pill renders at 384px wide (text not wrapping), pushing `scrollWidth` to 416px vs 360px. | **HIGH** | The flex item isn't shrinking/wrapping its text. Add `max-w-full` and `text-center` with normal `white-space` to the pill, or reduce `px-5`/font-size on small screens, or set `min-width: 0` on the flex item so long industry names ("Critical Infrastructure") can wrap to two lines. |
| `/cybersecurity-advisory/security-automation` | Same "Industries We Serve" pills section ("Telecom" pill, right edge 423px) | `scrollWidth` = 423px vs 360px. Smaller overflow but same root cause as zero-trust. | **HIGH** | Same fix — likely the *whole pill row* is overflowing (one pill computed at full row width), not just the "Telecom" text. Fix at the shared `ServicePageTemplate.jsx` component level so all advisory sub-pages benefit. |
| `/cybersecurity-advisory/executive-advisory` | Same "Industries We Serve" pills ("Technology" pill, right edge 463px) | `scrollWidth` = 463px vs 360px — largest of the three advisory pages, same root cause. | **HIGH** | Same shared-component fix as above. |
| All pages (homepage especially) | Floating WhatsApp + Call buttons (`floating-btn-whatsapp`, `floating-btn-call`) | Both buttons are 56×56px and stacked at bottom-right (`right ≈ 24px` from viewport edge at 360px), not overlapping each other or detected content in the automated check. No overlap detected, but worth a manual visual check on pages with bottom CTAs/sticky bars (e.g. product pages, contact form) since the automated pass only sampled scroll position 0. | **LOW** | Manual spot-check: scroll to bottom of `/contact`, `/rental/[category]/[product]`, and blog article pages to confirm the floating buttons don't sit on top of submit buttons or "Add to RFQ" CTAs. |
| All pages | Header nav links (`Home`, `About`, `Services`, `Industries`, `Cyber Advisory`, `Event IT`, etc.) and footer text links | Many `<a>` elements measure ~17px tall (under the ~40px tap-target guideline). This is consistent site-wide (16-71 such links per page depending on footer/nav size), not page-specific. | **LOW** | These are inline text links in nav/footer — common and generally acceptable for footer link lists, but consider increasing the clickable padding (`py-2`/`py-3` with `display:inline-block`) on primary header nav items and footer contact links (phone/email) for easier thumb taps. |
| `/services`, `/services/elv` | Service cards/grid (`smallTargets` count noticeably higher: 68-71 on `/services`, 21-22 on `/services/elv` vs ~16-19 elsewhere) | Larger number of small (<40px) interactive elements than other pages — likely many service-card links in a dense grid. | **LOW** | Spot-check `/services` and `/services/elv` card grids at 360px for cramped tap targets between adjacent service links. |

---

## Per-page issue counts

| Page | HIGH | MED | LOW | Total |
|---|---|---|---|---|
| `/` | 1 (hero overflow) | 0 | 1 (small targets, floating btns) | 2 |
| `/event-it` | 1 | 0 | 1 | 2 |
| `/event-it/portfolio` | 1 | 0 | 1 | 2 |
| `/rental` | 1 (hero + product grid) | 0 | 1 | 2 |
| `/blog` | 1 | 0 | 1 | 2 |
| `/cybersecurity-advisory/zero-trust` | 1 | 0 | 1 | 2 |
| `/cybersecurity-advisory/security-automation` | 1 | 0 | 1 | 2 |
| `/cybersecurity-advisory/executive-advisory` | 1 | 0 | 1 | 2 |
| `/services`, `/services/elv` | 0 | 0 | 1 | 1 |
| All other audited pages (`/about`, `/cybersecurity-advisory`, `/cybersecurity-advisory/sase`, `/cybersecurity-advisory/cloud-security`, `/cybersecurity-advisory/knowledge-base`, `/cybersecurity-advisory/[slug]`, `/industries*`, `/event-it/[slug]`, `/rental/[category]`, `/rental/[category]/[product]`, `/blog/[slug]`, `/services/it-consulting*`, `/services/infrastructure`, `/services/managed-it`, `/services/cloud`, `/services/cybersecurity`, `/services/email-solutions`, `/careers`, `/contact`, `/partners`, `/privacy-policy`, `/cookie-policy`, `/terms`) | 0 | 0 | LOW (small tap targets, site-wide nav/footer pattern) | — |

No element was found completely **hidden** behind fixed/sticky bars, and no images lacked responsive sizing classes (`w-full`/`object-cover` are applied everywhere — the bug is that they aren't taking effect on a handful of full-bleed hero images and the advisory "industries" pills).

---

## Worst offenders summary

1. **`/rental`** — worst horizontal overflow (1608px vs 360px viewport, ~4.5x). Hero photo and at least one product card image render near intrinsic pixel widths instead of `100%`.
2. **Full-bleed hero images/video** (`/`, `/event-it`, `/event-it/portfolio`, `/blog`) all share the same root cause: `absolute inset-0 w-full h-full object-cover` elements not actually constrained to 100% width on mobile, each adding 250-1600px of extra horizontal scroll.
3. **Cyber Advisory "Industries We Serve" pills** (`zero-trust`, `security-automation`, `executive-advisory` — all built from the shared `components/site/ServicePageTemplate.jsx`) overflow by 56-103px because long industry-name pills don't wrap/shrink. Fixing the shared template component will likely resolve all three at once (and prevent the same issue on any future advisory sub-page).
4. **Tap-target sizing** is a low-severity, site-wide pattern (nav/footer text links ~17px tall) rather than a page-specific bug.

No JS console errors were observed once the dev server's vendor-chunk cache was warm; an initial run hit a transient `Cannot find module './vendor-chunks/react-icons.js'` dev-server error on several routes, which cleared after a server restart and was unrelated to the application code.
