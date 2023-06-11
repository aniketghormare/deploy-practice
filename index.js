const express=require("express")
const { connection } = require("./db")
const { userRoutes } = require("./routes/user.routes")
const { notesRoute } = require("./routes/notes.routes")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoutes)
app.use("/notes",notesRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
  
})