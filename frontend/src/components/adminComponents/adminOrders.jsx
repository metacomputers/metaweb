import React, { useState, useEffect, useRef } from 'react';
import { Package, Trash2, Search, Filter } from 'lucide-react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../api/orderAPI.js';
import { toast, Toaster } from 'react-hot-toast';
import AdminLayout from "../common/AdminPanel.jsx";

const Orders = () => {
  // Use a single state object to reduce re-renders
  const [ordersState, setOrdersState] = useState({
    allOrders: [],
    filtered: [],
    loading: true,
    statusFilter: ''
  });

  // Keep search term in a ref to avoid re-renders
  const searchInputRef = useRef(null);
  const searchTermRef = useRef('');
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setOrdersState(prev => ({ ...prev, loading: true }));
      const response = await getAllOrders();
      console.log("Orders response:", response);
      if (response.success) {
        setOrdersState(prev => ({
          ...prev,
          allOrders: response.data,
          filtered: response.data,
          loading: false
        }));
      } else {
        toast.error('Failed to load orders: ' + (response.message || 'Unknown error'));
        setOrdersState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders: ' + (error.message || 'Unknown error'));
      setOrdersState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // Update orders list with new status
      setOrdersState(prev => {
        const updatedAllOrders = prev.allOrders.map(order => 
          order._id === orderId ? { ...order, deliveryStatus: newStatus } : order
        );
        
        return {
          ...prev,
          allOrders: updatedAllOrders,
          filtered: filterOrders(updatedAllOrders, searchTermRef.current, prev.statusFilter)
        };
      });
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        await deleteOrder(orderId);
        
        setOrdersState(prev => {
          const updatedAllOrders = prev.allOrders.filter(order => order._id !== orderId);
          return {
            ...prev,
            allOrders: updatedAllOrders,
            filtered: filterOrders(updatedAllOrders, searchTermRef.current, prev.statusFilter)
          };
        });
        
        toast.success('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order');
      }
    }
  };

  const viewOrderDetails = (order) => {
    setOrderDetails(order);
    setShowDetailsModal(true);
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

  // Filter function that doesn't use React state directly
  const filterOrders = (orders, searchTerm, statusFilter) => {
    return orders.filter(order => {
      if (!order) return false;
      
      const searchFields = [
        order.invoiceNumber?.toLowerCase() || '',
        order._id?.toLowerCase() || '',
        order.mobileNo?.toLowerCase() || '',
        order.user?.toString().toLowerCase() || ''
      ];
      
      const matchesSearch = searchTerm === '' || 
        searchFields.some(field => field.includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === '' || 
        order.deliveryStatus.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  };

  // Handle search without using React state directly
  const handleSearch = (e) => {
    const value = e.target.value;
    searchTermRef.current = value;
    
    const filtered = filterOrders(ordersState.allOrders, value, ordersState.statusFilter);
    
    setOrdersState(prev => ({
      ...prev,
      filtered
    }));
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    const value = e.target.value;
    
    const filtered = filterOrders(ordersState.allOrders, searchTermRef.current, value);
    
    setOrdersState(prev => ({
      ...prev,
      statusFilter: value,
      filtered
    }));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminLayout>
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6 mt-10">Order Management</h1>
          
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by customer mobile, order ID, user ID or invoice number..."
                  defaultValue=""
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoComplete="off"
                />
                <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              
              <div className="relative sm:w-64">
                <select
                  value={ordersState.statusFilter}
                  onChange={handleStatusFilter}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Filter size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {ordersState.loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {ordersState.filtered.length === 0 ? (
                  <div className="p-8 text-center">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">No orders found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ordersState.filtered.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => viewOrderDetails(order)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-md transition"
                                >
                                  View Details
                                </button>
                                <button 
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-md transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order._id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.invoiceNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">Customer ID: {order.user}</div>
                              <div className="text-sm text-gray-500">{order.mobileNo}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Rs.{order.totalPaid.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={order.deliveryStatus}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className={`text-white text-sm rounded-full px-3 py-1 ${getStatusColor(order.deliveryStatus)} focus:outline-none cursor-pointer`}
                              >
                                <option value="pending" className="bg-gray-700">Pending</option>
                                <option value="processing" className="bg-gray-700">Processing</option>
                                <option value="shipped" className="bg-gray-700">Shipped</option>
                                <option value="delivered" className="bg-gray-700">Delivered</option>
                                <option value="cancelled" className="bg-gray-700">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Order Details Modal */}
        {showDetailsModal && orderDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-auto">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold flex items-center">
                  <Package className="mr-2" size={20} />
                  Order Details
                </h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-gray-500 font-medium mb-2">Order Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Order ID</p>
                          <p className="text-gray-900">{orderDetails._id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Invoice Number</p>
                          <p className="text-gray-900">{orderDetails.invoiceNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Order Date</p>
                          <p className="text-gray-900">{formatDate(orderDetails.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Status</p>
                          <p className="flex items-center">
                            <span className={`${getStatusColor(orderDetails.deliveryStatus)} w-3 h-3 rounded-full mr-2`}></span>
                            <span className="text-gray-900 capitalize">{orderDetails.deliveryStatus}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 font-medium mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-gray-500 text-sm">Customer ID</p>
                        <p className="text-gray-900">{orderDetails.user}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-500 text-sm">Contact</p>
                        <p className="text-gray-900">{orderDetails.mobileNo}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-500 text-sm">Delivery Address</p>
                        <p className="text-gray-900">{orderDetails.deliveryAddress}</p>
                        <p className="text-gray-900">{orderDetails.district}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Payment Method</p>
                        <p className="text-gray-900">{orderDetails.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-gray-500 font-medium mb-2">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orderDetails.orderItems.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="flex items-center">
                                {item.image && (
                                  <img 
                                    src={`/uploads/${item.image}`} 
                                    alt={item.name} 
                                    className="h-10 w-10 object-cover rounded-md mr-3"
                                  />
                                )}
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">Rs.{item.price.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.qty}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                              Rs.{(item.price * item.qty).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                            Rs.{orderDetails.totalPaid.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Delivery Fee</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                            {orderDetails.district === "Colombo" && orderDetails.deliveryMethod === "Courier" 
                              ? "Free" 
                              : "Rs.500"}
                          </td>
                        </tr>
                        <tr className="bg-gray-100">
                          <td colSpan="3" className="px-6 py-4 text-base font-bold text-gray-900 text-right">Total</td>
                          <td className="px-6 py-4 text-base font-bold text-gray-900 text-right">
                            Rs.{orderDetails.totalPaid.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t bg-gray-50 flex justify-between">
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700">Update Status:</span>
                  <select
                    value={orderDetails.deliveryStatus}
                    onChange={(e) => {
                      setOrderDetails({...orderDetails, deliveryStatus: e.target.value});
                    }}
                    className="mr-3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button 
                    onClick={() => {
                      handleStatusChange(orderDetails._id, orderDetails.deliveryStatus);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Update Status
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      handleDeleteOrder(orderDetails._id);
                      setShowDetailsModal(false);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Delete Order
                  </button>
                  <button 
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Orders;