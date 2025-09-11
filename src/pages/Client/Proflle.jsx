import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { FaUser, FaEnvelopeOpenText, FaHeart, FaCog, FaQuestionCircle } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileUser, updateProfile } from "../../services/Client/Auth";
import Loading from "../../components/Loading";
import { HiOutlineCamera } from "react-icons/hi2";
import { Form, Link } from "react-router-dom";
import AvatarContext from "../../context/AvatarContext";
const Proflle = () => {
  const { setAvatarUrl } = useContext(AvatarContext);
  const queryClient = useQueryClient();
   const user = localStorage.getItem("User");
  const { id,Email } = user ? JSON?.parse(user) : "";
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  });
  const menuItems = [
    { icon: <FaUser />, label: "Thông tin cá nhân" },
    { icon: <FaEnvelopeOpenText />, label: "Lịch sử đặt hàng", link: "/OrderItems" },
    { icon: <FaHeart />, label: "Sản phẩm yêu thích" },
    { icon: <FaCog />, label: "Cài đặt" },
    { icon: <FaQuestionCircle />, label: "Trợ giúp" },
  ];
  const profileFields = [
    { label: "Tên", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Tên hiển thị", key: "NameShow" },
    { label: "Số điện thoại", key: "Phone" },
    { label: "Ngày sinh", key: "DateOfBirth" },
    { label: "Giới tính", key: "Sex" },
    { label: "Địa chỉ", key: "Address" },
  ];
  const mutationPutProfile = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data) => updateProfile(data),
    onSuccess: (data) => {
      setEditingField(null);
      queryClient.invalidateQueries(["profile"]);
      setIsLoading(false);
    },
  });

  const handleChange = (key, value) => {
    setValueProfile((prev) => ({ ...prev, [key]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValueProfile((prev) => ({ ...prev, Image: file }));
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setTemporaryImage(imagePreview);
      setAvatarUrl(imagePreview);
    }
  };
  useEffect(() => {
    return () => {
      if (temporaryImage) {
        URL.revokeObjectURL(temporaryImage);
      }
    };
  }, [temporaryImage]);

  useEffect(() => {
    if (valueProfile.Image) {
      const formData = new FormData();
      formData.append("Image", valueProfile.Image);
      mutationPutProfile.mutate({ id: id, data: formData });
    }
  }, [valueProfile]);

  const handleCancle = () => {
    setEditingField(null);
    // Bạn có thể thêm API update profile tại đây
  };
  const handlePutProfile = () => {
    const data = { id: id, data: valueProfile };
    mutationPutProfile.mutate(data);
    setIsLoading(true);
    // setEditingField(null);
  };
  // console.log(data?.isCheckUser);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-2xl pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 pl-6">Tài khoản</h2>
          <ul className="space-y-3">
            {menuItems.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className={`flex items-center gap-3 pl-6 transition cursor-pointer hover:bg-teal-500 h-12 hover:text-white rounded-xl`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </ul>
        </aside>

        {/* Profile content */}
        <main className="md:col-span-3 bg-white shadow-xl rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
              <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin để sử dụng các dịch vụ tốt hơn.</p>
            </div>
            <div className="relative">
              <img
                onClick={() => fileInputRef.current.click()}
                src={temporaryImage || data?.isCheckUser?.Image?.path}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 border-teal-400 shadow-md object-cover cursor-pointer relative"
              />
              <span
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-7 w-6 h-6 rounded-full cursor-pointer  text-white flex items-center justify-center"
              >
                <HiOutlineCamera />
              </span>
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} ref={fileInputRef} className="hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profileFields.map((field) => (
              <div key={field.key} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition relative">
                <p className="text-xs text-gray-500 mb-1">{field.label}</p>
                {editingField === field.key ? (
                  <div>
                    <input
                      type="text"
                      value={valueProfile[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      // onBlur={handleBlur}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") handleBlur();
                      // }}
                      autoFocus
                      className="text-sm font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-teal-500 w-full"
                    />
                    <div className="flex items-center justify-end mt-2 space-x-2">
                      <button onClick={handleCancle} className="w-15 h-8 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-600">
                        Hủy
                      </button>
                      <button
                        onClick={() => handlePutProfile()}
                        className="w-15 h-8 rounded-md bg-teal-500 text-white cursor-pointer hover:bg-teal-600"
                      >
                        {isLoading ? <Loading /> : "Lưu"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800">{data?.isCheckUser?.[field.key] || "Chưa có thông tin"}</p>
                )}

                <button
                  className="absolute top-3 right-3 text-teal-500 hover:text-teal-700"
                  onClick={() => {
                    setEditingField(field.key);
                    setValueProfile((prev) => ({
                      ...prev,
                      [field.key]: data?.isCheckUser?.[field.key] || "",
                    }));
                  }}
                >
                  <HiOutlinePencil className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proflle;
