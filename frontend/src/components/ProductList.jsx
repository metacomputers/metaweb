import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import logo from "/meta_full.png";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-black text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div>
              <img src={logo} alt="Company Logo" className="h-15 mr-2" />
            </div>
            <div className="flex-grow text-center">
              <h1 className="text-3xl font-semibold">Product Dashboard</h1>
            </div>
          </div>
          <button
            className="bg-blend-normal text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
            onClick={() => navigate("/addproduct")}
          >
            + Add New Product
          </button>
        </div>
      </header>


      <div className="container mx-auto px-4 py-8">
        {/* Search Bar*/}
        <div className="mb-6">
          <input
            type="text"
            name="brand"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition transform duration-300 hover:shadow-lg"
              >
                <img
                  src={`/uploads/${product.imageName}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {product.description}
                  </p>
                  <p className="mt-2 font-bold text-blue-600 text-base">
                    LKR.{product.price}.00
                  </p>
                  <p className="text-gray-500 text-xs">Brand: {product.brand}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => handleDelete(product._id)}
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-600 transition-colors"
                      onClick={() => navigate(`/updateproduct/${product._id}`)}
                    >
                      <FaEdit className="text-2xl" />
                    </button>
                  </div>
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
