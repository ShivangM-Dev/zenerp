import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/server/supabase/server" // Adjust path as needed
import { SuperAdmin } from "@/server/actions/superadmin/fetchSuperAdmin" // Adjust path as needed

async function getData(): Promise<SuperAdmin[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("superadmin")
    .select("id, first_name, last_name, email, auth_user_id")

  if (error) {
    console.error("❌ Failed to fetch superadmins:", error)
    return []
  }

  return data as SuperAdmin[]
}

export default async function SuperAdminTabel() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Super Admins</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
