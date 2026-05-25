import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import Logo from './Logo'

const MUTED = '#A0AEBF'

const services = [
  { label: 'Managed IT Services', href: '/services/managed-it' },
  { label: 'Cybersecurity', href: '/services/cybersecurity' },
  { label: 'ELV & Physical Security', href: '/services/elv' },
  { label: 'Cloud Services', href: '/services/cloud' },
  { label: 'Event IT Infrastructure', href: '/event-it' },
  { label: 'Equipment Rental', href: '/rental' },
]

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Knowledge Base', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="pt-16 pb-8 px-6"
      style={{ background: '#0B1A46', borderTop: '3px solid #E87722' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[30fr_20fr_20fr_30fr] gap-10 lg:gap-12 mb-12">
          {/* Column 1 — Brand */}
          <div>
            <Logo size={56} variant="white" />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: MUTED }}>
              Enterprise IT solutions, cybersecurity, event infrastructure and equipment rental. Trusted since 2003.
            </p>

            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTED }}>
              <li>
                <span className="text-white/55">Phone: </span>
                <a href="tel:+971506828290" className="footer-link">+971 50 6828290</a>
              </li>
              <li>
                <span className="text-white/55">Email: </span>
                <a href="mailto:shakeel@ipcare.ae" className="footer-link">shakeel@ipcare.ae</a>
              </li>
              <li>
                <span className="text-white/55">Web: </span>
                <a href="https://www.ipcare.ae" target="_blank" rel="noopener noreferrer" className="footer-link">www.ipcare.ae</a>
              </li>
            </ul>

            <div className="flex items-center mt-6" style={{ gap: '12px' }}>
              {[
                { Ic: FaFacebookF, href: 'https://www.facebook.com/ipcareuae', label: 'Facebook' },
                { Ic: FaLinkedinIn, href: 'https://www.linkedin.com/company/ip-care-technologies', label: 'LinkedIn' },
                { Ic: FaInstagram, href: 'https://www.instagram.com/ipcaretechnologies/', label: 'Instagram' },
              ].map(({ Ic, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon-footer inline-flex items-center justify-center text-white transition-all"
                  style={{
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <Ic size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="space-y-2 text-sm" style={{ color: MUTED }}>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="footer-link">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="space-y-2 text-sm" style={{ color: MUTED }}>
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="footer-link">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get in Touch */}
          <div>
            <h4 className="footer-heading">Get in Touch</h4>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              Ready to build something enterprise-grade?
            </p>
            <Link href="/contact" className="btn-primary mt-4">
              Contact Us <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-6 space-y-3 text-sm" style={{ color: MUTED }}>
              <div>
                <div className="text-white font-semibold text-[13px] mb-0.5">Abu Dhabi, UAE</div>
                <a href="tel:+97126766935" className="footer-link">+971 2 676 6935</a>
              </div>
              <div>
                <div className="text-white font-semibold text-[13px] mb-0.5">Toronto, Canada</div>
                <a href="tel:+14167860782" className="footer-link">+1 416 786 0782</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row md:justify-between items-center gap-3 text-center md:text-left text-[12px]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.10)', color: MUTED }}
        >
          <div>&copy; {year} IP Care Technologies LLC. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms" className="footer-link">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
