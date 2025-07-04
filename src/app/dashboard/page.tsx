import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import Link from "next/link"
import Button from "@mui/material/Button"

const JWT_SECRET = process.env.JWT_SECRET!

export default function DashboardPage() {
  const token = cookies().get("token")?.value
  let user = null

  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET) as {
        name: string
        role: string
        id: string
        email: string
      }
    } catch (err) {
      console.error("Invalid token")
    }
  }

  if (!user) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 text-center text-red-600 text-lg">
        ❌ Unauthorized. Please <Link href="/login" className="text-blue-600 underline">Login</Link>.
      </div>
    )
  }

  return (
    <>
      {/* Header Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-extrabold text-blue-600 tracking-wide">
              Welcome
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/assign_work">
                <Button variant="outlined">Assign Work</Button>
              </Link>
              <Link href="/dashboard/mework">
                <Button variant="outlined">Pending Work</Button>
              </Link>
              <Link href="/dashboard/myassignwork">
                <Button variant="outlined">My Assigned Work</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-indigo-500 to-purple-600">
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">👤 {user.name}</h1>
            <p className="text-gray-500">📧 {user.email}</p>
            <p className="mt-1 text-sm text-indigo-600 font-medium bg-indigo-100 inline-block px-3 py-1 rounded-full">
              Role: {user.role}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
