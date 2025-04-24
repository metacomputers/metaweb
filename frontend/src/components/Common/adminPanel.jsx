// src/components/adminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ← Add this at the top with other imports
import { logoutUser } from "../../api/apiUsers"
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  Wrench,
  MessageSquare,
  Users,
  ShoppingCart,
  Truck,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate(); // ← Needed for programmatic navigation

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("userInfo");
      
      // For admin panel, you might want to redirect to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear localStorage even if the API call fails
      localStorage.removeItem("userInfo");
      navigate('/login');
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Add Product", icon: <PlusSquare size={20} />, path: "/admin/add-product" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
    { name: "Delivery", icon: <Truck size={20} />, path: "/admin/delivery" },
    { name: "Repairs", icon: <Wrench size={20} />, path: "/admin/repairs" },
    { name: "Consultations", icon: <MessageSquare size={20} />, path: "/admin/consultations" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 p-5 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          {/* <img src="/meta.png" alt="Meta Logo" className="w-8 h-8" /> */}
          <h2 className="text-2xl font-bold text-black">Admin Panel</h2>
        </div>

        <ul className="space-y-4">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path || "#"}
                className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Updated Logout Section */}
      <div className="mt-8">
        <hr className="border-gray-700 my-4" />
        <div
          className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer transition"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl text-black font-semibold">Dashboard</h1>

      <div
        className="cursor-pointer bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
        onClick={goToProfile}
        title="View Admin Profile"
      >
        <Users size={24} className="text-gray-700" />
      </div>
    </header>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
