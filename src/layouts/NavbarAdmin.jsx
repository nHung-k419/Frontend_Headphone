import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { BsMoon } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
const NavbarAdmin = () => {
  return (
    <div className="w-[1259px]">
      <div className="flex justify-between w-full p-5">
        <div className="flex space-x-4 ">
          <div className="flex items-center justify-center w-11 h-11 rounded-md border-1 border-gray-300 cursor-pointer">
            <span>
              <CiMenuFries />
            </span>
          </div>
          <div className="relative pl-2 rounded-xl border-1 border-gray-300 flex justify-between items-center select-none ">
            <input
              className="w-90 h-11 outline-none "
              type="text"
              placeholder="Search or type command..."
            />
            <span className="mr-2 text-xl">
              <CiSearch />
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="w-10 h-10 rounded-full border-1 border-gray-300 flex items-center justify-center cursor-pointer ">
            <BsMoon />
          </span>
          <span className="w-10 h-10 rounded-full border-1 border-gray-300 flex items-center justify-center cursor-pointer ">
            <BsBell />
          </span>
          <div className="flex items-center space-x-2">
            <img
            className="w-10 h-10 rounded-full border-1 border-gray-300 flex items-center justify-center cursor-pointer"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
            />
            <span className="text-sm font-semibold">Nguyễn Ngọc Hùng</span>
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-gray-300 w-[1278px] mx-auto" />
    </div>
  );
};

export default NavbarAdmin;
