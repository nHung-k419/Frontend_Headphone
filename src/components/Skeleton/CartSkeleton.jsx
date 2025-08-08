import React from "react";

const SkeletonCart = () => {
  const skeletonItems = Array(4).fill(0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 animate-pulse mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-xl p-4 shadow h-fit">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
          <div className="space-y-6">
            {skeletonItems.map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-4"
              >
                {/* Left: Image + Info */}
                <div className="flex gap-4 flex-1">
                  <div className="w-24 h-24 bg-gray-300 rounded" />
                  <div className="space-y-2 flex flex-col justify-center">
                    <div className="w-48 h-4 bg-gray-300 rounded" />
                    <div className="w-32 h-3 bg-gray-300 rounded" />
                    <div className="w-24 h-3 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-start sm:justify-center gap-3">
                  <div className="w-9 h-9 bg-gray-300 rounded-full" />
                  <div className="w-6 h-4 bg-gray-300 rounded" />
                  <div className="w-9 h-9 bg-gray-300 rounded-full" />
                </div>

                {/* Price & Delete */}
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <div className="w-20 h-4 bg-gray-300 rounded" />
                  <div className="w-12 h-3 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl p-4 shadow sticky top-4 space-y-4 h-150">
          <div className="w-32 h-5 bg-gray-300 rounded" />
          <div className="flex justify-between">
            <div className="w-20 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="w-20 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
          <div className="w-full h-10 bg-gray-300 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCart;
