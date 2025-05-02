import React, { useState } from "react";
import { addUser } from "../../api/apiUsers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AddUserModal = ({ isAdmin = false, loadUsers, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    address: "",
    role: ""
  });
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.trim().length < 2) {
          error = `${name === "firstName" ? "First" : "Last"} name must be at least 2 characters`;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Only letters and spaces are allowed";
        }
        break;
      
      case "username":
        if (value.trim().length < 3) {
          error = "Username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores";
        }
        break;
      
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;
      
      case "confirmPassword":
        if (value !== formValues.password) {
          error = "Passwords do not match";
        }
        break;
      
      case "mobileNo":
        if (!/^\d{10,15}$/.test(value.replace(/[-()\s]/g, ''))) {
          error = "Please enter a valid mobile number (10-15 digits)";
        }
        break;
      
      case "address":
        if (value.trim().length < 5) {
          error = "Address is too short";
        }
        break;
      
      case "role":
        if (isAdmin && !value) {
          error = "Please select a role";
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error
    });
    
    // Special case for confirmPassword to validate when password changes
    if (name === "password" && formValues.confirmPassword) {
      const confirmError = formValues.confirmPassword !== value ? "Passwords do not match" : "";
      setFormErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    Object.keys(formValues).forEach(field => {
      if (field === "role" && !isAdmin) return;
      
      const error = validateField(field, formValues[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };

  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();
      
      if (!validateForm()) {
        toast.error("Please fix the form errors before submitting");
        return;
      }
      
      setIsLoading(true);

      const newUser = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        mobileNo: formValues.mobileNo,
        address: formValues.address,
        role: isAdmin ? formValues.role : "Customer",
      };

      await addUser(newUser);
      
      if (isAdmin) {
        await loadUsers();
        onClose();
        toast.success("User created successfully!");
      } else {
        toast.success("Registration successful! Please log in to continue.");
        navigate("/login");
      }

      setFormValues({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNo: "",
        address: "",
        role: ""
      });
      setFormErrors({});
    } catch (error) {
      console.error(`Error registering user:`, error);
      // Set form errors based on the error message
      if (error.message.includes("email already exists")) {
        setFormErrors({ ...formErrors, email: "This email is already registered" });
        toast.error("This email is already registered");
      } else if (error.message.includes("username already exists")) {
        setFormErrors({ ...formErrors, username: "This username is already taken" });
        toast.error("This username is already taken");
      } else {
        toast.error(error.message || "Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#1f2937", // Matching the form color (slightly darker for contrast)
        display: "flex",
        alignItems: "flex-start", // Changed from center to flex-start
        justifyContent: "center",
        zIndex: 50,
        overflow: "auto", // Make it scrollable
        padding: "2rem 1rem" // Add padding all around
      }}
    >
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center items-center bg-gray-800 gap-6 shadow-xl rounded-xl p-8 w-full max-w-4xl border border-gray-700 relative my-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold text-white mb-4">
          {isAdmin ? "Create User" : "Create an Account"}
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                name="firstName"
                required
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.firstName ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                name="lastName"
                required
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.lastName ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                name="email"
                required
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.email ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Mobile Number
              </label>
              <input
                name="mobileNo"
                required
                type="tel"
                value={formValues.mobileNo}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.mobileNo ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.mobileNo && (
                <p className="text-red-500 text-sm mt-1">{formErrors.mobileNo}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                name="username"
                required
                type="text"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.username ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                name="password"
                required
                type="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.password ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                required
                type="password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
                  formErrors.confirmPassword ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Role</label>
                <select
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-700 text-white border ${
                    formErrors.role ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  required={isAdmin}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                  <option value="Technician">Technician</option>
                </select>
                {formErrors.role && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Address field spanning both columns */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Address
          </label>
          <textarea
            name="address"
            required
            value={formValues.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.address ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
            rows="3"
          />
          {formErrors.address && (
            <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 w-full justify-end mt-4">
          {isAdmin ? (
            <>
              <button
                type="button"
                className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || Object.values(formErrors).some(error => error)}
                className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </>
          ) : (
            <button
              type="submit"
              disabled={isLoading || Object.values(formErrors).some(error => error)}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;