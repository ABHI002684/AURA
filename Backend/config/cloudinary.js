import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try{
    const UploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); //Delete the file after upload
    return UploadResult.secure_url; // url of the uploaded image
  }catch(err){
    fs.unlinkSync(filePath); // Delete the file even if upload fails
    return res.status(500).json({message:"cloudinary error"});
  }
};

export default uploadOnCloudinary;
