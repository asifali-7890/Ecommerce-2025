import React from 'react';
import Layout from './../components/Layout/Layout'; // Adjust the import path as necessary

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mx-auto mt-10 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Privacy Policy Content Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-gray-700 mb-4">
            We may collect personal information such as your name, email address, and phone number when you register on our site or place an order.
          </p>
          <p className="text-gray-700 mb-4">
            We use this information to process your orders, improve our services, and communicate with you about your account and orders.
          </p>
          <p className="text-gray-700 mb-4">
            We implement a variety of security measures to maintain the safety of your personal information.
          </p>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent.
          </p>
          <p className="text-gray-700 mb-4">
            By using our site, you consent to our privacy policy.
          </p>
          <p className="text-gray-700 mb-4">
            If you have any questions about this privacy policy, please contact us.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;