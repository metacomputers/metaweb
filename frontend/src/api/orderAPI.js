import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

// Helper function to get auth headers
const getAuthHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
};

// Get all orders (admin function)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/orders`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error.response?.data || error;
  }
};

// Get orders for the current user
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/orders`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error.response?.data || error;
  }
};

// Update order delivery status
export const updateOrderStatus = async (orderId, deliveryStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/orders/${orderId}`, 
      { deliveryStatus: deliveryStatus.toLowerCase() },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error.response?.data || error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/orders/${orderId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error.response?.data || error;
  }
};