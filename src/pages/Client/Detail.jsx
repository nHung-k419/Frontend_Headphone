import { use, useEffect, useRef, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoDiscOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { FaDelicious } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import SidebarReview from "../../components/Sidebar/Sidebar";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllProducts } from "../../services/Client/Product";
import { GetProductVariants, getDetailProduct } from "../../services/Client/Detail";
import { motion, AnimatePresence } from "framer-motion";
import { AddCart } from "../../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddProductCart } from "../../services/Client/Cart";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";
import ProductDetailSkeleton from "../../components/Skeleton/DetailSkeleton";
import ProductSeller from "../../components/ProductSeller";
import { IoIosHelpCircleOutline } from "react-icons/io";
import ListQuestions from "../../components/ListQuestions";

const Detail = () => {
  const btnRefs = useRef([]);
  const QueryClient = useQueryClient();
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 118 });
  const [activeVariant, setActiveVariant] = useState({
    Image: "",
    id_color: "",
    Size: "",
    isActiveColor: false,
    isActiveSize: false,
  });
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState({
    Id_ProductVariants: "",
    quantity: 1,
    Color: "",
    Price: 0,
    Size: "",
    Image: "",
  });

  const handleCallStatus = (item, index) => {
    setActiveTab(index);
    if (btnRefs.current[index]) {
      setLineStyle({ left: btnRefs.current[index].offsetLeft, width: btnRefs.current[index].offsetWidth });
    }
  };

  const [Stock, setStock] = useState(null);

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
    onError: () => {
      toast.error("Lỗi khi thêm giỏ hàng!");
    },
  });

  // handle call detail product
  const mutationDetail = useMutation({
    mutationFn: getDetailProduct,
  });

  const { data, isPending, isLoading } = useQuery({
    queryKey: ["getDetailProduct", id],
    queryFn: () => getDetailProduct(id),
  });

  const handleAddToCart = () => {
    if (!idUser) {
      toast.warning("Vui lòng đăng nhập!");
    } else if (Stock <= 0) {
      toast.warning("Hiện tại đã hết hàng");
    } else if (activeVariant.id_color === "" || activeVariant.Size === "") {
      toast.warning("Vui lòng chọn màu và size!");
    } else {
      toast.success("Đã thêm vào giỏ hàng!");
      mutationAddCart.mutate({ idUser: idUser, data: dataProduct });
    }
  };

  // handle call detail variants by id product
  const mutationDetailVariants = useMutation({
    mutationFn: GetProductVariants,
  });

  const handleAddFavorite = () => {};

  // handle send id to mutationDetail
  useEffect(() => {
    mutationDetail.mutate(id);
    mutationDetailVariants.mutate(id);
  }, []);

  // handle change image based on color
  const handleChangeColor = (item) => {
    setActiveVariant((prev) => ({
      ...prev,
      Image: item.Image.path,
      id_color: item._id,
      isActiveColor: item._id === activeVariant.id_color ? !activeVariant.isActiveColor : true,
    }));
    setDataProduct((prev) => ({ ...prev, Id_ProductVariants: item._id, Color: item.Color, Image: item.Image.path, Price: item.Price }));
    setStock(item.Stock);
  };

  // handle change size
  const handleChangeSize = (Size) => {
    setActiveVariant((prev) => ({ ...prev, Size, isActiveSize: Size === activeVariant.Size ? !activeVariant.Size : true }));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            {/* Breadcrumb - Compact */}
            <div className="mb-4">
              <Link to={"/"} className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium">
                <FaArrowLeft className="w-3 h-3" />
                Trang chủ
              </Link>
            </div>

            {/* Main Product - Compact Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Product Image - Smaller */}
                <div className="aspect-square  relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVariant.id_color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <img
                        className="w-full h-full object-contain p-8"
                        src={activeVariant.Image ? activeVariant.Image : data?.result?.ImageUrl?.path}
                        alt={data?.result?.Name}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Product Info - Compact */}
                <div className="p-6">
                  {/* Header - Smaller */}
                  <div className="mb-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{data?.result?.Name}</h1>

                    {dataProduct?.Price > 0 && Stock > 0 && (
                      <div className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold">{dataProduct?.Price?.toLocaleString("Vi-VN")}₫</span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status - Compact */}
                  <div className="mb-4">
                    {Stock > 0 ? (
                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Còn {Stock} sản phẩm
                      </div>
                    ) : Stock === 0 ? (
                      <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Hết hàng
                      </div>
                    ) : null}
                  </div>

                  {/* Warning - Smaller */}
                  <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-amber-800">
                      <span>⚡</span>
                      Đặt hàng ngay <span className="font-bold text-red-600">hôm nay</span> để được giao miễn phí!
                    </div>
                  </div>

                  {/* Size Selection - Compact */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Kích thước</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleChangeSize(size)}
                          className={`h-10 rounded-md text-sm font-medium transition-colors ${
                            activeVariant.Size === size ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-teal-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection - Compact */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Màu sắc</h3>
                    <div className="flex flex-wrap gap-2">
                      {mutationDetailVariants?.data?.resultVariantByid?.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => handleChangeColor(item)}
                          className={`w-[calc(50%-0.25rem)] p-3 rounded-md text-sm font-medium text-left transition-colors ${
                            activeVariant?.id_color === item?._id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-teal-50"
                          }`}
                        >
                          {item.Color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons - Compact */}
                  <div className="flex gap-3">
                    <button
                      disabled={activeVariant.id_color === "" || activeVariant.Size === ""}
                      onClick={handleAddToCart}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
                        idUser && activeVariant.id_color && activeVariant.Size
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Thêm giỏ hàng
                    </button>

                    <button
                      onClick={handleAddFavorite}
                      className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-teal-50 text-gray-600 hover:text-teal-600 flex items-center justify-center transition-colors"
                    >
                      <IoMdHeartEmpty className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section - Compact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              {/* Tab Headers - Smaller */}
              <div className="border-b border-gray-100 px-6 py-3">
                <div className="flex gap-1 relative">
                  {["Mô tả", "Thông số", "Hỏi đáp", "Vận chuyển"].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleCallStatus(item, index)}
                      ref={(el) => (btnRefs.current[index] = el)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        index === activeTab ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content - Compact */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 text-sm leading-relaxed">{data?.result?.Description}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">📋</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thông số kỹ thuật</h3>
                        <p className="text-gray-500 text-sm">Hiện chưa có thông số kỹ thuật</p>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỏi và đáp</h3>
                        <ListQuestions />
                      </div>
                    )}

                    {activeTab === 3 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin vận chuyển</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { icon: <IoDiscOutline className="w-5 h-5" />, label: "Giảm giá", value: "Giảm 20%" },
                            { icon: <GoPackage className="w-5 h-5" />, label: "Đóng gói", value: "Thông thường" },
                            { icon: <FaDelicious className="w-5 h-5" />, label: "Xử lý", value: "Từ lúc đặt hàng" },
                            { icon: <CiDeliveryTruck className="w-5 h-5" />, label: "Giao hàng", value: "3-4 ngày" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">{item.label}</p>
                                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Reviews Section - Compact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Rating Overview - Smaller */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá</h2>
                    <div className="bg-teal-600 text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-2">{data?.result.Rating.toFixed(1)}</div>
                      <div className="flex justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < Math.floor(data?.result.Rating) ? "text-yellow-300" : "text-teal-300"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-teal-100 text-xs">50 đánh giá</p>
                    </div>
                  </div>

                  {/* Sample Review - Smaller */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                          alt="User avatar"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Nguyễn Ngọc Hùng</h4>
                            <span className="text-xs text-gray-500">13 Oct 2025</span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized
                            silhouette..."
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="w-full mt-4 py-2 bg-teal-600 text-white font-medium text-sm rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Xem tất cả đánh giá
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <SidebarReview keyOpen="detail" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
