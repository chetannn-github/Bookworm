import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        minLength : 3,
        trim:true,
    },
    caption : {
        type : String,
        required : true,
        trim:true,
    },

    imageURL :{
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        min : 1, 
        max : 5,
        default : 1,
        required : true,
    
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true});





export const Book = mongoose.model('Book', bookSchema);

