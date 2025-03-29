import React from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop.jsx";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[calc(100vh-110.4px)]">
        {children}
      </main>
      <Toaster />
      <ScrollToTop smooth />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Asif Ali",
};

export default Layout;
