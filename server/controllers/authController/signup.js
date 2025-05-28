import "dotenv/config"
import { User } from "../../models/user.model.js"

import { isPasswordStrong } from "../../utils/password/index.js";
import { isValidEmail } from "../../utils/isValidEmail.js";
import { DICE_BEAR_API } from "../../utils/constants.js";
import { generateToken } from "../../utils/tokens.js";


export const signup = async(req, res) => {
    try {
        // console.log("signup route hit")
        let {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.json({"message" : "some fields are missing","success" : false});
        }

        if(username.length < 3) {
            return res.json({"message" : "usernanme is too short","success" : false});
        }

        if(!isPasswordStrong(password)){
            return res.json({"message" : "password is not strong","success" : false});
        }

        if(!isValidEmail(email)) {
             return res.json({"message" : "email is not valid","success" : false});
        }

        let existingUser = await User.findOne({username});
        // console.log(existingUser);
        if(existingUser) {
            return res.json({"message" : "username already exists","success" : false});
        }

        existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({"message" : "user already exists","success" : false});
        }

        let profileImage = DICE_BEAR_API + username;

        const user = new User({username,email,password,profileImage});
        
        // generate jwt token 
        let token = generateToken(user.id)

        await user.save();
        console.log(user);
        user.password = undefined;
        return res.json({user, token,"success" : true});
    } catch (error) {
        console.log(error);
        return res.json({"message" : error.message,"success" : false});
    }
    
}

