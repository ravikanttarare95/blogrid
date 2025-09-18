import React from "react";

function Input({ type, placeholder, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-700 bg-gray-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
  );
}

export default Input;
