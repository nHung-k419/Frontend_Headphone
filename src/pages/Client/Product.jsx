import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsArrowLeftRight } from "react-icons/bs";
import { Mutation, QueryClient, useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { GetAllProducts } from "../../services/Client/Product";
import { GetAllCategory } from "../../services/Client/Categories";
const Product = () => {
  const [checkVisible, setCheckVisible] = useState({
    Size: true,
    Type: true,
    Color: true,
  });
  const [checkActive, setCheckActive] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // Handle call api
  const result = useQueries({
    queries: [
      {
        queryKey: ["productsClient"],
        queryFn: GetAllProducts,
      },
      {
        queryKey: ["categoriesClient"],
        queryFn: GetAllCategory,
      },
    ],
  });
console.log(result[0]);

  const handleGetIdSelect = (e) => {
    const Id = e.target.value;
    const data = result[0]?.data?.getAllProduct.filter((item) => item.Id_Category === Id);
    return data;
  }


  // handle toggle filter
  const toggleSection = (key) => {
    setCheckVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleActive = (keyItem, title) => {
    const isLive = checkActive.map((item) => item);
    if (isLive.includes(keyItem)) {
      setCheckActive(checkActive.filter((item) => item !== keyItem));
    } else {
      setCheckActive((prev) => [...prev, keyItem]);
    }
  };
  console.log(result[0]?.data?.getAllProduct);
  

  const ContentFilter = [
    {
      title: "Size",
      content: ["S", "M", "L", "XL", "XXL"],
    },
    {
      title: "Type",
      content: ["Over-ear", "On-ear", "In-ear", "Earbuds ", "Wired", "Wireless "],
    },
    {
      title: "Color",
      content: ["Trắng", "Đen", "Xanh", "Hồng", "Xanh"],
    },
  ];
  const productList = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/72/ae/8e/72ae8ec07f590667e9817b48c8121cb3.jpg",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/8d/fe/49/8dfe491d09286b6eec86100dd740d333.jpg",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/a5/86/f2/a586f2a0117ae357f1606469995147cb.jpg",
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/7e/47/af/7e47afb5228ef7b617c317b59bcde7f5.jpg",
    },
    {
      id: 5,
      image: "https://i.pinimg.com/736x/91/12/68/911268bdff3b18aa9b13a51318dad012.jpg",
    },
    {
      id: 6,
      image: "https://i.pinimg.com/736x/be/26/f2/be26f2d6ee5161b4877ac712605f05c8.jpg",
    },
    {
      id: 7,
      image: "https://i.pinimg.com/736x/82/9f/ae/829fae1509f6460dcc003b881cee4f45.jpg",
    },
    {
      id: 8,
      image: "https://i.pinimg.com/736x/fe/20/dd/fe20dda86b06a1dff28d4817e0fc8070.jpg",
    },
  ];
  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-70 bg-white transform duration-300 ease-in-out z-20 ${
          isOpenFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <div className=" w-[300px] h-fit mt-4 rounded-sm lg:block md:block hidden"> */}
        <div className="h-screen overflow-auto">
          <h1 className="font-bold ml-4 mt-5">
            FILTER
            <hr className="border-t-3 mt-1 border-gray-700 w-7" />
          </h1>
          {ContentFilter.map((itemValue) => (
            <div>
              <div className="flex items-center justify-between p-4">
                <h1 className="font-bold select-none">{itemValue.title}</h1>
                <span className="cursor-pointer select-none" onClick={() => toggleSection(itemValue.title)}>
                  {checkVisible[itemValue.title] ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
                      onClick={() => handleActive(item, itemValue.title)}
                      className={`text-sm cursor-pointer  ${checkActive.includes(item) ? "text-black" : "text-gray-400"}`}
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
            <input type="range" onChange={(e) => console.log(e.target.value)} min={0} max={10000} />
            <p className="font-semibold">
              Range <span className="text-red-500 font-semibold">$30 - $1000.00</span>
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/*end Sidebar */}
      <section className="grid lg:grid-cols-[1fr_3fr] grid-cols-1 max-w-7xl mx-auto mt-30">
        <div className=" w-[300px] h-fit rounded-sm lg:block md:block hidden">
          <div>
            <h1 className="font-bold ml-4">
              FILTER
              <hr className="border-t-3 mt-1 border-gray-700 w-7" />
            </h1>
            {ContentFilter.map((itemValue) => (
              <div>
                <div className="flex items-center justify-between p-4">
                  <h1 className="font-bold select-none">{itemValue.title}</h1>
                  <span className="cursor-pointer select-none" onClick={() => toggleSection(itemValue.title)}>
                    {checkVisible[itemValue.title] ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
                        onClick={() => handleActive(item, itemValue.title)}
                        className={`text-sm cursor-pointer  ${checkActive.includes(item) ? "text-black" : "text-gray-400"}`}
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
              <input type="range" onChange={(e) => console.log(e.target.value)} min={0} max={10000} />
              <p className="font-semibold">
                Range <span className="text-red-500 font-semibold">$30 - $1000.00</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img className="lg:w-full md:w-full w-full h-90 object-cover" src="https://wallpapercave.com/wp/wp5122307.jpg" alt="" />
          </div>
          <div className="mt-10 flex justify-between items-center">
            <div className="flex items-center ml-7 font-medium text-lg lg:hidden block">
              <span onClick={() => setIsOpenFilter(!isOpenFilter)}>
                <BsArrowLeftRight />
              </span>
            </div>
            <select onChange={(e) => handleGetIdSelect(e)} className="lg:w-50 md:w-30 w-full h-10 bg-gray-100 focus:outline-none text-center text-gray-700 rounded-sm lg:text-md md:text-md text-sm ld:ml-0 md:ml-0 ml-3 lg:mr-0 mr-7">
              {result[1]?.data?.getAllCategory.map((item) => (
                <option value={item._id}>{item.Name}</option>
              ))}
            </select>
            <div className="lg:block hidden">
              <h1 className="text-gray-700 text-sm select-none lg:block hidden">
                SHOWING 1-12 OF 30 RELULTS
                <hr className="border-t-1 border-gray-500 w-full mt-1" />
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 lg:max-w-7xl lg:mx-auto lg:mt-5 mt-5">
            {result[0]?.data?.getAllProduct?.map((product) => (
              <div className="bg-white rounded-2xl my-4 shadow-lg lg:w-[300px] w-[330px] h-full cursor-pointer overflow-hidden">
                <Link to={`/Products/Detail/${product._id}`}>
                  <img
                    className="w-full h-[200px] object-contain hover:scale-105 transition-all duration-300 ease-in-out"
                    src={product.ImageUrl.path}
                    alt=""
                  />
                </Link>
                <div>
                  <div className="pl-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold w-2/3 truncate ">{product.Name}</h1>
                    <span className="mr-3 font-bold text-red-600 text-sm">SALE</span>
                  </div>
                  <div className="ml-3">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                  </div>
                  <div>
                    <p className="ml-3 mr-3 text-sm text-gray-400 line-clamp-2  ">{product.Description}</p>

                    <div className="flex justify-between items-center ml-3 mr-3 mt-5">
                      <div className="space-x-2">
                        <span className="font-semibold text-lg">{product.Price.toLocaleString("vi-VN")}$</span>
                        <del className="text-red-600 text-[13px]">$380</del>
                      </div>
                      <div>
                        <button className="relative overflow-hidden border border-gray-200 shadow-md rounded-full w-30 h-10 font-medium group cursor-pointer hover:shadow-lg transform transition duration-300 ease-in-out bg-white ">
                          <span className="relative z-10 text-black font-normal transition duration-300">Add to cart</span>
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
        {isOpenFilter && <div onClick={() => setIsOpenFilter(false)} className="fixed inset-0 bg-black/60 z-10"></div>}
      </section>
    </div>
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
