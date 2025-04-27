import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../api/orderAPI';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminFinancials = () => {
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    monthlyData: []
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      if (response && response.success) {
        const completedOrders = response.data.filter(order => 
          order.deliveryStatus?.toLowerCase() === 'delivered'
        );

        // Calculate totals
        const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalPaid || 0), 0);
        const totalOrders = completedOrders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate monthly data
        const monthlyData = calculateMonthlyData(completedOrders);

        setFinancialData({
          totalRevenue,
          totalOrders,
          averageOrderValue,
          monthlyData
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateMonthlyData = (orders) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Initialize monthly data with zeros
    const monthlyData = months.map(month => ({
      month,
      revenue: 0,
      orders: 0
    }));

    // Fill in actual data
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].revenue += order.totalPaid || 0;
      monthlyData[monthIndex].orders += 1;
    });

    return monthlyData;
  };

  const chartData = {
    labels: financialData.monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Monthly Revenue (Rs.)',
        data: financialData.monthlyData.map(data => data.revenue),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Number of Orders',
        data: financialData.monthlyData.map(data => data.orders),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders and Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            Rs.{financialData.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">
            {financialData.totalOrders.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Average Order Value</h2>
          <p className="text-3xl font-bold text-purple-600">
            Rs.{financialData.averageOrderValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="h-[400px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminFinancials;
