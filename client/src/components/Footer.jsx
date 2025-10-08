import React from "react";

function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-teal-50 via-white to-green-50 border-t border-teal-100 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
          BloGrid
        </span>
        <span className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BloGrid. All rights reserved.
        </span>
        <span className="text-gray-400 text-xs">
          Made with <span className="text-teal-500">♥</span> by BloGrid Team
        </span>
      </div>
    </footer>
  );
}

export default Footer;