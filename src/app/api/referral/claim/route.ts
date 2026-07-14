import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { code } = await req.json()
    if (!code) {
      return NextResponse.json({ error: 'Referral code is required' }, { status: 400 })
    }

    const referral = await prisma.referral.findUnique({ where: { code } })
    if (!referral || referral.used) {
      return NextResponse.json({ error: 'Invalid or already used referral code' }, { status: 400 })
    }

    await prisma.referral.update({
      where: { id: referral.id },
      data: { used: true, claimedBy: session.user.id },
    })

    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, plan: 'PRO', dailyLimit: 60, maxQuality: '1080p', maxBatchSize: 10 },
      update: { plan: 'PRO', dailyLimit: 60, maxQuality: '1080p', maxBatchSize: 10 },
    })

    return NextResponse.json({ data: { message: 'Referral claimed! Plan upgraded to Pro.', plan: 'PRO' } }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to claim referral' }, { status: 500 })
  }
}
