import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

//read - all users
const fetchUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users.length) return res.status(404).json({ message: "No users found" });

  res.status(200).json(
    users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }))
  );
});

const createUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, role, password } = req.body;

  // Validate all required fields
  if (!username || !firstName || !lastName || !email || !role || !password) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  // Check if user already exists (by username or email)
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this username or email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating a user
  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//read - single user
const fetchUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found." });

  res.json({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found." });

  const { firstName, lastName, email, role, password } = req.body;

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.role = role || user.role;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }

  const updateUser = await user.save();

  res.json({
    _id: updateUser._id,
    username: updateUser.username,
    firstName: updateUser.firstName,
    lastName: updateUser.lastName,
    email: updateUser.email,
    role: updateUser.role,
  });
});

//deleting a single user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found." });

  if (user.role?.toLowerCase() === "admin" || user.role === "Admin") {
    return res.status(400).json({ message: "Cannot delete an admin user." });
  }

  await User.deleteOne({ _id: user._id });

  return res.json({ message: "User Removed" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      // Call createToken function here
      generateToken(res, existingUser._id);

      // console.log("User data to be sent:", {
      //   _id: existingUser._id,
      //   username: existingUser.username,
      //   firstName: existingUser.firstName, // Include firstName
      //   lastName: existingUser.lastName,
      //   email: existingUser.email,
      //   role: existingUser.role,
      // });

      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        firstName: existingUser.firstName, // Include firstName
        lastName: existingUser.lastName,
        email: existingUser.email,
        role: existingUser.role,
      });

      return; // Exit after sending the response
    }
  }

  res.status(400).json({ message: "Invalid email or password" });
});

// const logOutCurrentUser = asyncHandler(async (req, res) => {
//     res.cookie('jwt' , '', {
//         httpOnly : true,
//         expires : new Date(0),
//     })

//     res.status(200). json({message : "Logged Out Successfully"});
// });

// //getting a specific user
// const getUserById = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.username).select('-password')

//     if (user){
//         res.json(user)    //show the user
//     } else {
//         res.status(404);
//         throw new Error ("User not Found");
//     }
// });

export { fetchUsers, createUser, fetchUser, updateUser, deleteUser, loginUser };
