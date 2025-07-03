// import { NextRequest,NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(req:NextRequest){ 
//     await connectDB();
//     const {name,email,password,role}=await req.json();

//     const existing=await User.findOne({email});
//     if(existing) return NextResponse.json({
//         error:"User already exists"
//     },{status:400}
// );
// const hashedPassword=await bcrypt.hash(password,8);
// await User.create({name,email,password:hashedPassword,role});
// return NextResponse.json({message:"signup successful"});

// }
import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  await connectDB()
  const { name, email, password, role } = await req.json()

    const existing=await User.findOne({email});
    if(existing) return NextResponse.json({
        error:"User already exists"
    },{status:400}
                );
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role, 
  })

  return NextResponse.json({ message: 'User created', user }, { status: 201 })
}
