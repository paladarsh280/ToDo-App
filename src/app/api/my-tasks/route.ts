

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      tasks: user.tasks,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in GET /api/my-tasks:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
