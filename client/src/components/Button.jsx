import React from "react";

function Button({ type, btnTitle, onBtnClick }) {
  return (
    <button
      type={type}
      className="w-full py-3 bg-teal-500 rounded-lg font-semibold hover:bg-teal-600 transition-all duration-300 cursor-pointer"
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
