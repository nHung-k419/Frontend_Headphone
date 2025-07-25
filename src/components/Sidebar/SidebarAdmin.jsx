import React, { useState } from "react";
import { FaHouseMedical } from "react-icons/fa6";
import { Link } from "react-router-dom";
const SidebarAdmin = () => {
  const [open, setOpen] = useState(false);
  const listNavbar = [
    {
      name: "Thống kê",
      link: "/Admin/dashboard",
      icon: <FaHouseMedical />,
    },
    {
      name: "Danh mục",
      link: "/Admin/Categories",
      icon: <FaHouseMedical />,
    },
    {
      name: "Sản phẩm",
      link: "/Admin/Products",
      icon: <FaHouseMedical />,
    },
    {
      name: "Đơn hàng",
      link: "/Admin/Orders",
      icon: <FaHouseMedical />,
    },
    {
      name: "Đánh giá",
      link: "/Admin/Reviews",
      icon: <FaHouseMedical />,
    },
    {
      name: "Tài khoản",
      link: "/Admin/Users",
      icon: <FaHouseMedical />,
    },
    {
      name: "Sản phẩm biến thể",
      link: "/Admin/ProductVariants",
      icon: <FaHouseMedical />,
    },
    {
      name: "Thương hiệu",
      link: "/Admin/Brand",
      icon: <FaHouseMedical />,
    },
     {
      name: "Quản lý kho",
      link: "/Admin/Stock",
      icon: <FaHouseMedical />,
    },
  ];
  return (
    <div className="w-[250px] bg-gray-100 h-screen">
      <h1>SidebarAdmin</h1>
      <div className="flex flex-col mt-10 space-y-5">
        {listNavbar.map((item, index) => (
          <Link
            to={item.link}
            className="flex items-center space-x-2 w-full hover:bg-blue-600 transition duration-300 ease-in-out rounded-md hover:text-white cursor-pointer h-10 p-2"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
