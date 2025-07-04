// src/app/api/complete-task/route.ts
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { userId, taskTitle } = await req.json()

    if (!userId || !taskTitle) {
      return NextResponse.json({ error: "Missing userId or taskTitle" }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const task = user.tasks.find((t: any) => t.title === taskTitle)
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    if (task.status !== "Completed") {
      task.status = "Completed"
      user.workCompleted = Math.max((user.workCompleted || 0) - 1, 0)
      await user.save()
    }

    return NextResponse.json({ message: "Task marked as completed" })
  } catch (error) {
    console.error("Error in /api/complete-task:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
