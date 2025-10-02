import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load Environment variables from .env file to process.env (env property in process object)

import jwt from "jsonwebtoken";
import { postSignup, postLogin } from "./controllers/user.js";
import {
  postBlogs,
  fetchBlogs,
  fetchBlogsBySlug,
  putEditBlogBySlug,
  patchPublishBlogBySlug,
} from "./controllers/blog.js";

import Blog from "./models/Blog.js";

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

const jwtCheck = (req, res, next) => {
  req.user = null; /////why null
  const { authorization } = req.headers;

  if (!authorization) {
    res.json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid JWT Token" });
  }
};

const increaseViewCount = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug: slug });

    if (blog) {
      blog.viewCount += 1;
      await blog.save();
    }
  } catch (error) {
    console.log("Error Increasing View Count", error);
  }
  next();
};

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.post("/blogs", jwtCheck, postBlogs);
app.get("/blogs", fetchBlogs);
app.get("/blogs/:slug", increaseViewCount, fetchBlogsBySlug);
app.put("/blogs/:slug", jwtCheck, putEditBlogBySlug);
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlogBySlug);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT number ${PORT}. \n`);
  connectDB();
});
