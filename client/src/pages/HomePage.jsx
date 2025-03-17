import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Homepage.css";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth,] = useAuth();

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="pt-[64px]">
        Home page
        {auth && auth.user ? (
          <p>Welcome, {auth.user.name}</p>
        ) : (
          <p>Welcome, Guest</p>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
