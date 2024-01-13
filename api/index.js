import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.router.js'
dotenv.config()
mongoose.connect(process.env.MONGO)
    .then(() => console.log("Mongo is Connected Successfuly"))
    .catch((error) => {
        console.log(error)
    })
const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("Port is running on port 3000!!!")
})


app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use((error,req,res,next)=>{
    const statusCode=error.statusCode || 500
    const message=error.message|| "internal server error"
    return res.status(statusCode).json({
        statusCode,
        success:false,
        message
    })
})