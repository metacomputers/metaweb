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

      const imageData = new FormData();
      imageData.append("image", file);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: imageData,
      });

      const result = await response.json();
      const fileName = result.image.substring(result.image.indexOf("image"));

      formData.append("imageName", fileName);

      await axios({
        method: "POST",
        url: "http://localhost:5000/api/products",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      evt.target.reset();
      navigate("/");
    } catch (error) {
      console.error(`Error while adding a product`, error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-black shadow p-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-amber-50 hover:text-blue-400 transition"
        >
          <IoMdArrowBack />
        </button>
        <h1 className="text-xl font-semibold text-white">Add New Product</h1>
        <div></div>
      </header>
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto mt-8">
          <form onSubmit={onFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>

              <select
                name="category"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-gray-700">
                Quantity Adding To Stock
              </label>
              <input
                type="number"
                name="quantity"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                name="image"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;