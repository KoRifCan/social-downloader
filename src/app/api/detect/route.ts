import { NextRequest, NextResponse } from 'next/server'
import { detectMedia } from '@/lib/download-engine'
import { checkRateLimit } from '@/lib/rate-limiter'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(`detect:${ip}`, 30, 60000)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const info = await detectMedia(url)
    if (!info) {
      return NextResponse.json({ error: 'Unsupported platform or invalid URL' }, { status: 400 })
    }

    return NextResponse.json({ data: info }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to detect media' }, { status: 500 })
  }
}
