import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "./../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./../components/Button";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );
      if (response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl pb-1 font-bold text-center mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
          Sign Up
        </h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <Input
            type={"text"}
            placeholder={"Name"}
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
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
          <Button type={"submit"} btnTitle={"Sign Up"} />
        </form>
        <div className="text-center mt-5 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
