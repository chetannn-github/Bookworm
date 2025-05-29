import { Book } from "../../models/book.model.js";


//  https://localhost:5000/api/book?page=2&limit=10
export const getBooks = async (req,res) =>{
    try {
        console.log("get books hit")
        let page = req.query.page || 1;
        let limit = req.query.limit || 20;
        let skip =( page - 1) * limit;

        let books = await Book.find({})
        .sort({createdAt : -1})
        .skip(skip)
        .limit(limit)
        .populate("owner","username profileImage");
        
        let totalBooks = await Book.countDocuments();
        let totalPages = Math.ceil(totalBooks / limit);
        console.log(books);
        
        return res.json({books, currPage:page , totalBooks, totalPages, "success" : true})
    } catch (error) {
        console.log(error)
        return res.json({"message" : "Internal Server Error", "success" : false})
    }
}