const User= require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerUser = async (req,res)=>{
   try{ const {name,email,password} = req.body;
   const userExists = await User.findOne({email});
   if(userExists){
    return res.status(400).json({
        success:false,
        message:"User already exists"
    }); 
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);
   const user = await User.create({
    name,
    email,
    password:hashedPassword
   });
//    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
//     expiresIn:'30d'
//    });
   res.status(201).json({
    success:true,
    message:"User registered successfully"
    // user:{
    //  _id:user._id,
    //  name:user.name,
    //  email:user.email
    // },
    // token
   });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'10d'
        });
        res.status(200).json({
            success:true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            },
            token
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
module.exports = {
    registerUser,
    loginUser
};