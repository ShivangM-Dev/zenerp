'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { login,resendConfirmation } from '@/server/actions/login.actions'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'
import gsap from 'gsap'
import { ArrowLeft } from 'lucide-react'



export default function LoginPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [selectedRole, setSelectedRole] = useState('') // purely visual, not sent to server

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append('email', formData.email)
    form.append('password', formData.password)

    startTransition(() => {
      login(form).then((res) => {
        if (res?.error) {
          if (
            res.error.includes('email is not confirmed') ||
            res.error.includes('confirmation link has been sent')
          ) {
            toast.info(res.error)
          } else {
            toast.error(res.error)
          }
        } else if (res?.redirect) {
          router.push(res.redirect)
        }
      })
    })
  }

  const handleResendConfirmation = () => {
    if (!formData.email) {
      toast.warning('Please enter your email first')
      return
    }

    startTransition(() => {
      resendConfirmation(formData.email).then((res) => {
        if (res?.error) {
          toast.error(res.error)
        } else {
          toast.success('Confirmation email resent!')
        }
      })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl space-y-6 border border-orange-100"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2 group"
        >
          <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors" />
        </Button>
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Welcome Back 👋
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
         

          <div className="space-y-2">
            <Label htmlFor="email" className="text-orange-800">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="border-orange-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-orange-800">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="border-orange-300"
            />
            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-orange-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={handleResendConfirmation}
                className="text-orange-500 hover:underline"
              >
                Resend Confirmation Email
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
          >
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  )
}