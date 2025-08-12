import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartItemsByUser, handleDLcartItem, handleNext, handlePrevious } from "../../services/Client/Cart";
import Cookies from "js-cookie";
import SkeletonCart from "../../components/Skeleton/CartSkeleton";
import { Link } from "react-router-dom";
import Cart404empty from "../../components/Cart404";
const Cart = () => {
  const queryClient = useQueryClient();
  // const user = Cookies?.get("User");
  // const { id: idUser } = user ? JSON?.parse(user) : "";
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [quantity, setQuantity] = useState([]);
  const [optimisticCart, setOptimisticCart] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ["CartItemsNew", idUser],
    queryFn: () => GetCartItemsByUser(idUser),
    enabled: !!idUser,
  });
  useEffect(() => {
    if (data?.resultCartItems) {
      setOptimisticCart(data.resultCartItems);
    }
  }, [data]);
  console.log(idUser);

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
  };

  return (
    <>
      {isLoading && <SkeletonCart />}
      {!isLoading && optimisticCart.length === 0 && <Cart404empty />}
      {!isLoading && optimisticCart.length > 0 && (
        <div className="min-h-screen bg-gray-100 p-4 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CART ITEMS */}
            <div className="md:col-span-2 bg-white  p-4 shadow h-fit">
              <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
              <div className="space-y-6">
                {optimisticCart.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row justify-between gap-4 border-b border-gray-300 pb-4">
                    {/* Left: Image + Info */}
                    <div className="flex gap-4 ">
                      <img src={item.Image} alt={item.Id_ProductVariants.Id_Products.Name} className="w-24 h-24 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{item.Id_ProductVariants.Id_Products.Name}</h3>
                        <p className="text-gray-500">Phân loại: {item.Color}</p>
                        <p className="text-gray-500">Size: M</p>
                      </div>
                    </div>

                    {/* Center: Quantity buttons */}
                    <div className="flex items-center justify-start sm:justify-center gap-3">
                      <button
                        onClick={() => HandlePreviousQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                        className="w-9 h-9 cursor-pointer flex items-center justify-center border border-gray-300 rounded-full text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                      >
                        −
                      </button>
                      <span className="text-base font-medium min-w-[32px] text-center">{item.Quantity}</span>
                      <button
                        onClick={() => HandleNextQuantity(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                        className="w-9 h-9 cursor-pointer flex items-center justify-center border border-gray-300 rounded-full text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Right: Price & Delete */}
                    <div className="text-left sm:text-right">
                      <p className="font-bold ">{item.Price.toLocaleString("vi-VN")}₫</p>
                      <button
                        onClick={() => HandleDelete(item.Id_Cart, item?.Id_ProductVariants?._id, item.Color)}
                        className="text-red-500 text-sm hover:underline mt-2"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-4 shadow sticky top-15  flex flex-col justify-between md:h-150 h-fit">
              <div>
                <h2 className="text-xl font-bold mb-4">Tổng kết</h2>
                <div className="flex justify-between text-lg mb-2">
                  <span>Tạm tính</span>
                  <span>{total?.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-green-600">{total?.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
              <Link
                to={optimisticCart?.length > 0 && "/OrderConfirmation"}
                className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-4 rounded-xl transition duration-200 cursor-pointer flex justify-center items-center"
              >
                Tiến hành thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
