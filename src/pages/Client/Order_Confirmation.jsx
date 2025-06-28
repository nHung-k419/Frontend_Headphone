import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductOrder, createProductOrder, PaymentProductOrder } from "../../services/Client/Order";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import WaveLoader from "../../components/AnimateDotLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Order_Confirmation = () => {
  const navigate = useNavigate();
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [value, setValue] = useState({
    Fullname: "",
    Sex: "",
    Phone: "",
    CCCD: "",
    Address: "",
    PaymentMethod: "",
  });
  const [isActive, setIsActive] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckIsActive = (Name) => {
    setIsActive((prev) => ({ ...prev, Name }));
    setValue((prev) => ({ ...prev, PaymentMethod: Name }));
  };
  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const { data, isPending } = useQuery({
    queryKey: ["order", idUser],
    queryFn: () => getProductOrder(idUser),
  });
  // console.log(data?.resultOrder);

  const total = data?.resultOrder?.reduce((sum, item) => {
    const price = item.Id_Product?.Price || 0;
    return sum + price * item.Quantity;
  }, 0);

  const mutationOrder = useMutation({
    mutationKey: ["order"],
    mutationFn: createProductOrder,
    onSuccess: (data) => {
      console.log(data?.resultCreate);
      if(data?.resultCreate?.PaymentMethod === "COD"){
        console.log(data?.resultCreate?.PaymentMethod);
        
        toast.success("Đặt hàng thành công!!");
        navigate("/OrderItems");
      }else{
        mutationPayment.mutate(data?.resultCreate);
      }
      // window.location.href = data?.Message?.order_url;
    },
  });
  const mutationPayment = useMutation({
    mutationKey: ["payment"],
    mutationFn: PaymentProductOrder,
    onSuccess: (data) => {
      window.location.href = data?.Message?.order_url;
    },
  });

  const handlePostOrder = (e) => {
    e.preventDefault();
    if (value.Fullname && value.Sex && value.Phone && value.CCCD && value.Address && value.PaymentMethod && !isLoading) {
      setIsLoading(true);
      const dataOrder = { ...value, Id_Cart: data?.resultOrder[0]?.Id_Cart, idUser: idUser };
      setTimeout(() => {
        setIsLoading(false);
        mutationOrder.mutate(dataOrder);
      }, 3000);
    }
  };

  // console.log(value);

  return (
    <section className="mt-30 grid lg:grid-cols-[3fr_2fr] md:grid-cols-[3fr_2fr] grid-cols-1 max-w-7xl mx-auto ">
      <div className="w-full h-fit border-1 border-gray-300 rounded-lg p-3 overflow-hidden">
        <div className="flex justify-between">
          <h1 className="font-bold ml-4">Sản phẩm</h1>
          <div className="flex items-center lg:space-x-15 space-x-3">
            <h3 className="text-gray-400 lg:w-20">Đơn giá</h3>
            <h3 className="text-gray-400 lg:w-20">Số lượng</h3>
            <h3 className="text-gray-400 lg:w-20">Thành tiền</h3>
            {/* <h3 className="text-gray-400 lg:w-20">Tổng</h3> */}
          </div>
        </div>
        <div className=" mt-10 h-full ">
          {data?.resultOrder?.map((item) => (
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center space-x-3">
                <img className="h-15 w-15 object-contain" src={item?.Image ? item?.Image : item?.Id_Product?.ImageUrl?.path} alt="" />
                <span className="w-2/3 truncate">{item?.Id_Product?.Name} </span>
              </div>
              <div className="flex items-center lg:space-x-15 space-x-3">
                <span className="lg:w-20">{item?.Id_Product?.Price?.toLocaleString("vi-VN")}</span>
                <span className="lg:w-20">{item?.Quantity}</span>
                <span className="lg:w-20">{(item?.Id_Product?.Price * item?.Quantity).toLocaleString("vi-VN")}</span>
              </div>
              {/* <span className="lg:w-20">{(item?.Id_Product?.Price * item?.Quantity).toLocaleString("vi-VN")}</span> */}
            </div>
          ))}
          <div className="mt-10 flex items-center justify-between">
            <h1 className="font-bold">Tổng</h1>
            <span className="font-bold">{total?.toLocaleString("vi-VN")}</span>
          </div>
        </div>
      </div>
      <form className="w-full h-155 border-1 border-gray-300 rounded-lg p-3 lg:ml-5">
        <h1 className="text-lg font-semibold">Thông tin Nhận hàng</h1>
        <div className="flex space-x-2.5 mt-5">
          <div className="w-1/2">
            <label className="text-sm">Họ và tên</label>
            <div className="mt-1">
              <input
                onChange={(e) => handleGetvalue(e)}
                name="Fullname"
                required
                type="text"
                className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm"
                placeholder="Tên..."
              />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm">Phường - Xã - Thành phố</label>
            <div className="mt-1">
              <input
                required
                onChange={(e) => handleGetvalue(e)}
                name="Address"
                type="text"
                className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm"
                placeholder="Phường - Xã - Thành phố..."
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-2.5 mt-5">
          <div className="w-1/2">
            <label className="text-sm">Giới tính</label>
            <select
              required
              onChange={(e) => handleGetvalue(e)}
              name="Sex"
              id=""
              className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm mt-1"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-sm">Số điện thoại</label>
            <div className="mt-1">
              <input
                required
                onChange={(e) => handleGetvalue(e)}
                name="Phone"
                type="text"
                className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm"
                placeholder="Điện thoại..."
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="" className="text-sm">
            CMND/CCCD
          </label>
          <input
            required
            onChange={(e) => handleGetvalue(e)}
            type="text"
            name="CCCD"
            className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm mt-1"
          />
        </div>
        <div className="mt-5 w-full h-full">
          <h3 className="text-lg font-semibold">Phương thức thanh toán</h3>
          <div className="flex space-x-2.5 mt-5">
            <div
              onClick={() => handleCheckIsActive("COD")}
              className={`w-1/2 border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm cursor-pointer flex items-center justify-center ${
                isActive.Name === "COD" ? "bg-gray-400 text-white" : ""
              }`}
            >
              <p className="font-medium lg:text-md md:text-md text-sm">Thanh toán khi nhận hàng</p>
            </div>
            <div
              onClick={() => handleCheckIsActive("Zalopay")}
              className={`w-1/2 border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm cursor-pointer flex items-center  ${
                isActive.Name === "Zalopay" ? "bg-gray-400 text-white" : ""
              }`}
            >
              <img
                className="w-7 h-7"
                src="https://cdn.prod.website-files.com/5fb85f262823b4390bcfe076/66965d8419182b6ff385a01f_zalopay_logo_preview.webp"
                alt=""
              />
              <span className="font-medium lg:text-md md:text-md text-sm">Thanh toán với ZaloPay</span>{" "}
            </div>
          </div>
          {/* <li className="mt-5 ">Khi bạn thành toán online, bạn xác nhận rằng bạn đã đọc về các ràng buộc thanh toán.</li> */}
          <li className="mt-4">
            Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để
            biết thêm chi tiết).
          </li>
          <div
            onClick={(e) => handlePostOrder(e)}
            className="w-full h-11 flex items-center justify-center rounded-md mt-5 border-1 border-gray-300 bg-gray-700 hover:bg-black transform duration-300 ease-in-out text-white cursor-pointer"
          >
            <button disabled={isLoading} className="w-full cursor-pointer ">
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <span>Vui lòng chờ trong giây lát</span>
                  <WaveLoader />
                </div>
              ) : (
                "Xác nhận đặt hàng"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Order_Confirmation;
