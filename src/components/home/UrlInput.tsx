'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Link, Check, X, Loader2 } from 'lucide-react'
import { cn, detectPlatform } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const platformIcons: Record<string, string> = {
  tiktok: '♫',
  instagram: '📷',
  youtube: '▶',
  facebook: '📘',
  twitter: '𝕏',
  linkedin: '💼',
  pinterest: '📌',
}

export function UrlInput() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = useCallback((value: string) => {
    setUrl(value)
    setError(null)
    if (value.trim()) {
      const detected = detectPlatform(value)
      setPlatform(detected)
    } else {
      setPlatform(null)
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) {
      setError('Silakan masukkan link video')
      return
    }
    const detected = detectPlatform(url)
    if (!detected) {
      setError('Link tidak didukung. Gunakan link dari TikTok, Instagram, YouTube, Facebook, Twitter, LinkedIn, atau Pinterest.')
      toast.error('Platform tidak didukung')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error('Gagal memproses video')
      const data = await res.json()
      router.push(`/download/${data.id}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [url, router])

  return (
    <section className="relative z-10 -mt-32 px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto max-w-2xl"
      >
        <div className={cn('glass rounded-2xl p-2', error && 'border-red-500/50')}>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-3 pl-4">
              <Link className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={e => handleChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Paste link video sosial media di sini..."
                className="w-full bg-transparent py-3 text-sm text-white placeholder-gray-500 outline-none"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={cn(
                'flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] disabled:opacity-50'
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Download'
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {platform && !error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center gap-2"
            >
              <span className="text-lg">{platformIcons[platform] || '🔗'}</span>
              <span className="text-sm capitalize text-gray-400">
                {platform} detected
              </span>
              <Check className="ml-auto h-4 w-4 text-green-400" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center gap-2 text-sm text-red-400"
            >
              <X className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
