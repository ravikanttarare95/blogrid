import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { SquarePen, Eye, ThumbsUp, MessageCircle } from "lucide-react";
import Category from "./Category";
import poster1 from "./../assets/poster.jpg";
import UserInfo from "./UserInfo";
import axios from "axios";
import toast from "react-hot-toast";

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
  viewCount,
  likes,
}) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`
      );

      if (response) {
        setComments(response.data.comments);
      }
    } catch (error) {
      toast.error("Error loading comments");
      console.log(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row overflow-hidden mb-10 max-w-5xl mx-auto">
      <div className="relative w-full sm:w-72 md:w-80 flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

        <img
          src={poster1}
          alt={title}
          className="w-full h-48 sm:h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {status !== "published" && (
          <span className="absolute top-3 left-3 z-20 inline-block italic bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 text-sm text-yellow-600 font-medium shadow-sm transition-colors duration-200 hover:bg-yellow-100">
            Draft
          </span>
        )}

        <p className="absolute bottom-3 right-3 sm:hidden z-20">
          <Category category={category} />
        </p>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <UserInfo
              InitialAvatar={author?.name}
              userName={author?.name}
              UserInfoContent={author?.email}
            />
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

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-sm text-gray-400">
            {new Date(publishedAt || createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <div className="flex items-center gap-5 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-teal-500" />
              {likes}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-teal-500" />
              {comments?.length}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-500" />
              {viewCount}
            </span>
          </div>

          {status === "published" ? (
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
