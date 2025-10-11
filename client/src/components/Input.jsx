import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  customStyle,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === "password" && isPasswordVisible ? "text" : type;
  return (
    <div className="relative w-full">
      <input
        type={inputType}
        id={id}
        placeholder={placeholder}
        value={value}
        className={` ${customStyle} w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg focus:outline-2 focus:outline-teal-400`}
        onChange={onChange}
      />
      {type === "password" && (
        <div
          className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer opacity-30 hover:opacity-50 transition-opacity duration-200"
          onClick={() => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
        >
          {isPasswordVisible ? <Eye /> : <EyeOff />}
        </div>
      )}
    </div>
  );
}

export default Input;
