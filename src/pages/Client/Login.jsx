import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../services/Client/Auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutationLogin = useMutation({
    mutationFn: loginAuth,
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      const userData = {
        Email: data?.Email,
        Name: data?.Name,
        id: data?.id,
      };
      Cookies.set("User", JSON.stringify(userData));
      navigate("/");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
    },
  });

  const onSubmit = (data) => {
    mutationLogin.mutate(data);
  };

  return (
    <section className="flex items-center justify-center">
      <div className="flex justify-center max-h-200 space-x-10 lg:mt-20 md:mt-20 mt-30 lg:shadow-2xl shadow-md border-1 border-gray-300 rounded-3xl">
        <div className="lg:block md:block hidden">
          <img
            className="h-full w-120 object-cover rounded-3xl"
            src="https://i.pinimg.com/736x/fc/c8/9a/fcc89a1df71dfb44678b88eb9147cfa4.jpg"
            alt=""
          />
        </div>

        <div className="max-w-120 lg:w-full md:w-full w-95 lg:p-0 md:p-0 p-3">
          <h1 className="text-2xl font-semibold mt-5">Đăng nhập với tài khoản của bạn</h1>

          <div className="flex mt-7 gap-3 mr-10 w-full">
            <button className="font-medium bg-teal-500 shadow-lg lg:w-45 w-1/2 rounded-md h-11 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm">
              <FaGoogle /> Google
            </button>
            <button className="font-medium bg-gray-100 shadow-lg lg:w-50 w-1/2 rounded-md h-11 flex items-center justify-center cursor-pointer gap-1.5 text-sm">
              <FaFacebook /> Facebook
            </button>
          </div>

          <div>
            <hr className="border-t-3 border-gray-600 w-7 mt-7" />
            <h1 className="text-sm text-black">Đăng nhập bằng địa chỉ Email</h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col mt-5 space-y-2">
              <label className="font-semibold">Địa chỉ email</label>
              <input
                type="text"
                {...register("Email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                })}
                className="rounded-md h-11 lg:w-98 w-full pl-3 focus:outline-none bg-gray-100"
                placeholder="Your@email.com"
              />
              {errors.Email && <p className="text-red-500 text-sm ml-2">{errors.Email.message}</p>}
            </div>

            <div className="flex flex-col mt-5 space-y-2">
              <label className="font-semibold">Mật khẩu</label>
              <input
                type="password"
                {...register("Password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải từ 6 ký tự trở lên",
                  },
                })}
                className="rounded-md h-11 lg:w-98 w-full pl-3 focus:outline-none bg-gray-100 mt-1"
                placeholder="Nhập mật khẩu của bạn"
              />
              {errors.Password && <p className="text-red-500 text-sm ml-2">{errors.Password.message}</p>}
            </div>

            <button
              type="submit"
              className="font-medium bg-teal-500 shadow-lg lg:w-98 w-full rounded-2xl h-10 text-white flex items-center justify-center cursor-pointer gap-1.5 text-sm mt-7"
            >
              Đăng nhập
            </button>

            <p className="text-sm mt-4">
              Bạn chưa có tài khoản?{" "}
              <Link to="/Auth/Register" className="text-teal-500 font-bold">
                Đăng ký ngay
              </Link>
            </p>
          </form>
          {/* <hr className="w-98" /> */}
          {/* <div className="w-98 lg:mt-5 flex flex-col justify-end h-20">
            <hr className="lg:w-98 w-89 text-gray-400" />
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
    </section>
  );
};

export default Login;
