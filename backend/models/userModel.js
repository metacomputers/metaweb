//how the user should look like and what are the requirements which the user shoould have

import mongoose  from "mongoose";

//pass all the properties the user should have
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    isAdmin : {
        type : Boolean,
        required : true,
        default : false,
    },

    }, 
    {timestamps : true}
);


//creating a model based onthe schema
const User = mongoose.model ('User' , userSchema)

export default User;