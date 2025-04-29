import React, { useEffect, useState } from "react";
import { User, Package, Wrench, MessageSquare } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("orders");

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
      console.log('Updating user with data:', { userId, updatedData });
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Profile updated successfully');
      } else {
        console.error('Update failed:', data);
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* User Information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-purple-400 font-semibold mb-3">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">First Name</p>
                  <p className="text-white">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Name</p>
                  <p className="text-white">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mobile Number</p>
                  <p className="text-white">{user.mobileNo || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-purple-400 font-semibold mb-3">Address Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white">{user.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Order History</span>
            </button>
            <button
              onClick={() => setActiveTab("repairs")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "repairs"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Wrench className="w-5 h-5" />
              <span>Repair Requests</span>
            </button>
            <button
              onClick={() => setActiveTab("consultations")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "consultations"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Consultations</span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === "orders" && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <FaClipboardList className="mr-2 text-purple-500" />
                Order History
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by invoice number or status..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-64 px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-400">Loading orders...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-gray-700 p-8 rounded-xl">
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
                    className="bg-gray-700 p-4 rounded-xl border border-gray-600 hover:border-purple-500 transition-colors"
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
        )}

        {/* Commented out sections for future implementation */}
        {activeTab === "repairs" && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center justify-center py-12">
              <Wrench className="text-4xl text-gray-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-400 mb-2">Repair Requests</h2>
              <p className="text-gray-500 text-center">
                This feature is coming soon. You'll be able to track your repair requests here.
              </p>
            </div>
          </div>
        )}

        {activeTab === "consultations" && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="text-4xl text-gray-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-400 mb-2">Consultations</h2>
              <p className="text-gray-500 text-center">
                This feature is coming soon. You'll be able to manage your consultations here.
              </p>
            </div>
          </div>
        )}
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
