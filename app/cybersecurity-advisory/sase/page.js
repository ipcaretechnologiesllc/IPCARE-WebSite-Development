import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { services as advisoryServices } from '@/lib/cyber-advisory-data'

export const metadata = {
  title: 'SASE Transformation Consulting UAE & Canada | IP Care Technologies',
  description: 'SASE transformation consulting in UAE and Canada. Secure Access Service Edge with Prisma Access, Netskope, SD-WAN integration and remote workforce security.',
  alternates: { canonical: '/cybersecurity-advisory/sase' },
  openGraph: {
    title: 'SASE Transformation Consulting UAE & Canada | IP Care Technologies',
    description: 'SASE transformation consulting in UAE and Canada. Secure Access Service Edge with Prisma Access, Netskope and cloud-delivered security.',
    url: '/cybersecurity-advisory/sase',
    type: 'website',
  },
}

const pageData = {
  h1: 'SASE Transformation Consulting UAE & Canada',
  h1Accent: 'SASE Transformation',
  icon: 'Cloud',
  hero: 'Secure Access Service Edge, cloud-delivered security for the distributed enterprise.',
  heroImage: '/images/cyber-advisory/sase-transformation-hero.webp',
  heroImageAlt: 'SASE transformation consulting, cloud-delivered security by IP Care',
  heroFullBleed: true,
  overview: [
    'SASE (Secure Access Service Edge) converges networking and security into a single cloud-delivered service. It eliminates the complexity of multiple appliances, VPNs and point solutions, delivering consistent security for users anywhere, on any device.',
    'IP Care designs and deploys SASE architectures with Palo Alto Prisma Access, Netskope and Zscaler. We integrate SD-WAN for intelligent routing, Zero Trust access control, cloud firewall, DLP and advanced threat prevention. All delivered from the cloud edge.',
    'Our SASE transformations cover assessment, architecture, pilot deployment, migration planning and managed operations, typically delivered over 4-12 months.',
  ],
  features: [
    { icon: 'Cloud', title: 'Prisma Access Deployment', desc: 'Palo Alto Prisma Access SASE platform with cloud-delivered firewall, Zero Trust access and threat prevention.' },
    { icon: 'Shield', title: 'Netskope & Zscaler', desc: 'Cloud security platforms for CASB, DLP, threat protection and secure web gateway.' },
    { icon: 'Network', title: 'SD-WAN Integration', desc: 'Intelligent routing, WAN optimization and multi-cloud connectivity integrated with security policies.' },
    { icon: 'Users', title: 'Remote Workforce Security', desc: 'Secure access for remote and mobile users without VPN bottlenecks or split-tunnel risks.' },
    { icon: 'Building2', title: 'Branch Transformation', desc: 'Simplify branch office security by moving from on-prem appliances to cloud-delivered SASE.' },
    { icon: 'Gauge', title: 'Performance & Visibility', desc: 'Real-time visibility, application performance monitoring and automated policy enforcement.' },
  ],
  benefits: [
    { icon: 'Zap', t: 'Better performance', d: 'Cloud-edge delivery reduces latency for SaaS and cloud applications compared to backhauling through VPN.' },
    { icon: 'ShieldCheck', t: 'Consistent security', d: 'Unified security policies enforced everywhere, office, home, branch, cloud.' },
    { icon: 'Wallet', t: 'Lower TCO', d: 'Eliminate hardware refresh cycles, reduce MPLS costs and simplify operations.' },
    { icon: 'TrendingUp', t: 'Faster deployment', d: 'Onboard new sites and users in hours, not weeks, with zero hardware shipping.' },
  ],
  process: [
    { n: '01', t: 'Assess', d: 'Current network architecture, application inventory, user distribution and WAN costs.' },
    { n: '02', t: 'Design', d: 'SASE architecture with platform selection, capacity sizing, policy framework and migration plan.' },
    { n: '03', t: 'Pilot', d: 'Proof of concept deployment for selected user groups with performance and security validation.' },
    { n: '04', t: 'Transform', d: 'Wave-based migration across all locations with cutover planning and managed operations.' },
  ],
  industries: ['Banking', 'Retail', 'Professional Services', 'Technology', 'Government', 'Healthcare'],
  faqs: [
    { q: 'What is the difference between SASE and traditional VPN?', a: 'VPN backhau ls traffic through a central data centre, adding latency. SASE delivers security at the cloud edge closest to users, with better performance for SaaS and cloud applications. It also integrates Zero Trust access control that VPN lacks.' },
    { q: 'How long does a SASE transformation take?', a: 'Typical engagements run 4-12 months depending on organization size, number of locations and complexity. We deliver in waves with immediate value from early adopters.' },
    { q: 'Can SASE replace our existing firewalls?', a: 'For most use cases, yes. SASE platforms like Prisma Access deliver cloud firewall capabilities that match or exceed traditional perimeter firewalls. However, some enterprises maintain hybrid models with on-prem firewalls for data centre workloads.' },
    { q: 'Is SASE suitable for UAE organizations with data residency requirements?', a: 'Yes. Prisma Access and Netskope have UAE-region presence to support data residency requirements. We design SASE architectures that align with UAE PDPL and NESA regulations.' },
  ],
}

export default function SASEPage() {
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
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/sase' },
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
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/sase',
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
          related={advisoryServices.filter((s) => s.slug !== 'sase').map((s) => ({ slug: `cybersecurity-advisory/${s.slug}`, name: s.name, short: s.short, icon: s.icon }))}
          breadcrumb={breadcrumb}
        />
      </main>
      <Footer />
    </>
  )
}
