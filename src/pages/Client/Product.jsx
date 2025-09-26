import React, { useEffect, useState, useCallback } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeftRight } from "react-icons/bs";
import { Mutation, QueryClient, useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllProducts, GetProductFilter, FavouriteProduct, getFavouriteByUser } from "../../services/Client/Product";
import { GetAllCategory } from "../../services/Client/Categories";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GetBrand } from "../../services/Client/Brand";
import { motion, AnimatePresence } from "framer-motion";
import { AddCart } from "../../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";
import SkeletonProductCard from "../../components/Skeleton/ProductSkeleton";
import ReactStars from "react-rating-stars-component";
import { IoCartOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { AddProductCart } from "../../services/Client/Cart";
import { Toaster, toast } from "sonner";
// import "./embla.css";
const Product = () => {
  const queryclient = useQueryClient();
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const dispatch = useDispatch();
  const location = useLocation();
  const keyWord = location.state?.keyWord;
const cartItems = useSelector((state) => state.cart.CartItem);
// console.log(cartItems);

  const [checkVisible, setCheckVisible] = useState({
    Categories: true,
    Brand: true,
    // Color: true,
  });
  const [added, setAdded] = useState({
    productId: [],
  });
  const [heart, setHeart] = useState({
    productId: [],
  });
  const [checkActive, setCheckActive] = useState({
    idCategory: "",
    isActiveCategory: false,
    idBrand: "",
    isActiveBrand: false,
    valuePrice: "",
  });
  const [dataProduct, setDataProduct] = useState({
    Id_ProductVariants: "",
    quantity: 1,
    Color: "",
    Price: 0,
    Size: "M",
    Image: "",
  });
  const [dataFilter, setDataFilter] = useState({
    idCategory: "",
    idBrand: "",
    valuePrice: "",
  });
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [KeySearch, setKeySearch] = useState("");
  const [valueSelect, setValueSelect] = useState({
    type: "",
  });
  const mutationAddcart = useMutation({
    mutationKey: ["addCart"],
    mutationFn: AddProductCart,
  });
  const handleAddToCart = (product) => {
    if (!idUser) {
      toast.warning("Vui lòng đăng nhập!");
    } else {
      setTimeout(() => {
        setAdded((prev) => ({ ...prev, productId: [...prev.productId, product._id] }));
        toast.success("Đã thêm vào giỏ hàng!");
        dispatch(AddCart(product));
        const data = {
          Id_ProductVariants: product.maxVariant._id,
          quantity: 1,
          Color: product.maxVariant.Color,
          Price: product.maxVariant.Price,
          Size: "M",
          Image: product.maxVariant.Image.path,
        };
        mutationAddcart.mutate({ idUser: idUser, data: data });
      }, 200);
    }
  };
  useEffect(() => {
    if (added.productId.length === 0) return;
    const firstId = added.productId[0];

    const timer = setTimeout(() => {
      setAdded((prev) => ({
        ...prev,
        productId: prev.productId.filter((item) => item !== firstId),
      }));
    }, 800);

    return () => clearTimeout(timer);
  }, [added.productId]);

  const { data: dataFavourite } = useQuery({
    queryKey: ["getfavourite"],
    queryFn: () => getFavouriteByUser(idUser),
  });
  // console.log(dataFavourite);

  const mutationFavourite = useMutation({
    mutationKey: ["favourite"],
    mutationFn: FavouriteProduct,
    onSuccess: (data) => {
      // console.log(data);

      if (data.message === "Product added to favourite successfully") {
        queryclient.invalidateQueries(["getfavourite"]);
        toast.success("Đã thêm vào danh sách yêu thích!");
      } else if (data.message === "Product deleted from favourite successfully") {
        queryclient.invalidateQueries(["getfavourite"]);
        toast.warning("Đã xóa khỏi danh sách yêu thích!");
      }
    },
  });
  useEffect(() => {
    if (dataFavourite?.result) {
      setHeart((prev) => ({
        ...prev,
        productId: dataFavourite.result.map((item) => item.Id_Product),
      }));
    }
  }, [dataFavourite]);
console.log(heart);

  const handleAddFavourite = (product) => {
    if (!idUser) {
      toast.warning("Vui lòng đăng nhập!");
    } else {
      setHeart((prev) => ({
        ...prev,
        productId: prev.productId.includes(product?._id)
          ? prev.productId.filter((item) => item !== product?._id)
          : [...prev.productId, product?._id],
      }));
      mutationFavourite.mutate({ idUser: idUser, idProduct: product?._id });

      // setTimeout(() => {
      //   if (heart.productId.includes(product?._id)) {
      //     toast.warning("Đã xóa khỏi danh sách yêu thích!");
      //     setHeart((prev) => ({ ...prev, productId: prev.productId.filter((item) => item !== product?._id) }));
      //   } else {
      //     toast.success("Đã thêm vào danh sách yeu thich!");
      //     setHeart((prev) => ({ ...prev, productId: [...prev.productId, product?._id] }));
      //   }
      // }, 200);
    }
  };
  // console.log(heart);

  useEffect(() => {
    if (keyWord) {
      setKeySearch(keyWord);
    }
  }, [keyWord]);

  // Handle call api
  const result = useQueries({
    queries: [
      {
        queryKey: ["categoriesClient"],
        queryFn: GetAllCategory,
      },
      {
        queryKey: ["brand"],
        queryFn: GetBrand,
      },
    ],
  });

  const handleGetSelect = (e) => {
    setValueSelect((prev) => ({ ...prev, type: e.target.value }));
  };
  // handle toggle filter
  const toggleSection = (key) => {
    setCheckVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // handle active category
  const handleActiveCategory = (idCategory) => {
    setCheckActive((prev) => ({
      ...prev,
      idCategory: idCategory === checkActive.idCategory ? "" : idCategory,
      isActiveCategory: idCategory === checkActive.idCategory ? !checkActive.isActiveCategory : true,
    }));
    setIsOpenFilter(false);
  };
  // console.log(checkActive);

  // handle active brand
  const handleActiveBrand = (idBrand) => {
    setCheckActive((prev) => ({
      ...prev,
      idBrand: idBrand === checkActive.idBrand ? "" : idBrand,
      isActiveBrand: idBrand === checkActive.idBrand ? !checkActive.isActiveBrand : true,
    }));
    setIsOpenFilter(false);
  };

  // handle get price
  const handleGetPrice = (e) => {
    setCheckActive((prev) => ({ ...prev, valuePrice: e.target.value }));
    setIsOpenFilter(false);
  };

  // handle call api filter product
  const { data: dataFilterProduct, isLoading } = useQuery({
    queryKey: ["productFilter", checkActive, currentPage, KeySearch, valueSelect.type],
    queryFn: () => GetProductFilter({ data: checkActive, page: currentPage, limit: 6, keyWord: KeySearch, type: valueSelect.type }),
    keepPreviousData: true,
  });
  // console.log(dataFilterProduct);

  const handleNextcurrentPage = () => {
    if (currentPage < dataFilterProduct?.totalPages) {
      setcurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevcurrentPage = () => {
    if (currentPage > 1) {
      setcurrentPage((prev) => prev - 1);
    }
  };
  // console.log(currentPage);

  // end page navigation **//

  const banners = [
    { id: 1, src: "https://i.pinimg.com/1200x/6b/32/98/6b32986399a6255fdc064eb0218d8684.jpg", alt: "Tai nghe 1" },
    { id: 2, src: "https://i.pinimg.com/1200x/dc/f6/23/dcf6239bbf6a973c7b06908f8fe03409.jpg", alt: "Tai nghe 2" },
    { id: 3, src: "https://i.pinimg.com/1200x/c3/ce/95/c3ce95ba550d7fbf458ee642bd4d25ee.jpg", alt: "Tai nghe 3" },
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const autoplayRef = useRef();
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;

    autoplayRef.current = setInterval(() => {
      scrollNext();
    }, 3000); // 3s

    return () => clearInterval(autoplayRef.current); // dọn sạch interval khi unmount
  }, [emblaApi, scrollNext]);
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
            Lọc
            <hr className="border-t-3 mt-1 border-gray-700 w-7" />
          </h1>
          <div>
            <div className="flex items-center justify-between p-4">
              <h1 className="font-bold select-none">Danh mục</h1>
              <span className="cursor-pointer select-none" onClick={() => toggleSection("Categories")}>
                {checkVisible.Categories ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            <div
              className={`flex flex-col ml-6 space-y-2 select-none max-h-fit h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                checkVisible.Categories ? "visible h-80" : ""
              }`}
            >
              {result[0]?.data?.getAllCategory?.map((item, index) => (
                <div>
                  <span
                    onClick={() => handleActiveCategory(item._id)}
                    className={`text-sm cursor-pointer ${
                      checkActive.isActiveCategory && checkActive.idCategory === item._id ? "text-black" : "text-gray-400"
                    } `}
                  >
                    {item.Name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between p-4">
              <h1 className="font-bold select-none">Thương hiệu</h1>
              <span className="cursor-pointer select-none" onClick={() => toggleSection("Brand")}>
                {checkVisible.Brand ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            <div
              className={`flex flex-col ml-6 space-y-2 select-none max-h-fit h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                checkVisible.Brand ? "visible h-80" : ""
              }`}
            >
              {result[1]?.data?.data?.map((item, index) => (
                <div>
                  <span
                    onClick={() => handleActiveBrand(item._id)}
                    className={`text-sm cursor-pointer ${
                      checkActive.isActiveBrand && checkActive.idBrand === item._id ? "text-black" : "text-gray-400"
                    } `}
                  >
                    {item.Brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h1 className="font-bold">Giá</h1>
            <input type="range" onTouchEnd={(e) => handleGetPrice(e)} min={0} max={100000} />
            <p className="font-semibold">
              Range <span className="text-red-500 font-semibold">$30 - $1000.00</span>
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/*end Sidebar */}
      <section className="grid lg:grid-cols-[1fr_3fr] grid-cols-1 max-w-7xl mx-auto mt-25">
        <div className="sticky top-0 w-[300px] h-fit rounded-sm lg:block md:block hidden">
          <div>
            <h1 className="font-bold ml-4">
              Lọc
              <hr className="border-t-3 mt-1 border-gray-700 w-7" />
            </h1>
            <div>
              <div className="flex items-center justify-between p-4">
                <h1 className="font-bold select-none">Danh mục</h1>
                <span className="cursor-pointer select-none" onClick={() => toggleSection("Categories")}>
                  {checkVisible.Categories ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              <div
                className={`flex flex-col ml-6 space-y-2 select-none max-h-fit h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                  checkVisible.Categories ? "visible h-80" : ""
                }`}
              >
                {result[0]?.data?.getAllCategory?.map((item, index) => (
                  <div>
                    <span
                      onClick={() => handleActiveCategory(item._id)}
                      className={`text-sm cursor-pointer ${
                        checkActive.isActiveCategory && checkActive.idCategory === item._id ? "text-black" : "text-gray-400"
                      } `}
                    >
                      {item.Name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between p-4">
                <h1 className="font-bold select-none">Thương hiệu</h1>
                <span className="cursor-pointer select-none" onClick={() => toggleSection("Brand")}>
                  {checkVisible.Brand ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              <div
                className={`flex flex-col ml-6 space-y-2 select-none max-h-fit h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                  checkVisible.Brand ? "visible h-80" : ""
                }`}
              >
                {result[1]?.data?.data?.map((item, index) => (
                  <div>
                    <span
                      onClick={() => handleActiveBrand(item._id)}
                      className={`text-sm cursor-pointer ${
                        checkActive.isActiveBrand && checkActive.idBrand === item._id ? "text-black" : "text-gray-400"
                      } `}
                    >
                      {item.Brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <h1 className="font-bold">Giá</h1>
              <input type="range" onMouseUp={(e) => handleGetPrice(e)} min={0} max={1000000} />
              <p className="font-semibold">
                Range <span className="text-red-500 font-semibold">{checkActive?.valuePrice?.toLocaleString("vi-VN")}đ - 10.000.000đ</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {banners.map((banner) => (
                <div className="min-w-full" key={banner.id}>
                  <img src={banner.src} alt={banner.alt} className="w-full h-[400px] object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <div className="flex items-center ml-7 font-medium text-lg lg:hidden block">
              <span onClick={() => setIsOpenFilter(!isOpenFilter)}>
                <BsArrowLeftRight />
              </span>
            </div>
            {/* <select
              onChange={(e) => handleGetIdSelect(e)}
              className="lg:w-50 md:w-30 w-full h-10 bg-gray-100 focus:outline-none text-center text-gray-700 rounded-sm lg:text-md md:text-md text-sm ld:ml-0 md:ml-0 ml-3 lg:mr-0 mr-7"
            >
              {result[0]?.data?.getAllCategory.map((item) => (
                <option value={item._id}>{item.Name}</option>
              ))}
            </select> */}
            <div className="lg:mr-0 mr-7 flex items-center justify-between w-full">
              <h1 className="text-gray-700 text-sm select-none">
                HIỂN THỊ {dataFilterProduct?.products?.length} TRÊN {dataFilterProduct?.total} SẢN PHẨM
                <hr className="border-t-1 border-gray-500 w-full mt-1 " />
              </h1>
              <div>
                <select
                  onChange={(e) => handleGetSelect(e)}
                  className="w-30 h-10 bg-gray-100 focus:outline-none text-center text-gray-700 rounded-sm cursor-pointer"
                  name=""
                >
                  <option hidden value="">
                    Sắp xếp
                  </option>
                  <option value="Mới nhất">Mới nhất</option>
                  <option value="Phổ biến">Phổ biến</option>
                  <option value="Tất cả">Tất cả</option>
                </select>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${checkActive.idCategory}-${checkActive.idBrand}-${checkActive.valuePrice} -${KeySearch} -${valueSelect.type}`} // this is very important Framer Motion detect "trang đã đổi"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 lg:max-w-7xl lg:mx-auto lg:mt-5 mt-5"
            >
              {isLoading ? (
                <>
                  {Array(6)
                    .fill()
                    .map((_, index) => (
                      <SkeletonProductCard key={index} />
                    ))}
                </>
              ) : (
                <>
                  {dataFilterProduct?.products?.map((product, index) => (
                    <div
                      key={product._id}
                      className="relative bg-white rounded-2xl my-2 shadow-md hover:shadow-lg lg:w-[300px] w-[330px] h-full cursor-pointer overflow-hidden group transfrom transition-all duration-300 ease-in-out"
                    >
                      <Link to={`/Products/Detail/${product._id}`}>
                        <img
                          className="w-full h-[170px] object-contain group-hover:scale-105 transition-all duration-300 ease-in-out"
                          src={product?.maxVariant?.Image?.path}
                          alt=""
                        />
                      </Link>
                      <div className="group-hover:opacity-100 md:group-hover:translate-x-[-5px] md:translate-x-5 translate-x-1 md:opacity-0 sm:opacity-100 transition-all duration-300 ease-in-out absolute top-6 right-5 flex flex-col space-y-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-1 border-teal-600"
                          onClick={() => handleAddFavourite(product)}
                        >
                          <span className={`group-hover:text-teal-600 overflow-hidden `}>
                            {heart?.productId?.some((item) => item === product._id) ? (
                              <FaHeart className={`text-red-600`} size={18} />
                            ) : (
                              <FaRegHeart className={`text-teal-600`} size={18} />
                            )}
                          </span>
                        </motion.div>
                        <Link to={`/Products/Detail/${product._id}`}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ duration: 0.2 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-1 border-teal-600"
                          >
                            <span to={`/Products/Detail/${product._id}`} className="group-hover:text-teal-600">
                              <FaRegEye />
                            </span>
                          </motion.div>
                        </Link>
                      </div>
                      {/* <span><SlHeart className="absolute top-4 right-4 size-5 select-none" /></span> */}
                      <div>
                        <div className="pl-3 flex justify-between items-center">
                          <h1 className="text-xl font-semibold w-5/6 truncate">{product.Name}</h1>
                          {/* <span className="mr-3 font-bold text-red-600 text-sm">SALE</span> */}
                        </div>
                        <div className="ml-3 flex items-center space-x-0.5">
                          {/* <span className="text-yellow-400 text-sm"><ReactStars count /></span>
                           */}
                          <ReactStars count={5} size={14} value={product.Rating} isHalf={true} edit={false} />
                          <span className="text-xs text-gray-400">({Math.ceil(product.Rating)})</span>
                        </div>
                        <p className="ml-3 mr-3 text-sm text-gray-400 line-clamp-2">{product.Description}</p>
                        <div className="flex justify-between items-center ml-3 mr-3 mt-3">
                          <div className="space-x-2">
                            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent truncate">
                              {product?.maxVariant?.Price?.toLocaleString("vi-VN")}đ
                            </span>
                            <del className="text-gray-500 text-sm">{(product?.maxVariant?.Price * 1.1)?.toLocaleString("vi-VN")}đ</del>
                          </div>
                          {/* <Link
                            to={`/Products/Detail/${product._id}`}
                            className=" relative group flex items-center justify-center overflow-hidden border border-gray-200 shadow-md rounded-lg w-30 h-10 font-medium group cursor-pointer transform transition duration-400 ease-in-out bg-white"
                          >
                            <span className=" z-5 relative text-black group-hover:text-white font-normal transition duration-400">
                              Xem thêm
                            </span>
                            <span className="absolute w-full h-full left-0 top-0 bg-teal-500 to-gray-800 transform -translate-x-full group-hover:translate-x-0 transition duration-400 ease-in-out"></span>
                          </Link> */}
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleAddToCart(product)}
                            className={`flex items-center justify-center w-10 h-10 hover:border-teal-600 rounded-full cursor-pointer transition-colors duration-300 border-2 group border-gray-300 active:border-teal-600
        ${added.productId.includes(product._id) ? "bg-green-500 text-white" : "bg-white text-black"}`}
                          >
                            {added.productId.includes(product._id) ? (
                              <IoCheckmarkOutline size={18} />
                            ) : (
                              <IoCartOutline className="group-hover:text-teal-600" size={18} />
                            )}
                          </motion.button>
                        </div>
                        <div className="ml-3 mt-1 flex items-center justify-between">
                          <div className="flex items-center justify-center bg-green-50 w-25 rounded-full">
                            <span
                              className={`h-2 w-2 rounded-full ${product?.StockQuantity <= 0 ? "bg-red-600" : "bg-green-600"} mt-0.5`}
                            ></span>
                            <span className={`text-xs  p-1.5 ${product?.StockQuantity <= 0 ? "text-red-600" : "text-green-600"}`}>
                              {product?.maxVariant?.Stock <= 0 ? "Hết hàng" : "Còn hàng"}
                            </span>
                          </div>
                          <div className="mr-3">
                            <span className="text-xs text-gray-600 font-semibold">{product?.maxVariant?.Stock} trong kho</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="w-full mt-5 mb-5">
            <div className="flex items-center justify-end lg:mr-0 mr-7 space-x-3">
              <button
                onClick={() => handlePrevcurrentPage()}
                className="text-sm active:scale-85 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 hover:text-white transform duration-200 ease-in-out"
              >
                <span>
                  <GrPrevious />
                </span>
              </button>
              <span className="text-sm font-semibold">
                Trang {currentPage} / {dataFilterProduct?.totalPages}
              </span>
              <button
                onClick={() => handleNextcurrentPage()}
                className={`text-sm active:scale-85 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 hover:text-white transform duration-200 ease-in-out`}
              >
                <span>
                  <GrNext />
                </span>
              </button>
            </div>
            {/* <div className="flex items-center justify-end w-full space-x-2">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => setcurrentPage(page)}
                  disabled={page === "..."}
                  className={`px-3 h-8 w-12 cursor-pointer py-1 border rounded-md ${
                    page === currentPage ? "bg-indigo-600 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            </div> */}
          </div>
        </div>
        {isOpenFilter && <div onClick={() => setIsOpenFilter(false)} className="fixed inset-0 bg-black/60 z-10"></div>}
      </section>
    </div>
  );
};

export default Product;
