'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { ProfileForm } from '@/components/settings/ProfileForm'
import { PasswordForm } from '@/components/settings/PasswordForm'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('en')
  const [notifications, setNotifications] = useState({
    downloadComplete: true,
    promotions: false,
    updates: true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="mt-1 text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card variant="glass" className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">Profile Information</h2>
            <ProfileForm />
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card variant="glass" className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">Change Password</h2>
            <PasswordForm />
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card variant="glass" className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">Preferences</h2>

            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">Theme</label>
                <div className="flex gap-3">
                  {[
                    { value: 'light', icon: Sun, label: 'Light' },
                    { value: 'dark', icon: Moon, label: 'Dark' },
                    { value: 'system', icon: Monitor, label: 'System' },
                  ].map(opt => {
                    const Icon = opt.icon
                    const isActive = theme === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? 'border-brand-500/50 bg-brand-500/20 text-brand-300'
                            : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-300">Language</label>
                <div className="flex gap-3">
                  {[
                    { value: 'en', label: 'English', flag: '🇺🇸' },
                    { value: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
                  ].map(opt => {
                    const isActive = language === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setLanguage(opt.value)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? 'border-brand-500/50 bg-brand-500/20 text-brand-300'
                            : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span>{opt.flag}</span>
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card variant="glass" className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">Notification Preferences</h2>
            <div className="space-y-4">
              <Switch
                id="downloadComplete"
                label="Download Complete"
                checked={notifications.downloadComplete}
                onCheckedChange={checked =>
                  setNotifications(prev => ({ ...prev, downloadComplete: checked }))
                }
              />
              <Switch
                id="promotions"
                label="Promotions & Offers"
                checked={notifications.promotions}
                onCheckedChange={checked =>
                  setNotifications(prev => ({ ...prev, promotions: checked }))
                }
              />
              <Switch
                id="updates"
                label="Product Updates"
                checked={notifications.updates}
                onCheckedChange={checked =>
                  setNotifications(prev => ({ ...prev, updates: checked }))
                }
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={async () => {
                  await fetch('/api/user/settings', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ notifications }),
                  })
                }}
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
