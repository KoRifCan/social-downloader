import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url, quality, format } = await req.json()
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const videos = [
      { id: 'vid-1', title: 'Sample Video 1', thumbnail: 'https://img.example.com/thumb1.jpg', duration: 185, downloadUrl: `https://dl.example.com/vid1.${format ?? 'mp4'}?q=${quality ?? 'hd'}` },
      { id: 'vid-2', title: 'Sample Video 2', thumbnail: 'https://img.example.com/thumb2.jpg', duration: 242, downloadUrl: `https://dl.example.com/vid2.${format ?? 'mp4'}?q=${quality ?? 'hd'}` },
      { id: 'vid-3', title: 'Sample Video 3', thumbnail: 'https://img.example.com/thumb3.jpg', duration: 198, downloadUrl: `https://dl.example.com/vid3.${format ?? 'mp4'}?q=${quality ?? 'hd'}` },
      { id: 'vid-4', title: 'Sample Video 4', thumbnail: 'https://img.example.com/thumb4.jpg', duration: 315, downloadUrl: `https://dl.example.com/vid4.${format ?? 'mp4'}?q=${quality ?? 'hd'}` },
      { id: 'vid-5', title: 'Sample Video 5', thumbnail: 'https://img.example.com/thumb5.jpg', duration: 167, downloadUrl: `https://dl.example.com/vid5.${format ?? 'mp4'}?q=${quality ?? 'hd'}` },
    ]

    return NextResponse.json({ data: { playlistUrl: url, totalVideos: videos.length, videos } }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to process playlist' }, { status: 500 })
  }
}
