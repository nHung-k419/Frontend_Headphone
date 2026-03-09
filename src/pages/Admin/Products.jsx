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
    Specifications: {
      batteryLife: "",
      chargingTime: "",
      fastCharging: false,
      bluetoothVersion: "",
      connectionRange: "",
      chargingPort: "",
      driverSize: "",
      anc: false,
      waterResistance: "",
      microphone: true,
    },
  });

  const { data } = useQuery({
    queryKey: ["brand"],
    queryFn: GetBrand,
  });
  // console.log(form);

  // Get value from input
  const handleGetvalue = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      if (name.startsWith("Specifications.")) {
        const specField = name.split(".")[1];
        setForm((prev) => ({
          ...prev,
          Specifications: { ...prev.Specifications, [specField]: checked },
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      if (name.startsWith("Specifications.")) {
        const specField = name.split(".")[1];
        setForm((prev) => ({
          ...prev,
          Specifications: { ...prev.Specifications, [specField]: value },
        }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
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
      formData.append("Specifications", JSON.stringify(form.Specifications));
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
      formData.append("Specifications", JSON.stringify(form.Specifications));
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
        Specifications: product.Specifications || {
          batteryLife: "",
          chargingTime: "",
          fastCharging: false,
          bluetoothVersion: "",
          connectionRange: "",
          chargingPort: "",
          driverSize: "",
          anc: false,
          waterResistance: "",
          microphone: true,
        },
      });
    }
  };

  useEffect(() => {
    if (typeModal.type === "AddProduct") {
      setForm({
        Name: "",
        Price: "",
        ImageUrl: "",
        Description: "",
        Brand: "",
        Id_Category: "",
        Specifications: {
          batteryLife: "",
          chargingTime: "",
          fastCharging: false,
          bluetoothVersion: "",
          connectionRange: "",
          chargingPort: "",
          driverSize: "",
          anc: false,
          waterResistance: "",
          microphone: true,
        },
      });
    }
  }, [typeModal.type]);
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-['Outfit',_sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <nav className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              <span>Admin</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">Inventory</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Sản phẩm <span className="text-indigo-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-md text-sm">
              Hệ thống quản lý kho vận thông minh với giao diện tối ưu hóa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddProduct", modal: true }))}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl shadow-lg shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-bold text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Thêm mới</span>
            </button>
            <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
          {[
            { label: "Tổng sản phẩm", value: result[0]?.data?.getAllProduct?.length || 0, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "indigo", bg: "bg-indigo-50", text: "text-indigo-600" },
            { label: "Đang kinh doanh", value: result[0]?.data?.getAllProduct?.length || 0, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600" },
            { label: "Nhóm danh mục", value: result[1]?.data?.getAllCategory?.length || 0, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", color: "sky", bg: "bg-sky-50", text: "text-sky-600" },
            { label: "Giá trị kho", value: "24.5M", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", color: "slate", bg: "bg-slate-100", text: "text-slate-700" },
          ].map((stat, i) => (
            <div key={i} className="group relative bg-white border border-slate-100 p-4 rounded-2xl hover:border-indigo-200 transition-all duration-300 overflow-hidden shadow-sm">
              <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-700 opacity-50`}></div>
              <div className="relative flex flex-col gap-3">
                <div className={`w-10 h-10 ${stat.bg} ${stat.text} rounded-xl flex items-center justify-center`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal remains the same */}
        {typeModal.modal && (
          <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
            <form className="max-w-3xl w-full h-[85vh] overflow-y-auto bg-white rounded-[2rem] p-8 shadow-2xl space-y-8 font-['Outfit',_sans-serif]">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {typeModal.type === "AddProduct" ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}
                  <span className="text-indigo-600">.</span>
                </h1>
                <p className="text-slate-400 text-xs font-medium">Vui lòng điền thông tin để cập nhật hệ thống.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: General Info */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Thông tin cơ bản</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <input
                        onChange={(e) => handleGetvalue(e)}
                        type="text"
                        name="Name"
                        className="block w-full py-3 px-0 text-sm font-bold text-slate-900 bg-transparent border-0 border-b-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-all"
                        placeholder="Tên sản phẩm"
                        required
                        value={form.Name}
                      />
                      <label className="absolute text-xs font-bold text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                        Tên sản phẩm
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        onChange={(e) => handleGetvalue(e)}
                        type="number"
                        name="Price"
                        className="block w-full py-3 px-0 text-sm font-bold text-slate-900 bg-transparent border-0 border-b-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-all"
                        placeholder="Giá bán (VND)"
                        required
                        value={form.Price}
                      />
                      <label className="absolute text-xs font-bold text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                        Giá bán (VND)
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thương hiệu</label>
                        <select
                          onChange={(e) => handleGetvalue(e)}
                          name="Brand"
                          className="w-full bg-slate-50 border-none text-slate-900 text-sm font-bold rounded-2xl focus:ring-2 focus:ring-indigo-500/20 p-3 transition-all"
                          value={form.Brand}
                        >
                          <option value="">Chọn Brand</option>
                          {data?.data?.map((item) => (
                            <option key={item._id} value={item._id}>{item.Brand}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh mục</label>
                        <select
                          onChange={(e) => handleGetvalue(e)}
                          name="Id_Category"
                          className="w-full bg-slate-50 border-none text-slate-900 text-sm font-bold rounded-2xl focus:ring-2 focus:ring-indigo-500/20 p-3 transition-all"
                          value={form.Id_Category}
                        >
                          <option value="">Chọn Category</option>
                          {result[1]?.data?.getAllCategory?.map((category) => (
                            <option key={category._id} value={category._id}>{category.Name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hình ảnh đại diện</label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="file"
                            name="ImageUrl"
                            className="block w-full text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                          />
                        </div>
                        {typeModal.type === "UpdateProduct" && form.ImageUrl && (
                          <div className="h-14 w-14 rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm">
                            <img className="h-full w-full object-cover" src={form.ImageUrl.path || URL.createObjectURL(form.ImageUrl)} alt="" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative group">
                      <textarea
                        onChange={(e) => handleGetvalue(e)}
                        name="Description"
                        rows="5"
                        className="block w-full h-32 py-3 px-0 text-sm font-bold text-slate-900 bg-transparent border-0 border-b-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-all resize-none"
                        placeholder=" "
                        required
                        value={form.Description}
                      ></textarea>
                      <label className="absolute text-xs font-bold text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                        Mô tả chi tiết
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column: Specifications */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Thông số kỹ thuật</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Section 1 */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl space-y-4 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">⚡ Năng lượng</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="Specifications.fastCharging"
                            checked={form.Specifications.fastCharging}
                            onChange={(e) => handleGetvalue(e)}
                            className="w-3.5 h-3.5 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500/20"
                          />
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-wider">Sạc nhanh</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Thời lượng pin</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="number"
                            name="Specifications.batteryLife"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            placeholder="Giờ"
                            value={form.Specifications.batteryLife}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Thời gian sạc</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="number"
                            name="Specifications.chargingTime"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            placeholder="Giờ"
                            value={form.Specifications.chargingTime}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl space-y-4 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">🌐 Kết nối</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Bluetooth</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="text"
                            name="Specifications.bluetoothVersion"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="v5.3"
                            value={form.Specifications.bluetoothVersion}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Phạm vi</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="number"
                            name="Specifications.connectionRange"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="Mét"
                            value={form.Specifications.connectionRange}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase">Cổng sạc phổ biến</label>
                        <select
                          name="Specifications.chargingPort"
                          value={form.Specifications.chargingPort}
                          onChange={(e) => handleGetvalue(e)}
                          className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                        >
                          <option value="">Chọn Type</option>
                          <option value="USB-C">USB-C</option>
                          <option value="Lightning">Lightning</option>
                          <option value="Micro-USB">Micro-USB</option>
                        </select>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl space-y-4 border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">🎵 Trải nghiệm</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Driver Size</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="number"
                            name="Specifications.driverSize"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="mm"
                            value={form.Specifications.driverSize}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Chống nước</label>
                          <input
                            onChange={(e) => handleGetvalue(e)}
                            type="text"
                            name="Specifications.waterResistance"
                            className="w-full bg-white border border-slate-200 text-xs font-bold p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="IPX"
                            value={form.Specifications.waterResistance}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        {["anc", "microphone"].map((feat) => (
                          <label key={feat} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name={`Specifications.${feat}`}
                              checked={form.Specifications[feat]}
                              onChange={(e) => handleGetvalue(e)}
                              className="w-3.5 h-3.5 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500/20"
                            />
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-wider">{feat === 'anc' ? 'Chống ồn' : 'Mic'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-8 border-t border-slate-100">
                {mutation.isPending || mutationUpdate.isPending ? (
                  <div className="w-full max-w-sm h-14 bg-slate-900 rounded-3xl flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleSendData(e)}
                    className="w-full max-w-sm h-12 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                  >
                    {typeModal.type === "AddProduct" ? "Xác nhận thêm mới" : "Lưu thay đổi hệ thống"}
                  </button>
                )}
              </div>
            </form>
          </Modal>
        )}

        {/* Modern Products Table */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  Danh sách sản phẩm
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] uppercase font-bold rounded-full">Live</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium">Cập nhật theo thời gian thực từ hệ thống kho.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative group w-full sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={(e) => setValueSearch(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  <button className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid
                  </button>
                  <button className="px-4 py-2 text-slate-400 text-xs font-bold rounded-xl hover:text-slate-600 transition-all">List</button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead>
                <tr className="bg-slate-50/30">
                  {["#", "Sản phẩm", "Loại", "Giá", "Status", "Thao tác"].map((head) => (
                    <th key={head} scope="col" className="px-6 py-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filterProduct?.map((item, index) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-all duration-300 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-500 transition-colors tracking-tight">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <img
                            className="h-full w-full object-cover rounded-xl shadow-sm border border-slate-100 bg-slate-50"
                            src={item.ImageUrl.path}
                            alt={item.Name}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{item.Name}</div>
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">SKU-{item._id?.slice(-5)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-black uppercase rounded-md tracking-wide border border-slate-100">
                        {result[1]?.data?.getAllCategory?.find(c => c._id === item.Id_Category)?.Name || "Hệ thống"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 tracking-tight">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.Price)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Stock</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                        <button
                          onClick={() => handleOpenModal(item._id)}
                          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item._id)}
                          className="p-1.5 bg-white border border-slate-200 text-slate-300 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50/10 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Show <span className="text-slate-900">{filterProduct?.length}</span> items
            </p>
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1.5 border border-slate-200 text-slate-400 rounded-lg hover:bg-white hover:text-slate-900 transition-all font-black text-[10px] uppercase">Prev</button>
              <button className="w-8 h-8 bg-indigo-600 text-white rounded-lg font-black text-[10px] shadow-md shadow-indigo-100">1</button>
              <button className="px-3 py-1.5 border border-slate-200 text-slate-400 rounded-lg hover:bg-white hover:text-slate-900 transition-all font-black text-[10px] uppercase">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
