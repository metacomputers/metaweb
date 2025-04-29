import express from "express";
import { addQuotation } from "../controllers/quotationController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Protect routes with authentication
router.use(authenticate);

router.post("/addQuotation", addQuotation);

export default router;
