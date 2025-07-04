
import User from "@/models/User"
import connectDB from "@/lib/db"

interface TeamMember {
  _id: string
  name: string
  role: string
}

export default async function TeamPage() {
  await connectDB()

  const team: TeamMember[] = await User.find().lean()

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Team Members</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {member.name}
            </h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
