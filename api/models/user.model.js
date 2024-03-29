import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User