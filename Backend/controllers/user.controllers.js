import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';

export const getCurrentUser = async (req,res)=>{
    try{
        const userId=req.userId;
        const user=await User.findById(userId).select("-password");

        if(!user){
            return res.status(400).json("user not found");
        }

        return res.status(200).json(user);
    }catch(err){
        return res.status(500).json("error in getting current user");
    }
}

export const updateAssistant =async(req,res)=>{
    try{
        const {assistantName,imageUrl}=req.body;
        let avtar;

        if(req.file){
            avtar= await uploadOnCloudinary(req.file.path);
        }else{
            avtar=imageUrl;
        }

        const user= await User.findByIdAndUpdate(req.userId,{
            assistantName,avtar
        },{new:true}).select("-password");

        return res.status(200).json("assistant updated successfully",user);
    }catch(err){
        return res.status(500).json("error in updating assistant");
    }
}