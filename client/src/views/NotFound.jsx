import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router";
import Button from "./../components/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <FaExclamationTriangle className="text-6xl text-red-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        onBtnClick={() => navigate("/")}
        btnTitle={"Go to Home"}
        btnVariant={"primary"}
      />
    </div>
  );
}

export default NotFound;
