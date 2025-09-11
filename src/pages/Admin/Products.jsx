import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/ModalAdmin/Modal";
import { PostProduct, GetProducts, DeleteProduct, UpdateProduct } from "../../services/Admin/Product.jsx";
import { GetCategory } from "../../services/Admin/Categories.jsx";
import { Mutation, QueryClient, useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { GetBrand } from "../../services/Admin/Brand.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
const Products = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
  const [valueSearch, setValueSearch] = useState("");
  const [form, setForm] = useState({
    Name: "",
    Price: "",
    ImageUrl: "",
    Description: "",
    Brand: "",
    Id_Category: "",
  });

  const { data } = useQuery({
    queryKey: ["brand"],
    queryFn: GetBrand,
  });
  // console.log(form);

  // Get value from input
  const handleGetvalue = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle update product
  const mutationUpdate = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      toast.success("Update product successfully!");
      queryClient.invalidateQueries(["products"]);
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Update product!");
    },
  });
  // Handle Create product
  const mutation = useMutation({
    mutationFn: PostProduct,
    onSuccess: () => {
      toast.success("Add product successfully!");
      queryClient.invalidateQueries(["products"]);
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Add product!");
    },
  });
  const handleSendData = async (e) => {
    // check type modal
    if (typeModal.type === "AddProduct" && form.Name && form.Price && form.ImageUrl && form.Description && form.Brand && form.Id_Category) {
      setLoading(true);
      const formData = new FormData();
      formData.append("Name", form.Name);
      formData.append("Price", form.Price);
      formData.append("ImageUrl", form.ImageUrl);
      formData.append("Description", form.Description);
      formData.append("Brand", form.Brand);
      formData.append("Id_Category", form.Id_Category);
      mutation.mutate(formData);
    } else if (typeModal.type === "UpdateProduct") {
      setLoading(true);
      const formData = new FormData();
      formData.append("Name", form.Name);
      formData.append("Price", form.Price);
      formData.append("ImageUrl", form.ImageUrl);
      formData.append("Description", form.Description);
      formData.append("Brand", form.Brand);
      formData.append("Id_Category", form.Id_Category);
      mutationUpdate.mutate({ id: idProduct, data: formData });
    }
  };

  // const handleGetValueOption = (e) => {
  //   const { name } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: e.target.value }));
  // };
  console.log(form);

  const result = useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: GetProducts,
      },
      {
        queryKey: ["categories"],
        queryFn: GetCategory,
      },
    ],
  });

  // console.log(result[0]?.data?.getAllProduct);
  const filterProduct = result[0]?.data?.getAllProduct.filter((item) => item.Name.toLowerCase().includes(valueSearch.toLowerCase()));
  

  // Handle delete product
  const mutationDelete = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: () => {
      toast.success("Remove product successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Error remove product!");
    },
  });
  const handleDeleteProduct = async (id) => {
    mutationDelete.mutate(id);
  };

  // handle open modal and get id product to update
  const handleOpenModal = async (id) => {
    // handle set type modal to open modal
    setTypeModal((pre) => ({
      ...pre,
      type: "UpdateProduct",
      modal: true,
    }));
    setIdProduct(id);
    // handlle set value to form
    const product = result[0]?.data?.getAllProduct.find((item) => item._id === id);
    if (product) {
      setForm({
        Name: product.Name,
        Price: product.Price,
        ImageUrl: product.ImageUrl,
        Description: product.Description,
        Brand: product.Brand,
        Id_Category: product.Id_Category,
      });
    }
  };

  useEffect(() => {
    if (typeModal.type === "AddProduct") {
      setForm({ Name: "", Price: "", ImageUrl: "", Description: "", Brand: "" });
    }
  }, [typeModal.type]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quản lý sản phẩm
              </h1>
              <p className="text-gray-600 mt-2">Manage your product inventory with ease and style</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddProduct", modal: true }))}
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-200"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Thêm</span>
                </div>
              </button>

              <button className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Thùng rác</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng số sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800">{result[0]?.data?.getAllProduct?.length || 0}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-gray-500 text-sm font-medium">Trong kho</p>
                <p className="text-3xl font-bold text-green-600">{result[0]?.data?.getAllProduct?.length || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Danh mục</p>
                <p className="text-3xl font-bold text-blue-600">{result[1]?.data?.getAllCategory?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng giá sản phẩm</p>
                <p className="text-2xl font-bold text-orange-600">24,567 VND</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Modal remains the same */}
        {typeModal.modal && (
          <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
            <form className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-100">
              <h1 className="text-2xl font-bold mb-10 text-center">{typeModal.type === "AddProduct" ? "Add Product" : "Update Product"}</h1>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => handleGetvalue(e)}
                  type="text"
                  name="Name"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={form.Name}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => handleGetvalue(e)}
                  type="text"
                  name="Price"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={form.Price}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => handleGetvalue(e)}
                  type="file"
                  name="ImageUrl"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  multiple
                />
                {typeModal.type === "Update" && (
                  <div>
                    <img className="h-10 w-10" src={form.ImageUrl.path} alt="" />
                  </div>
                )}
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Image
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e) => handleGetvalue(e)}
                  type="text"
                  name="Description"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={form.Description}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Select Brand
              </label>
              <select
                onChange={(e) => handleGetvalue(e)}
                name="Brand"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {data?.data?.map((item, index) => (
                  <option tabIndex={"Chọn danh sách"} value={item._id}>
                    {item.Brand}
                  </option>
                ))}
              </select>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Select your Categories
              </label>
              <select
                onChange={(e) => handleGetvalue(e)}
                name="Id_Category"
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {result[1]?.data?.getAllCategory?.map((category) => (
                  <option tabIndex={"Chọn danh sách"} value={category._id}>
                    {category.Name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end mt-5 ">
                {mutation.isPending || mutationUpdate.isPending ? (
                  <div className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer">
                    <Loading />
                  </div>
                ) : (
                  <button onClick={(e) => handleSendData(e)} className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer">
                    {typeModal.type === "AddProduct" ? "Add Product" : "Update Product"}
                  </button>
                )}
              </div>
            </form>
          </Modal>
        )}

        {/* Modern Products Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách sản phẩm</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setValueSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button className="px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-700 shadow-sm">Grid</button>
                  <button className="px-3 py-1 text-sm font-medium text-gray-500">List</button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>#</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Giá</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giảm giá
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filterProduct?.map((item, index) => (
                  <tr key={item._id} className="hover:bg-purple-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.Name}</div>
                          <div className="text-xs text-gray-500">Product #{item._id?.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative group">
                        <img
                          className="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-300"
                          src={item.ImageUrl.path}
                          alt={item.Name}
                        />
                        <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600">${item.Price}</span>
                        <div className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {item.DiscountPrice ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-red-600 font-semibold">${item.DiscountPrice}</span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Sale</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No discount</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleOpenModal(item._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200 hover:scale-105"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing</span>
                <span className="mx-1 font-semibold text-gray-900">1</span>
                <span>to</span>
                <span className="mx-1 font-semibold text-gray-900">{result[0]?.data?.getAllProduct?.length || 0}</span>
                <span>of</span>
                <span className="mx-1 font-semibold text-gray-900">{result[0]?.data?.getAllProduct?.length || 0}</span>
                <span>results</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
                <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg">1</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
