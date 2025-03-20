import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  //addProductReview,

} from "../controllers/productController.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

router.route("/").get(fetchProducts).post(formidable(), addProduct); //Creating a product and fetch products
router.route("/allproducts").get(fetchAllProducts); //Fetching all the products
//router.route("/:id/reviews").post(addProductReview); //Add review
// router.route("/top").get(fetchTopProducts);
// router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById) //Fetching a product using PID
  .put(formidable(), updateProductDetails) //updating a product
  .delete(formidable(), removeProduct); //Removing a product

export default router;
