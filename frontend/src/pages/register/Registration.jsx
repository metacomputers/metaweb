import React, { useState } from "react";
import AddUserModal from "../../components/UserManagement/AddUserModal";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showModal && (
        <AddUserModal
          isAdmin={false}
          loadUsers={() => {}}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Registration;
