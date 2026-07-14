import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { priceId, plan } = await req.json()
    if (!priceId || !plan) {
      return NextResponse.json({ error: 'priceId and plan are required' }, { status: 400 })
    }

    const checkoutUrl = `https://checkout.stripe.com/mock?price_id=${priceId}&plan=${plan}&user_id=${session.user.id}`

    return NextResponse.json({ data: { url: checkoutUrl, sessionId: `cs_mock_${Date.now()}` } }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
