'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react'
import { NAV_LINKS, APP_NAME } from '@/lib/constants'

const footerLinks = {
  Platform: [
    { href: '/tiktok-downloader', label: 'TikTok Downloader' },
    { href: '/instagram-downloader', label: 'Instagram Downloader' },
    { href: '/youtube-downloader', label: 'YouTube Downloader' },
    { href: '/facebook-downloader', label: 'Facebook Downloader' },
    { href: '/twitter-downloader', label: 'Twitter Downloader' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/api-docs', label: 'API Documentation' },
    { href: '/pricing', label: 'Pricing' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: Github, label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="gradient-text text-xl font-bold">
              {APP_NAME}
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Download video HD dari berbagai platform sosial media tanpa watermark. Gratis & cepat!
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
