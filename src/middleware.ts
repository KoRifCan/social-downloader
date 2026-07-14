import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes - check admin role
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Dashboard routes - require auth
    if (path.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        // Public routes
        if (
          path === '/' ||
          path.startsWith('/blog') ||
          path.startsWith('/pricing') ||
          path.startsWith('/faq') ||
          path.startsWith('/contact') ||
          path.startsWith('/terms') ||
          path.startsWith('/privacy') ||
          path.startsWith('/api-docs') ||
          path.startsWith('/status') ||
          path.startsWith('/login') ||
          path.startsWith('/register') ||
          path.startsWith('/_next') ||
          path.startsWith('/api')
        ) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
