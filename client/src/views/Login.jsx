import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "./../components/Input";
import Button from "./../components/Button";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem("token", response.data.token);
        setUser({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent pb-1">
          Login
        </h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Input
            type={"email"}
            placeholder={"Email"}
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <Button type={"submit"} btnVariant={"primary"} btnTitle={"Login"} />
        </form>
        <div className="text-center mt-5 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
