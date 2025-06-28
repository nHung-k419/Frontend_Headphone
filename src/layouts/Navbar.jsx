import React, { useEffect, useState, useRef } from "react";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarReview from "../components/Sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { SearchProducts } from "../services/Client/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { highlightText } from "../components/HighLightText/HightLight";
import { GetAllProducts } from "../services/Client/Product";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbLogin } from "react-icons/tb";
import { LogoutAuth } from "../services/Client/Auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const Navbar = () => {
  const user = Cookies?.get("User");
  const { Name, id } = user ? JSON?.parse(user) : "";
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const UserRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkColor, setCheckColor] = useState(null);
  const [openModal, setOpenModal] = useState({
    Search: false,
    Notification: false,
    User: false,
  });
  const [valueSearch, setValueSearch] = useState("");
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["search", valueSearch],
    queryFn: () => SearchProducts(valueSearch),
  });
  // console.log(data?.resultSearch);
  const { data: dataProduct } = useQuery({
    queryKey: ["product"],
    queryFn: () => GetAllProducts(),
  });
  // console.log(dataProduct.data);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/Product", {
        state: {
          keyWord: valueSearch,
        },
      });
    }
    setValueSearch("");
  };
  const mutationLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => LogoutAuth(),
    onSuccess: () => {
      navigate("/Auth/Login");
      toast.success("Đăng xuất thành công");
      Cookies.remove("User");
    },
  });
  const handleLogout = () => {
    mutationLogout.mutate();
  };

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
      ...prev,
      [KeyModal]: !prev[KeyModal],
      // isOpen : KeyModal === openModal[KeyModal] ? false : true,
    }));
  };
  // console.log(openModal);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        UserRef.current &&
        !UserRef.current.contains(event.target)
      ) {
        setOpenModal((prev) => ({
          ...prev,
          Search: false,
          Notification: false,
          User: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          <div onClick={() => setIsOpen(false)} className="h-5 w-5 rounded-full flex items-center justify-center bg-gray-800">
            <IoCloseSharp className="text-md text-white" />
          </div>
        </div>
        <ul className="flex flex-col ml-3 gap-8 font-medium flex-wrap mt-10">
          {["Home", "About", "Product", "Brand", "FAQS"].map((item, idx) => (
            <Link to={`${item === "Home" ? "/" : "/" + item}`} key={idx} className="relative overflow-hidden group cursor-pointer">
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
              <Link to={`${item === "Home" ? "/" : "/" + item}`} key={idx} className="relative overflow-hidden group cursor-pointer">
                {item}
                <p className="absolute w-full bottom-0 left-0 h-[1px] bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></p>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center lg:space-x-7 space-x-5 mr-10 none list-none">
          <AiOutlineMenu className="lg:hidden block lg:ml-0 ml-2" onClick={() => setIsOpen(!isOpen)} />
          <div className="relative">
            <input
              type="text"
              className="rounded-3xl border-2  h-10 pl-3 border-teal-400 focus:outline-none "
              placeholder="Searching..."
              // onFocus={() => handleOpenModal("Search")}
              onClick={() => handleOpenModal("Search")}
              onChange={(e) => setValueSearch(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <span className="absolute right-3 top-2.5 text-xl text-gray-500">
              <IoSearch />
            </span>
          </div>
          {/* boxModal */}
          <div
            className={`absolute lg:w-110 top-full ${
              !valueSearch ? "h-80" : "h-65"
            } w-screen pb-5  overflow-auto hide-scrollbar rounded-md bg-gray-50 shadow-lg transform transition-all duration-200 ease-in-out ${
              openModal.Search ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
            ref={searchRef}
          >
            <div className="flex justify-between items-center ml-5 mr-2">
              {/* {valueSearch && <div className=" mt-2 font-semibold text-md ">Kết quả tìm kiếm :</div>} */}
              {!valueSearch && <h1 className=" mt-2  text-md font-semibold ">Top tìm kiếm</h1>}
              {!valueSearch && (
                <div className="h-5 w-5 mt-2 lg:mr-0 mr-2 flex justify-center items-center rounded-full bg-white cursor-pointer">
                  <span onClick={() => setOpenModal({ ...openModal, Search: false })}>
                    <IoCloseSharp />
                  </span>
                </div>
              )}
            </div>
            {/* data?.resultSearch */}
            {valueSearch &&
              data?.resultSearch.map((Product) => (
                <Link to={`/Products/Detail/${Product._id}`} key={Product._id}>
                  {highlightText(Product.Name, valueSearch)}
                </Link>
              ))}
            {data?.resultSearch?.length === 0 && (
              <h1 className="text-red-600 mt-5 font-semibold text-lg flex justify-center items-end ">
                Không tìm thấy sản phẩm nào "{valueSearch}"
              </h1>
            )}
            {/* {console.log(data?.resultSearch?.length === 0 ? "Khong tim thay" : "Tim thay")} */}
            {!valueSearch &&
              dataProduct?.data?.map((Product) => (
                <div className="flex items-center space-x-5 hover:bg-gray-200 cursor-pointer">
                  <div>
                    {/* <span>
                    <IoSearch />
                  </span> */}
                    <img className="w-12 h-12 ml-5 mt-5 rounded-sm object-contain " src={`${Product.ImageUrl.path}`} alt="" />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h2 className="font-normal lg:text-md md:text-md text-sm ">{Product.Name}</h2>
                      <span className="text-yellow-400 text-sm">★★★★★</span>
                      {/* <del>$200</del> */}
                    </div>
                    <span className="font-semibold mr-5">{Product.Price?.toLocaleString("vi-VN")}$</span>
                  </div>
                </div>
              ))}
          </div>
          {/* boxModal */}
          {!user ? (
            <li onClick={() => handleOpenModal("User")} className="text-xl cursor-pointer relative">
              <LuUserRound />
            </li>
          ) : (
            <div onClick={() => handleOpenModal("User")} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
              {" "}
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            </div>
          )}
          <div
            ref={UserRef}
            className={`absolute top-full lg:w-110 w-90 h-fit lg:ml-0 ml-4 rounded-md bg-gray-50 shadow-lg z-20 transition-all duration-200 ease-in-out ${
              openModal.User ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* <hr className="border-t-2 border-gray-300" /> */}
            <div className="p-2 flex flex-col ">
              {Name && <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg">
                <div className="h-10 w-11 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>
                    <FaUser />
                  </span>
                </div>
                <div className=" w-full text-black p-2 rounded-lg font-semibold ">
                  <span className="text-md">{Name}</span>
                </div>
              </div>}
              <div className="flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg">
                <div className="h-10 w-11 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>
                    <IoSettings />
                  </span>
                </div>
                <div className=" w-full text-black p-2 rounded-lg font-semibold ">
                  <span className="text-md"> Cài đặt</span>
                </div>
              </div>
              {/* <Link to={"/Auth/Login"} className="flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg">
                <div className="h-10 w-11 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>
                    <TbLogin />
                  </span>
                </div>
                <div className=" w-full text-black p-2 rounded-lg font-semibold ">
                  <span className="text-md"> Đăng Nhập</span>
                </div>
              </Link> */}
              {id ? (
                <div onClick={() => handleLogout()} className="flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg">
                <div className="h-10 w-11 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>
                    <IoLogOut />
                  </span>
                </div>
                <div className=" w-full text-black p-2 rounded-lg font-semibold ">
                  <span className="text-md">Đăng Xuất</span>
                </div>
              </div>
              ) : (
                <Link to={"/Auth/Login"}  className="flex items-center hover:bg-gray-200 p-2 cursor-pointer rounded-lg">
                <div className="h-10 w-11 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>
                    <IoLogOut />
                  </span>
                </div>
                <div className=" w-full text-black p-2 rounded-lg font-semibold ">
                  <span className="text-md">Đăng Nhập</span>
                </div>
              </Link>
              )}
            </div>
          </div>
          <li className="relative text-xl cursor-pointer" onClick={() => handleOpenModal("Notification")}>
            <AiOutlineBell />
          </li>
          <div
            ref={notificationRef}
            className={`absolute top-full  lg:w-110 w-90 h-86 overflow-auto hide-scrollbar lg:ml-0 ml-4 rounded-md bg-gray-50 shadow-lg z-20 transition-all duration-200 ease-in-out ${
              openModal.Notification ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="absolute -top-2 right-15 w-4 h-4 bg-gray-50 rotate-45 z-70"></div>
            <div className="flex justify-between items-center p-3">
              <h1 className="font-semibold text-lg">Notification</h1>
              <div className="h-5 w-5 flex justify-center items-center rounded-full bg-white cursor-pointer">
                <span onClick={() => setOpenModal({ ...openModal, Notification: false })}>
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
                <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                <span className="font-semibold w-20">{item.Name}</span>
                <p className="font-light text-sm w-full">{item.text}</p>
              </div>
            ))}
          </div>
          <li onClick={() => setIsSidebarOpen(true)} className="text-xl cursor-pointer">
            <IoCartOutline />
          </li>
        </div>
      </div>
      <SidebarReview keyOpen="cart" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
      {/* overlay */}
    </div>
  );
};

export default Navbar;
