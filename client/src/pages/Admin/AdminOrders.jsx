import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status,] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth,] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success("Order status updated successfully!");
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="All Orders Data">
      <Toaster />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
        {/* Admin Menu */}
        <div>
          <AdminMenu />
        </div>

        {/* Orders Section */}
        <div className="col-span-2">
          <h1 className="text-center text-2xl font-semibold mb-6">All Orders</h1>

          {orders?.map((o, i) => (
            <div key={i} className="border shadow-lg rounded-lg mb-6">
              <table className="min-w-full table-auto text-left bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Buyer</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Payment</th>
                    <th className="py-2 px-4">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">
                      <Select
                        variant={false}
                        className="w-full"
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, index) => (
                          <Option key={index} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="py-2 px-4">{o?.buyer?.name}</td>
                    <td className="py-2 px-4">{moment(o?.createdAt).fromNow()}</td>
                    <td className="py-2 px-4">{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td className="py-2 px-4">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>

              {/* Product Details */}
              <div className="p-4 bg-gray-50">
                {o?.products?.map((p, i) => (
                  <div
                    key={p._id}
                    className="flex items-center bg-white shadow-sm p-4 mb-4 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold">{p.name}</p>
                      <p className="text-gray-600">{p.description.substring(0, 30)}...</p>
                      <p className="text-blue-600 font-semibold">Price: ₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
