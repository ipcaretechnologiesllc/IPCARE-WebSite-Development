const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
  // Permanent redirects for legacy PHP URLs from the previous website.
  // 301 preserves SEO equity from any external backlinks / search index entries.
  async redirects() {
    return [
      // ─── Canonical domain strategy ────────────────────────────────────────
      // www.ipcare.ae is the single canonical host for the UAE site.
      // Non-www ipcare.ae and legacy ipcares.com both 308 to www.ipcare.ae.
      // This keeps canonical tags, sitemap, and redirect all pointing the
      // same direction so Google never has to resolve a mismatch.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ipcare.ae' }],
        destination: 'https://www.ipcare.ae/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ipcares.com' }],
        destination: 'https://www.ipcare.ae/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ipcares.com' }],
        destination: 'https://www.ipcare.ae/:path*',
        permanent: true,
      },

      // Office / location pages → unified Contact page (which has both Abu Dhabi + Toronto offices)
      { source: '/office-location.php', destination: '/contact', permanent: true },
      { source: '/office-locations.php', destination: '/contact', permanent: true },
      { source: '/locations.php', destination: '/contact', permanent: true },
      { source: '/location.php', destination: '/contact', permanent: true },
      { source: '/contact-us.php', destination: '/contact', permanent: true },
      { source: '/contact.php', destination: '/contact', permanent: true },
      { source: '/request-consultation.php', destination: '/contact', permanent: true },

      // Other common legacy PHP URLs
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/home.php', destination: '/', permanent: true },
      { source: '/about.php', destination: '/about', permanent: true },
      { source: '/about-us.php', destination: '/about', permanent: true },
      { source: '/services.php', destination: '/services', permanent: true },
      { source: '/our-services.php', destination: '/services', permanent: true },
      { source: '/managed-it.php', destination: '/services/managed-it', permanent: true },
      { source: '/managed-it-services.php', destination: '/services/managed-it', permanent: true },
      { source: '/cyber-security.php', destination: '/cybersecurity-advisory', permanent: true },
      { source: '/cybersecurity.php', destination: '/cybersecurity-advisory', permanent: true },
      { source: '/event-it.php', destination: '/event-it', permanent: true },
      { source: '/rental.php', destination: '/rental', permanent: true },
      { source: '/equipment-rental.php', destination: '/rental', permanent: true },
      { source: '/blog.php', destination: '/blog', permanent: true },
      { source: '/news.php', destination: '/blog', permanent: true },
      { source: '/careers.php', destination: '/careers', permanent: true },
      { source: '/career.php', destination: '/careers', permanent: true },
      { source: '/partners.php', destination: '/partners', permanent: true },
      { source: '/privacy.php', destination: '/privacy-policy', permanent: true },
      { source: '/privacy-policy.php', destination: '/privacy-policy', permanent: true },
      { source: '/terms.php', destination: '/terms', permanent: true },
      { source: '/terms-conditions.php', destination: '/terms', permanent: true },
      { source: '/terms-and-conditions.php', destination: '/terms', permanent: true },

      // ─── IT Consulting ─────────────────────────────────────────────────
      { source: '/it-consulting.php', destination: '/services/it-consulting', permanent: true },
      { source: '/it-consultancy.php', destination: '/services/it-consulting', permanent: true },
      { source: '/technology-strategy.php', destination: '/services/it-consulting/technology-strategy', permanent: true },
      { source: '/it-assessment.php', destination: '/services/it-consulting/it-assessment', permanent: true },
      { source: '/digital-transformation.php', destination: '/services/it-consulting/digital-transformation', permanent: true },

      // ─── Infrastructure ────────────────────────────────────────────────
      { source: '/infrastructure.php', destination: '/services/infrastructure', permanent: true },
      { source: '/data-center-management.php', destination: '/services/infrastructure/data-centre-management', permanent: true },
      { source: '/data-centre-management.php', destination: '/services/infrastructure/data-centre-management', permanent: true },
      { source: '/data-center.php', destination: '/services/infrastructure/data-centre-management', permanent: true },
      { source: '/virtualization.php', destination: '/services/infrastructure/virtualization', permanent: true },
      { source: '/virtualization-solution.php', destination: '/services/infrastructure/virtualization', permanent: true },
      { source: '/hardware-procurement.php', destination: '/services/infrastructure/hardware-procurement', permanent: true },

      // ─── ELV / Physical Security ───────────────────────────────────────
      { source: '/elv.php', destination: '/services/elv', permanent: true },
      { source: '/elv-solutions.php', destination: '/services/elv', permanent: true },
      { source: '/cctv.php', destination: '/services/elv/cctv-systems', permanent: true },
      { source: '/cctv-systems.php', destination: '/services/elv/cctv-systems', permanent: true },
      { source: '/surveillance.php', destination: '/services/elv/cctv-systems', permanent: true },
      { source: '/surveillance-solutions.php', destination: '/services/elv/cctv-systems', permanent: true },
      { source: '/best-cctv-company-abudhabi.php', destination: '/services/elv/cctv-systems', permanent: true },
      { source: '/access-control.php', destination: '/services/elv/access-control', permanent: true },
      { source: '/access-control-systems.php', destination: '/services/elv/access-control', permanent: true },
      { source: '/gate-barriers.php', destination: '/services/elv/gate-barriers', permanent: true },
      { source: '/gate-barrier.php', destination: '/services/elv/gate-barriers', permanent: true },
      { source: '/automatic-gate-barrier-systems.php', destination: '/services/elv/gate-barriers', permanent: true },
      { source: '/public-address.php', destination: '/services/elv/public-address-systems', permanent: true },
      { source: '/public-address-systems.php', destination: '/services/elv/public-address-systems', permanent: true },
      { source: '/pa-systems.php', destination: '/services/elv/public-address-systems', permanent: true },
      { source: '/intercom.php', destination: '/services/elv/intercom-systems', permanent: true },
      { source: '/intercom-systems.php', destination: '/services/elv/intercom-systems', permanent: true },
      { source: '/video-intercom.php', destination: '/services/elv/intercom-systems', permanent: true },
      { source: '/structured-cabling.php', destination: '/services/elv/structured-cabling', permanent: true },

      // ─── Managed IT ────────────────────────────────────────────────────
      { source: '/network-management.php', destination: '/services/managed-it/network-management', permanent: true },
      { source: '/network-solutions.php', destination: '/services/managed-it/network-management', permanent: true },
      { source: '/server-management.php', destination: '/services/managed-it/server-management', permanent: true },
      { source: '/it-support.php', destination: '/services/managed-it/it-support-helpdesk', permanent: true },
      { source: '/it-support-help-desk.php', destination: '/services/managed-it/it-support-helpdesk', permanent: true },
      { source: '/it-support-helpdesk.php', destination: '/services/managed-it/it-support-helpdesk', permanent: true },
      { source: '/helpdesk.php', destination: '/services/managed-it/it-support-helpdesk', permanent: true },
      { source: '/sla.php', destination: '/services/managed-it/sla', permanent: true },
      { source: '/service-level-agreement.php', destination: '/services/managed-it/sla', permanent: true },
      { source: '/managed-it-abu-dhabi.php', destination: '/services/managed-it/abu-dhabi', permanent: true },

      // ─── Cloud ─────────────────────────────────────────────────────────
      { source: '/cloud.php', destination: '/services/cloud', permanent: true },
      { source: '/cloud-services.php', destination: '/services/cloud', permanent: true },
      { source: '/cloud-server-support.php', destination: '/services/cloud', permanent: true },
      { source: '/cloud-migration.php', destination: '/services/cloud/migration', permanent: true },
      { source: '/migration.php', destination: '/services/cloud/migration', permanent: true },
      { source: '/backup-recovery.php', destination: '/services/cloud/backup-recovery', permanent: true },
      { source: '/disaster-recovery.php', destination: '/services/cloud/backup-recovery', permanent: true },

      // ─── Cybersecurity (service category) ──────────────────────────────
      { source: '/security-assessment.php', destination: '/services/cybersecurity/security-assessment', permanent: true },
      { source: '/vapt.php', destination: '/services/cybersecurity/security-assessment', permanent: true },
      { source: '/incident-response.php', destination: '/services/cybersecurity/incident-response', permanent: true },
      { source: '/compliance.php', destination: '/services/cybersecurity/compliance', permanent: true },
      { source: '/endpoint-protection.php', destination: '/services/cybersecurity/endpoint-protection', permanent: true },
      { source: '/pam.php', destination: '/services/cybersecurity/pam', permanent: true },
      { source: '/privileged-access.php', destination: '/services/cybersecurity/pam', permanent: true },
      { source: '/email-security.php', destination: '/services/cybersecurity/email-security', permanent: true },
      { source: '/microsoft-entra.php', destination: '/services/cybersecurity/microsoft-entra-id', permanent: true },
      { source: '/microsoft-entra-id.php', destination: '/services/cybersecurity/microsoft-entra-id', permanent: true },
      { source: '/azure-ad.php', destination: '/services/cybersecurity/microsoft-entra-id', permanent: true },
      { source: '/nesa-compliance.php', destination: '/services/cybersecurity/nesa-compliance', permanent: true },
      { source: '/nesa.php', destination: '/services/cybersecurity/nesa-compliance', permanent: true },

      // ─── Cybersecurity Advisory (separate hub) ─────────────────────────
      // Short alias used in some marketing materials and email signatures.
      { source: '/cyber-advisory', destination: '/cybersecurity-advisory', permanent: true },
      { source: '/zero-trust.php', destination: '/cybersecurity-advisory/zero-trust', permanent: true },
      { source: '/sase.php', destination: '/cybersecurity-advisory/sase', permanent: true },
      { source: '/cloud-security.php', destination: '/cybersecurity-advisory/cloud-security', permanent: true },
      { source: '/security-automation.php', destination: '/cybersecurity-advisory/security-automation', permanent: true },
      { source: '/executive-advisory.php', destination: '/cybersecurity-advisory/executive-advisory', permanent: true },

      // ─── Email Solutions ───────────────────────────────────────────────
      // Microsoft 365 canonical is /services/cloud/microsoft-365.
      // The email-solutions copy is retired — 308 passes full SEO equity to the canonical.
      { source: '/services/email-solutions/microsoft-365', destination: '/services/cloud/microsoft-365', permanent: true },
      { source: '/email-solutions.php', destination: '/services/email-solutions', permanent: true },
      { source: '/google-workspace.php', destination: '/services/email-solutions/google-workspace', permanent: true },
      { source: '/gsuite.php', destination: '/services/email-solutions/google-workspace', permanent: true },
      { source: '/email-hosting.php', destination: '/services/email-solutions/email-hosting', permanent: true },
      { source: '/best-email-hosting-company-in-uae.php', destination: '/services/email-solutions/email-hosting', permanent: true },
      { source: '/hybrid-email.php', destination: '/services/email-solutions/hybrid', permanent: true },

      // ─── Rental ────────────────────────────────────────────────────────
      { source: '/laptop-rental.php', destination: '/rental/laptops-desktops', permanent: true },
      { source: '/laptops-rental.php', destination: '/rental/laptops-desktops', permanent: true },
      { source: '/desktop-rental.php', destination: '/rental/laptops-desktops', permanent: true },
      { source: '/macbook-rental.php', destination: '/rental/macbooks', permanent: true },
      { source: '/tablet-rental.php', destination: '/rental/tablets-ipads', permanent: true },
      { source: '/ipad-rental.php', destination: '/rental/tablets-ipads', permanent: true },
      { source: '/printer-rental.php', destination: '/rental/printers', permanent: true },
      { source: '/wifi-rental.php', destination: '/rental/event-wifi', permanent: true },
      { source: '/event-wifi.php', destination: '/rental/event-wifi', permanent: true },
      { source: '/event-wifi-and-cctv-rental.php', destination: '/rental/event-wifi', permanent: true },
      { source: '/networking-rental.php', destination: '/rental/networking', permanent: true },
      { source: '/cctv-rental.php', destination: '/rental/cctv', permanent: true },
      { source: '/server-rental.php', destination: '/rental/servers', permanent: true },
      { source: '/testing-equipment-rental.php', destination: '/rental/testing-equipment', permanent: true },
      { source: '/it-infrastructure-rental.php', destination: '/rental', permanent: true },

      // ─── No clean equivalent — route to nearest sensible hub ───────────
      { source: '/mobile-app-development.php', destination: '/services', permanent: true },
      { source: '/web-development.php', destination: '/services', permanent: true },
      { source: '/digital-marketing.php', destination: '/services', permanent: true },
      { source: '/telephony.php', destination: '/services/managed-it/network-management', permanent: true },
      { source: '/telephony-solutions.php', destination: '/services/managed-it/network-management', permanent: true },

      // Internal slug correction — original case-study slug used "pedal" (cycling) before the
      // engagement was correctly identified as "padel" (the racquet sport). 308 preserves any
      // links that may have been shared with the old slug.
      { source: '/event-it/abu-dhabi-pedal-master', destination: '/event-it/abu-dhabi-padel-master', permanent: true },

      // Event slugs that exist in the portfolio data but have no dedicated subpage.
      // The two National Day editions consolidate into one page; USA Basketball and Eid Al Fitr
      // route to the portfolio. Redirects catch any external/cached links or old GSC-indexed URLs.
      { source: '/event-it/uae-national-day-48th',    destination: '/event-it/uae-national-day', permanent: true },
      { source: '/event-it/uae-national-day-49th',    destination: '/event-it/uae-national-day', permanent: true },
      { source: '/event-it/usa-basketball-2024',      destination: '/event-it/portfolio',         permanent: true },
      { source: '/event-it/eid-al-fitr-concert-2023', destination: '/event-it/portfolio',         permanent: true },
      { source: '/event-it/product-launch',            destination: '/event-it/portfolio',          permanent: true },
      { source: '/event-it/nba-global-games',         destination: '/event-it/nba-abu-dhabi-games', permanent: true },

      // Removed blog post — the CCTV cost guide was withdrawn following a positioning
      // change on Dubai physical-security scope. 308 prevents the URL from 404'ing
      // for any cached search or external link.
      { source: '/blog/cctv-installation-cost-dubai', destination: '/blog', permanent: true },

      // Dot-notation variant of the PAM URL (privileged.access.management vs privileged-access-management).
      // Must sit ABOVE the catch-all so the specific rule wins.
      { source: '/privileged.access.management.php', destination: '/services/cybersecurity/pam', permanent: true },

      // Catch-all: any other .php URL → home (safety net so visitors never see a 404 on legacy links)
      { source: '/:slug(.+)\\.php', destination: '/', permanent: true },

      // ─── Rental product 404s (slugs crawled by Google but not in current data) ──
      { source: '/rental/testing-equipment/ekahau-sidekick-2', destination: '/rental/testing-equipment', permanent: true },
      { source: '/rental/testing-equipment/keysight-n9914b',   destination: '/rental/testing-equipment', permanent: true },

      // ─── Legacy WordPress .html pages ────────────────────────────────────────
      // Specific destinations for pages that have a meaningful equivalent.
      { source: '/contact-2.html',           destination: '/contact', permanent: true },
      { source: '/shortcode-blog-post.html', destination: '/blog',    permanent: true },
      { source: '/blog-grid-3.html',         destination: '/blog',    permanent: true },
      { source: '/product-list.html',        destination: '/rental',  permanent: true },
      // Catch-all: index.html, index-2.html, Spanish spam pages, any other .html relic → home
      { source: '/:slug(.+)\\.html', destination: '/', permanent: true },

      // ─── WordPress author / category archive URLs ─────────────────────────────
      { source: '/author/:author', destination: '/about', permanent: true },
      { source: '/category/:cat',  destination: '/blog',  permanent: true },
    ];
  },
};

module.exports = nextConfig;
