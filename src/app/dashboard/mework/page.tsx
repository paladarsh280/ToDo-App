"use client"

import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [incompleteCount, setIncompleteCount] = useState(0)
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/my-tasks")
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || "Failed to load tasks.")
          return
        }

        setTasks(data.tasks)
        setUserId(data.userId)
        setIncompleteCount(
          data.tasks.filter((t: any) => t.status !== "Completed").length
        )
      } catch (err) {
        setError("❌ Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleComplete = async (title: string) => {
    try {
      const res = await fetch("/api/complete-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, taskTitle: title }),
      })

      const data = await res.json()
      if (res.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.title === title ? { ...task, status: "Completed" } : task
          )
        )
        setIncompleteCount((count) => Math.max(count - 1, 0))
      } else {
        alert(data.error || "Failed to mark task as completed.")
      }
    } catch {
      alert("❌ Could not update task. Please try again.")
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 My Tasks</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 font-semibold rounded-lg shadow">
            🔔 Incomplete Tasks:{" "}
            <span className="font-bold">{incompleteCount}</span>
          </div>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned.</p>
          ) : (
            tasks.map((task, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition mb-4"
              >
                <h2 className="text-lg font-semibold text-black mb-1">
                  {task.title}
                </h2>
                <p className="text-black">Priority: {task.priority}</p>
                <p className="text-black mb-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : task.status === "In Progress"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                {task.status !== "Completed" && (
                  <button
                    onClick={() => handleComplete(task.title)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}
