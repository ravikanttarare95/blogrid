import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { SquarePen, Eye, ThumbsUp, MessageCircle, Heart } from "lucide-react";
import UserInfo from "./UserInfo";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryBadges from "./../badges/CategoryBadges";

function BlogCard({
  blogId,
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
  imgURL,
  isFavourite,
}) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  let loggedInUser;
  const [favourite, setFavourite] = useState(isFavourite);

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

  const toggleFavourite = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blogs/${blogId}/favourites`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response) {
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    loggedInUser = localStorage.getItem("loggedInUser");

    loadComments();
  }, []);

  return (
    <div className="bg-white w-full border md:h-80 border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden max-w-5xl mx-auto">
      <div className="relative w-full  md:w-[40%] lg:w-[35%] flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

        <img
          src={imgURL}
          alt={title}
          className="w-full h-48 md:h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className=" z-20 absolute top-3 w-full px-3 flex justify-between">
          {status !== "published" && (
            <span className=" inline-block italic bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 text-sm text-yellow-600 font-medium shadow-sm transition-colors duration-200 hover:bg-yellow-100">
              Draft
            </span>
          )}
          <Heart
            className={`${
              favourite
                ? "text-red-500 fill-red-500"
                : "text-gray-800 fill-gray-50"
            }  cursor-pointer`}
            onClick={() => {
              toggleFavourite();
            }}
          />
        </div>

        <div className="absolute bottom-3 right-3 sm:hidden z-20">
          <CategoryBadges category={category} />
        </div>
      </div>

      <div className="p-6 w-full flex flex-col justify-between ">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <UserInfo
              mainAvatar={author?.avatar}
              InitialAvatar={author?.name}
              userName={author?.name}
              UserInfoContent={author?.email}
            />
          </div>
          <div className="ml-auto hidden sm:inline-block">
            <CategoryBadges category={category} />
          </div>
        </div>
        <h2 className="text-xl sm:text-3xl py-1 font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200 line-clamp-2">
          {title}
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed line-clamp-2">
          {content}
        </p>

        <div className="mt-4 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
