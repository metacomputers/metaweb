import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    try {
      console.log("Sending login request with:", { email, password });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/auth`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Login response data:", response.data);

      // Save the response (which should contain token and role) in localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      const userRole = response.data.role;
      console.log("User role from response:", userRole);

      //TODO : Add all the roles
      // Redirect user based on their role
      if (userRole && userRole.toLowerCase() === "admin") {
        console.log("Redirecting to admin page");
        navigate("/admin");
      } else {
        console.log("Redirecting to home page");
        navigate("/home");
      }
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
        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </form>
    </main>
  );
};

export default Login;
