'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { timeline, values } from '@/lib/about-data'

const Ic = ({ name, ...rest }) => { const C = Icons[name] || Icons.Award; return <C {...rest}/> }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function AboutClient() {
  useReveal()
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden" style={{ position: 'relative', zIndex: 0 }}>
        {/* Ambient orbs — matches homepage blue */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #3B7BFF 0%, transparent 70%)' }}/>
          <div className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #1E50A2 0%, transparent 70%)' }}/>
        </div>
        <div className="relative hero-glass max-w-[900px] w-full px-8 md:px-12 py-12 text-center reveal" style={{ zIndex: 1 }}>
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4">About Us</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08]">About IP Care Technologies</h1>
          <p className="body-text mt-5 text-lg max-w-2xl mx-auto">Two decades of enterprise IT excellence across UAE and Canada. 200+ clients, 500+ projects, 100M+ users protected.</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="px-6" style={{ background: '#FFFFFF', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="mono text-xs uppercase mb-3" style={{ color: '#E87722', letterSpacing: '2px' }}>Our Story</div>
            <h2 className="text-3xl md:text-5xl mb-6" style={{ color: '#0D2B55', fontWeight: 700, lineHeight: 1.3, paddingTop: '20px' }}>Powering Business Since 2003</h2>
            <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: '#333F50' }}>
              <p>IP Care Technologies L.L.C. was founded in Abu Dhabi in 2003 with a simple mission: deliver enterprise IT the right way — competent, honest, on time.</p>
              <p>Over two decades we have built deep expertise across managed IT, cybersecurity, event infrastructure, ELV and equipment rental. Our UAE headquarters and Canadian operations deliver 24&times;7 support to enterprise and government clients worldwide.</p>
              <p>Today we are certified partners of Microsoft, HPE, Palo Alto Networks, Cisco, Fortinet and more — with a team of engineers, architects and advisors who take pride in craft.</p>
            </div>
          </div>
          <div className="reveal">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=85" alt="Abu Dhabi skyline at dusk" className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(13,43,85,0.8) 100%)' }}/>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="mono text-xs text-[#E87722] uppercase tracking-[0.2em] mb-2">Abu Dhabi, UAE</div>
                <div className="text-2xl font-bold">Global HQ Since 2003</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Journey</div><h2 className="text-white text-3xl md:text-5xl font-bold">From 2003 to 2026</h2></div>
          <div className="relative">
            {/* Connector line — full row, desktop only (single-row layout) */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.4), transparent)' }}/>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
              {timeline.map((t, i) => (
                <div key={t.year} className="relative reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white font-bold mono mb-4 relative z-10" style={{ background: '#E87722', boxShadow: '0 0 0 5px rgba(232,119,34,0.15)' }}>{t.year}</div>
                  <div className="glass-card p-4 text-center">
                    <h3 className="text-white font-semibold text-sm mb-2 leading-tight break-words">{t.title}</h3>
                    <p className="body-text text-xs leading-relaxed break-words">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-5">
          <div className="glass-card p-10 reveal">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.15)' }}><Icons.Target size={22} className="text-[#E87722]"/></div>
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.2em] mb-2">Mission</div>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">Enable business through better technology.</h3>
            <p className="body-text leading-relaxed">We design, deploy and operate mission-critical IT so our clients can focus on what they do best — running and growing their business.</p>
          </div>
          <div className="glass-card p-10 reveal" style={{ transitionDelay: '100ms' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.15)' }}><Icons.Eye size={22} className="text-[#E87722]"/></div>
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.2em] mb-2">Vision</div>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">The most trusted enterprise IT partner across UAE and Canada.</h3>
            <p className="body-text leading-relaxed">Known for technical excellence, honest counsel and unwavering delivery. We are the team enterprises call when it absolutely has to work.</p>
          </div>
        </div>
      </section>

      {/* Stats light section */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">By the Numbers</div><h2 className="text-[32px] md:text-5xl font-bold" style={{ color: '#0D2B55' }}>Two Decades of Delivery</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
            {[{n:'20+',l:'Years'},{n:'500+',l:'Projects'},{n:'200+',l:'Clients'},{n:'99.9%',l:'Uptime'},{n:'24/7',l:'Support'}].map((s,i,arr)=>(
              <div key={s.l} className="relative px-4 py-6 text-center reveal flex flex-col items-center justify-center" style={{ transitionDelay: `${i*60}ms` }}>
                <div className="font-extrabold leading-none" style={{ color: '#E87722', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)' }}>{s.n}</div>
                <div className="mono uppercase mt-3" style={{ color: '#333F50', fontWeight: 500, fontSize: '13px', letterSpacing: '1.5px' }}>{s.l}</div>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2" style={{ width: '1px', height: '60%', background: 'rgba(232,119,34,0.25)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence (SVG world map) */}
      <section className="py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-12 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Global Presence</div><h2 className="text-white text-3xl md:text-5xl font-bold">Two Regions. One Standard.</h2></div>
          <div className="glass-card p-8 md:p-12 reveal">
            <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto mb-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <path d="M150,180 Q180,140 230,135 T320,140 L380,155 L420,150 L460,170 L510,175 L540,160 L590,155 L640,170 L680,165 L720,180 L770,195 L820,200 L850,220 L850,280 L800,290 L750,280 L700,275 L660,285 L610,295 L560,290 L510,295 L470,305 L430,300 L390,305 L350,295 L310,290 L270,285 L230,275 L200,265 L180,240 L170,210 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(232,119,34,0.3)" strokeWidth="1"/>
                <circle cx="640" cy="225" r="14" fill="#E87722" opacity="0.25"><animate attributeName="r" values="14;30;14" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="640" cy="225" r="7" fill="#E87722"/>
                <text x="640" y="260" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="600">Abu Dhabi</text>
                <circle cx="260" cy="200" r="14" fill="#E87722" opacity="0.25"><animate attributeName="r" values="14;30;14" dur="2s" begin="0.5s" repeatCount="indefinite"/></circle>
                <circle cx="260" cy="200" r="7" fill="#E87722"/>
                <text x="260" y="235" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="600">Toronto</text>
                <path d="M 260 200 Q 450 100 640 225" fill="none" stroke="#E87722" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6"/>
              </svg>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mono text-[#E87722] text-xs uppercase tracking-widest mb-2">UAE HQ</div>
                <h3 className="text-white text-xl font-bold mb-3">Abu Dhabi</h3>
                <div className="space-y-2 text-white/80 text-sm"><div>Salaam Street, Behind Fabrix, P.O. Box 53209</div><div>+971 2 676 6935</div><div>info@ipcare.ae</div><div>Monday – Friday, 9:00 AM – 6:00 PM (GST)</div></div>
              </div>
              <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mono text-[#E87722] text-xs uppercase tracking-widest mb-2">North America</div>
                <h3 className="text-white text-xl font-bold mb-3">Toronto</h3>
                <div className="space-y-2 text-white/80 text-sm"><div>1 Concorde Gate, North York, ON</div><div>+1 416 786 0782</div><div>info@ipcare.ae</div><div>Monday – Friday, 9:00 AM – 6:00 PM (EST)</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Leadership</div><h2 className="text-white text-3xl md:text-5xl font-bold">The Team</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {/* Card 1 - Attique Bhatti */}
            <Link href="/cybersecurity-advisory" className="glass-card p-8 text-center reveal block group hover:border-[#E87722]/40 transition-all" style={{ transitionDelay: '0ms' }}>
              <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-bold text-2xl mono" style={{ background: '#E87722' }}>AB</div>
              <h3 className="text-white font-semibold text-xl mb-1">Attique Bhatti</h3>
              <div className="text-[#E87722] text-xs mono uppercase tracking-wider mb-1">Enterprise Security Consultant</div>
              <div className="text-white/60 text-sm mb-5">The Cyber Adviser</div>
              <div className="grid grid-cols-3 gap-2 mb-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div className="text-white font-bold text-lg">15+</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Years</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">100M+</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Users Protected</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">50+</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Enterprise Engagements</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[#E87722] text-sm mono uppercase tracking-wider group-hover:gap-2.5 transition-all">
                View Profile <Icons.ArrowRight size={14}/>
              </div>
            </Link>

            {/* Card 2 - Tanveer Ahmed */}
            <div className="glass-card p-8 text-center reveal" style={{ transitionDelay: '80ms' }}>
              <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-bold text-2xl mono" style={{ background: '#E87722' }}>TB</div>
              <h3 className="text-white font-semibold text-xl mb-1">Tanveer Ahmed</h3>
              <div className="text-[#E87722] text-xs mono uppercase tracking-wider mb-1">Independent Network Security Consultant</div>
              <div className="text-white/60 text-sm mb-5">Prisma Access & SASE Specialist &mdash; Milton, Ontario, Canada</div>

              <div className="mb-4 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-[10px] text-white/50 mono uppercase tracking-wider mb-2">Specialisations</div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {['SASE','ZTNA','CASB','DLP','SWG','Prisma Access'].map((s) => (
                    <span key={s} className="text-[10px] px-2 py-1 rounded mono" style={{ background: 'rgba(232,119,34,0.12)', color: '#E87722', border: '1px solid rgba(232,119,34,0.25)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <div className="text-[10px] text-white/50 mono uppercase tracking-wider mb-2">Certifications</div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {['PCNSE','PCCSA','CNSS','AlgoSec'].map((c) => (
                    <span key={c} className="text-[10px] px-2 py-1 rounded mono" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div className="text-white font-bold text-lg">25+</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Years</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">CCIE</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Certified</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Prisma</div>
                  <div className="text-[10px] text-white/50 mono uppercase tracking-wider">Access SME</div>
                </div>
              </div>

              <a href="https://www.linkedin.com/in/tanveer-bhatti-sase-ztna-casb-dlp-swg-rbi-pab-79a01718/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#0A66C2] text-sm transition-colors">
                <Icons.Linkedin size={16}/> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Certifications & Partners</div><h2 className="text-white text-2xl md:text-3xl font-bold">Certified Across the Industry</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: 'Microsoft', tier: 'Gold' },
              { name: 'HPE', tier: 'Gold' },
              { name: 'Palo Alto Networks', tier: 'Gold' },
              { name: 'Cisco', tier: 'Gold' },
              { name: 'Fortinet', tier: 'Gold' },
              { name: 'CrowdStrike', tier: 'Silver' },
              { name: 'Check Point', tier: 'Gold' },
              { name: 'Zscaler', tier: 'Authorised' },
              { name: 'Veeam', tier: 'Gold' },
              { name: 'Acronis', tier: 'Silver' },
            ].map((p, i) => {
              const tierStyle = p.tier === 'Gold'
                ? { background: 'rgba(232,119,34,0.15)', color: '#E87722', border: '1px solid rgba(232,119,34,0.4)' }
                : p.tier === 'Silver'
                  ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }
                  : { background: 'rgba(27,108,168,0.18)', color: '#6FB5E8', border: '1px solid rgba(27,108,168,0.5)' }
              return (
                <div key={p.name} className="p-5 text-center reveal flex flex-col items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', transitionDelay: `${i * 40}ms` }}>
                  <div className="text-white text-sm md:text-base font-bold leading-tight">{p.name}</div>
                  <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full" style={tierStyle}>{p.tier}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-12 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">What Drives Us</div><h2 className="text-white text-3xl md:text-5xl font-bold">Our Values</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <div key={v.t} className="glass-card p-6 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)' }}><Ic name={v.icon} size={20} className="text-[#E87722]"/></div>
                <h3 className="text-white font-semibold text-base mb-2">{v.t}</h3>
                <p className="body-text text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto rounded-2xl p-10 md:p-14 text-center reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to work with us?</h2>
          <p className="body-text mb-8">Let’s talk about your next IT project.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">Contact Us <Icons.ArrowRight size={16}/></Link>
            <Link href="/careers" className="btn-ghost">Join the Team</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
