import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
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
                  <form className="flex flex-col mt-5 space-y-2">
                    <label className="ml-2 font-semibold">Name</label>
                    <input
                      type="text"
                      className=" rounded-2xl h-9 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                      placeholder="Enter your Name"
                    />
                    <label className="ml-2 font-semibold">Email</label>
                    <input
                      type="text"
                      className=" rounded-2xl h-9 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                      placeholder="Enter your Email"
                    />
                    <label className="ml-2 font-semibold">Username</label>
                    <input
                      type="text"
                      className=" rounded-2xl h-9 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                      placeholder="Enter your Username"
                    />
                    <label className="ml-2 font-semibold">Password</label>
                    <input
                      type="password"
                      className=" rounded-2xl h-9 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                      placeholder="Enter your Password"
                    />
                    <button className="font-medium bg-[#593689] shadow-lg w-98 rounded-2xl h-9 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm mt-5">
                      Sign Up
                    </button>
                    <p className="text-sm pb-10">
                      Already have an account?{" "}
                      <Link to={"/Auth/Login"} className="text-[#593689]">Sign In</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Register