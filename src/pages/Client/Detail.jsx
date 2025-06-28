import { use, useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoDiscOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { FaDelicious } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import SidebarReview from "../../components/Sidebar/Sidebar";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { GetAllProducts } from "../../services/Client/Product";
import { GetProductVariants, getDetailProduct } from "../../services/Client/Detail";
import { motion, AnimatePresence } from "framer-motion";
import { AddCart } from "../../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddProductCart } from "../../services/Client/Cart";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const Detail = () => {
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productVariants, setProductVariants] = useState({
    Image: "",
    id_color: "",
    Size: "",
    isActiveColor: false,
    isActiveSize: false,
  });
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState({
    Id_Product: id,
    quantity: 1,
    Color: "",
    Size: "",
    Image: "",
  });
  // handle call api used useQueries to call many api
  const result = useQueries({
    queries: [
      {
        queryKey: ["GetAllProducts"],
        queryFn: GetAllProducts,
      },
    ],
  });
  const mutationAddCart = useMutation({
    mutationKey: ["AddCart"],
    mutationFn: AddProductCart,
    onSuccess: (data) => {
      toast.success("Add product to cart successfully!");
    },
    onError: () => {
      toast.error("Error add product to cart!");
    },
  });

  const handleAddToCart = () => {
    if (!idUser) {
      toast.warning("Please login to add product to cart!");
    } else {
      mutationAddCart.mutate({ idUser: idUser, data: dataProduct });
    }
  };

  // handle call detail product
  const mutationDetail = useMutation({
    mutationFn: getDetailProduct,
  });
  const { data } = useQuery({
    queryKey: ["getDetailProduct", id],
    queryFn: () => getDetailProduct(id),
  });
  // console.log(data);

  // handle call detail variants by id product
  const mutationDetailVariants = useMutation({
    mutationFn: GetProductVariants,
  });

  // handle send id to mutationDetail
  useEffect(() => {
    mutationDetail.mutate(id);
    mutationDetailVariants.mutate(id);
  }, []);
  // console.log(mutationDetailVariants?.data?.resultVariantByid);

  // handle change iamge based on color
  const handleChangeColor = (Image, id_color, NameColor) => {
    setProductVariants((prev) => ({
      ...prev,
      Image,
      id_color,
      isActiveColor: id_color === productVariants.id_color ? !productVariants.isActiveColor : true,
    }));
    setDataProduct((prev) => ({ ...prev, Color: NameColor, Image: Image }));
  };
  // console.log(productVariants);

  // handle change size
  const handleChangeSize = (Size) => {
    setProductVariants((prev) => ({ ...prev, Size, isActiveSize: Size === productVariants.Size ? !productVariants.Size : true }));
    setDataProduct((prev) => ({ ...prev, Size }));
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
  return (
    <article className={`mt-30 relative max-w-7xl mx-auto lg:w-full w-full shadow-md lg:p-5 p-5`}>
      <div className="max-w-7xl mx-auto mb-6">
        <Link to={"/"} className="text-gray-400 flex items-center gap-x-2">
          <span className="text-black">
            <FaArrowLeft />
          </span>
          Home - Product Details
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:max-w-7xl mx-auto lg:h-full h-full ">
        <AnimatePresence mode="wait">
          <motion.div
            key={productVariants.id_color}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="lg:w-full w-full aspect-[10/8] bg-white relative"
          >
            <img
              className="w-full h-full object-contain rounded-3xl"
              src={productVariants.Image && productVariants.isActiveColor ? productVariants.Image : data?.result?.ImageUrl?.path}
              alt=""
            />
          </motion.div>
        </AnimatePresence>
        <div className="max-w-xl h-screen mx-auto space-y-3">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold  lg:mt-0 mt-3">{data?.result?.Name}</h1>
            <p className="text-xl font-semibold ">{data?.result?.Price?.toLocaleString("Vi-VN")}$</p>
            <div className="flex items-center text-sm border border-gray-300 rounded-full px-4 py-2 space-x-2 lg:w-full w-fit ">
              <span>⚠️</span>
              <span className="select-none line-clamp-1">
                Order in <span class="font-bold text-red-600">02:30:25</span> to get next day delivery
              </span>
              {/* {listVariants?.map((item) => (
                <p>
                {productVariants.id_color === item._id && productVariants.Size === item.Size && productVariants.Size && productVariants.id_color  ? item.Stock  : ""}

                </p>
              ))} */}
            </div>
          </div>
          <div>
            <div className="lg:space-y-5 space-y-3 lg:space-x-20 space-x-10 lg:ml-0 ml-1 items-center ">
              {/* <span>Select Size</span> */}
              <div>
                <h1 className="text-gray-500 pb-2">Select Size</h1>
                <div className="flex space-x-3 items-center">
                  {mutationDetailVariants?.data?.resultVariantByid?.map((item) => (
                    <button
                      onClick={() => handleChangeSize(item.Size)}
                      className={`lg:h-8 lg:w-20 w-full h-7 cursor-pointer rounded-md border-1 border-gray-300 ${
                        productVariants.Size === item.Size && productVariants.isActiveSize ? "bg-gray-700 text-white" : ""
                      }  `}
                    >
                      {item.Size}
                    </button>
                  ))}
                </div>
              </div>
              {/* <span>|</span> */}
              <div>
                <h1 className="text-gray-500 pb-2">Choose Color</h1>
                <div className="flex space-x-3 items-center">
                  {mutationDetailVariants?.data?.resultVariantByid?.map((item) => (
                    <button
                      onClick={() => handleChangeColor(item?.Image?.path, item?._id, item?.Color)}
                      className={`lg:h-8 lg:w-20 w-full line-clamp-1 h-7 cursor-pointer rounded-md border-1 border-gray-300 ${
                        productVariants?.id_color === item?._id && productVariants.isActiveColor ? "bg-gray-700 text-white" : ""
                      }`}
                    >
                      {item.Color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-3 mt-2">
              <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
            </div> */}
          </div>
          <div className="flex space-x-4 mt-8">
            <div className="flex-1">
              <button
                // disabled={idUser ? false : true}
                onClick={() => handleAddToCart()}
                className={`lg:h-12 h-10 w-full bg-gray-700 rounded-3xl flex items-center justify-center group overflow-hidden relative ${
                  idUser ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <span className={`relative text-white group-hover:text-white z-5 `}>Add To Cart</span>
                <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
              </button>
            </div>
            <div className="flex items-center justify-center border-1 border-gray-200 rounded-full lg:w-12 lg:h-12 h-10 w-10 text-2xl cursor-pointer">
              {" "}
              <span>
                <IoMdHeartEmpty />
              </span>
            </div>
          </div>
          <div className="w-full rounded-2xl border-1 border-gray-200">
            <div class="flex justify-between items-center cursor-pointer pt-3 pl-3">
              <h3 class="font-semibold">Description & Fit</h3>
              <span>▾</span>
            </div>
            <p class="text-md text-gray-600 p-3">{data?.result?.Description}</p>
          </div>
          <div className="w-full rounded-2xl border-1 border-gray-200 space-y-3 ">
            <h1 className="p-3 font-semibold">Shipping</h1>
            <div className="grid grid-cols-2 lg:ml-7 ml-1 lg:mr-0 mr-1 gap-y-5 pb-6">
              <div className="flex items-center space-x-2">
                <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="lg:text-2xl text-xl">
                    <IoDiscOutline />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400 ">Discount</span>
                  <p className="text-md">Disc 50%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="lg:text-2xl text-xl">
                    <GoPackage />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Package</span>
                  <p className="text-md">Regular Package</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="lg:text-2xl text-xl">
                    <FaDelicious />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Delivery Time</span>
                  <p className="text-md">3 - 4 Working Days</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="lg:h-15 lg:w-15 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="lg:text-2xl text-xl">
                    <CiDeliveryTruck />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Estimation Arrive</span>
                  <p className="text-md">10 - 12 October 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 ">
        <div className="lg:flex items-center">
          <div className="">
            <h1 className="font-semibold text-2xl text-center">Rating & Review</h1>
            <div className="flex justify-center items-center">
              <h1 className="lg:text-9xl text-2xl font-semibold">4,5</h1> <span className="lg:pt-14 pt-3 text-gray-400 text-lg">/ 5</span>
            </div>
            <p className="text-gray-300 mt-2 text-center">(50 New Reviews)</p>
          </div>
          <div className="flex flex-col items-center lg:mt-13 mt-8 lg:ml-5">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 5</span>
              <div className="relative lg:lg:w-50 w-40  rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-35 lg:h-2 h-1 z-5"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 4</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-30 lg:h-2 h-1 z-5"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 3</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-20 lg:h-2 h-1 z-5"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 2</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-15 lg:h-2 h-1 z-5"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 1</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-10 lg:h-2 h-1 z-5"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-1 max-w-xl mx-auto border-gray-300 rounded-2xl w-full p-3 lg:mt-0 mt-5">
          <div className="flex justify-between ">
            <div className="flex items-center gap-x-2">
              <img
                className="lg:w-8 lg:h-8 text-sm w-7 h-7 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                alt=""
              />
              <h1 className="font-bold">Nguyễn Ngọc Hùng</h1>
            </div>
            <span className="text-gray-400 text-sm mt-2.5">13 Oct 2025</span>
          </div>
          <span className="text-yellow-400 pl-2">★★★★★</span>
          <div>
            <p className="p-2 text-gray-500">
              "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined,
              drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Wide ribbing at cuffs and hem. Soft, brushed inside."
            </p>
          </div>
          <div className="relative w-30 rounded-md h-1 bg-gray-300 mx-auto">
            <span className="absolute bg-black rounded-md w-15 h-1 z-10"></span>
          </div>
        </div>
        <SidebarReview keyOpen="detail" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="px-4 py-2 w-full bg-cyan-500 text-white rounded-xl relative overflow-hidden group cursor-pointer lg:mt-0 mt-5 lg:mb-0 mb-3"
        >
          <span className="relative text-white group-hover:text-white z-10">Xem tất cả đánh giá</span>
          <span className="absolute w-full h-full left-0 bg-gradient-to-r from-cyan-400 to-cyan-800 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
        </button>
      </div>
    </article>
  );
};

export default Detail;
