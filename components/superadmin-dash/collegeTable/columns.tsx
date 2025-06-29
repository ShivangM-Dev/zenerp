'use client'

import { ColumnDef } from '@tanstack/react-table'

// Replace with your actual type if it differs
export type Colleges = {
  id: string
  collegeName: string
  userName: string
  email: string
  contactNumber: string
  address: string
  state: string
  pinCode: string
}

export const columns: ColumnDef<Colleges>[] = [
  {
    accessorKey: 'collegeName',
    header: 'College Name',
  },
  {
    accessorKey: 'userName',
    header: 'User Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact Number',
  },
  {
    accessorKey:'address',
    header:'Address',
  },
  {
    accessorKey:'state',
    header:'State',
  },  
  {
    accessorKey:'pinCode',
    header:'Pin Code',
  },

]
