export const products = {
  crewforce360: {
    eyebrow: 'OUR PRODUCT',
    h1: 'CrewForce360 Field Workforce Platform',
    h1Accent: 'CrewForce360',
    tagline: 'Run field workforce operations on records you can trust.',
    heroImage: '/images/products/crewforce360-hero.webp',
    heroImageAlt: 'Distributed field sites connected by glowing geofence rings and location pins',
    sectionImage: '/images/products/crewforce360-section.webp',
    sectionImageAlt: 'A rugged smartphone with a glowing orange geofence ring above its screen',
    overview: [
      'CrewForce360 is a field workforce operations platform built by IP Care Technologies. It gives field teams one reliable record of the work: who was on site, which project they worked, what changed, who approved it, and what payroll can trust.',
      'Attendance, projects, supervisors, approvals, exceptions, leave, and payroll-ready exports all connect to the same operational record, so teams stop reconciling spreadsheets and start working from a single source of truth.',
    ],
    capabilities: [
      { label: 'GPS-Verified Check-ins', desc: 'Every punch confirmed by location at the source.' },
      { label: 'Geofence Enforcement', desc: 'Check-ins allowed only inside defined site boundaries.' },
      { label: 'Selfie Validation', desc: 'Identity confirmed at check-in.' },
      { label: 'Project-Linked Shifts', desc: 'Every shift tied to a customer, project, and supervisor.' },
      { label: 'Break & Overtime Tracking', desc: 'Hours resolved before they reach payroll.' },
      { label: 'Missed-Punch Regularization', desc: 'Fix exceptions while the work is fresh.' },
      { label: 'Live Admin Dashboard', desc: 'See who is on site and which projects are active in real time.' },
      { label: 'Role-Based Access', desc: 'Supervisor-scoped views and controlled permissions.' },
      { label: 'Payroll-Ready Exports', desc: 'Structured records with no spreadsheet cleanup.' },
      { label: 'Reports & Analytics', desc: 'Attendance, project, and workforce insight in one place.' },
    ],
    industries: [
      'Construction & Contracting',
      'Manpower & Labor Deployment',
      'Facilities Management',
      'Security Operations',
      'Maintenance & Field Service',
      'Events & Entertainment',
      'IT & System Integration',
    ],
    whyTitle: 'Built by IP Care Technologies',
    why: [
      'CrewForce360 is our own platform, built for field reality rather than office assumptions.',
      'It connects attendance, projects, approvals, exceptions, and payroll handoff in one operational record your team can defend.',
    ],
    faqs: [
      {
        q: 'What does CrewForce360 help field operations teams manage?',
        a: 'It brings attendance, project assignments, supervisor approvals, exceptions, leave, and payroll-ready exports together in one operational record, so field operations teams can manage the full lifecycle of a shift from check-in to payroll without switching tools.',
      },
      {
        q: 'Is CrewForce360 only a time and attendance system?',
        a: 'No. CrewForce360 is a full field workforce operations platform. Time and attendance is one part of it, alongside project linkage, supervisor review, exception handling, and payroll-ready reporting.',
      },
      {
        q: 'How does CrewForce360 make field records more trustworthy?',
        a: 'Every check-in is verified by GPS location, geofence boundaries, and a selfie at the point of capture. Shifts are linked to a specific project and supervisor, exceptions go through regularization, and the resulting audit trail is what makes the record defensible.',
      },
      {
        q: 'Who is CrewForce360 built for?',
        a: 'Project-based field teams across construction, manpower deployment, facilities management, security operations, maintenance, events, and IT system integration, anywhere work happens across distributed sites rather than a single office.',
      },
    ],
    primaryCta: { label: 'Request a Demo', href: 'https://www.crewforce360.com/contact', external: true },
    secondaryCta: { label: 'Visit CrewForce360', href: 'https://www.crewforce360.com/', external: true },
  },
}

export function getProduct(slug) {
  return products[slug] || null
}

export function getAllProductSlugs() {
  return Object.keys(products)
}
