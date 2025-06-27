import { z } from 'zod'

export const superAdminSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(20, { message: 'Username must be less than 20 characters.' }),

  first_name: z
    .string()
    .trim()
    .min(3, { message: 'First name must be at least 3 characters long.' }),

  last_name: z
    .string()
    .trim()
    .min(3, { message: 'Last name must be at least 3 characters long.' }),

  email: z
    .string()
    .trim()
    .email({ message: 'Enter a valid email address e.g. zen@example.com' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(20, { message: 'Password must be less than 20 characters.' })
    .refine(
      (password) => /[A-Z]/.test(password),
      { message: 'Password must contain at least one uppercase letter.' }
    )
    .refine(
      (password) => /[a-z]/.test(password),
      { message: 'Password must contain at least one lowercase letter.' }
    )
    .refine(
      (password) => /[0-9]/.test(password),
      { message: 'Password must contain at least one number.' }
    )
    .refine(
      (password) => /[!@#$%^&*()_+=[\]{}|:;'",.?<>~`\\/-]/.test(password),
      { message: 'Password must contain at least one special character.' }
    )
})

export type SuperAdminFormValues = z.infer<typeof superAdminSchema>
