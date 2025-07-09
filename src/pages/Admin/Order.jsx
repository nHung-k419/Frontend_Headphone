import React from "react";
import { GetAllOrder, UpdateStatusOrder } from "../../services/Admin/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsFillEyeFill } from "react-icons/bs";
const Order = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: GetAllOrder,
  });
  const mutationUpdateOrder = useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: UpdateStatusOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });
  const handleUpdateStatus = (id, e) => {
    const data = { status: e.target.value };
    if (e.target.value === "Xác nhận") mutationUpdateOrder.mutate({ id, data });
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">Order</h1>
      <div className="flex justify-end mt-5 space-x-5">
        <button
          // onClick={() => setTypeModal((pre) => ({ ...pre, type: "AddCategory", modal: true }))}
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
                      Fullname
                    </th>

                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Address
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Total
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.getAllOrder?.map((item, index) => (
                    <tr
                      // key={index}
                      class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index + 1}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Fullname}</td>
                      <td class="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Address}</td>
                      <td class="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.Status}</td>
                      <td class="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {item.TotalAmount?.toLocaleString("vi-VN")}đ
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap w-20 text-end text-sm font-medium space-x-4">
                        <div className="flex items-center space-x-5">
                          <select
                            onChange={(e) => handleUpdateStatus(item._id, e)}
                            type="button"
                            class="w-30 h-10 border-1 border-gray-300 rounded-md cursor-pointer text-black "
                          >
                            {/* <option className='text-center h-10' value="">Lựa chọn</option> */}
                            <option className="text-center h-10" value="">
                              Lựa chọn
                            </option>
                            <option disabled={item.Status === "Xác nhận"} className="text-center h-10" value="Xác nhận">
                              Xác nhận
                            </option>
                          </select>
                          <button
                            // onClick={() => handleDelete(item._id)}
                            type="button"
                            class="text-2xl cursor-pointer text-blue-600"
                          >
                            <BsFillEyeFill />
                          </button>
                        </div>
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

export default Order;
