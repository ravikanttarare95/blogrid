import React, { useEffect } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import axios from "axios";
import { getCurrentUser } from "./../utils";
import { useNavigate } from "react-router";
import Button from "./../components/Button";
import { NotebookPen } from "lucide-react";

function MyBlogs() {
  const navigate = useNavigate();

  const loadMyBlogs = async () => {};

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return navigate("/login");

    loadMyBlogs();
  }, []);

  return (
    <>
      <Navbar isSelected={"/my-blogs"} />

      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="p-6 rounded-full bg-teal-50 border border-teal-200 mb-6 shadow-md">
          <NotebookPen className="w-14 h-14 text-teal-600 animate-bounce" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
          No Blogs Yet
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

      <Footer />
    </>
  );
}

export default MyBlogs;
