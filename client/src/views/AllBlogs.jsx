import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../utils.js";
import Navbar from "./../components/Navbar.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "./../components/BlogCard.jsx";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    if (user) {
      //writing if blog bacause it takes time to set current user so on first render it is null, so fetchAllBlogs will show else toast.
      fetchAllBlogs();
    }
  }, [user]);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?authorId=${user?._id || ""}`
      );
      if (response?.data?.data?.length > 0) {
        setBlogs(response.data.data);
        toast.success(response?.data?.message, { id: "fetchBlogs" });
      } else {
        toast.error("Data not found.", { id: "fetchBlogs" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching blogs", {
        id: "fetchBlogs",
      });
    }
  };

  return (
    <>
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

      <div className="p-5">
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
            viewCount,
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
              viewCount={viewCount}
            />
          );
        })}
      </div>
    </>
  );
}

export default AllBlogs;
