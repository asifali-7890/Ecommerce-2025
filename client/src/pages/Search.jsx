import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast, { Toaster } from "react-hot-toast";

const Search = () => {
  const [values,] = useSearch();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <h6 className="text-lg text-gray-600 mb-8">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>

          <div className="flex flex-wrap justify-center gap-6">
            {values?.results.map((p) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden w-72 "
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
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-lg font-bold mb-4 text-gray-800">$ {p.price}</p>
                  <div className="flex justify-between gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className=" bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
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
