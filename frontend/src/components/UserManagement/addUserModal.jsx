import React from "react";
import { addUser } from "../../api/apiUsers";

const AddUserModal = ({isAdmin = false, loadUsers, onClose}) => {
  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const username = evt.target.username.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const role = isAdmin? evt.target.role.value:"Customer";

      const newUser = {
        firstName,
        lastName,
        username,
        email,
        password,
        role: role
      };

      await addUser(newUser);
      await loadUsers();
      onClose();
      
      evt.target.reset();
    } catch (error) {
      console.error(`Error registering user`, error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center items-center bg-white gap-6 shadow-xl rounded-md p-6 w-full max-w-md "
          >
            <h3 className="text-xl font-semibold">
              {isAdmin ? "Create User" : "Create an Account"}
              </h3>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                required
                type="text"
                placeholder="Enter your first name"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                required
                type="text"
                placeholder="Enter your last name"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                required
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium">Role</label>
              <select
                name="role"
                className={"w-full border rounded p-2 bg-white"}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Technician">Technician</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                required
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                required
                type="password"
                placeholder="Enter a secure password"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {isAdmin ? (
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-200 w-full ml-2"
                  onClick={onClose} 
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-1/2 whitespace-nowrap"
                >
                  Create
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-1/2 whitespace-nowrap"
              >
                Register
              </button>
            )}

          </form>
        
    </div>
  );
};

export default AddUserModal;