import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { detectMedia, downloadMedia } from '@/lib/download-engine'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const MAX_BATCH = 10

export async function POST(req: NextRequest) {
  try {
    const { urls, quality, format } = await req.json()
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array is required' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)
    const plan = (session?.user as { plan?: string })?.plan ?? 'free'
    const maxBatch = plan === 'premium' ? 50 : plan === 'pro' ? 25 : MAX_BATCH

    const batch = urls.slice(0, maxBatch)

    const results = await Promise.allSettled(
      batch.map(async (url: string) => {
        const info = await detectMedia(url)
        if (!info) return { url, status: 'error', error: 'Unsupported URL' }
        const download = await downloadMedia(url, quality, format)
        if (!download) return { url, status: 'error', error: 'Download failed' }
        return { url, status: 'success', ...download }
      })
    )

    if (session?.user) {
      await prisma.user.update({
        where: { id: (session.user as any).id },
        data: { downloads: { increment: results.filter(r => r.status === 'fulfilled').length } },
      })
    }

    return NextResponse.json({ data: results.map((r, i) =>
      r.status === 'fulfilled' ? r.value : { url: batch[i], status: 'error', error: r.reason?.message ?? 'Unknown error' }
    )}, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Batch download failed' }, { status: 500 })
  }
}
