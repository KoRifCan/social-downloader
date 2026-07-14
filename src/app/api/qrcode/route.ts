import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'url query parameter is required' }, { status: 400 })
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="white"/>
  <g fill="black">
    ${Array.from({ length: 25 }, (_, i) =>
      Array.from({ length: 25 }, (_, j) => {
        if ((i + j) % 3 === 0 || (i > 8 && i < 16 && j > 8 && j < 16)) {
          return `<rect x="${i * 8}" y="${j * 8}" width="6" height="6"/>`
        }
        return ''
      }).join('')
    ).join('')}
  </g>
  <text x="100" y="195" text-anchor="middle" font-size="8" fill="black">QR for: ${url.length > 30 ? url.slice(0, 27) + '...' : url}</text>
</svg>`

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
