import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Button from "./../components/Button.jsx";
import Input from "./../components/Input.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Footer from "./../components/Footer.jsx";
import UploadSection from "./../components/ImgUploadSec.jsx";

function EditBlog() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState("");

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
        setImgURL(blog.imgURL);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        { title, category, content, imgURL },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response?.data?.success) {
        toast.success("Blog updated successfully");
        setTimeout(() => navigate("/"), 2000);
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
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error publishing blog");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlogBySlug();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Edit Blog
          </h1>

          <div className="flex gap-3">
            <Button
              btnTitle="Save"
              btnVariant="secondary"
              btnSize="md"
              type="button"
              customStyle="w-auto"
              onBtnClick={updateBlog}
            />
            <Button
              btnTitle="Publish"
              btnVariant="primary"
              btnSize="md"
              type="button"
              customStyle="w-auto"
              onBtnClick={publishBlog}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            customStyle="bg-gray-50 text-gray-900 border border-gray-200"
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
            className="w-full h-55 object-cover rounded-lg"
          />
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <MarkdownEditor
            value={content}
            height="400px"
            onChange={(value) => setContent(value)}
            className="bg-gray-50"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditBlog;
