import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import logo from "/meta_full.png";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const ProductDashboard = () => {
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 space-y-6">
        <img src={logo} alt="Company Logo" className="h-12 mx-auto" />
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
          onClick={() => navigate("/addproduct")}
        >
          <FiPlus className="mr-2" /> Add New Product
        </button>
      </aside>

      <div className="flex-1 p-6">
        {/* Header */}
        <header className="bg-white text-black py-6 px-6 rounded-lg shadow-md text-center text-xl font-bold w-full">
          Product Dashboard
        </header>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition transform duration-300 hover:shadow-lg">
                <img src={`/uploads/${product.imageName}`} alt={product.name} className="w-full h-32 object-cover rounded-md" />
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <p className="mt-2 font-bold text-blue-600 text-base">LKR.{product.price}.00</p>
                  <p className="text-gray-500 text-xs">Brand: {product.brand}</p>
                  <div className="mt-4 flex justify-between">
                    <button className="bg-red-500 text-black py-1 px-2 rounded-md hover:bg-red-600 transition text-lg" onClick={() => handleDelete(product._id)}>
                      <MdDeleteForever />
                    </button>
                    <button className="bg-green-500 text-black py-1 px-2 rounded-md hover:bg-green-600 transition text-lg" onClick={() => navigate(`/updateproduct/${product._id}`)}>
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
