import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartItemsByUser, handleDLcartItem, handleNext, handlePrevious } from "../../services/Client/Cart";
import Cookies from "js-cookie";
import SkeletonCart from "../../components/Skeleton/CartSkeleton";
import { Link } from "react-router-dom";
import Cart404empty from "../../components/Cart404";
import { IoTrash, IoAdd, IoRemove, IoHeart, IoHeartOutline } from 'react-icons/io5';
import { removeFromCart } from "../../redux/features/CartSlice";
import { useDispatch } from "react-redux";
const Cart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [quantity, setQuantity] = useState([]);
  const [optimisticCart, setOptimisticCart] = useState([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ["CartItemsNew", idUser],
    queryFn: () => GetCartItemsByUser(idUser),
    enabled: !!idUser,
  });
  // useEffect(() => {
  //   if(data?.resultCartItems){
  //     localStorage.setItem("cart", JSON.stringify(data.resultCartItems));
  //   }
  // },[data])
  useEffect(() => {
    if (data?.resultCartItems) {
      setOptimisticCart(data.resultCartItems);
    }
  }, [data]);
  // console.log(data?.resultCartItems);

  const total = optimisticCart?.reduce((sum, item) => {
    const price = item.Id_ProductVariants?.Price || 0;
    return sum + price * item.Quantity;
  }, 0);

  const mutationNext = useMutation({
    mutationFn: handleNext,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CartItemsNew", idUser] });
    },
  });

  const mutationPrevious = useMutation({
    mutationFn: handlePrevious,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CartItemsNew", idUser] });
    },
  });
  const mutationDelete = useMutation({
    mutationFn: handleDLcartItem,
    onSuccess: () => {
      // khi mutation thành công, refetch lagi cart items
      queryClient.invalidateQueries({ queryKey: ["CartItemsNew", idUser] });
    },
  });
  const HandlePreviousQuantity = (Id_Cart, Id_ProductVariants, Color) => {
    setOptimisticCart((prev) =>
      prev.map((item) =>
        item.Id_Cart === Id_Cart && item.Id_ProductVariants._id === Id_ProductVariants && item.Color === Color && item.Quantity > 1
          ? { ...item, Quantity: item.Quantity - 1 }
          : item
      )
    );

    mutationPrevious.mutate(
      { Id_Cart, Id_ProductVariants, Color },
      {
        onError: () => {
          setOptimisticCart((prev) =>
            prev.map((item) =>
              item.Id_Cart === Id_Cart && item.Id_ProductVariants._id === Id_ProductVariants && item.Color === Color
                ? { ...item, Quantity: item.Quantity + 1 }
                : item
            )
          );
        },
      }
    );
  };
  const HandleNextQuantity = (Id_Cart, Id_ProductVariants, Color) => {
    // Optimistic update
    setOptimisticCart((prev) =>
      prev.map((item) =>
        item.Id_Cart === Id_Cart && item.Id_ProductVariants._id === Id_ProductVariants && item.Color === Color
          ? { ...item, Quantity: item.Quantity + 1 }
          : item
      )
    );

    mutationNext.mutate(
      { Id_Cart, Id_ProductVariants, Color },
      {
        onError: () => {
          // Nếu lỗi, rollback lại
          setOptimisticCart((prev) =>
            prev.map((item) =>
              item.Id_Cart === Id_Cart && item.Id_ProductVariants._id === Id_ProductVariants && item.Color === Color
                ? { ...item, Quantity: item.Quantity - 1 }
                : item
            )
          );
        },
      }
    );
  };

  const HandleDelete = (Id_Cart, Id_ProductVariants, Color) => {
    setOptimisticCart((prev) =>
      prev.filter((item) => item.Id_Cart !== Id_Cart || item.Id_ProductVariants._id !== Id_ProductVariants || item.Color !== Color)
    );
    mutationDelete.mutate({ Id_Cart, Id_ProductVariants, Color });
    dispatch(removeFromCart(Id_ProductVariants));
  };

  return (
    <>
      {isLoading && <SkeletonCart />}
      {!isLoading && optimisticCart.length === 0 && <Cart404empty />}
      {!isLoading && optimisticCart.length > 0 && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Giỏ hàng của bạn
                </h2>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {optimisticCart.length} sản phẩm
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {optimisticCart.map((item) => (
                  <div 
                    key={item._id} 
                    className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img 
                          src={item.Image} 
                          alt={item.Id_ProductVariants.Id_Products.Name} 
                          className="w-32 h-32 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300" 
                        />
                        {/* <button
                          onClick={() => toggleFavorite(item._id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-300"
                        >
                          {favorites[item._id] ? (
                            <IoHeart className="w-5 h-5 text-red-500" />
                          ) : (
                            <IoHeartOutline className="w-5 h-5 text-gray-400 hover:text-red-500" />
                          )}
                        </button> */}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Left: Product Details */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              {item.Id_ProductVariants.Id_Products.Name}
                            </h3>
                            <div className="flex flex-wrap gap-3 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Phân loại:</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
                                  <span className="text-sm font-medium text-gray-700">{item.Color}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Size:</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                  M
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Center: Quantity Controls */}
                          <div className="flex items-center gap-4 lg:mx-8">
                            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Số lượng:</span>
                            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full shadow-sm">
                              <button
                                onClick={() => HandlePreviousQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                                className="w-10 h-10 flex items-center justify-center rounded-l-full hover:bg-gray-100 transition-colors duration-200 group"
                                disabled={item.Quantity <= 1}
                              >
                                <IoRemove className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
                              </button>
                              <div className="w-16 h-10 flex items-center justify-center border-x border-gray-200">
                                <span className="text-lg font-bold text-gray-800">{item.Quantity}</span>
                              </div>
                              <button
                                onClick={() => HandleNextQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                                className="w-10 h-10 flex items-center justify-center rounded-r-full hover:bg-gray-100 transition-colors duration-200 group"
                              >
                                <IoAdd className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
                              </button>
                            </div>
                          </div>

                          {/* Right: Price & Actions */}
                          <div className="flex flex-col items-start lg:items-end gap-3">
                            <div className="text-right">
                              <p className="text-sm text-gray-500 line-through mb-1">
                                {(item.Price * 1.2).toLocaleString("vi-VN")}₫
                              </p>
                              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {item.Price.toLocaleString("vi-VN")}₫
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Tổng: {(item.Price * item.Quantity).toLocaleString("vi-VN")}₫
                              </p>
                            </div>
                            <button
                              onClick={() => HandleDelete(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-full transition-all duration-300 hover:shadow-lg group"
                            >
                              <IoTrash className="w-4 h-4" />
                              <span className="text-sm font-medium">Xóa</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar for Stock */}
                    {/* <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Còn lại trong kho</span>
                        <span className="text-sm font-medium text-green-600">Còn 15 sản phẩm</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>

              {/* Cart Summary Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {/* <p>Tiết kiệm được: <span className="text-green-600 font-semibold">180,000₫</span></p> */}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng tạm tính</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {total?.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SUMMARY SIDEBAR */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24 h-fit">
              <div className="flex flex-col">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Tổng kết đơn hàng
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>

                {/* Summary Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {total?.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4 border-2 border-blue-100">
                    <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      {total?.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                {/* <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                      Áp dụng
                    </button>
                  </div>
                </div> */}

                {/* Checkout Button */}
                <Link
                  to={optimisticCart?.length > 0 && "/OrderConfirmation"}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 px-6 rounded-xl transition-all duration-300 cursor-pointer flex justify-center items-center font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 no-underline"
                >
                  <span>Tiến hành thanh toán</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;