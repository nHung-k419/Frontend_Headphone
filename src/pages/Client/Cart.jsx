import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
const Cart = () => {
  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-7xl mx-auto  ">
      <div className="bg-gray-100">
        <h1 className="p-3 text-lg font-semibold">Cart</h1>
        <hr className="border-t-1 border-gray-300 w-153 mx-auto" />
        <div className="flex flex-col">
          <div className="flex space-x-4 p-3 ">
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
                   <div className="absolute right-0 flex space-x-3 cursor-pointer items-center text-gray-500">
                     <span className="flex items-center space-x-1">
                        <GoHeartFill />
                        <span>Save </span>
                      </span>
                      <span className="text-sm text-gray-200">|</span>
                      <span className="flex items-center space-x-1 cursor-pointer ">
                        <AiFillDelete />
                        <span>Delete</span>
                      </span>
                    </div>
                </div>
              </div>
              <div>
                <span className="text-md font-semibold">$12.99</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-gray-300 w-153 mx-auto" />
        <div className="flex flex-col">
          <div className="flex space-x-4 p-3 ">
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
                   <div className="absolute right-0 flex space-x-3 cursor-pointer items-center text-gray-500">
                     <span className="flex items-center space-x-1">
                        <GoHeartFill />
                        <span>Save </span>
                      </span>
                      <span className="text-sm text-gray-200">|</span>
                      <span className="flex items-center space-x-1 cursor-pointer ">
                        <AiFillDelete />
                        <span>Delete</span>
                      </span>
                    </div>
                </div>
              </div>
              <div>
                <span className="text-md font-semibold">$12.99</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-gray-300 w-153 mx-auto" />
        <div className="flex flex-col">
          <div className="flex space-x-4 p-3 ">
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
                   <div className="absolute right-0 flex space-x-3 cursor-pointer items-center text-gray-500">
                     <span className="flex items-center space-x-1">
                        <GoHeartFill />
                        <span>Save </span>
                      </span>
                      <span className="text-sm text-gray-200">|</span>
                      <span className="flex items-center space-x-1 cursor-pointer ">
                        <AiFillDelete />
                        <span>Delete</span>
                      </span>
                    </div>
                </div>
              </div>
              <div>
                <span className="text-md font-semibold">$12.99</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t-1 border-gray-300 w-153 mx-auto" />
      </div>
      <div>
        <h1>Delivery</h1>
        
      </div>
    </section>
  );
};

export default Cart;
