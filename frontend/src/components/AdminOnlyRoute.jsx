// src/components/AdminOnlyRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user || user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminOnlyRoute;
