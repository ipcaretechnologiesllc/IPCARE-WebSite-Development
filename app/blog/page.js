import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'IT Knowledge Base & Insights — IP Care Technologies Blog',
  description: 'Enterprise IT articles on cybersecurity, managed IT, networking, event IT and more. Field-tested insights from IP Care engineers and advisors.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return (<><Header /><BlogClient /><Footer /></>)
}
