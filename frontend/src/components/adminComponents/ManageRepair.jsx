import { useEffect, useState } from "react";
import { FaSearch, FaClipboardList, FaBox, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { getAllRepairs, updateRepair, deleteRepair } from "../../api/repairApi";

const ManageRepair = () => {
  const [repairs, setRepairs] = useState([]);
  const [editRepair, setEditRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const options = ["Pending", "In Progress", "Completed", "Cancelled"];

  // Fetch repairs
  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const response = await getAllRepairs();
      setRepairs(response.data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load repairs");
      toast.error("Could not load repairs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Open edit modal
  const openEditModal = (repair) => {
    setEditRepair({ ...repair });
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditRepair(null);
  };

  // Handle input change in modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRepair((prev) => ({ ...prev, [name]: value }));
  };

  // Update repair
  const saveEdit = async () => {
    try {
      const updatedData = { ...editRepair };
      delete updatedData._id;

      await updateRepair(editRepair._id, updatedData);
      toast.success("Repair updated successfully");
      fetchRepairs();
      closeEditModal();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update repair");
    }
  };

  // Delete repair
  const handleDeleteRepair = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this repair?"
    );
    if (!confirmDelete) return;

    try {
      await deleteRepair(id);
      setRepairs(repairs.filter((repair) => repair._id !== id));
      toast.success("Repair deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete repair");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "in progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">{error}</div>
  );

  const filteredRepairs = repairs.filter(repair => 
    repair.customerName.toLowerCase().includes(searchTerm) ||
    repair.deviceName.toLowerCase().includes(searchTerm) ||
    repair.status.toLowerCase().includes(searchTerm)
  );

  const activeRepairs = filteredRepairs.filter(
    repair => !["Completed", "Cancelled"].includes(repair.status)
  );

  const completedRepairs = filteredRepairs.filter(
    repair => ["Completed", "Cancelled"].includes(repair.status)
  );

  const RepairCard = ({ repair }) => (
    <div
      key={repair._id}
      className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-purple-500/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Reference #</h3>
          <p className="text-gray-800 font-medium">{repair._id}</p>
          <h3 className="text-gray-500 text-sm mt-3">Customer</h3>
          <p className="text-gray-800 font-medium">{repair.customerName}</p>
          <h3 className="text-gray-500 text-sm mt-3">Mobile</h3>
          <p className="text-gray-800 font-medium">{repair.mobile}</p>
        </div>
        
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Device</h3>
          <p className="text-gray-800 font-medium">{repair.deviceName}</p>
          <h3 className="text-gray-500 text-sm mt-3">Issue</h3>
          <p className="text-gray-800 font-medium line-clamp-2">{repair.issueDescription}</p>
        </div>
        
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Created</h3>
          <p className="text-gray-800 font-medium">{formatDate(repair.createdAt)}</p>
          <h3 className="text-gray-500 text-sm mt-3">Updated</h3>
          <p className="text-gray-800 font-medium">{formatDate(repair.updatedAt)}</p>
        </div>
        
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Status</h3>
            <div className="flex items-center mt-1">
              <span 
                className={`${getStatusColor(repair.status)} w-3 h-3 rounded-full mr-2`}
              ></span>
              <span className="text-gray-800 font-medium capitalize">{repair.status}</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0 justify-end">
            <button
              onClick={() => openEditModal(repair)}
              className="px-4 py-2 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDeleteRepair(repair._id)}
              className="px-4 py-2 flex items-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <FaClipboardList className="text-3xl mr-3 text-gray-800" />
            <h1 className="text-4xl font-bold text-gray-800">
              Manage Repairs
            </h1>
          </div>
          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
            <FaUser className="text-gray-600 mr-2" />
            <span className="text-gray-800 font-medium">Admin Dashboard</span>
          </div>
        </div>

        <div className="mb-8 bg-gray-50 p-4 rounded-xl shadow-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer name, device, or status..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "active"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Active Repairs
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "completed"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed Repairs
          </button>
        </div>

        {filteredRepairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-50 p-12 rounded-2xl shadow-xl">
            <FaBox className="text-6xl text-gray-400 mb-4" />
            <p className="text-center text-xl text-gray-600">
              {searchTerm ? "No repairs match your search." : "No repairs found."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "active" ? (
              activeRepairs.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600">No active repairs</p>
                </div>
              ) : (
                activeRepairs.map(repair => (
                  <RepairCard key={repair._id} repair={repair} />
                ))
              )
            ) : (
              completedRepairs.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600">No completed repairs</p>
                </div>
              ) : (
                completedRepairs.map(repair => (
                  <RepairCard key={repair._id} repair={repair} />
                ))
              )
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editRepair && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-xl w-96 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Repair</h2>

            <label className="block text-gray-600 mb-2">Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={editRepair.customerName}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={editRepair.mobile}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Device Name:</label>
            <input
              type="text"
              name="deviceName"
              value={editRepair.deviceName}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Issue Description:</label>
            <textarea
              name="issueDescription"
              value={editRepair.issueDescription}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>

            <label className="block text-gray-600 mb-2">Status:</label>
            <select
              name="status"
              value={editRepair.status}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRepair; 