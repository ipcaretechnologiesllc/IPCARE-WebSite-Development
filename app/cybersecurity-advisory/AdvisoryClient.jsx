'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { advisor, platforms, services, trackRecord, tools, kbArticles, caseStudies } from '@/lib/cyber-advisory-data'

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Shield
  return <C {...rest} />
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Advisor avatar (stylized SVG since we don't have a photo)
const AdvisorAvatar = ({ initials = "AB" }) => (
  <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto md:mx-0 flex-shrink-0">
    <div className="absolute inset-0 rounded-full orange-glow"/>
    <div className="absolute inset-1.5 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2847 0%, #0a1028 100%)' }}>
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <defs>
          <radialGradient id={`av-bg-${initials}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1B6CA8" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0a1028" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="128" height="128" fill={`url(#av-bg-${initials})`}/>
        <circle cx="64" cy="50" r="20" fill="#E87722" opacity="0.9"/>
        <path d="M24 120 Q24 80 64 80 Q104 80 104 120 Z" fill="#E87722" opacity="0.9"/>
        <text x="64" y="58" textAnchor="middle" fontSize="22" fontWeight="700" fill="#ffffff" fontFamily="Inter">{initials}</text>
      </svg>
    </div>
  </div>
)

/* ============ 1. HERO ============ */
function Hero() {
  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 premium-grid pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}/>
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 reveal" style={{ background: 'rgba(232,119,34,0.1)', border: '1px solid rgba(232,119,34,0.4)' }}>
            <span className="status-dot"/>
            <span className="mono text-[#E87722] text-xs font-semibold uppercase">The Cyber Adviser × IP Care</span>
          </div>
          <h1 className="premium-h1 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-5xl mx-auto reveal">
            Architecting Enterprise Security<br/>for the Modern Era
          </h1>
          <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto reveal">
            Zero Trust architecture, SASE transformation, and cloud security — delivered by practitioners who have protected 100M+ users at Fortune 500 scale.
          </p>
        </div>

        {/* Advisor profile cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[1200px] mx-auto reveal">
          {/* Attique Bhatti Card */}
          <div className="glass-premium p-8">
            <div className="flex flex-col gap-6 items-center text-center">
              <AdvisorAvatar initials="AB"/>
              <div className="flex-1">
                <div className="mono text-xs text-[#E87722] uppercase tracking-[0.2em] mb-2">Lead Advisor</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">{advisor.name}</h2>
                <div className="text-white/70 text-base mt-1">{advisor.title}</div>
                <p className="body-text text-sm mt-4 leading-relaxed">{advisor.bio}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  {advisor.credentials.map((c) => (
                    <span key={c.label} className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>{c.label}</span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {advisor.certifications.map((c) => (
                    <span key={c} className="mono text-[11px] px-2 py-0.5 rounded text-white/60" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{c}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/#contact" className="btn-primary text-sm">Schedule Consultation <Icons.ArrowRight size={14}/></Link>
                  <a href="https://thecyberadviser.com" target="_blank" rel="noopener" className="btn-ghost text-sm">Visit thecyberadviser.com <Icons.ExternalLink size={12}/></a>
                </div>
              </div>
            </div>
          </div>

          {/* Tanveer Bhatti Card */}
          <div className="glass-premium p-8">
            <div className="flex flex-col gap-6 items-center text-center">
              <AdvisorAvatar initials="TB"/>
              <div className="flex-1">
                <div className="mono text-xs text-[#E87722] uppercase tracking-[0.2em] mb-2">Network Security Consultant</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Tanveer Bhatti</h2>
                <div className="text-white/70 text-base mt-1">Independent Network Security Consultant</div>
                <div className="text-[#E87722] text-sm">Prisma Access & SASE Specialist</div>
                <div className="text-white/60 text-xs mt-1">Milton, Ontario, Canada</div>
                <p className="body-text text-sm mt-4 leading-relaxed">With over 25 years of experience in network security and enterprise IT, Tanveer Bhatti is a CCIE-certified independent network security consultant specialising in Palo Alto Networks Prisma Access and SASE architecture. He brings deep hands-on expertise in Zero Trust Network Access, CASB, DLP, Secure Web Gateway, Remote Browser Isolation, and SD-WAN transformation — delivering complex enterprise security programmes across Canada and globally.</p>
                
                {/* Credential badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  <span className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>25+ Years Experience</span>
                  <span className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>CCIE Certified</span>
                  <span className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>Prisma Access SME</span>
                  <span className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>PAN OS Expert</span>
                </div>

                {/* Specialisation badges - orange */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {['SASE', 'ZTNA', 'CASB', 'DLP', 'SWG', 'RBI', 'PAB', 'Prisma Access', 'Prisma SD-WAN', 'PAN OS'].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(232,119,34,0.15)', border: '1px solid rgba(232,119,34,0.40)', color: '#E87722' }}>{s}</span>
                  ))}
                </div>

                {/* Certification badges - blue */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {['PCNSE', 'PCCSA', 'Prisma Access SASE', 'CNSS', 'Palo Alto Certified Network Security Consultant', 'AlgoSec AppViz', 'AlgoSec ASMS'].map((c) => (
                    <span key={c} className="mono text-[11px] px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(27,108,168,0.20)', border: '1px solid rgba(27,108,168,0.40)', color: '#1B6CA8' }}>{c}</span>
                  ))}
                </div>

                <div className="mt-6">
                  <a href="https://www.linkedin.com/in/tanveer-bhatti-sase-ztna-casb-dlp-swg-rbi-pab-79a01718/" target="_blank" rel="noopener" className="btn-ghost text-sm inline-flex items-center gap-2">
                    <Icons.Linkedin size={16}/> Connect on LinkedIn <Icons.ExternalLink size={12}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ 2. PLATFORMS ============ */
function Platforms() {
  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Platform Expertise</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Advisory Depth Across Enterprise Platforms</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto">Certified, hands-on expertise across the vendors that power modern enterprise security and cloud.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((p, i) => (
            <div key={p.name} className="glass-premium p-6 relative reveal" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-5">
                <div className="mono text-2xl font-bold tracking-tight" style={{ color: p.color }}>{p.vendor}</div>
                <span className="inline-flex items-center text-[10px] uppercase mono tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.35)', color: '#4ade80' }}>
                  <span className="status-dot !w-1.5 !h-1.5 !mr-1.5"/> Active Practice
                </span>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{p.name}</h3>
              <p className="body-text text-xs mono">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 3. SERVICES ============ */
function ServicesGrid() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: 'rgba(3,7,15,0.6)' }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Strategic Practice</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Strategic Security Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/cybersecurity-advisory/${s.slug}`} className="glass-premium p-6 block reveal relative overflow-hidden group" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="absolute top-0 right-0 w-32 h-32 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
              <div className="relative">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}>
                  <Ic name={s.icon} size={22} className="text-[#E87722]"/>
                </div>
                <h3 className="text-white text-base font-semibold mb-2 leading-tight">{s.name}</h3>
                <p className="body-text text-xs mb-4 leading-relaxed">{s.short}</p>
                <span className="inline-flex items-center text-[10px] uppercase mono tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)', color: '#ffd7b8' }}>
                  <span className="status-dot !w-1.5 !h-1.5 !mr-1.5 !bg-[#E87722]"/> In Active Practice
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 4. TRACK RECORD ============ */
function TrackRecord() {
  return (
    <section className="py-16 md:py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.04) 50%, transparent 100%)' }}/>
      </div>
      <div className="max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trackRecord.map((t, i) => (
            <div key={t.l} className="glass-premium p-7 text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-4xl md:text-5xl font-bold text-[#E87722] tracking-tight">{t.n}</div>
              <div className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider mono">{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 5. PHILOSOPHY ============ */
function Philosophy() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Philosophy</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Security as a Strategic Enabler</h2>
        </div>
        <blockquote className="relative mt-12 reveal">
          <div className="absolute -top-4 -left-2 text-[#E87722] text-8xl font-serif leading-none opacity-80 select-none">&ldquo;</div>
          <p className="text-white text-xl md:text-3xl font-medium leading-[1.35] tracking-tight pl-8 md:pl-12">
            Security architecture is not about building walls. It's about enabling secure access to the right resources, for the right people, at the right time.
          </p>
          <footer className="pl-8 md:pl-12 mt-5 mono text-sm text-[#E87722] uppercase tracking-[0.2em]">— Attique Bhatti</footer>
        </blockquote>
        <div className="mt-14 space-y-5 body-text text-base md:text-lg leading-relaxed reveal">
          <p>For two decades, cybersecurity has been framed as a cost of doing business — an expensive, reactive layer bolted onto the network perimeter. That framing is obsolete. In a cloud-native, identity-driven world, security is the foundation that makes modern business possible.</p>
          <p>Our Zero Trust approach puts identity and context at the centre of every access decision. We design architectures where users, devices, workloads and data are continuously verified — not trusted by virtue of network location. The result is a security posture that is both stronger and more flexible, enabling rather than constraining the business.</p>
        </div>
      </div>
    </section>
  )
}

/* ============ 6. TOOLS ============ */
function Tools() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: 'rgba(3,7,15,0.6)' }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Interactive Tools</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Engineering-Grade Calculators</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto">Free tools used by security architects worldwide — hosted on thecyberadviser.com.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((t, i) => (
            <a key={t.name} href={t.href} target="_blank" rel="noopener" className="glass-premium p-7 block reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}>
                  <Ic name={t.icon} size={22} className="text-[#E87722]"/>
                </div>
                <Icons.ExternalLink size={14} className="text-white/40 group-hover:text-[#E87722] transition-colors"/>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{t.name}</h3>
              <p className="body-text text-sm leading-relaxed mb-5">{t.desc}</p>
              <span className="mono text-xs text-[#E87722] uppercase tracking-wider inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Launch Tool <Icons.ArrowUpRight size={14}/></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 7. KNOWLEDGE BASE ============ */
function KnowledgeBase() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Palo Alto', 'Check Point', 'Fortinet', 'Architecture']
  const filtered = filter === 'All' ? kbArticles.slice(0, 6) : kbArticles.filter(a => a.category === filter).slice(0, 6)
  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Knowledge Base</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Field-Tested Insights</h2>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-10 reveal">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`glass-pill mono !text-[11px] !uppercase !tracking-widest ${filter === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, i) => (
            <article key={a.title} className="glass-premium p-6 reveal group cursor-pointer" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(232,119,34,0.1)', border: '1px solid rgba(232,119,34,0.3)', color: '#ffd7b8' }}>{a.category}</span>
                <span className="mono text-[10px] text-white/50">{a.readTime}</span>
              </div>
              <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-6 group-hover:text-[#E87722] transition-colors">{a.title}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="mono text-[10px] text-white/50 uppercase tracking-wider">{a.date}</span>
                <span className="inline-flex items-center gap-1 text-[#1B6CA8] text-xs font-semibold group-hover:gap-2 transition-all">Read <Icons.ArrowRight size={12}/></span>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link href="/cybersecurity-advisory/knowledge-base" className="btn-ghost">Browse Full Knowledge Base <Icons.ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  )
}

/* ============ 8. CASE STUDIES ============ */
function CaseStudies() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Prisma Access', 'Prisma SD-WAN', 'Cortex Operations', 'Network Security']
  const filtered = filter === 'All' ? caseStudies : caseStudies.filter(c => c.tag === filter)
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: 'rgba(3,7,15,0.6)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Case Studies</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Proven at Enterprise Scale</h2>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-10 reveal">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`glass-pill mono !text-[11px] !uppercase !tracking-widest ${filter === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((c, i) => (
            <div key={c.title} className="glass-premium overflow-hidden reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative h-56 overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(1,3,7,0.95) 100%)' }}/>
                <span className="absolute top-4 left-4 mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#E87722', color: '#fff' }}>{c.tag}</span>
                <div className="absolute bottom-4 right-4 flex gap-3 mono text-[11px] text-white/80">
                  <span className="flex items-center gap-1"><Icons.Users size={12}/> {c.users}</span>
                  <span className="flex items-center gap-1"><Icons.Globe2 size={12}/> {c.region}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-bold mb-2">{c.title}</h3>
                <p className="body-text text-sm leading-relaxed">{c.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 9. BOTTOM CTA ============ */
function BottomCTA() {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 premium-grid"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}/>
      </div>
      <div className="max-w-[1000px] mx-auto relative text-center">
        <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Next Step</div>
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-5 reveal">Schedule a Confidential Consultation</h2>
        <p className="body-text text-base md:text-lg max-w-xl mx-auto mb-10 reveal">Thirty minutes with a senior advisor. No sales pitch, no obligation. Just direct, candid guidance on your most pressing security challenges.</p>

        {/* Calendly placeholder */}
        <div className="glass-premium p-8 md:p-10 max-w-2xl mx-auto mb-8 reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}>
              <Icons.CalendarDays size={22} className="text-[#E87722]"/>
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">30-minute consultation</div>
              <div className="mono text-xs text-white/60">Google Meet · Mutual NDA available</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {['Tue 3:00 PM', 'Wed 10:00 AM', 'Thu 2:30 PM'].map((slot, i) => (
              <div key={i} className="px-3 py-3 rounded-lg text-center mono text-xs text-white/80" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>{slot}</div>
            ))}
          </div>
          <Link href="/#contact" className="btn-primary w-full justify-center">Book a Call <Icons.ArrowRight size={16}/></Link>
        </div>

        <div className="flex flex-wrap gap-4 justify-center text-white/50 text-xs mono uppercase tracking-wider reveal">
          <span className="flex items-center gap-1.5"><Icons.Shield size={12}/> NDA Available</span>
          <span className="flex items-center gap-1.5"><Icons.Lock size={12}/> Confidential</span>
          <span className="flex items-center gap-1.5"><Icons.Globe2 size={12}/> Canada & UAE</span>
        </div>
      </div>
    </section>
  )
}

/* ============ MAIN ============ */
export default function AdvisoryClient() {
  useReveal()
  return (
    <main style={{ background: 'radial-gradient(ellipse at 50% 15%, #162347 0%, #0d1b3d 35%, #07102a 65%, #040a18 100%)' }}>
      <Hero />
      <Platforms />
      <ServicesGrid />
      <TrackRecord />
      <Philosophy />
      <Tools />
      <KnowledgeBase />
      <CaseStudies />
      <BottomCTA />
    </main>
  )
}
