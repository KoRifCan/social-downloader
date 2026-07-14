'use client'

import { Download, Music, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface DownloadOptionsProps {
  downloadUrl: string
  fileSize: number
}

export function DownloadOptions({ downloadUrl, fileSize }: DownloadOptionsProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl)
      toast.success('Link download berhasil disalin!')
    } catch {
      toast.error('Gagal menyalin link')
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <Download className="h-4 w-4" />
        Download HD
      </a>

      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <Download className="h-4 w-4" />
        Download SD
      </a>

      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <Music className="h-4 w-4" />
        Audio Only
      </a>

      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-105"
      >
        <Copy className="h-4 w-4" />
        Copy Link
      </button>
    </div>
  )
}
