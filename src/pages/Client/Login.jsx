import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../services/Client/Auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    Email: "",
    Password: "",
  });
  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const mutationLogin = useMutation({
    mutationFn: loginAuth,
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      const userData = {
        Email: data?.Email,
        Name: data?.Name,
        id : data?.id
      };
      Cookies.set("User", JSON.stringify(userData));
      navigate("/");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
    },
  });
  const handleSubmit = () => {
    mutationLogin.mutate(value);
  };
  return (
    <section className="flex items-center justify-center">
      <div className="flex justify-center space-x-10 mt-30 shadow-2xl rounded-3xl">
        <div>
          <img
            className="h-130 w-90 object-cover rounded-3xl"
            src="https://i.pinimg.com/736x/fc/c8/9a/fcc89a1df71dfb44678b88eb9147cfa4.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="max-w-120">
            <h1 className="text-2xl font-semibold mt-5">Login to your account</h1>
            <div className="flex mt-7 gap-3 pr-10">
              <button className="font-medium bg-[#593689] shadow-lg w-45 rounded-md h-11 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm">
                <span>
                  <FaGoogle />
                </span>
                Sign up with Google
              </button>
              <button className="font-medium bg-gray-100 shadow-lg w-50 rounded-md h-11 flex items-center justify-center cursor-pointer gap-1.5 text-sm">
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
                <label className="ml-2 font-semibold">Email</label>
                <input
                  onChange={(e) => handleGetvalue(e)}
                  required
                  type="text"
                  className=" rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                  placeholder="Enter your Email"
                  name="Email"
                />
                <label className="ml-2 font-semibold">Password</label>
                <input
                  onChange={(e) => handleGetvalue(e)}
                  required
                  type="password"
                  className=" rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                  placeholder="Enter your Password"
                  name="Password"
                />
                <button
                  onClick={() => handleSubmit()}
                  className="font-medium bg-[#593689] shadow-lg w-98 rounded-2xl h-10 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm mt-5"
                >
                  Sign Up
                </button>
                <p className="text-sm mt-5">
                  You dont have account?{" "}
                  <Link to={"/Auth/Register"} className="text-[#593689]">
                    Sign Up
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

export default Login;
