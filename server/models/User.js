import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    provider: { type: String, default: "local" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
