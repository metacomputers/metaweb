import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
        toast.success("Product added successfully!");
        evt.target.reset();
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(`Error while adding a product`, error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md my-10">
      <div className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-light text-gray-800 mb-2">Add New Product</h1>
        <p className="text-gray-500 text-sm">Complete the form below to add a product to your inventory</p>
      </div>

      <form onSubmit={onFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\" /></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
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
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                  </div>
                  <input type="file" name="image" required className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all duration-200 font-medium"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;