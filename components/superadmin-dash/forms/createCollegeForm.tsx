'use client'
import React from 'react'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { createCollege } from '@/server/actions/superadmin/superadmin.actions'
import {
  collegeSchema,
  CollegeFormValues,
} from '@/server/validation/college/college.validation'

export default function CreateCollege() {

  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      userName: '',
      address: '',
      email: '',
      password: '',
      collegeName: '',
      
    },
  })

  const onSubmit = (data: CollegeFormValues) => {
    startTransition(async () => {
      const res = await createCollege(data)

      if (res.success) {
        toast.success('College  added successfully!')
        reset()
      } else {
        toast.error(res.message || 'Failed to add College Admin.')
      }
    })
  }

  return (
    <div>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Add College</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                {...register('userName')}
                placeholder="college_admin123"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="collegeName">Full Name</Label>
              <Input
                id="collegeName"
                {...register('collegeName')}
                placeholder="John Doe"
              />
              {errors.collegeName && (
                <p className="text-red-500 text-sm">{errors.collegeName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="admin@college.com"
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

            <div className="space-y-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                {...register('collegeName')}
                placeholder="XYZ College"
              />
              {errors.collegeName && (
                <p className="text-red-500 text-sm">{errors.collegeName.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isPending ? 'Adding...' : 'Add College'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}