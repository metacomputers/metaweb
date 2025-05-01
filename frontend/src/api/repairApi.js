import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/maintenance/repairs`;

// Get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

// Get all repairs (admin only)
export const getAllRepairs = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching all repairs:', error);
    throw error.response?.data || error;
  }
};

// Get user's repairs
export const getUserRepairs = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user repairs:', error);
    throw error.response?.data || error;
  }
};

// Get repair by ID
export const getRepairById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching repair:', error);
    throw error.response?.data || error;
  }
};

// Create repair
export const createRepair = async (repairData) => {
  try {
    const response = await axios.post(API_URL, repairData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating repair:', error);
    throw error.response?.data || error;
  }
};

// Update repair
export const updateRepair = async (id, repairData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      repairData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating repair:', error);
    throw error.response?.data || error;
  }
};

// Delete repair (admin only)
export const deleteRepair = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting repair:', error);
    throw error.response?.data || error;
  }
}; 