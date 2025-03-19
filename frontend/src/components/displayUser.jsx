import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUsers } from "../api/apiUsers";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const data = await fetchUsers();
  //     setUsers(data);
  //   };
  // }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5001/api/users/${id}`); // No tokens required
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
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
            <th className="border border-gray-300 px-4 py-2">Ussssername</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Admin</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            console.log(user);
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
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
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
    </div>
  );
};

export default UserList;
