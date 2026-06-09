import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'

export const metadata = {
  title: 'Executive Cybersecurity Advisory UAE & Canada | IP Care Technologies',
  description: 'Executive cybersecurity advisory in UAE and Canada. CISO advisory, board-level security strategy, risk communication, cyber risk quantification and investment alignment.',
  alternates: { canonical: '/cybersecurity-advisory/executive-advisory' },
  openGraph: {
    title: 'Executive Cybersecurity Advisory UAE & Canada | IP Care Technologies',
    description: 'Executive cybersecurity advisory. CISO advisory, board-level strategy, risk communication and security programme development.',
    url: '/cybersecurity-advisory/executive-advisory',
    type: 'website',
  },
}

const pageData = {
  h1: 'Executive Cybersecurity Advisory UAE & Canada',
  h1Accent: 'Executive Cybersecurity Advisory',
  icon: 'Briefcase',
  hero: 'Board-level security strategy â€” translate cyber risk to business outcomes.',
  overview: [
    'Cybersecurity is a board-level business risk, not just an IT problem. Executives need to understand cyber risk in business terms, make informed investment decisions and communicate security posture to stakeholders.',
    'IP Care provides executive cybersecurity advisory to CEOs, CFOs, board members and CISOs across UAE and Canada. We translate technical security into strategic business language, quantify cyber risk, build investment business cases and design security programmes aligned to business outcomes.',
    'Our executive advisory engagements span strategy development, risk quantification, board reporting, CISO-as-a-Service and security programme maturity assessment â€” delivered by practitioners who have led security at Fortune 500 scale.',
  ],
  features: [
    { icon: 'Target', title: 'Board-Level Strategy', desc: 'Multi-year cybersecurity roadmaps aligned to business goals, risk appetite and regulatory requirements.' },
    { icon: 'DollarSign', title: 'Cyber Risk Quantification', desc: 'Translate technical risk to financial impact using FAIR methodology and executive-ready dashboards.' },
    { icon: 'Briefcase', title: 'CISO Advisory', desc: 'Strategic guidance for security leaders navigating board expectations, budget priorities and transformation.' },
    { icon: 'FileText', title: 'Board Reporting', desc: 'Executive-ready security reporting with KPIs, risk trends and investment recommendations.' },
    { icon: 'Users', title: 'Security Programme Development', desc: 'Design governance, policies, org structure and operating model for scaled security operations.' },
    { icon: 'TrendingUp', title: 'Investment Alignment', desc: 'Build business cases for security investments tied to measurable risk reduction and business enablement.' },
  ],
  benefits: [
    { icon: 'MessageSquare', t: 'Clear communication', d: 'Board and executives understand cyber risk in business language, not technical jargon.' },
    { icon: 'DollarSign', t: 'Optimized investment', d: 'Security budgets aligned to highest-impact risks with clear ROI and risk reduction metrics.' },
    { icon: 'ShieldCheck', t: 'Reduced liability', d: 'Board fulfils fiduciary duty with evidence-based cyber risk oversight.' },
    { icon: 'TrendingUp', t: 'Business enablement', d: 'Security becomes strategic enabler for digital transformation, not a blocker.' },
  ],
  process: [
    { n: '01', t: 'Assess', d: 'Current security posture, risk landscape, board maturity and stakeholder expectations.' },
    { n: '02', t: 'Quantify', d: 'Translate technical risks to financial impact and build executive-ready risk register.' },
    { n: '03', t: 'Strategize', d: 'Multi-year security roadmap with investment priorities, metrics and governance model.' },
    { n: '04', t: 'Govern', d: 'Ongoing board reporting, risk monitoring and strategic guidance for security leadership.' },
  ],
  industries: ['Financial Services', 'Healthcare', 'Energy', 'Government', 'Manufacturing', 'Technology'],
  faqs: [
    { q: 'What is cyber risk quantification and why does it matter?', a: 'Cyber risk quantification translates technical security risks into financial terms (potential loss in dollars, probability, exposure) using frameworks like FAIR. It matters because boards and executives make decisions in business language, not technical jargon.' },
    { q: 'How do we communicate cyber risk to a non-technical board?', a: 'We use visual dashboards, heat maps and narrative storytelling that connect cyber risks to business outcomes (revenue impact, regulatory penalties, reputational damage) with clear action items and investment recommendations.' },
    { q: 'What is CISO-as-a-Service?', a: 'CISO-as-a-Service provides fractional or interim CISO leadership for organizations that need executive security leadership but are not ready for a full-time hire. It includes strategy, governance, board reporting and team leadership.' },
    { q: 'How do we measure security programme maturity?', a: 'We use frameworks like NIST CSF, CIS Controls and custom maturity models to assess your current security posture across domains (governance, identity, network, data, response) and create a roadmap to target maturity levels.' },
  ],
}

export default function ExecutiveAdvisoryPage() {
  const breadcrumb = [
    { label: 'Cybersecurity Advisory', href: '/cybersecurity-advisory' },
    { label: pageData.h1 },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (pageData.faqs || []).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Cybersecurity Advisory', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory' },
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/executive-advisory' },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageData.h1,
    description: pageData.hero,
    serviceType: 'Cybersecurity Advisory',
    provider: {
      '@type': 'Organization',
      name: 'IP Care Technologies L.L.C.',
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'),
    },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/executive-advisory',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main>
        <ServicePageTemplate
          data={pageData}
          related={[]}
          breadcrumb={breadcrumb}
        />
      </main>
      <Footer />
    </>
  )
}
