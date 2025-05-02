import { useEffect, useState } from "react";
import { FaSearch, FaClipboardList, FaBox, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { getAllConsultations, updateConsultation, deleteConsultation } from "../../api/consultApi";

const ManageConsult = () => {
  const [consultations, setConsultations] = useState([]);
  const [editConsult, setEditConsult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const options = ["Pending", "In Progress", "Completed", "Cancelled"];

  // Fetch consultations
  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await getAllConsultations();
      setConsultations(response.data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load consultations");
      toast.error("Could not load consultations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Open edit modal
  const openEditModal = (consult) => {
    setEditConsult({ ...consult });
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditConsult(null);
  };

  // Handle input change in modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditConsult((prev) => ({ ...prev, [name]: value }));
  };

  // Update consultation
  const saveEdit = async () => {
    try {
      const updatedData = { ...editConsult };
      delete updatedData._id;

      await updateConsultation(editConsult._id, updatedData);
      toast.success("Consultation updated successfully");
      fetchConsultations();
      closeEditModal();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update consultation");
    }
  };

  // Delete consultation
  const handleDeleteConsultation = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this consultation?"
    );
    if (!confirmDelete) return;

    try {
      await deleteConsultation(id);
      setConsultations(consultations.filter((consult) => consult._id !== id));
      toast.success("Consultation deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete consultation");
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

  const filteredConsultations = consultations.filter(consult => 
    consult.customerName.toLowerCase().includes(searchTerm) ||
    consult.issueCategory.toLowerCase().includes(searchTerm) ||
    consult.status.toLowerCase().includes(searchTerm)
  );

  const activeConsultations = filteredConsultations.filter(
    consult => !["Completed", "Cancelled"].includes(consult.status)
  );

  const completedConsultations = filteredConsultations.filter(
    consult => ["Completed", "Cancelled"].includes(consult.status)
  );

  const ConsultationCard = ({ consult }) => (
    <div
      key={consult._id}
      className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-purple-500/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Reference #</h3>
          <p className="text-gray-800 font-medium">{consult._id}</p>
          <h3 className="text-gray-500 text-sm mt-3">Customer</h3>
          <p className="text-gray-800 font-medium">{consult.customerName}</p>
          <h3 className="text-gray-500 text-sm mt-3">Mobile</h3>
          <p className="text-gray-800 font-medium">{consult.mobile}</p>
        </div>
        
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Category</h3>
          <p className="text-gray-800 font-medium">{consult.issueCategory}</p>
          <h3 className="text-gray-500 text-sm mt-3">Details</h3>
          <p className="text-gray-800 font-medium line-clamp-2">{consult.detailsOfIssue}</p>
        </div>
        
        <div className="md:col-span-1">
          <h3 className="text-gray-500 text-sm">Created</h3>
          <p className="text-gray-800 font-medium">{formatDate(consult.createdAt)}</p>
          <h3 className="text-gray-500 text-sm mt-3">Updated</h3>
          <p className="text-gray-800 font-medium">{formatDate(consult.updatedAt)}</p>
        </div>
        
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Status</h3>
            <div className="flex items-center mt-1">
              <span 
                className={`${getStatusColor(consult.status)} w-3 h-3 rounded-full mr-2`}
              ></span>
              <span className="text-gray-800 font-medium capitalize">{consult.status}</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0 justify-end">
            <button
              onClick={() => openEditModal(consult)}
              className="px-4 py-2 flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDeleteConsultation(consult._id)}
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
              Manage Consultations
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
              placeholder="Search by customer name, category, or status..."
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
            Active Consultations
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === "completed"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed Consultations
          </button>
        </div>

        {filteredConsultations.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-50 p-12 rounded-2xl shadow-xl">
            <FaBox className="text-6xl text-gray-400 mb-4" />
            <p className="text-center text-xl text-gray-600">
              {searchTerm ? "No consultations match your search." : "No consultations found."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "active" ? (
              activeConsultations.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600">No active consultations</p>
                </div>
              ) : (
                activeConsultations.map(consult => (
                  <ConsultationCard key={consult._id} consult={consult} />
                ))
              )
            ) : (
              completedConsultations.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <p className="text-gray-600">No completed consultations</p>
                </div>
              ) : (
                completedConsultations.map(consult => (
                  <ConsultationCard key={consult._id} consult={consult} />
                ))
              )
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editConsult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-xl w-96 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Consultation</h2>

            <label className="block text-gray-600 mb-2">Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={editConsult.customerName}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={editConsult.mobile}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Issue Category:</label>
            <input
              type="text"
              name="issueCategory"
              value={editConsult.issueCategory}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-600 mb-2">Details of Issue:</label>
            <textarea
              name="detailsOfIssue"
              value={editConsult.detailsOfIssue}
              onChange={handleEditChange}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>

            <label className="block text-gray-600 mb-2">Status:</label>
            <select
              name="status"
              value={editConsult.status}
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

export default ManageConsult; 