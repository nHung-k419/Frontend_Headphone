import { HiMiniSpeakerWave } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineNotes } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  const [actionImage, setActionImage] = useState("");
  const listActionImages = [
    {
      id: 1,
      url: "https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/736x/d7/cd/ec/d7cdec94bb1a046f03e1ac36fbd7b7f6.jpg",
    },
    {
      id: 3,
      url: "https://i.pinimg.com/736x/4d/f6/3a/4df63a6aa48b91a48d4df8a4e50f5fba.jpg",
    },
  ];
  const handleActioneChangeImage = (id, urlImage) => {
    setActionImage(listActionImages.find((item) => item.id === id));
  };
  return (
    <div className="mt-20 px-4">
      <section className="grid lg:grid-cols-2 grid-cols-[3fr_2fr] max-w-7xl mx-auto lg:h-100">
        <div className="space-y-6 lg:pt-15 lg:ml-27 ml-0">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.1,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.1,
                duration: 1,
              },
            }}
            className="md:text-3xl lg:text-5xl text-2xl mt-5 font-bold text-black shimmer "
          >
            Trải nghiệm âm thanh <br /> của tương lai
          </motion.h1>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.2,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.2,
                duration: 1,
              },
            }}
            className="font-light"
          >
            🎧 "Thưởng thức âm nhạc mỗi ngày với mẫu tai nghe mới đầy phong cách và thoải mái." <br /> Thể hiện cá tính, truyền cảm hứng,
            tái hiện âm thanh sống động.
          </motion.p>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.2,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.3,
                duration: 1,
              },
            }}
            className="flex space-x-7"
          >
            <div className="flex items-center space-x-2">
              <HiMiniSpeakerWave className="text-emerald-500 text-xl" />
              <span>Âm thanh rõ nét</span>
            </div>
            <div className="flex items-center space-x-2">
              <GiSettingsKnobs className="text-emerald-500 text-xl" />
              <span>Thiết lập hiện đại nhất</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.4,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.6,
                duration: 1,
              },
            }}
            className="flex space-x-4 lg:block sm:block hidden"
          >
            <button className="w-full lg:max-w-32 bg-teal-500 cursor-pointer rounded-md h-10 text-white relative pr-4 cursor-pointe ">
              Mua ngay
              <span className="absolute right-3 inline-flex pt-1 ">
                <MdArrowOutward />
              </span>
            </button>
            <Link to="/Product">
              <button className="w-full  lg:max-w-32 bg-gray-300 rounded-md h-10 text-black font-medium relative pr-4 group overflow-hidden group-hover:text-white z-5 cursor-pointer">
                <span className="relative z-5 text-black group-hover:text-white transition duration-300">Xem thêm</span>
                <span className="absolute z-10 right-3 inline-flex pt-1 group-hover:text-white transition duration-300">
                  <MdOutlineNotes />
                </span>
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-teal-400 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
              </button>
            </Link>
          </motion.div>
        </div>
        <div className="flex justify-between items-center pt-15">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              x: {
                type: "spring",
                stiffness: 60,
              },
              opacity: { duration: 1 },
              ease: "easeIn",
              duration: 1,
            }}
          >
            <img
              className={`lg:w-70 lg:h-80 w-30 h-30 object-contain swing-y`}
              src={actionImage.url ? actionImage.url : "https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"}
              alt=""
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-13 h-60 flex flex-col items-center space-y-6 rounded-md"
          >
            {listActionImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2, // tạo hiệu ứng lần lượt
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <img
                  onClick={() => handleActioneChangeImage(item.id, item.url)}
                  className="w-15 h-15 object-contain cursor-pointer"
                  src={item.url}
                  alt=""
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="flex space-x-4 lg:hidden sm:hidden block">
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            x: {
              delay: 0.4,
              type: "spring",
              stiffness: 60,
            },
            opacity: {
              delay: 0.6,
              duration: 1,
            },
          }}
          className="w-full  lg:max-w-32 bg-teal-500 rounded-md h-10 text-white relative pr-4 cursor-pointe "
        >
          Mua ngay
          <span className="absolute right-3 inline-flex pt-1 ">
            <MdArrowOutward />
          </span>
        </motion.button>
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            x: {
              delay: 0.4,
              type: "spring",
              stiffness: 60,
            },
            opacity: {
              delay: 0.6,
              duration: 1,
            },
          }}
          className="w-full  lg:max-w-32 bg-gray-300 rounded-md h-10 text-black font-medium relative pr-4 group overflow-hidden group-hover:text-white z-5 cursor-pointer"
        >
          <Link to={"/Product"} className="relative z-5 text-black group-hover:text-white transition duration-300">Xem thêm</Link>
          <span className="absolute z-10 right-3 inline-flex pt-1 group-hover:text-white transition duration-300">
            <MdOutlineNotes />
          </span>
          <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
        </motion.button>
      </div>
    </div>
  );
};

export default Header;



// END--------------------------------------------------------------------------------------------------------------------------------------------------------


// import { use, useEffect, useRef, useState } from "react";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoDiscOutline } from "react-icons/io5";
// import { GoPackage } from "react-icons/go";
// import { FaDelicious } from "react-icons/fa6";
// import { CiDeliveryTruck } from "react-icons/ci";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import SidebarReview from "../../components/Sidebar/Sidebar";
// import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
// import { GetAllProducts } from "../../services/Client/Product";
// import { GetProductVariants, getDetailProduct } from "../../services/Client/Detail";
// import { motion, AnimatePresence } from "framer-motion";
// import { AddCart } from "../../redux/features/CartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AddProductCart } from "../../services/Client/Cart";
// import Cookies from "js-cookie";
// import { Toaster, toast } from "sonner";
// import ProductDetailSkeleton from "../../components/Skeleton/DetailSkeleton";
// import ProductSeller from "../../components/ProductSeller";
// import { IoIosHelpCircleOutline } from "react-icons/io";
// import ListQuestions from "../../components/ListQuestions";
// const Detail = () => {
//   const btnRefs = useRef([]);
//   const QueryClient = useQueryClient();
//   const user = localStorage.getItem("User");
//   const { id: idUser } = user ? JSON?.parse(user) : "";
//   const dispatch = useDispatch();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [lineStyle, setLineStyle] = useState({ left: 0, width: 118 });
//   const [activeVariant, setActiveVariant] = useState({
//     Image: "",
//     id_color: "",
//     Size: "",
//     isActiveColor: false,
//     isActiveSize: false,
//   });
//   const { id } = useParams();
//   const [dataProduct, setDataProduct] = useState({
//     Id_ProductVariants: "",
//     quantity: 1,
//     Color: "",
//     Price: 0,
//     Size: "",
//     Image: "",
//   });
//   const handleCallStatus = (item, index) => {
//     setActiveTab(index);
//     if (btnRefs.current[index]) {
//       setLineStyle({ left: btnRefs.current[index].offsetLeft, width: btnRefs.current[index].offsetWidth });
//     }
//   };

//   const [Stock, setStock] = useState(null);
//   // handle call api used useQueries to call many api
//   const result = useQueries({
//     queries: [
//       {
//         queryKey: ["GetAllProducts"],
//         queryFn: GetAllProducts,
//       },
//     ],
//   });
//   const mutationAddCart = useMutation({
//     mutationKey: ["AddCart"],
//     mutationFn: AddProductCart,
//     // onSuccess: (data) => {
//     //   toast.success("Đã thêm vào giỏ hàng!");
//     // },
//     onError: () => {
//       toast.error("Lỗi khi thêm giỏ hàng!");
//     },
//   });
//   // console.log(data);

//   // handle call detail product
//   const mutationDetail = useMutation({
//     mutationFn: getDetailProduct,
//   });
//   const { data, isPending, isLoading } = useQuery({
//     queryKey: ["getDetailProduct", id],
//     queryFn: () => getDetailProduct(id),
//   });
//   // console.log(data);

//   const handleAddToCart = () => {
//     if (!idUser) {
//       toast.warning("Vui lòng đăng nhập!");
//     } else if (Stock <= 0) {
//       toast.warning("Hiện tại đã hết hàng");
//     } else if (activeVariant.id_color === "" || activeVariant.Size === "") {
//       toast.warning("Vui lòng chọn màu và size!");
//     } else {
//       toast.success("Đã thêm vào giỏ hàng!");
//       mutationAddCart.mutate({ idUser: idUser, data: dataProduct });
//     }
//   };
//   // console.log(dataProduct);

//   // handle call detail variants by id product
//   const mutationDetailVariants = useMutation({
//     mutationFn: GetProductVariants,
//   });
//   const handleAddFavorite = () => {};
//   // handle send id to mutationDetail
//   useEffect(() => {
//     mutationDetail.mutate(id);
//     mutationDetailVariants.mutate(id);
//   }, []);
//   // console.log(mutationDetailVariants?.data?.resultVariantByid);

//   // handle change iamge based on color
//   const handleChangeColor = (item) => {
//     setActiveVariant((prev) => ({
//       ...prev,
//       Image: item.Image.path,
//       id_color: item._id,
//       isActiveColor: item._id === activeVariant.id_color ? !activeVariant.isActiveColor : true,
//     }));
//     setDataProduct((prev) => ({ ...prev, Id_ProductVariants: item._id, Color: item.Color, Image: item.Image.path, Price: item.Price }));
//     setStock(item.Stock);
//     // QueryClient.invalidateQueries({ queryKey: ["getDetailProduct", id] });
//   };

//   // handle change size
//   const handleChangeSize = (Size) => {
//     setActiveVariant((prev) => ({ ...prev, Size, isActiveSize: Size === activeVariant.Size ? !activeVariant.Size : true }));
//     setDataProduct((prev) => ({ ...prev, Size }));
//   };

//   useEffect(() => {
//     if (isSidebarOpen) {
//       document.body.classList.add("overflow-hidden");
//       document.body.style.paddingRight = `15px`;
//     } else {
//       document.body.classList.remove("overflow-hidden");
//       document.body.style.paddingRight = "";
//     }
//   }, [isSidebarOpen]);
//   return (
//     <article className={`lg:mt-30 mt-15 relative max-w-7xl mx-auto lg:w-full w-full shadow-md lg:p-5 p-5`}>
//       {isLoading ? (
//         <ProductDetailSkeleton />
//       ) : (
//         <>
//           <div className="max-w-7xl mx-auto mb-6">
//             <Link to={"/"} className="text-gray-400 flex items-center gap-x-2">
//               <span className="text-black">
//                 <FaArrowLeft />
//               </span>
//               Trang chủ
//             </Link>
//           </div>
//           <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:max-w-7xl mx-auto lg:h-full h-full ">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeVariant.id_color}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.4 }}
//                 className="lg:w-full w-full aspect-[10/8] bg-white relative"
//               >
//                 <img
//                   className="w-full h-full object-contain rounded-3xl"
//                   src={activeVariant.Image ? activeVariant.Image : data?.result?.ImageUrl?.path}
//                   alt=""
//                 />
//               </motion.div>
//             </AnimatePresence>
//             <div className="max-w-xl w-full h-full mx-auto space-y-3">
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h1 className="text-2xl font-semibold  lg:mt-0 mt-3">{data?.result?.Name}</h1>
//                   <p className="text-xl font-semibold ">
//                     {dataProduct?.Price > 0 && Stock > 0 ? dataProduct?.Price?.toLocaleString("Vi-VN") + "đ" : ""}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   {Stock > 0 ? (
//                     <>
//                       {" "}
//                       <p className="font-semibold">Tồn kho : </p>
//                       <span>{Stock}</span>
//                     </>
//                   ) : Stock === 0 ? (
//                     <p className="text-red-500 font-semibold">Sản phẩm hiện đã hết hàng</p>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//                 <div className="flex items-center text-sm border border-gray-300 rounded-full px-4 py-2 space-x-2 lg:w-fit w-full ">
//                   <span>⚠️</span>
//                   <span className="select-none line-clamp-1">
//                     Đặt hàng ngay <span class="font-bold text-red-600">hôm ngay</span> để được nhận hàng sớm!!!!
//                   </span>
//                   {/* {listVariants?.map((item) => (
//                 <p>
//                 {activeVariant.id_color === item._id && activeVariant.Size === item.Size && activeVariant.Size && activeVariant.id_color  ? item.Stock  : ""}

//                 </p>
//               ))} */}
//                 </div>
//               </div>
//               <div>
//                 <div className="lg:space-y-5 space-y-3 lg:ml-0 ml-1 items-center ">
//                   {/* <span>Select Size</span> */}
//                   <div>
//                     <h1 className="text-gray-500 pb-2">Kích thước</h1>
//                     <div className="flex space-x-1 items-center">
//                       {["S", "M", "L", "XL", "XXL"]?.map((item) => (
//                         <button
//                           onClick={() => handleChangeSize(item)}
//                           className={`lg:h-10 lg:w-20 w-full h-9 cursor-pointer rounded-md border-1 border-gray-300 ${
//                             activeVariant.Size === item ? "bg-gray-700 text-white" : ""
//                           }  `}
//                         >
//                           {item}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   {/* <span>|</span> */}
//                   <div>
//                     <h1 className="text-gray-500 pb-2">Màu sắc</h1>
//                     <div className="flex space-x-1 items-center">
//                       {mutationDetailVariants?.data?.resultVariantByid?.map((item) => (
//                         <button
//                           onClick={() => handleChangeColor(item)}
//                           className={`lg:h-10 lg:w-20 w-full line-clamp-1 h-9 cursor-pointer rounded-md border-1 border-gray-300 ${
//                             activeVariant?.id_color === item?._id ? "bg-gray-700 text-white" : ""
//                           }`}
//                         >
//                           {item.Color}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="flex space-x-3 mt-2">
//               <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
//               <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
//               <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
//               <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
//               <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
//             </div> */}
//               </div>
//               <div className="flex space-x-4 mt-8">
//                 <div className="flex-1">
//                   <button
//                     disabled={activeVariant.id_color === "" || activeVariant.Size === ""}
//                     onClick={() => handleAddToCart()}
//                     className={`lg:h-12 h-10 w-full hover:bg-gray-700 hover:text-white transform duration-300 ease-in-out rounded-md flex items-center justify-center ${
//                       idUser && activeVariant.id_color && activeVariant.Size
//                         ? "cursor-pointer bg-gray-600 text-white"
//                         : "cursor-not-allowed bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     <span className={``}>Thêm giỏ hàng</span>
//                   </button>
//                 </div>
//                 <div className="flex items-center justify-center border-1 border-gray-200 rounded-full lg:w-12 lg:h-12 h-10 w-10 text-2xl cursor-pointer">
//                   {" "}
//                   <span onClick={() => handleAddFavorite()}>
//                     <IoMdHeartEmpty />
//                   </span>
//                 </div>
//               </div>
//               <div className="relative ">
//                 <div className="flex space-x-5 mt-5 mb-5">
//                   {["Mô tả sản phẩm", "Thông số kỹ thuật", "Hỏi và đáp", "Vận chuyển"]?.map((item, index) => (
//                     <div>
//                       <button
//                         onClick={() => handleCallStatus(item, index)}
//                         ref={(el) => (btnRefs.current[index] = el)}
//                         className={`cursor-pointer font-semibold relative transform hover:text-black duration-200 text-gray-500 ${
//                           index === activeTab ? "text-teal-600" : ""
//                         }`}
//                       >
//                         {item}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className={`bottom-[-10px] h-0.5 bg-black transform duration-300 ease-in-out absolute `}
//                   style={{ left: lineStyle.left, width: lineStyle.width }}
//                 ></div>
//               </div>
//               {activeTab === 0 && (
//                 <div className="w-full rounded-lg border-1 border-gray-200">
//                   <div class="flex justify-between items-center cursor-pointer pt-3 pl-3">
//                     <h3 class="font-semibold">Mô tả</h3>
//                     <span>▾</span>
//                   </div>
//                   <p class="text-md text-gray-600 p-3">{data?.result?.Description}</p>
//                 </div>
//               )}
//               {activeTab === 1 && (
//                 <div>
//                   <h1 className="text-center font-semibold">Hiện chưa có thông số kỹ thuật!</h1>
//                 </div>
//               )}
//               {activeTab === 2 && (
//                 <ListQuestions/>
//               )}
//               {activeTab === 3 && (
//                 <div className="w-full rounded-2xl border-1 border-gray-200 space-y-3 ">
//                   <h1 className="p-3 font-semibold">Vận chuyển</h1>
//                   <div className="grid grid-cols-2 lg:ml-7 ml-1 lg:mr-0 mr-1 gap-y-5 pb-6">
//                     <div className="flex items-center space-x-2">
//                       <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
//                         <span className="lg:text-2xl text-xl">
//                           <IoDiscOutline />
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-sm text-gray-400 ">Giảm giá</span>
//                         <p className="text-md">Giảm giá 20%</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
//                         <span className="lg:text-2xl text-xl">
//                           <GoPackage />
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-sm text-gray-400">Gói</span>
//                         <p className="text-md">Gói thông thường</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
//                         <span className="lg:text-2xl text-xl">
//                           <FaDelicious />
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-sm text-gray-400">Thời gian giao hàng</span>
//                         <p className="text-md">Kể từ lúc nhận hàng</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
//                         <span className="lg:text-2xl text-xl">
//                           <CiDeliveryTruck />
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-sm text-gray-400">Ước tính vận chuyển</span>
//                         <p className="text-md">3 - 4 ngày</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* <div>
//             <h3 className="text-3xl font-semibold ">Có thể bạn cũng thí ch</h3>
//             <ProductSeller/>
//           </div> */}
//           <div className="lg:grid lg:grid-cols-2 mt-10">
//             <div className="lg:flex items-center">
//               <div className="w-full">
//                 <h1 className="font-semibold text-2xl ">Đánh giá & Bình luận</h1>
//                 <div className="flex  items-center w-full">
//                   <h1 className="lg:text-9xl text-2xl font-semibold text-yellow-500">{data?.result.Rating.toFixed(1)}</h1>{" "}
//                   <span className="lg:pt-14 pt-3 text-gray-400 text-lg ">/ 5</span>
//                 </div>
//                 <p className="text-gray-500 mt-2">(50 đánh giá mới)</p>
//               </div>
//               {/* <div className="flex flex-col items-center lg:mt-13 mt-8 lg:ml-5">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-400">★ 5</span>
//                   <div className="relative lg:lg:w-50 w-40  rounded-md lg:h-2 h-1 bg-gray-300">
//                     <span className="absolute bg-black rounded-md w-35 lg:h-2 h-1 z-5"></span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-400">★ 4</span>
//                   <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
//                     <span className="absolute bg-black rounded-md w-30 lg:h-2 h-1 z-5"></span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-400">★ 3</span>
//                   <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
//                     <span className="absolute bg-black rounded-md w-20 lg:h-2 h-1 z-5"></span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-400">★ 2</span>
//                   <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
//                     <span className="absolute bg-black rounded-md w-15 lg:h-2 h-1 z-5"></span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-yellow-400">★ 1</span>
//                   <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
//                     <span className="absolute bg-black rounded-md w-10 lg:h-2 h-1 z-5"></span>
//                   </div>
//                 </div>
//               </div> */}
//             </div>

//             <div className="border-1 max-w-xl mx-auto border-gray-300 rounded-2xl w-full p-3 lg:mt-0 mt-5">
//               <div className="flex justify-between ">
//                 <div className="flex items-center gap-x-2">
//                   <img
//                     className="lg:w-8 lg:h-8 text-sm w-7 h-7 rounded-full object-cover"
//                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
//                     alt=""
//                   />
//                   <h1 className="font-bold">Nguyễn Ngọc Hùng</h1>
//                 </div>
//                 <span className="text-gray-400 text-sm mt-2.5">13 Oct 2025</span>
//               </div>
//               <span className="text-yellow-400 pl-2">★★★★★</span>
//               <div>
//                 <p className="p-2 text-gray-500">
//                   "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette.
//                   Jersey-lined, drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Wide ribbing at cuffs and hem.
//                   Soft, brushed inside."
//                 </p>
//               </div>
//               <div className="relative w-30 rounded-md h-1 bg-gray-300 mx-auto">
//                 <span className="absolute bg-black rounded-md w-15 h-1 z-5"></span>
//               </div>
//             </div>
//             <SidebarReview keyOpen="detail" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="px-4 py-2 w-full bg-teal-500 text-white rounded-xl relative overflow-hidden group cursor-pointer lg:mt-0 mt-5 lg:mb-0 mb-3"
//             >
//               <span className="relative text-white group-hover:text-white z-10">Xem tất cả đánh giá</span>
//               <span className="absolute w-full h-full left-0 bg-gradient-to-r from-teal-400 to-teal-500 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
//             </button>
//           </div>
//         </>
//       )}
//     </article>
//   );
// };

// export default Detail;
