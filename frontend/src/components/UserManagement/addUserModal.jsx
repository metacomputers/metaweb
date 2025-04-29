import React, { useState } from "react";
import { addUser } from "../../api/apiUsers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AddUserModal = ({ isAdmin = false, loadUsers, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setIsLoading(true);
      setFormErrors({});

      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const confirmPassword = evt.target.confirmPassword.value;
      const mobileNo = evt.target.mobileNo.value;
      const address = evt.target.address.value;
      const role = isAdmin ? evt.target.role.value : "Customer";

      // Validate password match
      if (password !== confirmPassword) {
        setFormErrors({ confirmPassword: "Passwords do not match" });
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const newUser = {
        firstName,
        lastName,
        username,
        email,
        password,
        mobileNo,
        address,
        role: role,
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

      evt.target.reset();
    } catch (error) {
      console.error(`Error registering user:`, error);
      // Set form errors based on the error message
      if (error.message.includes("email already exists")) {
        setFormErrors({ email: "This email is already registered" });
        toast.error("This email is already registered");
      } else if (error.message.includes("username already exists")) {
        setFormErrors({ username: "This username is already taken" });
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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        zIndex: 50,
      }}
    >
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center items-center bg-gray-800 gap-6 shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-700 relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold text-white">
          {isAdmin ? "Create User" : "Create an Account"}
        </h3>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            First Name
          </label>
          <input
            name="firstName"
            required
            type="text"
            placeholder="Enter your first name"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.firstName ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Last Name
          </label>
          <input
            name="lastName"
            required
            type="text"
            placeholder="Enter your last name"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.lastName ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="Enter your email"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.email ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Mobile Number
          </label>
          <input
            name="mobileNo"
            required
            type="tel"
            placeholder="Enter your mobile number"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.mobileNo ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.mobileNo && (
            <p className="text-red-500 text-sm mt-1">{formErrors.mobileNo}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Address
          </label>
          <textarea
            name="address"
            required
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

        {isAdmin && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300">Role</label>
            <select
              name="role"
              className={`w-full p-3 bg-gray-700 text-white border ${
                formErrors.role ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
              required
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

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            name="username"
            required
            type="text"
            placeholder="Enter your username"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.username ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            name="password"
            required
            type="password"
            placeholder="Enter a secure password"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.password ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            required
            type="password"
            placeholder="Confirm your password"
            className={`mt-1 w-full p-3 bg-gray-700 text-white border ${
              formErrors.confirmPassword ? "border-red-500" : "border-gray-600"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>

        {isAdmin ? (
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200 w-full"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 w-1/2 whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddUserModal;
