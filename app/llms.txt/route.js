import { headers } from 'next/headers'

// Mirrors the per-domain canonical strategy in app/layout.js, app/sitemap.js,
// and app/robots.js, so llms.txt links resolve to the correct domain.
const CANONICAL_DOMAINS = {
  'ipcare.ae':       'https://www.ipcare.ae',
  'www.ipcare.ae':   'https://www.ipcare.ae',
  'ipcare.ca':       'https://ipcare.ca',
  'www.ipcare.ca':   'https://ipcare.ca',
  'ipcares.com':     'https://www.ipcare.ae',
  'www.ipcares.com': 'https://www.ipcare.ae',
}
const DEFAULT_BASE = 'https://www.ipcare.ae'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const h = headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')

  const body = `# IP Care Technologies

> Managed IT, cybersecurity, cloud, ELV/physical security, event IT, and IT equipment rental services for businesses in the UAE (Dubai, Abu Dhabi) and Canada.

IP Care Technologies provides end-to-end IT services for organizations of all sizes, including managed IT support, cybersecurity advisory and compliance (NESA, Zero Trust), cloud migration and management (Microsoft 365, Google Workspace), ELV and physical security systems (CCTV, access control, structured cabling), event IT services, and short/long-term IT equipment rental.

## Services
- [Managed IT Services](${BASE}/services/managed-it): Help desk, server/network management, SLA-backed support in Dubai and Abu Dhabi
- [IT Consulting](${BASE}/services/it-consulting): Technology strategy, IT assessment, digital transformation
- [Cybersecurity Services](${BASE}/services/cybersecurity): Endpoint protection, email security, incident response, security assessments
- [Cybersecurity Advisory](${BASE}/cybersecurity-advisory): NESA compliance, Zero Trust advisory, privileged access management
- [Cloud Services](${BASE}/services/cloud): Cloud migration, Microsoft 365, Google Workspace, hybrid email
- [Infrastructure Services](${BASE}/services/infrastructure): Data centre management, virtualization, hardware procurement
- [ELV & Physical Security](${BASE}/services/elv): CCTV, access control, automatic gate barriers, audio/video intercom, public address systems

## Other sections
- [Industries](${BASE}/industries): Sector-specific IT solutions
- [IT Equipment Rental](${BASE}/rental): Short and long-term rental of laptops, servers, networking, and AV equipment
- [Event IT](${BASE}/event-it): On-site IT support and equipment for events
- [Partners](${BASE}/partners): Technology partners and vendor relationships
- [Blog](${BASE}/blog): IT and cybersecurity articles
- [About](${BASE}/about) | [Careers](${BASE}/careers) | [Contact](${BASE}/contact)

## Cornerstone Articles
- [NESA Compliance in 90 Days: What Actually Moves the Needle](${BASE}/blog/nesa-compliance-90-days): Practical roadmap for UAE NESA/IAS compliance
- [NESA vs ISO 27001: Where They Overlap, Where They Don't, and Which to Do First](${BASE}/blog/nesa-vs-iso-27001): Comparing the two compliance frameworks for UAE organizations
- [Inside a NESA Audit: A 5-Day Walkthrough of What Actually Happens](${BASE}/blog/inside-a-nesa-audit): What to expect during a NESA compliance audit
- [Zero Trust in 2026: A Practical Enterprise Roadmap](${BASE}/blog/zero-trust-practical-guide): Implementing Zero Trust architecture for enterprises
- [Building Banking-Regulation-Compliant Cloud on Azure UAE North: A Working Architecture](${BASE}/blog/cb-ibr-cloud-azure-uae-north): Data residency and PDPL-aligned Azure architecture for UAE financial services
- [Choosing a Managed IT Provider in the UAE: 7 Questions to Ask](${BASE}/blog/choosing-managed-it-provider-uae): Evaluation criteria for selecting a managed IT partner
- [Converged Security: Why ELV and Cyber Should Be One Team](${BASE}/blog/elv-converged-security): The case for unifying physical and cybersecurity teams

## Optional
- [Cybersecurity Advisory Services](${BASE}/cybersecurity-advisory): Zero Trust, SASE, and cloud security advisory offerings
- [Event IT Portfolio](${BASE}/event-it/portfolio): Case studies from major events (FIFA, NBA, UFC, EuroLeague)
- [Rental Categories](${BASE}/rental): Laptops, tablets, networking, CCTV, servers and bundle packages
- [Careers](${BASE}/careers): Open roles at IP Care Technologies

## Sitemap
${BASE}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
