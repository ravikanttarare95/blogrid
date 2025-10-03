import React, { useEffect, useState } from "react";
import poster from "./../assets/poster.jpg";
import { useParams } from "react-router";
import axios from "axios";
import Category from "./../components/Category.jsx";
import MarkdownEditor from "@uiw/react-markdown-editor";
import toast from "react-hot-toast";
import UserInfo from "./../components/UserInfo.jsx";
import Button from "./../components/Button.jsx";
import { getCurrentUser } from "./../utils.js";
import { ThumbsUp, MessageCircle } from "lucide-react";

function ReadBlog() {
  const [inUser, setInUser] = useState(null);
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const getBlogBySlug = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      if (response) {
        setBlog(response?.data?.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

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

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseLikes = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}/likes`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    if (response) {
      getBlogBySlug();
    }
  };

  useEffect(() => {
    getBlogBySlug();
    loadComments();
    setInUser(getCurrentUser());
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="relative h-72 sm:h-96 overflow-hidden rounded shadow-lg">
        <span className="absolute right-3 top-2">
          <Category category={blog.category} />
        </span>
        <img
          src={poster}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-sm sm:text-base mb-2 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white font-bold">
              {blog?.author?.name?.substring(0, 1)}
            </span>

            <span className="font-semibold text-white">
              {blog?.author?.name}
            </span>
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
            {blog?.title}
          </h1>
        </div>
      </div>
      <div className="flex  gap-5 ml-0 m-3">
        {" "}
        <span className="flex gap-2">
          <ThumbsUp
            onClick={() => {
              increaseLikes();
            }}
          />
          {blog.likes}
        </span>
        {/* <span className="flex gap-2">
          <MessageCircle />
          {comments}
        </span> */}
      </div>

      <MarkdownEditor.Markdown
        source={blog.content || "Blog content will appear here..."}
        className="mt-8"
      />

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Comments:</h3>
        <div className={`${inUser ? "block" : "hidden"}`}>
          <textarea
            name="input-comment"
            placeholder="What’s your take on this?"
            id="input-comment"
            value={newComment}
            className={`  w-full border border-gray-700 bg-gray-800 text-white py-3 px-4 rounded-lg focus:outline-2 focus:outline-teal-400 h-25`}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          ></textarea>

          <div className={`flex justify-end mt-5`}>
            <Button
              type="submit"
              btnTitle={"Send"}
              btnSize={"sm"}
              btnVariant={"secondary"}
              onBtnClick={() => {
                addComment();
              }}
            />
          </div>
        </div>

        {comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 border-b border-gray-200 bg-white"
              >
                <UserInfo
                  InitialAvatar={comment?.user?.name}
                  userName={comment.user.name}
                  UserInfoContent={comment.content}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

export default ReadBlog;
