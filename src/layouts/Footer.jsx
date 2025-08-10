import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div className=" max-w-7xl mx-auto h-full mt-10  text-black rounded-3xl px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:items-start">
          {/* Social + Title */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            {/* Social Icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <i className="fa-brands fa-dribbble">
                  <FaFacebook />
                </i>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <i className="fa-brands fa-facebook-f">
                  <FaSquareXTwitter />
                </i>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <i className="fa-brands fa-x-twitter">
                  <FaSquareInstagram />
                </i>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <i className="fa-brands fa-instagram">
                  <FaTiktok />
                </i>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-sm text-gray-400">
            {/* Column 1 */}
            <div>
              <h2 className="text-black font-semibold mb-4">Về chúng tôi</h2>
              <ul className="space-y-2">
               <li>Soundora Company</li>
                <li>152 - Nguyễn Bính - Tp Đà Nẵng</li>
                <li>098715243</li>
                <li>Soundora@gmail.com</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h2 className="text-black font-semibold mb-4">Trợ giúp & Thông tin</h2>
              <ul className="space-y-2">
                <li>Trung tâm trợ giúp</li>
                <li>Địa chỉ cửa hàng</li>
                <li>Chính sách bảo mật</li>
                <li>Bộ thu và bộ khuếch đại</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h2 className="text-black font-semibold mb-4">Công ty</h2>
              <ul className="space-y-2">
                <li>Soundora Company</li>
                <li>152 - Nguyễn Bính - Tp Đà Nẵng</li>
                <li>098715243</li>
                <li>Soundora@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="lg:text-[70px] font-bold pt-15 text-center text-2xl">
          <p className="font-serif">
            Soun<span className="text-teal-500">dora</span>
          </p>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
