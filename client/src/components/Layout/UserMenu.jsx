import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-4">User  Dashboard</h4>
        <div className="space-y-4">
          <NavLink
            to="/dashboard/user/profile"
            className="block w-full px-4 py-2 text-left text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white rounded transition duration-200"
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/user/orders"
            className="block w-full px-4 py-2 text-left text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white rounded transition duration-200"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;