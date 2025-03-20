import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/allproducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
