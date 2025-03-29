import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      // Add await here to wait for the response
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto p-6 pt-20 bg-gray-50 min-h-screen">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Create Product
              </h1>

              {/* Category Selector */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-5 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* File Upload */}
              <div className="mb-5 w-full">
                <label className="block w-full h-12 p-2">
                  <span className="block bg-gray-100 border border-gray-300 text-gray-600 rounded-lg py-2 px-4 text-center cursor-pointer">
                    {photo ? photo.name : "Upload Photo"}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Display uploaded photo */}
              {photo && (
                <div className="mb-5 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-48 w-auto rounded-lg shadow-md mx-auto"
                  />
                </div>
              )}

              {/* Product Name */}
              <div className="mb-5">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Product Description */}
              <div className="mb-5">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="form-textarea w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="mb-5">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="form-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping Option */}
              <div className="mb-5">
                <Select
                  bordered={false}
                  placeholder="Select Shipping Option"
                  size="large"
                  className="form-select w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No Shipping</Option>
                  <Option value="1">Shipping Available</Option>
                </Select>
              </div>

              {/* Create Button */}
              <div className="mb-5">
                <button
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
                  onClick={handleCreate}
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
