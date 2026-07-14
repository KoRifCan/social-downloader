'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MediaPreview } from '@/components/results/MediaPreview'
import { QualitySelector } from '@/components/results/QualitySelector'
import { DownloadOptions } from '@/components/results/DownloadOptions'
import { BatchDownload } from '@/components/results/BatchDownload'
import { ShareQR } from '@/components/results/ShareQR'
import { ProgressTracker } from '@/components/results/ProgressTracker'
import { JsonLd } from '@/components/seo/JsonLd'
import { webAppSchema } from '@/lib/schema'
import { detectMedia, downloadMedia } from '@/lib/download-engine'
import type { MediaInfo } from '@/types'

export default function DownloadPage({ params }: { params: { id: string } }) {
  const [media, setMedia] = useState<MediaInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedQuality, setSelectedQuality] = useState('720p')
  const [selectedFormat, setSelectedFormat] = useState('mp4')

  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadResult, setDownloadResult] = useState<{ downloadUrl: string; fileSize: number } | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [params.id])

  const fetchMedia = async () => {
    try {
      const res = await fetch(`/api/media/${params.id}`)
      if (!res.ok) throw new Error('Media tidak ditemukan')
      const data = await res.json()
      setMedia(data)
      if (data.formats?.length > 0) {
        const defaultFmt = data.formats.find((f: { quality: string }) => f.quality === '720p') || data.formats[0]
        setSelectedQuality(defaultFmt.quality)
        setSelectedFormat(defaultFmt.format)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat media')
    } finally {
      setLoading(false)
    }
  }

  const handleQualityChange = (quality: string, format: string) => {
    setSelectedQuality(quality)
    setSelectedFormat(format)
  }

  const handleDownload = async () => {
    if (!media) return
    setDownloading(true)
    setProgress(0)
    try {
      const result = await downloadMedia(params.id, selectedQuality, selectedFormat)
      setDownloadResult(result)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 300)
      setTimeout(() => clearInterval(interval), 5000)
    } catch {
      setError('Gagal memulai download')
    } finally {
      setDownloading(false)
    }
  }

  const handleCancel = () => {
    setDownloading(false)
    setProgress(0)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
        </main>
        <Footer />
      </>
    )
  }

  if (error || !media) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
          <p className="text-gray-400">{error || 'Media tidak ditemukan'}</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <JsonLd data={webAppSchema()} />
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <MediaPreview media={media} />

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-white">Pilih Kualitas</h3>
                  <QualitySelector
                    formats={media.formats}
                    selectedQuality={selectedQuality}
                    selectedFormat={selectedFormat}
                    onChange={handleQualityChange}
                  />
                </div>

                {downloading || progress > 0 ? (
                  <ProgressTracker
                    progress={progress}
                    speed="12.5"
                    eta="30s"
                    onCancel={handleCancel}
                  />
                ) : downloadResult ? (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-white">Download</h3>
                    <DownloadOptions
                      downloadUrl={downloadResult.downloadUrl}
                      fileSize={downloadResult.fileSize}
                    />
                    <div className="mt-4">
                      <ShareQR downloadUrl={downloadResult.downloadUrl} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="w-full rounded-xl bg-gradient-accent py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]"
                  >
                    Download Now
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <BatchDownload />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
