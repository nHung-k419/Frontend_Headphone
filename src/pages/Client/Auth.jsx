import ReactMarkdown from "react-markdown";
import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoLogoGoogleplus } from "react-icons/io";
import { GrFacebookOption } from "react-icons/gr";
import { CiMail } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { LuLockKeyhole } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAuth, RegisterAuth } from "../../services/Client/Auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showRegisterContent, setShowRegisterContent] = useState(false);

  const mutationRegister = useMutation({
    mutationFn: RegisterAuth,
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      setIsLogin(true);
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.warning("Email đã tồn tại");
      }
    },
  });
  useEffect(() => {
    setFocus("Email");
  }, []);
  useEffect(() => {
    if (showRegisterContent) {
      setFocus("Name");
    } else {
      setFocus("Email");
    }
  }, [showRegisterContent]);
  const mutationLogin = useMutation({
    mutationFn: loginAuth,
    onSuccess: (data) => {
      // console.log(data);
      toast.success("Đăng nhập thành công");
      // const userData = {
      //   Email: data?.Email,
      //   Name: data?.Name,
      //   id: data?.id,
      // };
      // Cookies.set("User", JSON.stringify(userData));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Đăng nhập thất bại");
    },
  });
  useEffect(() => {
    if (!isLogin) {
      const timeout = setTimeout(() => {
        setShowRegisterContent(true);
        reset();
      }, 350);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowRegisterContent(false);
        reset();
      }, 350);
    }
  }, [isLogin]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({ shouldFocusError: false });
  // console.log(errors);

  const onSubmit = (data) => {
    if (showRegisterContent) {
      // Đăng ký
      mutationRegister.mutate(data);
    } else {
      // Đăng nhập
      mutationLogin.mutate(data);
    }
    // reset();
  };
  const onError = (errors) => {
    if (errors.Name || showRegisterContent) {
      setFocus("Name");
      // console.log(errors);
    } else {
      setFocus("Email");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-[950px] h-[600px] bg-white rounded-xl shadow-xl overflow-hidden flex mt-15">
        {/* FORM CONTAINER */}
        {/* FORM WRAPPER */}
        <motion.div
          animate={{ x: isLogin ? "0%" : "50%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="lg:flex lg:w-[200%] w-full h-full"
        >
          <div className="lg:w-1/2 md:w-1/2 w-full p-10 flex flex-col justify-center">
            <div className="pb-4">
              <h2 className="text-3xl font-bold mb-4 transform duration-300 ease-in-out text-center pb-1 text-teal-500">
                {showRegisterContent ? "Đăng ký tài khoản" : "Đăng nhập"}
              </h2>
              <div className="flex justify-center items-center space-x-2 pb-5">
                <button className="h-9 w-9 rounded-full bg-white border-1 border-gray-200 flex justify-center items-center cursor-pointer">
                  <span className="">
                    <IoLogoGoogleplus />
                  </span>
                </button>
                <button className="h-9 w-9 rounded-full bg-white border-1 border-gray-200 flex justify-center items-center cursor-pointer">
                  <span>
                    <GrFacebookOption />
                  </span>
                </button>
                <button className="h-9 w-9 rounded-full bg-white border-1 border-gray-200 flex justify-center items-center cursor-pointer text-black font-bold">
                  <span>in</span>
                </button>
              </div>
              <h3 className="text-center text-gray-400 text-sm">
                {showRegisterContent ? "Hoặc bạn có thể dùng email để đăng ký" : "Hoăc bạn có thể dùng email"}
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              {showRegisterContent && (
                <div className="relative w-full mb-4">
                  <span className="absolute left-3 top-5.5 transform -translate-y-1/2 text-gray-400">
                    <AiOutlineUser />
                  </span>
                  <input
                    {...register("Name", { required: "Tên người dùng bắt buộc" })}
                    className="input !pl-8 w-full select-none"
                    placeholder="Tên người dùng"
                    type="text"
                  />
                  {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
                </div>
              )}
              <div className="relative w-full mb-4">
                <span className="absolute left-3 top-5.5 transform -translate-y-1/2 text-gray-400">
                  <CiMail />
                </span>
                <input
                  {...register("Email", {
                    required: "Email bắt buộc",
                    pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
                  })}
                  className="input !pl-8 w-full select-none"
                  placeholder="Your@email.com"
                  type="email"
                />
                {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
              </div>

              <div className="relative w-full mb-4">
                <span className="absolute left-3 top-5.5 transform -translate-y-1/2 text-gray-400">
                  <LuLockKeyhole />
                </span>
                <input
                  {...register("Password", {
                    required: "Mật khẩu bắt buộc",
                    minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                  })}
                  className="input !pl-8 w-full select-none"
                  placeholder="Mật khẩu"
                  type="password"
                />
                {errors.Password && <p className="text-red-500 text-sm">{errors.Password.message}</p>}
              </div>
              <input type="hidden" value={showRegisterContent ? "register" : "login"} {...register("actionType")} />

              {/* <button type="submit" className="btn mt-4 cursor-pointer">
    {showRegisterContent ? "Đăng ký" : "Đăng nhập"}
  </button> */}
              <button className="btn mt-4 cursor-pointer w-full">{showRegisterContent ? "Đăng ký" : "Đăng nhập"}</button>
              <div className="flex items-center mt-4 space-x-1">
                <input type="checkbox" />
                <p className="text-sm">Quên mật khẩu</p>
              </div>
              <p className="text-gray-400 mt-4 sm:block md:hidden">
                Bạn không có tài khoản?{" "}
                <span onClick={() => setShowRegisterContent(!showRegisterContent) || reset()} className="text-teal-500 font-bold">
                  Đăng ký
                </span>
              </p>
            </form>
            <div className="absolute bottom-4 w-100 text-xs ">
              <p className="text-gray-400 font-medium">
                Bằng việc đăng nhập, bạn đồng ý với{" "}
                <Link to={"/Auth/Policy"} className="text-teal-500 font-medium">
                  Điều khoản dịch vụ{" "}
                </Link>
                và{" "}
                <Link to={"/Auth/Policy"} className="text-teal-500 font-medium">
                  Chính sách bảo mật
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* HELLO FRIEND PANEL */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute top-0 h-full w-1/2 hidden ${
            showRegisterContent ? "bg-gradient-to-r from-teal-400 to-teal-600" : "bg-gradient-to-tr from-teal-400 to-cyan-600"
          }  text-white p-10 md:flex flex-col justify-center items-center text-center z-5 `}
        >
          <div className="absolute w-24 h-24 bg-white !opacity-10 rounded-lg top-10 left-10 rotate-12"></div>
          <div className="absolute w-16 h-16 bg-white opacity-10 rounded-full bottom-20 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-12 h-12 bg-white opacity-10 rotate-45 top-1/2 right-10 rounded-lg"></div>
          <div className="absolute w-48 h-48 bg-white opacity-5 rounded-full -bottom-10 -left-10"></div>
          <div className="absolute w-48 h-48 bg-white opacity-5 rounded-full -top-10 -right-10"></div>

          <div className="relative w-full h-30">
            <motion.div
              className="absolute left-0 top-0 w-full"
              initial={false}
              animate={{ x: isLogin ? "-150%" : "0%", opacity: isLogin ? 0 : 1, visibility: isLogin ? "hidden" : "visible" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">Chào mừng trở lại!</h2>
              <p className="text-sm">Bạn đã có tài khoản ? Hãy click vào đây để đăng nhập!</p>
            </motion.div>
            <motion.div
              className="absolute right-0-0 top-0 w-full"
              initial={false}
              animate={{ x: isLogin ? "0%" : "150%", opacity: isLogin ? 1 : 0, visibility: isLogin ? "visible" : "hidden" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <h2 className=" text-3xl font-bold mb-4">
                Soun<span className="text-white">dora</span> xin chào!
              </h2>
              <p className="text-sm">Bạn chưa có tài khoản? Hãy click vào đây để đăng ký ngay!</p>
            </motion.div>
          </div>
          <motion.button
            // animate={{width: isLogin ? "170px" : "35%"}}
            onClick={() => setIsLogin(!isLogin)}
            className={`w-35 h-10 cursor-pointer py-2 border-2 border-gray-300 ${
              showRegisterContent ? "bg-teal-500" : "to-cyan-600"
            }  rounded-full font-semibold shadow-md hover:scale-105 transition relative`}
          >
            <motion.span
              initial={false}
              animate={{ x: isLogin ? "0%" : "70%", opacity: isLogin ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              Đăng ký
            </motion.span>
            <motion.span
              initial={false}
              animate={{ x: isLogin ? "-70%" : "0%", opacity: isLogin ? 0 : 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              Đăng nhập
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
