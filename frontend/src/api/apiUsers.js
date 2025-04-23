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
    const response = await axios.get(`${API_URL}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth`,
      { email, password },
      {
        withCredentials: true, // include if you're using cookies/session
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data?.message || "Login failed";
  }
};
