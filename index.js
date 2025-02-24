const express = require("express")
const mongoose = require("mongoose")
const user = require("./models/user.model")
const favourite = require("./models/favourite.model")
const cors = require("cors")
require("dotenv").config()

const bcrypt = require("bcryptjs") 
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
const mongodb_url = process.env.MONGODB_URL
const secretkey = process.env.SECRET_KEY


const app = express()
app.use(cors())
app.use(express.json())



app.listen("4000",()=>{
    console.log("[server] is running on port 4000")
    connectdb()
})

async function connectdb(){
    try{
        await mongoose.connect(mongodb_url)
        console.log("mongodb is connected")

    }
    catch(err){
        console.log("There is a error in database")
    }
}

app.get("/",(req,res)=>{
    res.send("welcome to Recipie app ")
})

app.post("/addtofavourite/recipies/:id",async(req,res)=>{
    const {id} = req.body
    const NewFavourite = new favourite({id})
    await NewFavourite.save()
    res.json({message:"favourite is added"})

})

app.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    const hashedpassword = await bcrypt.hash(password,10)
    const user = new User({username,email,password:hashedpassword})
    await user.save()
    res.json({message:"user register successfully"})

})

app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    const user = await User.findOne({email})
    if (!user) return res.status(400).json({
        message:"username not found"})

    const match = await bcrypt.compare(password,user.password)
    if (!match) return res.status(400).json({
        message:"Invalid credentials"
    })

    const token = jwt.sign({email:user.email},secretkey,{expiresIn:"1h"})
    
    return res.status(200).json({
        message:"login successfull",
        token,
    })
})