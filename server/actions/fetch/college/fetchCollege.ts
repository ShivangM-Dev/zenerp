import { createClient } from "@/server/supabase/server";

export type Colleges = {
    id: string
    collegeName: string
    userName: string
    email: string
    contactNumber: string
    address: string
    state: string
    pinCode: string
}

export const fetchCollege = async (): Promise<Colleges[]> =>{
       
    
    const supabase = await createClient()

    const {data, error} = await supabase 
    .from('colleges')
    .select('id, collegeName, userName, email, contactNumber, address, state, pinCode')

    if(error){
        console.error('❌ Failed to fetch Colleges:', error)
        return[]
    }


    return data as Colleges[]
}