'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  variant?: 'text' | 'image' | 'card' | 'table-row' | 'custom'
  className?: string
}

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton animate-pulse rounded-xl bg-white/10',
        variant === 'text' && 'h-4 w-full',
        variant === 'image' && 'aspect-video w-full',
        variant === 'card' && 'h-48 w-full',
        variant === 'table-row' && 'h-12 w-full',
        className
      )}
    />
  )
}
