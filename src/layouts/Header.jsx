import React from "react";
import { motion } from "framer-motion";
import { BsCart3, BsStar, BsStarFill, BsVolumeUp, BsLightning, BsShield, BsTruck, BsPlay, BsArrowRight } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { HiSpeakerWave, HiShieldCheck } from "react-icons/hi2";
// import Logitech_G_Pro from "../assets/Logitech_G_Pro.png";
import logitechImg from "../assets/Logitech_G_Pro_X.png";
const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Hiệu ứng gợn sóng cho background - chỉ xuất hiện khi chuyển trang
  const rippleVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 2, 3],
      opacity: [0.6, 0.3, 0],
      transition: {
        duration: 3,
        ease: "easeOut",
      },
    },
  };

  const rippleVariants2 = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 2.5, 4],
      opacity: [0.4, 0.2, 0],
      transition: {
        duration: 3.5,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const rippleVariants3 = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.8, 2.8],
      opacity: [0.5, 0.25, 0],
      transition: {
        duration: 4,
        ease: "easeOut",
        delay: 1,
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white overflow-hidden relative">
      {/* Background Decorative Elements với hiệu ứng gợn sóng */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0">
        {/* Gợn sóng 1 */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-200/20 rounded-full"
          variants={rippleVariants}
          animate="animate"
        />
        
        {/* Gợn sóng 2 */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-200/15 rounded-full"
          variants={rippleVariants2}
          animate="animate"
        />
        
        {/* Gợn sóng 3 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-300/10 rounded-full"
          variants={rippleVariants3}
          animate="animate"
        />

        {/* Các elements background cũ được giữ nguyên */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-200/30 rounded-full blur-xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-300/20 rounded-full blur-lg"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </motion.div>

      <motion.div className="container mx-auto px-4 py-16 relative z-5" variants={containerVariants} initial="hidden" animate="visible">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            {/* <motion.div 
              className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-200 rounded-full px-4 py-2 text-teal-700"
              whileHover={{ scale: 1.05 }}
            >
              <BsLightning className="w-4 h-4" />
              <span className="text-sm font-medium">Công Nghệ Mới Nhất</span>
            </motion.div> */}

            {/* Main Title */}
            <motion.div className="space-y-10 mt-20">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-white">"Soundora </span>
                {/* <br /> */}
                <span className="text-white">– Trải nghiệm không giới hạn"</span>
              </h1>
              <p className="text-md text-white max-w-lg">
                🎧 "Thưởng thức âm nhạc mỗi ngày với mẫu tai nghe mới đầy phong cách và thoải mái." Thể hiện cá tính, truyền cảm hứng, tái
                hiện âm thanh sống động.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div className="grid grid-cols-3 gap-6" variants={itemVariants}>
              {[
                { icon: HiSpeakerWave, label: "Hi-Fi Audio", desc: "Âm thanh siêu nét" },
                { icon: HiShieldCheck, label: "Bảo Hành", desc: "2 năm chính hãng" },
                { icon: BsTruck, label: "Miễn Phí", desc: "Giao hàng 24h" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.label}</h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Price & CTA */}
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-teal-600">2.990.000₫</span>
                <span className="text-2xl text-gray-400 line-through">3.490.000₫</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">-15%</span>
              </div> */}

              {/* <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600">(1,245 đánh giá)</span>
              </div> */}

              <div className="flex gap-4">
                <motion.button
                  className="bg-white text-black px-8 py-4 rounded-2xl font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BsCart3 className="w-5 h-5" />
                  Mua Ngay
                </motion.button>

                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiArrowRight className="w-5 h-5" />
                  <span>Khám phá ngay</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div className="relative flex items-center justify-center " variants={itemVariants}>
            <motion.div className="relative z-5 w-80 select-none" animate={floatAnimation} >
              <img src={logitechImg} alt="" />
            </motion.div>
            <motion.div
              className="absolute top-10 right-10 bg-white rounded-2xl p-4 shadow-lg"
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Đang kết nối...</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute top-80 right-[-40px] bg-white rounded-2xl p-4 shadow-lg"
              animate={{
                y: [-30, 30, -30],
                x : [-5, 5, -5],
                rotate: [0, 7, 0, -7, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex justify-center items-center bg-green-400 rounded-full "> <HiSpeakerWave/></div>
                <span className="text-sm font-medium text-gray-700">Âm thanh sống động</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-10 bg-white rounded-2xl p-4 shadow-lg"
              animate={{
                y: [20, -20, 20],
                rotate: [0, -3, 0, 3, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">40h</div>
                <div className="text-sm text-gray-600">Pin</div>
              </div>
            </motion.div>
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-teal-200/40 via-transparent to-transparent rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Bottom Stats */}
        {/* <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-15 pt-16 border-t border-teal-200" variants={itemVariants}>
          {[
            { step: "01", title: "Chọn Sản Phẩm", desc: "Duyệt hàng ngàn sản phẩm chất lượng." },
            { step: "02", title: "Thanh Toán", desc: "Bảo mật, nhanh chóng, nhiều phương thức." },
            { step: "03", title: "Vận Chuyển", desc: "Giao hàng tận nơi, an toàn, đúng hẹn." },
            { step: "04", title: "Hậu Mãi", desc: "Hỗ trợ đổi trả, bảo hành 24/7." },
          ].map((item, index) => (
            <motion.div key={index} className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-4xl font-bold text-yellow-300">{item.step}</div>
              <h3 className="text-lg text-white mt-2">{item.title}</h3>
              <p className="text-white">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Header;