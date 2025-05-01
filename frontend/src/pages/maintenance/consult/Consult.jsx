import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createConsultation } from "../../../api/consultApi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Consult = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    category: "",
    details: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}`,
        mobile: user.mobileNo || user.contact || ""
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^07\d{8}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number format (07XXXXXXXX)";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    } else if (formData.details.length < 10) {
      newErrors.details = "Details must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const consultationData = {
        customerName: formData.name,
        mobile: formData.mobile,
        issueCategory: formData.category,
        detailsOfIssue: formData.details,
      };

      const response = await createConsultation(consultationData);
      toast.success("Request Successfully Submitted", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563",
        },
      });
      navigate(`/consult-invoice/${response.data._id}`);
    } catch (error) {
      console.error('Error creating consultation:', error);
      toast.error(error.message || 'Failed to create consultation request', {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>

          <h3 className="text-2xl font-bold text-white mb-6">Consultation Request Form</h3>

          <form onSubmit={onFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Mobile
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your mobile number"
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.mobile ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400`}
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-400">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.category ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white`}
              >
                <option value="">Select a category</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Security">Security</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-400">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Details
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Describe your requirements"
                rows="4"
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.details ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400`}
              />
              {errors.details && (
                <p className="mt-1 text-sm text-red-400">{errors.details}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition duration-200 font-medium"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consult;