import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

//read - all users
const fetchUsers = asyncHandler(async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access all users'
      });
    }

    const users = await User.find({});

    if (!users.length) return res.status(404).json({ message: "No users found" });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    });
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, role, password, mobileNo, address } = req.body;

  // Validate all required fields
  if (!username || !firstName || !lastName || !email || !role || !password || !mobileNo || !address) {
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
    mobileNo,
    address,
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
      mobileNo: newUser.mobileNo,
      address: newUser.address,
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
    _id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    mobileNo: user.mobileNo,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { firstName, lastName, email, role, password, mobileNo, address } = req.body;

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.role = role || user.role;
    user.mobileNo = mobileNo || user.mobileNo;
    user.address = address || user.address;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      mobileNo: updatedUser.mobileNo,
      address: updatedUser.address,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: "Error updating user",
      error: error.message 
    });
  }
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

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ 
      message: "Please provide both email and password" 
    });
  }

  // Find user by email
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).json({ 
      message: "Invalid email or password" 
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ 
      message: "Invalid email or password" 
    });
  }

  // Generate JWT token
  generateToken(res, existingUser._id);

  // Send user data (excluding sensitive information)
  res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
    role: existingUser.role,
    mobileNo: existingUser.mobileNo,
    address: existingUser.address,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
    path: '/'
  });

  res.status(200).json({ message: "Logged out successfully" });
});
export { fetchUsers, createUser, fetchUser, updateUser, deleteUser, loginUser, logoutUser };
