import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault(); //prevents default behaviour of the form

      const formData = new FormData(evt.target);
      const file = formData.get("image");

      const imageData = new FormData();
      imageData.append("image", file);

      const response = await fetch("http://localhost:5002/api/upload", {
        method: "POST",
        body: imageData,
      });

      const result = await response.json();
      const fileName = result.image.substring(result.image.indexOf("image"));

      formData.append("imageName", fileName);

      await axios({
        method: "POST",
        url: "http://localhost:5002/api/products",
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
    <div className="bg-black min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add New Product
        </h2>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Product Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Description</label>
            <textarea
              name="description"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Category</label>
            <input
              type="text"
              name="category"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Brand</label>
            <input
              type="text"
              name="brand"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Image</label>
            <input
              type="file"
              name="image"
              required
              className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
