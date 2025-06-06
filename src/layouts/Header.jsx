import { HiMiniSpeakerWave } from "react-icons/hi2";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineNotes } from "react-icons/md";
import { useState, useEffect } from "react";
const Header = () => {
  const [actionImage, setActionImage] = useState('');
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
const handleActioneChangeImage = (id,urlImage) => {
  setActionImage(listActionImages.find((item) => item.id === id))
}
console.log(actionImage);

  return (
    <div className="mt-20 px-4">
      <section className="grid lg:grid-cols-2 grid-cols-[3fr_2fr] max-w-7xl mx-auto lg:h-100">
        <div className="space-y-6 pt-15">
          <h1 className="md:text-3xl lg:text-5xl text-2xl mt-5 font-bold text-black shimmer ">
            Meet the sounds <br /> from the future
          </h1>
          <p className="font-light">
            Enjoy the sound of music every day with a new stylish <br /> and
            comfortable model of headphones. Stylize, inspire,reproduce
          </p>
          <div className="flex space-x-7">
            <div className="flex items-center space-x-2">
              <HiMiniSpeakerWave className="text-emerald-500 text-xl" />
              <span>Clear Sound</span>
            </div>
            <div className="flex items-center space-x-2">
              <GiSettingsKnobs className="text-emerald-500 text-xl" />
              <span>Latest Setting</span>
            </div>
          </div>
          <div className="flex space-x-4 ">
            <button className="lg:w-full md:w-1/3 lg:max-w-32 bg-gradient-to-r from-black to-gray-600 rounded-md h-10 text-white relative pr-4 cursor-pointe ">
              Buy Now
              <span className="absolute right-3 inline-flex pt-1 ">
                <MdArrowOutward />
              </span>
            </button>
            <button className="lg:w-full md:w-1/3 lg:max-w-32 bg-gray-300 rounded-md h-10 text-black font-medium relative pr-4 group overflow-hidden group-hover:text-white z-10 cursor-pointer">
              <span className="relative z-10 text-black group-hover:text-white transition duration-300">
                See More
              </span>
              <span className="absolute z-10 right-3 inline-flex pt-1 group-hover:text-white transition duration-300">
                <MdOutlineNotes />
              </span>
              <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-out z-0"></span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center pt-15">
          <div>
            <img
              className={`lg:w-70 lg:h-80 w-30 h-30 object-contain swing-y`}
              src={actionImage.url ? actionImage.url : 'https://i.pinimg.com/736x/a7/6a/0e/a76a0e6a08608900c3570f0c659865a0.jpg'}
              alt=""
            />
          </div>
          <div className="w-13 h-60 flex flex-col items-center space-y-6 rounded-md ">
            {listActionImages.map((item) => (
              <div>
                <img
                  onClick={() => handleActioneChangeImage(item.id, item.url)}
                  className="w-15 h-15 object-contain cursor-pointer"
                  src={item.url}
                  alt=""
                  key={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
