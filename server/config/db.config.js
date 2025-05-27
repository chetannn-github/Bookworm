import mongoose from "mongoose";
import "dotenv/config"



export async function connectToDB() {
    
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect to db")
}