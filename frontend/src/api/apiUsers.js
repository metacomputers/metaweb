import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}`, newUser);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUser = async (username, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${username}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};