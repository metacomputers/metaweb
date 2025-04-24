import express from "express";
import { 
  getAllOrders, 
  getUserOrders, 
  updateDeliveryStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Admin routes
router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/:id", updateDeliveryStatus);
router.delete("/admin/orders/:id", deleteOrder);

// User route
router.get("/user/orders", getUserOrders);

export default router;