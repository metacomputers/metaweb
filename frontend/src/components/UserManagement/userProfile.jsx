import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import EditUserModal from "./userEditModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-xl">
        {/* Profile Icon and Username */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-purple-600 bg-gray-800 mb-2">
            <User size={48} className="text-purple-500" />
          </div>

          <h2 className="text-2xl font-semibold">{user.username}</h2>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base mb-8">
          <div>
            <label className="text-gray-400">First Name</label>
            <p>{user.firstName}</p>
          </div>
          <div>
            <label className="text-gray-400">Last Name</label>
            <p>{user.lastName}</p>
          </div>
          <div>
            <label className="text-gray-400">Contact No</label>
            <p>{user.contact}</p>
          </div>
          <div>
            <label className="text-gray-400">Billing Address</label>
            <p>{user.billingAddress}</p>
          </div>
          <div>
            <label className="text-gray-400">Shipping Address</label>
            <p>{user.shippingAddress}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Order History */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          <div className="space-y-4">
            {user.orders?.length > 0 ? (
              user.orders.map((order, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <p>
                    <span className="text-gray-400">Order ID:</span> {order.id}
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span> {order.status}
                  </p>
                  <p>
                    <span className="text-gray-400">Date:</span> {order.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && <EditUserModal onClose={() => setIsModalOpen(false)} user={user} />}
    </div>
  );
};

export default Profile;
