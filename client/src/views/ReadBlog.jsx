import React, { useEffect, useState } from "react";
import poster from "./../assets/poster.jpg";
import { useParams } from "react-router";
import axios from "axios";
import Category from "./../components/Category.jsx";
import MarkdownEditor from "@uiw/react-markdown-editor";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const getBlogBySlug = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      if (response) {
        setBlog(response?.data?.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    getBlogBySlug();
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="relative h-72 sm:h-96 overflow-hidden rounded shadow-lg">
        <span className="absolute right-3 top-2">
          <Category category={blog.category} />
        </span>
        <img
          src={poster}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-sm sm:text-base mb-2 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white font-bold">
              {blog?.author?.name?.substring(0, 1)}
            </span>

            <span className="font-semibold text-white">
              {blog?.author?.name}
            </span>
          </p>

          <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
            {blog?.title}
          </h1>
        </div>
      </div>

      <MarkdownEditor.Markdown
        source={blog.content || "Blog content will appear here..."}
        className="mt-8"
      />
    </div>
  );
}

export default ReadBlog;
