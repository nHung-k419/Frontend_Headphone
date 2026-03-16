import React from "react";
import { motion } from "framer-motion";
import { BsCart3, BsStar, BsStarFill, BsVolumeUp, BsLightning, BsShield, BsTruck, BsPlay, BsArrowRight } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { HiSpeakerWave, HiShieldCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";
// import Logitech_G_Pro from "../assets/Logitech_G_Pro.png";
import logitechImg from "../assets/Logitech_G_Pro_X.png";
import { getRoute } from "../helper/route";
const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden relative flex items-center">
      {/* Optimized Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[5%] -left-[5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[100px] will-change-transform" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[5%] -right-[5%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[80px] will-change-transform" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay" />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10" 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content side remains same layout, optimized transitions */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-teal-400 uppercase italic">Next-Gen Audio</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="block text-white">REDEFINE</span>
                <span className="block bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">YOUR SOUND.</span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
                Trải nghiệm kỷ nguyên âm thanh mới cùng <span className="text-white font-medium">Soundora Series X</span>. 
                Thiết kế tinh giản, hiệu năng bứt phá.
              </p>
            </motion.div>

            {/* Rest of the content with minor animation tweaks */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <Link to={getRoute("/Product")}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl overflow-hidden will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-3">
                  SỞ HỮU NGAY <FiArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
              </Link>

              <Link
               to="/Product"
                className="px-10 py-5 border border-white/10 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/5 transition-all flex items-center gap-3"
              >
                XEM CHI TIẾT <BsPlay className="w-6 h-6" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-6 border-t border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-[#0A0A0B] bg-gray-800" 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    alt="user" 
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0B] bg-teal-500 flex items-center justify-center text-[10px] font-bold">
                  +2K
                </div>
              </div>
              <div className="text-sm">
                <div className="flex text-teal-400 text-xs mb-1">
                  {[...Array(5)].map((_, i) => <BsStarFill key={i} />)}
                </div>
                <p className="text-gray-500 font-medium">Người dùng tin tưởng</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual (Optimized) */}
          <motion.div 
            variants={itemVariants}
            className="relative h-[500px] lg:h-[700px] flex items-center justify-center will-change-transform"
          >
            {/* Abstract Orb Background - Simplified Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-[110%] h-[110%] border border-white/5 rounded-full flex items-center justify-center will-change-transform"
              >
                <div className="w-2 h-2 bg-teal-500 rounded-full absolute top-0 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute bottom-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </motion.div>
              <div className="w-[85%] h-[85%] border border-white/5 rounded-full" />
            </div>

            {/* Main Image with static glow instead of heavy drop-shadow */}
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-md will-change-transform"
            >
              {/* Static Glow underneath (cheaper than dynamic drop-shadow) */}
              <div className="absolute inset-10 bg-teal-500/10 blur-[60px] rounded-full z-10" />
              <img 
                src={logitechImg} 
                alt="Logitech G Pro X" 
                className="w-full transform -rotate-12 select-none pointer-events-none" 
              />
              
              {/* Floating Stat Cards (Optimized positions and blurs) */}
              <motion.div 
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -right-6 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl will-change-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/10 rounded-lg">
                    <BsLightning className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Latency</p>
                    <p className="text-base font-bold text-white">1.2ms</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 -left-12 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl will-change-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <HiSpeakerWave className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Drivers</p>
                    <p className="text-lg font-bold text-white">Pro-G 50</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Central Glow (Simplified) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-400/20 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator (Simplified) */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 pointer-events-none"
      >
        <div className="w-[1px] h-10 bg-white" />
        <span className="text-[7px] uppercase tracking-[0.4em] font-black">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Header;