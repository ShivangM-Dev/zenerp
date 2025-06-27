import { createClient } from '@/server/supabase/server' // Update path as needed

export type SuperAdmin = {
  id: string
  first_name: string
  last_name: string
  email: string
  auth_user_id: string
}

export const fetchSuperAdmins = async (): Promise<SuperAdmin[]> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('superadmin')
    .select('id, first_name, last_name, email, auth_user_id')

  if (error) {
    console.error('❌ Failed to fetch superadmins:', error)
    return []
  }

  return data as SuperAdmin[]
}
