import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto my-8 pt-5">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
          <div className="w-full md:w-1/2 mt-12">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="rounded-lg shadow-md object-cover pt-2"
              height="300"
              width="100%"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-center md:text-left">Product Details</h1>
            <hr className="my-4" />
            <h6 className="text-lg font-semibold">Name: {product.name}</h6>
            <h6 className="text-lg">Description: {product.description}</h6>
            <h6 className="text-lg font-semibold">
              Price: {product?.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h6>
            <h6 className="text-lg">Category: {product?.category?.name}</h6>
            <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
              ADD TO CART
            </button>
          </div>
        </div>

        <hr className="my-8" />

        {/* Similar Products Section */}
        <div>
          <h4 className="text-xl font-bold mb-6">Similar Products ➡️</h4>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-gray-500">No Similar Products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts?.map((p) => (
                <div className="border rounded-lg p-4 shadow-md" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="rounded-lg object-cover mb-4"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-bold">{p.name}</h5>
                    <h5 className="text-lg font-semibold">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{p.description.substring(0, 60)}...</p>
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
