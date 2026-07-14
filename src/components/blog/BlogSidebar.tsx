'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import { Mail } from 'lucide-react'

interface Category {
  name: string
  slug: string
  count: number
  color?: 'brand' | 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'pink' | 'green' | 'amber'
}

interface PopularPost {
  title: string
  slug: string
  date: string
}

interface BlogSidebarProps {
  categories: Category[]
  popularPosts: PopularPost[]
  tags: string[]
  className?: string
}

export function BlogSidebar({ categories, popularPosts, tags, className }: BlogSidebarProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <aside className={cn('flex flex-col gap-8', className)}>
      <div className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span>{cat.name}</span>
                <Badge color={cat.color || 'brand'}>{cat.count}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Popular Posts</h3>
        <ul className="space-y-3">
          {popularPosts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-brand-400 line-clamp-2">
                    {post.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 transition-colors hover:bg-brand-500/20 hover:text-brand-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="mb-2 text-lg font-semibold text-white">Newsletter</h3>
        <p className="mb-4 text-sm text-gray-400">
          Get the latest tips and updates delivered to your inbox.
        </p>
        {subscribed ? (
          <p className="text-sm text-green-400">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </aside>
  )
}
