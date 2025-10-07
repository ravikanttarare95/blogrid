import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "./../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./../components/Button";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import GoogleLogo from "./../assets/google-logo.png";
import OrDevider from "./../components/OrDevider.jsx";
import { CircleUserRound } from "lucide-react";

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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10 bg-gradient-to-br from-teal-50 via-white to-green-50">
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-5xl pb-2 font-extrabold mb-4 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
          <Link to="/">BloGrid</Link>
        </h1>
        <p className="text-gray-600 text-xl">
          Every great writer started with a blank page
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          {" "}
          <div className="mx-auto flex items-center justify-center rounded-full shadow-lg mb-3">
            <CircleUserRound size={40} className="text-teal-600 " />
          </div>
          <Button
            type={"button"}
            btnTitle={
              <div className="flex items-center justify-center gap-3">
                <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
                <span className="text-gray-600 font-medium">
                  Continue with Google
                </span>
              </div>
            }
            btnVariant="secondary"
            btnSize="md"
            onBtnClick={() => {
              window.open(
                `${import.meta.env.VITE_API_URL}/auth/google`,
                "_self"
              );
            }}
            customStyle="!border-slate-300 !bg-transparent"
          />
          <OrDevider />
          <Input
            type="text"
            id={"input-name"}
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Input
            type="email"
            id={"input-email"}
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="password"
            id={"input-password"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            type="submit"
            btnVariant="primary"
            btnTitle="Create Account"
          />
        </form>

        <div className="text-center mt-5 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
