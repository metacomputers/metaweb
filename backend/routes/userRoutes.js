import express from "express";
import {
  fetchUsers,
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/userController.js";
import { authorizeAdmin, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// {baseUrl}/api/v1/users
router
  .route("/")
  .get(authenticate,fetchUsers) // Get users
  .post(authenticate,createUser); // Create single user

// {baseUrl}/api/v1/users/{username}
router
.route("/:id")
.get(authenticate,fetchUser) // Get single user
.put(authenticate,updateUser) // Update single user
.delete(authenticate, deleteUser); // Delete single user


router.post("/auth", loginUser); //login
// router.post("/logout", logOutCurrentUser); //logout

// router
//   .route("/profile")
//   .get(getCurrentUserProfile); //user profile

export default router;
