const express=require("express")
const { notesModel } = require("../model/note.model")
const { auth } = require("../middleware/auth.middleware")


const notesRoute=express.Router()

notesRoute.post("/add",auth,async(req,res)=>{
    const {title,body,device,userId,user}=req.body
     try {
        const add=new notesModel({title,body,device,userId,user})
        await add.save()
        res.json({msg:"note added"})
     } catch (error) {
        res.json({msg:"note not added",error})
     }
})

notesRoute.get("/",auth,async(req,res)=>{
    try {
        const {device,page}=req.query
        let skip
        if(page){
            skip=(page-1)*3
        }else{
            skip=0
        }
        let query={userId:req.body.userId}
        if(device){
            query.device=device
        }
        const users=await notesModel.find(query).skip(skip).limit(3)
        res.json({msg:"getting data",users})
    } catch (error) {
        res.json({msg:"not getting data"})
    }
})


notesRoute.patch("/update/:noteid",auth,async(req,res)=>{
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        const users=await notesModel.findOne({_id:noteid})
        const noteuserid=users.userId
        if(useriddoc===noteuserid){
            
           await notesModel.findByIdAndUpdate({_id:noteid},req.body)
           res.json({msg:"data updated"})
        }else{
            res.json({msg:"data not updated"})
        }
    } catch (error) {
        res.json({msg:error})
    }
})


notesRoute.delete("/delete/:noteid",auth,async(req,res)=>{
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        const users=await notesModel.findOne({_id:noteid})
        const noteuserid=users.userId
        if(useriddoc===noteuserid){
            
           await notesModel.findByIdAndDelete({_id:noteid})
           res.json({msg:"data Deleted"})
        }else{
            res.json({msg:"data not Deleted"})
        }
    } catch (error) {
        res.json({msg:error})
    }
})



module.exports={
    notesRoute
}



