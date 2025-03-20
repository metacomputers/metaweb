import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

//read - all users
const fetchUsers = asyncHandler(async( req, res) => {
    const users = await User.find({});

    if (!users.length) {
        return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    })));
});


const createUser = asyncHandler(async(req, res) =>{
    const {username, firstName, lastName, email, role, password} = req.body;

    // Validate all required fields
    if (!username || !firstName || !lastName || !email || !role || !password) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if user already exists (by username or email)
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        return res.status(400).json({ message: "User with this username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a user
    const newUser = new User({username, firstName, lastName, email, role, password : hashedPassword});

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
const fetchUser = asyncHandler(async (req, res) =>{
    const user = await User.findOne({ username : req.params.username });

    if (user){
        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        })
    } else {
        res.status(404);
        throw new Error ("User not Found");
    }
});

const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findOne({ username : req.params.username });

    if(user) {
        const {firstName, lastName, email, role, password} = req.body;

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

        res.json ({
            _id : updateUser._id,
            username : updateUser.username,
            firstName : updateUser.firstName,
            lastName : updateUser.lastName,
            email : updateUser.email,
            role : updateUser.role
        });
    } else {
        res.status(404);
        throw new Error ("User Not Found");
    }
});

//deleting a single user
const deleteUser = asyncHandler (async (req, res) => {
    const user = await User.findOne({ username : req.params.username })

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


// const loginUser = asyncHandler(async (req, res) => {
//     const {email, password} = req.body

//     const existingUser = await User.findOne({email})

//     if (existingUser){
//         const isPasswordValid = await bcrypt.compare(
//             password, 
//             existingUser.password)

//         if(isPasswordValid){
//             createToken(res, existingUser._id)

//             res.status(201). json({
//                 _id : existingUser._id, 
//                 username : existingUser.username, 
//                 email :existingUser.email, 
//                 isAdmin : existingUser.isAdmin,
//             });

//             return //exit the fuctiom after sending the response
//         }
//     }

// })

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


// //update user
// const updateCurrentUserProfile = asyncHandler (async (req, res) => {
//     const user = await User.findById(req.user._id)

//     if (user) {
//         user.username = req.body.username || user.username;                         //assign the new username or the exisitinhg user name if user didnt update it
//         user.email = req.body.email || user.email;

//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(req.body.password, salt);
//             user.password = hashedPassword;
//         }

//         const updatedUser = await user.save();

//         res.json ({
//             _id : updatedUser._id,
//             username : updatedUser.username,
//             email : updatedUser.email,
//             isAdmin : updatedUser.isAdmin,
//         })
//     } else {
//         res.status(404);
//         throw new Error ("User not Found");
//     }
// });

export {fetchUsers, createUser , fetchUser, updateUser, deleteUser};
