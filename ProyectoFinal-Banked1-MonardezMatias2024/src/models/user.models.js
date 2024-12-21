import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    }
})

export const userModel = model("users", userSchema)