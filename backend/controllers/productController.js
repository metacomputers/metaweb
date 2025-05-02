import { Error } from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

//Add product controller
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validations
    if (!name)
      return res.status(400).json({ error: "Product name is required" });
    if (!brand) return res.status(400).json({ error: "Brand is required" });
    if (!price || isNaN(price) || price <= 0)
      return res.status(400).json({ error: "Valid price is required" });
    if (!description || description.length < 1)
      return res
        .status(400)
        .json({ error: "Description must be at least 10 characters" });
    if (!category)
      return res.status(400).json({ error: "Category is required" });
    if (!quantity || isNaN(quantity) || quantity < 1)
      return res.status(400).json({ error: "Quantity must be at least 1" });

    const product = new Product({ ...req.fields }); //Creating product instance
    await product.save(); //saving product
    res.json(product); //showing product to the user
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

//Update product details function
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validations
    if (!name)
      return res.status(400).json({ error: "Product name is required" });
    if (!brand) return res.status(400).json({ error: "Brand is required" });
    if (!price || isNaN(price) || price <= 0)
      return res.status(400).json({ error: "Valid price is required" });
    if (!description || description.length < 10)
      return res
        .status(400)
        .json({ error: "Description must be at least 10 characters" });
    if (!category)
      return res.status(400).json({ error: "Category is required" });
    if (!quantity || isNaN(quantity) || quantity < 1)
      return res.status(400).json({ error: "Quantity must be at least 1" });

    const product = await Product.findByIdAndUpdate(
      req.params.id, //Retrieving ProductID from URL
      { ...req.fields },
      { new: true }
    );
    await product.save(); //saving product
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

//Delete Product function
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!!" });
  }
});

//Fetching products
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6; //Num of products in a page

    const count = await Product.countDocuments();
    const products = await Product.find().limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize), //calculate total num of pages
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!!" });
  }
});

//Fetching a product using PID
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product Not Found..." });
  }
});

//Fetch all products for admin dashboard
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).limit(12).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error..." });
  }
});

//
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
};
