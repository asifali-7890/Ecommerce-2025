import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mx-auto p-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Menu */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserMenu />
          </div>

          {/* User Information */}
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800">{auth?.user?.name}</h3>
              <h3 className="text-lg text-gray-600">{auth?.user?.email}</h3>
              <h3 className="text-lg text-gray-600">{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
