import Link from 'next/link'
import { Facebook, Linkedin, Instagram } from 'lucide-react'
import Logo, { UAEFlag, CanadaFlag } from './Logo'

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: '#020614', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo size={32}/>
            <p className="text-white/60 text-sm leading-relaxed mt-5">Enterprise IT solutions, cybersecurity advisory, event infrastructure and equipment rental — trusted since 2003.</p>
            <div className="mt-5 space-y-2 text-white/60 text-xs">
              <div className="flex items-start gap-2"><UAEFlag/><span>Abu Dhabi, United Arab Emirates</span></div>
              <div className="flex items-start gap-2"><CanadaFlag/><span>Toronto, Ontario, Canada</span></div>
            </div>
            <div className="flex gap-3 mt-5">
              {[Facebook, Linkedin, Instagram].map((Ic, i) => (
                <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#E87722] transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Ic size={15}/></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Enterprise Services</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li><Link href="/services/managed-it" className="hover:text-[#E87722]">Managed IT Services</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-[#E87722]">Cybersecurity</Link></li>
              <li><Link href="/services/elv" className="hover:text-[#E87722]">ELV & Physical Security</Link></li>
              <li><Link href="/services/cloud" className="hover:text-[#E87722]">Cloud Services</Link></li>
              <li><Link href="/services/infrastructure" className="hover:text-[#E87722]">Infrastructure</Link></li>
              <li><Link href="/services/it-consulting" className="hover:text-[#E87722]">IT Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Rental Hub</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              {['Laptops','iPads & Tablets','Event WiFi','Networking Gear','Printers & MFPs','Servers'].map(l => (
                <li key={l}><Link href="/#rental" className="hover:text-[#E87722]">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li><Link href="/about" className="hover:text-[#E87722]">About</Link></li>
              <li><Link href="/blog" className="hover:text-[#E87722]">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#E87722]">Careers</Link></li>
              <li><Link href="/partners" className="hover:text-[#E87722]">Partners</Link></li>
              <li><Link href="/services" className="hover:text-[#E87722]">All Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#E87722]">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#E87722]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#E87722]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-white/50 text-xs">
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
