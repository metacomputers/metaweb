import React, { useEffect, useState } from "react";
import { getQuotationItems, removeFromQuotation, updateQuotationItem } from "../../api/quotationApi";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { QuotationPDF } from "../../components/product_management/QuotationPDF";
import {
  FaTrash,
  FaFileAlt,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const QuotationPage = () => {
  const [quotationItems, setQuotationItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get quotation items
  useEffect(() => {
    const fetchQuotationItems = async () => {
      try {
        const items = await getQuotationItems();
        setQuotationItems(items.quotation);
      } catch (error) {
        setError("Failed to load quotation items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotationItems();
  }, []);

  // Update item quantity
  const handleUpdate = async (productId, qty) => {
    if (qty < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    try {
      const updatedItem = await updateQuotationItem(productId, Number(qty));

      if (updatedItem) {
        setQuotationItems((prev) =>
          prev.map((item) =>
            item.product === productId ? { ...item, qty: Number(qty) } : item
          )
        );
        toast.success("Quantity updated!");
      } else {
        toast.error("Failed to update quantity!");
      }
    } catch (error) {
      console.error("Error updating quantity: ", error);
      toast.error("Failed to update quantity!");
    }
  };

  // Remove an item from quotation
  const handleRemove = async (productId) => {
    const confirm = window.confirm("Are you sure you want to remove this item?");
    if (!confirm) return;

    try {
      const response = await removeFromQuotation(productId);
      if (response.message === "Product removed from quotation") {
        setQuotationItems((prev) =>
          prev.filter((item) => item.product !== productId)
        );
        toast.success("Item removed from quotation");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing item: ", error);
      toast.error("Could not remove item.");
    }
  };

  // Calculate total quotation amount
  const totalAmount = quotationItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-red-400 text-red-400 px-6 py-4 rounded-lg shadow-lg max-w-md w-full">
        <p className="font-bold text-lg mb-2">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center mb-10">
          <FaFileAlt className="text-3xl mr-3 text-purple-500 mt-25" />
          <h1 className="text-4xl font-bold text-white mt-25">
            Your Quotation
          </h1>
        </div>

        {quotationItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-800 p-12 rounded-2xl shadow-xl">
            <FaFileAlt className="text-6xl text-gray-600 mb-4" />
            <p className="text-center text-xl text-gray-400">
              Your quotation is currently empty.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 transform hover:scale-105"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quotation Items Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {quotationItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex flex-col sm:flex-row items-center bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/10 border border-gray-700"
                  >
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-2 rounded-xl">
                      <img
                        src={`../../../public/uploads/${item.image}`}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-lg"
                      />
                    </div>

                    <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                      <h2 className="text-xl font-semibold text-white">
                        {item.name}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">Price: Rs.{item.price.toLocaleString()}</p>

                      <div className="flex items-center mt-4 gap-3">
                        <button
                          onClick={() => handleUpdate(item.product, item.qty - 1)}
                          className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.qty <= 1}
                        >
                          <FaMinus className="text-xs" />
                        </button>

                        <span className="w-12 px-3 py-1 bg-gray-700 text-white rounded-md text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => handleUpdate(item.product, item.qty + 1)}
                          className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full mt-4 sm:mt-0">
                      <p className="text-lg font-bold text-white mb-4">
                        Rs.{(item.qty * item.price).toLocaleString()}
                      </p>

                      <button
                        onClick={() => handleRemove(item.product)}
                        className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <FaTrash className="mr-2" /> Remove
                      </button>
                    </div>
                  </div>
                ))}

                {quotationItems.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => navigate('/products')}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-medium"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quotation Summary */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-fit border border-gray-700">
              <h2 className="flex items-center justify-center text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">
                <FaFileAlt className="text-3xl mr-3 text-purple-500" />
                Quotation Summary
              </h2>


              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg text-gray-300">
                  <span>Subtotal</span>
                  <span>Rs.{totalAmount.toLocaleString()}</span>
                </div>

                <p className="text-sm text-gray-400 italic">
                  Shipping will be added at checkout.
                </p>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>Rs.{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {quotationItems.length > 0 && (
                <div className="flex justify-center space-y-4">
                  <QuotationPDF quotationItems={quotationItems} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationPage;