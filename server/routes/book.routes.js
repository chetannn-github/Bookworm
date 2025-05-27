import { Router } from "express";
import { createBook, deleteBook, getBooks} from "../controllers/bookController/index.js";




let bookRouter = Router();

bookRouter.get("/",getBooks)
bookRouter.post("/create", createBook);
bookRouter.delete("/delete", deleteBook);

export default bookRouter