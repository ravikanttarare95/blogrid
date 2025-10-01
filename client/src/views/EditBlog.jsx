import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import MarkdownEditor, { header } from "@uiw/react-markdown-editor";
import Button from "./../components/Button.jsx";
import Input from "./../components/Input.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";
import { getCurrentUser } from "../utils.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function EditBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const { slug } = useParams();

  const loadBlogBySlug = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      if (response) {
        const blog = response.data.blog;
        setTitle(blog.title);
        setCategory(blog.category);
        setContent(blog.content);
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching blog:", error);
    }
  };

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          title,
          category,
          content,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // for jwt check
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating blog");
    }
  };

  const publishBlog = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response.data.message || "Error publishing blog");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlogBySlug();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-5 mt-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          Create New Blog
        </h1>
        <div className="space-y-3 mb-5">
          {" "}
          <Input
            type="text"
            id={"title"}
            value={title}
            customStyle="bg-slate-50! text-slate-900! border-gray-200!"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <select
            name="select-category"
            id="select-category"
            value={category}
            className="shadow-md border border-gray-200 bg-gray-100 text-gray-900 py-3 px-4 rounded-lg focus:outline-2 focus:outline-teal-400 "
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {BLOG_CATEGORIES.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <MarkdownEditor
          value={content}
          height="400px"
          onChange={(value) => setContent(value)}
          className="border rounded-md"
        />{" "}
        <div className="flex items-center gap-4 mt-4 justify-end">
          {" "}
          <Button
            btnTitle={"Save"}
            btnVariant={"secondary"}
            btnSize={"md"}
            type={"submit"}
            customStyle={"!w-fit !h-fit"}
            onBtnClick={() => {
              updateBlog();
            }}
          />
          <Button
            btnTitle={"Publish"}
            btnVariant={"primary"}
            btnSize={"md"}
            type={"submit"}
            customStyle={"!w-fit !h-fit"}
            onBtnClick={() => {
              publishBlog();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default EditBlog;
