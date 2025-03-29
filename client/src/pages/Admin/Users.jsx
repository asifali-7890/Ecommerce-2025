import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">All Users</h1>
            {/* You can add a table or list here to display users */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-600">User  list will be displayed here.</p>
              {/* Example of a user list or table can be added here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
