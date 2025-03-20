//how the user should look like and what are the requirements which the user shoould have

import mongoose  from "mongoose";

//pass all the properties the user should have
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },

    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    role : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    }, 
    {timestamps : true}
);


//creating a model based onthe schema
const User = mongoose.model('User' , userSchema, 'users')

export default User;