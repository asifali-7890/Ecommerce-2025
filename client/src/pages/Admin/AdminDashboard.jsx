import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { FaUsers, FaClipboardList, FaPhoneAlt } from "react-icons/fa"; // Importing icons

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap justify-center items-start">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 mt-8">
            <AdminMenu />
          </div>

          {/* Admin Info Card */}
          <div className="w-full md:w-3/4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Admin Name: <span className="font-normal">{auth?.user?.name}</span></h3>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Admin Email: <span className="font-normal">{auth?.user?.email}</span></h3>
              <h3 className="text-lg font-semibold text-gray-800">Admin Contact: <span className="font-normal">{auth?.user?.phone}</span></h3>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center">
                <FaUsers className="text-blue-500 w-8 h-8 mr-3" />
                <div>
                  <h4 className="text-xl font-semibold">Total Users</h4>
                  <p className="text-gray-700">150</p>
                </div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center">
                <FaClipboardList className="text-green-500 w-8 h-8 mr-3" />
                <div>
                  <h4 className="text-xl font-semibold">Total Orders</h4>
                  <p className="text-gray-700">75</p>
                </div>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center">
                <FaPhoneAlt className="text-yellow-500 w-8 h-8 mr-3" />
                <div>
                  <h4 className="text-xl font-semibold">Support Calls</h4>
                  <p className="text-gray-700">20</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activities</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">User  John Doe registered.</li>
                <li className="text-gray-700">Order #1234 has been shipped.</li>
                <li className="text-gray-700">User  Jane Smith updated their profile.</li>
                <li className="text-gray-700">New product added: Wireless Headphones.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;