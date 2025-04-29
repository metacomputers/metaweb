import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBox, 
  FaClipboardList, 
  FaUsers, 
  FaWrench,
  FaComments
} from 'react-icons/fa';
import { fetchAllProducts } from '../../api/productApi';
import { getAllOrders } from '../../api/orderAPI';
import { fetchUsers } from '../../api/apiUsers';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products
        const productsData = await fetchAllProducts();
        const totalProducts = productsData.length;

        // Fetch orders
        const ordersData = await getAllOrders();
        const totalOrders = ordersData?.data?.length || 0;

        // Fetch users
        const usersData = await fetchUsers();
        const totalUsers = Array.isArray(usersData) ? usersData.length : 0;

        setStats({
          products: totalProducts,
          orders: totalOrders,
          users: totalUsers
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Products',
      value: stats.products,
      color: 'text-purple-500',
      icon: <FaBox className="text-2xl" />
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      color: 'text-blue-500',
      icon: <FaClipboardList className="text-2xl" />
    },
    {
      title: 'Total Users',
      value: stats.users,
      color: 'text-green-500',
      icon: <FaUsers className="text-2xl" />
    },
    {
      title: 'Total Repairs',
      value: '45',
      color: 'text-red-500',
      icon: <FaWrench className="text-2xl" />
    },
    {
      title: 'Consultation Requests',
      value: '28',
      color: 'text-yellow-500',
      icon: <FaComments className="text-2xl" />
    }
  ];

  const adminInstructions = [
    "Manage products: Add, edit, or remove products from your store",
    "Track orders: View and update order statuses",
    "User management: Monitor and manage user accounts",
    "View analytics: Check sales and performance metrics",
    "Generate reports: Create and download business reports"
  ];

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 mt-10 text-gray-800">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 text-lg">{stat.title}</p>
                  <p className={`${stat.color} text-3xl font-bold mt-2`}>{stat.value}</p>
                </div>
                <div className="text-gray-800">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Instructions Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What You Can Do</h2>
          <ul className="space-y-3">
            {adminInstructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-600">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin; 