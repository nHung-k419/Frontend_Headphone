import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartItemsByUser, handleDLcartItem, handleNext, handlePrevious } from "../../services/Client/Cart";
import Cookies from "js-cookie";
import SkeletonCart from "../../components/Skeleton/CartSkeleton";
import { Link } from "react-router-dom";
import Cart404empty from "../../components/Cart404";
import { IoTrash, IoAdd, IoRemove } from 'react-icons/io5';
import { removeFromCart } from "../../redux/features/CartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [optimisticCart, setOptimisticCart] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["CartItemsNew", idUser],
    queryFn: () => GetCartItemsByUser(idUser),
    enabled: !!idUser,
    staleTime: 1000,
  });

  useEffect(() => {
    if (data?.resultCartItems) {
      setOptimisticCart(data.resultCartItems);
    }
  }, [data]);

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
        <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-16 px-4 lg:px-8 font-sans selection:bg-emerald-100 text-[#2D2D2D]">
          <div className="max-w-6xl mx-auto">
            {/* Elegant Header Section - More Compact */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-4 border-b border-[#E5E2D9] pb-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-light tracking-tight text-[#2D2D2D]">Giỏ hàng</h1>
                <p className="text-[#8C8C8C] text-[10px] tracking-[0.15em] flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-600 rounded-full"></span>
                  BẠN CÓ {optimisticCart.length} SẢN PHẨM
                </p>
              </div>
              <Link
                to="/"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2D2D2D] hover:text-emerald-700 transition-colors duration-500 no-underline underline-offset-4 decoration-1 decoration-[#E5E2D9] hover:decoration-emerald-600 underline"
              >
                Tiếp tục mua hàng
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* CART LIST AREA */}
              <div className="lg:col-span-8">
                <div className="flex flex-col border-t border-[#E5E2D9]">
                  <AnimatePresence mode="popLayout">
                    {optimisticCart.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        key={`${item.Id_Cart}-${item.Id_ProductVariants?._id}-${item.Color}`}
                        className="group py-8 border-b border-[#F0EEE6] hover:bg-[#FAF9F6]/50 transition-colors duration-500"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                          {/* Image Wrapper - Smaller */}
                          <div className="relative w-32 h-32 bg-[#F0EEE6] overflow-hidden flex-shrink-0">
                            <img
                              src={item.Image}
                              alt={item.Id_ProductVariants.Id_Products.Name}
                              className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                          </div>

                          {/* Info Section - Smaller text */}
                          <div className="flex-1 w-full space-y-6 text-center sm:text-left">
                            <div className="space-y-2">
                              <h3 className="text-lg font-light text-[#2D2D2D] leading-snug tracking-tight">
                                {item.Id_ProductVariants.Id_Products.Name}
                              </h3>
                              <div className="flex flex-wrap justify-center sm:justify-start gap-6 items-center">
                                <div className="space-y-0.5">
                                  <span className="block text-[9px] uppercase tracking-[0.15em] text-[#8C8C8C]">Màu sắc</span>
                                  <span className="text-xs font-medium">{item.Color}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="block text-[9px] uppercase tracking-[0.15em] text-[#8C8C8C]">Kích thước</span>
                                  <span className="text-xs font-medium">{item.Size}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                              {/* Quantity Boutique Style - More Compact */}
                              <div className="flex items-center border border-[#E5E2D9] px-1 py-0.5 bg-white">
                                <motion.button
                                  whileTap={{ opacity: 0.5 }}
                                  onClick={() => HandlePreviousQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                                  className="w-8 h-8 flex items-center justify-center text-[#2D2D2D] hover:text-emerald-700 transition-colors disabled:opacity-20"
                                  disabled={item.Quantity <= 1}
                                >
                                  <IoRemove size={14} />
                                </motion.button>
                                <div className="w-8 text-center select-none text-xs font-medium">
                                  {item.Quantity}
                                </div>
                                <motion.button
                                  whileTap={{ opacity: 0.5 }}
                                  onClick={() => HandleNextQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                                  className="w-8 h-8 flex items-center justify-center text-[#2D2D2D] hover:text-emerald-700 transition-colors"
                                >
                                  <IoAdd size={14} />
                                </motion.button>
                              </div>

                              <div className="flex items-center gap-8">
                                <div className="text-right">
                                  <span className="block text-[9px] uppercase tracking-[0.15em] text-[#8C8C8C] mb-0.5">Thành tiền</span>
                                  <p className="text-sm font-light tracking-wider text-[#2D2D2D]">
                                    {(item.Price * item.Quantity).toLocaleString("vi-VN")}₫
                                  </p>
                                </div>
                                <button
                                  onClick={() => HandleDelete(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                                  className="text-[#8C8C8C] hover:text-red-700 transition-colors"
                                  aria-label="Loại bỏ"
                                >
                                  <IoTrash size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* SUMMARY SIDEBAR AREA */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-[#F0EEE6] rounded-sm p-8 space-y-8">
                    <h2 className="text-sm font-light uppercase tracking-[0.2em] text-[#2D2D2D] border-b border-[#E5E2D9] pb-4">
                      TỔNG KẾT
                    </h2>

                    <div className="space-y-4 text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#8C8C8C] uppercase tracking-[0.1em] text-[10px]">Tiền hàng</span>
                        <span className="font-medium tracking-wide">{total?.toLocaleString("vi-VN")}₫</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#8C8C8C] uppercase tracking-[0.1em] text-[10px]">Vận chuyển</span>
                        <span className="text-emerald-700 font-medium tracking-wide italic">Miễn phí</span>
                      </div>

                      <div className="border-t border-[#E5E2D9] pt-6 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Tổng cộng</span>
                          <span className="text-xl font-light tracking-widest text-[#2D2D2D]">
                            {total?.toLocaleString("vi-VN")}₫
                          </span>
                        </div>
                      </div>

                      <div className="pt-6">
                        <Link
                          to={optimisticCart?.length > 0 && "/OrderConfirmation"}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 flex items-center justify-center transition-all duration-500 shadow-sm relative group overflow-hidden no-underline"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] relative z-10 transition-transform duration-400 group-hover:scale-105">
                            Đặt hàng ngay
                          </span>
                          <div className="absolute inset-0 bg-[#000] opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Boutique Message */}
                  <div className="px-4 py-2 border-l-2 border-[#E5E2D9] italic text-[#8C8C8C] text-[11px] leading-relaxed">
                    "Chúng tôi trân trọng từng đơn hàng của bạn. Đóng gói & vận chuyển với sự chăm sóc tận tâm."
                  </div>
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