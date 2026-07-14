'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  features: string[]
  popular?: boolean
  ctaText?: string
  onCta?: () => void
}

export function PricingCard({
  name,
  price,
  period,
  features,
  popular,
  ctaText = 'Get Started',
  onCta,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-8 relative transition-all duration-300',
        popular && 'gradient-border scale-105 glow'
      )}
    >
      {popular && (
        <Badge variant="brand" className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-bold gradient-text">{price}</span>
          {period && <span className="text-sm text-gray-400">/{period}</span>}
        </div>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={popular ? 'primary' : 'outline'}
        className="w-full"
        onClick={onCta}
      >
        {ctaText}
      </Button>
    </div>
  )
}
