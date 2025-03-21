import { useState } from "react";
import AddUserModal from "./addUserModal";

const UserTools = ({onUserCreate}) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);


  return (
  <div className="flex justify-between items-center mb-6 px-6">
    <button className="font-semibold bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all ease-in-out duration-200"
        onClick={() => setIsAddUserModalOpen(true)}>
        + Add User
    </button>

    <div className="flex items-center space-x-3">
        <input
        type="text"
        placeholder="Search Users..."
        className="w-96 px-4 py-2 border rounded-lg outline-none"
        />
    </div>

    {isAddUserModalOpen && (
        <AddUserModal
          isAdmin={true}
          onSubmit={() => onUserCreate()}
          onClose={() => setIsAddUserModalOpen(false)}
        />
      )}
  </div>
  );
};

export default UserTools;