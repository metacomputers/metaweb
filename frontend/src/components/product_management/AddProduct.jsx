import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const AddProduct = () => {
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const formData = new FormData(evt.target);
      const file = formData.get("image");

      // First upload the image
      const imageData = new FormData();
      imageData.append("image", file);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: imageData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      const fileName = result.image.substring(result.image.indexOf("image"));

      // Add the image name to the form data
      formData.append("imageName", fileName);

      // Add all other form fields
      formData.append("name", formData.get("name"));
      formData.append("description", formData.get("description"));
      formData.append("price", formData.get("price"));
      formData.append("category", formData.get("category"));
      formData.append("quantity", formData.get("quantity"));
      formData.append("brand", formData.get("brand"));

      // Send the product data
      const productResponse = await axios({
        method: "POST",
        url: "http://localhost:5000/api/products",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (productResponse.status === 200) {
        alert("Product added successfully!");
        evt.target.reset();
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(`Error while adding a product`, error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Failed to add product. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new product listing for your store</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              >
                <option value="">Select Category</option>
                <option value="Laptop-Gaming">Laptop-Gaming</option>
                <option value="Laptop">Laptop</option>
                <option value="Accessories">Accessories</option>
                <option value="Monitor">Monitor</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;