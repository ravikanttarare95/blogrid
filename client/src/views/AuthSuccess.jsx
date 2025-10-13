import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "./../assets/logo.svg";

import { useNavigate, useSearchParams } from "react-router";

const AuthSuccess = () => {
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.user)
          );

          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    handleAuth();
  }, [token, navigate]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-lg md:text-xl font-medium animate-pulse">
          Logging you in securely...
        </p>
      </div>
    </div>
  );
};

export default AuthSuccess;
