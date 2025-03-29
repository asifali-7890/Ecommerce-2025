import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container mx-auto p-6 mt-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="bg-gray-800 text-white text-center p-4 rounded-lg mb-4">CONTACT US</h1>
            <p className="text-gray-700 text-justify mb-4">
              If you have any queries or need information about our products, feel free to call us anytime. We are available 24/7.
            </p>
            <p className="mt-3 text-gray-700">
              <BiMailSend className="inline mr-2" />: <a href="mailto:www.help@ecommerceapp.com" className="text-blue-600">www.help@ecommerceapp.com</a>
            </p>
            <p className="mt-3 text-gray-700">
              <BiPhoneCall className="inline mr-2" />: 012-3456789
            </p>
            <p className="mt-3 text-gray-700">
              <BiSupport className="inline mr-2" />: 1800-0000-0000 (Toll Free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
