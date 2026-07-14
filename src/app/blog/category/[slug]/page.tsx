'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { Pagination } from '@/components/common/Pagination'
import { SearchInput } from '@/components/common/SearchInput'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { Search } from 'lucide-react'

const MOCK_POSTS = [
  {
    title: 'Cara Download Video TikTok Tanpa Watermark HD 2025',
    slug: 'cara-download-video-tiktok-tanpa-watermark',
    excerpt: 'Panduan lengkap download video TikTok tanpa watermark kualitas HD.',
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
    excerpt: 'Cara download video Instagram Reels dan Stories kualitas HD.',
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
    excerpt: 'Ubah video YouTube menjadi file MP3 dengan mudah.',
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
    excerpt: 'Download video Facebook kualitas HD tanpa perlu login.',
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
    excerpt: 'Ingin download video YouTube dalam resolusi 4K?',
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
    excerpt: 'Cara mudah download video dari Twitter/X.',
    category: 'Twitter',
    categoryColor: 'twitter' as const,
    date: '2025-11-18',
    readTime: '3 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/twitter-download.jpg',
  },
]

const CATEGORIES = [
  { name: 'TikTok', slug: 'tiktok', count: 4, color: 'tiktok' as const },
  { name: 'Instagram', slug: 'instagram', count: 3, color: 'instagram' as const },
  { name: 'YouTube', slug: 'youtube', count: 3, color: 'youtube' as const },
  { name: 'Facebook', slug: 'facebook', count: 2, color: 'facebook' as const },
  { name: 'Twitter', slug: 'twitter', count: 2, color: 'twitter' as const },
]

const POPULAR_POSTS = [
  { title: 'Cara Download Video TikTok Tanpa Watermark HD 2025', slug: 'cara-download-video-tiktop-tanpa-watermark', date: '2025-12-01' },
  { title: 'Download Video Instagram Reels & Stories HD', slug: 'download-video-instagram-reels-stories-hd', date: '2025-11-28' },
  { title: 'YouTube to MP3: Konversi Video ke Audio', slug: 'youtube-to-mp3-konversi-video-ke-audio', date: '2025-11-25' },
  { title: 'Download Video Facebook HD Tanpa Login', slug: 'download-video-facebook-hd-tanpa-login', date: '2025-11-22' },
  { title: 'Tips Mendapatkan Video 4K dari YouTube', slug: 'tips-video-4k-youtube', date: '2025-11-20' },
]

const TAGS = ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitter', '4K', 'MP3', 'HD', 'Tutorial', 'Tips']

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const category = CATEGORIES.find((c) => c.slug === params.slug)
  if (!category) notFound()

  const filtered = MOCK_POSTS.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = post.category.toLowerCase() === category.slug
    return matchesSearch && matchesCategory
  })

  const ITEMS_PER_PAGE = 6
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedPosts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const featured = paginatedPosts[0]
  const remaining = paginatedPosts.slice(1)

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://social-downloader.vercel.app' },
    { name: 'Blog', url: 'https://social-downloader.vercel.app/blog' },
    { name: category.name, url: `https://social-downloader.vercel.app/blog/category/${category.slug}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="mb-12 text-center">
            <h1 className="gradient-text text-4xl font-bold sm:text-5xl">{category.name}</h1>
            <p className="mt-4 text-lg text-gray-400">
              Browse all {category.name} articles and tutorials.
            </p>
          </div>

          <div className="mb-8 flex justify-end">
            <div className="w-full sm:w-72">
              <SearchInput
                value={search}
                onChange={(v) => { setSearch(v); setCurrentPage(1) }}
                placeholder={`Search ${category.name} articles...`}
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
                    No articles in this category yet.
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
                  categories={CATEGORIES.filter((c) => c.slug !== params.slug)}
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
