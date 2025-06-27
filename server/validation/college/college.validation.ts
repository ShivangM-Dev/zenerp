import {z} from 'zod'

export const collegeSchema = z.object({
    collegeName: z.string()
    .min(3,{message:'College Name must have atleast 3 characters.'})
    .max(50,{message:'College Name must be less than 50 characters long.'}),

    userName: z.string()
    .min(3,{message: 'UserName must be at least 3 characters long.'})
    .max(20, {message:'User Name must be less than 20 characters.'}),

    email: z.string().email(),
    
    contactNumber: z.string()
    .min(10,{message:'Contact Number must have 10 Digits.'})
    .max(10,{message:'Contact Number must have 10 Digits.'}),

    address: z.string()
    .min(3,{message: 'The Address must be at least 3 characters long.'}),

    state: z.string().min(3,{message:'Please Enter a valid state.'}),

    pinCode: z.number({message:'Please Enter a valid Pin Code.'}),

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

export type CollegeFormValues = z.infer< typeof collegeSchema>