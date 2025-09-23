import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Button from "./../components/Button.jsx";

function NewBlog() {
  const [content, setContent] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-5 mt-8 bg-white rounded-xl shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Create New Blog
          </h1>
          <Button
            btnTitle={"Save"}
            type={"submit"}
            customStyle={"w-fit! h-fit!"}
            // onBtnClick={() => {
            //   sfdk;
            // }}
          />
        </div>
        <MarkdownEditor
          value={content}
          height="400px"
          onChange={(value) => setContent(value)}
          className="border rounded-md"
        />
      </div>
    </div>
  );
}

export default NewBlog;
