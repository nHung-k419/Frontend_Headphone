import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarReview from "../components/Sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `15px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }
  }, [isSidebarOpen]);
  return (
    <div className="fixed z-15 top-0 w-full ">
      <div className="flex flex-wrap justify-around items-center gap-4 h-15 bg-white  ">
        <p className="text-2xl font-bold lg:block hidden">CLUE</p>
       <div className="lg:block hidden">
         <ul className=" flex items-center gap-8 font-medium flex-wrap ">
          {["Home", "Stories", "Product", "Brand", "FAQS"].map((item, idx) => (
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
          <AiOutlineMenu className="lg:hidden block lg:ml-0 ml-2"/>
          <div className="relative">
            <input
              type="text"
              className="rounded-3xl border-2  h-10 pl-3 border-teal-400 focus:outline-none "
              placeholder="Searching..."
            />
            <span className="absolute right-3 top-2.5 text-xl text-gray-500">
              <IoSearch />
            </span>
          </div>
          <li className="text-xl cursor-pointer">
            <LuUserRound />
          </li>
          <li className="text-xl cursor-pointer">
            <AiOutlineBell />
          </li>
          <li
            onClick={() => setIsSidebarOpen(true)}
            className="text-xl cursor-pointer"
          >
            <FaRegHeart />
          </li>
         </div>
      </div>
      <SidebarReview
        keyOpen="cart"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default Navbar;
