import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; // Importing the icon
import { FiUser, FiLogOut } from 'react-icons/fi'; // Icons for Dashboard and Logout

const UserDropdown = ({ auth, handleLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button to toggle dropdown */}
            <div>
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="inline-flex items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <span className="text-gray-900 whitespace-nowrap">{auth?.user?.name}</span>
                    <FaChevronDown className={`ml-2 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} /> {/* Dropdown arrow */}
                </button>
            </div>



            {/* Dropdown menu */}
            {dropdownOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1" role="none">
                        {/* Dashboard link */}
                        <NavLink
                            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                            role="menuitem"
                        >
                            <FiUser className="mr-2" /> {/* User icon */}
                            Dashboard
                        </NavLink>

                        {/* Logout link */}
                        <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                            role="menuitem"
                        >
                            <FiLogOut className="mr-2" /> {/* Logout icon */}
                            Logout
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;