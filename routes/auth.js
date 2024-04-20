const express = require("express");
const dotenv = require("dotenv")
const User = require('../models/User'); // Assuming User is exported using require
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post('/register',async (req, res) => {
  let success = false;
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: false, error: 'Sorry a User with this email Already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create a new user with the hashed password

    user = new User({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
    });
    
    user.save();
    
    res.status(200).json({ success:true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});


// ROUTE 2 : Authenticating a user using : POST "/api/auth/login". No login required
router.post('/login',async (req,res)=>{

    let success=false;
    
    const {email,password,role} = req.body;

    try {
        let user = await User.findOne({email : email});
        
        if(!user){
            return res.status(400).json({success,error:"User with this email does not exist"});
        }   
        
        const passwordCompare = await bcrypt.compare(password,user.password);

        if(!passwordCompare){
            return res.status(400).json({success,error:"Wrong Email or Password"});
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken =  jwt.sign(data, JWT_SECRET);
        success=true;
        res.status(200).json({success,authToken,user});

    } catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }          
})



module.exports = router;
