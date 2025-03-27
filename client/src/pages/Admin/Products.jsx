import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row dashboard p-4 pt-24">
        <div className="w-full md:w-1/4 ">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-center text-2xl font-bold my-4">All Products List</h1>
          <div className="flex flex-wrap justify-center">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="m-2"
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden w-72">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-48 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold">{p.name}</h5>
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Products;
