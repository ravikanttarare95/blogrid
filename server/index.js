import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); // Load Environment variables from .env file to process.env (env property in process object)

import {
  postSignup,
  postLogin,
  postFavouritesById,
  getFavourites,
} from "./controllers/user.js";

import {
  postBlogs,
  fetchBlogs,
  fetchMyDraftBlogs,
  fetchMyPublishedBlogs,
  fetchBlogsBySlug,
  putEditBlogBySlug,
  patchPublishBlogBySlug,
  deleteMyBlogById,
  postlikeBySlug,
} from "./controllers/blog.js";

import { postCommentBySlug, getCommentBySlug } from "./controllers/comment.js";

import Blog from "./models/Blog.js";
import authRouter from "./routes/authRoutes.js";
import jwtCheck from "./middlewares/jwtCheck.js";

import passport from "./configs/passport.js";

import photokit from "./configs/photokit.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
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
app.get("/blogs/me/draft", jwtCheck, fetchMyDraftBlogs);
app.get("/blogs/me/published", jwtCheck, fetchMyPublishedBlogs);
app.get("/blogs/favourites", jwtCheck, getFavourites);
app.get("/blogs/:slug", increaseViewCount, fetchBlogsBySlug);
app.put("/blogs/:slug", jwtCheck, putEditBlogBySlug);
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlogBySlug);

app.post("/blogs/:slug/comments", jwtCheck, postCommentBySlug);
app.get("/blogs/:slug/comments", getCommentBySlug);

app.post("/blogs/:slug/likes", jwtCheck, postlikeBySlug);

app.delete("/blogs/:id", jwtCheck, deleteMyBlogById);

app.post("/blogs/:blogId/favourites", jwtCheck, postFavouritesById);

app.use("/auth", authRouter);

app.get("/imagekit-auth", (req, res) => {
  const TempCred = photokit.getAuthenticationParameters();
  if (TempCred) {
    res.json(TempCred);
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT number ${PORT}. \n`);
  connectDB();
});
