'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Ayu Pratiwi',
    avatar: 'AP',
    rating: 5,
    content: 'SocialHD benar-benar membantu! Download video TikTok tanpa watermark jadi super mudah. Kualitas HDnya jernih banget!',
  },
  {
    name: 'Budi Santoso',
    avatar: 'BS',
    rating: 5,
    content: 'Akhirnya nemu downloader yang support semua platform. Dari YouTube sampai Instagram, semua bisa. Gratis pula!',
  },
  {
    name: 'Citra Dewi',
    avatar: 'CD',
    rating: 5,
    content: 'Prosesnya cepat banget, gak perlu nunggu lama. UI nya juga keren dan mudah dipahami. Recommended banget!',
  },
  {
    name: 'Dimas Prayoga',
    avatar: 'DP',
    rating: 4,
    content: 'Bagus banget buat download video Facebook. Kualitasnya tetap terjaga. Semoga ke depannya bisa download playlist YouTube.',
  },
  {
    name: 'Eka Putri',
    avatar: 'EP',
    rating: 5,
    content: 'SocialHD penyelamat! Gampang download video Twitter/X tanpa ribet. Langsung bisa dipake tanpa daftar. Mantap!',
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const t = testimonials[current]

  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Apa Kata{' '}
            <span className="gradient-text">Pengguna</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl border border-white/10 p-8 text-center"
          >
            <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-lg font-bold text-brand-400">
              {t.avatar}
            </div>
            <div className="mb-3 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('h-5 w-5', i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600')}
                />
              ))}
            </div>
            <p className="mb-4 text-lg leading-relaxed text-gray-300">&ldquo;{t.content}&rdquo;</p>
            <p className="font-semibold text-white">{t.name}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-8 bg-brand-500' : 'w-2 bg-white/20'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
