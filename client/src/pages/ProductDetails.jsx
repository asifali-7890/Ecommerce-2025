import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-12 pt-10">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 mt-16">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="rounded-lg shadow-md object-cover"
              height="400"
              width="100%"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-center md:text-left">{product.name}</h1>
            <hr className="my-6" />
            <h6 className="text-lg font-semibold">Description:</h6>
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            <h6 className="text-lg font-semibold">
              Price: {product?.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h6>
            <h6 className="text-lg font-semibold">Category: {product?.category?.name}</h6>
            <button className="mt-6 px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
              ADD TO CART
            </button>
          </div>
        </div>

        <hr className="my-12" />

        {/* Similar Products Section */}
        <div>
          <h4 className="text-2xl font-bold mb-8">Similar Products ➡️</h4>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-gray-500">No Similar Products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts?.map((p) => (
                <div className="border flex flex-col justify-between rounded-lg p-6 shadow-md transition-transform transform hover:scale-105" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="rounded-lg object-cover mb-6"
                  />
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-bold">{p.name}</h5>
                    <h5 className="text-lg font-semibold">
                      {p.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{p.description.substring(0, 60)}...</p>
                  <div className="flex space-x-6">
                    <button
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;