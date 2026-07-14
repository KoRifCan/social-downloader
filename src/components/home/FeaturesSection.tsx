'use client'

import { motion } from 'framer-motion'
import { Monitor, Zap, Shield, Globe, Infinity } from 'lucide-react'

const features = [
  {
    icon: Monitor,
    title: 'HD Quality',
    description: 'Download video hingga kualitas 4K dan 1080p Full HD tanpa penurunan kualitas.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Proses download super cepat dengan teknologi server canggih kami.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: '100% aman dan terenkripsi. Data Anda tidak pernah disimpan di server kami.',
  },
  {
    icon: Globe,
    title: 'All Platforms',
    description: 'Mendukung TikTok, Instagram, YouTube, Facebook, Twitter, LinkedIn, dan Pinterest.',
  },
  {
    icon: Infinity,
    title: 'Free Forever',
    description: 'Gratis selamanya tanpa batasan jumlah download. Nikmati layanan premium tanpa biaya.',
  },
]

export function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Kenapa Pilih{' '}
            <span className="gradient-text">SocialHD</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Kami menyediakan layanan download video sosial media terbaik dengan berbagai keunggulan
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass group rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
