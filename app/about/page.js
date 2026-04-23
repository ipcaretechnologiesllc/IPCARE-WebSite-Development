import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About IP Care Technologies — Enterprise IT Since 2003 | UAE & Canada',
  description: 'Learn about IP Care Technologies. Since 2003 delivering enterprise IT, cybersecurity and event infrastructure across UAE and Canada. 200+ clients, 500+ projects.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (<><Header /><AboutClient /><Footer /></>)
}
