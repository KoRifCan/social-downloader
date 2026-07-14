'use client'

import { useState, useRef } from 'react'
import { QRCode } from 'react-qr-code'
import { Download } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface ShareQRProps {
  downloadUrl: string
}

export function ShareQR({ downloadUrl }: ShareQRProps) {
  const [open, setOpen] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownloadQR = async () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width * 2
      canvas.height = img.height * 2
      ctx?.scale(2, 2)
      ctx?.drawImage(img, 0, 0)
      const png = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = png
      a.download = 'qrcode.png'
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <>
      <Button variant="secondary" size="lg" onClick={() => setOpen(true)}>
        <Download className="h-4 w-4" />
        Share QR
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Download QR Code">
        <div className="flex flex-col items-center gap-6">
          <div ref={qrRef} className="rounded-xl bg-white p-4">
            <QRCode value={downloadUrl} size={200} />
          </div>
          <Button onClick={handleDownloadQR}>
            <Download className="h-4 w-4" />
            Download QR PNG
          </Button>
        </div>
      </Modal>
    </>
  )
}
