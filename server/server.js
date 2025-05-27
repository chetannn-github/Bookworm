import express from "express"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js";
import { connectToDB } from "./config/db.config.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.get("/test", (req,res)=> {
    return res.json({"success" : "server is running fine"});
})

app.use("/api/auth", authRouter);





app.listen(PORT,async ()=> {
    try {
        await connectToDB();
        console.log("server is running on port " + PORT)
    } catch (error) {
        console.log(error.message);
    }
    
})