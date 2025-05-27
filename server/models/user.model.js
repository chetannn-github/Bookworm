import mongoose from "mongoose"
import { hashPassword } from "../utils/password/index.js";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
        trim:true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim:true,
    },
    password : {
        type : String,
        required : true,
    },
    profileImage :{
        type : String,
        required : true,
    },
},{timestamps : true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password = await hashPassword(this.password);
    next();
})




export const User = mongoose.model('User', userSchema);

