'use client'

import { useState, useMemo } from 'react'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/schema'
import { Search, ChevronDown } from 'lucide-react'

const categories = [
  {
    name: 'General',
    items: [
      { q: 'What is SocialHD Downloader?', a: 'SocialHD Downloader is a free online tool that lets you download videos and audio from popular social media platforms like TikTok, Instagram, YouTube, Facebook, and Twitter.' },
      { q: 'Is SocialHD Downloader free to use?', a: 'Yes, we offer a free plan with 5 daily downloads at 720p quality. For higher limits and quality, check our Pro and Unlimited plans.' },
      { q: 'Do I need to create an account?', a: 'No, you can download videos without an account. However, creating an account gives you access to download history, higher limits, and premium features.' },
    ],
  },
  {
    name: 'TikTok',
    items: [
      { q: 'How to download TikTok videos without watermark?', a: 'Paste the TikTok video URL into the input field and click Download. We automatically remove the watermark and provide HD quality.' },
      { q: 'Can I download TikTok slideshows?', a: 'Yes, you can download TikTok slideshows (image carousels) as individual images or as a compiled video.' },
      { q: 'Why is my TikTok download failing?', a: 'This may happen if the video is private, the account is deleted, or the URL is incorrect. Ensure the video is public and try again.' },
    ],
  },
  {
    name: 'Instagram',
    items: [
      { q: 'How to download Instagram videos?', a: 'Copy the Instagram post/reel URL and paste it into our downloader. You can download in HD quality without watermark.' },
      { q: 'Can I download Instagram Stories?', a: 'Yes, you can download Instagram Stories by copying the story URL. Note that stories expire after 24 hours.' },
      { q: 'Does it work for private Instagram accounts?', a: 'No, we can only download content from public Instagram accounts due to platform restrictions.' },
    ],
  },
  {
    name: 'YouTube',
    items: [
      { q: 'What YouTube video qualities are supported?', a: 'We support up to 4K quality on the Unlimited plan, 1080p on Pro, and 720p on Free plan. MP3 audio conversion is also available.' },
      { q: 'Can I download YouTube Shorts?', a: 'Yes, YouTube Shorts are supported. Just paste the Shorts URL into the downloader.' },
      { q: 'Is downloading YouTube videos legal?', a: 'Downloading for personal offline use is generally acceptable. Please respect copyright and terms of service.' },
    ],
  },
  {
    name: 'Facebook',
    items: [
      { q: 'How to download Facebook videos?', a: 'Paste the Facebook video URL into our downloader. We support public videos, reels, and live stream recordings.' },
      { q: 'Can I download Facebook Live videos?', a: 'Yes, if the live video has ended and is available as a recording, you can download it using our tool.' },
    ],
  },
  {
    name: 'Premium',
    items: [
      { q: 'What do I get with Pro plan?', a: 'Pro plan gives you 60 daily downloads, 1080p quality, MP3 conversion, API access, no ads, and 1GB cloud storage for $4.99/month.' },
      { q: 'What is the Unlimited plan?', a: 'Unlimited is a one-time payment of $49 giving you lifetime access to 4K quality, unlimited downloads, all formats, full API access, and priority support.' },
      { q: 'How do I cancel my subscription?', a: 'You can cancel anytime from your Dashboard settings. Your access will continue until the end of the billing period.' },
    ],
  },
  {
    name: 'Technical',
    items: [
      { q: 'What file formats are supported?', a: 'We support MP4, MP3, WEBM, and GIF formats. Available formats depend on your plan.' },
      { q: 'Is there a file size limit?', a: 'The maximum file size is 500MB. Very large videos may take longer to process.' },
      { q: 'Why is the download taking too long?', a: 'Processing time depends on video length, quality, and server load. Large 4K videos may take a few minutes.' },
      { q: 'Can I use the API for automation?', a: 'Yes, Pro and Unlimited plans include API access. Check our API documentation for details.' },
    ],
  },
]

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [openCategory, setOpenCategory] = useState<string | null>('General')

  const filtered = useMemo(() => {
    if (!search) return categories.map(c => ({ ...c, items: c.items }))
    const q = search.toLowerCase()
    return categories
      .map(c => ({ ...c, items: c.items.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)) }))
      .filter(c => c.items.length > 0)
  }, [search])

  const allQAs = categories.flatMap(c => c.items)

  return (
    <>
      <JsonLd data={faqSchema(allQAs.map(i => ({ q: i.q, a: i.a })))} />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to know about SocialHD Downloader
          </p>
        </div>

        <div className="relative mx-auto mb-12 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            className="input-glass w-full pl-12"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filtered.map(category => (
            <div key={category.name} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <h2 className="text-lg font-semibold text-white">{category.name}</h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    openCategory === category.name ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openCategory === category.name && (
                <div className="border-t border-white/5">
                  {category.items.map((item, i) => (
                    <details key={i} className="group border-b border-white/5 last:border-0 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-white/[0.02]">
                        <span className="text-sm font-medium text-gray-200">{item.q}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-4">
                        <p className="text-sm text-gray-400">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
