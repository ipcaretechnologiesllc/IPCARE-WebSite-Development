import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CareersClient from './CareersClient'

export const metadata = {
  title: 'Careers at IP Care Technologies \u2014 Join Our Team | UAE & Canada',
  description: 'Join IP Care Technologies. Opportunities across cybersecurity, networking, cloud, event IT and business development in UAE and Canada.',
  alternates: { canonical: '/careers' },
}

export default function CareersPage() {
  return (<><Header /><CareersClient /><Footer /></>)
}
