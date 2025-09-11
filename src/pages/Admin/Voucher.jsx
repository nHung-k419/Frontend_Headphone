import React, { useState } from 'react';
// import { GoPlus, CiEdit, LuTrash2, CiSearch, FaFilter, FaRegCalendar, CiPercent, FaDollarSign, FaTag, HiMiniUsers } from 'lucide-react';
import { GoPlus } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { CiPercent } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import Modal from '../../components/ModalAdmin/Modal';
const Voucher = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: 'SUMMER2024',
      name: 'Khuyến mãi mùa hè',
      type: 'CiPercenFaTage',
      value: 20,
      minOrderValue: 500000,
      maxDiscount: 100000,
      usageLimit: 100,
      usedCount: 25,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
      description: 'Giảm giá 20% cho đơn hàng mùa hè'
    },
    {
      id: 2,
      code: 'WELCOME50',
      name: 'Chào mừng khách hàng mới',
      type: 'fixed',
      value: 50000,
      minOrderValue: 200000,
      maxDiscount: 50000,
      usageLimit: 500,
      usedCount: 120,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      description: 'Giảm 50k cho khách hàng mới'
    },
    {
      id: 3,
      code: 'FLASH30',
      name: 'Flash Sale',
      type: 'CiPercenFaTage',
      value: 30,
      minOrderValue: 1000000,
      maxDiscount: 200000,
      usageLimit: 50,
      usedCount: 50,
      startDate: '2024-07-15',
      endDate: '2024-07-20',
      status: 'expired',
      description: 'Flash sale giảm 30%'
    }
  ]);

  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [CiEditingVoucher, setCiEditingVoucher] = useState(null);
  const [CiSearchTerm, setCiSearchTerm] = useState('');
  const [FaFilterStatus, setFaFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'CiPercenFaTage',
    value: '',
    minOrderValue: '',
    maxDiscount: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // FaFilter và CiSearch vouchers
  const FaFilteredVouchers = vouchers.filter(voucher => {
    const matchesCiSearch = voucher.name.toLowerCase().includes(CiSearchTerm.toLowerCase()) ||
                         voucher.code.toLowerCase().includes(CiSearchTerm.toLowerCase());
    const matchesFaFilter = FaFilterStatus === 'all' || voucher.status === FaFilterStatus;
    return matchesCiSearch && matchesFaFilter;
  });

  // Pagination
  const totalPages = Math.ceil(FaFilteredVouchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVouchers = FaFilteredVouchers.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (CiEditingVoucher) {
      // Update voucher
      setVouchers(prev => prev.map(voucher => 
        voucher.id === CiEditingVoucher.id 
          ? { ...voucher, ...formData, id: CiEditingVoucher.id, status: 'active', usedCount: voucher.usedCount }
          : voucher
      ));
    } else {
      // Add new voucher
      const newVoucher = {
        ...formData,
        id: Date.now(),
        usedCount: 0,
        status: 'active'
      };
      setVouchers(prev => [...prev, newVoucher]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      type: 'CiPercenFaTage',
      value: '',
      minOrderValue: '',
      maxDiscount: '',
      usageLimit: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setTypeModal(false);
    setCiEditingVoucher(null);
  };

  const handleCiEdit = (voucher) => {
    setCiEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      name: voucher.name,
      type: voucher.type,
      value: voucher.value.toString(),
      minOrderValue: voucher.minOrderValue.toString(),
      maxDiscount: voucher.maxDiscount.toString(),
      usageLimit: voucher.usageLimit.toString(),
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      description: voucher.description
    });
    setTypeModal({ type: "UpdateVoucher", modal: true });
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
      setVouchers(prev => prev.filter(voucher => voucher.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'expired': return 'Hết hạn';
      case 'inactive': return 'Không hoạt động';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý Voucher</h1>
              <p className="text-gray-600 mt-1">Quản lý các mã giảm giá và khuyến mãi</p>
            </div>
            <button
              onClick={() => setTypeModal({ type: 'add', modal: true })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <GoPlus size={20} />
              Thêm Voucher
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FaTag className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Tổng Voucher</p>
                  <p className="text-2xl font-bold text-blue-600">{vouchers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <HiMiniUsers className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-green-600">
                    {vouchers.filter(v => v.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FaRegCalendar className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Hết hạn</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vouchers.filter(v => v.status === 'expired').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Tổng lượt sử dụng</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {vouchers.reduce((total, v) => total + v.usedCount, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FaFilters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mã voucher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={CiSearchTerm}
                  onChange={(e) => setCiSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaFilter size={20} className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={FaFilterStatus}
                onChange={(e) => setFaFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="expired">Hết hạn</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>

        {/* Voucher Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voucher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại & Giá trị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điều kiện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sử dụng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{voucher.name}</div>
                        <div className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                          {voucher.code}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {voucher.type === 'CiPercenFaTage' ? (
                          <>
                            <CiPercent size={16} className="text-blue-500" />
                            <span className="font-medium text-blue-600">{voucher.value}%</span>
                          </>
                        ) : (
                          <>
                            <FaDollarSign size={16} className="text-green-500" />
                            <span className="font-medium text-green-600">{formatCurrency(voucher.value)}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>Đơn tối thiểu: {formatCurrency(voucher.minOrderValue)}</div>
                      <div>Giảm tối đa: {formatCurrency(voucher.maxDiscount)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium">{voucher.usedCount}/{voucher.usageLimit}</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(voucher.usedCount / voucher.usageLimit) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{new Date(voucher.startDate).toLocaleDateString('vi-VN')}</div>
                      <div>{new Date(voucher.endDate).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(voucher.status)}`}>
                        {getStatusText(voucher.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCiEdit(voucher)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="Chỉnh sửa"
                        >
                          <CiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(voucher.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                          title="Xóa"
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, FaFilteredVouchers.length)} 
                  trong tổng số {FaFilteredVouchers.length} voucher
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Trước
                  </button>
                  {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {typeModal.modal && (
        <Modal typeModal={typeModal} setTypeModal={setTypeModal} className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {CiEditingVoucher ? 'Chỉnh sửa Voucher' : 'Thêm Voucher Mới'}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã Voucher *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: SUMMER2024"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Voucher *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tên hiển thị của voucher"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại Giảm Giá *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="CiPercenFaTage">Giảm theo phần trăm (%)</option>
                    <option value="fixed">Giảm số tiền cố định (VNĐ)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá Trị Giảm *
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={formData.type === 'CiPercenFaTage' ? '10' : '50000'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá Trị Đơn Hàng Tối Thiểu
                  </label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="500000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm Giá Tối Đa
                  </label>
                  <input
                    type="number"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="100000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới Hạn Sử Dụng
                  </label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày Bắt Đầu *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày Kết Thúc *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô Tả
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mô tả chi tiết về voucher..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {CiEditingVoucher ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Voucher;