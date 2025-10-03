import React from "react";

function Input({ type, id, placeholder, value, onChange, customStyle }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      className={` ${customStyle} w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg focus:outline-2 focus:outline-teal-400`}
      onChange={onChange}
    />
  );
}

export default Input;
