import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";


let authRouter = Router();


authRouter.get("/login", loginController);


export default authRouter