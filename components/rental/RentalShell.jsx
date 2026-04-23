'use client'

import { CartProvider } from './CartContext'
import CartDrawer from './CartDrawer'
import FloatingCartButton from './FloatingCartButton'
import WhatsAppButton from '@/components/global/WhatsAppButton'

export default function RentalShell({ children }) {
  return (
    <CartProvider>
      {children}
      <FloatingCartButton />
      <WhatsAppButton />
      <CartDrawer />
    </CartProvider>
  )
}
