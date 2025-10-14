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
import AuthSuccess from "./views/AuthSuccess";
import NotFound from "./views/NotFound.JSX";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:slug" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
