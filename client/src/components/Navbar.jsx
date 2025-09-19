import React, { useState } from "react";
import { Link } from "react-router";
import Logo from "./../../public/logo.png";
import { LogIn, UserPlus, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NAV_ITEMS = [
    { to: "/", navItemTitle: "Home" },
    { to: "/all-blogs", navItemTitle: "Blogs" },
    { to: "/new-blog", navItemTitle: "Create Blogs" },
  ];

  return (
    <div className="lg:pt-5 transition-all duration-300">
      <nav className="lg:w-[80%] mx-auto lg:rounded-full bg-gray-900 text-white shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-15 rounded-lg" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              BloGrid
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`flex-col md:flex-row md:flex md:items-center md:justify-end w-full gap-6 md:gap-8 transition-all duration-300 overflow-hidden ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            {NAV_ITEMS.map(({ to, navItemTitle }) => (
              <Link
                key={to}
                to={to}
                className="text-md font-medium hover:text-teal-400 transition-colors duration-200"
              >
                {navItemTitle}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 border-2 border-teal-400 bg-gray-800 text-md rounded-full font-semibold text-teal-200 hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>

            <Link
              to="/sign-up"
              className="flex items-center gap-2 px-4 py-2 border-2 border-teal-500 bg-teal-500 text-md rounded-full font-semibold text-white hover:bg-teal-600 transition-all duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
