import { HiMiniSpeakerWave } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineNotes } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Header = () => {
  const [actionImage, setActionImage] = useState("");
  const listActionImages = [
    {
      id: 1,
      url: "https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/736x/d7/cd/ec/d7cdec94bb1a046f03e1ac36fbd7b7f6.jpg",
    },
    {
      id: 3,
      url: "https://i.pinimg.com/736x/4d/f6/3a/4df63a6aa48b91a48d4df8a4e50f5fba.jpg",
    },
  ];
  const handleActioneChangeImage = (id, urlImage) => {
    setActionImage(listActionImages.find((item) => item.id === id));
  };
  return (
    <div className="mt-20 px-4">
      <section className="grid lg:grid-cols-2 grid-cols-[3fr_2fr] max-w-7xl mx-auto lg:h-100">
        <div className="space-y-6 lg:pt-15 lg:ml-27 ml-0">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
            className="md:text-3xl lg:text-5xl text-2xl mt-5 font-bold text-black shimmer "
          >
            Trải nghiệm âm thanh <br /> của tương lai
          </motion.h1>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // viewport={{ once: true }}
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
            className="font-light"
          >
            🎧 "Thưởng thức âm nhạc mỗi ngày với mẫu tai nghe mới đầy phong cách và thoải mái." <br /> Thể hiện cá tính, truyền cảm hứng,
            tái hiện âm thanh sống động.
          </motion.p>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.2,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.3,
                duration: 1,
              },
            }}
            className="flex space-x-7"
          >
            <div className="flex items-center space-x-2">
              <HiMiniSpeakerWave className="text-emerald-500 text-xl" />
              <span>Âm thanh rõ nét</span>
            </div>
            <div className="flex items-center space-x-2">
              <GiSettingsKnobs className="text-emerald-500 text-xl" />
              <span>Thiết lập hiện đại nhất</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              x: {
                delay: 0.4,
                type: "spring",
                stiffness: 60,
              },
              opacity: {
                delay: 0.6,
                duration: 1,
              },
            }}
            className="flex space-x-4 lg:block sm:block hidden"
          >
            <button className="w-full lg:max-w-32 bg-gradient-to-r from-gray-600 to-[#1f1f1f] cursor-pointer rounded-md h-10 text-white relative pr-4 cursor-pointe ">
              Mua ngay
              <span className="absolute right-3 inline-flex pt-1 ">
                <MdArrowOutward />
              </span>
            </button>
            <button className="w-full  lg:max-w-32 bg-gray-300 rounded-md h-10 text-black font-medium relative pr-4 group overflow-hidden group-hover:text-white z-5 cursor-pointer">
              <span className="relative z-5 text-black group-hover:text-white transition duration-300">Xem thêm</span>
              <span className="absolute z-10 right-3 inline-flex pt-1 group-hover:text-white transition duration-300">
                <MdOutlineNotes />
              </span>
              <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
            </button>
          </motion.div>
        </div>
        <div className="flex justify-between items-center pt-15">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              x: {
                type: "spring",
                stiffness: 60,
              },
              opacity: { duration: 1 },
              ease: "easeIn",
              duration: 1,
            }}
          >
            <img
              className={`lg:w-70 lg:h-80 w-30 h-30 object-contain swing-y`}
              src={actionImage.url ? actionImage.url : "https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"}
              alt=""
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-13 h-60 flex flex-col items-center space-y-6 rounded-md"
          >
            {listActionImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2, // tạo hiệu ứng lần lượt
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <img
                  onClick={() => handleActioneChangeImage(item.id, item.url)}
                  className="w-15 h-15 object-contain cursor-pointer"
                  src={item.url}
                  alt=""
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="flex space-x-4 lg:hidden sm:hidden block">
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            x: {
              delay: 0.4,
              type: "spring",
              stiffness: 60,
            },
            opacity: {
              delay: 0.6,
              duration: 1,
            },
          }}
          className="w-full  lg:max-w-32 bg-gradient-to-r from-black to-gray-600 rounded-md h-10 text-white relative pr-4 cursor-pointe "
        >
          Buy Now
          <span className="absolute right-3 inline-flex pt-1 ">
            <MdArrowOutward />
          </span>
        </motion.button>
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            x: {
              delay: 0.4,
              type: "spring",
              stiffness: 60,
            },
            opacity: {
              delay: 0.6,
              duration: 1,
            },
          }}
          className="w-full  lg:max-w-32 bg-gray-300 rounded-md h-10 text-black font-medium relative pr-4 group overflow-hidden group-hover:text-white z-5 cursor-pointer"
        >
          <span className="relative z-5 text-black group-hover:text-white transition duration-300">See More</span>
          <span className="absolute z-10 right-3 inline-flex pt-1 group-hover:text-white transition duration-300">
            <MdOutlineNotes />
          </span>
          <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
