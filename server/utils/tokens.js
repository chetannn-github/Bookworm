import jwt from "jsonwebtoken"
import "dotenv/config"

export const generateToken = (val) => {
    return jwt.sign(val, process.env.JWT_SECRET);
}

export const decodeToken = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET);
}