'use client'

import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

interface FeatureRow {
  feature: string
  free: boolean | string
  pro: boolean | string
  unlimited: boolean | string
}

const features: FeatureRow[] = [
  { feature: 'Max Video Quality', free: '720p', pro: '1080p', unlimited: '4K' },
  { feature: 'Daily Downloads', free: '5', pro: '60', unlimited: 'Unlimited' },
  { feature: 'MP3 Conversion', free: false, pro: true, unlimited: true },
  { feature: 'Batch Download', free: false, pro: true, unlimited: true },
  { feature: 'No Watermark', free: true, pro: true, unlimited: true },
  { feature: 'Priority Support', free: false, pro: false, unlimited: true },
  { feature: 'API Access', free: false, pro: true, unlimited: true },
  { feature: 'Ad-Free Experience', free: false, pro: true, unlimited: true },
  { feature: 'Cloud Storage', free: false, pro: '1GB', unlimited: '10GB' },
  { feature: 'Team Sharing', free: false, pro: false, unlimited: true },
]

const CheckIcon = () => <Check className="h-4 w-4 text-green-400" />
const XIcon = () => <X className="h-4 w-4 text-red-400" />

const renderCell = (val: boolean | string) => {
  if (typeof val === 'boolean') return val ? <CheckIcon /> : <XIcon />
  return <span className="text-sm text-gray-300">{val}</span>
}

export function FeatureComparison() {
  const columns = [
    { key: 'feature', header: 'Feature', render: (f: FeatureRow) => <span className="font-medium text-white">{f.feature}</span> },
    { key: 'free', header: 'Free', render: (f: FeatureRow) => renderCell(f.free) },
    { key: 'pro', header: 'Pro', render: (f: FeatureRow) => renderCell(f.pro) },
    { key: 'unlimited', header: 'Unlimited', render: (f: FeatureRow) => renderCell(f.unlimited) },
  ]

  return (
    <div className="glass rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02]">
            {columns.map(c => <th key={c.key} className="p-3 text-xs uppercase text-gray-500">{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map(f => (
            <tr key={f.feature} className="border-b border-white/5 hover:bg-white/[0.02]">
              {columns.map(c => <td key={c.key} className="p-3">{c.render(f)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
