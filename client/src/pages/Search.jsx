import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast, { Toaster } from "react-hot-toast";

const Search = () => {
  const [values,] = useSearch();
  const navigate = useNavigate();

  const [, setCart] = useCart();

  return (
    <Layout title={"Search Results"}>
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <h6 className="text-lg text-gray-600 mb-8">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>

          <div className="flex flex-wrap justify-center gap-8">
            {values?.results.map((p) => (
              <div
                className="bg-white flex flex-col justify-between shadow-lg rounded-lg overflow-hidden w-72 transition-transform transform hover:scale-105"
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                  <p className="text-gray-600 mb-2">
                    {p.description.length > 30 ? `${p.description.substring(0, 30)}...` : p.description}
                  </p>
                  <p className="text-lg font-bold mb-4 text-gray-800">
                    {p.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </p>
                  <div className="flex justify-between gap-2 whitespace-nowrap">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                      onClick={() => {
                        setCart((prevCart) => {
                          const newCart = [...prevCart, p];
                          localStorage.setItem("cart", JSON.stringify(newCart));
                          toast.success("Item Added to cart");
                          return newCart;
                        });
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
