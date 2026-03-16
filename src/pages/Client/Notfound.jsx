import React from "react";
import Logo404 from "../../svg/Logo404.svg";
import Logo4042 from "../../svg/Logo4042.svg";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Notfound404 from "../../assets/404 error not found.json";
import { getRoute } from "../../helper/route";
const Notfound = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-center mt-5 bemUpanimation">
        {/* <img src={Logo404} alt="Logo 404" className="w-64 h-auto  bemUpanimation" />
         */}
         <Lottie
                   animationData={Notfound404}
                   loop={true}
                   className="w-120 h-80" // 👈 điều chỉnh kích thước tại đây
                 />
      </div>
      <div className="text-center w-full">
        <div className="flex justify-center items-center">
          <h1 className=" text-7xl font-bold mt-5 notfound">4</h1>
          <h1 className=" text-7xl font-bold mt-5 notfound">0</h1>
          <h1 className=" text-7xl font-bold mt-5 notfound">4</h1>
        </div>
        <p className="mt-5 text-2xl font-semibold text-[#ff7979]">Không tìm thấy trang</p>
        <div className="w-full flex justify-center mt-5">
          <p className="w-100 text-gray-500">
            Oops! Có vẻ như bạn đã lạc đường. Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>
        <Link to={getRoute("/")} className="flex justify-center w-full">
          <button className="bg-gradient-to-r from-[#ff6b6b]
           to-[#ff4969] w-40 h-12 rounded-full mt-5 cursor-pointer text-white font-semibold flex items-center justify-center hover:scale-105 transform duration-300 ease-in-out ">
            <span className="mr-2">
              <IoHomeOutline />
            </span>
            Về trang chủ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
