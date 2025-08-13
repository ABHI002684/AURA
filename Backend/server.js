import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const port=process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})

