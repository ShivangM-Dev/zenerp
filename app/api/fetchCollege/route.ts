import { NextResponse } from 'next/server'
import { fetchCollege } from '@/server/actions/college/fetch/fetchCollege' // Adjust path as needed

export const GET = async () => {
  console.log("🌐 GET /api/colleges called")

  try {
    const result = await fetchCollege()

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("🚨 Unexpected server error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
