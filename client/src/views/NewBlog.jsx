import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Button from "./../components/Button.jsx";
import Input from "./../components/Input.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";
import { getCurrentUser } from "../utils.js";
import axios from "axios";
import { useNavigate } from "react-router";

function NewBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null); // on 1st render the default value is null. So, whenever we use user we have to add quwstion mark (?) user?.name- If user has some value then only it will show data. If we don;t use ? then it will give an error.

  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          category,
          content,
          author: user?._id,
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    const userLogin = getCurrentUser();
    setUser(userLogin);
    if (!userLogin) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-5 mt-8 bg-white rounded-xl shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Create New Blog
          </h1>

          <Button
            btnTitle={"Save"}
            btnVariant={"primary"}
            btnSize={"sm"}
            type={"submit"}
            customStyle={"w-fit! h-fit!"}
            onBtnClick={() => {
              saveBlog();
            }}
          />
        </div>
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
        />
      </div>
    </div>
  );
}

export default NewBlog;
