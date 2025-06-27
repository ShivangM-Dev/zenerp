import CreateSuperAdmin from '@/components/superadmin-dash/createSuperAdmin'
import SuperAdminTabel from '@/components/superadmin-dash/table/superadminTable'
import React from 'react'

const page = () => {
  return (
    <div>
        Homepage
        <CreateSuperAdmin/>
        <SuperAdminTabel/>
    </div>
  )
}

export default page
