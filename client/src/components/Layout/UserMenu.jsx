import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">User Dashboard</h4>

          <NavLink
            to="/dashboard/user/profile"
            className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-blue-500 hover:text-white rounded"
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/user/orders"
            className="block w-full px-4 py-2 text-left bg-gray-100 hover:bg-blue-500 hover:text-white rounded"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
