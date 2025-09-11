import React, { useState } from "react";
import {
  BsFillEyeFill,
  BsX,
  BsCalendarCheck,
  BsCreditCard,
  BsGeoAlt,
  BsPhone,
  BsEnvelope,
  BsBoxSeam,
  BsPerson,
  BsReceipt,
  BsTruck,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
const OrderDetailModal = ({ isOpen, onClose, orderData }) => {
  if (!isOpen || !orderData) return null;
  console.log(orderData);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-800 border-green-200";
      case "Chờ giao hàng":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Đã hủy":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Đã giao":
        return <BsBoxSeam className="w-5 h-5" />;
      case "Chờ giao hàng":
        return <BsTruck className="w-5 h-5" />;
      case "Đã hủy":
        return <BsX className="w-5 h-5" />;
      default:
        return <BsCalendarCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 " onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">{orderData?.Fullname?.charAt(0)?.toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Chi tiết đơn hàng</h2>
                  <p className="text-orange-100 text-sm">#{orderData?.items[0]?.Id_Order}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors active:scale-90"
              >
                <BsX className="w-5 h-5 text-black cursor-pointer " />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="p-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Order Status */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(orderData.Status)}`}>
                      {getStatusIcon(orderData.Status)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trạng thái</p>
                      <p className={`font-semibold px-3 py-1 rounded-full text-sm inline-block border ${getStatusColor(orderData.Status)}`}>
                        {orderData.Status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <BsCreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tổng tiền</p>
                      <p className="text-2xl font-bold text-green-600">{orderData.TotalAmount?.toLocaleString("vi-VN")}đ</p>
                    </div>
                  </div>
                </div>

                {/* Order Date */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <BsCalendarCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ngày đặt</p>
                      <p className="font-semibold text-blue-600">
                        {new Date(orderData.createdAt || Date.now()).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 mb-6 border border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <BsPerson className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Thông tin khách hàng</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <BsPerson className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Họ và tên</p>
                        <p className="font-semibold text-gray-800">{orderData.Fullname}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BsPhone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                        <p className="font-semibold text-gray-800">{orderData.Phone || "Chưa cung cấp"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <BsEnvelope className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800">{orderData.Email || "Chưa cung cấp"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BsGeoAlt className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                        <p className="font-semibold text-gray-800">{orderData.Address || "Chưa cung cấp"}</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start space-x-3">
                      <BsGeoAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                        <p className="font-semibold text-gray-800">{orderData.Address}</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <BsBoxSeam className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm</h3>
                </div>

                {orderData.items && orderData.items.length > 0 ? (
                  <div className="space-y-4">
                    {orderData?.items?.map((product, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              {product.Image ? (
                                <img src={product.Image} alt={product.Name} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <BsBoxSeam className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{product.Name || product.ProductName || "Sản phẩm"}</p>
                              <div className="flex space-x-3">
                                <p className="text-sm text-gray-600">
                                  Số lượng: <span className="font-medium">{product.Quantity || product.Quantity || 1}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  Màu sắc: <span className="font-medium">{product.Color || product.Color || "Null"}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  Kích thước: <span className="font-medium">{product.Size || product.Size || "Null"}</span>
                                </p>
                              </div>
                              <p className="text-sm text-gray-600">
                                Đơn giá:{" "}
                                <span className="font-medium text-orange-600">
                                  {(product.Price || product.Price || 0).toLocaleString("vi-VN")}đ
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {((product.Price || product.Price || 0) * (product.Quantity || product.Quantity || 1)).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BsBoxSeam className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Không có thông tin sản phẩm</p>
                  </div>
                )}

                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-green-600">{orderData.TotalAmount?.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {orderData.Note && (
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Ghi chú:</h4>
                  <p className="text-gray-600">{orderData.Note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Đóng
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-lg">
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component để test
// const OrderManagementDemo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Sample order data
//   const sampleOrder = {
//     _id: "676543210abcdef123456789",
//     Fullname: "Nguyễn Văn An",
//     Phone: "0901234567",
//     Email: "nguyenvanan@email.com",
//     Address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
//     Status: "Đã giao",
//     TotalAmount: 1250000,
//     createdAt: "2024-01-15T10:30:00Z",
//     Note: "Giao hàng vào buổi chiều, gọi trước 15 phút",
//     Products: [
//       {
//         name: "iPhone 15 Pro Max",
//         quantity: 1,
//         price: 1000000,
//         image: "https://via.placeholder.com/100"
//       },
//       {
//         name: "Ốp lưng iPhone",
//         quantity: 2,
//         price: 125000,
//         image: "https://via.placeholder.com/100"
//       }
//     ]
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Demo Modal Chi Tiết Đơn Hàng</h1>

//         {/* Sample order card */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="font-semibold">Đơn hàng #{sampleOrder._id.slice(-8)}</h3>
//               <p className="text-gray-600">{sampleOrder.Fullname}</p>
//               <p className="text-green-600 font-medium">{sampleOrder.TotalAmount.toLocaleString('vi-VN')}đ</p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <BsFillEyeFill className="w-4 h-4" />
//               <span>Xem chi tiết</span>
//             </button>
//           </div>
//         </div>

//         {/* Modal */}
//         <OrderDetailModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           orderData={sampleOrder}
//         />
//       </div>
//     </div>
//   );
// };

export default OrderDetailModal;
