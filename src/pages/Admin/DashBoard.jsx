import React from "react";
import Chart from "react-apexcharts";
import { GoPackage } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const DashBoard = () => {
  // Biểu đồ cột
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
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      labels: { style: { colors: "#6B7280", fontSize: "13px" } },
    },
    yaxis: { labels: { style: { colors: "#9CA3AF", fontSize: "13px" } } },
    colors: ["#6366F1"], // indigo-500
    grid: { strokeDashArray: 4, borderColor: "#E5E7EB" },
    tooltip: { theme: "light" },
  };
  const series = [{ name: "Sales", data: [150,370,180,290,170,160,280,90,200,390,270,100] }];

  // Biểu đồ radial
  const percentage = 75.55;
  const chartOptions = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -135, endAngle: 135,
        hollow: { size: "70%" },
        track: { background: "#F3F4F6" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "28px", fontWeight: 600, color: "#111827",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: { shade: "light", type: "horizontal", gradientToColors: ["#3B82F6"], stops: [0, 100] },
    },
    stroke: { lineCap: "round" },
  };
  const chartSeries = [percentage];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h1>

      <div className="grid lg:grid-cols-[3fr_2fr] gap-6">
        {/* Cột trái */}
        <div>
          {/* Cards nhỏ */}
          <div className="flex gap-6">
            {/* Customers */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5">
              <span className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                <FiUsers />
              </span>
              <h1 className="text-gray-500 text-sm font-medium mt-4">Customers</h1>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-3xl font-bold text-gray-800">3,782</h3>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                  <FaArrowUp /> 11.1%
                </span>
              </div>
            </div>
            {/* Orders */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5">
              <span className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                <GoPackage />
              </span>
              <h1 className="text-gray-500 text-sm font-medium mt-4">Orders</h1>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-3xl font-bold text-gray-800">1,245</h3>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                  <FaArrowDown /> 5.4%
                </span>
              </div>
            </div>
          </div>

          {/* Biểu đồ cột */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Monthly Sales</h2>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
            <Chart options={options} series={series} type="bar" height={250} />
          </div>
        </div>

        {/* Cột phải */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Monthly Target</h2>
              <p className="text-sm text-gray-500">Target you’ve set for each month</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">⋮</button>
          </div>

          <div className="flex flex-col items-center my-2">
            <Chart options={chartOptions} series={chartSeries} type="radialBar" height={250} />
            <div className="-mt-6">
              <span className="text-sm px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                +10%
              </span>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-3">
            You earned <span className="font-semibold">$3,287</span> today, higher than last month. <br />
            Keep up your good work! 🚀
          </p>

          <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-200 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-gray-400">Target</span>
              <span className="font-semibold text-gray-800 text-lg">$20K ↓</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">Revenue</span>
              <span className="font-semibold text-gray-800 text-lg">$18K ↑</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">Today</span>
              <span className="font-semibold text-gray-800 text-lg">$3K ↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
