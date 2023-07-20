import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: false
    },

    rol: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usernamegithub: {
        type: String,
        required: true
    },
    authenticationType: {
        type: String,
        required: true
    },
    cart_id: {
        type: String,
        required: true

    },
})

const userModel = model('user ', userSchema)

export default userModel
