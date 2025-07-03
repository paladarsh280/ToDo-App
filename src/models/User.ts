import mongoose, { Document, Schema } from "mongoose"

export interface ITask {
  title: string
  priority: "Low" | "Medium" | "High"
  status: "Pending" | "In Progress" | "Completed"
}

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role:
    | "Software Developer"
    | "UI/UX Designer"
    | "Project Manager"
    | "QA Engineer"
    | "Backend Developer"
    | "DevOps Engineer"
    | "Frontend Developer"
    | "Product Owner"
  workCompleted: number
  tasks: ITask[]
  assignedToMe: ITask[]
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { _id: false }
)

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "Software Developer",
      "UI/UX Designer",
      "Project Manager",
      "QA Engineer",
      "Backend Developer",
      "DevOps Engineer",
      "Frontend Developer",
      "Product Owner",
    ],
    required: true,
  },
  workCompleted: { type: Number, default: 0 },
  tasks: { type: [TaskSchema], default: [] },
  assignedToMe: { type: [TaskSchema], default: [] },
})

const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
