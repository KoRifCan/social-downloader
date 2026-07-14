'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'glass inline-flex items-center gap-1 rounded-xl border border-white/10 px-4 py-2 text-sm',
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-white">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
