'use client'

import { cn } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const downloadData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  downloads: Math.floor(Math.random() * 5000) + 500,
}))

const planData = [
  { name: 'Free', value: 65 },
  { name: 'Pro', value: 25 },
  { name: 'Unlimited', value: 10 },
]

const platformData = [
  { name: 'TikTok', downloads: 12450 },
  { name: 'Instagram', downloads: 8760 },
  { name: 'YouTube', downloads: 6540 },
  { name: 'Facebook', downloads: 4320 },
  { name: 'Twitter', downloads: 2100 },
]

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const StatCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="glass rounded-xl p-5">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="mt-1 text-2xl font-bold gradient-text">{value}</p>
    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
  </div>
)

export function GlobalStats({ expanded }: { expanded?: boolean }) {
  return (
    <div className={cn('space-y-6', expanded && 'space-y-8')}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="12,458" sub="+342 this week" />
        <StatCard label="Total Downloads" value="347,892" sub="+12,450 this week" />
        <StatCard label="Active Today" value="1,847" sub="24% of total users" />
        <StatCard label="Revenue" value="$4,892" sub="+$890 this week" />
      </div>

      <div className={cn('grid gap-6', expanded ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3')}>
        <div className={cn('glass rounded-xl p-5', expanded ? 'lg:col-span-2' : 'lg:col-span-1')}>
          <h3 className="mb-4 text-sm font-medium text-gray-300">Downloads (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={downloadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ background: 'rgba(15,15,35,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="downloads" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {!expanded && (
          <div className="glass rounded-xl p-5">
            <h3 className="mb-4 text-sm font-medium text-gray-300">Users by Plan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={planData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                  {planData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'rgba(15,15,35,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className={cn('glass rounded-xl p-5', expanded && 'lg:col-span-2')}>
          <h3 className="mb-4 text-sm font-medium text-gray-300">Downloads by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ background: 'rgba(15,15,35,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="downloads" radius={[0, 4, 4, 0]}>
                {platformData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {expanded && (
          <div className="glass rounded-xl p-5">
            <h3 className="mb-4 text-sm font-medium text-gray-300">Users by Plan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={planData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                  {planData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'rgba(15,15,35,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
