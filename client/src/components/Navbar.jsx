import React from "react";
import Logo from "./../../public/logo.png";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-18 object-contain" />
        <span className="text-2xl font-bold text-white">BloGrid</span>
      </div>
    </nav>
  );
}

export default Navbar;
