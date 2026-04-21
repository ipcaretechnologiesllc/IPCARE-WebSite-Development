import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  title: 'IP Care Technologies — Enterprise IT Solutions UAE & Canada',
  description: 'Managed IT, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada. Trusted since 2003. 24/7 SLA. 100M+ users protected.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'IP Care Technologies — Enterprise IT Solutions UAE & Canada',
    description: 'Managed IT, Cybersecurity, Event Infrastructure & Equipment Rental — UAE & Canada',
    url: '/',
    siteName: 'IP Care Technologies',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IP Care Technologies' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'IP Care Technologies', description: 'Enterprise IT Solutions UAE & Canada' },
  robots: { index: true, follow: true },
}

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#07102a' }

export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IP Care Technologies L.L.C.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae',
    logo: '/logo.png',
    foundingDate: '2003',
    description: 'Enterprise IT Solutions, Managed Services, Cybersecurity, Event Infrastructure & Equipment Rental in UAE & Canada.',
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+971-2-676-6935', contactType: 'customer service', email: 'info@ipcare.ae', areaServed: 'AE', availableLanguage: ['English','Arabic'] },
      { '@type': 'ContactPoint', contactType: 'customer service', areaServed: 'CA', availableLanguage: 'English' },
    ],
    address: [
      { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
      { '@type': 'PostalAddress', addressCountry: 'CA' },
    ],
    sameAs: [
      'https://www.facebook.com/ipcaretech',
      'https://www.linkedin.com/company/ipcaretech',
      'https://www.instagram.com/ipcaretech',
    ],
  }
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        {children}
      </body>
    </html>
  )
}
