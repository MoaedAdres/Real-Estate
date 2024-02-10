import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({
            success: true,
            message: "user created Successfuly"
        })
    }
    catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next({ message: "User Not Found", statusCode: 403 })
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next({ message: "Wrong Credentials", statusCode: 403 })
        const token = jwt.sign({ id: validUser._id, email: email }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        // res.status(200).json({ ...rest, token })
    }

    catch (error) {
        next(error)
    }
}
export const google = async (req, res, next) => {
    try {
        const user = User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            const { password, ...rest } = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
            const newUser = new User({ username: username, email: req.body.email, password: hashedPassword, avatar: req.body.photo })
            await newUser.save()
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)
            const { password, ...rest } = newUser._doc;
            res.cookie("access_token", token).status(200).json(rest)
        }
    }
    catch (error) {
        next(error)
    }
}