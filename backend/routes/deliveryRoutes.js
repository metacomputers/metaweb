import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import {
  addDelivery,
  updateDeliveryDetails,
  removeDelivery,
  fetchNewDeliveries,
  fetchDeliveryById,
  fetchAllDeliveries,
  //addProductReview,
} from "../controllers/deliveryController.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";

router.route("/").get(fetchNewDeliveries).post(formidable(), addDelivery); //Creating a product and fetch products
router.route("/alldeliveries").get(fetchAllDeliveries); //Fetching all the products
//router.route("/:id/reviews").post(addProductReview); //Add review
// router.route("/top").get(fetchTopProducts);
// router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchDeliveryById) //Fetching a product using PID
  .put(formidable(), updateDeliveryDetails) //updating a product
  .delete(formidable(), removeDelivery); //Removing a product

export default router;
