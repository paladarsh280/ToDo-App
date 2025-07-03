import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import TeamClientWrapper from "./TeamClientWrapper";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function TeamPage() {
  await connectDB();

  const token = cookies().get("token")?.value;
  let currentUser = null;

  if (token) {
    try {
      currentUser = jwt.verify(token, JWT_SECRET) as {
        name: string;
        role: string;
        id: string;
        email: string;
      };
    } catch (err) {
      console.error("Invalid token");
    }
  }

  if (!currentUser) {
    return <div className="p-6 text-red-600">Unauthorized</div>;
  }

  const team = await User.find();
  const filteredTeam = team.filter(
    (member: any) => member.name !== currentUser?.name
  );

  return (
    <TeamClientWrapper
      team={JSON.parse(JSON.stringify(filteredTeam))}
      currentUser={currentUser}
    />
  );
}
