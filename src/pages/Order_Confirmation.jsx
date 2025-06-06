import { PiInvoice } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
const Order_Confirmation = () => {
  return (
    <section className="lg:max-w-7xl mx-auto lg:w-full h-full mt-20 w-[380px] ">
      <div>
        <h1 className="mb-10 font-semibold text-xl">Your Order</h1>
        <div className="flex items-center ">
          <div className="lg:space-x-5 ">
            <button className="w-25 h-8 rounded-md bg-blue-100 text-blue-700 cursor-pointer">
              <span>Order</span>
            </button>
            <button className="w-35 h-8 rounded-md text-black cursor-pointer">
              <span>Not Yet Shipped</span>
            </button>
            <button className="w-35 h-8 rounded-md text-black cursor-pointer">
              <span>Cancelled Orders</span>
            </button>
          </div>
        </div>
        <div className="h-full w-full shadow-md mt-5 rounded-xl">
          <div className="max-w-6xl mx-auto pt-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-gray-400">Order:</h2>
                <span className="font-semibold">#2561001</span>
              </div>
              <div className="space-x-3">
                <button className="w-30 h-10 rounded-lg border-1 border-gray-300 cursor-pointer relative overflow-hidden group">
                  <span className="relative z-10 group-hover:text-white text-black transition duration-600 ">
                    View Invoice
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
                <button className="w-30 h-10 rounded-lg bg-blue-700 text-white cursor-pointer relative overflow-hidden group">
                  <span className="relative z-10 ">View Invoice</span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center lg:space-x-20 space-x-7 lg:text-md text-sm">
                <div>
                  <h2 className="text-gray-400">Order Date :</h2>
                  <span className="font-semibold">Mar 10, 2023</span>
                </div>
                <div>
                  <h2 className="text-gray-400">Total Amount :</h2>
                  <span className="font-semibold">$890.00</span>
                </div>
                <div>
                  <h2 className="text-gray-400">Ship to :</h2>
                  <span className="font-semibold">Liên Chiểu - Đà Nẵng</span>
                </div>
              </div>
            </div>
            {/* <h1 className="text-2xl font-semibold">Oder Tracking</h1> */}
            <hr className="text-gray-300 w-full mt-5 " />
            <div className="w-full flex items-center justify-between h-8 rounded-xl bg-yellow-50 mt-5 p-3 text-yellow-600">
              <div className="flex items-center space-x-2 ">
                <span>
                  <MdOutlineStarPurple500 />
                </span>
                <p>Please rate your exprience the seller</p>
              </div>
              <span className="cursor-pointer">
                <IoCloseSharp />
              </span>
            </div>
            <div className="mt-5 pb-5">
              <h1 className="text-md font-semibold">Delivered May 10</h1>
              <div className="flex mt-3">
                <img
                  className="w-25 h-25 object-contain"
                  src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                  alt=""
                />
                <div className="ml-3">
                  <h2 className="font-semibold">Headphone RGB2K (Iron gray)</h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Return of Replace items : Eligible through July 12,2023
                  </p>
                  <div className="flex space-x-5 items-center text-blue-700 text-sm mt-3">
                    <span className="flex items-center space-x-1 cursor-pointer font-medium">
                      <RiArrowLeftRightLine />
                      <span>Buy it again</span>
                    </span>
                    <span className="text-[13px]">|</span>
                    <span className="flex items-center space-x-1 cursor-pointer font-medium">
                      <FaRegEye />
                      <span>View Product</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div className="h-full w-full shadow-md mt-5 rounded-xl">
          <div className="max-w-6xl mx-auto pt-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-gray-400">Order:</h2>
                <span className="font-semibold">#2561001</span>
              </div>
              <div className="space-x-3">
                <button className="w-30 h-10 rounded-lg border-1 border-gray-300 cursor-pointer relative overflow-hidden group">
                  <span className="relative z-10 group-hover:text-white text-black transition duration-600 ">
                    View Invoice
                  </span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
                <button className="w-30 h-10 rounded-lg bg-blue-700 text-white cursor-pointer relative overflow-hidden group">
                  <span className="relative z-10 ">View Invoice</span>
                  <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center lg:space-x-20 space-x-7 lg:text-md text-sm">
                <div>
                  <h2 className="text-gray-400">Order Date :</h2>
                  <span className="font-semibold">Mar 10, 2023</span>
                </div>
                <div>
                  <h2 className="text-gray-400">Total Amount :</h2>
                  <span className="font-semibold">$890.00</span>
                </div>
                <div>
                  <h2 className="text-gray-400">Ship to :</h2>
                  <span className="font-semibold">Liên Chiểu - Đà Nẵng</span>
                </div>
              </div>
            </div>
            {/* <h1 className="text-2xl font-semibold">Oder Tracking</h1> */}
            <hr className="text-gray-300 w-full mt-5 " />
            <div className="w-full flex items-center justify-between h-8 rounded-xl bg-yellow-50 mt-5 p-3 text-yellow-600">
              <div className="flex items-center space-x-2 ">
                <span>
                  <MdOutlineStarPurple500 />
                </span>
                <p>Please rate your exprience the seller</p>
              </div>
              <span className="cursor-pointer">
                <IoCloseSharp />
              </span>
            </div>
            <div className="mt-5 pb-5">
              <h1 className="text-md font-semibold">Delivered May 10</h1>
              <div className="flex mt-3">
                <img
                  className="w-25 h-25 object-contain"
                  src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
                  alt=""
                />
                <div className="ml-3">
                  <h2 className="font-semibold">Headphone RGB2K (Iron gray)</h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Return of Replace items : Eligible through July 12,2023
                  </p>
                  <div className="flex space-x-5 items-center text-blue-700 text-sm mt-3">
                    <span className="flex items-center space-x-1 cursor-pointer font-medium">
                      <RiArrowLeftRightLine />
                      <span>Buy it again</span>
                    </span>
                    <span className="text-[13px]">|</span>
                    <span className="flex items-center space-x-1 cursor-pointer font-medium">
                      <FaRegEye />
                      <span>View Product</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order_Confirmation;
