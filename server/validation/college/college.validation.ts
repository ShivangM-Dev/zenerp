import { z } from 'zod';

export const collegeSchema = z
  .object({
    collegeName: z
      .string()
      .min(3, { message: 'College Name must have at least 3 characters.' })
      .max(50, { message: 'College Name must be less than 50 characters.' }),

    userName: z
      .string()
      .min(3, { message: 'UserName must be at least 3 characters long.' })
      .max(20, { message: 'User Name must be less than 20 characters.' }),

    email: z.string().email(),

    contactNumber: z
      .string()
      .min(10, { message: 'Contact Number must have 10 digits.' })
      .max(10, { message: 'Contact Number must have 10 digits.' }),

    address: z
      .string()
      .min(3, { message: 'The Address must be at least 3 characters long.' }),

    state: z.string().min(3, { message: 'Please enter a valid state.' }),

    pinCode: z.string({ message: 'Please enter a valid Pin Code.' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .max(20, { message: 'Password must be less than 20 characters.' })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter.',
      })
      .refine((val) => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter.',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one number.',
      })
      .refine(
        (val) => /[!@#$%^&*()_+=[\]{}|:;'",.?<>~`\\/-]/.test(val),
        {
          message: 'Password must contain at least one special character.',
        }
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // this sets the error on confirmPassword field
  });

export type CollegeFormValues = z.infer<typeof collegeSchema>;
