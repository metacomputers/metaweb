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

export { addQuotation };
