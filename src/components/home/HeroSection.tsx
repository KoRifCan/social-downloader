'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-premium" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Download Social Media Video{' '}
          <span className="gradient-text">HD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 sm:text-xl"
        >
          Tanpa Watermark &bull; 100% Gratis &bull; Cepat
        </motion.p>
      </div>
    </section>
  )
}
