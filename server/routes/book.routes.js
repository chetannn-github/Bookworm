import { Router } from "express";
import { createBook, deleteBook, getBooks} from "../controllers/bookController/index.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


let bookRouter = Router();

bookRouter.get("/", protectRoute, getBooks)
bookRouter.post("/", protectRoute, createBook);
bookRouter.delete("/", protectRoute, deleteBook);

export default bookRouter