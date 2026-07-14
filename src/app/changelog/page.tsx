import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

const CHANGELOG = [
  {
    version: '2.1.0',
    date: '2025-12-15',
    label: 'Latest',
    labelColor: 'green' as const,
    changes: [
      'Added batch download support for TikTok videos',
      'Improved video processing speed by 40%',
      'New analytics dashboard for Pro users',
      'Fixed Instagram Reels download issue',
      'Enhanced mobile UI responsiveness',
    ],
  },
  {
    version: '2.0.0',
    date: '2025-11-20',
    label: 'Major',
    labelColor: 'brand' as const,
    changes: [
      'Complete UI redesign with glass morphism',
      'Added YouTube 4K video download',
      'Introduced subscription plans: Free, Pro, Unlimited',
      'New referral system with rewards',
      'Multi-language support (ID/EN)',
      'PWA support with offline mode',
    ],
  },
  {
    version: '1.5.0',
    date: '2025-10-15',
    label: 'Update',
    labelColor: 'amber' as const,
    changes: [
      'Added Twitter/X video download support',
      'Improved download speed and stability',
      'Added video preview before download',
      'Fixed audio extraction for long videos',
    ],
  },
  {
    version: '1.4.0',
    date: '2025-09-10',
    label: 'Update',
    labelColor: 'amber' as const,
    changes: [
      'Added Facebook video download (HD)',
      'New file management system in dashboard',
      'Added download history tracking',
      'Performance improvements',
    ],
  },
  {
    version: '1.3.0',
    date: '2025-08-05',
    label: 'Update',
    labelColor: 'amber' as const,
    changes: [
      'Added YouTube to MP3 converter',
      'Support for YouTube shorts',
      'Improved error handling',
      'Added FAQs page',
    ],
  },
  {
    version: '1.2.0',
    date: '2025-07-01',
    label: 'Update',
    labelColor: 'amber' as const,
    changes: [
      'Added Instagram Reels and Stories support',
      'Better mobile experience',
      'Added dark mode',
      'Fixed watermark removal for TikTok',
    ],
  },
  {
    version: '1.1.0',
    date: '2025-06-10',
    label: 'Update',
    labelColor: 'amber' as const,
    changes: [
      'Added video quality selection (SD/HD)',
      'Improved TikTok download algorithm',
      'Rate limiting implementation',
      'Basic analytics tracking',
    ],
  },
  {
    version: '1.0.0',
    date: '2025-05-15',
    label: 'Launch',
    labelColor: 'pink' as const,
    changes: [
      'Initial public release',
      'TikTok video download without watermark',
      'Instagram video download',
      'Simple and clean interface',
      'Free for all users',
    ],
  },
]

const MAJOR_VERSIONS = CHANGELOG.reduce<{ major: string; versions: typeof CHANGELOG }[]>((acc, v) => {
  const major = v.version.split('.')[0]
  const existing = acc.find((g) => g.major === major)
  if (existing) {
    existing.versions.push(v)
  } else {
    acc.push({ major, versions: [v] })
  }
  return acc
}, [])

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://social-downloader.vercel.app' },
  { name: 'Changelog', url: 'https://social-downloader.vercel.app/changelog' },
])

export default function ChangelogPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      <div className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Changelog</span>
          </nav>

          <div className="mb-12 text-center">
            <h1 className="gradient-text text-4xl font-bold sm:text-5xl">Changelog</h1>
            <p className="mt-4 text-lg text-gray-400">
              Track every update, improvement, and fix.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 h-full w-px bg-white/10" />

            {MAJOR_VERSIONS.map((group) => (
              <div key={group.major} className="mb-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-lg shadow-brand-500/25">
                    {group.major}
                  </div>
                  <h2 className="text-xl font-bold text-white">Version {group.major}.x</h2>
                </div>

                <div className="space-y-6 pl-14">
                  {group.versions.map((entry) => (
                    <div key={entry.version} className="glass rounded-2xl p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">v{entry.version}</h3>
                        <Badge color={entry.labelColor}>{entry.label}</Badge>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500/60" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
