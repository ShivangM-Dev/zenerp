'use server'

import { createClient } from "@/server/supabase/server"

export const fetchCollege = async () => {
  console.log("📍 Starting fetchCollege...")

  const supabase = await createClient()
  console.log("🔧 Supabase client initialized")

  const { data: userData, error: userError } = await supabase.auth.getUser()
  console.log("👤 Auth response:", { userData, userError })

  if (userError || !userData?.user) {
    console.error("❌ Auth Error:", userError)
    return {
      success: false,
      message: userError?.message || "Failed to fetch authenticated user",
      data: null,
    }
  }

  const userId = userData.user.id
  console.log(`✅ Authenticated user ID: ${userId}`)

  const { data, error } = await supabase
    .from("colleges")
    .select("*")
    .eq("auth_user_id", userId)

  console.log("🏫 College fetch response:", { data, error })

  if (error) {
    console.error("❌ Failed to fetch colleges:", error)
    return {
      success: false,
      message: "Failed to fetch colleges",
      data: null,
    }
  }

  console.log("✅ Colleges fetched successfully")
  return {
    success: true,
    message: "Colleges fetched successfully",
    data,
  }
}
