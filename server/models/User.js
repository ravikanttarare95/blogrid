import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    googleId: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    provider: { type: String, default: "local" },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
