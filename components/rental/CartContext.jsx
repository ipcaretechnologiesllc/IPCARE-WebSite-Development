'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const CartContext = createContext(null)
const LS_KEY = 'ipcare_quote_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(items)) } catch {}
    }
  }, [items, hydrated])

  const add = useCallback((product, { duration = 'weekly', quantity = 1, startDate = null, endDate = null } = {}) => {
    setItems(prev => {
      const key = `${product.categorySlug}/${product.slug}/${duration}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, {
        key,
        categorySlug: product.categorySlug,
        categoryName: product.categoryName,
        slug: product.slug,
        brand: product.brand,
        model: product.model,
        image: product.image,
        duration,
        quantity,
        startDate,
        endDate,
      }]
    })
    setOpen(true)
  }, [])

  const remove = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }, [])

  const updateQty = useCallback((key, qty) => {
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity: Math.max(1, qty) } : i))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, add, remove, updateQty, clear, open, setOpen, hydrated }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
