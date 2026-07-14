'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className="glass rounded-2xl p-10 text-center max-w-md w-full">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
          {icon || <Inbox className="h-8 w-8 text-gray-400" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="mb-6 text-sm text-gray-400">{description}</p>
        )}
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </div>
    </div>
  )
}
