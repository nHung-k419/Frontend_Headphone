import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MdSpaceDashboard 
} from "react-icons/md";
import { 
  FaLayerGroup, FaBoxOpen, FaShoppingCart, FaStar, 
  FaUserFriends, FaBoxes, FaTrademark, FaWarehouse ,FaBox
} from "react-icons/fa";

const SidebarAdmin = () => {
  const [active, setActive] = useState(null);
 const [open, setOpen] = useState(true);
  const listNavbar = [
    { name: "Thống kê", link: "/Admin/dashboard", icon: <MdSpaceDashboard /> },
    { name: "Danh mục", link: "/Admin/Categories", icon: <FaLayerGroup /> },
    { name: "Sản phẩm", link: "/Admin/Products", icon: <FaBoxOpen /> },
    { name: "Đơn hàng", link: "/Admin/Orders", icon: <FaShoppingCart /> },
    { name: "Đánh giá", link: "/Admin/Reviews", icon: <FaStar /> },
    { name: "Tài khoản", link: "/Admin/Users", icon: <FaUserFriends /> },
    { name: "Sản phẩm biến thể", link: "/Admin/ProductVariants", icon: <FaBoxes /> },
    { name: "Thương hiệu", link: "/Admin/Brand", icon: <FaTrademark /> },
    { name: "Quản lý kho", link: "/Admin/Stock", icon: <FaWarehouse /> },
    { name: "Quản lý Vouchers", link: "/Admin/Voucher", icon: <FaBox /> },
  ];

  return (
    <div className={`${open ? "w-70 " : "w-0"} transition-all duration-500 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300  sticky top-0 left-0`}>
      {/* Logo */}
      <div className={`px-6 py-6 text-xl font-bold text-white border-b border-slate-700 transform transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        Admin Soundora
      </div>
{/* <button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-5 bg-blue-600 text-white rounded-full p-1"
      >
        {open ? "Đóng" : "Mở"}
      </button> */}
      {/* Menu */}
      <div className={`flex flex-col mt-6 space-y-2 px-4 transform transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {listNavbar.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            onClick={() => setActive(index)}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
              ${active === index 
                ? "bg-teal-600 text-white shadow-md" 
                : "hover:bg-slate-700 hover:text-white"}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
