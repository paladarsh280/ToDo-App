import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  await connectDB()
  const { userId, taskTitle } = await req.json()

  const user = await User.findById(userId)
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  // Find the task and mark it completed
  const task = user.tasks.find((t: any) => t.title === taskTitle)
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

  if (task.status !== "Completed") {
    task.status = "Completed"
    user.workCompleted = Math.max(user.workCompleted - 1, 0)
    await user.save()
  }

  return NextResponse.json({ message: "Task marked as completed" })
}
