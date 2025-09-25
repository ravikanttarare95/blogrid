import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../utils.js";
import Navbar from "./../components/Navbar.jsx";
import axios from "axios";
import toast from "react-hot-toast";

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
      <h1>AllBlogs</h1>{" "}
      <p>{user ? `Hello! ${user.name} 👋🏻` : "Welcome Guest!"}</p>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 my-4 rounded">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="text-sm text-gray-600">
            By {blog.author.name} | Category: {blog.category}
          </p>
          <p className="mt-2">{blog.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default AllBlogs;
