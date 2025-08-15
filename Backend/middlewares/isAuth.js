import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const isAuth = async (req,res,next)=>{
    try{
        const token =req.cookies.token;
        if(!token){
            return res.status(400).json({message:"login first"});
        }

        const verifyToken =await jwt.verify(token,process.env.JWT_SECRET);

        req.userId=verifyToken.userId;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json("is Auth err: ",err.message);
    }
}

export default isAuth;