import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoChevronDown, 
  IoHelpCircleOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoTimeOutline
} from 'react-icons/io5';

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "Làm thế nào để tạo tài khoản mới?",
      answer: "Để tạo tài khoản mới, bạn chỉ cần nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang web. Điền đầy đủ thông tin cá nhân, xác nhận email và bạn có thể bắt đầu sử dụng dịch vụ ngay lập tức.",
      category: "Tài khoản"
    },
    {
      question: "Tôi có thể thay đổi thông tin cá nhân không?",
      answer: "Có, bạn hoàn toàn có thể thay đổi thông tin cá nhân bất kỳ lúc nào. Truy cập vào phần 'Hồ sơ cá nhân' trong tài khoản của bạn, chỉnh sửa thông tin cần thiết và lưu lại.",
      category: "Tài khoản"
    },
    {
      question: "Tôi quên mật khẩu thì phải làm sao?",
      answer: "Nhấp vào 'Quên mật khẩu' tại trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu đến email của bạn. Kiểm tra cả hộp thư spam nếu không thấy email trong hộp thư chính.",
      category: "Tài khoản"
    },
    {
      question: "Các phương thức thanh toán nào được hỗ trợ?",
      answer: "Chúng tôi hỗ trợ nhiều phương thức thanh toán bao gồm: thẻ tín dụng/ghi nợ (Visa, Mastercard), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán khi nhận hàng (COD).",
      category: "Thanh toán"
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Thời gian giao hàng phụ thuộc vào địa điểm của bạn. Trong nội thành các thành phố lớn: 1-2 ngày. Ngoại thành và tỉnh thành khác: 2-5 ngày làm việc. Chúng tôi sẽ thông báo cụ thể khi bạn đặt hàng.",
      category: "Giao hàng"
    },
    {
      question: "Làm thế nào để theo dõi đơn hàng?",
      answer: "Sau khi đặt hàng thành công, bạn sẽ nhận được mã theo dõi qua email hoặc SMS. Bạn có thể nhập mã này vào phần 'Theo dõi đơn hàng' trên website để xem tình trạng giao hàng realtime.",
      category: "Giao hàng"
    },
    {
      question: "Chính sách đổi trả như thế nào?",
      answer: "Bạn có thể đổi/trả hàng trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện sản phẩm chưa sử dụng, còn nguyên tem mác và bao bì. Chi phí vận chuyển đổi trả sẽ được chúng tôi hỗ trợ nếu lỗi từ phía nhà bán.",
      category: "Chính sách"
    },
    {
      question: "Có chương trình khuyến mãi nào không?",
      answer: "Chúng tôi thường xuyên có các chương trình khuyến mãi hấp dẫn như giảm giá theo mùa, ưu đãi thành viên, mã giảm giá cho lần mua đầu tiên. Đăng ký nhận tin để không bỏ lỡ những ưu đãi tốt nhất!",
      category: "Chính sách"
    }
  ];

  const categories = ['Tất cả', 'Tài khoản', 'Thanh toán', 'Giao hàng', 'Chính sách'];

  const filteredFaqs = activeTab === 'Tất cả' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeTab);

  const contactInfo = [
    { icon: IoCallOutline, title: "Hotline", content: "1900 1234", desc: "Hỗ trợ 24/7" },
    { icon: IoMailOutline, title: "Email", content: "support@company.vn", desc: "Phản hồi trong 2h" },
    { icon: IoTimeOutline, title: "Giờ làm việc", content: "8:00 - 22:00", desc: "Thứ 2 - Chủ nhật" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase mb-4 block">
            HỖ TRỢ KHÁCH HÀNG
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Khám phá các câu trả lời cho những thắc mắc phổ biến nhất của bạn. Nếu vẫn cần trợ giúp, đừng ngần ngại liên hệ trực tiếp với chúng tôi.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main FAQ Content */}
          <div className="lg:w-2/3 w-full">
            {/* Category Tabs */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === category
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* FAQ List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq) => {
                  // Find the actual index in the original array to keep state consistent across tab switches
                  const actualIndex = faqData.findIndex(item => item.question === faq.question);
                  const isOpen = openItems[actualIndex];

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      key={faq.question}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <button
                        onClick={() => toggleItem(actualIndex)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <span className={`text-base font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-emerald-700' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                          <IoChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-50 mx-6">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Không tìm thấy câu hỏi nào trong danh mục này.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact Information */}
          <motion.div 
            className="lg:w-1/3 w-full lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Contact Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <IoHelpCircleOutline className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cần hỗ trợ thêm?</h3>
                  <p className="text-sm text-gray-500">Chúng tôi luôn sẵn sàng giúp đỡ.</p>
                </div>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{info.title}</p>
                        <p className="text-base font-semibold text-gray-900 mt-0.5">{info.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{info.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                <IoMailOutline className="w-5 h-5" />
                Gửi yêu cầu ngay
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default FAQPage;