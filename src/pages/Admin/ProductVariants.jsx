import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/ModalAdmin/Modal";
import {
  CreateProductVariants,
  GetProductVariants,
  DeleteProductVariants,
  UpdateProductVariant,
} from "../../services/Admin/Product_Variants.jsx";
import { GetProducts } from "../../services/Admin/Product.jsx";
import { Mutation, QueryClient, useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const ProductVariants = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [idProductVariant, setIdProductVariant] = useState("");
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
  const [value, setValue] = useState({
    Color: "",
    Size: "",
    Price: "",
    Image: "",
    Stock: "",
  });

  const mutationVariants = useMutation({
    mutationFn: CreateProductVariants,
    onSuccess: () => {
      queryClient.invalidateQueries(["ProductVariants"]);
      toast.success("Create Product Variants success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Create Product Variants!");
      setTypeModal({ ...typeModal, modal: false });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: UpdateProductVariant,
    onSuccess: () => {
      queryClient.invalidateQueries(["ProductVariants"]);
      toast.success("Update Product Variants success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Update Product Variants!");
      setTypeModal({ ...typeModal, modal: false });
    },
  });
  const mutationDelete = useMutation({
    mutationFn: DeleteProductVariants,
    onSuccess: () => {
      queryClient.invalidateQueries(["ProductVariants"]);
      toast.success("Delete Product Variants success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Delete Product Variants!");
      setTypeModal({ ...typeModal, modal: false });
    },
  });
  // handle create & update data to server
  const handleSendData = () => {
    if (typeModal.type === "AddProductVariant") {
      const formData = new FormData();
      formData.append("Color", value.Color);
      formData.append("Size", value.Size);
      formData.append("Price", value.Price);
      formData.append("Image", value.Image);
      formData.append("Stock", value.Stock);
      formData.append("Id_Products", value.Id_Products);
      mutationVariants.mutate(formData);
    } else if (typeModal.type === "UpdateProductVariant") {
      const formData = new FormData();
      formData.append("Color", value.Color);
      formData.append("Size", value.Size);
      formData.append("Price", value.Price);
      formData.append("Image", value.Image);
      formData.append("Stock", value.Stock);
      formData.append("Id_Products", value.Id_Products);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      mutationUpdate.mutate({ id: idProductVariant, data: formData });
    }
  };

  const result = useQueries({
    queries: [
      {
        queryKey: ["ProductVariants"],
        queryFn: GetProductVariants,
      },
      {
        queryKey: ["products"],
        queryFn: GetProducts,
      },
    ],
  });

  // useEffect(() => {
  //   setValue({
  //     Color: "",
  //     Size: "",
  //     Price: "",
  //     Image: "",
  //     Stock: "",
  //   });
  // }, [typeModal.type === "AddProductVariant"]);

  //   Hnadle get value modal
  const handleGetvalue = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setValue((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle get value option
  const handleGetValueOption = (e) => {
    setValue((prev) => ({ ...prev, Id_Products: e.target.value }));
  };

  // Handle open modal
  const handleOpenModal = (id) => {
    setIdProductVariant(id);
    setTypeModal((pre) => ({ ...pre, type: "UpdateProductVariant", modal: true }));

    const product = result[0]?.data?.getAllProductVariants?.find((item) => item._id === id);
    // console.log(product);

    if (product) {
      setValue({
        Color: product.Color,
        Size: product.Size,
        Price: product.Price,
        Image: product.Image,
        Stock: product.Stock,
        Id_Products: product.Id_Products._id,
      });
    }
  };
  console.log(value);

  const handleDeleteProduct = async (id) => {
    mutationDelete.mutate(id);
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header with modern styling */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Quản lý sản phẩm biến thể
              </h1>
              <p className="text-gray-600 text-lg">Quản lý các biến thể sản phẩm của bạn</p>
            </div>
            
            {/* Action Buttons with modern design */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddProductVariant", modal: true }))}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm
                </span>
              </button>
              
              <button className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Thùng rác
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tổng số biến thể</p>
              <p className="text-3xl font-bold text-gray-900">{result[0]?.data?.getAllProductVariants?.length || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tổng kho</p>
              <p className="text-3xl font-bold text-green-600">
                {result[0]?.data?.getAllProductVariants?.reduce((sum, item) => sum + item.Stock, 0) || 0}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Gần hết hàng</p>
              <p className="text-3xl font-bold text-red-600">
                {result[0]?.data?.getAllProductVariants?.filter(item => item.Stock <= 10).length || 0}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.178 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sản phẩm</p>
              <p className="text-3xl font-bold text-purple-600">{result[1]?.data?.getAllProduct?.length || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Danh sách sản phẩm biến thể</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Màu sắc
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kích cỡ
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result[0]?.data?.getAllProductVariants?.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-200 ring-2 ring-gray-200 group-hover:ring-blue-300"
                          src={item.Image.path}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.Id_Products?.Name}</div>
                        <div className="text-xs text-gray-500">Product Variant</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {item.Color}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {item.Size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      item.Stock <= 5 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : item.Stock <= 15 
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {item.Stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.Price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <button
                      onClick={() => handleOpenModal(item._id)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item._id)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Original Modal Structure - Unchanged */}
      {typeModal.modal && (
        <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
          <div className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-100">
            <h1 className="text-2xl font-bold mb-10 text-center">
              {typeModal.type === "AddProductVariant" ? "Add Product Variant" : "Update Product Variant"}
            </h1>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Color"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Color}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Color
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Size"
                id="floating_size"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Size}
              />
              <label
                htmlFor="floating_size"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Size
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Price"
                id="floating_price"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value?.Price}
              />
              <label
                htmlFor="floating_price"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="file"
                name="Image"
                id="floating_image"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                multiple
              />
              {typeModal.type === "UpdateProductVariant" && (
                <div>
                  <img className="h-10 w-10 object-cover" src={value.Image?.path} alt="" />
                </div>
              )}
              <label
                htmlFor="floating_image"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Stock"
                id="floating_stock"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Stock}
              />
              <label
                htmlFor="floating_stock"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock
              </label>
            </div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
              Select Product Variants
            </label>
            <select
              onChange={(e) => handleGetValueOption(e)}
              id="countries"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {result[1]?.data?.getAllProduct?.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.Name}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-5">
              {mutationVariants.isPending || mutationUpdate.isPending ? (
                <Loading />
              ) : (
                <button 
                  onClick={(e) => handleSendData(e)} 
                  className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                >
                  {typeModal.type === "AddProductVariant" ? "Add Variant" : "Update Variant"}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductVariants;
