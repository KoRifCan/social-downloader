'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { formatDuration, formatBytes } from '@/lib/utils'
import type { MediaInfo } from '@/types'

interface MediaPreviewProps {
  media: MediaInfo
}

export function MediaPreview({ media }: MediaPreviewProps) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-video w-full">
        <Image
          src={media.thumbnail}
          alt={media.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl transition-transform hover:scale-110">
            <Play className="ml-0.5 h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-3 text-lg font-semibold text-white line-clamp-2">{media.title}</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="brand">{media.platform}</Badge>
          <span className="text-sm text-gray-400">{formatDuration(media.duration)}</span>
          {media.formats[0] && (
            <span className="text-sm text-gray-400">{formatBytes(media.formats[0].size)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
