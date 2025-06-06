import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoDiscOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { FaDelicious } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarReview from "../components/Sidebar/Sidebar";
const Detail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkFeature, setCheckFeature] = useState({
    id: 1,
    name: "DETAILS",
  });
  const [checkImage, setCheckImage] = useState("");
  const HandleCheckFeatures = (id) => {
    setCheckFeature((pre) => list_features.find((item) => item.id === id));
  };

  const handleChangeImage = (urlImg) => {
    setCheckImage((pre) => list_Images.find((item) => item.url === urlImg));
  };
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `15px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }
  }, [isSidebarOpen]);
  const list_features = [
    {
      id: 1,
      name: "DETAILS",
    },
    {
      id: 2,
      name: "FEATURES",
    },
    {
      id: 3,
      name: "REVIEWS",
    },
    {
      id: 4,
      name: "IMAGES",
    },
  ];
  const list_Images = [
    {
      id: 1,
      url: "https://i.pinimg.com/736x/f8/e6/fd/f8e6fddda8b71f023dbfb31b9d150d94.jpg",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/736x/0f/93/24/0f93249f98812e6698aa42535f211389.jpg",
    },
    {
      id: 3,
      url: "https://i.pinimg.com/736x/0b/3d/62/0b3d624e85d55bfc4a62c5e05f6166d2.jpg",
    },
  ];
  return (
    <article className={`mt-10 relative max-w-7xl mx-auto lg:w-full w-[380px]`}>
      <div className="max-w-7xl mx-auto mb-6">
        <Link to={"/"} className="text-gray-400 flex items-center gap-x-2">
          <span className="text-black">
            <FaArrowLeft />
          </span>
          Home - Product Details
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 max-w-7xl mx-auto lg:h-screen h-full">
        <div className="lg:w-full w-full lg:h-180 h-130 bg-gray-100 relative rounded-3xl">
          <img
            className="w-full h-full object-cover rounded-3xl"
            src={
              checkImage === ""
                ? "https://i.pinimg.com/736x/de/df/90/dedf90b38e98727c29fcf48ac075c005.jpg"
                : checkImage?.url
            }
            alt=""
          />
          <div className="flex justify-center items-center absolute z-10 bottom-3 space-x-3 lg:ml-3.5 ml-3 cursor-pointer">
            {list_Images.map((item) => (
              <div
                className={`rounded-3xl overflow-hidden ${
                  checkImage?.url === item.url
                    ? "shadow-xl border-3 border-transparent"
                    : "border-gray-50 border-3"
                }`}
              >
                <img
                  className={`lg:w-48 lg:h-40 w-26 h-30 object-cover z-10 hover:scale-110 transition-transform duration-300`}
                  src={item.url}
                  alt=""
                  onClick={() => handleChangeImage(item.url)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-xl h-screen mx-auto space-y-3">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold  lg:mt-0 mt-3">Loose Fit Hoodie</h1>
            <p className="text-xl font-semibold ">$24.99</p>
            <div className="flex items-center text-sm border border-gray-300 rounded-full px-4 py-2 space-x-2 lg:w-full w-fit ">
              <span>⚠️</span>
              <span className="select-none">
                Order in <span class="font-bold text-red-600">02:30:25</span> to get next day
                delivery
              </span>
            </div>
          </div>
          <div>
            <div className="lg:flex lg:space-y-0 space-y-3 lg:space-x-20 space-x-10 lg:ml-0 ml-1 items-center">
              {/* <span>Select Size</span> */}
              <div>
                <h1 className="text-gray-500 pb-2">Select Size</h1>
                <div className="flex space-x-3 items-center">
                  <button className="lg:w-10 lg:h-10 w-7 h-7 cursor-pointer rounded-full text-white bg-gray-900">
                    S
                  </button>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 cursor-pointer rounded-full bg-gray-100">
                    M
                  </button>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 cursor-pointer rounded-full bg-gray-100">
                    L
                  </button>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 cursor-pointer rounded-full bg-gray-100">
                    XL
                  </button>
                  <button className="lg:w-10 lg:h-10 w-7 h-7 cursor-pointer rounded-full bg-gray-100">
                    XXL
                  </button>
                </div>
              </div>
            {/* <span>|</span> */}
              <div>
                <h1 className="text-gray-500 pb-2">Choose Color</h1>
                <div className="flex space-x-3 items-center">
                  <button className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-600"></button>
                  <button className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-blue-600"></button>
                  <button className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-emerald-600"></button>
                  <button className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-lime-600"></button>
                  <button className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-purple-600"></button>
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-3 mt-2">
              <span className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
              <span className="lg:h-9 lg:w-9 w-7 h-7 cursor-pointer rounded-full bg-amber-300"></span>
            </div> */}
          </div>
          <div className="flex space-x-4 mt-8">
            <div className="flex-1">
              <button className="h-12 w-full bg-gray-800 rounded-3xl flex items-center justify-center group overflow-hidden relative cursor-pointer">
                <span className="relative text-white group-hover:text-white z-10">
                  Add To Cart
                </span>
                <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
              </button>
            </div>
            <div className="flex items-center justify-center border-1 border-gray-200 rounded-full w-12 h-12 text-xl">
              {" "}
              <span>
                <IoMdHeartEmpty />
              </span>
            </div>
          </div>
          <div className="w-full rounded-2xl border-1 border-gray-200">
            <div class="flex justify-between items-center cursor-pointer pt-3 pl-3">
              <h3 class="font-semibold">Description & Fit</h3>
              <span>▾</span>
            </div>
            <p class="text-md text-gray-600 p-3">
              Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric
              with a generous, but not oversized silhouette. Jersey-lined,
              drawstring hood, dropped shoulders, long sleeves, and a kangaroo
              pocket. Wide ribbing at cuffs and hem. Soft, brushed inside.
            </p>
          </div>
          <div className="w-full rounded-2xl border-1 border-gray-200 space-y-3 ">
            <h1 className="p-3 text-xl font-semibold">Shipping</h1>
            <div className="grid grid-cols-2 ml-7 gap-y-5 pb-6">
              <div className="flex items-center space-x-2">
                <div className="h-15 w-15 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="text-2xl">
                    <IoDiscOutline />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Discount</span>
                  <p>Disc 50%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-15 w-15 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="text-2xl">
                    <GoPackage />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Package</span>
                  <p>Regular Package</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-15 w-15 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="text-2xl">
                    <FaDelicious />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Delivery Time</span>
                  <p>3 - 4 Working Days</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-15 w-15 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="text-2xl">
                    <CiDeliveryTruck />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    Estimation Arrive
                  </span>
                  <p>10 - 12 October 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 mt-10">
        <div className="lg:flex items-center">
          <div className="">
            <h1 className="font-semibold text-2xl text-center">Rating & Review</h1>
            <div className="flex justify-center items-center">
              <h1 className="lg:text-9xl text-2xl font-semibold">4,5</h1>{" "}
              <span className="lg:pt-14 pt-3 text-gray-400 text-lg">/ 5</span>
            </div>
            <p className="text-gray-300 mt-2 text-center">(50 New Reviews)</p>
          </div>
          <div className="flex flex-col items-center lg:mt-13 mt-8 lg:ml-5">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 5</span>
              <div className="relative lg:lg:w-50 w-40  rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-35 lg:h-2 h-1 z-10"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 4</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-30 lg:h-2 h-1 z-10"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 3</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-20 lg:h-2 h-1 z-10"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 2</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-15 lg:h-2 h-1 z-10"></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ 1</span>
              <div className="relative lg:w-50 w-40 rounded-md lg:h-2 h-1 bg-gray-300">
                <span className="absolute bg-black rounded-md w-10 lg:h-2 h-1 z-10"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-1 max-w-xl mx-auto border-gray-300 rounded-2xl w-full p-3 lg:mt-0 mt-5">
          <div className="flex justify-between ">
            <div className="flex items-center gap-x-2">
              <img
                className="lg:w-10 lg:h-10 w-7 h-7 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                alt=""
              />
              <h1 className="font-bold">Nguyễn Ngọc Hùng</h1>
            </div>
            <span className="text-gray-400 text-sm mt-2.5">13 Oct 2025</span>
          </div>
          <span className="text-yellow-400 pl-2">★★★★★</span>
          <div>
            <p className="p-2 text-gray-500">
              "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric
              with a generous, but not oversized silhouette. Jersey-lined,
              drawstring hood, dropped shoulders, long sleeves, and a kangaroo
              pocket. Wide ribbing at cuffs and hem. Soft, brushed inside."
            </p>
          </div>
          <div className="relative w-30 rounded-md h-1 bg-gray-300 mx-auto">
            <span className="absolute bg-black rounded-md w-15 h-1 z-10"></span>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="px-4 py-2 w-full bg-cyan-500 text-white rounded-xl relative overflow-hidden group cursor-pointer lg:mt-0 mt-5 lg:mb-0 mb-3"
        >
          <span className="relative text-white group-hover:text-white z-10">
            Xem tất cả đánh giá
          </span>
          <span className="absolute w-full h-full left-0 bg-gradient-to-r from-cyan-400 to-cyan-800 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out z-0"></span>
        </button>
        <SidebarReview
          keyOpen="detail"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </article>
  );
};

export default Detail;
