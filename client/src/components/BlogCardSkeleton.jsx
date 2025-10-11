import React from "react";
import DummyImage from "./../assets/dummy-image.png";
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col w-full h-auto md:h-79 md:flex-row mb-10 bg-white rounded-md shadow-md overflow-hidden animate-pulse  max-w-5xl mx-auto">
      <div className="relative w-full md:w-80 flex-shrink-0 overflow-hidden">
        <img
          src={DummyImage}
          alt={"DummyImage"}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-6 flex-1">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div>
              <div className="w-24 h-3 bg-gray-300 rounded mb-2"></div>
              <div className="w-32 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="w-20 h-6 bg-gray-300 rounded-full max-[450px]:hidden"></div>
        </div>

        <div className="space-y-2 my-1">
          <div className="w-3/4 h-7 bg-gray-300 rounded"></div>
        </div>

        <div className="space-y-2 mt-3">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
          <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row justify-between sm:items-center mt-4">
          <div className="w-18 h-4 bg-gray-300 rounded-md"></div>
          <div className="flex space-x-4">
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full sm:w-30 h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
