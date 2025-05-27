import { Book } from "../../models/book.model.js";


//  https://localhost:5000/api/book?page=2&limit=10
export const getBooks = async (req,res) =>{
    try {
        let page = req.query.page || 1;
        let limit = req.query.limit || 5;
        let skip =( page - 1) * limit;

        let books = Book.find({})
        .sort({createdAt : -1})
        .skip(skip)
        .limit(limit)
        .populate("user","username imageURL");
        
        let totalBooks = Book.countDocuments();
        let totalPages = Math.ceil(totalBooks / limit);
        
        return res.json({books, currPage:page , totalBooks, totalPages})
    } catch (error) {
        
    }
}