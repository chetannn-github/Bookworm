import { Router } from "express";
import { createBook, deleteBook, getBooks} from "../controllers/bookController/index.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const bookRouter = Router({ mergeParams: true });


bookRouter.get("/", protectRoute, getBooks)
bookRouter.post("/", protectRoute, createBook);
bookRouter.delete("/:id", protectRoute, deleteBook);

export default bookRouter