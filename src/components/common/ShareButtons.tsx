'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Twitter, Facebook, MessageCircle, Send, Link } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonsProps {
  url: string
  title: string
  className?: string
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }, [url])

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink()
    }
  }, [title, url, handleCopyLink])

  const buttons = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'hover:bg-sky-500/20 hover:text-sky-400',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
      color: 'hover:bg-green-500/20 hover:text-green-400',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
      color: 'hover:bg-sky-500/20 hover:text-sky-400',
    },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-gray-400 mr-1">Share:</span>

      {typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? (
        <button
          onClick={handleNativeShare}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-brand-500/20 hover:text-brand-400"
          aria-label="Share"
        >
          <Send className="h-4 w-4" />
        </button>
      ) : (
        <>
          {buttons.map((btn) => (
            <a
              key={btn.name}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all',
                btn.color
              )}
              aria-label={`Share on ${btn.name}`}
            >
              <btn.icon className="h-4 w-4" />
            </a>
          ))}
        </>
      )}

      <button
        onClick={handleCopyLink}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg transition-all',
          copied
            ? 'bg-green-500/20 text-green-400'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        )}
        aria-label="Copy link"
      >
        <Link className="h-4 w-4" />
      </button>
    </div>
  )
}
