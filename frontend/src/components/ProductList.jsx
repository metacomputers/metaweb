import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Product List</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Add Product Button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-6"
          onClick={() => navi("/addproduct")}
        >
          + Add New Product
        </button>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            name="category"
            placeholder="Search by category"
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition transform duration-300 hover:scale-105"
              >
                <img
                  src={`/uploads/${product.imageName}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-3 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="mt-2 font-bold text-blue-600 text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    onClick={() => navi(`/updateproduct/${product._id}`)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
