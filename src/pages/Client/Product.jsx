import React, { useEffect, useState, useCallback } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeftRight } from "react-icons/bs";
import { Mutation, QueryClient, useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { GetAllProducts, GetProductFilter } from "../../services/Client/Product";
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
// import "./embla.css";
const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyWord = location.state?.keyWord;

  const [checkVisible, setCheckVisible] = useState({
    Categories: true,
    Brand: true,
    // Color: true,
  });
  const [checkActive, setCheckActive] = useState({
    idCategory: "",
    isActiveCategory: false,
    idBrand: "",
    isActiveBrand: false,
    valuePrice: "",
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
  useEffect(() => {
    if (keyWord) {
      setKeySearch(keyWord);
    }
  }, [keyWord]);
  // console.log(KeySearch);

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

  const handleAddToCart = (product) => {
    dispatch(AddCart(product));
  };

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
    { id: 1, src: "https://images.pexels.com/photos/1082328/pexels-photo-1082328.jpeg", alt: "Tai nghe 1" },
    { id: 2, src: "https://images.pexels.com/photos/16303235/pexels-photo-16303235.jpeg", alt: "Tai nghe 2" },
    { id: 3, src: "https://images.pexels.com/photos/16303235/pexels-photo-16303235.jpeg", alt: "Tai nghe 3" },
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
                checkVisible.Categories ? "visible h-40" : ""
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
                checkVisible.Brand ? "visible h-40" : ""
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
      <section className="grid lg:grid-cols-[1fr_3fr] grid-cols-1 max-w-7xl mx-auto mt-30">
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
                  checkVisible.Categories ? "visible h-40" : ""
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
                  checkVisible.Brand ? "visible h-40" : ""
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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {banners.map((banner) => (
                <div className="min-w-full" key={banner.id}>
                  <img src={banner.src} alt={banner.alt} className="w-full h-[350px] object-cover" />
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
                        className="bg-white rounded-2xl my-4 shadow-md hover:shadow-lg lg:w-[300px] w-[330px] h-full cursor-pointer overflow-hidden hover:translate-y-[-5px]  transfrom transition-all duration-300 ease-in-out"
                      >
                        <Link to={`/Products/Detail/${product._id}`}>
                          <img
                            className="w-full h-[170px] object-contain hover:scale-105 transition-all duration-300 ease-in-out"
                            src={product.ImageUrl.path}
                            alt=""
                          />
                        </Link>
                        <div>
                          <div className="pl-3 flex justify-between items-center">
                            <h1 className="text-xl font-semibold w-2/3 truncate">{product.Name}</h1>
                            <span className="mr-3 font-bold text-red-600 text-sm">SALE</span>
                          </div>
                          <div className="ml-3">
                            {/* <span className="text-yellow-400 text-sm"><ReactStars count /></span>
                             */}
                             <ReactStars count = {5} size={17} value={product.Rating} isHalf={true}  edit={false} />
                          </div>
                          <p className="ml-3 mr-3 text-sm text-gray-400 line-clamp-2">{product.Description}</p>
                          <div className="flex justify-between items-center ml-3 mr-3 mt-5">
                            <div className="space-x-2">
                              <span className="font-semibold text-lg">{product.Price.toLocaleString("vi-VN")}$</span>
                              <del className="text-red-600 text-[13px]">$380</del>
                            </div>
                            <Link
                              to={`/Products/Detail/${product._id}`}
                              className=" relative group flex items-center justify-center overflow-hidden border border-gray-200 shadow-md rounded-lg w-30 h-10 font-medium group cursor-pointer transform transition duration-400 ease-in-out bg-white"
                            >
                              <span className=" z-5 relative text-black group-hover:text-white font-normal transition duration-400">
                                Xem thêm
                              </span>
                              <span className="absolute w-full h-full left-0 top-0 bg-teal-500 to-gray-800 transform -translate-x-full group-hover:translate-x-0 transition duration-400 ease-in-out"></span>
                            </Link>
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
                className="text-sm h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 hover:text-white transform duration-200 ease-in-out"
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
                className={`text-sm h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 hover:text-white transform duration-200 ease-in-out`}
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
