import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAuth } from "../../services/Client/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutationRegister = useMutation({
    mutationFn: RegisterAuth,
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      navigate("/Auth/Login");
    },
    onError: (error) => {
      if (error.status === 400) {
        toast.warning("Tài khoản đã tồn tại");
      }
    },
  });

  const onSubmit = (data) => {
    mutationRegister.mutate(data);
  };

  return (
    <section className="flex items-center justify-center">
      <div className="flex justify-center space-x-10 mt-20 max-h-200 shadow-2xl rounded-3xl max-w-full">
        <div>
          <img
            className="h-full w-120 object-cover rounded-3xl"
            src="https://i.pinimg.com/736x/fc/c8/9a/fcc89a1df71dfb44678b88eb9147cfa4.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="flex flex-col justify-between">
            <div className="max-w-120 pr-10">
              <h1 className="text-2xl font-semibold mt-5">Đăng ký tài khoản</h1>
              <div>
                <hr className="border-t-3 border-gray-600 w-7 mt-7" />
                <h1 className="text-sm text-black">Hoặc đăng ký với địa chỉ Email</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-5 space-y-2">
                  <label className="font-semibold">Tên người dùng</label>
                  <input
                    type="text"
                    {...register("Name", { required: "Tên người dùng là bắt buộc" })}
                    className="rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                    placeholder="Nhập tên người dùng"
                  />
                  {errors.Name && <p className="text-red-500 text-sm ml-2">{errors.Name.message}</p>}

                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    {...register("Email", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    className="rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                    placeholder="Your@email.com"
                  />
                  {errors.Email && <p className="text-red-500 text-sm ml-2">{errors.Email.message}</p>}

                  <label className="font-semibold">Mật khẩu</label>
                  <input
                    type="password"
                    {...register("Password", {
                      required: "Mật khẩu là bắt buộc",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    })}
                    className="rounded-md h-11 w-98 pl-3 focus:outline-none bg-gray-100 mt-1"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                  {errors.Password && <p className="text-red-500 text-sm ml-2">{errors.Password.message}</p>}

                  <button
                    type="submit"
                    className="font-medium bg-teal-500 shadow-lg w-98 rounded-2xl h-10 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm mt-5"
                  >
                    Sign Up
                  </button>

                  <p className="text-sm pb-10 mt-4">
                    Bạn đã có tài khoản?{" "}
                    <Link to={"/Auth/Login"} className="text-teal-500 font-bold">
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            {/* <div className="w-98   mt-5 flex flex-col justify-end h-6">
              <hr className="w-98 text-gray-400" />
              <p className="text-xs w-full text-gray-500 mt-4">
                Bằng việc đăng nhập,bạn đồng ý với{" "}
                <Link to={"/Auth/Policy"} className="text-teal-500">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link to={"/Auth/Policy"} className="text-teal-500">
                  Chính sách bảo mật
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
