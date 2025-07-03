import {z} from 'zod'

export const collegeAdminSchema = z.object({
    
    first_name: z.string()
    .min(2,{message:'First Name must be atleast 2 characters long.'})
    .max(50,{message:'First Name must be less than 50 characters.'}),

    last_name: z.string()
    .min(2,{message: 'Last Name must be atleast 2 characters long.'})
    .max(50, {message: 'Last Name must be less then 50 characters.'}),

    userName: z.string()
    .min(3,{message: 'Username must be atleast 3 characters long.'})
    .max(50,{message:'Username must be less than 50 characters long.'}),

    contactNumber: z
    .string()
    .min(10, { message: 'Contact Number must have 10 digits.' })
    .max(10, { message: 'Contact Number must have 10 digits.' }),

    
    email: z.string().email({message:'Enter a valid email address.'}),


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

export type CollegeAdminFormValues = z.infer<typeof collegeAdminSchema> 