import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orderAPI";
import Loader from "../../components/cartComponents/Loader";
import { Toaster, toast } from "react-hot-toast";
import { FaSearch, FaClipboardList, FaBox, FaEye } from "react-icons/fa";
import OrderDetailsModal from "../../components/orderComponents/OrderDetailsModal";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        
        if (response.success) {
          setOrders(response.data);
        } else {
          setError(response.message || "Failed to load orders");
          toast.error(response.message || "Could not load your orders");
        }
      } catch (err) {
        setError("Failed to load orders");
        toast.error("Could not load your orders");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const filteredOrders = orders.filter(order => 
    order.invoiceNumber.toLowerCase().includes(searchTerm) || 
    order.deliveryStatus.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center mb-10">
          <FaClipboardList className="text-3xl mr-3 text-purple-500 mt-25" />
          <h1 className="text-4xl font-bold text-white mt-25">
            Your Orders
          </h1>
        </div>

        <div className="mb-8 bg-gray-800 p-4 rounded-xl shadow-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by invoice number or status..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-800 p-12 rounded-2xl shadow-xl">
            <FaBox className="text-6xl text-gray-600 mb-4" />
            <p className="text-center text-xl text-gray-400">
              {searchTerm ? "No orders match your search." : "You haven't placed any orders yet."}
            </p>
            <button 
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/products'}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <h3 className="text-gray-400 text-sm">Invoice Number</h3>
                    <p className="text-white font-medium">{order.invoiceNumber}</p>
                    <h3 className="text-gray-400 text-sm mt-3">Date</h3>
                    <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  
                  <div className="md:col-span-1">
                    <h3 className="text-gray-400 text-sm">Total Amount</h3>
                    <p className="text-white font-bold">Rs.{order.totalPaid.toLocaleString()}</p>
                    <h3 className="text-gray-400 text-sm mt-3">Payment Method</h3>
                    <p className="text-white font-medium">{order.paymentMethod}</p>
                  </div>
                  
                  <div className="md:col-span-1">
                    <h3 className="text-gray-400 text-sm">Items</h3>
                    <p className="text-white font-medium">{order.orderItems.length} items</p>
                    <h3 className="text-gray-400 text-sm mt-3">Delivery Method</h3>
                    <p className="text-white font-medium">{order.deliveryMethod}</p>
                  </div>
                  
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-400 text-sm">Status</h3>
                      <div className="flex items-center mt-1">
                        <span 
                          className={`${getStatusColor(order.deliveryStatus)} w-3 h-3 rounded-full mr-2`}
                        ></span>
                        <span className="text-white font-medium capitalize">{order.deliveryStatus}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 md:mt-0 justify-end">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="px-4 py-2 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
                      >
                        <FaEye className="mr-2" /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          show={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default UserOrdersPage;