import { Schema, model } from "mongoose";

const messagerSchema = new Schema({
    user: String,
    massage: String,

})

export default cartModel = model(messagerSchema, "messages")