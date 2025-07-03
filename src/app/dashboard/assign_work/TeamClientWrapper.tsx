"use client";

import ClientTeam from "./ClientTeam";

export default function TeamClientWrapper({
  team,
  currentUser,
}: {
  team: any[];
  currentUser: any;
}) {
  return <ClientTeam team={team} currentUser={currentUser} />;
}
