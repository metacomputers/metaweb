import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "../api/apiUsers";
import EditUserModal from "./userEditModal";
import Loader from "./loader";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div><Loader/></div>;
  }

  const handleEdit = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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

      alert("User updated successfully!");
      //fetchUsers(); // Refresh the user list after update
      setIsModalOpen(false); // Close the modal
    } catch {
      alert("Failed to update user");
    }
  };

  const handleDelete = async (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(username);
        setUsers(users.filter(user => user.username !== username));
        alert("User deleted Successfully");
      } catch {
        alert("Error deleting user");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
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
          {users.map((user) => {
            return (
              <tr key={user._id} className="hover:bg-gray-50">
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
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.username)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {isModalOpen && (
        <EditUserModal
          user={selectedUser}
          onUpdate={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
};

export default UserList;
