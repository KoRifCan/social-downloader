'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Copy, Check } from 'lucide-react'

const endpoints = [
  {
    method: 'GET',
    path: '/api/download',
    desc: 'Download media from a supported platform URL',
    auth: 'API Key (optional for free tier)',
    example: 'curl -X GET "https://api.socialhd.com/api/download?url=https://tiktok.com/@user/video/123" \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    response: `{
  "success": true,
  "data": {
    "title": "Amazing TikTok Video",
    "url": "https://cdn.socialhd.com/downloads/abc123.mp4",
    "quality": "1080p",
    "format": "mp4",
    "duration": "45s",
    "size": "12.5 MB"
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/audio',
    desc: 'Extract audio from a video URL',
    auth: 'API Key (Pro plan or higher)',
    example: 'curl -X GET "https://api.socialhd.com/api/audio?url=https://youtube.com/watch?v=abc" \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    response: `{
  "success": true,
  "data": {
    "title": "Song Title - Artist",
    "url": "https://cdn.socialhd.com/audio/xyz789.mp3",
    "format": "mp3",
    "duration": "3m 45s",
    "size": "5.2 MB"
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/info',
    desc: 'Get media information without downloading',
    auth: 'No authentication required',
    example: 'curl -X GET "https://api.socialhd.com/api/info?url=https://instagram.com/p/abc123"',
    response: `{
  "success": true,
  "data": {
    "title": "Instagram Post",
    "author": "@user",
    "duration": "30s",
    "available_qualities": ["720p", "480p", "360p"],
    "platform": "instagram",
    "thumbnail": "https://cdn.socialhd.com/thumbs/abc.jpg"
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/user/stats',
    desc: 'Get your account usage statistics',
    auth: 'API Key required',
    example: 'curl -X GET "https://api.socialhd.com/api/user/stats" \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    response: `{
  "success": true,
  "data": {
    "plan": "pro",
    "downloads_today": 12,
    "downloads_limit": 60,
    "total_downloads": 1234,
    "bandwidth_used": "2.5 GB",
    "api_calls_today": 45
  }
}`,
  },
]

const methodColors: Record<string, string> = {
  GET: 'text-green-400',
  POST: 'text-blue-400',
  PUT: 'text-yellow-400',
  DELETE: 'text-red-400',
}

export default function ApiDocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          API <span className="gradient-text">Documentation</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Integrate SocialHD Downloader into your applications
        </p>
      </div>

      <div className="space-y-8">
        <div className="glass rounded-xl p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Authentication</h2>
          <p className="mb-4 text-sm text-gray-400">
            Most API endpoints require an API key for authentication. You can find your API key in your 
            Dashboard settings. Include it in the Authorization header of your requests.
          </p>
          <div className="rounded-lg bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Header Format</span>
              <button
                onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', -1)}
                className="text-xs text-brand-400 hover:underline"
              >
                Copy
              </button>
            </div>
            <code className="text-sm text-green-300">Authorization: Bearer YOUR_API_KEY</code>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Rate Limiting</h2>
          <p className="text-sm text-gray-400">
            Rate limits vary by plan. Free accounts are limited to 5 requests per minute, Pro accounts 
            to 60 requests per minute, and Unlimited accounts to 300 requests per minute. 
            Rate limit headers are included in all API responses.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { plan: 'Free', limit: '5 req/min', color: 'default' as const },
              { plan: 'Pro', limit: '60 req/min', color: 'brand' as const },
              { plan: 'Unlimited', limit: '300 req/min', color: 'success' as const },
            ].map(item => (
              <div key={item.plan} className="rounded-lg bg-white/5 p-3 text-center">
                <p className="text-sm font-medium text-white">{item.plan}</p>
                <Badge variant={item.color}>{item.limit}</Badge>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-white">Endpoints</h2>

        {endpoints.map((ep, i) => (
          <div key={ep.path} className="glass rounded-xl overflow-hidden">
            <div className="border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className={cn('font-mono text-sm font-bold', methodColors[ep.method])}>
                  {ep.method}
                </span>
                <code className="font-mono text-sm text-white">{ep.path}</code>
              </div>
              <p className="mt-1 text-sm text-gray-400">{ep.desc}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="default">{ep.auth}</Badge>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Example Request (cURL)</span>
                  <button
                    onClick={() => copyToClipboard(ep.example, i)}
                    className="flex items-center gap-1 text-xs text-brand-400 hover:underline"
                  >
                    {copiedIndex === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedIndex === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-green-300">
                  <code>{ep.example}</code>
                </pre>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500">Example Response</span>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-blue-300">
                  <code>{ep.response}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}

        <div className="glass rounded-xl p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Error Handling</h2>
          <p className="mb-4 text-sm text-gray-400">
            The API returns standard HTTP status codes to indicate success or failure. Errors include a 
            JSON body with additional details.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-2 text-left font-medium text-gray-400">Status Code</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-400">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [200, 'Success'],
                  [400, 'Bad Request - Invalid parameters'],
                  [401, 'Unauthorized - Invalid or missing API key'],
                  [403, 'Forbidden - Insufficient permissions'],
                  [404, 'Not Found - Resource not found'],
                  [429, 'Too Many Requests - Rate limit exceeded'],
                  [500, 'Internal Server Error'],
                ].map(([code, meaning]) => (
                  <tr key={String(code)} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-2 font-mono text-gray-300">{code}</td>
                    <td className="px-4 py-2 text-gray-400">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
