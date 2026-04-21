import Link from 'next/link'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Logo, { UAEFlag, CanadaFlag } from './Logo'

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: 'linear-gradient(180deg, rgba(11,26,70,0.6) 0%, rgba(8,20,52,0.95) 100%)', borderTop: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(14px)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand + offices */}
          <div>
            <Logo size={32}/>
            <p className="text-white/70 text-sm leading-relaxed mt-5">Enterprise IT solutions, cybersecurity advisory, event infrastructure and equipment rental — trusted since 2003.</p>

            <div className="mt-6 space-y-4 text-white/80 text-xs">
              <div>
                <div className="flex items-center gap-2 text-[#F97316] font-semibold text-[11px] uppercase tracking-wider mb-2">
                  <UAEFlag/><span>United Arab Emirates</span>
                </div>
                <div className="flex items-start gap-2"><MapPin size={12} className="text-white/60 mt-0.5 flex-shrink-0"/><span>Salaam Street, Behind Fabrix, P.O. Box 53209, Abu Dhabi, UAE</span></div>
                <div className="flex items-center gap-2 mt-1.5"><Phone size={12} className="text-white/60 flex-shrink-0"/><a href="tel:+97126766935" className="hover:text-white">+971 2 676 6935</a></div>
                <div className="flex items-center gap-2 mt-1.5"><Mail size={12} className="text-white/60 flex-shrink-0"/><a href="mailto:info@ipcare.ae" className="hover:text-white">info@ipcare.ae</a></div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#F97316] font-semibold text-[11px] uppercase tracking-wider mb-2">
                  <CanadaFlag/><span>Canada</span>
                </div>
                <div className="flex items-start gap-2"><MapPin size={12} className="text-white/60 mt-0.5 flex-shrink-0"/><span>1 Concorde Gate, North York, ON, Canada</span></div>
                <div className="flex items-center gap-2 mt-1.5"><Phone size={12} className="text-white/60 flex-shrink-0"/><a href="tel:+14167860782" className="hover:text-white">+1 416 786 0782</a></div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {[Facebook, Linkedin, Instagram].map((Ic, i) => (
                <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#E87722] transition-all" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}><Ic size={15}/></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Enterprise Services</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li><Link href="/services/managed-it" className="hover:text-[#F97316]">Managed IT Services</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-[#F97316]">Cybersecurity</Link></li>
              <li><Link href="/services/elv" className="hover:text-[#F97316]">ELV &amp; Physical Security</Link></li>
              <li><Link href="/services/cloud" className="hover:text-[#F97316]">Cloud Services</Link></li>
              <li><Link href="/services/infrastructure" className="hover:text-[#F97316]">Infrastructure</Link></li>
              <li><Link href="/services/it-consulting" className="hover:text-[#F97316]">IT Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Rental Hub</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              {['Laptops','iPads & Tablets','Event WiFi','Networking Gear','Printers & MFPs','Servers'].map(l => (
                <li key={l}><Link href="/rental" className="hover:text-[#F97316]">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li><Link href="/about" className="hover:text-[#F97316]">About</Link></li>
              <li><Link href="/blog" className="hover:text-[#F97316]">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#F97316]">Careers</Link></li>
              <li><Link href="/partners" className="hover:text-[#F97316]">Partners</Link></li>
              <li><Link href="/services" className="hover:text-[#F97316]">All Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#F97316]">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#F97316]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F97316]">Terms of Service</Link></li>
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
