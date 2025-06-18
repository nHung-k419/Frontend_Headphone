import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarReview from "../components/Sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkColor, setCheckColor] = useState(null);
  const [openModal, setOpenModal] = useState({
    Search: false,
    Notification: false,
  });
  const ProductsSearch = [
    {
      Name: "Product 1",
      Image:
        "https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg",
      Price: "$100",
    },
    {
      Name: "Product 2",
      Image:
        "https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg",
      Price: "$100",
    },
    {
      Name: "Product 3",
      Image:
        "https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg",
      Price: "$100",
    },
    {
      Name: "Product 4",
      Image:
        "https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg",
      Price: "$100",
    },
    {
      Name: "Product 5",
      Image:
        "https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg",
      Price: "$100",
    },
  ];
  const Notifitcation = [
    {
      id: 1,
      Name: "Alex",
      Image: "https://i.pravatar.cc/100",
      text: "Đã xác nhận thông báo cho bạn",
    },
    {
      id: 2,
      Name: "Peter",
      Image: "https://i.pravatar.cc/100",
      text: "Bạn đã thêm headphone vào giỏ hàng",
    },
    {
      id: 3,
      Name: "Cursor",
      Image: "https://i.pravatar.cc/100",
      text: "Đã xác nhận thông báo cho baise",
    },
    {
      id: 4,
      Name: "Dany",
      Image: "https://i.pravatar.cc/100",
      text: "Bạn đã thêm headphone vào giỏ hàng",
    },
    {
      id: 5,
      Name: "Rock",
      Image: "https://i.pravatar.cc/100",
      text: "Admin đã xác nhận đơn hàng của bạn!",
    },
  ];
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `15px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }
  }, [isSidebarOpen]);
  const handleOpenModal = (KeyModal) => {
    setOpenModal((prev) => ({
      [KeyModal]: !prev[KeyModal],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && notificationRef.current) {      
        setOpenModal({ Search: false, Notification: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="fixed z-10 top-0 w-full ">
      {/* sidebar */}
      <div
        className={`fixed top-0 h-full w-70 bg-gray-50 rounded-r-xl text-black shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between ml-3 mr-3">
          <p className="text-2xl font-bold ">CLUE</p>
          <div
            onClick={() => setIsOpen(false)}
            className="h-5 w-5 rounded-full flex items-center justify-center bg-gray-800"
          >
            <IoCloseSharp className="text-md text-white" />
          </div>
        </div>
        <ul className="flex flex-col ml-3 gap-8 font-medium flex-wrap mt-10">
          {["Home", "About", "Product", "Brand", "FAQS"].map((item, idx) => (
            <Link
              to={`${item === "Home" ? "/" : "/" + item}`}
              key={idx}
              className="relative overflow-hidden group cursor-pointer"
            >
              {item}
              <p className="absolute w-full bottom-0 left-0 h-[1px] bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></p>
            </Link>
          ))}
        </ul>
        {/* sidebar */}
      </div>
      <div className="flex flex-wrap justify-around w-screen items-center gap-4 h-15 bg-white  ">
        <p className="text-2xl font-bold lg:block hidden">CLUE</p>
        <div className="lg:block hidden">
          <ul className=" flex items-center gap-8 font-medium flex-wrap ">
            {["Home", "About", "Product", "Brand", "FAQS"].map((item, idx) => (
              <Link
                to={`${item === "Home" ? "/" : "/" + item}`}
                key={idx}
                className="relative overflow-hidden group cursor-pointer"
              >
                {item}
                <p className="absolute w-full bottom-0 left-0 h-[1px] bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></p>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center lg:space-x-7 space-x-5 mr-10 none list-none">
          <AiOutlineMenu
            className="lg:hidden block lg:ml-0 ml-2"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="relative">
            <input
              type="text"
              className="rounded-3xl border-2  h-10 pl-3 border-teal-400 focus:outline-none "
              placeholder="Searching..."
              onFocus={() => handleOpenModal("Search")}
            />
            <span className="absolute right-3 top-2.5 text-xl text-gray-500">
              <IoSearch />
            </span>
          </div>
          {/* boxModal */}
          <div
            className={`absolute lg:w-110 top-full h-85 w-screen pb-5  overflow-auto hide-scrollbar rounded-md bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              openModal.Search
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
            ref={searchRef}
          >
            {ProductsSearch.map((Product) => (
              <div className="flex items-center space-x-7">
                <div>
                  <img
                    className="w-15 h-15 ml-5 mt-5 rounded-md "
                    src={`${Product.Image}`}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="font-semibold ">{Product.Name}</h2>
                    <span className="text-yellow-400 text-md">★★★★★</span>
                    {/* <del>$200</del> */}
                  </div>
                  <span className="font-semibold mr-5">${Product.Price}</span>
                </div>
              </div>
            ))}
          </div>
          {/* boxModal */}
          <li className="text-xl cursor-pointer">
            <LuUserRound />
          </li>
          <li
            className="relative text-xl cursor-pointer"
            onClick={() => handleOpenModal("Notification")}
          >
            <AiOutlineBell />
          </li>
          <div
            ref={notificationRef}
            className={`absolute top-full  lg:w-110 w-90 h-86 overflow-auto hide-scrollbar lg:ml-0 ml-4 rounded-md bg-gray-50 shadow-lg z-20 transition-all duration-300 ease-in-out ${
              openModal.Notification
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="absolute -top-2 right-15 w-4 h-4 bg-gray-50 rotate-45 z-70"></div>
            <div className="flex justify-between items-center p-3">
              <h1 className="font-semibold text-lg">Notification</h1>
              <div className="h-5 w-5 flex justify-center items-center rounded-full bg-white cursor-pointer">
                <span
                  onClick={() =>
                    setOpenModal({ ...openModal, Notification: false })
                  }
                >
                  <IoCloseSharp />
                </span>
              </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
            {Notifitcation.map((item) => (
              <div
                onClick={() => setCheckColor(item.id)}
                className={`flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer ${
                  checkColor === item.id ? "bg-gray-100" : ""
                }`}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100"
                  alt=""
                />
                <span className="font-semibold w-20">{item.Name}</span>
                <p className="font-light text-sm w-full">{item.text}</p>
              </div>
            ))}
          </div>
          <li
            onClick={() => setIsSidebarOpen(true)}
            className="text-xl cursor-pointer"
          >
            <IoCartOutline />
          </li>
        </div>
      </div>
      <SidebarReview
        keyOpen="cart"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* overlay */}
    </div>
  );
};

export default Navbar;
