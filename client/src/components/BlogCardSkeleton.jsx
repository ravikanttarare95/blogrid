import React from "react";
import DummyImage from "./../assets/dummy-image.png";
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row mt-10 bg-white rounded-xl shadow-md overflow-hidden animate-pulse  max-w-5xl mx-auto">
      <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-300"></div>

      <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="w-24 h-3 bg-gray-300 rounded mb-2"></div>
              <div className="w-32 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
          <div className="w-2/3 h-5 bg-gray-300 rounded"></div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
          <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row justify-between sm:items-center mt-2">
          <div className="w-18 h-4 bg-gray-300 rounded-md"></div>
          <div className="flex space-x-4">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full sm:w-16 h-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
