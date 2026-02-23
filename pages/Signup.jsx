import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [Name,setName] = useState("")
  const [Email, setEmail] = useState("");
  const [Createpassword, setCreatepassword] = useState("");
  const [Confirmpassword, setConfirmpassowrd] = useState("");
  const naviagte = useNavigate()
  const URL = "https://task-bridge-project-management-system.onrender.com/api/auth/signup";
  async function newmember() {
    try {
      const response = await axios.post(URL, {
        name:Name,
        email: Email,
        password: Createpassword,
        confirmPassword: Confirmpassword,
      });
      console.log(response.data);
      setName("")
      setEmail("");
      setCreatepassword("");
      setConfirmpassowrd("");
      naviagte("/dashboard")
    } catch (error) {
      console.error(error);
    }
  }

  function handelsignup(e) {
    e.preventDefault();
    newmember();
  }

  return (
    <div className=" bg-black/85 top-0 absolute text-black h-[100%] w-full">
      <div className=" flex justify-center relative top-[15%]">
        <form onSubmit={handelsignup}>
          <div className=" bg-white h-min sm:w-[25em] rounded-2xl flex flex-col p-3 gap-4">
            <div className=" text-center text-2xl font-bold">
              <h1>Signup</h1>
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
              className=" w-full border-2 rounded p-1 border-gray-200"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Create passowrd"
              className=" w-full border-2 rounded p-1 border-gray-200"
              value={Createpassword}
              onChange={(e) => setCreatepassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Confirm passord"
              className=" w-full border-2 rounded p-1 border-gray-200"
              value={Confirmpassword}
              onChange={(e) => setConfirmpassowrd(e.target.value)}
              required
            />
              <button className=" bg-blue-500 hover:cursor-pointer w-full p-2 text-white font-medium text-xl rounded">
                Signup
              </button>
            <div className=" flex gap-0.5 justify-center">
              <p>Already have an account?</p>
              <Link to="/login">
                <h1 className=" text-blue-400">Login</h1>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
