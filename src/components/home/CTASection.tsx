'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Masukkan email yang valid')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('Berhasil berlangganan! Cek email Anda untuk konfirmasi.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-white/10 p-8 text-center sm:p-12"
        >
          <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            Siap Download Video{' '}
            <span className="gradient-text">HD</span>?
          </h2>
          <p className="mb-8 text-gray-400">
            Dapatkan update fitur terbaru dan tips download video langsung ke email Anda
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Button onClick={handleSubscribe} loading={loading}>
              <Send className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
