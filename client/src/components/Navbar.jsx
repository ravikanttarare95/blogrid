import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./../assets/logo.svg";
import { Menu, X } from "lucide-react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Button from "./Button";
import { getCurrentUser } from "./../utils.js";
import toast from "react-hot-toast";
import { SquarePen } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { to: "/", navItemTitle: "Home" },
    {
      to: "/new",
      navItemTitle: (
        <span className="flex gap-2 items-center">
          <SquarePen size={20} />
          Create
        </span>
      ),
    },
  ];
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const handleScroll = () => {
    setLastScroll((lastScroll) => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScroll) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      return currentScrollY;
    });
  };

  useEffect(() => {
    setUser(getCurrentUser());

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      } sticky top-0 z-50 lg:pt-0 transition-all duration-300`}
    >
      <div className="lg:w-[95%] mx-auto lg:rounded-full bg-white text-gray-800 shadow-md px-6 py-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-300">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-16 rounded-lg" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              BloGrid
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`border md:border-none border-slate-300 p-4 max-md:mb-5 rounded-lg flex-col md:flex-row md:flex md:items-center md:justify-end w-full gap-6 md:gap-8 transition-all duration-300 overflow-hidden ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 ">
            {NAV_ITEMS.map(({ to, navItemTitle }) => (
              <Link
                key={to}
                to={to}
                className="text-md font-medium hover:text-teal-500 transition-colors duration-200"
              >
                {navItemTitle}
              </Link>
            ))}
          </div>

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-teal-500"
                />
                <span className="font-medium text-gray-800">{user?.name}</span>
              </div>
              <Button
                type="button"
                btnVariant="primary"
                customStyle="!bg-gradient-to-br !from-red-400 !via-red-500 !to-red-600 !w-fit"
                btnTitle={
                  <>
                    <IoMdLogOut className="w-5 h-5" />
                    Logout
                  </>
                }
                btnSize="sm"
                onBtnClick={() => {
                  localStorage.clear();
                  setUser(null);
                  toast.success("Logout successful");
                  window.location.href = "/";
                }}
              />
            </>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Button
                type="button"
                customStyle="text-gray-800 border-gray-400"
                btnTitle={
                  <>
                    <FaSignInAlt className="w-5 h-5" />
                    Login
                  </>
                }
                btnVariant="secondary"
                btnSize="sm"
                onBtnClick={() => navigate("/login")}
              />
              <Button
                type="button"
                btnVariant="primary"
                btnTitle={
                  <>
                    <FaUserPlus className="w-5 h-5" />
                    Sign Up
                  </>
                }
                btnSize="sm"
                onBtnClick={() => navigate("/signup")}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
