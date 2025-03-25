import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap justify-center items-center">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 mt-8">
            <AdminMenu />
          </div>

          {/* Admin Info Card */}
          <div className="w-full md:w-3/4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Admin Name: {auth?.user?.name}</h3>
              <h3 className="text-lg font-semibold mb-2">Admin Email: {auth?.user?.email}</h3>
              <h3 className="text-lg font-semibold">Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default AdminDashboard;
