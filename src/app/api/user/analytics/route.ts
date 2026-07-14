import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = (session.user as any).id

  const [totalDownloads, byPlatform, recentDownloads] = await Promise.all([
    prisma.history.count({ where: { userId } }),
    prisma.history.groupBy({
      by: ['platform'],
      where: { userId },
      _count: true,
    }),
    prisma.history.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const platformBreakdown = byPlatform.map(p => ({
    platform: p.platform,
    count: p._count as number,
  }))

  return NextResponse.json({
    data: {
      totalDownloads,
      platformBreakdown,
      recentDownloads,
    },
  }, { status: 200 })
}
