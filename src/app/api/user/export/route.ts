import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const format = req.nextUrl.searchParams.get('format') ?? 'json'
  const items = await prisma.history.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  if (format === 'csv') {
    const headers = 'id,url,platform,title,quality,format,fileSize,createdAt\n'
    const rows = items.map(i =>
      `${i.id},"${i.url}",${i.platform},"${i.title || ''}",${i.quality},${i.format},${i.fileSize || ''},${i.createdAt.toISOString()}`
    ).join('\n')
    return new NextResponse(headers + rows, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="download-history.csv"',
      },
    })
  }

  return NextResponse.json({ data: items }, { status: 200 })
}
