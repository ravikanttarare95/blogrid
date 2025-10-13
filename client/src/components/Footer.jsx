import React from "react";
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa6";
import Logo from "./../assets/logo.svg";

function Footer() {
  return (
    <footer className="mt-10 bg-gradient-to-r from-teal-50 via-white to-green-50 border-t border-teal-100 shadow-inner px-4 py-4 flex flex-col sm:flex-row items-center justify-around gap-4">
      <Link to={"/"} className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-16 rounded-lg" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
          BloGrid
        </span>
      </Link>
      <span className="text-gray-500 text-sm">
        © {new Date().getFullYear()} BloGrid. All rights reserved.
      </span>
      <a href="https://github.com/ravikanttarare95/blogrid.git" target="_blank">
        <FaGithub
          size={35}
          className="cursor-pointer hover:scale-110 hover:text-teal-600 transition-scale duration-300"
        />
      </a>
    </footer>
  );
}

export default Footer;
