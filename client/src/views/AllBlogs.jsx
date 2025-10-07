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
    fetchAllBlogs();
  }, [user]); ///////// why [user]

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
      <div className="py-5 px-6 sm:px-15 max-w-6xl mx-auto mt-8">
        <div className="mb-4 text-left">
          {user ? (
            <p className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Hello!{" "}
              <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent font-bold">
                {user.name}
              </span>
            </p>
          ) : (
            <p className="text-xl sm:text-2xl font-medium text-gray-600">
              Welcome Guest!
            </p>
          )}
        </div>

        <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
          Discover the latest posts, stories, and insights from our community.
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {blogs.length > 0 ? (
          blogs?.map((blog) => {
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
              likes,
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
                likes={likes}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No blogs found. Check back later!
          </p>
        )}
      </div>
    </>
  );
}

export default AllBlogs;
