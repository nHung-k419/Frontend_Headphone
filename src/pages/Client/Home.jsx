import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { TbBatteryCharging2 } from "react-icons/tb";
import { FiHeadphones } from "react-icons/fi";
import { RiColorFilterFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import ProductSeller from "../../components/ProductSeller";
const Home = () => {
  const [selected, setSelected] = useState("15-Hour Battery Life");
  const features = [
    "Tự do tinh chỉnh âm thanh theo phong cách riêng của bạn",
    "Thời lượng pin lên đến 15 giờ",
    "Nghe nhạc & gọi điện dễ dàng",
    "Chất liệu vải thể thao bền bỉ",
    "Tùy chỉnh vừa vặn với mọi cỡ tai",
    "Gọn gàng và tiện lợi khi không sử dụng",
    "Lý tưởng cho luyện tập và di chuyển hằng ngày",
  ];
  return (
    <div>
      {/* <hr className="my-8 border-t-2 border-gray-300 max-w-7xl mx-auto w-full" /> */}
      {/* Info Section */}
      <Header />
      <section className="bg-gray-50 lg:w-full w-[380px] lg:ml-0 ml-1.5 max-h-full h-fit lg:mt-20 mt-10 ">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 place-items-center max-w-7xl mx-auto space-y-10 lg:pt-15 pt-10 pb-10">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
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
            className="lg:w-2/3 w-6/7 space-y-4"
          >
            <h1 className="text-2xl font-medium">Tổng quan</h1>
            <p className="font-light">
              Trải nghiệm âm thanh vượt trội với thiết kế hiện đại và công nghệ tiên tiến, mang đến sự thoải mái và chất lượng trong từng
              khoảnh khắc nghe nhạc.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.2,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.2,
                duration: 1,
              },
            }}
            className="lg:w-2/3 w-6/7 space-y-4"
          >
            <h1 className="text-2xl font-medium">Thoải mái</h1>
            <p className="font-light">
              Tai nghe được thiết kế nhẹ, đệm tai êm ái và ôm khít, giúp bạn sử dụng suốt cả ngày mà không gây khó chịu hay đau tai.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.3,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.3,
                duration: 1,
              },
            }}
            className="lg:w-2/3 w-6/7 space-y-4"
          >
            <h1 className="text-2xl font-medium">Thời lượng pin</h1>
            <p className="font-light">
              Sử dụng lâu dài với pin dung lượng cao, cho phép nghe nhạc hoặc đàm thoại liên tục trong nhiều giờ chỉ với một lần sạc.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.4,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.4,
                duration: 1,
              },
            }}
            className="lg:w-2/3 w-6/7 space-y-4"
          >
            <h1 className="text-2xl font-medium">Điểm nổi bật</h1>
            <p className="font-light">
              Âm thanh rõ nét, kết nối ổn định, thiết kế sang trọng – mọi yếu tố đều được tối ưu để mang lại trải nghiệm hoàn hảo cho bạn.
            </p>
          </motion.div>
        </div>
      </section>
      <ProductSeller />
      <article className="h-120 flex justify-center items-center lg:space-x-40 lg:w-full w-[380px]">
        <motion.div
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
          className="lg:order-first md:order-first order-last"
        >
          <img
            className="lg:w-70 w-30 hover:translate-y-[-10px] transition ease-in-out duration-400 cursor-pointer"
            src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
            alt=""
          />
        </motion.div>
        <div className="space-y-6 ml-5">
          <motion.h1
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
            className="font-medium text-3xl lg:w-full w-60"
          >
            Đắm chìm trong <br className="hidden lg:block" /> thế giới âm nhạc của riêng bạn
          </motion.h1>
          <motion.div
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
            className="flex space-x-5 items-center "
          >
            <span className="font-medium">$360</span>
            <span className="text-xs lg:block hidden">|</span>
            <span className="font-medium">Màu sắc</span>
            <div className="flex space-x-2 ">
              <button className="h-5 w-5 rounded-full bg-red-400 border-1 border-gray-700 "></button>
              <button className="h-5 w-5 rounded-full bg-blue-800"></button>
              <button className="h-5 w-5 rounded-full bg-teal-300"></button>
              <button className="h-5 w-5 rounded-full bg-cyan-400"></button>
            </div>
          </motion.div>
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
            className="font-light lg:w-100 w-40"
          >
            Trải nghiệm âm thanh sống động với thiết kế hiện đại, mang đến cảm giác thoải mái và chất lượng vượt trội. Sản phẩm được tối ưu
            cho cả âm nhạc và đàm thoại, giúp bạn tận hưởng từng khoảnh khắc theo cách riêng của mình.
          </motion.p>
          <motion.div
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
          >
            <button className="w-32 h-10  border-1 border-gray-600 rounded-3xl relative group overflow-hidden cursor-pointer">
              <span className="relative z-5 left-0 top-0 group-hover:text-white transition duration-600">Mua ngay</span>
              <span className="absolute left-0 top-0 w-full h-full bg-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
            </button>
          </motion.div>
        </div>
      </article>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:max-w-7xl lg:mx-auto lg:w-full w-[380px] mt-15 relative  ml-1.5 ">
        <motion.div
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
          className="w-full h-50 bg-white rounded-3xl shadow-sm space-y-3 p-10 cursor-pointer hover:shadow-xl"
        >
          <h1 className="font-medium text-xl"> Âm thanh hoàn hảo</h1>
          <p className="mb-10 font-light">Hãy tăng âm lượng và tận hưởng sự bùng nổ mạnh mẽ.</p>
          <a href="#" className="text-sm font-semibold underline mt-2 inline-block">
            Xem thêm
          </a>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
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
          className="w-full h-50 bg-white rounded-3xl shadow-xl space-y-3 p-10 cursor-pointer hover:shadow-xl "
        >
          <h1 className="font-medium text-xl">Chống ồn chủ động</h1>
          <p className="mb-10 font-light">Loại bỏ tiếng ồn, chỉ giữ lại điều bạn muốn nghe.</p>
          <a href="#" className="text-sm font-semibold underline mt-2 inline-block text-red-600">
            Xem thêm
          </a>
        </motion.div>
        <motion.div
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
          className="w-full h-50 bg-white rounded-3xl shadow-sm space-y-3 p-10 cursor-pointer hover:shadow-xl "
        >
          <h1 className="font-medium text-xl">Hỗ trợ Discord</h1>
          <p className="mb-10 font-light">Truyền tải âm thanh rõ ràng khi giao tiếp và chơi game.</p>
          <a href="#" className="text-sm font-semibold underline mt-2 inline-block">
            Xem thêm
          </a>
        </motion.div>
      </div>
      <article className="h-full mt-20 lg:w-full w-[380px]">
        <div className="flex justify-center lg:space-x-40">
          <motion.div
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
            className="space-y-6"
          >
            <h1 className="font-medium text-3xl ml-4">
              Kiểm soát âm thanh <br /> Với nhiều chế độ nghe linh hoạt
            </h1>
            <div className="flex flex-col gap-4 p-4 space-y-3">
              {features.map((feature) => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feature"
                    value={feature}
                    checked={selected === feature}
                    onChange={() => setSelected(feature)}
                    className="form-radio text-red-500 accent-red-500"
                  />
                  <span className="text-sm text-gray-800">{feature}</span>
                </label>
              ))}
            </div>
          </motion.div>
          <motion.div
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
          >
            <img
              className="lg:w-70 w-30 hover:translate-y-[-10px] transition ease-in-out duration-400 cursor-pointer"
              src="https://i.pinimg.com/736x/4d/f6/3a/4df63a6aa48b91a48d4df8a4e50f5fba.jpg"
              alt=""
            />
          </motion.div>
        </div>
      </article>
      <div className="max-w-7xl mx-auto mt-15 bg-white shadow-md rounded-2xl h-full lg:w-full w-[380px]">
        <div className="flex items-center justify-center">
          <div className="w-full lg:pt-12 pt-5">
            <h1 className="lg:text-5xl text-4xl font-bold lg:pl-0 pl-2 text-center">Đánh giá</h1>
          </div>
          {/* <div className="lg:w-1/3 w-1/2 lg:pl-10 lg:pt-12 pt-7">
            <span className="text-sm">
              these headphones keep your vibe going strong. With rich, immersive
              sound and a sleek design that fits your style, they're built to go
              wherever life takes you - no strings attached.
            </span>
          </div> */}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
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
            class="max-w-sm p-6 lg:ml-0 ml-1 bg-white rounded-3xl shadow-md space-y-4 mt-10"
          >
            <div class="flex items-center space-x-4">
              <img src="https://i.pravatar.cc/100" alt="Avatar" class="w-12 h-12 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-black">Nguyễn Ngọc Hùng</p>
                <p class="text-xs text-gray-400">Diễn viên</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              “Âm thanh cực kỳ trong trẻo, bass mạnh mẽ mà không bị ù. Đeo lâu không bị đau tai vì phần đệm rất mềm. Pin dùng được gần 2
              ngày liên tục, sạc nhanh trong vòng 1 tiếng là đầy. Rất hài lòng với mức giá này!”
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              y: {
                delay: 0.3,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.3,
                duration: 1,
              },
            }}
            class="max-w-sm p-6 lg:ml-0 ml-1 bg-white rounded-3xl shadow-md space-y-4 mt-10"
          >
            <div class="flex items-center space-x-4">
              <img src="https://i.pravatar.cc/100" alt="Avatar" class="w-12 h-12 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-black">Trần Thị Thanh Thảo</p>
                <p class="text-xs text-gray-400">Vận động viên</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              “Thiết kế đẹp, nhẹ và ôm tai chắc chắn. Mic thu âm khá rõ khi gọi điện hoặc chơi game. Tuy nhiên khi bật max volume thì âm
              treble hơi chói tai. Nhưng nhìn chung vẫn đáng mua, đặc biệt là cho nhu cầu học online hoặc làm việc.”
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </motion.div>
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
            class="max-w-sm p-6 lg:ml-0 ml-1 bg-white rounded-3xl shadow-md space-y-4 mt-10"
          >
            <div class="flex items-center space-x-4">
              <img src="https://i.pravatar.cc/100" alt="Avatar" class="w-12 h-12 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-black">Nguyễn Thị Mỹ Vi</p>
                <p class="text-xs text-gray-400">Giám đốc nhân sự</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              “Pin ổn, kết nối Bluetooth nhanh nhưng đôi lúc vẫn bị trễ 0.5s khi xem phim. Âm bass không quá nổi bật, ai thích EDM có thể sẽ
              thấy hơi thiếu lực. Được cái giá hợp lý, phù hợp để nghe nhạc nhẹ hoặc xem video hằng ngày.”
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </motion.div>
        </div>
        <div className="flex gap-5 justify-center items-center mt-11 pb-10">
          <button className="w-13 h-13 rounded-full bg-white shadow-md text-xl flex justify-center items-center cursor-pointer hover:text-white hover:bg-black transition duration-400">
            <IoArrowBack />
          </button>
          <button className="w-13 h-13 rounded-full bg-white shadow-md text-xl  flex justify-center items-center cursor-pointer hover:text-white hover:bg-black transition duration-400">
            <IoArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div>
          <img
            className="lg:w-full lg:h-85 w-full h-70 rounded-3xl object-cover"
            src="https://i.pinimg.com/736x/18/02/e1/1802e12fa83acb7b2d59b4ffce74ea3e.jpg"
            alt=""
          />
          <span className="absolute left-4 top-4 max-w-12 max-h-12 w-full h-full rounded-full bg-white flex justify-center items-center">
            <MdArrowOutward />
          </span>
          <span className="absolute left-7 lg:top-40 top-30 border-1 border-gray-400 rounded-full w-40 h-10 text-center leading-9 bg-gray-100 font-light">
            Weight only0.38lb
          </span>
          <span className="absolute left-7 lg:top-53 top-43 break-words whitespace-normal w-60 text-4xl font-medium">
            Multiple sound effect
          </span>
        </div>
        <div>
          <img
            className="lg:w-full lg:h-85 w-full h-70 rounded-3xl object-cover"
            src="https://i.pinimg.com/736x/d0/86/7c/d0867c3577f0a148da1e359fb301714f.jpg"
            alt=""
          />
        </div> */
}
