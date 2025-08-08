import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/store/cart-status`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_API_KEY || '',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch cart status from backend')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { 
        success: true, 
        cartEnabled: true // 默认启用购物车
      },
      { status: 200 }
    )
  }
} 