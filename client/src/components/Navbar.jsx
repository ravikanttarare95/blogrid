import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./../../public/logo.png";
import { Menu, X } from "lucide-react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Button from "./Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { to: "/", navItemTitle: "Home" },
    { to: "/new", navItemTitle: "Create Blogs" },
  ];

  return (
    <div className="sticky top-0 z-50 lg:pt-2 transition-all duration-300">
      <nav className="lg:w-[80%] mx-auto lg:rounded-full bg-gray-900 text-white shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-15 rounded-lg" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-200 to-green-200 bg-clip-text text-transparent">
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
            <Button
              type={"button"}
              customStyle={"text-white border-white "}
              btnTitle={
                <>
                  <FaSignInAlt className="w-5 h-5" />
                  Login
                </>
              }
              btnVariant={"secondary"}
              btnSize={"sm"}
              onBtnClick={() => {
                navigate("/login");
              }}
            />
            <Button
              type={"button"}
              btnVariant={"primary"}
              btnTitle={
                <>
                  <FaUserPlus className="w-5 h-5" />
                  Sign Up
                </>
              }
              btnSize={"sm"}
              onBtnClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
