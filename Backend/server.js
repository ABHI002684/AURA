import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const port=process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})

