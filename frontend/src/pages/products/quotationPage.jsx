import React, { useEffect, useState } from "react";
import { getQuotationItems, removeFromQuotation, updateQuotationItem } from "../../api/quotationApi";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-hot-toast";
import { QuotationPDF } from "../../components/product_management/QuotationPDF";

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
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Quotation</h1>
        
        {quotationItems.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">No items in your quotation</h3>
            <p className="mt-1 text-gray-500">Add products to request pricing information.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotationItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={`../../../public/uploads/${item.image}`}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            {item.description && <div className="text-sm text-gray-500">{item.description.substring(0, 50)}...</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Rs.{item.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => handleUpdate(item.product, item.qty - 1)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-l-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleUpdate(item.product, e.target.value)}
                            className="w-12 text-center border-x py-1 focus:outline-none"
                            min="1"
                          />
                          <button
                            onClick={() => handleUpdate(item.product, item.qty + 1)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Rs.{(item.price * item.qty).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemove(item.product)}
                          className="text-red-600 hover:text-red-900 transition duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <QuotationPDF quotationItems={quotationItems}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs.{totalAmount.toLocaleString()}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping will be calculated at checkout.</p>
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuotationPage;