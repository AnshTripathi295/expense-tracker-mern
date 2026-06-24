const experess = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB =require('./config/db');
const dotenv= require('dotenv');
dotenv.config();
connectDB();
const app = experess();
app.use(cors());
app.use(experess.json());
app.get('/',(req,res)=>{
    res.json({
        message:"API Runing"
    });
});
app.get('/api/test',(req,res)=>{
    res.json({
        "succcess":true,
        message:"Backend Working"
    });
});
const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});