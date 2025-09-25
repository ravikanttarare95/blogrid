import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

function BlogCard({
  _id,
  title,
  content,
  status,
  category,
  publishedAt,
  createdAt,
  author,
  slug,
  blog,
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden my-6 max-w-4xl mx-auto">
      <div className=" relative w-full h-50 sm:w-56 flex-shrink-0">
        <img
          src="http://localhost:5173/public/logo.png"
          alt={title}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-2 left-2">
          {status !== "published" && (
            <span className="inline-block bg-yellow-100 px-2 rounded-full border text-xs text-yellow-600 mb-2">
              Draft
            </span>
          )}
        </span>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white font-semibold mr-2">
                {author.name.substring(0, 1)}
              </span>{" "}
              <div>
                {" "}
                <p className="font-medium text-gray-700">{author.name}</p>
                <p className="italic text-gray-500">{author.email}</p>
              </div>
            </div>

            <span className="italic inline-block ml-auto bg-green-100 px-2 rounded-full border text-sm text-green-600">
              {category}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl py-1 font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          <p className="mt-3 text-gray-700 leading-relaxed line-clamp-3">
            {content.substring(0, 150)}...
          </p>
        </>

        <div className="mt-4 flex items-end justify-between">
          <span className="inline-block text-sm text-gray-400">
            Created on {createdAt.substring(0, 10)}
          </span>
          {status == "published" ? (
            <Button
              btnTitle="Read More"
              btnVariant="primary"
              btnSize="md"
              onBtnClick={() => {
                navigate(`/blog/${slug}`);
              }}
            />
          ) : (
            <Button
              btnTitle="Edit"
              btnVariant="secondary"
              btnSize="md"
              onBtnClick={() => {
                navigate(`/edit/${slug}`);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
