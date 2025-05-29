import { Book } from "../../models/book.model.js";
import { uploadImage } from "../../utils/image/index.js";

export const createBook = async (req,res) =>{
    try {
        console.log("create book hit");
        let { title, caption,image,rating} = req.body;
        if(!image || !title || !caption || !rating) return res.json({"message" : "Please provide all fields"});
        // console.log(rating);
        let result = await uploadImage(image);
        let imageURL = result.secure_url;
        let {_id} = req.user;
        
        let newBook = new Book({title,caption,imageURL,rating,owner : _id})
        await newBook.save();

        return res.json({ message : "book review got uploaded successfully", newBook, "success" : true});

    } catch (error) {
        console.log(error);
        return res.json({message : "Internal server error", "success" : false});
    }
}