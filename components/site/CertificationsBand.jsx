import { ShieldCheck, Award, BadgeCheck, Lock } from 'lucide-react'

const CREDENTIALS = [
  { icon: ShieldCheck, label: 'ADMCC-Certified', sub: 'ELV & Security Systems, Abu Dhabi' },
  { icon: Lock, label: 'NESA / UAE IAS', sub: 'Compliance-Aligned Delivery' },
  { icon: Award, label: 'ISO 27001', sub: 'Aligned Security Practices' },
  { icon: BadgeCheck, label: 'Microsoft', sub: 'Certified Partner' },
  { icon: BadgeCheck, label: 'AWS', sub: 'Certified Partner' },
  { icon: BadgeCheck, label: 'Palo Alto Networks', sub: 'Certified Partner' },
  { icon: BadgeCheck, label: 'Cisco', sub: 'Certified Partner' },
  { icon: BadgeCheck, label: 'Fortinet', sub: 'Certified Partner' },
]

/* Reusable trust band — certifications & compliance alignment.
   Used on the homepage and across service pages to close the
   "no visible certifications" trust gap for IT-manager personas. */
export default function CertificationsBand() {
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
