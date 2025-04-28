import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../api/apiUsers";
import UserTools from "./userTools";
import EditUserModal from "./userEditModal";
import Loader from "../Common/loader";
import ConfirmationModal from "../Common/confirmationModal";
import { Pencil, Trash2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import UserReportPopup from "./UserReportModal";


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
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Manage and monitor user accounts in your system</p>
      </div>

      <UserTools loadUsers={loadUsers} setSearchText={setSearchText} />

      <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.firstName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role?.toLowerCase() === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDownloadReport(user)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        <FaDownload className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDelete(selectedUser._id)}
          title="Delete User"
          message={`Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}? This action cannot be undone.`}
        />
      )}

      {showUserReport && (
        <UserReportPopup
          user={selectedUser}
          onClose={() => setShowUserReport(false)}
        />
      )}
    </div>
  );
};

export default UserList;