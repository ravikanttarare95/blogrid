import React from "react";

function Category({ category }) {
  return (
    <span className="italic inline-block ml-auto bg-yellow-50 px-2 pb-0.5 rounded-full border border-yellow-200 text-sm text-yellow-600 shadow-sm">
      {category}
    </span>
  );
}

export default Category;
