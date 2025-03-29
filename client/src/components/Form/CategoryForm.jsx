import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-indigo-50">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-8">
        Create New Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="category-name"
            className="block text-sm font-semibold text-indigo-900/80 mb-3"
          >
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            className="w-full px-5 py-3 border-2 border-indigo-100 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition-all duration-300 placeholder-indigo-300/60 text-indigo-900
                     focus:shadow-lg focus:shadow-purple-100 bg-white"
            placeholder="e.g. Digital Art"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 
                    hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl
                    transition-all duration-300 transform hover:scale-[1.02] active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                    shadow-md hover:shadow-lg"
        >
          <span className="drop-shadow-sm">Create Category</span>
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;