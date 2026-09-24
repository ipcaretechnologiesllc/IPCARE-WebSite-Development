import { Inter } from 'next/font/google'
import './globals.css'
import { SAME_AS, SAME_AS_SOCIAL_ONLY } from '@/lib/social-links'
import { SITE_URL, isCaSite, uaeFocus } from '@/lib/seo-region'
import HreflangLinks from '@/components/site/HreflangLinks'
import RentalShell from '@/components/rental/RentalShell'
import CookieBanner from '@/components/global/CookieBanner'
import Analytics from '@/components/global/Analytics'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-inter' })

// ─── Canonical domain strategy ────────────────────────────────────────────────
// metadataBase is fixed per deployment at BUILD time (SITE_URL, from
// NEXT_PUBLIC_BASE_URL) instead of being read from the request's Host header.
// Reading headers() here opted the entire app out of static rendering, so every
// page was server-rendered on every request. Each Hostinger account builds its own
// copy, so a build-time value is still per-domain. Legacy hosts (apex, ipcares.com)
// 308 to the canonical host in next.config.js before reaching this code.
// Hreflang tags are rendered by components/site/HreflangLinks.jsx.

const SITE_NAME = 'IP Care Technologies'
// Homepage title/description (also the default for any page without its own). On the .ae
// build they lead with Abu Dhabi: the homepage already ranks ~6 for "system integrators in
// abu dhabi" and Google UAE autocomplete shows "it companies / it solutions company in abu
// dhabi", but the old title named no place at all. "IP Care" stays for brand searches.
const SITE_TITLE = isCaSite()
  ? 'Enterprise IT & Managed Services | IP Care Technologies'
  : 'IT Solutions & System Integrator in Abu Dhabi, UAE | IP Care'
const SITE_DESC = isCaSite()
  ? 'Managed IT, Cybersecurity, Cloud, Event IT Infrastructure and Equipment Rental, trusted by leading organisations since 2003.'
  : 'Abu Dhabi-based IT solutions provider and system integrator since 2003: managed IT, cybersecurity, ELV, event IT and IT rental across Dubai and the UAE.'

// ─── Site-wide metadata ──────────────────────────────────────────────────────
// Every child page's RELATIVE `alternates.canonical` resolves against this
// `metadataBase`, so no child page needs host-specific logic.
export const metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  // `creator`/`site` previously pointed at @ipcaretech, which is not an account IP Care
  // owns — attributing the site to a handle we don't control is worse than omitting it.
  // The card type stays: it still controls how links preview when other people share
  // them on X, which works fine without a publisher handle.
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: uaeFocus('Enterprise IT Solutions UAE & Canada'),
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
    // The .ae build leads with the UAE; both offices stay in address/contactPoint below
    // because they are real, so the entity itself is unchanged.
    description: isCaSite()
      ? 'Enterprise IT Solutions, Managed Services, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada.'
      : 'Enterprise IT Solutions, Managed Services, Cybersecurity, Event IT Infrastructure & Equipment Rental in Abu Dhabi, Dubai and across the UAE since 2003.',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+971-2-676-6935', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'AE', availableLanguage: ['English','Arabic'] },
      { '@type': 'ContactPoint', telephone: '+1-416-786-0782', contactType: 'customer service', email: 'info@ipcare.ca', areaServed: 'CA', availableLanguage: 'English' },
    ],
    address: [
      { '@type': 'PostalAddress', streetAddress: 'Salam Street', postOfficeBoxNumber: '53209', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
      { '@type': 'PostalAddress', streetAddress: '40 Wynford Drive, Suite 200B', addressLocality: 'North York', addressRegion: 'ON', postalCode: 'M3C 1J5', addressCountry: 'CA' },
    ],
    sameAs: SAME_AS,
  }

  // LocalBusiness entries — one per physical office. Each is linked back to
  // the Organization via parentOrganization @id so search engines see a single
  // brand entity with two trading locations (helps with Local Pack + Maps eligibility).
  const localBusinessAbuDhabi = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BRAND_URL}/#abu-dhabi`,
    name: 'IP Care Technologies: Abu Dhabi',
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
    geo: { '@type': 'GeoCoordinates', latitude: 24.4947355, longitude: 54.3732241 },
    areaServed: [
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Al Ain' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: ['Managed IT Services', 'Cybersecurity', 'ELV & Physical Security', 'Cloud Services', 'Event IT Infrastructure', 'IT Equipment Rental', 'NESA Compliance', 'ISO 27001'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: SAME_AS,
  }

  const localBusinessToronto = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.ipcare.ca/#toronto',
    name: 'IP Care Technologies: Toronto',
    parentOrganization: { '@id': `${BRAND_URL}#org` },
    image: `${BRAND_URL}/ipcare-logo.png`,
    logo: `${BRAND_URL}/ipcare-logo.png`,
    url: 'https://www.ipcare.ca',
    telephone: '+1-416-786-0782',
    email: 'info@ipcare.ca',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '40 Wynford Drive, Suite 200B',
      addressLocality: 'North York',
      addressRegion: 'ON',
      postalCode: 'M3C 1J5',
      addressCountry: 'CA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 43.7242816, longitude: -79.3357412 },
    areaServed: [
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'Mississauga' },
      { '@type': 'City', name: 'Markham' },
      { '@type': 'AdministrativeArea', name: 'Ontario' },
      { '@type': 'Country', name: 'Canada' },
    ],
    knowsAbout: ['Managed IT Services', 'Cybersecurity Advisory', 'Cloud Services', 'IT Consulting', 'Microsoft 365', 'Zero Trust'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: SAME_AS_SOCIAL_ONLY,
  }

  // No `potentialAction`/SearchAction here: /blog's search box is client-side state
  // only (BlogClient.jsx) and never reads a `q` query param, so a SearchAction target
  // would advertise a URL that doesn't actually filter results. Googlebot was crawling
  // the literal, unresolved `{search_term_string}` placeholder as a real URL
  // (`/blog?q={search_term_string}`), showing up in GSC as duplicate/redirect noise.
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BRAND_URL,
  }

  return (
    <html lang={isCaSite() ? 'en-CA' : 'en-AE'} className={inter.variable}>
      <head>
        {/* Default Google Consent Mode v2 state — set BEFORE gtag loads. Analytics denied until user accepts.
            data-cfasync="false" stops Cloudflare Rocket Loader from deferring this inline script: it must run
            synchronously in <head> so the consent defaults exist before gtag fires. (Ignored when Rocket Loader is off.) */}
        <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});` }} />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Path-aware hreflang alternates — see components/site/HreflangLinks.jsx. */}
        <HreflangLinks />
      </head>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessAbuDhabi) }} />
        {/* Toronto LocalBusiness only on the .ca build. On ipcare.ae it put a Canadian storefront
            on every UAE page; the Organization above still lists the Toronto office. */}
        {isCaSite() && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessToronto) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <RentalShell>{children}</RentalShell>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
