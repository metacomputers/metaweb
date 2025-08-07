import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, MapPin } from "lucide-react";

const EditUserModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobileNo: user.mobileNo || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate input
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        error = value.length < 2 ? "Must be at least 2 characters" : "";
        break;
      case "mobileNo":
        error = /^\d{10}$/.test(value)
          ? ""
          : "Enter a valid 10-digit phone number";
        break;
      case "address":
        error = value.length < 5 ? "Address must be at least 5 characters" : "";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    onUpdate(user._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 flex justify-center items-center z-50 p-5 overflow-auto">
      <div className="bg-gray-800 shadow-2xl rounded-xl w-full max-w-md mx-4 border border-gray-700 relative max-h-[90vh] ooverflow-y-scroll scrollbar-hide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8">
          <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
          <p className="text-gray-400">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full p-3 pl-12 bg-gray-700 text-white border ${
                  errors.firstName ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                required
              />
              <User
                className="absolute top-3.5 left-4 text-gray-400"
                size={20}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full p-3 pl-12 bg-gray-700 text-white border ${
                  errors.lastName ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                required
              />
              <User
                className="absolute top-3.5 left-4 text-gray-400"
                size={20}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Your email address"
                className="w-full p-3 pl-12 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none cursor-not-allowed opacity-70"
                readOnly
              />
              <Mail
                className="absolute top-3.5 left-4 text-gray-400"
                size={20}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter your 10-digit mobile number"
                className={`w-full p-3 pl-12 bg-gray-700 text-white border ${
                  errors.mobileNo ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                required
              />
              <Phone
                className="absolute top-3.5 left-4 text-gray-400"
                size={20}
              />
            </div>
            {errors.mobileNo && (
              <p className="text-red-400 text-sm mt-1">{errors.mobileNo}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Address
            </label>
            <div className="relative">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full p-3 pr-4 pl-12 bg-gray-700 text-white border ${
                  errors.address ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none`}
                rows="3"
                required
              />
              <MapPin
                className="absolute top-3.5 left-4 text-gray-400"
                size={20}
              />
            </div>
            {errors.address && (
              <p className="text-red-400 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium"
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
