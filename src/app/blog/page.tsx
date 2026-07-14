'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { Pagination } from '@/components/common/Pagination'
import { SearchInput } from '@/components/common/SearchInput'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const MOCK_POSTS = [
  {
    title: 'Cara Download Video TikTok Tanpa Watermark HD 2025',
    slug: 'cara-download-video-tiktok-tanpa-watermark',
    excerpt: 'Panduan lengkap download video TikTok tanpa watermark kualitas HD. Gratis, cepat, dan mudah tanpa aplikasi tambahan.',
    category: 'TikTok',
    categoryColor: 'tiktok' as const,
    date: '2025-12-01',
    readTime: '5 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/tiktok-download.jpg',
  },
  {
    title: 'Download Video Instagram Reels & Stories HD',
    slug: 'download-video-instagram-reels-stories-hd',
    excerpt: 'Cara download video Instagram Reels dan Stories kualitas HD tanpa watermark. Support semua format.',
    category: 'Instagram',
    categoryColor: 'instagram' as const,
    date: '2025-11-28',
    readTime: '4 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/instagram-download.jpg',
  },
  {
    title: 'YouTube to MP3: Konversi Video ke Audio',
    slug: 'youtube-to-mp3-konversi-video-ke-audio',
    excerpt: 'Ubah video YouTube menjadi file MP3 dengan mudah. Dukung kualitas audio tinggi 320kbps.',
    category: 'YouTube',
    categoryColor: 'youtube' as const,
    date: '2025-11-25',
    readTime: '3 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/youtube-mp3.jpg',
  },
  {
    title: 'Download Video Facebook HD Tanpa Login',
    slug: 'download-video-facebook-hd-tanpa-login',
    excerpt: 'Download video Facebook kualitas HD tanpa perlu login. Cepat dan gratis untuk semua pengguna.',
    category: 'Facebook',
    categoryColor: 'facebook' as const,
    date: '2025-11-22',
    readTime: '4 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/facebook-download.jpg',
  },
  {
    title: 'Tips Mendapatkan Video 4K dari YouTube',
    slug: 'tips-video-4k-youtube',
    excerpt: 'Ingin download video YouTube dalam resolusi 4K? Simak tips dan trik lengkapnya di sini.',
    category: 'YouTube',
    categoryColor: 'youtube' as const,
    date: '2025-11-20',
    readTime: '6 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/youtube-4k.jpg',
  },
  {
    title: 'Download Video Twitter/X GIF & MP4',
    slug: 'download-video-twitter-x-gif-mp4',
    excerpt: 'Cara mudah download video dari Twitter/X dalam format MP4 atau GIF. Support semua kualitas.',
    category: 'Twitter',
    categoryColor: 'twitter' as const,
    date: '2025-11-18',
    readTime: '3 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/twitter-download.jpg',
  },
]

const CATEGORIES = [
  { name: 'All', slug: 'all', count: 12 },
  { name: 'TikTok', slug: 'tiktok', count: 4, color: 'tiktok' as const },
  { name: 'Instagram', slug: 'instagram', count: 3, color: 'instagram' as const },
  { name: 'YouTube', slug: 'youtube', count: 3, color: 'youtube' as const },
  { name: 'Facebook', slug: 'facebook', count: 2, color: 'facebook' as const },
  { name: 'Twitter', slug: 'twitter', count: 2, color: 'twitter' as const },
]

const POPULAR_POSTS = [
  { title: 'Cara Download Video TikTok Tanpa Watermark HD 2025', slug: 'cara-download-video-tiktok-tanpa-watermark', date: '2025-12-01' },
  { title: 'Download Video Instagram Reels & Stories HD', slug: 'download-video-instagram-reels-stories-hd', date: '2025-11-28' },
  { title: 'YouTube to MP3: Konversi Video ke Audio', slug: 'youtube-to-mp3-konversi-video-ke-audio', date: '2025-11-25' },
  { title: 'Download Video Facebook HD Tanpa Login', slug: 'download-video-facebook-hd-tanpa-login', date: '2025-11-22' },
  { title: 'Tips Mendapatkan Video 4K dari YouTube', slug: 'tips-video-4k-youtube', date: '2025-11-20' },
]

const TAGS = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', '4K', 'MP3', 'HD', 'Tutorial', 'Tips']

const ITEMS_PER_PAGE = 6

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = MOCK_POSTS.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || post.category.toLowerCase() === activeCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedPosts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const featured = paginatedPosts[0]
  const remaining = paginatedPosts.slice(1)

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://social-downloader.vercel.app' },
    { name: 'Blog', url: 'https://social-downloader.vercel.app/blog' },
  ])

  return (
    <>
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </nav>

          <div className="mb-12 text-center">
            <h1 className="gradient-text text-4xl font-bold sm:text-5xl">Blog</h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Tips, tutorials, and guides to help you download social media content like a pro.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveCategory(cat.slug); setCurrentPage(1) }}
                  className={cn(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all',
                    activeCategory === cat.slug
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                      : 'glass text-gray-400 hover:text-white'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="w-full sm:w-72">
              <SearchInput
                value={search}
                onChange={(v) => { setSearch(v); setCurrentPage(1) }}
                placeholder="Search articles..."
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              {paginatedPosts.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Search className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                  <h3 className="text-lg font-semibold text-white">No articles found</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Try adjusting your search or filter.
                  </p>
                </div>
              ) : (
                <>
                  {featured && (
                    <div className="mb-8">
                      <ArticleCard {...featured} featured />
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {remaining.map((post) => (
                      <ArticleCard key={post.slug} {...post} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-10"
                  />
                </>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <BlogSidebar
                  categories={CATEGORIES.filter((c) => c.slug !== 'all')}
                  popularPosts={POPULAR_POSTS}
                  tags={TAGS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
