import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdSearch } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import StockPDF from "./StockPDF.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
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
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Management</h2>
          <p className="text-gray-600 mb-6">Total Products: {products.length}</p>

          {/* Header with Search Bar and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <StockPDF allProducts={products} />

            <div className="relative w-full md:w-64">
              <input
                type="text"
                name="brand"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <MdSearch className="absolute left-3 top-2.5 text-gray-500 text-lg" />
            </div>
          </div>

          {/* Product Table */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">IMAGE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">NAME</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">PRICE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">BRAND</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">QUANTITY IN STOCK</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                            <img
                              src={`/uploads/${product.imageName}`}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-800">{product.name.substring(0, 20)}...</p>
                          <p className="text-xs text-gray-500">ID: {product._id.substring(0, 8)}...</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-gray-800 text-center">
                            Rs.{product.price.toLocaleString()}.00
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-center align-middle">
                          <span className={`${product.quantity < 5 ? 'text-red-500 font-bold ' : 'text-green-500 font-bold'}`}>
                            {product.quantity || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                              onClick={() => navigate(`/admin/updateproduct/${product._id}`)}
                              title="Edit Product"
                            >
                              <FaEdit size={20} />
                            </button>
                            <button
                              className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
                              onClick={() => handleDelete(product._id)}
                              title="Delete Product"
                            >
                              <MdDeleteForever size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-600">
                        {searchTerm ?
                          `No products found matching "${searchTerm}"` :
                          "No products found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;