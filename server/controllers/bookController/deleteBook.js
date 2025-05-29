import { Book } from "../../models/book.model.js";
import { deleteImage } from "../../utils/image/index.js";




export const deleteBook = async (req,res) =>{
    try {
        console.log("delete book hit")
        let {id} = req.params;
        console.log(id);
        let book = await Book.findById(id);
        if(!book) return res.json({"message" : "Book not found", "success" : false});
        console.log(book);
        
        if(req.user._id.toString() !== book.owner.toString()) return res.json({"message" : "You are not owner of this book.", "success" : false});
        
        // deleting from cloudinary 
        if(book.imageURL) {
            deleteImage(book.imageURL);
        }

        await Book.findByIdAndDelete(id);
        return res.json({"message" : "Book deleted successfully ", "success" : true});

    } catch (error) {
        console.log(error.message);
        return res.json({"message" : "Internal server error", "success" : false});
    }
}