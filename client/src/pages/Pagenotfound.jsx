import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './../components/Layout/Layout'; // Adjust the import path as necessary


const NotFoundPage = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-center">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition duration-200 shadow-md">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;