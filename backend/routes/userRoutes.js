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
import { authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(createUser) //create a user
  .get(getAllUsers); //get all users

router.post("/auth", loginUser); //login
router.post("/logout", logOutCurrentUser); //logout

router
  .route("/profile")
  .get(getCurrentUserProfile) //user profile
  .put(updateCurrentUserProfile); //update user profile

//admin routes
router
  .route("/:id")
  .delete(deleteUserById)
  .get(getUserById)
  .put(updateUserById);

export default router;
