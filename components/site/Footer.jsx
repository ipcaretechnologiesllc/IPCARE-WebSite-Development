import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: '#0B1A46', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand + social */}
          <div>
            <Logo size={56} variant="white"/>
            <p className="text-white/70 text-sm leading-relaxed mt-5">Enterprise IT solutions, cybersecurity advisory, event infrastructure and equipment rental — trusted since 2003.</p>

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
                  <Ic size={20}/>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Enterprise Services</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li><Link href="/services/managed-it" className="hover:text-[#E87722]">Managed IT Services</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-[#E87722]">Cybersecurity</Link></li>
              <li><Link href="/services/elv" className="hover:text-[#E87722]">ELV &amp; Physical Security</Link></li>
              <li><Link href="/services/cloud" className="hover:text-[#E87722]">Cloud Services</Link></li>
              <li><Link href="/services/infrastructure" className="hover:text-[#E87722]">Infrastructure</Link></li>
              <li><Link href="/services/it-consulting" className="hover:text-[#E87722]">IT Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Rental Hub</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              {['Laptops','iPads & Tablets','Event WiFi','Networking Gear','Printers & MFPs','Servers'].map(l => (
                <li key={l}><Link href="/rental" className="hover:text-[#E87722]">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li><Link href="/about" className="hover:text-[#E87722]">About</Link></li>
              <li><Link href="/blog" className="hover:text-[#E87722]">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#E87722]">Careers</Link></li>
              <li><Link href="/partners" className="hover:text-[#E87722]">Partners</Link></li>
              <li><Link href="/services" className="hover:text-[#E87722]">All Services</Link></li>
              <li><Link href="/industries" className="hover:text-[#E87722]">Industries</Link></li>
              <li><Link href="/contact" className="hover:text-[#E87722]">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#E87722]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#E87722]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-white/60 text-xs">
          <div>© {new Date().getFullYear()} IP Care Technologies L.L.C. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
