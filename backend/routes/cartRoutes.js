import express from "express";
import { addToCart, 
        updateCartItem, 
        removeFromCart, 
        checkoutCart, 
        searchCartItems, 
        getCartItems } from "../controllers/cartController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Protect all cart routes with authentication
router.use(authenticate);

router.post("/addToCart", addToCart);
router.get("/getCartItems", getCartItems);
router.put("/updateCartItem", updateCartItem);
router.delete("/removeFromCart", removeFromCart);
router.post("/checkout", checkoutCart);
router.get("/search", searchCartItems);

export default router;
