import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import EditUserModal from "./userEditModal";
import { getUserOrders } from "../../api/orderAPI";
import { FaSearch, FaClipboardList, FaBox, FaEye } from "react-icons/fa";
import OrderDetailsModal from "../orderComponents/OrderDetailsModal";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
    
    if (user) {
      fetchOrders();
    }
  }, [user]);

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

  const handleUpdateProfile = async (userId, updatedData) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const filteredOrders = orders.filter(order => 
    order.invoiceNumber.toLowerCase().includes(searchTerm) || 
    order.deliveryStatus.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl">
          {/* Profile Icon and Username */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-purple-600 bg-gray-800 mb-2">
              <User size={48} className="text-purple-500" />
            </div>

            <h2 className="text-2xl font-semibold">{user.username}</h2>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base mb-8">
            <div>
              <label className="text-gray-400">First Name</label>
              <p>{user.firstName}</p>
            </div>
            <div>
              <label className="text-gray-400">Last Name</label>
              <p>{user.lastName}</p>
            </div>
            <div>
              <label className="text-gray-400">Contact No</label>
              <p>{user.contact}</p>
            </div>
            <div>
              <label className="text-gray-400">Billing Address</label>
              <p>{user.billingAddress}</p>
            </div>
            <div>
              <label className="text-gray-400">Shipping Address</label>
              <p>{user.shippingAddress}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Order History */}
          <div className="mt-12">
            <div className="flex items-center justify-center mb-6">
              <FaClipboardList className="text-2xl mr-3 text-purple-500" />
              <h3 className="text-2xl font-semibold">Order History</h3>
            </div>

            <div className="mb-6 bg-gray-800 p-4 rounded-xl">
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

            {loading ? (
              <div className="text-center text-gray-400">Loading orders...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-xl">
                <FaBox className="text-4xl text-gray-600 mb-4" />
                <p className="text-center text-gray-400">
                  {searchTerm ? "No orders match your search." : "You haven't placed any orders yet."}
                </p>
                <button 
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                  onClick={() => window.location.href = '/products'}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-800 p-4 rounded-xl border border-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="text-gray-400 text-sm">Invoice Number</h3>
                        <p className="text-white font-medium">{order.invoiceNumber}</p>
                        <h3 className="text-gray-400 text-sm mt-2">Date</h3>
                        <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm">Total Amount</h3>
                        <p className="text-white font-bold">Rs.{order.totalPaid.toLocaleString()}</p>
                        <h3 className="text-gray-400 text-sm mt-2">Payment Method</h3>
                        <p className="text-white font-medium">{order.paymentMethod}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm">Items</h3>
                        <p className="text-white font-medium">{order.orderItems.length} items</p>
                        <h3 className="text-gray-400 text-sm mt-2">Delivery Method</h3>
                        <p className="text-white font-medium">{order.deliveryMethod}</p>
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-gray-400 text-sm">Status</h3>
                          <div className="flex items-center mt-1">
                            <span 
                              className={`${getStatusColor(order.deliveryStatus)} w-3 h-3 rounded-full mr-2`}
                            ></span>
                            <span className="text-white font-medium capitalize">{order.deliveryStatus}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="px-3 py-1.5 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm"
                          >
                            <FaEye className="mr-1" /> View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditUserModal 
          user={user} 
          onClose={() => setIsModalOpen(false)} 
          onUpdate={handleUpdateProfile}
        />
      )}

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

export default Profile;
