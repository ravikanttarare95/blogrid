import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import axios from "axios";
import { getCurrentUser } from "./../utils";
import { useNavigate } from "react-router";
import Button from "./../components/Button";
import { NotebookPen } from "lucide-react";
import BlogCardSkeleton from "./../components/BlogCardSkeleton";
import BlogCard from "./../components/BlogCard";

function MyBlogs() {
  const [user] = useState(getCurrentUser());
  const [draftBlogs, setDraftBlogs] = useState(null);
  const [publishedBlogs, setPublishedBlogs] = useState(null);
  const [showDraft, setShowDraft] = useState(true);
  const navigate = useNavigate();

  const loadMyDraftBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/me/draft?authorId=${user?._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response?.data?.success) {
        setDraftBlogs(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMyPublishedBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/me/published?authorId=${
          user?._id
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response?.data?.success) {
        setPublishedBlogs(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    loadMyDraftBlogs();
    loadMyPublishedBlogs();
  }, []);

  const blogsToShow = showDraft ? draftBlogs : publishedBlogs;

  return (
    <>
      <Navbar isSelected={"/my-blogs"} />
      <div className="flex gap-4 px-6 mt-4">
        <Button
          btnTitle="Drafts"
          btnVariant={showDraft ? "primary" : "secondary"}
          onBtnClick={() => setShowDraft(true)}
        />
        <Button
          btnTitle="Published"
          btnVariant={!showDraft ? "primary" : "secondary"}
          onBtnClick={() => setShowDraft(false)}
        />
      </div>
      <div className="min-h-[59vh] p-5 pb-0 sm:pb-0 sm:p-8 flex flex-col gap-10 my-5">
        {draftBlogs === null || publishedBlogs === null ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </>
        ) : blogsToShow.length > 0 ? (
          blogsToShow.map((blog) => (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              content={blog.content}
              status={blog.status}
              category={blog.category}
              publishedAt={blog.publishedAt}
              createdAt={blog.createdAt}
              author={blog.author}
              slug={blog.slug}
              viewCount={blog.viewCount}
              likes={blog.likes}
              imgURL={blog.imgURL}
              //   isFavourite={draftBlogs.some((fav) => fav._id === draftBlog._id)}
              // onFavouriteToggle={onFavouriteToggle}
            />
          ))
        ) : (
          <div className=" flex flex-col items-center justify-center text-center px-4">
            <div className="p-6 rounded-full bg-teal-50 border border-teal-200 mb-6 shadow-md">
              <NotebookPen className="w-14 h-14 text-teal-600 animate-bounce" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
              No {showDraft ? "draft" : "published"} blogs available.
            </h2>

            <p className="text-gray-600 max-w-md mb-6">
              You haven’t created any blogs yet. Start your first blog now!
            </p>

            <Button
              btnTitle={"Create Blog"}
              btnSize="md"
              btnVariant="primary"
              onBtnClick={() => navigate("/new")}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyBlogs;
