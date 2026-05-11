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
      // ipcares.com is the legacy/secondary domain. All requests get
      // permanently (308) redirected to the equivalent path on ipcare.ae.
      // We do this at next.config level (edge) rather than in middleware
      // for better performance and to keep middleware focused on pathname injection.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ipcares.com' }],
        destination: 'https://ipcare.ae/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ipcares.com' }],
        destination: 'https://ipcare.ae/:path*',
        permanent: true,
      },

      // Office / location pages → unified Contact page (which has both Abu Dhabi + Toronto offices)
      { source: '/office-location.php', destination: '/contact', permanent: true },
      { source: '/office-locations.php', destination: '/contact', permanent: true },
      { source: '/locations.php', destination: '/contact', permanent: true },
      { source: '/location.php', destination: '/contact', permanent: true },
      { source: '/contact-us.php', destination: '/contact', permanent: true },
      { source: '/contact.php', destination: '/contact', permanent: true },

      // Other common legacy PHP URLs
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/home.php', destination: '/', permanent: true },
      { source: '/about.php', destination: '/about', permanent: true },
      { source: '/about-us.php', destination: '/about', permanent: true },
      { source: '/services.php', destination: '/services', permanent: true },
      { source: '/our-services.php', destination: '/services', permanent: true },
      { source: '/managed-it.php', destination: '/services/managed-it', permanent: true },
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

      // Catch-all: any other .php URL → home (safety net so visitors never see a 404 on legacy links)
      { source: '/:slug(.+)\\.php', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
