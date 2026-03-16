import React from "react";
import Cart404 from "../assets/Cart404.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { getRoute } from "../helper/route";
const Cart404empty = (props) => {
  console.log(props);

  return (
    <div className="mt-30">
      <div className="flex justify-center ">
        {/* <img src={Logo404} alt="Logo 404" className="w-64 h-auto  bemUpanimation" />
         */}
        <Lottie
          animationData={Cart404}
          loop={true}
          className="w-50 h-50" 
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        {props.type === "orderItems" ? (
          <p className="text-center font-medium text-gray-400">Đơn hàng của bạn hiện đang chờ xử lý!!!</p>
        ) : (
          <>
            <p className="text-center font-medium text-gray-400">Giỏ hàng của bạn hiện đang trống!</p>
            <Link
              to={getRoute("/Product")}
              className="w-35 h-10 bg-teal-500 rounded-full mt-5 text-white cursor-pointer flex items-center justify-center"
            >
              Mua ngay
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart404empty;
