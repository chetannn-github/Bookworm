import { Book } from "../../models/book.model.js";
import { uploadImage } from "../../utils/image/index.js";

export const createBook = async (req,res) =>{
    try {
        console.log("create book hit");
        let { title, caption,image = "https://imgs.search.brave.com/SVmykMevObfoV7DKAdVv6DbLrtH23G0yIalfv9NoDK8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vVENBZHRq/TElEMzdSREFIWncw/ak5ES0oyem5WNVND/c3QyQTdyN2dXN3ht/QS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dC9abkp2Ym5R/dVpuSmxaWEJwL2F5/NWpiMjB2YUc5dFpT/OWgvYm05dUxYSjJi/WEF2WTNKbC9ZWFJw/ZG1VdGMzVnBkR1V2/L1lYVmthVzh0WTNK/bFlYUnAvYjI0dmRt/bHpkV0ZzY3kxei9i/MjVuY3k1M1pXSnc",rating} = req.body;
        if(!image || !title || !caption || !rating) return res.json({"message" : "Please provide all fields"});

        let result = await uploadImage(image);
        let imageURL = result.secure_url;
        let {_id} = req.user;
        
        let newBook = new Book({title,caption,imageURL,owner : _id})
        await newBook.save();
        return res.json({ message : "book review got uploaded successfully", newBook, "success" : true});

    } catch (error) {
        console.log(error);
        return res.json({message : "Internal server error", "success" : false});
    }
}