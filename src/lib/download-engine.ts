import { type MediaInfo, type Format, type Platform } from '@/types'
import { nanoid } from 'nanoid'

const MOCK_MEDIA: Record<string, MediaInfo> = {}

export async function detectMedia(url: string): Promise<MediaInfo> {
  const { parsePlatform } = await import('./platform-parser')
  const result = parsePlatform(url)
  if (!result) throw new Error('Platform not supported')

  const { platform } = result
  const id = nanoid()
  const title = `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`

  const formats: Format[] = [
    { quality: '1080p', label: 'Full HD', size: 25000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: '720p', label: 'HD', size: 15000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: '480p', label: 'SD', size: 8000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: 'audio', label: 'Audio Only', size: 3000000, format: 'mp3', hasAudio: true },
  ]

  const media: MediaInfo = {
    url,
    platform,
    title: `${title} - ${new Date().toLocaleDateString()}`,
    thumbnail: `https://picsum.photos/seed/${id}/640/360`,
    duration: Math.floor(Math.random() * 180) + 15,
    formats,
  }

  MOCK_MEDIA[id] = media
  return media
}

export async function downloadMedia(
  mediaId: string,
  quality: string,
  format: string
): Promise<{ downloadUrl: string; fileSize: number }> {
  const media = MOCK_MEDIA[mediaId]
  if (!media) throw new Error('Media not found')

  const selectedFormat = media.formats.find(f => f.quality === quality && f.format === format)
  const fileSize = selectedFormat?.size || 15000000

  return {
    downloadUrl: `https://example.com/download/${mediaId}/${quality}/${format}`,
    fileSize,
  }
}

export async function getAvailableFormats(platform: Platform, videoId: string): Promise<Format[]> {
  return [
    { quality: '1080p', label: 'Full HD', size: 25000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: '720p', label: 'HD', size: 15000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: '480p', label: 'SD', size: 8000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: '360p', label: 'Low', size: 4000000, format: 'mp4', hasAudio: true, videoCodec: 'h264' },
    { quality: 'audio', label: 'Audio Only', size: 3000000, format: 'mp3', hasAudio: true },
  ]
}
