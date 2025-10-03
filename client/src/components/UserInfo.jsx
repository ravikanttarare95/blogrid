import React from "react";

function UserInfo({ InitialAvatar, userName, UserInfoContent }) {
  return (
    <>
      <div className="w-10 h-10 flex text-xl items-center justify-center rounded-full bg-teal-600 text-white font-bold">
        {InitialAvatar.substring(0, 1)}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{userName}</p>
        <p className="text-gray-600 italic">{UserInfoContent}</p>
      </div>
    </>
  );
}

export default UserInfo;
