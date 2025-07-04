import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET!

export default async function DashboardPage() {
  await connectDB()

  const token = cookies().get("token")?.value
  let user = null

  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
      user = await User.findById(decoded.id).lean()
    }
  } catch (err) {
    console.error("Token error:", err)
  }

  if (!user) {
    return <div className="p-6 text-red-500">Unauthorized. Please login.</div>
  }

  const assignedToMe = user.assignedToMe || []
  const incompleteCount = assignedToMe.filter((task: any) => task.status !== "Completed").length

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 My Tasks</h1>

      <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 font-semibold rounded-lg shadow">
        🔔 Incomplete Tasks: <span className="font-bold">{incompleteCount}</span>
      </div>

      {assignedToMe.length === 0 ? (
        <p className="text-gray-500">No tasks assigned.</p>
      ) : (
        assignedToMe.map((task: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition mb-4"
          >
            <h2 className="text-lg font-semibold text-black mb-1">{task.title}</h2>
            <p className="text-black">Priority: {task.priority}</p>
            <p className="text-black">
              Status:{" "}
              <span
                className={`font-semibold ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : task.status === "In Progress"
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {task.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  )
}
