"use client";

import { useState } from "react";
import { redirect } from 'next/navigation'


export default function signupPage(){
  
const [form ,setform]=useState({name:"",email:"",password:"",role:"",});
const [message,setmessage]=useState("");
const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    const res=await fetch("/api/signup",{
        method:"POST",
         headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    });
    const data =await res.json();
    setmessage(data.message||data.error);
    redirect("/login");
};
return (

    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
           <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Name" required
          onChange={(e) => setform({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email" required
          onChange={(e) => setform({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" required
          onChange={(e) => setform({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded" />
        
        <div className="max-w-md mx-auto my-8">
  
  <div className="relative">
  
    <label  className="block text-sm font-medium text-white mb-1">
      Choose your role:
    </label>
    
    <select 
      id="role-select"
      className="block w-full px-4 py-2 pr-8 leading-tight bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
       focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
           value={form.role}
            onChange={(e) => setform({ ...form, role: e.target.value })}
            required
    >
      <option value="" disabled selected>-- Please select --</option>
      <option value="Software Developer" className="text-white">Software Developer</option>
      <option value="UI/UX Designer" className="text-white">UI/UX Designer</option>
      <option value="Project Manager" className="text-white">Project Manager</option>
      <option value="QA Engineer" className="text-white">QA Engineer</option>
      <option value="Backend Developer" className="text-white">Backend Developer</option>
      <option value="DevOps Engineer" className="text-white">DevOps Engineer</option>
      <option value="Frontend Developer" className="text-white">Frontend Developer</option>     
     <option value="Product Owner" className="text-white">Product Owner</option>
    </select>
    
  
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </div>
  </div>
  

  <div id="selected-fruit" className="mt-2 text-sm text-gray-600"></div>
</div>
<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
        </form>
        {message && <p className="mt-2 text-sm">{message}</p>}

    </div>
)

}
