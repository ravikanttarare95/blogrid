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
import Footer from "./../components/Footer.jsx";
import UploadSection from "./../components/ImgUploadSec.jsx";
import dummyPoster from "./../assets/dummy-image.png";

function NewBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState(dummyPoster);
  const [user, setUser] = useState(null); // on 1st render the default value is null. So, whenever we use user we have to add quwstion mark (?) user?.name- If user has some value then only it will show data. If we don;t use ? then it will give an error.

  const saveBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          category,
          content,
          imgURL,
          // author: user?._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        } // for jwt check // why is JSON.parse not used
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
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Create New Blog
          </h1>

          <Button
            btnTitle="Create"
            btnVariant="primary"
            btnSize="md"
            type="button"
            onBtnClick={saveBlog}
            customStyle="w-auto"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            customStyle="!w-full bg-gray-50 text-gray-900 border border-gray-200"
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            name="select-category"
            id="select-category"
            value={category}
            className="shadow-md border border-gray-200 bg-gray-100 text-gray-900 py-3 px-4 rounded-lg focus:outline-2 focus:outline-teal-400 transition"
            onChange={(e) => setCategory(e.target.value)}
          >
            {BLOG_CATEGORIES.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-be gap-6">
          <UploadSection setImgURL={setImgURL} customStyle={"!w-full"} />
          <img
            src={imgURL}
            alt="Blog Poster"
            className="w-full min-w-50 h-55 object-cover rounded-lg"
          />
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <MarkdownEditor
            value={content}
            height="500px"
            onChange={(value) => setContent(value)}
            className="bg-gray-50"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewBlog;
