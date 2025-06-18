import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/ModalAdmin/Modal";
import { Mutation, QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { GetCategory, CreateCategory, DeleteCategory, UpdateCategory } from "../../services/Admin/Categories.jsx";
const Categories = () => {
  const queryClient = useQueryClient();
  const [idCategory, setIdCategory] = useState(null);
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
  const [getValue, setGetValue] = useState({
    Name: "",
    Description: "",
  });
  // handle get value input
  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setGetValue((prev) => ({ ...prev, [name]: value }));
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Categories"],
    queryFn: GetCategory,
  });

  const mutationUpdate = useMutation({
    mutationFn: UpdateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["Categories"]);
      toast.success("Update Category success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Update Category!");
    },
  });

  // handle craete category
  const mutationCreate = useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["Categories"]);
      toast.success("Add Category success");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: () => {
      toast.error("Error Add Category!");
    },
  });
  const handleSendData = () => {
    if (typeModal.type === "AddCategory" && getValue.Name && getValue.Description) {
      mutationCreate.mutate(getValue);
    } else if (typeModal.type === "UpdateCategory") {
      mutationUpdate.mutate({ id: idCategory, data: getValue });
    }
  };

  // handle Delete
  const mutationDelete = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["Categories"]);
      toast.success("Remove Category successfully!");
    },
    onError: () => {
      toast.error("Error Remove Category!");
    },
  });

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };

  const handleOpenModal = (id) => {
    setTypeModal((pre) => ({ ...pre, type: "UpdateCategory", modal: true }));
    setIdCategory(id);
    const product = data?.getAllCategory.find((item) => item._id === id);
    if (product) {
      setGetValue({
        Name: product.Name,
        Description: product.Description,
      });
    }
  };
  useEffect(() => {
    if (typeModal.type === "AddCategory") {
      setGetValue({ Name: "", Description: "" });
    }
  }, [typeModal.type]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">Categories</h1>
      <div className="flex justify-end mt-5 space-x-5">
        <button
          onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddCategory", modal: true }))}
          className="w-30 h-10 rounded-md bg-blue-500 cursor-pointer relative overflow-hidden group z-10"
        >
          <span className="relative z-10 text-white hover:text-white transition duration-300">Add Category</span>
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
              {typeModal.type === "AddCategory" ? "Add Category" : "Update Category"}
            </h1>
            <div class="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => handleGetvalue(e)}
                type="text"
                name="Name"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={getValue.Name}
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
                name="Description"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={getValue.Description}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>
            <div className="flex justify-end mt-5 ">
              <button onClick={() => handleSendData()} className="w-35 h-10 bg-blue-600 rounded-md text-white cursor-pointer">
                {typeModal.type === "AddCategory" ? "Add Category" : "Update Category"}
              </button>
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
                      Id
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Name
                    </th>

                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Description
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.getAllCategory.map((item, index) => (
                    <tr
                      key={index}
                      class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item._id}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Name}</td>
                      <td class="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Description}</td>
                      <td class="px-6 py-4 whitespace-nowrap w-20 text-end text-sm font-medium space-x-4">
                        <button
                          onClick={() => handleOpenModal(item._id)}
                          type="button"
                          class="inline-flex items-center justify-center text-sm gap-x-2 font-semibold rounded-lg border border-transparent   focus:outline-hidden  w-20 h-8 bg-blue-600 text-white disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          type="button"
                          class="inline-flex items-center justify-center text-sm gap-x-2 font-semibold rounded-lg border border-transparent   focus:outline-hidden  w-20 h-8 bg-blue-600 text-white  disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 cursor-pointer"
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

export default Categories;
