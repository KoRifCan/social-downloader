import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { downloadMedia } from '@/lib/download-engine'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { mediaId, quality, format } = await req.json()
    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId is required' }, { status: 400 })
    }

    const result = await downloadMedia(mediaId, quality, format)
    if (!result) {
      return NextResponse.json({ error: 'Failed to process download' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    if (session?.user) {
      const userId = (session.user as any).id
      await prisma.user.update({
        where: { id: userId },
        data: { downloads: { increment: 1 } },
      })
    }

    return NextResponse.json({ data: result }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
