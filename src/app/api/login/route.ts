// import { NextRequest,NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import  jwt  from "jsonwebtoken";

// export async function POST(req:NextRequest){  
//     await connectDB();
//     const {email ,password}=await req.json();

//     const user =await User.findOne({email});
//     if(!user) return NextResponse.json ({error:"User not found"},{status:400});

//     const isvalid=await bcrypt.compare(password,user.password);
//     if(!isvalid) return NextResponse.json({error:"Invalid Credential"},{status:400});

//        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//     expiresIn: "1d",
//   });
   
//   const res=NextResponse.json({message:"Login Successfully"});
 
//   res.cookies.set('token',token,{
//     httpOnly:true,
//      maxAge: 60 * 60 * 24, 
//   })
//   return res;
// }
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  await connectDB()
  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
  }

  const token = jwt.sign({ name:user.name,role:user.role,id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  })

  const res = NextResponse.json({ message: "Login successful" })
  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  return res
}
