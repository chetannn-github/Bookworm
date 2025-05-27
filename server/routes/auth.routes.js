import { Router } from "express";
import { loginController, signupController } from "../controllers/auth.controller.js";


let authRouter = Router();


authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export default authRouter