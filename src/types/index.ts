export interface MediaInfo {
  url: string
  platform: Platform
  title: string
  thumbnail: string
  duration: number
  formats: Format[]
}

export interface Format {
  quality: string
  label: string
  size: number
  format: string
  hasAudio: boolean
  videoCodec?: string
}

export interface DownloadResult {
  id: string
  title: string
  thumbnail: string
  platform: Platform
  downloadUrl: string
  quality: string
  format: string
  fileSize: number
  expiresAt: number
}

export interface BatchItem {
  id: string
  url: string
  platform?: Platform
  title?: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  downloadUrl?: string
  error?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  plan: 'FREE' | 'PRO' | 'UNLIMITED'
  downloads: number
  referralCode: string
}

export interface AnalyticsData {
  totalDownloads: number
  todayDownloads: number
  totalUsers: number
  activeUsers: number
  platformBreakdown: { platform: string; count: number }[]
  topMedia: { title: string; platform: string; downloads: number }[]
  dailyStats: { date: string; downloads: number }[]
}

export type Platform =
  | 'tiktok'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'pinterest'

export const PLATFORMS: { id: Platform; name: string; color: string; icon: string }[] = [
  { id: 'tiktok', name: 'TikTok', color: '#000000', icon: 'music' },
  { id: 'instagram', name: 'Instagram', color: '#E4405F', icon: 'camera' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: 'play' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', icon: 'facebook' },
  { id: 'twitter', name: 'Twitter / X', color: '#000000', icon: 'twitter' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: 'linkedin' },
  { id: 'pinterest', name: 'Pinterest', color: '#E60023', icon: 'image' },
]
