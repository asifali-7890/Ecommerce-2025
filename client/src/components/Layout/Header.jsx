import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import UserDropdown from "./UserDropdown";
import SearchInput from "../Form/SearchInput.jsx";
import CategoryDropdown from "./CategoryDropdown.jsx";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.jsx";
import { FiShoppingCart } from "react-icons/fi"; // Importing an icon for the cart

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

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
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-lg font-bold">
          <Link to="/" className="text-white hover:text-blue-400 transition duration-200">
            Asif Ecommerce
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <SearchInput />

          <Link to="/" className="hover:text-blue-400 transition duration-200">
            Home
          </Link>

          <CategoryDropdown categories={categories} />

          {!auth?.user ? (
            <>
              <Link to="/register" className="hover:text-blue-400 transition duration-200">
                Register
              </Link>
              <Link to="/login" className="hover:text-blue-400 transition duration-200">
                Login
              </Link>
            </>
          ) : (
            <UserDropdown auth={auth} handleLogout={handleLogout} />
          )}

          <Link to="/cart" className="flex items-center hover:text-blue-400 transition duration-200 whitespace-nowrap">
            <FiShoppingCart className="w-5 h-5 mr-1" />
            <span>Cart ({cart?.length})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;