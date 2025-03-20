import express from "express";
import {
  fetchUsers,
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
// import { authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// {baseUrl}/api/v1/users
router
  .route("/")
  .get(fetchUsers) // Get users
  .post(createUser); // Create single user

// {baseUrl}/api/v1/users/{username}
router
.route("/:username")
.get(fetchUser) // Get single user
.put(updateUser) // Update single user
.delete(deleteUser); // Delete single user


// router.post("/auth", loginUser); //login
// router.post("/logout", logOutCurrentUser); //logout

// router
//   .route("/profile")
//   .get(getCurrentUserProfile); //user profile

export default router;
