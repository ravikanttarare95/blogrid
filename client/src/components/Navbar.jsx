import React from "react";
import { Link } from "react-router";
import Logo from "./../../public/logo.png";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex flex-col md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-16 rounded-lg" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
          BloGrid
        </span>
      </div>
      <div className="mt-2 flex gap-10 text-lg">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/sign-up" className="hover:underline">
          Sign Up
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/all-blogs" className="hover:underline">
          All Blogs
        </Link>
        <Link to="/new-blog" className="hover:underline">
          New Blog
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
