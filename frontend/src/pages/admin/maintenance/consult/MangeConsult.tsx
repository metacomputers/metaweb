import AdminWrapper from "../../components/AdminWrapper.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const MangeConsult = () => {
    const [consultations, setConsultations] = useState([]);
    const [editConsult, setEditConsult] = useState(null);
    const options = ["Pending", "In Progress", "Completed", "Cancelled"];

    // Fetch consultations
    const fetchConsultations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/consults`);
            setConsultations(response.data.consults);
        } catch (e) {
            console.error(e);
            alert(e.message);
        }
    };

    useEffect(() => {
        fetchConsultations();
    }, []);

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

            await axios.put(`${import.meta.env.VITE_BASE_URL}/consults/${editConsult._id}`, updatedData);
            fetchConsultations();
            closeEditModal();
        } catch (e) {
            console.error(e);
            alert("Failed to update consultation.");
        }
    };

    // Delete consultation
    const deleteConsultation = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this consultation?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/consults/${id}`);
            setConsultations(consultations.filter((consult) => consult._id !== id));
        } catch (e) {
            console.error(e);
            alert("Failed to delete consultation.");
        }
    };

    return (
        <AdminWrapper>
            <main className="w-full flex flex-col min-h-[70vh] mt-10 justify-start overflow-x-auto p-5">
                <div className="w-full">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Consultations</h2>
                    <table className="w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                        <tr>
                            {["ID", "Customer", "Mobile", "Category", "Details", "Status", "Created", "Updated", "Actions"].map((header) => (
                                <th key={header} className="px-4 py-3 border">{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {consultations.map((consult) => (
                            <tr key={consult._id} className="bg-white border-b hover:bg-gray-50 transition">
                                <td className="px-4 py-3 uppercase">{consult._id}</td>
                                <td className="px-4 py-3">{consult.customerName}</td>
                                <td className="px-4 py-3">{consult.mobile}</td>
                                <td className="px-4 py-3">{consult.issueCategory}</td>
                                <td className="px-4 py-3">{consult.detailsOfIssue}</td>
                                <td className="px-4 py-3">{consult.status}</td>
                                <td className="px-4 py-3">{new Date(consult.createdAt).toLocaleString()}</td>
                                <td className="px-4 py-3">{new Date(consult.updatedAt).toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-3">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            onClick={() => openEditModal(consult)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => deleteConsultation(consult._id)}
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
                {editConsult && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-lg font-semibold mb-4">Edit Consultation</h2>

                            <label className="block mb-2">Customer Name:</label>
                            <input
                                type="text"
                                name="customerName"
                                value={editConsult.customerName}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Mobile:</label>
                            <input
                                type="text"
                                name="mobile"
                                value={editConsult.mobile}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Issue Category:</label>
                            <input
                                type="text"
                                name="issueCategory"
                                value={editConsult.issueCategory}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                            />

                            <label className="block mb-2">Details:</label>
                            <textarea
                                name="detailsOfIssue"
                                value={editConsult.detailsOfIssue}
                                onChange={handleEditChange}
                                className="w-full p-2 border rounded mb-3"
                                rows="3"
                            ></textarea>

                            <label className="block mb-2">Status:</label>
                            <select
                                name="status"
                                value={editConsult.status}
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

export default MangeConsult;
