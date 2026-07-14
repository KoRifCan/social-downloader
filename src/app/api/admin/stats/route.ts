import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string })?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [totalUsers, totalDownloads, recentUsers, recentDownloads, allPlatforms] = await Promise.all([
    prisma.user.count(),
    prisma.history.count(),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.history.findMany({ orderBy: { createdAt: 'desc' }, take: 10, include: { user: { select: { name: true, email: true } } } }),
    prisma.history.findMany({ select: { platform: true } }),
  ])

  const platformCounts: Record<string, number> = {}
  allPlatforms.forEach(h => {
    const p = h.platform.toString()
    platformCounts[p] = (platformCounts[p] || 0) + 1
  })

  const platformBreakdown = Object.entries(platformCounts).map(([platform, count]) => ({ platform, count }))

  return NextResponse.json({
    data: {
      totalUsers,
      totalDownloads,
      platformBreakdown,
      recentUsers,
      recentDownloads,
    },
  }, { status: 200 })
}
