import React, { useEffect, useState } from "react";
import axios from "axios";

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
  return <h2>Logging in...</h2>;
};

export default AuthSuccess;
