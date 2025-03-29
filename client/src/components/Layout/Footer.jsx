import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-lg md:text-xl font-semibold">
          All Rights Reserved &copy; Asif Ecommerce
        </h1>
        <p className="text-sm md:text-base mt-2">
          Your one-stop shop for all your needs. We offer a wide range of products at unbeatable prices.
        </p>
        <p className="text-sm md:text-base mt-3 space-x-4">
          <Link to="/about" className="text-blue-400 hover:text-blue-300 transition duration-200">
            About Us
          </Link>
          <span>|</span>
          <Link to="/contact" className="text-blue-400 hover:text-blue-300 transition duration-200">
            Contact
          </Link>
          <span>|</span>
          <Link to="/policy" className="text-blue-400 hover:text-blue-300 transition duration-200">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-4">
          <h2 className="text-md font-semibold">Follow Us:</h2>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="#" className="text-blue-400 hover:text-blue-300 transition duration-200">
              Facebook
            </Link>
            <Link to="#" className="text-blue-400 hover:text-blue-300 transition duration-200">
              Twitter
            </Link>
            <Link to="https://www.linkedin.com/in/asifaliquraishy/" className="text-blue-400 hover:text-blue-300 transition duration-200">
              Linkedin
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-md font-semibold">Subscribe to our Newsletter</h2>
          <form className="flex justify-center mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;