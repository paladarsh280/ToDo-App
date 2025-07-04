
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 })
    }

    if (!JWT_SECRET) {
      return NextResponse.json({ error: "Server misconfiguration: Missing JWT_SECRET" }, { status: 500 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      tasks: user.tasks,
      userId: user._id,
    })
  } catch (err) {
    console.error("Server error in /api/get-tasks:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
