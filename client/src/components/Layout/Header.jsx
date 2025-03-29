import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import UserDropdown from "./UserDropdown";
import SearchInput from "../Form/SearchInput";
import CategoryDropdown from "./CategoryDropdown";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 md:py-1 px-4">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="text-white hover:text-blue-400 transition duration-200">
            Asif Ecommerce
          </Link>
        </div>

        {/* Hamburger Icon (visible on mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <AiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation links (visible on medium and larger screens) */}
        <nav className="hidden md:flex items-center space-x-6">
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
          <Link to="/cart" className="flex whitespace-nowrap items-center hover:text-blue-400 transition duration-200">
            <FiShoppingCart className="w-5 h-5 mr-1" />
            <span>Cart ({cart?.length})</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu (visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <ul className="space-y-4">
            <li>
              <SearchInput />
              <Link onClick={toggleMenu} to="/" className="block hover:text-blue-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <CategoryDropdown categories={categories} />
            </li>
            {!auth?.user ? (
              <>
                <li>
                  <Link onClick={toggleMenu} to="/register" className="block hover:text-blue-400 transition duration-200">
                    Register
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleMenu} to="/login" className="block hover:text-blue-400 transition duration-200">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <UserDropdown auth={auth} handleLogout={handleLogout} />
              </li>
            )}
            <li>
              <Link onClick={toggleMenu} to="/cart" className="block hover:text-blue-400 transition duration-200 flex items-center">
                <FiShoppingCart className="w-5 h-5 mr-1" />
                <span>Cart ({cart?.length})</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
