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
  console.log(form);

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

  console.log(result[0]?.data?.getAllProduct);

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
    <div className="w-full">
      <div className="flex ml-6 mt-5 space-x-5">
        <button
          onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddProduct", modal: true }))}
          className="w-30 h-10 rounded-md bg-blue-500 cursor-pointer relative overflow-hidden group z-10"
        >
          <span className="relative z-10 text-white hover:text-white transition duration-300">Add Product</span>
          <span className="absolute left-0 top-0 w-full h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
        <button className="w-30 h-10 rounded-md bg-red-500 cursor-pointer relative overflow-hidden group z-10">
          <span className="relative z-10 text-white hover:text-white transition duration-300">Thùng rác</span>
          <span className="absolute left-0 top-0 w-full h-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
      </div>
      {typeModal.modal && (
        <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
          <form className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-100">
            <h1 className="text-2xl font-bold mb-10 text-center">{typeModal.type === "AddProduct" ? "Add Product" : "Update Product"}</h1>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Name"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.Name}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
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
                value={form.Price}
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
                name="ImageUrl"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                name="Description"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.Description}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
              Select Brand
            </label>
            <select
              onChange={(e) => handleGetvalue(e)}
              name="Brand"
              id="countries"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {data?.data?.map((item, index) => (
                <option tabIndex={"Chọn danh sách"} value={item._id}>
                  {item.Brand}
                </option>
              ))}
            </select>
            {/* <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="DiscountPrice"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Discount Price
              </label>
            </div> */}
            {/* <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="StockQuantity"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock Quantity
              </label>
            </div> */}
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
              Select your Categories
            </label>
            <select
              onChange={(e) => handleGetvalue(e)}
              name="Id_Category"
              id="countries"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      ImageUrl
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Discount Price
                    </th>
                    {/* <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Address
                    </th> */}
                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result[0]?.data?.getAllProduct?.map((item, index) => (
                    <tr
                      key={item._id}
                      class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 ">{index}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Name}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <img className="w-15 h-15 object-cover" src={item.ImageUrl.path} alt="" />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Price}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.DiscountPrice}</td>
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

export default Products;
