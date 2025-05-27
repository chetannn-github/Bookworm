import cloudinary from "../../config/cloudinary.config.js"

export async function uploadImage (image) {
    return await cloudinary.uploader.upload(image);
}