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
    <div className="w-full">
      <div className="flex ml-6 mt-5 space-x-5">
        <button
          onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddProductVariant", modal: true }))}
          className="w-30 h-10 rounded-md bg-blue-500 cursor-pointer relative overflow-hidden group z-10"
        >
          <span className="relative z-10 text-white hover:text-white transition duration-300">Add Variant</span>
          <span className="absolute left-0 top-0 w-full h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
        <button className="w-30 h-10 rounded-md bg-red-500 cursor-pointer relative overflow-hidden group z-10">
          <span className="relative z-10 text-white hover:text-white transition duration-300">Thùng rác</span>
          <span className="absolute left-0 top-0 w-full h-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
      </div>
      {typeModal.modal && (
        <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
          <div className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-100">
            <h1 className="text-2xl font-bold mb-10 text-center">
              {typeModal.type === "AddProductVariant" ? "Add Product Variant" : "Update Product Variant"}
            </h1>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Color"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Color}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Color
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Size"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Size}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Size
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Price"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value?.Price}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="file"
                name="Image"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                multiple
              />
              {typeModal.type === "UpdateProductVariant" && (
                <div>
                  <img className="h-10 w-10 object-cover" src={value.Image.path} alt="" />
                </div>
              )}
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Stock"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={value.Stock}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock
              </label>
            </div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
              Select Product Variants
            </label>
            <select
              onChange={(e) => handleGetValueOption(e)}
              id="countries"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {result[1]?.data?.getAllProduct?.map((product) => (
                <option tabIndex={"Chọn danh sách"} value={product._id}>
                  {product.Name}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-5 ">
              {mutationVariants.isPending || mutationUpdate.isPending ? (
                <Loading />
              ) : (
                <button onClick={(e) => handleSendData(e)} className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer">
                  {typeModal.type === "AddProductVariant" ? "Add Variant" : "Update Variant"}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Index
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Size
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Stock
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result[0]?.data?.getAllProductVariants.map((item, index) => (
                    <tr
                      //   key={item._id}
                      class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 ">{index}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Color}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <img className="w-15 h-15 object-cover" src={item.Image.path} alt="" />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Size}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Stock}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Price}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Id_Products.Name}</td>

                      <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-4">
                        <button
                          onClick={() => handleOpenModal(item._id)}
                          type="button"
                          class="inline-flex items-center justify-center text-md gap-x-2 font-semibold rounded-lg border border-transparent w-20 h-8 bg-blue-600 text-white  focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item._id)}
                          type="button"
                          class="inline-flex items-center justify-center text-md gap-x-2 font-semibold rounded-lg border border-transparent w-20 h-8 bg-red-600 text-white  focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 cursor-pointer"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
