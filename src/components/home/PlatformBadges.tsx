'use client'

import { motion } from 'framer-motion'
import { PLATFORMS } from '@/types'

const iconMap: Record<string, string> = {
  music: '♫',
  camera: '📷',
  play: '▶',
  facebook: '📘',
  twitter: '𝕏',
  linkedin: '💼',
  image: '📌',
}

export function PlatformBadges() {
  return (
    <section className="relative z-10 px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-sm text-gray-400">
            Didukung oleh platform sosial media terpopuler
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-white/20"
                style={{
                  boxShadow: `0 0 0px ${platform.color}00`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${platform.color}40`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 0 0px ${platform.color}00`
                }}
              >
                <span className="text-lg">{iconMap[platform.icon] || '🔗'}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {platform.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
