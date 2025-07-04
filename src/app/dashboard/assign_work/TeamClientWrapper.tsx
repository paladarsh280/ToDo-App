
"use client"

import ClientTeam from "./ClientTeam"
import type { TeamMember, CurrentUser } from "@/types"

export default function TeamClientWrapper({
  team,
  currentUser,
}: {
  team: TeamMember[]
  currentUser: CurrentUser
}) {
  return <ClientTeam team={team} currentUser={currentUser} />
}
