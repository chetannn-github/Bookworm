import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";
import jwt  from "jsonwebtoken";
import "dotenv/config"
import { generateToken } from "../../utils/tokens.js";

export const loginController = async(req,res) =>{
    try {
        let {username, password} = req.body;
        if(!username  || !password) {
            return res.json({"message" : "some fields are missing"});
        }

        let user = await User.findOne({username});
        // console.log(user);
        if(!user) {
            return res.json({"message" : "username or password is incorrect"});
        }

        let isPasswordCorrect = await bcrypt.compare(password,user.password);
        
        if(!isPasswordCorrect) {
            return res.json({"message" : "username or password is incorrect"});
        }
        let token = generateToken(user.id);
        user.password = undefined;
        return res.json({user, token});

    } catch (error) {
        console.log(error);
        return res.json({"message" : error.message});
    }
}