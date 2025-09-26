import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { SquarePen } from "lucide-react";
import Category from "./Category";
import poster1 from "./../../public/poster.jpg";

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
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden my-6 max-w-5xl mx-auto">
      <div className="relative w-full sm:w-72 md:w-80 flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/10 to-transparent z-10"></div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

        <img
          src={poster1}
          alt={title}
          className="w-full h-48 sm:h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {status !== "published" && (
          <span className="absolute top-3 left-3 z-20 inline-block bg-yellow-50 px-3 py-0.5 rounded-full border border-yellow-200 text-xs font-medium text-yellow-600 shadow-sm">
            Draft
          </span>
        )}

        <p className="absolute bottom-3 right-3 sm:hidden z-20">
          <Category category={category} />
        </p>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="flex items-center justify-center w-10 h-10 text-2xl rounded-full bg-teal-600 text-white font-semibold mr-2 shadow-sm">
                {author.name.substring(0, 1)}
              </span>{" "}
              <div>
                {" "}
                <p className="font-medium text-gray-700">{author.name}</p>
                <p className="italic text-gray-500">{author.email}</p>
              </div>
            </div>
            <p className="ml-auto hidden sm:inline-block">
              <Category category={category} />
            </p>
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
              btnTitle={
                <>
                  Edit <SquarePen size={20} />
                </>
              }
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
