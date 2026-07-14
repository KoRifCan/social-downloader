import { PLATFORM_PATTERNS } from './constants'
import type { Platform } from '@/types'

export function parsePlatform(url: string): { platform: Platform; videoId: string } | null {
  for (const [platform, pattern] of Object.entries(PLATFORM_PATTERNS)) {
    if (pattern.test(url)) {
      const id = extractVideoId(url, platform as Platform)
      if (id) return { platform: platform as Platform, videoId: id }
    }
  }
  return null
}

function extractVideoId(url: string, platform: Platform): string | null {
  try {
    const u = new URL(url)
    switch (platform) {
      case 'tiktok':
        return u.pathname.match(/\/video\/(\d+)/)?.[1] || u.pathname.split('/').filter(Boolean).pop() || null
      case 'instagram':
        return u.pathname.match(/\/(?:p|reel|tv)\/([^/]+)/)?.[1] || null
      case 'youtube':
        return u.searchParams.get('v') || u.pathname.match(/\/shorts\/([^/]+)/)?.[1] || null
      case 'facebook':
        return u.pathname.match(/\/videos\/(\d+)/)?.[1] || u.pathname.match(/\/watch\/?\?v=(\d+)/)?.[1] || u.pathname.split('/').filter(Boolean).pop() || null
      case 'twitter':
        return u.pathname.match(/\/status\/(\d+)/)?.[1] || null
      case 'linkedin':
        return u.pathname.match(/\/feed\/update\/([^/]+)/)?.[1] || u.pathname.match(/\/posts\/([^/]+)/)?.[1] || null
      case 'pinterest':
        return u.pathname.match(/\/(?:pin)\/([^/]+)/)?.[1] || null
      default:
        return null
    }
  } catch {
    return null
  }
}
