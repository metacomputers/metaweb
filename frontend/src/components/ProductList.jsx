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
      const response = await fetch(`http://localhost:5002/api/products/${id}`, {
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

  // const handleUpdate = (id) => {
  //   console.log("Update product with ID:", id);
  //   // update functionality here
  // };

  return (


    <div className="container mx-auto px-4 py-8">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        onClick={() => navi("/addproduct")}
      >
        + Add New Product
      </button>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Product List
      </h2>

      <div>
        <input
          type="text"
          name="category"
          required
          className="mt-1 w-full p-2 border rounded-md bg-gray-800 text-white"
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition duration-300 hover:scale-105"
            >
              <img
                src={`/uploads/${product.imageName}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
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
  );
};

export default ProductList;
