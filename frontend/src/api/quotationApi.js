import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/quotations'; // Base URL for quotation endpoints

// Helper function to get auth headers
const getAuthHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
};
  
// Add a product to quotation
export const addQuotation = async (productId, qty) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addQuotation`,
        { productId, qty },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to quotation:', error);
      throw error;
    }
  };

// Fetch quotation items for the current user
export const getQuotationItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getQuotationItems`, getAuthHeaders());
    return response.data.quotation;
  } catch (error) {
    console.error('Error fetching quotation items:', error);
    throw error;
  }
};

// Update quotation item quantity
export const updateQuotationItem = async (productId, qty) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/updateQuotationItem`,
      { productId, qty },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating quotation item:', error);
    throw error;
  }
};

// Remove item from quotation
export const removeFromQuotation = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/removeFromQuotation`,
      {
        ...getAuthHeaders(),
        data: { productId: productId._id }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing from quotation:', error);
    throw error;
  }
};

// Request official quotation (Similar to checkout)
export const requestQuotation = async (contactInfo) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/requestQuotation`,
      contactInfo,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error requesting official quotation:', error);
    throw error;
  }
};