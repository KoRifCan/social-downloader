const rateMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

export function getRateLimitRemaining(key: string, limit: number): number {
  const entry = rateMap.get(key)
  if (!entry) return limit
  return Math.max(0, limit - entry.count)
}
