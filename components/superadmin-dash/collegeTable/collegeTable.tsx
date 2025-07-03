import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/server/supabase/server" // Adjust path as needed
import { SuperAdmin } from "@/server/actions/superadmin/fetchSuperAdmin" // Adjust path as needed
import { Colleges } from "@/server/actions/fetch/college/fetchCollege"

async function getData(): Promise<Colleges[]> {
    
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

export default async function CollegesTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Colleges</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
