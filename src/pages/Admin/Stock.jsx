import React, { useState } from "react";
import { updateStockProduct } from "../../services/Admin/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllProductVariants } from "../../services/Admin/Product_Variants";
const sampleProducts = [
  { id: 1, name: "Sony WH-1000XM5", stock: 12, sold: 40 },
  { id: 2, name: "AirPods Pro (Gen 2)", stock: 7, sold: 85 },
  { id: 3, name: "JBL Tune 500BT", stock: 25, sold: 12 },
];

const Stock = () => {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState(sampleProducts);
  const [valueStock, setValueStock] = useState({
    quantity: 0,
  });
  const [valueSearch, setValueSearch] = useState("");
  const [currentItem, setCurrentItem] = useState("Tất cả");

  // console.log(stockProductVariants?.resultStock);

  const { data: productsStock } = useQuery({
    queryKey: ["GetProductVariants"],
    queryFn: GetAllProductVariants,
  });
  // console.log(productVariants?.getAllProductVariants, productsStock?.getAllProduct);
  // console.log(productsStock);
  const filterStock = productsStock?.getAllProductVariants?.filter((item) => {
    const filterSearch = item?.Id_Products?.Name?.toLowerCase().includes(valueSearch.toLowerCase()) || item.Color.toLowerCase().includes(valueSearch.toLowerCase());
    const filterSold =
      currentItem === "Tất cả"
        ? true
        : currentItem === "Chưa bán"
        ? item.Sold === 0
        : currentItem === "Đã bán"
        ? item.Sold > 0
        : item.Stock <= 10;
    return filterSearch & filterSold;
  });
  // console.log(filterStock);

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setValueStock((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const mutationUpdateStockProduct = useMutation({
    mutationFn: updateStockProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleUpdate = (id) => {
    const data = { Stock: valueStock.quantity };
    mutationUpdateStockProduct.mutate({ id, data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                📦 Quản lý kho
              </h1>
              <p className="text-gray-600">Monitor and manage your product inventory in real-time</p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button className="group relative px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-teal-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Analytics</span>
                </div>
              </button>

              <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span>Export</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng số sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800">{productsStock?.getAllProductVariants?.length || 0}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tồn kho</p>
                <p className="text-3xl font-bold text-blue-600">
                  {productsStock?.getAllProductVariants?.reduce((total, item) => total + (item.Stock || 0), 0) || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V10m-9 4h4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Đã bán</p>
                <p className="text-3xl font-bold text-green-600">
                  {productsStock?.getAllProductVariants?.reduce((total, item) => total + (item.Sold || 0), 0) || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Gần hết hàng</p>
                <p className="text-3xl font-bold text-orange-600">
                  {productsStock?.getAllProductVariants?.filter((item) => (item.Stock || 0) < 10)?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Hàng tồn kho</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  onChange={(e) => setValueSearch(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                {["Tất cả", "Chưa bán", "Đã bán", "Gần hết hàng"].map((item, index) => (
                  <button
                    onClick={() => setCurrentItem(item)}
                    className={`px-3 py-1 ${
                      currentItem === item ? "bg-teal-600 text-white" : ""
                    } rounded-md text-sm font-medium text-gray-700 `}
                  >
                    {item}
                  </button>
                  // <button className="px-3 py-1 text-sm font-medium text-gray-500">Low Stock</button>
                  // <button className="px-3 py-1 text-sm font-medium text-gray-500">Out of Stock</button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterStock?.map((item) => (
              <div
                key={item._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">
                      {item?.Id_Products?.Name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full font-medium">ID: {item._id?.slice(-6)}</span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      (item.Stock || 0) === 0 ? "bg-red-500" : (item.Stock || 0) < 10 ? "bg-orange-500" : "bg-green-500"
                    }`}
                  ></div>
                </div>

                {/* Stock Information */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Current Stock</p>
                        <p className="text-2xl font-bold text-blue-600">{item.Stock || 0}</p>
                      </div>
                    </div>
                  </div>

                  {item.Color && (
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Color</p>
                          <p className="text-lg font-semibold text-purple-600">{item.Color}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Units Sold</p>
                        <p className="text-lg font-bold text-green-600">{item.Sold || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Stock Section */}
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Enter new stock quantity"
                      onChange={(e) => handleStockChange(e)}
                      className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center font-medium"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Update Stock</span>
                    </div>
                  </button>
                </div>

                {/* Stock Status Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Stock Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        (item.Stock || 0) === 0
                          ? "bg-red-100 text-red-800"
                          : (item.Stock || 0) < 10
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {(item.Stock || 0) === 0 ? "Out of Stock" : (item.Stock || 0) < 10 ? "Low Stock" : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Inventory Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
              <h4 className="font-semibold text-teal-800 mb-2">Stock Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Healthy Stock</span>
                  <span className="font-medium text-green-600">
                    {productsStock?.getAllProductVariants?.filter((item) => (item.Stock || 0) >= 10)?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low Stock</span>
                  <span className="font-medium text-orange-600">
                    {productsStock?.getAllProductVariants?.filter((item) => (item.Stock || 0) < 10 && (item.Stock || 0) > 0)?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Out of Stock</span>
                  <span className="font-medium text-red-600">
                    {productsStock?.getAllProductVariants?.filter((item) => (item.Stock || 0) === 0)?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">Sales Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Units Sold</span>
                  <span className="font-medium text-green-600">
                    {productsStock?.getAllProductVariants?.reduce((total, item) => total + (item.Sold || 0), 0) || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average per Product</span>
                  <span className="font-medium text-blue-600">
                    {Math.round(
                      (productsStock?.getAllProductVariants?.reduce((total, item) => total + (item.Sold || 0), 0) || 0) /
                        (productsStock?.getAllProductVariants?.length || 1)
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 transition-colors">
                  → Export Inventory Report
                </button>
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 transition-colors">
                  → Bulk Stock Update
                </button>
                <button className="w-full text-left text-sm text-purple-700 hover:text-purple-900 transition-colors">
                  → Set Low Stock Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
