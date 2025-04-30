import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cart'; //base URL

// Helper function to get auth headers
const getAuthHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
};

// Fetch all products (From the Shop Page) //Done by product catelogue Management
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`); //product endpoint
    return response.data; //response data from the server/backend
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async (productId, qty) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addToCart`,
      { productId, qty },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Fetch cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getCartItems`, getAuthHeaders());
    return response.data.cart;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId, qty) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updateCartItem`,
      { productId, qty },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/removeFromCart`,
      {
        ...getAuthHeaders(),
        data: { productId: productId._id }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Checkout (Create Order)
export const checkoutCart = async (mobileNo, deliveryAddress, district, deliveryMethod, paymentMethod, invoiceNumber) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/checkout`,
      { mobileNo, deliveryAddress, district, deliveryMethod, paymentMethod, invoiceNumber },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};