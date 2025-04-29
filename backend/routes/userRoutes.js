import express from "express";
import {
  fetchUsers,
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
} from "../controllers/userController.js";
import { authorizeAdmin, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", createUser); // Public registration
router.post("/auth", loginUser);
router.post('/logout', logoutUser);

// Protected routes
router
  .route("/")
  .get(authenticate, authorizeAdmin, fetchUsers) // Get users (admin only)
  .post(authenticate, authorizeAdmin, createUser);

// {baseUrl}/api/v1/users/{username}
router
  .route("/:id")
  .get(authenticate, fetchUser) // Get single user
  .put(authenticate, authorizeAdmin, updateUser) // Update single user (admin only)
  .delete(authenticate, authorizeAdmin, deleteUser); // Delete single user (admin only)

// router
//   .route("/profile")
//   .get(getCurrentUserProfile); //user profile

export default router;
