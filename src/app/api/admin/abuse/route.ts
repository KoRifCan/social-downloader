import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string })?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get('page') ?? '1'))
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get('limit') ?? '20')))
  const type = req.nextUrl.searchParams.get('type')

  const where: Record<string, unknown> = {}
  if (type) where.type = type

  const [logs, total] = await Promise.all([
    prisma.abuseLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.abuseLog.count({ where }),
  ])

  return NextResponse.json({ data: { logs, total, page, limit, totalPages: Math.ceil(total / limit) } }, { status: 200 })
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string })?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.abuseLog.deleteMany()
  return NextResponse.json({ data: { message: 'All abuse logs cleared' } }, { status: 200 })
}
