import { NextRequest, NextResponse } from 'next/server'

const VALID_FORMATS = ['mp4', 'mp3', 'webm', 'gif']

export async function POST(req: NextRequest) {
  try {
    const { url, targetFormat } = await req.json()
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    if (!targetFormat || !VALID_FORMATS.includes(targetFormat)) {
      return NextResponse.json({ error: `Invalid format. Supported: ${VALID_FORMATS.join(', ')}` }, { status: 400 })
    }

    return NextResponse.json({
      data: {
        originalUrl: url,
        convertedUrl: url.replace(/\.\w+$/, `.${targetFormat}`),
        targetFormat,
        note: 'Conversion is mocked. In production, this would process the file server-side.',
      },
    }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
