import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const genToken = async (userId)=>{
    try{
        const token= await jwt.sign({userId},process.env.JWT_SECRET, 
            {expiresIn: '30d'});

         return token;   
    }catch(err){
        console.error("Error generating token:", err);
    }
}

export default genToken;