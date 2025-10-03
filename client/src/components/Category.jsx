import React from "react";

function Category({ category }) {
  return (
    <span className="inline-block italic bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 text-sm text-yellow-600 font-medium shadow-sm transition-colors duration-200 hover:bg-yellow-100">
      {category}
    </span>
  );
}

export default Category;
