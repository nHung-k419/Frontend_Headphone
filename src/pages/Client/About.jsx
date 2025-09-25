import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeadphones, 
  FiAward, 
  FiUsers, 
  FiTrendingUp,
  FiHeart,
  FiStar,
  FiShield,
  FiTruck,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiPlay,
  FiTarget,
  FiEye
} from 'react-icons/fi';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook 
} from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stats = [
    {
      icon: FiUsers,
      number: "50,000+",
      label: "Khách hàng tin tưởng",
      color: "text-teal-600"
    },
    {
      icon: FiAward,
      number: "200+",
      label: "Sản phẩm chất lượng",
      color: "text-blue-600"
    },
    {
      icon: FiTrendingUp,
      number: "98%",
      label: "Hài lòng khách hàng",
      color: "text-green-600"
    },
    {
      icon: FiGlobe,
      number: "5",
      label: "Năm kinh nghiệm",
      color: "text-purple-600"
    }
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Đam mê âm nhạc",
      description: "Chúng tôi hiểu rằng âm nhạc là ngôn ngữ của trái tim và cam kết mang đến trải nghiệm âm thanh tuyệt vời nhất."
    },
    {
      icon: FiStar,
      title: "Chất lượng hàng đầu",
      description: "Mọi sản phẩm đều được tuyển chọn kỹ lưỡng từ những thương hiệu uy tín để đảm bảo chất lượng tối ưu."
    },
    {
      icon: FiShield,
      title: "Uy tín & Tin cậy",
      description: "Xây dựng niềm tin qua từng sản phẩm, từng dịch vụ và luôn đặt lợi ích khách hàng lên hàng đầu."
    },
    {
      icon: FiUsers,
      title: "Tập trung khách hàng",
      description: "Lắng nghe, thấu hiểu và đáp ứng mọi nhu cầu của khách hàng một cách tận tâm và chuyên nghiệp."
    }
  ];

  const team = [
    {
      name: "Nguyễn Minh Anh",
      role: "CEO & Founder",
      bio: "15 năm kinh nghiệm trong ngành công nghệ âm thanh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Trần Thái Hoàng",
      role: "CTO",
      bio: "Chuyên gia công nghệ với đam mê về innovation",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lê Thu Hà",
      role: "Head of Marketing",
      bio: "10 năm kinh nghiệm marketing trong lĩnh vực tech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Phạm Quốc Duy",
      role: "Head of Sales",
      bio: "Chuyên gia bán hàng với network rộng khắp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Thành lập SoundOra",
      description: "Ra mắt với sứ mệnh mang âm thanh chất lượng đến mọi người"
    },
    {
      year: "2020",
      title: "Mở rộng sản phẩm",
      description: "Bổ sung thêm 50+ mẫu tai nghe từ các thương hiệu nổi tiếng"
    },
    {
      year: "2021",
      title: "Đạt 10,000 khách hàng",
      description: "Cột mốc quan trọng đánh dấu sự tin tưởng của khách hàng"
    },
    {
      year: "2022",
      title: "Ra mắt showroom",
      description: "Khai trương showroom đầu tiên tại TP.HCM"
    },
    {
      year: "2023",
      title: "Mở rộng toàn quốc",
      description: "Phát triển hệ thống phân phối trên toàn quốc"
    },
    {
      year: "2024",
      title: "Đạt 50,000+ khách hàng",
      description: "Trở thành một trong những nhà bán lẻ tai nghe hàng đầu"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <motion.h2 
                  className="text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Chúng tôi là <motion.span 
                    className="text-yellow-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SoundOra
                  </motion.span>
                </motion.h2>
                <motion.p 
                  className="text-lg text-teal-100 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Đem đến cho bạn trải nghiệm âm thanh hoàn hảo với bộ sưu tập tai nghe cao cấp từ những thương hiệu hàng đầu thế giới.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.button 
                  className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlay className="w-5 h-5" />
                  <span>Xem video</span>
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiArrowRight className="w-5 h-5" />
                  <span>Khám phá ngay</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    variants={{
                      initial: { opacity: 0, y: 30 },
                      animate: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-yellow-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-teal-100">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 100, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop" 
                alt="SoundOra Headphones" 
                className="rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="flex -space-x-2"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.img 
                        key={i}
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1535713875002-d1d0cf377fde' : i === 2 ? '1494790108755-2616b612b786' : '1507003211169-0a1dd7228f2d'}?w=40&h=40&fit=crop&crop=face`}
                        className="w-8 h-8 rounded-full border-2 border-white" 
                        alt="User"
                        variants={{
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 }
                        }}
                        transition={{ delay: 1.8 + i * 0.1 }}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                      />
                    ))}
                  </motion.div>
                  <div>
                    <motion.div 
                      className="flex text-yellow-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 2.3 + i * 0.1 }}
                        >
                          <FiStar className="w-4 h-4 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.p 
                      className="text-sm text-gray-600 font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.8 }}
                    >
                      2,500+ đánh giá 5 sao
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <motion.div 
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex bg-gray-100 p-1 rounded-xl">
                {[
                  { key: 'mission', label: 'Sứ mệnh' },
                  { key: 'vision', label: 'Tầm nhìn' },
                  { key: 'values', label: 'Giá trị' }
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      activeTab === tab.key 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:text-teal-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <div className="text-center">
              <AnimatePresence mode="wait">
                {activeTab === 'mission' && (
                  <motion.div 
                    key="mission"
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <FiTarget className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl font-bold text-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Sứ mệnh của chúng tôi
                    </motion.h3>
                    <motion.p 
                      className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      SoundOra cam kết mang đến cho mọi người trải nghiệm âm thanh tuyệt vời nhất thông qua việc cung cấp những sản phẩm tai nghe chất lượng cao, dịch vụ tận tâm và giá cả hợp lý. Chúng tôi tin rằng âm nhạc có sức mạnh kết nối con người và tạo nên những khoảnh khắc đáng nhớ trong cuộc sống.
                    </motion.p>
                  </motion.div>
                )}

                {activeTab === 'vision' && (
                  <motion.div 
                    key="vision"
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <FiEye className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl font-bold text-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Tầm nhìn của chúng tôi
                    </motion.h3>
                    <motion.p 
                      className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Trở thành nhà cung cấp giải pháp âm thanh hàng đầu Việt Nam, được khách hàng tin tưởng và lựa chọn đầu tiên khi nghĩ đến tai nghe chất lượng. Chúng tôi hướng tới việc xây dựng một cộng đồng yêu âm nhạc, nơi mọi người có thể tìm thấy những sản phẩm phù hợp với đam mê và phong cách riêng.
                    </motion.p>
                  </motion.div>
                )}

                {activeTab === 'values' && (
                  <motion.div 
                    key="values"
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h3 
                      className="text-3xl font-bold text-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Giá trị cốt lõi
                    </motion.h3>
                    <motion.div 
                      className="grid md:grid-cols-2 gap-8"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {values.map((value, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-gray-50 p-6 rounded-xl text-left"
                          variants={{
                            initial: { opacity: 0, y: 30, scale: 0.9 },
                            animate: { opacity: 1, y: 0, scale: 1 }
                          }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <value.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h4>
                          <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Hành trình phát triển</h2>
              <p className="text-lg text-gray-600">Những cột mốc quan trọng trong quá trình xây dựng và phát triển SoundOra</p>
            </motion.div>

            <div className="relative">
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ originY: 0 }}
              ></motion.div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index} 
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  >
                    <motion.div 
                      className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                      >
                        <motion.div 
                          className="text-teal-600 font-bold text-lg mb-2"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                        >
                          {milestone.year}
                        </motion.div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.5 }}
                    ></motion.div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-lg text-gray-600">Những con người tài năng đằng sau thành công của SoundOra</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-teal-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  ></motion.div>
                </motion.div>
                <motion.h4 
                  className="text-xl font-semibold text-gray-800 mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {member.name}
                </motion.h4>
                <motion.p 
                  className="text-teal-600 font-medium mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  {member.role}
                </motion.p>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      {/* <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white overflow-hidden">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Kết nối với SoundOra
            </motion.h2>
            <motion.p 
              className="text-xl text-teal-100 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Có câu hỏi về sản phẩm hoặc muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { icon: FiPhone, text: "1900-1234" },
                { icon: FiMail, text: "hello@soundora.vn" },
                { icon: FiMapPin, text: "123 Nguyễn Văn Cừ, Q1, TP.HCM" }
              ].map((contact, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  variants={{
                    initial: { opacity: 0, x: -30 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                >
                  <contact.icon className="w-6 h-6" />
                  <span className="text-lg">{contact.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section> */}
    </div>
  );
};

export default About;