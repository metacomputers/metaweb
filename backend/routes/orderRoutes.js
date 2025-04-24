import express from "express";
import { getAllOrders, getUserOrders, updateDeliveryStatus, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

// Admin route to get all orders
router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/:id", updateDeliveryStatus);
router.delete("/admin/orders/:id", deleteOrder);

// User route to get their own orders
router.get("/user/orders", getUserOrders);

export default router;