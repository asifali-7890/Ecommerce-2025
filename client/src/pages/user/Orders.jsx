import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import OrdersPage from "./OrdersPage";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth,] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);



  return (
    <Layout title={"Your Orders"}>
      <OrdersPage orders={orders} />
    </Layout>

  );
};

export default Orders;
