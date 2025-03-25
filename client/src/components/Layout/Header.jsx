import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import UserDropdown from "./UserDropdown";
import SearchInput from "../Form/SearchInput.jsx";
import CategoryDropdown from "./CategoryDropdown.jsx";
import useCategory from "../../hooks/useCategory.js";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  // Logout handler
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar bg-gray-800 text-white p-2 fixed top-0 left-0 w-full shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-lg font-semibold">
            <Link to="/" className="text-white hover:text-blue-400">
              Techinfoyt
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-x-6 flex items-center">
            <SearchInput />
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>

            <CategoryDropdown categories={categories} />

            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>

            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>

            <Link to="/policy" className="hover:text-blue-400">
              Privacy Policy
            </Link>

            {!auth?.user ? (
              <>
                <Link to="/register" className="hover:text-blue-400">
                  Register
                </Link>
                <Link to="/login" className="hover:text-blue-400">
                  Login
                </Link>
              </>
            ) : <>
              <UserDropdown auth={auth} handleLogout={handleLogout} />
            </>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
