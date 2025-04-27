import React from 'react';
import { BarChart, DollarSign, TrendingUp, Users } from 'lucide-react';

const AdminFinancials = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Financial Insights</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold">Rs. 150,000</h3>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Sales</p>
              <h3 className="text-2xl font-bold">Rs. 45,000</h3>
            </div>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
            <BarChart className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Customers</p>
              <h3 className="text-2xl font-bold">856</h3>
            </div>
            <Users className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Revenue Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Sales Distribution Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancials;
