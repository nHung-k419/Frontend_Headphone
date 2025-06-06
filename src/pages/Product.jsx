import React, { useState } from "react";
import Shopnow from "../components/Shopnow";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Product = () => {
  const [checkVisible, setCheckVisible] = useState({
    Size: true,
    Type: true,
    Color: true,
  });
  const [checkActive, setCheckActive] = useState([]);
  const toggleSection = (key) => {
    setCheckVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleActive = (keyItem,title) => {
    console.log(title);
    
    const isLive = checkActive.map((item) => item);
    if (isLive.includes(keyItem)) {
      setCheckActive(checkActive.filter((item) => item !== keyItem));
    }else{
      setCheckActive((prev) => [...prev, keyItem]);
    }
  };

  const ContentFilter = [
    {
      title: "Size",
      content: ["S", "M", "L", "XL", "XXL"],
    },
    {
      title: "Type",
      content: [
        "Over-ear",
        "On-ear",
        "In-ear",
        "Earbuds ",
        "Wired",
        "Wireless ",
      ],
    },
    {
      title: "Color",
      content: ["Trắng", "Đen", "Xanh", "Hồng", "Xanh"],
    },
  ];
  const productList = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/a5/86/f2/a586f2a0117ae357f1606469995147cb.jpg",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/8d/fe/49/8dfe491d09286b6eec86100dd740d333.jpg",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/a5/86/f2/a586f2a0117ae357f1606469995147cb.jpg",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/7e/47/af/7e47afb5228ef7b617c317b59bcde7f5.jpg",
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/736x/91/12/68/911268bdff3b18aa9b13a51318dad012.jpg",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/736x/be/26/f2/be26f2d6ee5161b4877ac712605f05c8.jpg",
    },
    {
      id: 7,
      image:
        "https://i.pinimg.com/736x/82/9f/ae/829fae1509f6460dcc003b881cee4f45.jpg",
    },
    {
      id: 8,
      image:
        "https://i.pinimg.com/736x/fe/20/dd/fe20dda86b06a1dff28d4817e0fc8070.jpg",
    },
  ];
  return (
    <section className="grid grid-cols-[1fr_3fr] max w-7xl mx-auto mt-30">
      <div className=" w-[300px] h-fit mt-4 rounded-sm ">
        <div>
          <h1 className="font-bold ml-4 mt-5">
            FILTER
            <hr className="border-t-3 mt-1 border-gray-700 w-7" />
          </h1>
          {ContentFilter.map((itemValue) => (
            <div>
              <div className="flex items-center justify-between p-4">
                <h1 className="font-bold select-none">{itemValue.title}</h1>
                <span
                  className="cursor-pointer select-none"
                  onClick={() => toggleSection(itemValue.title)}
                >
                  {checkVisible[itemValue.title] ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </div>
              <div
                className={`flex flex-col ml-6 space-y-2 select-none max-h-fit h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                  checkVisible[itemValue.title] ? "visible h-40" : ""
                }`}
              >
                {itemValue.content.map((item, index) => (
                  <div>
                    <span
                      onClick={() => handleActive(item,itemValue.title)}
                      className={`text-sm cursor-pointer  ${
                        checkActive.includes(item)
                          ? "text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="p-4">
            <h1 className="font-bold">Price</h1>
            <input
              type="range"
              onChange={(e) => console.log(e.target.value)}
              min={0}
              max={10000}
            />
            <p className="font-semibold">
              Range{" "}
              <span className="text-red-500 font-semibold">$30 - $1000.00</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img
            className="w-full h-90 object-cover"
            src="https://wallpapercave.com/wp/wp5122307.jpg"
            alt=""
          />
        </div>
        <div className="mt-10 flex justify-between items-center">
          <select className="w-40 h-10 bg-gray-100 focus:outline-none text-center text-gray-700 rounded-sm">
            <option value="Default Sorting">Default Sorting</option>
            <option value="1">Tăng dần</option>
            <option value="1">Giảm dần</option>
          </select>
          <div className="">
            <h1 className="text-gray-700 text-sm select-none">
              SHOWING 1-12 OF 30 RELULTS
              <hr className="border-t-1 border-gray-500 w-full mt-1" />
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-7xl lg:mx-auto">
          {productList.map((product) => (
            <div className="bg-white rounded-2xl my-4 shadow-lg w-[300px] h-full cursor-pointer overflow-hidden">
              <Link to={`/Products/Detail/123`}>
                <img
                  className="w-full h-[200px] object-contain hover:scale-105 transition-all duration-300 ease-in-out"
                  src={product.image}
                  alt=""
                />
              </Link>
              <div>
                <div className="pl-3 flex justify-between items-center">
                  <h1 className="text-xl font-semibold w-1/2">
                    Jay - Force Headphones
                  </h1>
                  <span className="mr-3 font-bold text-red-600 text-sm">
                    SALE
                  </span>
                </div>
                <div className="ml-3">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                </div>
                <div>
                  <p className="ml-3 mr-3 text-sm text-gray-400">
                    Jay delivers a distinctive diffrence in sound.
                  </p>

                  <div className="flex justify-between items-center ml-3 mr-3 mt-5">
                    <div className="space-x-2">
                      <span className="font-bold text-lg">$280</span>
                      <del className="text-red-600 text-[13px]">$380</del>
                    </div>
                    <div>
                      <button className="relative overflow-hidden border border-gray-200 rounded-xl w-25 h-9 font-medium group cursor-pointer hover:shadow-lg transform transition duration-300 ease-in-out bg-gradient-to-r from-black to-gray-600">
                        <span className="relative z-10 text-white font-normal transition duration-300">
                          Add to cart
                        </span>
                        {/* <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-gray-500 to-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;

{
  /* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:max-w-7xl lg:mx-auto max-w-xs mx-auto mt-10">
        {productList.map((product) => (
          <div key={product.id}>
            <div className="lg:w-[300px] w-[320px] h-[280px] bg-gray-100 rounded-2xl my-4 flex items-center relative">
              <img
                className="h-40 object-cover rounded-2xl mx-auto"
                src={product.image}
                alt=""
              />
              <span className="absolute top-2 right-2 max-w-9 max-h-9 w-full h-full rounded-full bg-white flex justify-center items-center">
                <FaRegHeart />
              </span>
            </div>
            <div>
              <h2 className="font-bold">Gorsun Headphones</h2>
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-4 text-gray-500 text-xs">(360 Reviews)</span>
            </div>
            <div className="mt-3">
              <button className="relative overflow-hidden border border-gray-200 rounded-full md:w-1/2 w-37 h-14 font-medium group cursor-pointer">
                <span className="relative z-10 text-black group-hover:text-white transition duration-300">
                  Add to cart
                </span>
                <span className="absolute left-0 top-0 w-full h-full bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              </button>
              <span className="mt-2 text-sm ml-6">
                <del className="text-gray-400 mr-2">$238.00</del>
                <span className="font-bold text-lg">$158.00</span>
              </span>
            </div>
          </div>
        ))}
      </section>
      <Shopnow props="See More" /> */
}
