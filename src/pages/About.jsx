import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";
const About = () => {
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
      description: "Expert guidance to optimize your financial performance.",
      icon: "💼",
      active: false,
    },
    {
      title: "Financial Consulting",
      description: "Expert guidance to optimize your financial performance.",
      icon: "💼",
      active: false,
    },
    {
      title: "Financial Consulting",
      description: "Expert guidance to optimize your financial performance.",
      icon: "💼",
      active: false,
    },
    {
      title: "Financial Consulting",
      description: "Expert guidance to optimize your financial performance.",
      icon: "💼",
      active: false,
    },
    {
      title: "Financial Consulting",
      description: "Expert guidance to optimize your financial performance.",
      icon: "💼",
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
              className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10"
            >
              ABOUT US
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
              About our firm
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
              At our firm, we pride ourselves on delivering tailored solutions
              that empower businesses to thrive. With years of experience in the
              industry, we understand the unique needs of our clients and are
              committed to providing exceptional service that sets us apart.
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
                className="bg-blue-600 text-white w-40 h-12 rounded-full mt-7"
              >
                Get Started {"->"}
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
                className="w-30 h-12 border-2 border-blue-600 text-blue-600 rounded-full mt-7"
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
                <span className="w-1 text-gray-400">
                  Complete Customer satisfaction
                </span>
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
                <span className="w-1 text-gray-400">
                  Innovation and valueable insight
                </span>
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
                <span className="w-1 text-gray-400">
                  Higly efficient financial strategies
                </span>
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
          <div className="ml-10">
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
              className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10"
            >
              ABOUT US
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
              Unlock our expertiseto drive success across industries
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
              At our firm, we pride ourselves on delivering tailored solutions
              that empower businesses to thrive. With years of experience in the
              industry, we understand the unique needs of our clients and are
              committed to providing exceptional service that sets us apart.
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
            className="w-30 h-10 border-2 border-gray-400 rounded-full mt-10"
          >
            MILESTONES
          </motion.button>
          <div className="flex justify-between mt-5 items-center">
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
              Our journey: key milestones and achievements
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
              className="text-gray-400 w-1/2"
            >
              Discover the signficantn milestones that have shaped our firm.
              Each achivement reflects our comrnitment to excellent and growth.
            </motion.p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
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
              className={`rounded-2xl p-6 shadow-md  h-60 ${
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
              <p className="text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default About;
