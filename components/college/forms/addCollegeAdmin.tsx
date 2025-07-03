'use client'

import React from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import {
  collegeAdminSchema, CollegeAdminFormValues
} from '@/server/validation/college-admin/collegeAdmin.validation'

const AddCollegeAdmin = () => {
  return (
    <div>
      <h1>Add College Admin</h1>      
    </div>
  )
}

export default AddCollegeAdmin
