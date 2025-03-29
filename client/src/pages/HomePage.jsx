import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [, setCart] = useCart();

  // Fetch categories and total products count once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const catRes = await axios.get("/api/v1/category/get-categories");
        if (catRes.data?.success) setCategories(catRes.data.category);

        const totalRes = await axios.get("/api/v1/product/product-count");
        setTotal(totalRes.data?.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products (pagination)
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // For page 1, replace products; for later pages, append
      setProducts((prev) => (page === 1 ? res.data.products : [...prev, ...res.data.products]));
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [page]);

  // Load products when page changes (but not on page 1 if filters are active)
  useEffect(() => {
    if (!checked.length && !radio.length) {
      fetchProducts();
    }
  }, [page, checked.length, radio.length, fetchProducts]);

  // Filter products by category and price
  const filterProducts = useCallback(async () => {
    try {
      const res = await axios.post("/api/v1/product/product-filters", { checked, radio });
      setProducts(res.data?.products);
    } catch (error) {
      console.error(error);
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio, filterProducts]);

  // Handle category filter checkbox
  const handleFilter = (checkedValue, id) => {
    setChecked((prev) =>
      checkedValue ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  return (
    <Layout title="All Products - Best Offers">
      {/* Banner */}
      <div className="w-full">
        <img
          src="/images/banner.png"
          alt="Banner"
          className="w-full object-cover h-64 md:h-96"
          style={{
            filter: "brightness(0.8)",
          }}
        />
      </div>

      <div className="container mx-auto  flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 bg-white shadow p-6 rounded-lg">
          <h4 className="text-xl font-bold text-center mb-4">Filter By Category</h4>
          <div className="flex flex-col space-y-2 ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="text-gray-700 "
              >
                <span className="text-lg">{c.name}</span>
              </Checkbox>
            ))}
          </div>

          <h4 className="text-xl font-bold text-center mt-8 mb-4">Filter By Price</h4>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 py-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col md:flex-row">
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array} className="md:mr-4">
                  <span className="text-lg">{p.name}</span>
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <button
            className="mt-8 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </aside>

        {/* Products Section */}
        <section className="w-full md:w-3/4 ">
          <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-3">
            {products?.map((p) => (
              <div
                key={p._id}
                className="bg-white flex flex-col shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                {/* Product Image */}
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-xl font-bold mb-2">{p.name}</h5>

                  <p className="text-gray-700 text-lg font-semibold mb-2">
                    {p.price
                      ? p.price.toLocaleString("en-US", { style: "currency", currency: "USD" })
                      : "Price not available"}
                  </p>

                  <p className="text-gray-600 mb-4 flex-grow">
                    {p.description.length > 60 ? `${p.description.substring(0, 60)}...` : p.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 mt-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-gray-400 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
                      onClick={() => {
                        setCart((prevCart) => {
                          const newCart = [...prevCart, p];
                          localStorage.setItem("cart", JSON.stringify(newCart));
                          return newCart;
                        });
                        toast.success("Item Added to Cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </div>

          {/* Load More Button */}
          <div className="m-8 text-center">
            {products && products.length < total && (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                onClick={() => setPage((prev) => prev + 1)}
              >
                {loading ? "Loading..." : (
                  <>
                    Load More <AiOutlineReload className="inline ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
