import { useState, useEffect } from 'react'

export const useCartStatus = () => {
  const [cartEnabled, setCartEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        // Try to fetch from a public endpoint first
        const response = await fetch('/api/cart-status')
        if (!response.ok) {
          throw new Error('Failed to fetch cart status')
        }
        const data = await response.json()
        setCartEnabled(data.cartEnabled)
          } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart status')
      // 默认启用购物车，以防API失败
      setCartEnabled(true)
    } finally {
        setLoading(false)
      }
    }

    fetchCartStatus()
  }, [])

  return { cartEnabled, loading, error }
} 