import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { User } from "../../models/user.model.js"

import { isPasswordStrong } from "../../utils/isPasswordStrong.js";
import { isValidEmail } from "../../utils/isValidEmail.js";
import { DICE_BEAR_API } from "../../utils/constants.js";


export const signupController = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.json({"message" : "some fields are missing"});
        }

        if(username.length < 3) {
            return res.json({"message" : "usernanme is too short"});
        }

        if(!isPasswordStrong(password)){
            return res.json({"message" : "password is not strong"});
        }

        if(!isValidEmail(email)) {
             return res.json({"message" : "email is not valid"});
        }

        let existingUser = await User.findOne({username});
        // console.log(existingUser);
        if(existingUser) {
            return res.json({"message" : "username already exists"});
        }

        existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({"message" : "user already exists"});
        }

        // hash password 
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);

        let profileImage = DICE_BEAR_API + username;

        const user = new User({username,email,password : hash,profileImage});
        console.log(user);

        // generate jwt token 
        let token = jwt.sign(user.id, process.env.JWT_SECRET);

        await user.save();
        user.password = undefined;
        return res.json({user, token});
    } catch (error) {
        console.log(error);
        return res.json({"message" : error.message});
    }
    
}

