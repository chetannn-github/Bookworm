import cloudinary from "../../config/cloudinary.config.js"

export async function deleteImage (imageURL) {
    try {
        let cloudinaryImageId = imageURL.split("/").pop().split(".")[0];
        return await cloudinary.uploader.destroy(cloudinaryImageId);
    } catch (error) {
        console.log("error in deleting image from cloudinary");
    }
    
}