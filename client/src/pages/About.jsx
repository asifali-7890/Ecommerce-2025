import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Ecommerce App"}>
      <div className="container mx-auto p-6 mt-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/images/about.jpeg"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Asif's Ecommerce</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Welcome to Asif's Ecommerce, your one-stop online destination for high-quality products at unbeatable prices. Our mission is to bring you a seamless and enjoyable shopping experience, from browsing our extensive collection to receiving your order at your doorstep.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded with a passion for delivering value and convenience, Asif's Ecommerce is committed to offering a wide range of products that cater to all your needs. From the latest in fashion, electronics, home essentials, to lifestyle products, we aim to provide something for everyone.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Values:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Customer First:</strong> Your satisfaction is our top priority. We go the extra mile to ensure every shopping experience with us is smooth, secure, and enjoyable.</li>
              <li><strong>Quality Products:</strong> We believe in offering only the best. That’s why we handpick every item, ensuring it meets our high standards of quality and craftsmanship.</li>
              <li><strong>Fast & Reliable Delivery:</strong> We understand the importance of timely delivery. With a trusted shipping network, your order reaches you quickly and in perfect condition.</li>
              <li><strong>Affordable Pricing:</strong> Great products don’t have to come with a hefty price tag. We make sure to provide the best deals without compromising on quality.</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Whether you're looking for a stylish outfit, the latest gadgets, or unique home décor, we’ve got you covered. At Asif's Ecommerce, we bring the world of online shopping right to your fingertips, all from the comfort of your home.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Thank you for choosing us, and happy shopping!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
