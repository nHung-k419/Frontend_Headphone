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

  // console.log(stockProductVariants?.resultStock);

  const { data: productsStock } = useQuery({
    queryKey: ["GetProductVariants"],
    queryFn: GetAllProductVariants,
  });
  // console.log(productVariants?.getAllProductVariants, productsStock?.getAllProduct);
console.log(productsStock);

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Quản lý kho sản phẩm</h1>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sản phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsStock?.getAllProductVariants.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl shadow-md p-6 bg-white border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item?.Id_Products?.Name}</h2>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Tồn kho hiện tại:</p>
              <p className="font-bold text-xl text-blue-700">{item.Stock}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Màu sắc:</p>
              <p className="font-semibold text-md">{item.Color}</p>
            </div>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Đã bán:</p>
              <p className="font-medium text-green-600">{item?.Sold} sản phẩm</p>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="number"
                name="quantity"
                placeholder="Cập nhật số lượng mới"
                // value={updateStock[product._id] || ""}
                onChange={(e) => handleStockChange(e)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUpdate(item._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition duration-300"
              >
                Cập nhật kho
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-5">Sản phẩm biến thể</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stockProductVariants?.resultStock.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl shadow-md p-6 bg-white border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{product?.Id_Products?.Name}</h2>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Tồn kho hiện tại:</p>
              <p className="font-bold text-xl text-blue-700">{product.Stock}</p>
            </div>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Đã bán:</p>
              <p className="font-medium text-green-600">{product?.sold || 10} sản phẩm</p>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="number"
                placeholder="Cập nhật số lượng mới"
                value={updateStock[product._id] || ""}
                onChange={(e) => handleStockChange(product._id, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition duration-300"
              >
                Cập nhật kho
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Stock;
