import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUser, FaEnvelopeOpenText, FaHeart, FaCog, FaQuestionCircle, FaChevronRight } from "react-icons/fa";
import { HiOutlinePencil, HiOutlineCamera, HiOutlineUser, HiOutlineEnvelope, HiOutlinePhone, HiOutlineCake, HiOutlineMapPin } from "react-icons/hi2";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileUser, updateProfile } from "../../services/Client/Auth";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import AvatarContext from "../../context/AvatarContext";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { getRoute } from "../../helper/route";

const Proflle = () => {
  const { setAvatarUrl } = useContext(AvatarContext);
  const queryClient = useQueryClient();
  const user = localStorage.getItem("User");
  const { id } = user ? JSON?.parse(user) : "";

  const [editingField, setEditingField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef();
  const [temporaryImage, setTemporaryImage] = useState("");

  const [valueProfile, setValueProfile] = useState({
    Name: "",
    NameShow: "",
    Phone: "",
    DateOfBirth: "",
    Sex: "",
    Address: "",
    Image: "",
  });

  const { data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileUser(id),
    enabled: !!id,
  });

  const menuItems = [
    { icon: <HiOutlineUser size={18} />, label: "Thông tin cá nhân", active: true },
    { icon: <FaEnvelopeOpenText size={16} />, label: "Lịch sử đặt hàng", link: "/OrderItems" },
    { icon: <FaHeart size={16} />, label: "Sản phẩm yêu thích", link: "/FavoriteProducts" },
    { icon: <FaCog size={16} />, label: "Cài đặt", link: "/Settings" },
    { icon: <FaQuestionCircle size={16} />, label: "Trợ giúp", link: "/Help" },
  ];

  const profileFields = [
    { label: "Họ và tên", key: "Name", icon: <HiOutlineUser /> },
    { label: "Email", key: "Email", icon: <HiOutlineEnvelope />, readOnly: true },
    { label: "Tên hiển thị", key: "NameShow", icon: <HiOutlineUser /> },
    { label: "Số điện thoại", key: "Phone", icon: <HiOutlinePhone /> },
    { label: "Ngày sinh", key: "DateOfBirth", icon: <HiOutlineCake /> },
    { label: "Giới tính", key: "Sex", icon: <IoMaleFemaleOutline /> },
    { label: "Địa chỉ nhận hàng", key: "Address", icon: <HiOutlineMapPin /> },
  ];

  const mutationPutProfile = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      setEditingField(null);
      queryClient.invalidateQueries(["profile"]);
      setIsSubmitting(false);
      toast.success("Cập nhật thông tin thành công");
    },
    onError: () => {
      setIsSubmitting(false);
      toast.error("Có lỗi xảy ra khi cập nhật");
    }
  });

  const handleChange = (key, value) => {
    setValueProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValueProfile((prev) => ({ ...prev, Image: file }));
      const imagePreview = URL.createObjectURL(file);
      setTemporaryImage(imagePreview);
      setAvatarUrl(imagePreview);

      const formData = new FormData();
      formData.append("Image", file);
      mutationPutProfile.mutate({ id: id, data: formData });
    }
  };

  useEffect(() => {
    return () => {
      if (temporaryImage) URL.revokeObjectURL(temporaryImage);
    };
  }, [temporaryImage]);

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleSaveProfile = () => {
    setIsSubmitting(true);
    const dataToSend = { id: id, data: valueProfile };
    mutationPutProfile.mutate(dataToSend);
  };

  const startEditing = (field) => {
    if (field.readOnly) return;
    setEditingField(field.key);
    setValueProfile((prev) => ({
      ...prev,
      [field.key]: data?.isCheckUser?.[field.key] || "",
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20 px-4 md:px-12 font-sans text-[#2D2D2D]">
      <Toaster position="bottom-right" richColors />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* Sidebar Boutique */}
        <aside className="lg:block hidden space-y-8">
          <div className="bg-white border border-[#E5E2D9] rounded-sm p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                <HiOutlineUser size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Thành viên</p>
                <p className="text-sm font-bold tracking-tight">{data?.isCheckUser?.Name || "Khách hàng"}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, i) => (
                <Link
                  to={getRoute(item.link || "#")}
                  key={i}
                  className={`flex items-center justify-between group px-4 py-3 rounded-sm transition-all duration-300 ${item.active
                    ? "bg-[#F0EEE6] text-[#2D2D2D]"
                    : "text-[#8C8C8C] hover:bg-[#F0EEE6] hover:text-[#2D2D2D]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={item.active ? "text-emerald-700" : "text-[#8C8C8C] group-hover:text-emerald-700"}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-medium tracking-tight">{item.label}</span>
                  </div>
                  <FaChevronRight size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity ${item.active ? "opacity-30" : ""}`} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-6 bg-emerald-900 rounded-sm text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-300 mb-2">Ưu đãi độc quyền</p>
              <p className="text-sm font-light leading-relaxed mb-4">Nhận thông báo về các bộ sưu tập âm thanh mới nhất và ưu đãi đặc biệt.</p>
              <button className="text-[10px] uppercase tracking-widest font-bold border-b border-white pb-0.5 hover:text-emerald-300 transition-colors">Tìm hiểu thêm</button>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-50" />
          </div>
        </aside>

        {/* Main Content boutique */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-[#E5E2D9] rounded-sm shadow-sm overflow-hidden">

            {/* Header Section */}
            <div className="p-8 border-b border-[#F0EEE6] flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#FAF9F6]/50">
              <div className="space-y-2">
                <h1 className="text-2xl  tracking-tight">Hồ sơ cá nhân</h1>
                <p className="text-xs text-[#8C8C8C] font-light tracking-wide max-w-md">Quản lý và cập nhật thông tin tài khoản của bạn để có trải nghiệm mua sắm cá nhân hóa hơn.</p>
              </div>

              <div className="relative group">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white ring-1 ring-[#E5E2D9] shadow-md transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={temporaryImage || data?.isCheckUser?.Image?.path || "https://i.pinimg.com/736x/43/14/0a/43140a3803e5f1b39c1ffac1a35a3ec7.jpg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer duration-300"
                  >
                    <HiOutlineCamera className="text-white text-2xl" />
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -bottom-1 -right-1 bg-emerald-700 text-white p-1.5 rounded-full shadow-lg hover:bg-emerald-800 transition-colors"
                >
                  <HiOutlineCamera size={14} />
                </button>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
              </div>
            </div>

            {/* Information Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                {profileFields.map((field) => (
                  <div key={field.key} className="group py-5 border-b border-[#F0EEE6] last:border-0 md:last:border-b transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5 flex-1 pr-4">
                        <div className="flex items-center gap-2 text-[#8C8C8C]">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{field.label}</span>
                        </div>

                        <AnimatePresence mode="wait">
                          {editingField === field.key ? (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="mt-2 space-y-3"
                            >
                              <input
                                type="text"
                                value={valueProfile[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                autoFocus
                                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-50 transition-all font-medium"
                              />
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors"
                                >
                                  Hủy
                                </button>
                                <button
                                  onClick={handleSaveProfile}
                                  disabled={isSubmitting}
                                  className="px-6 py-1.5 bg-emerald-700 text-white text-[10px] uppercase tracking-widest font-bold rounded-sm shadow-sm hover:bg-emerald-800 disabled:opacity-50 transition-all flex items-center gap-2"
                                >
                                  {isSubmitting ? <Loading size={14} /> : "Cập nhật"}
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-between"
                            >
                              <p className={`text-sm tracking-tight ${data?.isCheckUser?.[field.key] ? "font-medium text-[#2D2D2D]" : " text-[#8C8C8C] "}`}>
                                {data?.isCheckUser?.[field.key] || "Chưa cập nhật nội dung"}
                              </p>
                              {!field.readOnly && (
                                <button
                                  onClick={() => startEditing(field)}
                                  className="opacity-0 group-hover:opacity-100 p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-full transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                                >
                                  <HiOutlinePencil size={14} />
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="text-[#E5E2D9] mt-1 group-hover:text-emerald-100 transition-colors">
                        {React.cloneElement(field.icon, { size: 18 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-[#FAF9F6] border-l-2 border-emerald-700 rounded-sm">
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 mb-2">Lời nhắc bảo mật</p>
                <p className="text-xs text-[#8C8C8C] leading-relaxed">Chúng tôi khuyến khích bạn cập nhật thông tin thường xuyên để đảm bảo tính bảo mật và nhận được các hỗ trợ tốt nhất từ Soundora. Tất cả dữ liệu của bạn đều được mã hóa và bảo vệ nghiêm ngặt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proflle;
