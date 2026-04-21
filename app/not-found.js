import Link from 'next/link'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export const metadata = { title: 'Page Not Found (404) | IP Care Technologies' }

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-[700px] w-full text-center glass-card p-10 md:p-14">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.3em] mb-4">Error 404</div>
          <div className="text-[#E87722] font-bold text-8xl md:text-9xl mb-4 mono tracking-tight">404</div>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="body-text mb-8 max-w-md mx-auto">The page you are looking for does not exist or has been moved. Try one of the links below or search the site.</p>

          <form action="/blog" className="flex gap-2 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"/>
              <input name="q" placeholder="Search the site..." className="w-full pl-9 pr-3 py-2.5 rounded-full text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
            </div>
            <button className="btn-primary !px-4">Search</button>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[{ l: 'Home', h: '/' }, { l: 'Services', h: '/services' }, { l: 'Rental Hub', h: '/rental' }, { l: 'Contact', h: '/contact' }].map(x => (
              <Link key={x.l} href={x.h} className="glass-pill justify-center">{x.l}</Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
