import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (roleError || !roleData) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Define valid roles and access map
  type Role = 'superadmin' | 'teacher' | 'student' | 'college'

  const roleAccess: Record<Role, string[]> = {
    superadmin: ['/admin', '/dashboard', '/api', '/trpc'],
    teacher: ['/teacher', '/dashboard'],
    student: ['/student'],
    college: ['/college'],
  }

  const userRole = roleData.role as Role
  const allowedPaths = roleAccess[userRole] || []
  const path = request.nextUrl.pathname

  const isAllowed = allowedPaths.some(prefix => path.startsWith(prefix))

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return response
}

export const config = {
  matcher: [
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
