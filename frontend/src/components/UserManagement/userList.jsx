import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../api/apiUsers";
import UserTools from "./userTools";
import EditUserModal from "./userEditModal";
import Loader from "../Common/loader";
import ConfirmationModal from "../Common/confirmationModal";
import logo from "/meta_full.png";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

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
    return <div><Loader/></div>;
  }



  const openEditModal = async (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Open modal & set userId to delete
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Close modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = async (username, updatedData) => {
    try {
      await updateUser(username, updatedData)

      // Update the user list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, ...updatedData } : user
        )
      );

      setIsEditModalOpen(false);
    } catch {
      alert("Failed to update user");
    }
  };

  const handleDelete = async (username) => {
    try {
      await deleteUser(username);
      setUsers(users.filter(user => user.username !== username));
      closeDeleteModal();
    } catch {
      console.log("Error deleting user");
    }
  };

  return (
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">

      {/* Header */}
      <header className="bg-black text-white py-4 shadow-md w-full fixed top-0 left-0">
        <div className="px-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Company Logo" className="h-10 mr-2" />
            <h1 className="text-3xl font-semibold text-center justify-center justify-between">User Management Dashboard</h1>
          </div>
        </div>
      </header>

      <UserTools loadUsers={loadUsers} setSearchText={setSearchText} />

      {/* <h2 className="text-2xl font-bold mb-4 text-center">User List</h2> */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                <tr key={user.username} className="hover:bg-gray-50 text-center">
                  <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="font-semibold bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="font-semibold bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
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

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        id={selectedUser?.username}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={"Confirm Deletion"}
        description={`Are you sure you want delete "${selectedUser?.username}"?`}
      />

    </div>
  );
};

export default UserList;
