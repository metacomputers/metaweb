import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import StockPDF from "./StockPDF.jsx";

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
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 py-4">
        {/* Header with Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <StockPDF allProducts={products} />
          <div className="w-64">
            <input
              type="text"
              name="brand"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={`/uploads/${product.imageName}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{product.description.slice(0,30)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-600">Rs.{product.price.toLocaleString()}.00</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{product.brand}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-3">
                        <button
                          className="text-green-500 hover:text-green-600 transition-colors"
                          onClick={() => navigate(`/admin/updateproduct/${product._id}`)}
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDelete(product._id)}
                        >
                          <MdDeleteForever className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-600">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;