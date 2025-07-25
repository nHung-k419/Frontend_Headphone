import React, { useEffect, useRef, useState } from "react";
import { GetAllOrder, UpdateStatusOrder } from "../../services/Admin/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsFillEyeFill } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import Modal from "../../components/ModalAdmin/Modal";

const Order = () => {
  const queryClient = useQueryClient();
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
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
    if (e.target.value === "Xác nhận" || e.target.value === "Đã giao") mutationUpdateOrder.mutate({ id, data });
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // console.log("wrapperRef.current", wrapperRef.current);

        setTypeModal({ type: "", modal: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">Order</h1>
      <div>
        {typeModal.modal && (
          <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
            <div className="max-w-6xl w-180 rounded-xl mx-auto p-10 bg-white">
              <h2 className="text-2xl font-semibold mb-6">Yêu cầu hủy đơn hàng</h2>

              <div className="space-y-4 overflow-y-scroll h-130">
                {/* Mỗi yêu cầu là 1 item */}
                {[1, 2, 3,4,5,6,7].map((item) => (
                  <div
                    key={item}
                    className="bg-white shadow-md rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100"
                  >
                    {/* Thông tin đơn hàng */}
                    <div>
                      <p className="font-medium text-gray-800">
                        Mã đơn: <span className="text-blue-600">#ORD123456</span>
                      </p>
                      <p className="text-gray-500 text-sm">Khách hàng: Nguyễn Văn A</p>
                      <p className="text-gray-500 text-sm">Lý do: Muốn thay đổi sản phẩm</p>
                      <p className="text-gray-400 text-xs">Gửi lúc: 21/07/2025, 14:30</p>
                    </div>
                    {/* Nút xác nhận & từ chối */}
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition text-sm">
                        Xác nhận
                      </button>
                      <button className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm">Từ chối</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="flex justify-end mt-5 mr-5">
        <button
          onClick={() => setTypeModal({ type: "orderCancle", modal: true })}
          className="w-30 h-10 rounded-md bg-yellow-500 cursor-pointer relative overflow-hidden group z-10"
        >
          <span className="relative z-10 text-white hover:text-white transition duration-300 flex items-center justify-center ">
            <span className="mr-1">
              <BsBell />
            </span>
            Thông báo
          </span>
          <span className="absolute left-0 top-0 w-full h-full bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button>
        {/* <button className="w-30 h-10 rounded-md bg-red-500 cursor-pointer relative overflow-hidden group z-10">
          <span className="relative z-10 text-white hover:text-white transition duration-300">Thùng rác</span>
          <span className="absolute left-0 top-0 w-full h-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        </button> */}
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
                            class="w-30 h-10 border-1 border-gray-300 rounded-md cursor-pointer text-black text-center "
                          >
                            {/* <option className='text-center h-10' value="">Lựa chọn</option> */}
                            <option hidden className="text-center h-10" value="">
                              Lựa chọn
                            </option>
                            <option
                              disabled={item.Status === "Chờ giao hàng" || item.Status === "Đã giao"}
                              className="text-center h-10"
                              value="Xác nhận"
                            >
                              Xác nhận
                            </option>
                            <option
                              disabled={item.Status === "Đã giao" || item.Status !== "Chờ giao hàng"}
                              className="text-center h-10"
                              value="Đã giao"
                            >
                              Đã giao
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
