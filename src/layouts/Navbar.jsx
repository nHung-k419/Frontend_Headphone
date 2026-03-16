import React, { useEffect, useState, useRef, useContext } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { highlightText } from "../components/HighLightText/HightLight";
import { GetAllProducts } from "../services/Client/Product";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbLogin } from "react-icons/tb";
import { LogoutAuth } from "../services/Client/Auth";
import { FaBorderAll } from "react-icons/fa";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import ReactStars from "react-rating-stars-component";
import { getNotificationById, markAsRead } from "../services/Client/Notification";
import { getProfileUser } from "../services/Client/Auth";
import AvatarContext from "../context/AvatarContext";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { GetCartItemsByUser } from "../services/Client/Cart";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import socket from "../Socket/index.js";
import { getRoute } from "../helper/route.js";

dayjs.extend(relativeTime);
dayjs.locale("vi");
const Navbar = () => {
  const queryClient = useQueryClient();
  const { avatarUrl } = useContext(AvatarContext);
  // console.log(avatarUrl);
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const { Name, id } = user ? JSON?.parse(user) : "";
  const cart = localStorage.getItem("cart");
  const cartLocalstorage = cart ? JSON.parse(cart) : [];
  const cartItems = useSelector((state) => state.cart.CartItem);
  // console.log(cartItems);
  const { data: dataCart, isLoading: isLoadingCart } = useQuery({
    queryKey: ["CartItemsNew", idUser],
    queryFn: () => GetCartItemsByUser(idUser),
    enabled: !!idUser,
  });
  // console.log('dataCart', dataCart);
  // const user = Cookies?.get("User");
  // const { Name, id } = user ? JSON?.parse(user) : "";
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const UserRef = useRef(null);
  const searchBtnRef = useRef(null);
  const notificationBtnRef = useRef(null);
  const userBtnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkColor, setCheckColor] = useState(null);
  const [openModal, setOpenModal] = useState({
    Search: false,
    Notification: false,
    User: false,
  });
  const [valueSearch, setValueSearch] = useState("");
  const [isRead, setIsRead] = useState(null);
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["search", valueSearch],
    queryFn: () => SearchProducts(valueSearch),
  });
  const { data: dataUser } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileUser(id),
  });
  // console.log(dataUser?.isCheckUser);

  const { data: dataProduct } = useQuery({
    queryKey: ["product"],
    queryFn: () => GetAllProducts(),
  });
  const { data: dataNotification } = useQuery({
    queryKey: ["notification", id],
    queryFn: () => getNotificationById(id),
  });
  const mutationmarkAsRead = useMutation({
    mutationKey: ["markAsRead"],
    mutationFn: () => markAsRead(id),
    onSuccess: (data) => {
      setIsRead(data);
    },
  });

  useEffect(() => {
    if (idUser) {
      socket.emit("join", idUser);
      console.log("useEffect run");

      socket.on("new-notification", (notification) => {
        console.log("New notification received:", notification);
        queryClient.setQueryData(["notification", id], (oldData) => {
          if (!oldData) return { result: [notification] };
          return {
            ...oldData,
            result: [notification, ...oldData.result]
          };
        });
      });

      // socket.on("order-status-updated", () => {
      //   queryClient.invalidateQueries(["notification", id]);
      // });

      return () => {
        socket.off("new-notification");
        // socket.off("order-status-updated");
      };
    }
  }, [idUser, id, queryClient]);

  useEffect(() => {
    if (openModal.Notification) {
      mutationmarkAsRead.mutate(id);
    }
  }, [openModal.Notification]);
  // console.log(openModal.Notification);
  const [isShaking, setIsShaking] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsShaking(true);
  //     setTimeout(() => setIsShaking(false), 500);
  //   }, 1000);

  //   return () => clearInterval(interval); // cleanup
  // }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/Product", {
        state: {
          keyWord: valueSearch,
        },
      });
      setValueSearch("");
      setOpenModal({ ...openModal, Search: false });
    }
  };
  const handleCheckIsRead = () => {
    setOpenModal({ ...openModal, Notification: false });
  };
  // console.log(valueSearch);

  const mutationLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => LogoutAuth(),
    onSuccess: () => {
      navigate("/Auth/Login");
      localStorage.removeItem("User");
      toast.success("Đăng xuất thành công");
      Cookies.remove("User");
    },
  });
  const handleLogout = () => {
    mutationLogout.mutate();
    setOpenModal({ ...openModal, User: false });
  };

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
      Search: false,
      Notification: false,
      User: false,
      [KeyModal]: !prev[KeyModal],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideSearch =
        (!searchRef.current || !searchRef.current.contains(event.target)) &&
        (!searchBtnRef.current || !searchBtnRef.current.contains(event.target));
      const isOutsideNotification =
        (!notificationRef.current || !notificationRef.current.contains(event.target)) &&
        (!notificationBtnRef.current || !notificationBtnRef.current.contains(event.target));
      const isOutsideUser =
        (!UserRef.current || !UserRef.current.contains(event.target)) &&
        (!userBtnRef.current || !userBtnRef.current.contains(event.target));

      if (isOutsideSearch && isOutsideNotification && isOutsideUser) {
        setOpenModal({
          Search: false,
          Notification: false,
          User: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giới thiệu", path: "/About" },
    { label: "Cửa hàng", path: "/Product" },
    { label: "Thương hiệu", path: "/Brand" },
    { label: "FAQS", path: "/FAQS" },
  ];
  return (
    <div className="fixed z-50 top-0 w-full ">
      {/* sidebar */}
      <div
        className={`fixed top-0 h-full w-70 bg-gray-50 rounded-r-xl text-black shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between ml-3 mr-3">
          <p className="text-2xl font-serif">
            Soun<span className="text-teal-500">dora</span>
          </p>
          <div onClick={() => setIsOpen(false)} className="h-5 w-5 rounded-full flex items-center justify-center bg-gray-800">
            <IoCloseSharp className="text-md text-white" />
          </div>
        </div>
        <ul className="flex flex-col ml-3 gap-8 font-medium flex-wrap mt-10">
          {navItems.map((item, idx) => (
            <Link onClick={() => setIsOpen(false)} to={getRoute(item.path)} key={idx} className="relative overflow-hidden group cursor-pointer">
              {item.label}
              <p className="absolute w-full bottom-0 left-0 h-[1px] bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></p>
            </Link>
          ))}
        </ul>
        {/* sidebar */}
      </div>
      <div className="flex justify-around w-screen items-center gap-4 h-15 bg-white  ">
        <p className="text-2xl lg:block hidden font-serif">
          Soun<span className="text-teal-500">dora</span>
        </p>
        <div className="lg:block hidden">
          <ul className=" flex items-center gap-8 font-medium  ">
            {navItems.map((item, idx) => (
              <Link to={getRoute(item.path)} key={idx} className="relative overflow-hidden group cursor-pointer">
                {item.label}
                <p className="absolute w-full bottom-0 left-0 h-[1px] bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></p>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center lg:space-x-7 space-x-5 mr-10 none list-none">
          <AiOutlineMenu className="lg:hidden block lg:ml-0 ml-2" onClick={() => setIsOpen(!isOpen)} />
          <div ref={searchBtnRef} className="relative">
            <input
              type="text"
              className="rounded-3xl border-2 lg:w-50 md:w-50 w-45 h-10 pl-3 border-teal-400 focus:outline-none "
              placeholder="Tìm kiếm..."
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
          <AnimatePresence>
            {openModal.Search && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className={`absolute lg:w-110 top-full ${!valueSearch ? "h-80" : "h-65"
                  } w-screen pb-5 overflow-auto hide-scrollbar rounded-sm bg-[#FAF9F6] border border-[#E5E2D9] shadow-2xl z-50`}
                ref={searchRef}
              >
                <div className="flex justify-between items-center px-5 py-3 border-b border-[#F0EEE6]">
                  {!valueSearch ? (
                    <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">
                      Sản phẩm được tìm kiếm nhiều nhất
                    </h1>
                  ) : (
                    <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">
                      Kết quả tìm kiếm
                    </h1>
                  )}
                  <button
                    onClick={() => setOpenModal({ ...openModal, Search: false })}
                    className="p-1 hover:bg-[#F0EEE6] rounded-full transition-colors text-[#8C8C8C]"
                  >
                    <IoCloseSharp size={18} />
                  </button>
                </div>

                <div className="p-2 divide-y divide-[#F0EEE6]">
                  {valueSearch &&
                    data?.resultSearch.map((Product) => (
                      <Link
                        onClick={() => setOpenModal({ ...openModal, Search: false })}
                        to={getRoute(`/Products/Detail/${Product._id}`)}
                        key={Product._id}
                        className="block p-3 hover:bg-white transition-colors group"
                      >
                        <span className="text-xs font-medium group-hover:text-emerald-700">
                          {highlightText(Product.Name, valueSearch)}
                        </span>
                      </Link>
                    ))}

                  {isLoading && (
                    <div className="flex justify-center items-center py-8">
                      <Loading />
                    </div>
                  )}

                  {data?.resultSearch?.length === 0 && valueSearch && (
                    <div className="py-12 text-center text-[10px] uppercase tracking-widest text-[#8C8C8C] italic">
                      Không tìm thấy sản phẩm nào "{valueSearch}"
                    </div>
                  )}

                  {!valueSearch &&
                    dataProduct?.data?.map((Product) => (
                      <Link
                        key={Product._id}
                        onClick={() => setOpenModal({ ...openModal, Search: false })}
                        to={getRoute(`/Products/Detail/${Product._id}`)}
                        className="flex items-center space-x-4 p-3 hover:bg-white transition-colors group"
                      >
                        <div className="w-12 h-12 flex-shrink-0 bg-white border border-[#E5E2D9] rounded-sm p-1">
                          <img
                            className="w-full h-full object-contain"
                            src={`${Product.ImageUrl.path}`}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xs font-medium truncate group-hover:text-emerald-700">
                            {Product.Name}
                          </h2>
                          <div className="flex items-center justify-between mt-1">
                            <ReactStars count={5} size={10} value={Product.Rating} isHalf={true} edit={false} activeColor="#059669" />
                            <span className="text-xs font-bold text-emerald-700">
                              {Product.minPrice?.toLocaleString("vi-VN")}₫
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* boxModal */}
          {!user ? (
            <Link className="flex justify-center text-white rounded-md items-center h-10 w-27 bg-teal-500 hover:bg-teal-600 transform transition-all duration-200 ease-in-out hover:rotate-1 hover:translate-y-[-3px]" to={getRoute("/Auth/Login")}>
              Đăng nhập
            </Link>
          ) : (
            <div ref={userBtnRef} onClick={() => handleOpenModal("User")} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
              {" "}
              <img className={`w-8 h-8 rounded-full object-cover ${avatarUrl || dataUser?.isCheckUser?.Image?.path ? "" : "border-1 border-gray-500"}`} src={avatarUrl || dataUser?.isCheckUser?.Image?.path || "https://i.pinimg.com/736x/43/14/0a/43140a3803e5f1b39c1ffac1a35a3ec7.jpg"} alt="404" />
            </div>
          )}
          <AnimatePresence>
            {openModal.User && (
              <motion.div
                ref={UserRef}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full lg:w-87 w-64 right-0 lg:ml-0 rounded-sm bg-[#FAF9F6] border border-[#E5E2D9] shadow-2xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3 bg-white border-b border-[#F0EEE6]">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8C8C] mb-1">Tài khoản</p>
                  <p className="text-xs font-bold tracking-tight truncate overflow-hidden">{Name}</p>
                </div>
                <div className="p-2 flex flex-col ">
                  {Name && (
                    <Link
                      onClick={() => setOpenModal({ ...openModal, User: false })}
                      to={getRoute(`/Auth/Profile`)}
                      className="flex items-center hover:bg-white p-2 cursor-pointer rounded-sm group transition-colors"
                    >
                      <div className="h-8 w-8 bg-[#F0EEE6] group-hover:bg-emerald-50 rounded-full flex items-center justify-center transition-colors">
                        <span className="text-[#8C8C8C] group-hover:text-emerald-700">
                          <FaUser size={14} />
                        </span>
                      </div>
                      <div className=" w-full p-2 ">
                        <span className="text-xs group-hover:text-emerald-700">Hồ sơ cá nhân</span>
                      </div>
                    </Link>
                  )}
                  {id && (
                    <Link
                      onClick={() => setOpenModal({ ...openModal, User: false })}
                      to={getRoute(`/OrderItems`)}
                      className="flex items-center hover:bg-white p-2 cursor-pointer rounded-sm group transition-colors"
                    >
                      <div className="h-8 w-8 bg-[#F0EEE6] group-hover:bg-emerald-50 rounded-full flex items-center justify-center transition-colors">
                        <span className="text-[#8C8C8C] group-hover:text-emerald-700">
                          <FaBorderAll size={14} />
                        </span>
                      </div>
                      <div className=" w-full p-2 ">
                        <span className="text-xs group-hover:text-emerald-700"> Đơn hàng của tôi</span>
                      </div>
                    </Link>
                  )}
                  <div className="flex items-center hover:bg-white p-2 cursor-pointer rounded-sm group transition-colors">
                    <div className="h-8 w-8 bg-[#F0EEE6] group-hover:bg-emerald-50 rounded-full flex items-center justify-center transition-colors">
                      <span className="text-[#8C8C8C] group-hover:text-emerald-700">
                        <IoSettings size={14} />
                      </span>
                    </div>
                    <div className=" w-full p-2 ">
                      <span className="text-xs group-hover:text-emerald-700"> Cài đặt hệ thống</span>
                    </div>
                  </div>

                  <div className="h-px bg-[#F0EEE6] my-1 mx-2" />

                  {id ? (
                    <div onClick={() => handleLogout()} className="flex items-center hover:bg-red-50 p-2 cursor-pointer rounded-sm group transition-colors">
                      <div className="h-8 w-8 bg-[#F0EEE6] group-hover:bg-red-100 rounded-full flex items-center justify-center transition-colors">
                        <span className="text-[#8C8C8C] group-hover:text-red-600">
                          <IoLogOut size={14} />
                        </span>
                      </div>
                      <div className=" w-full p-2 ">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C8C] group-hover:text-red-700 transition-colors">Đăng Xuất</span>
                      </div>
                    </div>
                  ) : (
                    <Link to={getRoute("/Auth/Login")} className="flex items-center hover:bg-emerald-50 p-2 cursor-pointer rounded-sm group transition-colors">
                      <div className="h-8 w-8 bg-[#F0EEE6] group-hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors">
                        <span className="text-[#8C8C8C] group-hover:text-emerald-600">
                          <IoLogOut size={14} />
                        </span>
                      </div>
                      <div className=" w-full p-2 ">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Đăng Nhập</span>
                      </div>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {user && (
            <li ref={notificationBtnRef} className="relative text-xl cursor-pointer" onClick={() => handleOpenModal("Notification")}>
              <AiOutlineBell className={` text-gray-700 bell-shake`} />
              {dataNotification?.result?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {dataNotification?.result?.length}
                </span>
              )}
            </li>
          )}
          <AnimatePresence>
            {openModal.Notification && (
              <motion.div
                ref={notificationRef}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full lg:w-96 w-80 right-0 overflow-auto hide-scrollbar lg:ml-0 rounded-sm bg-[#FAF9F6] border border-[#E5E2D9] shadow-2xl z-50 h-96"
              >
                <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-[#F0EEE6] sticky top-0 z-10">
                  <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Thông báo</h1>
                  <button
                    onClick={() => handleCheckIsRead()}
                    className="p-1 hover:bg-[#F0EEE6] rounded-full transition-colors text-[#8C8C8C]"
                  >
                    <IoCloseSharp size={18} />
                  </button>
                </div>

                <div className="divide-y divide-[#F0EEE6]">
                  {dataNotification?.result?.length > 0 ? (
                    dataNotification.result.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => setCheckColor(item._id)}
                        className={`p-4 hover:bg-white transition-colors cursor-pointer flex items-start space-x-3 group ${checkColor === item.id ? "bg-white" : ""
                          }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex-shrink-0 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                          <AiOutlineBell className="text-emerald-700" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-sm font-bold text-[#2D2D2D] truncate group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </span>
                          <p className="text-[11px] text-[#8C8C8C] leading-snug mt-0.5 line-clamp-2">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-red-600 mt-1 block">
                            {dayjs(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-600 self-start opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-[10px] uppercase tracking-widest text-[#8C8C8C] italic">
                      Không có thông báo mới
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {user && (
            <Link to={getRoute("/Cart")} className="text-xl cursor-pointer relative">
              <IoCartOutline />
              {dataCart?.resultCartItems?.length > 0 || cartItems?.length > 0 ? (
                <span className={`absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center animate-pulse`}></span>
              ) : null}
            </Link>
          )}
          {/* <li onClick={() => setIsSidebarOpen(true)} className="text-xl cursor-pointer">
            <IoCartOutline />
          </li> */}
        </div>
      </div>
      {/* <SidebarReview keyOpen="cart" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
      {/* overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
      {/* overlay */}
    </div>
  );
};

export default Navbar;
