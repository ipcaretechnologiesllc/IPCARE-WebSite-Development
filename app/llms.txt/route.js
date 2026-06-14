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

## Sitemap
${BASE}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
