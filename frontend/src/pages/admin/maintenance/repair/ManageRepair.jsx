import AdminWrapper from "../../components/AdminWrapper.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageRepair = () => {
    const [repairs, setRepairs] = useState([]);
    const [editRepair, setEditRepair] = useState(null); // Holds the repair being edited
    const options = ["Pending", "In Progress", "Completed", "Cancelled"];

    // Fetch repairs
    const fetchRepairs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/repairs`);
            setRepairs(response.data.repairs);
        } catch (e) {
            console.error(e);
            alert(e.message);
        }
    };

    useEffect(() => {
        fetchRepairs();
    }, []);

    // Open edit modal
    const openEditModal = (repair) => {
        setEditRepair({ ...repair }); // Clone repair object
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

    // Update repair details (except _id)
    const saveEdit = async () => {
        try {
            const updatedData = { ...editRepair };
            delete updatedData._id; // Ensure _id is not included in the update payload

            await axios.put(`${import.meta.env.VITE_BASE_URL}/repairs/${editRepair._id}`, updatedData);
            fetchRepairs(); // Refresh list
            closeEditModal();
        } catch (e) {
            console.error(e);
            alert("Failed to update repair.");
        }
    };

    // Delete repair
    const deleteRepair = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this repair?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/repairs/${id}`);
            setRepairs(repairs.filter((repair) => repair._id !== id)); // Optimistic UI update
        } catch (e) {
            console.error(e);
            alert("Failed to delete repair.");
        }
    };

    return (
        <AdminWrapper>
            <main className="w-full flex flex-col min-h-[70vh] mt-10 justify-start overflow-x-auto p-5">
                <div className="w-full">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Repairs</h2>
                    <table className="w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                        <tr>
                            {["ID", "Customer", "Mobile", "Device", "Issue", "Status", "Created", "Updated", "Actions"].map((header) => (
                                <th key={header} className="px-4 py-3 border">{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {repairs.map((repair) => (
                            <tr key={repair._id} className="bg-white border-b hover:bg-gray-50 transition">
                                <td className="px-4 py-3 uppercase">{repair._id}</td>
                                <td className="px-4 py-3">{repair.customerName}</td>
                                <td className="px-4 py-3">{repair.mobile}</td>
                                <td className="px-4 py-3">{repair.device}</td>
                                <td className="px-4 py-3">{repair.issueDescription}</td>
                                <td className="px-4 py-3">{repair.status}</td>
                                <td className="px-4 py-3">{new Date(repair.createdAt).toLocaleString()}</td>
                                <td className="px-4 py-3">{new Date(repair.updatedAt).toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-3">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => openEditModal(repair)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => deleteRepair(repair._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editRepair && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-lg font-semibold mb-4">Edit Repair</h2>

                            <label className="block mb-2">Customer Name:</label>
                            <input
                                type="text"
                                name="customerName"
                                value={editRepair.customerName}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Mobile:</label>
                            <input
                                type="text"
                                name="mobile"
                                value={editRepair.mobile}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Device:</label>
                            <input
                                type="text"
                                name="device"
                                value={editRepair.device}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Issue:</label>
                            <input
                                type="text"
                                name="issueDescription"
                                value={editRepair.issueDescription}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Status:</label>
                            <select
                                name="status"
                                value={editRepair.status}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-4"
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    onClick={closeEditModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    onClick={saveEdit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </AdminWrapper>
    );
};

export default ManageRepair;
