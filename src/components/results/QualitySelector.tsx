'use client'

import { useState } from 'react'
import { Check, Music, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { formatBytes } from '@/lib/utils'
import type { Format } from '@/types'

interface QualitySelectorProps {
  formats: Format[]
  selectedQuality: string
  selectedFormat: string
  onChange: (quality: string, format: string) => void
}

const qualityIcons: Record<string, React.ElementType> = {
  '4k': Monitor,
  '1080p': Monitor,
  '720p': Monitor,
  '480p': Monitor,
  audio: Music,
}

export function QualitySelector({ formats, selectedQuality, selectedFormat, onChange }: QualitySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {formats.map((fmt, i) => {
        const Icon = qualityIcons[fmt.quality] || Monitor
        const isSelected = fmt.quality === selectedQuality && fmt.format === selectedFormat
        return (
          <motion.button
            key={`${fmt.quality}-${fmt.format}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onChange(fmt.quality, fmt.format)}
            className={cn(
              'relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-300',
              isSelected
                ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/20'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            )}
          >
            {isSelected && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <Icon className={cn('h-6 w-6', isSelected ? 'text-brand-400' : 'text-gray-400')} />
            <div>
              <p className={cn('text-sm font-semibold', isSelected ? 'text-white' : 'text-gray-300')}>
                {fmt.quality === 'audio' ? 'Audio' : fmt.label}
              </p>
              <p className="text-xs text-gray-500">{fmt.format.toUpperCase()} &bull; {formatBytes(fmt.size)}</p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
