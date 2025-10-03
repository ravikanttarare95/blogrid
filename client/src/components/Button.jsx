import React from "react";

function Button({
  type,
  btnTitle,
  onBtnClick,
  customStyle = "",
  btnSize,
  btnVariant,
}) {
  const sizeClasses =
    btnSize === "lg"
      ? "text-lg sm:text-xl px-6 py-3 rounded-lg"
      : btnSize === "sm"
      ? "text-sm sm:text-base px-3 py-1.5 rounded-full"
      : "text-base sm:text-lg px-4 py-2 rounded-md";

  const variantClasses =
    btnVariant === "primary"
      ? "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg [text-shadow:_0_1px_4px_rgba(0,0,0,0.3)]"
      : btnVariant === "secondary"
      ? "border border-teal-600 text-teal-600 bg-teal-500/10 hover:bg-teal-500/20 shadow-sm hover:shadow-md"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300 shadow-sm";

  return (
    <button
      type={type}
      className={`${customStyle} ${sizeClasses} ${variantClasses} font-semibold transition duration-300 cursor-pointer flex items-center justify-center gap-1.5`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
