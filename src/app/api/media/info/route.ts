import { NextRequest, NextResponse } from 'next/server'
import { detectMedia } from '@/lib/download-engine'

const cache = new Map<string, { data: unknown; expiresAt: number }>()
const CACHE_TTL = 5 * 60 * 1000

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url')
    if (!url) {
      return NextResponse.json({ error: 'url query parameter is required' }, { status: 400 })
    }

    const cached = cache.get(url)
    if (cached && Date.now() < cached.expiresAt) {
      return NextResponse.json({ data: cached.data }, { status: 200 })
    }

    const info = await detectMedia(url)
    if (!info) {
      return NextResponse.json({ error: 'Unsupported platform or invalid URL' }, { status: 400 })
    }

    cache.set(url, { data: info, expiresAt: Date.now() + CACHE_TTL })

    return NextResponse.json({ data: info }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media info' }, { status: 500 })
  }
}
