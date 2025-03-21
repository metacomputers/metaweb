import React from "react";
import axios from "axios";

const Login = () => {
  const onFormSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const email = evt.target.email.value;
      const password = evt.target.password.value;

      const data = {
        email,
        password,
      };

      // Sending POST request to login
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/auth`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Login Successful:", response.data);

      // Save user details in local storage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // TODO: Redirect to dashboard or home
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-10 min-h-screen p-5">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center items-center gap-6 shadow-xl rounded-md p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold">Login to Your Account</h3>

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
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            required
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-600">Don't have an account? Sign Up </p>
      </form>
    </main>
  );
};

export default Login;
