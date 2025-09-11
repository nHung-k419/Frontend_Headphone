import React, { useState } from 'react';
import { 
  IoChevronDown, 
  IoChevronUp, 
  IoHelpCircle, 
  IoCall, 
  IoMail, 
  IoTime, 
  IoChatbubble 
} from 'react-icons/io5';

const FAQPage = () => {
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
      answer: "Để tạo tài khoản mới, bạn chỉ cần nhấp vào nút 'Đăng ký' ở góc trên bên phải của trang web. Điền đầy đủ thông tin cá nhân, xác nhận email và bạn có thể bắt đầu sử dụng dịch vụ ngay lập tức."
    },
    {
      question: "Tôi có thể thay đổi thông tin cá nhân không?",
      answer: "Có, bạn hoàn toàn có thể thay đổi thông tin cá nhân bất kỳ lúc nào. Truy cập vào phần 'Hồ sơ cá nhân' trong tài khoản của bạn, chỉnh sửa thông tin cần thiết và lưu lại."
    },
    {
      question: "Các phương thức thanh toán nào được hỗ trợ?",
      answer: "Chúng tôi hỗ trợ nhiều phương thức thanh toán bao gồm: thẻ tín dụng/ghi nợ (Visa, Mastercard), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán khi nhận hàng (COD)."
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Thời gian giao hàng phụ thuộc vào địa điểm của bạn. Trong nội thành các thành phố lớn: 1-2 ngày. Ngoại thành và tỉnh thành khác: 2-5 ngày làm việc. Chúng tôi sẽ thông báo cụ thể khi bạn đặt hàng."
    },
    {
      question: "Làm thế nào để theo dõi đơn hàng?",
      answer: "Sau khi đặt hàng thành công, bạn sẽ nhận được mã theo dõi qua email hoặc SMS. Bạn có thể nhập mã này vào phần 'Theo dõi đơn hàng' trên website để xem tình trạng giao hàng realtime."
    },
    {
      question: "Chính sách đổi trả như thế nào?",
      answer: "Bạn có thể đổi/trả hàng trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện sản phẩm chưa sử dụng, còn nguyên tem mác và bao bì. Chi phí vận chuyển đổi trả sẽ được chúng tôi hỗ trợ nếu lỗi từ phía nhà bán."
    },
    {
      question: "Tôi quên mật khẩu thì phải làm sao?",
      answer: "Nhấp vào 'Quên mật khẩu' tại trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu đến email của bạn. Kiểm tra cả hộp thư spam nếu không thấy email trong hộp thư chính."
    },
    {
      question: "Có chương trình khuyến mãi nào không?",
      answer: "Chúng tôi thường xuyên có các chương trình khuyến mãi hấp dẫn như giảm giá theo mùa, ưu đãi thành viên, mã giảm giá cho lần mua đầu tiên. Đăng ký nhận tin để không bỏ lỡ những ưu đãi tốt nhất!"
    }
  ];

  const contactInfo = [
    {
      icon: IoCall,
      title: "Hotline",
      content: "1900 1234",
      description: "Hỗ trợ 24/7",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: IoMail,
      title: "Email",
      content: "support@company.vn",
      description: "Phản hồi trong 2h",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: IoTime,
      title: "Giờ làm việc",
      content: "8:00 - 22:00",
      description: "Thứ 2 - Chủ nhật",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-20">
      {/* Header */}
      <div className="bg-white shadow-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                <IoHelpCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến nhất. 
              Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Danh sách câu hỏi</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
            
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2">
                    {openItems[index] ? (
                      <IoChevronUp className="w-5 h-5 text-white transform transition-transform duration-300" />
                    ) : (
                      <IoChevronDown className="w-5 h-5 text-white transform transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="h-px bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 mb-6"></div>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IoCall className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Cần Hỗ Trợ Thêm?
                  </h2>
                  <p className="text-gray-600">
                    Đội ngũ chăm sóc khách hàng luôn sẵn sàng giúp bạn
                  </p>
                </div>
                
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <div key={index} className="group cursor-pointer">
                        <div className="flex items-center space-x-4 p-5 rounded-xl bg-gray-50 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 border border-transparent group-hover:border-blue-200">
                          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                              {contact.title}
                            </h3>
                            <p className="font-medium text-gray-700 mb-1">
                              {contact.content}
                            </p>
                            <p className="text-sm text-gray-500">
                              {contact.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-3">Vẫn chưa tìm thấy câu trả lời?</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Liên hệ trực tiếp với chúng tôi để được hỗ trợ tận tình và nhanh chóng nhất
                  </p>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Liên Hệ Ngay
                  </button>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <IoHelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Company Name</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến dịch vụ tốt nhất và hỗ trợ khách hàng 24/7
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 Company Name. Tất cả quyền được bảo lưu.
              </p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default FAQPage;