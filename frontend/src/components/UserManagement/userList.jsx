import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../api/apiUsers";
import UserTools from "./userTools";
import EditUserModal from "./userEditModal";
import Loader from "../Common/loader";
import ConfirmationModal from "../Common/confirmationModal";
import { Pencil, Trash2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import UserReportPopup from "./UserReportModal";
import AdminLayout from "../Common/adminPanel";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showUserReport, setShowUserReport] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      alert("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const openEditModal = async (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    console.log("Selected user for deletion:", user);
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateUser(id, updatedData);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, ...updatedData } : user
        )
      );

      setIsEditModalOpen(false);
    } catch {
      alert("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete user with ID: ${id}`);

      await deleteUser(id);

      console.log(`User ${id} deleted successfully`);

      setUsers(users.filter((user) => user._id !== id));
      closeDeleteModal();
    } catch (error) {
      console.log(`Delete operation failed: ${error.message}`);

      alert(error.message);
      closeDeleteModal();
    }
  };

  const handleDownloadReport = (user) => {
    setSelectedUser(user);
    setShowUserReport(true);
  };

  return (
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <UserTools loadUsers={loadUsers} setSearchText={setSearchText} />

      <div className="overflow-x-auto mt-8">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
              <th className="border border-gray-300 px-4 py-2">Download Report</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.username}
                className="hover:bg-gray-50 text-center"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="font-semibold bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="font-semibold bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => handleDownloadReport(user)} 
                    className="font-semibold bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                  >
                    <FaDownload className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onUpdate={handleUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        id={selectedUser?._id}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={"Confirm Deletion"}
        description={`Are you sure you want delete "${selectedUser?.username}"?`}
      />
      
      {showUserReport && (
        <UserReportPopup
          showReport={showUserReport}
          setShowReport={setShowUserReport}
          userDetails={selectedUser}
        />
      )}
    </div>
  );
};

export default UserList;