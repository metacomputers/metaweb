
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

    mobileNo : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
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