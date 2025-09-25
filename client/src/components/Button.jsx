import React from "react";

function Button({
  type,
  btnTitle,
  onBtnClick,
  customStyle,
  btnSize,
  btnVariant,
}) {
  const sizeClasses =
    btnSize === "lg"
      ? "text-lg sm:text-xl px-8 py-3"
      : btnSize === "sm"
      ? "text-sm sm:text-base px-4 py-1.5"
      : "text-base sm:text-lg px-5 py-2.5";

  const variantClasses =
    btnVariant === "primary"
      ? "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 hover:to-teal-700 text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)] "
      : btnVariant === "secondary"
      ? "border border-teal-40 text-teal-40 bg-transparent hover:bg-teal-500/20"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300";

  return (
    <button
      type={type}
      className={`${customStyle} ${sizeClasses} ${variantClasses} font-semibold rounded-full transition duration-300 cursor-pointer`}
      onClick={onBtnClick}
    >
      <span className="flex gap-1.5 items-center justify-center">
        {btnTitle}
      </span>
    </button>
  );
}

export default Button;
