import CollegesTable from '@/components/superadmin-dash/collegeTable/superadminTable'
import CreateCollege from '@/components/superadmin-dash/createColllege'
import CreateSuperAdmin from '@/components/superadmin-dash/createSuperAdmin'
import SuperAdminTabel from '@/components/superadmin-dash/table/superadminTable'
import React from 'react'

const page = () => {
  return (
    <div>
        Homepage
        <CreateSuperAdmin/>
        <SuperAdminTabel/>
        <CreateCollege/>
        <CollegesTable/>
    </div>
  )
}

export default page
