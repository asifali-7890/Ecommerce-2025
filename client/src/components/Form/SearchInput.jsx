import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Import search icon

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center my-2 px-4">
      <form
        className="flex w-full max-w-2xl relative group"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full pl-12 pr-6 py-3 text-lg rounded-2xl border-2 border-purple-100 
                   focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100
                   transition-all duration-300 placeholder-purple-300/80 text-purple-900
                   shadow-sm hover:shadow-md focus:shadow-lg"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />

        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-500 
                    text-white px-4 py-2 rounded-xl font-semibold shadow-md
                    hover:from-purple-700 hover:to-pink-600 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                    transition-all duration-300 transform hover:scale-105 active:scale-95"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;