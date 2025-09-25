import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.4
      }
    }
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
      <motion.div 
        className="bg-white shadow-xl border-b border-gray-100"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                <IoHelpCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Câu Hỏi Thường Gặp
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến nhất. 
              Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Danh sách câu hỏi</h2>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.div>
            
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300"
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item.question}
                  </h3>
                  <motion.div 
                    className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2"
                    animate={{ rotate: openItems[index] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {openItems[index] ? (
                      <IoChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <IoChevronDown className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openItems[index] && (
                    <motion.div
                      initial={{ 
                        height: 0, 
                        opacity: 0,
                        y: -10
                      }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        y: 0
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        y: -10
                      }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <motion.div 
                          className="h-px bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 mb-6"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          style={{ originX: 0 }}
                        />
                        <motion.p 
                          className="text-gray-600 leading-relaxed text-base"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            variants={sidebarVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="sticky top-8 space-y-8">
              {/* Contact Info Card */}
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <IoCall className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Cần Hỗ Trợ Thêm?
                  </h2>
                  <p className="text-gray-600">
                    Đội ngũ chăm sóc khách hàng luôn sẵn sàng giúp bạn
                  </p>
                </motion.div>
                
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <motion.div 
                        key={index} 
                        className="group cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center space-x-4 p-5 rounded-xl bg-gray-50 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 border border-transparent group-hover:border-blue-200">
                          <motion.div 
                            className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center`}
                            whileHover={{ 
                              scale: 1.1,
                              rotate: 360
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>
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
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div 
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.6
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02
                }}
              >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                
                {/* Animated background elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 0.8, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />

                <div className="relative z-10">
                  <motion.h3 
                    className="font-bold text-xl mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    Vẫn chưa tìm thấy câu trả lời?
                  </motion.h3>
                  <motion.p 
                    className="text-blue-100 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 }}
                  >
                    Liên hệ trực tiếp với chúng tôi để được hỗ trợ tận tình và nhanh chóng nhất
                  </motion.p>
                  <motion.button 
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 1.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Liên Hệ Ngay
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;