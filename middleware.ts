import { type NextRequest } from 'next/server'
import { updateSession } from '@/server/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Only apply middleware to these routes
    '/dashboard/:path*',
    '/admin/:path*',
    '/college/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/auth/:path*',
    '/api/:path*',
    '/trpc/:path*',
  ],
}