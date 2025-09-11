import React, { useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUserCheck,
  FiUserX,
  FiSettings,
} from "react-icons/fi";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { GetAllUserAccount, updateRoleAccount } from "../../services/Admin/UserAccount";
import Loading from "../../components/Loading";
const Users = () => {
  const queryClient = useQueryClient();
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountId, setAccountId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Name: "",
    Phone: "",
    Address: "",
    Role: "user",
    // status: "active",
  });

  // Sample data
  // const accounts = [
  //   {
  //     _id: "1",
  //     username: "john_admin",
  //     email: "john@example.com",
  //     fullname: "John Anderson",
  //     phone: "+1 (555) 123-4567",
  //     address: "123 Main St, New York, NY",
  //     role: "admin",
  //     status: "active",
  //     createdAt: "2024-01-15",
  //     lastLogin: "2024-03-10",
  //   },
  //   {
  //     _id: "2",
  //     username: "jane_manager",
  //     email: "jane@example.com",
  //     fullname: "Jane Smith",
  //     phone: "+1 (555) 987-6543",
  //     address: "456 Oak Ave, Los Angeles, CA",
  //     role: "manager",
  //     status: "active",
  //     createdAt: "2024-02-20",
  //     lastLogin: "2024-03-09",
  //   },
  //   {
  //     _id: "3",
  //     username: "bob_user",
  //     email: "bob@example.com",
  //     fullname: "Bob Johnson",
  //     phone: "+1 (555) 456-7890",
  //     address: "789 Pine St, Chicago, IL",
  //     role: "user",
  //     status: "inactive",
  //     createdAt: "2024-03-01",
  //     lastLogin: "2024-03-05",
  //   },
  //   {
  //     _id: "4",
  //     username: "alice_user",
  //     email: "alice@example.com",
  //     fullname: "Alice Brown",
  //     phone: "+1 (555) 321-0987",
  //     address: "321 Elm St, Miami, FL",
  //     role: "user",
  //     status: "active",
  //     createdAt: "2024-02-10",
  //     lastLogin: "2024-03-08",
  //   },
  //   {
  //     _id: "5",
  //     username: "charlie_mod",
  //     email: "charlie@example.com",
  //     fullname: "Charlie Wilson",
  //     phone: "+1 (555) 654-3210",
  //     address: "654 Maple Dr, Seattle, WA",
  //     role: "moderator",
  //     status: "pending",
  //     createdAt: "2024-03-05",
  //     lastLogin: null,
  //   },
  // ];
  const { data: accounts } = useQuery({
    queryKey: ["Accounts"],
    queryFn: () => GetAllUserAccount(),
  });

  const mutationUpRole = useMutation({
    mutationKey: ["updateRole"],
    mutationFn: (data) => updateRoleAccount({ id: accountId, data }),
    onSuccess: (data) => {   
      queryClient.invalidateQueries(["Accounts"]);
      setTypeModal({ type: "", modal: false });
      setIsLoading(false);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("Form submitted:", formData);
    mutationUpRole.mutate(formData);
  };

  const handleEdit = (accountId) => {
    setAccountId(accountId);
    const account = accounts?.result.find((acc) => acc._id === accountId);
    if (account) {
      setFormData({
        Email: account.Email,
        Password: "",
        Name: account.Name,
        Phone: account.Phone,
        Address: account.Address,
        Role: account.Role,
        // status: account.status,
      });
      setTypeModal({ type: "edit", modal: true });
    }
  };

  const handleDelete = (accountId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      console.log("Delete account:", accountId);
    }
  };

  const filteredAccounts = accounts?.result.filter((account) => {
    const matchesRole = selectedRole === "all" || account.Role === selectedRole;
    const matchesSearch =
      account.Name.toLowerCase().includes(searchTerm.toLowerCase()) || account.Email.toLowerCase().includes(searchTerm.toLowerCase());
    // account.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });
  // console.log(accounts.result);

  const getRoleColor = (role) => {
    console.log(role);

    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "moderator":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Account Management
              </h1>
              <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* <button
                onClick={() => setTypeModal({ type: "add", modal: true })}
                className="group relative px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                <div className="flex items-center space-x-2">
                  <FiUserPlus className="w-5 h-5" />
                  <span>Add Account</span>
                </div>
              </button> */}

              <button className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-200">
                <div className="flex items-center space-x-2">
                  <FiTrash2 className="w-5 h-5" />
                  <span>Trash</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Accounts</p>
                <h3 className="text-2xl font-bold text-gray-900">{accounts?.result.length}</h3>
                <p className="text-xs text-gray-400 mt-1">All registered users</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl group-hover:from-violet-200 group-hover:to-purple-200 transition-colors">
                <FiUsers className="w-8 h-8 text-violet-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Users</p>
                <h3 className="text-2xl font-bold text-green-600">{accounts?.result.map((acc) => acc).length}</h3>
                <p className="text-xs text-gray-400 mt-1">Currently active</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                <FiUserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Admins</p>
                <h3 className="text-2xl font-bold text-red-600">{accounts?.result.filter((acc) => acc.Role === "admin").length}</h3>
                <p className="text-xs text-gray-400 mt-1">System administrators</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl group-hover:from-red-200 group-hover:to-pink-200 transition-colors">
                <FiShield className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-600">{accounts?.result.filter((acc) => acc.status === "pending").length}</h3>
                <p className="text-xs text-gray-400 mt-1">Awaiting approval</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl group-hover:from-yellow-200 group-hover:to-orange-200 transition-colors">
                <FiUserX className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {typeModal.modal && (
          <Modal>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{typeModal.type === "add" ? "Add New Account" : "Edit Account"}</h2>
                <button
                  onClick={() => setTypeModal({ type: "", modal: false })}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                      placeholder=" "
                      required
                      readOnly
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                      placeholder=" "
                      required
                      readOnly
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      name="Password"
                      value={formData.Password}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                      placeholder=" "
                      required={typeModal.type === "add"}
                      readOnly
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                      placeholder=" "
                      required
                      readOnly
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                      placeholder=" "
                      readOnly
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Phone
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      name="Role"
                      value={formData.Role}
                      onChange={handleInputChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600">
                      Role
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                    readOnly
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                    Address
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === "active"}
                        onChange={handleInputChange}
                        className="form-radio text-violet-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === "inactive"}
                        onChange={handleInputChange}
                        className="form-radio text-violet-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Inactive</span>
                    </label>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setTypeModal({ type: "", modal: false })}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                      {isLoading ? <Loading /> : "Update Account"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {/* Main Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Account Directory</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAccounts?.map((account) => (
                  <tr key={account._id} className="hover:bg-violet-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full flex items-center justify-center mr-4 shadow-md">
                          <span className="text-white font-bold text-lg">{account.Name?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{account.Name}</div>
                          <div className="text-sm text-gray-500">@{account.Name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiMail className="w-4 h-4 mr-2 text-gray-400" />
                          {account.Email ? account.Email : "N/A"}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                          {account.Phone ? account.Phone : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(account.Role)}`}>
                        {account.Role?.charAt(0).toUpperCase() + account.Role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor("active")}`}></div>
                        <span className="text-sm capitalize text-gray-700">{"active"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEdit(account._id)}
                          className="inline-flex items-center p-2 border border-transparent rounded-lg text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200"
                        >
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(account._id)}
                          className="inline-flex items-center p-2 border border-transparent rounded-lg text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-200"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center p-2 border border-transparent rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-200">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
