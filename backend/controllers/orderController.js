import Order from '../models/orderModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all orders (admin endpoint)
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access all orders'
      });
    }

    const orders = await Order.find({})
      .populate({
        path: 'user',
        select: 'firstName lastName email username'
      })
      .populate('orderItems.product', 'name price image')
      .sort({ createdAt: -1 });
    
    
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
});

// Get orders for the logged-in user
const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated user
    
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
});

// Update order delivery status (admin only)
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update order status'
      });
    }

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
});

// Delete an order (admin only)
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete orders'
      });
    }

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
});

export {
  getAllOrders,
  getUserOrders,
  updateDeliveryStatus,
  deleteOrder
};