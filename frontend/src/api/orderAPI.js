import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Get all orders (admin function)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Get orders for the current user
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Update order delivery status
export const updateOrderStatus = async (orderId, deliveryStatus) => {
  try {
    const response = await axios.put(`${API_URL}/admin/orders/${orderId}`, { 
      deliveryStatus: deliveryStatus.toLowerCase() 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};