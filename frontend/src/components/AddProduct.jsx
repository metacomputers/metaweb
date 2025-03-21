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
          <form onSubmit={onFormSubmit} className="space-y-6"> {/* increased space-y-4 to space-y-6 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={4} // added rows for text area
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
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
              <label className="block text-sm font-semibold text-gray-700">
                Quantity Adding To Stock
              </label>
              <input
                type="number"
                name="quantity"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Image
              </label>
              <input
                type="file"
                name="image"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3" // added p-3 and changed focus color
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // added py-3, shadow-md, changed bg color and focus color.
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;