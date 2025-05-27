import { Router } from "express";
import { loginController, signupController } from "../controllers/authController/index.js";


let authRouter = Router();


authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export default authRouter