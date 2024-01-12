import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(()=>console.log("Mongo is Connected Successfuly"))
.catch((error)=>{
    console.log(error)
})
const app =express()

app.listen(3000,()=>{
    console.log("Port is running on port 3000!!!")
})

app.use('/api/users',userRouter)