import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import AllBlogs from "./views/AllBlogs";
import EditBlog from "./views/EditBlog";
import NewBlog from "./views/NewBlog";
import ReadBlog from "./views/ReadBlog";
import { Toaster } from "react-hot-toast";

import { BrowserRouter, Routes, Route } from "react-router";
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/all-blogs" element={<AllBlogs />} />
      <Route path="/edit-blog" element={<EditBlog />} />
      <Route path="/new-blog" element={<NewBlog />} />
      <Route path="/read-blog" element={<ReadBlog />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
