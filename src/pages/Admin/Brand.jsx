import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/ModalAdmin/Modal";
import { Mutation, QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { CreateBrand, GetBrand, DeleteBrand, UpdateBrand } from "../../services/Admin/Brand";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const Brand = () => {
  const queryClient = useQueryClient();
  const [idBrand, setIdBrand] = useState(null);
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
  const [valueSearch, setValueSearch] = useState("");
  const [getValue, setGetValue] = useState({
    Brand: "",
    Description: "",
  });
  // handle get value input
  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setGetValue((prev) => ({ ...prev, [name]: value }));
  };
  const { data, isloading, isPending } = useQuery({
    queryKey: ["Brand"],
    queryFn: GetBrand,
  });
const filterBrand = data?.data.filter((item) => item.Brand.toLowerCase().includes(valueSearch.toLowerCase()));
  //   console.log(getValue);
  const mutationCreate = useMutation({
    mutationFn: CreateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["Brand"]);
      toast.success("Create Brand success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Create Brand!");
      setTypeModal({ ...typeModal, modal: false });
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: UpdateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["Brand"]);
      toast.success("Update Brand success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Update Brand!");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: DeleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(["Brand"]);
      toast.success("Delete Brand success");
    },
    onError: () => {
      toast.error("Error Delete Brand!");
    },
  });

  const handleSendData = () => {
    if (typeModal.type === "AddBrand" && getValue.Brand && getValue.Description) {
      mutationCreate.mutate(getValue);
    } else if (typeModal.type === "UpdateBrand") {
      mutationUpdate.mutate({ id: idBrand, data: getValue });
    }
  };
  
  const handleOpenModal = (id) => {
    setTypeModal((pre) => ({ ...pre, type: "UpdateBrand", modal: true }));
    setIdBrand(id);
    const product = data?.data?.find((item) => item._id === id);
    if (product) {
      setGetValue({
        Brand: product.Brand,
        Description: product.Description,
      });
    }
  };
  
  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };

  useEffect(() => {
    if (typeModal.type === "AddBrand") {
      setGetValue({ Brand: "", Description: "" });
    }
  }, [typeModal.type]);
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 p-6">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Quản lý thương hiệu
          </h1>
          <p className="text-gray-600 mt-2">Manage your brand portfolio with style and precision</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddBrand", modal: true }))}
            className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-200"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Thùng rác</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Thương hiệu</p>
            <p className="text-3xl font-bold text-gray-800">{data?.data?.length || 0}</p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-full">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Đang hoạt động</p>
            <p className="text-3xl font-bold text-green-600">{data?.data?.length || 0}</p>
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
            <p className="text-gray-500 text-sm font-medium">Phạm vi</p>
            <p className="text-xl font-bold text-blue-600">Quốc tế</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Modal remains the same */}
    {typeModal.modal && (
      <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
        <div className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-100">
          <h1 className="text-2xl font-bold mb-10 text-center">{typeModal.type === "AddBrand" ? "Add Brand" : "Update Brand"}</h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => handleGetvalue(e)}
              type="text"
              name="Brand"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={getValue.Brand}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Brand
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
              value={getValue.Description}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="flex justify-end mt-5 ">
            <button onClick={() => handleSendData()} className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer">
              {typeModal.type === "AddBrand" ? "Add Brand" : "Update Brand"}
            </button>
          </div>
        </div>
      </Modal>
    )}

    {/* Modern Brands Table */}
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Danh sách thương hiệu</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                onChange={(e) => setValueSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button className="px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-700 shadow-sm">All</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500">Active</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-500">Featured</button>
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
                  <span>STT</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Thương hiệu</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mô tả</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filterBrand?.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-emerald-50/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      #{index + 1}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center mr-4 shadow-md">
                      <span className="text-white font-bold text-lg">
                        {item.Brand?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.Brand}</div>
                      <div className="text-xs text-gray-500">Brand ID: {item._id?.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 max-w-xs">
                    <p className="line-clamp-2">{item.Description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleOpenModal(item._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
            <span className="mx-1 font-semibold text-gray-900">{data?.data?.length || 0}</span>
            <span>of</span>
            <span className="mx-1 font-semibold text-gray-900">{data?.data?.length || 0}</span>
            <span>results</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Brand Categories Section */}
    <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Brand Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-emerald-800">Luxury Brands</h4>
              <p className="text-sm text-emerald-600">Premium segment</p>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {Math.floor((data?.data?.length || 0) * 0.3)}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-800">Mid-Range Brands</h4>
              <p className="text-sm text-blue-600">Standard segment</p>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {Math.floor((data?.data?.length || 0) * 0.5)}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-800">Budget Brands</h4>
              <p className="text-sm text-purple-600">Economy segment</p>
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {Math.floor((data?.data?.length || 0) * 0.2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Brand;
