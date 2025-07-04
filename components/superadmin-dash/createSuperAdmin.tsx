'use client'
import React from 'react'
import CreateSuperAdminForm from './forms/createSuperAdminForm'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
const CreateSuperAdmin = () => {
  return (
    <div>
        <h1 className='text-4xl'>
          <CreateSuperAdminForm/>
        </h1>
    </div>
  )
}

export default CreateSuperAdmin
