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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10">
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-5xl pb-2 font-extrabold mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
          <Link to="/">BloGrid</Link>
        </h1>
        <p className="text-gray-600 text-xl">
          The habit of writing creates the writer
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Button type="submit" btnVariant="primary" btnTitle="Login" />
        </form>

        <div className="text-center mt-5 text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
