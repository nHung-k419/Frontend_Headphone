import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  getProductOrder,
  createProductOrder,
  PaymentProductOrder,
  getAddressProvices,
  getAddressDistricts,
  getAddressCommune,
  getInfoAddressOrder,
} from "../../services/Client/Order";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import WaveLoader from "../../components/AnimateDotLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAdress from "../../components/ModalOrder.jsx/ModalAdress";
import { GrLocation } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Order_Confirmation = () => {
  const TabRef = useRef([]);
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [valueCode, setValueCode] = useState({ codeDistricts: "", codeCommunate: "" });
  const [valueInputAddress, setValueInputAddress] = useState({
    Provinces: "",
    Districts: "",
    Commune: "",
  });
  const navigate = useNavigate();
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [value, setValue] = useState({
    Fullname: "",
    Phone: "",
    Address: "",
    PaymentMethod: "",
  });
  const [isActive, setIsActive] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 137 });
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleCheckIsActive = (Name) => {
    setIsActive((prev) => ({ ...prev, Name }));
    setValue((prev) => ({ ...prev, PaymentMethod: Name }));
  };

  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setValue((prev) => ({ ...prev, Address: valueInputAddress?.Provinces + valueInputAddress?.Districts + valueInputAddress?.Commune }));
  }, [currentTab, valueInputAddress]);
  const { data, isPending } = useQuery({
    queryKey: ["order", idUser],
    queryFn: () => getProductOrder(idUser),
  });
  // console.log(isPending);

  const { data: dataProvinces } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAddressProvices(),
  });
  const { data: dataDistricts } = useQuery({
    queryKey: ["Districts", valueCode.codeDistricts],
    queryFn: () => getAddressDistricts({ code: valueCode?.codeDistricts }),
  });
  // console.log(dataDistricts?.districts);

  const { data: dataCommune } = useQuery({
    queryKey: ["Communate", valueCode.codeCommunate],
    queryFn: () => getAddressCommune({ code: valueCode?.codeCommunate }),
  });
  // console.log(dataCommune?.wards);

  const handleGetValueAddress = ({ provinces, code, value }) => {
    if (provinces === "Provinces") {
      setValueInputAddress((prev) => ({ ...prev, Provinces: value }));
      setValueCode((prev) => ({ ...prev, codeDistricts: code }));
      setCurrentTab(1);
    } else if (provinces === "Districts") {
      setValueInputAddress((prev) => ({ ...prev, Districts: value }));
      setValueCode((prev) => ({ ...prev, codeCommunate: code }));
      setCurrentTab(2);
    } else {
      setValueInputAddress((prev) => ({ ...prev, Commune: value }));
      setIsFocus(false);
    }
  };

  // get Info Address user
  const { data: AddressInfo } = useQuery({
    queryKey: ["infoAddress", idUser],
    queryFn: () => getInfoAddressOrder(idUser),
  });

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      Fullname: AddressInfo?.findAdressOrder?.Fullname,
      Phone: AddressInfo?.findAdressOrder?.Phone,
      Address: AddressInfo?.findAdressOrder?.Address,
    }));
  }, [idUser, AddressInfo]);
  // console.log(AddressInfo?.findAdressOrder);
  // console.log(value);

  const handleClickTab = (index) => {
    if (currentTab === 2) {
      setCurrentTab(index);
      return;
    }

    if (index === 1 && selectedProvince) {
      setCurrentTab(1);
    } else if (index === 2 && selectedDistrict) {
      setCurrentTab(2);
    } else if (index <= currentTab) {
      setCurrentTab(index);
    }
  };

  useEffect(() => {
    const actives = currentTab !== 0 ? TabRef.current[currentTab] : TabRef.current[0];
    if (actives) {
      setLineStyle({ left: actives.offsetLeft ? actives?.offsetLeft : 0, width: actives.offsetWidth ? actives?.offsetWidth : 137 });
    }
  }, [currentTab, isFocus]);

  const total = data?.resultOrder?.reduce((sum, item) => {
    const price = item.Id_Product?.Price || 0;
    return sum + price * item.Quantity;
  }, 0);

  const mutationOrder = useMutation({
    mutationKey: ["order"],
    mutationFn: createProductOrder,
    onSuccess: (data) => {
      console.log(data?.resultCreate);
      if (data?.resultCreate?.PaymentMethod === "COD") {
        // console.log(data?.resultCreate?.PaymentMethod);

        toast.success("Đặt hàng thành công!!");
        navigate("/OrderItems");
      } else {
        mutationPayment.mutate(data?.resultCreate);
      }
      // window.location.href = data?.Message?.order_url;
    },
  });
  const mutationPayment = useMutation({
    mutationKey: ["payment"],
    mutationFn: PaymentProductOrder,
    onSuccess: (data) => {
      // console.log(data?.Message?.order_url);
      window.location.href = data?.Message?.order_url;
    },
  });

  const handlePostOrder = (e) => {
    // console.log(value);

    if (value.Fullname && value.Phone && value.Address && value.PaymentMethod && !isLoading) {
      setIsLoading(true);
      const dataOrder = { ...value, Id_Cart: data?.resultOrder[0]?.Id_Cart, idUser: idUser };
      setTimeout(() => {
        setIsLoading(false);
        mutationOrder.mutate(dataOrder);
      }, 3000);
    } else {
      toast.warning("Vui lòng nhập đầy đủ thông tin và phương thức thanh toán!");
    }
  };

  const wrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOffModal = () => {
    setValueInputAddress({ Provinces: "", Districts: "", Commune: "" });
    setTypeModal({ type: "", modal: false });
  };
  // console.log(value);

  return (
    <section className="mt-30 max-w-6xl mx-auto ">
      {typeModal.type === "ModalAddress" && typeModal.modal && (
        <ModalAdress typeModal={typeModal} setTypeModal={setTypeModal}>
          <form className="w-[500px] h-fit bg-white rounded-2xl p-6 shadow-lg transform transition-all scale-110 space-y-5">
            <h1>Thông tin nhận hàng</h1>
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
            <div ref={wrapperRef} className="w-full ">
              <label className="text-sm">Phường - Xã - Thành phố</label>
              <input
                type="text"
                name="Address"
                placeholder="Phường - Xã - Thành phố"
                onFocus={() => setIsFocus(true) || setCurrentTab(0)}
                value={
                  valueInputAddress?.Provinces || valueInputAddress?.Districts || (valueInputAddress?.Commune && !isFocus)
                    ? `${valueInputAddress.Provinces} - ${valueInputAddress.Districts} - ${valueInputAddress.Commune}`
                    : ""
                }
                // onChange={(e) => handleGetvalueAddress(e.target.value)}
                className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm mt-1"
              ></input>
              {isFocus && (
                <div className="mt-1 w-full h-50 border-1 border-gray-300 focus:outline-none rounded-sm relative overflow-hidden">
                  <div className="flex space-x-5 justify-around h-10 items-center">
                    {["Tỉnh/Thành phố", "Quận/Huyện", "Phường/Xã"].map((item, index) => (
                      <div
                        onClick={() => handleClickTab(index)}
                        ref={(el) => (TabRef.current[index] = el)}
                        key={index}
                        className={`text-sm w-full cursor-pointer flex justify-center ${currentTab === index ? "text-red-500" : ""} `}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <hr className="w-full h-0.5 text-gray-300 relative" />
                    <span
                      style={{
                        left: `${lineStyle.left}px`,
                        width: `${lineStyle.width}px`,
                      }}
                      className={`absolute top-0  h-0.5 bg-red-500 transform transition-all duration-500 ease-in-out`}
                    ></span>
                  </div>
                  {currentTab === 0 ? (
                    <div className="h-full w-full overflow-y-auto flex flex-col select-none">
                      {dataProvinces?.map((item, index) => (
                        <span
                          key={index}
                          onClick={(e) => handleGetValueAddress({ provinces: "Provinces", code: item.code, value: item.name })}
                          className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : currentTab === 1 ? (
                    <div className="h-full w-full overflow-y-auto flex flex-col select-none">
                      {dataDistricts?.districts?.map((item, index) => (
                        <span
                          key={index}
                          onClick={() => handleGetValueAddress({ provinces: "Districts", code: item.code, value: item.name })}
                          className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    currentTab === 2 && (
                      <div className="h-full w-full overflow-y-auto flex flex-col select-none ">
                        {dataCommune?.wards?.map((item, index) => (
                          <span
                            key={index}
                            onClick={(e) => handleGetValueAddress({ provinces: "Communate", code: item.code, value: item.name })}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end space-x-5">
              <button
                onClick={() => handleOffModal()}
                className="w-30 h-9 rounded-md cursor-pointer hover:bg-gray-200 text-sm text-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={() => setTypeModal({ type: "", modal: false })}
                className="w-30 h-9 rounded-md cursor-pointer bg-gray-800 hover:bg-gray-700 text-sm text-white"
              >
                Hoàn thành
              </button>
            </div>
          </form>
        </ModalAdress>
      )}

      <div className="w-full h-fit bg-gray-50 mb-7 pb-5">
        <div className="flex items-center p-5 text-lg space-x-2">
          <span className="text-red-500">
            <GrLocation />
          </span>
          <p className="font-bold">Địa chỉ nhận hàng</p>
        </div>
        <div className="ml-6 flex items-center space-x-5">
          <h3 className="font-bold">
            {AddressInfo?.findAdressOrder?.Fullname ? AddressInfo?.findAdressOrder?.Fullname : value ? value.Fullname : "Chưa có thông tin"}
            <span>
              (+84) {AddressInfo?.findAdressOrder?.Phone ? AddressInfo?.findAdressOrder?.Phone : value ? value.Phone : "Chưa có thông tin"}
            </span>{" "}
          </h3>
          <p>
            {AddressInfo?.findAdressOrder?.Address
              ? AddressInfo?.findAdressOrder?.Address.replace(/(Thành phố|Tỉnh)/g, " - $1")
                  ?.replace(/(Quận|Huyện)/g, " - $1")
                  ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                  ?.replace(/^ - /, "")
              : value
              ? value.Address?.replace(/(Thành phố|Tỉnh)/g, " - $1")
                  ?.replace(/(Quận|Huyện)/g, " - $1")
                  ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                  ?.replace(/^ - /, "")
              : "Chưa có thông tin"}
          </p>
          <span className="flex items-center justify-center border-1 border-red-500 text-[10px] p-1 text-red-500">Mặc Định</span>
          <button onClick={() => setTypeModal({ type: "ModalAddress", modal: true })} className="cursor-pointer ml-5 text-blue-800">
            Thay đổi
          </button>
        </div>
      </div>
      <div className="w-full h-fit bg-gray-50 p-3 overflow-hidden">
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
          {isPending ? (
            <>
              <Skeleton height={120} />
              <Skeleton height={20} className="mt-2" />
              <Skeleton width={100} height={20} />
            </>
          ) : (
            data?.resultOrder?.map((item) => (
              <div className="flex items-center justify-between mt-10">
                <div className="flex items-center space-x-3">
                  <img className="h-15 w-15 object-contain" src={item?.Image ? item?.Image : item?.Id_Product?.ImageUrl?.path} alt="" />
                  <span className="w-60 truncate">{item?.Id_Product?.Name} </span>
                </div>
                <div className="flex items-center lg:space-x-15 space-x-3">
                  <span className="lg:w-20">{item?.Id_Product?.Price?.toLocaleString("vi-VN")}</span>
                  <span className="lg:w-20">{item?.Quantity}</span>
                  <span className="lg:w-20">{(item?.Id_Product?.Price * item?.Quantity).toLocaleString("vi-VN")}</span>
                </div>
                {/* <span className="lg:w-20">{(item?.Id_Product?.Price * item?.Quantity).toLocaleString("vi-VN")}</span> */}
              </div>
            ))
          )}
          {/* <div className="mt-10 flex items-center justify-between">
            <h1 className="font-bold">Tổng</h1>
            <span className="font-bold">{total?.toLocaleString("vi-VN")}</span>
          </div> */}
        </div>
      </div>
      <div className="w-full h-fit bg-gray-50 mt-7">
        <div className="flex justify-between items-center p-3">
          <h1>Phương thức thanh toán</h1>
          <div className="flex space-x-5 mt-5">
            <button
              onClick={() => handleCheckIsActive("COD")}
              className={`w-1/2 border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm cursor-pointer flex items-center justify-center ${
                isActive.Name === "COD" ? "bg-gray-700 text-white" : ""
              }`}
            >
              <p className="font-medium lg:text-md md:text-md text-sm">Thanh toán khi nhận hàng</p>
            </button>
            <button
              onClick={() => handleCheckIsActive("Zalopay")}
              className={`w-1/2 border-1 border-gray-300 h-10 focus:outline-none p-2 rounded-sm cursor-pointer flex items-center  ${
                isActive.Name === "Zalopay" ? "bg-gray-700 text-white" : ""
              }`}
            >
              {/* <img
                className="w-7 h-7"
                src="https://images.seeklogo.com/logo-png/39/3/zalopay-logo-png_seeklogo-391409.png"
                alt=""
              /> */}
              <span className="font-medium lg:text-md md:text-md text-sm  pl-2">Thanh toán với ZaloPay</span>
            </button>
          </div>
        </div>
        <hr className="mt-5 w-full border-0.5 border-gray-300" />
        <div className="flex justify-end p-3">
          <div className="flex flex-col space-y-5">
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng tiền hàng :</h4>
              <span>{total?.toLocaleString("vi-VN")}</span>
            </div>
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng tiền phí vận chuyển :</h4>
              <span>50.000</span>
            </div>
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng thanh toán :</h4>
              <span className="text-2xl text-red-500">{total?.toLocaleString("vi-VN")}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-3">
          <div
            onClick={(e) => handlePostOrder(e)}
            className="w-60 h-11 flex justify-center border-1 border-gray-300 bg-gray-700 hover:bg-black transform duration-300 ease-in-out text-white cursor-pointer"
          >
            <button disabled={isLoading} className="w-full cursor-pointer ">
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <Loading />
                </div>
              ) : (
                "Xác nhận đặt hàng"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order_Confirmation;

{
  /* <form className="w-full h-155 border-1 border-gray-300 p-3 lg:ml-5">
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
  <div className="w-full">
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
    <li className="mt-4">
      Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để biết
      thêm chi tiết).
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
</form>; */
}
