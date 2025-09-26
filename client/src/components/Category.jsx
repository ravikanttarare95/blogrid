import React from "react";

function Category({ category }) {
  return (
    <span className="italic inline-block ml-auto bg-green-100 px-2 pb-0.5 rounded-full border text-sm text-green-600">
      {category}
    </span>
  );
}

export default Category;
