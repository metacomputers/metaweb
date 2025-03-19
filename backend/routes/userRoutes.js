//creating a user
//delete a user
//update a user

import express from "express";
import {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(createUser) //create a user
  .get(authenticate, authorizeAdmin, getAllUsers); //get all users

router.post("/auth", loginUser); //login
router.post("/logout", logOutCurrentUser); //logout

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile) //user profile
  .put(authenticate, updateCurrentUserProfile); //update user profile

//admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
