import type { Metadata, Viewport } from 'next'
export const dynamic = 'force-dynamic'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: {
    default: 'SocialHD Downloader - Download Video Sosial Media HD Tanpa Watermark',
    template: '%s | SocialHD Downloader',
  },
  description: 'Download video HD dari TikTok, Instagram, YouTube, Facebook, Twitter tanpa watermark. Gratis, cepat, kualitas HD 1080p. Downloader online terbaik 2025!',
  keywords: [
    'download tiktok tanpa watermark', 'tiktok downloader', 'instagram video downloader',
    'youtube downloader', 'facebook video downloader', 'twitter video downloader',
    'download video hd', 'social media downloader', 'video downloader online gratis',
  ],
  authors: [{ name: 'SocialHD' }],
  creator: 'SocialHD',
  publisher: 'SocialHD',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'SocialHD Downloader',
    title: 'SocialHD Downloader - Download Video Sosial Media HD Tanpa Watermark',
    description: 'Download video HD dari TikTok, Instagram, YouTube, Facebook, Twitter tanpa watermark. Gratis & cepat!',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialHD Downloader - Download Video HD Tanpa Watermark',
    description: 'Download video HD dari TikTok, Instagram, YouTube, Facebook, Twitter tanpa watermark.',
    images: ['/images/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/icons/apple-icon.png' },
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://social-downloader.vercel.app'),
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
