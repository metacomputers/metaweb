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

// Update order delivery status
const updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryStatus } = req.body;
    
    // Validate the status is one of the allowed values
    const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    
    if (!deliveryStatus || !allowedStatuses.includes(deliveryStatus.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Valid delivery status is required (pending, processing, shipped, delivered, cancelled)'
      });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Update order status
    order.deliveryStatus = deliveryStatus.toLowerCase();
    
    // Update additional fields based on status
    if (deliveryStatus.toLowerCase() === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (deliveryStatus.toLowerCase() === "cancelled") {
      order.isCancelled = true;
      order.cancelledAt = Date.now();
    }
    
    const updatedOrder = await order.save();
    
    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    await Order.deleteOne({ _id: req.params.id });
    
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

export {
  getAllOrders,
  getUserOrders,
  updateDeliveryStatus,
  deleteOrder

};