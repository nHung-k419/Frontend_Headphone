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
import { checkVoucher, getVouchersActive } from "../../services/Client/Voucher";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";
import WaveLoader from "../../components/AnimateDotLoading";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import { GrLocation } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "framer-motion";
import { clearCart } from "../../redux/features/CartSlice";
import { useDispatch } from "react-redux";
import { IoChevronForward, IoTicketOutline, IoWalletOutline, IoLocationOutline } from "react-icons/io5";
import { getRoute } from "../../helper/route";

const Order_Confirmation = () => {
  const dispatch = useDispatch();
  const TabRef = useRef([]);
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [valueCode, setValueCode] = useState({ codeDistricts: "", codeCommunate: "" });
  const [valueInputAddress, setValueInputAddress] = useState({
    Provinces: "",
    Districts: "",
    Commune: "",
  });
  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  const { id: idUser, Email } = user ? JSON?.parse(user) : "";
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
  const [codeVoucher, setCodeVoucher] = useState("");
  const [newVoucherTotal, setNewTotalVoucher] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorVoucher, setErrorVoucher] = useState(null);

  const { data: dataVouchersActive } = useQuery({
    queryKey: ["vouchersActive"],
    queryFn: () => getVouchersActive(),
  });
  console.log('dataVouchersActive', dataVouchersActive);
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
    setValue((prev) => ({
      ...prev,
      Address: valueInputAddress?.Provinces + valueInputAddress?.Districts + valueInputAddress?.Commune,
    }));
  }, [currentTab, valueInputAddress]);

  const { data, isPending } = useQuery({
    queryKey: ["order", idUser],
    queryFn: () => getProductOrder(idUser),
  });

  const { data: dataProvinces } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAddressProvices(),
  });

  const { data: dataDistricts } = useQuery({
    queryKey: ["Districts", valueCode.codeDistricts],
    queryFn: () => getAddressDistricts({ code: valueCode?.codeDistricts }),
  });

  const { data: dataCommune } = useQuery({
    queryKey: ["Communate", valueCode.codeCommunate],
    queryFn: () => getAddressCommune({ code: valueCode?.codeCommunate }),
  });

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
      setLineStyle({
        left: actives.offsetLeft ? actives?.offsetLeft : 0,
        width: actives.offsetWidth ? actives?.offsetWidth : 137,
      });
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
      dispatch(clearCart());
      if (data?.resultCreate?.PaymentMethod === "COD") {
        setIsLoading(false);
        toast.success("Đặt hàng thành công!!");
        navigate("/don-hang");
      } else {
        mutationPayment.mutate(data?.resultCreate);
      }
    },
  });

  const mutationPayment = useMutation({
    mutationKey: ["payment"],
    mutationFn: PaymentProductOrder,
    onSuccess: (data) => {
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = data?.Message?.order_url;
      }, 3000);
    },
  });

  const handlePostOrder = (e) => {
    if (value.Fullname && value.Phone && value.Address && value.PaymentMethod && !isLoading) {
      setIsLoading(true);
      const dataOrder = {
        ...value,
        Address: value.Address ? value.Address : valueInputAddress.Provinces + " - " + valueInputAddress.Districts + " - " + valueInputAddress.Commune,
        Id_Cart: data?.resultOrder[0]?.Id_Cart,
        voucherCode: newVoucherTotal?.code,
        TotalAmount: newVoucherTotal ? newVoucherTotal?.discountedTotal : total,
        idUser: idUser,
        Email,
      };
      mutationOrder.mutate(dataOrder);
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

  useEffect(() => {
    setErrorVoucher("");
    if (typeModal.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [typeModal.modal]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 px-4 md:px-8 font-sans selection:bg-emerald-100 text-[#2D2D2D]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header - Boutique Style */}
        <div className="border-b border-[#E5E2D9] pb-6">
          <h1 className="text-3xl font-light tracking-tight">Thanh toán</h1>
          <nav className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-widest text-[#8C8C8C]">
            <Link to={getRoute("/cart")} className="hover:text-emerald-700 transition-colors">Giỏ hàng</Link>
            <IoChevronForward size={10} />
            <span className="text-[#2D2D2D]">Xác nhận</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Shipping Address Section */}
            <div className="bg-white border-l-2 border-emerald-600 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <IoLocationOutline size={20} />
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Địa chỉ nhận hàng</h2>
                </div>
                <button
                  onClick={() => setTypeModal({ type: "ModalAddress", modal: true })}
                  className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-4"
                >
                  Thay đổi
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <p className="font-bold">
                    {value.Fullname || AddressInfo?.findAdressOrder?.Fullname || "Chưa có thông tin"}
                  </p>
                  <span className="text-[#8C8C8C] font-light">|</span>
                  <p className="text-[#8C8C8C] tracking-wide">
                    (+84) {value.Phone || AddressInfo?.findAdressOrder?.Phone || "Chưa có thông tin"}
                  </p>
                </div>
                <p className="text-[#555] leading-relaxed max-w-xl">
                  {value.Address || AddressInfo?.findAdressOrder?.Address || "Chưa có địa chỉ giao hàng"}
                </p>
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C8C8C] pl-1">Sản phẩm</h2>
              <div className="border-t border-[#E5E2D9]">
                {isPending ? (
                  <div className="p-4 space-y-4">
                    <Skeleton height={80} count={2} />
                  </div>
                ) : (
                  data?.resultOrder?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-6 border-b border-[#F0EEE6] group">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#F0EEE6] p-2 flex-shrink-0">
                          <img src={item?.Image} className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" alt="" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-[#2D2D2D] max-w-[200px] sm:max-w-xs truncate">
                            {item?.Id_ProductVariants?.Id_Products?.Name}
                          </h3>
                          <div className="flex gap-4 text-[10px] text-[#8C8C8C] uppercase tracking-widest">
                            <span>Màu: {item?.Color || "N/A"}</span>
                            <span>Size: {item?.Size || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.15em]">Số lượng: {item?.Quantity}</p>
                        <p className="text-sm font-light tracking-wider">
                          {(item?.Price * item?.Quantity).toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment & Voucher Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Payment Method */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#8C8C8C]">
                  <IoWalletOutline size={18} />
                  <h2 className="text-[10px] font-bold uppercase tracking-widest">Thanh toán</h2>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full text-left py-3.5 px-4 bg-white border border-[#E5E2D9] rounded-sm text-xs flex justify-between items-center group hover:border-emerald-600 transition-colors"
                  >
                    <span className={isActive?.Name ? "text-[#2D2D2D]" : "text-[#8C8C8C]"}>
                      {isActive?.Name === "COD" ? "Thanh toán khi nhận hàng (COD)" : isActive?.Name === "Zalopay" ? "Ví điện tử Zalopay" : "Lựa chọn phương thức"}
                    </span>
                    <IoChevronForward className={`transform transition-transform ${open ? 'rotate-90' : ''} text-[#8C8C8C]`} />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 w-full mt-2 bg-white border border-[#E5E2D9] rounded-sm shadow-xl overflow-hidden"
                      >
                        <li onClick={() => handleCheckIsActive("COD")} className="py-3 px-4 text-xs hover:bg-[#FAF9F6] cursor-pointer border-b border-[#F0EEE6] transition-colors">
                          Thanh toán khi nhận hàng (COD)
                        </li>
                        <li onClick={() => handleCheckIsActive("Zalopay")} className="py-3 px-4 text-xs hover:bg-[#FAF9F6] cursor-pointer flex items-center justify-between transition-colors">
                          <span>Ví Zalopay</span>
                          <img src="https://image.rocketpun.ch/company/77401/zalopay_logo_1580282434.png" className="h-4" alt="Zalopay" />
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Voucher */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#8C8C8C]">
                  <IoTicketOutline size={18} />
                  <h2 className="text-[10px] font-bold uppercase tracking-widest">Ưu đãi</h2>
                </div>
                <button
                  onClick={() => setTypeModal({ type: "Voucher", modal: true })}
                  className="w-full py-3.5 px-4 bg-[#F0EEE6] text-[#2D2D2D] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#E5E2D9] transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  {newVoucherTotal ? `Voucher: ${newVoucherTotal.code}` : "Chọn mã giảm giá"}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#F0EEE6] p-8 space-y-8 rounded-sm">
              <h2 className="text-sm font-light uppercase tracking-[0.3em] text-[#2D2D2D] border-b border-[#E5E2D9] pb-4">Đơn hàng</h2>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between text-[#8C8C8C]">
                  <span className="uppercase tracking-widest text-[9px]">Tổng tiền hàng</span>
                  <span className="tracking-wider">{total?.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-[#8C8C8C]">
                  <span className="uppercase tracking-widest text-[9px]">Giao hàng</span>
                  <span className="text-emerald-700 italic">50.000₫</span>
                </div>
                {newVoucherTotal && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="uppercase tracking-widest text-[9px]">Giảm giá voucher</span>
                    <span className="tracking-wider">-{newVoucherTotal?.discount?.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}

                <div className="border-t border-[#E5E2D9] pt-6 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Tổng cộng</span>
                    <span className="text-2xl font-light tracking-tighter text-[#2D2D2D]">
                      {(newVoucherTotal ? newVoucherTotal?.discountedTotal + 50000 : total + 50000)?.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    disabled={isLoading}
                    onClick={(e) => handlePostOrder(e)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 flex items-center justify-center transition-all duration-500 shadow-sm relative group overflow-hidden"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] relative z-10">
                      {isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                    </span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4 py-3 border-l-2 border-[#E5E2D9] text-[10px] text-[#8C8C8C] leading-relaxed italic">
              * Quý khách vui lòng kiểm tra kỹ thông tin trước khi đặt hàng. Sản phẩm cao cấp hỗ trợ đổi trả trong 7 ngày.
            </div>
          </div>
        </div>
      </div>

      {/* Address Selection Modal Content (Portion of it for context) */}
      <AnimatePresence>
        {typeModal.type === "ModalAddress" && typeModal.modal && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal}>
            <div ref={wrapperRef} className="w-full max-w-xl bg-white p-8 rounded-sm space-y-6 shadow-2xl">
              <h1 className="text-xl font-light border-b border-[#F0EEE6] pb-4">Thông tin nhận hàng</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Họ và tên</label>
                  <input
                    onChange={handleGetvalue}
                    name="Fullname"
                    value={value.Fullname}
                    placeholder="Nguyễn Văn A"
                    className="w-full border-b border-[#E5E2D9] h-10 focus:outline-none focus:border-emerald-600 text-sm transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Số điện thoại</label>
                  <input
                    onChange={handleGetvalue}
                    name="Phone"
                    value={value.Phone}
                    placeholder="09xxx"
                    className="w-full border-b border-[#E5E2D9] h-10 focus:outline-none focus:border-emerald-600 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Địa chỉ chi tiết</label>
                <input
                  onFocus={() => setIsFocus(true)}
                  value={valueInputAddress.Provinces + " - " + valueInputAddress.Districts + " - " + valueInputAddress.Commune}
                  placeholder="Chọn Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                  readOnly
                  className="w-full border-b border-[#E5E2D9] h-10 focus:outline-none text-sm cursor-pointer"
                />

                {isFocus && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 border border-[#E5E2D9] mt-2 space-y-4 max-h-60 overflow-y-auto bg-[#FAF9F6]">
                    <div className="flex gap-4 border-b border-[#E5E2D9] text-[9px] uppercase tracking-widest pb-2">
                      <button onClick={() => setCurrentTab(0)} className={currentTab === 0 ? 'text-emerald-700 font-bold' : ''}>Tỉnh/TP</button>
                      <button onClick={() => setCurrentTab(1)} className={currentTab === 1 ? 'text-emerald-700 font-bold' : ''}>Quận/Huyện</button>
                      <button onClick={() => setCurrentTab(2)} className={currentTab === 2 ? 'text-emerald-700 font-bold' : ''}>Phường/Xã</button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {(currentTab === 0 ? dataProvinces : currentTab === 1 ? dataDistricts : dataCommune)?.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleGetValueAddress({
                            provinces: currentTab === 0 ? "Provinces" : currentTab === 1 ? "Districts" : "Commune",
                            code: item.code,
                            value: item.name_with_type
                          })}
                          className="text-left py-1 text-xs hover:text-emerald-700 transition-colors"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button onClick={handleOffModal} className="text-[10px] uppercase tracking-widest text-[#8C8C8C] hover:text-[#2D2D2D]">Hủy</button>
                <button onClick={() => setTypeModal({ ...typeModal, modal: false })} className="bg-[#2D2D2D] text-white px-8 py-2 text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors">Lưu</button>
              </div>
            </div>
          </ModalOrder>
        )}

        {/* Voucher Modal Content (Simplified) */}
        {typeModal.type === "Voucher" && typeModal.modal && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal}>
            <div className="w-full max-w-lg bg-white p-8 rounded-sm space-y-8 shadow-2xl">
              <h2 className="text-xl font-light tracking-tight border-b border-[#F0EEE6] pb-4">Soundora Voucher</h2>
              <div className="flex gap-2">
                <input
                  onChange={(e) => setCodeVoucher(e.target.value)}
                  placeholder="Nhập mã ưu đãi"
                  className="flex-1 border border-[#E5E2D9] px-4 py-2 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <button onClick={handleApplyVoucher} className="bg-[#2D2D2D] text-white px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors">Áp dụng</button>
              </div>
              {errorVoucher && <p className="text-red-500 text-[10px] mt-1">{errorVoucher}</p>}

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {dataVouchersActive && dataVouchersActive.length > 0 ? (
                  dataVouchersActive.map((item) => (
                    <div
                      key={item._id}
                      className={`group relative p-5 border rounded-sm transition-all duration-300 flex items-center justify-between gap-4 ${codeVoucher === item.code
                          ? "border-emerald-600 bg-emerald-50/30"
                          : "border-[#F0EEE6] hover:border-emerald-200 hover:bg-[#FAF9F6]"
                        }`}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded-sm">
                            {item.code}
                          </span>
                          <h3 className="text-[11px] font-bold uppercase tracking-tight text-[#2D2D2D]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-[#8C8C8C] leading-relaxed">
                          {item.description || "Áp dụng cho mọi đơn hàng từ Soundora"}
                        </p>
                        <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-[#8C8C8C]">
                          <span className="flex items-center gap-1">
                            <IoTicketOutline size={10} className="text-emerald-600" />
                            Giảm {item.discountType === "percentage" ? `${item.discountValue}%` : `${item.discountValue?.toLocaleString("vi-VN")}₫`}
                          </span>
                          <span>HSD: {new Date(item.expiresAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                        {item.minOrderValue > 0 && (
                          <p className="text-[9px] text-emerald-600 italic">
                            * Tối thiểu {(item.minOrderValue).toLocaleString("vi-VN")}₫
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setCodeVoucher(item.code);
                          mutationCheckVoucher.mutate({ code: item.code, orderTotal: total, idUser: idUser });
                        }}
                        disabled={total < (item.minOrderValue || 0)}
                        className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${codeVoucher === item.code
                            ? "bg-emerald-600 text-white"
                            : total < (item.minOrderValue || 0)
                              ? "bg-[#F0EEE6] text-[#8C8C8C] cursor-not-allowed"
                              : "bg-[#2D2D2D] text-white hover:bg-emerald-600"
                          }`}
                      >
                        {codeVoucher === item.code ? "Đã chọn" : total < (item.minOrderValue || 0) ? "Không đủ ĐK" : "Chọn"}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <IoTicketOutline size={32} className="mx-auto text-[#E5E2D9]" />
                    <p className="text-xs text-[#8C8C8C] font-light">Hiện tại không có mã giảm giá nào khả dụng.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#F0EEE6]">
                <button
                  onClick={() => setTypeModal({ modal: false })}
                  className="text-[10px] uppercase tracking-widest text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </ModalOrder>
        )}
      </AnimatePresence>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default Order_Confirmation;
