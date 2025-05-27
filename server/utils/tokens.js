import jwt from "jsonwebtoken"
import "dotenv/config"

export const generateToken = (val) => {
    return jwt.sign(val, process.env.JWT_SECRET);
}