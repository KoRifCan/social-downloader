'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Link, Check, X, Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import { detectPlatform } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'
import type { BatchItem, Platform } from '@/types'

export function BatchDownload() {
  const [url, setUrl] = useState('')
  const [items, setItems] = useState<BatchItem[]>([])

  const addItem = () => {
    if (!url.trim()) return
    const platform = detectPlatform(url) as Platform | undefined
    setItems(prev => [
      ...prev,
      {
        id: nanoid(),
        url: url.trim(),
        platform,
        status: 'pending',
        progress: 0,
      },
    ])
    setUrl('')
  }

  const downloadAll = () => {
    setItems(prev =>
      prev.map(item => {
        if (item.status === 'pending') {
          return { ...item, status: 'processing' as const, progress: 0 }
        }
        return item
      })
    )
    const interval = setInterval(() => {
      setItems(prev => {
        const updated = prev.map(item => {
          if (item.status === 'processing') {
            const next = Math.min(item.progress + Math.random() * 30, 100)
            if (next >= 100) {
              return { ...item, progress: 100, status: 'completed' as const, downloadUrl: '#' }
            }
            return { ...item, progress: next }
          }
          return item
        })
        if (updated.every(i => i.status === 'completed' || i.status === 'error')) {
          clearInterval(interval)
        }
        return updated
      })
    }, 500)
  }

  const clearCompleted = () => {
    setItems(prev => prev.filter(i => i.status !== 'completed'))
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="glass rounded-2xl border border-white/10 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Batch Download</h3>

      <div className="mb-4 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4">
          <Link className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            placeholder="Paste link video..."
            className="w-full bg-transparent py-2.5 text-sm text-white placeholder-gray-500 outline-none"
          />
        </div>
        <Button variant="primary" size="md" onClick={addItem}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {items.length > 0 && (
        <div className="mb-4 flex gap-2">
          <Button variant="primary" size="sm" onClick={downloadAll}>
            <Download className="h-4 w-4" />
            Download All
          </Button>
          <Button variant="ghost" size="sm" onClick={clearCompleted}>
            <Trash2 className="h-4 w-4" />
            Clear Completed
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="mb-2 flex items-center gap-2">
              {item.status === 'pending' && <Link className="h-4 w-4 text-gray-400" />}
              {item.status === 'processing' && <Loader2 className="h-4 w-4 animate-spin text-brand-400" />}
              {item.status === 'completed' && <Check className="h-4 w-4 text-green-400" />}
              {item.status === 'error' && <X className="h-4 w-4 text-red-400" />}
              <span className="flex-1 truncate text-sm text-gray-300">{item.url}</span>
              {item.platform && (
                <span className="text-xs capitalize text-gray-500">{item.platform}</span>
              )}
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-red-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            {item.status === 'processing' && (
              <Progress value={item.progress} className="h-1.5" />
            )}
            <div className={cn(
              'text-xs',
              item.status === 'completed' && 'text-green-400',
              item.status === 'error' && 'text-red-400',
              item.status !== 'completed' && item.status !== 'error' && 'text-gray-500'
            )}>
              {item.status === 'completed' && 'Completed'}
              {item.status === 'error' && (item.error || 'Error')}
              {item.status === 'pending' && 'Pending'}
              {item.status === 'processing' && `${Math.round(item.progress)}%`}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-500">Belum ada link ditambahkan</p>
        )}
      </div>
    </div>
  )
}
