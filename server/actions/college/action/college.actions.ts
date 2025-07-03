'use server'

import { createClient } from "@/server/supabase/server"
import { CollegeAdminFormValues } from "@/server/validation/college-admin/collegeAdmin.validation"

export const createCollegeAdmin = async (data: CollegeAdminFormValues)=>{
    
    console.log('🔧 Creating Supabase client...')
    const supabase = await createClient()

    console.log('🧪 Attempting to create auth User')

    const { data: authUser, error: authError} = await supabase.auth.admin.createUser({
        email: data.email,
        password:data.password,
        email_confirm:true,
        user_metadata:{
            fullName: `${data.first_name} ${data.last_name}`,
            username: data.userName,
            role: 'college',

        },
    })

    if(authError || !authUser?.user?.id){
        
        console.error('❌ Auth createUser error:', authError)
        return{
            success: false,
            message: authError?.message || 'Failed to create user in auth.',

        }
    }

    const authUserId = authUser.user.id
    console.log('✅ Auth User created with ID:', authUserId)
    // inserting User into table.
    console.log('📥Inserting into college table....')

    const {error: insertError} = await supabase
    .from('colleges')
    .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        full_name: `${data.first_name} ${data.last_name}`,
        username: data.userName,
        contactNumber: data.contactNumber,
        auth_user_id: authUserId
    })

}