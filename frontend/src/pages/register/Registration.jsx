import React, { useState } from "react";
import AddUserModal from "../../components/UserManagement/AddUserModal";

const Registration = () => {
  const [showModal, setShowModal] = useState(true); // Show on load

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally redirect or show a success message
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showModal && (
        <AddUserModal
          isAdmin={false} // Not admin registration
          loadUsers={() => {}} // Dummy, not needed for normal user registration
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Registration;
