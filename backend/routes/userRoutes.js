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

// {baseUrl}/api/v1/users
router
  .route("/")
  .get(authenticate, authorizeAdmin, fetchUsers) // Get users (admin only)
  .post(authenticate, authorizeAdmin, createUser); // Create single user (admin only)

// {baseUrl}/api/v1/users/{username}
router
  .route("/:id")
  .get(authenticate, fetchUser) // Get single user
  .put(authenticate, authorizeAdmin, updateUser) // Update single user (admin only)
  .delete(authenticate, authorizeAdmin, deleteUser); // Delete single user (admin only)

router.post("/auth", loginUser); //login
router.post('/logout', logoutUser);

// router
//   .route("/profile")
//   .get(getCurrentUserProfile); //user profile

export default router;
