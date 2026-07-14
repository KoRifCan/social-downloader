export const APP_NAME = 'SocialHD Downloader'
export const APP_DESC = 'Download video HD dari TikTok, Instagram, YouTube, Facebook, Twitter tanpa watermark. Gratis & cepat!'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const PLATFORM_PATTERNS: Record<string, RegExp> = {
  tiktok: /(?:tiktok\.com|vm\.tiktok\.com)/i,
  instagram: /(?:instagram\.com|instagr\.am)/i,
  youtube: /(?:youtube\.com|youtu\.be)/i,
  facebook: /(?:facebook\.com|fb\.com|fb\.watch)/i,
  twitter: /(?:twitter\.com|x\.com)/i,
  linkedin: /linkedin\.com/i,
  pinterest: /(?:pinterest\.com|pin\.it)/i,
}

export const QUALITY_OPTIONS = {
  free: ['720p', '480p', 'audio'],
  pro: ['1080p', '720p', '480p', 'audio'],
  unlimited: ['4k', '1080p', '720p', '480p', 'audio'],
}

export const FORMAT_OPTIONS = ['mp4', 'mp3', 'webm', 'gif']

export const RATE_LIMITS = {
  free: { requests: 5, window: 60000 },
  pro: { requests: 60, window: 60000 },
  unlimited: { requests: 300, window: 60000 },
}

export const FILE_EXPIRY_MS = 3600000 // 1 hour
export const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/api-docs', label: 'API' },
]

export const DASHBOARD_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { href: '/dashboard/history', label: 'History', icon: 'clock' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'bar-chart-3' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
]

export const ADMIN_LINKS = [
  { href: '/admin', label: 'Overview', icon: 'layout-dashboard' },
  { href: '/admin/users', label: 'Users', icon: 'users' },
  { href: '/admin/abuse', label: 'Abuse', icon: 'shield-alert' },
  { href: '/admin/stats', label: 'Stats', icon: 'bar-chart-3' },
  { href: '/admin/logs', label: 'Logs', icon: 'scroll-text' },
]
