import React, { useState } from 'react';
import { 
  FiUsers, 
  FiShoppingCart, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiMoreVertical,
  FiBell,
  FiSettings,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiEye,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import { HiOutlineShoppingBag, HiOutlineUserGroup, HiOutlineCurrencyDollar } from 'react-icons/hi';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  
  // Sample data for charts
  const salesChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#6366f1', '#ec4899'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    grid: {
      show: true,
      borderColor: '#f1f5f9',
      strokeDashArray: 0,
      position: 'back'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        },
        formatter: function (val) {
          return '$' + val + 'k'
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
        backgroundColor: '#ffffff'
      }
    }
  };

  const salesChartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 90, 110, 120]
    },
    {
      name: 'Profit',
      data: [20, 25, 22, 30, 28, 35, 40, 55, 75, 50, 65, 70]
    }
  ];

  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 300
    },
    colors: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + '%'
      },
      style: {
        fontSize: '12px',
        colors: ['#ffffff']
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#111827',
              formatter: function (val) {
                return val + '%'
              }
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Total Users',
              fontSize: '12px',
              fontWeight: 400,
              color: '#6b7280'
            }
          }
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'light'
    }
  };

  const donutChartSeries = [45.2, 32.8, 15.4, 6.6];

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false
      }
    },
    colors: ['#6366f1'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    grid: {
      show: false
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      theme: 'light'
    }
  };

  const barChartSeries = [{
    name: 'Orders',
    data: [65, 45, 78, 52, 94, 83, 76]
  }];

  const radialChartOptions = {
    chart: {
      height: 250,
      type: 'radialBar'
    },
    colors: ['#10b981'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%'
        },
        dataLabels: {
          name: {
            fontSize: '14px',
            color: '#374151',
            offsetY: -10
          },
          value: {
            fontSize: '24px',
            fontWeight: 700,
            color: '#111827',
            offsetY: 5,
            formatter: function (val) {
              return val + '%'
            }
          }
        }
      }
    },
    labels: ['Goal Progress']
  };

  const radialChartSeries = [78];

  const recentOrders = [
    { id: '#12847', customer: 'John Doe', amount: '$425.00', status: 'Completed', date: '2 min ago' },
    { id: '#12846', customer: 'Jane Smith', amount: '$267.50', status: 'Processing', date: '5 min ago' },
    { id: '#12845', customer: 'Bob Johnson', amount: '$189.99', status: 'Pending', date: '12 min ago' },
    { id: '#12844', customer: 'Alice Brown', amount: '$520.00', status: 'Completed', date: '1 hour ago' },
    { id: '#12843', customer: 'Charlie Wilson', amount: '$95.50', status: 'Cancelled', date: '2 hours ago' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 2847, revenue: '$1,423,500', trend: 'up', change: 12.5 },
    { name: 'MacBook Air M3', sales: 1683, revenue: '$2,024,400', trend: 'up', change: 8.2 },
    { name: 'iPad Pro', sales: 1245, revenue: '$996,000', trend: 'down', change: -3.1 },
    { name: 'AirPods Pro', sales: 3456, revenue: '$865,600', trend: 'up', change: 15.7 },
    { name: 'Apple Watch', sales: 2189, revenue: '$875,600', trend: 'up', change: 5.4 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/90 transition-all">
              <FiSearch className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/90 transition-all relative">
              <FiBell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button className="p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/90 transition-all">
              <FiSettings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">$45,231</h3>
                <div className="flex items-center text-sm">
                  <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+20.1%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                <FiDollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">1,789</h3>
                <div className="flex items-center text-sm">
                  <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+15.3%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
                <FiShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">9,328</h3>
                <div className="flex items-center text-sm">
                  <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+8.7%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                <FiUsers className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">3.24%</h3>
                <div className="flex items-center text-sm">
                  <FiArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">-2.1%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl group-hover:from-orange-200 group-hover:to-red-200 transition-colors">
                <FiTrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Monthly revenue and profit trends</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['1M', '6M', '1Y', 'All'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        selectedPeriod === period
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiMoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <Chart
              options={salesChartOptions}
              series={salesChartSeries}
              type="area"
              height={350}
            />
          </div>

          {/* Traffic Sources */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Traffic Sources</h2>
                <p className="text-sm text-gray-500 mt-1">User acquisition channels</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiMoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={300}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {['Desktop', 'Mobile', 'Tablet', 'Other'].map((source, index) => {
                const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                return (
                  <div key={source} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                    <span className="text-sm text-gray-600">{source}</span>
                    <span className="text-sm font-semibold text-gray-900 ml-auto">
                      {donutChartSeries[index]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Secondary Charts and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Weekly Orders */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Weekly Orders</h3>
              <div className="flex items-center text-sm text-green-600">
                <FiTrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </div>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={200}
            />
          </div>

          {/* Goal Progress */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Monthly Goal</h3>
              <div className="flex items-center text-sm text-green-600">
                <FiTrendingUp className="w-4 h-4 mr-1" />
                On track
              </div>
            </div>
            <Chart
              options={radialChartOptions}
              series={radialChartSeries}
              type="radialBar"
              height={200}
            />
            <div className="text-center mt-2">
              <p className="text-sm text-gray-600">$78K of $100K goal</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">$127</p>
                  </div>
                  <HiOutlineCurrencyDollar className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Return Rate</p>
                    <p className="text-2xl font-bold text-gray-900">2.3%</p>
                  </div>
                  <FiRefreshCw className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">5,423</p>
                  </div>
                  <HiOutlineUserGroup className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Bounce Rate</p>
                    <p className="text-2xl font-bold text-gray-900">34.2%</p>
                  </div>
                  <FiTrendingDown className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiFilter className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiDownload className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {order.customer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
                <p className="text-sm text-gray-500 mt-1">Best performing products</p>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <FiEye className="w-4 h-4" />
                <span>View All</span>
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales.toLocaleString()} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <div className="flex items-center text-sm">
                      {product.trend === 'up' ? (
                        <FiArrowUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <FiArrowDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={product.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                        {product.change > 0 ? '+' : ''}{product.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;