import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load Environment variables from .env to process.env

const app = express();

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT number ${PORT}. \n`);
  connectDB();
});
