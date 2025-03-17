import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <h1 className="text-center text-lg md:text-xl font-semibold">
        All Right Reserved &copy; Techinfoyt
      </h1>
      <p className="text-center mt-3 space-x-4">
        <Link to="/about" className="text-blue-400 hover:text-blue-300">
          About
        </Link>
        <span>|</span>
        <Link to="/contact" className="text-blue-400 hover:text-blue-300">
          Contact
        </Link>
        <span>|</span>
        <Link to="/policy" className="text-blue-400 hover:text-blue-300">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
