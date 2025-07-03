
import User from "@/models/User";
import connectDB from "@/lib/db";

export default async function Team() {
  await connectDB();

  const team = await User.find(); 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-1 text-black">{member.name}</h2>
            <p className="text-black text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
