import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_1.5fr] grid-cols-1 h-full w-full select-none overflow-y-auto hide-scrollbar ">
      <div>
        <div className="flex justify-between items-center ">
          <Link
            to={"/"}
            className="text-gray-400 flex items-center gap-x-2 font-light text-sm p-5"
             onClick={onClose}
          >
            <span className="text-black">
              <FaArrowLeft />
            </span>
            BACK TO STORE
            
          </Link>
          <span
            onClick={onClose}
          >
             <IoCloseSharp className="lg:hidden block cursor-pointer text-xl mr-5" />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="p-5 text-xl font-light">Shopping Cart</h1>
          <span className="text-gray-500 mr-5 text-sm">4 ITEMS</span>
        </div>
        <hr className="border-t-1 border-gray-300 lg:w-156 w-screen mx-auto" />
        <div className="flex flex-col lg:overflow-y-auto h-[calc(100vh-160px)] hide-scrollbar p-5 space-y-3">
          <div className="flex items-center space-x-4 pt-2 pl-2 pr-2 bg-white rounded-xl ">
            <div className="max-w-20 h-35 ">
              <img
                src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                className="w-full h-full object-contain rounded-md"
                alt=""
              />
            </div>
            <div className="flex justify-between w-full relative">
              <div className="space-y-1">
                <h1 className="text-lg text-gray-600">Relaxed Fit T-Shirt</h1>
                <span className="text-sm text-gray-400">$12.99 | </span>{" "}
                <span className="text-green-600">In Stock</span>
                <div className="flex mt-3 space-x-2 w-full ">
                  <button className="rounded-md h-6.5 w-16 border-1 border-gray-300 text-gray-500">
                    Xl
                  </button>
                  <button className="rounded-md h-6.5 w-23 border-1 border-gray-300 text-gray-500">
                    Blue
                  </button>
                  <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 flex items-center justify-center space-x-4 text-gray-500 ">
                    <span>
                      <LuMinus />
                    </span>
                    <span>1</span>
                    <span>
                      <GoPlus />
                    </span>
                  </button>
                </div>
              </div>
              <div className="cursor-pointer">
                <span>
                  <IoCloseSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 pt-2 pl-2 pr-2 bg-white rounded-xl ">
            <div className="max-w-20 h-35 ">
              <img
                src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                className="w-full h-full object-contain rounded-md"
                alt=""
              />
            </div>
            <div className="flex justify-between w-full relative">
              <div className="space-y-1">
                <h1 className="text-lg text-gray-600">Relaxed Fit T-Shirt</h1>
                <span className="text-sm text-gray-400">$12.99 | </span>{" "}
                <span className="text-green-600">In Stock</span>
                <div className="flex mt-3 space-x-2 w-full ">
                  <button className="rounded-md h-6.5 w-16 border-1 border-gray-300 text-gray-500">
                    Xl
                  </button>
                  <button className="rounded-md h-6.5 w-23 border-1 border-gray-300 text-gray-500">
                    Blue
                  </button>
                  <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 flex items-center justify-center space-x-4 text-gray-500 ">
                    <span>
                      <LuMinus />
                    </span>
                    <span>1</span>
                    <span>
                      <GoPlus />
                    </span>
                  </button>
                </div>
              </div>
              <div className="cursor-pointer">
                <span>
                  <IoCloseSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 pt-2 pl-2 pr-2 bg-white rounded-xl ">
            <div className="max-w-20 h-35 ">
              <img
                src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                className="w-full h-full object-contain rounded-md"
                alt=""
              />
            </div>
            <div className="flex justify-between w-full relative">
              <div className="space-y-1">
                <h1 className="text-lg text-gray-600">Relaxed Fit T-Shirt</h1>
                <span className="text-sm text-gray-400">$12.99 | </span>{" "}
                <span className="text-green-600">In Stock</span>
                <div className="flex mt-3 space-x-2 w-full ">
                  <button className="rounded-md h-6.5 w-16 border-1 border-gray-300 text-gray-500">
                    Xl
                  </button>
                  <button className="rounded-md h-6.5 w-23 border-1 border-gray-300 text-gray-500">
                    Blue
                  </button>
                  <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 flex items-center justify-center space-x-4 text-gray-500 ">
                    <span>
                      <LuMinus />
                    </span>
                    <span>1</span>
                    <span>
                      <GoPlus />
                    </span>
                  </button>
                </div>
              </div>
              <div className="cursor-pointer">
                <span>
                  <IoCloseSharp />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 pt-2 pl-2 pr-2 bg-white rounded-xl ">
            <div className="max-w-20 h-35 ">
              <img
                src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                className="w-full h-full object-contain rounded-md"
                alt=""
              />
            </div>
            <div className="flex justify-between w-full relative">
              <div className="space-y-1">
                <h1 className="text-lg text-gray-600">Relaxed Fit T-Shirt</h1>
                <span className="text-sm text-gray-400">$12.99 | </span>{" "}
                <span className="text-green-600">In Stock</span>
                <div className="flex mt-3 space-x-2 w-full ">
                  <button className="rounded-md h-6.5 w-16 border-1 border-gray-300 text-gray-500">
                    Xl
                  </button>
                  <button className="rounded-md h-6.5 w-23 border-1 border-gray-300 text-gray-500">
                    Blue
                  </button>
                  <button className="rounded-md h-6.5 w-21 border-1 border-gray-300 flex items-center justify-center space-x-4 text-gray-500 ">
                    <span>
                      <LuMinus />
                    </span>
                    <span>1</span>
                    <span>
                      <GoPlus />
                    </span>
                  </button>
                </div>
              </div>
              <div className="cursor-pointer">
                <span>
                  <IoCloseSharp />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 max-h-full h-full flex flex-col justify-between">
        <div className=" lg:space-y-3 space-y-4">
          <div className="flex justify-end pr-3 pt-3">
            <span
              onClick={onClose}
              className="cursor-pointer text-2xl text-gray-700"
            >
              <IoCloseSharp className="lg:block hidden" />
            </span>
          </div>
          <h1 className="pl-5 mt-11 text-lg mb-10">Summary</h1>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Subtotal</span>
            <span>252.00$</span>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Shipping</span>
            <span>0.00$</span>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <span className="text-gray-500">Tax</span>
            <span>39.30$</span>
          </div>
        </div>
        <div className="lg:space-y-10 space-y-10 lg:mt-0 mt-5">
          <div className="">
            <div className="flex justify-between pl-5 pr-5">
              <h1 className="text-gray-500">Total</h1>
              <span>252.00$</span>
            </div>
          </div>
          <div className="flex justify-center mr-5 ml-5">
            <button className="bg-black text-white w-73 h-12 flex items-center justify-center relative overflow-hidden group cursor-pointer mb-20">
              <span className="relative z-10">Checkout</span>
              <span className="absolute w-full h-full left-0 top-0 bg-gradient-to-r from-gray-950 to-gray-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSidebar;
