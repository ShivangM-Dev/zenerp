'use client'

import { ColumnDef } from '@tanstack/react-table'

// Replace with your actual type if it differs
export type SuperAdmin = {
  id: string
  first_name: string
  last_name: string
  email: string
  auth_user_id: string
}

export const columns: ColumnDef<SuperAdmin>[] = [
  {
    accessorKey: 'first_name',
    header: 'First Name',
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'auth_user_id',
    header: 'Auth User ID',
  },
]
