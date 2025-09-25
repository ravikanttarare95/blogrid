import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../utils.js";
import Navbar from "./../components/Navbar.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "./../components/BlogCard.jsx";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      if (response) {
        setBlogs(response.data.data);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching blogs");
    }
  };
  useEffect(() => {
    setUser(getCurrentUser());
    fetchAllBlogs();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-center py-10 px-4 rounded-lg max-w-6xl mx-auto">
        <div className="mb-4 text-left">
          <p className="text-lg text-gray-700">
            {user ? (
              <>
                <span className="text-3xl font-medium text-gray-800">
                  Hello!{" "}
                </span>
                <span className="text-3xl font-semibold text-teal-600">
                  {user.name}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-600">
                Welcome Guest!
              </span>
            )}
          </p>
        </div>

        <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
          Discover the latest posts, stories, and insights from our community.
        </p>
      </div>

      {blogs.map((blog) => {
        const {
          _id,
          title,
          content,
          status,
          category,
          publishedAt,
          createdAt,
          author,
          slug,
        } = blog;
        return (
          <BlogCard
            key={_id}
            id={_id}
            title={title}
            content={content}
            status={status}
            category={category}
            publishedAt={publishedAt}
            createdAt={createdAt}
            author={author}
            slug={slug}
          />
        );
      })}
    </div>
  );
}

export default AllBlogs;
