import mongoose, { Schema, model } from "mongoose";



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
        required: true
    },
    password: {
        type: String,
        requiere: true
    },
    orders:[
        {
            type: mongoose.SchemaType.ObjectId,
            ref: 'Orders'
        }
    ]
 

})



export const userModel = model("users", userSchema);