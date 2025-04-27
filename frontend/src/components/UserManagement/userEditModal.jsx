import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditUserModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    contact: user.contact || "",
    billingAddress: user.billingAddress || "",
    shippingAddress: user.shippingAddress || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input dynamically
    let newErrors = { ...errors };

    if (name === "firstName" || name === "lastName") {
      newErrors[name] = value.length < 2 ? "Must be at least 2 characters" : "";
    } else if (name === "email") {
      newErrors[name] = /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email";
    } else if (name === "contact") {
      newErrors[name] = /^\d{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== "");
    if (hasErrors) {
      return;
    }

    onUpdate(user._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.firstName ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          {/* Last Name */}          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.lastName ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Email */}      
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                errors.contact ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              required
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Billing Address</label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="2"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="2"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
