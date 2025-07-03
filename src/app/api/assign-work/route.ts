import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  await connectDB()

  const { from, to, task } = await req.json()

  if (!from || !to || !task) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  try {
    const assigner = await User.findOne({ name: from })
    const assignee = await User.findOne({ name: to })

    if (!assigner || !assignee) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    assigner.assignedToMe.push(task)
    assignee.tasks.push(task)
    assignee.workCompleted += 1

    await assigner.save()
    await assignee.save()

    return NextResponse.json({ message: `Work assigned to ${to}` })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
