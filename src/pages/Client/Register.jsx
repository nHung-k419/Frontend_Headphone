import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAuth } from "../../services/Client/Auth";
import { ToastContainer, toast } from "react-toastify";
import { Mutation, QueryClient, useMutation, useQueries, useQuery } from "@tanstack/react-query";
const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    Name: "",
    Email: "",
    PassWord: "",
  });
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const mutationRegister = useMutation({
    mutationFn: RegisterAuth,
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      navigate("/Auth/Login");
    },
    onError: (error) => {
      if(error.status === 400){
        toast.warning("Tài khoản đã tồn tại");
      }
    },
  });
  // console.log(mutationRegister)
  
  const handleRegister = (e) => {
    // e.preventDefault();
    mutationRegister.mutate(value);
  }

  return (
    <section className="flex items-center justify-center">
      <div className="flex justify-center space-x-10 mt-30 shadow-2xl rounded-3xl  max-w-full">
        <div>
          <img
            className="h-full w-90 object-cover rounded-3xl"
            src="https://i.pinimg.com/736x/fc/c8/9a/fcc89a1df71dfb44678b88eb9147cfa4.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="max-w-120">
            <h1 className="text-2xl font-semibold  mt-5">Create an account</h1>
            <div className="flex mt-7 gap-3 pr-10">
              <button className="font-medium bg-[#593689] shadow-lg w-45 rounded-2xl h-9 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm">
                <span>
                  <FaGoogle />
                </span>
                Sign up with Google
              </button>
              <button className="font-medium bg-gray-100 shadow-lg w-50 rounded-2xl h-9 flex items-center justify-center cursor-pointer gap-1.5 text-sm">
                <span>
                  <FaFacebook />
                </span>
                with FaceBook
              </button>
            </div>
            <div>
              <hr className="border-t-3 border-gray-600 w-7 mt-7" />
              <h1 className="text-sm text-black ">Or sign up using your email address</h1>
            </div>
            <div>
              <div className="flex flex-col mt-5 space-y-2">
                <label className="ml-2 font-semibold">Name</label>
                <input
                  required
                  type="text"
                  className=" rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                  placeholder="Enter your Name"
                  name="Name"
                  onChange={(e) => handleGetValue(e)}
                />
                <label className="ml-2 font-semibold">Email</label>
                <input
                  required
                  type="text"
                  className=" rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                  placeholder="Enter your Username"
                  name="Email"
                  onChange={(e) => handleGetValue(e)}
                />
                <label className="ml-2 font-semibold">Password</label>
                <input
                  required
                  type="password"
                  className=" rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                  placeholder="Enter your Password"
                  name="Password"
                  onChange={(e) => handleGetValue(e)}
                />
                <button onClick={() => handleRegister()} className="font-medium bg-[#593689] shadow-lg w-98 rounded-2xl h-10 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm mt-5">
                  Sign Up
                </button>
                <p className="text-sm pb-10">
                  Already have an account?{" "}
                  <Link to={"/Auth/Login"} className="text-[#593689]">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
