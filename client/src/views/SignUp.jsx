import React from "react";
import { Link } from "react-router";
import Input from "./../components/Input";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
          Sign Up
        </h1>
        <form className="flex flex-col gap-5">
          <Input type={"text"} placeholder={"Name"} onChange={"dx"} />
          <Input type={"email"} placeholder={"Email"} onChange={"dx"} />
          <Input type={"password"} placeholder={"Password"} onChange={"dx"} />

          <button className="w-full py-3 bg-teal-500 rounded-lg font-semibold hover:bg-teal-600 transition-all duration-300">
            Sign Up
          </button>
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
