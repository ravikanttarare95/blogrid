import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load Environment variables from .env file to process.env (env property in process object)
import { postSignup, postLogin } from "./controllers/user.js";

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log(`📶 Connected to MongoDB \n`);
    }
  } catch (err) {
    console.log(`❌ Error connecting MongoDB \n`, err);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy and running",
  });
});

app.post("/signup", postSignup);
app.post("/login", postLogin);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT number ${PORT}. \n`);
  connectDB();
});
