import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center p-4 mt-16 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          {/* Admin Panel Title */}
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h4>

          {/* Create Category Link */}
          <NavLink
            to="/dashboard/admin/create-category"
            className="w-full max-w-xs py-3 px-6 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Create Category
          </NavLink>

          {/* Create Product Link */}
          <NavLink
            to="/dashboard/admin/create-product"
            className="w-full max-w-xs py-3 px-6 text-center bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Create Product
          </NavLink>

          {/* Products Link */}
          <NavLink
            to="/dashboard/admin/products"
            className="w-full max-w-xs py-3 px-6 text-center bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
          >
            Products
          </NavLink>

          {/* Orders Link */}
          <NavLink
            to="/dashboard/admin/orders"
            className="w-full max-w-xs py-3 px-6 text-center bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
