# Weekly rank watchlist

The pages reworked on **2026-11-15 and 2026-11-16**, the queries each one was changed for, and the
positions they held **before** the change. `CLAUDE.md` ("Weekly search performance review") says how
to run the check; this file holds the data it compares against and the rules for acting on it.

- **Baseline window:** 2026-10-17 to 2026-11-13 (28 days, `sc-domain:ipcare.ae`, web search, all
  countries). Numbers are average position, with impressions in brackets. Lower is better.
- **Earlier window used for "before":** 2026-09-12 to 2026-10-09. The 17 Oct-13 Nov window already
  includes the 12 and 24 Oct rental changes, so it is the right "before" for the 15-16 Nov work.
- **Volumes are small.** Most queries below have 5-60 impressions per 28 days, so a single query
  moves a lot by chance. Judge a page by its impression-weighted position and by whether several
  queries move the same way, not by one query.
- Update the "Last reviewed" line and the table of results at the bottom each week.

Last reviewed: _never (first meaningful comparison is due 2026-12-06)_

## Blog posts (live 2026-11-15, except segmentation 2026-11-16)

| Page | Queries to watch (baseline position) |
|---|---|
| `/blog/ztna-vs-vpn-remote-access` | "ztna vs vpn" 60.1 (40), "vpn vs ztna" 70.0 (31), "how to migrate from vpn to ztna" 29.5 (10), "is ztna better than vpn" 63.8, "difference between ztna and vpn" 68.4, "replace vpn with ztna" 60.6 |
| `/blog/sd-wan-vs-mpls-uae-enterprises` | "sd wan vs mpls cost" 59.7 (53), "sd wan vs mpls cost comparison" 51.4 (24), "cost of mpls" 48.8 (18). Real AED prices were deliberately not published; adding publishable ranges is the open lever |
| `/blog/sase-vendor-evaluation` | "sase rfp" 20.7 (~294 per 90d), "sase rfi" 37.5, "sase vendors" 15.5, "sase vendor evaluation checklist" 21.4, "rfp template for sase platform" 13.3, "sase vendor selection" 48.2 |
| `/blog/xsiam-vs-legacy-siem` | "legacy siem replacement" 85.0, "siem vs xsiam" 41.0, "xsiam vs siem" 5.5, "palo alto cortex xsiam vs splunk" 10.2 |
| `/blog/network-segmentation-enterprise-event` | "enterprise network segmentation" 41.7, "network segmentation vs vlan" 53.5, "flat network vs segmented network" 4.5, "network micro segmentation" 10.0, "network segmentation solutions" 12.0. **Ignore** the "...event / day / summit / seminar / expo / conference" queries: people want conferences, not this article |

The long AI-style question queries (e.g. "who should consider replacing their current siem with cortex
xsiam?") already rank 1-7 and are not the goal; do not rewrite sections for them.

## Rental pages

| Page | Queries to watch (baseline position) |
|---|---|
| `/rental/laptops-desktops` (avg 24.0) | "rent laptop" 33.9, "laptop hire" 24.1, "laptop at rent" 40.5, "cheap laptop rentals" 24.8, "laptop rental dubai" 23.2 (hub ranks 42.8 for it), "laptop rental" 17.9 |
| `/rental/tablets-ipads` (avg 14.2) | "ipad rental" 15.2, "ipad hire" 18.5, "ipad rental dubai" 6.9, "rent ipad abu dhabi" 5.2, "rent ipad oman" 8.0, "rent ipad doha" 11.5, "rent 4g ipad" 8.5, "giant ipad hire" 36.3 |
| `/rental/printers` (avg 31.7) | "printer rental in abu dhabi" 48.2, "printers for rent" 47.2, "rent printer" 48.9, "photocopier rental in abu dhabi" 63.9, "laser printer rental" 11.0, "color printer rental" 12.1 |
| `/rental/event-wifi` (avg 19.5) | "event wifi rental uae" 5.1, "event wifi rental dubai" 7.5 (0 clicks), "temporary wifi for events" 35.8, "wifi hire" 21.5, "wifi rental dubai" 22.5, "access point rental" 14.9 |
| `/rental/testing-equipment` (avg 18.3, tiny) | "fluke tester rental" 11.8, "fiber tester rental" 23.0 |
| `/rental/testing-equipment/fluke-dsx-5000` | "rent fluke network tester" 40.6 (58; 196 per 90d), "fluke tester rental" 23.9, "fluke network tester rental" 26.0, "fluke rental" 30.0. **Must hold:** "dsx-5000" 4.8, "fluke dsx-5000" 5.3, "cable certifier rental" 4.5 (the title lost the word "Certifier") |
| `/rental/testing-equipment/fiber-splicing-machine` | "rent fusion splicer" 32.6, "fusion splicer rental" 29.9, "splicing machine for rent" 30.4, "rent fiber splicer" 32.0, "fusion splicer hire" 31.8, "fibre splicer hire" 43.8 |
| `/rental/testing-equipment/afl-noyes-m210-otdr` | "afl m210 otdr" 6.9 and "afl m210" 6.6 (0 clicks, brand searches), "otdr rental" 9.8, "fibre otdr hire" 18, "rent otdr" 28 |
| `/rental/tablets-ipads/ipad-pro-13-m4` | **Indexing is the metric**, not rank: Google lists it "Crawled - currently not indexed" (crawled 2026-10-16). Track `coverageState`; meanwhile `/rental/tablets-ipads` takes "ipad pro rental" (~16), "ipad pro rent" (~14), "hire ipad pro" (~17) |

**Controls (not changed, compare against them):** `/rental/macbooks` (avg 8.7), the `/rental` hub
(avg 33.8) and `/services/managed-it/abu-dhabi`. If the controls move the same way as the changed
pages, the cause is the whole site or Google, not our edit.

## Service pages and the advisory hub

| Page | Queries to watch (baseline position) |
|---|---|
| `/cybersecurity-advisory` (661 impr, avg 27.4) | **Must hold:** "zero trust dubai" 9.6 (title changed). Watch: "cyber security services in dubai" 21.9, "cybersecurity solutions dubai" 31.3, "it security dubai" 28.7, "cyber security solutions" 19.9, "cyber security advisory services" ~27, "virtual ciso services uae" 67.5, "zero trust implementation uae" 17.4 |
| `/services/elv` (avg 22.8) | "elv" 13.9 (was 1.6 a window earlier; volatile), "elv system" 23.8, "elv systems" 25.2, "elv design" 17.5, "elv room" 57.4, "elv meaning in cctv" 5.6, "elv systems dubai" 47.6, "elv security systems" 26.4 |
| `/services/managed-it/dubai` (avg 52.1) | **Must hold:** "managed it services dubai" ~33. Watch: "managed it support" 60.5, "managed service providers in dubai" 61.8, "managed it services support" 59.4, "it managed service provider dubai" 56.1, "managed it support solutions dubai" 41.0, "24/7 managed it support" 17.4, "managed it support dubai" 8.4 |

**Looked at and deliberately left alone:** `/services/cybersecurity/dubai` (~78 for "cyber security
services dubai"; already reworked 2026-10-25 with no movement, so authority-limited),
`/services/cybersecurity/abu-dhabi` (~54), `/services/infrastructure/dubai` (~72) and
`/services/managed-it/abu-dhabi` (rising on its own: "managed it services abu dhabi" 33.1 -> 16.3;
re-check in December and only push on-page if it stalls near 16).

## Indexing rework (live 2026-11-25)

| Page | What changed | Metric and re-check |
|---|---|---|
| `/services/digital-marketing/email-marketing` | Commit `2c95e0c`: UAE guide (PDPL consent, SPF/DKIM/DMARC and the Gmail/Yahoo bulk-sender rules, Arabic RTL templates, UAE sending calendar, clicks over opens), a deliverability paragraph, two FAQs and related links to email security and email hosting. 738 -> 1,252 words. Sitemap date bumped, IndexNow sent, Google "Request indexing" confirmed 2026-11-25 ~15:16 UTC | **Indexing is the metric**, not rank. Before: "Crawled - currently not indexed" (last crawl 2026-11-16). Check `coverageState` with `gsc_inspect_url` each week; the first real verdict is due **2026-12-16** (three weeks after the change) |

**Decision on 2026-12-16:** if it is indexed, record it and leave the page alone. If it is still
"Crawled - currently not indexed", stop adding copy and propose consolidating it into
`/services/digital-marketing` (rule 2 below). Decide that together with its siblings
`/services/digital-marketing/seo-services`, `/sem-ppc` and `/social-media-marketing`: all three
were also "Crawled - currently not indexed" on 2026-11-25 (last crawled in September) and were not
changed, so they serve as the controls. If they get indexed too without edits, the cause was not
this rework.

**Not to re-validate:** the 2026-11-16/17 Search Console validations that "failed" for
`/index.html` (apex and www, "Page with redirect"; both correctly redirect to `/`),
`/services/elv/toronto` ("Excluded by noindex"; deliberate on the .ae build) and `/products`
(indexed since its 2026-11-18 crawl). Those reports can only fail for URLs that behave as designed.

## Google indexing requests still owed (as of 2026-11-16)

Manual "Request indexing" is capped at 11 per rolling 24 hours (the 12th gets "Quota Exceeded";
seen 2026-11-15 and 11-16). On 2026-11-16, 18:21-18:32 UTC, 11 requests went to the pages that
dropped the most impressions: digital-transformation, ipad-pro-13-m4, fortianalyzer-fortisiem-integration,
ipad-air-11-m3, ipad-10th-gen, elv/access-control, data-centre-management, dell-latitude-5450,
macbook-pro-14-m4, managed-it/network-management, cybersecurity-advisory/zero-trust.
Next window opens about 2026-11-17 18:35 UTC (22:35 UAE). Still owed, in priority order:
`/services/cloud/backup-recovery`, `/cybersecurity-advisory`, `/services/elv`,
`/rental/testing-equipment/afl-noyes-m210-otdr`. Lower priority, only with a spare slot:
`/blog/network-segmentation-enterprise-event`, `/services/managed-it/dubai`. All were sent to
IndexNow (Bing) and have bumped sitemap dates, so Google will recrawl them regardless.

## How to read the results

1. **Compare** the latest complete 28 days with the baseline above, and the latest 7 days with the
   7 before them for the trend. Count a query only if it has **10 or more impressions** in the
   window; below that, position is noise.
2. **Per page, decide one of:**
   - **Improved** (weighted position better by 3 or more, or two or more watched queries up by 5):
     leave the page alone and record it.
   - **Flat** (within 3) three or more weeks after the change: copy is not the lever. Look at the
     snippet if position is 10 or better with 30+ impressions and CTR under 1%; otherwise
     internal links or the off-page list. Do not add more text unless the built HTML shows a phrase
     gap (see below).
   - **Worse by 5 or more** on a "must hold" query or a head query that was at 15 or better:
     investigate that week. The title or H1 is the usual cause; propose reverting the title only,
     not the body.
   - **Still "Crawled - currently not indexed"** three weeks after a rework: stop adding copy and
     propose consolidating the page into its category page (canonical or merge).
   - **Position over 50 for four weeks:** authority-limited. No more on-page copy; add to the
     off-page list (directory listings, backlinks from partners and vendors, Google Business Profile).
3. **Before writing any new copy**, check which words the built page actually uses (read
   `.next/server/app/<route>.html` after `npm run build`, with scripts stripped) and compare with
   the queries. The biggest gaps found so far were words the page never said ("managed service
   provider", "network tester", "splicing machine", "ELV design"), not missing length.
4. **One change at a time:** leave at least three weeks between edits to the same page, or the next
   comparison cannot tell which edit did what.
5. **Report first, change second.** Produce a short before/after table per page, a decision per
   page and the specific edits proposed. Apply nothing until the user approves, then follow the
   Safety Rules and the deploy steps in `CLAUDE.md`.

## Results log

_Add one row per weekly run: date, pages improved / flat / worse, edits proposed, edits approved._

| Date | Improved | Flat | Worse | Proposed | Approved |
|---|---|---|---|---|---|
| | | | | | |
