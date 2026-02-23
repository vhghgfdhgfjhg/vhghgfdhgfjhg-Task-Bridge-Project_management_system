import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Memberlist from "../components/Memberlist";

const Login = () => {
  const [Name,setName] = useState("")
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const URL = "https://task-bridge-project-management-system.onrender.com/api/auth/login";
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post(URL, {
        name:Name,
        email: Email,
        password: password,
      });

      console.log(res.data)
      // ✅ Store token
      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message); // "Login successful"
      setName("")
      setEmail("");
      setpassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }

  function handellogin(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className="bg-black/85 top-0 absolute text-black h-[100%] w-full">
      <div className="flex justify-center relative top-[15%]">
        <form onSubmit={handellogin}>
          <div className="bg-white h-min sm:w-[25em] rounded-2xl flex flex-col p-3 gap-4">
            <div className="text-center text-2xl font-bold">
              <h1>Login</h1>
            </div>
            <input
              type="text"
              placeholder="Enter the Username"
              className=" w-full border-2 rounded p-1 border-gray-200"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border-2 rounded p-1 border-gray-200"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border-2 rounded p-1 border-gray-200"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button className="bg-blue-500 w-full p-2 hover:cursor-pointer text-white font-medium text-xl rounded">
              Login
            </button>

            <div className="flex gap-0.5 justify-center">
              <p>Don't have an account?</p>
              <Link to="/signup" className="text-blue-400">
                Signup
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
