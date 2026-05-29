import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import './globals.css'
import RentalShell from '@/components/rental/RentalShell'
import CookieBanner from '@/components/global/CookieBanner'
import Analytics from '@/components/global/Analytics'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-inter' })

// ─── Canonical domain strategy ────────────────────────────────────────────────
// Each request's incoming `host` header maps to ONE canonical domain.
// `ipcares.com` is the legacy domain — it 308-redirects at the edge to ipcare.ae
// (see next.config.js), but if a request still arrives here we canonicalise it
// to ipcare.ae anyway so any cached/proxied HTML still points to the right place.
const CANONICAL_DOMAINS = {
  'ipcare.ae':       'https://www.ipcare.ae',
  'www.ipcare.ae':   'https://www.ipcare.ae',
  'ipcare.ca':       'https://ipcare.ca',
  'www.ipcare.ca':   'https://ipcare.ca',
  'ipcares.com':     'https://www.ipcare.ae',
  'www.ipcares.com': 'https://www.ipcare.ae',
}
const DEFAULT_CANONICAL = 'https://www.ipcare.ae'

// Per-domain hreflang regions. ipcares.com is intentionally absent because it
// always redirects to ipcare.ae — Google should index the destinations only.
const HREFLANG_TARGETS = [
  { lang: 'en-AE',     domain: 'https://www.ipcare.ae' },
  { lang: 'en-CA',     domain: 'https://ipcare.ca' },
  { lang: 'x-default', domain: 'https://www.ipcare.ae' },
]

function readHostAndPath() {
  const h = headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const pathname = h.get('x-pathname') || '/'
  const canonicalBase = CANONICAL_DOMAINS[rawHost] || DEFAULT_CANONICAL
  return { rawHost, pathname, canonicalBase }
}

const SITE_NAME = 'IP Care Technologies'
const SITE_TITLE = 'IP Care Technologies — Enterprise IT Solutions UAE & Canada'
const SITE_DESC = 'Managed IT, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada. Trusted since 2003. 24/7 SLA. 100M+ users protected.'

// ─── Dynamic metadata — host-aware canonicals ────────────────────────────────
// Replaces the previous static `metadata` export. Every existing child-page
// metadata (which uses RELATIVE `alternates.canonical`) automatically resolves
// against this dynamic `metadataBase`, so no child page needs to be touched.
export async function generateMetadata() {
  const { canonicalBase } = readHostAndPath()
  return {
    metadataBase: new URL(canonicalBase),
    title: {
      default: SITE_TITLE,
      // Pages already include the brand suffix in their own title strings,
      // so the template is a pass-through to avoid "… | IP Care | IP Care" duplication.
      template: '%s',
    },
    description: SITE_DESC,
    applicationName: SITE_NAME,
    authors: [{ name: 'IP Care Technologies L.L.C.' }],
    keywords: [
      'IT services UAE', 'Managed IT Abu Dhabi', 'Cybersecurity UAE', 'SASE UAE',
      'Zero Trust', 'Event IT Infrastructure', 'Equipment Rental UAE', 'Laptop Rental Dubai',
      'IT consulting UAE', 'Data center UAE', 'Event WiFi Dubai', 'IP Care',
    ],
    category: 'technology',
    creator: 'IP Care Technologies',
    publisher: 'IP Care Technologies',
    alternates: { canonical: canonicalBase + '/' },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESC,
      url: '/',
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: 'Enterprise IT Solutions UAE & Canada',
      creator: '@ipcaretech',
      site: '@ipcaretech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: ['/icon.png'],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    verification: {
      // Add Google Search Console / Bing verification tokens here when available
      // google: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    },
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F245F' },
    { media: '(prefers-color-scheme: dark)', color: '#0F245F' },
  ],
}

export default function RootLayout({ children }) {
  const { canonicalBase, pathname } = readHostAndPath()

  // JSON-LD schemas — use the canonical brand domain so search engines see
  // a single authoritative Organization/WebSite entity regardless of which
  // domain mirror the request landed on.
  const BRAND_URL = 'https://www.ipcare.ae'
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BRAND_URL}#org`,
    name: 'IP Care Technologies L.L.C.',
    url: BRAND_URL,
    logo: `${BRAND_URL}/ipcare-logo.png`,
    foundingDate: '2003',
    description: 'Enterprise IT Solutions, Managed Services, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada.',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+971-2-676-6935', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'AE', availableLanguage: ['English','Arabic'] },
      { '@type': 'ContactPoint', telephone: '+1-416-786-0782', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'CA', availableLanguage: 'English' },
    ],
    address: [
      { '@type': 'PostalAddress', streetAddress: 'Salam Street', postOfficeBoxNumber: '53209', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
      { '@type': 'PostalAddress', streetAddress: '1 Concorde Gate', addressLocality: 'North York', addressRegion: 'ON', addressCountry: 'CA' },
    ],
    sameAs: [
      'https://www.facebook.com/ipcaretech',
      'https://www.linkedin.com/company/ipcaretech',
      'https://www.instagram.com/ipcaretech',
    ],
  }

  // LocalBusiness entries — one per physical office. Each is linked back to
  // the Organization via parentOrganization @id so search engines see a single
  // brand entity with two trading locations (helps with Local Pack + Maps eligibility).
  const localBusinessAbuDhabi = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BRAND_URL}#abu-dhabi`,
    name: 'IP Care Technologies — Abu Dhabi',
    parentOrganization: { '@id': `${BRAND_URL}#org` },
    image: `${BRAND_URL}/ipcare-logo.png`,
    logo: `${BRAND_URL}/ipcare-logo.png`,
    url: BRAND_URL,
    telephone: '+971-2-676-6935',
    email: 'info@ipcare.ae',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salam Street',
      postOfficeBoxNumber: '53209',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 24.4764, longitude: 54.3705 },
    areaServed: [
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Al Ain' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: ['Managed IT Services', 'Cybersecurity', 'ELV & Physical Security', 'Cloud Services', 'Event IT Infrastructure', 'IT Equipment Rental', 'NESA Compliance', 'ISO 27001', 'ADMCC Certified Installer (Abu Dhabi Monitoring and Control Centre)'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: [
      'https://www.facebook.com/ipcaretech',
      'https://www.linkedin.com/company/ipcaretech',
      'https://www.instagram.com/ipcaretech',
    ],
  }

  const localBusinessToronto = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://ipcare.ca#toronto',
    name: 'IP Care Technologies — Toronto',
    parentOrganization: { '@id': `${BRAND_URL}#org` },
    image: `${BRAND_URL}/ipcare-logo.png`,
    logo: `${BRAND_URL}/ipcare-logo.png`,
    url: 'https://ipcare.ca',
    telephone: '+1-416-786-0782',
    email: 'info@ipcare.ae',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Concorde Gate',
      addressLocality: 'North York',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 43.7299, longitude: -79.3309 },
    areaServed: [
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'Mississauga' },
      { '@type': 'City', name: 'Markham' },
      { '@type': 'AdministrativeArea', name: 'Ontario' },
      { '@type': 'Country', name: 'Canada' },
    ],
    knowsAbout: ['Managed IT Services', 'Cybersecurity Advisory', 'Cloud Services', 'IT Consulting', 'Microsoft 365', 'Zero Trust'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: [
      'https://www.facebook.com/ipcaretech',
      'https://www.linkedin.com/company/ipcaretech',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BRAND_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BRAND_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Default Google Consent Mode v2 state — set BEFORE gtag loads. Analytics denied until user accepts. */}
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});` }} />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Path-aware hreflang alternates — rendered here (not via metadata.alternates.languages)
            because Next.js shallow-merges `metadata.alternates`, so any child page that sets its
            own `alternates.canonical` would otherwise wipe out the languages map. Rendering them
            as raw <link> tags guarantees they appear on every page. */}
        {HREFLANG_TARGETS.map(({ lang, domain }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`${domain}${pathname}`} />
        ))}
      </head>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessAbuDhabi) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessToronto) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <RentalShell>{children}</RentalShell>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
