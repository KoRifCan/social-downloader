import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }

    const body = await req.text()
    let event: { type: string; data: { object: { client_reference_id?: string; subscription?: string; status?: string; customer?: string } } }

    try {
      event = JSON.parse(body)
    } catch {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const userId = event.data.object.client_reference_id
      if (userId) {
        await prisma.subscription.upsert({
          where: { userId },
          create: { userId, plan: 'PRO', status: 'active', dailyLimit: 60, maxQuality: '1080p', maxBatchSize: 10 },
          update: { plan: 'PRO', status: 'active', dailyLimit: 60, maxQuality: '1080p', maxBatchSize: 10 },
        })
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
