'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Progress } from '@/components/ui/Progress'
import { Button } from '@/components/ui/Button'

interface ProgressTrackerProps {
  progress: number
  speed: string
  eta: string
  onCancel: () => void
}

export function ProgressTracker({ progress, speed, eta, onCancel }: ProgressTrackerProps) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white">Downloading...</span>
        <span className="text-sm font-semibold text-brand-400">{Math.round(progress)}%</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Progress value={progress} className="h-3" />
      </motion.div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>{speed} MB/s</span>
        <span>Estimated {eta}</span>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  )
}
