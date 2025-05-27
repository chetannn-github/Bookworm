import { decodeToken } from "../utils/tokens.js"
import { User } from "../models/user.model.js";

export const protectRoute =async function(req,res,next) {
    try {
        let token = req.header("Authorization").replace("Bearer ","");
        if(!token) return res.json({"message" : "No Authorisation token , Access denied"})
        let userId = decodeToken(token);

        let user = await User.findById(userId);
        if(!user) return res.json({"message" : "No valid Authorisation token , Access denied"})
        req.user = user;
        next();


    } catch (error) {
        return res.json({"message" : "No Authorisation token , Access denied"})
    }
    let token = req.header("Authorization").replace("Bearer ","");

    if(!token) return res.json({"message" : "No Authorisation token , Access denied"})
    let userId = decodeToken(token);


    let user = await User.findById(userId)
}   