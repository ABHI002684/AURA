import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection failed:",err.message);
    }
}

export default connectDb;