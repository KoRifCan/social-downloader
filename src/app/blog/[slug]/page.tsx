import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButtons } from '@/components/common/ShareButtons'
import { JsonLd } from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, User } from 'lucide-react'

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
    content: `
      <h2>Apa Itu TikTok Downloader?</h2>
      <p>TikTok downloader adalah alat yang memungkinkan Anda mengunduh video dari TikTok tanpa watermark. Dengan SocialHD Downloader, Anda bisa mendapatkan video berkualitas HD dengan mudah dan gratis.</p>

      <h2>Kenapa Perlu Download Video TikTok?</h2>
      <p>Banyak pengguna TikTok ingin menyimpan video favorit mereka untuk ditonton secara offline atau dibagikan ke platform lain. Sayangnya, TikTok tidak menyediakan fitur download tanpa watermark secara langsung.</p>
      <p>Di sinilah SocialHD Downloader hadir sebagai solusi. Kami menyediakan layanan download video TikTok tanpa watermark dengan kualitas terbaik.</p>

      <h2>Cara Download Video TikTok Tanpa Watermark</h2>
      <p>Ikuti langkah-langkah mudah berikut untuk download video TikTok tanpa watermark:</p>

      <h3>Langkah 1: Copy Link Video TikTok</h3>
      <p>Buka aplikasi TikTok, cari video yang ingin Anda download, lalu tekan tombol Bagikan (Share) dan pilih "Copy Link".</p>

      <h3>Langkah 2: Paste Link di SocialHD Downloader</h3>
      <p>Buka situs SocialHD Downloader, paste link TikTok yang sudah Anda copy ke kolom input, lalu tekan tombol Download.</p>

      <h3>Langkah 3: Download Video</h3>
      <p>Setelah proses selesai, pilih kualitas video yang diinginkan (HD/SD) dan tekan tombol Download. Video akan tersimpan ke perangkat Anda tanpa watermark.</p>

      <h2>Keunggulan SocialHD Downloader</h2>
      <p>SocialHD Downloader menawarkan berbagai keunggulan dibandingkan TikTok downloader lainnya. Gratis, tanpa batasan jumlah download, kualitas HD, dan tidak perlu login atau registrasi.</p>
      <p>Selain TikTok, kami juga mendukung download dari Instagram, YouTube, Facebook, Twitter, dan platform sosial media lainnya.</p>
    `,
  },
  {
    title: 'Download Video Instagram Reels & Stories HD',
    slug: 'download-video-instagram-reels-stories-hd',
    excerpt: 'Cara download video Instagram Reels dan Stories kualitas HD tanpa watermark.',
    category: 'Instagram',
    categoryColor: 'instagram' as const,
    date: '2025-11-28',
    readTime: '4 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/instagram-download.jpg',
    content: `
      <h2>Download Instagram Reels & Stories</h2>
      <p>Instagram Reels dan Stories adalah fitur populer yang sayangnya tidak menyediakan opsi download langsung. Dengan SocialHD Downloader, Anda bisa menyimpan konten favorit dalam kualitas HD.</p>
    `,
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
    content: `
      <h2>Konversi YouTube ke MP3</h2>
      <p>Ingin mendengarkan musik atau podcast dari YouTube secara offline? Gunakan fitur konversi YouTube ke MP3 dari SocialHD Downloader.</p>
    `,
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
    content: `
      <h2>Facebook Video Downloader</h2>
      <p>Download video Facebook dengan mudah tanpa perlu login. Dukung kualitas HD hingga 1080p.</p>
    `,
  },
  {
    title: 'Tips Mendapatkan Video 4K dari YouTube',
    slug: 'tips-video-4k-youtube',
    excerpt: 'Ingin download video YouTube dalam resolusi 4K? Simak tips dan trik lengkapnya.',
    category: 'YouTube',
    categoryColor: 'youtube' as const,
    date: '2025-11-20',
    readTime: '6 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/youtube-4k.jpg',
    content: `
      <h2>Download YouTube 4K</h2>
      <p>Nikmati video YouTube dalam resolusi 4K di perangkat Anda. Berikut tips dan trik untuk mendapatkan kualitas terbaik.</p>
    `,
  },
  {
    title: 'Download Video Twitter/X GIF & MP4',
    slug: 'download-video-twitter-x-gif-mp4',
    excerpt: 'Cara mudah download video dari Twitter/X dalam format MP4 atau GIF.',
    category: 'Twitter',
    categoryColor: 'twitter' as const,
    date: '2025-11-18',
    readTime: '3 min read',
    author: 'SocialHD Team',
    thumbnail: '/images/blog/twitter-download.jpg',
    content: `
      <h2>Twitter/X Video Downloader</h2>
      <p>Download video dari Twitter/X dalam berbagai format. Support MP4 dan GIF dengan kualitas HD.</p>
    `,
  },
]

export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const articleUrl = `https://social-downloader.vercel.app/blog/${post.slug}`

  const jsonLd = articleSchema(post.title, post.excerpt, post.slug, post.date)
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://social-downloader.vercel.app' },
    { name: 'Blog', url: 'https://social-downloader.vercel.app/blog' },
    { name: post.title, url: articleUrl },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen pt-24 pb-16">
        <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white truncate">{post.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            <div className="min-w-0">
              {post.thumbnail && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}

              <div className="mb-8">
                <Badge color={post.categoryColor}>{post.category}</Badge>
                <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {post.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <ShareButtons
                  url={articleUrl}
                  title={post.title}
                  className="mt-6"
                />
              </div>

              <div
                className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
                <ShareButtons url={articleUrl} title={post.title} />
              </div>

              <RelatedPosts
                currentSlug={post.slug}
                category={post.category}
                posts={MOCK_POSTS}
              />

              <section className="mt-16 glass rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white">Ready to Download?</h2>
                <p className="mt-2 text-gray-400">
                  Try SocialHD Downloader now and download videos without watermark.
                </p>
                <Link href="/">
                  <Button size="lg" className="mt-6">
                    Try It Now
                  </Button>
                </Link>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </article>
      </div>
    </>
  )
}
