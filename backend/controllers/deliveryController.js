import { Error } from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import DeliveryData from "../models/deliveryModel.js";

const addDelivery = asyncHandler(async (req, res) => {
  try {
    const { orderNo, deliveryDate, deliveryPrice, totalPrice } = req.fields;

    //Validations
    switch (true) {
      case !orderNo:
        return res.json({ error: "Order No is required" });
      case !deliveryDate:
        return res.json({ error: "Delivery Date is required" });
      case !deliveryPrice:
        return res.json({ error: "Delivery Price is required" });
      case !totalPrice:
        return res.json({ error: "Total Price is required" });
    }

    const delivery = new DeliveryData({ ...req.fields }); //Creating delivery
    await delivery.save(); //saving delivery
    res.json(delivery); //showing delivery to the user
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateDeliveryDetails = asyncHandler(async (req, res) => {
  try {
    const delivery = await DeliveryData.findById(req.params.id);
    
    if (!delivery) {
      return res.status(404).json({ error: "Delivery not found" });
    }

    // Allow status update without requiring all fields
    if (req.fields.status) {
      delivery.status = req.fields.status;
      const updatedDelivery = await delivery.save();
      res.json(updatedDelivery);
      return;
    }

    // For full updates, keep existing validation
    const { orderNo, deliveryDate, deliveryPrice, totalPrice } = req.fields;

    //Validations
    switch (true) {
      case !orderNo:
        return res.json({ error: "Order No is required" });
      case !deliveryPrice:
        return res.json({ error: "Delivery Price is required" });
      case !deliveryDate:
        return res.json({ error: "Delivery Date is required" });
      case !totalPrice:
        return res.json({ error: "Total Price is required" });
    }

    delivery.orderNo = orderNo;
    delivery.deliveryDate = deliveryDate;
    delivery.deliveryPrice = deliveryPrice;
    delivery.totalPrice = totalPrice;
    
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const removeDelivery = asyncHandler(async (req, res) => {
  try {
    const delivery = await DeliveryData.findByIdAndDelete(req.params.id);

    if (!delivery) {
      return res.status(404).json({ error: "Delivery not found!" });
    }

    res.json({ message: "Delivery deleted successfully", delivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!!" });
  }
});

//Fetching products
const fetchAllDeliveries = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6; //Num of products in a page
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await DeliveryData.countDocuments({ ...keyword });
    const deliveries = await DeliveryData.find({ ...keyword }).limit(pageSize);

    res.json({
      deliveries,
      page: 1,
      pages: Math.ceil(count / pageSize), //calculate total num of pages
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!!" });
  }
});

//Fetching a delivery using PID
const fetchDeliveryById = asyncHandler(async (req, res) => {
  try {
    const delivery = await DeliveryData.findById(req.params.id);

    if (delivery) {
      return res.json(delivery);
    } else {
      res.status(404);
      throw new Error("Delivery Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Delivery Not Found..." });
  }
});

//Fetch all products for admin dashboard
const fetchNewDeliveries = asyncHandler(async (req, res) => {
  try {
    const deliveries = await DeliveryData.find({})
      //.populate("category")
      .limit(12)
      .sort({ deliveryDate: -1 });

    res.json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error..." });
  }
});

//
export {
  addDelivery,
  updateDeliveryDetails,
  removeDelivery,
  fetchAllDeliveries,
  fetchDeliveryById,
  fetchNewDeliveries,
};
