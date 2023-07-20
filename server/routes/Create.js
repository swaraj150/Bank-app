const express = require('express')
const User=require("../models/Customer");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const { findOne } = require('../models/Customer');
const fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Swaraj$andhale@19";
// Route 1: Creating a new user using POST "api/create/createuser": no login required
router.post("/createuser",[
    body("name","Enter a Valid Name").isLength({min:3}),
    body("email","Enter a Valid Email").isEmail(),
],async(req,res)=>{
    let success=false;
    // If there are errors return bad request and errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // Checck whether the user has entered an already existing email
    try{
    let user= await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success,error:"Sorry user already exits with this email id"})
    }
    const salt=await bcrypt.genSalt(5);
    const secPass=await bcrypt.hash(req.body.pin,salt);
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        pin:secPass,
        account: Math.floor(Math.random()*(200000-100000)+100000),
        balance:req.body.balance

    })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    
    res.json({success,authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }   // .then(user=>res.json(user)).catch(err=>{console.log(err)});
   
});
// Route 2: authenticate a  user using POST "api/create/login": no login required
router.post("/login",[
    body("account","Enter a Valid Account").exists(),
    body("pin","Password cannot be blank").exists()
],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {account,pin}=req.body;
    try {
        let user=await User.findOne({account});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(pin,user.pin);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});

        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }

});
// Route 3: Get user details using POST "api/create/getuser": login required
router.post("/getuser",fetchuser,async (req,res)=>{
    try {
        const userid=req.user.id;
        const user=await User.findById(userid).select("-pin");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});

//route:4 Get all users using GET "api/create/getallusers": no login required
router.get("/getallusers",async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error") 
    }
});
module.exports=router;