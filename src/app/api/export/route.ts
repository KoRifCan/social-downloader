import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const type = req.nextUrl.searchParams.get('type') ?? 'history'
  const format = req.nextUrl.searchParams.get('format') ?? 'json'
  const userId = (session.user as any).id

  if (type === 'analytics') {
    const platformData = await prisma.history.groupBy({
      by: ['platform'],
      where: { userId },
      _count: true,
    })
    const totalDownloads = await prisma.history.count({ where: { userId } })

    const data = {
      totalDownloads,
      platformBreakdown: platformData.map(p => ({ platform: p.platform, count: p._count as number })),
    }

    if (format === 'csv') {
      const csv = 'platform,count\n' + data.platformBreakdown.map(p => `${p.platform},${p.count}`).join('\n')
      return new NextResponse(csv, {
        headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=analytics.csv' },
      })
    }
    return NextResponse.json({ data })
  }

  const history = await prisma.history.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 1000,
  })

  if (format === 'csv') {
    const headers = 'id,url,platform,title,quality,format,createdAt\n'
    const csv = headers + history.map(h =>
      `${h.id},"${h.url}",${h.platform},"${h.title || ''}",${h.quality},${h.format},${h.createdAt.toISOString()}`
    ).join('\n')
    return new NextResponse(csv, {
      headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=history.csv' },
    })
  }

  return NextResponse.json({ data: history })
}
