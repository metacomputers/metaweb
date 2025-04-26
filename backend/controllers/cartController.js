import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";


const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user._id; // Get user ID from JWT token

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Search for a cart with the user id
    let cart = await Cart.findOne({ user: userId });

    // If no cart found, create a new cart
    if (!cart) {
      cart = new Cart({
        user: userId,
        cartItems: [
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
      // If cart exists, check if the product is already in the cart
      const existingProduct = cart.cartItems.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        cart.cartItems.push({
          product: productId,
          name: product.name,
          qty,
          image: product.imageName,
          price: product.price,
        });
      }
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//fetching cart items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token

    // Find the user's cart by userId
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product', 'name price image');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send the cartItems as the response
    res.json({
      message: "Cart items fetched successfully",
      cart: cart.cartItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Update quantity of cart items

const updateCartItem = async (req, res) => {
    try {
      const { productId, qty } = req.body;
      const userId = req.user._id; // Get user ID from JWT token
  
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const productInCart = cart.cartItems.find(
        (item) => item.product.toString() === productId._id
      );
  
      if (!productInCart) return res.status(404).json({ message: "Product not in cart" });
  
      if (qty > 0) {
        productInCart.qty = qty;
        productInCart.price = qty * productId.price; 
      } else {
        cart.cartItems = cart.cartItems.filter(
          (item) => item.product.toString() !== productId._id
        );
      }
  
      await cart.save();
      res.json({ message: "Cart updated", cart });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const removeFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id; // Get user ID from JWT token
  
     const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      
      
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
  
      await cart.save();
      res.json({ message: "Product removed from cart", cart });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const checkoutCart = async (req, res) => {
    try {
      const { mobileNo, deliveryAddress, district, deliveryMethod, paymentMethod, invoiceNumber } = req.body;
      const userId = req.user._id; // Get user ID from JWT token
  
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.cartItems.length === 0)
        return res.status(400).json({ message: "Cart is empty" });

      //calculate total using reduce method to loop through the cart items array
      const totalPaid = cart.cartItems.reduce((total, item) => total + item.price, 0);
  
      const newOrder = new Order({
        user: userId,
        orderItems: cart.cartItems,
        totalPaid,
        mobileNo,
        deliveryAddress,
        district,
        deliveryMethod,
        paymentMethod,
        invoiceNumber,
        deliveryStatus: "pending",
        isPaid: true,
        paidAt: new Date(),
      });
  
      
      
      await newOrder.save();
      cart.cartItems = []; // Clear cart after checkout
      await cart.save();



      //await Cart.deleteOne({ user: userId }); // Clear cart after checkout
     // await Cart.deleteOne();
  
      res.json({ message: "Order placed successfully", order: newOrder });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  const searchCartItems = async (req, res) => {
    try {
      const { searchTerm } = req.query; // Get the search term from query parameters
      
      const userId = req.user._id; // Get user ID from JWT token
  
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart || cart.cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty or not found" });
      }
  
      // Search for products in the cart by matching the name with the search term
      const filteredItems = cart.cartItems.filter((item) => {
        if (item.name && typeof item.name === "string") {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false; // Skip if name is not defined or not a string
      });
      if (filteredItems.length === 0) {
        return res.status(404).json({ message: "No products found matching the search term" });
      }
  
      res.json({ message: "Search results", products: filteredItems });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export { addToCart, updateCartItem, removeFromCart, checkoutCart, searchCartItems, getCartItems };