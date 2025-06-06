import React, { useState } from "react";
import Shopnow from "../components/Shopnow";
import { MdArrowOutward } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { TbBatteryCharging2 } from "react-icons/tb";
import { FiHeadphones } from "react-icons/fi";
const Home = () => {
  const [selected, setSelected] = useState("15-Hour Battery Life");
  const features = [
    "Premium Sound With COustom EQ",
    "15-Hour Battery Life",
    "Music & Calls",
    "Fabrit Sport Cird",
    "Swith Fit",
    "Magetic Anap Lock",
    "Sweatproof",
  ];
  return (
    <div>
      {/* <hr className="my-8 border-t-2 border-gray-300 max-w-7xl mx-auto w-full" /> */}

      {/* Info Section */}
      <section className="bg-gray-50 w-full max-h-full h-fit lg:mt-20 mt-10">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 place-items-center max-w-7xl mx-auto space-y-10 lg:pt-15 pt-10 pb-10">
          <div className="w-2/3 space-y-4">
            <h1 className="text-2xl font-medium">Overview</h1>
            <p className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit , sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
          </div>
          <div className="w-2/3 space-y-4">
            <h1 className="text-2xl font-medium">Comfortable</h1>
            <p className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
          </div>
          <div className="w-2/3 space-y-4">
            <h1 className="text-2xl font-medium">Battery</h1>
            <p className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
          </div>
          <div className="w-2/3 space-y-4">
            <h1 className="text-2xl font-medium">Highlights</h1>
            <p className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
          </div>
        </div>
      </section>
      <article className="h-120 flex justify-center items-center lg:space-x-40">
          <div>
            <img
              className="lg:w-70 w-30 hover:translate-y-[-10px] transition ease-in-out duration-400 cursor-pointer"
              src="https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg"
              alt=""
            />
          </div>
          <div className="space-y-6 ml-5">
            <h1 className="font-medium text-3xl lg:w-full w-60">
              Immerse Yourself in <br className="hidden lg:block" /> Your Music
            </h1>
            <div className="flex space-x-5 items-center ">
              <span className="font-medium">$360</span>
              <span className="text-xs lg:block hidden">|</span>
              <span className="font-medium">Color</span>
              <div className="flex space-x-2 ">
                <button className="h-5 w-5 rounded-full bg-red-400 border-1 border-gray-700 "></button>
                <button className="h-5 w-5 rounded-full bg-blue-800"></button>
                <button className="h-5 w-5 rounded-full bg-teal-300"></button>
                <button className="h-5 w-5 rounded-full bg-cyan-400"></button>
              </div>
            </div>
            <p className="font-light lg:w-100 w-40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
            <div>
              <button className="w-32 h-10 text-red-500 border-1 border-red-500 rounded-3xl relative group overflow-hidden cursor-pointer">
                <span className="relative z-10 left-0 top-0 group-hover:text-white transition duration-600">
                  Buy Now
                </span>
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-red-500 to-red-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
              </button>
            </div>
          </div>

      </article>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:max-w-7xl lg:mx-auto max-w-xs mx-auto mt-15 relative">
        <div className="w-full h-50 bg-white rounded-3xl shadow-sm space-y-3 p-10 cursor-pointer hover:shadow-xl transition ease-in-out duration-200">
          <h1 className="font-medium text-xl">Perfect Sound</h1>
          <p className="mb-10 font-light">Make it loud. Embrace bold</p>
          <a
            href="#"
            className="text-sm font-semibold underline mt-2 inline-block"
          >
            Read More
          </a>
        </div>
        <div className="w-full h-50 bg-white rounded-3xl shadow-xl space-y-3 p-10 cursor-pointer hover:shadow-2xl transition ease-in-out duration-200">
          <h1 className="font-medium text-xl">Noise Cancelling</h1>
          <p className="mb-10 font-light">Make it loud. Embrace bold</p>
          <a
            href="#"
            className="text-sm font-semibold underline mt-2 inline-block text-red-600"
          >
            Read More
          </a>
        </div>
        <div className="w-full h-50 bg-white rounded-3xl shadow-sm space-y-3 p-10 cursor-pointer hover:shadow-xl transition ease-in-out duration-200">
          <h1 className="font-medium text-xl">Discord</h1>
          <p className="mb-10 font-light">Make it loud. Embrace bold</p>
          <a
            href="#"
            className="text-sm font-semibold underline mt-2 inline-block"
          >
            Read More
          </a>
        </div>
      </div>
      <article className="h-full mt-20">
        <div className="flex items-center justify-center lg:space-x-40">
          <div className="space-y-6">
            <h1 className="font-medium text-3xl ml-4">
              Control Your Sound With <br /> Listening Modes
            </h1>
            <div className="flex flex-col gap-4 p-4 space-y-3">
              {features.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-2 cursor-pointer"
                >
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
          </div>
          <div>
            <img
              className="lg:w-70 w-30 hover:translate-y-[-10px] transition ease-in-out duration-400 cursor-pointer"
              src="https://i.pinimg.com/736x/4d/f6/3a/4df63a6aa48b91a48d4df8a4e50f5fba.jpg"
              alt=""
            />
          </div>
        </div>
      </article>
      <div className="max-w-7xl mx-auto mt-15 bg-gray-100 rounded-2xl h-full">
        <div className="flex justify-around">
          <div className="w-1/2 pt-12">
            <h1 className="text-6xl font-medium">
              Trusted by more than 120k People
            </h1>
          </div>
          <div className="w-1/3 pl-10 pt-12">
            <span className="text-sm">
              these headphones keep your vibe going strong. With rich, immersive
              sound and a sleek design that fits your style, they're built to go
              wherever life takes you - no strings attached.
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5 max-w-6xl mx-auto">
          <div class="max-w-sm p-6 bg-white rounded-3xl shadow-md space-y-4 mt-10">
            <div class="flex items-center space-x-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="Avatar"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="text-sm font-semibold text-black">Alexander Drox</p>
                <p class="text-xs text-gray-400">Headphone lovers</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              these headphones keep your vibe going strong. With rich, immersive
              sound and a sleek design that fits your style, they’re built to go
              wherever life takes you—no strings attached. keep your vibe going
              strong. With rich, immersive sound and a sleek design that fits
              your style
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </div>
          <div class="max-w-sm p-6 bg-white rounded-3xl shadow-md space-y-4 mt-10">
            <div class="flex items-center space-x-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="Avatar"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="text-sm font-semibold text-black">Alexander Drox</p>
                <p class="text-xs text-gray-400">Headphone lovers</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              these headphones keep your vibe going strong. With rich, immersive
              sound and a sleek design that fits your style, they’re built to go
              wherever life takes you—no strings attached. keep your vibe going
              strong. With rich, immersive sound and a sleek design that fits
              your style
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </div>
          <div class="max-w-sm p-6 bg-white rounded-3xl shadow-md space-y-4 mt-10">
            <div class="flex items-center space-x-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="Avatar"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="text-sm font-semibold text-black">Alexander Drox</p>
                <p class="text-xs text-gray-400">Headphone lovers</p>
              </div>
            </div>

            <p class="text-sm text-gray-700 leading-relaxed">
              these headphones keep your vibe going strong. With rich, immersive
              sound and a sleek design that fits your style, they’re built to go
              wherever life takes you—no strings attached. keep your vibe going
              strong. With rich, immersive sound and a sleek design that fits
              your style
            </p>

            <div class="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div class="flex items-center text-sm text-black space-x-1">
                <span>★</span>
                <span>(4.9)</span>
              </div>
              <div class="text-gray-400 text-lg">❝</div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center mt-11 ">
          <button className="w-13 h-13 rounded-full bg-white text-xl flex justify-center items-center cursor-pointer hover:text-white hover:bg-black transition duration-400">
            <IoArrowBack />
          </button>
          <button className="w-13 h-13 rounded-full bg-white text-xl  flex justify-center items-center cursor-pointer hover:text-white hover:bg-black transition duration-400">
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
