"use client"

import { useState } from "react"
import Button from "@mui/material/Button"

export default function ClientTeam({
  team,
  currentUser,
}: {
  team: any[]
  currentUser: { name: string }
}) {
  const [forms, setForms] = useState<{
    [key: string]: { title: string; priority: string; duration: string }
  }>({})

  const [messages, setMessages] = useState<{ [key: string]: string }>({})

  const handleInputChange = (name: string, field: string, value: string) => {
    setForms((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value,
      },
    }))
  }

  const assignWork = async (assigneeName: string) => {
    const form = forms[assigneeName]
    if (!form?.title || !form?.priority || !form?.duration) {
      setMessages((prev) => ({
        ...prev,
        [assigneeName]: "❌ Please fill all fields.",
      }))
      return
    }

    const task = {
      title: form.title,
      priority: form.priority,
      status: "Pending",
    }

    try {
      const res = await fetch("/api/assign-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: currentUser.name,
          to: assigneeName,
          task,
        }),
      })

      const data = await res.json()
      setMessages((prev) => ({
        ...prev,
        [assigneeName]: data.message || data.error || "",
      }))
    } catch (err) {
      console.error(err)
      setMessages((prev) => ({
        ...prev,
        [assigneeName]: "❌ Something went wrong",
      }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Team Members</h1>

      {team.map((member, i) => {
        const form = forms[member.name] || {
          title: "",
          priority: "",
          duration: "",
        }

        const message = messages[member.name]

        return (
          <div
            key={i}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-8 text-center"
          >
            <div className="text-4xl font-bold text-indigo-700 mb-2">
              {member.name}
            </div>
            <p className="text-gray-600 text-lg mb-4">{member.role}</p>

            <div className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Describe work"
                value={form.title}
                onChange={(e) =>
                  handleInputChange(member.name, "title", e.target.value)
                }
                className="w-full border p-2 rounded border-black text-black"
              />
              <select
                value={form.priority}
                onChange={(e) =>
                  handleInputChange(member.name, "priority", e.target.value)
                }
                className="w-full border p-2 rounded border-black text-black"
              >
                <option value="">-- Priority --</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={form.duration}
                onChange={(e) =>
                  handleInputChange(member.name, "duration", e.target.value)
                }
                className="w-full border p-2 rounded border-black text-black"
              >
                <option value="">-- Duration --</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
              </select>
            </div>

            <Button
              variant="contained"
              color="success"
              onClick={() => assignWork(member.name)}
            >
              Assign Work
            </Button>

            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.startsWith("❌") ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
