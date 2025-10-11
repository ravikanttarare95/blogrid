import React, { useEffect, useState } from "react";
import dummyPoster from "./../assets/dummy-image.png";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import CategoryBadges from "./../badges/CategoryBadges.jsx";
import MarkdownEditor from "@uiw/react-markdown-editor";
import toast from "react-hot-toast";
import UserInfo from "./../components/UserInfo.jsx";
import Button from "./../components/Button.jsx";
import { getCurrentUser } from "./../utils.js";
import { ThumbsUp, MessageCircle, Forward } from "lucide-react";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";
import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";

function ReadBlog() {
  const [inUser, setInUser] = useState(null);
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/likes`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response) {
        getBlogBySlug();
      }
    } catch (error) {
      console.log(error);
      toast.error("Login required");
    }
  };

  useEffect(() => {
    getBlogBySlug();
    loadComments();
    setInUser(getCurrentUser());
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src={blog?.imgURL ||dummyPoster}
            alt="Blog Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <span className="absolute top-4 right-4 z-20">
            <CategoryBadges category={blog?.category} />
          </span>

          <div className="absolute bottom-6 left-6 z-20 text-white">
            <p className="flex items-center gap-2 text-sm sm:text-base mb-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 font-bold">
                {blog?.author?.name?.substring(0, 1)}
              </span>
              <span className="font-semibold">{blog?.author?.name}</span>
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
              {blog?.title}
            </h1>
          </div>
        </div>

        <div className="flex gap-6 mt-4 items-center text-gray-600">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={increaseLikes}
          >
            <ThumbsUp className="text-teal-500" /> {blog.likes}
          </span>
          <ScrollLink
            to="comments-section"
            smooth={true}
            className="flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="text-teal-500" /> {comments.length}
          </ScrollLink>
        </div>

        <div className="mt-8 max-w-none">
          <MarkdownEditor.Markdown
            source={blog.content || "Blog content will appear here..."}
            className="mt-8 p-6 rounded-lg shadow-sm prose prose-teal"
          />
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Comments:
          </h3>

          <ScrollElement name="comments-section"></ScrollElement>
          {inUser ? (
            <div className="mb-6">
              <textarea
                id="input-comment"
                placeholder="What’s your take on this?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                rows={4}
              />
              <div className="flex justify-end mt-3">
                <Button
                  type="button"
                  btnTitle={<Forward />}
                  btnSize="md"
                  btnVariant="primary"
                  onBtnClick={addComment}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-end mb-6">
              <Button
                btnTitle={"Login"}
                btnVariant={"primary"}
                btnSize={"lg"}
                onBtnClick={() => {
                  navigate("/login");
                }}
              />
            </div>
          )}

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 border border-gray-100 rounded-lg bg-white"
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
      <Footer />
    </>
  );
}

export default ReadBlog;
