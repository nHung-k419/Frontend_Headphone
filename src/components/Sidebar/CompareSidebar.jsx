import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllProducts, CompareProducts } from "../../services/Client/Product";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompareSidebar = ({ isOpen, onClose, currentProduct }) => {
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [isComparing, setIsComparing] = useState(false);
    const navigate = useNavigate();

    // Query for all products to choose from
    const { data: allProducts, isLoading: isLoadingAll } = useQuery({
        queryKey: ["GetAllProducts"],
        queryFn: GetAllProducts,
        enabled: isOpen && !isComparing,
    });

    // Query for comparison data
    const idsString = [currentProduct?._id, ...selectedProductIds].filter(Boolean).join(",");
    const { data: comparisonData, isLoading: isLoadingCompare } = useQuery({
        queryKey: ["CompareProducts", idsString],
        queryFn: () => CompareProducts(idsString),
        enabled: isComparing && !!selectedProductIds.length && isOpen,
    });

    const products = allProducts?.getAllProduct || [];
    const comparisonResults = comparisonData?.data || [];
    const maxSelection = 3;

    const toggleProductSelection = (productId) => {
        setSelectedProductIds(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            }
            if (prev.length >= maxSelection) {
                toast.warning(`Bạn chỉ có thể so sánh tối đa ${maxSelection + 1} sản phẩm.`);
                return prev;
            }
            return [...prev, productId];
        });
    };

    const handleBackToSelection = () => {
        setIsComparing(false);
    };

    const startComparison = () => {
        if (selectedProductIds.length > 0) {
            setIsComparing(true);
        } else {
            toast.warning("Vui lòng chọn ít nhất 1 sản phẩm để so sánh.");
        }
    };

    const renderSpecRow = (label, key, formatter = (v) => v) => {
        const values = comparisonResults.map((p) => formatter(p.Specifications?.[key]) || "—");
        const uniqueValues = new Set(values.filter(v => v !== "—"));
        const isDifferent = uniqueValues.size > 1;

        return (
            <div key={key} className={`py-4 border-b border-slate-50 transition-colors ${isDifferent ? "bg-slate-50/50" : ""}`}>
                <div className="flex items-center justify-between mb-2 px-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                    {isDifferent && (
                        <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase">
                            Khác biệt
                        </span>
                    )}
                </div>
                <div className={`grid gap-8 px-8 min-w-max`} style={{ gridTemplateColumns: `repeat(${comparisonResults.length}, minmax(140px, 1fr))` }}>
                    {values.map((val, i) => (
                        <div key={i} className={`text-sm ${isDifferent ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}>
                            {val}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderBooleanRow = (label, key) => {
        const valuesArr = comparisonResults.map((p) => !!p.Specifications?.[key]);
        const isDifferent = new Set(valuesArr).size > 1;

        return (
            <div key={key} className={`py-4 border-b border-slate-50 transition-colors ${isDifferent ? "bg-slate-50/50" : ""}`}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-6">{label}</p>
                <div className={`grid gap-8 px-8 min-w-max`} style={{ gridTemplateColumns: `repeat(${comparisonResults.length}, minmax(140px, 1fr))` }}>
                    {valuesArr.map((val, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${val ? "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.4)]" : "bg-slate-300"}`}></div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${val ? "text-teal-700" : "text-slate-400"}`}>
                                {val ? "Có" : "Không"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] overflow-hidden">
                    {/* Overlay - Modern Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
                    />

                    {/* Sidebar Content - Wider Column */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col"
                    >
                        {/* Header Section */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-20">
                            <div className="flex items-center gap-4">
                                {isComparing && (
                                    <button
                                        onClick={handleBackToSelection}
                                        className="p-2 bg-slate-50 hover:bg-teal-50 text-slate-500 hover:text-teal-600 rounded-xl transition-all group"
                                    >
                                        <IoMdArrowBack className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                                    </button>
                                )}
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                        {isComparing ? "So sánh sản phẩm" : "Chọn sản phẩm so sánh"}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isComparing ? "bg-teal-500 animate-pulse" : "bg-slate-300"}`}></div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                            {isComparing ? `Đang so sánh ${comparisonResults.length} sản phẩm` : `Đã chọn ${selectedProductIds.length}/${maxSelection}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all"
                            >
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white flex flex-col">
                            {isComparing ? (
                                /* Optimized Comparison View with Multi-Select */
                                isLoadingCompare ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 pb-20">
                                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-teal-500"
                                                animate={{ x: [-48, 48] }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang đối chiếu dữ liệu...</p>
                                    </div>
                                ) : (
                                    <div className="flex-1 overflow-hidden flex flex-col">
                                        {/* Horizontal Scroll Wrapper for both header and content */}
                                        <div className="overflow-x-auto custom-scrollbar flex-1">
                                            {/* Sticky Product Header */}
                                            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm min-w-max">
                                                <div className={`grid gap-8 px-8`} style={{ gridTemplateColumns: `repeat(${comparisonResults.length}, minmax(140px, 1fr))` }}>
                                                    {comparisonResults.map((product) => (
                                                        <div key={product._id} className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-slate-50 rounded-lg p-1.5 border border-slate-100 flex-shrink-0">
                                                                    <img
                                                                        src={product.maxVariant?.Image?.path || product.ImageUrl?.path}
                                                                        alt=""
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                </div>
                                                                <h4 className="flex-1 text-sm font-bold text-gray-900 line-clamp-1 leading-tight">
                                                                    {product.Name}
                                                                </h4>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-black text-teal-600">
                                                                    {product.minPrice?.toLocaleString("vi-VN")}₫
                                                                </span>
                                                                <button
                                                                    onClick={() => navigate(`/Products/Detail/${product._id}`)}
                                                                    className="text-[9px] font-black uppercase text-slate-400 hover:text-teal-600 tracking-wider transition-colors"
                                                                >
                                                                    Chi tiết ↗
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Content Sections */}
                                            <div className="pb-20">
                                                {/* Technical Specs Section */}
                                                <section className="pt-6">
                                                    <div className="flex items-center gap-3 mb-6 px-6">
                                                        <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
                                                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Cấu hình kỹ thuật</h3>
                                                    </div>
                                                    <div className="space-y-0.5 border-t border-slate-100">
                                                        {renderSpecRow("Thời lượng pin", "batteryLife", (v) => v ? `${v} giờ` : null)}
                                                        {renderSpecRow("Thời gian sạc", "chargingTime", (v) => v ? `${v} giờ` : null)}
                                                        {renderSpecRow("Chuẩn Bluetooth", "bluetoothVersion")}
                                                        {renderSpecRow("Cổng sạc", "chargingPort")}
                                                        {renderSpecRow("Chuẩn kháng nước", "waterResistance")}
                                                        {renderSpecRow("Kích thước driver", "driverSize", (v) => v ? `${v} mm` : null)}
                                                    </div>
                                                </section>

                                                {/* Features Section */}
                                                <section className="pt-10">
                                                    <div className="flex items-center gap-3 mb-6 px-6">
                                                        <span className="w-1 h-4 bg-teal-500 rounded-full"></span>
                                                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Tính năng âm thanh</h3>
                                                    </div>
                                                    <div className="space-y-0.5 border-t border-slate-100">
                                                        {renderBooleanRow("Sạc nhanh (Fast Charge)", "fastCharging")}
                                                        {renderBooleanRow("Chống ồn chủ động (ANC)", "anc")}
                                                        {renderBooleanRow("Hỗ trợ Microphone", "microphone")}
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                /* Clean Selection List - Now with Multi-Select Toggles */
                                isLoadingAll ? (
                                    <div className="flex items-center justify-center h-full pb-20">
                                        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-100 border-t-teal-500"></div>
                                    </div>
                                ) : (
                                    <div className="p-6 grid grid-cols-1 gap-4 pb-32">
                                        <div className="mb-2 p-4 bg-teal-50/50 rounded-2xl border border-teal-100 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <img src={currentProduct?.ImageUrl?.path} className="w-6 h-6 object-contain" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.1em]">Sản phẩm hiện tại</p>
                                                <p className="text-xs font-black text-gray-900 truncate">{currentProduct?.Name}</p>
                                            </div>
                                        </div>

                                        {products
                                            .filter((p) => p._id !== currentProduct?._id)
                                            .map((product) => {
                                                const isSelected = selectedProductIds.includes(product._id);
                                                return (
                                                    <div
                                                        key={product._id}
                                                        onClick={() => toggleProductSelection(product._id)}
                                                        className={`group flex items-center gap-5 p-5 bg-white border rounded-2xl transition-all cursor-pointer relative overflow-hidden ${isSelected ? "border-teal-500 shadow-[0_4px_24px_rgba(20,184,166,0.1)]" : "border-slate-100 hover:border-teal-200"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute top-0 right-0 w-8 h-8 bg-teal-500 rounded-bl-xl flex items-center justify-center">
                                                                <span className="text-white text-xs font-black">✓</span>
                                                            </div>
                                                        )}
                                                        <div className="w-20 h-20 bg-slate-50 rounded-xl p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                            <img
                                                                src={product.ImageUrl?.path}
                                                                alt={product.Name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                    Mã: {product._id.slice(-6).toUpperCase()}
                                                                </span>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-yellow-400 text-xs">★</span>
                                                                    <span className="text-xs font-bold text-slate-700">{product.Rating?.toFixed(1)}</span>
                                                                </div>
                                                            </div>
                                                            <h4 className={`font-bold transition-colors truncate mb-2 ${isSelected ? "text-teal-600" : "text-gray-900 group-hover:text-teal-600"}`}>
                                                                {product.Name}
                                                            </h4>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-teal-600 font-extrabold tracking-tight">
                                                                    {product.Price?.toLocaleString("vi-VN")}₫
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )
                            )}
                        </div>

                        {/* Selection Bar & Footer Section */}
                        {!isComparing && (
                            <div className="p-6 border-t border-slate-100 bg-white/80 backdrop-blur-xl absolute bottom-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-bold text-gray-500">
                                        Đã chọn <span className="text-teal-600">{selectedProductIds.length}</span> / {maxSelection} sản phẩm thêm
                                    </p>
                                    {selectedProductIds.length > 0 && (
                                        <button
                                            onClick={() => setSelectedProductIds([])}
                                            className="text-[10px] font-black uppercase text-red-400 hover:text-red-500 tracking-wider transition-colors"
                                        >
                                            Xóa tất cả
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-slate-50 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        onClick={startComparison}
                                        disabled={selectedProductIds.length === 0}
                                        className="flex-[2] py-4 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-gray-900/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <span>So sánh ngay</span>
                                        <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 inline-block transition-all">→</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CompareSidebar;
