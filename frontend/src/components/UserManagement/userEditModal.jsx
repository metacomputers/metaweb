import React, { useState } from "react";

const EditUserModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

      // Validate input dynamically
      let newErrors = { ...errors };

      if (name === "firstName" || name === "lastName") {
          newErrors[name] = value.length < 2 ? "Must be at least 2 characters" : "";
      } else if (name === "email") {
          newErrors[name] = /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email";
      } else if (name === "role") {
          newErrors[name] = value ? "" : "Please select a role";
      }
  
      setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);

    const updatedUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
    };

    onUpdate(user.username, updatedUser);

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>

          {/* First Name */}
          <div className="mb-3">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.firstName ? "border-red-500" : ""}`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          
          {/* Last Name */}          
          <div className="mb-3">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.lastName ? "border-red-500" : ""}`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Email */}      
          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.email ? "border-red-500" : ""}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Role Selection Dropdown */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border rounded p-2 bg-white ${errors.role ? "border-red-500" : ""}`}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
