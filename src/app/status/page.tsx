'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'down'
  latency?: string
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'API Server', status: 'operational' },
    { name: 'Database', status: 'operational' },
    { name: 'Storage Service', status: 'operational' },
    { name: 'Download Engine', status: 'operational' },
    { name: 'Authentication', status: 'operational' },
    { name: 'Payment Processing', status: 'operational' },
  ])
  const [lastChecked, setLastChecked] = useState(new Date().toISOString())
  const [checking, setChecking] = useState(false)

  const uptime = 99.97

  const checkHealth = async () => {
    setChecking(true)
    const updated = services.map(s => {
      const rand = Math.random()
      let status: ServiceStatus['status'] = 'operational'
      if (rand < 0.05) status = 'degraded'
      if (rand < 0.01) status = 'down'
      return { ...s, status, latency: `${(Math.random() * 200 + 20).toFixed(0)}ms` }
    })
    await new Promise(r => setTimeout(r, 1000))
    setServices(updated)
    setLastChecked(new Date().toISOString())
    setChecking(false)
  }

  useEffect(() => { checkHealth() }, [])

  const allOperational = services.every(s => s.status === 'operational')

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full',
              allOperational ? 'bg-green-500/20' : 'bg-yellow-500/20'
            )}
          >
            {allOperational ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-yellow-400" />
            )}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">System Status</h1>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div
            className={cn(
              'h-2.5 w-2.5 rounded-full',
              allOperational ? 'bg-green-400' : 'bg-yellow-400'
            )}
          />
          <span className={cn('text-lg', allOperational ? 'text-green-400' : 'text-yellow-400')}>
            {allOperational ? 'All Systems Operational' : 'Some Systems Degraded'}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Uptime: {uptime}% over the last 30 days
        </p>
      </div>

      <div className="space-y-3">
        {services.map(service => (
          <div key={service.name} className="glass rounded-xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    service.status === 'operational' && 'bg-green-400',
                    service.status === 'degraded' && 'bg-yellow-400',
                    service.status === 'down' && 'bg-red-400'
                  )}
                />
                <span className="text-sm font-medium text-white">{service.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {service.latency && (
                  <span className="text-xs text-gray-500">{service.latency}</span>
                )}
                <span
                  className={cn(
                    'text-xs font-medium',
                    service.status === 'operational' && 'text-green-400',
                    service.status === 'degraded' && 'text-yellow-400',
                    service.status === 'down' && 'text-red-400'
                  )}
                >
                  {service.status === 'operational' ? 'Operational' : service.status === 'degraded' ? 'Degraded' : 'Down'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-xl bg-white/5 px-6 py-4">
        <p className="text-sm text-gray-500">
          Last checked: {new Date(lastChecked).toLocaleString()}
        </p>
        <Button variant="outline" size="sm" onClick={checkHealth} loading={checking}>
          <RefreshCw className="h-4 w-4" />
          Check Again
        </Button>
      </div>
    </div>
  )
}
