import React from "react";

function UserInfo({ InitialAvatar, userName, UserInfoContent }) {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold text-lg sm:text-xl shadow">
        {InitialAvatar?.substring(0, 1)}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {userName}
        </p>
        <p className="text-gray-600 italic text-sm sm:text-base">
          {UserInfoContent}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
