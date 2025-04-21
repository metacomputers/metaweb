import express from "express";
import { getAllOrders, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// Admin route to get all orders
router.get("/admin/orders", getAllOrders);

// User route to get their own orders
router.get("/user/orders", getUserOrders);

export default router;