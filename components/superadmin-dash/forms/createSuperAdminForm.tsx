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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { createSuperAdmin } from '@/server/actions/superadmin/superadmin.actions'
import {
  superAdminSchema,
  SuperAdminFormValues,
} from '@/server/validation/super-admin/super-admin.validation'


export default function CreateSuperAdminForm(){

    const [isPending, startTransition] = useTransition()

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<SuperAdminFormValues>({
      resolver: zodResolver(superAdminSchema),
      defaultValues: {
        username:'',
        first_name: '',
        last_name:'',
        email: '',
        password: '',
      },
    })
  
    const onSubmit = (data: SuperAdminFormValues) => {
      startTransition(async () => {
        const res = await createSuperAdmin(data)
  
        if (res.success) {
          toast.success('Super admin added successfully!')
          reset()
        } else {
          toast.error(res.message || 'Failed to add super admin.')
        }
      })
    }


  return (
    <div>
        <Dialog>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <DialogTrigger asChild>
            <Button variant="outline"> Add Super Admin</Button>
        </DialogTrigger>


        <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Super Admin</DialogTitle>
        </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                {...register('username')}
                placeholder="john_doe"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">First Name</Label>
              <Input
                id="fullName"
                {...register('first_name')}
                placeholder="John Doe"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">{errors.first_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Last Name</Label>
              <Input
                id="fullName"
                {...register('last_name')}
                placeholder="John Doe"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isPending ? 'Adding...' : 'Add Super Admin'}
            </Button>
        </DialogContent>
          </form>
      </Dialog>
      <Toaster position="top-center" richColors closeButton />

    </div>
  )
}
