import express from "express"
import "dotenv/config"
import { connectToDB } from "./config/db.config.js";
import cors from "cors"

import authRouter from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";




const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());



app.get("/api/test", (req,res)=> {
    console.log("test route hit hua hh")
    return res.json({"success" : "server is running fine"});
})

app.use("/api/auth", authRouter);
app.use("/api/book",bookRouter)



app.listen(3000,async ()=> {
    try {
        await connectToDB();
        console.log("server is running on port " + 3000)
    } catch (error) {
        console.log(error.message);
    }
    
})

