'use server'

import { createClient } from '@/server/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Try to sign in
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Get user info from the auth response
  const { data: { user } } = await supabase.auth.getUser()

  console.log('Authenticated user ID:', user?.id)

  // Handle errors
  if (authError || !authData.user) {
    // Check if the error is due to unconfirmed email
    if (authError?.message === 'Email not confirmed') {
      // Resend confirmation email
      await supabase.auth.resend({
        type: 'signup',
        email,
      })

      return {
        error: 'Your email is not confirmed. A new confirmation link has been sent to your inbox.',
      }
    }

    return { error: authError?.message || 'Invalid credentials' }
  }

  const authUserId = authData.user.id

  // ✅ Fetch user role using correct auth_user_id
  const { data: roleData, error: roleError } = await supabase
    .from('user_role')
    .select('role')
    .eq('auth_user_id', authUserId)
    .maybeSingle()

  // Debugging logs to verify the role fetch
  console.log('Fetched role data:', roleData)
  console.log('Role error:', roleError)

  if (roleError) {
    return { error: 'Error fetching user role' }
  }

  if (!roleData || !roleData.role) {
    return { error: 'No role assigned to this user' }
  }

  const role = roleData.role
  console.log('User role:', role)

  // ✅ Redirect based on role
  switch (role) {
    case 'superadmin':
      return { redirect: '/superadmin' }
    case 'college':
      return { redirect: '/college' }
    case 'college_admin':
      return { redirect: '/college-admins' }
    case 'teacher':
      return { redirect: '/teacher' }
    case 'student':
      return { redirect: '/students' }
    default:
      return { error: 'Unknown role' }
  }
}

// Resend email confirmation if needed
export async function resendConfirmation(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}