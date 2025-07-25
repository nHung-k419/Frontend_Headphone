import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";
const About = () => {
  const services = [
    {
      title: "Ra đời thương hiệu (2008)",
      description:
        "Khởi đầu với sứ mệnh mang đến trải nghiệm âm thanh chân thực, chúng tôi cho ra đời dòng tai nghe đầu tiên – mở ra một hành trình đột phá trong công nghệ âm thanh.",
      icon: "📍",
      active: true,
    },
    {
      title: "Tai nghe không dây đầu tiên (2012)",
      description: "Đánh dấu bước chuyển mình sang công nghệ không dây, mang đến sự tự do và tiện lợi cho người dùng toàn cầu.",
      icon: "🎧",
      active: false,
    },
    {
      title: "Ra mắt công nghệ chống ồn chủ động (2016)",
      description: "Chúng tôi giới thiệu công nghệ chống ồn chủ động (ANC), giúp người dùng đắm chìm hoàn toàn vào thế giới âm nhạc – không bị xao nhãng.",
      icon: "🔊",
      active: false,
    },
    {
      title: "Mở rộng toàn cầu (2019)",
      description: "Thương hiệu tai nghe của chúng tôi đã có mặt tại hơn 50 quốc gia, nhận được sự tin tưởng từ hàng triệu khách hàng yêu âm nhạc.",
      icon: "🌍",
      active: false,
    },
    {
      title: "Ứng dụng AI cá nhân hóa âm thanh (2023)",
      description: "Chúng tôi tích hợp AI để tự động điều chỉnh âm thanh theo gu nghe nhạc của từng người dùng – nâng tầm trải nghiệm cá nhân.",
      icon: "🧠",
      active: false,
    },
    {
      title: "Tai nghe thể thao chống nước cao cấp (2025)",
      description: "Ra mắt dòng sản phẩm thể thao chống nước, thiết kế siêu bền – đồng hành cùng bạn trên mọi hành trình vận động.",
      icon: "🚀",
      active: false,
    },
  ];
  return (
    <section className=" max-w-7xl mx-auto lg:mt-30 mt-10 lg:w-full h-full w-[380px]">
      <section className="bg-gray-50">
        <div className="grid lg:grid-cols-2 grid-cols-1 space-x-4 max-w-6xl mx-auto pb-10 ">
          <div>
            <motion.button
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.1,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.1,
                  duration: 1,
                },
              }}
              className="w-40 h-10 border-2 border-gray-400 rounded-full mt-10"
            >
              🏢 VỀ CHÚNG TÔI
            </motion.button>
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.2,
                  duration: 1,
                },
              }}
              className="text-5xl mt-5 "
            >
              Giới thiệu về công ty
            </motion.h1>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.3,
                  duration: 1,
                },
              }}
              className="mt-3 text-gray-500"
            >
              Tại công ty của chúng tôi, chúng tôi tự hào mang đến các giải pháp được cá nhân hóa, giúp doanh nghiệp phát triển mạnh mẽ. Với
              nhiều năm kinh nghiệm trong ngành, chúng tôi thấu hiểu những nhu cầu riêng biệt của từng khách hàng và luôn cam kết mang lại
              dịch vụ xuất sắc – yếu tố tạo nên sự khác biệt cho chúng tôi.
            </motion.p>
            <div className="flex space-x-3">
              <motion.button
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  x: {
                    delay: 0.4,
                    type: "spring",
                    stiffness: 60,
                  },
                  opacity: {
                    delay: 0.4,
                    duration: 1,
                  },
                }}
                className="bg-teal-500 text-white w-40 h-12 rounded-full mt-7"
              >
                🚀 Bắt đầu ngay →
              </motion.button>
              <motion.button
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  x: {
                    delay: 0.4,
                    type: "spring",
                    stiffness: 60,
                  },
                  opacity: {
                    delay: 0.4,
                    duration: 1,
                  },
                }}
                className="w-30 h-12 border-2 border-teal-500 text-teal-500 rounded-full mt-7"
              >
                Free trial
              </motion.button>
            </div>
            <hr className="border-t-1 border-gray-400 w-full mt-10 mx-auto" />
            <div className="flex justify-center lg:items-center mt-10">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  y: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 60,
                  },
                  opacity: {
                    delay: 0.5,
                    duration: 1,
                  },
                }}
              >
                <h1 className="text-5xl">95%</h1>
                <span className="w-1 text-gray-400">Mức độ hài lòng tuyệt đối từ khách hàng</span>
              </motion.div>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  y: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 60,
                  },
                  opacity: {
                    delay: 0.6,
                    duration: 1,
                  },
                }}
              >
                <h1 className="text-5xl">10+</h1>
                <span className="w-1 text-gray-400">Giải pháp đổi mới & tầm nhìn chiến lược</span>
              </motion.div>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  y: {
                    delay: 0.7,
                    type: "spring",
                    stiffness: 60,
                  },
                  opacity: {
                    delay: 0.7,
                    duration: 1,
                  },
                }}
              >
                <h1 className="text-5xl">$10m</h1>
                <span className="w-1 text-gray-400">Chiến lược tài chính hiệu quả cao</span>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.1,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.1,
                duration: 1,
              },
            }}
            className="mt-10 lg:ml-10"
          >
            <img
              className="h-116 w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/736x/38/d5/64/38d564e91b64bc0258896e35c8df359e.jpg"
              alt=""
            />
          </motion.div>
        </div>
      </section>
      <section className="mt-10">
        <div className="grid lg:grid-cols-2 max-w-6xl mx-auto pb-10 ">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.1,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.1,
                duration: 1,
              },
            }}
            className="mt-10 lg:order-first order-last lg:ml-10"
          >
            <img
              className="h-116 w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/736x/1d/b0/39/1db0395bbf5a6c4cb8f2766673ce9009.jpg"
              alt=""
            />
          </motion.div>
          <div className="lg:ml-10">
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.1,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.1,
                  duration: 1,
                },
              }}
              className="w-40 h-10 border-2 border-gray-400 rounded-full mt-10"
            >
              🏢 VỀ CHÚNG TÔI
            </motion.button>
            <motion.h1
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.2,
                  duration: 1,
                },
              }}
              className="text-4xl mt-5 "
            >
              Khai phóng chuyên môn – Thúc đẩy thành công trên mọi lĩnh vực
            </motion.h1>
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.3,
                  duration: 1,
                },
              }}
              className="mt-5 text-gray-500"
            >
              Tại công ty của chúng tôi, chúng tôi tự hào cung cấp các giải pháp được thiết kế riêng, giúp doanh nghiệp phát triển bền vững.
              Với nhiều năm kinh nghiệm trong ngành, chúng tôi thấu hiểu những nhu cầu đặc thù của từng khách hàng và luôn cam kết mang đến
              dịch vụ xuất sắc – điều làm nên sự khác biệt của chúng tôi.
            </motion.p>
            {/* <div className="flex space-x-3 mt-10 lg:block hidden">
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <IoMdCheckmark />
                  </span>
                  <span className="">
                    Highly efficient financial strategies
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto">
        <div>
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.1,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.1,
                duration: 1,
              },
            }}
            className="w-40 h-10 border-2 border-gray-400 rounded-full mt-10"
          >
            🏁 CÁC CỘT MỐC
          </motion.button>
          <div className="lg:flex lg:justify-between mt-5 items-center">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.2,
                  duration: 1,
                },
              }}
              className="text-4xl"
            >
              Hành trình của chúng tôi: Những dấu ấn quan trọng và thành tựu nổi bật
            </motion.h1>
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                x: {
                  delay: 0.2,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: 0.2,
                  duration: 1,
                },
              }}
              className="text-gray-400 lg:w-1/2 lg:mt-0 mt-3"
            >
              Khám phá các cột mốc đã định hình nên thương hiệu tai nghe của chúng tôi. Mỗi bước tiến là minh chứng cho cam kết về chất
              lượng, đổi mới và trải nghiệm âm thanh đỉnh cao.
            </motion.p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 pb-5">
          {services.map((service, index) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                y: {
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 60,
                },
                opacity: {
                  delay: index * 0.2,
                  duration: 1,
                },
              }}
              key={index}
              className={`rounded-2xl p-6 shadow-md  h-60 ${service.active ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-900"}`}
            >
              <div
                className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
                  service.active ? "bg-white/20" : "bg-blue-100 text-teal-500"
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default About;
