import connectDB from "@/lib/db"
import User from "@/models/User"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import type { CurrentUser, TeamMember } from "@/types"
import TeamClientWrapper from "./TeamClientWrapper" 

const JWT_SECRET = process.env.JWT_SECRET!

export default async function TeamPage() {
  await connectDB()

  const token = cookies().get("token")?.value
  let currentUser: CurrentUser | null = null

  if (token) {
    try {
      currentUser = jwt.verify(token, JWT_SECRET) as CurrentUser
    } catch {
      console.error("Invalid token")
    }
  }

  if (!currentUser) {
    return <div className="p-6 text-red-600">Unauthorized</div>
  }

  const team = await User.find({}, { name: 1, role: 1, email: 1, _id: 0 }).lean() as TeamMember[]
  const filteredTeam = team.filter((member) => member.name !== currentUser!.name)

  return (
    <TeamClientWrapper
      team={JSON.parse(JSON.stringify(filteredTeam))}
      currentUser={currentUser}
    />
  )
}
