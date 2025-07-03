'use client'

import React, { useEffect, useState } from 'react'

const CollegePage = () => {
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/fetchCollege')
        const data = await res.json()

        if (data.success) {
          setColleges(data.data)
          console.log('✅ Colleges fetched:', data.data)
        } else {
          console.error('❌ Failed to fetch colleges:', data.message)
        }
      } catch (err) {
        console.error('🚨 API error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">College Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600" />
            <span className="ml-4 text-gray-600">Loading colleges...</span>
          </div>
        ) : colleges.length === 0 ? (
          <p className="text-center text-gray-500">No colleges found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">{college.collegeName}</h2>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><span className="font-medium">Username:</span> {college.userName}</p>
                  <p><span className="font-medium">Email:</span> {college.email}</p>
                  <p><span className="font-medium">Phone:</span> {college.contactNumber}</p>
                  <p><span className="font-medium">Address:</span> {college.address}</p>
                  <p><span className="font-medium">State:</span> {college.state}</p>
                  <p><span className="font-medium">Zip:</span> {college.pinCode}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollegePage
