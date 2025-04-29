
import React from "react";
import { Navigate } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo || userInfo.role?.toLowerCase() !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminOnlyRoute;

