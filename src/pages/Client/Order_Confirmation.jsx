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
import { checkVoucher } from "../../services/Client/Voucher";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import WaveLoader from "../../components/AnimateDotLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import { GrLocation } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence } from "framer-motion";
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
  const { id: idUser, Email } = user ? JSON?.parse(user) : "";
  const [value, setValue] = useState({
    Fullname: "",
    Phone: "",
    Address: "",
    PaymentMethod: "",
  });
  // console.log(Email);

  const [isActive, setIsActive] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 137 });
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [codeVoucher, setCodeVoucher] = useState("");
  const [newVoucherTotal, setNewTotalVoucher] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorVoucher, setErrorVoucher] = useState(null);
  const handleCheckIsActive = (Name) => {
    setIsActive((prev) => ({ ...prev, Name }));
    setValue((prev) => ({ ...prev, PaymentMethod: Name }));
    setOpen(false);
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
  // console.log(data);

  const { data: dataProvinces } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAddressProvices(),
  });
  // console.log(dataProvinces);

  const { data: dataDistricts } = useQuery({
    queryKey: ["Districts", valueCode.codeDistricts],
    queryFn: () => getAddressDistricts({ code: valueCode?.codeDistricts }),
  });
  // console.log(dataDistricts);

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
console.log(AddressInfo);

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
    const price = item?.Price || 0;
    return sum + price * item.Quantity;
  }, 0);

  const mutationCheckVoucher = useMutation({
    mutationKey: ["checkVoucher"],
    mutationFn: (data) => checkVoucher(data),
    onSuccess: (data) => {
      setNewTotalVoucher(data);
      toast.success("Áp dụng voucher thành công!");
      setTypeModal({ ...typeModal, modal: false });
    },
    onError: (error) => {
      setErrorVoucher(error?.response?.data?.message);
    },
  });
  const handleApplyVoucher = () => {
    mutationCheckVoucher.mutate({ code: codeVoucher, orderTotal: total, idUser: idUser });
  };

  const mutationOrder = useMutation({
    mutationKey: ["order"],
    mutationFn: createProductOrder,
    onSuccess: (data) => {
      // console.log(data?.resultCreate);
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
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = data?.Message?.order_url;
        console.log(data?.Message?.order_url);
      }, 3000);
      // setIsLoading(false);
    },
  });

  const handlePostOrder = (e) => {
    console.log(newVoucherTotal);
        
    if (value.Fullname && value.Phone && value.Address && value.PaymentMethod && !isLoading) {
      setIsLoading(true);
      const dataOrder = {
        ...value,
        Id_Cart: data?.resultOrder[0]?.Id_Cart,
        voucherCode: newVoucherTotal?.code,
        TotalAmount: newVoucherTotal ? newVoucherTotal?.discountedTotal : total,
        idUser: idUser,
        Email,
      };
      mutationOrder.mutate(dataOrder);
      // setTimeout(() => {
      //   setIsLoading(false);
      //   mutationOrder.mutate(dataOrder);
      // }, 3000);
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
  useEffect(() => {
    setErrorVoucher("");
    if (typeModal.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // reset khi unmount
    };
  }, [typeModal.modal]);
  return (
    <section className="mt-30 max-w-6xl mx-auto ">
      {/* modal adddress  */}
      <AnimatePresence>
        {typeModal.type === "ModalAddress" && typeModal.modal && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal}>
            <div
              ref={wrapperRef}
              className="lg:w-[500px] w-full grid place-items-center h-fit bg-white rounded-2xl p-6 shadow-lg lg:space-y-5 md:space-y-5 space-y-3"
            >
              <h1>Thông tin nhận hàng</h1>
              <div className="flex space-x-2.5 mt-5 w-full">
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
              <div className="w-full ">
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
                            onClick={(e) => handleGetValueAddress({ provinces: "Provinces", code: item.code, value: item.name_with_type })}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    ) : currentTab === 1 ? (
                      <div className="h-full w-full overflow-y-auto flex flex-col select-none">
                        {dataDistricts?.map((item, index) => (
                          <span
                            key={index}
                            onClick={() => handleGetValueAddress({ provinces: "Districts", code: item.code, value: item.name_with_type })}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      currentTab === 2 && (
                        <div className="h-full w-full overflow-y-auto flex flex-col select-none ">
                          {dataCommune?.map((item, index) => (
                            <span
                              key={index}
                              onClick={(e) => handleGetValueAddress({ provinces: "Communate", code: item.code, value: item.name_with_type })}
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
            </div>
          </ModalOrder>
        )}
      </AnimatePresence>
      {/* end modal address  */}
      <div className="w-full h-fit bg-gray-50 mb-7 pb-5">
        <div className="flex items-center p-5 text-lg space-x-2">
          <span className="text-red-500">
            <GrLocation />
          </span>
          <p className="font-bold">Địa chỉ nhận hàng</p>
        </div>
        <div className="ml-6 flex items-center space-x-5">
          <h3 className="font-bold">
            {value.Fullname ? value.Fullname : (AddressInfo?.findAdressOrder?.Fullname ? AddressInfo?.findAdressOrder?.Fullname : value ? value.Fullname : "Chưa có thông tin")}
            <span>
              (+84) {value.Phone? value.Phone : (AddressInfo?.findAdressOrder?.Phone ? AddressInfo?.findAdressOrder?.Phone : value ? value.Phone : "Chưa có thông tin")}
            </span>{" "}
          </h3>
          <p>
            {valueInputAddress.Provinces && valueInputAddress.Districts && valueInputAddress.Commune ? `${valueInputAddress.Provinces}, ${valueInputAddress.Districts}, ${valueInputAddress.Commune}` : (AddressInfo?.findAdressOrder?.Address
              ? AddressInfo?.findAdressOrder?.Address.replace(/(Thành phố|Tỉnh)/g, " - $1")
                  ?.replace(/(Quận|Huyện)/g, " - $1")
                  ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                  ?.replace(/^ - /, "")
              : value
              ? value.Address?.replace(/(Thành phố|Tỉnh)/g, " - $1")
                  ?.replace(/(Quận|Huyện)/g, " - $1")
                  ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                  ?.replace(/^ - /, "")
              : "Chưa có thông tin")}
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
                  <img className="h-15 w-15 object-contain" src={item?.Image} alt="" />
                  <span className="md:w-60 w-20 truncate">{item?.Id_ProductVariants?.Id_Products?.Name} </span>
                </div>
                <div className="flex items-center lg:space-x-15 space-x-3">
                  <span className="lg:w-20">{item?.Price?.toLocaleString("vi-VN")}</span>
                  <span className="lg:w-20">{item?.Quantity}</span>
                  <span className="lg:w-20">{(item?.Price * item?.Quantity).toLocaleString("vi-VN")}</span>
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
        <div className="flex justify-between items-center p-3 w-full">
          <h1 className="md:block hidden">Phương thức thanh toán</h1>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-70 text-left py-2 px-3 bg-white border rounded flex justify-center items-center"
            >
              {isActive?.Name ? isActive?.Name : "Lựa chọn phương thức thanh toán"}
            </button>
            <ul
              className={`absolute left-0 w-full mt-2 bg-white border rounded shadow transform transition-all duration-200 ${
                open ? "opacity-100 h-21 visible" : "opacity-0 h-0 invisible"
              }`}
            >
              <li onClick={() => handleCheckIsActive("COD")} className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                Thanh toán khi nhận hàng
              </li>
              <li onClick={() => handleCheckIsActive("Zalopay")} className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                Thanh toán với Zalopay
              </li>
            </ul>
          </div>
        </div>
        <hr className="mt-5 w-full border-0.5 border-gray-300" />
        <AnimatePresence>
          {typeModal.type === "Voucher" && typeModal.modal && (
            <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal}>
              <div className="bg-white rounded-lg w-full max-w-lg shadow-lg">
                {/* Header */}
                <div className="border-b-2 border-gray-200 px-6 py-4 text-xl font-semibold ">Chọn Soundora Voucher</div>

                {/* Tabs */}
                <div>
                  <div className="flex items-center px-6 space-x-2 pt-3 bg-gray-100 pb-3">
                    <label className="text-gray-400">Mã voucher</label>
                    <input
                      onChange={(e) => setCodeVoucher(e.target.value)}
                      type="text"
                      placeholder="Nhập mã voucher"
                      className="flex-1 border px-3 py-2.5 rounded text-sm"
                    />
                    <button
                      onClick={() => handleApplyVoucher()}
                      className="bg-teal-500 text-white px-4 py-2.5 rounded text-sm cursor-pointer hover:bg-teal-600"
                    >
                      ÁP DỤNG
                    </button>
                  </div>
                  {errorVoucher && <p className="text-red-500 text-sm mt-2 pl-6">{errorVoucher}</p>}
                </div>

                {/* Voucher Section */}
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  <p className="font-medium mb-2">Mã Miễn Phí Vận Chuyển</p>

                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="flex border-1 border-gray-200 rounded overflow-hidden mb-4 shadow-sm">
                      {/* Left - Icon */}
                      <div className="bg-teal-400 text-white text-center p-4 w-28 flex flex-col justify-center items-center text-sm font-bold">
                        <span>FREE</span>
                        <span>SHIP</span>
                        <span className="text-xs font-normal">TOÀN NGÀNH HÀNG</span>
                      </div>

                      {/* Right - Info */}
                      <div className="flex-1 px-4 py-2 relative">
                        <p className="text-sm font-medium text-gray-700 mb-1">Giảm tối đa ₫{index === 0 ? "20k" : "30k"}</p>
                        <p className="text-sm text-gray-500">Đơn tối thiểu ₫{index === 0 ? "30k" : "45k"}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          HSD: 15.08.2025 <span className="text-blue-500 underline cursor-pointer">Điều Kiện</span>
                        </p>

                        {/* Radio + Badge */}
                        <div className="absolute top-2 right-2 flex flex-col items-end space-y-1">
                          <span className="text-red-500 text-xs">x10</span>
                          <input type="radio" name="voucher" disabled={true} className="cursor-no-drop" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Warning */}
                  <div className="bg-yellow-100 text-sm text-orange-600 p-2 rounded">
                    ⚠️ Vui lòng mua hàng trên ứng dụng Soundora để sử dụng ưu đãi.
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-3 border-t-1 border-gray-300 space-x-2">
                  <button
                    onClick={() => setTypeModal({ type: "Voucher", modal: false })}
                    className="px-10 cursor-pointer py-2 rounded border text-gray-600 hover:bg-gray-100"
                  >
                    TRỞ LẠI
                  </button>
                  <button
                    onClick={() => setTypeModal({ type: "Voucher", modal: false })}
                    className="px-15 cursor-pointer hover:bg-red-600 py-2 rounded bg-red-500 text-white"
                  >
                    OK
                  </button>
                </div>
              </div>
            </ModalOrder>
          )}
        </AnimatePresence>
        <div className="flex justify-between p-3">
          <div className="md:block hidden">
            <h3>Soundora Voucher</h3>
          </div>
          <div className="flex flex-col space-y-5">
            <div>
              <button
                onClick={() => setTypeModal({ type: "Voucher", modal: true })}
                className="text-teal-500 hover:text-teal-600 cursor-pointer"
              >
                Chọn voucher
              </button>
            </div>
            {/* <div className="relative">
              <input
                type="text"
                className="w-70 border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm pl-20"
                placeholder="Nhập mã voucher"
              />
              <label className="text-md font-bold absolute left-3 top-2">Voucher</label>
            </div> */}
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng tiền hàng :</h4>
              <span>{total?.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng tiền phí vận chuyển :</h4>
              <span>50.000đ</span>
            </div>
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Giảm giá từ voucher :</h4>
              <span>{newVoucherTotal?.discount?.toLocaleString("vi-VN")}</span>
            </div>
            <div className="flex justify-between space-x-30">
              <h4 className="text-gray-600">Tổng thanh toán :</h4>
              <span className="text-2xl text-red-500">
                {newVoucherTotal ? newVoucherTotal?.discountedTotal?.toLocaleString("vi-VN") : total?.toLocaleString("vi-VN")}đ
              </span>
            </div>
            {newVoucherTotal && <div className="flex items-center justify-between">
              <span className="text-md ">Tiết kiệm được :</span>
              <span className="text-red-500">{newVoucherTotal?.discount?.toLocaleString("vi-VN")}đ</span>
            </div>}
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
