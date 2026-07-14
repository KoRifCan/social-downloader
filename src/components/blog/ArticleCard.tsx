'use client'

import Link from 'next/link'
import { cn, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Clock } from 'lucide-react'

interface ArticleCardProps {
  title: string
  slug: string
  excerpt: string
  category: string
  categoryColor?: 'brand' | 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'pink' | 'green' | 'amber'
  date: string
  readTime: string
  author: string
  thumbnail?: string
  featured?: boolean
  className?: string
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  categoryColor = 'brand',
  date,
  readTime,
  author,
  thumbnail,
  featured,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group glass rounded-2xl overflow-hidden transition-all duration-300',
        'hover:scale-[1.02] hover:glow',
        featured && 'md:col-span-2 md:grid md:grid-cols-2',
        className
      )}
    >
      {thumbnail && (
        <div className={cn('relative overflow-hidden', featured ? 'h-full min-h-[240px]' : 'aspect-video')}>
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 to-transparent" />
        </div>
      )}
      <div className={cn('flex flex-col gap-3', thumbnail ? 'p-5' : 'p-5')}>
        <div className="flex items-center gap-2">
          <Badge color={categoryColor}>{category}</Badge>
        </div>
        <h3 className={cn('font-bold text-white line-clamp-2', featured ? 'text-2xl' : 'text-lg')}>
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">{excerpt}</p>
        <div className="mt-auto flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
          <span className="ml-auto truncate">{author}</span>
        </div>
      </div>
    </Link>
  )
}
