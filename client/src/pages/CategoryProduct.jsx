import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6">
        <h4 className="text-center text-2xl font-semibold">Category - {category?.name}</h4>
        <h6 className="text-center text-gray-600">{products?.length} result{products?.length !== 1 && "s"} found</h6>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products?.map((p) => (
            <div key={p._id} className="card bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold">{p.name}</h5>
                  <h5 className="text-lg font-semibold text-green-500">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="text-gray-600 mt-2">{p.description.substring(0, 60)}...</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export default CategoryProduct;
