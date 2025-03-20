import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllUsers } from "../api/apiUsers";
import EditUserModal from "./userEditModal";
import Loader from "./loader";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5001/api/users/${id}`); // No tokens required
        //fetchUsers();
        alert("User deleted Successfully");
      } catch {
        alert("Error deleting user");
      }
    }
  };

  const handleEdit = async (user) => {
    
    setSelectedUser(user);
    setIsModalOpen(true);

    // try {
    //   await axios.put(`http://localhost:5001/api/users/${id}`, updatedData);
    //   alert("User updated successfully!");
    // } catch  {
    //   alert("Failed to update user");
    // }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5001/api/users/${id}`, updatedData);
      alert("User updated successfully!");
      //fetchUsers(); // Refresh the user list after update
      setIsModalOpen(false); // Close the modal
    } catch {
      alert("Failed to update user");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th> 
            <th className="border border-gray-300 px-4 py-2">Admin</th>
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
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
