"use client"

import { useState, useEffect } from 'react'

interface OrderCountResponse {
  success: boolean
  total_orders: number
}

export const useOrderCount = () => {
  const [orderCount, setOrderCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/order-count')
        const data: OrderCountResponse = await response.json()
        
        console.log('Order count response:', data); // Debug log
        
        if (data.success) {
          setOrderCount(data.total_orders)
        } else {
          setError('Failed to fetch order count')
        }
      } catch (err) {
        setError('Failed to fetch order count')
        console.error('Error fetching order count:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderCount()
  }, [])

  return { orderCount, loading, error }
} 