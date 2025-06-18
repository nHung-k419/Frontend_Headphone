import React from "react";
import Chart from "react-apexcharts";
import { GoPackage } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
const DashBoard = () => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#4B5563", // text-gray-600
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280", // text-gray-500
          fontSize: "14px",
        },
      },
    },
    colors: ["#3B82F6"], // blue-500
    grid: {
      strokeDashArray: 4,
      borderColor: "#E5E7EB", // gray-200
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Sales",
      data: [150, 370, 180, 290, 170, 160, 280, 90, 200, 390, 270, 100],
    },
  ];
  const percentage = 75.55; // % đạt được

  const chartOptions = {
    chart: {
      type: "radialBar",
      offsetY: -10,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "70%",
        },
        track: {
          background: "#F3F4F6", // gray-100
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "28px",
            fontWeight: 600,
            color: "#111827", // text-gray-900
            formatter: function (val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        gradientToColors: ["#6366F1"], // indigo-500
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const chartSeries = [percentage];
  return (
    <div className="p-5 grid grid-cols-[3fr_2fr]">
      <div>
        <div className="flex items-center space-x-4">
          <div className="w-1/2 h-45 border-1 shadow-md border-gray-300 rounded-2xl p-5">
            <span className="w-11 h-11 rounded-md bg-gray-100 flex items-center justify-center text-xl">
              <FiUsers />
            </span>
            <h1 className="text-gray-500 text-sm font-medium mt-5">
              Customers
            </h1>
            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-2xl font-bold ">3,782</h3>
              <span className="w-20 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-sm font-semibold">
                <FaArrowUp /> 11.1%
              </span>
            </div>
          </div>
          <div className="w-1/2 h-45 border-1 shadow-md border-gray-300 rounded-2xl p-5">
            <span className="w-11 h-11 rounded-md bg-gray-100 flex items-center justify-center text-xl">
              <GoPackage />
            </span>
            <h1 className="text-gray-500 text-sm font-medium mt-5">Orders</h1>
            <div className="mt-5 flex items-center justify-between">
              <h3 className="text-2xl font-bold ">3,782</h3>
              <span className="w-20 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-sm font-semibold">
                <FaArrowDown /> 11.1%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border-1 border-gray-300  p-5 h-70 mt-5 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Sales
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v.01M12 12v.01M12 18v.01"
                />
              </svg>
            </button>
          </div>
          <Chart options={options} series={series} type="bar" height={200} />
        </div>
      </div>
      <div className="bg-white border-1 border-gray-300 rounded-2xl shadow-md p-5 w-full h-full ml-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Target
            </h2>
            <p className="text-sm text-gray-500">
              Target you’ve set for each month
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v.01M12 12v.01M12 18v.01"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center my-2">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="radialBar"
            height={250}
          />
          <div className="-mt-6">
            <span className="text-sm px-2 py-1 bg-green-100 text-green-600 rounded-full font-medium">
              +10%
            </span>
          </div>
        </div>

        <p className="text-center text-gray-600 text-md mt-2">
          You earn <span className="font-semibold">$3287</span> today, it's
          higher than last month. <br />
          Keep up your good work!
        </p>

        <div className="flex justify-center space-x-7 items-center mt-6  pt-4 text-sm ">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 font-medium flex items-center gap-1">
               Target
            </span>
            <span className="font-semibold text-black text-lg">$20K ↓</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 font-medium flex items-center gap-1">
               Revenue
            </span>
            <span className="font-semibold text-black text-lg">$20K ↑</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 font-medium flex items-center gap-1">
              Today
            </span>
            <span className="font-semibold text-black text-lg">$20K ↑</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
