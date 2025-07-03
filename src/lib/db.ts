import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected: boolean = false;

const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState === 1;

  console.log("✅ MongoDB connected");
};

export default connectDB;
