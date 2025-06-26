import {z} from 'zod'

export const superAdminSchema = z.object({
   
    username: z.string().min(3,{message: 'UserName must be atleast 3 character long.'}).max(20,{message:'UserName must be less than 20 characters.'}),

    first_name: z.string()
    .min(3,{message:'First Name must be atleast 3 character long'}),

    last_name: z.string()
    .min(3,{message: 'Last Name must be atleast 3 character long'}),

    email: z.string().email({message:"Enter a valid email address Eg: zen@example.com"}),

    password: z
    .string()
    .min(6,{message: 'Password must be at least six characters long.'})
    .max(20,{message:'Password must be less than 20 characters.'})
    .refine(
        (password)=>{
            const hasUpperCase = /[A-Z]/.test(password);
            return hasUpperCase; 
        }, {message:"Password must contain at least one uppercase letter."}
    )
    .refine(
        (password)=>{
            const hasLowerCase = /[a-z]/.test(password);
            return hasLowerCase;
        },{
            message: 'Password must contain at least one lowercase letter.'
        }
    )
    .refine(
        (password)=>{
            const hasNumber= /[0-9]/.test(password);
            return hasNumber;
        },{
            message:'Password must have at least one number.'
        }
    )
    .refine(
        (password)=>{
            const hasSpecialCharacter = /[!@#$%^&*()_+=[\]{}|:;'\",.?<>~`\\-]/.test(password);
            return hasSpecialCharacter;
        },{
            message: 'Password must have at least one speacial character.'
        }
    )


})

export type SuperAdminFormValues = z.infer<typeof superAdminSchema>