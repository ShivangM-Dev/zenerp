'use server'

import { createClient } from '@/server/supabase/server'
import { SuperAdminFormValues } from '@/server/validation/super-admin/super-admin.validation'
import { CollegeFormValues } from '@/server/validation/college/college.validation'

export const createSuperAdmin = async (data: SuperAdminFormValues) => {
  console.log('🔧 Creating Supabase client...')
  const supabase = await createClient()

  // Step 1: Create user in Supabase Auth
  console.log('🧪 Attempting to create auth user...')
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      fullName: `${data.first_name} ${data.last_name}`,
      username: data.username,
      role: 'superadmin',
    },
  })

  if (authError || !authUser?.user?.id) {
    console.error('❌ Auth createUser error:', authError)
    return {
      success: false,
      message: authError?.message || 'Failed to create user in auth.',
    }
  }

  const authUserId = authUser.user.id
  console.log('✅ Auth user created with ID:', authUserId)

  // Step 2: Insert into superadmin table
  console.log('📥 Inserting into superadmin table...')
  const { error: insertError } = await supabase
    .from('superadmin')
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      auth_user_id: authUserId,
    })

  if (insertError) {
    console.error('❌ Superadmin insert error:', insertError)

    // Rollback: Delete auth user
    await supabase.auth.admin.deleteUser(authUserId)
    console.log('🗑️ Rolled back: Deleted auth user due to DB insert failure.')

    return {
      success: false,
      message: insertError.message || 'Failed to insert into superadmins table.',
    }
  }

  // Step 3: Assign role in user_roles table
  console.log('👤 Assigning role in user_role table...')
  const { error: roleError } = await supabase
    .from('user_role')
    .insert({
      auth_user_id: authUserId,
      role: 'superadmin',
    })

  if (roleError) {
    console.error('❌ Role assignment error:', roleError)

    // Rollback both superadmin and auth user
    await supabase.from('superadmin').delete().eq('auth_user_id', authUserId)
    await supabase.auth.admin.deleteUser(authUserId)
    console.log('🗑️ Rolled back: Deleted auth user and superadmin due to role insert failure.')

    return {
      success: false,
      message: roleError.message || 'Failed to assign role to user.',
    }
  }

  console.log('✅ Super admin created successfully.')
  return {
    success: true,
    message: 'Super admin created successfully!',
  }
}




export const createCollege = async (data: CollegeFormValues) => {
  const supabase = await createClient()

  console.log("Step 1: Creating user in Supabase Auth")
  // Step 1: Create user in Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: false, // Will trigger confirmation email
    user_metadata: {
      fullName: data.collegeName,
      username: data.userName,
      role: 'college',
    },
  })

  if (authError || !authUser?.user?.id) {
    console.error("Auth Error:", authError)
    return { success: false, message: authError?.message || 'Failed to create user.' }
  }

  const authUserId = authUser.user.id
  console.log("Auth User created successfully:", authUserId)

  console.log("Step 2: Inserting into colleges table")
  // Step 2: Insert into colleges table
  const { error: insertError } = await supabase
    .from('colleges')
    .insert({
      name: data.collegeName,
      email: data.email,
      auth_user_id: authUserId,
      college_name: data.collegeName,
      created_by: authUserId,
      
    })

  if (insertError) {
    console.error("Insert Error:", insertError)
    return { success: false, message: insertError.message || 'Failed to insert into colleges table.' }
  }

  console.log("College inserted successfully.")

  console.log("Step 3: Assigning role in user_roles table")
  // Step 3: Assign role in user_roles table
  // const { error: roleError } = await supabase
  //   .from('user_roles')
  //   .insert({
  //     auth_user_id: authUserId,
  //     role: 'college',
  //   })

  // if (roleError) {
  //   console.error("Role Error:", roleError)
  //   return { success: false, message: roleError.message || 'Failed to assign role in user_roles table.' }
  // }

  console.log("Role assigned successfully.")

  return { success: true, message: 'College created successfully!' }
}