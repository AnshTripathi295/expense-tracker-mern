const User= require('../models/User');
const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
router.get('/profile',authMiddleware,async (req,res)=>{
 const user = await User.findById(req.user.id).select('-password');
 if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    });
 }res.json(user);
});

router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;