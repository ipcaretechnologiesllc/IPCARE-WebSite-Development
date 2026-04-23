'use client'

import { CartProvider } from './CartContext'
import CartDrawer from './CartDrawer'
import FloatingCartButton from './FloatingCartButton'

export default function RentalShell({ children }) {
  return (
    <CartProvider>
      {children}
      <FloatingCartButton />
      <CartDrawer />
    </CartProvider>
  )
}
