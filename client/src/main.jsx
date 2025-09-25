import { createRoot } from "react-dom/client";
import "./index.css";
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
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      {/*:id or :slug*/}
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
