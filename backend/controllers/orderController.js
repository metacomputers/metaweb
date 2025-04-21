import Order from '../models/orderModel.js';

// Get all orders (admin endpoint)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('orderItems.product', 'name price image')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const userId = "67d80d7b797a66a6f91baa8c"; // Replace with actual user ID from auth
    
    const orders = await Order.find({ user: userId })
      .populate('orderItems.product', 'name price image')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

export {
  getAllOrders,
  getUserOrders
};