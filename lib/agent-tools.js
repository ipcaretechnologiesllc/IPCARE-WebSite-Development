// Public, read-only tools shared by the MCP endpoint (app/mcp/route.js) and the
// in-browser WebMCP registration (components/global/WebMcp.jsx). Everything here is
// information already published on the site — no secrets, no writes, no form submission.
// Keep this module tiny: it is imported by a client component.

const BASE = 'https://www.ipcare.ae'

export const COMPANY = {
  name: 'IP Care Technologies L.L.C.',
  url: BASE,
  founded: 2003,
  phone: '+971-2-676-6935',
  email: 'info@ipcare.ae',
  address: 'Salam Street, P.O. Box 53209, Abu Dhabi, United Arab Emirates',
  hours: 'Monday to Saturday, 09:00 to 18:00 (UAE time)',
  serviceArea: 'Abu Dhabi, Dubai, Sharjah, Al Ain and across the UAE',
  summary:
    'Managed IT, cybersecurity, cloud, ELV and physical security, event IT infrastructure and IT equipment rental for UAE businesses.',
}

export const SERVICES = [
  { name: 'Managed IT Services', url: `${BASE}/services/managed-it`, about: 'Help desk, server and network management, SLA-backed support' },
  { name: 'IT Consulting', url: `${BASE}/services/it-consulting`, about: 'Technology strategy, IT assessment, digital transformation' },
  { name: 'Cybersecurity Services', url: `${BASE}/services/cybersecurity`, about: 'Endpoint protection, email security, incident response, security assessments, NESA compliance' },
  { name: 'Cybersecurity Advisory', url: `${BASE}/cybersecurity-advisory`, about: 'Zero Trust, SASE, privileged access management, executive advisory' },
  { name: 'Cloud Services', url: `${BASE}/services/cloud`, about: 'Cloud migration, Microsoft 365, Google Workspace, backup and recovery' },
  { name: 'Infrastructure Services', url: `${BASE}/services/infrastructure`, about: 'Data centre management, virtualization, hardware procurement' },
  { name: 'ELV and Physical Security', url: `${BASE}/services/elv`, about: 'CCTV, access control, gate barriers, intercom, public address, structured cabling' },
  { name: 'Event IT', url: `${BASE}/event-it`, about: 'Temporary IT infrastructure, event WiFi and on-site support for large events' },
  { name: 'IT Equipment Rental', url: `${BASE}/rental`, about: 'Short and long-term rental of laptops, networking, CCTV, servers and event WiFi' },
  { name: 'Delivery Portfolio', url: `${BASE}/portfolio`, about: 'Enterprise facility, ELV, cabling and network infrastructure projects' },
]

const text = (value) => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] })

export const TOOLS = [
  {
    name: 'get_company_info',
    title: 'Company information',
    description: 'Get IP Care Technologies contact details, address, opening hours and service area.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    run: () => text(COMPANY),
  },
  {
    name: 'list_services',
    title: 'List services',
    description: 'List the IT services IP Care offers, each with a short description and its page URL. Optionally filter by a keyword such as "cctv" or "cloud".',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Optional keyword to filter services.' } },
      additionalProperties: false,
    },
    run: (args = {}) => {
      const q = String(args.query || '').trim().toLowerCase().slice(0, 80)
      const list = q ? SERVICES.filter((s) => `${s.name} ${s.about}`.toLowerCase().includes(q)) : SERVICES
      return text(list.length ? list : { message: 'No match. Call list_services without a query to see everything.', services: SERVICES })
    },
  },
  {
    name: 'get_quote_or_contact_link',
    title: 'How to request a quote',
    description: 'Get the links for requesting an IT equipment rental quote or contacting the IP Care sales team. This does not submit anything; the visitor completes the form themselves.',
    inputSchema: {
      type: 'object',
      properties: { topic: { type: 'string', enum: ['rental-quote', 'general-enquiry'], description: 'What the enquiry is about.' } },
      additionalProperties: false,
    },
    run: (args = {}) => {
      const rental = args.topic === 'rental-quote'
      return text({
        url: rental ? `${BASE}/rental/quote` : `${BASE}/contact`,
        phone: COMPANY.phone,
        email: COMPANY.email,
        note: 'Forms are protected by reCAPTCHA and must be completed by a person.',
      })
    },
  },
]
