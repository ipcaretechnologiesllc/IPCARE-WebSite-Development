import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Server component: contextual links from an article to the product, service or sibling
// article it is about. Entries come from lib/related-links.js.
export default function RelatedOnSite({ links, className = 'mt-10' }) {
  if (!links?.length) return null
  return (
    <nav className={`${className} p-6 rounded-2xl`} style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }} aria-label="Related on IP Care">
      <div className="mono text-[12px] uppercase tracking-widest mb-3" style={{ color: '#E87722' }}>Related on IP Care</div>
      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="inline-flex items-center gap-1.5 font-semibold hover:underline" style={{ color: '#0B1A46' }}>
              {label} <ArrowRight size={14} className="text-[#E87722]" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
