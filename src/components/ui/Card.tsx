'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border',
          variant === 'default' && 'border-white/5 bg-surface-card',
          variant === 'glass' && 'glass border-white/10',
          variant === 'interactive' &&
            'card-hover border-white/5 bg-surface-card transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export { Card }
