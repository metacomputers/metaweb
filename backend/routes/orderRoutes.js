import express from "express";
import { 
  getAllOrders, 
  getUserOrders, 
  updateDeliveryStatus,
  deleteOrder
} from "../controllers/orderController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Protect all routes with authentication
router.use(authenticate);

// Admin routes
router.get("/admin/orders", authorizeAdmin, getAllOrders);
router.put("/admin/orders/:id", authorizeAdmin, updateDeliveryStatus);
router.delete("/admin/orders/:id", authorizeAdmin, deleteOrder);

// User route
router.get("/user/orders", getUserOrders);

export default router;