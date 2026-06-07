import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { UAEFlag, CanadaFlag } from '@/components/site/Logo'

/**
 * Canonical three-element CTA button block used on every service page CTA band,
 * Event IT, and Rental Hub. Edit here to update all pages simultaneously.
 *
 *  1. Get a Free Quote  →  /contact  (btn-primary / solid orange)
 *  2. UAE  · +971 50 6828290         (btn-ghost)
 *  3. Canada · +1 416 786 0782       (btn-ghost)
 */
export default function CTAPhoneButtons() {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 justify-center">
      <Link href="/contact" className="btn-primary">
        Get a Free Quote <ArrowRight size={16} />
      </Link>
      <a href="tel:+971506828290" className="btn-ghost">
        <UAEFlag /><span className="ml-1 mr-1.5">UAE</span>
        <Phone size={14} className="mr-1" /> +971 50 6828290
      </a>
      <a href="tel:+14167860782" className="btn-ghost">
        <CanadaFlag /><span className="ml-1 mr-1.5">Canada</span>
        <Phone size={14} className="mr-1" /> +1 416 786 0782
      </a>
    </div>
  )
}
