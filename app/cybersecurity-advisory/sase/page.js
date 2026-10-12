import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services as advisoryServices, kbArticles } from '@/lib/cyber-advisory-data'
import { uaeFocus } from '@/lib/seo-region'
import { ORG_REF, serviceCountries } from '@/lib/schema'

export const revalidate = 3600

// "check point harmony sase uae" (and "... dubai", "... pricing uae") sat at position 15-31
// in the 28 days to 2026-10-09, landing on the /cybersecurity-advisory hub only because its
// partner list says "Harmony". This page never named Check Point, though IP Care is a
// Check Point partner, so it now does in the description, overview and an FAQ.
export const metadata = {
  title: uaeFocus('SASE Transformation Consulting UAE & Canada | IP Care Technologies'),
  description: uaeFocus('SASE consulting in UAE and Canada: Palo Alto Prisma Access, Check Point Harmony SASE, Netskope and Zscaler, with SD-WAN and Zero Trust access.'),
  alternates: { canonical: '/cybersecurity-advisory/sase' },
  openGraph: {
    title: uaeFocus('SASE Transformation Consulting UAE & Canada | IP Care Technologies'),
    description: uaeFocus('SASE transformation consulting in UAE and Canada. Secure Access Service Edge with Prisma Access, Netskope and cloud-delivered security.'),
    url: '/cybersecurity-advisory/sase',
    type: 'website',
  },
}

const pageData = {
  h1: uaeFocus('SASE Transformation Consulting UAE & Canada'),
  h1Accent: 'SASE Transformation',
  icon: 'Cloud',
  hero: 'Secure Access Service Edge, cloud-delivered security for the distributed enterprise.',
  heroImage: '/images/cyber-advisory/sase-transformation-hero.webp',
  heroImageAlt: 'SASE transformation consulting, cloud-delivered security by IP Care',
  heroFullBleed: true,
  overview: [
    'SASE (Secure Access Service Edge) converges networking and security into a single cloud-delivered service. It eliminates the complexity of multiple appliances, VPNs and point solutions, delivering consistent security for users anywhere, on any device.',
    'IP Care designs and deploys SASE architectures with Palo Alto Prisma Access, Check Point Harmony SASE, Netskope and Zscaler. We integrate SD-WAN for intelligent routing, Zero Trust access control, cloud firewall, DLP and advanced threat prevention. All delivered from the cloud edge.',
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
    { q: 'What is the difference between SASE and traditional VPN?', a: 'VPN backhauls traffic through a central data centre, adding latency. SASE delivers security at the cloud edge closest to users, with better performance for SaaS and cloud applications. It also integrates Zero Trust access control that VPN lacks.' },
    { q: 'How long does a SASE transformation take?', a: 'Typical engagements run 4-12 months depending on organization size, number of locations and complexity. We deliver in waves with immediate value from early adopters.' },
    { q: 'Can SASE replace our existing firewalls?', a: 'For most use cases, yes. SASE platforms like Prisma Access deliver cloud firewall capabilities that match or exceed traditional perimeter firewalls. However, some enterprises maintain hybrid models with on-prem firewalls for data centre workloads.' },
    { q: 'Do you deploy Check Point Harmony SASE in the UAE?', a: 'Yes. IP Care is a Check Point partner, and Harmony SASE, the platform Check Point built on its 2023 acquisition of Perimeter 81, is one of the SASE platforms we evaluate and deploy for UAE organisations. It combines Zero Trust network access, a secure web gateway and firewall-as-a-service, and it is a natural candidate where Check Point Quantum firewalls are already in place, because threat prevention and policy stay with one vendor. As with any platform, we confirm the points of presence your users will connect through, the data-handling terms and the licensing model during design, rather than assuming them.' },
    { q: 'Is SASE suitable for UAE organizations with data residency requirements?', a: 'Yes. Prisma Access and Netskope have UAE-region presence to support data residency requirements. We design SASE architectures that align with UAE PDPL and NESA regulations.' },
  ],
}

// Knowledge-base guides whose pillar is this page (Harmony SASE, Prisma Access HA,
// multi-vendor SASE). They linked here but this page never linked back. Rendered on the
// server and passed into the template's spokeGrid slot, between the FAQ and the CTA band.
const sasePillarGuides = kbArticles.filter((a) => a.pillar?.href === '/cybersecurity-advisory/sase')

function SaseGuides() {
  if (!sasePillarGuides.length) return null
  return (
    <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="section-eyebrow">Further Reading</div>
          <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>SASE Guides from Our Advisory Team</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sasePillarGuides.map((a) => (
            <Link key={a.slug} href={`/cybersecurity-advisory/knowledge-base/${a.slug}`} className="service-card p-7 block group">
              <span
                className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase mb-4"
                style={{ letterSpacing: '0.1em', background: 'rgba(232,119,34,0.10)', color: '#B25409' }}
              >
                {a.category}
              </span>
              <h3 className="service-card__title text-base mb-2">{a.title}</h3>
              <p className="service-card__desc text-sm mb-5 leading-relaxed">{a.excerpt}</p>
              <span className="service-card__cta inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2">
                Read the guide <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
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
    provider: ORG_REF,
    areaServed: serviceCountries(),
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
          related={advisoryServices.filter((s) => s.slug !== 'sase').map((s) => ({ slug: `cybersecurity-advisory/${s.slug}`, href: `/cybersecurity-advisory/${s.slug}`, name: s.name, short: s.short, icon: s.icon }))}
          breadcrumb={breadcrumb}
          spokeGrid={<SaseGuides />}
        />
      </main>
      <Footer />
    </>
  )
}
