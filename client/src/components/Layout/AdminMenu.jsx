import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <h4 className="text-xl font-semibold mb-4">Admin Panel</h4>

          <NavLink
            to="/dashboard/admin/create-category"
            className="block w-full py-2 px-4 text-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Create Category
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-product"
            className="block w-full py-2 px-4 text-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/admin/products"
            className="block w-full py-2 px-4 text-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Products
          </NavLink>

          <NavLink
            to="/dashboard/admin/orders"
            className="block w-full py-2 px-4 text-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
