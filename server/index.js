import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load Environment variables from .env to process.env

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT number ${PORT}. \n`);
});
