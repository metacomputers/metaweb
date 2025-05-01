import express from "express";
import {
  addQuotation,
  getQuotation,
  removeQuotation,
  updateQuotationItem,
} from "../controllers/quotationController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Protect routes with authentication
router.use(authenticate);

router.post("/addQuotation", addQuotation);
router.get("/getQuotation", getQuotation);
router.put("/updateQuotationItem", updateQuotationItem);
router.delete("/removeQuotation", removeQuotation);

export default router;
