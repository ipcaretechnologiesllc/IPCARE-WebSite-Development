import { ShieldCheck, Award, BadgeCheck, Lock, Clock, BarChart2, Users, Code2, Layers, Search, Headphones, CheckSquare } from 'lucide-react'

const UAE_CREDENTIALS = [
  { icon: ShieldCheck, label: 'ADMCC-Certified',    sub: 'ELV & Security Systems, Abu Dhabi' },
  { icon: Lock,        label: 'NESA / UAE IAS',      sub: 'Compliance-Aligned Delivery' },
  { icon: Award,       label: 'ISO 27001',            sub: 'Aligned Security Practices' },
  { icon: BadgeCheck,  label: 'Microsoft',            sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'AWS',                  sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Palo Alto Networks',   sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Cisco',                sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Fortinet',             sub: 'Certified Partner' },
]

const CANADA_CREDENTIALS = [
  { icon: Lock,        label: 'PIPEDA-Aligned',       sub: 'Privacy-Compliant Delivery' },
  { icon: ShieldCheck, label: 'CASL-Compliant',       sub: 'Consent & Anti-Spam' },
  { icon: Award,       label: 'ISO 27001',             sub: 'Aligned Security Practices' },
  { icon: BadgeCheck,  label: 'Microsoft',             sub: 'Microsoft 365 & Azure' },
  { icon: BadgeCheck,  label: 'AWS',                   sub: 'Cloud Deployment & Support' },
  { icon: BadgeCheck,  label: 'Palo Alto Networks',    sub: 'Network Security' },
  { icon: BadgeCheck,  label: 'Cisco',                 sub: 'Networking & Infrastructure' },
  { icon: BadgeCheck,  label: 'Fortinet',              sub: 'Firewall & SASE' },
]

const DUBAI_CREDENTIALS = [
  { icon: Lock,        label: 'UAE PDPL-Aligned',      sub: 'Data Protection Compliance' },
  { icon: ShieldCheck, label: 'NESA / UAE IAS',         sub: 'Compliance-Aligned Delivery' },
  { icon: Award,       label: 'ISO 27001',              sub: 'Aligned Security Practices' },
  { icon: BadgeCheck,  label: 'Microsoft',              sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'AWS',                    sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Palo Alto Networks',     sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Cisco',                  sub: 'Certified Partner' },
  { icon: BadgeCheck,  label: 'Fortinet',               sub: 'Certified Partner' },
]

// Capability tiles for digital-solutions cluster pages (UAE).
// No certifications, no vendor partner tiers.
const DIGITAL_SOLUTIONS_UAE = [
  { icon: Clock,        label: '20+ Years Experience',        sub: 'Building on the web since 2003' },
  { icon: CheckSquare,  label: '500+ Projects Delivered',     sub: 'Across UAE and beyond' },
  { icon: Users,        label: '200+ Clients Served',         sub: 'From SMEs to enterprise' },
  { icon: Code2,        label: 'In-House Development Team',   sub: 'No outsourcing, no middlemen' },
  { icon: Layers,       label: 'React, Next.js & Node.js',    sub: 'Modern stack, production-ready' },
  { icon: Search,       label: 'SEO-Ready Architecture',      sub: 'Search-structured from day one' },
  { icon: ShieldCheck,  label: 'Secure by Design',            sub: 'HTTPS, hardening, safe data handling' },
  { icon: Headphones,   label: '24/7 Support',                sub: 'We stay on after launch' },
]

/* Reusable trust band — certifications & compliance alignment.
   Used on the homepage and across service pages to close the
   "no visible certifications" trust gap for IT-manager personas.
   When menuGroup === 'digital-solutions', renders capability and
   track-record tiles instead of certification and partner tiers. */
export default function CertificationsBand({ region, menuGroup }) {
  const isDigital = menuGroup === 'digital-solutions'

  if (isDigital) {
    // Today only UAE digital-solutions pages exist.
    // When region === 'canada' variants are built, add a DIGITAL_SOLUTIONS_CANADA
    // set here and select it the same way the standard branch selects CANADA_CREDENTIALS.
    const tiles = DIGITAL_SOLUTIONS_UAE

    return (
      <section style={{ background: '#0B1A46', padding: '72px 24px', borderTop: '3px solid #E87722' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p
              className="uppercase"
              style={{ fontSize: '11px', fontWeight: 700, color: '#E87722', letterSpacing: '3px', marginBottom: '12px' }}
            >
              Why Build With Us
            </p>
            <h2
              className="section-title section-title-white"
              style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              Why Teams Build With Us
            </h2>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiles.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
                style={{
                  padding: '24px 16px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <Icon size={28} style={{ color: '#E87722', marginBottom: '10px' }} strokeWidth={1.8} />
                <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>{label}</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginTop: '4px' }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const CREDENTIALS = region === 'canada' ? CANADA_CREDENTIALS : region === 'dubai' ? DUBAI_CREDENTIALS : UAE_CREDENTIALS
  return (
    <section style={{ background: '#0B1A46', padding: '72px 24px', borderTop: '3px solid #E87722' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            className="uppercase"
            style={{ fontSize: '11px', fontWeight: 700, color: '#E87722', letterSpacing: '3px', marginBottom: '12px' }}
          >
            Certifications &amp; Compliance
          </p>
          <h2
            className="section-title section-title-white"
            style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Credentials Behind Every Engagement
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {CREDENTIALS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center"
              style={{
                padding: '24px 16px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <Icon size={28} style={{ color: '#E87722', marginBottom: '10px' }} strokeWidth={1.8} />
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>{label}</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginTop: '4px' }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
