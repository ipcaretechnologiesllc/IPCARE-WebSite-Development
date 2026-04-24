import { Inter } from 'next/font/google'
import './globals.css'
import RentalShell from '@/components/rental/RentalShell'
import CookieBanner from '@/components/global/CookieBanner'
import Analytics from '@/components/global/Analytics'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-inter' })

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcares.com'
const SITE_NAME = 'IP Care Technologies'
const SITE_TITLE = 'IP Care Technologies — Enterprise IT Solutions UAE & Canada'
const SITE_DESC = 'Managed IT, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada. Trusted since 2003. 24/7 SLA. 100M+ users protected.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | IP Care Technologies',
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
    // opengraph-image.png at /app/app/ is picked up automatically by Next.js
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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IP Care Technologies L.L.C.',
    url: SITE_URL,
    logo: `${SITE_URL}/ipcare-logo.png`,
    foundingDate: '2003',
    description: 'Enterprise IT Solutions, Managed Services, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada.',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+971-2-676-6935', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'AE', availableLanguage: ['English','Arabic'] },
      { '@type': 'ContactPoint', telephone: '+1-416-786-0782', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'CA', availableLanguage: 'English' },
    ],
    address: [
      { '@type': 'PostalAddress', streetAddress: 'Salaam Street, Behind Fabrix', postOfficeBoxNumber: '53209', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
      { '@type': 'PostalAddress', streetAddress: '1 Concorde Gate', addressLocality: 'North York', addressRegion: 'ON', addressCountry: 'CA' },
    ],
    sameAs: [
      'https://www.facebook.com/ipcaretech',
      'https://www.linkedin.com/company/ipcaretech',
      'https://www.instagram.com/ipcaretech',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Default Google Consent Mode v2 state — set BEFORE gtag loads. Analytics denied until user accepts. */}
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});` }} />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <RentalShell>{children}</RentalShell>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
