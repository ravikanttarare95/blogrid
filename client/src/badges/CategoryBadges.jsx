import React from "react";
import { BLOG_CATEGORY_STYLE } from "./../constants.js";

function CategoryBadges({ category }) {
  const CategoryStyle = BLOG_CATEGORY_STYLE[category];
  return (
    <div
      className={`${CategoryStyle?.className} text-sm md:text-md px-2 py-1 rounded-full border flex items-center gap-1`}
    >
      {CategoryStyle && <CategoryStyle.icon />}

      {category}
    </div>
  );
}

export default CategoryBadges;
