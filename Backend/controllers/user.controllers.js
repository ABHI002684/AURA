import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
import moment from 'moment';

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

export const askToAssistant = async(req,res)=>{
    try{
        const {prompt} = req.body;
        const user = await User.findById(req.userId);
        const userName = user.name;
        const assistantName = user.assistantName;

        const result = await geminiResponse(prompt,assistantName,userName);

        const jsonMatch = result.match(/{[\s\S]*}/);

        if(!jsonMatch){
            return res.status(500).json({response: "sorry I can't understand "});
        }

        const jsonResult = JSON.parse(jsonMatch[0]);
        const type = jsonResult.type;

        switch(type){
            case 'get-date':{
                return res.json({
                    type,
                    userInput: jsonResult.userInput,
                    response: `Current date is ${moment().format('YYYY-MM-DD')}`
                })
            } 

            case 'get-time':{
                return res.json({
                    type,
                    userInput: jsonResult.userInput,
                    response: `Current time is ${moment().format('hh:mm A')}`
                })
            }

             case 'get-day':{
                return res.json({
                    type,
                    userInput: jsonResult.userInput,
                    response: `Current day is ${moment().format('dddd')}`
                })
            }

             case 'get-month':{
                return res.json({
                    type,
                    userInput: jsonResult.userInput,
                    response: `Current Month is ${moment().format('MMMM')}`
                })
            }

            case "general":
            case "google search":
            case "youtube search":
            case "youtube play":
            case "calculator open":
            case "instagram open":
            case "facebook open":
            case "weather-show":
            return res.json({
                type,
                userInput: jsonMatch.userInput,
                response: jsonResult.response
            });

            default:
                return res.status(400).json({
                    response: "I didn't understand that prompt"
                })
        }

    }catch(err){
        return res.status(500).json("ask assistant error", err.message);
    }
}