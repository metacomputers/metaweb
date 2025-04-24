import React from "react";
import { useNavigate } from "react-router-dom"; 
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
  DollarSign, // Added for financial section
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Add Product", icon: <PlusSquare size={20} />, path: "/admin/add-product" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
    { name: "Delivery", icon: <Truck size={20} />, path: "/admin/delivery" },
    { name: "Repairs", icon: <Wrench size={20} />, path: "/admin/repairs" },
    { name: "Consultations", icon: <MessageSquare size={20} />, path: "/admin/consultations" },
    { name: "Financial Insights", icon: <DollarSign size={20} />, path: "/admin/financials" }, // New financial section
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 p-5 shadow-md flex flex-col justify-between">
      {/* Rest of the sidebar code remains the same */}
      <div>
        <div className="flex items-center gap-3 mb-8">
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

// Header and AdminLayout components remain unchanged

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
