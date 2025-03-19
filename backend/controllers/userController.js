import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async(req, res) =>{
    const {username, email, password} = req.body;

    //validations 
    //if user didnt provide these
    if(!username || !email || !password){
        throw new Error ("Please fill all the inputs");
    }

    //checks if this user is already there
    const userExists = await User.findOne({email});
    if(userExists) res.status (400). send ("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a user
    const newUser = new User({username, email, password : hashedPassword});

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201). json({
            _id : newUser._id, 
            username : newUser.username, 
            email :newUser.email, 
            isAdmin : newUser.isAdmin,
        });
        
    } catch (error) {
        res.status (400);
        throw new Error("Invalid User Data");
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser){
        const isPasswordValid = await bcrypt.compare(
            password, 
            existingUser.password)

        if(isPasswordValid){
            createToken(res, existingUser._id)

            res.status(201). json({
                _id : existingUser._id, 
                username : existingUser.username, 
                email :existingUser.email, 
                isAdmin : existingUser.isAdmin,
            });

            return //exit the fuctiom after sending the response
        }
    }

})

const logOutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt' , '', {
        httpOnly : true,
        expires : new Date(0),
    })

    res.status(200). json({message : "Logged Out Successfully"});
});

//read - all users
const getAllUsers = asyncHandler(async( req, res) => {
    const users = await User.find({});
    res.json(users)
});

//read - single user
const getCurrentUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id)

    if (user){
        res.json({
            _id : user._id,
            username : user.username,
            email : user.email
        })
    } else {
        res.status(404);
        throw new Error ("User not Found");
    }
});

//update user
const updateCurrentUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username;                         //assign the new username or the exisitinhg user name if user didnt update it
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json ({
            _id : updatedUser._id,
            username : updatedUser.username,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        })
    } else {
        res .status(401);
        throw new Error ("User not Found");
    }
});

//deleting a single user
const deleteUserById = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin){
            res.staus (400);
            throw new Error("Cannot delete admin user");
        }

        await User.deleteOne({_id: user._id})                        //mongoose method to delete a single user
        res.json({message : "User Removed"});

    } else {
        res.status(404)
        throw new Error ("User not Found")

    }
});

//getting a specific user
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user){
        res.json(user)    //show the user
    } else {
        res.status(404);
        throw new Error ("User not Found");
    }
});

const updateUserById = asyncHandler (async (req, res) => {
    const user = await User.findById (req.params.id)


    if(user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean (req.body.isAdmin)

        const updateUser = await user.save();

        res.json ({
            _id : updateUser._id,
            username : updateUser.username,
            email : updateUser.email,
            isAdmin : updateUser.isAdmin
        })

    } else {
        res.status(404);
        throw new Error (" User Not Found");
    }
});


export {createUser , loginUser, logOutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById};

