const express=require("express")
const { userModel } = require("../model/user.model")
const bcrypt=require("bcrypt")
const userRoutes=express.Router()
const jwt=require("jsonwebtoken")

userRoutes.post("/signup",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.json({msg:"user not Added"})
            }else{
                const user=new userModel({name,email,gender,password:hash})
                await user.save()
              
                res.json({msg:"user Added"})
            }
        })
       
    } catch (error) {
        res.json({msg:"user not Added"})
    }
    
})

userRoutes.post("/login",async(req,res)=>{
   const {email,password}=req.body
   try {
      const user= await userModel.findOne({email})
      if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user._id,name:user.name},"masai")
                res.json({msg:"login successful",token})
            }
        })
      }else{
        res.json({msg:"user not found"})
      }
   } catch (error) {
    res.json({msg:error})
   }
})



module.exports={
    userRoutes
}

