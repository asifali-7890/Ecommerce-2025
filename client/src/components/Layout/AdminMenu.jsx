import React from "react";
import { NavLink } from "react-router-dom";
import { FiPlusSquare, FiPackage, FiList, FiShoppingBag } from "react-icons/fi";

const AdminMenu = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl border border-purple-100">
        <div className="p-8 space-y-6">
          {/* Admin Panel Title */}
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
            Admin Dashboard
          </h2>

          {/* Menu Items Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Category */}
            <NavLink
              to="/dashboard/admin/create-category"
              className={({ isActive }) =>
                `flex items-center p-6 space-x-4 rounded-xl transition-all duration-300
                ${isActive ?
                  'bg-purple-600 text-white shadow-lg' :
                  'bg-white hover:bg-purple-50 hover:shadow-md border border-purple-100'}`
              }
            >
              <FiPlusSquare className="w-8 h-8 flex-shrink-0 text-purple-600" />
              <span className="text-lg font-semibold">Create Category</span>
            </NavLink>

            {/* Create Product */}
            <NavLink
              to="/dashboard/admin/create-product"
              className={({ isActive }) =>
                `flex items-center p-6 space-x-4 rounded-xl transition-all duration-300
                ${isActive ?
                  'bg-blue-600 text-white shadow-lg' :
                  'bg-white hover:bg-blue-50 hover:shadow-md border border-blue-100'}`
              }
            >
              <FiPackage className="w-8 h-8 flex-shrink-0 text-blue-600" />
              <span className="text-lg font-semibold">Create Product</span>
            </NavLink>

            {/* Products */}
            <NavLink
              to="/dashboard/admin/products"
              className={({ isActive }) =>
                `flex items-center p-6 space-x-4 rounded-xl transition-all duration-300
                ${isActive ?
                  'bg-green-600 text-white shadow-lg' :
                  'bg-white hover:bg-green-50 hover:shadow-md border border-green-100'}`
              }
            >
              <FiList className="w-8 h-8 flex-shrink-0 text-green-600" />
              <span className="text-lg font-semibold">Manage Products</span>
            </NavLink>

            {/* Orders */}
            <NavLink
              to="/dashboard/admin/orders"
              className={({ isActive }) =>
                `flex items-center p-6 space-x-4 rounded-xl transition-all duration-300
                ${isActive ?
                  'bg-pink-600 text-white shadow-lg' :
                  'bg-white hover:bg-pink-50 hover:shadow-md border border-pink-100'}`
              }
            >
              <FiShoppingBag className="w-8 h-8 flex-shrink-0 text-pink-600" />
              <span className="text-lg font-semibold">View Orders</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;