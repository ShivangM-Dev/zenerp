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

import { createCollege } from '@/server/actions/superadmin/superadmin.actions'
import {
  collegeSchema,
  CollegeFormValues,
} from '@/server/validation/college/college.validation'

export default function CreateCollegeForm() {

  const [isPending, startTransition] = useTransition()

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
  ];


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      userName: '',
      collegeName: '',
      address: '',
      state: '',
      pinCode:'',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '', 
    },
  });
  

  

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
      <Dialog>

        <DialogTrigger asChild>
          <Button variant="outline">Add College</Button>
        </DialogTrigger>

        <DialogContent className="space-y-4">
        
        <DialogHeader>
            <DialogTitle>Add Super Admin</DialogTitle>
        </DialogHeader>

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
              <Label htmlFor="collegeName">College Name</Label>
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
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="Address of College"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              {...register("state")}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                type='number'
                id="pinCode"
                {...register('pinCode')}
                placeholder="121345"
              />
              {errors.pinCode && (
                <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="********"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
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
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}