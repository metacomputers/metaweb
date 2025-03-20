import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
