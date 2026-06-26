const jwt= require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{
    try{
    const token = req.header('Authorization');
    // console.log(token);
    if(!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message: 'Invalid token.'});
    }
};
module.exports = authMiddleware;