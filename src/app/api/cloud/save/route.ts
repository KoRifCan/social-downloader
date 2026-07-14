import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url, service } = await req.json()
    if (!url || !service) {
      return NextResponse.json({ error: 'url and service are required' }, { status: 400 })
    }

    if (!['google-drive', 'dropbox'].includes(service)) {
      return NextResponse.json({ error: 'service must be google-drive or dropbox' }, { status: 400 })
    }

    return NextResponse.json({
      data: {
        success: true,
        url,
        service,
        cloudUrl: `https://${service === 'google-drive' ? 'drive.google.com/file/d/' : 'dropbox.com/s/'}mock_${Date.now()}`,
        note: 'Cloud save is mocked. In production, this would integrate with OAuth APIs.',
      },
    }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to save to cloud' }, { status: 500 })
  }
}
