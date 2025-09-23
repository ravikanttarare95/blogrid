import React from "react";

function Button({ type, btnTitle, onBtnClick, customStyle }) {
  return (
    <button
      type={type}
      className={`${customStyle} w-full py-2 px-5 bg-teal-300 rounded-lg font-semibold hover:bg-teal-400 transition-all duration-300 cursor-pointer`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
