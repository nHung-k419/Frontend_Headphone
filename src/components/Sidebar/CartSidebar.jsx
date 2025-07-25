import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { GetCartItemsByUser, handleNext, handlePrevious, handleDLcartItem } from "../../services/Client/Cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import SidebarReview from "./Sidebar";
import { toast } from "react-toastify";
const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [boolean, setBoolean] = useState(false);
  const CartItems = useSelector((state) => state.cart.CartItem);
  const { data } = useQuery({
    queryKey: ["CartItems", idUser, isOpen],
    queryFn: () => GetCartItemsByUser(idUser),
    enabled: !!idUser,
  });
  // console.log(data?.resultCartItems);

  const total = data?.resultCartItems?.reduce((sum, item) => {
    const price = item.Id_ProductVariants?.Price || 0;
    return sum + price * item.Quantity;
  }, 0);

  // 2. mutation giảm số lượng
  const mutationPrevious = useMutation({
    mutationFn: handlePrevious,
    onSuccess: () => {
      // khi mutation thành công, refetch lại cart items
      queryClient.invalidateQueries({ queryKey: ["CartItems", idUser, isOpen] });
    },
  });

  const mutationNext = useMutation({
    mutationFn: handleNext,
    onSuccess: () => {
      // khi mutation thành công, refetch lagi cart items
      queryClient.invalidateQueries({ queryKey: ["CartItems", idUser, isOpen] });
    },
  });
  const mutationDelete = useMutation({
    mutationFn: handleDLcartItem,
    onSuccess: () => {
      // khi mutation thành công, refetch lagi cart items
      queryClient.invalidateQueries({ queryKey: ["CartItems", idUser, isOpen] });
    },
  });

  const HandlePreviousQuantity = (Id_Cart, Id_ProductVariants, Color) => {
    mutationPrevious.mutate({ Id_Cart, Id_ProductVariants, Color });
  };
  const HandleNextQuantity = (Id_Cart, Id_ProductVariants, Color) => {
    mutationNext.mutate({ Id_Cart, Id_ProductVariants, Color });
  };
  const handleDelete = (Id_Cart, Id_ProductVariants, Color) => {
    mutationDelete.mutate({ Id_Cart, Id_ProductVariants, Color });
  };
  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_1.5fr] grid-cols-1 h-full w-full select-none overflow-y-auto hide-scrollbar ">
      <div>
        <div className="flex justify-between items-center ">
          <Link to={"/"} className="text-gray-400 flex items-center gap-x-2 font-light text-sm p-5" onClick={onClose}>
            <span className="text-black">
              <FaArrowLeft />
            </span>
            Quay lại trang chủ
          </Link>
          <span onClick={onClose}>
            <IoCloseSharp className="lg:hidden block cursor-pointer text-xl mr-5" />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="p-5 text-xl font-light">Giỏ hàng</h1>
          <span className="text-gray-500 mr-5 text-sm">{data?.resultCartItems?.length} Sản phẩm</span>
        </div>
        <hr className="border-t-1 border-gray-300 lg:w-156 w-screen mx-auto" />
        {data?.resultCartItems?.length <= 0 && <div className="text-red-500 flex justify-center items-center text-xl">Giỏ hàng trống</div>}
        <div className="flex flex-col lg:overflow-y-auto lg:h-[calc(100vh-160px)] md:h-[calc(100vh-160px)] h-fit hide-scrollbar p-5 space-y-3">
          {data?.resultCartItems.map((item) => (
            <div className="grid grid-cols-[1fr_4fr] space-y-5 space-x-4 pt-2 pl-2 pr-2 bg-white rounded-xl ">
              <div className="max-w-25 h-25 ">
                <img
                  src={item?.Image ? item?.Image : item?.Id_Product?.ImageUrl?.path}
                  className="w-full h-full object-contain rounded-md"
                  alt="##"
                />
              </div>
              <div className="flex justify-between w-full relative">
                <div className="space-y-1">
                  <h1 className="text-lg text-gray-600">{item?.Id_ProductVariants?.Id_Products?.Name}</h1>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700 font-medium">${item?.Id_ProductVariants?.Price?.toLocaleString("vi-VN")} </span>
                    <span className="text-green-600">In Stock</span>
                  </div>
                  <div className="flex mt-3 space-x-2 w-full ">
                    <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 text-gray-500">
                      {item.Size ? item.Size : "Mặc định"}
                    </button>
                    <button className="rounded-md h-6.5 w-23 border-1 border-gray-300 text-gray-500">
                      {item.Color ? item.Color : "Mặc định"}
                    </button>
                    <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 flex items-center justify-center space-x-4 text-gray-500 ">
                      <span
                        onClick={() => HandlePreviousQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                        className="cursor-pointer"
                      >
                        <LuMinus />
                      </span>
                      <span>{item.Quantity}</span>
                      <span
                        onClick={() => HandleNextQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                        className="cursor-pointer"
                      >
                        <GoPlus />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <span onClick={() => handleDelete(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}>
                    <IoCloseSharp />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 max-h-full h-full flex flex-col justify-between">
        <div className=" lg:space-y-3 space-y-4">
          <div className="flex justify-end pr-3 pt-3">
            <span onClick={onClose} className="cursor-pointer text-2xl text-gray-700">
              <IoCloseSharp className="lg:block hidden" />
            </span>
          </div>
          <h1 className="pl-5 mt-11 text-lg mb-10">Thông tin</h1>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Tổng phụ</span>
            <span>0.00$</span>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Phí vận chuyển</span>
            <span>0.00$</span>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Thuế</span>
            <span>0.00$</span>
          </div>
        </div>
        <div className="lg:space-y-10 space-y-10 lg:mt-0 mt-5">
          <div className="">
            <div className="flex justify-between pl-5 pr-5">
              <h1 className="text-gray-500">Tổng</h1>
              <span>{total?.toLocaleString("vi-VN")}$</span>
            </div>
          </div>
          <Link to={data?.resultCartItems.length > 0 && "/OrderConfirmation"} className="flex justify-center mr-5 ml-5">
            <button
              onClick={() => (data?.resultCartItems.length > 0 ? onClose() : toast.error("Giỏ hàng trống"))}
              className="bg-black text-white w-73 h-12 flex items-center justify-center relative overflow-hidden group cursor-pointer mb-20"
            >
              <span className="relative z-10">Thanh toán</span>
              <span className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-gray-950 to-gray-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CartSidebar;
