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
  FiEye,
  FiCheckCircle
} from 'react-icons/fi';
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaQuoteLeft
} from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const stats = [
    {
      icon: FiUsers,
      number: "50,000+",
      label: "Khách hàng tin tưởng",
    },
    {
      icon: FiAward,
      number: "200+",
      label: "Sản phẩm chất lượng",
    },
    {
      icon: FiTrendingUp,
      number: "98%",
      label: "Hài lòng tuyệt đối",
    },
    {
      icon: FiGlobe,
      number: "5",
      label: "Năm kinh nghiệm",
    }
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Đam mê âm nhạc",
      description: "Âm nhạc là ngôn ngữ của tâm hồn. Chúng tôi tận tâm mang đến những cung bậc cảm xúc chân thực nhất."
    },
    {
      icon: FiStar,
      title: "Chất lượng hàng đầu",
      description: "Từng sản phẩm được tuyển chọn khắt khe từ những nghệ nhân âm thanh danh tiếng trên toàn cầu."
    },
    {
      icon: FiShield,
      title: "Uy tín & Tin cậy",
      description: "Chúng tôi xây dựng thương hiệu dựa trên sự minh bạch và cam kết chất lượng trọn đời cho khách hàng."
    },
    {
      icon: FiUsers,
      title: "Tận tâm phục vụ",
      description: "Khách hàng là trung tâm của mọi quyết định. Chúng tôi luôn lắng nghe để hoàn thiện từng dịch vụ."
    }
  ];

  const team = [
    {
      name: "Nguyễn Minh Anh",
      role: "CEO & Founder",
      bio: "Tầm nhìn định hướng sự phát triển bền vững của thương hiệu.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Trần Thái Hoàng",
      role: "CTO",
      bio: "Đưa giải pháp âm thanh hiện đại vào trải nghiệm người dùng.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Lê Thu Hà",
      role: "Head of Design",
      bio: "Kiến tạo vẻ đẹp tinh tế cho từng điểm chạm thương hiệu.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Phạm Quốc Duy",
      role: "Sales Director",
      bio: "Xây dựng mối quan hệ tin cậy với đối tác toàn cầu.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Khởi nguồn SoundOra",
      description: "Sứ mệnh mang âm nhạc đỉnh cao đến gần hơn với cộng đồng."
    },
    {
      year: "2021",
      title: "Cột mốc 10k thành viên",
      description: "Sự ghi nhận quý giá từ những tâm hồn đồng điệu."
    },
    {
      year: "2022",
      title: "Showroom Signature",
      description: "Không gian trải nghiệm âm thanh chuẩn boutique tại TP.HCM."
    },
    {
      year: "2024",
      title: "Tầm nhìn tương lai",
      description: "Trở thành biểu tượng của sự tinh tế trong ngành âm thanh."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20 font-sans">

      {/* Hero Section: Refined Boutique Style */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white py-12 lg:py-0">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <motion.div
              className="lg:col-span-6 space-y-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-3 text-emerald-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="w-10 h-[1px] bg-emerald-700" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Thương hiệu di sản</span>
                </motion.div>
                <h1 className="text-4xl lg:text-5xl  tracking-tight leading-[1.2]">
                  Khai mở kỷ nguyên <br />
                  <span className="italic text-emerald-800">Âm thanh Thuần khiết</span>
                </h1>
                <p className="text-xs lg:text-sm text-[#8C8C8C] max-w-md font-light leading-relaxed tracking-wide">
                  SoundOra không chỉ bán tai nghe, chúng tôi kiến tạo không gian tâm hồn thông qua những tuyệt tác âm thanh tinh tế nhất.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <button className="bg-emerald-900 text-white px-10 py-4 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-emerald-800 transition-all shadow-lg">
                  Khám phá BST
                </button>
                <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#2D2D2D] pb-1 hover:text-emerald-700 hover:border-emerald-700 transition-all">
                  Câu chuyện của chúng tôi <FiArrowRight />
                </button>
              </div>

              {/* Minimal Stats */}
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-[#F0EEE6]">
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl  text-emerald-900 leading-none">{stat.number}</p>
                    <p className="text-[9px] uppercase tracking-widest text-[#8C8C8C] font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 relative h-full flex items-center justify-center p-4 lg:p-0"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-sm overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-1">
                <div className="absolute inset-0 bg-[#F0EEE6]/30 z-0" />
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop"
                  alt="SoundOra Heritage"
                  className="relative z-10 w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-[#F0EEE6]/40 -z-10 rounded-sm" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-900/5 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Ethos: Minimal & Spacious */}
      <section className="py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-16">
            <motion.div {...fadeInUp} className="space-y-6">
              <FaQuoteLeft className="text-emerald-100 text-5xl mx-auto" />
              <p className="text-2xl lg:text-3xl  italic leading-relaxed text-[#2D2D2D]">
                "Chúng tôi tin rằng cái đẹp thực sự nằm ở sự giản đơn và sự chính xác tuyệt đối trong từng nốt nhạc."
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-[#E5E2D9]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C]">Triết lý SoundOra</span>
                <span className="w-12 h-[1px] bg-[#E5E2D9]" />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 text-left pt-10">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="space-y-4 group p-8 bg-white border border-[#F0EEE6] rounded-sm hover:border-emerald-700 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-500">
                    <v.icon size={18} />
                  </div>
                  <h3 className="text-lg ">{v.title}</h3>
                  <p className="text-xs text-[#8C8C8C] leading-relaxed font-light">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Journey: Boutique Timeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:sticky lg:top-32 h-fit space-y-6">
              <div className="flex items-center gap-2 text-emerald-700">
                <span className="w-8 h-[1px] bg-emerald-700" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Hành trình</span>
              </div>
              <h2 className="text-4xl  leading-tight">Dấu ấn <br />Phát triển</h2>
              <p className="text-xs text-[#8C8C8C] leading-relaxed max-w-xs font-light tracking-wide">
                Từ một ý tưởng nhỏ bé đến thương hiệu định hình phong cách sống hiện đại.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-0 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#F0EEE6]" />
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="relative pl-16 pb-20 group last:pb-0"
                >
                  <div className="absolute left-[21px] top-1 w-2 h-2 rounded-full bg-[#E5E2D9] group-hover:bg-emerald-700 group-hover:scale-150 transition-all" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{m.year}</span>
                    <h4 className="text-xl  text-[#2D2D2D]">{m.title}</h4>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed font-light tracking-wide max-w-lg">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Visionaries: Refined Team */}
      <section className="py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8C8C8C]">Đội ngũ kiến tạo</span>
            <h2 className="text-4xl "> Những Tâm hồn Đam mê</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {team.map((member, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-40 h-52 mx-auto mb-6 bg-white rounded-sm overflow-hidden p-1 border border-[#E5E2D9] group-hover:border-emerald-700 transition-all duration-500">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-bold tracking-tight uppercase">{member.name}</h4>
                <p className="text-[10px] text-emerald-700 font-bold tracking-widest uppercase mb-3 mt-1">{member.role}</p>
                <p className="text-[10px] text-[#8C8C8C] font-light leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Call to Action */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl  italic tracking-tight">Cùng kiến tạo những khoảnh khắc âm nhạc ý nghĩa.</h2>
            <p className="text-xs text-[#8C8C8C] font-light tracking-widest uppercase">Tham gia cộng đồng SoundOra ngay hôm nay.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 rounded-full border border-[#E5E2D9] flex items-center justify-center text-[#8C8C8C] group-hover:bg-emerald-900 group-hover:text-white group-hover:border-emerald-900 transition-all">
                <FiMail size={14} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">hello@soundora.vn</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 rounded-full border border-[#E5E2D9] flex items-center justify-center text-[#8C8C8C] group-hover:bg-emerald-900 group-hover:text-white group-hover:border-emerald-900 transition-all">
                <FiPhone size={14} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">1900 1234</span>
            </div>
          </div>

          <div className="pt-10 flex justify-center gap-6">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-[#E5E2D9] hover:text-emerald-900 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem]  text-emerald-900/[0.02] select-none pointer-events-none italic"
        >
          SoundOra
        </div>
      </section>

    </div>
  );
};

export default About;