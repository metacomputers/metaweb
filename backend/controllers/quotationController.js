import Product from "../models/productModel.js";
import Quotation from "../models/quotationModel.js";

const addQuotation = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Search for a quotation with the user id
    let quotation = await Quotation.findOne({ user: userId });

    //If no previous quotations, create new one
    if (!quotation) {
      quotation = new Quotation({
        user: userId,
        quotationItems: [
          {
            product: productId,
            name: product.name,
            qty,
            image: product.imageName,
            price: product.price,
          },
        ],
      });
    } else {
      // If quotation exists, check if the product is already in the their
      const existingQuotation = quotation.quotationItems.find(
        (item) => item.product.toString() === productId
      );

      if (existingQuotation) {
        existingQuotation.qty += qty;
      } else {
        quotation.quotationItems.push({
          product: productId,
          name: product.name,
          qty,
          image: product.imageName,
          price: product.price,
        });
      }
    }

    await quotation.save();
    res.json({ message: "product added to quotation", quotation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Fetch quotation items
const getQuotation = async (req, res) => {
  try {
    const userId = req.user._id; //User ID from jwt token

    //Find user's quotations by userId
    const quotation = await Quotation.findOne({ user: userId }).populate(
      "quotationItems.product",
      "name price image"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation  not found" });
    }

    //Sending quotation items as response
    res.json({
      message: "Quotation fetched successfully",
      quotation: quotation.quotationItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update quotation item quantity
const updateQuotationItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user._id;

    //Find user's quotation by userId
    const quotation = await Quotation.findOne({ user: userId });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation  not found" });
    }

    const productInQuotation = quotation.quotationItems.find(
      (item) => item.product.toString() === productId._id
    );

    if (!productInQuotation) {
      return res
        .status(404)
        .json({ message: "Product not found in quotation" });
    }

    //Get available quantity of product
    const product = await Product.findById(productId._id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    //Check requested quantity availbe
    if (qty > product.quantity) {
      return res.status(400).json({
        message: `Only ${product.quantity} items available in stock...`,
        availableQuantity: product.quantity,
      });
    }

    if (qty > 0) {
      productInQuotation.qty = qty;
      productInQuotation.price = qty * productId.price;
    } else {
      quotation.quotationItems = quotation.quotationItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await quotation.save();
    res.json({ message: "Quotation Updated", quotation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Remove quotation Items
const removeQuotation = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    //Find user's quotations by userId
    const quotation = await Quotation.findOne({ user: userId });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation  not found" });
    }

    quotation.quotationItems = quotation.quotationItems.filter(
      (item) => item.product.toString() !== productId
    );

    await quotation.save();
    res.json({ message: "Product removed from quotation", quotation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addQuotation, getQuotation, removeQuotation, updateQuotationItem };
