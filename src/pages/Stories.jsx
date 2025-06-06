import React from "react";
import { IoMdCheckmark } from "react-icons/io";
const Stories = () => {
  const services = [
  {
    title: "Technology Solutions (2008)",
    description:
      "Founded with a vision to transform businesses, we started our journey. Our first client project set the stage for future successes.",
    icon: "📍",
    active: true,
  },
  {
    title: "Financial Consulting",
    description:
      "Expert guidance to optimize your financial performance.",
    icon: "💼",
    active: false,
  },
  {
    title: "Financial Consulting",
    description:
      "Expert guidance to optimize your financial performance.",
    icon: "💼",
    active: false,
  },
  {
    title: "Financial Consulting",
    description:
      "Expert guidance to optimize your financial performance.",
    icon: "💼",
    active: false,
  },
  {
    title: "Financial Consulting",
    description:
      "Expert guidance to optimize your financial performance.",
    icon: "💼",
    active: false,
  },
  {
    title: "Financial Consulting",
    description:
      "Expert guidance to optimize your financial performance.",
    icon: "💼",
    active: false,
  },
];
  return (
    <section className=" max-w-7xl mx-auto mt-30 w-full h-full">
      <section className="bg-gray-50">
        <div className="grid grid-cols-2 space-x-4 max-w-6xl mx-auto pb-10 ">
          <div>
            <button className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10">
              ABOUT US
            </button>
            <h1 className="text-5xl mt-5 ">About our firm</h1>
            <p className="mt-3 text-gray-500">
              At our firm, we pride ourselves on delivering tailored solutions
              that empower businesses to thrive. With years of experience in the
              industry, we understand the unique needs of our clients and are
              committed to providing exceptional service that sets us apart.
            </p>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white w-40 h-12 rounded-full mt-7">
                Get Started {"->"}
              </button>
              <button className="w-30 h-12 border-2 border-blue-600 text-blue-600 rounded-full mt-7">
                Free trial
              </button>
            </div>
            <hr className="border-t-1 border-gray-400 w-full mt-10 mx-auto" />
            <div className="flex justify-center items-center mt-10">
              <div>
                <h1 className="text-5xl">95%</h1>
                <span className="w-1 text-gray-400">
                  Complete Customer satisfaction
                </span>
              </div>
              <div>
                <h1 className="text-5xl">10+</h1>
                <span className="w-1 text-gray-400">
                  Innovation and valueable insight
                </span>
              </div>
              <div>
                <h1 className="text-5xl">$10m</h1>
                <span className="w-1 text-gray-400">
                  Higly efficient financial strategies
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 ml-10">
            <img
              className="h-116 w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/736x/38/d5/64/38d564e91b64bc0258896e35c8df359e.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="grid grid-cols-2 space-x-4 max-w-6xl mx-auto pb-10 ">
          <div className="mt-10 ">
            <img
              className="h-116 w-full object-cover rounded-2xl"
              src="https://i.pinimg.com/736x/1d/b0/39/1db0395bbf5a6c4cb8f2766673ce9009.jpg"
              alt=""
            />
          </div>
          <div className="ml-10">
            <button className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10">
              ABOUT US
            </button>
            <h1 className="text-4xl mt-5 ">Unlock our expertiseto drive success across industries</h1>
            <p className="mt-5 text-gray-500">
              At our firm, we pride ourselves on delivering tailored solutions
              that empower businesses to thrive. With years of experience in the
              industry, we understand the unique needs of our clients and are
              committed to providing exceptional service that sets us apart.
            </p>
            <div className="flex space-x-3 mt-10">
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><IoMdCheckmark/></span>
                  <span className="">Highly efficient financial strategies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto">
        <div>
          <button className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10">
              MILESTONES
            </button>
            <div className="flex justify-between mt-5 items-center">
              <h1 className="text-4xl">Our journey: key milestones and achievements</h1>
              <p className="text-gray-400 w-1/2">Discover the signficantn milestones that have shaped our firm. Each achivement reflects our comrnitment to excellent and growth.</p>
            </div>
        </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {services.map((service, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 shadow-md transition duration-300 h-60 ${
            service.active
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <div
            className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
              service.active ? "bg-white/20" : "bg-blue-100 text-blue-600"
            }`}
          >
            {service.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
          <p className="text-sm">
            {service.description}
          </p>
        </div>
      ))}
    </div>
      </section>
    </section>
  );
};

export default Stories;
