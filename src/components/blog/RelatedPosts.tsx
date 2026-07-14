'use client'

import { ArticleCard } from './ArticleCard'

interface Post {
  title: string
  slug: string
  excerpt: string
  category: string
  categoryColor?: 'brand' | 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'pink' | 'green' | 'amber'
  date: string
  readTime: string
  author: string
  thumbnail?: string
}

interface RelatedPostsProps {
  currentSlug: string
  category: string
  posts: Post[]
}

export function RelatedPosts({ currentSlug, posts }: RelatedPostsProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-white">Related Articles</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <ArticleCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  )
}
