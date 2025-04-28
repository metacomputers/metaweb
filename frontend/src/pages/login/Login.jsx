import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User, Lock, X } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/users/auth",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Show success message
      toast.success("Login successful! Welcome back!");

      // Redirect based on role
      const userRole = response.data.role?.toLowerCase();
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col justify-center items-center p-5">
      <div className="w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Please sign in to your account</p>
        </div>

        <form
          onSubmit={onFormSubmit}
          className="bg-gray-800 shadow-2xl rounded-xl p-8 space-y-6 border border-gray-700"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                name="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 pl-12 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
              <User className="absolute top-3.5 left-4 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 pl-12 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
              <Lock className="absolute top-3.5 left-4 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
