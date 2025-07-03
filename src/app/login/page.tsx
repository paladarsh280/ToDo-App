// "use client";
// import { useState } from "react";
// import { redirect } from 'next/navigation'
// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("/api/login", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });
    
//     const data = await res.json();
    
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       setMessage("Login successful");
//     } else {
//       setMessage(data.error);
//     }
//    // redirect("/dashboard");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input type="email" placeholder="Email" required
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="w-full border p-2 rounded" />
//         <input type="password" placeholder="Password" required
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full border p-2 rounded" />
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Login</button>
//       </form>
//       {message && <p className="mt-2 text-sm">{message}</p>}
//     </div>
//   );
// }

"use client"
import { useState } from "react"
import { redirect, useRouter } from "next/navigation"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()

    if (res.ok) {
      setMessage(" Login successful!")
     redirect("/dashboard");
    } else {
      setMessage(` ${data.error}`)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}

