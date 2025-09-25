import React from "react";
import Button from "./Button";

function BlogCard({ blog }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden my-6 max-w-4xl mx-auto">
      <div className="w-full h-50 sm:w-56 flex-shrink-0">
        <img
          src="http://localhost:5173/public/logo.png"
          alt={blog.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200 line-clamp-2 flex items-center gap-2 p-2 rounded">
            <p className="inline-block">{blog.title}</p>
            <span className="italic inline-block ml-auto bg-green-100 px-3 py-1 rounded-full border text-sm text-green-600">
              {blog.category}
            </span>{" "}
          </h2>

          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-semibold mr-2">
              {blog.author.name.substring(0, 1)}
            </span>{" "}
            <div>
              {" "}
              <p className="font-medium text-gray-700">{blog.author.name}</p>
              <p className="italic text-gray-400">{blog.author.email}</p>
            </div>
          </div>

          <p className="mt-3 text-gray-700 leading-relaxed line-clamp-3">
            {blog.content.substring(0, 150)}...
          </p>
        </div>

        <div className="mt-4 ml-auto">
          <Button btnTitle="Read More" btnVariant="primary" btnSize="sm" />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
