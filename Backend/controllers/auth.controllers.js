import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import genToken from '../config/token.js';

export const signUp = async(req,res) =>{
    try{
        const {name,email,password}=req.body;

        const emailExist= await User.findOne({email});

        if(emailExist){
            return res.status(400).json({message:"Email already exists"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,email,passowrd:hashedPassword
        });

        const token =await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000, // in miliseconds
            sameSite:"strict",
            secure:false
        });

        return res.status(201).json("user created successfully",user);
    }catch(err){
        return res.status(500).json("error in sign up",err.message);
    }
}

export const login = async(req,res) =>{
    try{
        const {email,password}=req.body;

        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Email does not exist"});
        }

        const isMatch= await bcrypt.compare(passowrd,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
       

        const token =await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000, // in miliseconds
            sameSite:"strict",
            secure:false
        });

        return res.status(200).json("user login successfully",user);
    }catch(err){
        return res.status(500).json("error in login",err.message);
    }
}

export const logout= async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.json("user logged out successfully");
    }catch(err){
        return res.status(500).json("error in Logout",err.message);
    }
}