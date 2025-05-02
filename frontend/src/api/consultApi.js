import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/maintenance/consults`;

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

// Get all consultations (admin only)
export const getAllConsultations = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching all consultations:', error);
    throw error.response?.data || error;
  }
};

// Get user's consultations
export const getUserConsults = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user consultations:', error);
    throw error.response?.data || error;
  }
};

// Get consultation by ID
export const getConsultationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching consultation:', error);
    throw error.response?.data || error;
  }
};

// Alias for getConsultationById to maintain backward compatibility
export const getConsultById = getConsultationById;

// Create consultation
export const createConsultation = async (consultData) => {
  try {
    const response = await axios.post(API_URL, consultData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating consultation:', error);
    throw error.response?.data || error;
  }
};

// Update consultation
export const updateConsultation = async (id, consultData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      consultData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating consultation:', error);
    throw error.response?.data || error;
  }
};

// Delete consultation (admin only)
export const deleteConsultation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting consultation:', error);
    throw error.response?.data || error;
  }
}; 